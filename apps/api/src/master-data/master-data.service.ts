import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { AuditService } from '../audit/audit.service';
import { ListQueryDto } from '../common/list-query.dto';
import type { AuthenticatedUser } from '../common/request-context';
import { DigitalDnaService, DnaObject } from '../digital-dna/digital-dna.service';
import { OrganizationScopeService } from '../organization/organization-scope.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExportJobDto, CreateImportJobDto } from './master-data.dto';
import { MASTER_RESOURCES, MasterResourceConfig, masterResource } from './master-data.registry';

interface MasterDelegate {
  findMany(args: object): Promise<Array<Record<string, unknown>>>;
  findFirst(args: object): Promise<Record<string, unknown> | null>;
  count(args: object): Promise<number>;
  create(args: object): Promise<Record<string, unknown>>;
  update(args: object): Promise<Record<string, unknown>>;
}

const STRATEGIES = ['MTS', 'MTO', 'ATO', 'ETO', 'CTO', 'HYBRID'];
const REPLENISHMENT = ['MIN_MAX', 'REORDER_POINT', 'FIXED_QUANTITY', 'EOQ', 'KANBAN', 'JIT', 'MANUAL'];
const TRACKING = ['NONE', 'BATCH', 'SERIAL', 'BATCH_AND_SERIAL'];
const VALUATION = ['FIFO', 'WEIGHTED_AVERAGE', 'STANDARD_COST', 'MOVING_AVERAGE'];
const PARTNER_TYPES = ['CUSTOMER', 'SUPPLIER', 'BOTH', 'DISTRIBUTOR', 'DEALER', 'CONTRACTOR', 'TRANSPORTER', 'CONSULTANT', 'MANUFACTURER'];
const ATTRIBUTE_VALUE_FIELDS = ['textValue', 'numberValue', 'dateValue', 'booleanValue', 'optionValue'];

