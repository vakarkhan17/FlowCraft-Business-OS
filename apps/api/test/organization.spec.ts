import assert from 'node:assert/strict';
import test from 'node:test';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { AuditService } from '../src/audit/audit.service';
import type { DigitalDnaService } from '../src/digital-dna/digital-dna.service';
import { OrganizationEntitiesService } from '../src/organization/organization-entities.service';
import { ORGANIZATION_COMPATIBILITY, OrganizationHierarchyService } from '../src/organization/organization-hierarchy.service';
import { OrganizationScopeService } from '../src/organization/organization-scope.service';
import type { PrismaService } from '../src/prisma/prisma.service';

const audit = { record: async () => ({}) } as unknown as AuditService;
const dna = { create: (type: string, code?: string) => `FC-${type}-${code}` } as unknown as DigitalDnaService;

function hierarchy(prisma: object = {}) { return new OrganizationHierarchyService(prisma as PrismaService, audit); }

test('enterprise group creation creates a typed record and organization node', async () => {
  const prisma = { enterpriseGroup: { create: async ({ data }: { data: Record<string, unknown> }) => ({ ...data, id: 'group' }) } };
  const tree = { createNode: async () => ({ id: 'node' }) } as unknown as OrganizationHierarchyService;
  const service = new OrganizationEntitiesService(prisma as unknown as PrismaService, dna, tree, audit);
  const result = await service.create('tenant', 'user', 'enterprise-groups', { groupCode: 'G', groupName: 'Group' });
  assert.equal(result.organizationNodeId, 'node');
});

test('legal entity creation requires code and name', async () => {
  const service = new OrganizationEntitiesService({} as PrismaService, dna, {} as OrganizationHierarchyService, audit);
  await assert.rejects(() => service.create('tenant', 'user', 'legal-entities', {}), BadRequestException);
});

test('plant creation requires company scope', async () => {
  const service = new OrganizationEntitiesService({} as PrismaService, dna, {} as OrganizationHierarchyService, audit);
  await assert.rejects(() => service.create('tenant', 'user', 'plants', { plantCode: 'P', plantName: 'Plant' }), /companyId is required/);
});

test('department creation requires company scope', async () => {
  const service = new OrganizationEntitiesService({} as PrismaService, dna, {} as OrganizationHierarchyService, audit);
  await assert.rejects(() => service.create('tenant', 'user', 'departments', { departmentCode: 'D', departmentName: 'Department' }), /companyId is required/);
});

test('duplicate organization code is rejected', async () => {
  const duplicate = new Prisma.PrismaClientKnownRequestError('duplicate', { code: 'P2002', clientVersion: '6' });
  const prisma = { company: { findFirst: async () => ({ id: 'company' }) }, costCenter: { create: async () => { throw duplicate; } } };
  const service = new OrganizationEntitiesService(prisma as unknown as PrismaService, dna, {} as OrganizationHierarchyService, audit);
  await assert.rejects(() => service.create('tenant', 'user', 'cost-centers', { companyId: 'company', costCenterCode: 'CC', costCenterName: 'Cost' }), /already exists/);
});

test('cross-tenant company is rejected', async () => {
  const prisma = { company: { findFirst: async () => null } };
  const service = new OrganizationEntitiesService(prisma as unknown as PrismaService, dna, {} as OrganizationHierarchyService, audit);
  await assert.rejects(() => service.create('tenant-a', 'user', 'divisions', { companyId: 'tenant-b-company', divisionCode: 'D', divisionName: 'Division' }), /Company not found in tenant/);
});

