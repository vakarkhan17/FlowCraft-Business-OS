import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { OrganizationModule } from '../organization/organization.module';
import { MasterDataController } from './master-data.controller';
import { MasterDataService } from './master-data.service';

@Module({
  imports: [AuthModule, OrganizationModule],
  controllers: [MasterDataController],
  providers: [MasterDataService],
  exports: [MasterDataService]
})
export class MasterDataModule {}
