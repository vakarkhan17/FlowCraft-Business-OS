import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsIn, IsObject, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';

export class MasterDataPayloadDto {
  @IsObject()
  data!: Record<string, unknown>;
}

export class MasterDataArchiveDto {
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  reason!: string;
}

export class DuplicateCheckDto {
  @IsString()
  resource!: string;

  @IsObject()
  candidate!: Record<string, unknown>;
}

export class ImportRowDto {
  @IsObject()
  data!: Record<string, unknown>;
}

export class CreateImportJobDto {
  @IsString()
  resource!: string;

  @IsString()
  fileName!: string;

  @IsIn(['CSV', 'XLSX'])
  fileFormat!: string;

  @IsOptional()
  @IsBoolean()
  validationOnly = false;

  @IsOptional()
  @IsBoolean()
  dryRun = true;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImportRowDto)
  rows!: ImportRowDto[];
}

export class CreateExportJobDto {
  @IsString()
  resource!: string;

  @IsIn(['CSV', 'XLSX'])
  fileFormat!: string;

  @IsOptional()
  @IsObject()
  filters?: Record<string, unknown>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  selectedFields?: string[];
}
