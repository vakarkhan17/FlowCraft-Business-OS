import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth.guard';
import { ListQueryDto } from '../common/list-query.dto';
import { Permissions } from '../common/permissions.decorator';
import { PermissionsGuard } from '../common/permissions.guard';
import { CreateCurrencyDto, UpdateCurrencyDto } from './currency.dto';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CurrenciesController {
  constructor(private readonly service: CurrenciesService) {}
  @Get() @Permissions('CURRENCY.VIEW') list(@Query() query: ListQueryDto) { return this.service.list(query); }
  @Post() @Permissions('CURRENCY.CREATE') create(@Body() body: CreateCurrencyDto) { return this.service.create(body); }
  @Get(':id') @Permissions('CURRENCY.VIEW') get(@Param('id') id: string) { return this.service.get(id); }
  @Patch(':id') @Permissions('CURRENCY.EDIT') update(@Param('id') id: string, @Body() body: UpdateCurrencyDto) { return this.service.update(id, body); }
  @Post(':id/archive') @Permissions('CURRENCY.ARCHIVE') archive(@Param('id') id: string) { return this.service.archive(id); }
}
