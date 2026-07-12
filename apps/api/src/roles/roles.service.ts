import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuditService } from '../audit/audit.service';
import { PrismaService } from '../prisma/prisma.service';
import { AssignPermissionsDto, CreateRoleDto, UpdateRoleDto } from './role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService, private readonly audit: AuditService) {}

  list(tenantId: string) {
    return this.prisma.accessRole.findMany({ where: { tenantId }, include: { permissions: { include: { permission: true } }, _count: { select: { userRoles: true } } }, orderBy: { roleName: 'asc' } });
  }

  async create(tenantId: string, data: CreateRoleDto) {
    try {
      return await this.prisma.accessRole.create({ data: { ...data, tenantId, roleCode: data.roleCode.toUpperCase() } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') throw new ConflictException('Role code already exists');
      throw error;
    }
  }

  async update(tenantId: string, id: string, data: UpdateRoleDto) {
    const role = await this.prisma.accessRole.findFirst({ where: { id, tenantId } });
    if (!role) throw new NotFoundException('Role not found');
    return this.prisma.accessRole.update({ where: { id }, data });
  }

  permissions() {
    return this.prisma.permission.findMany({ where: { status: 'ACTIVE' }, include: { enterpriseObject: true }, orderBy: { permissionCode: 'asc' } });
  }

  async assignPermissions(tenantId: string, actorId: string, roleId: string, data: AssignPermissionsDto) {
    const role = await this.prisma.accessRole.findFirst({ where: { id: roleId, tenantId } });
    if (!role) throw new NotFoundException('Role not found');
    const permissions = await this.prisma.permission.findMany({ where: { id: { in: data.permissionIds }, status: 'ACTIVE' } });
    if (permissions.length !== new Set(data.permissionIds).size) throw new NotFoundException('One or more permissions were not found');
    await this.prisma.$transaction(permissions.map((permission) => this.prisma.rolePermission.upsert({
      where: { tenantId_roleId_permissionId: { tenantId, roleId, permissionId: permission.id } },
      update: { allowed: data.allowed },
      create: { tenantId, roleId, permissionId: permission.id, allowed: data.allowed }
    })));
    await this.audit.record({ tenantId, recordId: roleId, action: 'PERMISSION_ASSIGNMENT', userId: actorId, newValue: { permissionCodes: permissions.map((permission) => permission.permissionCode), allowed: data.allowed } });
    return this.prisma.accessRole.findUnique({ where: { id: roleId }, include: { permissions: { include: { permission: true } } } });
  }
}
