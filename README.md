# FlowCraft ERP

FlowCraft ERP is a customizable manufacturing ERP foundation built with Next.js, NestJS, Prisma, and PostgreSQL. DBA-002 provides the tenant, currency, access-control, metadata, workflow, numbering, and audit foundation. DBA-003 adds effective-dated enterprise structure and organization scope. DBA-004 adds the governed enterprise master-data platform used by finance, purchasing, sales, inventory, warehouse, manufacturing, planning, quality, maintenance, reporting, migration, and the FlowCraft Knowledge Graph.

## Foundation capabilities

- JWT authentication with active/deleted-user enforcement.
- Tenant, company, and branch request context.
- Normalized tenant roles, object permissions, role assignments, company access, and branch access.
- Currencies and immutable, versioned exchange-rate history.
- Soft-deletable companies, branches, and users with immutable Digital DNA.
- FEOM enterprise object, field, and relationship metadata.
- Versioned workflow definitions with immutable published versions.
- Transactional, concurrency-safe number series.
- Append-only audit service with credential redaction and trace IDs.
- Idempotent demo seed with 50 FEOM foundation objects and object-action permissions.
- API-backed settings and studio screens with search, filters, pagination, loading/error/empty states, and permission-aware actions.
- Effective-dated enterprise group, legal entity, company, branch, plant, business unit, division, department, section, team, location, cost-center, and profit-center hierarchy.
- Historical tree queries, validated preview-before-move, inherited setting overrides, and descendant-aware organization access.
- Effective-dated geography, address/contact, UOM/conversion, item classification, Item, Warehouse, batch/serial, Business Partner, commercial-term, tax, and governance masters.
- Permission- and organization-aware master search, duplicate checks, change requests, import dry runs, export metadata, audit events, and archive-only historical retention.

## Quick start

```powershell
Copy-Item .env.example .env
npm install
docker compose up -d postgres
npm run prisma:generate
npx prisma migrate dev --schema apps/api/prisma/schema.prisma
npm run prisma:seed
npm run dev
```

The standard Prisma seed command can also be run directly from the repository root:

```powershell
npx prisma db seed --schema apps/api/prisma/schema.prisma
```

Services:

- Web: `http://localhost:3000`
- API: `http://localhost:4000/api/v1`
- Health: `http://localhost:4000/api/v1/health`
- Organization API: `http://localhost:4000/api/v1/organization`
- Enterprise structure UI: `http://localhost:3000/settings/enterprise-structure`
- Master Data API: `http://localhost:4000/api/v1/master-data`
- Master Data UI: `http://localhost:3000/settings/master-data`

Development seed defaults:

- Email: `admin@flowcraft.local`
- Password: `FlowCraft123!`

Set `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` before seeding any shared environment. The documented defaults are development-only.

## Validation

```powershell
npm run prisma:generate
npx prisma validate --schema apps/api/prisma/schema.prisma
npm run build -w @flowcraft/api
npm run build -w @flowcraft/web
npm test
npm audit
```

## Architecture

```text
apps/
  api/     NestJS v1 API, Prisma schema/migrations, seed, foundation, organization, and master-data tests
  web/     Next.js application, preserved ERP pages, settings, studio, enterprise structure, and master-data screens
packages/
  shared/  Shared ERP constants and types
docs/
  implementation/  DBA-002/DBA-003/DBA-004 assessments, schema backups, and implementation reports
```

Customization remains metadata-driven through custom fields, workflow definitions, print layouts, reports, approvals, number series, enterprise objects, master-data governance, and audit records. Historical exchange rates, hierarchy relationships, UOM conversions, master identities, and published workflow versions are retained instead of overwritten.
