import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth.guard';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  @Get()
  summary(@Req() request: any) {
    return this.dashboard.summary(request.user.companyId);
  }

  @Get('financial-reports')
  financialReports(@Req() request: any) {
    return this.dashboard.financialReports(request.user.companyId);
  }
}
