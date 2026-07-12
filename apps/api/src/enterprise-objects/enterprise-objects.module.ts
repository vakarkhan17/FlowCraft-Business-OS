import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { EnterpriseObjectsController } from './enterprise-objects.controller';
import { EnterpriseObjectsService } from './enterprise-objects.service';

@Module({ imports: [AuthModule], controllers: [EnterpriseObjectsController], providers: [EnterpriseObjectsService], exports: [EnterpriseObjectsService] })
export class EnterpriseObjectsModule {}
