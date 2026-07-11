import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuditService } from '../audit/audit.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNumberSeriesDto, UpdateNumberSeriesDto } from './number-series.dto';

@Injectable()
export class NumberSeriesService {
  constructor(private readonly prisma: PrismaService, private readonly audit: AuditService) {}
  async list(tenantId: string) {
    const records = await this.prisma.numberSeries.findMany({ where: { tenantId }, include: { company: true, branch: true, enterpriseObject: true }, orderBy: { seriesCode: 'asc' } });
    return records.map((record) => ({ ...record, currentNumber: record.currentNumber.toString() }));
  }

  async create(tenantId: string, userId: string, data: CreateNumberSeriesDto) {
    const company = await this.prisma.company.findFirst({ where: { id: data.companyId, tenantId, isDeleted: false } });
    if (!company) throw new ForbiddenException('Company is outside the tenant context');
    if (data.branchId && !await this.prisma.branch.findFirst({ where: { id: data.branchId, tenantId, companyId: data.companyId, isDeleted: false } })) throw new ForbiddenException('Branch is outside the company context');
    const created = await this.prisma.numberSeries.create({ data: { ...data, tenantId, seriesCode: data.seriesCode.toUpperCase() } });
    await this.audit.record({ tenantId, companyId: data.companyId, branchId: data.branchId, enterpriseObjectId: data.enterpriseObjectId, recordId: created.id, action: 'NUMBER_SERIES_CONFIGURATION', userId, newValue: { seriesCode: created.seriesCode, prefix: created.prefix, suffix: created.suffix } });
    return { ...created, currentNumber: created.currentNumber.toString() };
  }

  async update(tenantId: string, userId: string, id: string, data: UpdateNumberSeriesDto) {
    const current = await this.prisma.numberSeries.findFirst({ where: { id, tenantId } });
    if (!current) throw new NotFoundException('Number series not found');
    const updated = await this.prisma.numberSeries.update({ where: { id }, data });
    await this.audit.record({ tenantId, companyId: current.companyId, branchId: current.branchId, enterpriseObjectId: current.enterpriseObjectId, recordId: id, action: 'NUMBER_SERIES_CONFIGURATION', userId, oldValue: { prefix: current.prefix, suffix: current.suffix }, newValue: { prefix: updated.prefix, suffix: updated.suffix } });
    return { ...updated, currentNumber: updated.currentNumber.toString() };
  }

  async next(tenantId: string, userId: string, id: string) {
    const record = await this.prisma.$transaction(async (tx) => {
      const existing = await tx.numberSeries.findFirst({ where: { id, tenantId, isActive: true, status: 'ACTIVE' } });
      if (!existing) throw new NotFoundException('Active number series not found');
      return tx.numberSeries.update({ where: { id }, data: { currentNumber: { increment: 1 } } });
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
    const numeric = record.currentNumber.toString().padStart(record.paddingLength, '0');
    const generatedNumber = `${record.prefix}${numeric}${record.suffix}`;
    await this.audit.record({ tenantId, companyId: record.companyId, branchId: record.branchId, enterpriseObjectId: record.enterpriseObjectId, recordId: id, action: 'NUMBER_GENERATED', userId, newValue: { generatedNumber } });
    return { generatedNumber, currentNumber: record.currentNumber.toString() };
  }
}
