# FlowCraft Solution Blueprint

## Volume 13 — Reporting and Analytics Architecture

| Attribute | Value |
|---|---|
| Document code | FCSB-013 |
| Version | 1.0 Draft |
| Status | Architecture Review Draft |
| Last updated | 2026-07-16 |
| Approval | Pending Architecture Board, Data Governance, Reporting, Finance, Inventory, Manufacturing, Security, Privacy, Operations, Internal Audit, AI Governance and Domain Owner Review |
| Related volumes | [FCSB-001](./FCSB-Volume-1-Executive-and-Business-Architecture.md) through [FCSB-012](./FCSB-Volume-12-FlowCraft-Studio-Architecture.md) |
| Next planned volume | FCSB-014 — Finance Solution Architecture |

This draft is a controlled architecture reference, not an implementation authorization. It records what the repository proves today and the governed direction required before a reporting runtime, an analytical store, external BI, or AI-assisted analytics is implemented.

## Chapter 1 — Purpose and Scope

FCSB-013 defines the architectural boundaries for reports, dashboards, governed datasets, metrics, semantic models, delivery, exports, analytical storage, and AI-assisted narratives in FlowCraft Business OS. Its audience is the Architecture Board, Reporting Product Owner, Data Governance, domain owners, Security, Privacy, Internal Audit, Engineering, QA, and Operations. It establishes common controls before Finance, Inventory, Manufacturing, Quality, Maintenance, and commercial teams build domain-specific reporting.

The scope includes operational read models, dataset contracts, measure definitions, dimensions, time behavior, currency and unit semantics, access controls, certification, reconciliation, lineage, retention, scheduling direction, and external BI boundaries. It also governs how a user moves from a dashboard summary to domain detail without obtaining broader access than the source domain permits.

Out of scope are selecting a warehouse, lakehouse, scheduler, rendering engine, BI vendor, CDC product, semantic technology, retention duration, or an AI model. Those remain decisions with requirements and evidence. This volume does not define the finance chart of accounts, inventory valuation method, manufacturing execution process, or domain posting rules; those belong to their respective solution volumes.

FCSB-001 through FCSB-012 provide business intent, platform, data, integration, security, operations, manufacturing, AI, transaction, document, workflow, and Studio boundaries. FCSB-014 through FCSB-025 will refine domain reporting contracts. Reporting architecture must be approved first because a visually plausible report can otherwise hard-code ungoverned calculations, bypass domain controls, and create a competing version of truth.

## Chapter 2 — Executive Summary

The repository contains useful reporting foundations, not a completed analytics platform. Prisma models hold report definitions, fields, filters, print-layout metadata, and JSON settings. The reports service lists definitions by company, permits administrators to create metadata, and previews the last 50 TransactionDocument records for the company. It returns XLSX and PDF as format labels, but no rendering, export file, queue, scheduling, subscription, semantic calculation, or delivery runtime is evidenced. The dashboard service aggregates selected operational tables and contains several fixed illustrative values; it is a dashboard scaffold rather than a certified KPI service.

The target direction is a governed path from authoritative domain facts through domain-owned read models and governed datasets to a semantic metric layer, report and dashboard services, and separately authorized output channels. Finance owns financial definitions, Inventory owns stock and valuation truth, Manufacturing owns production events, and Quality and Maintenance retain their domain authority. Reporting can explain, aggregate, and project those facts but cannot post, correct, or become their authority.

The target also requires tenant and organization scope, row and field controls, reproducible as-of results, named metric owners, versioned currency and UOM behavior, reconciliation, certification, lineage, workload isolation, and observable operations. Power BI or another external BI tool may consume governed semantic models only after a controlled connectivity and tenant-isolation decision. AI narratives are future, labelled, cited, permission-filtered assistance; they are never certification or source truth.

**Central architecture rule:** Reporting and analytics explain, aggregate and project business information, but they never become the authoritative source of operational, inventory, financial, quality or maintenance truth.

## Chapter 3 — Reporting and Analytics Principles

1. Domains remain authoritative; analytics is non-authoritative.
2. Finance owns financial formulas, exchange-rate interpretation, close status, and restatements. Inventory owns posted stock, availability, and valuation truth.
3. Every certified metric has a named business owner, formula, grain, aggregation rule, unit, currency behavior, time semantics, data-quality rule, and version.
4. Tenant, company, branch, plant, and organization scope are mandatory from source to cache, export, subscription, and external BI consumer. Row and field security are enforced server-side.
5. Direct uncontrolled production SQL, arbitrary SQL datasets, and direct external BI access to production tables are prohibited. Reports use approved datasets and contracts.
6. Operational and analytical workloads are separated. Performance claims require measured evidence; row limits, cancellation, pagination, queueing, and capacity controls are design requirements.
7. Event, posting, effective, snapshot, load, and as-of time are explicit. Effective-dated dimensions, backdated corrections, currency rates, and UOM conversions are versioned and reproducible.
8. Certified reports are versioned, reconciled, signed off, and retained with their source and report versions. Draft reports are visibly non-certified. Corrections create a new version and disclosure, not silent history replacement.
9. Export is separately authorized. Scheduled delivery and subscriptions re-evaluate access; convenience cannot widen access. Personal dashboards never become enterprise truth merely through reuse.
10. AI uses governed, permission-filtered context; it cites datasets and metric versions, is visibly labelled, requires human review for material use, cannot alter facts, post transactions, bypass security, or certify reports.

## Chapter 4 — Current Reporting Baseline

The accepted baseline is narrow and explicit. ReportDefinition is company-scoped and stores module, name, base entity, description, active state, and JSON settings. ReportField stores field path, label, type, order, grouping, aggregation, and formula metadata; ReportFilter stores path, operator, JSON value, and required status. The reports service reads this metadata directly with Prisma. Its creation payload is currently untyped and has no demonstrated review, validation, semantic resolution, report version, certification, lineage, or audit workflow.

The preview endpoint loads the company-scoped report definition then reads the newest 50 generic transaction documents for that company. It neither applies the stored field/filter metadata to a governed dataset nor demonstrates pagination, cost limits, output rendering, file custody, or domain-specific reconciliation. JWT authentication and the legacy roles guard protect the route; creation requires ADMIN or SUPER_ADMIN. These controls are useful foundations but not a complete report-security engine.

Dashboard services directly aggregate operational Prisma models. Layout and customization APIs store metadata and JSON configuration. The web shell exposes dashboard and customization/report navigation. Docker runs PostgreSQL, API, and web services only; packages and topology contain no evidenced warehouse, queue, scheduler, CDC/ELT, analytical database, embedded BI, or rendering stack. DBA-002 through DBA-004 establish foundation, organization, and master-data evidence, including metadata-oriented import/export jobs rather than a report-output engine.

~~~mermaid
flowchart LR
  A[Company-scoped ReportDefinition] --> B[ReportsService]
  B --> C[50 newest TransactionDocument rows]
  C --> D[Preview response]
  B --> E[XLSX/PDF labels only]
  F[DashboardService] --> G[Direct Prisma aggregates]
~~~

### Detailed architecture note: report definition

A report definition has an identity, owner, dataset binding, parameters, filters, selected fields, sorting, grouping, aggregation, visualization, output-format policy, access policy, version, certification state, retention class, and schedule compatibility. It is declarative: it states what is permitted to be asked of an approved dataset rather than embedding unrestricted database access. Dataset rules validate every field, filter, calculation, join, and export action.

The existing company-scoped ReportDefinition, ReportField, and ReportFilter models demonstrate initial metadata. Their JSON settings and formula fields must not be interpreted as an approved calculation or query language. The target design adds typed validation, field catalog resolution, versioning, review evidence, audit events, compatibility checks, and immutable certified versions. A report can be retired while preserving archived outputs and source truth.

~~~mermaid
flowchart LR
  A[Draft definition] --> B[Dataset validation]
  B --> C[Security and owner review]
  C --> D[Versioned publication]
  D --> E[Controlled execution]
  E --> F[Output and audit]
~~~

### Detailed architecture note: dashboard

A dashboard is a versioned composition of widgets, KPIs, charts, filters, layout, refresh behavior, and access policy. A widget binds to a governed dataset, report version, or certified metric; it cannot hide arbitrary direct SQL. Dashboards distinguish personal, shared, and certified states. Personal preferences may change layout or a permitted filter but do not alter a published metric, certification, or enterprise definition.

Cross-filter, drill-down, mobile layout, cache, alerts, export, and refresh are bounded features that require policy and tests. Dashboard queries preserve user, tenant, organization, classification, and as-of scope. Existing dashboard components and API summaries are current scaffolds. They do not establish a dashboard designer, alert engine, real-time refresh, caching, or certified scorecard platform.

~~~mermaid
flowchart TB
  A[Dashboard policy] --> B[Widget]
  C[Certified metric] --> B
  D[Governed dataset] --> B
  B --> E[Scoped query]
  E --> F[Rendered view]
  F --> G[Optional authorized drill-down]
~~~

### Detailed architecture note: drill-down and drill-through

Drill-down changes grouping within the same governed dataset; drill-through opens authorized supporting detail. Examples include KPI to transaction, financial statement to journal, inventory balance to movement, production metric to order, quality metric to inspection, and maintenance metric to work order. Both preserve the dataset/report version, filter set, hierarchy, tenant and organization scope, and as-of cutoff.

The target re-evaluates permission on every destination, even if the originating summary was visible. A source record that is hidden by field or row policy remains hidden. A drill link is an explanation path, not a bearer credential. Navigation is logged with correlation identifiers for sensitive or certified outputs.

~~~mermaid
sequenceDiagram
  participant U as User
  participant D as Dashboard
  participant S as Security policy
  participant R as Domain detail
  U->>D: Select KPI
  D->>S: Re-evaluate context
  S->>R: Authorize scoped detail
  R-->>U: Preserve filters and as-of time
~~~

### Detailed architecture note: report security

Security begins with authentication and proceeds through report permission, dataset permission, tenant/company/organization scope, row-level policy, field masking, purpose limitation, export entitlement, schedule entitlement, subscription entitlement, cache policy, temporary-link expiry, watermarking, and audit. Report access is server-enforced; a client filter is not a security control. Administrative report creation is also constrained by dataset and policy permission.

Cached results are labelled with their security context and invalidated or segregated when access changes. Secure outputs carry classification, expiry, and access checks. High-risk financial, personnel, customer, supplier, or regulated content needs domain, Security, and Privacy review. Existing JWT and roles guards are foundation evidence, not proof that this complete policy chain exists.

~~~mermaid
flowchart TD
  A[Authenticated request] --> B[Report permission]
  B --> C[Dataset and tenant scope]
  C --> D[Row and field policy]
  D --> E[Query or export entitlement]
  E --> F[Watermarked scoped result]
  F --> G[Audit event]
~~~

### Detailed architecture note: analytical tenant isolation

Tenant isolation is an invariant in shared and future dedicated analytical topologies. Every projection, dataset, semantic query, cache key, output, schedule, subscription, export object, and external BI binding includes a verified tenant key and appropriate company/organization scope. A shared store requires enforced partition keys and negative tests; a dedicated store requires controlled provisioning, isolation evidence, and lifecycle controls.

Cross-tenant administration is exceptional and governed by least privilege, purpose, approval, audit, and explicit display cues. Super Admin authority does not remove the need for tenant-bound query predicates. Power BI or other external BI future work must bind tenant scope to service identity and model policy; an administrative workspace cannot become an unrestricted aggregation point.

~~~mermaid
flowchart LR
  A[Request tenant and scope] --> B[Policy decision]
  B --> C[Tenant-partitioned dataset]
  C --> D[Scoped cache key]
  D --> E[Scoped output]
  E --> F[Recipient access recheck]
~~~

### Detailed architecture note: scheduling and subscription

A schedule defines owner, report version, frequency, timezone, fiscal calendar behavior, parameters, output mode, recipients, delivery channel, retry policy, quiet periods, expiry, retention, and disablement. It executes only published, compatible content. Before execution and before delivery, access and classification are rechecked. Recipient lists are governed entities, not arbitrary email strings.

