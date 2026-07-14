# DBA-004 Current-State Assessment

Assessment date: 2026-07-14

Branch: `feature/dba-004-master-data`

Approved base: `92b64ec`, tagged `v0.3-dba003-merged`.

## Baseline validation

- `npm run prisma:generate`: blocked by the restricted environment redirecting the Prisma engine checksum request to `127.0.0.1:9` (`ECONNREFUSED`). The repository remains on Prisma 6.19.3.
- `npx prisma validate --schema apps/api/prisma/schema.prisma`: passed.
- `npm run build -w @flowcraft/api`: passed.
- `npm run build -w @flowcraft/web`: application compilation passed; the final Next.js TypeScript worker was blocked by sandbox `spawn EPERM`.
- `npm test -w @flowcraft/api`: both existing test files were discovered, but Node test workers were blocked before execution by sandbox `spawn EPERM`.
- `npm audit`: passed with zero vulnerabilities.

## Reusable foundations

- `Tenant`, `Company`, `Branch`, `Plant`, `Location`, and the generalized organization hierarchy provide tenant/company ownership and organization context.
- `Currency`, `EnterpriseObject`, `Permission`, `AccessRole`, `WorkflowDefinition`, `AuditLog`, and `NumberSeries` provide reusable platform services.
- `DigitalDnaService`, `AuditService`, `TenantContextService`, JWT and permission guards, organization scope service, list-query DTOs, and API-backed settings components are reusable.
- The idempotent seed preserves the first 50 FEOM objects and the accepted DBA-002/DBA-003 tenant, security, company, branch, and enterprise hierarchy data.
- Existing `Warehouse`, `Item`, `Customer`, and `Supplier` tables contain live foundation data and must be extended in place.

## Duplicate and conflicting models

- `Item` uses legacy `sku`, `name`, `itemType`, string `uom`, reorder level, and standard cost. DBA-004 will retain these columns for compatibility while adding authoritative item-code, classification, UOM, planning, tracking, approval, audit, and effective-date fields.
- `Warehouse` uses CUID identifiers, `code`, and `name`. It will retain its identifier and legacy columns while receiving tenant, plant/location, hierarchy, Digital DNA, stock policy, archive, and effective-date fields.
- `Customer` and `Supplier` are separate legacy company-scoped masters. They will remain specialization tables and link to a new shared `BusinessPartner` parent without duplicating their existing codes or names.
- No Country, State, City, Address, Contact Person, Payment Term, Tax Code, Price List, or Credit Profile model currently exists despite those concepts being referenced by the DBA-004 specification.

## Required additions and extensions

- Add geography/address/contact models; UOM and effective conversion history; item group/category/attribute, brand, and manufacturer models.
- Extend Item and Warehouse and add zones, bins, stock statuses, batches, and serial identities.
- Add the Business Partner parent, customer/supplier groups, address/contact links, payment/credit/delivery terms, Incoterms, price lists, and tax masters.
- Add change-request, duplicate-rule, merge-history, import mapping/job/row, and export job metadata foundations.
- Register all DBA-004 enterprise objects and expose permission-protected `/api/v1/master-data` routes with real API-backed settings pages.

## Compatibility decisions

- Existing models are extended, never replaced or duplicated. Legacy required fields stay populated during the transition.
- Configurable business concepts remain strings backed by API validation lists rather than client-only enums.
- Global masters use nullable `tenantId`; tenant-specific rows are isolated and global rows are read-only unless explicitly managed by Super Admin.
- Typed service configuration centralizes searchable fields, scope fields, validation rules, archive behavior, and Digital DNA prefixes.
- Item planning fields are effective-dated at the master level in DBA-004; future operational revisions can add version tables when transactions start referencing item planning snapshots.
- Import/export implements metadata, validation-only/dry-run behavior, row errors, duplicate detection, summaries, and audit events without introducing a full Excel execution engine.

## Migration risks

- Legacy Item, Warehouse, Customer, and Supplier rows require nullable transitional fields or deterministic backfill before stricter validation can be enforced.
- Existing CUID primary keys are retained for the extended legacy tables to avoid rewriting foreign keys or historical identities; new tables use UUIDs.
- New uniqueness constraints must include tenant/company scope and tolerate nullable global scope correctly.
- DBA-002 and DBA-003 migrations are immutable. DBA-004 will use one new additive migration and must not reset the database.

## Historical-data risks

- Referenced masters are archived, never physically deleted. Codes, batch/serial identities, warehouses, conversions, and business-partner merge mappings remain resolvable.
- Effective dates preserve prior UOM conversions and master applicability. Item planning changes do not rewrite transaction payloads.
- Automatic destructive business-partner merge and stock-balance updates are explicitly out of scope.

## Security impact

- Every tenant-owned query must use the authenticated tenant; company-owned records additionally validate company access.
- Organization scope is enforced when records reference a company, plant, location, or warehouse context.
- Controllers use JWT and permission guards and contain no direct Prisma calls.
- Writes, archives, imports, change requests, and safe merge metadata create audit events.

## API impact

- A new `MasterDataModule` will provide versioned routes below `/api/v1/master-data` using common pagination, filtering, validation, error, permission, and archive conventions.
- The legacy `/api/v1/masters` endpoints remain available for backward compatibility while new clients use the DBA-004 APIs.
- Master search must filter object types by permission and records by tenant/company scope.
- OpenAPI decorators require a Swagger dependency not currently installed; route and DTO contracts will remain source-defined unless the existing dependency policy is expanded.

## UI impact

- Add a `/settings/master-data` dashboard plus API-backed list pages for the requested master categories.
- Item and business-partner pages need domain tabs while continuing to use the existing Next.js shell, typography, colors, loading/error/empty states, and permission-aware actions.
- No new UI framework is required.

## Seed impact

- Preserve all accepted seed rows and the first 50 FEOM object codes.
- Add registry entries, permissions, geography, UOM, classification, warehouses/statuses, partners/terms, Incoterms, and representative item masters using upsert or scoped uniqueness.
- Seed must remain safe to run repeatedly and must not create stock balances or operational transactions.
