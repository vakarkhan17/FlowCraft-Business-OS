-- AlterTable
ALTER TABLE "warehouses" ADD COLUMN     "allows_negative_stock" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "default_stock_status_id" UUID,
ADD COLUMN     "digital_dna" TEXT,
ADD COLUMN     "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "effective_to" TIMESTAMP(3),
ADD COLUMN     "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "hierarchy_path" TEXT NOT NULL DEFAULT '/',
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_virtual" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location_id" UUID,
ADD COLUMN     "parent_warehouse_id" TEXT,
ADD COLUMN     "plant_id" UUID,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "tenant_id" UUID,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "warehouse_type" TEXT NOT NULL DEFAULT 'GENERAL';

-- Backfill accepted legacy warehouses before enforcing DBA-004 ownership and immutable identity.
UPDATE "warehouses" AS w
SET "tenant_id" = c."tenant_id",
    "digital_dna" = 'FC-WHS-' || UPPER(SUBSTRING(MD5(w."id") FROM 1 FOR 12)),
    "updated_at" = CURRENT_TIMESTAMP
FROM "companies" AS c
WHERE c."id" = w."companyId";

ALTER TABLE "warehouses"
ALTER COLUMN "tenant_id" SET NOT NULL,
ALTER COLUMN "digital_dna" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "approval_status" TEXT NOT NULL DEFAULT 'APPROVED',
ADD COLUMN     "barcode" TEXT,
ADD COLUMN     "base_uom_id" UUID,
ADD COLUMN     "brand_id" UUID,
ADD COLUMN     "costing_method" TEXT NOT NULL DEFAULT 'STANDARD_COST',
ADD COLUMN     "country_of_origin_id" UUID,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by_id" UUID,
ADD COLUMN     "default_supplier_id" TEXT,
ADD COLUMN     "default_warehouse_id" TEXT,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by_id" UUID,
ADD COLUMN     "deletion_reason" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "digital_dna" TEXT,
ADD COLUMN     "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "effective_to" TIMESTAMP(3),
ADD COLUMN     "hs_code" TEXT,
ADD COLUMN     "is_batch_managed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_maintenance_spare" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_manufactured_item" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_purchase_item" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_quality_inspection_required" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_sales_item" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_serial_managed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_stock_item" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_subcontracted_item" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "item_category_id" UUID,
ADD COLUMN     "item_code" TEXT,
ADD COLUMN     "item_group_id" UUID,
ADD COLUMN     "lead_time_days" INTEGER,
ADD COLUMN     "manufacturer_id" UUID,
ADD COLUMN     "manufacturing_strategy" TEXT NOT NULL DEFAULT 'MTS',
ADD COLUMN     "maximum_order_quantity" DECIMAL(24,8),
ADD COLUMN     "minimum_order_quantity" DECIMAL(24,8),
ADD COLUMN     "purchase_uom_id" UUID,
ADD COLUMN     "reorder_point" DECIMAL(24,8),
ADD COLUMN     "reorder_quantity" DECIMAL(24,8),
ADD COLUMN     "replenishment_policy" TEXT NOT NULL DEFAULT 'MANUAL',
ADD COLUMN     "safety_stock_quantity" DECIMAL(24,8),
ADD COLUMN     "sales_uom_id" UUID,
ADD COLUMN     "shelf_life_days" INTEGER,
ADD COLUMN     "short_name" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "stock_uom_id" UUID,
ADD COLUMN     "tax_category_id" UUID,
ADD COLUMN     "tenant_id" UUID,
ADD COLUMN     "tracking_method" TEXT NOT NULL DEFAULT 'NONE',
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by_id" UUID,
ADD COLUMN     "valuation_method" TEXT NOT NULL DEFAULT 'WEIGHTED_AVERAGE',
ADD COLUMN     "volume" DECIMAL(24,8),
ADD COLUMN     "volume_uom_id" UUID,
ADD COLUMN     "weight" DECIMAL(24,8),
ADD COLUMN     "weight_uom_id" UUID;

-- Preserve legacy item codes, company ownership, and values without rewriting historical rows.
UPDATE "items" AS i
SET "tenant_id" = c."tenant_id",
    "item_code" = i."sku",
    "digital_dna" = 'FC-ITM-' || UPPER(SUBSTRING(MD5(i."id") FROM 1 FOR 12)),
    "updated_at" = CURRENT_TIMESTAMP