No scheduler, queue, subscription runtime, calendar service, or delivery service is currently evidenced. Future selection must demonstrate idempotency, retry, cancellation, observability, secrets management, tenant isolation, audit, and recovery. Failed delivery cannot silently produce an untracked stale report.

~~~mermaid
sequenceDiagram
  participant S as Schedule
  participant P as Policy
  participant Q as Queue
  participant R as Renderer
  participant D as Delivery
  S->>P: Validate owner, version, recipients
  P->>Q: Authorize execution
  Q->>R: Produce scoped output
  R->>P: Recheck delivery access
  P->>D: Deliver or deny
~~~

~~~mermaid
stateDiagram-v2
  [*] --> Active
  Active --> Queued
  Queued --> Completed
  Queued --> Failed
  Failed --> Retrying
  Retrying --> Queued
  Active --> Disabled
  Completed --> Active
~~~

### Detailed architecture note: export and distribution

PDF, XLSX, CSV, JSON, email, secure download, SFTP, object storage, API delivery, and document packages are delivery patterns, not synonyms. Each requires classification, formatting, partial-export rules, encryption direction, watermarking, password-protection policy where approved, expiry, revocation, retention, audit, recipient verification, and large-output handling. FCSB-010 owns document custody semantics; FCSB-013 governs report-output policy.

The present preview merely advertises XLSX and PDF labels. It does not render files or provide download custody. Master-data export jobs are metadata/validation foundations and do not prove report export storage. Large exports must be asynchronous in a future approved runtime, with capacity limits and cancellation.

~~~mermaid
flowchart LR
  A[Certified or permitted report] --> B[Format renderer]
  B --> C[Classification and watermark]
  C --> D[Secure channel]
  D --> E[Expiry or retention]
  E --> F[Delivery audit]
~~~

### Detailed architecture note: reporting performance

A report contract declares query budget, expected result grain, pagination, row and aggregation limits, timeout, cancellation, concurrency class, cache eligibility, refresh behavior, and large-export path. Workload isolation separates interactive operational reads, background refresh, scheduled output, and future analytical exploration. Caching and pre-aggregation are policy-controlled optimizations, not correctness substitutes.

Materialized views, read replicas, queues, and analytical stores are possible future patterns but are not implemented or selected. Current code proves a 50-row preview limit only; it does not establish capacity, SLA, workload isolation, caching, replica use, or a performance benchmark. Capacity evidence and failure modes are required before production claims.

~~~mermaid
flowchart TB
  A[Interactive report] --> B[Budget and policy]
  B --> C[Governed dataset]
  C --> D[Paginated result]
  E[Large export] --> F[Future asynchronous path]
  G[Cache or pre-aggregation] --> C
  H[Operational workload] --- I[Analytical workload isolation]
~~~

### Detailed architecture note: analytical data-store direction

Operational PostgreSQL reads offer low-latency proximity but share operational workload. Read replicas may isolate reads but retain operational shapes. An operational data store may consolidate projections; a data mart may serve a bounded subject area; an enterprise warehouse may integrate governed history; a lake or lakehouse may support varied data forms; a columnar database or OLAP engine may accelerate analytical aggregation. Each has different cost, latency, governance, lineage, security, and operations implications.

No technology is selected by this draft. The repository’s PostgreSQL and Docker topology do not evidence a warehouse, lake, lakehouse, data mart, OLAP engine, columnar store, read replica, or operational data store. Selection follows workload measurements, tenant isolation, data volume, freshness, recovery, compliance, operational ownership, and domain roadmap requirements.

~~~mermaid
flowchart LR
  A[Operational PostgreSQL] --> B[Read replica option]
  A --> C[Operational data store option]
  C --> D[Data mart option]
  D --> E[Warehouse option]
  E --> F[Lake or lakehouse option]
  D --> G[Columnar or OLAP option]
~~~

### Detailed architecture note: analytics integration

Analytics integration may use controlled batch extracts, CDC, event projections, scheduled loads, incremental loads, full refresh, and reprocessing. It must address late-arriving facts, dimension changes, quarantine, reconciliation, lineage, backfill, deletion propagation, retention, and recovery. Data movement is governed by domain contracts and does not silently transform operational truth.

No CDC, ETL, ELT, streaming analytics, integration queue, or projection runtime is presently evidenced. Future implementation must provide source offsets or checkpoints, idempotency, tenant keys, schema compatibility, error quarantine, alerting, audit, and source-to-target reconciliation. A full refresh is not a substitute for a documented history and correction model.

~~~mermaid
flowchart LR
  A[Domain source] --> B[Extract, event, or CDC]
  B --> C[Validate and quarantine]
  C --> D[Projection or load]
  D --> E[Governed dataset]
  E --> F[Reconciliation and lineage]
  F --> G[Consumer]
~~~

### Detailed architecture note: dimensional modeling

Dimensional modeling is appropriate when stable analytical questions require controlled aggregation. A fact records an event, periodic snapshot, accumulating lifecycle snapshot, or transaction at declared grain. A dimension describes context; surrogate and natural keys have distinct roles. Conformed dimensions enable approved cross-domain analysis. Degenerate, junk, bridge, and slowly changing dimensions are explicit patterns, never accidental join artifacts.

The model choice follows domain semantics, volume, history, and query needs. A dimension change strategy must preserve as-of reporting and source traceability. FCSB-013 does not mandate a star schema, SCD type, or physical modeling technology. It requires that any analytical model disclose grain, keys, history, owner, security, and reconciliation.

~~~mermaid
classDiagram
  class FactProduction {+eventKey +dateKey +itemKey +quantity}
  class DimDate {+dateKey +fiscalPeriod}
  class DimItem {+itemKey +effectiveFrom}
  class DimPlant {+plantKey +hierarchyVersion}
  FactProduction --> DimDate
  FactProduction --> DimItem
  FactProduction --> DimPlant
~~~

### Detailed architecture note: external BI

External BI is a future consumption pattern for governed datasets and semantic models. It may use import, controlled DirectQuery, composite models, gateways, managed refresh, row-level security, tenant binding, certified workspaces, service identities, audit, and export policy. DirectQuery and import remain workload-driven choices; no model is selected by this document.

Power BI, Tableau, embedded BI, connectors, gateways, workspaces, semantic models, and service identities are not implemented in the repository. No external tool may access uncontrolled production tables. A future integration must map FlowCraft authorization to external policy, preserve tenant/company/organization isolation, expose lineage and reconciliation, and define workspace ownership, lifecycle, export, incident response, and offboarding.

~~~mermaid
flowchart LR
  A[FlowCraft governed dataset] --> B[Approved semantic contract]
  B --> C[Future external BI gateway]
  C --> D[Tenant-bound workspace]
  D --> E[Scoped consumer]
  F[Production tables] -. prohibited direct access .-> D
~~~

### Detailed architecture note: certification and publication

Publication is a lifecycle: Draft, Validated, Reviewed, Certified, Published, Superseded, Deprecated, Retired, and Archived. Validation tests formula, grain, security, currency, UOM, time behavior, quality, and performance envelope. Review obtains domain, data, Security, Privacy, and finance approval where applicable. Certification records evidence, reconciliation, owner, effective dates, classification, and version.

Certification is content-specific and does not imply runtime approval. A published report remains subject to access and output policy. Superseding a report does not erase historical certified output; it explains the successor and effective boundary. The present report metadata has no evidenced lifecycle, certification, or publication workflow.

~~~mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Validated
  Validated --> Reviewed
  Reviewed --> Certified
  Certified --> Published
  Published --> Superseded
  Superseded --> Deprecated
  Deprecated --> Retired
  Retired --> Archived
~~~

### Detailed architecture note: quality and reconciliation

Quality checks cover completeness, uniqueness, validity, consistency, timeliness, referential integrity, and domain-specific rules. Reconciliation compares source-to-report counts, amounts, quantities, balances, and controlled exceptions. A result is signed off by the accountable domain before financial, inventory, regulatory, or executive certification. A quality failure visibly affects certification and freshness; it is not hidden behind a last-successful display.

Exceptions record severity, scope, source, owner, investigation, disposition, and effect on outputs. Reconciliation must distinguish source defect, projection defect, semantic defect, report definition defect, and presentation defect. Current audit and master-data validation foundations can support future evidence; they do not prove a reporting reconciliation engine.

~~~mermaid
flowchart LR
  A[Source control total] --> C[Reconciliation]
  B[Dataset or report total] --> C
  C --> D{Match within approved tolerance}
  D -->|Yes| E[Validation evidence]
  D -->|No| F[Exception and investigation]
  F --> G[Certification blocked or disclosed]
~~~

### Detailed architecture note: lineage, provenance, and audit

Lineage follows source record to domain read model, projection, dataset, semantic metric, report/dashboard, export, recipient, and AI narrative. Each step records source version, transformation identity, owner, timestamp, correlation, Digital DNA where applicable, dataset version, report version, output hash, recipient, certification state, and access context. Audit is append-oriented evidence, not a substitute for lineage.

Lineage makes a result explainable and reproducible. It supports incident response, correction disclosure, regulatory inquiry, and report retirement. The existing audit and Digital DNA foundations are relevant evidence; a complete report-lineage runtime, output hash, and recipient tracking are future capabilities.

~~~mermaid
flowchart LR
  A[Source record] --> B[Domain read model]
  B --> C[Projection]
  C --> D[Dataset version]
  D --> E[Metric version]
  E --> F[Report or dashboard]
  F --> G[Export and recipient]
  F --> H[AI narrative with citations]
~~~

### Detailed architecture note: retention, archive, and reproducibility

Retention covers report definitions, dataset versions, semantic definitions, certified outputs, scheduled outputs, exports, dashboard snapshots, templates, source snapshots, audit records, and AI narrative provenance. Durations are not invented in this draft; they derive from policy, legal hold, domain obligations, privacy, classification, and customer commitments. Purge is controlled, logged, and suspended for legal hold.

Reproducibility means an approved user can explain a historical output through its report, dataset, metric, source, hierarchy, rate, conversion, and access versions. It does not require an uncontrolled permanent copy of sensitive data. Archive and restore processes are tested, owned, and observable before operational use.

~~~mermaid
flowchart LR
  A[Certified output] --> B[Version and hash]
  B --> C[Retention classification]
  C --> D[Archive or legal hold]
  D --> E[Controlled restore]
  E --> F[Reproduce with source and metric versions]
~~~

### Detailed architecture note: AI and natural-language analytics

Future governed AI capabilities may provide dashboard narratives, report summaries, variance explanations, natural-language query assistance, chart suggestions, anomaly explanations, forecast suggestions, executive briefs, data-quality explanations, and report discovery. They are assistants over governed datasets, never a substitute for domain analysis or a source of facts.

Permission filtering occurs before context assembly. Output cites report, dataset, metric, and period; labels uncertainty and AI generation; and is reviewed by a human for material financial, inventory, operational, safety, regulatory, or executive use. AI cannot invent facts, alter source data, post transactions, certify reports, bypass row or field security, or access uncontrolled production tables. No AI narrative, natural-language query, anomaly-detection, forecast, or feature-store runtime is evidenced.

~~~mermaid
flowchart LR
  A[Authorized question] --> B[Permission-filtered governed context]
  B --> C[Future AI service]
  C --> D[Labelled cited narrative]
  D --> E[Human review where material]
  E --> F[Non-authoritative presentation]
~~~

### Detailed architecture note: reporting operations and observability

Reporting operations observe query latency, error rate, queue depth, cache hit rate, refresh status, schedule success, export failures, data freshness, reconciliation failures, security denials, capacity, cost, alerting, runbooks, support ownership, incident response, and change history. Each metric has an owner and threshold direction defined during implementation; this document makes no unsupported SLA or capacity claim.

An incident distinguishes data-source failure, projection delay, semantic defect, report defect, authorization failure, output-delivery failure, and external BI/AI dependency failure. Operators need correlation identifiers, safe diagnostic access, customer communication procedures, rollback or disablement options, and post-incident evidence. Current Docker/API health and application tests are platform foundations, not a reporting observability runtime.

