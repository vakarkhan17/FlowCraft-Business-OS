# FlowCraft Solution Blueprint — Series Index

The FlowCraft Solution Blueprint (FCSB) is the official solution-architecture series for FlowCraft Business OS. It translates approved product intent and implementation evidence into governed executive, business, application, data, integration, security, deployment, solution, and product-governance guidance.

This index records publication identity and approval state. A document marked **Draft** or **Architecture Review Draft** is not an approved production baseline.

## Series register

| Document code | Volume title | Version | Status | Related milestones | Approval status | Last updated | Dependencies |
|---|---|---|---|---|---|---|---|
| FCSB-001 | [Executive and Business Architecture](./FCSB-Volume-1-Executive-and-Business-Architecture.md) | 1.0 Draft | Architecture Review Draft | DBA-001, DBA-002, DBA-003, DBA-004 | Pending Architecture Board review | 2026-07-15 | Controlled FEAPB series; FEOM/EOR definitions; DBA reports; release `v0.4-dba004-merged` |
| FCSB-002 | [Application and Platform Architecture](./FCSB-Volume-2-Application-and-Platform-Architecture.md) | 1.0 Draft | Architecture Review Draft | DBA-002 Platform Foundation; DBA-003 Enterprise Structure; DBA-004 Enterprise Master Data | Pending Architecture Board review | 2026-07-15 | FCSB-001; controlled FEAPB/FEOM/EOR definitions; DBA reports; current application, schema, migrations, tests, and deployment configuration |
| FCSB-003 | [Enterprise Data and Information Architecture](./FCSB-Volume-3-Enterprise-Data-and-Information-Architecture.md) | 1.0 Draft | Architecture Review Draft | DBA-002 Platform Foundation; DBA-003 Enterprise Structure; DBA-004 Enterprise Master Data; preparation for DBA-005 Finance Foundation and DBA-006 Inventory Ledger | Pending Architecture Board review | 2026-07-15 | FCSB-001; FCSB-002; controlled FEAPB/FEOM/EOR/UMF/UFT definitions; accepted Prisma schema, migrations, seed, tests, and DBA reports |
| FCSB-004 | [Integration Architecture](./FCSB-Volume-4-Integration-Architecture.md) | 1.0 Draft | Architecture Review Draft | DBA-002 Platform Foundation; DBA-003 Enterprise Structure; DBA-004 Enterprise Master Data; preparation for future integration milestones | Pending Architecture Board review | 2026-07-16 | FCSB-001; FCSB-002; FCSB-003; controlled FEAPB/FEOM/EOR definitions; current API, authentication, import/export metadata, schema, tests, and deployment evidence |
| FCSB-005 | [Security and Trust Architecture](./FCSB-Volume-5-Security-and-Trust-Architecture.md) | 1.0 Draft | Architecture Review Draft | DBA-002 Platform Foundation; DBA-003 Enterprise Structure; DBA-004 Enterprise Master Data; security gates for DBA-005 Finance Foundation, DBA-006 Inventory Ledger, and production deployment | Pending Architecture Board and Security Review | 2026-07-16 | FCSB-001; FCSB-002; FCSB-003; FCSB-004; controlled FEAPB/FEOM/EOR definitions; current identity, authorization, scope, audit, schema, tests, web-session, and deployment evidence |
| FCSB-006 | [Deployment and Operations Architecture](./FCSB-Volume-6-Deployment-and-Operations-Architecture.md) | 1.0 Draft | Architecture Review Draft | DBA-002 Platform Foundation; DBA-003 Enterprise Structure; DBA-004 Enterprise Master Data; production-readiness foundation; preparation for FCSB-007 Manufacturing Solution Architecture | Pending Architecture Board, Security, and Operations Review | 2026-07-16 | FCSB-001; FCSB-002; FCSB-003; FCSB-004; FCSB-005; current Compose, Dockerfile, environment, health, Prisma migration/seed, build/test, Git release, and implementation-report evidence |
| FCSB-007 | [Manufacturing Solution Architecture](./FCSB-Volume-7-Manufacturing-Solution-Architecture.md) | 1.0 Draft | Architecture Review Draft | DBA-002 Platform Foundation; DBA-003 Enterprise Structure; DBA-004 Enterprise Master Data; manufacturing architecture gate before Finance, Inventory, Quality, Maintenance, planning, and execution implementation | Pending Architecture Board, Manufacturing, Finance, Inventory, Quality, Maintenance, Security, and Operations Review | 2026-07-16 | FCSB-001; FCSB-002; FCSB-003; FCSB-004; FCSB-005; FCSB-006; current Item, UOM, plant, warehouse, traceability-master, organization, EOR, workflow, audit, transaction scaffold, test, migration, and deployment evidence |
| FCSB-008 | [Knowledge Graph and Governed AI Architecture](./FCSB-Volume-8-Knowledge-Graph-and-Governed-AI-Architecture.md) | 1.0 Draft | Architecture Review Draft | DBA-002 Platform Foundation; DBA-003 Enterprise Structure; DBA-004 Enterprise Master Data; governed semantic and AI architecture gate before FCSB-009 through FCSB-013 and any AI implementation | Pending Architecture Board, Data Governance, Security, Privacy, AI Governance, Manufacturing, Finance, Inventory, and Operations Review | 2026-07-16 | FCSB-001 through FCSB-007; current EOR, Digital DNA, audit, identity, permission, organization, workflow, report, transaction-link, master-governance, test, migration, dependency, and deployment evidence |
| FCSB-009 | [Universal Transaction Framework](./FCSB-Volume-9-Universal-Transaction-Framework.md) | 1.0 Draft | Architecture Review Draft | DBA-002 Platform Foundation; DBA-003 Enterprise Structure; DBA-004 Enterprise Master Data; transaction architecture gate before operational Finance, Inventory, Procurement, Sales, Manufacturing, Quality, Maintenance, Project, Service, and integration runtimes | Pending Architecture Board, Data Governance, Finance, Inventory, Procurement, Sales, Manufacturing, Quality, Maintenance, Security, Integration, and Operations Review | 2026-07-16 | FCSB-001 through FCSB-008; current generic transaction/link, EOR, number-series, workflow-definition, approval-schema, audit, Digital DNA, scope, master-data, report/layout/customization, test, migration, dependency, and deployment evidence |
| FCSB-010 | [Universal Document Framework](./FCSB-Volume-10-Universal-Document-Framework.md) | 1.0 Draft | Architecture Review Draft | DBA-002 Platform Foundation; DBA-003 Enterprise Structure; DBA-004 Enterprise Master Data; document architecture gate before workflow runtime, Studio publication, reporting, analytics, and domain-document implementation | Pending Architecture Board, Data Governance, Security, Privacy, Records Management, Legal, Reporting, Integration, and Operations Review | 2026-07-16 | FCSB-001 through FCSB-009; current EOR capability metadata, report-definition preview, print-layout/customization metadata, generic transaction/link, number-series, workflow-definition, approval-schema, audit, scope, schema, test, dependency, and deployment evidence |
| FCSB-011 | [Workflow Runtime Architecture](./FCSB-Volume-11-Workflow-Runtime-Architecture.md) | 1.0 Draft | Architecture Review Draft | DBA-002 Platform Foundation; DBA-003 Enterprise Structure; DBA-004 Enterprise Master Data; workflow runtime architecture gate before FlowCraft Studio publication, domain orchestration, operational approvals, timers, escalations, and distributed execution | Pending Architecture Board, Data Governance, Security, Internal Audit, Finance, Procurement, Sales, Manufacturing, Quality, Maintenance, Integration, and Operations Review | 2026-07-16 | FCSB-001 through FCSB-010; current versioned workflow-definition/step/transition metadata, approval-rule/request/history schema, EOR flags, transaction/document scaffolds, identity, permissions, organization scope, audit, Digital DNA, tests, dependencies, and deployment evidence |
| FCSB-012 | [FlowCraft Studio Architecture](./FCSB-Volume-12-FlowCraft-Studio-Architecture.md) | 1.0 Draft | Architecture Review Draft | DBA-002 Platform Foundation; DBA-003 Enterprise Structure; DBA-004 Enterprise Master Data; governed design, compiler, package, promotion, extension, and low-code architecture gate before reporting/analytics and any production Studio runtime | Pending Architecture Board, Product Governance, Security, Data Governance, Domain Owners, Engineering, Operations, Internal Audit, AI Governance, and Release Management Review | 2026-07-16 | FCSB-001 through FCSB-011; current EOR/object-field/relationship/capability/permission metadata, customization, report/layout/workflow/number-series scaffolds, administration routes, audit, Digital DNA, scope, tests, migrations, dependencies, and deployment evidence |
| FCSB-013 | [Reporting and Analytics Architecture](./FCSB-Volume-13-Reporting-and-Analytics-Architecture.md) | 1.0 Draft | Architecture Review Draft | DBA-002 Platform Foundation; DBA-003 Enterprise Structure; DBA-004 Enterprise Master Data; reporting architecture gate before Finance, Inventory, Manufacturing, and operational analytics implementation | Pending Architecture Board, Data Governance, Reporting, Finance, Inventory, Manufacturing, Security, Privacy, Operations, Internal Audit, AI Governance and Domain Owner Review | 2026-07-16 | FCSB-001 through FCSB-012; current report definition/field/filter metadata, generic preview, dashboard, layout/customization, transaction, master-data, organization scope, EOR, audit, Digital DNA, identity, permissions, workflow, test, migration, dependency, and deployment evidence |

