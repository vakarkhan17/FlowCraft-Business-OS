# DBA-004 Enterprise Master Data Implementation

Implementation date: 2026-07-14

Branch: `feature/dba-004-master-data`

Base: `92b64ec` / `v0.3-dba003-merged`.

## Architecture summary

DBA-004 introduces a shared master-data platform below `/api/v1/master-data`. A central backend resource registry maps each public resource to its Prisma delegate, object permission, allowed input fields, searchable code/name fields, tenant/company behavior, Digital DNA prefix, hierarchy parent, and archive policy. Controllers contain no Prisma access.

The service layer applies field whitelisting, authenticated tenant ownership, company and organization scope, object-action permission checks, resource-specific validation, pagination/search/sort/filter behavior, audit events, and archive-only historical preservation. Configurable strategies and master types remain API-governed strings rather than client-only enums.

## Models added

- Geography and party detail: `Country`, `State`, `City`, `Territory`, `Address`, `ContactPerson`.
- Measurement and classification: `UnitOfMeasure`, `UomConversion`, `ItemGroup`, `ItemCategory`, `ItemAttributeDefinition`, `ItemAttributeValue`, `Brand`, `Manufacturer`.
- Warehouse and traceability: `WarehouseZone`, `Bin`, `StockStatus`, `Batch`, `SerialNumber`.
- Business partner: `BusinessPartner`, `CustomerGroup`, `SupplierGroup`, `BusinessPartnerAddress`, `BusinessPartnerContact`.
- Commercial and tax: `PaymentTerm`, `CreditTerm`, `CreditProfile`, `DeliveryTerm`, `Incoterm`, `PriceList`, `TaxCategory`, `TaxCode`.
- Governance and movement: `MasterDataChangeRequest`, `DuplicateDetectionRule`, `MasterDataMergeHistory`, `MasterImportMapping`, `MasterImportJob`, `MasterImportRow`, `MasterExportJob`.

New tables use UUID identifiers. Accepted legacy model identifiers remain unchanged.

## Existing models extended

`Item` is extended in place with tenant ownership, immutable Digital DNA, authoritative item code, classification, UOM references, manufacturing/replenishment/valuation/costing/tracking policies, planning quantities, warehouse/supplier/tax references, physical dimensions, approval, effective dates, audit actors, and archive fields. Legacy `sku`, `name`, `itemType`, `uom`, reorder level, and standard cost columns remain intact.

`Warehouse` is extended in place with tenant, plant/location/parent links, immutable Digital DNA, type, materialized hierarchy, stock policy, archive fields, and effective dates. Legacy `code`, `name`, company, branch, and identifier columns remain intact.

`Customer` and `Supplier` remain specialization tables and link optionally to the shared `BusinessPartner` parent so legacy rows remain valid during migration. They receive group/default/contact/commercial fields and timestamps.

## Migration

Migration: `20260714000000_enterprise_master_data_platform`.

The migration was generated as an offline Prisma 6 datamodel diff because Docker Desktop was unavailable during generation. It is additive and contains deterministic backfills for accepted Item and Warehouse rows before enforcing tenant ID, item code, Digital DNA, and update timestamps. It contains no `DROP TABLE` or `DROP COLUMN` statement and does not modify DBA-002 or DBA-003 migrations.

Generate and inspect:

```powershell
npx prisma migrate diff --from-schema-datamodel docs/implementation/backups/schema-before-dba-004.prisma --to-schema-datamodel apps/api/prisma/schema.prisma --script
```

Apply to an existing development database without reset:

```powershell
npx prisma migrate deploy --schema apps/api/prisma/schema.prisma
```

For a new local development database, the normal command is:

```powershell
npx prisma migrate dev --schema apps/api/prisma/schema.prisma
```

Never use `prisma migrate reset` on an accepted FlowCraft database.

## Enterprise Object Registry

