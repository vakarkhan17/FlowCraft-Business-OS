import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { AuditService } from '../audit/audit.service';
import { ListQueryDto } from '../common/list-query.dto';
import { DigitalDnaService } from '../digital-dna/digital-dna.service';
import { PrismaService } from '../prisma/prisma.service';
import { AssignUserRoleDto, CreateUserDto, UpdateUserDto } from './user.dto';

const safeUser = { id: true, tenantId: true, digitalDna: true, username: true, email: true, fullName: true, defaultCompanyId: true, defaultBranchId: true, status: true, lastLoginAt: true, isActive: true, isDeleted: true, createdAt: true, updatedAt: true } as const;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService, private readonly dna: DigitalDnaService, private readonly audit: AuditService) {}

  async list(tenantId: string, query: ListQueryDto) {
    const where: Prisma.UserWhereInput = { tenantId, isDeleted: false, ...(query.status ? { status: query.status } : {}), ...(query.search ? { OR: [
      { username: { contains: query.search, mode: 'insensitive' } }, { email: { contains: query.search, mode: 'insensitive' } }, { fullName: { contains: query.search, mode: 'insensitive' } }
    ] } : {}) };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({ where, select: { ...safeUser, userRoles: { include: { role: true, company: true, branch: true } } }, skip: (query.page - 1) * query.pageSize, take: query.pageSize, orderBy: { username: query.sortOrder } }),
      this.prisma.user.count({ where })
    ]);
    return { data, meta: { page: query.page, pageSize: query.pageSize, total } };
  }

  async get(tenantId: string, id: string) {
    const record = await this.prisma.user.findFirst({ where: { id, tenantId, isDeleted: false }, select: { ...safeUser, userRoles: { include: { role: true, company: true, branch: true } } } });
    if (!record) throw new NotFoundException('User not found');
    return record;
  }

  async create(tenantId: string, actorId: string, data: CreateUserDto) {
    await this.validateScope(tenantId, data.defaultCompanyId, data.defaultBranchId);
    const tenant = await this.prisma.tenant.findUniqueOrThrow({ where: { id: tenantId } });
    try {
      const created = await this.prisma.user.create({ data: {
        tenantId,
        digitalDna: this.dna.create('USR', tenant.tenantCode),
        username: data.username,
        email: data.email.toLowerCase(),
        passwordHash: await bcrypt.hash(data.password, 12),
        fullName: data.fullName,
        defaultCompanyId: data.defaultCompanyId,
        defaultBranchId: data.defaultBranchId
      }, select: safeUser });
      await this.audit.record({ tenantId, companyId: data.defaultCompanyId, branchId: data.defaultBranchId, recordId: created.id, recordDigitalDna: created.digitalDna, action: 'CREATE', userId: actorId, newValue: { username: created.username, email: created.email } });
      return created;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') throw new ConflictException('Username or email already exists in this tenant');
      throw error;
    }
  }

  async update(tenantId: string, actorId: string, id: string, data: UpdateUserDto) {
    const current = await this.get(tenantId, id);
    if (data.defaultCompanyId) await this.validateScope(tenantId, data.defaultCompanyId, data.defaultBranchId);
    const updated = await this.prisma.user.update({ where: { id }, data: { ...data, email: data.email?.toLowerCase() }, select: safeUser });
    await this.audit.record({ tenantId, companyId: updated.defaultCompanyId, branchId: updated.defaultBranchId, recordId: id, recordDigitalDna: current.digitalDna, action: 'UPDATE', userId: actorId, oldValue: { email: current.email, status: current.status }, newValue: { email: updated.email, status: updated.status } });
    return updated;
  }

  async archive(tenantId: string, actorId: string, id: string, reason: string) {
    const current = await this.get(tenantId, id);
    const updated = await this.prisma.user.update({ where: { id }, data: { isDeleted: true, isActive: false, status: 'ARCHIVED' }, select: safeUser });
    await this.audit.record({ tenantId, companyId: current.defaultCompanyId, branchId: current.defaultBranchId, recordId: id, recordDigitalDna: current.digitalDna, action: 'ARCHIVE', userId: actorId, reason });
    return updated;
  }

  async assignRole(tenantId: string, actorId: string, userId: string, data: AssignUserRoleDto) {
    const [user, role] = await Promise.all([
      this.prisma.user.findFirst({ where: { id: userId, tenantId, isDeleted: false } }),
      this.prisma.accessRole.findFirst({ where: { id: data.roleId, tenantId, isActive: true } })
    ]);
    if (!user || !role) throw new NotFoundException('User or role not found');
    await this.validateScope(tenantId, data.companyId, data.branchId);
    const assignment = await this.prisma.userRole.findFirst({ where: { tenantId, userId, roleId: data.roleId, companyId: data.companyId, branchId: data.branchId ?? null } })
      ?? await this.prisma.userRole.create({ data: { tenantId, userId, roleId: data.roleId, companyId: data.companyId, branchId: data.branchId } });
    await this.audit.record({ tenantId, companyId: data.companyId, branchId: data.branchId, recordId: userId, recordDigitalDna: user.digitalDna, action: 'ROLE_ASSIGNMENT', userId: actorId, newValue: { roleCode: role.roleCode, companyId: data.companyId, branchId: data.branchId ?? null } });
    return assignment;
  }

  private async validateScope(tenantId: string, companyId: string, branchId?: string) {
    const company = await this.prisma.company.findFirst({ where: { id: companyId, tenantId, isDeleted: false } });
    if (!company) throw new ForbiddenException('Company is outside the tenant context');
    if (branchId) {
      const branch = await this.prisma.branch.findFirst({ where: { id: branchId, tenantId, companyId, isDeleted: false } });
      if (!branch) throw new ForbiddenException('Branch is outside the company context');
    }
  }
}
