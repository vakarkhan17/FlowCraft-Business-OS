import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuditService } from '../audit/audit.service';
import { ListQueryDto } from '../common/list-query.dto';
import { DigitalDnaService } from '../digital-dna/digital-dna.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBranchDto, UpdateBranchDto } from './branch.dto';

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService, private readonly dna: DigitalDnaService, private readonly audit: AuditService) {}

  async list(tenantId: string, companyId: string | null, query: ListQueryDto) {
    const where: Prisma.BranchWhereInput = { tenantId, isDeleted: false, ...(companyId ? { companyId } : {}), ...(query.status ? { status: query.status } : {}), ...(query.search ? { OR: [
      { branchCode: { contains: query.search, mode: 'insensitive' } }, { branchName: { contains: query.search, mode: 'insensitive' } }
    ] } : {}) };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.branch.findMany({ where, include: { company: true }, skip: (query.page - 1) * query.pageSize, take: query.pageSize, orderBy: { branchCode: query.sortOrder } }),
      this.prisma.branch.count({ where })
    ]);
    return { data, meta: { page: query.page, pageSize: query.pageSize, total } };
  }

  async get(tenantId: string, id: string) {
    const record = await this.prisma.branch.findFirst({ where: { id, tenantId, isDeleted: false }, include: { company: true } });
    if (!record) throw new NotFoundException('Branch not found');
    return record;
  }

  async create(tenantId: string, userId: string, data: CreateBranchDto) {
    const company = await this.prisma.company.findFirst({ where: { id: data.companyId, tenantId, isDeleted: false } });
    if (!company) throw new ForbiddenException('Company is outside the tenant context');
    try {
      const created = await this.prisma.branch.create({ data: { ...data, tenantId, branchCode: data.branchCode.toUpperCase(), digitalDna: this.dna.create('BRN', company.companyCode), createdById: userId, updatedById: userId } });
      await this.audit.record({ tenantId, companyId: data.companyId, branchId: created.id, recordId: created.id, recordDigitalDna: created.digitalDna, action: 'CREATE', userId, newValue: { branchCode: created.branchCode, branchName: created.branchName } });
      return created;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') throw new ConflictException('Branch code already exists in this company');
      throw error;
    }
  }

  async update(tenantId: string, userId: string, id: string, data: UpdateBranchDto) {
    const current = await this.get(tenantId, id);
    const updated = await this.prisma.branch.update({ where: { id }, data: { ...data, updatedById: userId } });
    await this.audit.record({ tenantId, companyId: current.companyId, branchId: id, recordId: id, recordDigitalDna: current.digitalDna, action: 'UPDATE', userId, oldValue: { branchName: current.branchName, status: current.status }, newValue: { branchName: updated.branchName, status: updated.status } });
    return updated;
  }

  async archive(tenantId: string, userId: string, id: string, reason: string) {
    const current = await this.get(tenantId, id);
    const updated = await this.prisma.branch.update({ where: { id }, data: { isDeleted: true, isActive: false, status: 'ARCHIVED', deletedAt: new Date(), deletedById: userId, deletionReason: reason } });
    await this.audit.record({ tenantId, companyId: current.companyId, branchId: id, recordId: id, recordDigitalDna: current.digitalDna, action: 'ARCHIVE', userId, reason });
    return updated;
  }
}
