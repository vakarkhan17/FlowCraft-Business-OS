import { IsEmail, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreateCompanyDto {
  @IsString() companyCode!: string;
  @IsString() companyName!: string;
  @IsOptional() @IsString() legalName?: string;
  @IsUUID() baseCurrencyId!: string;
  @IsOptional() @IsString() countryCode?: string;
  @IsOptional() @IsString() taxRegistrationNumber?: string;
  @IsOptional() @IsString() addressLine1?: string;
  @IsOptional() @IsString() addressLine2?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() state?: string;
  @IsOptional() @IsString() postalCode?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsUrl() website?: string;
  @IsOptional() @IsUrl() logoUrl?: string;
}

export class UpdateCompanyDto {
  @IsOptional() @IsString() companyName?: string;
  @IsOptional() @IsString() legalName?: string;
  @IsOptional() @IsUUID() baseCurrencyId?: string;
  @IsOptional() @IsString() countryCode?: string;
  @IsOptional() @IsString() taxRegistrationNumber?: string;
  @IsOptional() @IsString() addressLine1?: string;
  @IsOptional() @IsString() addressLine2?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() state?: string;
  @IsOptional() @IsString() postalCode?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsUrl() website?: string;
  @IsOptional() @IsUrl() logoUrl?: string;
  @IsOptional() @IsString() status?: string;
}

export class ArchiveDto {
  @IsString() reason!: string;
}
