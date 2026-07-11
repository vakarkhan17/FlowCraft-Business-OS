import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../common/auth.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { MastersService } from './masters.service';

@Controller('masters')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MastersController {
  constructor(private readonly masters: MastersService) {}

  @Get('items')
  items(@Req() request: any) {
    return this.masters.items(request.user.companyId);
  }

  @Post('items')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.WAREHOUSE)
  createItem(@Req() request: any, @Body() body: any) {
    return this.masters.createItem(request.user.companyId, body);
  }

  @Get('suppliers')
  suppliers(@Req() request: any) {
    return this.masters.suppliers(request.user.companyId);
  }

  @Post('suppliers')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.PURCHASING)
  createSupplier(@Req() request: any, @Body() body: any) {
    return this.masters.createSupplier(request.user.companyId, body);
  }

  @Get('customers')
  customers(@Req() request: any) {
    return this.masters.customers(request.user.companyId);
  }

  @Post('customers')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.SALES)
  createCustomer(@Req() request: any, @Body() body: any) {
    return this.masters.createCustomer(request.user.companyId, body);
  }
}
