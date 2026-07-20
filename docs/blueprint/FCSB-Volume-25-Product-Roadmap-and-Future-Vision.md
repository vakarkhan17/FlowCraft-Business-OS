# FCSB-025 — Product Roadmap and Future Vision

| Document metadata | Value |
|---|---|
| Document code | FCSB-025 |
| Title | Product Roadmap and Future Vision |
| Version | 1.0 Draft |
| Status | Architecture Review Draft |
| Date | 2026-07-20 |
| Owner | Product Governance and Enterprise Architecture |
| Scope | Evidence-based product evolution roadmap and future-state architecture |
| Predecessor | [FCSB-024 — Product Governance and Release Architecture](./FCSB-Volume-24-Product-Governance-and-Release-Architecture.md) |
| Authority dependency | OD-024-040 remains the formal entry gate; this draft does not approve its unresolved inputs |
| Implementation effect | Documentation only; no software, schema, migration, infrastructure, release or customer change is authorized |

> **Status discipline:** “Implemented foundation” appears only when a concrete repository artifact is linked. Partial, Scaffold, Planned, Future and Conceptual target architecture are not current product availability claims. Horizons express controlled dependency order, not dates, funding approval, commercial commitment or release authorization.

## Chapter 01 — Purpose and Boundary

FCSB-025 translates the architecture series into a conditional product evolution map. It connects the narrow capabilities proved by source, migrations, tests and implementation reports to a long-term manufacturing ERP vision without converting architectural intent into delivery fact. The roadmap tells decision-makers what must precede what, which authority must decide, which evidence must exist, and what outcome would justify further investment.

This volume does not approve the unresolved FCSB-024 product, release, platform or investment choices. It does not select vendors, promise delivery dates, commit customer availability, authorize an implementation epic or replace domain acceptance. Every initiative remains subject to its named architecture, investment, risk and release gates.

~~~mermaid
flowchart LR
  BASE["Verified current foundation"] --> DECIDE["Close governing decisions"]
  DECIDE --> STABILIZE["Horizon 1: stabilize"]
  STABILIZE --> CORE["Horizon 2: core ERP"]
  CORE --> AUTOMATE["Horizon 3: manufacturing automation"]
  AUTOMATE --> SCALE["Horizon 4: intelligence and ecosystem"]
  SCALE --> VISION["Horizon 5: future vision"]
  RISK["Risk and evidence gates"] --> DECIDE
  RISK --> STABILIZE
  RISK --> CORE
  RISK --> AUTOMATE
  RISK --> SCALE
~~~

## Chapter 02 — Executive Product Vision

FlowCraft’s target is a budget-conscious manufacturing business operating system whose affordability comes from a governed shared platform, reusable domain contracts and controlled extensions—not reduced financial integrity, security, traceability or upgrade safety. A customer should be able to begin with company structure, master data and focused operational processes, then adopt finance, inventory, planning, production, quality, maintenance, services, analytics and automation without replacing the product foundation.

The future product supports shared SaaS, dedicated cloud, private cloud, on-premises and hybrid operation through one governed product lineage. Configuration, metadata, workflows, reports, localization and extension packages absorb legitimate variation. The product protects authoritative accounting, inventory, manufacturing and audit histories while customers evolve at different supported paces.

## Chapter 03 — Authority and Traceability Baseline

The authority sequence remains controlled governance, approved FCSB volumes, controlled frameworks, accepted DBA milestones and repository evidence, implementation reports, then draft proposals. FCSB-001 through FCSB-024 define the architecture constraints; this volume sequences them but cannot silently supersede them. Repository evidence governs statements about what exists today.

| Authority source | Roadmap use | Prohibited inference |
|---|---|---|
| FCSB-001–006 | Business, platform, data, integration, security and operations boundaries | Architecture text proves deployed capability |
| FCSB-007–013 | Manufacturing, AI, transaction, document, workflow, Studio and reporting contracts | Scaffolds equal operational domain completion |
| FCSB-014–021 | Finance, inventory, sales, procurement, execution, quality, maintenance and service semantics | Domain roadmap equals accepted runtime |
| FCSB-022–023 | Mobile/offline and performance/scalability gates | Target mechanisms already operate |
| FCSB-024 | Product lifecycle, release controls, risks and open decisions | Proposed ADRs are approved or funded |
| DBA-002–004 and repository | Narrow current implementation baseline | CI/CD, registry, release portal or fleet control exists |

## Chapter 04 — OD-024-040 Entry Gate

OD-024-040 asks which FCSB-024 decisions are approved inputs and which remain unresolved investments. No Architecture Board or Product Council disposition is present after FCSB-024’s draft publication. Therefore this roadmap uses three input classes: verified repository foundations, controlled architecture constraints, and unresolved decision gates. Only the first class describes implemented reality.

The 40 FCSB-024 open decisions remain open. Initiatives dependent on product charters, support models, CI/CD, artifact custody, quality gates, rollout cohorts, extension contracts, migration mechanisms, telemetry, AI, mobile or deprecation policy cannot advance beyond the corresponding decision gate. Chapter 74 preserves every source decision and identifies its sequencing consequence.

~~~mermaid
stateDiagram-v2
  [*] --> CandidateInput
  CandidateInput --> VerifiedFoundation: repository evidence
  CandidateInput --> ArchitectureConstraint: controlled FCSB position
  CandidateInput --> OpenGate: OD-024 unresolved
  VerifiedFoundation --> RoadmapBaseline
  ArchitectureConstraint --> ConditionalInitiative
  OpenGate --> DeferredCommitment
  DeferredCommitment --> ConditionalInitiative: authority closes gate
  ConditionalInitiative --> FundableWork: investment case accepted
  FundableWork --> [*]
~~~

## Chapter 05 — Current-State Product Baseline

The current baseline is an early enterprise platform foundation: a NestJS API, Next.js web workspace, PostgreSQL/Prisma data layer, Docker development topology, tenant/company/organization structures, enterprise master data, identity and permission foundations, audit traces, versioned workflow-definition behavior and metadata scaffolds. Accepted migrations and tests establish narrow implementation evidence; they do not establish production-grade operational ERP ledgers or release automation.

| Evidence-backed foundation | Repository evidence | Roadmap interpretation |
|---|---|---|
| Workspace build and test commands | [Root package](../../package.json) and [API package](../../apps/api/package.json) | Engineering repeatability foundation |
| Ordered schema ancestry | [Prisma migrations](../../apps/api/prisma/migrations) | Forward migration history foundation |
| Tenant and enterprise masters | [Prisma schema](../../apps/api/prisma/schema.prisma) and [DBA-004 report](../implementation/DBA-004-enterprise-master-data-implementation.md) | Shared domain identity foundation |
| API namespace | [API bootstrap](../../apps/api/src/main.ts) | Version namespace, not compatibility governance |
| Published workflow immutability | [Workflow service](../../apps/api/src/workflows/workflows.service.ts) and [foundation tests](../../apps/api/test/foundation.spec.ts) | Definition governance foundation, not workflow runtime |
| Trace and redaction behavior | [Audit service](../../apps/api/src/audit/audit.service.ts) | Application audit foundation, not release observability |
| Development containers | [Compose configuration](../../docker-compose.yml) and application Dockerfiles | Development topology scaffold |

## Chapter 06 — Strategic Product Principles

These principles are decision tests for every initiative. If a proposed sequence contradicts one, the roadmap records an explicit Architecture Board exception instead of weakening the principle through delivery shorthand.

1. Manufacturing and financial truth take priority over feature velocity.
2. One governed product line serves deployment models; customer core forks are exceptional debt.
3. Capabilities become available through evidence, support and release decisions, not code presence.
4. Tenant, company, plant, warehouse, currency and legal-entity boundaries remain explicit.
5. Historical records retain the rule, source and version needed for explanation.
6. Configuration and sealed extension contracts absorb supported variation.
7. Dependencies determine horizons; unapproved dates never substitute for plans.
8. Every horizon must deliver usable business outcomes rather than isolated technical components.
9. Security, privacy, recovery, performance and operability enter design before rollout.
10. Product learning can alter future sequencing but cannot rewrite accepted evidence.

## Chapter 07 — Product Evolution Objectives

The roadmap pursues six linked outcomes. First, make the current platform trustworthy to change through testing, release identity, security and migration controls. Second, complete authoritative finance, inventory and transaction foundations. Third, assemble coherent quote-to-cash, source-to-pay and plan-to-produce processes. Fourth, add manufacturing execution, quality, maintenance and service depth. Fifth, enable governed customization, reporting, integration and customer onboarding without source fragmentation. Sixth, introduce scale and intelligence only after observability, semantic control and human authority are measurable.

| Objective | Outcome signal | Architectural guardrail |
|---|---|---|
| Trustworthy change | Reproducible candidate and migration evidence | FCSB-024 release gates |
| Core ERP integrity | Reconciled ledgers and domain invariants | FCSB-009 and FCSB-014–017 |
| Manufacturing usefulness | Executable plans and traceable production | FCSB-007 and FCSB-018 |
| Customer adaptability | Supported metadata/package variation | FCSB-012 and FCSB-024 |
| Deployment choice | Supported profiles without product forks | FCSB-006 and FCSB-024 |
| Responsible intelligence | Explainable bounded assistance | FCSB-008 and FCSB-018 |

## Chapter 08 — Roadmap Architecture and Governance

A roadmap initiative is a governed hypothesis composed of an outcome, capability identity, present status, predecessor graph, architecture gates, investment gate, risk owner and success evidence. Product Governance owns portfolio intent; domain authorities own semantics; Enterprise Architecture owns cross-volume coherence; Engineering estimates realization; Security, Data, Operations and Quality own specialist gates; Product Council owns investment priority.

A horizon move occurs only when predecessors and decision gates are satisfied. It does not occur because elapsed time or stakeholder enthusiasm suggests progress. Evidence can split, defer or retire an initiative. The Roadmap Change Board records the reason and preserves the former sequence for audit.

~~~mermaid
flowchart TB
  OUTCOME["Business outcome"] --> INIT["Roadmap initiative"]
  INIT --> GRAPH["Dependency graph"]
  GRAPH --> AG["Architecture gates"]
  GRAPH --> IG["Investment gate"]
  GRAPH --> RG["Risk disposition"]
  AG --> READY{"Entry evidence complete?"}
  IG --> READY
  RG --> READY
  READY -->|No| HOLD["Remain conditional"]
  READY -->|Yes| PORT["Horizon portfolio"]
  PORT --> REVIEW["Outcome review"]
  REVIEW -->|Learn| INIT
~~~

## Chapter 09 — Capability Maturity and Readiness Model

FCSB status describes implementation evidence; roadmap readiness describes permission to invest or advance. These dimensions remain separate. An Implemented foundation may still be blocked by security or product decisions, while a Future capability may have a well-formed investment case but no technical foundation.

| Evidence status | Meaning in this roadmap | Earliest roadmap treatment |
|---|---|---|
| Implemented foundation | Concrete reusable repository behavior or artifact | Preserve, test and extend |
| Partial | Some executable behavior exists; end-to-end outcome absent | Complete bounded gaps |
| Scaffold | Shape or metadata exists without operational semantics | Validate design before runtime |
| Planned | Architecture is defined but implementation is absent | Sequence after decisions and predecessors |
| Future | Mechanism or product capability is not present | Research or later investment |
| Conceptual target architecture | Direction exists without selected implementation | Close architecture choices first |

## Chapter 10 — Capability Dependency Mapping

Capability dependencies are typed. Semantic dependencies supply authoritative business meaning; platform dependencies supply shared identity, authorization, audit and transaction services; data dependencies supply durable models and migration; operational dependencies supply deployment and recovery; adoption dependencies supply onboarding, support and change capacity. A roadmap edge states which kind is required.

Cycles are resolved by extracting a minimum foundation rather than pretending parallel delivery removes the dependency. For example, finance needs inventory valuation contracts while inventory needs finance account determination. Horizon 1 must therefore establish their shared posting and valuation contract before either full subledger advances independently.

~~~mermaid
flowchart LR
  ORG["Tenant and organization identity"] --> MASTER["Governed master data"]
  MASTER --> TX["Universal transaction contract"]
  TX --> INV["Inventory ledger"]
  TX --> FIN["Financial posting"]
  INV --> COST["Cost and valuation"]
  FIN --> COST
  INV --> MRP["Planning"]
  MRP --> MES["Execution"]
  MES --> QUAL["Quality"]
  MES --> MAINT["Maintenance"]
  TX --> SALES["Order to cash"]
  TX --> PROC["Source to pay"]
  SALES --> FIN
  PROC --> FIN
~~~

## Chapter 11 — Technical Dependency Mapping

The technical critical path begins with controlled source, build and migration evidence; then identity/scope, transactional consistency and compatibility contracts; then asynchronous work, observability and deployment control; finally elastic scale and intelligent automation. Selecting a queue, cache, registry or telemetry vendor before its workload, tenancy and evidence requirements are approved would invert the architecture sequence.

| Technical foundation | Depends on | Enables |
|---|---|---|
| Candidate and artifact identity | OD-024-004–010 | Repeatable release gates |
| Migration preflight and reconciliation | OD-024-030–032 | Safe domain schema evolution |
| Contract/version registry | OD-024-002, 027–029 | API, workflow, report and package evolution |
| Background execution | Transaction idempotency and operations model | MRP, imports, reports and integrations |
| Release-aware telemetry | OD-024-012, 015, 037 | Cohorts, capacity and business stop signals |
| Extension runtime | OD-024-023–025 | Module Builder ecosystem |
| Mobile synchronization | OD-024-020, 036 | Offline warehouse and field work |
| Governed AI runtime | OD-024-035 and FCSB-008 | Bounded assistance and automation |

## Chapter 12 — Business Dependency Mapping

Business-process sequencing follows control boundaries. Order-to-cash requires customer, item, pricing, credit, inventory promise, fulfillment, tax, receivables and settlement. Source-to-pay requires supplier governance, requisition authority, purchase order, receipt, inspection, three-way match, payable and payment control. Plan-to-produce requires demand, item/BOM/routing, capacity, material availability, production order, execution, genealogy, quality and costing.

A marketable increment may stop at a coherent boundary, such as sales order plus availability inquiry, but it must not imply downstream accounting or fulfillment is complete. Business owners define minimum usable journeys and reconciliation points before roadmap admission.

## Chapter 13 — Investment Dependency Mapping

Investment gates distinguish discovery cost, foundation cost, domain delivery cost, customer enablement cost and continuing support cost. A low build estimate is insufficient when the initiative creates permanent compatibility, localization, security or support obligations. Total cost includes migrations, evidence, documentation, customer communication and retained supported versions.

~~~mermaid
flowchart TD
  CASE["Outcome and customer evidence"] --> OPTIONS["Architecture options"]
  OPTIONS --> COST["Build, operate and support cost"]
  COST --> CAPACITY["Skills and capacity"]
  CAPACITY --> RISK["Risk-adjusted value"]
  RISK --> DECISION{"Investment authority"}
  DECISION -->|Fund discovery| DISC["Bounded discovery"]
  DECISION -->|Fund delivery| FUND["Horizon commitment"]
  DECISION -->|Defer| BACKLOG["Conditional backlog"]
  DECISION -->|Reject| ARCHIVE["Decision archive"]