**Next planned volume:** FCSB-014 — Finance Solution Architecture.

## Controlled 25-volume roadmap

Volume names are controlled at the roadmap level. A planned or future entry does not authorize implementation and may be refined only through the FCSB change-control process.

| Volume | Document code | Controlled title | Purpose boundary | Status |
|---:|---|---|---|---|
| 1 | FCSB-001 | Executive and Business Architecture | Product intent, business capabilities, operating model, governance, and roadmap | Drafted — Architecture Review Draft |
| 2 | FCSB-002 | Application and Platform Architecture | Application boundaries, platform services, metadata execution, APIs, runtime seams, and extension model | Drafted — Architecture Review Draft |
| 3 | FCSB-003 | Enterprise Data and Information Architecture | Data ownership, master and transaction domains, lineage, effective dating, retention, analytics, and migration | Drafted — Architecture Review Draft |
| 4 | FCSB-004 | Integration Architecture | Integration patterns, contracts, APIs, events, files, identity federation, and partner connectivity | Drafted — Architecture Review Draft |
| 5 | FCSB-005 | Security and Trust Architecture | Threat model, identity, authorization, segregation of duties, privacy, audit, and assurance | Drafted — Architecture Review Draft |
| 6 | FCSB-006 | Deployment and Operations Architecture | Environments, topology, observability, resilience, backup, recovery, and release operations | Drafted — Architecture Review Draft |
| 7 | FCSB-007 | Manufacturing Solution Architecture | Manufacturing planning, material flow, costing, execution, quality, maintenance, and shop-floor concerns | Drafted — Architecture Review Draft |
| 8 | FCSB-008 | Knowledge Graph and Governed AI Architecture | FKG semantics, governed context, AI access, explainability, controls, and operating model | Drafted — Architecture Review Draft |
| 9 | FCSB-009 | Universal Transaction Framework | Common transaction semantics, lifecycle, posting effects, links, controls, and extension rules | Drafted — Architecture Review Draft |
| 10 | FCSB-010 | Universal Document Framework | Common business-document identity, version, status, approval, output, correction, and archival behavior | Drafted — Architecture Review Draft |
| 11 | FCSB-011 | Workflow Runtime Architecture | Workflow instances, approvals, timers, escalation, delegation, exceptions, and runtime audit | Drafted — Architecture Review Draft |
| 12 | FCSB-012 | FlowCraft Studio Architecture | Governed builders, metadata publication, packages, comparison, promotion, testing, and rollback | Drafted — Architecture Review Draft |
| 13 | FCSB-013 | Reporting and Analytics Architecture | Governed reporting, semantic measures, dashboards, exports, scheduling, and analytical consumption | Drafted — Architecture Review Draft |
| 14 | FCSB-014 | Finance Solution Architecture | General ledger, subledgers, posting, tax, treasury, assets, close, and financial controls | Planned |
| 15 | FCSB-015 | Inventory and Warehouse Architecture | Inventory ledger, movements, reservations, availability, valuation, traceability, and warehouse execution | Planned |
| 16 | FCSB-016 | Sales and Customer Architecture | Opportunity-to-cash processes, pricing, order fulfillment, billing, returns, and customer controls | Planned |
| 17 | FCSB-017 | Procurement and Supplier Architecture | Source-to-pay processes, supplier governance, purchasing, receiving, invoicing, and controls | Planned |
| 18 | FCSB-018 | Manufacturing Execution Architecture | Production orders, dispatch, material issue, labor, completion, genealogy, and shop-floor execution | Future |
| 19 | FCSB-019 | Quality Management Architecture | Quality planning, inspection, holds, nonconformance, corrective action, and traceability | Future |
| 20 | FCSB-020 | Maintenance and Asset Reliability Architecture | Asset hierarchy, preventive and corrective work, reliability, spares, and maintenance costing | Future |
| 21 | FCSB-021 | Project and Service Management Architecture | Projects, services, resource delivery, field work, time, cost, billing, and profitability | Future |
| 22 | FCSB-022 | Mobile and Offline Architecture | Mobile experience, device controls, synchronization, conflict resolution, and offline operation | Future |
| 23 | FCSB-023 | Performance and Scalability Architecture | Performance budgets, workload models, capacity evidence, scaling, and large-data patterns | Future |
| 24 | FCSB-024 | Product Governance and Release Architecture | Product decisions, compatibility, packaging, quality gates, releases, support, and lifecycle governance | Planned |
| 25 | FCSB-025 | Product Roadmap and Future Vision | Sequenced product evolution, investment horizons, dependencies, outcomes, and future-state narrative | Future |

