import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { OrganizationController } from './organization.controller';
import { OrganizationEntitiesService } from './organization-entities.service';
import { OrganizationHierarchyService } from './organization-hierarchy.service';
import { OrganizationScopeService } from './organization-scope.service';

@Module({
  imports: [AuthModule],
  controllers: [OrganizationController],
  providers: [OrganizationHierarchyService, OrganizationEntitiesService, OrganizationScopeService],
  exports: [OrganizationHierarchyService, OrganizationScopeService]
})
export class OrganizationModule {}
