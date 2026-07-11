import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBranchDto {
  @IsUUID() companyId!: string;
  @IsString() branchCode!: string;
  @IsString() branchName!: string;
  @IsOptional() @IsString() branchType?: string;
  @IsOptional() @IsString() countryCode?: string;
  @IsOptional() @IsString() state?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() addressLine1?: string;
  @IsOptional() @IsString() addressLine2?: string;
  @IsOptional() @IsString() postalCode?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsEmail() email?: string;
}

export class UpdateBranchDto {
  @IsOptional() @IsString() branchName?: string;
  @IsOptional() @IsString() branchType?: string;
  @IsOptional() @IsString() countryCode?: string;
  @IsOptional() @IsString() state?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() addressLine1?: string;
  @IsOptional() @IsString() addressLine2?: string;
  @IsOptional() @IsString() postalCode?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() status?: string;
}
