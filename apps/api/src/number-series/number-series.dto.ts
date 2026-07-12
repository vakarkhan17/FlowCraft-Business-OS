import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateNumberSeriesDto {
  @IsUUID() companyId!: string;
  @IsOptional() @IsUUID() branchId?: string;
  @IsUUID() enterpriseObjectId!: string;
  @IsString() seriesCode!: string;
  @IsOptional() @IsString() prefix = '';
  @IsOptional() @IsString() suffix = '';
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) paddingLength = 5;
  @IsOptional() @IsString() resetFrequency = 'NEVER';
  @IsOptional() @IsString() fiscalYearId?: string;
}

export class UpdateNumberSeriesDto {
  @IsOptional() @IsString() prefix?: string;
  @IsOptional() @IsString() suffix?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) paddingLength?: number;
  @IsOptional() @IsString() resetFrequency?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
