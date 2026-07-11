import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  definitions(companyId: string) {
    return this.prisma.reportDefinition.findMany({
      where: { companyId },
      include: { fields: { orderBy: { sortOrder: 'asc' } }, filters: true },
      orderBy: { name: 'asc' }
    });
  }

  create(companyId: string, data: any) {
    return this.prisma.reportDefinition.create({
      data: {
        companyId,
        module: data.module,
        name: data.name,
        baseEntity: data.baseEntity,
        description: data.description,
        settings: data.settings ?? {},
        fields: {
          create: (data.fields ?? []).map((field: any, index: number) => ({
            fieldPath: field.fieldPath,
            label: field.label,
            dataType: field.dataType,
            sortOrder: field.sortOrder ?? index + 1,
            grouping: field.grouping ?? false,
            aggregation: field.aggregation,
            formula: field.formula
          }))
        },
        filters: {
          create: (data.filters ?? []).map((filter: any) => ({
            fieldPath: filter.fieldPath,
            operator: filter.operator,
            value: filter.value,
            isRequired: filter.isRequired ?? false
          }))
        }
      },
      include: { fields: true, filters: true }
    });
  }

  async preview(companyId: string, reportId: string) {
    const report = await this.prisma.reportDefinition.findFirstOrThrow({
      where: { id: reportId, companyId },
      include: { fields: { orderBy: { sortOrder: 'asc' } }, filters: true }
    });

    const rows = await this.prisma.transactionDocument.findMany({
      where: { companyId },
      take: 50,
      orderBy: { createdAt: 'desc' }
    });

    return {
      report,
      rows,
      exportFormats: ['xlsx', 'pdf']
    };
  }
}
