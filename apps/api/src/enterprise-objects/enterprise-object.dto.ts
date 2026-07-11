import { IsBoolean, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateEnterpriseObjectDto {
  @IsString() objectCode!: string;
  @IsString() objectName!: string;
  @IsString() objectType!: string;
  @IsString() objectCategory!: string;
  @IsString() objectFamily!: string;
  @IsString() ownerModule!: string;
  @IsOptional() @IsString() framework = 'FEOM';
  @IsOptional() @IsString() tableName?: string;
  @IsOptional() @IsString() apiPath?: string;
  @IsOptional() @IsBoolean() supportsWorkflow = false;
  @IsOptional() @IsBoolean() supportsAudit = true;
  @IsOptional() @IsBoolean() supportsAttachments = false;
  @IsOptional() @IsBoolean() supportsCustomFields = false;
  @IsOptional() @IsBoolean() supportsImport = false;
  @IsOptional() @IsBoolean() supportsExport = false;
  @IsOptional() @IsBoolean() supportsReports = true;
  @IsOptional() @IsBoolean() supportsPrint = false;
  @IsOptional() @IsBoolean() supportsAi = false;
}

export class UpdateEnterpriseObjectDto {
  @IsOptional() @IsString() objectName?: string;
  @IsOptional() @IsString() objectCategory?: string;
  @IsOptional() @IsString() objectFamily?: string;
  @IsOptional() @IsString() ownerModule?: string;
  @IsOptional() @IsString() tableName?: string;
  @IsOptional() @IsString() apiPath?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsInt() @Min(1) version?: number;
}

export class CreateObjectFieldDto {
  @IsString() fieldCode!: string;
  @IsString() fieldName!: string;
  @IsString() label!: string;
  @IsString() dataType!: string;
  @IsOptional() @IsBoolean() isRequired = false;
  @IsOptional() @IsBoolean() isUnique = false;
  @IsOptional() @IsBoolean() isSearchable = false;
  @IsOptional() @IsBoolean() isFilterable = false;
  @IsOptional() @IsBoolean() isSortable = false;
  @IsOptional() @IsBoolean() isVisible = true;
  @IsOptional() @IsBoolean() isReadOnly = false;
  @IsOptional() defaultValue?: object;
  @IsOptional() validationRule?: object;
  @IsOptional() @IsInt() displayOrder = 0;
  @IsOptional() @IsString() sectionName?: string;
  @IsOptional() @IsString() helpText?: string;
}

export class CreateObjectRelationshipDto {
  @IsUUID() targetObjectId!: string;
  @IsString() relationshipType!: string;
  @IsString() relationshipName!: string;
  @IsString() cardinality!: string;
  @IsOptional() @IsBoolean() isRequired = false;
  @IsOptional() @IsString() cascadeRule = 'RESTRICT';
}
