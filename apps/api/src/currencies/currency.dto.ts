import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  @Length(3, 3)
  currencyCode!: string;

  @IsString()
  currencyName!: string;

  @IsOptional()
  @IsString()
  symbol?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(8)
  decimalPlaces = 2;

  @IsOptional()
  @IsString()
  roundingRule = 'HALF_UP';

  @IsOptional()
  @IsBoolean()
  isBaseAllowed = true;
}

export class UpdateCurrencyDto {
  @IsOptional() @IsString() currencyName?: string;
  @IsOptional() @IsString() symbol?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) @Max(8) decimalPlaces?: number;
  @IsOptional() @IsString() roundingRule?: string;
  @IsOptional() @IsBoolean() isBaseAllowed?: boolean;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