~~~

## Chapter 14 — Architecture Decision Dependencies

Proposed FCSB-024 ADRs are constraints awaiting disposition, not silently accepted rules. Initiatives cite the ADR when their shape depends on it and the related open decision when realization still requires a choice. Accepted migration ancestry and conservative evidence classification can be used as current foundations; release platforms, rings, flags, package contracts, mobile windows and AI controls remain gated.

The Architecture Board maintains a dependency ledger linking each initiative to approved, conditional or rejected ADRs. A rejected ADR triggers roadmap re-evaluation rather than automatic substitution with the rejected alternative.

## Chapter 15 — Open-Decision Impact on Roadmap

The 40 open decisions form five gate families: product authority and support promises; source/build/release evidence; deployment models and cohorts; extension/API/data evolution; security, AI, mobile, telemetry and lifecycle. The absence of a decision does not block all analysis, but it blocks any commitment whose cost or safety depends on that answer.

~~~mermaid
flowchart LR
  P["Product and support gates"] --> H1["Horizon 1"]
  B["Build and evidence gates"] --> H1
  D["Deployment and cohort gates"] --> H2["Horizon 2"]
  E["Extension and contract gates"] --> H3["Horizon 3"]
  S["Security, mobile, AI and telemetry gates"] --> H4["Horizon 4"]
  H1 --> H2 --> H3 --> H4
  ALL["OD-024-040 disposition"] --> P
  ALL --> B
  ALL --> D
  ALL --> E
  ALL --> S
~~~

## Chapter 16 — Product Horizon Model

Horizons bound uncertainty and predecessor maturity. They deliberately avoid months, quarters and years until an approved delivery plan supplies capacity, estimates and accountable dates.

| Horizon | Governing intent | Entry condition | Exit evidence |
|---|---|---|---|
| Foundation / Current State | Preserve verified behavior and expose gaps | Concrete repository evidence | Baseline inventory and regression evidence |
| Horizon 1 — Stabilize and Complete Foundations | Make change safe and establish shared transaction/domain contracts | Product/release authorities and core architecture gates | Reproducible changes, reconciled foundations and supportable pilot scope |
| Horizon 2 — Expand Core ERP Capabilities | Deliver coherent finance, inventory, sales, procurement and planning journeys | Horizon 1 controls and domain semantics | Accepted end-to-end operational journeys and reconciliations |
| Horizon 3 — Advanced Manufacturing and Automation | Add execution, quality, maintenance, workflow and extensions | Stable core ledgers and process contracts | Traceable manufacturing automation with controlled customization |
| Horizon 4 — Intelligence, Ecosystem and Scale | Scale deployments, analytics, mobile, ecosystem and bounded AI | Observability, security, compatibility and governance maturity | Measured scalable operation and governed partner/customer adoption |
| Horizon 5 — Future Vision | Explore adaptive, composable and autonomous assistance | Proven value, safe data and human authority | Research evidence and separately approved product decisions |

## Chapter 17 — Horizon Admission and Exit

Each initiative passes a sequence of intent, architecture, investment, delivery and release decisions. Portfolio admission does not authorize production release. Exit evidence must show the stated business outcome at the intended deployment profile, not merely completed tasks.

~~~mermaid
stateDiagram-v2
  [*] --> Conditional
  Conditional --> Assessed: outcome and dependencies known
  Assessed --> ArchitectureReady: decisions approved
  ArchitectureReady --> InvestmentReady: cost and capacity accepted
  InvestmentReady --> Committed: portfolio authority
  Committed --> Implemented: delivery evidence
  Implemented --> Validated: representative assurance
  Validated --> Available: FCSB-024 release decision
  Available --> Measured: adoption and outcome evidence
  Measured --> Expanded: next-horizon permission
  Assessed --> Deferred: value or dependency unresolved
  Committed --> Stopped: risk or outcome fails
~~~

## Chapter 18 — Horizon 1: Stabilize and Complete Foundations

Horizon 1 converts developer-operable foundations into a governable product delivery base. Its minimum portfolio includes authority charters, capability identity, candidate/manifests, protected integration policy, dependency and migration assurance, tenant-scope regression, shared transaction semantics, finance/inventory posting contracts, environment inventory, backup/restore rehearsal and support-ready pilot definition.

This horizon deliberately limits domain breadth. It proves that a change can be implemented, migrated, verified, explained and recovered without damaging tenant or business history. It also closes the decisions that determine whether later capabilities can be sold and supported.

## Chapter 19 — Horizon 2: Expand Core ERP Capabilities

Horizon 2 composes finance, inventory, sales, procurement and planning into usable process slices. Priority follows customer value and dependency readiness: item/customer/supplier masters feed transactions; inventory availability and valuation feed orders and accounting; receivables/payables connect settlements; planning consumes demand, supply, BOM/routing and capacity.

Entry requires representative customer profiles and reconciliation authority. Exit requires multiple end-to-end journeys—rather than isolated screens—operating under tenant/company scope with audit, approvals, corrections, reporting and migration evidence.

## Chapter 20 — Horizon 3: Advanced Manufacturing and Automation

Horizon 3 deepens plan-to-produce with production dispatch, material issue, labor/machine capture, completion, genealogy, quality holds, nonconformance, maintenance coordination, cost variance and workflow automation. Module Builder and designer capabilities may enter only through supported extension contracts, because uncontrolled customization would undermine every later upgrade.

The horizon targets manufacturers whose operational complexity justifies deeper automation. Success depends on accurate core ledgers and stable process identities; it cannot compensate for weak inventory, costing or authorization foundations.

## Chapter 21 — Horizon 4: Intelligence, Ecosystem and Scale

Horizon 4 expands operating scale, deployment reach and composability. Candidate initiatives include release-aware observability, elastic workload controls, mature SaaS cohorts, certified integrations, partner packages, governed analytics, mobile/offline operation, localization portfolios and bounded AI assistance.

Scale is measured across tenant count, history volume, concurrent business journeys, integration traffic and support load. The horizon is not a technology showcase: each investment must improve a named customer or operating outcome while preserving isolation, semantic consistency and support economics.

## Chapter 22 — Horizon 5: Future Vision

Horizon 5 is a research and option horizon. It may explore constraint-aware planning assistance, explainable production recommendations, semantic interoperability, adaptive workflows, digital-thread reasoning and highly composable industry packages. None is presumed commercially or technically feasible.

Research produces evaluation datasets, risk findings, prototypes, cost observations and human-authority designs. Movement into a delivery horizon requires a fresh ADR, investment case, privacy/security review and measurable customer benefit.

~~~mermaid
flowchart LR
  H1["Safe change and shared contracts"] --> H2["Coherent core ERP journeys"]
  H2 --> H3["Manufacturing depth and automation"]
  H3 --> H4["Scale, ecosystem and intelligence"]
  H4 --> H5["Research-led future options"]
  H2 -. "outcome evidence" .-> H1
  H3 -. "operational learning" .-> H2
  H4 -. "adoption economics" .-> H3
  H5 -. "validated research" .-> H4
~~~

## Chapter 23 — Future-State Vision

In the target state, FlowCraft exposes a coherent ERP capability graph rather than a collection of disconnected modules. A governed business identity can be followed from customer demand through planning, sourcing, inventory, production, quality, shipment, accounting, service and analysis. Corrections preserve history; reports reproduce definitions; integrations and extensions state compatibility; every deployment identifies its release and migration state.

Customers adopt only the capabilities they need while remaining on a supported product lineage. Small manufacturers gain a focused entry footprint; complex organizations gain multi-company, multi-currency, multi-plant and hybrid depth. This is a target narrative, not a claim that the current system delivers those journeys.

## Chapter 24 — Platform Foundation Evolution

Platform evolution starts by consolidating tenant/organization scope, identity, authorization, audit, numbering, transactions, workflow definitions, reports and metadata behind explicit contracts. The next step adds durable jobs, idempotency, version registries, configuration validation and release identity. Only measured load should justify cache, queue, replica, partition or sharding choices.

The platform remains modular but avoids premature distributed complexity. A modular monolith with bounded interfaces can carry early product horizons; service extraction requires workload, ownership and failure-isolation evidence from FCSB-023.

## Chapter 25 — Core ERP Functional Evolution

Core ERP evolves through shared transaction and document identities that domains specialize without losing common lifecycle, approval, correction, audit and link behavior. Horizon 1 defines these contracts; Horizon 2 operationalizes finance, inventory, sales and procurement; Horizon 3 adds execution-heavy domains; Horizon 4 expands ecosystem and industry depth.

“Core” means every supported deployment needs its invariants, not every customer must enable every function. Optional modules cannot bypass core isolation, authorization, audit or financial effects.

## Chapter 26 — Manufacturing and Production Evolution

Manufacturing begins with governed item, plant, warehouse, batch/serial and production metadata already evidenced as foundations or scaffolds. It then introduces BOM/routing version authority, production-order identity, reservation and shortage decisions, issue/return, labor/machine capture, completion, genealogy and variance.

Urgent order preemption requires an approved priority policy, material/capacity impact calculation, supervisor authority and traceable rescheduling. It cannot silently consume allocations or rewrite released-order dates.

~~~mermaid
flowchart LR
  DEM["Demand signal"] --> PLAN["Material and capacity plan"]
  PLAN --> ORD["Released production order"]
  ORD --> DISP["Dispatch and priority"]
  DISP --> ISSUE["Material issue"]
  ISSUE --> EXEC["Labor and machine execution"]
  EXEC --> COMPLETE["Completion and genealogy"]
  COMPLETE --> VAR["Cost and variance"]
  SHORT["Shortage approval"] --> DISP
  QUAL["Quality disposition"] --> COMPLETE
~~~

## Chapter 27 — Planning and MRP Evolution

Planning progresses from transparent net-requirement calculations to capacity-aware proposals and then scenario comparison. Initial MRP must expose demand source, on-hand/supply assumptions, lead time, lot rule, safety stock, pegging and exception reason. Planners approve proposals before they become purchase or production orders.

Long-term partial deliveries remain explicit supply events with remaining quantity, revised promise, allocation consequence and financial/customer impact. Future optimization or AI may rank alternatives but cannot conceal feasibility constraints or issue executable orders without delegated authority.

## Chapter 28 — Warehouse and Inventory Evolution

Inventory roadmap work establishes an append-only movement ledger, reservation and availability semantics, stock status, valuation linkage, transfer and count corrections before advanced warehouse execution. Zones, bins, batches, serials and warehouses in the current schema are master foundations; they do not prove stock balance or movement runtime.

Later increments add directed put-away, replenishment, picking, packing, cycle counts, mobile scans and workload optimization. Every increment reconciles physical, logistical and financial quantities by company, plant, warehouse, item, tracking identity and valuation context.

## Chapter 29 — Procurement Evolution

Procurement moves from supplier and commercial-term masters to requisition, approval, sourcing, purchase order, receipt/return, inspection, three-way match and payable integration. Raw-material shortage overrides require documented production impact, alternate-source check, price/quality consequence and delegated approval.

Supplier collaboration and automated replenishment belong after contract, quality, delivery and exception data are trustworthy. A supplier portal cannot become an alternate authority for accepted quantity, tax or payment status.

## Chapter 30 — Sales and Order-Management Evolution

Sales evolves from customer, pricing, credit and item foundations to quotation, order, availability/promise, allocation, fulfillment, billing, returns and receivables. Credit-term controls distinguish policy, exposure, override authority and audit trail; a salesperson cannot unilaterally convert a warning into approved risk.

Channel, portal and subscription opportunities remain later extensions of the same order and customer contract. They do not justify parallel order semantics.

## Chapter 31 — Finance and Accounting Evolution

Finance sequencing begins with chart, fiscal period, journal and account-determination architecture; then subledger posting contracts, receivables, payables, settlement, tax, bank reconciliation, assets, allocations, intercompany, currency revaluation and close/certification. Current currency, company and chart/journal scaffolds are not operational accounting.

Each domain publishes balanced financial effects through an accepted posting contract. Finance retains period, correction, reconciliation and statement authority; operational modules cannot write opaque balances directly.

~~~mermaid
flowchart TB
  SALES["Sales subledger"] --> POST["Posting contract"]
  PROC["Procurement subledger"] --> POST
  INV["Inventory valuation"] --> POST
  MFG["Manufacturing cost"] --> POST
  PAY["Payroll and projects"] --> POST
  POST --> GL["General ledger"]
  GL --> REC["Subledger reconciliation"]
  REC --> CLOSE["Period close"]
  CLOSE --> CERT["Statement certification"]
~~~

## Chapter 32 — Costing Evolution

Costing requires common cost object, cost element, valuation and effective-date semantics before standard, moving-average, actual or activity-based methods are selected. Early delivery should calculate explainable material, labor and overhead effects for a bounded manufacturing profile and reconcile them to inventory and finance.

Later horizons add variance analysis, work-center/activity rates, by-products, subcontracting, projects and scenario simulation. Cost recommendations may be automated only when source quantities, rates and allocation bases are versioned and reproducible.

## Chapter 33 — Quality-Management Evolution

Quality progresses from inspection-required flags and status masters to inspection plans, sampling, results, holds/releases, nonconformance, disposition, CAPA, supplier/customer quality and certificates. Quality decisions must control inventory and production availability without erasing the underlying transaction.

Advanced statistical insight depends on stable characteristic definitions, calibrated equipment and contextual genealogy. AI classification remains advisory until false-release risk and human review are governed.

## Chapter 34 — Maintenance and Engineering Evolution

Maintenance starts with asset/equipment identity, location, warranty and spare-part relationships; proceeds to requests, work orders, preventive schedules, permits, labor/material capture and downtime; then adds reliability analysis and condition-based work. Engineering changes retain effective applicability to BOMs, routings, assets and open orders.

A maintenance work order consumes inventory and labor through shared contracts and posts costs through Finance. Reliability optimization cannot bypass safety, quality or production authorization.

## Chapter 35 — Workflow and Approval Automation Evolution

The existing versioned definition and published-immutability behavior is an implemented foundation, evidenced by the [workflow service](../../apps/api/src/workflows/workflows.service.ts). Runtime instances, timers, escalation, delegation, command compatibility and in-flight migration remain Planned or Future.

Automation starts with high-value approvals—credit override, shortage override, purchase approval, supplier payment and master change—using explicit authority and audit history. Later horizons add event-driven orchestration and cross-domain cases without turning workflow into the owner of domain truth.

~~~mermaid
stateDiagram-v2
  [*] --> DraftDefinition
  DraftDefinition --> Validated
  Validated --> Published
  Published --> ActiveInstances
  Published --> Superseded: new version
  ActiveInstances --> Completed: pinned commands succeed
  ActiveInstances --> Migrated: approved mapping
  ActiveInstances --> Exception: incompatible dependency
  Superseded --> Retained
~~~

## Chapter 36 — Reporting, Analytics and Management Dashboards

