import { IsEmail, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString() username!: string;
  @IsEmail() email!: string;
  @IsString() @MinLength(8) password!: string;
  @IsString() fullName!: string;
  @IsUUID() defaultCompanyId!: string;
  @IsOptional() @IsUUID() defaultBranchId?: string;
}

export class UpdateUserDto {
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() fullName?: string;
  @IsOptional() @IsUUID() defaultCompanyId?: string;
  @IsOptional() @IsUUID() defaultBranchId?: string;
  @IsOptional() @IsString() status?: string;
}

export class AssignUserRoleDto {
  @IsUUID() roleId!: string;
  @IsUUID() companyId!: string;
  @IsOptional() @IsUUID() branchId?: string;
}
