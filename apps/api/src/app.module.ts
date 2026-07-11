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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    CompaniesModule,
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