Reporting evolves from current metadata and generic preview scaffolds to governed datasets, semantic measures, row-security tests, publication packages and reconciled standard reports. Finance, inventory and manufacturing dashboards must share definitions with authoritative ledgers rather than recalculate meaning independently.

Operational analytics can become near-real-time after data freshness, failure and reconciliation behavior are observable. Executive KPI certification names formula version, source lineage, scope, owner and decision use.

## Chapter 37 — User-Designed Reporting Evolution

User-designed reporting starts with safe field catalogs and bounded filters, then adds governed joins, calculations, layouts, sharing and scheduled output. A builder publishes against a semantic contract; it does not grant direct database access or allow users to escape tenant/company scope.

Schema-impact preview, version pinning and deprecation warnings precede broad customer adoption. Customer reports remain portable packages with ownership and compatibility evidence.

## Chapter 38 — Module Builder Evolution

Module Builder is a future governed extension capability, not a current runtime. Its first viable slice requires named extension points, manifest identity, core range, dependencies, permissions, data ownership, migration behavior, test profile, signing and lifecycle rules. OD-024-023 through OD-024-025 block its package and uninstall contracts.

Later phases add development tooling, isolated validation, marketplace or private distribution and customer upgrade previews. Every module must fail closed when its contract is incompatible.

~~~mermaid
sequenceDiagram
  participant Builder as Module author
  participant Catalog as Extension catalog
  participant Security as Security review
  participant Resolver as Dependency resolver
  participant Customer as Customer environment
  Builder->>Catalog: Submit signed manifest and package
  Catalog->>Security: Evaluate permissions and data behavior
  Security-->>Catalog: Approve, reject or constrain
  Catalog->>Resolver: Resolve core and transitive ranges
  Resolver-->>Customer: Produce upgrade impact preview
  Customer->>Customer: Install only after acceptance
~~~

## Chapter 39 — Drag-and-Drop Workflow Designer Evolution

The designer initially composes approved workflow elements and validates graph structure, permissions, domain commands and completion paths. Publication creates an immutable version; changing a picture never rewrites an active process. Simulation and representative test data precede activation.

Future visual tooling may recommend routes or detect unreachable states, but generated content remains a proposal. Workflow Governance and affected domain owners approve semantics, while Security approves privileged steps.

## Chapter 40 — Integration and API Ecosystem Evolution

The API ecosystem advances from the existing /api/v1 namespace to explicit resource/command contracts, error and enum policy, consumer registry, contract tests, deprecation windows, webhooks/events and certified adapters. OD-024-028 and OD-024-029 block external compatibility promises and retirement.

Integration scale later introduces asynchronous delivery, replay, idempotency, throttling and partner observability. File and EDI channels use versioned schemas and acknowledgments rather than becoming ungoverned exceptions.
+
## Chapter 41 — Data Architecture Evolution

Data evolution strengthens ownership, identifiers, effective dating, reference integrity, lineage, retention and quality before adding analytical copies or semantic graphs. Master data remains governed by domain authority; transactions preserve source and correction links; audit evidence is access-controlled and immutable according to policy.

Operational and analytical models may diverge physically but share governed semantics. Data products, lakehouse or graph technology require approved consumers, residency, freshness, cost and reconciliation; none is assumed in the current repository.

## Chapter 42 — Migration and ERP Onboarding Capabilities

ERP onboarding advances through repeatable source assessment, profiling, mapping, transformation, exception handling, rehearsal, hierarchical reconciliation, cutover and retained evidence. The first supported source profile should be narrow enough to validate governance and tooling. A “universal migrator” is deferred until real source patterns justify reusable adapters.

Cutover distinguishes technical load completion from customer/domain acceptance. Rollback, fallback and forward correction depend on whether users created new FlowCraft transactions; OD-024-030 through OD-024-032 remain decision gates.

~~~mermaid
sequenceDiagram
  participant Source as Legacy ERP
  participant Workbench as Migration workbench
  participant Domain as Domain owners
  participant Target as FlowCraft
  participant Control as Cutover authority
  Source->>Workbench: Profile extract and source identities
  Workbench->>Domain: Mapping and exception evidence
  Domain-->>Workbench: Approve rules and tolerances
  Workbench->>Target: Rehearsed idempotent load
  Target-->>Domain: Partitioned totals and trace samples
  Domain->>Control: Accept or reject business result
  Control-->>Target: Authorize cutover or fallback
~~~

## Chapter 43 — Multi-Currency Roadmap

Current currency and exchange-rate masters are foundations, not operational multi-currency accounting. Horizon 2 establishes transaction currency, functional currency, rate type/date, rounding and settlement differences. Finance then adds revaluation, translation, realized/unrealized gain/loss, consolidation and certified disclosures.

Historical transactions retain the applied rate and rule version. A rate correction creates an explicit adjustment rather than silently restating closed history. Localization and tax rules remain jurisdiction-scoped.

## Chapter 44 — Fixed-Assets Roadmap

Fixed assets begin after finance periods, account determination and supplier/capital-project sources are stable. The roadmap introduces asset classes, books, capitalization, componentization, transfers, depreciation, impairment, disposal and reconciliation to GL. Multiple books support statutory, management or tax views only when their authority and effective rules are explicit.

Maintenance equipment and financial assets may share identifiers but retain different lifecycle authority. Condition or work history cannot silently change depreciation.

## Chapter 45 — Mobile Platform Evolution

Mobile remains Future. The roadmap first defines responsive web journeys and API contracts, then device trust, encrypted local storage, offline command queues, receipts, conflict handling, attachment transfer and client/backend compatibility. Warehouse scanning and field service are candidate early profiles because value and offline constraints are concrete.

OD-024-036 blocks any client-release promise. Forced upgrade must recover pending work, and backend retirement must respect the approved protocol window.

~~~mermaid
sequenceDiagram
  participant Device
  participant Local as Encrypted local store
  participant Sync as Synchronization service
  participant Domain as ERP command authority
  Device->>Local: Record offline command with idempotency key
  Local->>Sync: Upload after connectivity returns
  Sync->>Domain: Validate version, scope and business preconditions
  Domain-->>Sync: Accepted, rejected or conflict receipt
  Sync-->>Local: Durable outcome and recovery action
  Local-->>Device: Preserve user-visible history
~~~

## Chapter 46 — Cloud and On-Premises Deployment Evolution

Deployment evolution follows FCSB-006 and FCSB-024 profiles. Shared SaaS needs tenant-safe change, rings and fleet inventory; dedicated cloud needs customer windows without product forks; private/on-premises needs signed bundles, read-only preflight and customer evidence exchange; hybrid needs bounded version skew and durable synchronization.

OD-024-003, 014–020 and 038 determine which profiles can be commercially supported first. Architecture may describe all profiles, but investment should prioritize the smallest set that market evidence and operating capacity can support safely.

## Chapter 47 — Security and Cybersecurity Evolution

Security work is continuous across horizons. Horizon 1 strengthens branch/review control, dependency assessment, secret separation, migration privilege and recovery. Horizon 2 embeds authorization, segregation of duties, audit and payment/credit/stock controls in core journeys. Later horizons add artifact provenance, customer security advisories, fleet exposure inventory, extension sandboxing and advanced detection.

Security debt is not deferred merely because a feature belongs to a later horizon. New attack surfaces cannot enter availability without their threat model and accountable risk decision.

## Chapter 48 — Privacy and Data-Governance Evolution

Privacy evolves from data minimization and role/scope enforcement to classification, retention, subject handling, export control, diagnostic redaction and cross-border rules. Analytics, mobile, support bundles and AI each add distinct replication and access paths requiring separate review.

Data Governance maintains ownership, quality, lineage and retention. Privacy Authority decides lawful and contractual handling; Product cannot trade those constraints for adoption convenience.

## Chapter 49 — Resilience, DR, HA and Business-Continuity Evolution

The current database health query is a scaffold, not high availability. Horizon 1 defines recovery objectives by business journey, backup integrity, restore rehearsal and incident authority. Horizon 2 adds job recovery and domain reconciliation. Later work may introduce redundant application instances, managed database failover, multi-zone patterns and customer-specific continuity profiles.

High availability is selected from measured criticality and failure modes. It does not replace disaster recovery, and technical recovery does not close an incident until financial, inventory and production invariants reconcile.

~~~mermaid
flowchart TD
  EVENT["Service or data failure"] --> CLASS{"Failure class"}
  CLASS -->|Application| APP["Replace or roll back artifact"]
  CLASS -->|Configuration| CFG["Restore approved configuration"]
  CLASS -->|Data| DATA["Restore or forward-correct"]
  CLASS -->|Dependency| DEG["Enter tested degraded mode"]
  APP --> VERIFY["Technical verification"]
  CFG --> VERIFY
  DATA --> VERIFY
  DEG --> VERIFY
  VERIFY --> DOMAIN["Business reconciliation"]
  DOMAIN --> CLOSE["Authorized continuity closure"]
~~~

## Chapter 50 — Performance and Scalability Evolution

FCSB-023 governs performance budgets, workload identity and evidence. Horizon 1 establishes representative journeys and bounded datasets; Horizon 2 measures transactional and reporting concurrency; Horizon 3 adds planning, manufacturing and background workloads; Horizon 4 selects scaling mechanisms from observed bottlenecks.

Caching, queuing, replicas, partitioning, sharding and autoscaling remain Future until their consistency, isolation, recovery and cost trade-offs are evidenced. Performance gates cite the same workload/version/environment contract across candidates.

## Chapter 51 — Observability and Operational Intelligence Evolution

Observability progresses from health and audit foundations to release-aware metrics, logs and traces, job/migration visibility and business control totals. OD-024-037 blocks platform selection. Tenant labels remain opaque and bounded; payloads, banking data and credentials are excluded.

Operational intelligence later correlates deployment, workload, integration and business anomalies. Automated action remains constrained by safe stop conditions and human incident authority.

## Chapter 52 — AI and Intelligent Automation Opportunities

AI opportunities include guided search, document assistance, anomaly explanation, planning alternatives, maintenance insight, quality triage and workflow drafting. FCSB-008 governs context, authority, privacy and explainability. OD-024-035 blocks provider/model availability decisions.

Horizon 4 may deliver low-risk assistive cases after versioned evaluation, cost limits, fallback and monitoring exist. Execution of postings, payments, stock, production or access changes requires explicit human/delegated authority and deterministic domain validation.

~~~mermaid
stateDiagram-v2
  [*] --> ProposedUseCase
  ProposedUseCase --> RiskTiered
  RiskTiered --> DataApproved
  DataApproved --> Evaluated
  Evaluated --> LimitedPilot
  LimitedPilot --> MonitoredAssistance
  MonitoredAssistance --> Expanded: outcome and risk accepted
  Evaluated --> Rejected: quality or control fails
  MonitoredAssistance --> Disabled: drift, cost or incident
~~~

## Chapter 53 — Product Extensibility and Ecosystem Strategy

The ecosystem grows from documented integration and metadata contracts to certified adapters, extension packages and partner contributions. Core, localization, industry and customer layers have separate owners and compatibility promises. A marketplace is a later operating model requiring commercial, security, support, revocation and dispute governance.

Ecosystem breadth is not measured by package count alone. Upgrade success, permission quality, defect ownership and customer value determine whether extensibility lowers or raises total cost.

## Chapter 54 — Localization and International Expansion

Localization sequencing starts with target-market evidence and qualified authority. A country package may contain tax, statutory reporting, payment formats, language resources and effective-date rules while depending on common currency, finance and document contracts.

International expansion requires ongoing regulatory maintenance and supported customer communication, not a one-time translation. Jurisdiction activation is company/legal-entity scoped; historical behavior remains reproducible.

## Chapter 55 — Upgrade and Backward-Compatibility Strategy

The upgrade strategy follows expand-and-contract data changes, explicit contract versions, customer extension inventories, migration rehearsal and support-line policy. Compatibility differs across API, workflow, report, mobile, package, database and business semantics; a semantic version cannot replace those matrices.

Older on-premises versions receive only the support level approved under OD-024-003 and OD-024-039. Security exposure may force action through the FCSB-024 emergency path, but does not justify an undocumented incompatible change.

## Chapter 56 — Release-Train Alignment with FCSB-024

Roadmap horizons feed release trains only after capability, architecture and investment admission. A train composes release units with a fixed candidate, manifest, migration range, compatibility profile, evidence and customer impact decision. Roadmap priority cannot waive release gates.

~~~mermaid
sequenceDiagram
  participant Roadmap as Product portfolio
  participant Architecture as Architecture Board
  participant Delivery as Engineering
  participant Release as Release Authority
  participant Operations
  Roadmap->>Architecture: Submit admitted initiative and dependencies
  Architecture-->>Roadmap: Approve, condition or defer
  Roadmap->>Delivery: Fund bounded outcome
  Delivery->>Release: Present fixed candidate and evidence
  Release-->>Delivery: Accept, reject or require new candidate
  Release->>Operations: Authorize deployment profile and cohort
  Operations-->>Roadmap: Return outcome and incident evidence
~~~

## Chapter 57 — Product-Governance Alignment

Product Council owns portfolio outcomes and investment trade-offs; Product Governance maintains capability/horizon state; Architecture Board protects cross-volume coherence; domain owners accept semantics; Release Authority controls candidate promotion; Operations controls execution; Customer Impact Forum controls rollout readiness. These roles remain separated even in a small organization.

The roadmap is reviewed as a dependency graph and risk portfolio, not a feature wish list. Customer requests enter through product-fit analysis and supported variation rules.

## Chapter 58 — Architecture Board Decision Gates

Architecture gates occur at roadmap entry, cross-domain contract approval, technology selection, pre-implementation review, release-class change and retirement. The Board decides architecture permission, not budget or production deployment. Conditional approval identifies an owner, evidence, expiry and blocked transition.

| Gate | Question | Required evidence |
|---|---|---|
| A0 Intent coherence | Does the outcome fit product and FCSB authority? | Outcome, customer profile, affected volumes |
| A1 Dependency integrity | Are predecessors and cycles explicit? | Typed graph and minimum foundation |
| A2 Contract approval | Are semantic/data/API boundaries owned? | Versioned contract and authority |
| A3 Technology selection | Is the option justified by workload and controls? | Alternatives, cost, threat and operations |
| A4 Delivery conformance | Does implementation match approved boundaries? | Traceable design and tests |
| A5 Lifecycle change | Can compatibility, data and support obligations change safely? | Consumer, migration and retirement evidence |

## Chapter 59 — Investment Gates

Investment Gate I funds discovery; Gate II funds a bounded foundation or product increment; Gate III funds availability and customer enablement; Gate IV funds scale; Gate V continues, pivots or retires based on outcomes. Each gate considers build, migration, security, operations, support, localization and compatibility cost.

No initiative advances because prior expenditure creates pressure. Sunk cost is separated from remaining value and risk. Budget-friendly positioning requires controlling permanent support obligations as rigorously as initial development spend.

## Chapter 60 — Risk-Based Roadmap Controls

Roadmap risk combines severity, uncertainty, exposure duration, reversibility and dependency centrality. A foundation with many downstream consumers receives earlier assurance even when its visible customer value is modest. High-impact irreversible data changes require stronger entry evidence than reversible interface experiments.

