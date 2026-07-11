export interface AuthenticatedUser {
  sub: string;
  email: string;
  tenantId: string;
  clientId: string;
  companyId: string | null;
  branchId: string | null;
  roles: string[];
  permissions: string[];
  isSuperAdmin: boolean;
}

export interface AuthenticatedRequest {
  user: AuthenticatedUser;
  headers: Record<string, string | string[] | undefined>;
  traceId?: string;
}
