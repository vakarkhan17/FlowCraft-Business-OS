import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { AuditService } from '../src/audit/audit.service';
import type { AuthenticatedUser } from '../src/common/request-context';
import type { DigitalDnaService } from '../src/digital-dna/digital-dna.service';
import { MASTER_RESOURCES } from '../src/master-data/master-data.registry';
import { MasterDataService } from '../src/master-data/master-data.service';
import type { OrganizationScopeService } from '../src/organization/organization-scope.service';
import type { PrismaService } from '../src/prisma/prisma.service';

const user: AuthenticatedUser = { sub: 'user', email: 'u@example.com', tenantId: 'tenant', clientId: 'tenant', companyId: 'company', branchId: 'branch', roles: [], permissions: ['MASTER_DATA.VIEW'], isSuperAdmin: false };
const superUser: AuthenticatedUser = { ...user, isSuperAdmin: true };
const dna = { create: (type: string, code?: string) => `FC-${type}-${code}-DNA` } as DigitalDnaService;

function service(prisma: Record<string, unknown>, auditEvents: object[] = [], scope: object = { assertAccess: async () => undefined }) {
  const audit = { record: async (event: object) => { auditEvents.push(event); return event; } } as unknown as AuditService;
  return new MasterDataService(prisma as unknown as PrismaService, dna, audit, scope as OrganizationScopeService);
}

const companyScope = { company: { findFirst: async () => ({ id: 'company', tenantId: 'tenant' }) }, organizationNode: { findFirst: async () => null } };

test('country creation sets immutable Digital DNA', async () => {
  const prisma = { country: { create: async ({ data }: { data: Record<string, unknown> }) => ({ id: 'country', ...data }) } };
  const result = await service(prisma).create(superUser, 'countries', { countryCode: 'AE', countryName: 'UAE', isoAlpha2: 'AE', isoAlpha3: 'ARE' });
  assert.match(String(result.digitalDna), /^FC-CTY-/);
});

test('country uniqueness is translated to a conflict', async () => {
  const duplicate = new Prisma.PrismaClientKnownRequestError('duplicate', { code: 'P2002', clientVersion: '6.19.3' });
  const prisma = { country: { create: async () => { throw duplicate; } } };
  await assert.rejects(() => service(prisma).create(superUser, 'countries', { countryCode: 'AE', countryName: 'UAE', isoAlpha2: 'AE', isoAlpha3: 'ARE' }), /already exists/);
});

test('state requires a consistent country', async () => {
  const prisma = { state: {}, country: { findFirst: async () => null } };
  await assert.rejects(() => service(prisma).create(superUser, 'states', { countryId: 'missing', stateCode: 'DXB', stateName: 'Dubai' }), /Country not found/);
});

test('city state must belong to selected country', async () => {
  const prisma = { city: {}, country: { findFirst: async () => ({ id: 'country' }) }, state: { findFirst: async () => null } };
  await assert.rejects(() => service(prisma).create(superUser, 'cities', { countryId: 'country', stateId: 'other', cityCode: 'DXB', cityName: 'Dubai' }), /State in selected country/);
});

test('territory registry enables unlimited hierarchy', () => assert.equal(MASTER_RESOURCES.territories.hierarchyParent, 'parentTerritoryId'));
test('territory cycle prevention rejects a descendant parent', async () => assertHierarchyCycle('territories', 'territory', 'parentTerritoryId'));

test('UOM creation accepts configurable categories', async () => {
  const prisma = { unitOfMeasure: { create: async ({ data }: { data: object }) => ({ id: 'uom', ...data }) } };
  const result = await service(prisma).create(user, 'uom', { uomCode: 'EA', uomName: 'Each', uomCategory: 'CUSTOM_COUNT', symbol: 'ea' });
  assert.equal(result.uomCategory, 'CUSTOM_COUNT');
});

test('UOM precision validation rejects values above twelve', async () => {
  await assert.rejects(() => service({ unitOfMeasure: {} }).create(user, 'uom', { uomCode: 'X', uomName: 'X', uomCategory: 'X', symbol: 'x', decimalPrecision: 13 }), /decimalPrecision/);
});

test('UOM conversion factor must be greater than zero', async () => {
  await assert.rejects(() => service({ uomConversion: {} }).create(user, 'uom-conversions', { fromUomId: 'a', toUomId: 'b', conversionFactor: 0 }), /greater than zero/);
});

test('UOM conversion cannot convert a UOM to itself', async () => {
  await assert.rejects(() => service({ uomConversion: {} }).create(user, 'uom-conversions', { fromUomId: 'a', toUomId: 'a', conversionFactor: 1 }), /must differ/);
});

test('item-group hierarchy rejects cycles', async () => assertHierarchyCycle('item-groups', 'itemGroup', 'parentItemGroupId'));
test('item-category creation is registered and company scoped', () => { assert.equal(MASTER_RESOURCES['item-categories'].company, 'OPTIONAL'); assert.equal(MASTER_RESOURCES['item-categories'].objectCode, 'ITEM_CATEGORY'); });

