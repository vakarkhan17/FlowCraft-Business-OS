import { Body, Controller, ForbiddenException, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth.guard';
import { ListQueryDto } from '../common/list-query.dto';
import { PermissionsGuard } from '../common/permissions.guard';
import type { AuthenticatedRequest, AuthenticatedUser } from '../common/request-context';
import { CreateExportJobDto, CreateImportJobDto, DuplicateCheckDto, MasterDataArchiveDto, MasterDataPayloadDto } from './master-data.dto';
import { masterResource } from './master-data.registry';
import { MasterDataService } from './master-data.service';

@Controller('master-data')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class MasterDataController {
  constructor(private readonly masters: MasterDataService) {}

  @Get('resources')
  resources(@Req() req: AuthenticatedRequest) { this.assertPermission(req.user, 'MASTER_DATA', 'VIEW'); return this.masters.resources(); }

  @Get('dashboard')
  dashboard(@Req() req: AuthenticatedRequest) { this.assertPermission(req.user, 'MASTER_DATA', 'VIEW'); return this.masters.dashboard(req.user); }

  @Get('openapi')
  openApi(@Req() req: AuthenticatedRequest) { this.assertPermission(req.user, 'MASTER_DATA', 'VIEW'); return this.masters.openApi(); }

  @Get('search')
  search(@Req() req: AuthenticatedRequest, @Query('q') query: string) { this.assertPermission(req.user, 'MASTER_DATA', 'VIEW'); return this.masters.search(req.user, query); }

  @Post('duplicate-check')
  duplicateCheck(@Req() req: AuthenticatedRequest, @Body() body: DuplicateCheckDto) { this.assertResource(req.user, body.resource, 'VIEW'); return this.masters.duplicateCheck(req.user, body.resource, body.candidate); }

  @Post('merge-history')
  merge(@Req() req: AuthenticatedRequest, @Body() body: MasterDataPayloadDto) { this.assertPermission(req.user, 'MASTER_DATA_MERGE_HISTORY', 'CREATE'); return this.masters.recordMerge(req.user, body.data); }

  @Get('imports')
  imports(@Req() req: AuthenticatedRequest) { this.assertPermission(req.user, 'MASTER_IMPORT_JOB', 'VIEW'); return this.masters.listImports(req.user); }

  @Post('imports')
  createImport(@Req() req: AuthenticatedRequest, @Body() body: CreateImportJobDto) { this.assertPermission(req.user, 'MASTER_IMPORT_JOB', 'IMPORT'); this.assertResource(req.user, body.resource, 'CREATE'); return this.masters.createImport(req.user, body); }

  @Get('exports')
  exports(@Req() req: AuthenticatedRequest) { this.assertPermission(req.user, 'MASTER_EXPORT_JOB', 'VIEW'); return this.masters.listExports(req.user); }

  @Post('exports')
  createExport(@Req() req: AuthenticatedRequest, @Body() body: CreateExportJobDto) { this.assertPermission(req.user, 'MASTER_EXPORT_JOB', 'EXPORT'); this.assertResource(req.user, body.resource, 'VIEW'); return this.masters.createExport(req.user, body); }

  @Get('geography/:resource')
  geographyList(@Req() req: AuthenticatedRequest, @Param('resource') resource: string, @Query() query: ListQueryDto) { this.assertGeography(resource); this.assertResource(req.user, resource, 'VIEW'); return this.masters.list(req.user, resource, query); }

  @Post('geography/:resource')
  geographyCreate(@Req() req: AuthenticatedRequest, @Param('resource') resource: string, @Body() body: MasterDataPayloadDto) { this.assertGeography(resource); this.assertResource(req.user, resource, 'CREATE'); return this.masters.create(req.user, resource, body.data); }

  @Get(':resource')
  list(@Req() req: AuthenticatedRequest, @Param('resource') resource: string, @Query() query: ListQueryDto) { this.assertResource(req.user, resource, 'VIEW'); return this.masters.list(req.user, resource, query); }

  @Post(':resource')
  create(@Req() req: AuthenticatedRequest, @Param('resource') resource: string, @Body() body: MasterDataPayloadDto) { this.assertResource(req.user, resource, 'CREATE'); return this.masters.create(req.user, resource, body.data); }

  @Get(':resource/:id')
  get(@Req() req: AuthenticatedRequest, @Param('resource') resource: string, @Param('id') id: string) { this.assertResource(req.user, resource, 'VIEW'); return this.masters.get(req.user, resource, id); }

  @Patch(':resource/:id')
  update(@Req() req: AuthenticatedRequest, @Param('resource') resource: string, @Param('id') id: string, @Body() body: MasterDataPayloadDto) { this.assertResource(req.user, resource, 'EDIT'); return this.masters.update(req.user, resource, id, body.data); }

  @Post(':resource/:id/archive')
  archive(@Req() req: AuthenticatedRequest, @Param('resource') resource: string, @Param('id') id: string, @Body() body: MasterDataArchiveDto) { this.assertResource(req.user, resource, 'ARCHIVE'); return this.masters.archive(req.user, resource, id, body.reason); }

  private assertGeography(resource: string) { if (!['countries','states','cities','territories'].includes(resource)) throw new ForbiddenException('Unknown geography resource'); }

  private assertResource(user: AuthenticatedUser, resource: string, action: string) {
    const config = masterResource(resource);
    if (!config) throw new ForbiddenException('Unknown master-data resource');
    this.assertPermission(user, config.objectCode, action);
  }

  private assertPermission(user: AuthenticatedUser, objectCode: string, action: string) {
    if (user.isSuperAdmin || user.permissions.includes(`${objectCode}.${action}`) || user.permissions.includes(`MASTER_DATA.${action}`)) return;
    throw new ForbiddenException('Insufficient master-data permission');
  }
}
