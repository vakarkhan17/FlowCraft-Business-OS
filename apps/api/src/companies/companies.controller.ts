import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../common/auth.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { CompaniesService } from './companies.service';

@Controller('companies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompaniesController {
  constructor(private readonly companies: CompaniesService) {}

  @Get()
  list(@Req() request: any) {
    return this.companies.listCompanies(request.user.clientId);
  }

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  create(@Req() request: any, @Body() body: { name: string; legalName?: string; baseCurrency?: string }) {
    return this.companies.createCompany(request.user.clientId, body);
  }

  @Get('branches')
  branches(@Query('companyId') companyId: string, @Req() request: any) {
    return this.companies.listBranches(companyId ?? request.user.companyId);
  }

  @Post('branches')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  createBranch(@Req() request: any, @Body() body: { companyId?: string; code: string; name: string; address?: string }) {
    return this.companies.createBranch(body.companyId ?? request.user.companyId, body);
  }

  @Get('warehouses')
  warehouses(@Query('companyId') companyId: string, @Req() request: any) {
    return this.companies.listWarehouses(companyId ?? request.user.companyId);
  }

  @Post('warehouses')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  createWarehouse(@Req() request: any, @Body() body: { companyId?: string; branchId?: string; code: string; name: string }) {
    return this.companies.createWarehouse(body.companyId ?? request.user.companyId, body);
  }
}
