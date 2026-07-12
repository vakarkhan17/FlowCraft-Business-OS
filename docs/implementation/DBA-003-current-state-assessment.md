# DBA-003 Current-State Assessment

Assessment date: 2026-07-12

Branch: `feature/dba-003-enterprise-structure`

Base: DBA-002 merged and tagged `v0.2-dba002-merged`.

## Baseline validation

- `npm run prisma:generate`: blocked in the sandbox by a redirected Prisma engine checksum request (`ECONNREFUSED 127.0.0.1:9`).
- `npx prisma validate --schema apps/api/prisma/schema.prisma`: passed.
- API production build: passed.
- Web production build: passed.
- DBA-002 API tests: 13/13 passed.

## Reusable models and services

- `Tenant` provides the UUID multi-tenant boundary.
- `Company` and `Branch` already provide tenant ownership, Digital DNA, status, soft deletion, audit actor fields, and unique scoped codes.
- `UserRole`, `CompanyAccess`, and `BranchAccess` provide the current company/branch security foundation.
- `EnterpriseObject` and related permissions provide metadata-driven object registration and authorization.
- `AuditService`, `DigitalDnaService`, `TenantContextService`, JWT refresh, permission guards, list-query DTOs, and API-backed settings pages are reusable.
- No Department, Location, Cost Center, Profit Center, Enterprise Group, Legal Entity, Plant, Business Unit, Division, Section, Team, or generalized organization hierarchy models currently exist.

## Existing Company and Branch fields

Company already contains tenant, Digital DNA, company code/name, legal/address/contact/base-currency data, status, active/deleted flags, audit actors/timestamps, and deletion reason. Branch already contains tenant/company, Digital DNA, code/name/type, address/contact data, status, active/deleted flags, audit actors/timestamps, and deletion reason.

## Required extensions

- Extend Company with group/legal-entity/parent links, hierarchy/effective dates, organization type, reporting currency, locale, timezone, and fiscal calendar reference.
- Extend Branch with parent, optional plant link, hierarchy/effective dates, and timezone.
- Add typed organization entities and a generalized effective-dated `OrganizationNode` registry.
- Add relationship history, inheritance policies, effective-dated overrides, and user organization access.
- Add authoritative hierarchy/cycle/compatibility/inheritance/move-impact services and protected APIs.
- Add API-backed organization tree and settings routes.

## Conflicts and compatibility decisions

- Company and Branch will be extended in place, never duplicated.
- Existing `Warehouse` remains unchanged; Plant may reference it optionally.
- Existing company/branch access remains valid. `UserOrganizationAccess` augments it for generalized scopes.
- Node types and location types remain configurable strings. Stable inheritance and access levels are validated centrally in backend code rather than as customer-configurable database enums.
- Digital DNA update DTOs omit immutable fields.
- Organization node records provide the visual tree; typed business tables remain the authoritative detail records.

## Migration and historical-data risks

- Existing company/branch rows require non-destructive defaults for hierarchy path, level, effective-from, company type, timezone, and locale.
- Parent links must be introduced nullable and backfilled before stricter business validation.
- Physical deletion is prohibited for typed organization objects and published nodes.
- Moves create relationship-history rows and update effective hierarchy only after preview/cycle/scope validation. Historical queries use relationship history and effective dates; transaction references are never rewritten.
- The existing DBA-002 migration must remain unchanged. DBA-003 uses a new additive migration.

## Security impact

- Every typed record and node is tenant-scoped; company-scoped types also validate company ownership.
- Organization access assignments use explicit node, access level, descendant inclusion, and validity dates.
- Super Admin remains explicit; all other hierarchy mutations require organization permissions and matching access scope.
- Access changes and hierarchy moves are audited.

## API impact

New routes live below `/api/v1/organization`, follow existing JWT/permission/list-query conventions, keep controllers free of Prisma access, and return structured move-impact results before mutation.

## UI impact

New settings routes reuse the current design language. The primary enterprise-structure screen needs a server-backed tree, effective-date selection, node details, history/inheritance panels, preview-before-move, and keyboard-accessible move controls. No new UI library is required.
