import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';

@Module({ imports: [AuthModule], controllers: [CurrenciesController], providers: [CurrenciesService] })
export class CurrenciesModule {}
