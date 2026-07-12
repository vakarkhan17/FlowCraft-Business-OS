import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth.guard';
import { Permissions } from '../common/permissions.decorator';
import { PermissionsGuard } from '../common/permissions.guard';
import type { AuthenticatedRequest } from '../common/request-context';
import { AssignPermissionsDto, CreateRoleDto, UpdateRoleDto } from './role.dto';
import { RolesService } from './roles.service';

@Controller()
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RolesController {
  constructor(private readonly service: RolesService) {}
  @Get('roles') @Permissions('ROLE.VIEW') list(@Req() req: AuthenticatedRequest) { return this.service.list(req.user.tenantId); }
  @Post('roles') @Permissions('ROLE.CREATE') create(@Req() req: AuthenticatedRequest, @Body() body: CreateRoleDto) { return this.service.create(req.user.tenantId, body); }
  @Patch('roles/:id') @Permissions('ROLE.EDIT') update(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: UpdateRoleDto) { return this.service.update(req.user.tenantId, id, body); }
  @Get('permissions') @Permissions('PERMISSION.VIEW') permissions() { return this.service.permissions(); }
  @Post('roles/:id/permissions') @Permissions('ROLE.CONFIGURE') assign(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: AssignPermissionsDto) { return this.service.assignPermissions(req.user.tenantId, req.user.sub, id, body); }
}
