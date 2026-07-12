import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuditService } from '../audit/audit.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationNodeDto, CreateOrganizationOverrideDto, MoveOrganizationNodeDto, UpdateOrganizationNodeDto } from './organization.dto';

export const ORGANIZATION_COMPATIBILITY: Readonly<Record<string, readonly string[]>> = {
  ENTERPRISE_GROUP: ['LEGAL_ENTITY', 'COMPANY'],
  LEGAL_ENTITY: ['COMPANY'],
  COMPANY: ['BRANCH', 'PLANT', 'BUSINESS_UNIT', 'DIVISION', 'DEPARTMENT', 'COST_CENTER', 'PROFIT_CENTER', 'LOCATION'],
  BRANCH: ['PLANT', 'BUSINESS_UNIT', 'DIVISION', 'DEPARTMENT', 'LOCATION'],
  PLANT: ['BUSINESS_UNIT', 'DIVISION', 'DEPARTMENT', 'LOCATION', 'COST_CENTER', 'PROFIT_CENTER'],
  BUSINESS_UNIT: ['BUSINESS_UNIT', 'DIVISION', 'DEPARTMENT', 'PROFIT_CENTER'],
  DIVISION: ['DIVISION', 'DEPARTMENT', 'PROFIT_CENTER'],
  DEPARTMENT: ['DEPARTMENT', 'SECTION', 'TEAM', 'COST_CENTER', 'LOCATION'],
  SECTION: ['SECTION', 'TEAM'],
  TEAM: ['TEAM'],
  LOCATION: ['LOCATION'],
  COST_CENTER: ['COST_CENTER'],
  PROFIT_CENTER: ['PROFIT_CENTER']
};

export interface OrganizationTreeNode {
  id: string;
  nodeType: string;
  nodeCode: string;
  nodeName: string;
  companyId: string | null;
  hierarchyLevel: number;
  status: string;
  metadata: Prisma.JsonValue | null;
  children: OrganizationTreeNode[];
}

@Injectable()
export class OrganizationHierarchyService {
  constructor(private readonly prisma: PrismaService, private readonly audit: AuditService) {}

  async createNode(tenantId: string, userId: string, dto: CreateOrganizationNodeDto) {
    const parent = dto.parentNodeId ? await this.getNode(tenantId, dto.parentNodeId) : null;
    this.validateCompatibility(parent?.nodeType ?? null, dto.nodeType);
    if (parent?.companyId && dto.companyId && parent.companyId !== dto.companyId) throw new ForbiddenException('Parent belongs to a different company');
    const hierarchyPath = parent ? `${parent.hierarchyPath}${parent.id}/` : '/';
    const hierarchyLevel = parent ? parent.hierarchyLevel + 1 : 0;
    const effectiveFrom = dto.effectiveFrom ? new Date(dto.effectiveFrom) : new Date();
    const node = await this.prisma.$transaction(async (tx) => {
      const created = await tx.organizationNode.create({ data: {
        tenantId, companyId: dto.companyId, nodeType: dto.nodeType.toUpperCase(), referenceId: dto.referenceId,
        nodeCode: dto.nodeCode.toUpperCase(), nodeName: dto.nodeName, parentNodeId: dto.parentNodeId,
        hierarchyPath, hierarchyLevel, displayOrder: dto.displayOrder, icon: dto.icon,
        metadata: dto.metadata as Prisma.InputJsonValue | undefined, effectiveFrom,
        effectiveTo: dto.effectiveTo ? new Date(dto.effectiveTo) : undefined
      } });
      await tx.organizationRelationshipHistory.create({ data: {
        tenantId, organizationNodeId: created.id, oldParentNodeId: null, newParentNodeId: dto.parentNodeId,
        effectiveFrom, changeReason: 'Organization node created', changedById: userId
      } });
      return created;
    });
    await this.audit.record({ tenantId, companyId: node.companyId, recordId: node.id, action: 'ORGANIZATION_NODE_CREATE', userId, newValue: { nodeType: node.nodeType, nodeCode: node.nodeCode, parentNodeId: node.parentNodeId } });
    return node;
  }