Risk acceptance names scope, owner, expiry and residual direction. Chapter 71 carries roadmap-specific risks and traces inherited FCSB-024 risks where the sequencing control is the mitigation.

## Chapter 61 — Roadmap Change-Management Process

Change begins with new evidence: customer demand, architecture decision, implementation result, incident, regulatory change, cost observation or dependency shift. Product Governance assesses affected outcomes and horizons; Architecture checks contract consequences; Finance/Investment authority checks cost; risk owners update exposure; Product Council approves portfolio reordering.

~~~mermaid
stateDiagram-v2
  [*] --> ChangeRaised
  ChangeRaised --> ImpactMapped
  ImpactMapped --> AuthorityReview
  AuthorityReview --> ApprovedReorder
  AuthorityReview --> Deferred
  AuthorityReview --> Rejected
  ApprovedReorder --> BaselineVersioned
  BaselineVersioned --> Communicated
  Communicated --> [*]
  Deferred --> ChangeRaised: new evidence
~~~

## Chapter 62 — Customer Adoption and Migration Horizons

Customer adoption is profiled by deployment model, current ERP, data complexity, domain scope, customization, integration, regulatory context and change capacity. Early adopters should match the validated profile rather than subsidize unbounded discovery in production.

A staged adoption may begin with masters and a bounded process, but coexistence defines authoritative ownership and reconciliation. Customer migration does not count as successful until users, support, controls and historical access operate under the agreed model.

## Chapter 63 — Technical Debt and Modernization Roadmap

Technical debt is recorded when a constraint creates measurable security, change, performance, support or product-line cost. Horizon 1 prioritizes debt that blocks safe change: release evidence, migrations, test gaps, authorization consistency and configuration/secret separation. Later debt priorities follow operational evidence.

Modernization is not synonymous with replacing technology. Refactoring, upgrading, extracting services or changing databases requires a specific constraint, compatibility plan and outcome measure.

## Chapter 64 — Deprecation and Retirement Strategy

Deprecation begins with consumer discovery, replacement readiness, notice and migration support. Retirement covers code, contracts, data, permissions, reports, audit, documentation, support and recovery artifacts. OD-024-039 blocks support-window promises.

The roadmap allocates capacity for removals; otherwise every new capability increases permanent complexity. Emergency security disablement follows a separate risk path with explicit customer and data consequences.

## Chapter 65 — Future Research and Innovation Areas

Research areas include constraint-solving for production, process mining, semantic product graphs, privacy-preserving benchmarking, low-code verification, offline conflict assistance, energy/material traceability and digital-product passports. Each research card states hypothesis, data need, ethical/security boundary, evaluation and stop condition.

Research does not appear in sales commitments or GA catalogs. Successful research enters ordinary architecture and investment gates.

## Chapter 66 — Long-Term FlowCraft ERP Target-State Narrative

A future FlowCraft customer begins with a controlled deployment profile and migrates trusted organization, party, item and historical data through reconciled evidence. The customer enables coherent operational journeys from governed packages, configures roles and approvals, and adds reports, workflows or modules through versioned contracts. Every upgrade previews impacts and preserves authoritative history.

Production planners see feasible demand/supply and capacity choices; warehouse and shop-floor users execute traceable work online or offline; procurement, sales and service share counterparties and terms; Finance certifies reconciled effects; Quality and Maintenance protect output and assets. Operators connect release identity to technical and business health. AI explains and proposes within authority boundaries.

This narrative is a target state. It becomes product reality only through the horizon initiatives, closed decisions, funded capacity, accepted domain behavior, release evidence and customer outcomes defined in this volume.
## Chapter 67 — Product Capability Catalog

This catalog is a roadmap baseline, not a general-availability list. Evidence links support every Implemented foundation classification; all other statuses preserve the gap between architecture and operational capability.

| Capability ID | Capability | Current status | Evidence or current gap | Target horizon | Intended outcome | Predecessor or decision gate | Success measure |
|---|---|---|---|---|---|---|---|
| CAP-025-001 | Accepted milestone source trace | Implemented foundation | Git tags through v0.4-dba004-merged and the [DBA-004 report](../implementation/DBA-004-enterprise-master-data-implementation.md). | Foundation | Preserve reproducible milestone ancestry | OD-024-004/005 | accepted tags resolving to reported commits |
| CAP-025-002 | Workspace compilation command | Implemented foundation | The [root package](../../package.json) dispatches workspace builds. | Foundation | Repeatable engineering verification | OD-024-006 | workspace build result tied to source commit |
| CAP-025-003 | API test command | Implemented foundation | The [API package](../../apps/api/package.json) defines the accepted test entry point. | Foundation | Regression evidence for current foundations | OD-024-010/011 | candidate suite counts and outcomes retained |
| CAP-025-004 | Dependency resolution lock | Implemented foundation | The committed [package lock](../../package-lock.json) fixes npm resolutions. | Foundation | Bounded dependency change | OD-024-007/008 | reviewed lock changes with vulnerability disposition |
| CAP-025-005 | Versioned API namespace | Implemented foundation | The [API bootstrap](../../apps/api/src/main.ts) mounts api/v1. | Foundation | Stable namespace foundation | OD-024-028/029 | supported consumers and contract behavior registered |
| CAP-025-006 | Accepted schema ancestry | Implemented foundation | Ordered [Prisma migrations](../../apps/api/prisma/migrations) establish the schema chain. | Foundation | Preserved database evolution identity | OD-024-030/032 | checksum-valid ancestry across supported databases |
| CAP-025-007 | Migration immutability record | Implemented foundation | The [DBA-002 report](../implementation/DBA-002-foundation-implementation.md) identifies the accepted additive migration baseline. | Foundation | Prevent historical schema rewrite | OD-024-030 | zero modified accepted migration files |
| CAP-025-008 | Published workflow definition immutability | Implemented foundation | The [workflow service](../../apps/api/src/workflows/workflows.service.ts) rejects published-version edits and [tests](../../apps/api/test/foundation.spec.ts) cover it. | Foundation | Reproducible workflow definition behavior | OD-024-026 | published versions unchanged with successor lineage |
| CAP-025-009 | Application trace and credential redaction | Implemented foundation | The [Audit service](../../apps/api/src/audit/audit.service.ts) creates trace identifiers and redacts credential fields. | Foundation | Explainable protected change trail | OD-024-037 | trace coverage and redaction exceptions measured |
| CAP-025-010 | Development container topology | Scaffold | Compose and Dockerfiles support development services but not production orchestration. | Horizon 1 | Consistent developer environment | OD-024-003/006 | documented build parity gaps and reproducible startup |
| CAP-025-011 | Database health check | Scaffold | The health controller proves a database query, not release readiness or HA. | Horizon 1 | Minimal dependency health signal | OD-024-012/037 | probe correctness and false-healthy incidents |
| CAP-025-012 | Report and layout metadata | Scaffold | Schema and services expose metadata/preview shapes without certified semantic publication. | Horizon 2 | Foundation for governed reporting | OD-024-027 | published report reproduces certified totals and scope |
| CAP-025-013 | Tenant and organization identity | Partial | Accepted schema and organization services establish scope identities; operational coverage is incomplete. | Horizon 1 | Consistent multi-company authorization context | FCSB-003/005 | critical commands rejecting cross-scope access |
| CAP-025-014 | Enterprise master data | Partial | DBA-004 implements key party, item, currency and organizational masters; lifecycle breadth remains incomplete. | Horizon 1 | Trusted reusable business identities | Domain ownership gates | duplicate, invalid and stale master rates |
| CAP-025-015 | Role and permission foundation | Partial | Identity and permission models exist without complete SoD policy and privileged release control. | Horizon 1 | Least-privilege business access | FCSB-005; OD-024-022 | negative authorization and SoD conflict outcomes |
| CAP-025-016 | Candidate identity and manifest | Planned | FCSB-024 defines the contract; no candidate/manifest service exists. | Horizon 1 | Evidence bound to exact release content | OD-024-004/007–010 | all promoted artifacts resolving to one manifest |
| CAP-025-017 | Protected integration policy | Planned | Repository history exists; hosted enforcement is not evidenced. | Horizon 1 | Independent reviewed source integration | OD-024-005 | required checks and bypass audit coverage |
| CAP-025-018 | Artifact provenance and signing | Future | No registry, SBOM, signing or provenance runtime is evidenced. | Horizon 1 | Verifiable software supply chain | OD-024-007/008 | deployed digests with trusted provenance |
| CAP-025-019 | Migration preflight and checkpointing | Planned | Accepted ancestry exists without large-data preflight or restartable runner. | Horizon 1 | Predictable schema/data change | OD-024-030–032 | interruption recovery and partitioned reconciliation |
| CAP-025-020 | Backup and restore certification | Planned | Architecture defines restore evidence; production-profile rehearsal is absent. | Horizon 1 | Recoverable customer data | OD-024-003/032 | restores meeting approved recovery objectives |
| CAP-025-021 | Universal transaction identity | Scaffold | Generic transaction/link models exist without accepted operational invariants. | Horizon 1 | Common lifecycle and traceability | FCSB-009 | domain transactions with immutable source/effect links |
| CAP-025-022 | Universal document contract | Scaffold | Document-related metadata exists without controlled runtime publication. | Horizon 1 | Consistent business-document lifecycle | FCSB-010 | versioned corrections, approvals and outputs |
| CAP-025-023 | Workflow instance runtime | Planned | Definition foundations exist; instances, timers and escalation are absent. | Horizon 2 | Durable approvals and orchestration | OD-024-026 | in-flight processes surviving version changes |
| CAP-025-024 | Financial posting contract | Planned | Finance architecture defines balanced effects; no operational posting runtime is accepted. | Horizon 1 | One accountable subledger-to-GL interface | FCSB-014 | balanced, idempotent and traceable postings |
| CAP-025-025 | General ledger and fiscal periods | Scaffold | Chart/journal masters are scaffolds without ledger balances or close controls. | Horizon 2 | Authoritative accounting foundation | CAP-025-024 | period-controlled journals reconciled to source |
| CAP-025-026 | Accounts receivable and settlement | Planned | Customer/payment masters exist; receivable subledger and settlement do not. | Horizon 2 | Controlled customer exposure and cash application | CAP-025-025/037 | open-item and GL reconciliation |
| CAP-025-027 | Accounts payable and supplier payment | Planned | Supplier terms exist; three-way match and dual-control payment are not operational. | Horizon 2 | Controlled liabilities and disbursement | CAP-025-025/035 | matched exceptions and authorized payment evidence |
| CAP-025-028 | Tax determination and reporting | Planned | Tax masters are foundations; jurisdiction/effective rule runtime is absent. | Horizon 2 | Explainable compliant tax effects | OD-024-003; localization gate | transaction-to-return reconciliation |
| CAP-025-029 | Multi-currency accounting | Planned | Currency/rate masters exist without settlement, revaluation or translation. | Horizon 2 | Reliable cross-currency operations | CAP-025-025 | rate-version and gain/loss reconciliation |
| CAP-025-030 | Fixed assets and depreciation | Future | No accepted asset subledger runtime exists. | Horizon 2 | Controlled capital-asset lifecycle | CAP-025-025/027 | asset-book-to-GL reconciliation |
| CAP-025-031 | Inventory movement ledger | Planned | Warehouse/item/tracking masters exist; authoritative movement ledger is absent. | Horizon 2 | Traceable quantity and ownership | CAP-025-021/024 | movement-to-balance and finance reconciliation |
| CAP-025-032 | Reservations and availability | Planned | No accepted reservation or ATP runtime exists. | Horizon 2 | Reliable promise and material allocation | CAP-025-031 | reservation integrity under concurrency |
| CAP-025-033 | Inventory valuation | Planned | Cost/valuation fields exist without accepted valuation ledger. | Horizon 2 | Financially consistent stock value | CAP-025-024/031 | quantity/value/GL reconciliation |
| CAP-025-034 | Warehouse execution | Future | Zones/bins are masters; directed work and mobile confirmation are absent. | Horizon 3 | Efficient controlled material handling | CAP-025-031/032/052 | pick/put-away accuracy and task completion |
| CAP-025-035 | Purchase-order and receipt lifecycle | Planned | Supplier/item masters exist without operational purchasing transactions. | Horizon 2 | Controlled source-to-receipt journey | CAP-025-021/031 | ordered, received, returned and open quantities reconcile |
| CAP-025-036 | Sales-order and fulfillment lifecycle | Planned | Customer/price masters exist without operational order fulfillment. | Horizon 2 | Controlled order-to-delivery journey | CAP-025-021/032 | order, allocation, shipment and billing reconciliation |
| CAP-025-037 | Credit policy and override | Planned | Credit fields exist without exposure ledger or governed override workflow. | Horizon 2 | Risk-aware customer commitment | CAP-025-023/026 | overrides within authority and exposure accuracy |
| CAP-025-038 | Material requirements planning | Future | No accepted MRP engine or planning snapshot exists. | Horizon 2 | Explainable supply proposals | CAP-025-031/032/035/036 | pegged exceptions and proposal acceptance quality |
| CAP-025-039 | Capacity planning | Future | Work-center/capacity execution is architectural only. | Horizon 3 | Feasible production load | CAP-025-038/040 | capacity exceptions and schedule adherence |
| CAP-025-040 | Production-order execution | Planned | Production metadata/EOR registrations exist without operational execution. | Horizon 3 | Traceable plan-to-completion | CAP-025-031/038 | issue, labor, completion and genealogy integrity |
| CAP-025-041 | Production preemption control | Future | Urgent priority/rescheduling governance has no runtime. | Horizon 3 | Safe response to urgent demand | CAP-025-039/040 | approved preemptions without hidden allocation loss |
| CAP-025-042 | Manufacturing costing and variance | Future | Cost masters exist; work-order actual/variance posting is absent. | Horizon 3 | Explainable product cost | CAP-025-033/040 | order variance reconciled to inventory and GL |
| CAP-025-043 | Quality inspection and holds | Planned | Quality flags/status masters exist without inspection runtime. | Horizon 3 | Prevent unaccepted material use | CAP-025-031/040 | hold/release effects and result traceability |
| CAP-025-044 | Nonconformance and CAPA | Future | No accepted nonconformance/CAPA workflow exists. | Horizon 3 | Closed-loop quality improvement | CAP-025-023/043 | containment, cause and action closure |
| CAP-025-045 | Maintenance work management | Future | Maintenance masters/registrations exist without work runtime. | Horizon 3 | Reliable assets and controlled downtime | CAP-025-031/040 | planned/unplanned work and cost capture |
| CAP-025-046 | Project and service management | Future | Organization/customer/item foundations exist; PSA/service runtime is absent. | Horizon 3 | Traceable project and service delivery | CAP-025-021/026/031 | time, material, billing and margin reconciliation |
| CAP-025-047 | Governed semantic reporting | Planned | Metadata scaffolds exist without certified datasets and measures. | Horizon 2 | Consistent operational and financial insight | OD-024-027 | definition-version and source reconciliation |
| CAP-025-048 | User report designer | Future | No safe governed customer authoring runtime is accepted. | Horizon 3 | Customer insight without database exposure | CAP-025-047 | published reports passing scope and compatibility tests |
| CAP-025-049 | Management dashboards | Partial | Dashboard queries exist without certified KPI governance or release semantics. | Horizon 2 | Decision-ready management views | CAP-025-047 | KPI lineage, freshness and owner certification |
| CAP-025-050 | Module Builder package runtime | Future | Metadata foundations exist; package manifest/installer is not implemented. | Horizon 3 | Upgrade-safe customer modules | OD-024-023–025 | compatible packages with permission/data lifecycle evidence |
| CAP-025-051 | Visual workflow designer | Future | Workflow metadata exists without governed graphical authoring. | Horizon 3 | Accessible controlled process design | CAP-025-023 | published graphs passing semantic and command validation |
| CAP-025-052 | Mobile and offline client | Future | No PWA/native offline runtime, device trust or sync service exists. | Horizon 4 | Resilient warehouse and field work | OD-024-036 | offline commands recovered without duplication or loss |
| CAP-025-053 | Integration contract registry | Planned | API namespace exists; consumer/version registry is absent. | Horizon 2 | Governed partner compatibility | OD-024-028/029 | supported consumers and retirement readiness |
| CAP-025-054 | Webhook and event delivery | Future | No accepted event broker/outbox or webhook runtime exists. | Horizon 3 | Reliable asynchronous ecosystem | CAP-025-021/053 | idempotent delivery, replay and consumer lag |
| CAP-025-055 | ERP migration workbench | Future | Seed/import scaffolds do not form a governed migration product. | Horizon 2 | Repeatable legacy onboarding | OD-024-030–032 | rehearsed mappings, exceptions and control totals |
| CAP-025-056 | Shared SaaS tenant rollout | Conceptual target architecture | Multi-tenant foundations exist; rings and fleet control do not. | Horizon 4 | Bounded multi-customer change exposure | OD-024-014–016/037 | cohort stop/resume with business signals |
| CAP-025-057 | Dedicated-cloud upgrade profile | Planned | Architecture defines the profile without automation or support policy. | Horizon 2 | Customer-windowed governed upgrades | OD-024-003/017/038 | supported artifact and completed customer evidence |
| CAP-025-058 | On-premises signed installer | Future | No package distribution, signing or preflight runtime exists. | Horizon 3 | Verifiable customer-operated upgrades | OD-024-018/019 | offline verification and safe preflight outcomes |
| CAP-025-059 | Hybrid compatibility control | Future | Hybrid version negotiation and durable sync are architectural only. | Horizon 4 | Safe site/cloud coexistence | OD-024-020 | bounded skew and recovered interrupted exchanges |
| CAP-025-060 | Release-aware observability | Future | Health/audit foundations exist without APM, tracing or release dashboards. | Horizon 2 | Connect deployment to technical/business effects | OD-024-012/015/037 | artifact-tagged signals and domain stop conditions |
| CAP-025-061 | High availability and DR profiles | Planned | No accepted production HA topology or tested profile is evidenced. | Horizon 2 | Business-aligned continuity | OD-024-003/032 | recovery objectives and reconciled exercises |
| CAP-025-062 | Performance workload governance | Planned | FCSB-023 defines the target; no accepted enterprise load baseline exists. | Horizon 1 | Evidence-led capacity choices | OD-024-012 | comparable workload runs and budget decisions |
| CAP-025-063 | Localization package framework | Future | Currency/tax masters exist without governed jurisdiction packages. | Horizon 4 | Maintainable country expansion | OD-024-003/023–025 | effective-rule and statutory report certification |
| CAP-025-064 | Governed AI assistance | Future | No provider, model, prompt, evaluation or monitoring runtime exists. | Horizon 4 | Bounded explainable productivity assistance | OD-024-035 | versioned evaluation, human authority and cost controls |
## Chapter 68 — Roadmap Initiative Catalog

