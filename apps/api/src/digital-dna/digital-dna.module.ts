import { Global, Module } from '@nestjs/common';
import { DigitalDnaService } from './digital-dna.service';

@Global()
@Module({ providers: [DigitalDnaService], exports: [DigitalDnaService] })
export class DigitalDnaModule {}
