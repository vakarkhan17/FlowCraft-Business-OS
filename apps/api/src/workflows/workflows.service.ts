import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkflowDto, UpdateWorkflowDto } from './workflow.dto';

@Injectable()
export class WorkflowsService {
  constructor(private readonly prisma: PrismaService, private readonly audit: AuditService) {}

  list(tenantId: string) {
    return this.prisma.workflowDefinition.findMany({ where: { tenantId }, include: { enterpriseObject: true, steps: { orderBy: { stepOrder: 'asc' } }, transitions: true }, orderBy: [{ workflowCode: 'asc' }, { version: 'desc' }] });
  }

  async get(tenantId: string, id: string) {
    const workflow = await this.prisma.workflowDefinition.findFirst({ where: { id, tenantId }, include: { enterpriseObject: true, steps: { orderBy: { stepOrder: 'asc' } }, transitions: true } });
    if (!workflow) throw new NotFoundException('Workflow not found');
    return workflow;
  }

  async create(tenantId: string, userId: string, data: CreateWorkflowDto) {
    const latest = await this.prisma.workflowDefinition.findFirst({ where: { tenantId, workflowCode: data.workflowCode.toUpperCase() }, orderBy: { version: 'desc' } });
    return this.prisma.workflowDefinition.create({ data: {
      tenantId,
      companyId: data.companyId,
      enterpriseObjectId: data.enterpriseObjectId,
      workflowCode: data.workflowCode.toUpperCase(),
      workflowName: data.workflowName,
      description: data.description,
      version: (latest?.version ?? 0) + 1,
      effectiveFrom: data.effectiveFrom ? new Date(data.effectiveFrom) : undefined,
      effectiveTo: data.effectiveTo ? new Date(data.effectiveTo) : undefined,
      createdById: userId,
      updatedById: userId
    }, include: { enterpriseObject: true } });
  }

  async update(tenantId: string, userId: string, id: string, data: UpdateWorkflowDto) {
    const current = await this.get(tenantId, id);
    if (current.isPublished) throw new BadRequestException('Published workflow versions are immutable; create a new version');
    return this.prisma.workflowDefinition.update({ where: { id }, data: { ...data, effectiveFrom: data.effectiveFrom ? new Date(data.effectiveFrom) : undefined, effectiveTo: data.effectiveTo ? new Date(data.effectiveTo) : undefined, updatedById: userId } });
  }

  async publish(tenantId: string, userId: string, id: string) {
    const current = await this.get(tenantId, id);
    if (current.isPublished) return current;
    const published = await this.prisma.workflowDefinition.update({ where: { id }, data: { isPublished: true, status: 'PUBLISHED', effectiveFrom: current.effectiveFrom ?? new Date(), updatedById: userId } });
    await this.audit.record({ tenantId, companyId: current.companyId, enterpriseObjectId: current.enterpriseObjectId, recordId: id, action: 'WORKFLOW_PUBLICATION', userId, newValue: { workflowCode: current.workflowCode, version: current.version, status: 'PUBLISHED' } });
    return published;
  }

  async reorderSteps(tenantId: string, workflowId: string, steps: Array<{ id: string; stepOrder: number; isEnabled?: boolean }>) {
    const workflow = await this.get(tenantId, workflowId);
    if (workflow.isPublished) throw new BadRequestException('Published workflow versions are immutable');
    await this.prisma.$transaction(steps.map((step) => this.prisma.workflowStep.update({ where: { id: step.id }, data: { stepOrder: step.stepOrder, ...(step.isEnabled === undefined ? {} : { isEnabled: step.isEnabled }) } })));
    return this.get(tenantId, workflowId);
  }
}
