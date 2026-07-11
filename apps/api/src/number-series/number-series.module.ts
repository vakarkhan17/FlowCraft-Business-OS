import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { NumberSeriesController } from './number-series.controller';
import { NumberSeriesService } from './number-series.service';

@Module({ imports: [AuthModule], controllers: [NumberSeriesController], providers: [NumberSeriesService] })
export class NumberSeriesModule {}
