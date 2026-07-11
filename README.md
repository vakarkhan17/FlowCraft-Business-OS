# FlowCraft ERP

FlowCraft ERP is a customizable manufacturing ERP foundation built with Next.js, NestJS, Prisma, and PostgreSQL. DBA-002 adds the production-oriented tenant, organization, currency, access-control, metadata, workflow, numbering, and audit foundation while preserving the manufacturing dashboard, hero, customization, reporting, print layout, approval, transaction, and accounting foundations.

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

Services:

- Web: `http://localhost:3000`
- API: `http://localhost:4000/api/v1`
- Health: `http://localhost:4000/api/v1/health`

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
  api/     NestJS v1 API, Prisma schema/migration, seed, and foundation tests
  web/     Next.js application, preserved ERP pages, settings, and studio screens
packages/
  shared/  Shared ERP constants and types
docs/
  implementation/  DBA-002 assessment, schema backup, and implementation report
```

Customization remains metadata-driven through custom fields, workflow definitions, print layouts, reports, approvals, number series, enterprise objects, and audit records. Historical exchange rates and published workflow versions are retained instead of overwritten.
