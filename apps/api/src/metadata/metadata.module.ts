import { Module } from '@nestjs/common';
import { EnterpriseObjectsModule } from '../enterprise-objects/enterprise-objects.module';

@Module({ imports: [EnterpriseObjectsModule], exports: [EnterpriseObjectsModule] })
export class MetadataModule {}
