import { ForbiddenException, Injectable } from '@nestjs/common';
import type { AuthenticatedUser } from '../common/request-context';
import { PrismaService } from '../prisma/prisma.service';

const ACCESS_RANK: Readonly<Record<string, number>> = { VIEW: 1, OPERATE: 2, APPROVE: 3, MANAGE: 4, ADMINISTER: 5 };

@Injectable()
export class OrganizationScopeService {
  constructor(private readonly prisma: PrismaService) {}

  async assertAccess(user: AuthenticatedUser, nodeId: string, required: keyof typeof ACCESS_RANK) {
    if (user.isSuperAdmin) return;
    const node = await this.prisma.organizationNode.findFirst({ where: { id: nodeId, tenantId: user.tenantId, isActive: true } });
    if (!node) throw new ForbiddenException('Organization node access denied');
    const ancestorIds = node.hierarchyPath.split('/').filter(Boolean);
    const now = new Date();
    const assignments = await this.prisma.userOrganizationAccess.findMany({ where: { tenantId: user.tenantId, userId: user.sub, validFrom: { lte: now }, AND: [
      { OR: [{ validTo: null }, { validTo: { gte: now } }] },
      { OR: [{ organizationNodeId: nodeId }, { organizationNodeId: { in: ancestorIds }, includeDescendants: true }] }
    ] } });
    if (!assignments.some((entry) => (ACCESS_RANK[entry.accessLevel] ?? 0) >= ACCESS_RANK[required])) throw new ForbiddenException('Organization scope access denied');
  }

  async visibleNodeIds(user: AuthenticatedUser): Promise<string[] | undefined> {
    if (user.isSuperAdmin) return undefined;
    const now = new Date();
    const assignments = await this.prisma.userOrganizationAccess.findMany({ where: { tenantId: user.tenantId, userId: user.sub, validFrom: { lte: now }, OR: [{ validTo: null }, { validTo: { gte: now } }] }, include: { organizationNode: true } });
    const ids = new Set(assignments.map((entry) => entry.organizationNodeId));
    for (const assignment of assignments.filter((entry) => entry.includeDescendants)) {
      const descendants = await this.prisma.organizationNode.findMany({ where: { tenantId: user.tenantId, hierarchyPath: { startsWith: `${assignment.organizationNode.hierarchyPath}${assignment.organizationNodeId}/` } }, select: { id: true } });
      descendants.forEach((node) => ids.add(node.id));
    }
    return [...ids];
  }
}