~~~mermaid
flowchart LR
  A[Report execution] --> B[Telemetry]
  B --> C[Operations dashboard]
  C --> D[Alert or runbook]
  D --> E[Incident triage]
  E --> F[Correction, disclosure, or disablement]
  F --> G[Audit and learning]
~~~

### Detailed architecture note: reporting threat model

The threat model covers cross-tenant leakage, IDOR, row-security bypass, field leakage, export abuse, scheduled misdelivery, cache leakage, SQL injection, query denial of service, metric manipulation, stale data, reconciliation failure, external BI workspace misconfiguration, service-account compromise, AI hallucination, prompt injection, data exfiltration, insider fraud, report tampering, and certification abuse. Controls combine server-side authorization, governed datasets, immutable versions, secure delivery, least privilege, validation, monitoring, audit, segregation of duties, and incident response.

Threat assessment is repeated for every new dataset, report class, renderer, scheduler, analytical store, connector, AI use case, and customer extension. Security and Privacy review classification and purpose limitation; Internal Audit reviews evidence and control operation. This architecture does not claim an analytical security engine exists; it specifies the controls a future runtime must prove.

~~~mermaid
flowchart LR
  A[Threat actor or defect] --> B[Dataset, report, cache, export, or AI surface]
  B --> C[Potential disclosure or wrong decision]
  C --> D[Prevent: policy and validation]
  C --> E[Detect: audit and observability]
  E --> F[Respond: revoke, correct, disclose]
~~~

## Chapter 5 — Target Reporting Architecture

The target has twelve governed layers. Authoritative domain sources retain operational truth. Domain-owned operational read models shape safe query views. Integration and projection processes create controlled copies, which feed governed datasets. A semantic model supplies terms, dimensions, measures, hierarchy, formula, and certification. Reporting and dashboard services execute approved definitions; scheduling, distribution, export rendering, analytical stores, and AI services are separate bounded capabilities. Security, lineage, audit, operations, and governance cross every layer.

Current: report metadata, generic preview, direct dashboard queries, identity, roles, organization foundations, audit foundations, Digital DNA, EOR, PostgreSQL, Prisma, Docker development topology. Planned: dataset contracts, semantic governance, certification, row/field policies, reconciliation, report versioning, performance budgets, and controlled delivery design. Future: projection runtimes, scheduler, rendering, analytical stores, external BI, AI narratives, and real-time dashboards. No layer authorizes implementation without its approved requirements, tests, and operations model.

~~~mermaid
flowchart TB
  A[Authoritative domain sources] --> B[Operational read models]
  B --> C[Integration and projections]
  C --> D[Governed datasets]
  D --> E[Semantic model and metrics]
  E --> F[Reports and dashboards]
  F --> G[Scheduling, export, distribution]
  C --> H[Analytical stores and marts]
  E --> I[AI assistance]
  J[Security, lineage, audit, operations] --- A
  J --- F
  J --- I
~~~

## Chapter 6 — Reporting Capability Model

An operational report presents current domain-controlled work: transaction, master-data, exception, control, management, financial, inventory, manufacturing, quality, maintenance, regulatory, or commercial information. An analytical dashboard and KPI scorecard summarize governed measures across time and dimensions. Ad hoc analysis is a constrained exploration of approved datasets; it is not arbitrary production access. A scheduled report, embedded analytic, export, and AI narrative are output or consumption capabilities with additional security and lifecycle obligations.

Domain owners are accountable for definitions and source reconciliation. The Reporting Product Owner governs artifacts and publication. Data Governance manages metadata standards; Security and Privacy approve exposure. Finance, Inventory, Manufacturing, Quality, Maintenance, Sales, and Procurement certify their respective content. Engineering implements approved runtime capability; Operations runs it; Internal Audit assesses evidence. A report type does not acquire certification merely because its UI is available.

~~~mermaid
flowchart LR
  A[Domain facts] --> B[Operational reports]
  A --> C[Governed datasets]
  C --> D[Analytical dashboards]
  D --> E[KPI scorecards]
  C --> F[Ad hoc analysis]
  D --> G[Scheduled outputs]
  C --> H[AI narrative]
~~~

## Chapter 7 — Reporting Artifact Model

A report definition is a reusable identity and intent; a report version is an immutable specification at publication. It binds to one approved dataset and defines fields, parameters, filters, sorting, grouping, calculations, visualization, access policy, output formats, and retention class. A dashboard contains versioned widgets, each bound to a report, dataset, or certified metric. A schedule invokes an eligible published version; a subscription names recipients and delivery policy, never a wider data scope.

Certification identifies business owner, review evidence, reconciliations, security classification, effective period, and lifecycle. Lineage records sources, transformations, dataset version, metric version, report version, execution context, output hash, and recipient. Archive records preserve required material without deleting domain truth. Report fields and filters in the current schema are metadata foundations; the full artifact model is target architecture.

~~~mermaid
classDiagram
  class ReportDefinition {+id +owner +dataset +status}
  class ReportVersion {+version +certification +effectiveFrom}
  class Dataset {+grain +source +freshness}
  class Metric {+formula +unit +owner}
  class Dashboard {+layout +classification}
  class Schedule {+timezone +frequency}
  class Output {+hash +expiry}
  ReportDefinition "1" --> "*" ReportVersion
  ReportVersion --> Dataset
  Dataset --> Metric
  Dashboard --> ReportVersion
  Schedule --> ReportVersion
  Schedule --> Output
~~~

## Chapter 8 — Dataset Architecture

A governed dataset is a named, versioned contract rather than a free-form query. It declares grain; domain owner; canonical source; allowed fields; measures; dimensions; keys; join rules; event, effective, and snapshot time; currency/UOM behavior; classification; row and field policy; freshness expectation; retention class; certification state; performance profile; and permitted consumers. It must expose a reconciliation approach and a consumer list.

Dataset builders cannot place arbitrary SQL against production tables into a report definition. A dataset may be a domain read model, a controlled projection, or a future analytical model, but each path must preserve source identity and scope. A change to grain, formula, source, security, or time behavior produces a new dataset version. Draft datasets may support controlled validation; they cannot feed certified financial, inventory, regulatory, or executive outputs.

~~~mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Validated
  Validated --> Reviewed
  Reviewed --> Certified
  Certified --> Superseded
  Superseded --> Archived
  Draft --> Retired
~~~

## Chapter 9 — Operational Read Model Architecture

Domain-owned read models make recurring operational questions safe and explicit without creating a second authority. A projection may produce a current-state view, historical view, as-of view, exception view, search view, dashboard view, or reconciliation view. It carries source identifiers, source version or event sequence, organization scope, classification, and freshness metadata. It is derived and can be rebuilt from the source under approved procedures.

Read models should reduce joins and reshape data for a known query pattern, but must not reinterpret finance postings, inventory movements, manufacturing events, or quality status. Domain ownership remains accountable for projection correctness and late/corrected data behavior. The current direct Prisma report preview is not a governed read model because it ignores report metadata and provides only a generic 50-row transaction sample.

~~~mermaid
flowchart LR
  A[Authoritative event or record] --> B[Domain projection]
  B --> C[Current-state read model]
  B --> D[As-of read model]
  B --> E[Exception read model]
  C --> F[Governed dataset]
  D --> F
  E --> F
~~~

## Chapter 10 — Semantic Layer Architecture

The semantic layer is a target governed contract, not an existing runtime. It defines business terms, measures, dimensions, hierarchies, calculations, units, currencies, time grains, aggregation and filter behavior, owner, certification, version, and deprecation. It prevents a label such as margin or available stock from standing in for a formula and scope.

A metric is not merely a stored expression. It has a business question, source dataset, grain, numerator/denominator where relevant, aggregation rules, null handling, rounding, inclusion/exclusion rules, effective period, owner, quality checks, and reconciliation method. A semantic model may be consumed by FlowCraft reports or a future external BI connector only through approved APIs or governed models. It must not become a back door to production tables.

~~~mermaid
flowchart LR
  A[Business term] --> B[Dimension and hierarchy]
  A --> C[Metric]
  C --> D[Formula and grain]
  D --> E[Certified semantic model]
  B --> E
  E --> F[Report, dashboard, external BI]
~~~

## Chapter 11 — KPI Governance

A KPI is a governed decision aid, not a decorative number. Its record includes identity, name, business question, formula, numerator, denominator, grain, period, unit, currency, owner, target, threshold, direction, scope, certification, data-quality rule, reconciliation, and retirement disposition. Finance owns financial KPIs; Inventory owns stock and valuation KPIs; Manufacturing owns production KPI interpretation. Reporting governs consistent presentation and lifecycle.

KPI candidates begin as draft, are tested against named source examples, validated for formula/currency/UOM/as-of behavior, reviewed by data governance and security, then certified by the accountable domain. A certified KPI cannot be silently edited. A correction results in a new version with an effective date and disclosure. Thresholds are policy decisions, separate from source facts.

~~~mermaid
stateDiagram-v2
  [*] --> Candidate
  Candidate --> Defined
  Defined --> Validated
  Validated --> Certified
  Certified --> Monitored
  Monitored --> Superseded
  Superseded --> Retired
~~~

## Chapter 12 — Metric and Measure Architecture

Measures are classified before aggregation. Additive measures such as transaction amount can sum across defined dimensions; semi-additive balances may sum across organization but not time; non-additive ratios must be recomputed from their components. Counts, distinct counts, rates, percentages, averages, durations, balances, snapshots, flows, actuals, targets, variances, and forecasts each require an explicit grain and aggregation rule. A dashboard must not average averages or sum daily balances as if they were flows.

Every measure defines source fields, calculation order, inclusion/exclusion, null and zero treatment, rounding, currency/UOM conversion, time semantics, owner, and test cases. Forecast and target values are labelled as such and cannot be confused with posted actuals. The present dashboard’s fixed values and simple direct aggregates are not proof of a measure engine or certified metric catalog.

~~~mermaid
flowchart TB
  A[Additive flow] --> E[Sum by approved dimensions]
  B[Semi-additive balance] --> F[Restrict time aggregation]
  C[Ratio or rate] --> G[Recompute numerator/denominator]
  D[Distinct count] --> H[Use defined identity grain]
  E --> I[Certified presentation]
  F --> I
  G --> I
  H --> I
~~~

## Chapter 13 — Dimension and Hierarchy Architecture

Dimensions describe how facts are grouped and filtered: date, time, fiscal period, organization, company, branch, plant, warehouse, item, customer, supplier, cost center, profit center, project, currency, UOM, batch, serial, machine, and work center. A hierarchy describes parent-child or roll-up relationships, such as company to branch to plant, or fiscal year to period. Both require a stable identity, effective dates, owner, source, security, and version.

Hierarchies are not inferred from screen labels. A report must declare the hierarchy version used so a historical certified result can be reproduced after reorganizations or master-data changes. A dimension change can affect aggregation and access, so Data Governance and the domain owner review it. Bridge structures are used where many-to-many relationships are explicit rather than guessed.

~~~mermaid
flowchart TD
  A[Enterprise] --> B[Company]
  B --> C[Branch]
  C --> D[Plant]
  D --> E[Warehouse]
  E --> F[Work center]
~~~

## Chapter 14 — Time and As-Of Reporting

Time must be declared, never assumed. Event time records when a business event occurred; posting time records when an authority posted it; transaction time records system knowledge; effective time expresses intended business validity; snapshot time marks a captured state; load time marks projection arrival; fiscal time maps to reporting calendars. An as-of report specifies both the business cutoff and, where needed, the knowledge cutoff.

Late-arriving facts, backdated corrections, closed periods, restatements, and changing hierarchies require explicit policies. A certified report retains the dataset, metric, hierarchy, rate, conversion, and source versions used. A user drilling from a historical total to detail keeps the same as-of context. The current preview orders by creation time; that is not a complete as-of reporting contract.

~~~mermaid
sequenceDiagram
  participant E as Event
  participant P as Posting
  participant R as Projection
  participant Q as As-of report
  E->>P: Business occurrence
  P->>R: Authorized record
  R->>Q: Versioned dataset
  Q->>Q: Apply cutoff and hierarchy version
