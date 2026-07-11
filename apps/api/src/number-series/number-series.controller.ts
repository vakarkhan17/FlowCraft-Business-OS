import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth.guard';
import { Permissions } from '../common/permissions.decorator';
import { PermissionsGuard } from '../common/permissions.guard';
import type { AuthenticatedRequest } from '../common/request-context';
import { CreateNumberSeriesDto, UpdateNumberSeriesDto } from './number-series.dto';
import { NumberSeriesService } from './number-series.service';

@Controller('number-series')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class NumberSeriesController {
  constructor(private readonly service: NumberSeriesService) {}
  @Get() @Permissions('NUMBER_SERIES.VIEW') list(@Req() req: AuthenticatedRequest) { return this.service.list(req.user.tenantId); }
  @Post() @Permissions('NUMBER_SERIES.CREATE') create(@Req() req: AuthenticatedRequest, @Body() body: CreateNumberSeriesDto) { return this.service.create(req.user.tenantId, req.user.sub, body); }
  @Patch(':id') @Permissions('NUMBER_SERIES.EDIT') update(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: UpdateNumberSeriesDto) { return this.service.update(req.user.tenantId, req.user.sub, id, body); }
  @Post(':id/next') @Permissions('NUMBER_SERIES.CONFIGURE') next(@Req() req: AuthenticatedRequest, @Param('id') id: string) { return this.service.next(req.user.tenantId, req.user.sub, id); }
}
