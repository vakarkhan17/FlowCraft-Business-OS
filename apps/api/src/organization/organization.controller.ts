import { Body, Controller, ForbiddenException, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ArchiveDto } from '../companies/company.dto';
import { JwtAuthGuard } from '../common/auth.guard';
import { ListQueryDto } from '../common/list-query.dto';
import { Permissions } from '../common/permissions.decorator';
import { PermissionsGuard } from '../common/permissions.guard';
import type { AuthenticatedRequest } from '../common/request-context';
import { OrganizationEntitiesService } from './organization-entities.service';
import { OrganizationHierarchyService } from './organization-hierarchy.service';
import { OrganizationScopeService } from './organization-scope.service';
import { CreateOrganizationAccessDto, CreateOrganizationNodeDto, CreateOrganizationOverrideDto, MoveOrganizationNodeDto, OrganizationEntityDto, UpdateOrganizationNodeDto } from './organization.dto';

@Controller('organization')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class OrganizationController {
  constructor(
    private readonly hierarchy: OrganizationHierarchyService,
    private readonly entities: OrganizationEntitiesService,
    private readonly scope: OrganizationScopeService
  ) {}

  @Get('tree')
  @Permissions('ORGANIZATION_NODE.VIEW')
  async tree(@Req() req: AuthenticatedRequest, @Query('effectiveDate') effectiveDate?: string) {
    return this.hierarchy.tree(req.user.tenantId, effectiveDate ? new Date(effectiveDate) : undefined, await this.scope.visibleNodeIds(req.user));
  }

  @Get('nodes')
  @Permissions('ORGANIZATION_NODE.VIEW')
  async nodes(@Req() req: AuthenticatedRequest, @Query('search') search?: string, @Query('nodeType') nodeType?: string) {
    return this.hierarchy.listNodes(req.user.tenantId, search, nodeType, await this.scope.visibleNodeIds(req.user));
  }

  @Post('nodes')
  @Permissions('ORGANIZATION_NODE.CREATE')
  async createNode(@Req() req: AuthenticatedRequest, @Body() body: CreateOrganizationNodeDto) {
    if (body.parentNodeId) await this.scope.assertAccess(req.user, body.parentNodeId, 'MANAGE');
    else if (!req.user.isSuperAdmin) throw new ForbiddenException('Only Super Admin can create root organization nodes');
    return this.hierarchy.createNode(req.user.tenantId, req.user.sub, body);
  }

  @Get('nodes/:id')
  @Permissions('ORGANIZATION_NODE.VIEW')
  async node(@Req() req: AuthenticatedRequest, @Param('id') id: string) { await this.scope.assertAccess(req.user, id, 'VIEW'); return this.hierarchy.getNode(req.user.tenantId, id); }

  @Patch('nodes/:id')
  @Permissions('ORGANIZATION_NODE.EDIT')
  async updateNode(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: UpdateOrganizationNodeDto) { await this.scope.assertAccess(req.user, id, 'MANAGE'); return this.hierarchy.updateNode(req.user.tenantId, req.user.sub, id, body); }

  @Post('nodes/:id/archive')
  @Permissions('ORGANIZATION_NODE.ARCHIVE')
  async archiveNode(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: ArchiveDto) { await this.scope.assertAccess(req.user, id, 'ADMINISTER'); return this.hierarchy.archiveNode(req.user.tenantId, req.user.sub, id, body.reason); }

  @Get('nodes/:id/ancestors')
  @Permissions('ORGANIZATION_NODE.VIEW')
  async ancestors(@Req() req: AuthenticatedRequest, @Param('id') id: string) { await this.scope.assertAccess(req.user, id, 'VIEW'); return this.hierarchy.ancestors(req.user.tenantId, id); }

  @Get('nodes/:id/descendants')
  @Permissions('ORGANIZATION_NODE.VIEW')
  async descendants(@Req() req: AuthenticatedRequest, @Param('id') id: string) { await this.scope.assertAccess(req.user, id, 'VIEW'); return this.hierarchy.descendants(req.user.tenantId, id); }

  @Post('nodes/:id/move/preview')
  @Permissions('ORGANIZATION_NODE.EDIT')
  async previewMove(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: MoveOrganizationNodeDto) { await this.scope.assertAccess(req.user, id, 'MANAGE'); if (body.newParentNodeId) await this.scope.assertAccess(req.user, body.newParentNodeId, 'MANAGE'); return this.hierarchy.previewMove(req.user.tenantId, id, body); }

  @Post('nodes/:id/move')
  @Permissions('ORGANIZATION_NODE.EDIT')
  async move(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: MoveOrganizationNodeDto) { await this.scope.assertAccess(req.user, id, 'MANAGE'); if (body.newParentNodeId) await this.scope.assertAccess(req.user, body.newParentNodeId, 'MANAGE'); return this.hierarchy.move(req.user.tenantId, req.user.sub, id, body); }

  @Get('nodes/:id/inherited-settings')
  @Permissions('ORGANIZATION_NODE.VIEW')
  async inherited(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Query('effectiveDate') effectiveDate?: string) { await this.scope.assertAccess(req.user, id, 'VIEW'); return this.hierarchy.inheritedSettings(req.user.tenantId, id, effectiveDate ? new Date(effectiveDate) : undefined); }

  @Post('nodes/:id/overrides')
  @Permissions('ORGANIZATION_NODE.CONFIGURE')
  async override(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: CreateOrganizationOverrideDto) { await this.scope.assertAccess(req.user, id, 'MANAGE'); return this.hierarchy.createOverride(req.user.tenantId, req.user.sub, id, body); }

  @Get('organization-access')
  @Permissions('USER_ORGANIZATION_ACCESS.VIEW')
  access(@Req() req: AuthenticatedRequest) { return this.entities.listAccess(req.user.tenantId); }

  @Post('organization-access')
  @Permissions('USER_ORGANIZATION_ACCESS.CONFIGURE')
  async createAccess(@Req() req: AuthenticatedRequest, @Body() body: CreateOrganizationAccessDto) { await this.scope.assertAccess(req.user, body.organizationNodeId, 'ADMINISTER'); return this.entities.createAccess(req.user.tenantId, req.user.sub, body); }

  @Post('organization-access/:id/archive')
  @Permissions('USER_ORGANIZATION_ACCESS.CONFIGURE')
  async archiveAccess(@Req() req: AuthenticatedRequest, @Param('id') id: string) { const access = await this.entities.getAccess(req.user.tenantId, id); await this.scope.assertAccess(req.user, access.organizationNodeId, 'ADMINISTER'); return this.entities.archiveAccess(req.user.tenantId, req.user.sub, id); }

  @Get(':resource')
  @Permissions('ORGANIZATION_NODE.VIEW')
  async listEntities(@Req() req: AuthenticatedRequest, @Param('resource') resource: string, @Query() query: ListQueryDto) {
    const visibleNodeIds = await this.scope.visibleNodeIds(req.user);
    const visibleReferenceIds = visibleNodeIds ? (await this.hierarchy.listNodes(req.user.tenantId, undefined, undefined, visibleNodeIds)).map((node) => node.referenceId) : undefined;
    return this.entities.list(req.user.tenantId, resource, query, visibleReferenceIds);
  }

  @Post(':resource')
  @Permissions('ORGANIZATION_NODE.CREATE')
  async createEntity(@Req() req: AuthenticatedRequest, @Param('resource') resource: string, @Body() body: OrganizationEntityDto) { if (body.parentNodeId) await this.scope.assertAccess(req.user, body.parentNodeId, 'MANAGE'); else if (!req.user.isSuperAdmin) throw new ForbiddenException('Only Super Admin can create root organization records'); return this.entities.create(req.user.tenantId, req.user.sub, resource, body); }

  @Get(':resource/:id')
  @Permissions('ORGANIZATION_NODE.VIEW')
  async getEntity(@Req() req: AuthenticatedRequest, @Param('resource') resource: string, @Param('id') id: string) { const node = await this.hierarchy.getNodeByReference(req.user.tenantId, id); await this.scope.assertAccess(req.user, node.id, 'VIEW'); return this.entities.get(req.user.tenantId, resource, id); }

  @Patch(':resource/:id')
  @Permissions('ORGANIZATION_NODE.EDIT')
  async updateEntity(@Req() req: AuthenticatedRequest, @Param('resource') resource: string, @Param('id') id: string, @Body() body: OrganizationEntityDto) { const node = await this.hierarchy.getNodeByReference(req.user.tenantId, id); await this.scope.assertAccess(req.user, node.id, 'MANAGE'); return this.entities.update(req.user.tenantId, req.user.sub, resource, id, body); }

  @Post(':resource/:id/archive')
  @Permissions('ORGANIZATION_NODE.ARCHIVE')
  async archiveEntity(@Req() req: AuthenticatedRequest, @Param('resource') resource: string, @Param('id') id: string, @Body() body: ArchiveDto) { const node = await this.hierarchy.getNodeByReference(req.user.tenantId, id); await this.scope.assertAccess(req.user, node.id, 'ADMINISTER'); return this.entities.archive(req.user.tenantId, req.user.sub, resource, id, body.reason); }
}