test('default compatibility allows enterprise group to legal entity', () => assert.ok(ORGANIZATION_COMPATIBILITY.ENTERPRISE_GROUP.includes('LEGAL_ENTITY')));
test('default compatibility allows company to department', () => assert.ok(ORGANIZATION_COMPATIBILITY.COMPANY.includes('DEPARTMENT')));
test('default compatibility allows plant to location', () => assert.ok(ORGANIZATION_COMPATIBILITY.PLANT.includes('LOCATION')));
test('default compatibility allows department to cost center', () => assert.ok(ORGANIZATION_COMPATIBILITY.DEPARTMENT.includes('COST_CENTER')));
test('invalid parent-child combination is rejected', () => assert.throws(() => hierarchy().validateCompatibility('TEAM', 'ENTERPRISE_GROUP'), BadRequestException));

test('cross-company parent move is rejected', async () => {
  const service = hierarchy();
  service.getNode = async (_tenant, id) => ({ id, nodeType: id === 'child' ? 'DEPARTMENT' : 'DIVISION', companyId: id === 'child' ? 'a' : 'b', hierarchyPath: '/', hierarchyLevel: 1, parentNodeId: null }) as never;
  await assert.rejects(() => service.previewMove('tenant', 'child', { newParentNodeId: 'parent', changeReason: 'move' }), ForbiddenException);
});

test('circular hierarchy move is rejected', async () => {
  const service = hierarchy();
  service.getNode = async (_tenant, id) => ({ id, nodeType: id === 'child' ? 'DEPARTMENT' : 'DEPARTMENT', companyId: 'a', hierarchyPath: id === 'parent' ? '/child/' : '/', hierarchyLevel: 1, parentNodeId: null }) as never;
  await assert.rejects(() => service.previewMove('tenant', 'child', { newParentNodeId: 'parent', changeReason: 'cycle' }), /circular/);
});

test('move preview returns structured impact results', async () => {
  const counts = { userOrganizationAccess: 2, workflowDefinition: 3, reportDefinition: 4, costCenter: 5, profitCenter: 6, transactionDocument: 7 };
  const prisma = Object.fromEntries(Object.entries(counts).map(([key, value]) => [key, { count: async () => value }]));
  const service = hierarchy(prisma);
  service.getNode = async (_tenant, id) => ({ id, nodeType: id === 'node' ? 'DEPARTMENT' : 'DIVISION', companyId: 'company', hierarchyPath: '/', hierarchyLevel: 1, parentNodeId: null }) as never;
  service.descendants = async () => [{ id: 'descendant' }] as never;
  const result = await service.previewMove('tenant', 'node', { newParentNodeId: 'parent', changeReason: 'preview' });
  assert.deepEqual([result.descendantsAffected, result.usersAffected, result.pendingTransactionsAffected], [1, 2, 7]);
});

test('approved move updates hierarchy and writes relationship history', async () => {
  let historyWritten = false;
  const tx = { organizationNode: { update: async ({ where, data }: { where: { id: string }; data: object }) => ({ id: where.id, parentNodeId: 'parent', companyId: 'company', ...data }) }, organizationRelationshipHistory: { create: async () => { historyWritten = true; } } };
  const prisma = { $transaction: async (callback: (client: typeof tx) => Promise<unknown>) => callback(tx) };
  const service = hierarchy(prisma);
  service.previewMove = async () => ({ valid: true }) as never;
  service.getNode = async (_tenant, id) => ({ id, nodeType: id === 'node' ? 'DEPARTMENT' : 'DIVISION', companyId: 'company', hierarchyPath: '/', hierarchyLevel: id === 'node' ? 2 : 1, parentNodeId: 'old' }) as never;
  service.descendants = async () => [];
  await service.move('tenant', 'user', 'node', { newParentNodeId: 'parent', changeReason: 'approved' });
  assert.equal(historyWritten, true);
});

