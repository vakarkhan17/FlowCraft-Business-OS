import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ArchiveDto } from '../companies/company.dto';
import { JwtAuthGuard } from '../common/auth.guard';
import { ListQueryDto } from '../common/list-query.dto';
import { Permissions } from '../common/permissions.decorator';
import { PermissionsGuard } from '../common/permissions.guard';
import type { AuthenticatedRequest } from '../common/request-context';
import { CreateBranchDto, UpdateBranchDto } from './branch.dto';
import { BranchesService } from './branches.service';

@Controller('branches')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class BranchesController {
  constructor(private readonly service: BranchesService) {}
  @Get() @Permissions('BRANCH.VIEW') list(@Req() req: AuthenticatedRequest, @Query() query: ListQueryDto) { return this.service.list(req.user.tenantId, req.user.isSuperAdmin ? null : req.user.companyId, query); }
  @Post() @Permissions('BRANCH.CREATE') create(@Req() req: AuthenticatedRequest, @Body() body: CreateBranchDto) { return this.service.create(req.user.tenantId, req.user.sub, body); }
  @Get(':id') @Permissions('BRANCH.VIEW') get(@Req() req: AuthenticatedRequest, @Param('id') id: string) { return this.service.get(req.user.tenantId, id); }
  @Patch(':id') @Permissions('BRANCH.EDIT') update(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: UpdateBranchDto) { return this.service.update(req.user.tenantId, req.user.sub, id, body); }
  @Post(':id/archive') @Permissions('BRANCH.ARCHIVE') archive(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: ArchiveDto) { return this.service.archive(req.user.tenantId, req.user.sub, id, body.reason); }
}