  async listNodes(tenantId: string, search?: string, nodeType?: string, visibleNodeIds?: string[]) {
    return this.prisma.organizationNode.findMany({ where: {
      tenantId,
      ...(visibleNodeIds ? { id: { in: visibleNodeIds } } : {}),
      ...(nodeType ? { nodeType } : {}),
      ...(search ? { OR: [{ nodeCode: { contains: search, mode: 'insensitive' } }, { nodeName: { contains: search, mode: 'insensitive' } }] } : {})
    }, orderBy: [{ hierarchyLevel: 'asc' }, { displayOrder: 'asc' }, { nodeName: 'asc' }] });
  }

  async getNode(tenantId: string, id: string) {
    const node = await this.prisma.organizationNode.findFirst({ where: { id, tenantId }, include: { relationshipHistory: { orderBy: { effectiveFrom: 'desc' } }, overrides: { orderBy: { effectiveFrom: 'desc' } } } });
    if (!node) throw new NotFoundException('Organization node not found');
    return node;
  }

  async getNodeByReference(tenantId: string, referenceId: string) {
    const node = await this.prisma.organizationNode.findFirst({ where: { tenantId, referenceId, isActive: true } });
    if (!node) throw new NotFoundException('Organization node not found');
    return node;
  }

  async updateNode(tenantId: string, userId: string, id: string, dto: UpdateOrganizationNodeDto) {
    const current = await this.getNode(tenantId, id);
    const updated = await this.prisma.organizationNode.update({ where: { id }, data: {
      ...dto,
      nodeCode: dto.nodeCode?.toUpperCase(),
      metadata: dto.metadata as Prisma.InputJsonValue | undefined,
      effectiveTo: dto.effectiveTo ? new Date(dto.effectiveTo) : undefined
    } });
    await this.audit.record({ tenantId, companyId: current.companyId, recordId: id, action: 'ORGANIZATION_NODE_UPDATE', userId, oldValue: { nodeName: current.nodeName, status: current.status }, newValue: { nodeName: updated.nodeName, status: updated.status } });
    return updated;
  }

  async archiveNode(tenantId: string, userId: string, id: string, reason: string) {
    const current = await this.getNode(tenantId, id);
    const activeChildren = await this.prisma.organizationNode.count({ where: { tenantId, parentNodeId: id, isActive: true } });
    if (activeChildren) throw new BadRequestException('Archive or move active child nodes first');
    const updated = await this.prisma.organizationNode.update({ where: { id }, data: { status: 'ARCHIVED', isActive: false, effectiveTo: new Date() } });
    await this.audit.record({ tenantId, companyId: current.companyId, recordId: id, action: 'ORGANIZATION_NODE_ARCHIVE', userId, reason });
    return updated;
  }

  async ancestors(tenantId: string, id: string) {
    const node = await this.getNode(tenantId, id);
    const ids = node.hierarchyPath.split('/').filter(Boolean);
    const records = await this.prisma.organizationNode.findMany({ where: { tenantId, id: { in: ids } } });
    const byId = new Map(records.map((record) => [record.id, record]));
    return ids.map((ancestorId) => byId.get(ancestorId)).filter((record) => record !== undefined);
  }

  async descendants(tenantId: string, id: string) {
    const node = await this.getNode(tenantId, id);
    return this.prisma.organizationNode.findMany({ where: { tenantId, hierarchyPath: { startsWith: `${node.hierarchyPath}${node.id}/` } }, orderBy: [{ hierarchyLevel: 'asc' }, { displayOrder: 'asc' }] });
  }

