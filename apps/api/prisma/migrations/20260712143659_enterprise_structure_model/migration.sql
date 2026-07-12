-- AlterTable
ALTER TABLE "branches" ADD COLUMN     "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "effective_to" TIMESTAMP(3),
ADD COLUMN     "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hierarchy_path" TEXT NOT NULL DEFAULT '/',
ADD COLUMN     "parent_branch_id" UUID,
ADD COLUMN     "plant_id" UUID,
ADD COLUMN     "timezone" TEXT;

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "company_type" TEXT NOT NULL DEFAULT 'OPERATING_COMPANY',
ADD COLUMN     "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "effective_to" TIMESTAMP(3),
ADD COLUMN     "enterprise_group_id" UUID,
ADD COLUMN     "fiscal_calendar_id" UUID,
ADD COLUMN     "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hierarchy_path" TEXT NOT NULL DEFAULT '/',
ADD COLUMN     "legal_entity_id" UUID,
ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "parent_company_id" UUID,
ADD COLUMN     "reporting_currency_id" UUID,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'UTC';

-- CreateTable
CREATE TABLE "enterprise_groups" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "digital_dna" TEXT NOT NULL,
    "group_code" TEXT NOT NULL,
    "group_name" TEXT NOT NULL,
    "legal_name" TEXT,
    "description" TEXT,
    "base_currency_id" UUID,
    "country_code" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_by_id" UUID,
    "deleted_at" TIMESTAMP(3),
    "deletion_reason" TEXT,

    CONSTRAINT "enterprise_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_entities" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "enterprise_group_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "legal_entity_code" TEXT NOT NULL,
    "legal_entity_name" TEXT NOT NULL,
    "legal_name" TEXT NOT NULL,
    "registration_number" TEXT,
    "tax_registration_number" TEXT,
    "country_code" TEXT NOT NULL,
    "base_currency_id" UUID NOT NULL,
    "reporting_currency_id" UUID,
    "fiscal_calendar_id" UUID,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_by_id" UUID,
    "deleted_at" TIMESTAMP(3),
    "deletion_reason" TEXT,

    CONSTRAINT "legal_entities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plants" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "branch_id" UUID,
    "legal_entity_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "plant_code" TEXT NOT NULL,
    "plant_name" TEXT NOT NULL,
    "plant_type" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "state" TEXT,
    "city" TEXT,
    "address_line_1" TEXT,
    "address_line_2" TEXT,
    "postal_code" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "production_calendar_id" UUID,
    "default_warehouse_id" TEXT,
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_by_id" UUID,
    "deleted_at" TIMESTAMP(3),
    "deletion_reason" TEXT,

    CONSTRAINT "plants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_units" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "parent_business_unit_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "business_unit_code" TEXT NOT NULL,
    "business_unit_name" TEXT NOT NULL,
    "description" TEXT,
    "responsible_user_id" UUID,
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "divisions" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "business_unit_id" UUID,
    "parent_division_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "division_code" TEXT NOT NULL,
    "division_name" TEXT NOT NULL,
    "description" TEXT,
    "responsible_user_id" UUID,
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "divisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "plant_id" UUID,
    "business_unit_id" UUID,
    "division_id" UUID,
    "parent_department_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "department_code" TEXT NOT NULL,
    "department_name" TEXT NOT NULL,
    "department_type" TEXT,
    "manager_user_id" UUID,
    "cost_center_id" UUID,
    "profit_center_id" UUID,
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sections" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "department_id" UUID NOT NULL,
    "parent_section_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "section_code" TEXT NOT NULL,
    "section_name" TEXT NOT NULL,
    "supervisor_user_id" UUID,
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "department_id" UUID,
    "section_id" UUID,
    "parent_team_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "team_code" TEXT NOT NULL,
    "team_name" TEXT NOT NULL,
    "team_lead_user_id" UUID,
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID,
    "branch_id" UUID,
    "plant_id" UUID,
    "parent_location_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "location_code" TEXT NOT NULL,
    "location_name" TEXT NOT NULL,
    "location_type" TEXT NOT NULL,
    "address_line_1" TEXT,
    "address_line_2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postal_code" TEXT,
    "country_code" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_centers" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "parent_cost_center_id" UUID,
    "department_id" UUID,
    "plant_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "cost_center_code" TEXT NOT NULL,
    "cost_center_name" TEXT NOT NULL,
    "description" TEXT,
    "responsible_user_id" UUID,
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cost_centers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profit_centers" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "parent_profit_center_id" UUID,
    "division_id" UUID,
    "business_unit_id" UUID,
    "plant_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "profit_center_code" TEXT NOT NULL,
    "profit_center_name" TEXT NOT NULL,
    "description" TEXT,
    "responsible_user_id" UUID,
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profit_centers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_nodes" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID,
    "node_type" TEXT NOT NULL,
    "reference_id" UUID NOT NULL,
    "node_code" TEXT NOT NULL,
    "node_name" TEXT NOT NULL,
    "parent_node_id" UUID,
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "icon" TEXT,
    "metadata" JSONB,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_relationship_history" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "organization_node_id" UUID NOT NULL,
    "old_parent_node_id" UUID,
    "new_parent_node_id" UUID,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "change_reason" TEXT NOT NULL,
    "changed_by_id" UUID NOT NULL,
    "approval_status" TEXT NOT NULL DEFAULT 'APPROVED',
    "workflow_instance_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organization_relationship_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_inheritance_policies" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "source_node_type" TEXT NOT NULL,
    "target_node_type" TEXT NOT NULL,
    "setting_key" TEXT NOT NULL,
    "inheritance_mode" TEXT NOT NULL,
    "allow_override" BOOLEAN NOT NULL DEFAULT true,
    "default_value" JSONB,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_inheritance_policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_setting_overrides" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "organization_node_id" UUID NOT NULL,
    "setting_key" TEXT NOT NULL,
    "setting_value" JSONB NOT NULL,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "approved_by_id" UUID,
    "approval_status" TEXT NOT NULL DEFAULT 'APPROVED',
    "created_by_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_setting_overrides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_organization_access" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "organization_node_id" UUID NOT NULL,
    "access_level" TEXT NOT NULL,
    "include_descendants" BOOLEAN NOT NULL DEFAULT false,
    "valid_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valid_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_organization_access_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "enterprise_groups_digital_dna_key" ON "enterprise_groups"("digital_dna");