@Injectable()
export class MasterDataService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dna: DigitalDnaService,
    private readonly audit: AuditService,
    private readonly organizationScope: OrganizationScopeService
  ) {}

  resources() { return Object.entries(MASTER_RESOURCES).map(([resource, config]) => ({ resource, objectCode: config.objectCode, codeField: config.codeField, nameField: config.nameField })); }

  async dashboard(user: AuthenticatedUser) {
    const allowed = Object.entries(MASTER_RESOURCES).filter(([, config]) => user.isSuperAdmin || user.permissions.includes(`${config.objectCode}.VIEW`) || user.permissions.includes('MASTER_DATA.VIEW'));
    const categoryCounts = await Promise.all(allowed.map(async ([resource, config]) => ({ resource, objectCode: config.objectCode, count: await this.delegate(config.delegate).count({ where: await this.scopeWhere(user, config) }) })));
    const [recentItems, recentPartners, pendingApprovals, importJobs, duplicateRules, incompleteItems] = await Promise.all([
      this.delegate('item').findMany({ where: await this.scopeWhere(user, this.config('items')), orderBy: { updatedAt: 'desc' }, take: 5 }),
      this.delegate('businessPartner').findMany({ where: await this.scopeWhere(user, this.config('business-partners')), orderBy: { updatedAt: 'desc' }, take: 5 }),
      this.delegate('masterDataChangeRequest').count({ where: { tenantId: user.tenantId, approvalStatus: 'PENDING' } }),
      this.delegate('masterImportJob').findMany({ where: { tenantId: user.tenantId, ...(user.isSuperAdmin ? {} : { companyId: user.companyId }) }, orderBy: { createdAt: 'desc' }, take: 5 }),
      this.delegate('duplicateDetectionRule').count({ where: { tenantId: user.tenantId, isActive: true } }),
      this.delegate('item').count({ where: { ...await this.scopeWhere(user, this.config('items')), OR: [{ baseUomId: null }, { stockUomId: null }, { itemGroupId: null }, { itemCategoryId: null }] } })
    ]);
    return { categoryCounts, recentlyModified: [...recentItems, ...recentPartners].sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt))).slice(0, 8), pendingApprovals, duplicateWarnings: duplicateRules, importJobs, dataQuality: { incompleteItems, score: Math.max(0, 100 - incompleteItems * 5) } };
  }

  async list(user: AuthenticatedUser, resource: string, query: ListQueryDto) {
    const config = this.config(resource);
    const where = await this.scopeWhere(user, config, undefined, query.status);
    if (query.search && config.searchable !== false) this.addOrFilter(where, [config.codeField, config.nameField].filter((value, index, all) => all.indexOf(value) === index).map((field) => ({ [field]: { contains: query.search, mode: 'insensitive' } })));
    const sortBy = config.fields.includes(query.sortBy ?? '') ? query.sortBy! : config.codeField;
    const delegate = this.delegate(config.delegate);
    const [data, total] = await Promise.all([
      delegate.findMany({ where, skip: (query.page - 1) * query.pageSize, take: query.pageSize, orderBy: { [sortBy]: query.sortOrder } }),
      delegate.count({ where })
    ]);
    return { data, meta: { page: query.page, pageSize: query.pageSize, total } };
  }

  async get(user: AuthenticatedUser, resource: string, id: string) {
    const config = this.config(resource);
    const record = await this.delegate(config.delegate).findFirst({ where: { id, ...await this.scopeWhere(user, config) } });
    if (!record) throw new NotFoundException('Master record not found in the permitted scope');
    await this.assertRecordOrganizationScope(user, record);
    return record;
  }

  async create(user: AuthenticatedUser, resource: string, input: Record<string, unknown>) {
    const config = this.config(resource);
    const data = this.pick(config, input);
    await this.prepareOwnership(user, config, data);
    await this.validate(user, resource, data, true);
    await this.prepareHierarchy(user, config, data);
    if (config.dna) data.digitalDna = this.dna.create(config.dna as DnaObject, String(data[config.codeField] ?? 'MASTER'));
    if (resource === 'items') {
      data.sku ??= data.itemCode;
      data.itemCode ??= data.sku;
      data.uom ??= String(data.stockUomCode ?? 'EA');
      delete data.stockUomCode;
    }
    if (resource === 'change-requests') {
      data.requestedById = user.sub;
      data.requestedAt = new Date();
    }
    this.convertDates(data);
    try {
      const record = await this.delegate(config.delegate).create({ data });
      await this.writeAudit(user, config, String(record.id), `${config.objectCode}_CREATE`, undefined, record);
      return record;
    } catch (error) { this.rethrowDatabaseError(error, config); }
  }

  async update(user: AuthenticatedUser, resource: string, id: string, input: Record<string, unknown>) {
    const config = this.config(resource);
    const current = await this.get(user, resource, id);
    const data = this.pick(config, input);
    delete data.digitalDna;
    delete data.tenantId;
    delete data.companyId;
    await this.validate(user, resource, { ...current, ...data }, false);
    if (config.hierarchyParent && Object.prototype.hasOwnProperty.call(data, config.hierarchyParent)) await this.moveHierarchy(user, config, id, current, data);
    this.convertDates(data);
    try {
      const updated = await this.delegate(config.delegate).update({ where: { id }, data });
      await this.writeAudit(user, config, id, `${config.objectCode}_UPDATE`, current, updated);
      return updated;
    } catch (error) { this.rethrowDatabaseError(error, config); }
  }

  async archive(user: AuthenticatedUser, resource: string, id: string, reason: string) {
    const config = this.config(resource);
    const current = await this.get(user, resource, id);
    if (config.hierarchyParent) {
      const children = await this.delegate(config.delegate).count({ where: { [config.hierarchyParent]: id, isActive: true } });
      if (children) throw new BadRequestException('Archive or move active child records first');
    }
    const data: Record<string, unknown> = { status: 'ARCHIVED' };
    if (config.fields.includes('isActive')) data.isActive = false;
    if (config.fields.includes('effectiveTo')) data.effectiveTo = new Date();
    if (config.softDelete) Object.assign(data, { isDeleted: true, deletedAt: new Date(), deletedById: user.sub, deletionReason: reason });
    const updated = await this.delegate(config.delegate).update({ where: { id }, data });
    await this.writeAudit(user, config, id, `${config.objectCode}_ARCHIVE`, current, updated, reason);
    return updated;
  }

  async search(user: AuthenticatedUser, query: string) {
    if (query.trim().length < 2) throw new BadRequestException('Search query must contain at least two characters');
    const allowed = Object.entries(MASTER_RESOURCES).filter(([, config]) => config.searchable !== false && (user.isSuperAdmin || user.permissions.includes(`${config.objectCode}.VIEW`)));
    const groups = await Promise.all(allowed.map(async ([resource, config]) => {
      const where = await this.scopeWhere(user, config);
      this.addOrFilter(where, [config.codeField, config.nameField].filter((value, index, all) => all.indexOf(value) === index).map((field) => ({ [field]: { contains: query, mode: 'insensitive' } })));
      const records = await this.delegate(config.delegate).findMany({ where, take: 5, orderBy: { [config.nameField]: 'asc' } });
      return { resource, objectCode: config.objectCode, records };
    }));
    return { query, groups: groups.filter((group) => group.records.length), total: groups.reduce((sum, group) => sum + group.records.length, 0) };
  }

  async duplicateCheck(user: AuthenticatedUser, resource: string, candidate: Record<string, unknown>) {
    const config = this.config(resource);
    const exactFields = [config.codeField, config.nameField].filter((field, index, all) => candidate[field] !== undefined && all.indexOf(field) === index);
    const where = await this.scopeWhere(user, config);
    this.addOrFilter(where, exactFields.map((field) => ({ [field]: config.searchable === false ? { equals: candidate[field] } : { equals: candidate[field], mode: 'insensitive' } })));
    const matches = exactFields.length ? await this.delegate(config.delegate).findMany({ where, take: 10 }) : [];
    const enterpriseObject = await this.prisma.enterpriseObject.findFirst({ where: { objectCode: config.objectCode } });
    const rules = enterpriseObject ? await this.dynamicFindMany('duplicateDetectionRule', { where: { tenantId: user.tenantId, enterpriseObjectId: enterpriseObject.id, isActive: true } }) : [];
    return { resource, duplicate: matches.length > 0, matches, rulesEvaluated: rules.length, resolution: matches.length ? 'REVIEW_REQUIRED' : 'CLEAR' };
  }

  async recordMerge(user: AuthenticatedUser, input: Record<string, unknown>) {
    const required = ['enterpriseObjectId', 'sourceRecordId', 'targetRecordId', 'mergeReason'];
    for (const field of required) if (!input[field]) throw new BadRequestException(`${field} is required`);
    if (input.sourceRecordId === input.targetRecordId) throw new BadRequestException('Source and target records must differ');
    const record = await this.delegate('masterDataMergeHistory').create({ data: { tenantId: user.tenantId, enterpriseObjectId: input.enterpriseObjectId, sourceRecordId: input.sourceRecordId, targetRecordId: input.targetRecordId, mergeReason: input.mergeReason, mergedById: user.sub, preservedReferences: input.preservedReferences ?? {} } });
    await this.audit.record({ tenantId: user.tenantId, companyId: user.companyId, recordId: String(record.id), action: 'MASTER_DATA_MERGE_METADATA_CREATE', userId: user.sub, newValue: this.json(record) });
    return { ...record, destructiveMergePerformed: false };
  }

  async createImport(user: AuthenticatedUser, dto: CreateImportJobDto) {
    const config = this.config(dto.resource);
    const object = await this.prisma.enterpriseObject.findFirst({ where: { objectCode: config.objectCode } });
    if (!object) throw new BadRequestException('Enterprise object is not registered');
    const job = await this.delegate('masterImportJob').create({ data: { tenantId: user.tenantId, companyId: user.companyId, enterpriseObjectId: object.id, fileName: dto.fileName, fileFormat: dto.fileFormat, validationOnly: dto.validationOnly, dryRun: dto.dryRun, status: 'VALIDATING', totalRows: dto.rows.length, requestedById: user.sub, rollbackMarker: randomUUID() } });
    let validRows = 0; let invalidRows = 0; let duplicateRows = 0; let processedRows = 0;
    const rowResults: Record<string, unknown>[] = [];
    for (const [index, row] of dto.rows.entries()) {
      const errors: string[] = [];
      let duplicate = false; let importedRecordId: string | undefined;
      try {
        const prepared = this.pick(config, row.data);
        await this.prepareOwnership(user, config, prepared);
        await this.validate(user, dto.resource, prepared, true);
        const check = await this.duplicateCheck(user, dto.resource, prepared);
        duplicate = check.duplicate;
        if (duplicate) duplicateRows += 1;
        if (!duplicate && !dto.validationOnly && !dto.dryRun) importedRecordId = String((await this.create(user, dto.resource, row.data)).id);
        validRows += 1;
      } catch (error) { invalidRows += 1; errors.push(error instanceof Error ? error.message : 'Unknown validation error'); }
      if (importedRecordId) processedRows += 1;
      const rowRecord = await this.delegate('masterImportRow').create({ data: { importJobId: job.id, rowNumber: index + 1, rawData: row.data, normalizedData: row.data, validationStatus: errors.length ? 'INVALID' : duplicate ? 'DUPLICATE' : 'VALID', validationErrors: errors, duplicateMatches: duplicate ? { detected: true } : undefined, importedRecordId } });
      rowResults.push(rowRecord);
    }
    const status = invalidRows ? 'VALIDATED_WITH_ERRORS' : dto.validationOnly || dto.dryRun ? 'VALIDATED' : 'COMPLETED';
    const summary = { totalRows: dto.rows.length, validRows, invalidRows, duplicateRows, processedRows, dryRun: dto.dryRun, validationOnly: dto.validationOnly };
    const updated = await this.delegate('masterImportJob').update({ where: { id: job.id }, data: { ...summary, status, summary } });
    await this.audit.record({ tenantId: user.tenantId, companyId: user.companyId, recordId: String(job.id), action: 'MASTER_IMPORT_JOB', userId: user.sub, newValue: this.json(summary) });
    return { job: updated, rows: rowResults, summary };
  }

  async listImports(user: AuthenticatedUser) { return this.dynamicFindMany('masterImportJob', { where: { tenantId: user.tenantId, ...(user.isSuperAdmin ? {} : { companyId: user.companyId }) }, orderBy: { createdAt: 'desc' }, take: 100 }); }

  async createExport(user: AuthenticatedUser, dto: CreateExportJobDto) {
    const config = this.config(dto.resource);
    const object = await this.prisma.enterpriseObject.findFirst({ where: { objectCode: config.objectCode } });
    if (!object) throw new BadRequestException('Enterprise object is not registered');
    const count = await this.delegate(config.delegate).count({ where: { ...await this.scopeWhere(user, config), ...(dto.filters ?? {}) } });
    const job = await this.delegate('masterExportJob').create({ data: { tenantId: user.tenantId, companyId: user.companyId, enterpriseObjectId: object.id, fileFormat: dto.fileFormat, filters: dto.filters, selectedFields: dto.selectedFields, status: 'READY', rowCount: count, requestedById: user.sub, completedAt: new Date() } });
    await this.audit.record({ tenantId: user.tenantId, companyId: user.companyId, recordId: String(job.id), action: 'MASTER_EXPORT_JOB', userId: user.sub, newValue: this.json({ resource: dto.resource, rowCount: count, fileFormat: dto.fileFormat }) });
    return { ...job, executionEngine: 'METADATA_READY' };
  }

  async listExports(user: AuthenticatedUser) { return this.dynamicFindMany('masterExportJob', { where: { tenantId: user.tenantId, ...(user.isSuperAdmin ? {} : { companyId: user.companyId }) }, orderBy: { createdAt: 'desc' }, take: 100 }); }

  openApi() {
    const paths = Object.fromEntries(Object.keys(MASTER_RESOURCES).map((resource) => [`/api/v1/master-data/${resource}`, { get: { summary: `List ${resource}`, security: [{ bearerAuth: [] }] }, post: { summary: `Create ${resource}`, security: [{ bearerAuth: [] }] } }]));
    return { openapi: '3.1.0', info: { title: 'FlowCraft Master Data API', version: '1.0.0' }, paths, components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } } } };
  }

  private async validate(user: AuthenticatedUser, resource: string, data: Record<string, unknown>, creating: boolean) {
    const config = this.config(resource);
    if (creating && config.fields.includes(config.codeField) && !data[config.codeField]) throw new BadRequestException(`${config.codeField} is required`);
    if (creating && config.fields.includes(config.nameField) && !data[config.nameField]) throw new BadRequestException(`${config.nameField} is required`);
    if (resource === 'states') await this.assertExists('country', { id: data.countryId }, 'Country');
    if (resource === 'cities') {
      await this.assertExists('country', { id: data.countryId }, 'Country');
      if (data.stateId) await this.assertExists('state', { id: data.stateId, countryId: data.countryId }, 'State in selected country');
    }
    if (resource === 'uom' && (Number(data.decimalPrecision ?? 4) < 0 || Number(data.decimalPrecision ?? 4) > 12)) throw new BadRequestException('decimalPrecision must be between 0 and 12');
    if (resource === 'uom-conversions') {
      if (Number(data.conversionFactor) <= 0) throw new BadRequestException('conversionFactor must be greater than zero');
      if (data.fromUomId === data.toUomId) throw new BadRequestException('fromUomId and toUomId must differ');
      await this.assertUom(user, String(data.fromUomId)); await this.assertUom(user, String(data.toUomId));
    }
    if (resource === 'items') await this.validateItem(user, data, creating);
    if (resource === 'warehouses') await this.validateWarehouse(user, data);
    if (resource === 'warehouse-zones') await this.assertTenantRecord('warehouse', user.tenantId, String(data.warehouseId), 'Warehouse');
    if (resource === 'bins') {
      await this.assertTenantRecord('warehouse', user.tenantId, String(data.warehouseId), 'Warehouse');
      if (data.warehouseZoneId) await this.assertExists('warehouseZone', { id: data.warehouseZoneId, tenantId: user.tenantId, warehouseId: data.warehouseId }, 'Zone in selected warehouse');
    }
    if (resource === 'batches' || resource === 'serial-numbers') await this.assertExists('item', { id: data.itemId, tenantId: user.tenantId, companyId: data.companyId, isDeleted: false }, 'Item in selected company');
    if (resource === 'batches' && data.manufacturingDate && data.expiryDate && new Date(String(data.expiryDate)) <= new Date(String(data.manufacturingDate))) throw new BadRequestException('expiryDate must be after manufacturingDate');
    if (resource === 'serial-numbers' && data.warrantyStartDate && data.warrantyEndDate && new Date(String(data.warrantyEndDate)) < new Date(String(data.warrantyStartDate))) throw new BadRequestException('warrantyEndDate must not precede warrantyStartDate');
    if (resource === 'business-partners' && !PARTNER_TYPES.includes(String(data.partnerType))) throw new BadRequestException(`partnerType must be one of ${PARTNER_TYPES.join(', ')}`);
    if (resource === 'customers' || resource === 'suppliers') await this.validateSpecialization(user, resource, data);
    if (resource === 'payment-terms' && (Number(data.dueDays) < 0 || Number(data.discountDays ?? 0) < 0)) throw new BadRequestException('Payment-term days cannot be negative');
    if (resource === 'credit-terms' && (Number(data.creditDays) < 0 || Number(data.graceDays ?? 0) < 0)) throw new BadRequestException('Credit-term days cannot be negative');
    if (resource === 'credit-profiles') {
      if (Number(data.creditLimit) < 0 || Number(data.temporaryCreditLimit ?? 0) < 0) throw new BadRequestException('Credit limits cannot be negative');
      if (data.temporaryCreditLimit && !data.temporaryLimitExpiry) throw new BadRequestException('temporaryLimitExpiry is required for a temporary credit limit');
      await this.assertExists('businessPartner', { id: data.businessPartnerId, tenantId: user.tenantId, companyId: data.companyId, isDeleted: false }, 'Business partner in selected company');
    }
    if (resource === 'tax-codes' && (Number(data.rate) < 0 || Number(data.recoverablePercentage ?? 0) < 0 || Number(data.recoverablePercentage ?? 0) > 100)) throw new BadRequestException('Tax rate must be non-negative and recoverablePercentage must be between 0 and 100');
    if (resource === 'item-attribute-values') await this.validateAttributeValue(data);
  }

  private async validateItem(user: AuthenticatedUser, data: Record<string, unknown>, creating: boolean) {
    if (creating) for (const field of ['itemGroupId','itemCategoryId','baseUomId','stockUomId']) if (!data[field]) throw new BadRequestException(`${field} is required`);
    if (!STRATEGIES.includes(String(data.manufacturingStrategy ?? 'MTS'))) throw new BadRequestException('Unsupported manufacturingStrategy');
    if (!REPLENISHMENT.includes(String(data.replenishmentPolicy ?? 'MANUAL'))) throw new BadRequestException('Unsupported replenishmentPolicy');
    if (!TRACKING.includes(String(data.trackingMethod ?? 'NONE'))) throw new BadRequestException('Unsupported trackingMethod');
    if (!VALUATION.includes(String(data.valuationMethod ?? 'WEIGHTED_AVERAGE'))) throw new BadRequestException('Unsupported valuationMethod');
    const tracking = String(data.trackingMethod ?? 'NONE');
    if (Boolean(data.isBatchManaged) !== ['BATCH','BATCH_AND_SERIAL'].includes(tracking) || Boolean(data.isSerialManaged) !== ['SERIAL','BATCH_AND_SERIAL'].includes(tracking)) throw new BadRequestException('Batch and serial flags must match trackingMethod');
    if (data.isStockItem !== false && !data.stockUomId) throw new BadRequestException('Stock items require stockUomId');
    for (const field of ['baseUomId','purchaseUomId','salesUomId','stockUomId','weightUomId','volumeUomId']) if (data[field]) await this.assertUom(user, String(data[field]));
  }

  private async validateWarehouse(user: AuthenticatedUser, data: Record<string, unknown>) {
    const companyId = String(data.companyId);
    if (data.branchId) await this.assertExists('branch', { id: data.branchId, tenantId: user.tenantId, companyId, isDeleted: false }, 'Branch in selected company');
    if (data.plantId) await this.assertExists('plant', { id: data.plantId, tenantId: user.tenantId, companyId, isDeleted: false }, 'Plant in selected company');
    if (data.locationId) await this.assertExists('location', { id: data.locationId, tenantId: user.tenantId, OR: [{ companyId }, { companyId: null }], isDeleted: false }, 'Location in selected company');
  }

  private async validateSpecialization(user: AuthenticatedUser, resource: string, data: Record<string, unknown>) {
    if (!data.businessPartnerId) throw new BadRequestException('businessPartnerId is required');
    const partner = await this.delegate('businessPartner').findFirst({ where: { id: data.businessPartnerId, tenantId: user.tenantId, companyId: data.companyId, isDeleted: false } });
    if (!partner) throw new BadRequestException('Business partner not found in selected company');
    const allowed = resource === 'customers' ? ['CUSTOMER','BOTH'] : ['SUPPLIER','BOTH'];
    if (!allowed.includes(String(partner.partnerType))) throw new BadRequestException(`Business partner type must support ${resource === 'customers' ? 'customer' : 'supplier'} specialization`);
  }

  private async validateAttributeValue(data: Record<string, unknown>) {
    const definition = await this.delegate('itemAttributeDefinition').findFirst({ where: { id: data.attributeDefinitionId } });
    if (!definition) throw new BadRequestException('Attribute definition not found');
    const populated = ATTRIBUTE_VALUE_FIELDS.filter((field) => data[field] !== undefined && data[field] !== null && data[field] !== '');
    if (populated.length !== 1) throw new BadRequestException('Exactly one typed attribute value is required');
    const expected: Record<string, string> = { TEXT: 'textValue', NUMBER: 'numberValue', DATE: 'dateValue', BOOLEAN: 'booleanValue', OPTION: 'optionValue' };
    if (expected[String(definition.dataType)] !== populated[0]) throw new BadRequestException(`Attribute value must use ${expected[String(definition.dataType)] ?? 'the configured data type'}`);
  }

  private async prepareOwnership(user: AuthenticatedUser, config: MasterResourceConfig, data: Record<string, unknown>) {
    if (config.scope === 'TENANT' || config.scope === 'GLOBAL_OR_TENANT') data.tenantId = user.tenantId;
    if (config.company !== 'NONE') {
      const companyId = String(data.companyId ?? user.companyId ?? '');
      if (config.company === 'REQUIRED' && !companyId) throw new ForbiddenException('Company context is required');
      if (companyId) {
        await this.assertCompany(user, companyId);
        data.companyId = companyId;
      }
    }
  }

  private async prepareHierarchy(user: AuthenticatedUser, config: MasterResourceConfig, data: Record<string, unknown>) {
    if (!config.hierarchyParent) return;
    const parentId = data[config.hierarchyParent];
    if (!parentId) { data.hierarchyPath = '/'; data.hierarchyLevel = 0; return; }
    const parent = await this.delegate(config.delegate).findFirst({ where: { id: parentId, ...await this.scopeWhere(user, config, data.companyId as string | undefined) } });
    if (!parent) throw new BadRequestException('Parent record not found in the permitted scope');
    data.hierarchyPath = `${String(parent.hierarchyPath)}${String(parent.id)}/`;
    data.hierarchyLevel = Number(parent.hierarchyLevel) + 1;
  }

  private async moveHierarchy(user: AuthenticatedUser, config: MasterResourceConfig, id: string, current: Record<string, unknown>, data: Record<string, unknown>) {
    const parentId = data[config.hierarchyParent!];
    if (parentId === id) throw new BadRequestException('A record cannot be its own parent');
    if (!parentId) { data.hierarchyPath = '/'; data.hierarchyLevel = 0; return; }
    const parent = await this.delegate(config.delegate).findFirst({ where: { id: parentId, ...await this.scopeWhere(user, config, current.companyId as string | undefined) } });
    if (!parent) throw new BadRequestException('Parent record not found in the permitted scope');
    if (String(parent.hierarchyPath).includes(`/${id}/`)) throw new BadRequestException('Hierarchy move would create a cycle');
    const newPath = `${String(parent.hierarchyPath)}${String(parent.id)}/`;
    const oldPrefix = `${String(current.hierarchyPath)}${id}/`;
    const newPrefix = `${newPath}${id}/`;
    const levelDelta = Number(parent.hierarchyLevel) + 1 - Number(current.hierarchyLevel);
    const descendants = await this.delegate(config.delegate).findMany({ where: { hierarchyPath: { startsWith: oldPrefix } } });
    await Promise.all(descendants.map((record) => this.delegate(config.delegate).update({ where: { id: record.id }, data: { hierarchyPath: String(record.hierarchyPath).replace(oldPrefix, newPrefix), hierarchyLevel: Number(record.hierarchyLevel) + levelDelta } })));
    data.hierarchyPath = newPath; data.hierarchyLevel = Number(parent.hierarchyLevel) + 1;
  }

  private async scopeWhere(user: AuthenticatedUser, config: MasterResourceConfig, requestedCompanyId?: string, status?: string) {
    const where: Record<string, unknown> = {};
    if (config.scope === 'TENANT') where.tenantId = user.tenantId;
    if (config.scope === 'GLOBAL_OR_TENANT') where.OR = [{ tenantId: user.tenantId }, { tenantId: null }];
    if (config.company !== 'NONE') {
      const companyId = requestedCompanyId ?? user.companyId;
      if (!user.isSuperAdmin) {
        if (!companyId) return { id: '__NO_COMPANY_SCOPE__' };
        await this.assertCompany(user, companyId);
        where.companyId = config.company === 'OPTIONAL' ? { in: [companyId, null] } : companyId;
      } else if (requestedCompanyId) where.companyId = config.company === 'OPTIONAL' ? { in: [requestedCompanyId, null] } : requestedCompanyId;
    }
    if (status) where.status = status;
    if (config.softDelete) where.isDeleted = false;
    return where;
  }

  private async assertCompany(user: AuthenticatedUser, companyId: string) {
    const company = await this.prisma.company.findFirst({ where: { id: companyId, tenantId: user.tenantId, isDeleted: false } });
    if (!company) throw new ForbiddenException('Company is outside the tenant scope');
    if (!user.isSuperAdmin && user.companyId !== companyId) throw new ForbiddenException('Company access denied');
    const node = await this.prisma.organizationNode.findFirst({ where: { tenantId: user.tenantId, nodeType: 'COMPANY', referenceId: companyId, isActive: true } });
    if (node) await this.organizationScope.assertAccess(user, node.id, 'VIEW');
  }

  private async assertRecordOrganizationScope(user: AuthenticatedUser, record: Record<string, unknown>) { if (record.companyId) await this.assertCompany(user, String(record.companyId)); }
  private async assertUom(user: AuthenticatedUser, id: string) { await this.assertExists('unitOfMeasure', { id, OR: [{ tenantId: user.tenantId }, { tenantId: null }], isActive: true }, 'Unit of measure'); }
  private async assertTenantRecord(delegate: string, tenantId: string, id: string, label: string) { await this.assertExists(delegate, { id, tenantId, isDeleted: false }, label); }
  private async assertExists(delegate: string, where: object, label: string) { if (!await this.delegate(delegate).findFirst({ where })) throw new BadRequestException(`${label} not found or inconsistent`); }

  private config(resource: string) { const config = masterResource(resource); if (!config) throw new NotFoundException('Unknown master-data resource'); return config; }
  private delegate(name: string): MasterDelegate { const value = (this.prisma as unknown as Record<string, unknown>)[name]; if (!value) throw new NotFoundException(`Master-data delegate ${name} is unavailable`); return value as MasterDelegate; }
  private dynamicFindMany(delegate: string, args: object) { return this.delegate(delegate).findMany(args); }
  private addOrFilter(where: Record<string, unknown>, clauses: object[]) { if (where.OR) { const scopeOr = where.OR; delete where.OR; where.AND = [{ OR: scopeOr }, { OR: clauses }]; } else where.OR = clauses; }
  private pick(config: MasterResourceConfig, input: Record<string, unknown>) { const allowed = new Set(config.fields); return Object.fromEntries(Object.entries(input).filter(([key, value]) => allowed.has(key) && value !== undefined && value !== '')); }
  private convertDates(data: Record<string, unknown>) { for (const [key, value] of Object.entries(data)) if (value && (key.endsWith('Date') || key.endsWith('At') || key === 'effectiveFrom' || key === 'effectiveTo' || key.endsWith('Expiry'))) data[key] = value instanceof Date ? value : new Date(String(value)); }
  private async writeAudit(user: AuthenticatedUser, config: MasterResourceConfig, recordId: string, action: string, oldValue?: Record<string, unknown>, newValue?: Record<string, unknown>, reason?: string) { await this.audit.record({ tenantId: user.tenantId, companyId: user.companyId, recordId, action, userId: user.sub, oldValue: oldValue ? this.json(oldValue) : undefined, newValue: newValue ? this.json(newValue) : undefined, reason }); }
  private json(value: unknown) { return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue; }
  private rethrowDatabaseError(error: unknown, config: MasterResourceConfig): never { if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') throw new ConflictException(`${config.objectCode} already exists in the selected scope`); throw error; }
}