DBA-004 adds 38 new registry objects, including `MASTER_DATA`, geography/detail, conversion/classification/attribute, warehouse/traceability, business-partner link, commercial/tax, governance, import, and export objects. Existing FEOM codes for Item, Item Category, Unit of Measure, Warehouse, Customer, and Supplier are reused. The first 50 FEOM objects are neither renumbered nor replaced.

Every object receives the existing VIEW, CREATE, EDIT, ARCHIVE, APPROVE, REJECT, SUBMIT, CANCEL, IMPORT, EXPORT, and CONFIGURE permission actions. The seeded Super Admin receives all permissions.

## Item strategy rules

The API accepts MTS, MTO, ATO, ETO, CTO, and HYBRID manufacturing strategies; MIN_MAX, REORDER_POINT, FIXED_QUANTITY, EOQ, KANBAN, JIT, and MANUAL replenishment policies; FIFO, WEIGHTED_AVERAGE, STANDARD_COST, and MOVING_AVERAGE valuation; and NONE, BATCH, SERIAL, or BATCH_AND_SERIAL tracking.

Batch and serial flags must match the tracking method. Stock items require a stock UOM. New API-created Items require group, category, base UOM, and stock UOM. Historical item codes and Digital DNA are never rewritten by update DTOs.

## UOM conversion rules

Conversion factors must be greater than zero, source and target UOMs must differ, and both UOMs must be visible to the tenant. The effective-from value participates in uniqueness so global and item-specific conversion history remains traceable. Conversion rows are archived/effective-dated rather than overwritten destructively.

## Business partner specialization

`BusinessPartner` is the shared legal/commercial identity. Partner type supports CUSTOMER, SUPPLIER, BOTH, DISTRIBUTOR, DEALER, CONTRACTOR, TRANSPORTER, CONSULTANT, and MANUFACTURER. A Customer specialization requires CUSTOMER or BOTH; Supplier requires SUPPLIER or BOTH. Address/contact roles are effective-dated link records. Merge handling records source, target, reason, actor, and preserved references but performs no automatic destructive merge.

## Warehouse hierarchy rules

Warehouse and zone parent changes validate tenant/company context and reject self/descendant cycles. Descendant paths and levels are adjusted on approved moves. Branch, Plant, and Location references must belong to the selected company. Bins must belong to the selected warehouse and any selected zone must belong to that same warehouse. Archive retains warehouse identity and reporting history.

## Batch and serial rules

Batch number is unique by Company and Item; expiry must follow manufacture date. Serial number is unique by Company and its warranty end cannot precede its warranty start. Current warehouse/bin fields are informational until stock-ledger delivery. DBA-004 creates no stock balance or movement records.

## Governance rules

Change requests preserve requested JSON, reason, actor, approval state, and future workflow reference. Duplicate checks combine exact code/name matches with enabled tenant rules. Merge history is metadata-only and cannot mutate source/target masters. All governance writes are audited.

## Import/export foundation

The API supports CSV/XLSX job metadata, validation-only mode, dry run, duplicate detection, normalized row payloads, row errors, summary counts, rollback markers, audit events, and export filters/selected fields. A non-dry-run import can create valid, non-duplicate records through the same validation service. XLSX binary parsing and exported-file storage are intentionally deferred; jobs return `METADATA_READY` until an approved file engine is introduced.

## Security enforcement

- JWT and permission guards protect the module.
- Resource actions require either the resource object permission or the shared MASTER_DATA action.
- Tenant-owned and tenant/global records are scoped in every list/search/get/write operation.
- Non-super users are restricted to their authenticated company.
- Company records validate the accepted organization node and `UserOrganizationAccess` scope.
- Controllers never access Prisma directly.
- Writes, archives, imports, exports, and merge metadata use the append-only audit service.

## API list

