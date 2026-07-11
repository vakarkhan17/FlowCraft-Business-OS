# DBA-002 Foundation Implementation

## Summary

Implementation date: 2026-07-11

Branch: `feature/dba-002-foundation`

Migration: `20260711000000_foundation_platform_schema` (`foundation_platform_schema`)

The implementation extends the existing FlowCraft ERP repository. It does not create a parallel application or replace the manufacturing UI foundations.

## Existing models reused and reconciled

- `Client` was reconciled into `Tenant` and mapped to `tenants`.
- Existing `Company`, `Branch`, and `User` models were extended for tenant ownership, UUID identity, Digital DNA, status, and soft deletion.
- Existing `WorkflowDefinition` was extended for tenant/object ownership, versioning, publication, and effective dates; steps and transitions remain attached.
- Existing `DocumentNumberingSeries` was reconciled into `NumberSeries`.
- Existing `AuditLog` was expanded into the append-only platform audit shape.
- Manufacturing masters, transactions, links, approvals, accounting, dashboard, custom fields, print layouts, and reports were preserved.

## Models added

- `Currency`, `ExchangeRate`
- `AccessRole`, `Permission`, `RolePermission`, `UserRole`
- `CompanyAccess`, `BranchAccess`
- `EnterpriseObject`, `ObjectField`, `ObjectRelationship`

Foundation records use UUID primary keys. Existing non-foundation manufacturing records retain their prior identifiers to avoid unnecessary scope expansion.

## APIs

All routes are under `/api/v1`.

- `GET /health`
- Currency list/create/get/update/archive.
- Exchange-rate list/create/get with immutable historical versions.
- Company list/create/get/update/archive.
- Branch list/create/get/update/archive.
- User list/create/get/update/archive and role assignment.
- Role list/create/update, permission list, and role-permission assignment.
- Enterprise-object list/create/get/update, fields, and relationships.
- Workflow list/create/get/update/publish and compatible step reordering.
- Number-series list/create/update/next.
- Preserved dashboard, customization, masters, transactions, reports, print layouts, and authentication routes.

## Authentication and authorization

The bcrypt/JWT login flow and response compatibility are preserved. Login now blocks inactive, archived, or deleted users, records the last login time, and returns tenant, company, branch, normalized roles, and permissions. The JWT guard refreshes current access state from PostgreSQL on authenticated requests, so disabling a user or assignment takes effect without relying only on stale token claims.

Reusable role and permission guards provide consistent `401`/`403` behavior. New foundation services scope records by tenant and validate company/branch consistency. Super Admin bypass is explicit in the permission guard.

## Digital DNA and soft deletion

`DigitalDnaService` generates immutable values for tenant-aware users, companies, branches, and global currencies. Update DTOs intentionally omit Digital DNA fields. Company, branch, and user archive operations retain records and record reasons where supported.

## Audit implementation

`AuditService` writes append-only `audit_logs` records for foundation creates, updates, archives, access assignments, workflow publication, number-series configuration, and number generation. It adds trace IDs and removes password, token, secret, credential, and private-key values from snapshots. No audit update or delete endpoint exists.

## Number-series concurrency

The next-number service uses a serializable Prisma transaction and an atomic database increment. Generated numbers are returned as strings to avoid JavaScript precision and BigInt JSON serialization problems. Numbers are never decremented or reused.

## Seed data

The idempotent seed creates:

- `FLOWCRAFT-DEMO` / FlowCraft Demo Tenant.
- AED, USD, EUR, and INR.
- `FCMFG` / FlowCraft Manufacturing Demo LLC with AED base currency.
- `HO` / Head Office.
- Fourteen standard roles.
- Fifty FEOM-002 foundation object registrations.
- Object-action permissions and all permissions for Super Admin.
- Admin user, company access, branch access, and Super Admin assignment.
- A demo number series, warehouse, and two inventory items.

Development credentials default to `admin@flowcraft.local` / `FlowCraft123!`. Override with `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` before seeding shared environments.

## Frontend integration

The following routes use real authenticated APIs:

- `/settings/companies`
- `/settings/branches`
- `/settings/currencies`
- `/settings/exchange-rates`
- `/settings/users`
- `/settings/roles`
- `/studio/object-registry`
- `/studio/workflows`
- `/studio/number-series`

The shared foundation screen provides search, status filters, pagination, status badges, create forms, view/edit/archive actions where supported, loading/error/empty states, archive confirmation, and permission-aware controls. The full drag-and-drop workflow studio remains intentionally out of scope.

## Tests

The foundation test suite contains 13 passing tests covering:

- Company creation and duplicate rejection.
- Branch creation and tenant/company consistency.
- Currency duplicate rejection and invalid exchange rates.
- Inactive-user login rejection.
- Tenant isolation behavior.
- Role-permission identity.
- Digital DNA immutability.
- Concurrent number generation.
- Audit redaction.
- Published workflow immutability.

## Validation results

- `npm install`: passed.
- `npm run prisma:generate`: passed; Prisma emitted its package.json configuration deprecation warning.
- Prisma schema validation: passed.
- API production build: passed.
- Web production build: passed outside the sandbox; the sandbox initially blocked Next.js workers with `spawn EPERM`.
- Foundation tests: 13 passed outside the sandbox; the sandbox initially blocked Node test workers with `spawn EPERM`.
- `npm audit`: 0 vulnerabilities.

## Database validation and environment blockers

Docker is not installed on the current host. Port 5432 responds locally and `.env` points to an existing `flowcraft` database, but Prisma migration status returned an unspecified schema-engine error after its sandbox restriction was removed. Because the database may contain the pre-DBA-002 schema and no migration ancestry exists in the repository, no destructive reset, migration application, or seed execution was attempted.

For a disposable empty development database, use a new database named `flowcraft_erp` and run the commands below. For a populated database, first create a sanitized backup and implement an expand/backfill/contract migration from the legacy `clients`/CUID schema; do not apply the from-empty foundation migration directly.

## Exact local commands

```powershell
Copy-Item .env.example .env
npm install
docker compose up -d postgres
npm run prisma:generate
npx prisma validate --schema apps/api/prisma/schema.prisma
npx prisma migrate dev --schema apps/api/prisma/schema.prisma
npx prisma db seed --schema apps/api/prisma/schema.prisma
npm run build -w @flowcraft/api
npm run build -w @flowcraft/web
npm test
npm audit
npm run dev
```

## Remaining limitations

- The approved FEOM-002 source document was not present as a repository file; the seed registers the requested 50 foundation objects from the supplied DBA-002 scope. Codes should be compared against the controlled FEOM-002 register before production promotion.
- The initial migration is suitable for an empty database. A populated legacy database needs a staged data migration.
- OpenAPI packages were not present in the project, so Swagger decorators were not added; DTO validation and route contracts are implemented.
- Pre-existing report, layout, customization, master, and transaction builders still use `any` for schema-flexible legacy payloads. The DBA-002 foundation code uses explicit DTOs and `unknown`; replacing the legacy dynamic payloads requires typed metadata discriminators and is documented as follow-up work rather than misrepresenting their current open-ended shape.
- The settings forms currently accept related UUIDs directly rather than providing lookup dialogs.
- Role assignment and workflow publication APIs exist, but richer dedicated assignment/publishing dialogs remain future UI work.
- No database-backed end-to-end test ran because a verified disposable DBA-002 PostgreSQL database was not available.