~~~

## Chapter 15 — Currency Analytics

Currency analytics distinguish transaction, base, reporting, and group currency; rate type and rate date are part of the measure definition. Historical, average, closing, and constant-currency views are different interpretations. Finance owns rate selection, financial translation, rounding policy, and reconciliation. Reports identify source amount, applied rate, target currency, rate type, date, precision, and translation difference.

Currency conversion is never a hidden display convenience for a certified financial measure. A late rate or restatement creates a controlled new output version. Aggregation occurs only after the approved conversion rule is applied. The current exchange-rate master-data foundation and UI metadata are not evidence of a reporting conversion engine.

~~~mermaid
flowchart LR
  A[Transaction amount and currency] --> B[Finance-approved rate]
  B --> C[Base or reporting currency]
  C --> D[Metric calculation]
  D --> E[Reconciliation and disclosure]
~~~

## Chapter 16 — Quantity and UOM Analytics

Quantity analytics distinguish transaction quantity, base quantity, and reporting quantity. The chosen UOM, conversion, effective date, precision, tolerance, weight, volume, count, catch weight, and dual-UOM behavior belong in the dataset and metric contract. Inventory owns posted quantity truth and conversion interpretation. A report cannot add kilograms, pieces, and liters without an approved, applicable conversion.

Conversions are versioned and applied at the declared grain. Batch/serial context, item-specific conversions, and tolerances can change meaning. A metric that uses base quantity must say so; a measure presented in a reporting UOM must disclose conversion policy and rounding. UOM master-data and conversion metadata are foundations, not an analytical UOM runtime.

~~~mermaid
flowchart LR
  A[Posted quantity and UOM] --> B[Applicable versioned conversion]
  B --> C[Base or reporting quantity]
  C --> D[Aggregation restrictions]
  D --> E[Inventory reconciliation]
~~~

## Chapter 17 — Financial Reporting Boundary

Financial reporting includes trial balance, general ledger detail, balance sheet, income statement, cash flow, AP/AR aging, tax, cost center, profit center, budget-versus-actual, and future consolidation direction. It requires posted, closed, approved, currency-aware finance data; controlled restatement and period-close handling; finance reconciliation; and finance approval. A dashboard total is not a certified statement.

FCSB-014 owns financial semantics, account structures, posting authority, close, tax, treasury, and consolidation decisions. This volume supplies the reporting controls: governed dataset, semantic version, access, certification, distribution, lineage, and archival behavior. The current dashboard’s simple account/journal-line aggregation must not be represented as a certified financial reporting runtime.

~~~mermaid
flowchart LR
  A[Finance authoritative postings] --> B[Finance read model]
  B --> C[Certified finance dataset]
  C --> D[Statements and analysis]
  D --> E[Finance reconciliation]
  E --> F[Published output]
~~~

## Chapter 18 — Inventory Reporting Boundary

Inventory reporting covers on-hand, available, reserved, in-transit, blocked, quality-hold, aging, slow-moving, batch/serial traceability, valuation, movement history, stock reconciliation, and warehouse capacity. Each requires a clear stock-status, location, ownership, time, UOM, and valuation basis. Inventory owns the meaning of posted movements and balances; Finance owns financial valuation interpretation where they intersect.

FCSB-015 owns inventory and warehouse semantics. FCSB-013 requires every inventory report to declare its as-of cutoff, source movement/balance model, UOM, stock-status inclusion, batch/serial behavior, and reconciliation. A generic transaction preview and a current item standard-cost aggregate are not certified inventory valuation or a stock ledger.

~~~mermaid
flowchart LR
  A[Inventory movements] --> B[Inventory balance read model]
  B --> C[As-of stock dataset]
  C --> D[On-hand and movement reports]
  D --> E[Inventory and finance reconciliation]
~~~

## Chapter 19 — Manufacturing Reporting

Manufacturing reporting includes production-order status, plan versus actual, material consumption, output, yield, scrap, rework, WIP, capacity, downtime, schedule adherence, shortages, genealogy, cost variance, and OEE direction. Each is tied to a production event grain and a defined time boundary. Production values cannot be invented by a dashboard calculation when shop-floor evidence is absent or incomplete.

FCSB-007 establishes manufacturing architecture; FCSB-018 will own manufacturing execution semantics. This volume requires source event identifiers, item/UOM semantics, work center/plant hierarchy, quality hold interaction, cost and time definition, and reconciliation before certification. OEE is a direction for future governed modeling, not an implemented runtime.

~~~mermaid
flowchart LR
  A[Production order and events] --> B[Manufacturing read model]
  B --> C[Yield, scrap, WIP measures]
  C --> D[Plan versus actual dashboard]
  D --> E[Manufacturing owner review]
~~~

## Chapter 20 — Sales and Procurement Reporting

Sales reporting includes pipeline, quote, order, delivery performance, revenue, returns, margin, and customer performance. Procurement reporting includes requisitions, RFQs, purchase orders, supplier delivery, purchase-price variance, supplier performance, and open commitments. Both require a source document lifecycle, organization and customer/supplier scope, currency, UOM, timing, and approved financial interpretation.

Commercial reports may use shared dimensions and governed datasets, but they cannot redefine invoice, commitment, delivery, margin, or supplier status. Sales and Procurement approve their operational definitions; Finance approves financial impact. The target supports drill-through from a summary to authorized document detail while preserving filters and as-of context.

~~~mermaid
flowchart LR
  A[Sales documents] --> C[Commercial datasets]
  B[Procurement documents] --> C
  C --> D[Customer and supplier measures]
  D --> E[Dashboards and exceptions]
~~~

## Chapter 21 — Quality and Maintenance Reporting

Quality reports cover inspection results, pass/fail, holds, nonconformance (NCR), CAPA, defects, complaints, calibration, and quality cost direction. Maintenance reports cover work orders, downtime, MTBF, MTTR, preventive compliance, reliability, and spare consumption. Quality and Maintenance own the meaning of their events and statuses. A report must distinguish event occurrence, closure, correction, and as-of state.

Target dashboards correlate quality, maintenance, production, and inventory only through approved contracts and least-privilege access. A quality hold cannot be treated as available stock by a dashboard; downtime cannot be assumed to be a causal production loss without a controlled definition. Cross-domain metrics identify every contributing domain and obtain their reviews.

~~~mermaid
flowchart LR
  A[Inspection and CAPA events] --> C[Quality dataset]
  B[Maintenance work orders] --> D[Maintenance dataset]
  C --> E[Quality metrics]
  D --> F[Reliability metrics]
  E --> G[Governed cross-domain dashboard]
  F --> G
~~~

## Chapter 22 — Report Definition Architecture

The report-definition contract turns the current metadata scaffold into a governed artifact. Identity, owner, dataset, parameters, filters, fields, sort, group, aggregation, visualization, permitted output formats, access, version, certification, retention, and schedule compatibility are declared and validated. No definition contains uncontrolled production SQL. A certified definition is immutable; correction creates a successor version and preserves disclosure.

## Chapter 23 — Dashboard Architecture

Dashboards are versioned compositions of governed widgets, KPIs, filters, layouts, and refresh policies. Personal dashboards may personalize a permitted view but are non-certified. Shared and certified dashboards identify owner, audience, metric version, data freshness, security class, and publication evidence. Cross-filtering, mobile layouts, alerts, caches, and exports require separate approved runtime work.

## Chapter 24 — Drill-Down and Drill-Through

Drill-down changes an approved aggregation; drill-through opens supporting domain detail. Both preserve report version, dataset version, hierarchy, filter, tenant, organization, classification, and as-of context. Every destination re-evaluates access. A drill link is an explanation path, never an authorization token or a route around field masking.

## Chapter 25 — Report Security

Authentication, report and dataset permission, tenant/company/organization scope, row security, field masking, purpose limitation, export, scheduling, subscription, cache policy, temporary-link expiry, watermarking, and audit apply in order. Enforcement is server-side. Existing JWT and roles guards are foundations only; they do not prove row/field security, governed exports, or cache isolation.

## Chapter 26 — Analytical Tenant Isolation

Tenant isolation covers projections, semantic queries, cache keys, schedules, subscriptions, outputs, external-BI bindings, and administrative tooling. Shared storage requires enforced tenant keys and negative tests; dedicated stores require provisioning and lifecycle evidence. Super Admin access remains auditable, purpose-bound, and explicitly scoped. No cross-tenant aggregation is implicit.

## Chapter 27 — Report Scheduling and Subscription

Schedules declare owner, version, frequency, timezone, fiscal behavior, parameters, recipients, channel, retry, quiet period, expiry, retention, and disablement. Both execution and delivery recheck authorization. No scheduler, queue, delivery, or subscription runtime currently exists; any future choice must prove idempotency, retry, cancellation, operations, and audit.

## Chapter 28 — Export and Distribution Architecture

PDF, XLSX, CSV, JSON, email, secure download, SFTP, object storage, API delivery, and document packages each use classification, encryption direction, watermarking, expiry, retention, and audit. FCSB-010 governs document custody. Current XLSX/PDF preview labels and master-data export metadata do not prove rendering or secure report distribution. Large outputs use a future asynchronous path.

## Chapter 29 — Reporting Performance Architecture

Every executable report has a query budget, row/pagination limit, aggregation restriction, timeout, cancellation behavior, concurrency class, cache eligibility, and large-export path. Operational and analytical workloads are isolated. Current code establishes only a 50-row generic preview limit; it establishes no performance capacity, read-replica use, caching, materialization, or workload isolation.

## Chapter 30 — Analytical Data Store Direction

Operational PostgreSQL reads, read replicas, an operational data store, subject data marts, warehouse, lake, lakehouse, columnar database, and OLAP engine are evaluated conceptually against volume, freshness, cost, recovery, tenant isolation, governance, and operating ownership. No technology is selected or implemented. A choice follows approved requirements and measured workload evidence.

## Chapter 31 — Data Integration for Analytics

Batch extracts, CDC, event projections, scheduled/incremental loads, full refresh, dimension updates, reprocessing, quarantine, backfill, deletion propagation, and reconciliation are target patterns. None is evidenced as a runtime. Future movement retains source identity, tenant keys, checkpoints, idempotency, schema compatibility, lineage, errors, and recovery controls.

## Chapter 32 — Dimensional Modeling Direction

Facts, dimensions, grain, surrogate and natural keys, conformed dimensions, degenerate dimensions, snapshots, accumulating snapshots, bridges, junk dimensions, and slowly changing dimensions are approved vocabulary. They are chosen only where a controlled analytical question and history requirement justify them. Every physical model declares grain, keys, source, history, security, owner, and reconciliation.

## Chapter 33 — Power BI and External BI Architecture

Future Power BI, Tableau, and embedded BI may consume governed semantic contracts using approved import, DirectQuery, composite, gateway, refresh, workspace, service identity, tenant binding, row-security, export, lineage, and reconciliation controls. No connector, semantic model, workspace, gateway, or external BI runtime exists now. Direct access to uncontrolled production tables is prohibited.

## Chapter 34 — Report Certification and Publication

The lifecycle is Draft, Validated, Reviewed, Certified, Published, Superseded, Deprecated, Retired, and Archived. Formula, grain, security, currency, UOM, as-of behavior, quality, reconciliation, and performance evidence are reviewed. Finance review is mandatory for applicable financial content. Publication does not erase historical output or bypass runtime access policy.

## Chapter 35 — Data Quality and Reconciliation

Completeness, uniqueness, validity, consistency, timeliness, and referential integrity are tested with source-to-report count, amount, quantity, and balance reconciliation. Exceptions identify source, scope, owner, severity, investigation, and certification impact. Failures are disclosed, blocked, corrected, or versioned; they are not silently overwritten.

## Chapter 36 — Lineage, Provenance and Audit

Lineage identifies source record, read model, projection, dataset, semantic metric, report/dashboard, export, recipient, and AI narrative. It retains source/transformation/owner/timestamp/correlation/Digital DNA where applicable, versions, output hash, certification, and access context. Current audit and Digital DNA are foundations; a complete output-lineage runtime is future work.

