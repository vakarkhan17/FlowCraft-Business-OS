import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth.guard';
import { ListQueryDto } from '../common/list-query.dto';
import { Permissions } from '../common/permissions.decorator';
import { PermissionsGuard } from '../common/permissions.guard';
import { CreateEnterpriseObjectDto, CreateObjectFieldDto, CreateObjectRelationshipDto, UpdateEnterpriseObjectDto } from './enterprise-object.dto';
import { EnterpriseObjectsService } from './enterprise-objects.service';

@Controller('enterprise-objects')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class EnterpriseObjectsController {
  constructor(private readonly service: EnterpriseObjectsService) {}
  @Get() @Permissions('ENTERPRISE_OBJECT.VIEW') list(@Query() query: ListQueryDto) { return this.service.list(query); }
  @Post() @Permissions('ENTERPRISE_OBJECT.CREATE') create(@Body() body: CreateEnterpriseObjectDto) { return this.service.create(body); }
  @Get(':id') @Permissions('ENTERPRISE_OBJECT.VIEW') get(@Param('id') id: string) { return this.service.get(id); }
  @Patch(':id') @Permissions('ENTERPRISE_OBJECT.EDIT') update(@Param('id') id: string, @Body() body: UpdateEnterpriseObjectDto) { return this.service.update(id, body); }
  @Get(':id/fields') @Permissions('ENTERPRISE_OBJECT.VIEW') fields(@Param('id') id: string) { return this.service.fields(id); }
  @Post(':id/fields') @Permissions('ENTERPRISE_OBJECT.CONFIGURE') createField(@Param('id') id: string, @Body() body: CreateObjectFieldDto) { return this.service.createField(id, body); }
  @Get(':id/relationships') @Permissions('ENTERPRISE_OBJECT.VIEW') relationships(@Param('id') id: string) { return this.service.relationships(id); }
  @Post(':id/relationships') @Permissions('ENTERPRISE_OBJECT.CONFIGURE') createRelationship(@Param('id') id: string, @Body() body: CreateObjectRelationshipDto) { return this.service.createRelationship(id, body); }
}
