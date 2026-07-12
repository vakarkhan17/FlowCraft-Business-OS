import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuditService } from '../audit/audit.service';
import { ListQueryDto } from '../common/list-query.dto';
import { DigitalDnaService } from '../digital-dna/digital-dna.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto, UpdateCompanyDto } from './company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dna: DigitalDnaService,
    private readonly audit: AuditService
  ) {}

  async list(tenantId: string, query: ListQueryDto) {
    const where: Prisma.CompanyWhereInput = {
      tenantId,
      isDeleted: false,
      ...(query.status ? { status: query.status } : {}),
      ...(query.search ? { OR: [
        { companyCode: { contains: query.search, mode: 'insensitive' } },
        { companyName: { contains: query.search, mode: 'insensitive' } }
      ] } : {})
    };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.company.findMany({ where, include: { baseCurrency: true, _count: { select: { branches: true } } }, skip: (query.page - 1) * query.pageSize, take: query.pageSize, orderBy: { companyCode: query.sortOrder } }),
      this.prisma.company.count({ where })
    ]);
    return { data, meta: { page: query.page, pageSize: query.pageSize, total } };
  }

  async get(tenantId: string, id: string) {
    const record = await this.prisma.company.findFirst({ where: { id, tenantId, isDeleted: false }, include: { baseCurrency: true, branches: { where: { isDeleted: false } } } });
    if (!record) throw new NotFoundException('Company not found');
    return record;
  }

  async create(tenantId: string, userId: string, data: CreateCompanyDto) {
    try {
      const created = await this.prisma.company.create({ data: {
        ...data,
        companyCode: data.companyCode.toUpperCase(),
        tenantId,
        digitalDna: this.dna.create('CMP', data.countryCode ?? 'XX'),
        createdById: userId,
        updatedById: userId
      }, include: { baseCurrency: true } });
      await this.audit.record({ tenantId, companyId: created.id, recordId: created.id, recordDigitalDna: created.digitalDna, action: 'CREATE', userId, newValue: { companyCode: created.companyCode, companyName: created.companyName } });
      return created;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') throw new ConflictException('Company code already exists in this tenant');
      throw error;
    }
  }

  async update(tenantId: string, userId: string, id: string, data: UpdateCompanyDto) {
    const current = await this.get(tenantId, id);
    const updated = await this.prisma.company.update({ where: { id }, data: { ...data, updatedById: userId } });
    await this.audit.record({ tenantId, companyId: id, recordId: id, recordDigitalDna: current.digitalDna, action: 'UPDATE', userId, oldValue: { companyName: current.companyName, status: current.status }, newValue: { companyName: updated.companyName, status: updated.status } });
    return updated;
  }

  async archive(tenantId: string, userId: string, id: string, reason: string) {
    const current = await this.get(tenantId, id);
    const updated = await this.prisma.company.update({ where: { id }, data: { isDeleted: true, isActive: false, status: 'ARCHIVED', deletedAt: new Date(), deletedById: userId, deletionReason: reason } });
    await this.audit.record({ tenantId, companyId: id, recordId: id, recordDigitalDna: current.digitalDna, action: 'ARCHIVE', userId, reason, oldValue: { status: current.status }, newValue: { status: 'ARCHIVED' } });
    return updated;
  }

  listWarehouses(tenantId: string, companyId: string) {
    return this.prisma.warehouse.findMany({ where: { companyId, company: { tenantId } }, orderBy: { name: 'asc' } });
  }
}
