import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth.guard';
import { ListQueryDto } from '../common/list-query.dto';
import { Permissions } from '../common/permissions.decorator';
import { PermissionsGuard } from '../common/permissions.guard';
import type { AuthenticatedRequest } from '../common/request-context';
import { CreateExchangeRateDto } from './exchange-rate.dto';
import { ExchangeRatesService } from './exchange-rates.service';

@Controller('exchange-rates')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ExchangeRatesController {
  constructor(private readonly service: ExchangeRatesService) {}
  @Get() @Permissions('EXCHANGE_RATE.VIEW') list(@Req() req: AuthenticatedRequest, @Query() query: ListQueryDto) { return this.service.list(req.user.tenantId, query); }
  @Post() @Permissions('EXCHANGE_RATE.CREATE') create(@Req() req: AuthenticatedRequest, @Body() body: CreateExchangeRateDto) { return this.service.create(req.user.tenantId, body); }
  @Get(':id') @Permissions('EXCHANGE_RATE.VIEW') get(@Req() req: AuthenticatedRequest, @Param('id') id: string) { return this.service.get(req.user.tenantId, id); }
}
