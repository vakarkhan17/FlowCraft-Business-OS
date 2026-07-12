# DBA-003 Enterprise Structure Implementation

Implementation date: 2026-07-12

Branch: `feature/dba-003-enterprise-structure`

Base: DBA-002 accepted and merged at `v0.2-dba002-merged`.

## Architecture

DBA-003 adds two coordinated layers. Typed organization tables hold business-specific data, while `OrganizationNode` is the generalized hierarchy, navigation, scope, and inheritance layer. A typed record is linked through `referenceId`; controllers use services only and never query Prisma directly.

Existing `Company` and `Branch` models are extended in place. Existing company/branch access remains valid, and `UserOrganizationAccess` adds explicit organization-node scope.

## Data model

New typed models are `EnterpriseGroup`, `LegalEntity`, `Plant`, `BusinessUnit`, `Division`, `Department`, `Section`, `Team`, `Location`, `CostCenter`, and `ProfitCenter`.

New framework models are:

- `OrganizationNode` for the current generalized tree.
- `OrganizationRelationshipHistory` for effective-dated parent changes.
- `OrganizationInheritancePolicy` for inherited setting behavior.
- `OrganizationSettingOverride` for effective-dated node overrides.
- `UserOrganizationAccess` for VIEW, OPERATE, APPROVE, MANAGE, and ADMINISTER scope.

All new business records use UUID identifiers, tenant ownership, scoped unique codes, effective dates, indexes, and soft archive fields where applicable. Digital DNA prefixes were added without changing existing prefixes.

`Company` now supports group, legal entity, parent company, reporting currency, fiscal calendar, organization type, locale, timezone, hierarchy path/level, and effective dates. `Branch` now supports parent branch, primary plant, timezone, hierarchy path/level, and effective dates.

## Migration

Migration `20260712143659_enterprise_structure_model` is additive. It creates the new tables, indexes, unique constraints, and foreign keys and adds nullable/defaulted fields to existing tables. The DBA-002 migration is unchanged. The migration was created and applied with:

```powershell
npx prisma migrate dev --schema apps/api/prisma/schema.prisma --name enterprise_structure_model
```

Before editing, the original schema was preserved at `docs/implementation/backups/schema-before-dba-003.prisma`.

## Hierarchy rules

The backend `ORGANIZATION_COMPATIBILITY` matrix is authoritative. The principal paths are group to legal entity/company; legal entity to company; company/branch/plant to operational structures; business unit/division to lower organizational structures; department to section/team; and same-type nesting for supported types.

Every create and move validates parent/child compatibility and company boundaries. Move preview checks the target before mutation and reports affected descendants, scoped users/security, workflows/reports, cost and profit centers, pending transactions, and historical impact. The committed move runs in a serializable transaction, rewrites descendant materialized paths/levels, and appends relationship history. A node cannot move below itself or one of its descendants.

Historical tree queries accept `effectiveDate`. They resolve the latest relationship record effective on or before that date and retain old parent relationships rather than rewriting transaction references.

## Inheritance

Inherited settings are resolved from root to selected node. Effective policy defaults are applied first and effective node overrides replace values nearer the leaf. Overrides retain validity windows, so historical evaluation is deterministic. Seeded policies cover timezone, locale, and approval policy.

## Security and audit

All routes require JWT authentication and object-action permission checks. Every query is tenant-scoped. Non-super users receive only explicitly assigned nodes and, when enabled, descendants. Direct typed-record reads and mutations re-check the corresponding node, preventing UUID-based scope bypass. Root creation is restricted to Super Admin. Move, archive, override, and access mutations require MANAGE or ADMINISTER scope as appropriate.

Hierarchy changes, typed record mutations, overrides, and organization access assignments are written through the existing append-only audit service. Credentials and Docker configuration are unchanged.

## API

The API is mounted below `/api/v1/organization`:

- `GET /tree` with optional `effectiveDate`.
- `GET|POST /nodes`, `GET|PATCH /nodes/:id`, and `POST /nodes/:id/archive`.
- `GET /nodes/:id/ancestors` and `/descendants`.
- `POST /nodes/:id/move/preview` and `/move`.
- `GET /nodes/:id/inherited-settings` and `POST /nodes/:id/overrides`.
- `GET|POST /organization-access` and archive by assignment ID.
- Paginated list/create/get/update/archive routes for `enterprise-groups`, `legal-entities`, `plants`, `business-units`, `divisions`, `departments`, `sections`, `teams`, `locations`, `cost-centers`, and `profit-centers`.

DTO validation uses the existing Nest validation pipeline. Errors use the existing application exception behavior. A generated OpenAPI document is not added because the project does not currently include Swagger dependencies; route and DTO coverage remain source-defined to avoid broad dependency changes in DBA-003.

## Screens

`/settings/enterprise-structure` provides an API-backed tree, search and type filtering, expand/collapse, historical effective-date selection, node details, relationship history, inherited settings, create/edit/archive actions, and preview-before-confirm move.

Dedicated API-backed settings pages exist for every typed organization resource and organization access. They reuse the current shell and foundation list components and preserve loading, error, empty, filter, pagination, and accessible button behavior.

## Seed

The idempotent seed retains the DBA-002 data and first 50 FEOM objects, then adds DBA-003 object registrations, permissions, and a representative enterprise hierarchy: enterprise group, legal entity, company, branch/plant, business unit, division, eight departments, section, team, three cost centers, one profit center, and office/factory locations. It also assigns the seeded administrator ADMINISTER access at the root and creates inheritance policies.

Run twice to verify idempotency:

```powershell
npx prisma db seed --schema apps/api/prisma/schema.prisma
npx prisma db seed --schema apps/api/prisma/schema.prisma
```

## Tests

`apps/api/test/organization.spec.ts` covers tenant isolation, duplicate codes, required fields, compatibility rules, invalid and cross-company parents, circular moves, preview impact, successful move/history, historical tree resolution, inheritance/overrides, descendant access, unauthorized scope, and required schema/seed artifacts. The API test script runs all `test/*.spec.ts` suites.

Validation commands:

```powershell
npx prisma format --schema apps/api/prisma/schema.prisma
npx prisma validate --schema apps/api/prisma/schema.prisma
npm run prisma:generate
npm run build -w @flowcraft/api
npm run build -w @flowcraft/web
npm test -w @flowcraft/api
npm audit
```

## Rollback

Do not reset the database and do not edit migration history. For an unreleased local environment, revert the DBA-003 application commit and use Prisma's normal migration-resolution process. For any shared or production-like database, create a reviewed forward migration that removes DBA-003 foreign keys/tables/columns only after preserving required organization and relationship-history data. Existing company, branch, user, permission, FEOM, credential, and Docker data must remain intact.

## Known limitations

- `fiscalCalendarId`, `productionCalendarId`, and default warehouse linkage remain optional identifiers because DBA-003 does not introduce calendar or warehouse redesigns.
- Workflow/report and pending-transaction move impacts are returned as explicit categories; deeper module-specific counts can be added when those modules persist organization-node references.
- OpenAPI generation is deferred until the existing application adopts a Swagger package and bootstrap convention.