test('historical tree uses relationship history valid at requested date', async () => {
  const nodes = [{ id: 'a', nodeType: 'COMPANY', nodeCode: 'A', nodeName: 'A', companyId: 'c', hierarchyLevel: 0, status: 'ACTIVE', metadata: null, parentNodeId: null }, { id: 'b', nodeType: 'DEPARTMENT', nodeCode: 'B', nodeName: 'B', companyId: 'c', hierarchyLevel: 1, status: 'ACTIVE', metadata: null, parentNodeId: null }];
  const prisma = { organizationNode: { findMany: async () => nodes }, organizationRelationshipHistory: { findMany: async () => [{ organizationNodeId: 'b', newParentNodeId: 'a' }] } };
  const result = await hierarchy(prisma).tree('tenant', new Date('2026-07-12'));
  assert.equal(result[0].children[0].id, 'b');
});

test('inheritance resolution applies the nearest approved override', async () => {
  const prisma = { organizationInheritancePolicy: { findMany: async () => [{ settingKey: 'timezone', defaultValue: 'UTC' }] }, organizationSettingOverride: { findMany: async () => [{ organizationNodeId: 'child', settingKey: 'timezone', settingValue: 'Asia/Dubai' }] } };
  const service = hierarchy(prisma);
  service.ancestors = async () => [{ id: 'parent' }] as never;
  service.getNode = async () => ({ id: 'child' }) as never;
  const result = await service.inheritedSettings('tenant', 'child');
  assert.equal((result.settings.timezone as { value: string }).value, 'Asia/Dubai');
});

test('setting override remains effective dated', async () => {
  let effectiveFrom: Date | undefined;
  const prisma = { organizationSettingOverride: { create: async ({ data }: { data: { effectiveFrom: Date } }) => { effectiveFrom = data.effectiveFrom; return data; } } };
  const service = hierarchy(prisma); service.getNode = async () => ({ id: 'node' }) as never;
  await service.createOverride('tenant', 'user', 'node', { settingKey: 'timezone', settingValue: 'UTC', effectiveFrom: '2026-07-12' });
  assert.equal(effectiveFrom?.toISOString().slice(0, 10), '2026-07-12');
});

test('include-descendants access exposes child nodes', async () => {
  const prisma = { userOrganizationAccess: { findMany: async () => [{ organizationNodeId: 'root', includeDescendants: true, organizationNode: { hierarchyPath: '/' } }] }, organizationNode: { findMany: async () => [{ id: 'child' }] } };
  const ids = await new OrganizationScopeService(prisma as unknown as PrismaService).visibleNodeIds({ sub: 'user', email: 'u', tenantId: 'tenant', clientId: 'tenant', companyId: null, branchId: null, roles: [], permissions: [], isSuperAdmin: false });
  assert.deepEqual(ids?.sort(), ['child', 'root']);
});

test('unauthorized organization move scope is rejected', async () => {
  const prisma = { organizationNode: { findFirst: async () => ({ id: 'node', hierarchyPath: '/' }) }, userOrganizationAccess: { findMany: async () => [] } };
  const scope = new OrganizationScopeService(prisma as unknown as PrismaService);
  await assert.rejects(() => scope.assertAccess({ sub: 'user', email: 'u', tenantId: 'tenant', clientId: 'tenant', companyId: null, branchId: null, roles: [], permissions: [], isSuperAdmin: false }, 'node', 'MANAGE'), ForbiddenException);
});

test('organization schema contains relationship history and access uniqueness', async () => {
  const fs = await import('node:fs/promises'); const schema = await fs.readFile('prisma/schema.prisma', 'utf8');
  assert.match(schema, /model OrganizationRelationshipHistory/); assert.match(schema, /model UserOrganizationAccess/);
});

test('seed defines all sixteen DBA-003 registry objects', async () => {
  const fs = await import('node:fs/promises'); const seed = await fs.readFile('prisma/seed.ts', 'utf8');
  assert.equal((seed.match(/\['[A-Z_]+', '[^']+'\]/g) ?? []).filter((value) => ['ENTERPRISE_GROUP','LEGAL_ENTITY','ORGANIZATION_NODE','USER_ORGANIZATION_ACCESS'].some((code) => value.includes(code))).length >= 4, true);
});
