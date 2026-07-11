import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../common/auth.guard';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../common/roles.guard';
import { WorkflowsService } from './workflows.service';

@Controller('workflows')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WorkflowsController {
  constructor(private readonly workflows: WorkflowsService) {}

  @Get()
  list(@Req() request: any) {
    return this.workflows.list(request.user.companyId);
  }

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  create(@Req() request: any, @Body() body: any) {
    return this.workflows.create(request.user.companyId, body);
  }

  @Patch(':id/steps')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  reorder(@Param('id') id: string, @Body() body: { steps: Array<{ id: string; stepOrder: number; isEnabled?: boolean }> }) {
    return this.workflows.reorderSteps(id, body.steps);
  }
}
