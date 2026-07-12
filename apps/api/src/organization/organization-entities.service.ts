import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuditService } from '../audit/audit.service';
import { ListQueryDto } from '../common/list-query.dto';
import { DigitalDnaService, DnaObject } from '../digital-dna/digital-dna.service';
import { PrismaService } from '../prisma/prisma.service';
import { OrganizationHierarchyService } from './organization-hierarchy.service';
import { CreateOrganizationAccessDto, OrganizationEntityDto } from './organization.dto';

interface EntityConfig {
  delegate: string;
  code: string;
  name: string;
  nodeType: string;
  dna: DnaObject;
  companyRequired: boolean;
}

const ENTITY_CONFIG: Readonly<Record<string, EntityConfig>> = {
  'enterprise-groups': { delegate: 'enterpriseGroup', code: 'groupCode', name: 'groupName', nodeType: 'ENTERPRISE_GROUP', dna: 'GRP', companyRequired: false },
  'legal-entities': { delegate: 'legalEntity', code: 'legalEntityCode', name: 'legalEntityName', nodeType: 'LEGAL_ENTITY', dna: 'LEN', companyRequired: false },
  plants: { delegate: 'plant', code: 'plantCode', name: 'plantName', nodeType: 'PLANT', dna: 'PLT', companyRequired: true },
  'business-units': { delegate: 'businessUnit', code: 'businessUnitCode', name: 'businessUnitName', nodeType: 'BUSINESS_UNIT', dna: 'BUN', companyRequired: true },
  divisions: { delegate: 'division', code: 'divisionCode', name: 'divisionName', nodeType: 'DIVISION', dna: 'DIV', companyRequired: true },
  departments: { delegate: 'department', code: 'departmentCode', name: 'departmentName', nodeType: 'DEPARTMENT', dna: 'DEP', companyRequired: true },
  sections: { delegate: 'section', code: 'sectionCode', name: 'sectionName', nodeType: 'SECTION', dna: 'SEC', companyRequired: true },
  teams: { delegate: 'team', code: 'teamCode', name: 'teamName', nodeType: 'TEAM', dna: 'TEM', companyRequired: true },
  locations: { delegate: 'location', code: 'locationCode', name: 'locationName', nodeType: 'LOCATION', dna: 'LOC', companyRequired: false },
  'cost-centers': { delegate: 'costCenter', code: 'costCenterCode', name: 'costCenterName', nodeType: 'COST_CENTER', dna: 'CCT', companyRequired: true },
  'profit-centers': { delegate: 'profitCenter', code: 'profitCenterCode', name: 'profitCenterName', nodeType: 'PROFIT_CENTER', dna: 'PCT', companyRequired: true }
};

interface OrganizationDelegate {
  findMany(args: object): Promise<Array<Record<string, unknown>>>;
  findFirst(args: object): Promise<Record<string, unknown> | null>;
  count(args: object): Promise<number>;
  create(args: object): Promise<Record<string, unknown>>;
  update(args: object): Promise<Record<string, unknown>>;
}