FROM "companies" AS c
WHERE c."id" = i."companyId";

ALTER TABLE "items"
ALTER COLUMN "tenant_id" SET NOT NULL,
ALTER COLUMN "item_code" SET NOT NULL,
ALTER COLUMN "digital_dna" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "suppliers" ADD COLUMN     "approved_supplier_status" TEXT NOT NULL DEFAULT 'APPROVED',
ADD COLUMN     "business_partner_id" UUID,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "default_address_id" UUID,
ADD COLUMN     "default_contact_person_id" UUID,
ADD COLUMN     "default_payment_term_id" UUID,
ADD COLUMN     "default_purchase_currency_id" UUID,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "supplier_group_id" UUID,
ADD COLUMN     "supplier_rating" DECIMAL(5,2),
ADD COLUMN     "updated_at" TIMESTAMP(3);

UPDATE "suppliers" SET "updated_at" = CURRENT_TIMESTAMP WHERE "updated_at" IS NULL;
ALTER TABLE "suppliers" ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "account_manager_user_id" UUID,
ADD COLUMN     "business_partner_id" UUID,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "credit_profile_id" UUID,
ADD COLUMN     "customer_group_id" UUID,
ADD COLUMN     "default_billing_address_id" UUID,
ADD COLUMN     "default_contact_person_id" UUID,
ADD COLUMN     "default_delivery_address_id" UUID,
ADD COLUMN     "sales_territory_id" UUID,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "updated_at" TIMESTAMP(3);

UPDATE "customers" SET "updated_at" = CURRENT_TIMESTAMP WHERE "updated_at" IS NULL;
ALTER TABLE "customers" ALTER COLUMN "updated_at" SET NOT NULL;