## Source and authority hierarchy

1. Approved governance decisions and controlled architecture documents.
2. Approved FCSB volumes.
3. Approved FEAPB and controlled framework documents.
4. Accepted DBA implementation milestones, migrations, tests, and release tags.
5. Repository README and implementation reports.
6. Draft roadmaps and proposals.

Where sources conflict, the most recently approved higher-authority source governs. Repository implementation evidence governs claims about what software exists today; a conceptual or planned capability must never be described as implemented solely because it appears in a blueprint.

## Approval workflow

```mermaid
flowchart LR
  A["Author draft"] --> B["Evidence review"]
  B --> C["Architecture Board review"]
  C --> D{"Approved?"}
  D -- "No" --> E["Revise with decision record"]
  E --> B
  D -- "Yes" --> F["Approved FCSB baseline"]
  F --> G["Controlled implementation and release planning"]
```

## Repository evidence used by drafted volumes

- [Repository overview](../../README.md)
- [DBA-002 implementation report](../implementation/DBA-002-foundation-implementation.md)
- [DBA-003 implementation report](../implementation/DBA-003-enterprise-structure-implementation.md)
- [DBA-004 implementation report](../implementation/DBA-004-enterprise-master-data-implementation.md)
- [Current Prisma schema](../../apps/api/prisma/schema.prisma)
- [Application module composition](../../apps/api/src/app.module.ts)
- [Enterprise Object Registry seed definitions](../../apps/api/prisma/seed.ts)
- [Current web routes](../../apps/web/app)

The repository does not contain standalone FEAPB, UMF, UFT, FOST, or FKG controlled source documents at this baseline. Drafted FCSB volumes therefore describe their roles only where needed, record the limitation, and require controlled-source reconciliation before approval.

## Change control

- Each volume has an independent version and approval history.
- Material changes require an architecture decision or change request.
- Implemented-status claims require repository evidence or an accepted release artifact.
- Draft content cannot silently redefine an approved FEAPB, FEOM, EOR, DBA, security, or database decision.
- Volume titles and sequence are controlled through this index; additions, removals, or renaming require Architecture Board review.
- Superseded versions remain discoverable for audit and historical interpretation.