## Chapter 37 — Retention, Archive and Reproducibility

Definitions, datasets, metrics, certified and scheduled outputs, exports, snapshots, templates, provenance, and AI context follow policy, classification, privacy, legal hold, and domain obligations. This draft sets no durations. Historical reproduction uses preserved report, dataset, metric, source, hierarchy, rate, conversion, and output versions without creating uncontrolled perpetual copies.

## Chapter 38 — AI and Natural-Language Analytics

AI may assist with narratives, summaries, variance explanation, natural-language query, chart suggestion, anomaly explanation, forecast suggestion, executive briefs, quality explanations, and discovery. Context is permission-filtered before model access; outputs are labelled and cited. Human review is mandatory for material use. AI cannot invent facts, certify, post, modify source data, or bypass security. No runtime exists today.

## Chapter 39 — Reporting Operations and Observability

Operations monitors latency, errors, queue depth, cache, refresh, schedule/export outcomes, freshness, reconciliation, security denials, capacity, cost, alerts, runbooks, support ownership, and incidents. Reporting incidents distinguish source, projection, semantic, report, authorization, delivery, and external-dependency failures. Current platform health is not an analytics operations runtime.

## Chapter 40 — Reporting Security and Threat Model

The threat model covers cross-tenant leakage, IDOR, row/field bypass, export abuse, misdelivery, cache leakage, injection, denial of service, metric manipulation, staleness, reconciliation failure, external-BI misconfiguration, service-account compromise, AI hallucination/prompt injection, exfiltration, insider fraud, tampering, and certification abuse. Controls are policy, validation, least privilege, secure delivery, immutable versions, monitoring, audit, segregation of duties, and response.

## Chapter 41 — Capability, Risk, Example and Responsibility Models

The following matrices make the target reviewable. Status is evidence-based: **Implemented foundation** means directly present but not necessarily complete; **Scaffold** means partial metadata or demonstrator behavior; **Planned** means an approved direction needing design; **Future** means concept only. Target maturity is not a delivery commitment.

### Reporting capability matrix

| Capability ID | Capability | Owner | Current status | Target maturity | Dependencies | Consumer | Priority |
|---|---|---|---|---|---|---|---|
| RPT-CAP-001 | Report definition metadata | Reporting | Implemented foundation | Governed versioned artifact | Prisma metadata | Report Publisher | P1 |
| RPT-CAP-002 | Report field metadata | Reporting | Implemented foundation | Catalog validated field | ReportDefinition | Report Publisher | P1 |
| RPT-CAP-003 | Report filter metadata | Reporting | Implemented foundation | Typed policy-safe filter | ReportDefinition | Report Publisher | P1 |
| RPT-CAP-004 | Generic report preview | Engineering | Scaffold | Dataset execution | Transactions | Administrator | P1 |
| RPT-CAP-005 | Report definition typing | Engineering | Planned | Validated contract | DTO standards | Publisher | P1 |
| RPT-CAP-006 | Report versioning | Reporting | Planned | Immutable published versions | Metadata repository | All consumers | P1 |
| RPT-CAP-007 | Report ownership | Reporting | Planned | Named accountable owner | Identity | Governance | P1 |
| RPT-CAP-008 | Report certification | Data Governance | Planned | Evidence-backed certification | Workflow direction | Executives | P1 |
| RPT-CAP-009 | Report retirement | Reporting | Planned | Archived controlled retirement | Retention policy | Audit | P2 |
| RPT-CAP-010 | Dataset registry | Data Governance | Planned | Governed catalog entry | EOR direction | Designers | P1 |
| RPT-CAP-011 | Dataset grain declaration | Data Governance | Planned | Enforced grain contract | Dataset registry | Analysts | P1 |
| RPT-CAP-012 | Dataset source contract | Domain Owner | Planned | Versioned source mapping | Read models | Engineers | P1 |
| RPT-CAP-013 | Dataset field catalog | Data Governance | Planned | Approved searchable catalog | Metadata model | Publishers | P1 |
| RPT-CAP-014 | Dataset freshness contract | Operations | Planned | Observable freshness | Projection runtime | Consumers | P2 |
| RPT-CAP-015 | Dataset consumer list | Reporting | Planned | Governed consumer inventory | Catalog | Governance | P2 |
| RPT-CAP-016 | Operational read models | Domain Owner | Scaffold | Domain-owned projections | Transactions/master data | Operational users | P1 |
| RPT-CAP-017 | Historical read models | Domain Owner | Planned | Rebuildable history model | Time policy | Analysts | P1 |
| RPT-CAP-018 | As-of reporting | Data Governance | Planned | Explicit temporal execution | Snapshot direction | Finance/Inventory | P1 |
| RPT-CAP-019 | Exception views | Domain Owner | Planned | Governed exception datasets | Read models | Operations | P2 |
| RPT-CAP-020 | Reconciliation views | Finance/Inventory | Planned | Signed-off control datasets | Domain controls | Controllers | P1 |
| RPT-CAP-021 | Business-term catalog | Data Governance | Planned | Governed semantic vocabulary | FCSB-008 | All users | P1 |
| RPT-CAP-022 | Semantic metric registry | Data Governance | Planned | Versioned metric catalog | Dataset registry | Analysts | P1 |
| RPT-CAP-023 | Measure engine | Engineering | Future | Tested calculation service | Semantic model | Reports | P1 |
| RPT-CAP-024 | Dimension catalog | Data Governance | Planned | Effective-dated dimensions | Master data | Analysts | P1 |
| RPT-CAP-025 | Hierarchy versioning | Organization | Planned | Versioned organizational rollups | Organization scope | Management | P1 |
| RPT-CAP-026 | Additive measure governance | Data Governance | Planned | Explicit aggregation rules | Metric registry | Analysts | P1 |
| RPT-CAP-027 | Ratio recomputation | Data Governance | Planned | Numerator/denominator model | Metric registry | Dashboards | P1 |
| RPT-CAP-028 | KPI catalog | Reporting | Planned | Owned certified KPIs | Semantic model | Management | P1 |
| RPT-CAP-029 | KPI threshold governance | Domain Owner | Planned | Policy-controlled thresholds | KPI catalog | Operations | P2 |
| RPT-CAP-030 | KPI retirement | Reporting | Planned | Versioned deprecation | KPI catalog | Executives | P2 |
| RPT-CAP-031 | Currency analytics | Finance | Scaffold | Rate-aware governed measures | Exchange rates | Finance | P1 |
| RPT-CAP-032 | Historical rate handling | Finance | Planned | Effective rate selection | Finance architecture | Finance | P1 |
| RPT-CAP-033 | Constant currency analysis | Finance | Future | Certified comparative method | Metric registry | Management | P2 |
| RPT-CAP-034 | UOM analytics | Inventory | Scaffold | Versioned conversion measures | UOM metadata | Inventory | P1 |
| RPT-CAP-035 | Dual-UOM handling | Inventory | Planned | Grain-safe conversions | Inventory architecture | Operations | P2 |
| RPT-CAP-036 | Financial statements | Finance | Scaffold | Certified financial runtime | FCSB-014 | Finance | P1 |
| RPT-CAP-037 | Trial balance reporting | Finance | Scaffold | Reconciled certified output | Finance postings | Finance | P1 |
| RPT-CAP-038 | Inventory on-hand reporting | Inventory | Planned | As-of stock truth | FCSB-015 | Inventory | P1 |
| RPT-CAP-039 | Inventory valuation reporting | Finance/Inventory | Future | Reconciled valuation report | FCSB-014/015 | Controllers | P1 |
| RPT-CAP-040 | Manufacturing analytics | Manufacturing | Scaffold | Event-backed KPI reports | FCSB-018 | Production | P1 |
| RPT-CAP-041 | Quality reporting | Quality | Scaffold | Certified quality measures | FCSB-019 | Quality | P2 |
| RPT-CAP-042 | Maintenance reporting | Maintenance | Scaffold | Reliability measures | FCSB-020 | Maintenance | P2 |
| RPT-CAP-043 | Sales reporting | Sales | Scaffold | Governed commercial datasets | FCSB-016 | Sales | P2 |
| RPT-CAP-044 | Procurement reporting | Procurement | Scaffold | Supplier performance datasets | FCSB-017 | Procurement | P2 |
| RPT-CAP-045 | Dashboard composition | Reporting | Scaffold | Versioned widgets and policies | Semantic model | Users | P1 |
| RPT-CAP-046 | Personal dashboards | Reporting | Planned | Policy-bounded personalization | Dashboard service | Users | P2 |
| RPT-CAP-047 | Certified dashboards | Reporting | Planned | Published certified composition | Certification | Executives | P1 |
| RPT-CAP-048 | Cross-filtering | Engineering | Future | Scoped governed interaction | Dashboard model | Users | P2 |
| RPT-CAP-049 | Drill-down | Engineering | Planned | Context-preserving aggregation drill | Dataset contracts | Users | P1 |
| RPT-CAP-050 | Drill-through | Engineering | Planned | Permission-rechecked detail navigation | Domain APIs | Users | P1 |
| RPT-CAP-051 | Row-level security | Security | Planned | Server-enforced row policies | Identity/scope | All users | P1 |
| RPT-CAP-052 | Field-level masking | Security/Privacy | Planned | Classification-based masking | Field catalog | Sensitive users | P1 |
| RPT-CAP-053 | Tenant isolation | Security | Implemented foundation | End-to-end analytical isolation | Scope controls | All tenants | P1 |
| RPT-CAP-054 | Company/organization scope | Organization | Implemented foundation | Policy propagation | Organization access | Managers | P1 |
| RPT-CAP-055 | Export authorization | Security | Planned | Distinct export permission | Permission model | Publishers | P1 |
| RPT-CAP-056 | Cached-result isolation | Engineering | Future | Scoped cache keys and invalidation | Cache decision | All users | P1 |
| RPT-CAP-057 | Audit of report access | Internal Audit | Planned | Query/output audit trail | Audit service | Audit | P1 |
| RPT-CAP-058 | Schedule execution | Operations | Future | Idempotent managed scheduler | Queue decision | Subscribers | P1 |
| RPT-CAP-059 | Report subscriptions | Reporting | Future | Access-rechecked subscriptions | Scheduler | Subscribers | P1 |
| RPT-CAP-060 | PDF rendering | Engineering | Future | Controlled renderer | Output architecture | Consumers | P2 |
| RPT-CAP-061 | XLSX rendering | Engineering | Future | Controlled workbook renderer | Output architecture | Consumers | P2 |
| RPT-CAP-062 | CSV rendering | Engineering | Future | Safe tabular export | Output architecture | Analysts | P2 |
| RPT-CAP-063 | Secure download | Security | Future | Expiring protected download | Document custody | Users | P1 |
| RPT-CAP-064 | Email delivery | Operations | Future | Classified delivery policy | Scheduler | Subscribers | P2 |
| RPT-CAP-065 | SFTP delivery | Integration | Future | Managed partner transfer | Integration architecture | Partners | P3 |
| RPT-CAP-066 | Large export processing | Engineering | Future | Asynchronous cancellable job | Queue/storage | Users | P1 |
| RPT-CAP-067 | Print layout metadata | Reporting | Implemented foundation | Report template governance | Layout models | Publishers | P2 |
| RPT-CAP-068 | Output watermarking | Security | Future | Classification-aware watermark | Renderer | Recipients | P2 |
| RPT-CAP-069 | Query budgeting | Operations | Planned | Enforced cost and timeout policy | Execution engine | All users | P1 |
| RPT-CAP-070 | Pagination | Engineering | Scaffold | Dataset-aware pagination | Query service | Users | P1 |
| RPT-CAP-071 | Query cancellation | Engineering | Future | User and operator cancellation | Queue/executor | Operations | P2 |
| RPT-CAP-072 | Pre-aggregation | Engineering | Future | Governed aggregate projections | Store decision | Dashboards | P2 |
| RPT-CAP-073 | Materialized views | Engineering | Future | Controlled refresh and lineage | Database decision | Reports | P2 |
| RPT-CAP-074 | Read replicas | Operations | Future | Isolated read workload | Deployment decision | Reports | P3 |
| RPT-CAP-075 | Analytical data mart | Data Governance | Future | Subject-area controlled mart | Store decision | Analysts | P2 |
| RPT-CAP-076 | Warehouse integration | Data Governance | Future | Enterprise historical integration | Architecture decision | Enterprise | P3 |
| RPT-CAP-077 | CDC ingestion | Integration | Future | Checkpointed source change feed | CDC decision | Analytics | P2 |
| RPT-CAP-078 | Batch integration | Integration | Future | Reconciled scheduled load | ETL decision | Analytics | P2 |
| RPT-CAP-079 | Data quality monitoring | Data Governance | Planned | Observable quality rules | Dataset model | Owners | P1 |
| RPT-CAP-080 | Reconciliation workflow | Finance/Inventory | Planned | Sign-off and exception handling | Workflow direction | Controllers | P1 |
| RPT-CAP-081 | Lineage catalog | Data Governance | Future | Source-to-output lineage | Metadata runtime | Audit | P1 |
| RPT-CAP-082 | Output hashing | Internal Audit | Future | Reproducible output evidence | Renderer/storage | Audit | P2 |
| RPT-CAP-083 | Retention policy execution | Privacy/Operations | Future | Hold/archive/purge controls | Records policy | Compliance | P1 |
| RPT-CAP-084 | Power BI connectivity | Reporting | Future | Governed tenant-bound connector | External BI decision | Analysts | P2 |
| RPT-CAP-085 | External semantic model | Data Governance | Future | Certified external model | Semantic layer | BI users | P2 |
| RPT-CAP-086 | Embedded analytics | Product | Future | Scoped embedded consumption | BI decision | Customers | P3 |
| RPT-CAP-087 | AI dashboard narrative | AI Governance | Future | Cited human-reviewed narrative | FCSB-008 | Executives | P2 |
| RPT-CAP-088 | Natural-language query | AI Governance | Future | Permission-filtered assistant | Semantic model | Users | P3 |
| RPT-CAP-089 | Reporting observability | Operations | Planned | Telemetry and runbooks | Runtime architecture | Support | P1 |
| RPT-CAP-090 | Customer report extension | Architecture Board | Open | Governed package extension | FCSB-012 | Customers | P2 |

