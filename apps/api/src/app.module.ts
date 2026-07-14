import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { CustomizationModule } from './customization/customization.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LayoutsModule } from './layouts/layouts.module';
import { MastersModule } from './masters/masters.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReportsModule } from './reports/reports.module';
import { TransactionsModule } from './transactions/transactions.module';
import { WorkflowsModule } from './workflows/workflows.module';
import { AuditModule } from './audit/audit.module';
import { BranchesModule } from './branches/branches.module';
import { CommonModule } from './common/common.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { DigitalDnaModule } from './digital-dna/digital-dna.module';
import { EnterpriseObjectsModule } from './enterprise-objects/enterprise-objects.module';
import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';
import { HealthModule } from './health/health.module';
import { MetadataModule } from './metadata/metadata.module';
import { NumberSeriesModule } from './number-series/number-series.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';
import { OrganizationModule } from './organization/organization.module';
import { MasterDataModule } from './master-data/master-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    CommonModule,
    DigitalDnaModule,
    AuditModule,
    AuthModule,
    HealthModule,
    TenantsModule,
    CurrenciesModule,
    ExchangeRatesModule,
    CompaniesModule,
    BranchesModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    EnterpriseObjectsModule,
    MetadataModule,
    NumberSeriesModule,
    OrganizationModule,
    MasterDataModule,
    CustomizationModule,
    DashboardModule,
    LayoutsModule,
    MastersModule,
    ReportsModule,
    TransactionsModule,
    WorkflowsModule
  ]
})
export class AppModule {}
