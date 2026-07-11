import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ModuleCode, Role } from '@prisma/client';
import { JwtAuthGuard } from '../common/auth.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { CustomizationService } from './customization.service';

@Controller('customization')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomizationController {
  constructor(private readonly customization: CustomizationService) {}

  @Get('modules')
  modules(@Req() request: any) {
    return this.customization.moduleSettings(request.user.clientId);
  }

  @Post('modules')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  setModule(@Req() request: any, @Body() body: { module: ModuleCode; enabled: boolean; settings?: any }) {
    return this.customization.setModule(request.user.clientId, body.module, body.enabled, body.settings);
  }

  @Get('custom-fields')
  customFields(@Req() request: any, @Query('entityName') entityName?: string) {
    return this.customization.customFields(request.user.companyId, entityName);
  }

  @Post('custom-fields')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  createCustomField(@Req() request: any, @Body() body: any) {
    return this.customization.createCustomField(request.user.companyId, body);
  }

  @Post('custom-field-values')
  saveValue(@Body() body: { fieldId: string; recordId: string; recordType: string; value: any }) {
    return this.customization.saveCustomFieldValue(body);
  }

  @Get('numbering-series')
  numbering(@Req() request: any) {
    return this.customization.numberingSeries(request.user.companyId);
  }

  @Post('numbering-series')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  upsertNumbering(@Req() request: any, @Body() body: any) {
    return this.customization.upsertNumberingSeries(request.user.companyId, body);
  }
}
