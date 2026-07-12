import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth.guard';
import { ListQueryDto } from '../common/list-query.dto';
import { Permissions } from '../common/permissions.decorator';
import { PermissionsGuard } from '../common/permissions.guard';
import type { AuthenticatedRequest } from '../common/request-context';
import { TenantContextService } from '../common/tenant-context.service';
import { ArchiveDto, CreateCompanyDto, UpdateCompanyDto } from './company.dto';
import { CompaniesService } from './companies.service';

@Controller('companies')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CompaniesController {
  constructor(private readonly service: CompaniesService, private readonly context: TenantContextService) {}
  @Get() @Permissions('COMPANY.VIEW') list(@Req() req: AuthenticatedRequest, @Query() query: ListQueryDto) { return this.service.list(req.user.tenantId, query); }
  @Post() @Permissions('COMPANY.CREATE') create(@Req() req: AuthenticatedRequest, @Body() body: CreateCompanyDto) { return this.service.create(req.user.tenantId, req.user.sub, body); }
  @Get(':id') @Permissions('COMPANY.VIEW') get(@Req() req: AuthenticatedRequest, @Param('id') id: string) { return this.service.get(req.user.tenantId, this.context.companyId(req.user, id)); }
  @Patch(':id') @Permissions('COMPANY.EDIT') update(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: UpdateCompanyDto) { return this.service.update(req.user.tenantId, req.user.sub, this.context.companyId(req.user, id), body); }
  @Post(':id/archive') @Permissions('COMPANY.ARCHIVE') archive(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: ArchiveDto) { return this.service.archive(req.user.tenantId, req.user.sub, this.context.companyId(req.user, id), body.reason); }
  @Get(':id/warehouses') @Permissions('COMPANY.VIEW') warehouses(@Req() req: AuthenticatedRequest, @Param('id') id: string) { return this.service.listWarehouses(req.user.tenantId, this.context.companyId(req.user, id)); }
}