  async tree(tenantId: string, effectiveDate?: Date, visibleNodeIds?: string[]) {
    const at = effectiveDate ?? new Date();
    const nodes = await this.prisma.organizationNode.findMany({ where: {
      tenantId, ...(visibleNodeIds ? { id: { in: visibleNodeIds } } : {}), effectiveFrom: { lte: at }, OR: [{ effectiveTo: null }, { effectiveTo: { gte: at } }]
    }, orderBy: [{ displayOrder: 'asc' }, { nodeName: 'asc' }] });
    const history = await this.prisma.organizationRelationshipHistory.findMany({ where: { tenantId, effectiveFrom: { lte: at } }, orderBy: { effectiveFrom: 'desc' } });
    const historicalParent = new Map<string, string | null>();
    for (const record of history) if (!historicalParent.has(record.organizationNodeId)) historicalParent.set(record.organizationNodeId, record.newParentNodeId);
    const mapped = new Map<string, OrganizationTreeNode>(nodes.map((node) => [node.id, { id: node.id, nodeType: node.nodeType, nodeCode: node.nodeCode, nodeName: node.nodeName, companyId: node.companyId, hierarchyLevel: node.hierarchyLevel, status: node.status, metadata: node.metadata, children: [] }]));
    const roots: OrganizationTreeNode[] = [];
    for (const node of nodes) {
      const item = mapped.get(node.id)!;
      const parentId = historicalParent.has(node.id) ? historicalParent.get(node.id) : node.parentNodeId;
      const parent = parentId ? mapped.get(parentId) : undefined;
      if (parent) parent.children.push(item); else roots.push(item);
    }
    return roots;
  }

  async previewMove(tenantId: string, id: string, dto: MoveOrganizationNodeDto) {
    const node = await this.getNode(tenantId, id);
    const parent = dto.newParentNodeId ? await this.getNode(tenantId, dto.newParentNodeId) : null;
    this.validateCompatibility(parent?.nodeType ?? null, node.nodeType);
    if (parent && (parent.id === node.id || parent.hierarchyPath.includes(`/${node.id}/`))) throw new BadRequestException('Move would create a circular hierarchy');
    if (parent?.companyId && node.companyId && parent.companyId !== node.companyId) throw new ForbiddenException('Cross-company move is not allowed');
    const descendants = await this.descendants(tenantId, id);
    const affectedNodeIds = [id, ...descendants.map((record) => record.id)];
    const [usersAffected, workflowsAffected, reportsAffected, costCentersAffected, profitCentersAffected, pendingTransactionsAffected] = await Promise.all([
      this.prisma.userOrganizationAccess.count({ where: { tenantId, organizationNodeId: { in: affectedNodeIds } } }),
      node.companyId ? this.prisma.workflowDefinition.count({ where: { tenantId, companyId: node.companyId } }) : 0,
      node.companyId ? this.prisma.reportDefinition.count({ where: { companyId: node.companyId } }) : 0,
      node.companyId ? this.prisma.costCenter.count({ where: { tenantId, companyId: node.companyId, isDeleted: false } }) : 0,
      node.companyId ? this.prisma.profitCenter.count({ where: { tenantId, companyId: node.companyId, isDeleted: false } }) : 0,
      node.companyId ? this.prisma.transactionDocument.count({ where: { companyId: node.companyId, status: { in: ['DRAFT', 'PENDING', 'PENDING_APPROVAL'] } } }) : 0
    ]);
    return { nodeId: id, oldParentNodeId: node.parentNodeId, newParentNodeId: dto.newParentNodeId ?? null, valid: true, descendantsAffected: descendants.length, usersAffected, securityScopesAffected: usersAffected, workflowsAffected, reportsAffected, costCentersAffected, profitCentersAffected, historicalImpact: node.parentNodeId !== (dto.newParentNodeId ?? null), pendingTransactionsAffected };
  }