### Reporting risk register

| Risk ID | Reporting area | Risk | Current condition | Impact | Target mitigation | Owner | Residual-risk direction |
|---|---|---|---|---|---|---|---|
| RPT-RSK-001 | Authority | Report mistaken for source truth | Preview/dashboard scaffolds exist | Wrong decisions | Domain authority labels and drill provenance | Reporting | Reduced |
| RPT-RSK-002 | Scope | Preview mistaken for runtime | 50-row generic preview | False readiness | Explicit scaffold status and runtime gates | Architecture | Reduced |
| RPT-RSK-003 | Dataset | Wrong dataset grain | No dataset contract | Misaggregation | Grain declaration and validation | Data Governance | Reduced |
| RPT-RSK-004 | Metric | Wrong aggregation | Formula metadata only | Incorrect KPI | Measure classification tests | Data Governance | Reduced |
| RPT-RSK-005 | Currency | Wrong exchange rate | No analytics engine | Financial misstatement | Finance-approved rate rules | Finance | Reduced |
| RPT-RSK-006 | UOM | Wrong conversion | Metadata foundation | Quantity error | Inventory conversion policy | Inventory | Reduced |
| RPT-RSK-007 | Time | As-of error | Created-time ordering only | Historical error | Explicit temporal contract | Data Governance | Reduced |
| RPT-RSK-008 | Time | Backdated correction omitted | No snapshot runtime | Restatement error | Versioned correction policy | Finance | Reduced |
| RPT-RSK-009 | Security | Cross-tenant leakage | Scope foundation only | Confidentiality breach | Tenant keys and negative tests | Security | Reduced |
| RPT-RSK-010 | Security | Row-security bypass | No report RLS engine | Unauthorized disclosure | Server policy enforcement | Security | Reduced |
| RPT-RSK-011 | Security | Field leakage | No field masking runtime | Privacy breach | Classification and masking | Privacy | Reduced |
| RPT-RSK-012 | Output | Export abuse | No output runtime | Data exfiltration | Distinct permission and audit | Security | Reduced |
| RPT-RSK-013 | Delivery | Scheduled misdelivery | No scheduler | Sensitive disclosure | Recheck recipient access | Operations | Reduced |
| RPT-RSK-014 | Cache | Cache leakage | No cache design | Cross-user disclosure | Scoped keys and invalidation | Engineering | Reduced |
| RPT-RSK-015 | Query | Direct SQL access | No governed datasets | Control bypass | Prohibit arbitrary production SQL | Architecture | Reduced |
| RPT-RSK-016 | Performance | Query denial of service | No query budget | Operational degradation | Limits, queue, cancellation | Operations | Reduced |
| RPT-RSK-017 | Performance | Slow report | No capacity evidence | User abandonment | Measure workload and isolate reads | Engineering | Reduced |
| RPT-RSK-018 | Output | Large export exhaustion | No async path | Resource exhaustion | Cancellable background jobs | Engineering | Reduced |
| RPT-RSK-019 | Freshness | Stale data | No projection runtime | Wrong decision | Freshness status and alerts | Operations | Reduced |
| RPT-RSK-020 | Reconciliation | Source/report mismatch | No reconciliation engine | Incorrect control output | Signed reconciliation | Domain Owner | Reduced |
| RPT-RSK-021 | Governance | Metric-definition drift | No versioned catalog | Inconsistent decisions | Owned versioned metrics | Data Governance | Reduced |
| RPT-RSK-022 | Governance | KPI manipulation | Fixed dashboard values | Misleading management | Formula and evidence review | Reporting | Reduced |
| RPT-RSK-023 | Governance | Duplicate metric | No semantic registry | Conflicting truth | Business-term catalog | Data Governance | Reduced |
| RPT-RSK-024 | Certification | Uncertified report use | No lifecycle | Reliance risk | Visible status and publication controls | Reporting | Reduced |
| RPT-RSK-025 | Finance | Wrong financial statement | Dashboard aggregation | Financial misstatement | FCSB-014 certification boundary | Finance | Reduced |
| RPT-RSK-026 | Inventory | Wrong inventory valuation | No valuation runtime | Stock/value error | FCSB-015 and reconciliation | Inventory | Reduced |
| RPT-RSK-027 | Manufacturing | Manufacturing KPI error | Partial transaction scaffolds | Production misdirection | Event-grain validation | Manufacturing | Reduced |
| RPT-RSK-028 | Quality | Quality metric error | No certified dataset | Compliance risk | Quality ownership review | Quality | Reduced |
| RPT-RSK-029 | Maintenance | Maintenance metric error | No reliability model | Availability misdecision | Maintenance review | Maintenance | Reduced |
| RPT-RSK-030 | Navigation | Incorrect drill-down | No drill contract | Misleading detail | Context preservation and recheck | Engineering | Reduced |
| RPT-RSK-031 | Provenance | Lost lineage | Audit only foundation | Unexplainable output | Source-to-output lineage | Data Governance | Reduced |
| RPT-RSK-032 | Audit | Missing audit | No report audit model | Weak assurance | Query/output audit events | Internal Audit | Reduced |
| RPT-RSK-033 | External BI | Workspace leak | No connector yet | Tenant breach | Tenant-bound workspace policy | Security | Reduced |
| RPT-RSK-034 | External BI | Service account compromise | No identity design | Broad disclosure | Least privilege and rotation | Security | Reduced |
| RPT-RSK-035 | Store | Data-mart drift | No integration controls | Divergent results | Reconciliation and lineage | Data Governance | Reduced |
| RPT-RSK-036 | Integration | CDC gap | No CDC runtime | Missing facts | Checkpoint and backfill controls | Integration | Reduced |
| RPT-RSK-037 | Integration | Late-arriving fact | No load policy | Historical inconsistency | Late-data handling | Data Governance | Reduced |
| RPT-RSK-038 | Modeling | SCD error | No history decision | Wrong historical rollup | Effective-dating design | Data Governance | Reduced |
| RPT-RSK-039 | Quality | Data-quality failure | Partial validations only | Low confidence | Rules, score, and disclosure | Data Governance | Reduced |
| RPT-RSK-040 | Retention | Retention violation | No report policy | Legal/privacy breach | Records and hold policy | Privacy | Reduced |
| RPT-RSK-041 | Reproducibility | Historical output unavailable | No output hash/versioning | Audit failure | Archive source/report versions | Internal Audit | Reduced |
| RPT-RSK-042 | AI | AI hallucination | No AI runtime | Executive misinformation | Cited governed context, review | AI Governance | Reduced |
| RPT-RSK-043 | AI | AI citation error | No narrative controls | Misleading explanation | Source links and review | AI Governance | Reduced |
| RPT-RSK-044 | AI | Prompt injection | Future AI surface | Data exfiltration | Input isolation and policy | Security | Reduced |
| RPT-RSK-045 | AI | Permission bypass | Future AI surface | Unauthorized disclosure | Filter before context | Security | Reduced |
| RPT-RSK-046 | AI | Executive misinformation | Narrative future | Poor decision | Material-use human approval | AI Governance | Reduced |
| RPT-RSK-047 | Integrity | Report tampering | No immutable versions | Fraud risk | Version, hash, audit | Internal Audit | Reduced |
| RPT-RSK-048 | Certification | Certification abuse | No approval workflow | False assurance | Segregation and sign-off | Architecture Board | Reduced |
| RPT-RSK-049 | Subscription | Unauthorized subscription | No service | Sensitive delivery | Recipient authorization | Reporting | Reduced |
| RPT-RSK-050 | Email | Sensitive data in email | No delivery policy | Privacy breach | Classification-aware delivery | Privacy | Reduced |
| RPT-RSK-051 | Download | Temporary-link leakage | No output custody | Unauthorized access | Short expiry and revocation | Security | Reduced |
| RPT-RSK-052 | Non-production | Test-data exposure | No analytics masking | Privacy breach | Masking and access policy | Privacy | Reduced |
| RPT-RSK-053 | Dashboard | Uncontrolled personal dashboard | Scaffold UI | Shadow truth | Label and certification controls | Reporting | Reduced |
| RPT-RSK-054 | Lifecycle | Orphaned report | No owner lifecycle | Stale exposure | Owner review and retirement | Reporting | Reduced |
| RPT-RSK-055 | Extension | Unsupported customization | JSON metadata foundations | Unsafe divergence | Controlled Studio package model | Architecture Board | Reduced |

### Report and dashboard example catalog

All examples are target candidates unless marked Scaffold; none is certified merely by appearing here.

