import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ArchiveDto } from '../companies/company.dto';
import { JwtAuthGuard } from '../common/auth.guard';
import { ListQueryDto } from '../common/list-query.dto';
import { Permissions } from '../common/permissions.decorator';
import { PermissionsGuard } from '../common/permissions.guard';
import type { AuthenticatedRequest } from '../common/request-context';
import { AssignUserRoleDto, CreateUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UsersController {
  constructor(private readonly service: UsersService) {}
  @Get() @Permissions('USER.VIEW') list(@Req() req: AuthenticatedRequest, @Query() query: ListQueryDto) { return this.service.list(req.user.tenantId, query); }
  @Post() @Permissions('USER.CREATE') create(@Req() req: AuthenticatedRequest, @Body() body: CreateUserDto) { return this.service.create(req.user.tenantId, req.user.sub, body); }
  @Get(':id') @Permissions('USER.VIEW') get(@Req() req: AuthenticatedRequest, @Param('id') id: string) { return this.service.get(req.user.tenantId, id); }
  @Patch(':id') @Permissions('USER.EDIT') update(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: UpdateUserDto) { return this.service.update(req.user.tenantId, req.user.sub, id, body); }
  @Post(':id/archive') @Permissions('USER.ARCHIVE') archive(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: ArchiveDto) { return this.service.archive(req.user.tenantId, req.user.sub, id, body.reason); }
  @Post(':id/roles') @Permissions('USER.CONFIGURE') assignRole(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: AssignUserRoleDto) { return this.service.assignRole(req.user.tenantId, req.user.sub, id, body); }
}
