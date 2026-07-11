import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import type { AuthenticatedRequest } from './request-context';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const header = request.headers.authorization as string | undefined;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;

    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }

    try {
      const payload = await this.jwtService.verifyAsync<{ sub: string }>(token);
      const user = await this.prisma.user.findFirst({
        where: { id: payload.sub, isActive: true, isDeleted: false, status: 'ACTIVE' },
        include: {
          userRoles: {
            include: { role: { include: { permissions: { include: { permission: true } } } } }
          }
        }
      });
      if (!user) throw new UnauthorizedException('User is inactive or unavailable');
      const roles = user.userRoles.filter((assignment) => assignment.role.isActive).map((assignment) => assignment.role.roleCode);
      const permissions = user.userRoles.flatMap((assignment) =>
        assignment.role.permissions.filter((entry) => entry.allowed).map((entry) => entry.permission.permissionCode)
      );
      request.user = {
        sub: user.id,
        email: user.email,
        tenantId: user.tenantId,
        clientId: user.tenantId,
        companyId: user.defaultCompanyId,
        branchId: user.defaultBranchId,
        roles,
        permissions: [...new Set(permissions)],
        isSuperAdmin: roles.includes('SUPER_ADMIN')
      };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid bearer token');
    }
  }
}