Initiatives are conditional architectural units. “Target horizon” identifies the earliest rational placement after gates close; it is not a delivery commitment.

| ID | Initiative | Current status | Target horizon | Business outcome | Architectural dependency | Technical dependency | Data dependency | Security dependency | Governance dependency | Investment dependency | Predecessor | Success criteria | Key risk | Decision gate | Evidence reference |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| RM-001 | Governance charters and capability identity | Planned | Horizon 1 | One accountable product decision record | FCSB-024 lifecycle | Registry schema | Owner/state history | Role separation | OD-024-001/002/040 | Discovery and operating capacity | CAP-025-001 | all active capabilities named and reviewed | Unresolved vetoes create shadow authority | Product Council entry | FCSB-024 Ch.05–08 |
| RM-002 | Protected source and candidate policy | Planned | Horizon 1 | Reviewed reproducible source baseline | FCSB-024 source governance | Repository enforcement | Commit/tag identity | Privileged override control | OD-024-004/005 | Hosting and engineering | RM-001 | candidate evidence bound to immutable ref | Late change invalidates tests | Architecture and release | CAP-025-001/017 |
| RM-003 | Build, manifest and provenance foundation | Planned | Horizon 1 | Trusted promotable artifacts | FCSB-024 manifest | CI/registry/signing selection | Dependency/SBOM identity | Key custody and runner isolation | OD-024-006–009 | Platform subscriptions and skills | RM-002 | deployed digest resolves to build evidence | Supply-chain compromise | Security and investment | CAP-025-002/004/016/018 |
| RM-004 | Representative quality portfolio | Partial | Horizon 1 | Candidate-level domain assurance | FCSB-024 gates | Test orchestration | Versioned fixtures | Test-data minimization | OD-024-010/011 | QA and domain time | RM-002 | fixed candidate passes approved profiles | Happy-path evidence hides defects | Quality gate | CAP-025-003 |
| RM-005 | Migration safety and restore evidence | Planned | Horizon 1 | Recoverable data evolution | FCSB-003/024 | Runner/checkpoint and backup tools | Ancestry/totals/exceptions | Migration privilege separation | OD-024-030–032 | Database and operations capacity | RM-002 | interrupted migration resumes and reconciles | Irreversible corruption | Data and recovery gates | CAP-025-006/007/019/020 |
| RM-006 | Scope and authorization hardening | Partial | Horizon 1 | Consistent tenant/company isolation | FCSB-003/005 | Policy and negative-test harness | Scope identifiers | SoD and privileged path | OD-024-022 | Security/domain engineering | RM-004 | critical operations reject wrong scope | Cross-tenant exposure | Security gate | CAP-025-013/015 |
| RM-007 | Master-data lifecycle completion | Partial | Horizon 1 | Trusted core identities | FCSB-003 | Domain services and validation | Effective dating/deduplication | Steward permissions | Domain ownership | Stewardship capacity | RM-006 | quality thresholds and traceable changes | Bad masters contaminate ledgers | Domain gate | CAP-025-014 |
| RM-008 | Universal transaction/document contract | Scaffold | Horizon 1 | Shared lifecycle, correction and links | FCSB-009/010 | Transactional services | Immutable identity/effects | Command authorization/audit | Architecture Board | Cross-domain design | RM-006/007 | two domains reuse accepted contracts | Generic model erases semantics | Architecture gate | CAP-025-021/022 |
| RM-009 | Finance–inventory posting and valuation contract | Planned | Horizon 1 | Balanced operational financial effects | FCSB-014/015 | Posting/idempotency services | Account/valuation dimensions | Period and journal authority | Finance and Inventory | Specialist design/testing | RM-008 | sample movements reconcile to balanced entries | Circular dependency or opaque postings | Domain architecture gate | CAP-025-024/031/033 |
| RM-010 | Performance workload baseline | Planned | Horizon 1 | Evidence-led capacity budgets | FCSB-023 | Load harness | Representative histories | Synthetic protected data | OD-024-012 | Performance environments | RM-004/008 | repeatable budgets for critical journeys | False baseline drives architecture | Performance gate | CAP-025-062 |
| RM-011 | Supportable pilot profile | Planned | Horizon 1 | Bounded market-entry promise | FCSB-024 deployment profiles | Version inventory/runbooks | Customer profile | Diagnostic access boundary | OD-024-003/038 | Support and customer-success capacity | RM-001–010 | named pilot scope and readiness acceptance | Sales promise exceeds product | Product/investment gate | FCSB-024 Ch.20–23 |
| RM-012 | Roadmap evidence and change ledger | Planned | Horizon 1 | Auditable portfolio learning | This volume | Roadmap register | Decision/outcome history | Portfolio access control | OD-024-002/040 | Product operations | RM-001 | every reordering preserves rationale | Roadmap quietly becomes promise | Product Council gate | FCSB-025 Ch.08/61 |
| RM-013 | General ledger and period control | Scaffold | Horizon 2 | Authoritative accounting book | FCSB-014 | Journal/posting runtime | Accounts/periods/balances | Finance SoD | Finance authority | Finance engineering | RM-009 | balanced journals and controlled close | Premature subledgers bypass GL | Finance gate | CAP-025-025 |
| RM-014 | Inventory ledger, reservation and valuation | Planned | Horizon 2 | Reliable stock availability/value | FCSB-015 | Movement/reservation engine | Tracking and valuation ledger | Warehouse role controls | Inventory/Finance | Inventory engineering | RM-009 | quantity/value/GL reconcile under concurrency | Negative or duplicate stock | Inventory gate | CAP-025-031–033 |
| RM-015 | Sales order through receivable | Planned | Horizon 2 | Controlled customer fulfillment and debt | FCSB-016 | Order/allocation/billing services | Customer/item/price/open items | Credit override SoD | Sales/Finance | Commercial domain team | RM-013/014 | order-to-cash journey reconciles | Credit or fulfillment inconsistency | Sales/Finance gate | CAP-025-026/036/037 |
| RM-016 | Procurement through payable | Planned | Horizon 2 | Controlled sourcing, receipt and liability | FCSB-017 | PO/receipt/match/payment services | Supplier/item/open items | Payment dual control | Procurement/Finance | Procurement domain team | RM-013/014 | three-way match and payment reconcile | Fraud or duplicate liability | Procurement/Finance gate | CAP-025-027/035 |
| RM-017 | Tax determination foundation | Planned | Horizon 2 | Explainable jurisdiction tax | FCSB-014/017 | Rule evaluation | Effective rules and evidence | Tax authority/SoD | Localization/Tax | Qualified tax expertise | RM-013/015/016 | transaction-to-return totals reconcile | Wrong effective jurisdiction | Tax/legal gate | CAP-025-028 |
| RM-018 | Multi-currency operations | Planned | Horizon 2 | Trade and account across currencies | FCSB-014 | Rate/settlement/revaluation | Applied rate history | Rate maintenance authority | Finance | Treasury/accounting skills | RM-013/015/016 | open-item and gain/loss reconciliation | Historical restatement | Finance gate | CAP-025-029 |
| RM-019 | MRP proposal engine | Future | Horizon 2 | Explainable material plan | FCSB-007/018 | Planning computation | Demand/supply/BOM/lead time snapshots | Planner authorization | Planning governance | Planning engineering | RM-014/015/016 | pegged proposals and shortage explanations | Untrusted data creates noise | Manufacturing gate | CAP-025-038 |
| RM-020 | Workflow approval runtime | Planned | Horizon 2 | Durable delegated controls | FCSB-011 | Instance/timer/escalation engine | Version/instance history | Approver/SoD enforcement | OD-024-026 | Workflow engineering | RM-008 | credit, shortage and PO approvals survive restart | In-flight version break | Workflow gate | CAP-025-008/023 |
| RM-021 | Governed reporting semantic layer | Planned | Horizon 2 | Certified cross-domain insight | FCSB-013 | Dataset/query publication | Formula/source lineage | Row security | OD-024-027 | Reporting/domain capacity | RM-013/014 | standard reports reproduce ledger totals | Silent semantic drift | Reporting gate | CAP-025-012/047/049 |
| RM-022 | Legacy migration workbench pilot | Future | Horizon 2 | Repeatable first customer onboarding | FCSB-003/024 | Mapping/load/checkpoint tools | Source/mapping/exceptions | Migration access and retention | OD-024-030–032 | Migration programme | RM-005/007/013/014 | two rehearsals meet partitioned tolerances | Source loss or hidden transformation | Cutover gate | CAP-025-055 |
| RM-023 | Release-aware operations baseline | Future | Horizon 2 | Connect change to health and outcomes | FCSB-006/023/024 | Telemetry platform | Release/workload/control totals | Opaque labels/redaction | OD-024-015/037 | Operations platform | RM-003/010 | release-tagged technical and business signals | Monitoring leaks or false health | Operations/security gate | CAP-025-011/060 |
| RM-024 | Dedicated-cloud support profile | Planned | Horizon 2 | Governed isolated customer upgrade | FCSB-006/024 | Deployment inventory | Version/config/customer evidence | Privileged deployment controls | OD-024-003/017/038 | Operations/support capacity | RM-003/005/011 | one rehearsed supported customer window | Customer becomes product fork | Deployment investment gate | CAP-025-057 |
| RM-025 | Resilience and continuity profile | Planned | Horizon 2 | Recover critical ERP journeys | FCSB-006 | HA/backup/job recovery | Recovery and reconciliation records | Emergency access | OD-024-032 | Infrastructure and exercises | RM-005/023 | approved objectives met with domain reconciliation | Technical recovery hides business loss | Continuity gate | CAP-025-020/061 |
| RM-026 | Fixed-assets subledger | Future | Horizon 2 | Controlled capital lifecycle | FCSB-014 | Asset/depreciation engine | Books/assets/events | Asset and journal authority | Finance | Asset accounting expertise | RM-013/016 | asset books reconcile to GL | Wrong depreciation or disposal | Finance gate | CAP-025-030 |
| RM-027 | Production-order execution core | Planned | Horizon 3 | Traceable production completion | FCSB-018 | Execution commands | Order/material/labor/genealogy | Shop-floor roles | Manufacturing | MES delivery capacity | RM-014/019/020 | order quantities, genealogy and postings reconcile | Execution diverges from stock | Manufacturing gate | CAP-025-040 |
| RM-028 | Capacity scheduling and preemption | Future | Horizon 3 | Feasible priority-aware schedule | FCSB-007/018 | Finite scheduling service | Capacity/calendar/open orders | Override authority | Planning/Operations | Optimization expertise | RM-019/027 | approved urgent changes preserve constraints | Preemption starves existing orders | Planning gate | CAP-025-039/041 |
| RM-029 | Manufacturing cost and variance | Future | Horizon 3 | Explainable actual product cost | FCSB-014/018 | Cost calculation/posting | Material/labor/overhead versions | Costing authority | Finance/Manufacturing | Cost-accounting team | RM-013/014/027 | order variance reconciles to GL | Cost rules distort margin | Costing gate | CAP-025-042 |
| RM-030 | Quality inspection, hold and CAPA | Planned | Horizon 3 | Prevent and learn from nonconformance | FCSB-019 | Inspection/CAPA workflow | Plans/results/dispositions | Release authority | Quality | Quality engineering | RM-020/027 | status blocks use and actions close | Unsafe stock released | Quality gate | CAP-025-043/044 |
| RM-031 | Maintenance work and reliability | Future | Horizon 3 | Controlled uptime and asset cost | FCSB-020 | Work/schedule runtime | Assets/failures/labor/material | Permit/safety authority | Maintenance | EAM expertise | RM-014/020/027 | work, downtime and cost traceability | Maintenance disrupts production | Maintenance gate | CAP-025-045 |
| RM-032 | Advanced warehouse execution | Future | Horizon 3 | Accurate efficient warehouse work | FCSB-015 | Task and scanning services | Bin/task/tracking state | Device/user authorization | Warehouse | Warehouse/mobile capacity | RM-014 | directed work preserves ledger truth | Physical/system divergence | Warehouse gate | CAP-025-034 |
| RM-033 | Module Builder contract and pilot | Future | Horizon 3 | Supported customer variation | FCSB-012/024 | Manifest/resolver/sandbox | Package/dependency/data ownership | Permission/signing review | OD-024-023–025 | Platform product team | RM-003/006/008 | pilot extension upgrades without core change | Extension compromises scope or history | Architecture/security gate | CAP-025-050 |
| RM-034 | Visual workflow designer | Future | Horizon 3 | Governed low-code approvals | FCSB-011/012 | Graph editor/compiler | Definition/command versions | Privileged-node validation | Workflow governance | Designer engineering | RM-020/033 | published graph passes simulation and migration tests | Visual ease masks unsafe semantics | Workflow gate | CAP-025-051 |
| RM-035 | Customer report designer | Future | Horizon 3 | Safe self-service reporting | FCSB-013 | Semantic builder | Dataset/formula/layout versions | Row/export controls | Reporting | Reporting UX team | RM-021/033 | customer reports survive schema evolution | Direct data access leaks scope | Reporting/security gate | CAP-025-048 |
| RM-036 | Reliable event and adapter ecosystem | Future | Horizon 3 | Decoupled partner integration | FCSB-004 | Outbox/broker/adapter SDK | Event schemas/replay state | Partner credential isolation | OD-024-028/029 | Integration platform | RM-008/023 | idempotent replay and certified consumers | Duplicate or lost external effects | Integration gate | CAP-025-053/054 |
| RM-037 | On-premises signed upgrade bundle | Future | Horizon 3 | Safe customer-operated lifecycle | FCSB-006/024 | Packaging/signature/preflight | Installed version/delta/migration | Offline trust and revocation | OD-024-018/019 | Installer/support engineering | RM-003/005/011 | air-gapped verification and reversible preflight | Unknown fork fails mid-upgrade | Security/deployment gate | CAP-025-058 |
| RM-038 | Project and service delivery slice | Future | Horizon 3 | Traceable time, material and billing | FCSB-021 | Project/case/time services | Customer/resource/cost records | Field/user authorization | Project/Service | Domain delivery team | RM-015/016/020 | delivery, billing and margin reconcile | Services create parallel masters | Domain gate | CAP-025-046 |
| RM-039 | SaaS cohort and fleet control | Conceptual target architecture | Horizon 4 | Bounded multi-customer rollout | FCSB-024 | Fleet/activation service | Version/config/cohort state | Tenant isolation and kill authority | OD-024-014–016/021/022 | Platform operations | RM-023/024 | representative cohort stop/resume evidence | Pilot hides general risk | Product/release gate | CAP-025-056 |
| RM-040 | Mobile offline warehouse profile | Future | Horizon 4 | Resilient scanned execution | FCSB-022 | Client/sync/device trust | Encrypted queue and receipts | Device/key/data controls | OD-024-036 | Mobile engineering/support | RM-032/036 | offline work syncs once with recoverable conflicts | Forced upgrade strands work | Mobile/security gate | CAP-025-052 |
| RM-041 | Hybrid site/cloud profile | Future | Horizon 4 | Operate connected sites through outages | FCSB-006/022/024 | Protocol negotiation/durable sync | Version skew and queue state | Site identity and encryption | OD-024-020 | Hybrid operations | RM-036/037/040 | bounded skew and deterministic recovery | Split authority corrupts operations | Architecture/continuity gate | CAP-025-059 |
| RM-042 | Localization package framework | Future | Horizon 4 | Maintainable country entry | FCSB-012/014 | Package/effective-rule runtime | Jurisdiction/rule/report versions | Legal data/access | OD-024-003/023–025 | Qualified local experts | RM-017/018/033 | country package certifies tax and statutory output | Rule applies to wrong entity/date | Legal/tax gate | CAP-025-063 |
| RM-043 | Elastic performance architecture | Future | Horizon 4 | Scale measured bottlenecks economically | FCSB-023 | Selected cache/queue/replica patterns | Workload and consistency evidence | Isolation under scale | OD-024-012 | Platform infrastructure | RM-010/023/039 | budgets sustained at approved scale/cost | Complexity exceeds value | Performance/investment gate | CAP-025-062 |
| RM-044 | Certified extension ecosystem | Future | Horizon 4 | Partner innovation without fragmentation | FCSB-012/024 | Catalog/distribution/revocation | Package/adoption/support records | Supply-chain and tenant safety | OD-024-023–025 | Partner operations | RM-033/036/037 | upgrade success and accountable defect ownership | Marketplace amplifies insecure packages | Ecosystem gate | CAP-025-050 |
| RM-045 | AI-assisted knowledge and reporting | Future | Horizon 4 | Faster bounded information work | FCSB-008/013 | Provider abstraction/evaluation | Approved context and outputs | Privacy/model/tool controls | OD-024-035 | AI governance and usage cost | RM-021/023 | evaluation and human-review thresholds hold | Hallucination or data leakage | AI/privacy/investment gate | CAP-025-064 |
| RM-046 | AI-assisted planning alternatives | Future | Horizon 4 | Explain feasible production choices | FCSB-007/008/018 | Model plus deterministic solver boundary | Plans/constraints/outcome feedback | Human release authority | OD-024-035 | Operations-research/AI skills | RM-028/043/045 | recommendations improve outcome without constraint breach | Automation bias changes executable plan | AI/manufacturing gate | CAP-025-064 |
| RM-047 | Semantic capability graph research | Future | Horizon 5 | Trace product and business meaning across domains | FCSB-008 | Graph/semantic prototype | Controlled ontology and lineage | Access and inference review | Research Board | Research budget | RM-012/021/044 | prototype answers trace questions with provenance | Ontology overclaims authoritative truth | Research gate | FCSB-008 |
| RM-048 | Constraint-aware autonomous operations research | Future | Horizon 5 | Test bounded closed-loop assistance | FCSB-008/018 | Simulation/safety envelope | Synthetic/approved operational data | Human override and fail-safe | Research Board | Advanced research capacity | RM-046 | simulation proves stop behavior and bounded actions | Unsafe autonomy escapes envelope | Ethics/security research gate | FCSB-008/018 |
| RM-049 | Sustainability and digital-product-passport research | Future | Horizon 5 | Explore material/energy provenance value | FCSB-003/008/018 | Traceability prototype | Supplier/material/process evidence | Confidentiality and claim integrity | Product Council | Market/regulatory research | RM-030/036/042/047 | verified provenance pilot and demand evidence | Unverifiable claims create liability | Legal/research gate | FCSB-003/019 |
| RM-050 | Adaptive industry package research | Future | Horizon 5 | Assess reusable vertical configurations | FCSB-012/024 | Package composition prototype | Variation and adoption evidence | Extension isolation | Product Council | Industry discovery | RM-042/044/047 | two customers reuse package without source fork | Vertical variants fragment the core | Product/architecture gate | FCSB-012/024 |
## Chapter 69 — Dependency Matrix

