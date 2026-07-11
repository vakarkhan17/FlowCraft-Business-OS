import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email: { equals: email, mode: 'insensitive' } },
      include: {
        tenant: true,
        company: true,
        branch: true,
        userRoles: {
          include: { role: { include: { permissions: { include: { permission: true } } } } }
        }
      }
    });

    if (!user || !user.isActive || user.isDeleted || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const roles = user.userRoles.filter((assignment) => assignment.role.isActive).map((assignment) => assignment.role.roleCode);
    const permissions = [...new Set(user.userRoles.flatMap((assignment) =>
      assignment.role.permissions.filter((entry) => entry.allowed).map((entry) => entry.permission.permissionCode)
    ))];
    const payload = {
      sub: user.id,
      email: user.email,
      roles,
      permissions,
      tenantId: user.tenantId,
      clientId: user.tenantId,
      companyId: user.defaultCompanyId,
      branchId: user.defaultBranchId
    };

    await this.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

    return {
      accessToken: await this.jwt.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.fullName,
        fullName: user.fullName,
        roles,
        permissions,
        tenant: user.tenant,
        client: user.tenant,
        company: user.company,
        branch: user.branch
      }
    };
  }

  async profile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        legacyRoles: true,
        tenant: true,
        company: true,
        branch: true,
        userRoles: { include: { role: true } }
      }
    });
  }
}
