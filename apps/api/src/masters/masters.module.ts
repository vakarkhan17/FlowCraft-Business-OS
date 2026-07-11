import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MastersController } from './masters.controller';
import { MastersService } from './masters.service';

@Module({
  imports: [AuthModule],
  controllers: [MastersController],
  providers: [MastersService]
})
export class MastersModule {}
