import { IsBoolean, IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateWorkflowDto {
  @IsUUID() enterpriseObjectId!: string;
  @IsOptional() @IsUUID() companyId?: string;
  @IsString() workflowCode!: string;
  @IsString() workflowName!: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsDateString() effectiveFrom?: string;
  @IsOptional() @IsDateString() effectiveTo?: string;
}

export class UpdateWorkflowDto {
  @IsOptional() @IsString() workflowName?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsDateString() effectiveFrom?: string;
  @IsOptional() @IsDateString() effectiveTo?: string;
}

export class PublishWorkflowDto {
  @IsOptional() @IsBoolean() confirm = true;
}
