import { Global, Module } from '@nestjs/common';
import { PermissionsGuard } from './permissions.guard';
import { TenantContextService } from './tenant-context.service';

@Global()
@Module({
  providers: [PermissionsGuard, TenantContextService],
  exports: [PermissionsGuard, TenantContextService]
})
export class CommonModule {}
