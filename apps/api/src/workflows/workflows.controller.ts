import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/auth.guard';
import { Permissions } from '../common/permissions.decorator';
import { PermissionsGuard } from '../common/permissions.guard';
import type { AuthenticatedRequest } from '../common/request-context';
import { CreateWorkflowDto, PublishWorkflowDto, UpdateWorkflowDto } from './workflow.dto';
import { WorkflowsService } from './workflows.service';

@Controller('workflows')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class WorkflowsController {
  constructor(private readonly service: WorkflowsService) {}
  @Get() @Permissions('WORKFLOW.VIEW') list(@Req() req: AuthenticatedRequest) { return this.service.list(req.user.tenantId); }
  @Post() @Permissions('WORKFLOW.CREATE') create(@Req() req: AuthenticatedRequest, @Body() body: CreateWorkflowDto) { return this.service.create(req.user.tenantId, req.user.sub, body); }
  @Get(':id') @Permissions('WORKFLOW.VIEW') get(@Req() req: AuthenticatedRequest, @Param('id') id: string) { return this.service.get(req.user.tenantId, id); }
  @Patch(':id') @Permissions('WORKFLOW.EDIT') update(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: UpdateWorkflowDto) { return this.service.update(req.user.tenantId, req.user.sub, id, body); }
  @Post(':id/publish') @Permissions('WORKFLOW.APPROVE') publish(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() _body: PublishWorkflowDto) { return this.service.publish(req.user.tenantId, req.user.sub, id); }
  @Patch(':id/steps') @Permissions('WORKFLOW.CONFIGURE') reorder(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() steps: Array<{ id: string; stepOrder: number; isEnabled?: boolean }>) { return this.service.reorderSteps(req.user.tenantId, id, steps); }
}