A blocked predecessor is a sequencing fact, not a reason to assume parallel delivery.

| Dependency | Required foundation | Gate or predecessor | Downstream scope | Blocking consequence |
|---|---|---|---|---|
| DEP-001 | RM-001 governance charters | OD-024-001/002/040 | All committed horizons | No portfolio commitment before authority |
| DEP-002 | RM-003 artifact foundation | RM-002 and OD-024-006–009 | Every deployable initiative | No production release architecture without identity |
| DEP-003 | RM-005 migration safety | Accepted ancestry and OD-024-030–032 | All schema/data initiatives | Transformations remain rehearsal-only |
| DEP-004 | RM-008 transaction/document contract | RM-006/007 | Finance, inventory, commercial and production | Domain runtimes cannot invent parallel identity |
| DEP-005 | RM-009 posting/valuation contract | RM-008 and Finance/Inventory authority | RM-013/014/029 | Ledger work stays conditional |
| DEP-006 | RM-013 GL | RM-009 | AR, AP, tax, currency, assets, costing | No certified financial effects |
| DEP-007 | RM-014 inventory ledger | RM-009 | Orders, MRP, production, warehouse, quality | No authoritative availability or material use |
| DEP-008 | RM-019 MRP | RM-014/015/016 | Capacity and production execution | Planning automation deferred |
| DEP-009 | RM-020 workflow runtime | Definition foundation and OD-024-026 | Credit, shortage, payment, CAPA, designers | Manual controlled approval remains |
| DEP-010 | RM-021 semantic reporting | Domain ledgers and OD-024-027 | Dashboards, report designer, AI knowledge | Reports remain scaffold/uncertified |
| DEP-011 | RM-023 observability | OD-024-012/015/037 | SaaS cohorts, elastic scale, AI monitoring | Broad rollout remains unsupported |
| DEP-012 | RM-033 Module Builder | OD-024-023–025 | Designer and partner ecosystem | Customization uses approved existing seams only |
| DEP-013 | RM-036 event ecosystem | OD-024-028/029 | Mobile, hybrid, partners | Async expansion deferred |
| DEP-014 | RM-037 on-prem bundle | Signing, preflight and support policy | Private/on-prem customer growth | Manual delivery is not productized |
| DEP-015 | RM-039 SaaS fleet control | RM-023 and cohort decisions | Multi-customer scaling | Tenant-wide rollout stays conceptual |
| DEP-016 | RM-045 governed AI | OD-024-035 plus reporting/telemetry | All AI use cases | No AI availability claim |
| DEP-017 | RM-042 localization | Finance/tax/package contracts | International expansion | Country commitments deferred |
| DEP-018 | RM-010 workload baseline | OD-024-012 | RM-043 elastic architecture | No speculative scaling mechanism |
| DEP-019 | RM-011 pilot profile | Support/deployment decisions | First customer availability | Sales scope cannot exceed evidence |
| DEP-020 | RM-012 roadmap ledger | OD-024-040 disposition | All rebaselines | Draft remains conditional and versioned |

## Chapter 70 — Investment Map

Investment categories expose continuing operating and support cost as well as delivery effort.

| Investment | Portfolio | Horizon | Capacity or cost class | Initiatives | Value hypothesis | Release condition |
|---|---|---|---|---|---|---|
| INV-025-001 | Governance and product operations | H1 | Product Council/Product Governance time | RM-001/012 | Reduced decision and fork debt | Charters and register approved |
| INV-025-002 | Release engineering platform | H1 | CI, registry, signing and specialist capacity | RM-002/003 | Trusted change throughput | OD-024-005–009 closed |
| INV-025-003 | Quality and representative environments | H1 | Automation, fixtures and domain participation | RM-004/010 | Lower escaped change risk | OD-024-010–012 closed |
| INV-025-004 | Data migration and recovery | H1–H2 | Database, storage and rehearsal environments | RM-005/022 | Safe onboarding and upgrades | OD-024-030–032 closed |
| INV-025-005 | Core Finance and Inventory | H1–H2 | Domain architects and delivery teams | RM-009/013/014 | Reconciled ERP core | Finance/Inventory contracts approved |
| INV-025-006 | Commercial process teams | H2 | Sales, Procurement and Finance capacity | RM-015/016 | Usable order-to-cash/source-to-pay | Core ledgers ready |
| INV-025-007 | Planning and manufacturing | H2–H3 | Planning/MES/cost expertise | RM-019/027–029 | Manufacturing differentiation | Reliable inventory and transactions |
| INV-025-008 | Quality and maintenance | H3 | Domain delivery and change capacity | RM-030/031 | Operational reliability | Execution identities stable |
| INV-025-009 | Low-code and extensions | H3–H4 | Platform, security and ecosystem operations | RM-033–035/044 | Adaptability without forks | Package decisions closed |
| INV-025-010 | Customer deployment profiles | H2–H4 | Operations, installer, support and customer success | RM-024/037/039/041 | Deployment reach | Supported-model decision closed |
| INV-025-011 | Observability and scale | H2–H4 | Telemetry/performance infrastructure | RM-023/043 | Measured reliable growth | Workloads and privacy approved |
| INV-025-012 | Mobile platform | H4 | Client, sync, device/security and support skills | RM-040 | Offline operational reach | Protocol window approved |
| INV-025-013 | Localization portfolio | H4 | Qualified tax/legal/local support | RM-042 | International revenue options | Country cases prove maintenance capacity |
| INV-025-014 | Governed AI | H4–H5 | Evaluation, provider cost, AI/privacy governance | RM-045/046 | Bounded assistance | OD-024-035 closed |
| INV-025-015 | Research option fund | H5 | Time-boxed prototypes and evaluation | RM-047–050 | Evidence for future bets | No commercial promise before exit |

## Chapter 71 — Roadmap Risk Register

These risks supplement, rather than replace, the 76 FCSB-024 risks. Inherited identifiers show the release/governance failure mechanism carried into sequencing.

