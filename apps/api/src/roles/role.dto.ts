import { IsArray, IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRoleDto {
  @IsString() roleCode!: string;
  @IsString() roleName!: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() roleType = 'CUSTOM';
}

export class UpdateRoleDto {
  @IsOptional() @IsString() roleName?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class AssignPermissionsDto {
  @IsArray() @IsUUID(undefined, { each: true }) permissionIds!: string[];
  @IsOptional() @IsBoolean() allowed = true;
}
