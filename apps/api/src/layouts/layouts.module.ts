import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { LayoutsController } from './layouts.controller';
import { LayoutsService } from './layouts.service';

@Module({
  imports: [AuthModule],
  controllers: [LayoutsController],
  providers: [LayoutsService]
})
export class LayoutsModule {}