| Example ID | Report/dashboard | Owner | Dataset | Grain | Main measures | Security | Certification | Main risk | Current status |
|---|---|---|---|---|---|---|---|---|---|
| RPT-EX-001 | Trial balance | Finance | Finance ledger | Account/period | Debit, credit, balance | Company/account | Finance | Wrong posting | Scaffold |
| RPT-EX-002 | Profit and loss | Finance | Finance statement | Account/period | Revenue, expense, profit | Company/cost center | Finance | Wrong formula | Scaffold |
| RPT-EX-003 | Balance sheet | Finance | Finance statement | Account/as-of | Assets, liabilities, equity | Company | Finance | As-of error | Scaffold |
| RPT-EX-004 | Cash flow | Finance | Cash movement | Movement/period | Inflow, outflow, net | Company | Finance | Classification | Planned |
| RPT-EX-005 | AP aging | Finance | Payables | Invoice/as-of | Outstanding, aging | Supplier/company | Finance | Late settlement | Planned |
| RPT-EX-006 | AR aging | Finance | Receivables | Invoice/as-of | Outstanding, aging | Customer/company | Finance | Wrong cutoff | Planned |
| RPT-EX-007 | Budget versus actual | Finance | Finance plan/actual | Account/period | Actual, budget, variance | Cost center | Finance | Version drift | Planned |
| RPT-EX-008 | Cost-center analysis | Finance | Finance ledger | Cost center/period | Spend, variance | Cost center | Finance | Hierarchy error | Scaffold |
| RPT-EX-009 | Profit-center analysis | Finance | Finance ledger | Profit center/period | Revenue, profit | Profit center | Finance | Allocation error | Planned |
| RPT-EX-010 | Cash forecast | Finance | Cash forecast | Date/currency | Forecast cash | Finance role | Finance | Forecast treated actual | Future |
| RPT-EX-011 | Inventory on-hand | Inventory | Stock balance | Item/location/as-of | Quantity | Warehouse | Inventory | Status omission | Planned |
| RPT-EX-012 | Inventory valuation | Finance/Inventory | Stock valuation | Item/location/as-of | Value, quantity | Warehouse/value | Joint | Rate/cost error | Future |
| RPT-EX-013 | Stock aging | Inventory | Stock lots | Lot/as-of | Quantity, age | Warehouse | Inventory | Time error | Planned |
| RPT-EX-014 | Batch traceability | Inventory/Quality | Traceability | Batch/event | Movements, status | Batch/plant | Joint | Lineage gap | Planned |
| RPT-EX-015 | Serial traceability | Inventory | Traceability | Serial/event | Status, movement | Serial/company | Inventory | Identity error | Planned |
| RPT-EX-016 | Inventory movement history | Inventory | Stock movement | Movement | Quantity, direction | Warehouse | Inventory | Duplicate movement | Planned |
| RPT-EX-017 | Slow-moving inventory | Inventory | Stock history | Item/location | Age, turns | Warehouse | Inventory | Wrong demand basis | Future |
| RPT-EX-018 | Inventory reconciliation | Inventory/Finance | Stock control | Item/as-of | Quantity, value variance | Controller | Joint | Mismatch concealed | Future |
| RPT-EX-019 | Warehouse capacity | Inventory | Warehouse capacity | Location/day | Used, available | Warehouse | Inventory | Stale data | Planned |
| RPT-EX-020 | Inventory availability | Inventory | Availability | Item/location/as-of | On-hand, reserved | Warehouse | Inventory | Hold omission | Planned |
| RPT-EX-021 | Purchase-order status | Procurement | Purchasing documents | PO/line | Open quantity, value | Supplier/company | Procurement | Lifecycle error | Scaffold |
| RPT-EX-022 | Supplier delivery performance | Procurement | Supplier delivery | PO line | On-time rate | Supplier | Procurement | Date rule | Planned |
| RPT-EX-023 | Purchase price variance | Procurement/Finance | Purchasing cost | PO line | Contract, actual variance | Supplier/cost | Joint | Currency error | Planned |
| RPT-EX-024 | Supplier performance | Procurement | Supplier scorecard | Supplier/period | Quality, delivery | Supplier | Procurement | Biased metric | Planned |
| RPT-EX-025 | Open commitments | Procurement/Finance | Commitment | PO/line | Open commitment | Company | Joint | Posting timing | Planned |
| RPT-EX-026 | Requisition aging | Procurement | Requisition | Request/as-of | Age, status | Department | Procurement | Status error | Planned |
| RPT-EX-027 | RFQ response | Procurement | RFQ | RFQ/supplier | Response rate | Buyer | Procurement | Confidentiality | Planned |
| RPT-EX-028 | Sales-order status | Sales | Sales documents | Order/line | Open quantity, value | Customer/company | Sales | Lifecycle error | Scaffold |
| RPT-EX-029 | Customer delivery performance | Sales | Delivery | Delivery line | On-time rate | Customer | Sales | Date rule | Planned |
| RPT-EX-030 | Sales margin | Sales/Finance | Sales profitability | Order/line | Revenue, margin | Customer/product | Joint | Cost allocation | Planned |
| RPT-EX-031 | Sales pipeline | Sales | Opportunity | Opportunity | Value, stage | Sales team | Sales | Forecast confusion | Planned |
| RPT-EX-032 | Returns analysis | Sales | Return documents | Return line | Quantity, reason | Customer/item | Sales | Incomplete reason | Planned |
| RPT-EX-033 | Customer profitability | Sales/Finance | Profitability | Customer/period | Revenue, cost, profit | Customer | Joint | Allocation error | Future |
| RPT-EX-034 | Quote conversion | Sales | Quotes | Quote/period | Rate, value | Sales team | Sales | Denominator error | Planned |
| RPT-EX-035 | Production-order status | Manufacturing | Production order | Order | Status, quantity | Plant | Manufacturing | Event gap | Scaffold |
| RPT-EX-036 | Production plan versus actual | Manufacturing | Production event | Order/day | Planned, actual | Plant/work center | Manufacturing | Timing error | Planned |
| RPT-EX-037 | Material consumption | Manufacturing/Inventory | Consumption | Order/component | Planned, actual | Plant | Joint | UOM error | Planned |
| RPT-EX-038 | WIP | Manufacturing/Finance | WIP snapshot | Order/as-of | Quantity, value | Plant | Joint | Snapshot error | Planned |
| RPT-EX-039 | Scrap | Manufacturing/Quality | Production quality | Order/event | Scrap quantity, rate | Plant | Joint | Classification | Planned |
| RPT-EX-040 | Rework | Manufacturing/Quality | Rework event | Order/event | Quantity, hours | Plant | Joint | Duplicate event | Planned |
| RPT-EX-041 | Yield | Manufacturing | Production event | Order/item | Input, output, yield | Plant | Manufacturing | Grain error | Planned |
| RPT-EX-042 | Schedule adherence | Manufacturing | Schedule event | Order/day | On-time rate | Plant/work center | Manufacturing | Calendar error | Planned |
| RPT-EX-043 | Capacity utilization | Manufacturing | Capacity | Work center/day | Available, used | Plant | Manufacturing | Capacity basis | Future |
| RPT-EX-044 | Shortage dashboard | Manufacturing/Inventory | Material availability | Component/day | Shortage quantity | Plant | Joint | Reservation omission | Planned |
| RPT-EX-045 | OEE direction | Manufacturing | Equipment events | Machine/period | Availability, performance | Plant | Manufacturing | Formula misuse | Future |
| RPT-EX-046 | Manufacturing variance | Manufacturing/Finance | Production cost | Order/period | Standard, actual variance | Plant | Joint | Cost timing | Future |
| RPT-EX-047 | Quality inspection results | Quality | Inspection | Inspection | Pass/fail, defects | Plant/item | Quality | Sampling error | Scaffold |
| RPT-EX-048 | NCR dashboard | Quality | NCR | NCR/as-of | Open, age, severity | Quality role | Quality | Status error | Planned |
| RPT-EX-049 | CAPA aging | Quality | CAPA | CAPA/as-of | Age, overdue | Quality role | Quality | Cutoff error | Planned |
| RPT-EX-050 | Quality cost | Quality/Finance | Quality cost | Event/period | Cost, defect rate | Quality/finance | Joint | Allocation error | Future |
| RPT-EX-051 | Maintenance work-order status | Maintenance | Work order | Work order | Status, age | Plant | Maintenance | Lifecycle error | Scaffold |
| RPT-EX-052 | Preventive maintenance compliance | Maintenance | Maintenance plan | Asset/period | Due, complete rate | Plant | Maintenance | Calendar error | Planned |
| RPT-EX-053 | Downtime | Maintenance/Manufacturing | Downtime event | Event | Hours, reason | Plant | Joint | Causality error | Planned |
| RPT-EX-054 | MTBF | Maintenance | Reliability event | Asset/period | Mean failure interval | Plant | Maintenance | Population error | Planned |
| RPT-EX-055 | MTTR | Maintenance | Repair event | Asset/period | Mean repair duration | Plant | Maintenance | Duration error | Planned |
| RPT-EX-056 | Maintenance cost | Maintenance/Finance | Maintenance cost | Asset/period | Labor, spare cost | Plant | Joint | Cost timing | Future |
| RPT-EX-057 | Executive dashboard | Reporting | Certified scorecard | KPI/period | Approved KPIs | Executive scope | Board | Uncertified metric | Planned |
| RPT-EX-058 | Management KPI scorecard | Reporting | KPI scorecard | KPI/organization | Actual, target, trend | Management scope | Domain | Threshold misuse | Planned |
| RPT-EX-059 | Data-quality dashboard | Data Governance | Quality controls | Rule/run | Pass rate, exceptions | Governance | Governance | False green | Planned |
| RPT-EX-060 | Audit report | Internal Audit | Audit lineage | Event/output | Access, certification | Audit role | Audit | Missing trail | Planned |
| RPT-EX-061 | Security access report | Security | Access policy | User/scope | Grants, denials | Security role | Security | Exposure | Planned |
| RPT-EX-062 | Workflow aging | Operations | Workflow | Request/as-of | Age, status | Operations | Operations | Timer gap | Planned |
| RPT-EX-063 | Approval SLA | Operations | Approval | Request/period | SLA, breach rate | Managers | Operations | Clock error | Planned |
| RPT-EX-064 | Integration failure report | Integration | Integration run | Run | Failed, retried | Operations | Integration | Lost event | Future |
| RPT-EX-065 | Import validation report | Data Governance | Import job | Job/row | Errors, accepted | Administrator | Governance | PII exposure | Scaffold |
| RPT-EX-066 | AI executive narrative | AI Governance | Certified scorecard | Narrative/run | Cited variance summary | Executive scope | Human reviewed | Hallucination | Future |
| RPT-EX-067 | Natural-language report query | AI Governance | Governed datasets | Query/session | Scoped answer | User scope | Non-certified | Permission bypass | Future |

### Reporting RACI

Roles: AB Architecture Board; RPO Reporting Product Owner; DG Data Governance; FIN Finance; INV Inventory; MFG Manufacturing; SAL Sales; PROC Procurement; QLT Quality; MNT Maintenance; SEC Security; PRV Privacy; IAU Internal Audit; ENG Engineering; QA Quality Assurance; OPS Operations; PUB Report Publisher; CAD Customer Administrator.

| Activity ID | Activity | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|---|
| RPT-RAC-001 | Define dataset | DG, Domain Owner | RPO | FIN, INV, MFG, SAL, PROC, QLT, MNT | AB, ENG, PUB |
| RPT-RAC-002 | Define metric | DG, Domain Owner | RPO | FIN, INV, MFG, QLT, MNT | AB, PUB |
| RPT-RAC-003 | Define KPI | RPO, Domain Owner | RPO | DG, FIN, INV, MFG, SAL, PROC | AB, OPS |
| RPT-RAC-004 | Define hierarchy | DG, Organization | DG | FIN, INV, MFG | RPO, PUB |
| RPT-RAC-005 | Define security | SEC, PRV | SEC | DG, IAU, CAD | RPO, ENG |
| RPT-RAC-006 | Build report | PUB, ENG | RPO | DG, Domain Owner, SEC | QA, OPS |
| RPT-RAC-007 | Build dashboard | PUB, ENG | RPO | DG, Domain Owner, SEC | QA, OPS |
| RPT-RAC-008 | Validate formula | Domain Owner, DG | Domain Owner | FIN, INV, MFG, SAL, PROC | RPO, QA |
| RPT-RAC-009 | Validate currency | FIN | FIN | DG, RPO | QA, IAU |
| RPT-RAC-010 | Validate UOM | INV | INV | MFG, DG | QA, RPO |
| RPT-RAC-011 | Validate as-of behavior | DG, Domain Owner | DG | FIN, INV, IAU | QA, RPO |
| RPT-RAC-012 | Reconcile Finance | FIN | FIN | DG, IAU, RPO | AB, OPS |
| RPT-RAC-013 | Reconcile Inventory | INV | INV | FIN, DG, IAU | AB, OPS |
| RPT-RAC-014 | Review security | SEC, PRV | SEC | IAU, DG, CAD | RPO, ENG |
| RPT-RAC-015 | Certify report | RPO, Domain Owner | Domain Owner | DG, FIN/INV as relevant, SEC | AB, IAU |
| RPT-RAC-016 | Publish report | PUB | RPO | SEC, OPS | CAD, Consumers |
| RPT-RAC-017 | Schedule report | PUB, OPS | RPO | SEC, PRV, CAD | IAU |
| RPT-RAC-018 | Configure subscription | PUB, CAD | RPO | SEC, PRV, OPS | IAU |
| RPT-RAC-019 | Approve export | SEC, Domain Owner | SEC | PRV, RPO, IAU | OPS |
| RPT-RAC-020 | Manage Power BI | ENG, OPS | RPO | SEC, DG, CAD | AB, IAU |
| RPT-RAC-021 | Review data quality | DG, Domain Owner | DG | QA, FIN, INV, MFG | RPO, IAU |
| RPT-RAC-022 | Review performance | ENG, OPS | OPS | QA, RPO, DG | AB |
| RPT-RAC-023 | Promote report package | ENG, PUB | RPO | QA, SEC, OPS, CAD | AB, IAU |
| RPT-RAC-024 | Retire report | PUB, RPO | RPO | Domain Owner, DG, PRV, IAU | CAD, OPS |
| RPT-RAC-025 | Correct metric | DG, Domain Owner | Domain Owner | FIN, INV, MFG, QA | RPO, IAU |
| RPT-RAC-026 | Investigate incident | OPS, ENG | OPS | SEC, DG, Domain Owner, IAU | RPO, AB, CAD |
| RPT-RAC-027 | Approve AI narrative use | AI Governance, RPO | RPO | SEC, PRV, DG, Domain Owner | AB, IAU |
| RPT-RAC-028 | Review lineage | DG, IAU | DG | ENG, OPS, Domain Owner | RPO |
| RPT-RAC-029 | Review audit | IAU | IAU | SEC, DG, OPS | AB, RPO |
| RPT-RAC-030 | Approve customer customization | CAD, PUB | RPO | AB, SEC, DG, ENG | IAU, OPS |

