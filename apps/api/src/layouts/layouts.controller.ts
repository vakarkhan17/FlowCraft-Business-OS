import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../common/auth.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { LayoutsService } from './layouts.service';

@Controller('print-layouts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LayoutsController {
  constructor(private readonly layouts: LayoutsService) {}

  @Get()
  list(@Req() request: any) {
    return this.layouts.list(request.user.companyId);
  }

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  save(@Req() request: any, @Body() body: any) {
    return this.layouts.save(request.user.companyId, body);
  }
}