  async move(tenantId: string, userId: string, id: string, dto: MoveOrganizationNodeDto) {
    await this.previewMove(tenantId, id, dto);
    const node = await this.getNode(tenantId, id);
    const parent = dto.newParentNodeId ? await this.getNode(tenantId, dto.newParentNodeId) : null;
    const newPath = parent ? `${parent.hierarchyPath}${parent.id}/` : '/';
    const newLevel = parent ? parent.hierarchyLevel + 1 : 0;
    const oldDescendantPrefix = `${node.hierarchyPath}${node.id}/`;
    const newDescendantPrefix = `${newPath}${node.id}/`;
    const descendants = await this.descendants(tenantId, id);
    const effectiveFrom = dto.effectiveFrom ? new Date(dto.effectiveFrom) : new Date();
    const updated = await this.prisma.$transaction(async (tx) => {
      await Promise.all(descendants.map((descendant) => tx.organizationNode.update({ where: { id: descendant.id }, data: {
        hierarchyPath: descendant.hierarchyPath.replace(oldDescendantPrefix, newDescendantPrefix),
        hierarchyLevel: descendant.hierarchyLevel + (newLevel - node.hierarchyLevel)
      } })));
      const moved = await tx.organizationNode.update({ where: { id }, data: { parentNodeId: dto.newParentNodeId ?? null, hierarchyPath: newPath, hierarchyLevel: newLevel } });
      await tx.organizationRelationshipHistory.create({ data: { tenantId, organizationNodeId: id, oldParentNodeId: node.parentNodeId, newParentNodeId: dto.newParentNodeId ?? null, effectiveFrom, changeReason: dto.changeReason, changedById: userId } });
      return moved;
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
    await this.audit.record({ tenantId, companyId: node.companyId, recordId: id, action: 'ORGANIZATION_NODE_MOVE', userId, reason: dto.changeReason, oldValue: { parentNodeId: node.parentNodeId }, newValue: { parentNodeId: updated.parentNodeId } });
    return updated;
  }

  async inheritedSettings(tenantId: string, id: string, effectiveDate = new Date()) {
    const lineage = [...await this.ancestors(tenantId, id), await this.getNode(tenantId, id)];
    const policies = await this.prisma.organizationInheritancePolicy.findMany({ where: { tenantId, status: 'ACTIVE' } });
    const overrides = await this.prisma.organizationSettingOverride.findMany({ where: { tenantId, organizationNodeId: { in: lineage.map((node) => node.id) }, effectiveFrom: { lte: effectiveDate }, OR: [{ effectiveTo: null }, { effectiveTo: { gte: effectiveDate } }], approvalStatus: 'APPROVED' }, orderBy: { effectiveFrom: 'asc' } });
    const resolved = new Map<string, { value: Prisma.JsonValue; sourceNodeId: string; overridden: boolean }>();
    for (const policy of policies) if (policy.defaultValue !== null) resolved.set(policy.settingKey, { value: policy.defaultValue, sourceNodeId: 'POLICY_DEFAULT', overridden: false });
    for (const node of lineage) for (const override of overrides.filter((item) => item.organizationNodeId === node.id)) resolved.set(override.settingKey, { value: override.settingValue, sourceNodeId: node.id, overridden: true });
    return { nodeId: id, effectiveDate, settings: Object.fromEntries(resolved) };
  }

  async createOverride(tenantId: string, userId: string, id: string, dto: CreateOrganizationOverrideDto) {
    await this.getNode(tenantId, id);
    return this.prisma.organizationSettingOverride.create({ data: { tenantId, organizationNodeId: id, settingKey: dto.settingKey, settingValue: dto.settingValue as Prisma.InputJsonValue, effectiveFrom: dto.effectiveFrom ? new Date(dto.effectiveFrom) : new Date(), effectiveTo: dto.effectiveTo ? new Date(dto.effectiveTo) : undefined, createdById: userId } });
  }

  validateCompatibility(parentType: string | null, childType: string) {
    if (!parentType) return;
    if (!ORGANIZATION_COMPATIBILITY[parentType]?.includes(childType.toUpperCase())) throw new BadRequestException(`${childType} cannot be placed under ${parentType}`);
  }
}