### Current-versus-target evidence matrix

| Area | Current repository evidence | Target boundary |
|---|---|---|
| Report metadata | Company-scoped definition, field, and filter Prisma models | Typed, versioned, validated, certified artifact model |
| Preview | Company-scoped direct Prisma query of newest 50 transactions | Dataset-driven, paginated, cost-controlled execution |
| Dashboard | Direct Prisma aggregates and static illustrative values | Certified widgets over governed metrics |
| Layout/customization | Print/customization JSON metadata APIs | Controlled template/output policy and publication |
| Security | JWT, roles, tenant/company and organization foundations | Server row/field/output/cache policy chain |
| Audit/Digital DNA | Existing foundations | Source-to-output lineage and recipient provenance |
| Deployment | PostgreSQL/API/web Docker topology | Separate controlled projection, queue, renderer, BI, and analytics decisions |
| Testing | Existing API tests; no report analytics runtime suite | Formula, policy, reconciliation, performance, and negative-isolation tests |

## Chapter 42 — Decisions, Approval and Roadmap

FCSB-013 authorizes architecture review only. It does not authorize a reporting runtime, a production analytical store, a warehouse/lakehouse, Power BI/Tableau, scheduled delivery, renderer, external connector, or AI capability. The following decision register is reviewed with this draft.

### Reporting architecture decision register

| Decision ID | Decision | Status | Rationale |
|---|---|---|---|
| RPT-ADR-001 | Domains remain authoritative | Approved | Reports explain domain facts; they never replace them. |
| RPT-ADR-002 | Analytics is non-authoritative | Approved | Derived output cannot post or correct source truth. |
| RPT-ADR-003 | Finance owns financial definitions | Approved | Financial interpretation and close require finance control. |
| RPT-ADR-004 | Inventory owns stock truth | Approved | Stock, availability, and valuation inputs retain inventory authority. |
| RPT-ADR-005 | Reports use governed datasets | Proposed | Prevents hidden joins and uncontrolled source access. |
| RPT-ADR-006 | Arbitrary production SQL is prohibited | Approved | Protects performance, security, and semantic consistency. |
| RPT-ADR-007 | Operational and analytical workloads separate | Proposed | Limits reporting impact on operational processing. |
| RPT-ADR-008 | KPI definitions are versioned and owned | Proposed | Prevents label and formula drift. |
| RPT-ADR-009 | Metric grain and aggregation are explicit | Proposed | Prevents invalid totals and ratios. |
| RPT-ADR-010 | As-of time is explicit | Proposed | Enables reproducible historical answers. |
| RPT-ADR-011 | Currency semantics are controlled | Proposed | Finance governs rate and translation interpretation. |
| RPT-ADR-012 | UOM semantics are controlled | Proposed | Inventory governs conversion and quantity meaning. |
| RPT-ADR-013 | Certified reports require reconciliation | Proposed | Certification requires source-to-output evidence. |
| RPT-ADR-014 | Report security is server-side | Proposed | UI filtering cannot enforce authorization. |
| RPT-ADR-015 | Export requires distinct permission | Proposed | Output distribution is a separate risk. |
| RPT-ADR-016 | Scheduled delivery rechecks access | Proposed | Timing cannot widen access. |
| RPT-ADR-017 | Cached results preserve tenant/user scope | Proposed | Cache must not leak access context. |
| RPT-ADR-018 | Personal dashboards are non-certified | Approved | Personal convenience is not enterprise truth. |
| RPT-ADR-019 | Certified dashboards are versioned | Proposed | Presentation and metric versions need evidence. |
| RPT-ADR-020 | Draft reports are visibly non-certified | Proposed | Users must see reliance status. |
| RPT-ADR-021 | Outputs preserve source/report versions | Proposed | Supports lineage and reproducibility. |
| RPT-ADR-022 | Power BI cannot access uncontrolled production tables | Approved | External BI uses governed contracts only. |
| RPT-ADR-023 | External BI uses governed semantic models | Proposed | Preserves definitions and isolation. |
| RPT-ADR-024 | Analytics never posts transactions | Approved | Reporting remains non-authoritative. |
| RPT-ADR-025 | AI narratives are labelled and cited | Proposed | Makes assistance transparent and explainable. |
| RPT-ADR-026 | AI cannot certify reports | Approved | Certification remains human/domain controlled. |
| RPT-ADR-027 | AI cannot bypass row security | Approved | Permission filtering precedes context. |
| RPT-ADR-028 | Data lineage is mandatory | Proposed | Results require explainable provenance. |
| RPT-ADR-029 | Historical outputs must be reproducible | Proposed | Corrections require version-aware evidence. |
| RPT-ADR-030 | Report deletion does not delete source truth | Approved | Artifact lifecycle differs from domain retention. |
| RPT-ADR-031 | Certified definitions are immutable | Proposed | Corrections create controlled successors. |
| RPT-ADR-032 | Corrections create new versions | Proposed | Avoids silent historical change. |
| RPT-ADR-033 | DirectQuery/Import remains workload-driven | Open | Choice needs evidence and external BI requirements. |
| RPT-ADR-034 | Warehouse technology remains unselected | Open | Requirements and operations evidence are absent. |
| RPT-ADR-035 | CDC technology remains unselected | Open | Source volume and latency are not defined. |
| RPT-ADR-036 | Scheduler technology remains unselected | Open | Delivery requirements are not approved. |
| RPT-ADR-037 | Query limits and cancellation are required | Proposed | Protects operational workload. |
| RPT-ADR-038 | Large exports are asynchronous | Proposed | Bounds resource consumption and recovery. |
| RPT-ADR-039 | Non-production analytical data is masked | Proposed | Limits privacy and confidentiality exposure. |
| RPT-ADR-040 | Subscriptions cannot widen access | Proposed | Recipient policy is rechecked. |
| RPT-ADR-041 | Sensitive outputs use secure delivery | Proposed | Classification controls distribution. |
| RPT-ADR-042 | Current preview is scaffold only | Implemented | Repository evidence is generic 50-row preview. |
| RPT-ADR-043 | FCSB-013 does not authorize implementation | Approved | Architecture review precedes runtime coding. |

### Open decisions

| Open ID | Decision | Decision owner | Required input |
|---|---|---|---|
| RPT-OPEN-001 | Physical reporting metadata repository | Architecture Board | Lifecycle, tenancy, and Studio requirements |
| RPT-OPEN-002 | Dataset definition format | Data Governance | Validation and extension requirements |
| RPT-OPEN-003 | Semantic model technology | Architecture Board | Metric workload and governance evidence |
| RPT-OPEN-004 | Metric-store direction | Data Governance | Consumer and lineage requirements |
| RPT-OPEN-005 | Operational read-model strategy | Domain Owners | Query patterns and source ownership |
| RPT-OPEN-006 | Data warehouse direction | Architecture Board | Volume, history, cost, and operations study |
| RPT-OPEN-007 | Data mart strategy | Data Governance | Subject-area roadmap and conformance design |
| RPT-OPEN-008 | Read-replica strategy | Operations | Capacity and recovery evidence |
| RPT-OPEN-009 | CDC technology | Integration | Latency, ordering, and source capability |
| RPT-OPEN-010 | ETL/ELT technology | Architecture Board | Transformation and operating model |
| RPT-OPEN-011 | Scheduling technology | Operations | Frequency, retry, and tenant requirements |
| RPT-OPEN-012 | Export/rendering technology | Engineering | Format, custody, and accessibility requirements |
| RPT-OPEN-013 | Large-export architecture | Engineering | Volume, queue, storage, and cancellation evidence |
| RPT-OPEN-014 | Cache technology | Operations | Isolation, invalidation, and cost requirements |
| RPT-OPEN-015 | Materialized-view strategy | Engineering | Freshness and database workload evidence |
| RPT-OPEN-016 | Power BI connectivity model | Reporting | Tenant, identity, and governance requirements |
| RPT-OPEN-017 | Embedded analytics direction | Product | Customer experience and isolation requirements |
| RPT-OPEN-018 | Row-security implementation | Security | Policy language and enforcement evidence |
| RPT-OPEN-019 | Field-level security model | Security/Privacy | Classification and masking requirements |
| RPT-OPEN-020 | Historical snapshot approach | Data Governance | As-of, close, and restatement requirements |
| RPT-OPEN-021 | SCD strategy | Data Governance | Dimension history and hierarchy requirements |
| RPT-OPEN-022 | Report certification workflow | Reporting | Approval, evidence, and audit requirements |
| RPT-OPEN-023 | AI narrative model/provider | AI Governance | Privacy, citations, cost, and safety assessment |
| RPT-OPEN-024 | Natural-language query architecture | AI Governance | Semantic, permission, and evaluation design |
| RPT-OPEN-025 | Retention policy | Privacy/Internal Audit | Legal hold, classification, and customer obligations |
| RPT-OPEN-026 | Multi-tenant analytical isolation | Security | Shared/dedicated topology and negative tests |
| RPT-OPEN-027 | Customer-report extension model | Architecture Board | Studio packaging and support boundaries |

### Approval conditions and roadmap

Approval requires review by Architecture Board, Data Governance, Reporting, Finance, Inventory, Manufacturing, Security, Privacy, Operations, Internal Audit, AI Governance, and the applicable Domain Owner. Before runtime coding, approve dataset and metric contracts; threat model; row/field/tenant policy; temporal, currency, and UOM semantics; output custody; reconciliation; lineage; retention; test strategy; observability; incident runbooks; and unresolved technology decisions.

Before FCSB-014 work uses finance reports as an implementation baseline, Finance must approve finance source, close, currency, as-of, reconciliation, and certification contracts. FCSB-015 through FCSB-020 refine inventory, sales, procurement, manufacturing, quality, and maintenance semantics. Later volumes may implement domain-specific reporting only within this non-authoritative, governed boundary.

| Version | Date | Change | Approval state |
|---|---|---|---|
| 1.0 Draft | 2026-07-16 | Initial reporting and analytics architecture review draft | Pending named review |

~~~mermaid
flowchart LR
  A[FCSB-013 architecture review] --> B[Dataset, metric, security decisions]
  B --> C[Domain solution volumes]
  C --> D[Approved runtime requirements]
  D --> E[Implementation, test, operations evidence]
  E --> F[Certification and controlled publication]
~~~
