# FlowCraft ERP

FlowCraft ERP is a customizable manufacturing ERP foundation built with Next.js, NestJS, Prisma, and PostgreSQL.

## First Phase Scope

- JWT authentication with role-based guards
- Company, branch, and warehouse setup
- Item, supplier, and customer masters
- Module configuration, custom fields, workflow designer, print layout designer, and report builder foundations
- Purchase, sales, production, maintenance, and accounting transaction linking model
- Management dashboard API and responsive Next.js screens
- PostgreSQL schema designed to keep core ERP tables stable while client-specific behavior lives in configuration tables
- Docker-ready local deployment

## Quick Start

```bash
cp .env.example .env
npm install
docker compose up -d postgres
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Services:

- Web: http://localhost:3000
- API: http://localhost:4000/api
- Demo login: `admin@flowcraft.local` / `FlowCraft123!`

## Architecture

```text
apps/
  api/     NestJS API, Prisma schema, seed data
  web/     Next.js application with Tailwind CSS
packages/
  shared/  Shared ERP constants and types
```

Customization is modeled through SQL tables such as `custom_fields`, `workflow_definitions`, `workflow_steps`, `print_layout_templates`, `report_definitions`, `approval_rules`, `document_numbering_series`, and `audit_logs`. Transactions are linked through a stable document graph, so workflow changes do not delete or mutate historical transaction records.
