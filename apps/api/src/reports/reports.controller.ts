import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../common/auth.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportsController {
  constructor(private readonly reports: ReportsService) {}

  @Get()
  definitions(@Req() request: any) {
    return this.reports.definitions(request.user.companyId);
  }

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  create(@Req() request: any, @Body() body: any) {
    return this.reports.create(request.user.companyId, body);
  }

  @Get(':id/preview')
  preview(@Req() request: any, @Param('id') id: string) {
    return this.reports.preview(request.user.companyId, id);
  }
}