| Risk | Condition | Impact | Horizon | Roadmap control | Owner | Inherited trace |
|---|---|---|---|---|---|---|
| RR-001 | OD-024-040 remains unresolved while teams treat the roadmap as approved. | Unfunded or unsafe work starts from draft assumptions. | All | Watermark conditional items and block commitment until Product Council disposition. | Product Governance | RSK-024-075 |
| RR-002 | Market-entry scope includes domains whose ledgers are still Planned. | Customer expectation exceeds operational integrity. | H1–H2 | Define a bounded pilot journey and explicit exclusions. | Product Council | RSK-024-003 |
| RR-003 | Budget positioning is interpreted as permission to omit security or recovery. | A low-cost offer creates disproportionate incident exposure. | All | Optimize reuse and scope; retain mandatory control gates. | Security | RSK-024-023/024 |
| RR-004 | Platform tooling is selected before workload and deployment decisions. | Costly technology cannot satisfy actual profiles. | H1 | Close OD-024-003/006/012 before platform commitment. | Enterprise Architecture | RSK-024-016 |
| RR-005 | Finance and inventory advance with incompatible posting/valuation rules. | Balances cannot reconcile and redesign spreads downstream. | H1–H2 | Fund the shared contract as a predecessor. | Finance | RSK-024-040/049 |
| RR-006 | Core transaction abstraction erases domain-specific invariants. | Generic runtime accepts invalid business states. | H1 | Require domain-owned specialization and negative scenarios. | Domain Governance | RSK-024-002 |
| RR-007 | Migration workbench is sold before restart/reconciliation exists. | Customer cutover leaves partial ambiguous data. | H2 | Gate onboarding on OD-024-030–032 and rehearsals. | Data Authority | RSK-024-046/050 |
| RR-008 | Customer data complexity is discovered after commercial commitment. | Migration cost and timetable become unbounded. | H2 | Profile history, quality and mappings before proposal acceptance. | Customer Success | RSK-024-025 |
| RR-009 | MRP uses incomplete inventory, BOM or lead-time data. | Planners distrust proposals or create shortages. | H2 | Publish input-quality thresholds and pegged explanations. | Planning | RSK-024-049 |
| RR-010 | Urgent production preemption bypasses allocation authority. | Existing orders lose material without traceable decision. | H3 | Simulate impact and require delegated override approval. | Manufacturing | RSK-024-033 |
| RR-011 | Partial deliveries are collapsed into closed supply. | Plans and customer promises overstate availability. | H2 | Retain remaining quantity, promise and pegging identity. | Supply Chain | RSK-024-051 |
| RR-012 | Credit controls arrive after sales automation. | Orders create exposure without accountable override. | H2 | Make credit ledger/workflow a sales entry gate. | Finance | RSK-024-024 |
| RR-013 | Module Builder precedes stable extension contracts. | Customer packages bind to private internals. | H3 | Block runtime until OD-024-023–025 close. | Platform Product | RSK-024-042/053 |
| RR-014 | Visual designers prioritize ease over semantic validation. | Published workflows or reports violate authority or meaning. | H3 | Compile against approved command/dataset contracts. | Architecture Board | RSK-024-039/040 |
| RR-015 | On-premises growth creates undisclosed customer forks. | Security and upgrade coverage fragment. | H3 | Require read-only delta inventory and fork exception. | Customer Operations | RSK-024-012/034 |
| RR-016 | SaaS pilot tenants are not representative. | Fleet rollout misses scale, localization or extension failures. | H4 | Select cohorts across explicit risk dimensions. | Operations | RSK-024-032 |
| RR-017 | Hybrid version skew splits authoritative decisions. | Site and cloud accept conflicting work. | H4 | Define protocol window, authority and durable reconciliation. | Architecture Board | RSK-024-041 |
| RR-018 | Localization expands faster than maintenance capacity. | Rules age and statutory output becomes unreliable. | H4 | Fund qualified owners and limit active jurisdictions. | Localization | RSK-024-043/070 |
| RR-019 | AI assistance enters before semantic reporting is trustworthy. | Confident outputs amplify inconsistent definitions. | H4 | Depend on certified context and evaluation. | AI Governance | RSK-024-064 |
| RR-020 | AI provider fallback changes residency or retention. | Availability routes customer data outside approved policy. | H4 | Require equivalent approved route or fail closed. | Privacy | RSK-024-065 |
| RR-021 | Telemetry labels expose tenant identity or payload. | Operations tooling becomes a confidentiality risk. | H2–H4 | Use opaque bounded dimensions and schema review. | Security | RSK-024-066 |
| RR-022 | Performance optimization introduces stale business truth. | Caches or replicas serve invalid availability or credit. | H4 | Tie scaling patterns to explicit consistency budgets. | Performance Engineering | RSK-024-033 |
| RR-023 | HA is declared from redundancy without restore evidence. | A severe failure remains unrecoverable. | H2 | Test restore and domain reconciliation independently. | Operations | RSK-024-052 |
| RR-024 | Roadmap horizons become unofficial calendar dates. | Sales and customers infer commitments absent funding. | All | Publish decision/evidence state and prohibit date conversion. | Product Governance | RSK-024-027 |
| RR-025 | Too many parallel initiatives overload scarce domain owners. | Semantic approvals become superficial bottlenecks. | All | Capacity-plan authority work and cap WIP. | Product Council | RSK-024-004 |
| RR-026 | Technical debt register rewards broad modernization projects. | Replacement work consumes value without constraint evidence. | All | Require measured debt mechanism and bounded outcome. | Engineering | RSK-024-008 |
| RR-027 | Customer report growth precedes semantic versioning. | Schema changes silently alter decisions. | H3 | Gate designer on RM-021 and OD-024-027. | Reporting | RSK-024-040/057 |
| RR-028 | Mobile forced upgrade strands offline work. | Warehouse or field transactions are lost or duplicated. | H4 | Preserve queue export/recovery and protocol grace. | Mobile Product | RSK-024-073 |
| RR-029 | Deprecation removes a capability with unknown consumers. | Customers or integrations fail without owner. | All | Build inventory and replacement before notice. | Product Governance | RSK-024-069/072 |
| RR-030 | Research prototypes leak into production promises. | Uncontrolled experiments gain authority and support burden. | H5 | Isolate research and require ordinary entry gates. | Research Board | RSK-024-003 |

## Chapter 72 — Evolution Scenario Catalog

Scenarios test genuinely different product paths and keep outcomes, controls and risks specific.

| Scenario | Case | Trigger | Horizon/path | Architecture response | Specific risk | Owner |
|---|---|---|---|---|---|---|
| SC-025-001 | Budget-friendly manufacturing ERP market entry | A small discrete manufacturer needs masters, purchasing, inventory, sales and basic finance. | H1–H2 | Use RM-011 bounded pilot, then reconciled RM-013–016; exclude unvalidated advanced functions. | Core scope is coherent and support cost remains viable. | Product Council |
| SC-025-002 | Legacy ERP migration | A customer has ten years of item, stock and finance history. | H2 | Profile, map, rehearse, reconcile by company/currency/item/period, retain source evidence. | Partial cutover or historical reinterpretation. | Migration Authority |
| SC-025-003 | Multi-currency expansion | A customer trades and settles in a second currency. | H2 | Add transaction/functional currency, applied-rate history, settlement and revaluation after GL. | Gain/loss or old transactions are misstated. | Finance |
| SC-025-004 | 24×7 manufacturing operations | Production cannot accept a broad maintenance outage. | H2–H4 | Establish recovery profile and observability before HA/scaling selection. | Technical recovery misses queued business work. | Operations |
| SC-025-005 | Urgent production-order preemption | A priority order must displace released work. | H3 | Simulate capacity/material/customer impact and require delegated approval. | Existing commitments lose scarce material silently. | Manufacturing |
| SC-025-006 | Long-term partial deliveries | A supplier delivers one order across months. | H2 | Maintain receipt events, remaining supply, revised dates, quality and invoice match. | MRP treats partial supply as complete. | Procurement |
| SC-025-007 | Raw-material shortage approval | A planner proposes alternate material and expedite cost. | H2–H3 | Workflow routes production, quality, procurement and finance consequences. | Unsafe substitution or hidden margin erosion. | Planning |
| SC-025-008 | Credit-term override | Sales requests shipment above exposure. | H2 | Calculate current exposure and route time-bounded Finance approval. | Revenue pressure bypasses credit authority. | Finance |
| SC-025-009 | Module Builder adoption | A customer needs an industry inspection module. | H3 | Use signed manifest, permissions, dependencies and upgrade preview after decisions close. | Package couples to private APIs or broad data. | Platform Product |
| SC-025-010 | Customization without core fragmentation | A customer requests unique approval routing. | H2–H3 | Prefer configuration/workflow extension; record any fork as expiring exception. | Permanent source divergence misses fixes. | Enterprise Architecture |
| SC-025-011 | Cloud and on-premises product line | Two customers require SaaS and air-gapped installation. | H2–H4 | Promote same lineage with profile-specific bundle, preflight and evidence. | Deployment differences become product forks. | Release Authority |
| SC-025-012 | Increasing tenant scale | SaaS adoption multiplies tenants and integration traffic. | H4 | Measure workloads, introduce cohorts and select scaling from bottlenecks. | Noisy tenant or premature sharding. | Performance Engineering |
| SC-025-013 | Advanced workflow automation | A company automates credit, shortage and payment approvals. | H2–H3 | Pin instances to definitions and version domain commands. | Published change strands active approvals. | Workflow Governance |
| SC-025-014 | AI-assisted ERP | Planners ask for shortage explanations and alternatives. | H4 | Use approved context, evaluation, human confirmation and deterministic validation. | Hallucinated proposal gains execution authority. | AI Governance |
| SC-025-015 | Financial report certification | A board pack formula changes during upgrade. | H2 | Version semantic definition and reconcile old/new results before release. | Comparable periods show altered meaning. | Finance |
| SC-025-016 | Warehouse offline scanning | A site loses connectivity during picking. | H4 | Queue encrypted idempotent commands and return durable conflict receipts. | Duplicate or lost movement. | Warehouse |
| SC-025-017 | Security patch for old on-prem version | A vulnerability affects a supported customer line. | H3 | Use exposure inventory, signed patch and independent review under support policy. | Unpatched fork remains exposed. | Security |
| SC-025-018 | Country localization entry | A target country requires tax and statutory file rules. | H4 | Fund qualified owner, effective-dated package and certification. | Wrong company or date receives local rule. | Localization |
| SC-025-019 | Manufacturing cost variance | Actual material and labor exceed standard. | H3 | Trace order inputs/rates and reconcile variance posting. | Opaque variance distorts margin. | Cost Accounting |
| SC-025-020 | Failed production migration | Backfill stops after half the history. | H1–H2 | Resume checkpointed transformation or forward-correct; preserve source and totals. | Blind rerun duplicates history. | Data Authority |
| SC-025-021 | Customer report after schema evolution | A custom aging report depends on renamed data. | H3 | Run semantic dependency preview and migrate package version. | Report renders incorrect totals. | Reporting |
| SC-025-022 | Maintenance outage during production peak | Critical equipment fails during a priority run. | H3 | Coordinate work order, spares, schedule and cost through shared contracts. | Unrecorded intervention breaks genealogy/cost. | Maintenance |
| SC-025-023 | SaaS canary detects inventory anomaly | Pilot error rates look normal but stock totals drift. | H4 | Business stop signal pauses rollout and domains reconcile before resume. | Technical-only telemetry misses corruption. | Operations |
| SC-025-024 | Future autonomous recommendation research | Prototype suggests rescheduling and supplier action. | H5 | Run in simulation with hard authority boundary and stop condition. | Prototype is mistaken for approved automation. | Research Board |
## Chapter 73 — FCSB-025 Architecture Decision Records

All records are Proposed. They sequence architecture; they do not resolve FCSB-024 open decisions or authorize delivery.

| ADR | Decision | Rationale | Rejected alternative | Authority | Status |
|---|---|---|---|---|---|
| ADR-025-001 | Use dependency horizons rather than unsupported calendar dates. | A sequence is defensible before approved delivery plans exist. | Date-shaped promises without funded capacity. | Product Council | Proposed |
| ADR-025-002 | Treat OD-024-040 as an unresolved entry gate. | The roadmap must not decide which predecessor proposals are approved. | Assume all FCSB-024 ADRs are accepted. | Product Council | Proposed |
| ADR-025-003 | Separate evidence status from roadmap readiness. | Implementation fact and permission to invest answer different questions. | Use one maturity label for both. | Enterprise Architecture | Proposed |
| ADR-025-004 | Establish safe-change foundations before domain breadth. | Every downstream domain depends on migration, evidence and recovery. | Build many modules then retrofit controls. | Product Council | Proposed |
| ADR-025-005 | Build the finance–inventory posting/valuation contract in Horizon 1. | Parallel ledgers otherwise create a circular redesign dependency. | Let each domain invent postings. | Finance and Inventory | Proposed |
| ADR-025-006 | Deliver coherent business journeys rather than isolated screens. | ERP value and reconciliation cross module boundaries. | Count CRUD coverage as product completion. | Product Governance | Proposed |
| ADR-025-007 | Use one governed product lineage across deployment profiles. | Shared fixes and compatibility are central to budget-friendly support. | Separate customer code bases. | Product Council | Proposed |
| ADR-025-008 | Admit a bounded customer pilot only after support scope is explicit. | Early market evidence must not create uncontrolled commitments. | Sell the full target vision to the first customer. | Customer Impact Forum | Proposed |
| ADR-025-009 | Keep MRP proposals explainable and planner-approved initially. | Input maturity and exception learning precede automation. | Automatically firm every recommendation. | Manufacturing | Proposed |
| ADR-025-010 | Make workflow runtime precede visual designer availability. | A safe engine/command contract is required before easy authoring. | Ship canvas UI around incomplete semantics. | Workflow Governance | Proposed |
| ADR-025-011 | Make semantic reporting precede customer report design. | Self-service must inherit certified meaning and scope. | Expose database tables directly. | Reporting Governance | Proposed |
| ADR-025-012 | Make extension contracts precede Module Builder runtime. | Tooling cannot create upgrade compatibility after packages exist. | Permit unrestricted generated modules. | Architecture Board | Proposed |
| ADR-025-013 | Treat migration as a product capability with retained evidence. | Customer onboarding quality determines ERP trust and support cost. | Use one-off scripts per customer. | Data and Migration Authority | Proposed |
| ADR-025-014 | Keep multi-currency history rule-versioned. | Closed transactions require reproducible rates and treatment. | Recalculate history with current rates. | Finance | Proposed |
| ADR-025-015 | Place mobile after stable contracts and synchronization decisions. | Offline clients amplify version and recovery risk. | Clone web forms into a client first. | Mobile Product | Proposed |
| ADR-025-016 | Select scaling mechanisms from FCSB-023 workload evidence. | Queues, caches and shards solve different measured constraints. | Adopt distributed patterns as roadmap milestones. | Performance Engineering | Proposed |
| ADR-025-017 | Require business signals in rollout observability. | Technical success cannot detect wrong stock or accounting. | Use error rate alone for canary promotion. | Operations | Proposed |
| ADR-025-018 | Require a funded maintenance owner for each localization. | Jurisdiction rules create continuing obligations. | Treat localization as one-time translation. | Localization Governance | Proposed |
| ADR-025-019 | Introduce AI through bounded assistive cases. | Human authority and evaluation can mature before executable automation. | Begin with autonomous posting or planning. | AI Governance | Proposed |
| ADR-025-020 | Keep research isolated from availability commitments. | Prototypes establish options, not supportable product. | Publish successful demos as roadmap promises. | Research Board | Proposed |
| ADR-025-021 | Record technical debt by measurable constraint. | Modernization value must be observable. | Maintain a technology-age replacement list. | Engineering Authority | Proposed |
| ADR-025-022 | Fund deprecation and retirement as portfolio work. | Unremoved capabilities accumulate permanent compatibility cost. | Assume removal is free after notice. | Product Governance | Proposed |
| ADR-025-023 | Version roadmap baselines and preserve reorder rationale. | Learning must not erase earlier commitments or evidence. | Continuously edit one unhistoried roadmap. | Product Governance | Proposed |
| ADR-025-024 | Require total lifecycle cost at investment gates. | Initial build cost omits security, migration, support and upgrades. | Prioritize solely by development estimate. | Investment Authority | Proposed |
| ADR-025-025 | Use outcome evidence to expand across horizons. | Completion of tasks does not prove adoption or integrity. | Advance automatically when a project closes. | Product Council | Proposed |

## Chapter 74 — Open-Decision Register

