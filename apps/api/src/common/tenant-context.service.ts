import { ForbiddenException, Injectable } from '@nestjs/common';
import type { AuthenticatedUser } from './request-context';

@Injectable()
export class TenantContextService {
  tenantId(user: AuthenticatedUser): string {
    if (!user.tenantId) throw new ForbiddenException('Tenant context is required');
    return user.tenantId;
  }

  companyId(user: AuthenticatedUser, requested?: string | null): string {
    const companyId = requested ?? user.companyId;
    if (!companyId) throw new ForbiddenException('Company context is required');
    if (!user.isSuperAdmin && companyId !== user.companyId) {
      throw new ForbiddenException('Company access denied');
    }
    return companyId;
  }

  branchId(user: AuthenticatedUser, requested?: string | null): string | null {
    const branchId = requested ?? user.branchId;
    if (branchId && !user.isSuperAdmin && user.branchId && branchId !== user.branchId) {
      throw new ForbiddenException('Branch access denied');
    }
    return branchId;
  }
}