-- CreateIndex
CREATE INDEX "enterprise_groups_tenant_id_status_effective_from_effective_idx" ON "enterprise_groups"("tenant_id", "status", "effective_from", "effective_to");

-- CreateIndex
CREATE UNIQUE INDEX "enterprise_groups_tenant_id_group_code_key" ON "enterprise_groups"("tenant_id", "group_code");

-- CreateIndex
CREATE UNIQUE INDEX "legal_entities_digital_dna_key" ON "legal_entities"("digital_dna");

-- CreateIndex
CREATE INDEX "legal_entities_tenant_id_enterprise_group_id_status_idx" ON "legal_entities"("tenant_id", "enterprise_group_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "legal_entities_tenant_id_legal_entity_code_key" ON "legal_entities"("tenant_id", "legal_entity_code");

-- CreateIndex
CREATE UNIQUE INDEX "plants_digital_dna_key" ON "plants"("digital_dna");

-- CreateIndex
CREATE INDEX "plants_tenant_id_company_id_status_effective_from_effective_idx" ON "plants"("tenant_id", "company_id", "status", "effective_from", "effective_to");

-- CreateIndex
CREATE UNIQUE INDEX "plants_company_id_plant_code_key" ON "plants"("company_id", "plant_code");

-- CreateIndex
CREATE UNIQUE INDEX "business_units_digital_dna_key" ON "business_units"("digital_dna");

-- CreateIndex
CREATE INDEX "business_units_tenant_id_company_id_parent_business_unit_id_idx" ON "business_units"("tenant_id", "company_id", "parent_business_unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "business_units_company_id_business_unit_code_key" ON "business_units"("company_id", "business_unit_code");

-- CreateIndex
CREATE UNIQUE INDEX "divisions_digital_dna_key" ON "divisions"("digital_dna");

-- CreateIndex
CREATE INDEX "divisions_tenant_id_company_id_parent_division_id_idx" ON "divisions"("tenant_id", "company_id", "parent_division_id");

-- CreateIndex
CREATE UNIQUE INDEX "divisions_company_id_division_code_key" ON "divisions"("company_id", "division_code");

-- CreateIndex
CREATE UNIQUE INDEX "departments_digital_dna_key" ON "departments"("digital_dna");

-- CreateIndex
CREATE INDEX "departments_tenant_id_company_id_parent_department_id_idx" ON "departments"("tenant_id", "company_id", "parent_department_id");

-- CreateIndex
CREATE UNIQUE INDEX "departments_company_id_department_code_key" ON "departments"("company_id", "department_code");

-- CreateIndex
CREATE UNIQUE INDEX "sections_digital_dna_key" ON "sections"("digital_dna");

-- CreateIndex
CREATE INDEX "sections_tenant_id_department_id_parent_section_id_idx" ON "sections"("tenant_id", "department_id", "parent_section_id");

-- CreateIndex
CREATE UNIQUE INDEX "sections_company_id_section_code_key" ON "sections"("company_id", "section_code");

-- CreateIndex
CREATE UNIQUE INDEX "teams_digital_dna_key" ON "teams"("digital_dna");

-- CreateIndex
CREATE INDEX "teams_tenant_id_company_id_parent_team_id_idx" ON "teams"("tenant_id", "company_id", "parent_team_id");

-- CreateIndex
CREATE UNIQUE INDEX "teams_company_id_team_code_key" ON "teams"("company_id", "team_code");

-- CreateIndex
CREATE UNIQUE INDEX "locations_digital_dna_key" ON "locations"("digital_dna");

-- CreateIndex
CREATE INDEX "locations_tenant_id_company_id_parent_location_id_idx" ON "locations"("tenant_id", "company_id", "parent_location_id");

-- CreateIndex
CREATE UNIQUE INDEX "locations_tenant_id_location_code_key" ON "locations"("tenant_id", "location_code");

-- CreateIndex
CREATE UNIQUE INDEX "cost_centers_digital_dna_key" ON "cost_centers"("digital_dna");

-- CreateIndex
CREATE INDEX "cost_centers_tenant_id_company_id_parent_cost_center_id_idx" ON "cost_centers"("tenant_id", "company_id", "parent_cost_center_id");

-- CreateIndex
CREATE UNIQUE INDEX "cost_centers_company_id_cost_center_code_key" ON "cost_centers"("company_id", "cost_center_code");

-- CreateIndex
CREATE UNIQUE INDEX "profit_centers_digital_dna_key" ON "profit_centers"("digital_dna");

-- CreateIndex
CREATE INDEX "profit_centers_tenant_id_company_id_parent_profit_center_id_idx" ON "profit_centers"("tenant_id", "company_id", "parent_profit_center_id");

-- CreateIndex
CREATE UNIQUE INDEX "profit_centers_company_id_profit_center_code_key" ON "profit_centers"("company_id", "profit_center_code");

-- CreateIndex
CREATE INDEX "organization_nodes_tenant_id_company_id_parent_node_id_stat_idx" ON "organization_nodes"("tenant_id", "company_id", "parent_node_id", "status");

-- CreateIndex
CREATE INDEX "organization_nodes_tenant_id_hierarchy_path_idx" ON "organization_nodes"("tenant_id", "hierarchy_path");

-- CreateIndex
CREATE UNIQUE INDEX "organization_nodes_node_type_reference_id_key" ON "organization_nodes"("node_type", "reference_id");

-- CreateIndex
CREATE INDEX "organization_relationship_history_tenant_id_organization_no_idx" ON "organization_relationship_history"("tenant_id", "organization_node_id", "effective_from");

-- CreateIndex
CREATE UNIQUE INDEX "organization_inheritance_policies_tenant_id_source_node_typ_key" ON "organization_inheritance_policies"("tenant_id", "source_node_type", "target_node_type", "setting_key");

-- CreateIndex
CREATE INDEX "organization_setting_overrides_organization_node_id_effecti_idx" ON "organization_setting_overrides"("organization_node_id", "effective_from", "effective_to");

-- CreateIndex
CREATE UNIQUE INDEX "organization_setting_overrides_tenant_id_organization_node__key" ON "organization_setting_overrides"("tenant_id", "organization_node_id", "setting_key", "effective_from");

-- CreateIndex
CREATE INDEX "user_organization_access_user_id_organization_node_id_valid_idx" ON "user_organization_access"("user_id", "organization_node_id", "valid_from", "valid_to");

-- CreateIndex
CREATE UNIQUE INDEX "user_organization_access_tenant_id_user_id_organization_nod_key" ON "user_organization_access"("tenant_id", "user_id", "organization_node_id", "access_level", "valid_from");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_reporting_currency_id_fkey" FOREIGN KEY ("reporting_currency_id") REFERENCES "currencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_legal_entity_id_fkey" FOREIGN KEY ("legal_entity_id") REFERENCES "legal_entities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_enterprise_group_id_fkey" FOREIGN KEY ("enterprise_group_id") REFERENCES "enterprise_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_parent_company_id_fkey" FOREIGN KEY ("parent_company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branches" ADD CONSTRAINT "branches_parent_branch_id_fkey" FOREIGN KEY ("parent_branch_id") REFERENCES "branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "branches" ADD CONSTRAINT "branches_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "plants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enterprise_groups" ADD CONSTRAINT "enterprise_groups_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enterprise_groups" ADD CONSTRAINT "enterprise_groups_base_currency_id_fkey" FOREIGN KEY ("base_currency_id") REFERENCES "currencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_entities" ADD CONSTRAINT "legal_entities_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_entities" ADD CONSTRAINT "legal_entities_enterprise_group_id_fkey" FOREIGN KEY ("enterprise_group_id") REFERENCES "enterprise_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_entities" ADD CONSTRAINT "legal_entities_base_currency_id_fkey" FOREIGN KEY ("base_currency_id") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_entities" ADD CONSTRAINT "legal_entities_reporting_currency_id_fkey" FOREIGN KEY ("reporting_currency_id") REFERENCES "currencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plants" ADD CONSTRAINT "plants_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plants" ADD CONSTRAINT "plants_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plants" ADD CONSTRAINT "plants_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plants" ADD CONSTRAINT "plants_legal_entity_id_fkey" FOREIGN KEY ("legal_entity_id") REFERENCES "legal_entities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_units" ADD CONSTRAINT "business_units_parent_business_unit_id_fkey" FOREIGN KEY ("parent_business_unit_id") REFERENCES "business_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "divisions" ADD CONSTRAINT "divisions_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "divisions" ADD CONSTRAINT "divisions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "divisions" ADD CONSTRAINT "divisions_business_unit_id_fkey" FOREIGN KEY ("business_unit_id") REFERENCES "business_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "divisions" ADD CONSTRAINT "divisions_parent_division_id_fkey" FOREIGN KEY ("parent_division_id") REFERENCES "divisions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "plants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_business_unit_id_fkey" FOREIGN KEY ("business_unit_id") REFERENCES "business_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "divisions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_parent_department_id_fkey" FOREIGN KEY ("parent_department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_parent_section_id_fkey" FOREIGN KEY ("parent_section_id") REFERENCES "sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_parent_team_id_fkey" FOREIGN KEY ("parent_team_id") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "plants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_parent_location_id_fkey" FOREIGN KEY ("parent_location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_centers" ADD CONSTRAINT "cost_centers_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_centers" ADD CONSTRAINT "cost_centers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_centers" ADD CONSTRAINT "cost_centers_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "plants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_centers" ADD CONSTRAINT "cost_centers_parent_cost_center_id_fkey" FOREIGN KEY ("parent_cost_center_id") REFERENCES "cost_centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profit_centers" ADD CONSTRAINT "profit_centers_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profit_centers" ADD CONSTRAINT "profit_centers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profit_centers" ADD CONSTRAINT "profit_centers_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "plants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profit_centers" ADD CONSTRAINT "profit_centers_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "divisions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profit_centers" ADD CONSTRAINT "profit_centers_business_unit_id_fkey" FOREIGN KEY ("business_unit_id") REFERENCES "business_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profit_centers" ADD CONSTRAINT "profit_centers_parent_profit_center_id_fkey" FOREIGN KEY ("parent_profit_center_id") REFERENCES "profit_centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_nodes" ADD CONSTRAINT "organization_nodes_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_nodes" ADD CONSTRAINT "organization_nodes_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_nodes" ADD CONSTRAINT "organization_nodes_parent_node_id_fkey" FOREIGN KEY ("parent_node_id") REFERENCES "organization_nodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_relationship_history" ADD CONSTRAINT "organization_relationship_history_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_relationship_history" ADD CONSTRAINT "organization_relationship_history_organization_node_id_fkey" FOREIGN KEY ("organization_node_id") REFERENCES "organization_nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_inheritance_policies" ADD CONSTRAINT "organization_inheritance_policies_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_setting_overrides" ADD CONSTRAINT "organization_setting_overrides_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_setting_overrides" ADD CONSTRAINT "organization_setting_overrides_organization_node_id_fkey" FOREIGN KEY ("organization_node_id") REFERENCES "organization_nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_organization_access" ADD CONSTRAINT "user_organization_access_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_organization_access" ADD CONSTRAINT "user_organization_access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_organization_access" ADD CONSTRAINT "user_organization_access_organization_node_id_fkey" FOREIGN KEY ("organization_node_id") REFERENCES "organization_nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