The first forty rows preserve every FCSB-024 open decision as Open and show its roadmap consequence. The final rows add FCSB-025-specific questions without replacing their predecessors. Source detail remains in [FCSB-024 Chapter 50](./FCSB-Volume-24-Product-Governance-and-Release-Architecture.md#chapter-50--open-decisions).

| Decision | Subject | Roadmap consequence or evidence required | Authority / horizon | Target gate | Status |
|---|---|---|---|---|---|
| OD-024-001 | Product authority charter | Blocks final portfolio veto/quorum | Source authority | H1 | Open |
| OD-024-002 | Capability identity | Blocks authoritative roadmap registry | Source authority | H1 | Open |
| OD-024-003 | Supported deployment models/lines | Blocks commercial profile funding | Source authority | H1 | Open |
| OD-024-004 | Version promise | Blocks governed candidate policy | Source authority | H1 | Open |
| OD-024-005 | Branch protection | Blocks enforced integration control | Source authority | H1 | Open |
| OD-024-006 | CI/CD platform | Blocks pipeline implementation | Source authority | H1 | Open |
| OD-024-007 | Artifact registry | Blocks build-once promotion | Source authority | H1 | Open |
| OD-024-008 | Signing/provenance standard | Blocks trusted distribution | Source authority | H1 | Open |
| OD-024-009 | Evidence retention | Blocks release-record service | Source authority | H1 | Open |
| OD-024-010 | Gate profiles by release class | Blocks automated readiness | Source authority | H1 | Open |
| OD-024-011 | Representative UAT | Blocks GA evidence profiles | Source authority | H1 | Open |
| OD-024-012 | Performance budgets | Blocks performance gate and scale selection | Source authority | H1 | Open |
| OD-024-013 | Exception mechanism | Blocks controlled waiver operation | Source authority | H1 | Open |
| OD-024-014 | SaaS cohort attributes | Blocks rollout-ring design | Source authority | H4 | Open |
| OD-024-015 | Business stop signals | Blocks automated rollout control | Source authority | H2 | Open |
| OD-024-016 | Fleet/version inventory | Blocks cohort governance | Source authority | H2 | Open |
| OD-024-017 | Dedicated security windows | Blocks dedicated support policy | Source authority | H2 | Open |
| OD-024-018 | Offline bundle trust | Blocks on-prem installer | Source authority | H3 | Open |
| OD-024-019 | Private preflight facts | Blocks customer upgrade tooling | Source authority | H3 | Open |
| OD-024-020 | Hybrid compatibility window | Blocks hybrid pilot | Source authority | H4 | Open |
| OD-024-021 | Feature-control service | Blocks tenant activation platform | Source authority | H4 | Open |
| OD-024-022 | High-risk flag authority | Blocks activation SoD | Source authority | H4 | Open |
| OD-024-023 | Supported extension points | Blocks Module Builder contract | Source authority | H3 | Open |
| OD-024-024 | Package dependency/conflict policy | Blocks installer/resolver | Source authority | H3 | Open |
| OD-024-025 | Package uninstall/data behavior | Blocks package lifecycle | Source authority | H3 | Open |
| OD-024-026 | Workflow command support | Blocks runtime migration policy | Source authority | H2 | Open |
| OD-024-027 | Report semantic contract | Blocks certified publication/designers | Source authority | H2 | Open |
| OD-024-028 | API compatibility rules | Blocks external API promise | Source authority | H2 | Open |
| OD-024-029 | API consumer registry | Blocks safe retirement | Source authority | H2 | Open |
| OD-024-030 | Migration runner | Blocks transforming migrations | Source authority | H1 | Open |
| OD-024-031 | Partitioned control totals | Blocks ERP cutover design | Source authority | H1 | Open |
| OD-024-032 | Migration point of no return | Blocks production migration approval | Source authority | H1 | Open |
| OD-024-033 | Vulnerability urgency model | Blocks security SLA | Source authority | H1 | Open |
| OD-024-034 | Embargo advisory channel | Blocks coordinated disclosure | Source authority | H2 | Open |
| OD-024-035 | AI providers/models/use cases | Blocks every AI availability claim | Source authority | H4 | Open |
| OD-024-036 | Mobile protocol window | Blocks mobile release | Source authority | H4 | Open |
| OD-024-037 | Telemetry platform/privacy | Blocks release-aware operations | Source authority | H2 | Open |
| OD-024-038 | Support readiness authority | Blocks broad availability | Source authority | H1 | Open |
| OD-024-039 | Deprecation/support windows | Blocks lifecycle promises | Source authority | H2 | Open |
| OD-024-040 | Approved inputs versus investments | Blocks roadmap commitment itself | Source authority | Entry | Open |
| OD-025-001 | Which manufacturing market-entry profile is first? | Needed to bound Horizon 1 pilot scope. | Product Council | Before RM-011 | Open |
| OD-025-002 | Which end-to-end journeys define the first sellable increment? | Needed to prevent isolated feature completion. | Product Governance | Before Horizon 2 funding | Open |
| OD-025-003 | Which finance and inventory methods are supported initially? | Needed for posting/valuation contract scope. | Finance and Inventory | Before RM-009 | Open |
| OD-025-004 | Which legacy ERP/source profile is the migration pilot? | Needed to bound tooling and mapping investment. | Migration Authority | Before RM-022 | Open |
| OD-025-005 | What WIP limit applies to domain-authority review? | Needed to keep approval quality credible. | Product Council | Before portfolio commitment | Open |
| OD-025-006 | What total-cost model governs budget-friendly positioning? | Needed to compare build, support and deployment profiles. | Investment Authority | Before RM-011 | Open |
| OD-025-007 | Which operational journeys require 24×7 continuity? | Needed to set recovery/HA objectives. | Operations | Before RM-025 | Open |
| OD-025-008 | Which customer adoption evidence permits horizon expansion? | Needed to distinguish usage from value. | Product Governance | Before first expansion review | Open |
| OD-025-009 | Which localization market has funded qualified ownership? | Needed before country-package commitment. | Product Council | Before RM-042 | Open |
| OD-025-010 | Which low-risk AI use case may enter discovery first? | Needed to scope evaluation and approved context. | AI Governance | Before RM-045 | Open |
## Chapter 75 — Product Roadmap RACI

Every activity has exactly one Accountable role and one different Responsible role. A board may be accountable while a named function performs the work; no combined A/R cells are used.

**Legend:** A = accountable; R = responsible; C = consulted; — = no standing assignment.

| Code | Role | Code | Role |
|---|---|---|---|
| PC | Product Council | PG | Product Governance |
| EA | Enterprise Architecture | DA | Domain Authorities |
| IA | Investment Authority | PM | Product Management |
| ENG | Engineering | RE | Release Engineering |
| QA | Quality | SEC | Security |
| PRV | Privacy | DATA | Data/Migration |
| DBE | Database Engineering | OPS | Operations |
| PERF | Performance | FIN | Finance |
| INV | Inventory | MFG | Manufacturing |
| PLAN | Planning | WH | Warehouse |
| PROC | Procurement | SAL | Sales |
| QUAL | Quality Domain | MAINT | Maintenance |
| WF | Workflow | REP | Reporting |
| INT | Integration | MOD | Module Builder |
| MOB | Mobile | AI | AI Governance |
| CS | Customer Success | SUP | Support |

| Activity | PC | PG | EA | DA | IA | PM | ENG | RE | QA | SEC | PRV | DATA | DBE | OPS | PERF | FIN | INV | MFG | PLAN | WH | PROC | SAL | QUAL | MAINT | WF | REP | INT | MOD | MOB | AI | CS | SUP |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Approve roadmap architecture draft | A | R | C | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Close OD-024-040 entry gate | A | C | R | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Maintain capability status evidence | — | A | — | — | — | R | C | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Version roadmap baseline | C | A | R | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve horizon portfolio | A | C | C | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Reorder initiatives from evidence | — | A | C | — | C | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Validate cross-volume coherence | — | — | A | R | — | — | — | — | — | C | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve architecture exception | — | R | A | C | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Build investment case | — | — | — | — | A | R | C | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Validate lifecycle cost | — | — | — | — | A | — | — | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | C |
| Define first market profile | A | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | C |
| Accept pilot customer readiness | — | — | — | — | — | — | — | — | C | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | R |
| Enforce protected source policy | — | — | — | — | — | — | A | R | C | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Select release toolchain | — | — | A | — | — | — | — | R | — | C | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Build candidate manifest service | — | — | — | — | — | — | R | A | C | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve provenance design | — | — | C | — | — | — | — | R | — | A | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Define representative UAT | — | — | — | R | — | C | — | — | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — |
| Execute regression portfolio | — | — | — | C | — | — | R | C | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Define workload baseline | — | — | — | — | — | — | — | — | R | — | — | — | C | C | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Run performance comparison | — | — | — | — | — | — | R | — | — | — | — | — | C | C | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Design migration runner | — | — | — | — | — | — | C | — | — | — | — | A | R | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Execute migration rehearsal | — | — | — | C | — | — | — | — | C | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Certify backup restore | — | — | — | — | — | — | — | — | — | — | — | C | R | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C |
| Approve migration point of no return | C | — | — | C | — | — | — | — | — | — | — | A | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Complete tenant-scope controls | — | — | — | C | — | — | R | — | C | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Govern master-data lifecycle | — | — | — | A | — | — | — | — | — | — | — | R | — | — | — | C | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve transaction contract | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | C | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Implement document lifecycle | — | — | — | R | — | — | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | C | — | — | — | — | — | — |
| Approve posting contract | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | R | C | — | — | C | C | — | — | — | — | — | — | — | — | — | — |
| Implement general ledger | — | — | — | — | — | — | R | — | C | — | — | — | C | — | — | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Implement inventory ledger | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | C | A | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — |
| Certify inventory valuation | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | A | R | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Implement accounts receivable | — | — | — | — | — | — | C | — | C | — | — | — | — | — | — | A | — | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — |
| Implement accounts payable | — | — | — | — | — | — | C | — | C | — | — | — | — | — | — | A | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — |
| Implement sales-order journey | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | C | C | — | — | — | — | A | — | — | — | — | — | — | — | — | — | — |
| Implement procurement journey | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | C | C | — | — | — | A | — | — | — | — | — | — | — | — | — | — | — |
| Approve credit override policy | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | A | — | — | — | — | — | R | — | — | C | — | — | — | — | — | — | — |
| Approve tax rule scope | — | — | — | R | — | — | — | — | — | — | C | C | — | — | — | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Implement multi-currency accounting | — | — | — | — | — | — | R | — | C | — | — | C | — | — | — | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Implement fixed-assets subledger | — | — | — | — | — | — | R | — | C | — | — | — | — | — | — | A | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — |
| Approve MRP semantics | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | R | A | — | C | — | — | — | — | — | — | — | — | — | — | — |
| Implement MRP proposals | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | — | C | C | A | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve capacity model | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | R | A | — | — | — | — | C | — | — | — | — | — | — | — | — |
| Implement production execution | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | C | C | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve production preemption | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | A | R | — | — | C | — | — | — | — | — | — | — | — | — | — |
| Implement manufacturing costing | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | A | C | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Implement warehouse execution | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | — | C | — | — | A | — | — | — | — | — | — | — | — | C | — | — | — |
| Govern quality holds | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | R | C | — | C | — | — | A | — | — | — | — | — | — | — | — | — |
| Implement CAPA workflow | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | A | — | R | — | — | — | — | — | — | C |
| Implement maintenance work | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | — | C | C | — | — | — | — | — | A | — | — | — | — | — | — | — | — |
| Implement workflow runtime | — | — | — | C | — | — | R | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — |
| Approve workflow designer | — | — | C | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | R | — | — | — | — |
| Certify semantic dataset | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | C | C | — | — | — | — | — | — | — | — | A | — | — | — | — | — | — |
| Implement customer report designer | — | — | — | — | — | — | — | — | C | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | R | — | — | — | — |
| Approve Module Builder contract | — | — | A | — | — | — | — | — | — | C | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | R | — | — | — | — |
| Validate extension package | — | — | — | — | — | — | — | — | R | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | A | — | — | — | — |
| Approve API compatibility | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | C | C | — | — | — |
| Implement reliable event delivery | — | — | — | — | — | — | R | — | — | C | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — |
| Operate dedicated-cloud upgrade | — | — | — | — | — | — | — | R | — | — | — | — | — | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | C |
| Validate on-prem preflight | — | — | — | — | — | — | — | — | — | C | — | R | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A |
| Operate SaaS rollout cohort | — | — | — | C | — | — | — | R | — | — | — | — | — | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — |
| Approve hybrid compatibility | — | — | A | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | R | — | C | — | — | — |
| Define release telemetry | — | — | — | — | — | — | — | — | — | C | C | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Interpret business stop signals | — | — | — | A | — | — | — | — | — | — | — | — | — | R | — | C | C | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve mobile protocol window | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | R | — | A | — | — | C |
| Implement offline synchronization | — | — | — | — | — | — | R | — | — | — | — | C | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — |
| Approve localization investment | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — |
| Maintain jurisdiction package | — | — | — | A | — | — | R | — | C | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve AI risk tier | — | — | — | C | — | — | — | — | — | C | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — |
| Run AI evaluation | — | — | — | C | — | C | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — |
| Authorize AI pilot | A | — | — | — | — | — | — | — | — | C | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | R | — | — |
| Conduct research prototype | — | — | A | C | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — |
| Approve deprecation | — | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | C |
| Execute retirement archive | — | — | C | — | — | — | — | — | — | C | — | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | R |
| Run roadmap risk review | — | A | C | — | C | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Audit RACI and decision evidence | C | R | C | — | — | — | — | — | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |

## Chapter 76 — Approval, Review and Controlled Handoff

Approval of this draft would accept the horizon method, dependency logic and proposed roadmap decisions for controlled planning. It would not approve funding, delivery dates, product availability or any unresolved FCSB-024 decision.

| Review condition | Required disposition |
|---|---|
| FCSB-024 entry decision | Product Council identifies approved inputs, unresolved investments and rejected assumptions |
| Capability status integrity | Enterprise Architecture confirms all current-state claims against linked evidence |
| Domain sequencing | Finance, Inventory, Manufacturing, Planning, Sales, Procurement, Quality and Maintenance accept predecessor logic |
| Platform feasibility | Engineering, Data, Security, Performance and Operations assess Horizon 1 capacity and decisions |
| Investment viability | Investment Authority accepts total-cost method and portfolio constraints |
| Customer promise | Product and Customer Success approve pilot scope and explicit exclusions |
| Risk ownership | Every Chapter 71 risk has an owner and treatment decision |
| Release alignment | Release Authority confirms FCSB-024 gates remain independent |
| Open decisions | All 40 inherited decisions remain Open until their named authorities close them |

### Version history

| Version | Date | Status | Change |
|---|---|---|---|
| 1.0 | 2026-07-20 | Architecture Review Draft | First controlled Product Roadmap and Future Vision draft |

### Series boundary

FCSB-025 is the final volume in the controlled 25-volume roadmap. The Series Index should show no invented FCSB-026. Further architecture work requires a separately approved series extension, amendment or implementation decision. Application code, database artifacts and earlier FCSB volumes remain outside this draft.

**Approval gate:** Architecture Review and OD-024-040 disposition pending.
