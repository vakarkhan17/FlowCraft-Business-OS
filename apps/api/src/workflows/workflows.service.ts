import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkflowsService {
  constructor(private readonly prisma: PrismaService) {}

  list(companyId: string) {
    return this.prisma.workflowDefinition.findMany({
      where: { companyId },
      include: { steps: { orderBy: { stepOrder: 'asc' } }, transitions: true },
      orderBy: { updatedAt: 'desc' }
    });
  }

  create(companyId: string, data: any) {
    return this.prisma.workflowDefinition.create({
      data: {
        companyId,
        module: data.module,
        name: data.name,
        description: data.description,
        steps: {
          create: (data.steps ?? []).map((step: any, index: number) => ({
            name: step.name,
            code: step.code,
            stepOrder: step.stepOrder ?? index + 1,
            isEnabled: step.isEnabled ?? true,
            config: step.config ?? {}
          }))
        }
      },
      include: { steps: true, transitions: true }
    });
  }

  async reorderSteps(workflowId: string, steps: Array<{ id: string; stepOrder: number; isEnabled?: boolean }>) {
    await this.prisma.$transaction(
      steps.map((step) =>
        this.prisma.workflowStep.update({
          where: { id: step.id },
          data: { stepOrder: step.stepOrder, ...(step.isEnabled === undefined ? {} : { isEnabled: step.isEnabled }) }
        })
      )
    );

    return this.prisma.workflowDefinition.findUnique({
      where: { id: workflowId },
      include: { steps: { orderBy: { stepOrder: 'asc' } }, transitions: true }
    });
  }
}