-- CreateTable
CREATE TABLE "countries" (
    "id" UUID NOT NULL,
    "digital_dna" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "country_name" TEXT NOT NULL,
    "iso_alpha_2" TEXT NOT NULL,
    "iso_alpha_3" TEXT NOT NULL,
    "numeric_code" TEXT,
    "phone_code" TEXT,
    "default_currency_id" UUID,
    "tax_region_code" TEXT,
    "timezone_group" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" UUID NOT NULL,
    "country_id" UUID NOT NULL,
    "state_code" TEXT NOT NULL,
    "state_name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" UUID NOT NULL,
    "country_id" UUID NOT NULL,
    "state_id" UUID,
    "city_code" TEXT NOT NULL,
    "city_name" TEXT NOT NULL,
    "postal_code_pattern" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "territories" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID,
    "parent_territory_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "territory_code" TEXT NOT NULL,
    "territory_name" TEXT NOT NULL,
    "territory_type" TEXT NOT NULL,
    "country_id" UUID,
    "state_id" UUID,
    "city_id" UUID,
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "territories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID,
    "address_type" TEXT NOT NULL,
    "address_line_1" TEXT NOT NULL,
    "address_line_2" TEXT,
    "address_line_3" TEXT,
    "country_id" UUID NOT NULL,
    "state_id" UUID,
    "city_id" UUID,
    "postal_code" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_persons" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "digital_dna" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT,
    "display_name" TEXT NOT NULL,
    "designation" TEXT,
    "department" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "mobile" TEXT,
    "preferred_language" TEXT,
    "preferred_channel" TEXT,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units_of_measure" (
    "id" UUID NOT NULL,
    "tenant_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "uom_code" TEXT NOT NULL,
    "uom_name" TEXT NOT NULL,
    "uom_category" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "decimal_precision" INTEGER NOT NULL DEFAULT 4,
    "rounding_rule" TEXT NOT NULL DEFAULT 'HALF_UP',
    "is_base_uom" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "units_of_measure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uom_conversions" (
    "id" UUID NOT NULL,
    "tenant_id" UUID,
    "item_id" TEXT,
    "from_uom_id" UUID NOT NULL,
    "to_uom_id" UUID NOT NULL,
    "conversion_factor" DECIMAL(24,10) NOT NULL,
    "rounding_method" TEXT NOT NULL DEFAULT 'HALF_UP',
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "uom_conversions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_groups" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID,
    "parent_item_group_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "item_group_code" TEXT NOT NULL,
    "item_group_name" TEXT NOT NULL,
    "description" TEXT,
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_categories" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID,
    "parent_item_category_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "item_category_code" TEXT NOT NULL,
    "item_category_name" TEXT NOT NULL,
    "category_type" TEXT NOT NULL,
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_attribute_definitions" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "attribute_code" TEXT NOT NULL,
    "attribute_name" TEXT NOT NULL,
    "data_type" TEXT NOT NULL,
    "unit_of_measure_id" UUID,
    "is_required" BOOLEAN NOT NULL DEFAULT false,
    "is_variant_attribute" BOOLEAN NOT NULL DEFAULT false,
    "allowed_values" JSONB,
    "validation_rule" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_attribute_definitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_attribute_values" (
    "id" UUID NOT NULL,
    "item_id" TEXT NOT NULL,
    "attribute_definition_id" UUID NOT NULL,
    "text_value" TEXT,
    "number_value" DECIMAL(24,8),
    "date_value" TIMESTAMP(3),
    "boolean_value" BOOLEAN,
    "option_value" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_attribute_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manufacturers" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "digital_dna" TEXT NOT NULL,
    "manufacturer_code" TEXT NOT NULL,
    "manufacturer_name" TEXT NOT NULL,
    "country_id" UUID,
    "website" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manufacturers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" UUID NOT NULL,
    "tenant_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "brand_code" TEXT NOT NULL,
    "brand_name" TEXT NOT NULL,
    "manufacturer_id" UUID,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warehouse_zones" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "warehouse_id" TEXT NOT NULL,
    "parent_zone_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "zone_code" TEXT NOT NULL,
    "zone_name" TEXT NOT NULL,
    "zone_type" TEXT NOT NULL,
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "temperature_min" DECIMAL(8,3),
    "temperature_max" DECIMAL(8,3),
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "warehouse_zones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bins" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "warehouse_id" TEXT NOT NULL,
    "warehouse_zone_id" UUID,
    "parent_bin_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "bin_code" TEXT NOT NULL,
    "bin_name" TEXT NOT NULL,
    "bin_type" TEXT NOT NULL,
    "capacity_quantity" DECIMAL(24,8),
    "capacity_uom_id" UUID,
    "weight_capacity" DECIMAL(24,8),
    "volume_capacity" DECIMAL(24,8),
    "is_pickable" BOOLEAN NOT NULL DEFAULT true,
    "is_receivable" BOOLEAN NOT NULL DEFAULT true,
    "is_blocked" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_statuses" (
    "id" UUID NOT NULL,
    "tenant_id" UUID,
    "status_code" TEXT NOT NULL,
    "status_name" TEXT NOT NULL,
    "available_for_sale" BOOLEAN NOT NULL DEFAULT false,
    "available_for_production" BOOLEAN NOT NULL DEFAULT false,
    "available_for_transfer" BOOLEAN NOT NULL DEFAULT false,
    "requires_approval_to_release" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stock_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batches" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "item_id" TEXT NOT NULL,
    "batch_number" TEXT NOT NULL,
    "manufacturing_date" DATE,
    "expiry_date" DATE,
    "supplier_batch_number" TEXT,
    "quality_status" TEXT NOT NULL DEFAULT 'NOT_INSPECTED',
    "stock_status_id" UUID,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serial_numbers" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "item_id" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "batch_id" UUID,
    "manufacturer_serial_number" TEXT,
    "warranty_start_date" DATE,
    "warranty_end_date" DATE,
    "current_warehouse_id" TEXT,
    "current_bin_id" UUID,
    "stock_status_id" UUID,
    "lifecycle_status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "serial_numbers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_partners" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID,
    "digital_dna" TEXT NOT NULL,
    "partner_code" TEXT NOT NULL,
    "partner_name" TEXT NOT NULL,
    "legal_name" TEXT,
    "partner_type" TEXT NOT NULL,
    "registration_number" TEXT,
    "tax_registration_number" TEXT,
    "country_id" UUID,
    "default_currency_id" UUID,
    "payment_term_id" UUID,
    "credit_term_id" UUID,
    "price_list_id" UUID,
    "territory_id" UUID,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "approval_status" TEXT NOT NULL DEFAULT 'APPROVED',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by_id" UUID,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_groups" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID,
    "parent_customer_group_id" UUID,
    "customer_group_code" TEXT NOT NULL,
    "customer_group_name" TEXT NOT NULL,
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_groups" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID,
    "parent_supplier_group_id" UUID,
    "supplier_group_code" TEXT NOT NULL,
    "supplier_group_name" TEXT NOT NULL,
    "hierarchy_path" TEXT NOT NULL DEFAULT '/',
    "hierarchy_level" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_partner_addresses" (
    "id" UUID NOT NULL,
    "business_partner_id" UUID NOT NULL,
    "address_id" UUID NOT NULL,
    "address_role" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),

    CONSTRAINT "business_partner_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_partner_contacts" (
    "id" UUID NOT NULL,
    "business_partner_id" UUID NOT NULL,
    "contact_person_id" UUID NOT NULL,
    "contact_role" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),

    CONSTRAINT "business_partner_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_terms" (
    "id" UUID NOT NULL,
    "tenant_id" UUID,
    "payment_term_code" TEXT NOT NULL,
    "payment_term_name" TEXT NOT NULL,
    "due_days" INTEGER NOT NULL DEFAULT 0,
    "due_date_calculation" TEXT NOT NULL DEFAULT 'INVOICE_DATE',
    "discount_days" INTEGER,
    "discount_percentage" DECIMAL(8,4),
    "installment_definition" JSONB,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_terms" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "credit_term_code" TEXT NOT NULL,
    "credit_term_name" TEXT NOT NULL,
    "credit_days" INTEGER NOT NULL,
    "grace_days" INTEGER NOT NULL DEFAULT 0,
    "credit_limit_required" BOOLEAN NOT NULL DEFAULT true,
    "overdue_block_policy" TEXT NOT NULL DEFAULT 'BLOCK',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credit_terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_profiles" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "business_partner_id" UUID NOT NULL,
    "credit_term_id" UUID NOT NULL,
    "credit_limit" DECIMAL(24,4) NOT NULL,
    "temporary_credit_limit" DECIMAL(24,4),
    "temporary_limit_expiry" DATE,
    "overdue_tolerance_days" INTEGER NOT NULL DEFAULT 0,
    "auto_block_on_limit" BOOLEAN NOT NULL DEFAULT true,
    "auto_block_on_overdue" BOOLEAN NOT NULL DEFAULT true,
    "approval_required_for_override" BOOLEAN NOT NULL DEFAULT true,
    "risk_rating" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credit_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_terms" (
    "id" UUID NOT NULL,
    "tenant_id" UUID,
    "delivery_term_code" TEXT NOT NULL,
    "delivery_term_name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delivery_terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incoterms" (
    "id" UUID NOT NULL,
    "incoterm_code" TEXT NOT NULL,
    "incoterm_name" TEXT NOT NULL,
    "version_year" INTEGER NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "incoterms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_lists" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID,
    "price_list_code" TEXT NOT NULL,
    "price_list_name" TEXT NOT NULL,
    "currency_id" UUID NOT NULL,
    "price_list_type" TEXT NOT NULL,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "tax_inclusive" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "price_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_categories" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID,
    "tax_category_code" TEXT NOT NULL,
    "tax_category_name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tax_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_codes" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID,
    "tax_code" TEXT NOT NULL,
    "tax_name" TEXT NOT NULL,
    "tax_category_id" UUID,
    "country_id" UUID,
    "tax_type" TEXT NOT NULL,
    "rate" DECIMAL(12,6) NOT NULL,
    "recoverable_percentage" DECIMAL(8,4),
    "payable_account_id" TEXT,
    "receivable_account_id" TEXT,
    "effective_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_to" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tax_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_data_change_requests" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "enterprise_object_id" UUID NOT NULL,
    "record_id" TEXT,
    "change_type" TEXT NOT NULL,
    "requested_changes" JSONB NOT NULL,
    "reason" TEXT NOT NULL,
    "requested_by_id" UUID NOT NULL,
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approval_status" TEXT NOT NULL DEFAULT 'PENDING',
    "approved_by_id" UUID,
    "approved_at" TIMESTAMP(3),
    "workflow_instance_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_data_change_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "duplicate_detection_rules" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "enterprise_object_id" UUID NOT NULL,
    "rule_code" TEXT NOT NULL,
    "rule_name" TEXT NOT NULL,
    "match_fields" JSONB NOT NULL,
    "threshold" DECIMAL(5,4) NOT NULL,
    "action" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "duplicate_detection_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_data_merge_history" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "enterprise_object_id" UUID NOT NULL,
    "source_record_id" TEXT NOT NULL,
    "target_record_id" TEXT NOT NULL,
    "merge_reason" TEXT NOT NULL,
    "merged_by_id" UUID NOT NULL,
    "merged_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "preserved_references" JSONB NOT NULL,
    "audit_log_id" UUID,

    CONSTRAINT "master_data_merge_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_import_mappings" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "enterprise_object_id" UUID NOT NULL,
    "mapping_code" TEXT NOT NULL,
    "mapping_name" TEXT NOT NULL,
    "file_format" TEXT NOT NULL,
    "column_mappings" JSONB NOT NULL,
    "validation_rules" JSONB,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_import_mappings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_import_jobs" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID,
    "enterprise_object_id" UUID NOT NULL,
    "mapping_id" UUID,
    "file_name" TEXT NOT NULL,
    "file_format" TEXT NOT NULL,
    "validation_only" BOOLEAN NOT NULL DEFAULT false,
    "dry_run" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "total_rows" INTEGER NOT NULL DEFAULT 0,
    "valid_rows" INTEGER NOT NULL DEFAULT 0,
    "invalid_rows" INTEGER NOT NULL DEFAULT 0,
    "duplicate_rows" INTEGER NOT NULL DEFAULT 0,
    "processed_rows" INTEGER NOT NULL DEFAULT 0,
    "rollback_marker" TEXT,
    "summary" JSONB,
    "requested_by_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_import_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_import_rows" (
    "id" UUID NOT NULL,
    "import_job_id" UUID NOT NULL,
    "row_number" INTEGER NOT NULL,
    "raw_data" JSONB NOT NULL,
    "normalized_data" JSONB,
    "validation_status" TEXT NOT NULL DEFAULT 'PENDING',
    "validation_errors" JSONB,
    "duplicate_matches" JSONB,
    "imported_record_id" TEXT,
    "rollback_status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_import_rows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_export_jobs" (
    "id" UUID NOT NULL,
    "tenant_id" UUID NOT NULL,
    "company_id" UUID,
    "enterprise_object_id" UUID NOT NULL,
    "file_format" TEXT NOT NULL,
    "filters" JSONB,
    "selected_fields" JSONB,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "row_count" INTEGER NOT NULL DEFAULT 0,
    "file_reference" TEXT,
    "requested_by_id" UUID NOT NULL,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "master_export_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_digital_dna_key" ON "countries"("digital_dna");

-- CreateIndex
CREATE UNIQUE INDEX "countries_country_code_key" ON "countries"("country_code");

-- CreateIndex
CREATE UNIQUE INDEX "countries_iso_alpha_2_key" ON "countries"("iso_alpha_2");

-- CreateIndex
CREATE UNIQUE INDEX "countries_iso_alpha_3_key" ON "countries"("iso_alpha_3");

-- CreateIndex
CREATE INDEX "countries_status_is_active_idx" ON "countries"("status", "is_active");

-- CreateIndex
CREATE INDEX "states_country_id_status_idx" ON "states"("country_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "states_country_id_state_code_key" ON "states"("country_id", "state_code");

-- CreateIndex
CREATE INDEX "cities_country_id_state_id_status_idx" ON "cities"("country_id", "state_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "cities_country_id_state_id_city_code_key" ON "cities"("country_id", "state_id", "city_code");

-- CreateIndex
CREATE UNIQUE INDEX "territories_digital_dna_key" ON "territories"("digital_dna");

-- CreateIndex
CREATE INDEX "territories_tenant_id_company_id_parent_territory_id_status_idx" ON "territories"("tenant_id", "company_id", "parent_territory_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "territories_tenant_id_company_id_territory_code_key" ON "territories"("tenant_id", "company_id", "territory_code");

-- CreateIndex
CREATE INDEX "addresses_tenant_id_company_id_address_type_status_idx" ON "addresses"("tenant_id", "company_id", "address_type", "status");

-- CreateIndex
CREATE UNIQUE INDEX "contact_persons_digital_dna_key" ON "contact_persons"("digital_dna");

-- CreateIndex
CREATE INDEX "contact_persons_tenant_id_display_name_status_idx" ON "contact_persons"("tenant_id", "display_name", "status");

-- CreateIndex
CREATE UNIQUE INDEX "units_of_measure_digital_dna_key" ON "units_of_measure"("digital_dna");

-- CreateIndex
CREATE INDEX "units_of_measure_tenant_id_uom_category_status_idx" ON "units_of_measure"("tenant_id", "uom_category", "status");

-- CreateIndex
CREATE UNIQUE INDEX "units_of_measure_tenant_id_uom_code_key" ON "units_of_measure"("tenant_id", "uom_code");

-- CreateIndex
CREATE INDEX "uom_conversions_tenant_id_item_id_from_uom_id_to_uom_id_sta_idx" ON "uom_conversions"("tenant_id", "item_id", "from_uom_id", "to_uom_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "uom_conversions_tenant_id_item_id_from_uom_id_to_uom_id_eff_key" ON "uom_conversions"("tenant_id", "item_id", "from_uom_id", "to_uom_id", "effective_from");

-- CreateIndex
CREATE UNIQUE INDEX "item_groups_digital_dna_key" ON "item_groups"("digital_dna");

-- CreateIndex
CREATE INDEX "item_groups_tenant_id_company_id_parent_item_group_id_statu_idx" ON "item_groups"("tenant_id", "company_id", "parent_item_group_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "item_groups_tenant_id_company_id_item_group_code_key" ON "item_groups"("tenant_id", "company_id", "item_group_code");

-- CreateIndex
CREATE UNIQUE INDEX "item_categories_digital_dna_key" ON "item_categories"("digital_dna");

-- CreateIndex
CREATE INDEX "item_categories_tenant_id_company_id_parent_item_category_i_idx" ON "item_categories"("tenant_id", "company_id", "parent_item_category_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "item_categories_tenant_id_company_id_item_category_code_key" ON "item_categories"("tenant_id", "company_id", "item_category_code");

-- CreateIndex
CREATE INDEX "item_attribute_definitions_tenant_id_data_type_status_idx" ON "item_attribute_definitions"("tenant_id", "data_type", "status");

-- CreateIndex
CREATE UNIQUE INDEX "item_attribute_definitions_tenant_id_attribute_code_key" ON "item_attribute_definitions"("tenant_id", "attribute_code");

-- CreateIndex
CREATE UNIQUE INDEX "item_attribute_values_item_id_attribute_definition_id_key" ON "item_attribute_values"("item_id", "attribute_definition_id");

-- CreateIndex
CREATE UNIQUE INDEX "manufacturers_digital_dna_key" ON "manufacturers"("digital_dna");

-- CreateIndex
CREATE INDEX "manufacturers_tenant_id_status_idx" ON "manufacturers"("tenant_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "manufacturers_tenant_id_manufacturer_code_key" ON "manufacturers"("tenant_id", "manufacturer_code");

-- CreateIndex
CREATE UNIQUE INDEX "brands_digital_dna_key" ON "brands"("digital_dna");

-- CreateIndex
CREATE INDEX "brands_tenant_id_manufacturer_id_status_idx" ON "brands"("tenant_id", "manufacturer_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "brands_tenant_id_brand_code_key" ON "brands"("tenant_id", "brand_code");

-- CreateIndex
CREATE UNIQUE INDEX "warehouse_zones_digital_dna_key" ON "warehouse_zones"("digital_dna");

-- CreateIndex
CREATE INDEX "warehouse_zones_tenant_id_warehouse_id_parent_zone_id_statu_idx" ON "warehouse_zones"("tenant_id", "warehouse_id", "parent_zone_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "warehouse_zones_warehouse_id_zone_code_key" ON "warehouse_zones"("warehouse_id", "zone_code");

-- CreateIndex
CREATE UNIQUE INDEX "bins_digital_dna_key" ON "bins"("digital_dna");

-- CreateIndex
CREATE INDEX "bins_tenant_id_warehouse_id_warehouse_zone_id_parent_bin_id_idx" ON "bins"("tenant_id", "warehouse_id", "warehouse_zone_id", "parent_bin_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "bins_warehouse_id_bin_code_key" ON "bins"("warehouse_id", "bin_code");

-- CreateIndex
CREATE INDEX "stock_statuses_tenant_id_status_idx" ON "stock_statuses"("tenant_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "stock_statuses_tenant_id_status_code_key" ON "stock_statuses"("tenant_id", "status_code");

-- CreateIndex
CREATE INDEX "batches_tenant_id_company_id_item_id_status_idx" ON "batches"("tenant_id", "company_id", "item_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "batches_company_id_item_id_batch_number_key" ON "batches"("company_id", "item_id", "batch_number");

-- CreateIndex
CREATE INDEX "serial_numbers_tenant_id_company_id_item_id_batch_id_status_idx" ON "serial_numbers"("tenant_id", "company_id", "item_id", "batch_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "serial_numbers_company_id_serial_number_key" ON "serial_numbers"("company_id", "serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "business_partners_digital_dna_key" ON "business_partners"("digital_dna");

-- CreateIndex
CREATE INDEX "business_partners_tenant_id_company_id_partner_type_status__idx" ON "business_partners"("tenant_id", "company_id", "partner_type", "status", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "business_partners_tenant_id_company_id_partner_code_key" ON "business_partners"("tenant_id", "company_id", "partner_code");

-- CreateIndex
CREATE INDEX "customer_groups_tenant_id_company_id_parent_customer_group__idx" ON "customer_groups"("tenant_id", "company_id", "parent_customer_group_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "customer_groups_tenant_id_company_id_customer_group_code_key" ON "customer_groups"("tenant_id", "company_id", "customer_group_code");

-- CreateIndex
CREATE INDEX "supplier_groups_tenant_id_company_id_parent_supplier_group__idx" ON "supplier_groups"("tenant_id", "company_id", "parent_supplier_group_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_groups_tenant_id_company_id_supplier_group_code_key" ON "supplier_groups"("tenant_id", "company_id", "supplier_group_code");

-- CreateIndex
CREATE UNIQUE INDEX "business_partner_addresses_business_partner_id_address_id_a_key" ON "business_partner_addresses"("business_partner_id", "address_id", "address_role", "effective_from");

-- CreateIndex
CREATE UNIQUE INDEX "business_partner_contacts_business_partner_id_contact_perso_key" ON "business_partner_contacts"("business_partner_id", "contact_person_id", "contact_role", "effective_from");

-- CreateIndex
CREATE INDEX "payment_terms_tenant_id_status_idx" ON "payment_terms"("tenant_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "payment_terms_tenant_id_payment_term_code_key" ON "payment_terms"("tenant_id", "payment_term_code");

-- CreateIndex
CREATE INDEX "credit_terms_tenant_id_status_idx" ON "credit_terms"("tenant_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "credit_terms_tenant_id_credit_term_code_key" ON "credit_terms"("tenant_id", "credit_term_code");

-- CreateIndex
CREATE INDEX "credit_profiles_tenant_id_company_id_business_partner_id_st_idx" ON "credit_profiles"("tenant_id", "company_id", "business_partner_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "credit_profiles_tenant_id_company_id_business_partner_id_ef_key" ON "credit_profiles"("tenant_id", "company_id", "business_partner_id", "effective_from");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_terms_tenant_id_delivery_term_code_key" ON "delivery_terms"("tenant_id", "delivery_term_code");

-- CreateIndex
CREATE UNIQUE INDEX "incoterms_incoterm_code_version_year_key" ON "incoterms"("incoterm_code", "version_year");

-- CreateIndex
CREATE INDEX "price_lists_tenant_id_company_id_status_effective_from_effe_idx" ON "price_lists"("tenant_id", "company_id", "status", "effective_from", "effective_to");

-- CreateIndex
CREATE UNIQUE INDEX "price_lists_tenant_id_company_id_price_list_code_effective__key" ON "price_lists"("tenant_id", "company_id", "price_list_code", "effective_from");

-- CreateIndex
CREATE UNIQUE INDEX "tax_categories_tenant_id_company_id_tax_category_code_key" ON "tax_categories"("tenant_id", "company_id", "tax_category_code");

-- CreateIndex
CREATE INDEX "tax_codes_tenant_id_company_id_country_id_status_idx" ON "tax_codes"("tenant_id", "company_id", "country_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "tax_codes_tenant_id_company_id_tax_code_effective_from_key" ON "tax_codes"("tenant_id", "company_id", "tax_code", "effective_from");

-- CreateIndex
CREATE INDEX "master_data_change_requests_tenant_id_enterprise_object_id__idx" ON "master_data_change_requests"("tenant_id", "enterprise_object_id", "approval_status", "requested_at");

-- CreateIndex
CREATE INDEX "duplicate_detection_rules_tenant_id_enterprise_object_id_st_idx" ON "duplicate_detection_rules"("tenant_id", "enterprise_object_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "duplicate_detection_rules_tenant_id_rule_code_key" ON "duplicate_detection_rules"("tenant_id", "rule_code");

-- CreateIndex
CREATE INDEX "master_data_merge_history_tenant_id_enterprise_object_id_so_idx" ON "master_data_merge_history"("tenant_id", "enterprise_object_id", "source_record_id", "target_record_id");

-- CreateIndex
CREATE UNIQUE INDEX "master_import_mappings_tenant_id_mapping_code_key" ON "master_import_mappings"("tenant_id", "mapping_code");

-- CreateIndex
CREATE INDEX "master_import_jobs_tenant_id_company_id_enterprise_object_i_idx" ON "master_import_jobs"("tenant_id", "company_id", "enterprise_object_id", "status", "created_at");

-- CreateIndex
CREATE INDEX "master_import_rows_import_job_id_validation_status_idx" ON "master_import_rows"("import_job_id", "validation_status");

-- CreateIndex
CREATE UNIQUE INDEX "master_import_rows_import_job_id_row_number_key" ON "master_import_rows"("import_job_id", "row_number");

-- CreateIndex
CREATE INDEX "master_export_jobs_tenant_id_company_id_enterprise_object_i_idx" ON "master_export_jobs"("tenant_id", "company_id", "enterprise_object_id", "status", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "warehouses_digital_dna_key" ON "warehouses"("digital_dna");

-- CreateIndex
CREATE INDEX "warehouses_tenant_id_companyId_parent_warehouse_id_status_i_idx" ON "warehouses"("tenant_id", "companyId", "parent_warehouse_id", "status", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "items_digital_dna_key" ON "items"("digital_dna");

-- CreateIndex
CREATE INDEX "items_tenant_id_companyId_item_group_id_item_category_id_st_idx" ON "items"("tenant_id", "companyId", "item_group_id", "item_category_id", "status", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "items_tenant_id_companyId_item_code_key" ON "items"("tenant_id", "companyId", "item_code");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_business_partner_id_key" ON "suppliers"("business_partner_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_business_partner_id_key" ON "customers"("business_partner_id");

-- AddForeignKey
ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_parent_warehouse_id_fkey" FOREIGN KEY ("parent_warehouse_id") REFERENCES "warehouses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "territories" ADD CONSTRAINT "territories_parent_territory_id_fkey" FOREIGN KEY ("parent_territory_id") REFERENCES "territories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_groups" ADD CONSTRAINT "item_groups_parent_item_group_id_fkey" FOREIGN KEY ("parent_item_group_id") REFERENCES "item_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_categories" ADD CONSTRAINT "item_categories_parent_item_category_id_fkey" FOREIGN KEY ("parent_item_category_id") REFERENCES "item_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warehouse_zones" ADD CONSTRAINT "warehouse_zones_parent_zone_id_fkey" FOREIGN KEY ("parent_zone_id") REFERENCES "warehouse_zones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_groups" ADD CONSTRAINT "customer_groups_parent_customer_group_id_fkey" FOREIGN KEY ("parent_customer_group_id") REFERENCES "customer_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_groups" ADD CONSTRAINT "supplier_groups_parent_supplier_group_id_fkey" FOREIGN KEY ("parent_supplier_group_id") REFERENCES "supplier_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "master_import_rows" ADD CONSTRAINT "master_import_rows_import_job_id_fkey" FOREIGN KEY ("import_job_id") REFERENCES "master_import_jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