@Injectable()
export class OrganizationEntitiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dna: DigitalDnaService,
    private readonly hierarchy: OrganizationHierarchyService,
    private readonly audit: AuditService
  ) {}

  resources() { return Object.keys(ENTITY_CONFIG); }

  async list(tenantId: string, resource: string, query: ListQueryDto, visibleReferenceIds?: string[]) {
    const config = this.config(resource);
    const delegate = this.delegate(config.delegate);
    const where = { tenantId, isDeleted: false, ...(visibleReferenceIds ? { id: { in: visibleReferenceIds } } : {}), ...(query.status ? { status: query.status } : {}), ...(query.search ? { OR: [
      { [config.code]: { contains: query.search, mode: 'insensitive' } },
      { [config.name]: { contains: query.search, mode: 'insensitive' } }
    ] } : {}) };
    const [data, total] = await Promise.all([
      delegate.findMany({ where, skip: (query.page - 1) * query.pageSize, take: query.pageSize, orderBy: { [config.code]: query.sortOrder } }),
      delegate.count({ where })
    ]);
    return { data, meta: { page: query.page, pageSize: query.pageSize, total } };
  }

  async get(tenantId: string, resource: string, id: string) {
    const record = await this.delegate(this.config(resource).delegate).findFirst({ where: { id, tenantId, isDeleted: false } });
    if (!record) throw new NotFoundException('Organization record not found');
    return record;
  }

  async create(tenantId: string, userId: string, resource: string, dto: OrganizationEntityDto) {
    const config = this.config(resource);
    const raw = this.clean(dto as unknown as Record<string, unknown>);
    const parentNodeId = raw.parentNodeId as string | undefined;
    delete raw.parentNodeId;
    const code = raw[config.code];
    const name = raw[config.name];
    if (typeof code !== 'string' || typeof name !== 'string') throw new BadRequestException(`${config.code} and ${config.name} are required`);
    if (config.companyRequired && typeof raw.companyId !== 'string') throw new BadRequestException('companyId is required');
    if (typeof raw.companyId === 'string') await this.assertCompany(tenantId, raw.companyId);
    this.convertDates(raw);
    try {
      const record = await this.delegate(config.delegate).create({ data: { ...raw, tenantId, [config.code]: code.toUpperCase(), digitalDna: this.dna.create(config.dna, code) } });
      const node = await this.hierarchy.createNode(tenantId, userId, { nodeType: config.nodeType, referenceId: String(record.id), nodeCode: code, nodeName: name, companyId: typeof raw.companyId === 'string' ? raw.companyId : undefined, parentNodeId, displayOrder: 0 });
      return { ...record, organizationNodeId: node.id };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') throw new ConflictException(`${config.code} already exists in its scope`);
      throw error;
    }
  }

  async update(tenantId: string, userId: string, resource: string, id: string, dto: OrganizationEntityDto) {
    const config = this.config(resource);
    const current = await this.get(tenantId, resource, id);
    const data = this.clean(dto as unknown as Record<string, unknown>);
    delete data.parentNodeId;
    delete data.companyId;
    delete data.digitalDna;
    this.convertDates(data);
    const updated = await this.delegate(config.delegate).update({ where: { id }, data });
    const node = await this.prisma.organizationNode.findFirst({ where: { tenantId, nodeType: config.nodeType, referenceId: id } });
    if (node) await this.hierarchy.updateNode(tenantId, userId, node.id, { nodeCode: typeof data[config.code] === 'string' ? String(data[config.code]) : undefined, nodeName: typeof data[config.name] === 'string' ? String(data[config.name]) : undefined, status: typeof data.status === 'string' ? data.status : undefined });
    await this.audit.record({ tenantId, companyId: typeof current.companyId === 'string' ? current.companyId : null, recordId: id, action: `${config.nodeType}_UPDATE`, userId });
    return updated;
  }

  async archive(tenantId: string, userId: string, resource: string, id: string, reason: string) {
    const config = this.config(resource);
    const current = await this.get(tenantId, resource, id);
    const updated = await this.delegate(config.delegate).update({ where: { id }, data: { isDeleted: true, isActive: false, status: 'ARCHIVED', effectiveTo: new Date() } });
    const node = await this.prisma.organizationNode.findFirst({ where: { tenantId, nodeType: config.nodeType, referenceId: id } });
    if (node) await this.hierarchy.archiveNode(tenantId, userId, node.id, reason);
    await this.audit.record({ tenantId, companyId: typeof current.companyId === 'string' ? current.companyId : null, recordId: id, action: `${config.nodeType}_ARCHIVE`, userId, reason });
    return updated;
  }

  listAccess(tenantId: string) {
    return this.prisma.userOrganizationAccess.findMany({ where: { tenantId }, include: { user: { select: { id: true, email: true, fullName: true } }, organizationNode: true }, orderBy: { createdAt: 'desc' } });
  }

  async getAccess(tenantId: string, id: string) {
    const access = await this.prisma.userOrganizationAccess.findFirst({ where: { id, tenantId, validTo: null } });
    if (!access) throw new NotFoundException('Organization access assignment not found');
    return access;
  }

  async createAccess(tenantId: string, actorId: string, dto: CreateOrganizationAccessDto) {
    const [user, node] = await Promise.all([
      this.prisma.user.findFirst({ where: { id: dto.userId, tenantId, isDeleted: false } }),
      this.prisma.organizationNode.findFirst({ where: { id: dto.organizationNodeId, tenantId, isActive: true } })
    ]);
    if (!user || !node) throw new NotFoundException('User or organization node not found in tenant');
    const record = await this.prisma.userOrganizationAccess.create({ data: { tenantId, userId: dto.userId, organizationNodeId: dto.organizationNodeId, accessLevel: dto.accessLevel, includeDescendants: dto.includeDescendants, validFrom: dto.validFrom ? new Date(dto.validFrom) : new Date(), validTo: dto.validTo ? new Date(dto.validTo) : undefined } });
    await this.audit.record({ tenantId, companyId: node.companyId, recordId: record.id, action: 'ORGANIZATION_ACCESS_ASSIGNMENT', userId: actorId, newValue: { assignedUserId: dto.userId, organizationNodeId: dto.organizationNodeId, accessLevel: dto.accessLevel, includeDescendants: dto.includeDescendants } });
    return record;
  }

  async archiveAccess(tenantId: string, actorId: string, id: string) {
    const record = await this.prisma.userOrganizationAccess.findFirst({ where: { id, tenantId } });
    if (!record) throw new NotFoundException('Organization access assignment not found');
    const updated = await this.prisma.userOrganizationAccess.update({ where: { id }, data: { validTo: new Date() } });
    await this.audit.record({ tenantId, recordId: id, action: 'ORGANIZATION_ACCESS_ARCHIVE', userId: actorId });
    return updated;
  }

  private config(resource: string) {
    const config = ENTITY_CONFIG[resource];
    if (!config) throw new NotFoundException('Unknown organization resource');
    return config;
  }

  private delegate(name: string): OrganizationDelegate {
    const delegate = (this.prisma as unknown as Record<string, unknown>)[name];
    if (!delegate) throw new NotFoundException('Organization delegate unavailable');
    return delegate as OrganizationDelegate;
  }

  private clean(input: Record<string, unknown>) {
    return Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined && value !== ''));
  }

  private convertDates(data: Record<string, unknown>) {
    for (const key of ['effectiveFrom', 'effectiveTo']) if (typeof data[key] === 'string') data[key] = new Date(data[key]);
  }

  private async assertCompany(tenantId: string, companyId: string) {
    const company = await this.prisma.company.findFirst({ where: { id: companyId, tenantId, isDeleted: false } });
    if (!company) throw new NotFoundException('Company not found in tenant');
  }
}
