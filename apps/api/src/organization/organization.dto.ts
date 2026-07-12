import { Type } from 'class-transformer';
import { Allow, IsBoolean, IsDateString, IsIn, IsInt, IsObject, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateOrganizationNodeDto {
  @IsString() nodeType!: string;
  @IsUUID() referenceId!: string;
  @IsString() nodeCode!: string;
  @IsString() nodeName!: string;
  @IsOptional() @IsUUID() companyId?: string;
  @IsOptional() @IsUUID() parentNodeId?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) displayOrder = 0;
  @IsOptional() @IsString() icon?: string;
  @IsOptional() @IsObject() metadata?: Record<string, unknown>;
  @IsOptional() @IsDateString() effectiveFrom?: string;
  @IsOptional() @IsDateString() effectiveTo?: string;
}

export class UpdateOrganizationNodeDto {
  @IsOptional() @IsString() nodeName?: string;
  @IsOptional() @IsString() nodeCode?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) displayOrder?: number;
  @IsOptional() @IsString() icon?: string;
  @IsOptional() @IsObject() metadata?: Record<string, unknown>;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
  @IsOptional() @IsDateString() effectiveTo?: string;
}

export class MoveOrganizationNodeDto {
  @IsOptional() @IsUUID() newParentNodeId?: string | null;
  @IsString() changeReason!: string;
  @IsOptional() @IsDateString() effectiveFrom?: string;
}

export class CreateOrganizationOverrideDto {
  @IsString() settingKey!: string;
  @Allow() settingValue!: unknown;
  @IsOptional() @IsDateString() effectiveFrom?: string;
  @IsOptional() @IsDateString() effectiveTo?: string;
}

export class CreateOrganizationAccessDto {
  @IsUUID() userId!: string;
  @IsUUID() organizationNodeId!: string;
  @IsIn(['VIEW', 'OPERATE', 'APPROVE', 'MANAGE', 'ADMINISTER']) accessLevel!: string;
  @IsOptional() @IsBoolean() includeDescendants = false;
  @IsOptional() @IsDateString() validFrom?: string;
  @IsOptional() @IsDateString() validTo?: string;
}

export class OrganizationEntityDto {
  @IsOptional() @IsUUID() parentNodeId?: string;
  @IsOptional() @IsUUID() companyId?: string;
  @IsOptional() @IsUUID() branchId?: string;
  @IsOptional() @IsUUID() enterpriseGroupId?: string;
  @IsOptional() @IsUUID() legalEntityId?: string;
  @IsOptional() @IsUUID() plantId?: string;
  @IsOptional() @IsUUID() businessUnitId?: string;
  @IsOptional() @IsUUID() divisionId?: string;
  @IsOptional() @IsUUID() departmentId?: string;
  @IsOptional() @IsUUID() sectionId?: string;
  @IsOptional() @IsUUID() baseCurrencyId?: string;
  @IsOptional() @IsUUID() reportingCurrencyId?: string;
  @IsOptional() @IsUUID() parentBusinessUnitId?: string;
  @IsOptional() @IsUUID() parentDivisionId?: string;
  @IsOptional() @IsUUID() parentDepartmentId?: string;
  @IsOptional() @IsUUID() parentSectionId?: string;
  @IsOptional() @IsUUID() parentTeamId?: string;
  @IsOptional() @IsUUID() parentLocationId?: string;
  @IsOptional() @IsUUID() parentCostCenterId?: string;
  @IsOptional() @IsUUID() parentProfitCenterId?: string;
  @IsOptional() @IsString() groupCode?: string;
  @IsOptional() @IsString() groupName?: string;
  @IsOptional() @IsString() legalEntityCode?: string;
  @IsOptional() @IsString() legalEntityName?: string;
  @IsOptional() @IsString() legalName?: string;
  @IsOptional() @IsString() plantCode?: string;
  @IsOptional() @IsString() plantName?: string;
  @IsOptional() @IsString() plantType?: string;
  @IsOptional() @IsString() businessUnitCode?: string;
  @IsOptional() @IsString() businessUnitName?: string;
  @IsOptional() @IsString() divisionCode?: string;
  @IsOptional() @IsString() divisionName?: string;
  @IsOptional() @IsString() departmentCode?: string;
  @IsOptional() @IsString() departmentName?: string;
  @IsOptional() @IsString() departmentType?: string;
  @IsOptional() @IsString() sectionCode?: string;
  @IsOptional() @IsString() sectionName?: string;
  @IsOptional() @IsString() teamCode?: string;
  @IsOptional() @IsString() teamName?: string;
  @IsOptional() @IsString() locationCode?: string;
  @IsOptional() @IsString() locationName?: string;
  @IsOptional() @IsString() locationType?: string;
  @IsOptional() @IsString() costCenterCode?: string;
  @IsOptional() @IsString() costCenterName?: string;
  @IsOptional() @IsString() profitCenterCode?: string;
  @IsOptional() @IsString() profitCenterName?: string;
  @IsOptional() @IsString() countryCode?: string;
  @IsOptional() @IsString() timezone?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsDateString() effectiveFrom?: string;
  @IsOptional() @IsDateString() effectiveTo?: string;
}