- `GET /api/v1/master-data/dashboard`, `/resources`, `/search?q=`, and `/openapi`.
- `GET|POST /api/v1/master-data/geography/:resource` for countries, states, cities, and territories.
- Generic list/create/get/update/archive endpoints for every resource in the backend registry.
- Resource groups include geography, UOM/conversions, item groups/categories/attributes, brands/manufacturers/items, warehouses/zones/bins/statuses, batches/serials, partners/customers/suppliers/groups/addresses/contacts, payment/credit/delivery terms, credit profiles, Incoterms, price lists, tax categories/codes, and change requests.
- `POST /api/v1/master-data/duplicate-check`.
- `POST /api/v1/master-data/merge-history`.
- `GET|POST /api/v1/master-data/imports` and `/exports`.

`GET /api/v1/master-data/openapi` returns an OpenAPI 3.1 route document without adding a Swagger dependency to the accepted application bootstrap.

## Frontend routes

The primary dashboard is `/settings/master-data`. Dedicated routes exist for countries, states, cities, territories, UOM/conversions, item groups/categories/attributes, brands, manufacturers, items, warehouses/zones/bins/statuses, batches, serial numbers, business partners, customers, suppliers, customer/supplier groups, addresses, contacts, payment/credit/delivery terms, credit profiles, Incoterms, price lists, tax categories/codes, import, and change requests.

The Item screen exposes General, Classification, UOM, Planning, Procurement, Sales, Inventory, Manufacturing, Quality, Costing, Attachments, and Audit tabs. Business Partner exposes General, Customer, Supplier, Addresses, Contacts, Payment and Credit, Tax, Price List, Attachments, and Audit tabs. Costing and attachment tabs are explicit placeholders for later modules.

## Seed data

The idempotent seed adds four countries and representative states/cities; 13 UOMs; seven item groups and categories; six warehouse types and nine stock statuses; three business partners and customer/supplier specializations; six payment terms and four credit terms; ten editable Incoterms; a manufacturer/brand, tax example, contact/address link, credit profile, and six representative Items. It creates no stock balances.

Run twice:

```powershell
npx prisma db seed --schema apps/api/prisma/schema.prisma
npx prisma db seed --schema apps/api/prisma/schema.prisma
```

## Tests

`master-data.spec.ts` covers country/state/city consistency; territory/item-group/warehouse cycles; UOM and conversions; item code/tracking/UOM/strategy rules; warehouse/bin consistency; batch/serial uniqueness and date validation; business partner and specializations; payment/credit rules; duplicate detection; change requests; import dry run; tenant/company/organization isolation; audit generation; seed idempotency; and migration preservation.

Validation commands:

```powershell
npm run prisma:generate
npx prisma validate --schema apps/api/prisma/schema.prisma
npm run build -w @flowcraft/api
npm run build -w @flowcraft/web
npm test -w @flowcraft/api
npm audit
```

## Known limitations and future integration

- Legacy Customer/Supplier links to Business Partner remain nullable until all customer datasets are migrated and verified.
- Item base/stock classification references remain nullable at database level for accepted legacy rows; API creation requires them.
- Global masters use nullable tenant scope and are maintained through service-level uniqueness checks because PostgreSQL treats nullable columns specially in compound uniqueness.
- Excel binary parsing, attachment storage, destructive duplicate merge, pricing lines, stock balances, reservations, inventory movements, quality transactions, and accounting postings are out of scope.
- Future stock-ledger work will treat warehouse/bin and batch/serial masters as immutable references and add movement history without rewriting DBA-004 identities.
- Future finance work may connect nullable tax accounts, partner credit events, price-list lines, and item costing revisions after Chart of Accounts governance is approved.

## Rollback guidance

Do not reset the database or rewrite migration history. Before applying, revert the application commits and remove only the unapplied DBA-004 migration. After application, create a reviewed forward migration that preserves exported master/history data, removes DBA-004 foreign keys/indexes/tables in dependency order, and removes only newly added legacy-table columns. Never remove or rewrite accepted Item, Warehouse, Customer, Supplier, transaction, organization, FEOM, credential, or audit identities.
