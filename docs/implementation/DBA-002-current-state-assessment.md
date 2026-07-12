# DBA-002 Current-State Assessment

## Scope and baseline

Assessment date: 2026-07-11

Branch: `feature/dba-002-foundation`

Rollback tag: `pre-dba-002-foundation`
Remote: none configured

The repository is an npm-workspaces monorepo containing a NestJS API, Next.js web application, shared TypeScript package, PostgreSQL Docker service, and Prisma data model. The working tree was clean before assessment.

Baseline validation:

- `npm install`: passed; 685 packages audited, 0 vulnerabilities.
- `npm run prisma:generate`: passed with Prisma's package.json configuration deprecation warning.
- `npx prisma validate --schema apps/api/prisma/schema.prisma`: passed.
- `npm run build -w @flowcraft/api`: passed.
- `npm run build -w @flowcraft/web`: blocked by sandbox/process policy with `spawn EPERM` during Next.js production compilation. This is an environment failure rather than a reported TypeScript error.

## Existing models

The existing Prisma schema contains:

- Organization: `Client`, `Company`, `Branch`, and `Warehouse`.
- Security: `User` with an array of stable `Role` enum values.
- Configuration: `ClientSetting`, `ModuleSetting`, `CustomField`, and `CustomFieldValue`.
- Workflow and approval: `WorkflowDefinition`, `WorkflowStep`, `WorkflowTransition`, `ApprovalRule`, `ApprovalStep`, `ApprovalRequest`, and `ApprovalHistory`.
- Output and reporting: `PrintLayoutTemplate`, `PrintLayoutSection`, `ReportDefinition`, `ReportField`, and `ReportFilter`.
- Numbering and audit: `DocumentNumberingSeries` and `AuditLog`.
- Manufacturing/ERP data: `Item`, `Supplier`, `Customer`, `TransactionDocument`, `TransactionLink`, `ChartOfAccount`, `JournalEntry`, and `JournalLine`.

All current primary keys use CUID defaults. The DBA-002 foundation requires UUID defaults for new and reconciled foundation records.

## Existing APIs

The API currently uses the global prefix `/api`, with controllers for:

- `/auth`: login and current-user profile.
- `/companies`: companies plus nested branch and warehouse operations.
- `/customization`: module settings, custom fields, custom field values, and numbering series.
- `/dashboard`: summary and financial reports.
- `/masters`: items, suppliers, and customers.
- `/transactions`: documents and document links.
- `/workflows`: definitions and step reordering.
- `/print-layouts` and `/reports`.

Controllers accept inline object types and frequently use `any`; DTO validation, pagination, standardized error mapping, permission guards, and isolation checks are incomplete.

## Existing frontend screens

- Landing/manufacturing hero page and image.
- JWT login page.
- Static management dashboard.
- Customization page demonstrating module toggles, workflow ordering, custom fields, print layout, reports, approvals, and numbering.
- Shared application shell and API fetch helper.

The dashboard and customization demonstrations largely use local mock data. No DBA-002 settings or studio routes exist yet.

## Authentication behavior

Login looks up a globally unique email, checks `isActive`, verifies bcrypt hashes, and signs a JWT containing user, client, company, branch, and enum roles. The JWT guard validates a bearer token but does not refresh tenant/company/branch access from the database on each request. Role checks are enum based. There is no normalized role/permission assignment, no explicit tenant context abstraction, and no permission guard. The current login contract and token field compatibility must be preserved while adding `tenantId`, normalized role codes, and permission codes.

## DBA-002 overlaps and conflicts

- `Client` represents the same business boundary as DBA-002 `Tenant`. Compatibility decision: map it to the `tenants` table and rename the Prisma model to `Tenant`, updating application references.
- `Company` and `Branch` overlap directly and will be extended in place rather than duplicated.
- `User` overlaps directly but currently has a single company/branch and enum role array. It will be extended with tenant-scoped identity, defaults, soft deletion, and normalized assignments while retaining compatible JWT role values.
- `WorkflowDefinition` already owns steps and transitions. It will be extended with tenant, enterprise-object, publication, status, and effective-date metadata.
- `DocumentNumberingSeries` overlaps with DBA-002 Number Series. It will be reconciled into `NumberSeries` while retaining compatibility for existing document concepts through enterprise-object linkage.
- `AuditLog` overlaps directly and will be extended to the append-only DBA-002 shape.
- `CustomField` is company-specific runtime customization. `ObjectField` is platform object metadata. Both are retained because they serve distinct scopes, and the object registry will reference the same business entities rather than duplicate their tables.
- Existing role enum values do not model tenant-defined roles. A normalized `RoleRecord` model mapped to `roles` will coexist temporarily with the legacy enum only where required by existing approval-step compatibility.
- Existing email uniqueness is global; DBA-002 requires tenant-scoped uniqueness.
- Existing API prefix is `/api`; it will move to `/api/v1`, and the web helper will be updated with the login flow preserved.
- Existing migrations are absent and the migrations directory is incorrectly ignored.

## Reuse and extension decisions

- Preserve manufacturing masters, transactions, accounting, approvals, reports, layouts, dashboard, hero image, and customization UI.
- Extend existing company, branch, user, workflow, number-series, and audit concepts.
- Add currency/exchange-rate, enterprise-object metadata, normalized security, tenant context, permission enforcement, Digital DNA, and audit services.
- Keep PostgreSQL and Prisma as the system of record.
- Use soft deletion and archive endpoints for critical organization/user records.
- Use transactions and atomic database updates for generated numbers.
- Keep request-scoped tenant/company/branch filtering in services; never trust arbitrary client-supplied scope without validating it against JWT assignments.

## Migration risks

- Renaming `clients` to `tenants` and changing IDs from CUID to UUID cannot be safely applied to a populated production database without a staged data migration.
- Converting globally unique user email to tenant-scoped identity changes login lookup semantics.
- Replacing enum role arrays with relational assignments requires backfilling roles before removing legacy authorization data.
- Company base currency changes from text to a foreign key and requires currency backfill.
- Existing workflow and numbering records need enterprise-object backfill.
- The repository contains no committed Prisma migrations, so production ancestry cannot be proven from source control.
- The current database state is unknown. No reset or destructive migration will be used.

The generated migration will be reviewed as a development foundation migration. For a populated environment, use an expand/backfill/contract migration sequence and test it against a sanitized database copy before deployment.

## Compatibility decisions

1. Preserve public login response fields and add context fields rather than replacing them.
2. Preserve existing pages and manufacturing modules.
3. Keep legacy route behavior only where practical, while all new foundation routes use `/api/v1`.
4. Keep stable platform enums only for actual platform constants; configurable statuses and role names remain strings.
5. Prevent Digital DNA updates at DTO/service boundaries and never expose mutable setters for it.
6. Store audit snapshots as JSONB-compatible Prisma `Json`.
7. Make seed operations upserts or duplicate-skipping creates and source admin secrets from environment variables.
