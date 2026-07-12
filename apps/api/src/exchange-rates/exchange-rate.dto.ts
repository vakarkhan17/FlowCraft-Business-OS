import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateExchangeRateDto {
  @IsUUID() fromCurrencyId!: string;
  @IsUUID() toCurrencyId!: string;
  @Type(() => Number) @IsNumber({ maxDecimalPlaces: 10 }) @Min(0.0000000001) rate!: number;
  @IsDateString() rateDate!: string;
  @IsOptional() @IsString() rateType = 'SPOT';
  @IsOptional() @IsString() source?: string;
  @IsOptional() @IsUUID() replacesExchangeRateId?: string;
}
