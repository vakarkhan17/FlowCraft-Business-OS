import { Injectable } from '@nestjs/common';
import { ModuleCode } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomizationService {
  constructor(private readonly prisma: PrismaService) {}

  moduleSettings(clientId: string) {
    return this.prisma.moduleSetting.findMany({ where: { clientId }, orderBy: { module: 'asc' } });
  }

  setModule(clientId: string, module: ModuleCode, enabled: boolean, settings: any = {}) {
    return this.prisma.moduleSetting.upsert({
      where: { clientId_module: { clientId, module } },
      update: { enabled, settings },
      create: { clientId, module, enabled, settings }
    });
  }

  customFields(companyId: string, entityName?: string) {
    return this.prisma.customField.findMany({
      where: { companyId, ...(entityName ? { entityName } : {}) },
      include: { values: false },
      orderBy: [{ entityName: 'asc' }, { sortOrder: 'asc' }]
    });
  }

  createCustomField(companyId: string, data: any) {
    return this.prisma.customField.create({ data: { ...data, companyId } });
  }

  saveCustomFieldValue(data: { fieldId: string; recordId: string; recordType: string; value: any }) {
    return this.prisma.customFieldValue.create({ data });
  }

  numberingSeries(companyId: string) {
    return this.prisma.numberSeries.findMany({
      where: { companyId },
      orderBy: { seriesCode: 'asc' }
    });
  }

  upsertNumberingSeries(companyId: string, data: { id: string; prefix?: string; suffix?: string; isActive?: boolean }) {
    return this.prisma.numberSeries.update({ where: { id: data.id, companyId }, data: { prefix: data.prefix, suffix: data.suffix, isActive: data.isActive } });
  }
}
