import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CustomizationController } from './customization.controller';
import { CustomizationService } from './customization.service';

@Module({
  imports: [AuthModule],
  controllers: [CustomizationController],
  providers: [CustomizationService]
})
export class CustomizationModule {}