test('item code uniqueness is tenant and company scoped in schema', async () => assert.match(await schema(), /@@unique\(\[tenantId, companyId, itemCode\]\)/));

test('item tracking flags must match tracking method', async () => {
  const input = validItem({ trackingMethod: 'SERIAL', isSerialManaged: false });
  await assert.rejects(() => service(companyScope).create(user, 'items', input), /flags must match/);
});

test('stock item requires stock UOM', async () => {
  const input = validItem({ stockUomId: undefined });
  await assert.rejects(() => service(companyScope).create(user, 'items', input), /stockUomId is required|require stockUomId/);
});

test('API is authoritative for manufacturing strategy', async () => {
  const input = validItem({ manufacturingStrategy: 'UNSUPPORTED' });
  await assert.rejects(() => service(companyScope).create(user, 'items', input), /Unsupported manufacturingStrategy/);
});

test('warehouse branch must belong to warehouse company', async () => {
  const prisma = { ...companyScope, warehouse: {}, branch: { findFirst: async () => null } };
  await assert.rejects(() => service(prisma).create(user, 'warehouses', { companyId: 'company', branchId: 'wrong', code: 'WH', name: 'Warehouse', warehouseType: 'RAW' }), /Branch in selected company/);
});

test('warehouse hierarchy rejects cycles', async () => assertHierarchyCycle('warehouses', 'warehouse', 'parentWarehouseId'));

test('bin zone must belong to selected warehouse', async () => {
  const prisma = { bin: {}, warehouse: { findFirst: async () => ({ id: 'warehouse' }) }, warehouseZone: { findFirst: async () => null } };
  await assert.rejects(() => service(prisma).create(user, 'bins', { warehouseId: 'warehouse', warehouseZoneId: 'wrong', binCode: 'A', binName: 'A', binType: 'STORAGE' }), /Zone in selected warehouse/);
});

test('batch identity is unique within company and item', async () => assert.match(await schema(), /@@unique\(\[companyId, itemId, batchNumber\]\)/));

test('batch expiry must follow manufacturing date', async () => {
  const prisma = { ...companyScope, batch: {}, item: { findFirst: async () => ({ id: 'item' }) } };
  await assert.rejects(() => service(prisma).create(user, 'batches', { companyId: 'company', itemId: 'item', batchNumber: 'B1', manufacturingDate: '2026-07-14', expiryDate: '2026-07-13' }), /expiryDate/);
});

test('serial identity is immutable and company unique in schema', async () => assert.match(await schema(), /@@unique\(\[companyId, serialNumber\]\)/));

test('business partner creation supports a shared parent object', async () => {
  const prisma = { ...companyScope, businessPartner: { create: async ({ data }: { data: object }) => ({ id: 'bp', ...data }) } };
  const result = await service(prisma).create(user, 'business-partners', { companyId: 'company', partnerCode: 'BP', partnerName: 'Partner', partnerType: 'BOTH' });
  assert.equal(result.partnerType, 'BOTH');
});

test('customer specialization rejects supplier-only partner', async () => {
  const prisma = { ...companyScope, customer: {}, businessPartner: { findFirst: async () => ({ partnerType: 'SUPPLIER' }) } };
  await assert.rejects(() => service(prisma).create(user, 'customers', { companyId: 'company', businessPartnerId: 'bp', code: 'C', name: 'C' }), /must support customer/);
});

test('supplier specialization rejects customer-only partner', async () => {
  const prisma = { ...companyScope, supplier: {}, businessPartner: { findFirst: async () => ({ partnerType: 'CUSTOMER' }) } };
  await assert.rejects(() => service(prisma).create(user, 'suppliers', { companyId: 'company', businessPartnerId: 'bp', code: 'S', name: 'S' }), /must support supplier/);
});

test('BOTH partner supports customer specialization', async () => {
  const prisma = { ...companyScope, customer: { create: async ({ data }: { data: object }) => ({ id: 'customer', ...data }) }, businessPartner: { findFirst: async () => ({ partnerType: 'BOTH' }) } };
  const result = await service(prisma).create(user, 'customers', { companyId: 'company', businessPartnerId: 'bp', code: 'C', name: 'C' });
  assert.equal(result.businessPartnerId, 'bp');
});

test('credit profile rejects negative limits', async () => {
  await assert.rejects(() => service(companyScope).create(user, 'credit-profiles', { companyId: 'company', businessPartnerId: 'bp', creditTermId: 'term', creditLimit: -1 }), /cannot be negative/);
});

test('temporary credit limit requires an expiry', async () => {
  await assert.rejects(() => service(companyScope).create(user, 'credit-profiles', { companyId: 'company', businessPartnerId: 'bp', creditTermId: 'term', creditLimit: 1, temporaryCreditLimit: 2 }), /temporaryLimitExpiry/);
});

test('payment terms reject negative due days', async () => {
  await assert.rejects(() => service({ paymentTerm: {} }).create(user, 'payment-terms', { paymentTermCode: 'BAD', paymentTermName: 'Bad', dueDays: -1 }), /cannot be negative/);
});

test('duplicate detection returns exact code matches', async () => {
  const prisma = { country: { findMany: async () => [{ id: 'country', countryCode: 'AE' }] }, enterpriseObject: { findFirst: async () => null } };
  const result = await service(prisma).duplicateCheck(superUser, 'countries', { countryCode: 'AE' });
  assert.equal(result.duplicate, true);
});

test('master-data change request captures requesting user', async () => {
  const prisma = { masterDataChangeRequest: { create: async ({ data }: { data: object }) => ({ id: 'request', ...data }) } };
  const result = await service(prisma).create(user, 'change-requests', { enterpriseObjectId: 'object', recordId: 'record', changeType: 'UPDATE', requestedChanges: { name: 'New' }, reason: 'Correction' });
  assert.equal(result.requestedById, 'user');
});

test('import API exposes dry-run and validation-only metadata', async () => assert.match(await source('src/master-data/master-data.service.ts'), /validationOnly.*dryRun/s));
test('cross-tenant company is rejected', async () => { const prisma = { company: { findFirst: async () => null }, organizationNode: { findFirst: async () => null }, warehouse: {} }; await assert.rejects(() => service(prisma).create(user, 'warehouses', { companyId: 'other', code: 'W', name: 'W', warehouseType: 'RAW' }), ForbiddenException); });
test('cross-company access is rejected', async () => { const prisma = { company: { findFirst: async () => ({ id: 'other' }) }, organizationNode: { findFirst: async () => null }, warehouse: {} }; await assert.rejects(() => service(prisma).create(user, 'warehouses', { companyId: 'other', code: 'W', name: 'W', warehouseType: 'RAW' }), /Company access denied/); });

test('organization scope is enforced for company masters', async () => {
  const scope = { assertAccess: async () => { throw new ForbiddenException('scope'); } };
  const prisma = { company: { findFirst: async () => ({ id: 'company' }) }, organizationNode: { findFirst: async () => ({ id: 'node' }) }, warehouse: {} };
  await assert.rejects(() => service(prisma, [], scope).create(user, 'warehouses', { companyId: 'company', code: 'W', name: 'W', warehouseType: 'RAW' }), /scope/);
});

test('successful master creation generates audit event', async () => {
  const events: object[] = []; const prisma = { unitOfMeasure: { create: async ({ data }: { data: object }) => ({ id: 'uom', ...data }) } };
  await service(prisma, events).create(user, 'uom', { uomCode: 'EA', uomName: 'Each', uomCategory: 'COUNT', symbol: 'ea' });
  assert.equal(events.length, 1);
});

test('Super Admin JWT omits redundant permission claims', async () => assert.match(await source('src/auth/auth.service.ts'), /roles\.includes\('SUPER_ADMIN'\) \? \[\] : assignedPermissions/));
test('UUID link masters are excluded from text search', () => assert.equal(MASTER_RESOURCES['item-attribute-values'].searchable, false));

test('seed remains idempotent and creates no stock balances', async () => { const seed = await source('prisma/seed.ts'); assert.match(seed, /\.upsert\(|findFirst/); assert.match(seed, /no operational stock balances created/); });
test('all accepted DBA-002 and DBA-003 migrations remain present', async () => { assert.match(await source('prisma/migrations/20260711000000_foundation_platform_schema/migration.sql'), /CREATE TABLE/); assert.match(await source('prisma/migrations/20260712143659_enterprise_structure_model/migration.sql'), /organization_nodes/); });
test('DBA-004 migration never drops accepted master columns', async () => assert.doesNotMatch(await source('prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql'), /DROP COLUMN|DROP TABLE/));

async function assertHierarchyCycle(resource: string, delegateName: string, parentField: string) {
  const records = { [delegateName]: { findFirst: async ({ where }: { where: Record<string, unknown> }) => where.id === 'child' ? { id: 'child', tenantId: 'tenant', companyId: 'company', hierarchyPath: '/', hierarchyLevel: 0, isDeleted: false } : { id: 'descendant', tenantId: 'tenant', companyId: 'company', hierarchyPath: '/child/', hierarchyLevel: 1, isDeleted: false } }, ...companyScope };
  await assert.rejects(() => service(records).update(user, resource, 'child', { [parentField]: 'descendant' }), /cycle/);
}

function validItem(overrides: Record<string, unknown> = {}) { return { companyId: 'company', itemCode: 'I', name: 'Item', itemType: 'RAW_MATERIAL', itemGroupId: 'group', itemCategoryId: 'category', baseUomId: 'uom', stockUomId: 'uom', uom: 'EA', manufacturingStrategy: 'MTS', replenishmentPolicy: 'MANUAL', valuationMethod: 'FIFO', trackingMethod: 'NONE', isStockItem: true, isBatchManaged: false, isSerialManaged: false, ...overrides }; }
function source(path: string) { return readFile(path, 'utf8'); }
function schema() { return source('prisma/schema.prisma'); }
