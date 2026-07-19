# FlowCraft Solution Blueprint

## Volume 21 — Project and Service Management Architecture

| Field | Value |
|---|---|
| Document code | FCSB-021 |
| Version | 1.0 |
| Status | Architecture Review Draft |
| Date | 2026-07-18 |
| Owner | Enterprise Architecture |
| Scope | Project and Service Management target architecture; documentation only |
| Accepted runtime baseline | DBA-002, DBA-003 and DBA-004 |
| Next controlled volume | FCSB-022 — Mobile and Offline Architecture |

> **Evidence rule:** “Implemented” and “Implemented foundation” require concrete repository evidence. Generic object, transaction, workflow, approval, report or seed metadata is never proof of a project or service runtime. All target project/service capabilities in this volume remain Planned or Future until an accepted implementation milestone proves otherwise.

## Chapter 01 — Purpose and Scope

This volume is the pre-implementation authority model for project delivery and customer service operations. It defines records, lifecycles and inter-domain contracts without authorizing a Project, PSA, Service Management or Field Service runtime.

### Scope decision

This volume defines target contracts for project delivery and customer service operations. It does not implement a runtime, authorize database changes or reinterpret generic platform metadata as a project-management or service-management product. Project Management governs programs, portfolios, projects, WBS elements, deliverables, tasks, milestones, schedules, baselines, resources, time, project expenses, delivery risks and delivery evidence. Service Management governs requests, cases, SLA chronology, entitlement evaluation, service contracts as operational references, service orders, appointments, dispatch, technician execution and completion evidence.

Excluded authorities remain explicit: Sales owns customer quotations, orders, invoices and credits; Finance owns journals, actual cost, revenue, capitalization and certification; Inventory owns stock, reservations, movements, custody and valuation; Procurement owns supplier commerce; Manufacturing owns production orders, WIP and genealogy; Maintenance owns equipment identity and maintenance work; Quality owns inspection and disposition; HR/Workforce owns employees, attendance, leave and payroll. FCSB-022 retains detailed mobile and offline architecture.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | purpose, out of scope, authority separation | Scope and identify purpose, out of scope, authority separation; retain event time. |
| Lifecycle and evidence | audience, FCSB-001 through FCSB-020 | Version audience, FCSB-001 through FCSB-020; correct by linked event. |
| Authority and reconciliation | scope, FCSB-022 through FCSB-025 | Name owner and acknowledgement for scope, FCSB-022 through FCSB-025. |

**Ownership boundary.** FCSB-021 depends on Volumes 1–20 and prepares FCSB-022; it does not alter the controlled titles or sequence through FCSB-025.

## Chapter 02 — Executive Summary

FlowCraft has reusable identity and governance foundations, but no operational project or service aggregate. The target joins project delivery discipline with service execution while preserving commercial, stock, workforce, technical-equipment and financial sovereignty.

### Governing rules

The design uses one authoritative owner per consequential record, request/acknowledgement integration, immutable chronology, optimistic concurrency, idempotent commands, least privilege and reconciliation as a first-class workload. A business label such as “approved” never proves posting, movement, entitlement, acceptance or certification. Target detail expresses intended behavior only; implementation status requires a model or field, migration, service/controller behavior, seed registration where relevant and an accepted test.

Design decisions separate planning truth from financial truth, operational case evidence from customer commerce, installed-base views from equipment and serial masters, and resource scheduling from workforce records. Every exception has a named owner, age, materiality rule and closure evidence.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | current foundations, target project architecture, time and expenses, field service | Scope and identify current foundations, target project architecture, time and expenses, field service; retain event time. |
| Lifecycle and evidence | generic scaffolds, target service architecture, cost and billing, installed base | Version generic scaffolds, target service architecture, cost and billing, installed base; correct by linked event. |
| Authority and reconciliation | runtime absence, resource delivery, profitability, maturity direction | Name owner and acknowledgement for runtime absence, resource delivery, profitability, maturity direction. |

**Ownership boundary.** Current platform evidence is classified narrowly; no enum, EOR registration, dashboard count or generic document is treated as an operational project/service runtime.

## Chapter 03 — Project and Service Management Principles

The governing principle is separation of evidence from consequence. Project and Service Management may prove work, request effects and reconcile acknowledgements; they do not convert delivery evidence into a sale, stock move, payroll result, equipment state or journal.

### Terminology boundaries

A project is a governed delivery aggregate; a program coordinates related projects; a portfolio makes investment-priority decisions; a WBS element decomposes scope; a task schedules work; a deliverable defines an outcome; a milestone records a gated point. A service request is intake evidence, a case is the managed customer obligation, a service order packages executable field or depot work, and an appointment reserves a customer-facing time window.

A stock serial identifies inventory traceability; installed base describes customer-context deployment; equipment authority belongs to Maintenance. A project cost record is delivery attribution, not a Finance journal. Billing eligibility is a request, not an invoice. Approved time is not attendance or payroll. These distinctions prevent deceptively similar nouns from collapsing bounded contexts.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | project delivery authority, Finance posting authority, Maintenance equipment authority, AI advisory boundary | Scope and identify project delivery authority, Finance posting authority, Maintenance equipment authority, AI advisory boundary; retain event time. |
| Lifecycle and evidence | service execution authority, Inventory movement authority, Quality disposition authority | Version service execution authority, Inventory movement authority, Quality disposition authority; correct by linked event. |
| Authority and reconciliation | Sales commercial authority, Procurement purchasing authority, customer acceptance | Name owner and acknowledgement for Sales commercial authority, Procurement purchasing authority, customer acceptance. |

**Ownership boundary.** Commands that change Sales, Finance, Inventory, Procurement, Manufacturing, Maintenance, Quality or HR/Workforce records are prohibited from Project and Service Management.

## Chapter 04 — Current Project and Service Baseline

Repository inspection finds customers, suppliers, contacts, organization nodes, users, items, UOMs, warehouses, serials, generic documents, workflows, approvals, audit and reports. It finds no PROJECT or SERVICE module enum, project/service transaction kind, dedicated aggregate, controller, route or accepted test.

### Accepted repository baseline

The accepted baseline contains [tenant and organization models](../../apps/api/prisma/schema.prisma), [enterprise master-data models](../../apps/api/prisma/schema.prisma), generic [EnterpriseObject](../../apps/api/prisma/schema.prisma#L1025), [TransactionDocument](../../apps/api/prisma/schema.prisma#L2320), [WorkflowDefinition](../../apps/api/prisma/schema.prisma#L1135), [ApprovalRequest](../../apps/api/prisma/schema.prisma#L1300), [NumberSeries](../../apps/api/prisma/schema.prisma#L1330), [AuditLog](../../apps/api/prisma/schema.prisma#L1357), reports and dashboards. The accepted evidence is the [DBA-002 report](../implementation/DBA-002-foundation-implementation.md), [DBA-003 report](../implementation/DBA-003-enterprise-structure-implementation.md), [DBA-004 report](../implementation/DBA-004-enterprise-master-data-implementation.md), their migrations and accepted tests.

There is no dedicated Project, Program, Portfolio, WBS, Task, Milestone, Baseline, ResourceAssignment, TimeEntry, Timesheet, ProjectExpense, ServiceRequest, ServiceCase, SLA, Entitlement, InstalledBase, ServiceOrder, Appointment or Dispatch model. No project/service migration, module, service, controller, route or accepted test exists. `WORK_ORDER` is a generic transaction kind and the seeded `SERVICE` item is master-data classification; neither is project or service runtime evidence.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | Customer, organization scope, Warehouse, workflow and approval, Digital DNA | Scope and identify Customer, organization scope, Warehouse, workflow and approval, Digital DNA; retain event time. |
| Lifecycle and evidence | Supplier, cost and profit centers, batch and serial, number series, reports and dashboard | Version Supplier, cost and profit centers, batch and serial, number series, reports and dashboard; correct by linked event. |
| Authority and reconciliation | User identity, Item and UOM, generic transaction, audit, current limitations | Name owner and acknowledgement for User identity, Item and UOM, generic transaction, audit, current limitations. |

**Ownership boundary.** The accepted schema and application modules are the implementation authority. Blueprint target concepts are Planned even when a generic platform primitive could later support them.

### Architecture views

**Current project/service baseline**

~~~mermaid
flowchart LR
    Currentprojectserv0["Current project/service baseline"]
    Currentprojectserv1["Customer"]
    Currentprojectserv2["Supplier"]
    Currentprojectserv3["User identity"]
    Currentprojectserv4["organization scope"]
    Currentprojectserv5["cost and profit centers"]
    Currentprojectserv6["Item and UOM"]
    Currentprojectserv0 --> Currentprojectserv1
    Currentprojectserv1 --> Currentprojectserv2
    Currentprojectserv2 --> Currentprojectserv3
    Currentprojectserv3 --> Currentprojectserv4
    Currentprojectserv4 --> Currentprojectserv5
    Currentprojectserv3 -- "exception" --> Currentprojectserv6
    Currentprojectserv6 -- "reconcile" --> Currentprojectserv0
~~~

## Chapter 05 — Target Project and Service Architecture

The target architecture uses bounded aggregates and versioned request/acknowledgement contracts. Project and service records remain operational systems of record, while commercial and accounting consequences are produced only by the owning domains.

### Target component boundaries

The target separates command services for Project, Planning, Resource/Time, Project Cost Evidence, Service Case, SLA/Entitlement, Service Execution and Reconciliation. Each publishes versioned domain events to projections and integration adapters. Adapters translate only owned requests: Sales billing, Finance cost acknowledgement, Inventory reservation or movement, Procurement commitment, Manufacturing demand, Maintenance equipment observation, Quality inspection and HR/Workforce eligibility.

Read models may combine acknowledged facts for portfolio, customer, field operations and certification views. They are disposable projections, not shared write stores. Platform services provide identity, organization scope, audit, numbering, workflow metadata, reporting metadata and observability without absorbing domain invariants.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | master context, resource coordination, billing coordination, service execution, spares | Scope and identify master context, resource coordination, billing coordination, service execution, spares; retain event time. |
| Lifecycle and evidence | commercial intake, time and expense evidence, service intake, field dispatch, warranty and contracts | Version commercial intake, time and expense evidence, service intake, field dispatch, warranty and contracts; correct by linked event. |
| Authority and reconciliation | project planning, cost and forecast, entitlement and SLA, installed base, reporting and security | Name owner and acknowledgement for project planning, cost and forecast, entitlement and SLA, installed base, reporting and security. |

**Ownership boundary.** Cross-domain effects use versioned requests, acknowledgements, idempotency, correlation, exception aging and reconciliation; shared-database shortcuts are not a target integration pattern.

### Architecture views

**Target architecture layers**

~~~mermaid
flowchart LR
    Targetarchitecture0["Target architecture layers"]
    Targetarchitecture1["master context"]
    Targetarchitecture2["commercial intake"]
    Targetarchitecture3["project planning"]
    Targetarchitecture4["resource coordination"]
    Targetarchitecture5["time and expense evidence"]
    Targetarchitecture6["cost and forecast"]
    Targetarchitecture0 --> Targetarchitecture1
    Targetarchitecture1 --> Targetarchitecture2
    Targetarchitecture2 --> Targetarchitecture3
    Targetarchitecture3 --> Targetarchitecture4
    Targetarchitecture4 --> Targetarchitecture5
    Targetarchitecture3 -- "exception" --> Targetarchitecture6
    Targetarchitecture6 -- "reconcile" --> Targetarchitecture0
~~~

## Chapter 06 — Project and Service Organization Model

Organization design separates portfolio sponsorship, project delivery, service coordination, dispatch and field execution. Organization scope can constrain access today, but the project office, service organization and delivery delegations remain target concepts.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | tenant, department, Project Manager, Service Manager, Technician, Customer Service, Operations | Scope and identify tenant, department, Project Manager, Service Manager, Technician, Customer Service, Operations; retain event time. |
| Lifecycle and evidence | company, project office, Program Manager, Service Coordinator, Consultant, Finance | Version company, project office, Program Manager, Service Coordinator, Consultant, Finance; correct by linked event. |
| Authority and reconciliation | business unit, service organization, Portfolio Manager, Dispatcher, Resource Manager, Sales | Name owner and acknowledgement for business unit, service organization, Portfolio Manager, Dispatcher, Resource Manager, Sales. |

**Ownership boundary.** Approval leaves all target capabilities Planned or Future until an accepted implementation milestone proves them.

### Architecture views

**Organization model**

~~~mermaid
classDiagram
    class Organizationmodel1 {
      +String tenant
      +String revision1
    }
    class Organizationmodel2 {
      +String company
      +String revision2
    }
    class Organizationmodel3 {
      +String businessunit
      +String revision3
    }
    class Organizationmodel4 {
      +String department
      +String revision4
    }
    class Organizationmodel5 {
      +String projectoffice
      +String revision5
    }
    Organizationmodel1 "1" --> "*" Organizationmodel2 : tenant to company
    Organizationmodel2 "1" --> "*" Organizationmodel3 : company to business unit
    Organizationmodel3 "1" --> "*" Organizationmodel4 : business unit to department
    Organizationmodel4 "1" --> "*" Organizationmodel5 : department to project office
~~~

## Chapter 07 — Project Master Architecture

The Project aggregate is the stable delivery identity, not a sales contract or Finance cost object. It snapshots organization and commercial references while preserving their external ownership.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | project identity, customer reference, business unit, currency, commercial reference, attachments | Scope and identify project identity, customer reference, business unit, currency, commercial reference, attachments; retain event time. |
| Lifecycle and evidence | project code, internal project, Project Manager, cost center, status | Version project code, internal project, Project Manager, cost center, status; correct by linked event. |
| Authority and reconciliation | project type, company and plant, dates, profit center, version | Name owner and acknowledgement for project type, company and plant, dates, profit center, version. |

**Ownership boundary.** Project owns project master architecture evidence; consequential domains retain authoritative records.

### Architecture views

**Project master**

~~~mermaid
classDiagram
    class Projectmaster1 {
      +String projectidentity
      +String revision1
    }
    class Projectmaster2 {
      +String projectcode
      +String revision2
    }
    class Projectmaster3 {
      +String projecttype
      +String revision3
    }
    class Projectmaster4 {
      +String customerreference
      +String revision4
    }
    class Projectmaster5 {
      +String internalproject
      +String revision5
    }
    Projectmaster1 "1" --> "*" Projectmaster2 : project identity to project code
    Projectmaster2 "1" --> "*" Projectmaster3 : project code to project type
    Projectmaster3 "1" --> "*" Projectmaster4 : project type to customer reference
    Projectmaster4 "1" --> "*" Projectmaster5 : customer reference to internal project
~~~

## Chapter 08 — Program and Portfolio Direction

Programs and portfolios provide governance views over projects without sharing task state. The direction remains conceptual until aggregation, funding, prioritization and cross-project authorization models are approved.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | program, strategic theme, funding reference, status review | Scope and identify program, strategic theme, funding reference, status review; retain event time. |
| Lifecycle and evidence | portfolio, sponsor, priority, governance | Version portfolio, sponsor, priority, governance; correct by linked event. |
| Authority and reconciliation | project grouping, business owner, dependency | Name owner and acknowledgement for project grouping, business owner, dependency. |

**Ownership boundary.** Project owns program and portfolio direction evidence; consequential domains retain authoritative records.

### Architecture views

**Program/portfolio direction**

~~~mermaid
flowchart LR
    Programportfoliodi0["Program/portfolio direction"]
    Programportfoliodi1["program"]
    Programportfoliodi2["portfolio"]
    Programportfoliodi3["project grouping"]
    Programportfoliodi4["strategic theme"]
    Programportfoliodi5["sponsor"]
    Programportfoliodi6["business owner"]
    Programportfoliodi0 --> Programportfoliodi1
    Programportfoliodi1 --> Programportfoliodi2
    Programportfoliodi2 --> Programportfoliodi3
    Programportfoliodi3 --> Programportfoliodi4
    Programportfoliodi4 --> Programportfoliodi5
    Programportfoliodi3 -- "exception" --> Programportfoliodi6
    Programportfoliodi6 -- "reconcile" --> Programportfoliodi0
~~~

## Chapter 09 — Project Hierarchy and WBS

The work breakdown structure is an effective-dated delivery decomposition. Parentage, responsibility, deliverables and cost references are versioned so historical progress and cost evidence retain the structure that governed them.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | project, work package, milestone, responsible role, history | Scope and identify project, work package, milestone, responsible role, history; retain event time. |
| Lifecycle and evidence | phase, task, parent child, cost object | Version phase, task, parent child, cost object; correct by linked event. |
| Authority and reconciliation | WBS, subtask, effective structure, deliverable | Name owner and acknowledgement for WBS, subtask, effective structure, deliverable. |

**Ownership boundary.** Project owns project hierarchy and wbs evidence; consequential domains retain authoritative records.

### Architecture views

**WBS hierarchy**

~~~mermaid
classDiagram
    class WBShierarchy1 {
      +String project
      +String revision1
    }
    class WBShierarchy2 {
      +String phase
      +String revision2
    }
    class WBShierarchy3 {
      +String WBS
      +String revision3
    }
    class WBShierarchy4 {
      +String workpackage
      +String revision4
    }
    class WBShierarchy5 {
      +String task
      +String revision5
    }
    WBShierarchy1 "1" --> "*" WBShierarchy2 : project to phase
    WBShierarchy2 "1" --> "*" WBShierarchy3 : phase to WBS
    WBShierarchy3 "1" --> "*" WBShierarchy4 : WBS to work package
    WBShierarchy4 "1" --> "*" WBShierarchy5 : work package to task
~~~

## Chapter 10 — Project Lifecycle

Project state expresses delivery authority and maturity. Operational completion, customer acceptance and financial close are separate transitions with different evidence and accountable actors.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | Proposed, Approved, On hold, Operationally complete, Financial close pending, Archived | Scope and identify Proposed, Approved, On hold, Operationally complete, Financial close pending, Archived; retain event time. |
| Lifecycle and evidence | Draft, Planned, At risk, Awaiting customer acceptance, Financially closed | Version Draft, Planned, At risk, Awaiting customer acceptance, Financially closed; correct by linked event. |
| Authority and reconciliation | Under review, Active, Partially delivered, Accepted, Cancelled | Name owner and acknowledgement for Under review, Active, Partially delivered, Accepted, Cancelled. |

**Ownership boundary.** Project owns project lifecycle evidence; consequential domains retain authoritative records.

### Architecture views

**Project lifecycle**

~~~mermaid
stateDiagram-v2
    [*] --> Proposed: create Proposed
    Proposed --> Draft: verify Draft
    Draft --> UnderReview: verify Under review
    UnderReview --> Approved: verify Approved
    Approved --> Planned: verify Planned
    Planned --> Active: verify Active
    Active --> Planned: correction or reopen
    Active --> [*]: governed terminal evidence
~~~

## Chapter 11 — Project Approval and Initiation

Initiation converts an approved delivery proposition into controlled planning authority. It does not sign a customer contract, reserve stock, issue a purchase order, post a budget or assign an employee.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | business justification, budget reference, material need, baseline authorization | Scope and identify business justification, budget reference, material need, baseline authorization; retain event time. |
| Lifecycle and evidence | commercial reference, resource readiness, risk, start permission | Version commercial reference, resource readiness, risk, start permission; correct by linked event. |
| Authority and reconciliation | scope, procurement need, approval | Name owner and acknowledgement for scope, procurement need, approval. |

**Ownership boundary.** Project owns project approval and initiation evidence; consequential domains retain authoritative records.

### Architecture views

**Project initiation**

~~~mermaid
sequenceDiagram
    participant P1 as Project Sponsor
    participant P2 as Project Manager
    participant P3 as Project Authority
    P1->>P2: Project initiation submits business justification identity/revision
    P2->>P2: Project initiation checks commercial reference authority
    P2->>P3: Project initiation requests owner decision for scope
    P3-->>P2: Project initiation acknowledges budget reference or exception
    P2-->>P1: Project initiation reconciles resource readiness chronology
    Note over P1,P3: procurement need remains owned by the named domain
~~~

## Chapter 12 — Project Scope and Deliverables

Scope is controlled through measurable deliverables and acceptance criteria. Completion evidence is produced by the delivery team; customer acceptance is a separate attributable response and commercial eligibility is evaluated elsewhere.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | scope statement, owner, document, acceptance boundary | Scope and identify scope statement, owner, document, acceptance boundary; retain event time. |
| Lifecycle and evidence | deliverable, due date, revision | Version deliverable, due date, revision; correct by linked event. |
| Authority and reconciliation | acceptance criteria, dependency, change impact | Name owner and acknowledgement for acceptance criteria, dependency, change impact. |

**Ownership boundary.** Project owns project scope and deliverables evidence; consequential domains retain authoritative records.

### Architecture views

**Deliverables**

~~~mermaid
flowchart LR
    Deliverables0["Deliverables"]
    Deliverables1["scope statement"]
    Deliverables2["deliverable"]
    Deliverables3["acceptance criteria"]
    Deliverables4["owner"]
    Deliverables5["due date"]
    Deliverables6["dependency"]
    Deliverables0 --> Deliverables1
    Deliverables1 --> Deliverables2
    Deliverables2 --> Deliverables3
    Deliverables3 --> Deliverables4
    Deliverables4 --> Deliverables5
    Deliverables3 -- "exception" --> Deliverables6
    Deliverables6 -- "reconcile" --> Deliverables0
~~~

## Chapter 13 — Project Task Architecture

A task is the smallest governed project execution unit. Its status follows dependency, assignment, evidence and correction rules and cannot be inferred from a timesheet or document upload alone.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | task identity, responsible resource, dependency, status | Scope and identify task identity, responsible resource, dependency, status; retain event time. |
| Lifecycle and evidence | WBS reference, dates, priority, progress | Version WBS reference, dates, priority, progress; correct by linked event. |
| Authority and reconciliation | owner, duration, deliverable, completion evidence | Name owner and acknowledgement for owner, duration, deliverable, completion evidence. |

**Ownership boundary.** Project owns project task architecture evidence; consequential domains retain authoritative records.

### Architecture views

**Task model**

~~~mermaid
classDiagram
    class Taskmodel1 {
      +String taskidentity
      +String revision1
    }
    class Taskmodel2 {
      +String WBSreference
      +String revision2
    }
    class Taskmodel3 {
      +String owner
      +String revision3
    }
    class Taskmodel4 {
      +String responsibleresource
      +String revision4
    }
    class Taskmodel5 {
      +String dates
      +String revision5
    }
    Taskmodel1 "1" --> "*" Taskmodel2 : task identity to WBS reference
    Taskmodel2 "1" --> "*" Taskmodel3 : WBS reference to owner
    Taskmodel3 "1" --> "*" Taskmodel4 : owner to responsible resource
    Taskmodel4 "1" --> "*" Taskmodel5 : responsible resource to dates
~~~

## Chapter 14 — Project Milestone Architecture

A schedule milestone is a zero-duration delivery gate tied to predecessor tasks, objective completion evidence and an accountable verifier. Forecast date, actual date, waiver and reopening retain chronology; the gate may exist for governance even when no customer payment is involved.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | milestone, approval, billing trigger direction, history | Scope and identify milestone, approval, billing trigger direction, history; retain event time. |
| Lifecycle and evidence | due date, completion criteria, delay | Version due date, completion criteria, delay; correct by linked event. |
| Authority and reconciliation | dependency, customer acceptance requirement, reforecast | Name owner and acknowledgement for dependency, customer acceptance requirement, reforecast. |

**Ownership boundary.** Project owns project milestone architecture evidence; consequential domains retain authoritative records.

### Architecture views

**Milestone model**

~~~mermaid
classDiagram
    class Milestonemodel1 {
      +String milestone
      +String revision1
    }
    class Milestonemodel2 {
      +String duedate
      +String revision2
    }
    class Milestonemodel3 {
      +String dependency
      +String revision3
    }
    class Milestonemodel4 {
      +String approval
      +String revision4
    }
    class Milestonemodel5 {
      +String completioncriteria
      +String revision5
    }
    Milestonemodel1 "1" --> "*" Milestonemodel2 : milestone to due date
    Milestonemodel2 "1" --> "*" Milestonemodel3 : due date to dependency
    Milestonemodel3 "1" --> "*" Milestonemodel4 : dependency to approval
    Milestonemodel4 "1" --> "*" Milestonemodel5 : approval to completion criteria
~~~

## Chapter 15 — Project Scheduling

Scheduling versions task timing, constraints and dependencies without rewriting the approved baseline. Critical-path and float calculations remain target analytical functions whose formulas and calendars require separate approval.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | task dates, lead and lag, critical path direction, schedule version | Scope and identify task dates, lead and lag, critical path direction, schedule version; retain event time. |
| Lifecycle and evidence | predecessor, constraint, float direction, approval | Version predecessor, constraint, float direction, approval; correct by linked event. |
| Authority and reconciliation | successor, calendar, rescheduling | Name owner and acknowledgement for successor, calendar, rescheduling. |

**Ownership boundary.** Project owns project scheduling evidence; consequential domains retain authoritative records.

### Architecture views

**Scheduling**

~~~mermaid
flowchart LR
    Scheduling0["Scheduling"]
    Scheduling1["task dates"]
    Scheduling2["predecessor"]
    Scheduling3["successor"]
    Scheduling4["lead and lag"]
    Scheduling5["constraint"]
    Scheduling6["calendar"]
    Scheduling0 --> Scheduling1
    Scheduling1 --> Scheduling2
    Scheduling2 --> Scheduling3
    Scheduling3 --> Scheduling4
    Scheduling4 --> Scheduling5
    Scheduling3 -- "exception" --> Scheduling6
    Scheduling6 -- "reconcile" --> Scheduling0
~~~

**Dependency network**

~~~mermaid
flowchart LR
    Dependencynetwork0["Dependency network"]
    Dependencynetwork1["predecessor"]
    Dependencynetwork2["successor"]
    Dependencynetwork3["lead and lag"]
    Dependencynetwork4["constraint"]
    Dependencynetwork5["calendar"]
    Dependencynetwork6["critical path direction"]
    Dependencynetwork0 --> Dependencynetwork1
    Dependencynetwork1 --> Dependencynetwork2
    Dependencynetwork2 --> Dependencynetwork3
    Dependencynetwork3 --> Dependencynetwork4
    Dependencynetwork4 --> Dependencynetwork5
    Dependencynetwork3 -- "exception" --> Dependencynetwork6
    Dependencynetwork6 -- "reconcile" --> Dependencynetwork0
~~~

## Chapter 16 — Project Baseline Architecture

A baseline freezes the approved comparison point for scope, schedule, cost and resource intent. Rebaseline is a governed change with prospective effect; it never erases prior variance.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | scope baseline, resource baseline, effective date, history | Scope and identify scope baseline, resource baseline, effective date, history; retain event time. |
| Lifecycle and evidence | schedule baseline, approval, variance | Version schedule baseline, approval, variance; correct by linked event. |
| Authority and reconciliation | cost baseline, version, rebaseline | Name owner and acknowledgement for cost baseline, version, rebaseline. |

**Ownership boundary.** Project owns project baseline architecture evidence; consequential domains retain authoritative records.

### Architecture views

**Baseline**

~~~mermaid
flowchart LR
    Baseline0["Baseline"]
    Baseline1["scope baseline"]
    Baseline2["schedule baseline"]
    Baseline3["cost baseline"]
    Baseline4["resource baseline"]
    Baseline5["approval"]
    Baseline6["version"]
    Baseline0 --> Baseline1
    Baseline1 --> Baseline2
    Baseline2 --> Baseline3
    Baseline3 --> Baseline4
    Baseline4 --> Baseline5
    Baseline3 -- "exception" --> Baseline6
    Baseline6 -- "reconcile" --> Baseline0
~~~

## Chapter 17 — Project Change Control

Change control binds a requested alteration to delivery, customer, commercial, resource, cost and risk consequences. Each owning domain acknowledges its own effects before the project baseline is revised.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | change request, schedule impact, commercial impact, approval | Scope and identify change request, schedule impact, commercial impact, approval; retain event time. |
| Lifecycle and evidence | source, cost impact, customer impact, baseline update | Version source, cost impact, customer impact, baseline update; correct by linked event. |
| Authority and reconciliation | scope impact, resource impact, risk impact, closure | Name owner and acknowledgement for scope impact, resource impact, risk impact, closure. |

**Ownership boundary.** Project owns project change control evidence; consequential domains retain authoritative records.

### Architecture views

**Change control**

~~~mermaid
sequenceDiagram
    participant P1 as Requester
    participant P2 as Project Manager
    participant P3 as Domain Owners
    P1->>P2: Change control submits change request identity/revision
    P2->>P2: Change control checks source authority
    P2->>P3: Change control requests owner decision for scope impact
    P3-->>P2: Change control acknowledges schedule impact or exception
    P2-->>P1: Change control reconciles cost impact chronology
    Note over P1,P3: resource impact remains owned by the named domain
~~~

## Chapter 18 — Project Resource Demand

Resource demand describes work that needs a role or skill in a time and place. It is not an employment decision, attendance fact, payroll instruction or assurance that a named person is eligible.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | role, date range, priority, request | Scope and identify role, date range, priority, request; retain event time. |
| Lifecycle and evidence | skill, location, cost-rate reference, fulfillment | Version skill, location, cost-rate reference, fulfillment; correct by linked event. |
| Authority and reconciliation | quantity or FTE, project task, named or generic resource, shortage | Name owner and acknowledgement for quantity or FTE, project task, named or generic resource, shortage. |

**Ownership boundary.** Project owns project resource demand evidence; consequential domains retain authoritative records.

### Architecture views

**Resource demand**

~~~mermaid
flowchart LR
    Resourcedemand0["Resource demand"]
    Resourcedemand1["role"]
    Resourcedemand2["skill"]
    Resourcedemand3["quantity or FTE"]
    Resourcedemand4["date range"]
    Resourcedemand5["location"]
    Resourcedemand6["project task"]
    Resourcedemand0 --> Resourcedemand1
    Resourcedemand1 --> Resourcedemand2
    Resourcedemand2 --> Resourcedemand3
    Resourcedemand3 --> Resourcedemand4
    Resourcedemand4 --> Resourcedemand5
    Resourcedemand3 -- "exception" --> Resourcedemand6
    Resourcedemand6 -- "reconcile" --> Resourcedemand0
~~~

## Chapter 19 — Resource Allocation Boundary

Allocation reconciles project demand with workforce eligibility and availability. Project Management owns demand and delivery assignment; HR/Workforce retains employee status, leave, attendance, compensation and payroll authority.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | resource request, assignment, release, project authority | Scope and identify resource request, assignment, release, project authority; retain event time. |
| Lifecycle and evidence | candidate, partial allocation, reassignment, audit | Version candidate, partial allocation, reassignment, audit; correct by linked event. |
| Authority and reconciliation | availability, over-allocation, HR workforce boundary | Name owner and acknowledgement for availability, over-allocation, HR workforce boundary. |

**Ownership boundary.** Project owns resource allocation boundary evidence; consequential domains retain authoritative records.

### Architecture views

**Resource allocation**

~~~mermaid
sequenceDiagram
    participant P1 as Project Manager
    participant P2 as Resource Manager
    participant P3 as HR/Workforce
    P1->>P2: Resource allocation submits resource request identity/revision
    P2->>P2: Resource allocation checks candidate authority
    P2->>P3: Resource allocation requests owner decision for availability
    P3-->>P2: Resource allocation acknowledges assignment or exception
    P2-->>P1: Resource allocation reconciles partial allocation chronology
    Note over P1,P3: over-allocation remains owned by the named domain
~~~

## Chapter 20 — Capacity and Utilization Direction

Capacity and utilization are governed planning and reporting views assembled from eligible availability and accepted work allocations. They must distinguish project, service, maintenance and manufacturing demand instead of double-booking the same person.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | capacity, utilization, service work, leave dependency | Scope and identify capacity, utilization, service work, leave dependency; retain event time. |
| Lifecycle and evidence | availability, billable direction, maintenance work, reporting boundary | Version availability, billable direction, maintenance work, reporting boundary; correct by linked event. |
| Authority and reconciliation | allocation, internal project, manufacturing work | Name owner and acknowledgement for allocation, internal project, manufacturing work. |

**Ownership boundary.** Project owns capacity and utilization direction evidence; consequential domains retain authoritative records.

### Architecture views

**Capacity/utilization**

~~~mermaid
flowchart LR
    Capacityutilizatio0["Capacity/utilization"]
    Capacityutilizatio1["capacity"]
    Capacityutilizatio2["availability"]
    Capacityutilizatio3["allocation"]
    Capacityutilizatio4["utilization"]
    Capacityutilizatio5["billable direction"]
    Capacityutilizatio6["internal project"]
    Capacityutilizatio0 --> Capacityutilizatio1
    Capacityutilizatio1 --> Capacityutilizatio2
    Capacityutilizatio2 --> Capacityutilizatio3
    Capacityutilizatio3 --> Capacityutilizatio4
    Capacityutilizatio4 --> Capacityutilizatio5
    Capacityutilizatio3 -- "exception" --> Capacityutilizatio6
    Capacityutilizatio6 -- "reconcile" --> Capacityutilizatio0
~~~

## Chapter 21 — Time Capture Architecture

A time entry is a worker assertion at day-and-task grain: start/end or duration, work location, WBS/task, activity code, billable candidate and correction lineage. Draft capture supports recall before a period timesheet packages entries for independent approval.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | person, task, start and end, location, correction | Scope and identify person, task, start and end, location, correction; retain event time. |
| Lifecycle and evidence | date, service order or case, work type, source | Version date, service order or case, work type, source; correct by linked event. |
| Authority and reconciliation | project, duration, billable direction, attachment | Name owner and acknowledgement for project, duration, billable direction, attachment. |

**Ownership boundary.** Project owns time capture architecture evidence; consequential domains retain authoritative records.

### Architecture views

**Time capture**

~~~mermaid
classDiagram
    class Timecapture1 {
      +String person
      +String revision1
    }
    class Timecapture2 {
      +String date
      +String revision2
    }
    class Timecapture3 {
      +String project
      +String revision3
    }
    class Timecapture4 {
      +String task
      +String revision4
    }
    class Timecapture5 {
      +String serviceorderorcase
      +String revision5
    }
    Timecapture1 "1" --> "*" Timecapture2 : person to date
    Timecapture2 "1" --> "*" Timecapture3 : date to project
    Timecapture3 "1" --> "*" Timecapture4 : project to task
    Timecapture4 "1" --> "*" Timecapture5 : task to service order or case
~~~

## Chapter 22 — Timesheet Lifecycle

The timesheet lifecycle protects submitter evidence, reviewer decisions, period locks and correction lineage. Approved time can be consumed by project/service processes, but payroll and Finance create their own authoritative results.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | Draft, Approved, consumed direction, payroll boundary | Scope and identify Draft, Approved, consumed direction, payroll boundary; retain event time. |
| Lifecycle and evidence | Submitted, Rejected, Corrected, Finance boundary | Version Submitted, Rejected, Corrected, Finance boundary; correct by linked event. |
| Authority and reconciliation | Returned, Locked, Archived | Name owner and acknowledgement for Returned, Locked, Archived. |

**Ownership boundary.** Project owns timesheet lifecycle evidence; consequential domains retain authoritative records.

### Architecture views

**Timesheet lifecycle**

~~~mermaid
stateDiagram-v2
    [*] --> Draft: create Draft
    Draft --> Submitted: verify Submitted
    Submitted --> Returned: verify Returned
    Returned --> Approved: verify Approved
    Approved --> Rejected: verify Rejected
    Rejected --> Locked: verify Locked
    Locked --> Rejected: correction or reopen
    Locked --> [*]: governed terminal evidence
~~~

## Chapter 23 — Time Approval and Correction

Time approval verifies delivery relevance and reasonableness, not compensation or journal treatment. Retroactive corrections preserve the original entry, approvals, closed-period response and downstream acknowledgements.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | submitter, line manager direction, correction, Finance and Payroll boundary | Scope and identify submitter, line manager direction, correction, Finance and Payroll boundary; retain event time. |
| Lifecycle and evidence | Project Manager, approval, retroactive change | Version Project Manager, approval, retroactive change; correct by linked event. |
| Authority and reconciliation | Service Manager, rejection, closed period | Name owner and acknowledgement for Service Manager, rejection, closed period. |

**Ownership boundary.** Project owns time approval and correction evidence; consequential domains retain authoritative records.

### Architecture views

**Time approval**

~~~mermaid
sequenceDiagram
    participant P1 as Submitter
    participant P2 as Delivery Approver
    participant P3 as Finance/Payroll
    P1->>P2: Time approval submits submitter identity/revision
    P2->>P2: Time approval checks Project Manager authority
    P2->>P3: Time approval requests owner decision for Service Manager
    P3-->>P2: Time approval acknowledges line manager direction or exception
    P2-->>P1: Time approval reconciles approval chronology
    Note over P1,P3: rejection remains owned by the named domain
~~~

## Chapter 24 — Expense Architecture

Expense architecture records claimant evidence and project/service attribution without deciding reimbursement, tax treatment, customer rebill or posting. Those effects remain with HR/Workforce, Sales and Finance as applicable.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | expense claim, category, amount evidence, approval | Scope and identify expense claim, category, amount evidence, approval; retain event time. |
| Lifecycle and evidence | employee or user, date, receipt, reimbursement boundary | Version employee or user, date, receipt, reimbursement boundary; correct by linked event. |
| Authority and reconciliation | project or service reference, currency, tax direction, customer rebill direction | Name owner and acknowledgement for project or service reference, currency, tax direction, customer rebill direction. |

**Ownership boundary.** Project owns expense architecture evidence; consequential domains retain authoritative records.

### Architecture views

**Expense**

~~~mermaid
sequenceDiagram
    participant P1 as Claimant
    participant P2 as Project/Service Approver
    participant P3 as Finance/Workforce
    P1->>P2: Expense submits expense claim identity/revision
    P2->>P2: Expense checks employee or user authority
    P2->>P3: Expense requests owner decision for project or service reference
    P3-->>P2: Expense acknowledges category or exception
    P2-->>P1: Expense reconciles date chronology
    Note over P1,P3: currency remains owned by the named domain
~~~

## Chapter 25 — Project Budget Architecture

A project budget is an approved operational plan by version, category, currency and time phase. It does not create a ledger budget, commitment or availability-control result unless Finance acknowledges one.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | budget version, material, overhead direction, time phase, Finance boundary | Scope and identify budget version, material, overhead direction, time phase, Finance boundary; retain event time. |
| Lifecycle and evidence | cost category, external service, contingency direction, approval | Version cost category, external service, contingency direction, approval; correct by linked event. |
| Authority and reconciliation | labor, travel and expense, currency, revision | Name owner and acknowledgement for labor, travel and expense, currency, revision. |

**Ownership boundary.** Project owns project budget architecture evidence; consequential domains retain authoritative records.

### Architecture views

**Project budget**

~~~mermaid
classDiagram
    class Projectbudget1 {
      +String budgetversion
      +String revision1
    }
    class Projectbudget2 {
      +String costcategory
      +String revision2
    }
    class Projectbudget3 {
      +String labor
      +String revision3
    }
    class Projectbudget4 {
      +String material
      +String revision4
    }
    class Projectbudget5 {
      +String externalservice
      +String revision5
    }
    Projectbudget1 "1" --> "*" Projectbudget2 : budget version to cost category
    Projectbudget2 "1" --> "*" Projectbudget3 : cost category to labor
    Projectbudget3 "1" --> "*" Projectbudget4 : labor to material
    Projectbudget4 "1" --> "*" Projectbudget5 : material to external service
~~~

## Chapter 26 — Project Forecast and Estimate-at-Completion Direction

Forecasting combines accepted actual references, known commitments, remaining estimates, schedule outlook and risk allowances. EAC and ETC are operational projections, not implemented calculations or Finance-certified values.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | actual evidence, forecast, schedule forecast, review | Scope and identify actual evidence, forecast, schedule forecast, review; retain event time. |
| Lifecycle and evidence | commitment direction, EAC direction, risk allowance, approval | Version commitment direction, EAC direction, risk allowance, approval; correct by linked event. |
| Authority and reconciliation | remaining estimate, ETC direction, version | Name owner and acknowledgement for remaining estimate, ETC direction, version. |

**Ownership boundary.** Project owns project forecast and estimate-at-completion direction evidence; consequential domains retain authoritative records.

### Architecture views

**Forecast**

~~~mermaid
flowchart LR
    Forecast0["Forecast"]
    Forecast1["actual evidence"]
    Forecast2["commitment direction"]
    Forecast3["remaining estimate"]
    Forecast4["forecast"]
    Forecast5["EAC direction"]
    Forecast6["ETC direction"]
    Forecast0 --> Forecast1
    Forecast1 --> Forecast2
    Forecast2 --> Forecast3
    Forecast3 --> Forecast4
    Forecast4 --> Forecast5
    Forecast3 -- "exception" --> Forecast6
    Forecast6 -- "reconcile" --> Forecast0
~~~

## Chapter 27 — Project Cost Collection Boundary

Project cost collection transfers accepted quantities and source references to Finance. Project Management cannot select accounts, valuation, capitalization, posting period or settlement state.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | labor quantity, external service, cost object, reconciliation | Scope and identify labor quantity, external service, cost object, reconciliation; retain event time. |
| Lifecycle and evidence | material quantity, manufacturing cost reference, Finance posting | Version material quantity, manufacturing cost reference, Finance posting; correct by linked event. |
| Authority and reconciliation | expense, maintenance service reference, correction | Name owner and acknowledgement for expense, maintenance service reference, correction. |

**Ownership boundary.** Project owns project cost collection boundary evidence; consequential domains retain authoritative records.

### Architecture views

**Cost collection**

~~~mermaid
sequenceDiagram
    participant P1 as Project Management
    participant P2 as Finance
    participant P3 as Reporting
    P1->>P2: Cost collection submits labor quantity identity/revision
    P2->>P2: Cost collection checks material quantity authority
    P2->>P3: Cost collection requests owner decision for expense
    P3-->>P2: Cost collection acknowledges external service or exception
    P2-->>P1: Cost collection reconciles manufacturing cost reference chronology
    Note over P1,P3: maintenance service reference remains owned by the named domain
~~~

## Chapter 28 — Project Revenue and Billing Boundary

The billing boundary emits an immutable eligibility package containing project/WBS identity, source revision, accepted quantity, evidence links and a deduplication key. Sales returns invoice or rejection identity; Finance returns posting status. Project code never calculates price, tax, journal or credit.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | commercial source, time and material, usage direction, billing request | Scope and identify commercial source, time and material, usage direction, billing request; retain event time. |
| Lifecycle and evidence | billing method, milestone, billable quantity, Finance invoice | Version billing method, milestone, billable quantity, Finance invoice; correct by linked event. |
| Authority and reconciliation | fixed price, retainer direction, acceptance dependency, correction | Name owner and acknowledgement for fixed price, retainer direction, acceptance dependency, correction. |

**Ownership boundary.** Project owns project revenue and billing boundary evidence; consequential domains retain authoritative records.

### Architecture views

**Billing boundary**

~~~mermaid
sequenceDiagram
    participant P1 as Project Management
    participant P2 as Sales
    participant P3 as Finance
    P1->>P2: Billing boundary submits commercial source identity/revision
    P2->>P2: Billing boundary checks billing method authority
    P2->>P3: Billing boundary requests owner decision for fixed price
    P3-->>P2: Billing boundary acknowledges time and material or exception
    P2-->>P1: Billing boundary reconciles milestone chronology
    Note over P1,P3: retainer direction remains owned by the named domain
~~~

## Chapter 29 — Milestone Billing

Fixed-price commerce maps contracted payment percentages and holdbacks to accepted deliverables. Sales validates order terms, tax context and billing plan before creating an invoice; Finance controls revenue and posting cut-off. A passed schedule gate alone never charges the customer.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | milestone completion, billing percentage, partial eligibility | Scope and identify milestone completion, billing percentage, partial eligibility; retain event time. |
| Lifecycle and evidence | customer acceptance, Sales contract reference, hold | Version customer acceptance, Sales contract reference, hold; correct by linked event. |
| Authority and reconciliation | eligible amount direction, Finance request, reversal | Name owner and acknowledgement for eligible amount direction, Finance request, reversal. |

**Ownership boundary.** Project owns milestone billing evidence; consequential domains retain authoritative records.

### Architecture views

**Milestone billing**

~~~mermaid
sequenceDiagram
    participant P1 as Project Manager
    participant P2 as Customer/Sales
    participant P3 as Finance
    P1->>P2: Milestone billing submits milestone completion identity/revision
    P2->>P2: Milestone billing checks customer acceptance authority
    P2->>P3: Milestone billing requests owner decision for eligible amount direction
    P3-->>P2: Milestone billing acknowledges billing percentage or exception
    P2-->>P1: Milestone billing reconciles Sales contract reference chronology
    Note over P1,P3: Finance request remains owned by the named domain
~~~

## Chapter 30 — Time-and-Material Billing

T&M commerce selects approved labor and expense quantities by contract cut-off, rate card, role class, caps and not-to-exceed terms. Sales resolves price and invoice grouping; Finance resolves tax, posting and revenue. Rejected quantities return to delivery reconciliation.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | approved time, rate source, cap direction, Finance invoice | Scope and identify approved time, rate source, cap direction, Finance invoice; retain event time. |
| Lifecycle and evidence | approved expense, customer agreement, billing period | Version approved expense, customer agreement, billing period; correct by linked event. |
| Authority and reconciliation | billable rules, nonbillable time, billing request | Name owner and acknowledgement for billable rules, nonbillable time, billing request. |

**Ownership boundary.** Project owns time-and-material billing evidence; consequential domains retain authoritative records.

### Architecture views

**T&M billing**

~~~mermaid
sequenceDiagram
    participant P1 as Time Approver
    participant P2 as Sales
    participant P3 as Finance
    P1->>P2: T&M billing submits approved time identity/revision
    P2->>P2: T&M billing checks approved expense authority
    P2->>P3: T&M billing requests owner decision for billable rules
    P3-->>P2: T&M billing acknowledges rate source or exception
    P2-->>P1: T&M billing reconciles customer agreement chronology
    Note over P1,P3: nonbillable time remains owned by the named domain
~~~

## Chapter 31 — Project Profitability Boundary

Project economics combines estimate-at-completion, estimate-to-complete, CPI/SPI signals, fixed-price exposure and T&M backlog. A margin bridge separates WBS forecast variance, commitments and unbilled delivery from Finance-certified revenue and posted cost.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | revenue, forecast, operational view, period | Scope and identify revenue, forecast, operational view, period; retain event time. |
| Lifecycle and evidence | cost, gross margin direction, Finance-certified view, reconciliation | Version cost, gross margin direction, Finance-certified view, reconciliation; correct by linked event. |
| Authority and reconciliation | commitment, contribution direction, currency, reporting | Name owner and acknowledgement for commitment, contribution direction, currency, reporting. |

**Ownership boundary.** Project owns project profitability boundary evidence; consequential domains retain authoritative records.

### Architecture views

**Profitability**

~~~mermaid
flowchart LR
    Profitability0["Profitability"]
    Profitability1["revenue"]
    Profitability2["cost"]
    Profitability3["commitment"]
    Profitability4["forecast"]
    Profitability5["gross margin direction"]
    Profitability6["contribution direction"]
    Profitability0 --> Profitability1
    Profitability1 --> Profitability2
    Profitability2 --> Profitability3
    Profitability3 --> Profitability4
    Profitability4 --> Profitability5
    Profitability3 -- "exception" --> Profitability6
    Profitability6 -- "reconcile" --> Profitability0
~~~

## Chapter 32 — Project Procurement Boundary

A project procurement need specifies delivery context, requirement and need date. Procurement alone chooses the sourcing process, supplier commitment, purchase order and commercial claim.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | procurement need, purchase order, project reference, receipt and invoice boundary | Scope and identify procurement need, purchase order, project reference, receipt and invoice boundary; retain event time. |
| Lifecycle and evidence | requisition direction, delivery, budget check | Version requisition direction, delivery, budget check; correct by linked event. |
| Authority and reconciliation | supplier, external service, Procurement ownership | Name owner and acknowledgement for supplier, external service, Procurement ownership. |

**Ownership boundary.** Project owns project procurement boundary evidence; consequential domains retain authoritative records.

### Architecture views

**Project procurement**

~~~mermaid
sequenceDiagram
    participant P1 as Project Manager
    participant P2 as Procurement
    participant P3 as Supplier
    P1->>P2: Project procurement submits procurement need identity/revision
    P2->>P2: Project procurement checks requisition direction authority
    P2->>P3: Project procurement requests owner decision for supplier
    P3-->>P2: Project procurement acknowledges purchase order or exception
    P2-->>P1: Project procurement reconciles delivery chronology
    Note over P1,P3: external service remains owned by the named domain
~~~

## Chapter 33 — Project Material and Inventory Boundary

A project material coordinator expresses WBS demand, required-on-site date and consumption purpose. Inventory answers with reservation, pick, issue, return and transfer identifiers; warehouse custody, batch/serial genealogy, shortage substitution and valuation never become project fields.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | material requirement, issue, batch and serial, Inventory ownership | Scope and identify material requirement, issue, batch and serial, Inventory ownership; retain event time. |
| Lifecycle and evidence | reservation request, return, consumption, reconciliation | Version reservation request, return, consumption, reconciliation; correct by linked event. |
| Authority and reconciliation | allocation, transfer, project location | Name owner and acknowledgement for allocation, transfer, project location. |

**Ownership boundary.** Project owns project material and inventory boundary evidence; consequential domains retain authoritative records.

### Architecture views

**Project materials**

~~~mermaid
sequenceDiagram
    participant P1 as Project Management
    participant P2 as Inventory
    participant P3 as Warehouse
    P1->>P2: Project materials submits material requirement identity/revision
    P2->>P2: Project materials checks reservation request authority
    P2->>P3: Project materials requests owner decision for allocation
    P3-->>P2: Project materials acknowledges issue or exception
    P2-->>P1: Project materials reconciles return chronology
    Note over P1,P3: transfer remains owned by the named domain
~~~

## Chapter 34 — Project Manufacturing Coordination

Project-linked manufacturing preserves project, WBS, deliverable and engineering-revision context. Manufacturing owns production order execution, WIP, confirmation and genealogy.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | production need, engineering revision, cost reference | Scope and identify production need, engineering revision, cost reference; retain event time. |
| Lifecycle and evidence | production order reference, material coordination, delivery dependency | Version production order reference, material coordination, delivery dependency; correct by linked event. |
| Authority and reconciliation | WBS or task reference, completion, Manufacturing authority | Name owner and acknowledgement for WBS or task reference, completion, Manufacturing authority. |

**Ownership boundary.** Project owns project manufacturing coordination evidence; consequential domains retain authoritative records.

### Architecture views

**Project manufacturing**

~~~mermaid
sequenceDiagram
    participant P1 as Project Management
    participant P2 as Manufacturing
    participant P3 as Reporting
    P1->>P2: Project manufacturing submits production need identity/revision
    P2->>P2: Project manufacturing checks production order reference authority
    P2->>P3: Project manufacturing requests owner decision for WBS or task reference
    P3-->>P2: Project manufacturing acknowledges engineering revision or exception
    P2-->>P1: Project manufacturing reconciles material coordination chronology
    Note over P1,P3: completion remains owned by the named domain
~~~

## Chapter 35 — Project Asset and Capitalization Boundary

Project delivery may identify an asset candidate and handover evidence. Finance decides capitalization and depreciation; Maintenance creates and governs equipment technical identity and condition.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | asset candidate, cost accumulation, Finance capitalization | Scope and identify asset candidate, cost accumulation, Finance capitalization; retain event time. |
| Lifecycle and evidence | equipment candidate, asset handover, Maintenance equipment creation | Version equipment candidate, asset handover, Maintenance equipment creation; correct by linked event. |
| Authority and reconciliation | capital project direction, commissioning evidence, depreciation boundary | Name owner and acknowledgement for capital project direction, commissioning evidence, depreciation boundary. |

**Ownership boundary.** Project owns project asset and capitalization boundary evidence; consequential domains retain authoritative records.

### Architecture views

**Asset/capital boundary**

~~~mermaid
sequenceDiagram
    participant P1 as Project Management
    participant P2 as Finance
    participant P3 as Maintenance
    P1->>P2: Asset/capital boundary submits asset candidate identity/revision
    P2->>P2: Asset/capital boundary checks equipment candidate authority
    P2->>P3: Asset/capital boundary requests owner decision for capital project direction
    P3-->>P2: Asset/capital boundary acknowledges cost accumulation or exception
    P2-->>P1: Asset/capital boundary reconciles asset handover chronology
    Note over P1,P3: commissioning evidence remains owned by the named domain
~~~

## Chapter 36 — Project Risk Architecture

Project risk is a prospective uncertainty tied to objectives, triggers and responses. It remains separate from an active issue and from commercial, safety, quality or financial decisions owned elsewhere.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | project risk, impact, mitigation, due date | Scope and identify project risk, impact, mitigation, due date; retain event time. |
| Lifecycle and evidence | category, exposure direction, contingency, status | Version category, exposure direction, contingency, status; correct by linked event. |
| Authority and reconciliation | probability direction, owner, trigger, escalation | Name owner and acknowledgement for probability direction, owner, trigger, escalation. |

**Ownership boundary.** Project owns project risk architecture evidence; consequential domains retain authoritative records.

### Architecture views

**Project risk**

~~~mermaid
stateDiagram-v2
    [*] --> ProjectRisk: create project risk
    ProjectRisk --> Category: verify category
    Category --> ProbabilityDirection: verify probability direction
    ProbabilityDirection --> Impact: verify impact
    Impact --> ExposureDirection: verify exposure direction
    ExposureDirection --> Owner: verify owner
    Owner --> ExposureDirection: correction or reopen
    Owner --> [*]: governed terminal evidence
~~~

## Chapter 37 — Project Issue Architecture

A project issue records a realized blocker or decision need with accountable action and reopen history. Closure requires verified resolution evidence, not simply a comment or task completion.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | issue, owner, blocker, closure | Scope and identify issue, owner, blocker, closure; retain event time. |
| Lifecycle and evidence | source, due date, escalation, reopen | Version source, due date, escalation, reopen; correct by linked event. |
| Authority and reconciliation | severity, action, resolution | Name owner and acknowledgement for severity, action, resolution. |

**Ownership boundary.** Project owns project issue architecture evidence; consequential domains retain authoritative records.

### Architecture views

**Project issue**

~~~mermaid
stateDiagram-v2
    [*] --> Issue: create issue
    Issue --> Source: verify source
    Source --> Severity: verify severity
    Severity --> Owner: verify owner
    Owner --> DueDate: verify due date
    DueDate --> Action: verify action
    Action --> DueDate: correction or reopen
    Action --> [*]: governed terminal evidence
~~~

## Chapter 38 — Project Documents and Collaboration Direction

Project documents carry version, approval and audience classification. Customer visibility is purpose-bound and never inherited from an internal project role or a generic attachment link.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | project document, approval, attachment, retention boundary | Scope and identify project document, approval, attachment, retention boundary; retain event time. |
| Lifecycle and evidence | deliverable, customer-visible direction, comment direction | Version deliverable, customer-visible direction, comment direction; correct by linked event. |
| Authority and reconciliation | version, access, audit | Name owner and acknowledgement for version, access, audit. |

**Ownership boundary.** Project owns project documents and collaboration direction evidence; consequential domains retain authoritative records.

### Architecture views

**Project documents**

~~~mermaid
classDiagram
    class Projectdocuments1 {
      +String projectdocument
      +String revision1
    }
    class Projectdocuments2 {
      +String deliverable
      +String revision2
    }
    class Projectdocuments3 {
      +String version
      +String revision3
    }
    class Projectdocuments4 {
      +String approval
      +String revision4
    }
    class Projectdocuments5 {
      +String customervisibledirection
      +String revision5
    }
    Projectdocuments1 "1" --> "*" Projectdocuments2 : project document to deliverable
    Projectdocuments2 "1" --> "*" Projectdocuments3 : deliverable to version
    Projectdocuments3 "1" --> "*" Projectdocuments4 : version to approval
    Projectdocuments4 "1" --> "*" Projectdocuments5 : approval to customer-visible direction
~~~

## Chapter 39 — Customer Project Visibility Direction

Customer visibility is a filtered read model and controlled interaction channel. It exposes only approved project facts and attributable acceptance requests; no customer portal runtime exists today.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | customer portal direction, deliverable, document visibility, privacy | Scope and identify customer portal direction, deliverable, document visibility, privacy; retain event time. |
| Lifecycle and evidence | project status, issue visibility, acceptance request | Version project status, issue visibility, acceptance request; correct by linked event. |
| Authority and reconciliation | milestone, change visibility, security | Name owner and acknowledgement for milestone, change visibility, security. |

**Ownership boundary.** Project owns customer project visibility direction evidence; consequential domains retain authoritative records.

### Architecture views

**Customer project visibility**

~~~mermaid
flowchart LR
    Customerprojectvis0["Customer project visibility"]
    Customerprojectvis1["customer portal direction"]
    Customerprojectvis2["project status"]
    Customerprojectvis3["milestone"]
    Customerprojectvis4["deliverable"]
    Customerprojectvis5["issue visibility"]
    Customerprojectvis6["change visibility"]
    Customerprojectvis0 --> Customerprojectvis1
    Customerprojectvis1 --> Customerprojectvis2
    Customerprojectvis2 --> Customerprojectvis3
    Customerprojectvis3 --> Customerprojectvis4
    Customerprojectvis4 --> Customerprojectvis5
    Customerprojectvis3 -- "exception" --> Customerprojectvis6
    Customerprojectvis6 -- "reconcile" --> Customerprojectvis0
~~~

## Chapter 40 — Service Management Master Architecture

Service masters define classification and policy references used by cases and orders. They cannot replace customer commerce, entitlement evidence, equipment condition or stock identity.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | service organization, priority, service contract reference, skill requirement | Scope and identify service organization, priority, service contract reference, skill requirement; retain event time. |
| Lifecycle and evidence | service type, SLA class, installed-base reference, resolution code | Version service type, SLA class, installed-base reference, resolution code; correct by linked event. |
| Authority and reconciliation | case category, entitlement type, territory direction, closure code | Name owner and acknowledgement for case category, entitlement type, territory direction, closure code. |

**Ownership boundary.** Service owns service management master architecture evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Service master**

~~~mermaid
classDiagram
    class Servicemaster1 {
      +String serviceorganization
      +String revision1
    }
    class Servicemaster2 {
      +String servicetype
      +String revision2
    }
    class Servicemaster3 {
      +String casecategory
      +String revision3
    }
    class Servicemaster4 {
      +String priority
      +String revision4
    }
    class Servicemaster5 {
      +String SLAclass
      +String revision5
    }
    Servicemaster1 "1" --> "*" Servicemaster2 : service organization to service type
    Servicemaster2 "1" --> "*" Servicemaster3 : service type to case category
    Servicemaster3 "1" --> "*" Servicemaster4 : case category to priority
    Servicemaster4 "1" --> "*" Servicemaster5 : priority to SLA class
~~~

## Chapter 41 — Service Request and Case Architecture

A service request captures reported need; a case is the assessed service record. Conversion preserves source, customer/contact, installed-base context and attachments without treating intake as authorized work.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | service request, contact, description, severity, status | Scope and identify service request, contact, description, severity, status; retain event time. |
| Lifecycle and evidence | case or ticket, item or equipment reference, channel, source, attachments | Version case or ticket, item or equipment reference, channel, source, attachments; correct by linked event. |
| Authority and reconciliation | customer, subject, priority, owner | Name owner and acknowledgement for customer, subject, priority, owner. |

**Ownership boundary.** Service owns service request and case architecture evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Service request**

~~~mermaid
sequenceDiagram
    participant P1 as Customer Channel
    participant P2 as Service Management
    participant P3 as Case Queue
    P1->>P2: Service request submits service request identity/revision
    P2->>P2: Service request checks case or ticket authority
    P2->>P3: Service request requests owner decision for customer
    P3-->>P2: Service request acknowledges contact or exception
    P2-->>P1: Service request reconciles item or equipment reference chronology
    Note over P1,P3: subject remains owned by the named domain
~~~

## Chapter 42 — Service Case Lifecycle

Case lifecycle separates acknowledgement, triage, assignment, waiting, resolution, confirmation and closure. SLA clocks consume typed state events but do not own case state.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | New, Assigned, Waiting for vendor, Resolved, Reopened | Scope and identify New, Assigned, Waiting for vendor, Resolved, Reopened; retain event time. |
| Lifecycle and evidence | Acknowledged, Waiting for customer, Scheduled, Pending customer confirmation, Cancelled | Version Acknowledged, Waiting for customer, Scheduled, Pending customer confirmation, Cancelled; correct by linked event. |
| Authority and reconciliation | Triaged, Waiting for parts, In progress, Closed | Name owner and acknowledgement for Triaged, Waiting for parts, In progress, Closed. |

**Ownership boundary.** Service owns service case lifecycle evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Case lifecycle**

~~~mermaid
stateDiagram-v2
    [*] --> New: create New
    New --> Acknowledged: verify Acknowledged
    Acknowledged --> Triaged: verify Triaged
    Triaged --> Assigned: verify Assigned
    Assigned --> WaitingForCustomer: verify Waiting for customer
    WaitingForCustomer --> WaitingForParts: verify Waiting for parts
    WaitingForParts --> WaitingForCustomer: correction or reopen
    WaitingForParts --> [*]: governed terminal evidence
~~~

## Chapter 43 — Service Priority and Severity

Severity describes observed consequence; priority determines response order after entitlement, business impact and policy are evaluated. Contract influence cannot suppress safety or Quality escalation.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | severity, equipment impact, override, review | Scope and identify severity, equipment impact, override, review; retain event time. |
| Lifecycle and evidence | business impact, Safety and Quality direction, escalation | Version business impact, Safety and Quality direction, escalation; correct by linked event. |
| Authority and reconciliation | customer impact, priority, contract influence | Name owner and acknowledgement for customer impact, priority, contract influence. |

**Ownership boundary.** Service owns service priority and severity evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Priority/severity**

~~~mermaid
flowchart LR
    Priorityseverity0["Priority/severity"]
    Priorityseverity1["severity"]
    Priorityseverity2["business impact"]
    Priorityseverity3["customer impact"]
    Priorityseverity4["equipment impact"]
    Priorityseverity5["Safety and Quality direction"]
    Priorityseverity6["priority"]
    Priorityseverity0 --> Priorityseverity1
    Priorityseverity1 --> Priorityseverity2
    Priorityseverity2 --> Priorityseverity3
    Priorityseverity3 --> Priorityseverity4
    Priorityseverity4 --> Priorityseverity5
    Priorityseverity3 -- "exception" --> Priorityseverity6
    Priorityseverity6 -- "reconcile" --> Priorityseverity0
~~~

## Chapter 44 — SLA Architecture

An SLA is a versioned measurement policy over service hours, clocks, pauses and exclusions. A warning or breach is service evidence, not an automatic credit, refund or contractual admission.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | SLA, service hours, exclusion, measurement clock, version | Scope and identify SLA, service hours, exclusion, measurement clock, version; retain event time. |
| Lifecycle and evidence | response target, calendar, priority, breach | Version response target, calendar, priority, breach; correct by linked event. |
| Authority and reconciliation | resolution target, pause condition, contract reference, warning | Name owner and acknowledgement for resolution target, pause condition, contract reference, warning. |

**Ownership boundary.** Service owns sla architecture evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**SLA**

~~~mermaid
flowchart LR
    SLA0["SLA"]
    SLA1["SLA"]
    SLA2["response target"]
    SLA3["resolution target"]
    SLA4["service hours"]
    SLA5["calendar"]
    SLA6["pause condition"]
    SLA0 --> SLA1
    SLA1 --> SLA2
    SLA2 --> SLA3
    SLA3 --> SLA4
    SLA4 --> SLA5
    SLA3 -- "exception" --> SLA6
    SLA6 -- "reconcile" --> SLA0
~~~

## Chapter 45 — Entitlement Architecture

Entitlement evaluates whether a requested service fits contract or warranty coverage at a point in time. It cannot waive commercial terms or create a supplier remedy.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | customer, warranty, excluded service, eligibility | Scope and identify customer, warranty, excluded service, eligibility; retain event time. |
| Lifecycle and evidence | installed item or equipment, service level, usage direction, expiry | Version installed item or equipment, service level, usage direction, expiry; correct by linked event. |
| Authority and reconciliation | contract, included service, remaining entitlement, override | Name owner and acknowledgement for contract, included service, remaining entitlement, override. |

**Ownership boundary.** Service owns entitlement architecture evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Entitlement**

~~~mermaid
sequenceDiagram
    participant P1 as Service Management
    participant P2 as Sales Contract
    participant P3 as Customer Service
    P1->>P2: Entitlement submits customer identity/revision
    P2->>P2: Entitlement checks installed item or equipment authority
    P2->>P3: Entitlement requests owner decision for contract
    P3-->>P2: Entitlement acknowledges warranty or exception
    P2-->>P1: Entitlement reconciles service level chronology
    Note over P1,P3: included service remains owned by the named domain
~~~

## Chapter 46 — Service Contract Boundary

Service Management consumes Sales-owned contract references and records service allowance usage. Sales retains customer contract commerce, renewal, pricing and waiver authority.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | customer, start and end, included parts direction, renewal | Scope and identify customer, start and end, included parts direction, renewal; retain event time. |
| Lifecycle and evidence | contract reference, service level, visits direction, Sales ownership | Version contract reference, service level, visits direction, Sales ownership; correct by linked event. |
| Authority and reconciliation | coverage, included labor, usage allowance, service consumption semantics | Name owner and acknowledgement for coverage, included labor, usage allowance, service consumption semantics. |

**Ownership boundary.** Service owns service contract boundary evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Service contract**

~~~mermaid
classDiagram
    class Servicecontract1 {
      +String customer
      +String revision1
    }
    class Servicecontract2 {
      +String contractreference
      +String revision2
    }
    class Servicecontract3 {
      +String coverage
      +String revision3
    }
    class Servicecontract4 {
      +String startandend
      +String revision4
    }
    class Servicecontract5 {
      +String servicelevel
      +String revision5
    }
    Servicecontract1 "1" --> "*" Servicecontract2 : customer to contract reference
    Servicecontract2 "1" --> "*" Servicecontract3 : contract reference to coverage
    Servicecontract3 "1" --> "*" Servicecontract4 : coverage to start and end
    Servicecontract4 "1" --> "*" Servicecontract5 : start and end to service level
~~~

## Chapter 47 — Installed Base Architecture

Installed base relates a customer/site to an installed item, serial or Maintenance equipment reference. It supports service history but cannot create, move, hold, release or retire equipment.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | customer, serial, warranty reference, service history | Scope and identify customer, serial, warranty reference, service history; retain event time. |
| Lifecycle and evidence | site, equipment reference, contract reference, removal | Version site, equipment reference, contract reference, removal; correct by linked event. |
| Authority and reconciliation | installed item, installation date, configuration direction, replacement | Name owner and acknowledgement for installed item, installation date, configuration direction, replacement. |

**Ownership boundary.** Service owns installed base architecture evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Installed base**

~~~mermaid
classDiagram
    class Installedbase1 {
      +String customer
      +String revision1
    }
    class Installedbase2 {
      +String site
      +String revision2
    }
    class Installedbase3 {
      +String installeditem
      +String revision3
    }
    class Installedbase4 {
      +String serial
      +String revision4
    }
    class Installedbase5 {
      +String equipmentreference
      +String revision5
    }
    Installedbase1 "1" --> "*" Installedbase2 : customer to site
    Installedbase2 "1" --> "*" Installedbase3 : site to installed item
    Installedbase3 "1" --> "*" Installedbase4 : installed item to serial
    Installedbase4 "1" --> "*" Installedbase5 : serial to equipment reference
~~~

## Chapter 48 — Service Order Architecture

A service order authorizes scoped operational work derived from a case. It coordinates appointments, skills, parts and evidence while keeping stock, equipment and financial effects outside the aggregate.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | service order, site, priority, skills, external service | Scope and identify service order, site, priority, skills, external service; retain event time. |
| Lifecycle and evidence | source case, installed-base reference, technician, parts, status | Version source case, installed-base reference, technician, parts, status; correct by linked event. |
| Authority and reconciliation | customer, scope, appointment, tools direction, revision | Name owner and acknowledgement for customer, scope, appointment, tools direction, revision. |

**Ownership boundary.** Service owns service order architecture evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Service order**

~~~mermaid
classDiagram
    class Serviceorder1 {
      +String serviceorder
      +String revision1
    }
    class Serviceorder2 {
      +String sourcecase
      +String revision2
    }
    class Serviceorder3 {
      +String customer
      +String revision3
    }
    class Serviceorder4 {
      +String site
      +String revision4
    }
    class Serviceorder5 {
      +String installedbasereference
      +String revision5
    }
    Serviceorder1 "1" --> "*" Serviceorder2 : service order to source case
    Serviceorder2 "1" --> "*" Serviceorder3 : source case to customer
    Serviceorder3 "1" --> "*" Serviceorder4 : customer to site
    Serviceorder4 "1" --> "*" Serviceorder5 : site to installed-base reference
~~~

## Chapter 49 — Service Order Lifecycle

Service-order state separates planning, dispatch, field execution, completion, customer confirmation, operational closure and financial closure. No earlier state can stand in for a later owner decision.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | Draft, Ready, Accepted, In progress, Waiting customer, Operationally closed, Cancelled | Scope and identify Draft, Ready, Accepted, In progress, Waiting customer, Operationally closed, Cancelled; retain event time. |
| Lifecycle and evidence | Planning, Scheduled, En route, Paused, Completed, Billing pending | Version Planning, Scheduled, En route, Paused, Completed, Billing pending; correct by linked event. |
| Authority and reconciliation | Awaiting approval, Dispatched, On site, Waiting parts, Awaiting customer confirmation, Financially closed | Name owner and acknowledgement for Awaiting approval, Dispatched, On site, Waiting parts, Awaiting customer confirmation, Financially closed. |

**Ownership boundary.** Service owns service order lifecycle evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Service order lifecycle**

~~~mermaid
stateDiagram-v2
    [*] --> Draft: create Draft
    Draft --> Planning: verify Planning
    Planning --> AwaitingApproval: verify Awaiting approval
    AwaitingApproval --> Ready: verify Ready
    Ready --> Scheduled: verify Scheduled
    Scheduled --> Dispatched: verify Dispatched
    Dispatched --> Scheduled: correction or reopen
    Dispatched --> [*]: governed terminal evidence
~~~

## Chapter 50 — Field Service Scheduling and Appointment

Appointment scheduling negotiates customer access, technician eligibility, travel and parts readiness. A confirmed appointment reserves a service window, not employee attendance or successful work.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | customer availability, skill, equipment access, confirmation | Scope and identify customer availability, skill, equipment access, confirmation; retain event time. |
| Lifecycle and evidence | service window, territory direction, parts readiness, reschedule | Version service window, territory direction, parts readiness, reschedule; correct by linked event. |
| Authority and reconciliation | technician availability, travel-time direction, appointment, cancellation | Name owner and acknowledgement for technician availability, travel-time direction, appointment, cancellation. |

**Ownership boundary.** Service owns field service scheduling and appointment evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Appointment scheduling**

~~~mermaid
sequenceDiagram
    participant P1 as Service Coordinator
    participant P2 as Customer
    participant P3 as Dispatcher
    P1->>P2: Appointment scheduling submits customer availability identity/revision
    P2->>P2: Appointment scheduling checks service window authority
    P2->>P3: Appointment scheduling requests owner decision for technician availability
    P3-->>P2: Appointment scheduling acknowledges skill or exception
    P2-->>P1: Appointment scheduling reconciles territory direction chronology
    Note over P1,P3: travel-time direction remains owned by the named domain
~~~

## Chapter 51 — Technician Dispatch and Field Execution

Dispatch names an eligible technician and communicates work; field execution records arrival, work, findings, time, parts and evidence. Dispatch acknowledgement is never completion, and a technician cannot fabricate customer acceptance.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | technician assignment, travel direction, work start, findings, customer signature direction | Scope and identify technician assignment, travel direction, work start, findings, customer signature direction; retain event time. |
| Lifecycle and evidence | dispatch, arrival, pause, time, photos and documents | Version dispatch, arrival, pause, time, photos and documents; correct by linked event. |
| Authority and reconciliation | acknowledgement, check-in, completion, parts, offline direction | Name owner and acknowledgement for acknowledgement, check-in, completion, parts, offline direction. |

**Ownership boundary.** Service owns technician dispatch and field execution evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Dispatch**

~~~mermaid
sequenceDiagram
    participant P1 as Dispatcher
    participant P2 as Field Technician
    participant P3 as Service Manager
    P1->>P2: Dispatch submits technician assignment identity/revision
    P2->>P2: Dispatch checks dispatch authority
    P2->>P3: Dispatch requests owner decision for acknowledgement
    P3-->>P2: Dispatch acknowledges travel direction or exception
    P2-->>P1: Dispatch reconciles arrival chronology
    Note over P1,P3: check-in remains owned by the named domain
~~~

**Technician execution**

~~~mermaid
stateDiagram-v2
    [*] --> Dispatch: create dispatch
    Dispatch --> Acknowledgement: verify acknowledgement
    Acknowledgement --> TravelDirection: verify travel direction
    TravelDirection --> Arrival: verify arrival
    Arrival --> CheckIn: verify check-in
    CheckIn --> WorkStart: verify work start
    WorkStart --> CheckIn: correction or reopen
    WorkStart --> [*]: governed terminal evidence
~~~

## Chapter 52 — Remote Support Direction

Remote support is a consented, attributable service interaction with bounded diagnostic evidence. Remote-control tooling is Future and would require device trust, session controls and a dedicated threat review.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | remote case, technician, action direction, audit | Scope and identify remote case, technician, action direction, audit; retain event time. |
| Lifecycle and evidence | consent direction, start and end, escalation | Version consent direction, start and end, escalation; correct by linked event. |
| Authority and reconciliation | session reference, diagnostic evidence, security | Name owner and acknowledgement for session reference, diagnostic evidence, security. |

**Ownership boundary.** Service owns remote support direction evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Remote support direction**

~~~mermaid
sequenceDiagram
    participant P1 as Customer
    participant P2 as Remote Technician
    participant P3 as Security
    P1->>P2: Remote support direction submits remote case identity/revision
    P2->>P2: Remote support direction checks consent direction authority
    P2->>P3: Remote support direction requests owner decision for session reference
    P3-->>P2: Remote support direction acknowledges technician or exception
    P2-->>P1: Remote support direction reconciles start and end chronology
    Note over P1,P3: diagnostic evidence remains owned by the named domain
~~~

## Chapter 53 — Service Spare and Material Boundary

Field parts begin with a diagnosed spare requirement and end with installation, unused return or defective-part quarantine. Inventory controls technician van replenishment, serialized custody, exchange-core recovery and movement valuation; Service links case evidence to those movement acknowledgements.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | spare requirement, van stock direction, installed part, scrap direction | Scope and identify spare requirement, van stock direction, installed part, scrap direction; retain event time. |
| Lifecycle and evidence | reservation request, technician custody, removed part, Inventory ownership | Version reservation request, technician custody, removed part, Inventory ownership; correct by linked event. |
| Authority and reconciliation | issue, batch and serial, return, reconciliation | Name owner and acknowledgement for issue, batch and serial, return, reconciliation. |

**Ownership boundary.** Service owns service spare and material boundary evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Service spare flow**

~~~mermaid
sequenceDiagram
    participant P1 as Service Management
    participant P2 as Inventory
    participant P3 as Field Technician
    P1->>P2: Service spare flow submits spare requirement identity/revision
    P2->>P2: Service spare flow checks reservation request authority
    P2->>P3: Service spare flow requests owner decision for issue
    P3-->>P2: Service spare flow acknowledges van stock direction or exception
    P2-->>P1: Service spare flow reconciles technician custody chronology
    Note over P1,P3: batch and serial remains owned by the named domain
~~~

## Chapter 54 — Service Warranty Boundary

Warranty-service assessment connects customer equipment, coverage and failure evidence. Sales decides customer remedy, Procurement pursues supplier claims and Finance records financial effects.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | warranty eligibility, failure, labor, Procurement claim | Scope and identify warranty eligibility, failure, labor, Procurement claim; retain event time. |
| Lifecycle and evidence | customer equipment, service action, supplier warranty direction, Finance effect | Version customer equipment, service action, supplier warranty direction, Finance effect; correct by linked event. |
| Authority and reconciliation | coverage, parts, Sales commercial remedy, service evidence | Name owner and acknowledgement for coverage, parts, Sales commercial remedy, service evidence. |

**Ownership boundary.** Service owns service warranty boundary evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Warranty service**

~~~mermaid
sequenceDiagram
    participant P1 as Service Management
    participant P2 as Sales/Procurement
    participant P3 as Finance
    P1->>P2: Warranty service submits warranty eligibility identity/revision
    P2->>P2: Warranty service checks customer equipment authority
    P2->>P3: Warranty service requests owner decision for coverage
    P3-->>P2: Warranty service acknowledges failure or exception
    P2-->>P1: Warranty service reconciles service action chronology
    Note over P1,P3: parts remains owned by the named domain
~~~

## Chapter 55 — Service Estimate and Quotation Boundary

A technical estimate expresses labor, parts and external-service assumptions for service planning. Sales alone turns approved technical content into a priced quotation with commercial validity.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | technical estimate, external service, pricing authority, acceptance | Scope and identify technical estimate, external service, pricing authority, acceptance; retain event time. |
| Lifecycle and evidence | labor estimate, customer approval direction, validity | Version labor estimate, customer approval direction, validity; correct by linked event. |
| Authority and reconciliation | parts estimate, Sales quotation, revision | Name owner and acknowledgement for parts estimate, Sales quotation, revision. |

**Ownership boundary.** Service owns service estimate and quotation boundary evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Estimate/quotation boundary**

~~~mermaid
sequenceDiagram
    participant P1 as Service Management
    participant P2 as Sales
    participant P3 as Customer
    P1->>P2: Estimate/quotation boundary submits technical estimate identity/revision
    P2->>P2: Estimate/quotation boundary checks labor estimate authority
    P2->>P3: Estimate/quotation boundary requests owner decision for parts estimate
    P3-->>P2: Estimate/quotation boundary acknowledges external service or exception
    P2-->>P1: Estimate/quotation boundary reconciles customer approval direction chronology
    Note over P1,P3: Sales quotation remains owned by the named domain
~~~

## Chapter 56 — Service Completion and Customer Acceptance

Service completion proves the ordered work was reported; resolution addresses the case; customer confirmation records the customer response. Dispute and reopen paths preserve prior evidence rather than rewriting it.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | work completion, acceptance, partial completion, evidence | Scope and identify work completion, acceptance, partial completion, evidence; retain event time. |
| Lifecycle and evidence | resolution, dispute, follow-up | Version resolution, dispute, follow-up; correct by linked event. |
| Authority and reconciliation | customer confirmation, reopen, warranty callback direction | Name owner and acknowledgement for customer confirmation, reopen, warranty callback direction. |

**Ownership boundary.** Service owns service completion and customer acceptance evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Completion/acceptance**

~~~mermaid
sequenceDiagram
    participant P1 as Field Technician
    participant P2 as Service Manager
    participant P3 as Customer
    P1->>P2: Completion/acceptance submits work completion identity/revision
    P2->>P2: Completion/acceptance checks resolution authority
    P2->>P3: Completion/acceptance requests owner decision for customer confirmation
    P3-->>P2: Completion/acceptance acknowledges acceptance or exception
    P2-->>P1: Completion/acceptance reconciles dispute chronology
    Note over P1,P3: reopen remains owned by the named domain
~~~

## Chapter 57 — Service Billing Boundary

Service billing requests reconcile accepted work, contract/warranty coverage and Sales terms. Finance validates, invoices, posts and corrects; Service Management cannot approve its own financial consequence.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | billable labor, warranty coverage, billing request, correction | Scope and identify billable labor, warranty coverage, billing request, correction; retain event time. |
| Lifecycle and evidence | billable parts, fixed charge direction, Sales commercial terms | Version billable parts, fixed charge direction, Sales commercial terms; correct by linked event. |
| Authority and reconciliation | contract coverage, travel charge direction, Finance invoice | Name owner and acknowledgement for contract coverage, travel charge direction, Finance invoice. |

**Ownership boundary.** Service owns service billing boundary evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Service billing**

~~~mermaid
sequenceDiagram
    participant P1 as Service Management
    participant P2 as Sales
    participant P3 as Finance
    P1->>P2: Service billing submits billable labor identity/revision
    P2->>P2: Service billing checks billable parts authority
    P2->>P3: Service billing requests owner decision for contract coverage
    P3-->>P2: Service billing acknowledges warranty coverage or exception
    P2-->>P1: Service billing reconciles fixed charge direction chronology
    Note over P1,P3: travel charge direction remains owned by the named domain
~~~

## Chapter 58 — Service Profitability Boundary

Service economics compares first-time fix, travel, technician effort, spare consumption, subcontract callout, warranty recovery and contract consumption. Case and service-order estimates explain operational margin; Finance-certified revenue, posted cost and recovery settlements remain the financial result.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | service revenue, external service, contract cost, Finance-certified profitability | Scope and identify service revenue, external service, contract cost, Finance-certified profitability; retain event time. |
| Lifecycle and evidence | labor cost, travel direction, margin direction, reporting | Version labor cost, travel direction, margin direction, reporting; correct by linked event. |
| Authority and reconciliation | parts cost, warranty recovery, operational view | Name owner and acknowledgement for parts cost, warranty recovery, operational view. |

**Ownership boundary.** Service owns service profitability boundary evidence; commerce, stock, equipment and workforce records remain external.

### Architecture views

**Service profitability**

~~~mermaid
flowchart LR
    Serviceprofitabili0["Service profitability"]
    Serviceprofitabili1["service revenue"]
    Serviceprofitabili2["labor cost"]
    Serviceprofitabili3["parts cost"]
    Serviceprofitabili4["external service"]
    Serviceprofitabili5["travel direction"]
    Serviceprofitabili6["warranty recovery"]
    Serviceprofitabili0 --> Serviceprofitabili1
    Serviceprofitabili1 --> Serviceprofitabili2
    Serviceprofitabili2 --> Serviceprofitabili3
    Serviceprofitabili3 --> Serviceprofitabili4
    Serviceprofitabili4 --> Serviceprofitabili5
    Serviceprofitabili3 -- "exception" --> Serviceprofitabili6
    Serviceprofitabili6 -- "reconcile" --> Serviceprofitabili0
~~~

## Chapter 59 — Project and Service Reporting

Reporting publishes certified read models over project and service facts, domain acknowledgements and formula versions. Dashboards do not mutate source records or silently combine operational and financial measures.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | project status, resource utilization, project profitability, resolution time, field utilization, reporting boundary | Scope and identify project status, resource utilization, project profitability, resolution time, field utilization, reporting boundary; retain event time. |
| Lifecycle and evidence | schedule variance, timesheet aging, case volume, first-time-fix direction, parts usage | Version schedule variance, timesheet aging, case volume, first-time-fix direction, parts usage; correct by linked event. |
| Authority and reconciliation | cost variance direction, billing backlog, SLA compliance, repeat service, contract profitability | Name owner and acknowledgement for cost variance direction, billing backlog, SLA compliance, repeat service, contract profitability. |

**Ownership boundary.** Reporting owns certified read models and formula publication; Project, Service and cross-domain source owners retain event correction authority.

### Architecture views

**Project reporting**

~~~mermaid
flowchart LR
    Projectreporting0["Project reporting"]
    Projectreporting1["project status"]
    Projectreporting2["schedule variance"]
    Projectreporting3["cost variance direction"]
    Projectreporting4["resource utilization"]
    Projectreporting5["timesheet aging"]
    Projectreporting6["billing backlog"]
    Projectreporting0 --> Projectreporting1
    Projectreporting1 --> Projectreporting2
    Projectreporting2 --> Projectreporting3
    Projectreporting3 --> Projectreporting4
    Projectreporting4 --> Projectreporting5
    Projectreporting3 -- "exception" --> Projectreporting6
    Projectreporting6 -- "reconcile" --> Projectreporting0
~~~

**Service reporting**

~~~mermaid
flowchart LR
    Servicereporting0["Service reporting"]
    Servicereporting1["schedule variance"]
    Servicereporting2["cost variance direction"]
    Servicereporting3["resource utilization"]
    Servicereporting4["timesheet aging"]
    Servicereporting5["billing backlog"]
    Servicereporting6["project profitability"]
    Servicereporting0 --> Servicereporting1
    Servicereporting1 --> Servicereporting2
    Servicereporting2 --> Servicereporting3
    Servicereporting3 --> Servicereporting4
    Servicereporting4 --> Servicereporting5
    Servicereporting3 -- "exception" --> Servicereporting6
    Servicereporting6 -- "reconcile" --> Servicereporting0
~~~

## Chapter 60 — Project and Service Reconciliation

Reconciliation closes the gap between request and owning-domain acknowledgement without copying records across boundaries. Every unmatched quantity, state, acceptance or billing reference has an age and accountable owner.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | Project to Sales, Project to Procurement, Service to Finance, time, acceptance | Scope and identify Project to Sales, Project to Procurement, Service to Finance, time, acceptance; retain event time. |
| Lifecycle and evidence | Project to Finance, Project to Manufacturing, Service to Inventory, cost, exceptions | Version Project to Finance, Project to Manufacturing, Service to Inventory, cost, exceptions; correct by linked event. |
| Authority and reconciliation | Project to Inventory, Service to Sales, Service to Maintenance, billing, aging | Name owner and acknowledgement for Project to Inventory, Service to Sales, Service to Maintenance, billing, aging. |

**Ownership boundary.** Reconciliation records mismatch and acknowledgement state; it never repairs a variance by directly editing the other domain.

### Architecture views

**Project-to-Finance reconciliation**

~~~mermaid
sequenceDiagram
    participant P1 as Project Cost Evidence
    participant P2 as Project Reconciler
    participant P3 as Finance Ledger
    P1->>P2: submit WBS cost attribution
    P2->>P3: compare posted journal and commitment cut-off
    P3-->>P2: return ledger document or account exception
    P2-->>P1: certify project cost bridge
~~~

**Project-to-Inventory reconciliation**

~~~mermaid
sequenceDiagram
    participant P1 as Project Materials
    participant P2 as Project Reconciler
    participant P3 as Inventory Movement
    P1->>P2: submit WBS site demand and surplus
    P2->>P3: compare pick ticket goods issue and unused return
    P3-->>P2: return allocation shortage or batch exception
    P2-->>P1: close project-material bridge
~~~

**Project-to-Procurement reconciliation**

~~~mermaid
sequenceDiagram
    participant P1 as Project Demand
    participant P2 as Project Reconciler
    participant P3 as Purchase Commitment
    P1->>P2: submit project requisition demand
    P2->>P3: compare purchase order commitment and supplier milestone
    P3-->>P2: return cancellation or subcontract exception
    P2-->>P1: close committed-cost bridge
~~~

**Project-to-Manufacturing reconciliation**

~~~mermaid
sequenceDiagram
    participant P1 as Project Requirement
    participant P2 as Project Reconciler
    participant P3 as Production Order
    P1->>P2: submit project demand revision
    P2->>P3: compare production order WIP completion and genealogy
    P3-->>P2: return schedule or as-built exception
    P2-->>P1: close make-to-project bridge
~~~

**Service-to-Sales reconciliation**

~~~mermaid
sequenceDiagram
    participant P1 as Completed Service Case
    participant P2 as Commercial Liaison
    participant P3 as Customer Order Desk
    P1->>P2: submit accepted repair outcome and estimate reference
    P2->>P3: compare customer order coverage quotation amendment and goodwill
    P3-->>P2: return commercial rejection or credit instruction
    P2-->>P1: close customer-service obligation bridge
~~~

**Service-to-Finance reconciliation**

~~~mermaid
sequenceDiagram
    participant P1 as Service Cost Evidence
    participant P2 as Service Reconciler
    participant P3 as Finance Ledger
    P1->>P2: submit technician and contract cost evidence
    P2->>P3: compare posting warranty recovery and revenue cut-off
    P3-->>P2: return journal or certification exception
    P2-->>P1: close service margin bridge
~~~

**Service-to-Inventory reconciliation**

~~~mermaid
sequenceDiagram
    participant P1 as Service Spare Custody
    participant P2 as Service Reconciler
    participant P3 as Inventory Movement
    P1->>P2: submit diagnosed part and exchange core
    P2->>P3: compare technician van custody installed serial and defective quarantine
    P3-->>P2: return replenishment or field-loss exception
    P2-->>P1: close service-spares bridge
~~~

**Service-to-Maintenance reconciliation**

~~~mermaid
sequenceDiagram
    participant P1 as Service Observation
    participant P2 as Service Reconciler
    participant P3 as Maintenance Equipment
    P1->>P2: submit equipment observation and downtime
    P2->>P3: compare equipment identity condition and maintenance work
    P3-->>P2: return ownership or history exception
    P2-->>P1: close equipment-service bridge
~~~

**Timesheet reconciliation**

~~~mermaid
sequenceDiagram
    participant P1 as Approved Timesheet
    participant P2 as Time Reconciler
    participant P3 as Payroll Attendance
    P1->>P2: submit approved task hours
    P2->>P3: compare attendance leave overtime and payroll export
    P3-->>P2: return period or employee exception
    P2-->>P1: close workforce-time bridge
~~~

**Billing reconciliation**

~~~mermaid
sequenceDiagram
    participant P1 as Project Billing Pack
    participant P2 as Invoice Control
    participant P3 as Receivables Posting
    P1->>P2: submit fixed-price gate or approved labor quantity
    P2->>P3: compare invoice line tax receivable journal and accounting period
    P3-->>P2: return duplicate charge or posting cut-off exception
    P2-->>P1: close project-billing control account
~~~

## Chapter 61 — Project and Service Security and SoD

Security applies tenant, company, customer, project, service organization and purpose scope at every command and read model. Segregation prevents creators, submitters, executors and commercial/financial approvers from collapsing into one uncontrolled action.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | project creator and approver, timesheet submitter and approver, dispatcher and technician, Inventory issue, contractor access, cross-customer access, AI restrictions | Scope and identify project creator and approver, timesheet submitter and approver, dispatcher and technician, Inventory issue, contractor access, cross-customer access, AI restrictions; retain event time. |
| Lifecycle and evidence | Project Manager and Finance posting, expense claimant and approver, resolver and commercial credit, Maintenance release, portal access, break glass | Version Project Manager and Finance posting, expense claimant and approver, resolver and commercial credit, Maintenance release, portal access, break glass; correct by linked event. |
| Authority and reconciliation | resource requester and allocator, customer acceptance, Sales quotation, Finance invoice, cross-project access, audit | Name owner and acknowledgement for resource requester and allocator, customer acceptance, Sales quotation, Finance invoice, cross-project access, audit. |

**Ownership boundary.** Business approval cannot override tenant/customer scope, incompatible duties or a domain owner’s authorization rule.

### Architecture views

**Project SoD**

~~~mermaid
flowchart LR
    ProjectSoD0["Project SoD"]
    ProjectSoD1["project creator and approver"]
    ProjectSoD2["Project Manager and Finance posting"]
    ProjectSoD3["resource requester and allocator"]
    ProjectSoD4["timesheet submitter and approver"]
    ProjectSoD5["expense claimant and approver"]
    ProjectSoD6["customer acceptance"]
    ProjectSoD0 --> ProjectSoD1
    ProjectSoD1 --> ProjectSoD2
    ProjectSoD2 --> ProjectSoD3
    ProjectSoD3 --> ProjectSoD4
    ProjectSoD4 --> ProjectSoD5
    ProjectSoD3 -- "exception" --> ProjectSoD6
    ProjectSoD6 -- "reconcile" --> ProjectSoD0
~~~

**Service SoD**

~~~mermaid
flowchart LR
    ServiceSoD0["Service SoD"]
    ServiceSoD1["Project Manager and Finance posting"]
    ServiceSoD2["resource requester and allocator"]
    ServiceSoD3["timesheet submitter and approver"]
    ServiceSoD4["expense claimant and approver"]
    ServiceSoD5["customer acceptance"]
    ServiceSoD6["dispatcher and technician"]
    ServiceSoD0 --> ServiceSoD1
    ServiceSoD1 --> ServiceSoD2
    ServiceSoD2 --> ServiceSoD3
    ServiceSoD3 --> ServiceSoD4
    ServiceSoD4 --> ServiceSoD5
    ServiceSoD3 -- "exception" --> ServiceSoD6
    ServiceSoD6 -- "reconcile" --> ServiceSoD0
~~~

**Customer portal security**

~~~mermaid
flowchart LR
    Customerportalsecu0["Customer portal security"]
    Customerportalsecu1["resource requester and allocator"]
    Customerportalsecu2["timesheet submitter and approver"]
    Customerportalsecu3["expense claimant and approver"]
    Customerportalsecu4["customer acceptance"]
    Customerportalsecu5["dispatcher and technician"]
    Customerportalsecu6["resolver and commercial credit"]
    Customerportalsecu0 --> Customerportalsecu1
    Customerportalsecu1 --> Customerportalsecu2
    Customerportalsecu2 --> Customerportalsecu3
    Customerportalsecu3 --> Customerportalsecu4
    Customerportalsecu4 --> Customerportalsecu5
    Customerportalsecu3 -- "exception" --> Customerportalsecu6
    Customerportalsecu6 -- "reconcile" --> Customerportalsecu0
~~~

## Chapter 62 — Project and Service Threat Model

The threat model treats delivery evidence, customer data, time, SLA clocks, stock requests and billing eligibility as high-value targets. AI and customization are denied consequential commands at domain boundaries.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | fake task completion, expense manipulation, resource over-allocation, case deletion, fake field evidence, warranty misuse, direct domain writes | Scope and identify fake task completion, expense manipulation, resource over-allocation, case deletion, fake field evidence, warranty misuse, direct domain writes; retain event time. |
| Lifecycle and evidence | false milestone completion, unauthorized rebaseline, fake customer acceptance, SLA clock manipulation, spare theft, customer leakage, AI approval | Version false milestone completion, unauthorized rebaseline, fake customer acceptance, SLA clock manipulation, spare theft, customer leakage, AI approval; correct by linked event. |
| Authority and reconciliation | timesheet inflation, budget concealment, billing manipulation, unauthorized closure, installed-base tampering, cross-tenant leakage, AI billing | Name owner and acknowledgement for timesheet inflation, budget concealment, billing manipulation, unauthorized closure, installed-base tampering, cross-tenant leakage, AI billing. |

**Ownership boundary.** Security denies direct cross-domain and AI consequential writes even when a user-facing workflow suggests the action.

### Architecture views

**Threat model**

~~~mermaid
flowchart LR
    Threatmodel0["Threat model"]
    Threatmodel1["fake task completion"]
    Threatmodel2["false milestone completion"]
    Threatmodel3["timesheet inflation"]
    Threatmodel4["expense manipulation"]
    Threatmodel5["unauthorized rebaseline"]
    Threatmodel6["budget concealment"]
    Threatmodel0 --> Threatmodel1
    Threatmodel1 --> Threatmodel2
    Threatmodel2 --> Threatmodel3
    Threatmodel3 --> Threatmodel4
    Threatmodel4 --> Threatmodel5
    Threatmodel3 -- "exception" --> Threatmodel6
    Threatmodel6 -- "reconcile" --> Threatmodel0
~~~

**AI restriction flow**

~~~mermaid
sequenceDiagram
    participant P1 as AI Assistant
    participant P2 as Policy Enforcement
    participant P3 as Accountable Human
    P1->>P2: AI restriction flow submits false milestone completion identity/revision
    P2->>P2: AI restriction flow checks timesheet inflation authority
    P2->>P3: AI restriction flow requests owner decision for expense manipulation
    P3-->>P2: AI restriction flow acknowledges unauthorized rebaseline or exception
    P2-->>P1: AI restriction flow reconciles budget concealment chronology
    Note over P1,P3: resource over-allocation remains owned by the named domain
~~~

## Chapter 63 — Capability, Risk, Example and Governance Models

The governance catalogs convert the narrative into testable capability, risk, example, responsibility, decision and evidence registers. Numeric completeness does not replace semantic review.

### Catalog interpretation

The following catalogs are normative review instruments. Status is individually evidence-based, risk records state a concrete trigger and consequence, examples preserve all eight cross-domain request boundaries, ADRs state an architectural choice and rejected unsafe consequence, and open decisions state exactly what evidence is missing. Catalog identifiers are stable for review comments and future implementation traceability.

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | capability matrix, RACI, open decisions | Scope and identify capability matrix, RACI, open decisions; retain event time. |
| Lifecycle and evidence | risk register, current versus target | Version risk register, current versus target; correct by linked event. |
| Authority and reconciliation | example catalog, ADR register | Name owner and acknowledgement for example catalog, ADR register. |

**Ownership boundary.** Catalog status is evidence-based; target detail is not implementation evidence.

### Capability matrix

| Capability | Current status | Repository evidence | Accountable owner | Supporting roles | Boundary statement |
|---|---|---|---|---|---|
| Tenant identity | Implemented foundation | [Tenant model](../../apps/api/prisma/schema.prisma#L86); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql); [foundation tests](../../apps/api/test/foundation.spec.ts) | Platform Engineering | Project / Service / Security | Tenant identity is implemented; no project or service aggregate is implied. |
| Company identity | Implemented foundation | [Company model](../../apps/api/prisma/schema.prisma#L178); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql); [company service](../../apps/api/src/companies/companies.service.ts) | Organization Governance | Project / Service / Finance | Projects and cases reference company context; Organization Governance owns company identity. |
| Plant identity | Implemented foundation | [Plant model](../../apps/api/prisma/schema.prisma#L383); [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql); [organization tests](../../apps/api/test/organization.spec.ts) | Operations | Project / Service / Manufacturing | Plant scope is reusable; project delivery and service territory behavior remain Planned. |
| Business-unit identity | Implemented foundation | [BusinessUnit model](../../apps/api/prisma/schema.prisma#L459); [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql); [organization service](../../apps/api/src/organization/organization-entities.service.ts) | Organization Governance | Project / Service | Business-unit identity can scope delivery without becoming a project office. |
| Department identity | Implemented foundation | [Department model](../../apps/api/prisma/schema.prisma#L496); [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql); [organization tests](../../apps/api/test/organization.spec.ts) | Organization Governance | Project / Service / HR/Workforce | Department identity exists; service organization and project office authority do not. |
| Location identity | Implemented foundation | [Location model](../../apps/api/prisma/schema.prisma#L598); [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql); [organization service](../../apps/api/src/organization/organization-entities.service.ts) | Organization Governance | Project / Service / Operations | Location context is implemented but is not a customer site, appointment or installed-base runtime. |
| Cost-center identity | Implemented foundation | [CostCenter model](../../apps/api/prisma/schema.prisma#L638); [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql); [organization tests](../../apps/api/test/organization.spec.ts) | Finance | Project / Service / Cost Accounting | Finance owns cost-center identity; delivery records may reference it but cannot post cost. |
| Profit-center identity | Implemented foundation | [ProfitCenter model](../../apps/api/prisma/schema.prisma#L670); [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql); [organization service](../../apps/api/src/organization/organization-entities.service.ts) | Finance | Project / Service / Reporting | Profit-center reference does not implement profitability certification. |
| User identity | Implemented foundation | [User model](../../apps/api/prisma/schema.prisma#L852); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql); [authentication service](../../apps/api/src/auth/auth.service.ts) | Security | Project / Service / HR/Workforce | Authenticated user identity exists; employee eligibility, attendance and payroll remain outside it. |
| Organization access scope | Implemented foundation | [UserOrganizationAccess](../../apps/api/prisma/schema.prisma#L798); [organization scope service](../../apps/api/src/organization/organization-scope.service.ts); [scope tests](../../apps/api/test/organization.spec.ts) | Security | Project / Service / Organization Governance | Organization scope is enforced; customer/project/case purpose scope remains Planned. |
| Business-partner identity | Implemented foundation | [BusinessPartner model](../../apps/api/prisma/schema.prisma#L2135); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [master-data tests](../../apps/api/test/master-data.spec.ts) | Master Data Governance | Sales / Procurement / Project / Service | Shared partner identity supports references but not a project contract or service entitlement. |
| Customer identity | Implemented foundation | [Customer model](../../apps/api/prisma/schema.prisma#L1485); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [customer validation tests](../../apps/api/test/master-data.spec.ts) | Sales | Project / Service / Customer Service | Sales owns customer commerce; Project and Service consume the governed customer reference. |
| Supplier identity | Implemented foundation | [Supplier model](../../apps/api/prisma/schema.prisma#L1459); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [supplier validation tests](../../apps/api/test/master-data.spec.ts) | Procurement | Project / Service / Supplier Management | Supplier identity does not authorize a project or service purchase order. |
| Contact identity | Implemented foundation | [ContactPerson model](../../apps/api/prisma/schema.prisma#L1603); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [master-data registry](../../apps/api/src/master-data/master-data.registry.ts) | Master Data Governance | Customer Service / Sales / Service | Contact identity supports intake; contact authorization and portal access remain Planned. |
| Item identity | Implemented foundation | [Item model](../../apps/api/prisma/schema.prisma#L1385); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [master-data service](../../apps/api/src/master-data/master-data.service.ts) | Master Data Governance | Project / Service / Inventory | Item identity is reusable; project material and service spare movement remain Inventory-owned. |
| Unit-of-measure master | Implemented foundation | [UnitOfMeasure model](../../apps/api/prisma/schema.prisma#L1648); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [UOM tests](../../apps/api/test/master-data.spec.ts) | Master Data Governance | Project / Service / Inventory | UOM identity and validation exist; time, quantity and billing semantics remain target contracts. |
| Warehouse identity | Implemented foundation | [Warehouse model](../../apps/api/prisma/schema.prisma#L818); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [warehouse tests](../../apps/api/test/master-data.spec.ts) | Inventory | Project / Service / Warehouse | Warehouse identity does not provide stock balance, van stock, reservation or movement. |
| Batch identity | Implemented foundation | [Batch model](../../apps/api/prisma/schema.prisma#L1878); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [batch tests](../../apps/api/test/master-data.spec.ts) | Inventory | Project / Service / Quality | Batch master supports traceability references; custody and consumption remain absent. |
| Serial-number identity and warranty dates | Implemented foundation | [SerialNumber model](../../apps/api/prisma/schema.prisma#L1899); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [serial tests](../../apps/api/test/master-data.spec.ts) | Inventory | Service / Maintenance / Sales | Stock serial and warranty-date fields exist; installed base, entitlement and equipment authority remain Planned. |
| Payment-term master | Implemented foundation | [PaymentTerm model](../../apps/api/prisma/schema.prisma#L2024); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [payment-term tests](../../apps/api/test/master-data.spec.ts) | Sales / Finance | Project / Service | Payment terms are reference masters and do not implement project or service billing. |
| Enterprise object registry | Scaffold | [EnterpriseObject model](../../apps/api/prisma/schema.prisma#L1025); [registry service](../../apps/api/src/enterprise-objects/enterprise-objects.service.ts); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql) | Platform Engineering | Project / Service / Data Governance | Generic object metadata can register future aggregates but executes none of their invariants. |
| Generic transaction document | Scaffold | [TransactionDocument model](../../apps/api/prisma/schema.prisma#L2320); [transaction service](../../apps/api/src/transactions/transactions.service.ts); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql) | Platform Engineering | Project / Service / Integration | The shared document has no project, task, case, SLA, entitlement or service-order semantics. |
| Generic transaction links | Scaffold | [TransactionLink model](../../apps/api/prisma/schema.prisma#L2345); [transaction service](../../apps/api/src/transactions/transactions.service.ts) | Platform Engineering | Project / Service / Data Governance | Generic links do not enforce WBS genealogy, case conversion or cross-domain reconciliation. |
| Workflow definition metadata | Scaffold | [WorkflowDefinition model](../../apps/api/prisma/schema.prisma#L1135); [workflow service](../../apps/api/src/workflows/workflows.service.ts); [foundation tests](../../apps/api/test/foundation.spec.ts) | Platform Engineering | Project / Service / Security | Versioned definitions exist without runtime project/service instances, timers or lifecycle guards. |
| Generic approval request | Scaffold | [ApprovalRequest model](../../apps/api/prisma/schema.prisma#L1300); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql) | Platform Engineering | Project / Service / Internal Audit | The generic record does not establish project, baseline, time, expense, service or acceptance authority. |
| Number-series foundation | Scaffold | [NumberSeries model](../../apps/api/prisma/schema.prisma#L1330); [number-series service](../../apps/api/src/number-series/number-series.service.ts); [foundation tests](../../apps/api/test/foundation.spec.ts) | Platform Engineering | Project / Service / Data Governance | Concurrency-safe numbering exists; project, case and service-order series remain unconfigured. |
| Append-only audit foundation | Implemented foundation | [AuditLog model](../../apps/api/prisma/schema.prisma#L1357); [audit service](../../apps/api/src/audit/audit.service.ts); [audit tests](../../apps/api/test/foundation.spec.ts) | Security | Project / Service / Internal Audit | Audit capture and redaction are implemented; domain event completeness and retention remain Planned. |
| Digital DNA foundation | Scaffold | [Digital DNA service](../../apps/api/src/digital-dna/digital-dna.service.ts); [foundation report](../implementation/DBA-002-foundation-implementation.md) | Data Governance | Project / Service | Identity generation is reusable, but project/service DNA types and collision policy are absent. |
| Report definition metadata | Scaffold | [ReportDefinition model](../../apps/api/prisma/schema.prisma#L1226); [report service](../../apps/api/src/reports/reports.service.ts) | Reporting | Project / Service / Finance | Report metadata and generic preview do not implement certified delivery, SLA or profitability measures. |
| Dashboard summary | Partial | [Dashboard service](../../apps/api/src/dashboard/dashboard.service.ts); [generic transaction model](../../apps/api/prisma/schema.prisma#L2320) | Reporting | Project / Service / Operations | A dashboard exists but exposes no accepted project or service measures. |
| Sales and purchasing object registrations | Registered metadata only | [Seed registrations](../../apps/api/prisma/seed.ts#L21); [EnterpriseObject model](../../apps/api/prisma/schema.prisma#L1025) | Platform Engineering | Sales / Procurement / Project / Service | SALES_ORDER and PURCHASE_ORDER names are registry metadata, not operational commerce. |
| WORK_ORDER transaction kind | Registered metadata only | [TransactionKind.WORK_ORDER](../../apps/api/prisma/schema.prisma#L67); [seed registration](../../apps/api/prisma/seed.ts#L27) | Platform Engineering | Manufacturing / Project / Service | The generic Manufacturing work-order token is not a project task or service order. |
| SERVICE item classification | Registered metadata only | [Service item seed](../../apps/api/prisma/seed.ts#L231); [Item model](../../apps/api/prisma/schema.prisma#L1385) | Master Data Governance | Service / Sales / Procurement | A service item category classifies an Item and provides no case, entitlement or service execution. |
| Project Master Architecture — project identity | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Master Architecture — project code | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Master Architecture — project type | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Master Architecture — customer reference | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Master Architecture — internal project | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Master Architecture — company and plant | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Master Architecture — business unit | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Master Architecture — Project Manager | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Master Architecture — dates | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Master Architecture — currency | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Master Architecture — cost center | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Master Architecture — profit center | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Master Architecture — commercial reference | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Master Architecture — status | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Master Architecture — version | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Master Architecture — attachments | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Program and Portfolio Direction — program | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Program and Portfolio Direction — portfolio | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Program and Portfolio Direction — project grouping | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Program and Portfolio Direction — strategic theme | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Program and Portfolio Direction — sponsor | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Program and Portfolio Direction — business owner | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Program and Portfolio Direction — funding reference | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Program and Portfolio Direction — priority | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Program and Portfolio Direction — dependency | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Program and Portfolio Direction — status review | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Program and Portfolio Direction — governance | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Hierarchy and WBS — project | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Hierarchy and WBS — phase | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Hierarchy and WBS — WBS | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Hierarchy and WBS — work package | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Hierarchy and WBS — task | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Hierarchy and WBS — subtask | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Hierarchy and WBS — milestone | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Hierarchy and WBS — parent child | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Hierarchy and WBS — effective structure | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Hierarchy and WBS — responsible role | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Hierarchy and WBS — cost object | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Hierarchy and WBS — deliverable | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Hierarchy and WBS — history | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Lifecycle — Proposed | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Lifecycle — Draft | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Lifecycle — Under review | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Lifecycle — Approved | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Lifecycle — Planned | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Lifecycle — Active | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Lifecycle — On hold | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Lifecycle — At risk | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Lifecycle — Partially delivered | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Lifecycle — Operationally complete | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Lifecycle — Awaiting customer acceptance | Planned | Absent: no dedicated schema, runtime or accepted test. | Security | Project / Service / Internal Audit | Security owns the record; delivery consumes acknowledgement. |
| Project Lifecycle — Accepted | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Lifecycle — Financial close pending | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Lifecycle — Financially closed | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Lifecycle — Cancelled | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Lifecycle — Archived | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Approval and Initiation — business justification | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Approval and Initiation — commercial reference | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Approval and Initiation — scope | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Approval and Initiation — budget reference | Planned | Absent: no dedicated schema, runtime or accepted test. | Finance | Project / Service / Sales / Cost Accounting | Delivery requests; Finance posts and certifies. |
| Project Approval and Initiation — resource readiness | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Approval and Initiation — procurement need | Planned | Absent: no dedicated schema, runtime or accepted test. | Procurement | Project / Service / Supplier Management | Delivery requests; Procurement owns supplier commerce. |
| Project Approval and Initiation — material need | Planned | Absent: no dedicated schema, runtime or accepted test. | Inventory | Project / Service / Warehouse | Delivery requests; Inventory owns stock/value. |
| Project Approval and Initiation — risk | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Approval and Initiation — approval | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Approval and Initiation — baseline authorization | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Approval and Initiation — start permission | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scope and Deliverables — scope statement | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scope and Deliverables — deliverable | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scope and Deliverables — acceptance criteria | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scope and Deliverables — owner | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scope and Deliverables — due date | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scope and Deliverables — dependency | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scope and Deliverables — document | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scope and Deliverables — revision | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scope and Deliverables — change impact | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scope and Deliverables — acceptance boundary | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Task Architecture — task identity | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Task Architecture — WBS reference | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Task Architecture — owner | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Task Architecture — responsible resource | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Task Architecture — dates | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Task Architecture — duration | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Task Architecture — dependency | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Task Architecture — priority | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Task Architecture — deliverable | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Task Architecture — status | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Task Architecture — progress | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Task Architecture — completion evidence | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Milestone Architecture — milestone | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Milestone Architecture — due date | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Milestone Architecture — dependency | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Milestone Architecture — approval | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Milestone Architecture — completion criteria | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Milestone Architecture — customer acceptance requirement | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Milestone Architecture — billing trigger direction | Planned | Absent: no dedicated schema, runtime or accepted test. | Finance | Project / Service / Sales / Cost Accounting | Delivery requests; Finance posts and certifies. |
| Project Milestone Architecture — delay | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Milestone Architecture — reforecast | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Milestone Architecture — history | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scheduling — task dates | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scheduling — predecessor | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scheduling — successor | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scheduling — lead and lag | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scheduling — constraint | Planned | Absent: no dedicated schema, runtime or accepted test. | Security | Project / Service / Internal Audit | Security owns the record; delivery consumes acknowledgement. |
| Project Scheduling — calendar | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scheduling — critical path direction | Future | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scheduling — float direction | Future | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scheduling — rescheduling | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scheduling — schedule version | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Scheduling — approval | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Baseline Architecture — scope baseline | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Baseline Architecture — schedule baseline | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Baseline Architecture — cost baseline | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Baseline Architecture — resource baseline | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Baseline Architecture — approval | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Baseline Architecture — version | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Baseline Architecture — effective date | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Baseline Architecture — variance | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Baseline Architecture — rebaseline | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Baseline Architecture — history | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Change Control — change request | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Change Control — source | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Change Control — scope impact | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Change Control — schedule impact | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Change Control — cost impact | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Change Control — resource impact | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Change Control — commercial impact | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Change Control — customer impact | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Change Control — risk impact | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Change Control — approval | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Change Control — baseline update | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Change Control — closure | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Resource Demand — role | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Resource Demand — skill | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Resource Demand — quantity or FTE | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Resource Demand — date range | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Resource Demand — location | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Resource Demand — project task | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Resource Demand — priority | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Resource Demand — cost-rate reference | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Resource Demand — named or generic resource | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Resource Demand — request | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Resource Demand — fulfillment | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Project Resource Demand — shortage | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Resource Allocation Boundary — resource request | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Resource Allocation Boundary — candidate | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Resource Allocation Boundary — availability | Planned | Absent: no dedicated schema, runtime or accepted test. | Security | Project / Service / Internal Audit | Security owns the record; delivery consumes acknowledgement. |
| Resource Allocation Boundary — assignment | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Resource Allocation Boundary — partial allocation | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Resource Allocation Boundary — over-allocation | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Resource Allocation Boundary — release | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Resource Allocation Boundary — reassignment | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Resource Allocation Boundary — HR workforce boundary | Planned | Absent: no dedicated schema, runtime or accepted test. | HR/Workforce | Project / Service / Resource Management | HR/Workforce owns the record; delivery consumes acknowledgement. |
| Resource Allocation Boundary — project authority | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Resource Allocation Boundary — audit | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Capacity and Utilization Direction — capacity | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Capacity and Utilization Direction — availability | Planned | Absent: no dedicated schema, runtime or accepted test. | Security | Project / Service / Internal Audit | Security owns the record; delivery consumes acknowledgement. |
| Capacity and Utilization Direction — allocation | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Capacity and Utilization Direction — utilization | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Capacity and Utilization Direction — billable direction | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Capacity and Utilization Direction — internal project | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Capacity and Utilization Direction — service work | Planned | Absent: no dedicated schema, runtime or accepted test. | Service Management | Customer Service / Field Service / Sales | Service owns execution; foreign effects need acknowledgement. |
| Capacity and Utilization Direction — maintenance work | Planned | Absent: no dedicated schema, runtime or accepted test. | Service Management | Service / Asset Management | Service owns execution; foreign effects need acknowledgement. |
| Capacity and Utilization Direction — manufacturing work | Planned | Absent: no dedicated schema, runtime or accepted test. | Manufacturing | Project / Engineering / Inventory | Manufacturing owns the record; delivery consumes acknowledgement. |
| Capacity and Utilization Direction — leave dependency | Planned | Absent: no dedicated schema, runtime or accepted test. | HR/Workforce | Project / Service / Resource Management | HR/Workforce owns the record; delivery consumes acknowledgement. |
| Capacity and Utilization Direction — reporting boundary | Planned | Absent: no dedicated schema, runtime or accepted test. | Reporting | Project / Service / Finance | Reporting owns the record; delivery consumes acknowledgement. |
| Time Capture Architecture — person | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Time Capture Architecture — date | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Time Capture Architecture — project | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Time Capture Architecture — task | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Time Capture Architecture — service order or case | Planned | Absent: no dedicated schema, runtime or accepted test. | Service Management | Customer Service / Field Service / Sales | Service owns execution; foreign effects need acknowledgement. |
| Time Capture Architecture — duration | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Time Capture Architecture — start and end | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Time Capture Architecture — work type | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Time Capture Architecture — billable direction | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Time Capture Architecture — location | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |
| Time Capture Architecture — source | Planned | Absent: no dedicated schema, runtime or accepted test. | Project Management | PMO / Resource Management / Operations | Project owns delivery; foreign effects need acknowledgement. |

### Risk register

| ID | Area | Risk | Condition | Impact | Likelihood | Severity | Mitigation | Owner | Residual-risk direction |
|---|---|---|---|---|---|---|---|---|---|
| R-001 | Project governance | unauthorized project activation | Unauthorized project activation: actor lacks the required grant in unauthorized project activation evidence boundary. | Unauthorized project activation: unauthorized project activation leaves the accountable owner without proof. | Unlikely | Severe | Prevent unauthorized project activation: require independent authority and immutable approval; quarantine R-001. | PMO | Downward; delay. |
| R-002 | Project governance | duplicate project identity | Duplicate project identity: one causal key resolves twice in duplicate project identity evidence boundary. | Duplicate project identity: duplicate project identity leaves the accountable owner without proof. | Likely | Moderate | Prevent duplicate project identity: enforce key uniqueness and identity quarantine; quarantine R-002. | PMO | Downward; collusion. |
| R-003 | Project governance | portfolio priority collision | Portfolio priority collision: valid claims compete for one capacity in portfolio priority collision evidence boundary. | Portfolio priority collision: portfolio priority collision leaves the accountable owner without proof. | Possible | Major | Prevent portfolio priority collision: validate revision and preserve correction lineage; quarantine R-003. | PMO | Downward; source quality. |
| R-004 | Project governance | unfunded charter approval | Unfunded charter approval: retry or stale state violates the named control in sponsor business case budget envelope funding gate. | Unfunded charter approval: delivery activates without committed financial capacity. | Unlikely | Severe | Prevent unfunded charter approval: validate revision and preserve correction lineage; quarantine R-004. | PMO | Downward; delay. |
| R-005 | Project governance | sponsor vacancy | Sponsor vacancy: retry or stale state violates the named control in executive accountability escalation benefits decision vacancy. | Sponsor vacancy: project lacks authority for major trade-offs. | Likely | Moderate | Prevent sponsor vacancy: validate revision and preserve correction lineage; quarantine R-005. | PMO | Downward; collusion. |
| R-006 | Project governance | project-manager conflict | Project-manager conflict: retry or stale state violates the named control in baseline budget vendor approval personal interest disclosure. | Project-manager conflict: delivery choices serve a conflicted decision maker. | Possible | Major | Prevent project-manager conflict: validate revision and preserve correction lineage; quarantine R-006. | PMO | Downward; source quality. |
| R-007 | Project governance | uncontrolled project closure | Uncontrolled project closure: retry or stale state violates the named control in open deliverables contracts materials costs archive checklist. | Uncontrolled project closure: unfinished obligations disappear from active governance. | Unlikely | Severe | Prevent uncontrolled project closure: validate revision and preserve correction lineage; quarantine R-007. | PMO | Downward; delay. |
| R-008 | Project governance | program dependency omission | Program dependency omission: required evidence is never emitted in program dependency omission evidence boundary. | Program dependency omission: program dependency omission leaves the accountable owner without proof. | Likely | Moderate | Prevent program dependency omission: validate revision and preserve correction lineage; quarantine R-008. | PMO | Downward; collusion. |
| R-009 | Project governance | portfolio capacity overstatement | Portfolio capacity overstatement: quantity exceeds acknowledged sources in portfolio capacity overstatement workforce allocation boundary. | Portfolio capacity overstatement: promise exceeds eligible workforce capacity. | Possible | Major | Prevent portfolio capacity overstatement: validate revision and preserve correction lineage; quarantine R-009. | PMO | Downward; source quality. |
| R-010 | Project governance | project type misclassification | Project type misclassification: retry or stale state violates the named control in project type misclassification project authority boundary. | Project type misclassification: project delivery authority becomes unprovable. | Unlikely | Severe | Prevent project type misclassification: validate revision and preserve correction lineage; quarantine R-010. | PMO | Downward; delay. |
| R-011 | Project governance | cross-company project leakage | Cross-company project leakage: scope exposes another purpose in cross-company project leakage evidence boundary. | Cross-company project leakage: cross-company project leakage leaves the accountable owner without proof. | Likely | Moderate | Prevent cross-company project leakage: validate revision and preserve correction lineage; quarantine R-011. | PMO | Downward; collusion. |
| R-012 | Project governance | customer project visibility overshare | Customer project visibility overshare: retry or stale state violates the named control in customer project visibility overshare evidence boundary. | Customer project visibility overshare: customer project visibility overshare leaves the accountable owner without proof. | Possible | Major | Prevent customer project visibility overshare: validate revision and preserve correction lineage; quarantine R-012. | PMO | Downward; source quality. |
| R-013 | Project governance | project archive destruction | Project archive destruction: retry or stale state violates the named control in project archive destruction project authority boundary. | Project archive destruction: project delivery authority becomes unprovable. | Unlikely | Severe | Prevent project archive destruction: validate revision and preserve correction lineage; quarantine R-013. | PMO | Downward; delay. |
| R-014 | Project governance | project reopening without rationale | Project reopening without rationale: mandatory predecessor is absent in project reopening without rationale project authority boundary. | Project reopening without rationale: project delivery authority becomes unprovable. | Likely | Moderate | Prevent project reopening without rationale: validate revision and preserve correction lineage; quarantine R-014. | PMO | Downward; collusion. |
| R-015 | Project governance | delivery ownership ambiguity | Delivery ownership ambiguity: two owners claim authority in delivery ownership ambiguity evidence boundary. | Delivery ownership ambiguity: delivery ownership ambiguity leaves the accountable owner without proof. | Possible | Major | Prevent delivery ownership ambiguity: validate revision and preserve correction lineage; quarantine R-015. | PMO | Downward; source quality. |
| R-016 | WBS and planning | orphan WBS element | Orphan wbs element: retry or stale state violates the named control in missing parent project root hierarchy ownership. | Orphan wbs element: scope and cost have no roll-up path. | Unlikely | Severe | Prevent orphan WBS element: validate revision and preserve correction lineage; quarantine R-016. | Project Controls | Downward; delay. |
| R-017 | WBS and planning | cyclic WBS hierarchy | Cyclic wbs hierarchy: retry or stale state violates the named control in ancestor descendant loop graph traversal validation. | Cyclic wbs hierarchy: roll-up and schedule calculation cannot terminate. | Likely | Moderate | Prevent cyclic WBS hierarchy: validate revision and preserve correction lineage; quarantine R-017. | Project Controls | Downward; collusion. |
| R-018 | WBS and planning | task without deliverable | Task without deliverable: mandatory predecessor is absent in task without deliverable evidence boundary. | Task without deliverable: task without deliverable leaves the accountable owner without proof. | Possible | Major | Prevent task without deliverable: validate revision and preserve correction lineage; quarantine R-018. | Project Controls | Downward; source quality. |
| R-019 | WBS and planning | milestone without acceptance rule | Milestone without acceptance rule: mandatory predecessor is absent in milestone without acceptance rule evidence boundary. | Milestone without acceptance rule: milestone without acceptance rule leaves the accountable owner without proof. | Unlikely | Severe | Prevent milestone without acceptance rule: validate revision and preserve correction lineage; quarantine R-019. | Project Controls | Downward; delay. |
| R-020 | WBS and planning | invalid task dependency | Invalid task dependency: retry or stale state violates the named control in invalid task dependency evidence boundary. | Invalid task dependency: invalid task dependency leaves the accountable owner without proof. | Likely | Moderate | Prevent invalid task dependency: validate revision and preserve correction lineage; quarantine R-020. | Project Controls | Downward; collusion. |
| R-021 | WBS and planning | critical-path calculation drift | Critical-path calculation drift: inputs use different cut-offs in critical-path calculation drift evidence boundary. | Critical-path calculation drift: critical-path calculation drift leaves the accountable owner without proof. | Possible | Major | Prevent critical-path calculation drift: validate revision and preserve correction lineage; quarantine R-021. | Project Controls | Downward; source quality. |
| R-022 | WBS and planning | negative schedule float concealment | Negative schedule float concealment: presentation suppresses an exception in negative schedule float concealment evidence boundary. | Negative schedule float concealment: negative schedule float concealment leaves the accountable owner without proof. | Unlikely | Severe | Prevent negative schedule float concealment: validate revision and preserve correction lineage; quarantine R-022. | Project Controls | Downward; delay. |
| R-023 | WBS and planning | baseline overwrite | Baseline overwrite: later write replaces approved history in baseline overwrite evidence boundary. | Baseline overwrite: baseline overwrite leaves the accountable owner without proof. | Likely | Moderate | Prevent baseline overwrite: validate revision and preserve correction lineage; quarantine R-023. | Project Controls | Downward; collusion. |
| R-024 | WBS and planning | unauthorized rebaseline | Unauthorized rebaseline: actor lacks the required grant in unauthorized rebaseline evidence boundary. | Unauthorized rebaseline: unauthorized rebaseline leaves the accountable owner without proof. | Possible | Major | Prevent unauthorized rebaseline: require independent authority and immutable approval; quarantine R-024. | Project Controls | Downward; source quality. |
| R-025 | WBS and planning | change request bypass | Change request bypass: command skips its invariant in change request bypass evidence boundary. | Change request bypass: change request bypass leaves the accountable owner without proof. | Unlikely | Severe | Prevent change request bypass: require independent authority and immutable approval; quarantine R-025. | Project Controls | Downward; delay. |
| R-026 | WBS and planning | constraint date contradiction | Constraint date contradiction: retry or stale state violates the named control in constraint date contradiction evidence boundary. | Constraint date contradiction: constraint date contradiction leaves the accountable owner without proof. | Likely | Moderate | Prevent constraint date contradiction: validate revision and preserve correction lineage; quarantine R-026. | Project Controls | Downward; collusion. |
| R-027 | WBS and planning | calendar mismatch | Calendar mismatch: event-time snapshots disagree in calendar mismatch evidence boundary. | Calendar mismatch: calendar mismatch leaves the accountable owner without proof. | Possible | Major | Prevent calendar mismatch: align project, resource and workforce calendars at effective date; quarantine R-027. | Project Controls | Downward; source quality. |
| R-028 | WBS and planning | schedule timezone distortion | Schedule timezone distortion: retry or stale state violates the named control in schedule timezone distortion evidence boundary. | Schedule timezone distortion: schedule timezone distortion leaves the accountable owner without proof. | Unlikely | Severe | Prevent schedule timezone distortion: validate revision and preserve correction lineage; quarantine R-028. | Project Controls | Downward; delay. |
| R-029 | WBS and planning | deliverable version confusion | Deliverable version confusion: similar identifiers collapse in deliverable version confusion evidence boundary. | Deliverable version confusion: deliverable version confusion leaves the accountable owner without proof. | Likely | Moderate | Prevent deliverable version confusion: validate revision and preserve correction lineage; quarantine R-029. | Project Controls | Downward; collusion. |
| R-030 | WBS and planning | planning snapshot loss | Planning snapshot loss: recovery cannot reconstruct genealogy in planning snapshot loss evidence boundary. | Planning snapshot loss: planning snapshot loss leaves the accountable owner without proof. | Possible | Major | Prevent planning snapshot loss: validate revision and preserve correction lineage; quarantine R-030. | Project Controls | Downward; source quality. |
| R-031 | Resources and time | employee eligibility bypass | Employee eligibility bypass: command skips its invariant in employee eligibility bypass evidence boundary. | Employee eligibility bypass: employee eligibility bypass leaves the accountable owner without proof. | Unlikely | Severe | Prevent employee eligibility bypass: require independent authority and immutable approval; quarantine R-031. | Resource Management | Downward; delay. |
| R-032 | Resources and time | resource overallocation | Resource overallocation: retry or stale state violates the named control in named person concurrent assignments working calendar utilization. | Resource overallocation: one person is promised beyond available hours. | Likely | Moderate | Prevent resource overallocation: validate revision and preserve correction lineage; quarantine R-032. | Resource Management | Downward; collusion. |
| R-033 | Resources and time | capacity double booking | Capacity double booking: retry or stale state violates the named control in pooled role demand reservation horizon competing projects. | Capacity double booking: two projects consume the same unassigned capacity. | Possible | Major | Prevent capacity double booking: validate revision and preserve correction lineage; quarantine R-033. | Resource Management | Downward; source quality. |
| R-034 | Resources and time | skills mismatch | Skills mismatch: event-time snapshots disagree in competency certificate task demand proficiency. | Skills mismatch: assigned person cannot safely perform planned work. | Unlikely | Severe | Prevent skills mismatch: verify competency certificate and task proficiency demand; quarantine R-034. | Resource Management | Downward; delay. |
| R-035 | Resources and time | unapproved assignment | Unapproved assignment: retry or stale state violates the named control in resource demand skill match named allocation manager grant. | Unapproved assignment: person is scheduled without accountable allocation. | Likely | Moderate | Prevent unapproved assignment: validate revision and preserve correction lineage; quarantine R-035. | Resource Management | Downward; collusion. |
| R-036 | Resources and time | timesheet self-approval | Timesheet self-approval: retry or stale state violates the named control in submitter approver identity SoD period. | Timesheet self-approval: unverified hours reach payroll or billing. | Possible | Major | Prevent timesheet self-approval: separate submitter from project/time approver and audit delegation; quarantine R-036. | Resource Management | Downward; source quality. |
| R-037 | Resources and time | time charged to closed task | Time charged to closed task: retry or stale state violates the named control in time charged to closed task evidence boundary. | Time charged to closed task: time charged to closed task leaves the accountable owner without proof. | Unlikely | Severe | Prevent time charged to closed task: validate revision and preserve correction lineage; quarantine R-037. | Resource Management | Downward; delay. |
| R-038 | Resources and time | future time submission | Future time submission: retry or stale state violates the named control in work date current date task state period. | Future time submission: hours are approved before work can occur. | Likely | Moderate | Prevent future time submission: validate revision and preserve correction lineage; quarantine R-038. | Resource Management | Downward; collusion. |
| R-039 | Resources and time | duplicate time import | Duplicate time import: one causal key resolves twice in duplicate time import evidence boundary. | Duplicate time import: duplicate time import leaves the accountable owner without proof. | Possible | Major | Prevent duplicate time import: enforce key uniqueness and identity quarantine; quarantine R-039. | Resource Management | Downward; source quality. |
| R-040 | Resources and time | attendance conflict | Attendance conflict: retry or stale state violates the named control in shift clock-in absence roster work date. | Attendance conflict: project time contradicts workforce presence. | Unlikely | Severe | Prevent attendance conflict: validate revision and preserve correction lineage; quarantine R-040. | Resource Management | Downward; delay. |
| R-041 | Resources and time | leave overlap | Leave overlap: retry or stale state violates the named control in approved absence employee calendar allocation date. | Leave overlap: project plan uses a person unavailable for work. | Likely | Moderate | Prevent leave overlap: validate revision and preserve correction lineage; quarantine R-041. | Resource Management | Downward; collusion. |
| R-042 | Resources and time | payroll export mismatch | Payroll export mismatch: event-time snapshots disagree in approved hours employee pay-code period. | Payroll export mismatch: wages and project labor attribution disagree. | Possible | Major | Prevent payroll export mismatch: match approved hours, employee pay code, period and export response; quarantine R-042. | Resource Management | Downward; source quality. |
| R-043 | Resources and time | billable flag manipulation | Billable flag manipulation: consequential classification changes in billable flag manipulation evidence boundary. | Billable flag manipulation: billable flag manipulation leaves the accountable owner without proof. | Unlikely | Severe | Prevent billable flag manipulation: validate revision and preserve correction lineage; quarantine R-043. | Resource Management | Downward; delay. |
| R-044 | Resources and time | overtime approval omission | Overtime approval omission: required evidence is never emitted in overtime approval omission evidence boundary. | Overtime approval omission: overtime approval omission leaves the accountable owner without proof. | Likely | Moderate | Prevent overtime approval omission: validate revision and preserve correction lineage; quarantine R-044. | Resource Management | Downward; collusion. |
| R-045 | Resources and time | resource privacy exposure | Resource privacy exposure: protected detail escapes scope in resource privacy exposure workforce allocation boundary. | Resource privacy exposure: promise exceeds eligible workforce capacity. | Possible | Major | Prevent resource privacy exposure: validate revision and preserve correction lineage; quarantine R-045. | Resource Management | Downward; source quality. |
| R-046 | Expenses and finance | expense self-approval | Expense self-approval: retry or stale state violates the named control in claimant receipt policy approver identity segregation. | Expense self-approval: unsupported personal spend enters project cost evidence. | Unlikely | Severe | Prevent expense self-approval: separate claimant from expense approver and verify receipt policy; quarantine R-046. | Finance | Downward; delay. |
| R-047 | Expenses and finance | duplicate receipt claim | Duplicate receipt claim: one causal key resolves twice in duplicate receipt claim evidence boundary. | Duplicate receipt claim: duplicate receipt claim leaves the accountable owner without proof. | Likely | Moderate | Prevent duplicate receipt claim: enforce key uniqueness and identity quarantine; quarantine R-047. | Finance | Downward; collusion. |
| R-048 | Expenses and finance | expense charged after closure | Expense charged after closure: retry or stale state violates the named control in closed WBS work date claim period reopen authority. | Expense charged after closure: late personal cost bypasses project close controls. | Possible | Major | Prevent expense charged after closure: validate revision and preserve correction lineage; quarantine R-048. | Finance | Downward; source quality. |
| R-049 | Expenses and finance | unsupported project cost | Unsupported project cost: retry or stale state violates the named control in WBS attribution source document supplier labor receipt. | Unsupported project cost: delivery actual includes cost without owner evidence. | Unlikely | Severe | Prevent unsupported project cost: validate revision and preserve correction lineage; quarantine R-049. | Finance | Downward; delay. |
| R-050 | Expenses and finance | budget control bypass | Budget control bypass: command skips its invariant in budget control bypass evidence boundary. | Budget control bypass: budget control bypass leaves the accountable owner without proof. | Likely | Moderate | Prevent budget control bypass: require independent authority and immutable approval; quarantine R-050. | Finance | Downward; collusion. |
| R-051 | Expenses and finance | forecast version substitution | Forecast version substitution: retry or stale state violates the named control in approved forecast snapshot scenario cut-off revision. | Forecast version substitution: management sees an unapproved estimate-at-completion. | Possible | Major | Prevent forecast version substitution: validate revision and preserve correction lineage; quarantine R-051. | Finance | Downward; source quality. |
| R-052 | Expenses and finance | cost ledger omission | Cost ledger omission: required evidence is never emitted in cost ledger omission evidence boundary. | Cost ledger omission: cost ledger omission leaves the accountable owner without proof. | Unlikely | Severe | Prevent cost ledger omission: validate revision and preserve correction lineage; quarantine R-052. | Finance | Downward; delay. |
| R-053 | Expenses and finance | billing eligibility overstatement | Billing eligibility overstatement: quantity exceeds acknowledged sources in eligible quantity acceptance contract cap. | Billing eligibility overstatement: invoice request exceeds accepted commercial quantity. | Likely | Moderate | Prevent billing eligibility overstatement: validate revision and preserve correction lineage; quarantine R-053. | Finance | Downward; collusion. |
| R-054 | Expenses and finance | milestone invoice before acceptance | Milestone invoice before acceptance: retry or stale state violates the named control in fixed-price gate holdback customer signoff. | Milestone invoice before acceptance: customer is charged before deliverable acceptance. | Possible | Major | Prevent milestone invoice before acceptance: validate revision and preserve correction lineage; quarantine R-054. | Finance | Downward; source quality. |
| R-055 | Expenses and finance | time-and-material quantity inflation | Time-and-material quantity inflation: submitted quantity exceeds evidence in time-and-material quantity inflation warehouse custody boundary. | Time-and-material quantity inflation: quantity, custody or valuation becomes unreliable. | Unlikely | Severe | Prevent time-and-material quantity inflation: validate revision and preserve correction lineage; quarantine R-055. | Finance | Downward; delay. |
| R-056 | Expenses and finance | profitability source mismatch | Profitability source mismatch: event-time snapshots disagree in profitability source mismatch evidence boundary. | Profitability source mismatch: profitability source mismatch leaves the accountable owner without proof. | Likely | Moderate | Prevent profitability source mismatch: match recognized revenue, posted cost, forecast and certification cut; quarantine R-056. | Finance | Downward; collusion. |
| R-057 | Expenses and finance | capitalization policy breach | Capitalization policy breach: policy condition is violated in capitalization policy breach evidence boundary. | Capitalization policy breach: capitalization policy breach leaves the accountable owner without proof. | Possible | Major | Prevent capitalization policy breach: validate revision and preserve correction lineage; quarantine R-057. | Finance | Downward; source quality. |
| R-058 | Expenses and finance | currency conversion drift | Currency conversion drift: inputs use different cut-offs in currency conversion drift evidence boundary. | Currency conversion drift: currency conversion drift leaves the accountable owner without proof. | Unlikely | Severe | Prevent currency conversion drift: validate revision and preserve correction lineage; quarantine R-058. | Finance | Downward; delay. |
| R-059 | Expenses and finance | tax treatment assumption | Tax treatment assumption: retry or stale state violates the named control in jurisdiction supply type customer location tax determination. | Tax treatment assumption: delivery estimate is mistaken for statutory tax result. | Likely | Moderate | Prevent tax treatment assumption: validate revision and preserve correction lineage; quarantine R-059. | Finance | Downward; collusion. |
| R-060 | Expenses and finance | revenue recognition inference | Revenue recognition inference: retry or stale state violates the named control in performance obligation satisfaction allocation period Finance policy. | Revenue recognition inference: project status is mistaken for recognized revenue. | Possible | Major | Prevent revenue recognition inference: validate revision and preserve correction lineage; quarantine R-060. | Finance | Downward; source quality. |
| R-061 | Procurement and inventory | project purchase without requisition | Project purchase without requisition: mandatory predecessor is absent in project purchase without requisition project authority boundary. | Project purchase without requisition: project delivery authority becomes unprovable. | Unlikely | Severe | Prevent project purchase without requisition: validate revision and preserve correction lineage; quarantine R-061. | Inventory / Procurement | Downward; delay. |
| R-062 | Procurement and inventory | supplier commitment outside Procurement | Supplier commitment outside procurement: retry or stale state violates the named control in informal vendor promise project manager email price. | Supplier commitment outside procurement: supplier obligation bypasses purchase-order authority. | Likely | Moderate | Prevent supplier commitment outside Procurement: validate revision and preserve correction lineage; quarantine R-062. | Inventory / Procurement | Downward; collusion. |
| R-063 | Procurement and inventory | subcontractor access leakage | Subcontractor access leakage: scope exposes another purpose in subcontractor access leakage evidence boundary. | Subcontractor access leakage: subcontractor access leakage leaves the accountable owner without proof. | Possible | Major | Prevent subcontractor access leakage: validate revision and preserve correction lineage; quarantine R-063. | Inventory / Procurement | Downward; source quality. |
| R-064 | Procurement and inventory | material reservation collision | Material reservation collision: valid claims compete for one capacity in material reservation collision warehouse custody boundary. | Material reservation collision: quantity, custody or valuation becomes unreliable. | Unlikely | Severe | Prevent material reservation collision: validate revision and preserve correction lineage; quarantine R-064. | Inventory / Procurement | Downward; delay. |
| R-065 | Procurement and inventory | project stock ownership ambiguity | Project stock ownership ambiguity: two owners claim authority in project stock ownership ambiguity warehouse custody boundary. | Project stock ownership ambiguity: quantity, custody or valuation becomes unreliable. | Likely | Moderate | Prevent project stock ownership ambiguity: validate revision and preserve correction lineage; quarantine R-065. | Inventory / Procurement | Downward; collusion. |
| R-066 | Procurement and inventory | unrecorded project issue | Unrecorded project issue: retry or stale state violates the named control in warehouse pick goods issue WBS consumption acknowledgement. | Unrecorded project issue: project consumes stock without movement evidence. | Possible | Major | Prevent unrecorded project issue: validate revision and preserve correction lineage; quarantine R-066. | Inventory / Procurement | Downward; source quality. |
| R-067 | Procurement and inventory | unapproved material return | Unapproved material return: retry or stale state violates the named control in unused quantity return reason warehouse receipt authorization. | Unapproved material return: stock reappears without inspected custody transfer. | Unlikely | Severe | Prevent unapproved material return: validate revision and preserve correction lineage; quarantine R-067. | Inventory / Procurement | Downward; delay. |
| R-068 | Procurement and inventory | van stock shrinkage | Van stock shrinkage: retry or stale state violates the named control in van stock shrinkage warehouse custody boundary. | Van stock shrinkage: quantity, custody or valuation becomes unreliable. | Likely | Moderate | Prevent van stock shrinkage: validate revision and preserve correction lineage; quarantine R-068. | Inventory / Procurement | Downward; collusion. |
| R-069 | Procurement and inventory | service spare substitution | Service spare substitution: retry or stale state violates the named control in diagnosed part alternative compatibility technician permission. | Service spare substitution: wrong component is installed at customer equipment. | Possible | Major | Prevent service spare substitution: validate revision and preserve correction lineage; quarantine R-069. | Inventory / Procurement | Downward; source quality. |
| R-070 | Procurement and inventory | batch traceability break | Batch traceability break: retry or stale state violates the named control in lot receipt expiry issue genealogy customer installation. | Batch traceability break: consumed material cannot trace to its source batch. | Unlikely | Severe | Prevent batch traceability break: validate revision and preserve correction lineage; quarantine R-070. | Inventory / Procurement | Downward; delay. |
| R-071 | Procurement and inventory | serial custody gap | Serial custody gap: acknowledgements remain unpaired in serial custody gap evidence boundary. | Serial custody gap: serial custody gap leaves the accountable owner without proof. | Likely | Moderate | Prevent serial custody gap: match serial movement, custodian, location and installation evidence; quarantine R-071. | Inventory / Procurement | Downward; collusion. |
| R-072 | Procurement and inventory | warehouse transfer without acknowledgement | Warehouse transfer without acknowledgement: mandatory predecessor is absent in warehouse transfer without acknowledgement evidence boundary. | Warehouse transfer without acknowledgement: warehouse transfer without acknowledgement leaves the accountable owner without proof. | Possible | Major | Prevent warehouse transfer without acknowledgement: validate revision and preserve correction lineage; quarantine R-072. | Inventory / Procurement | Downward; source quality. |
| R-073 | Procurement and inventory | project material valuation inference | Project material valuation inference: retry or stale state violates the named control in project material valuation inference warehouse custody boundary. | Project material valuation inference: quantity, custody or valuation becomes unreliable. | Unlikely | Severe | Prevent project material valuation inference: validate revision and preserve correction lineage; quarantine R-073. | Inventory / Procurement | Downward; delay. |
| R-074 | Procurement and inventory | scrap disposition bypass | Scrap disposition bypass: command skips its invariant in scrap disposition bypass evidence boundary. | Scrap disposition bypass: scrap disposition bypass leaves the accountable owner without proof. | Likely | Moderate | Prevent scrap disposition bypass: require independent authority and immutable approval; quarantine R-074. | Inventory / Procurement | Downward; collusion. |
| R-075 | Procurement and inventory | emergency purchase normalization | Emergency purchase normalization: retry or stale state violates the named control in urgent exception retrospective approval frequency threshold. | Emergency purchase normalization: expedite route becomes uncontrolled ordinary sourcing. | Possible | Major | Prevent emergency purchase normalization: validate revision and preserve correction lineage; quarantine R-075. | Inventory / Procurement | Downward; source quality. |
| R-076 | Manufacturing and assets | project demand creates production directly | Project demand creates production directly: retry or stale state violates the named control in project demand creates production directly project authority boundary. | Project demand creates production directly: project delivery authority becomes unprovable. | Unlikely | Severe | Prevent project demand creates production directly: validate revision and preserve correction lineage; quarantine R-076. | Manufacturing / Maintenance | Downward; delay. |
| R-077 | Manufacturing and assets | manufacturing completion spoofing | Manufacturing completion spoofing: untrusted evidence is accepted in manufacturing completion spoofing evidence boundary. | Manufacturing completion spoofing: manufacturing completion spoofing leaves the accountable owner without proof. | Likely | Moderate | Prevent manufacturing completion spoofing: validate revision and preserve correction lineage; quarantine R-077. | Manufacturing / Maintenance | Downward; collusion. |
| R-078 | Manufacturing and assets | engineering revision mismatch | Engineering revision mismatch: event-time snapshots disagree in engineering revision mismatch evidence boundary. | Engineering revision mismatch: engineering revision mismatch leaves the accountable owner without proof. | Possible | Major | Prevent engineering revision mismatch: match design revision, production order and as-built genealogy; quarantine R-078. | Manufacturing / Maintenance | Downward; source quality. |
| R-079 | Manufacturing and assets | project WIP double count | Project wip double count: retry or stale state violates the named control in project WIP double count project authority boundary. | Project wip double count: project delivery authority becomes unprovable. | Unlikely | Severe | Prevent project WIP double count: validate revision and preserve correction lineage; quarantine R-079. | Manufacturing / Maintenance | Downward; delay. |
| R-080 | Manufacturing and assets | equipment master overwrite | Equipment master overwrite: later write replaces approved history in equipment identity revision maintenance authority. | Equipment master overwrite: condition and work history are replaced. | Likely | Moderate | Prevent equipment master overwrite: validate revision and preserve correction lineage; quarantine R-080. | Manufacturing / Maintenance | Downward; collusion. |
| R-081 | Manufacturing and assets | capital asset recognition before acceptance | Capital asset recognition before acceptance: retry or stale state violates the named control in capital asset recognition before acceptance equipment authority boundary. | Capital asset recognition before acceptance: condition or capitalization authority is corrupted. | Possible | Major | Prevent capital asset recognition before acceptance: validate revision and preserve correction lineage; quarantine R-081. | Manufacturing / Maintenance | Downward; source quality. |
| R-082 | Manufacturing and assets | asset-in-construction reconciliation gap | Asset-in-construction reconciliation gap: acknowledgements remain unpaired in asset-in-construction reconciliation gap equipment authority boundary. | Asset-in-construction reconciliation gap: condition or capitalization authority is corrupted. | Unlikely | Severe | Prevent asset-in-construction reconciliation gap: match capital candidate, construction cost, acceptance and asset handoff; quarantine R-082. | Manufacturing / Maintenance | Downward; delay. |
| R-083 | Manufacturing and assets | maintenance history fragmentation | Maintenance history fragmentation: retry or stale state violates the named control in equipment observation work-order link failure chronology. | Maintenance history fragmentation: technicians lose prior condition and repair context. | Likely | Moderate | Prevent maintenance history fragmentation: validate revision and preserve correction lineage; quarantine R-083. | Manufacturing / Maintenance | Downward; collusion. |
| R-084 | Manufacturing and assets | installed-base equipment confusion | Installed-base equipment confusion: similar identifiers collapse in installed-base equipment confusion equipment authority boundary. | Installed-base equipment confusion: condition or capitalization authority is corrupted. | Possible | Major | Prevent installed-base equipment confusion: validate revision and preserve correction lineage; quarantine R-084. | Manufacturing / Maintenance | Downward; source quality. |
| R-085 | Manufacturing and assets | production order genealogy loss | Production order genealogy loss: recovery cannot reconstruct genealogy in production parent component lot serial as-built chain. | Production order genealogy loss: project output cannot trace manufacturing inputs. | Unlikely | Severe | Prevent production order genealogy loss: validate revision and preserve correction lineage; quarantine R-085. | Manufacturing / Maintenance | Downward; delay. |
| R-086 | Manufacturing and assets | quality hold bypass | Quality hold bypass: command skips its invariant in quality hold bypass evidence boundary. | Quality hold bypass: quality hold bypass leaves the accountable owner without proof. | Likely | Moderate | Prevent quality hold bypass: require independent authority and immutable approval; quarantine R-086. | Manufacturing / Maintenance | Downward; collusion. |
| R-087 | Manufacturing and assets | inspection disposition ignored | Inspection disposition ignored: retry or stale state violates the named control in quality hold release reject deviation downstream gate. | Inspection disposition ignored: nonconforming output advances despite Quality decision. | Possible | Major | Prevent inspection disposition ignored: validate revision and preserve correction lineage; quarantine R-087. | Manufacturing / Maintenance | Downward; source quality. |
| R-088 | Manufacturing and assets | commissioning evidence loss | Commissioning evidence loss: recovery cannot reconstruct genealogy in site test punch-list customer verifier handover pack. | Commissioning evidence loss: operational readiness and acceptance cannot be proved. | Unlikely | Severe | Prevent commissioning evidence loss: validate revision and preserve correction lineage; quarantine R-088. | Manufacturing / Maintenance | Downward; delay. |
| R-089 | Manufacturing and assets | equipment handover ambiguity | Equipment handover ambiguity: two owners claim authority in commissioning acceptance custodian capital asset. | Equipment handover ambiguity: operating and capitalization ownership remain disputed. | Likely | Moderate | Prevent equipment handover ambiguity: validate revision and preserve correction lineage; quarantine R-089. | Manufacturing / Maintenance | Downward; collusion. |
| R-090 | Manufacturing and assets | asset retirement triggered by service | Asset retirement triggered by service: retry or stale state violates the named control in asset retirement triggered by service equipment authority boundary. | Asset retirement triggered by service: condition or capitalization authority is corrupted. | Possible | Major | Prevent asset retirement triggered by service: validate revision and preserve correction lineage; quarantine R-090. | Manufacturing / Maintenance | Downward; source quality. |
| R-091 | Service intake and SLA | duplicate service case | Duplicate service case: one causal key resolves twice in duplicate service case customer obligation boundary. | Duplicate service case: customer obligation and execution chronology fail. | Unlikely | Severe | Prevent duplicate service case: enforce key uniqueness and identity quarantine; quarantine R-091. | Service Management | Downward; delay. |
| R-092 | Service intake and SLA | customer authorization uncertainty | Customer authorization uncertainty: retry or stale state violates the named control in requester contact account relationship consent evidence. | Customer authorization uncertainty: service proceeds for an unverified customer representative. | Likely | Moderate | Prevent customer authorization uncertainty: validate revision and preserve correction lineage; quarantine R-092. | Service Management | Downward; collusion. |
| R-093 | Service intake and SLA | severity inflation | Severity inflation: submitted quantity exceeds evidence in customer harm operational impact evidence severity matrix. | Severity inflation: case receives unjustified escalation and response cost. | Possible | Major | Prevent severity inflation: validate revision and preserve correction lineage; quarantine R-093. | Service Management | Downward; source quality. |
| R-094 | Service intake and SLA | priority downgrading | Priority downgrading: retry or stale state violates the named control in queue urgency entitlement promise override authority. | Priority downgrading: urgent customer obligation waits behind lower-impact work. | Unlikely | Severe | Prevent priority downgrading: validate revision and preserve correction lineage; quarantine R-094. | Service Management | Downward; delay. |
| R-095 | Service intake and SLA | SLA clock starts late | Sla clock starts late: retry or stale state violates the named control in intake timestamp business calendar first response. | Sla clock starts late: breach is understated and customer remedy delayed. | Likely | Moderate | Prevent SLA clock starts late: validate revision and preserve correction lineage; quarantine R-095. | Service Management | Downward; collusion. |
| R-096 | Service intake and SLA | SLA pause abuse | Sla pause abuse: exception becomes normal flow in pause reason entitlement authority resume event. | Sla pause abuse: excluded duration hides accountable service delay. | Possible | Major | Prevent SLA pause abuse: validate revision and preserve correction lineage; quarantine R-096. | Service Management | Downward; source quality. |
| R-097 | Service intake and SLA | entitlement false positive | Entitlement false positive: retry or stale state violates the named control in coverage installed-item contract consumption payer. | Entitlement false positive: coverage charges the wrong party. | Unlikely | Severe | Prevent entitlement false positive: validate revision and preserve correction lineage; quarantine R-097. | Service Management | Downward; delay. |
| R-098 | Service intake and SLA | expired contract service | Expired contract service: retry or stale state violates the named control in coverage end-date renewal grace goodwill approval. | Expired contract service: work begins without valid commercial coverage. | Likely | Moderate | Prevent expired contract service: validate revision and preserve correction lineage; quarantine R-098. | Service Management | Downward; collusion. |
| R-099 | Service intake and SLA | warranty overlap ambiguity | Warranty overlap ambiguity: two owners claim authority in coverage installed-item contract consumption payer. | Warranty overlap ambiguity: coverage charges the wrong party. | Possible | Major | Prevent warranty overlap ambiguity: validate revision and preserve correction lineage; quarantine R-099. | Service Management | Downward; source quality. |
| R-100 | Service intake and SLA | case merge destroys chronology | Case merge destroys chronology: retry or stale state violates the named control in case merge destroys chronology customer obligation boundary. | Case merge destroys chronology: customer obligation and execution chronology fail. | Unlikely | Severe | Prevent case merge destroys chronology: validate revision and preserve correction lineage; quarantine R-100. | Service Management | Downward; delay. |
| R-101 | Service intake and SLA | case split loses obligations | Case split loses obligations: retry or stale state violates the named control in case split loses obligations customer obligation boundary. | Case split loses obligations: customer obligation and execution chronology fail. | Likely | Moderate | Prevent case split loses obligations: validate revision and preserve correction lineage; quarantine R-101. | Service Management | Downward; collusion. |
| R-102 | Service intake and SLA | omnichannel duplicate intake | Omnichannel duplicate intake: one causal key resolves twice in email portal phone correlation customer incident. | Omnichannel duplicate intake: one customer incident creates competing case obligations. | Possible | Major | Prevent omnichannel duplicate intake: enforce key uniqueness and identity quarantine; quarantine R-102. | Service Management | Downward; source quality. |
| R-103 | Service intake and SLA | customer data overshare | Customer data overshare: retry or stale state violates the named control in case narrative attachment contact portal purpose. | Customer data overshare: customer details reach an unauthorized audience. | Unlikely | Severe | Prevent customer data overshare: validate revision and preserve correction lineage; quarantine R-103. | Service Management | Downward; delay. |
| R-104 | Service intake and SLA | knowledge response misapplication | Knowledge response misapplication: retry or stale state violates the named control in article version product symptom applicability reviewer. | Knowledge response misapplication: customer follows guidance for the wrong configuration. | Likely | Moderate | Prevent knowledge response misapplication: validate revision and preserve correction lineage; quarantine R-104. | Service Management | Downward; collusion. |
| R-105 | Service intake and SLA | emergency service misclassification | Emergency service misclassification: retry or stale state violates the named control in safety outage criticality triage override dispatch. | Emergency service misclassification: normal work displaces a genuine emergency response. | Possible | Major | Prevent emergency service misclassification: validate revision and preserve correction lineage; quarantine R-105. | Service Management | Downward; source quality. |
| R-106 | Field service | service order without case authority | Service order without case authority: mandatory predecessor is absent in service order without case authority service obligation boundary. | Service order without case authority: service obligation authority becomes unprovable. | Unlikely | Severe | Prevent service order without case authority: validate revision and preserve correction lineage; quarantine R-106. | Field Service | Downward; delay. |
| R-107 | Field service | appointment double booking | Appointment double booking: retry or stale state violates the named control in appointment double booking evidence boundary. | Appointment double booking: appointment double booking leaves the accountable owner without proof. | Likely | Moderate | Prevent appointment double booking: validate revision and preserve correction lineage; quarantine R-107. | Field Service | Downward; collusion. |
| R-108 | Field service | technician skill mismatch | Technician skill mismatch: event-time snapshots disagree in technician skill mismatch evidence boundary. | Technician skill mismatch: technician skill mismatch leaves the accountable owner without proof. | Possible | Major | Prevent technician skill mismatch: match technician competency, certification and service task demand; quarantine R-108. | Field Service | Downward; source quality. |
| R-109 | Field service | dispatch location exposure | Dispatch location exposure: protected detail escapes scope in dispatch location exposure evidence boundary. | Dispatch location exposure: dispatch location exposure leaves the accountable owner without proof. | Unlikely | Severe | Prevent dispatch location exposure: validate revision and preserve correction lineage; quarantine R-109. | Field Service | Downward; delay. |
| R-110 | Field service | offline stale-state execution | Offline stale-state execution: retry or stale state violates the named control in offline stale-state execution evidence boundary. | Offline stale-state execution: offline stale-state execution leaves the accountable owner without proof. | Likely | Moderate | Prevent offline stale-state execution: validate revision and preserve correction lineage; quarantine R-110. | Field Service | Downward; collusion. |
| R-111 | Field service | remote support without consent | Remote support without consent: mandatory predecessor is absent in remote support without consent evidence boundary. | Remote support without consent: remote support without consent leaves the accountable owner without proof. | Possible | Major | Prevent remote support without consent: validate revision and preserve correction lineage; quarantine R-111. | Field Service | Downward; source quality. |
| R-112 | Field service | field completion without evidence | Field completion without evidence: mandatory predecessor is absent in field completion without evidence evidence boundary. | Field completion without evidence: field completion without evidence leaves the accountable owner without proof. | Unlikely | Severe | Prevent field completion without evidence: validate revision and preserve correction lineage; quarantine R-112. | Field Service | Downward; delay. |
| R-113 | Field service | customer acceptance forgery | Customer acceptance forgery: acceptance lacks attribution in customer acceptance forgery evidence boundary. | Customer acceptance forgery: customer acceptance forgery leaves the accountable owner without proof. | Likely | Moderate | Prevent customer acceptance forgery: require independent authority and immutable approval; quarantine R-113. | Field Service | Downward; collusion. |
| R-114 | Field service | service estimate bypasses Sales | Service estimate bypasses sales: command skips its invariant in service estimate bypasses Sales service obligation boundary. | Service estimate bypasses sales: service obligation authority becomes unprovable. | Possible | Major | Prevent service estimate bypasses Sales: route estimate through Sales quotation and customer acceptance; quarantine R-114. | Field Service | Downward; source quality. |
| R-115 | Field service | service part consumption omitted | Service part consumption omitted: retry or stale state violates the named control in service part consumption omitted service obligation boundary. | Service part consumption omitted: service obligation authority becomes unprovable. | Unlikely | Severe | Prevent service part consumption omitted: validate revision and preserve correction lineage; quarantine R-115. | Field Service | Downward; delay. |
| R-116 | Field service | defective part return lost | Defective part return lost: retry or stale state violates the named control in defective part return lost evidence boundary. | Defective part return lost: defective part return lost leaves the accountable owner without proof. | Likely | Moderate | Prevent defective part return lost: validate revision and preserve correction lineage; quarantine R-116. | Field Service | Downward; collusion. |
| R-117 | Field service | technician time not reconciled | Technician time not reconciled: retry or stale state violates the named control in technician time not reconciled evidence boundary. | Technician time not reconciled: technician time not reconciled leaves the accountable owner without proof. | Possible | Major | Prevent technician time not reconciled: validate revision and preserve correction lineage; quarantine R-117. | Field Service | Downward; source quality. |
| R-118 | Field service | unsafe lone-worker assignment | Unsafe lone-worker assignment: retry or stale state violates the named control in unsafe lone-worker assignment evidence boundary. | Unsafe lone-worker assignment: unsafe lone-worker assignment leaves the accountable owner without proof. | Unlikely | Severe | Prevent unsafe lone-worker assignment: validate revision and preserve correction lineage; quarantine R-118. | Field Service | Downward; delay. |
| R-119 | Field service | travel time manipulation | Travel time manipulation: consequential classification changes in travel time manipulation evidence boundary. | Travel time manipulation: travel time manipulation leaves the accountable owner without proof. | Likely | Moderate | Prevent travel time manipulation: validate revision and preserve correction lineage; quarantine R-119. | Field Service | Downward; collusion. |
| R-120 | Field service | service order premature closure | Service order premature closure: retry or stale state violates the named control in service order premature closure service obligation boundary. | Service order premature closure: service obligation authority becomes unprovable. | Possible | Major | Prevent service order premature closure: validate revision and preserve correction lineage; quarantine R-120. | Field Service | Downward; source quality. |
| R-121 | Billing and reconciliation | service billing before completion | Service billing before completion: retry or stale state violates the named control in field completion signature entitlement quote. | Service billing before completion: customer is charged for unfinished service. | Unlikely | Severe | Prevent service billing before completion: validate revision and preserve correction lineage; quarantine R-121. | Reconciliation Control | Downward; delay. |
| R-122 | Billing and reconciliation | billing request duplicate | Billing request duplicate: one causal key resolves twice in billing package idempotency invoice response. | Billing request duplicate: customer receives the same charge twice. | Likely | Moderate | Prevent billing request duplicate: enforce key uniqueness and identity quarantine; quarantine R-122. | Reconciliation Control | Downward; collusion. |
| R-123 | Billing and reconciliation | credit request bypasses Sales | Credit request bypasses sales: command skips its invariant in credit request bypasses Sales evidence boundary. | Credit request bypasses sales: credit request bypasses Sales leaves the accountable owner without proof. | Possible | Major | Prevent credit request bypasses Sales: route disputed charge through Sales credit authorization; quarantine R-123. | Reconciliation Control | Downward; source quality. |
| R-124 | Billing and reconciliation | project-to-GL mismatch | Project-to-gl mismatch: event-time snapshots disagree in project-to-GL mismatch evidence boundary. | Project-to-gl mismatch: project-to-GL mismatch leaves the accountable owner without proof. | Unlikely | Severe | Prevent project-to-GL mismatch: match WBS cost bridge, journal document, account and period; quarantine R-124. | Reconciliation Control | Downward; delay. |
| R-125 | Billing and reconciliation | project-to-Inventory mismatch | Project-to-inventory mismatch: event-time snapshots disagree in WBS site allocation issue surplus return. | Project-to-inventory mismatch: WBS issue and return totals diverge. | Likely | Moderate | Prevent project-to-Inventory mismatch: match WBS reservation, issue and return causal references; quarantine R-125. | Reconciliation Control | Downward; collusion. |
| R-126 | Billing and reconciliation | project-to-Procurement mismatch | Project-to-procurement mismatch: event-time snapshots disagree in work-package requisition supplier commitment. | Project-to-procurement mismatch: requisition and purchase commitment disagree. | Possible | Major | Prevent project-to-Procurement mismatch: match requisition, purchase order, supplier promise and commitment; quarantine R-126. | Reconciliation Control | Downward; source quality. |
| R-127 | Billing and reconciliation | project-to-Manufacturing mismatch | Project-to-manufacturing mismatch: event-time snapshots disagree in engineering demand production WIP genealogy. | Project-to-manufacturing mismatch: demand, production order and WIP lose genealogy. | Unlikely | Severe | Prevent project-to-Manufacturing mismatch: match project demand, production order, WIP and completion genealogy; quarantine R-127. | Reconciliation Control | Downward; delay. |
| R-128 | Billing and reconciliation | service-to-Sales mismatch | Service-to-sales mismatch: event-time snapshots disagree in completion estimate quotation invoice credit. | Service-to-sales mismatch: estimate, invoice and credit eligibility disagree. | Likely | Moderate | Prevent service-to-Sales mismatch: match service completion, estimate, quotation and invoice response; quarantine R-128. | Reconciliation Control | Downward; collusion. |
| R-129 | Billing and reconciliation | service-to-Finance mismatch | Service-to-finance mismatch: event-time snapshots disagree in case technician contract warranty recovery. | Service-to-finance mismatch: technician cost and warranty recovery cannot certify. | Possible | Major | Prevent service-to-Finance mismatch: match technician cost, warranty recovery, journal and period; quarantine R-129. | Reconciliation Control | Downward; source quality. |
| R-130 | Billing and reconciliation | service-to-Inventory mismatch | Service-to-inventory mismatch: event-time snapshots disagree in van spare serial installation defective-return. | Service-to-inventory mismatch: van spare custody and installation diverge. | Unlikely | Severe | Prevent service-to-Inventory mismatch: match case spare, installed serial and van-return references; quarantine R-130. | Reconciliation Control | Downward; delay. |
| R-131 | Billing and reconciliation | service-to-Maintenance mismatch | Service-to-maintenance mismatch: event-time snapshots disagree in equipment observation downtime work-history. | Service-to-maintenance mismatch: equipment observation and work history fragment. | Likely | Moderate | Prevent service-to-Maintenance mismatch: match service observation, equipment identity, downtime and maintenance work; quarantine R-131. | Reconciliation Control | Downward; collusion. |
| R-132 | Billing and reconciliation | timesheet reconciliation aging | Timesheet reconciliation aging: exception passes its deadline in approved-hours payroll variance age owner. | Timesheet reconciliation aging: period close carries unresolved labor differences. | Possible | Major | Prevent timesheet reconciliation aging: match approved entries, pay period and payroll response ages; quarantine R-132. | Reconciliation Control | Downward; source quality. |
| R-133 | Billing and reconciliation | billing reconciliation aging | Billing reconciliation aging: exception passes its deadline in billing reconciliation aging commercial cutoff boundary. | Billing reconciliation aging: customer charge or cut-off becomes incorrect. | Unlikely | Severe | Prevent billing reconciliation aging: match eligibility package, invoice identity and posting response ages; quarantine R-133. | Reconciliation Control | Downward; delay. |
| R-134 | Billing and reconciliation | profitability certification drift | Profitability certification drift: inputs use different cut-offs in profitability certification drift evidence boundary. | Profitability certification drift: profitability certification drift leaves the accountable owner without proof. | Likely | Moderate | Prevent profitability certification drift: validate revision and preserve correction lineage; quarantine R-134. | Reconciliation Control | Downward; collusion. |
| R-135 | Billing and reconciliation | cross-domain correction by direct edit | Cross-domain correction by direct edit: retry or stale state violates the named control in cross-domain correction by direct edit evidence boundary. | Cross-domain correction by direct edit: cross-domain correction by direct edit leaves the accountable owner without proof. | Possible | Major | Prevent cross-domain correction by direct edit: validate revision and preserve correction lineage; quarantine R-135. | Reconciliation Control | Downward; source quality. |
| R-136 | Security and resilience | tenant isolation failure | Tenant isolation failure: boundary fails to reject in tenant predicate token organization scope. | Tenant isolation failure: another tenant can see or change protected records. | Unlikely | Severe | Prevent tenant isolation failure: validate revision and preserve correction lineage; quarantine R-136. | Security | Downward; delay. |
| R-137 | Security and resilience | customer scope escalation | Customer scope escalation: retry or stale state violates the named control in customer scope escalation evidence boundary. | Customer scope escalation: customer scope escalation leaves the accountable owner without proof. | Likely | Moderate | Prevent customer scope escalation: validate revision and preserve correction lineage; quarantine R-137. | Security | Downward; collusion. |
| R-138 | Security and resilience | project role privilege accumulation | Project role privilege accumulation: retry or stale state violates the named control in project role privilege accumulation project authority boundary. | Project role privilege accumulation: project delivery authority becomes unprovable. | Possible | Major | Prevent project role privilege accumulation: limit project role grants across baseline budget and resource approval; quarantine R-138. | Security | Downward; source quality. |
| R-139 | Security and resilience | service role privilege accumulation | Service role privilege accumulation: retry or stale state violates the named control in service role privilege accumulation service obligation boundary. | Service role privilege accumulation: service obligation authority becomes unprovable. | Unlikely | Severe | Prevent service role privilege accumulation: limit service role grants across SLA dispatch completion and billing; quarantine R-139. | Security | Downward; delay. |
| R-140 | Security and resilience | segregation-of-duties conflict | Segregation-of-duties conflict: retry or stale state violates the named control in segregation-of-duties conflict evidence boundary. | Segregation-of-duties conflict: segregation-of-duties conflict leaves the accountable owner without proof. | Likely | Moderate | Prevent segregation-of-duties conflict: validate revision and preserve correction lineage; quarantine R-140. | Security | Downward; collusion. |
| R-141 | Security and resilience | approval delegation abuse | Approval delegation abuse: exception becomes normal flow in approval delegation abuse evidence boundary. | Approval delegation abuse: approval delegation abuse leaves the accountable owner without proof. | Possible | Major | Prevent approval delegation abuse: validate revision and preserve correction lineage; quarantine R-141. | Security | Downward; source quality. |
| R-142 | Security and resilience | API replay creates duplicate command | Api replay creates duplicate command: one causal key resolves twice in API replay creates duplicate command evidence boundary. | Api replay creates duplicate command: API replay creates duplicate command leaves the accountable owner without proof. | Unlikely | Severe | Prevent API replay creates duplicate command: enforce key uniqueness and identity quarantine; quarantine R-142. | Security | Downward; delay. |
| R-143 | Security and resilience | event idempotency failure | Event idempotency failure: boundary fails to reject in consumer key replay offset processed-event store. | Event idempotency failure: one integration command creates repeated consequences. | Likely | Moderate | Prevent event idempotency failure: validate revision and preserve correction lineage; quarantine R-143. | Security | Downward; collusion. |
| R-144 | Security and resilience | audit evidence redaction failure | Audit evidence redaction failure: boundary fails to reject in audit evidence redaction failure evidence boundary. | Audit evidence redaction failure: audit evidence redaction failure leaves the accountable owner without proof. | Possible | Major | Prevent audit evidence redaction failure: validate revision and preserve correction lineage; quarantine R-144. | Security | Downward; source quality. |
| R-145 | Security and resilience | retention legal-hold breach | Retention legal-hold breach: policy condition is violated in retention legal-hold breach evidence boundary. | Retention legal-hold breach: retention legal-hold breach leaves the accountable owner without proof. | Unlikely | Severe | Prevent retention legal-hold breach: validate revision and preserve correction lineage; quarantine R-145. | Security | Downward; delay. |
| R-146 | Security and resilience | AI changes financial consequence | Ai changes financial consequence: retry or stale state violates the named control in AI changes financial consequence evidence boundary. | Ai changes financial consequence: AI changes financial consequence leaves the accountable owner without proof. | Likely | Moderate | Prevent AI changes financial consequence: validate revision and preserve correction lineage; quarantine R-146. | Security | Downward; collusion. |
| R-147 | Security and resilience | AI dispatches without human approval | Ai dispatches without human approval: mandatory predecessor is absent in AI dispatches without human approval evidence boundary. | Ai dispatches without human approval: AI dispatches without human approval leaves the accountable owner without proof. | Possible | Major | Prevent AI dispatches without human approval: validate revision and preserve correction lineage; quarantine R-147. | Security | Downward; source quality. |
| R-148 | Security and resilience | AI reveals customer service history | Ai reveals customer service history: retry or stale state violates the named control in AI reveals customer service history evidence boundary. | Ai reveals customer service history: AI reveals customer service history leaves the accountable owner without proof. | Unlikely | Severe | Prevent AI reveals customer service history: validate revision and preserve correction lineage; quarantine R-148. | Security | Downward; delay. |
| R-149 | Security and resilience | backup restoration loses chronology | Backup restoration loses chronology: retry or stale state violates the named control in backup restoration loses chronology evidence boundary. | Backup restoration loses chronology: backup restoration loses chronology leaves the accountable owner without proof. | Likely | Moderate | Prevent backup restoration loses chronology: validate revision and preserve correction lineage; quarantine R-149. | Security | Downward; collusion. |
| R-150 | Security and resilience | integration outage hides exception | Integration outage hides exception: retry or stale state violates the named control in integration outage hides exception evidence boundary. | Integration outage hides exception: integration outage hides exception leaves the accountable owner without proof. | Possible | Major | Prevent integration outage hides exception: validate revision and preserve correction lineage; quarantine R-150. | Security | Downward; source quality. |

### Operational example catalog

| ID | Scenario | Owning role | Source domain | Transaction | Financial / operational effect | Approval | Reconciliation | Specific risk | Sales request | Finance request | Inventory request | Procurement request | Manufacturing request | Maintenance request | Quality request | HR/Workforce request |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| E-001 | new customer implementation charter | Project Manager | Project Management | Revise new customer implementation charter with scope/key/revision. | new customer implementation charter: changes sponsor, objective, funding envelope and activation gate; owner ledgers remain authoritative. | Project Manager proposes; another owner approves E-001. | Reconcile E-001 revision and acknowledgement. | new customer implementation charter: stale/retried E-001 could corrupt sponsor, objective, funding envelope and activation gate. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-002 | internal transformation project | Project Manager | Project Management | Revise internal transformation project with scope/key/revision. | internal transformation project: changes scope, schedule, acceptance and governed revision; owner ledgers remain authoritative. | Project Manager proposes; another owner approves E-002. | Reconcile E-002 revision and acknowledgement. | internal transformation project: stale/retried E-002 could corrupt scope, schedule, acceptance and governed revision. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-003 | multi-company rollout program | Project Manager | Project Management | Revise multi-company rollout program with scope/key/revision. | multi-company rollout program: changes scope, schedule, acceptance and governed revision; owner ledgers remain authoritative. | Project Manager proposes; another owner approves E-003. | Reconcile E-003 revision and acknowledgement. | multi-company rollout program: stale/retried E-003 could corrupt scope, schedule, acceptance and governed revision. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-004 | WBS design package | Project Manager | Project Management | Revise WBS design package with scope/key/revision. | WBS design package: changes scope, schedule, acceptance and governed revision; owner ledgers remain authoritative. | Project Manager proposes; another owner approves E-004. | Reconcile E-004 revision and acknowledgement. | WBS design package: stale/retried E-004 could corrupt scope, schedule, acceptance and governed revision. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-005 | accepted milestone gate | Project Manager | Project Management | Revise accepted milestone gate with scope/key/revision. | accepted milestone gate: changes scope, schedule, acceptance and governed revision; owner ledgers remain authoritative. | Project Manager proposes; another owner approves E-005. | Reconcile E-005 revision and acknowledgement. | accepted milestone gate: stale/retried E-005 could corrupt scope, schedule, acceptance and governed revision. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-006 | critical task reschedule | Project Manager | Project Management | Revise critical task reschedule with scope/key/revision. | critical task reschedule: changes scope, schedule, acceptance and governed revision; owner ledgers remain authoritative. | Project Manager proposes; another owner approves E-006. | Reconcile E-006 revision and acknowledgement. | critical task reschedule: stale/retried E-006 could corrupt scope, schedule, acceptance and governed revision. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-007 | approved baseline freeze | Project Manager | Project Management | Revise approved baseline freeze with scope/key/revision. | approved baseline freeze: changes approved scope, dates, effort and version lineage; owner ledgers remain authoritative. | Project Manager proposes; another owner approves E-007. | Reconcile E-007 revision and acknowledgement. | approved baseline freeze: stale/retried E-007 could corrupt approved scope, dates, effort and version lineage. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-008 | scope change request | Project Manager | Project Management | Revise scope change request with scope/key/revision. | scope change request: changes scope, schedule, acceptance and governed revision; owner ledgers remain authoritative. | Project Manager proposes; another owner approves E-008. | Reconcile E-008 revision and acknowledgement. | scope change request: stale/retried E-008 could corrupt scope, schedule, acceptance and governed revision. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-009 | project closure and archive | Project Manager | Project Management | Revise project closure and archive with scope/key/revision. | project closure and archive: changes scope, schedule, acceptance and governed revision; owner ledgers remain authoritative. | Project Manager proposes; another owner approves E-009. | Reconcile E-009 revision and acknowledgement. | project closure and archive: stale/retried E-009 could corrupt scope, schedule, acceptance and governed revision. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-010 | resource demand forecast | Resource Manager | Project Management | Revise resource demand forecast with scope/key/revision. | resource demand forecast: changes eligibility, capacity, allocation and approved hours; owner ledgers remain authoritative. | Resource Manager proposes; another owner approves E-010. | Reconcile E-010 revision and acknowledgement. | resource demand forecast: stale/retried E-010 could corrupt eligibility, capacity, allocation and approved hours. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-011 | named employee allocation | Resource Manager | Project Management | Revise named employee allocation with scope/key/revision. | named employee allocation: changes eligibility, capacity, allocation and approved hours; owner ledgers remain authoritative. | Resource Manager proposes; another owner approves E-011. | Reconcile E-011 revision and acknowledgement. | named employee allocation: stale/retried E-011 could corrupt eligibility, capacity, allocation and approved hours. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-012 | pooled capacity reservation | Resource Manager | Project Management | Revise pooled capacity reservation with scope/key/revision. | pooled capacity reservation: changes eligibility, capacity, allocation and approved hours; owner ledgers remain authoritative. | Resource Manager proposes; another owner approves E-012. | Reconcile E-012 revision and acknowledgement. | pooled capacity reservation: stale/retried E-012 could corrupt eligibility, capacity, allocation and approved hours. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-013 | weekly timesheet submission | Resource Manager | Project Management | Revise weekly timesheet submission with scope/key/revision. | weekly timesheet submission: changes seven-day entry package, submitter declaration and approver queue; owner ledgers remain authoritative. | Resource Manager proposes; another owner approves E-013. | Reconcile E-013 revision and acknowledgement. | weekly timesheet submission: stale/retried E-013 could corrupt seven-day entry package, submitter declaration and approver queue. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-014 | rejected time correction | Resource Manager | Project Management | Revise rejected time correction with scope/key/revision. | rejected time correction: changes eligibility, capacity, allocation and approved hours; owner ledgers remain authoritative. | Resource Manager proposes; another owner approves E-014. | Reconcile E-014 revision and acknowledgement. | rejected time correction: stale/retried E-014 could corrupt eligibility, capacity, allocation and approved hours. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-015 | overtime time entry | Resource Manager | Project Management | Revise overtime time entry with scope/key/revision. | overtime time entry: changes eligibility, capacity, allocation and approved hours; owner ledgers remain authoritative. | Resource Manager proposes; another owner approves E-015. | Reconcile E-015 revision and acknowledgement. | overtime time entry: stale/retried E-015 could corrupt eligibility, capacity, allocation and approved hours. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-016 | leave-overlap resolution | Resource Manager | Project Management | Revise leave-overlap resolution with scope/key/revision. | leave-overlap resolution: changes eligibility, capacity, allocation and approved hours; owner ledgers remain authoritative. | Resource Manager proposes; another owner approves E-016. | Reconcile E-016 revision and acknowledgement. | leave-overlap resolution: stale/retried E-016 could corrupt eligibility, capacity, allocation and approved hours. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-017 | payroll time export | Resource Manager | Project Management | Revise payroll time export with scope/key/revision. | payroll time export: changes eligibility, capacity, allocation and approved hours; owner ledgers remain authoritative. | Resource Manager proposes; another owner approves E-017. | Reconcile E-017 revision and acknowledgement. | payroll time export: stale/retried E-017 could corrupt eligibility, capacity, allocation and approved hours. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-018 | utilization snapshot | Resource Manager | Project Management | Revise utilization snapshot with scope/key/revision. | utilization snapshot: changes eligible capacity minus named allocation at one event-time cut; owner ledgers remain authoritative. | Resource Manager proposes; another owner approves E-018. | Reconcile E-018 revision and acknowledgement. | utilization snapshot: stale/retried E-018 could corrupt eligible capacity minus named allocation at one event-time cut. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-019 | travel expense claim | Project Controller | Project Management | Revise travel expense claim with scope/key/revision. | travel expense claim: changes itinerary, receipt, policy limit, currency date and WBS purpose; owner ledgers remain authoritative. | Project Controller proposes; another owner approves E-019. | Reconcile E-019 revision and acknowledgement. | travel expense claim: stale/retried E-019 could corrupt itinerary, receipt, policy limit, currency date and WBS purpose. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-020 | duplicate receipt challenge | Project Controller | Project Management | Revise duplicate receipt challenge with scope/key/revision. | duplicate receipt challenge: changes forecast, commitment, receipt and certified actual; owner ledgers remain authoritative. | Project Controller proposes; another owner approves E-020. | Reconcile E-020 revision and acknowledgement. | duplicate receipt challenge: stale/retried E-020 could corrupt forecast, commitment, receipt and certified actual. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-021 | capital-project expense | Project Controller | Project Management | Revise capital-project expense with scope/key/revision. | capital-project expense: changes capitalizable category, construction asset candidate and Finance review; owner ledgers remain authoritative. | Project Controller proposes; another owner approves E-021. | Reconcile E-021 revision and acknowledgement. | capital-project expense: stale/retried E-021 could corrupt capitalizable category, construction asset candidate and Finance review. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-022 | project budget reservation | Project Controller | Project Management | Revise project budget reservation with scope/key/revision. | project budget reservation: changes forecast, commitment, receipt and certified actual; owner ledgers remain authoritative. | Project Controller proposes; another owner approves E-022. | Reconcile E-022 revision and acknowledgement. | project budget reservation: stale/retried E-022 could corrupt forecast, commitment, receipt and certified actual. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-023 | forecast-at-completion revision | Project Controller | Project Management | Revise forecast-at-completion revision with scope/key/revision. | forecast-at-completion revision: changes forecast, commitment, receipt and certified actual; owner ledgers remain authoritative. | Project Controller proposes; another owner approves E-023. | Reconcile E-023 revision and acknowledgement. | forecast-at-completion revision: stale/retried E-023 could corrupt forecast, commitment, receipt and certified actual. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-024 | actual cost acknowledgement | Project Controller | Project Management | Revise actual cost acknowledgement with scope/key/revision. | actual cost acknowledgement: changes forecast, commitment, receipt and certified actual; owner ledgers remain authoritative. | Project Controller proposes; another owner approves E-024. | Reconcile E-024 revision and acknowledgement. | actual cost acknowledgement: stale/retried E-024 could corrupt forecast, commitment, receipt and certified actual. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-025 | committed cost request | Project Controller | Project Management | Revise committed cost request with scope/key/revision. | committed cost request: changes forecast, commitment, receipt and certified actual; owner ledgers remain authoritative. | Project Controller proposes; another owner approves E-025. | Reconcile E-025 revision and acknowledgement. | committed cost request: stale/retried E-025 could corrupt forecast, commitment, receipt and certified actual. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-026 | project margin snapshot | Project Controller | Project Management | Revise project margin snapshot with scope/key/revision. | project margin snapshot: changes forecast, commitment, receipt and certified actual; owner ledgers remain authoritative. | Project Controller proposes; another owner approves E-026. | Reconcile E-026 revision and acknowledgement. | project margin snapshot: stale/retried E-026 could corrupt forecast, commitment, receipt and certified actual. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-027 | capitalization candidate handoff | Project Controller | Project Management | Revise capitalization candidate handoff with scope/key/revision. | capitalization candidate handoff: changes forecast, commitment, receipt and certified actual; owner ledgers remain authoritative. | Project Controller proposes; another owner approves E-027. | Reconcile E-027 revision and acknowledgement. | capitalization candidate handoff: stale/retried E-027 could corrupt forecast, commitment, receipt and certified actual. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-028 | fixed-price billing plan | Billing Coordinator | Project Management | Revise fixed-price billing plan with scope/key/revision. | fixed-price billing plan: changes eligibility, acceptance, commercial response and posting; owner ledgers remain authoritative. | Billing Coordinator proposes; another owner approves E-028. | Reconcile E-028 revision and acknowledgement. | fixed-price billing plan: stale/retried E-028 could corrupt eligibility, acceptance, commercial response and posting. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-029 | milestone billing request | Billing Coordinator | Project Management | Revise milestone billing request with scope/key/revision. | milestone billing request: changes accepted fixed-price gate, contract percentage and holdback release; owner ledgers remain authoritative. | Billing Coordinator proposes; another owner approves E-029. | Reconcile E-029 revision and acknowledgement. | milestone billing request: stale/retried E-029 could corrupt accepted fixed-price gate, contract percentage and holdback release. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-030 | time-and-material billing request | Billing Coordinator | Project Management | Revise time-and-material billing request with scope/key/revision. | time-and-material billing request: changes approved labor/expense quantity, rate card, cap and cut-off; owner ledgers remain authoritative. | Billing Coordinator proposes; another owner approves E-030. | Reconcile E-030 revision and acknowledgement. | time-and-material billing request: stale/retried E-030 could corrupt approved labor/expense quantity, rate card, cap and cut-off. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-031 | expense pass-through request | Billing Coordinator | Project Management | Revise expense pass-through request with scope/key/revision. | expense pass-through request: changes receipt, policy, currency and cost attribution; owner ledgers remain authoritative. | Billing Coordinator proposes; another owner approves E-031. | Reconcile E-031 revision and acknowledgement. | expense pass-through request: stale/retried E-031 could corrupt receipt, policy, currency and cost attribution. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-032 | billing hold release | Billing Coordinator | Project Management | Revise billing hold release with scope/key/revision. | billing hold release: changes eligibility, acceptance, commercial response and posting; owner ledgers remain authoritative. | Billing Coordinator proposes; another owner approves E-032. | Reconcile E-032 revision and acknowledgement. | billing hold release: stale/retried E-032 could corrupt eligibility, acceptance, commercial response and posting. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-033 | customer acceptance prerequisite | Billing Coordinator | Project Management | Revise customer acceptance prerequisite with scope/key/revision. | customer acceptance prerequisite: changes commercial eligibility, invoice response and accounting cut-off; owner ledgers remain authoritative. | Billing Coordinator proposes; another owner approves E-033. | Reconcile E-033 revision and acknowledgement. | customer acceptance prerequisite: stale/retried E-033 could corrupt commercial eligibility, invoice response and accounting cut-off. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-034 | invoice rejection response | Billing Coordinator | Project Management | Revise invoice rejection response with scope/key/revision. | invoice rejection response: changes customer invoice rejection, disputed line and Sales correction route; owner ledgers remain authoritative. | Billing Coordinator proposes; another owner approves E-034. | Reconcile E-034 revision and acknowledgement. | invoice rejection response: stale/retried E-034 could corrupt customer invoice rejection, disputed line and Sales correction route. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-035 | credit request handoff | Billing Coordinator | Project Management | Revise credit request handoff with scope/key/revision. | credit request handoff: changes disputed invoice line, Sales credit authority and customer reference; owner ledgers remain authoritative. | Billing Coordinator proposes; another owner approves E-035. | Reconcile E-035 revision and acknowledgement. | credit request handoff: stale/retried E-035 could corrupt disputed invoice line, Sales credit authority and customer reference. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-036 | revenue evidence package | Billing Coordinator | Project Management | Revise revenue evidence package with scope/key/revision. | revenue evidence package: changes recognized obligation, performance evidence, period cut-off and Finance certification; owner ledgers remain authoritative. | Billing Coordinator proposes; another owner approves E-036. | Reconcile E-036 revision and acknowledgement. | revenue evidence package: stale/retried E-036 could corrupt recognized obligation, performance evidence, period cut-off and Finance certification. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-037 | project purchase requisition | Project Buyer | Project Management | Revise project purchase requisition with scope/key/revision. | project purchase requisition: changes demand, sourcing, supplier commitment and acknowledgement; owner ledgers remain authoritative. | Project Buyer proposes; another owner approves E-037. | Reconcile E-037 revision and acknowledgement. | project purchase requisition: stale/retried E-037 could corrupt demand, sourcing, supplier commitment and acknowledgement. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-038 | subcontractor work package | Project Buyer | Project Management | Revise subcontractor work package with scope/key/revision. | subcontractor work package: changes demand, sourcing, supplier commitment and acknowledgement; owner ledgers remain authoritative. | Project Buyer proposes; another owner approves E-038. | Reconcile E-038 revision and acknowledgement. | subcontractor work package: stale/retried E-038 could corrupt demand, sourcing, supplier commitment and acknowledgement. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-039 | supplier milestone acknowledgement | Project Buyer | Project Management | Revise supplier milestone acknowledgement with scope/key/revision. | supplier milestone acknowledgement: changes demand, sourcing, supplier commitment and acknowledgement; owner ledgers remain authoritative. | Project Buyer proposes; another owner approves E-039. | Reconcile E-039 revision and acknowledgement. | supplier milestone acknowledgement: stale/retried E-039 could corrupt demand, sourcing, supplier commitment and acknowledgement. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-040 | expedite request | Project Buyer | Project Management | Revise expedite request with scope/key/revision. | expedite request: changes required-on-site date, supplier promise and premium approval; owner ledgers remain authoritative. | Project Buyer proposes; another owner approves E-040. | Reconcile E-040 revision and acknowledgement. | expedite request: stale/retried E-040 could corrupt required-on-site date, supplier promise and premium approval. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-041 | purchase cancellation request | Project Buyer | Project Management | Revise purchase cancellation request with scope/key/revision. | purchase cancellation request: changes open quantity, supplier notice and commitment reversal; owner ledgers remain authoritative. | Project Buyer proposes; another owner approves E-041. | Reconcile E-041 revision and acknowledgement. | purchase cancellation request: stale/retried E-041 could corrupt open quantity, supplier notice and commitment reversal. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-042 | project commitment update | Project Buyer | Project Management | Revise project commitment update with scope/key/revision. | project commitment update: changes demand, sourcing, supplier commitment and acknowledgement; owner ledgers remain authoritative. | Project Buyer proposes; another owner approves E-042. | Reconcile E-042 revision and acknowledgement. | project commitment update: stale/retried E-042 could corrupt demand, sourcing, supplier commitment and acknowledgement. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-043 | service supplier callout | Project Buyer | Project Management | Revise service supplier callout with scope/key/revision. | service supplier callout: changes demand, sourcing, supplier commitment and acknowledgement; owner ledgers remain authoritative. | Project Buyer proposes; another owner approves E-043. | Reconcile E-043 revision and acknowledgement. | service supplier callout: stale/retried E-043 could corrupt demand, sourcing, supplier commitment and acknowledgement. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-044 | emergency procurement escalation | Project Buyer | Project Management | Revise emergency procurement escalation with scope/key/revision. | emergency procurement escalation: changes demand, sourcing, supplier commitment and acknowledgement; owner ledgers remain authoritative. | Project Buyer proposes; another owner approves E-044. | Reconcile E-044 revision and acknowledgement. | emergency procurement escalation: stale/retried E-044 could corrupt demand, sourcing, supplier commitment and acknowledgement. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-045 | supplier invoice exception | Project Buyer | Project Management | Revise supplier invoice exception with scope/key/revision. | supplier invoice exception: changes supplier invoice match, Procurement receipt and AP resolution; owner ledgers remain authoritative. | Project Buyer proposes; another owner approves E-045. | Reconcile E-045 revision and acknowledgement. | supplier invoice exception: stale/retried E-045 could corrupt supplier invoice match, Procurement receipt and AP resolution. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-046 | project material reservation | Materials Coordinator | Project Management | Revise project material reservation with scope/key/revision. | project material reservation: changes WBS demand, required-on-site date and allocation response; owner ledgers remain authoritative. | Materials Coordinator proposes; another owner approves E-046. | Reconcile E-046 revision and acknowledgement. | project material reservation: stale/retried E-046 could corrupt WBS demand, required-on-site date and allocation response. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-047 | project material issue | Materials Coordinator | Project Management | Revise project material issue with scope/key/revision. | project material issue: changes pick confirmation, goods movement and WBS consumption; owner ledgers remain authoritative. | Materials Coordinator proposes; another owner approves E-047. | Reconcile E-047 revision and acknowledgement. | project material issue: stale/retried E-047 could corrupt pick confirmation, goods movement and WBS consumption. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-048 | unused project material return | Materials Coordinator | Project Management | Revise unused project material return with scope/key/revision. | unused project material return: changes surplus quantity, inspection and warehouse restock; owner ledgers remain authoritative. | Materials Coordinator proposes; another owner approves E-048. | Reconcile E-048 revision and acknowledgement. | unused project material return: stale/retried E-048 could corrupt surplus quantity, inspection and warehouse restock. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-049 | service spare reservation | Materials Coordinator | Project Management | Revise service spare reservation with scope/key/revision. | service spare reservation: changes diagnosed requirement, substitute permission and availability; owner ledgers remain authoritative. | Materials Coordinator proposes; another owner approves E-049. | Reconcile E-049 revision and acknowledgement. | service spare reservation: stale/retried E-049 could corrupt diagnosed requirement, substitute permission and availability. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-050 | van stock replenishment | Materials Coordinator | Project Management | Revise van stock replenishment with scope/key/revision. | van stock replenishment: changes technician location, min/max level and transfer receipt; owner ledgers remain authoritative. | Materials Coordinator proposes; another owner approves E-050. | Reconcile E-050 revision and acknowledgement. | van stock replenishment: stale/retried E-050 could corrupt technician location, min/max level and transfer receipt. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-051 | serialized spare installation | Materials Coordinator | Project Management | Revise serialized spare installation with scope/key/revision. | serialized spare installation: changes removed serial, installed serial and customer asset link; owner ledgers remain authoritative. | Materials Coordinator proposes; another owner approves E-051. | Reconcile E-051 revision and acknowledgement. | serialized spare installation: stale/retried E-051 could corrupt removed serial, installed serial and customer asset link. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-052 | defective part return | Materials Coordinator | Project Management | Revise defective part return with scope/key/revision. | defective part return: changes failure reason, quarantine custody and exchange-core recovery; owner ledgers remain authoritative. | Materials Coordinator proposes; another owner approves E-052. | Reconcile E-052 revision and acknowledgement. | defective part return: stale/retried E-052 could corrupt failure reason, quarantine custody and exchange-core recovery. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-053 | batch-controlled consumption | Materials Coordinator | Project Management | Revise batch-controlled consumption with scope/key/revision. | batch-controlled consumption: changes lot selection, expiry rule and service/project genealogy; owner ledgers remain authoritative. | Materials Coordinator proposes; another owner approves E-053. | Reconcile E-053 revision and acknowledgement. | batch-controlled consumption: stale/retried E-053 could corrupt lot selection, expiry rule and service/project genealogy. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-054 | stock transfer acknowledgement | Materials Coordinator | Project Management | Revise stock transfer acknowledgement with scope/key/revision. | stock transfer acknowledgement: changes source dispatch, destination receipt and in-transit quantity; owner ledgers remain authoritative. | Materials Coordinator proposes; another owner approves E-054. | Reconcile E-054 revision and acknowledgement. | stock transfer acknowledgement: stale/retried E-054 could corrupt source dispatch, destination receipt and in-transit quantity. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-055 | project demand proposal | Project Engineer | Project Management | Revise project demand proposal with scope/key/revision. | project demand proposal: changes demand, order, WIP and genealogy; owner ledgers remain authoritative. | Project Engineer proposes; another owner approves E-055. | Reconcile E-055 revision and acknowledgement. | project demand proposal: stale/retried E-055 could corrupt demand, order, WIP and genealogy. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-056 | production order reference | Project Engineer | Project Management | Revise production order reference with scope/key/revision. | production order reference: changes order reference, completion quantity and genealogy; owner ledgers remain authoritative. | Project Engineer proposes; another owner approves E-056. | Reconcile E-056 revision and acknowledgement. | production order reference: stale/retried E-056 could corrupt order reference, completion quantity and genealogy. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-057 | engineering revision acknowledgement | Project Engineer | Project Management | Revise engineering revision acknowledgement with scope/key/revision. | engineering revision acknowledgement: changes demand, order, WIP and genealogy; owner ledgers remain authoritative. | Project Engineer proposes; another owner approves E-057. | Reconcile E-057 revision and acknowledgement. | engineering revision acknowledgement: stale/retried E-057 could corrupt demand, order, WIP and genealogy. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-058 | manufacturing milestone response | Project Engineer | Project Management | Revise manufacturing milestone response with scope/key/revision. | manufacturing milestone response: changes demand revision, production order, WIP and genealogy; owner ledgers remain authoritative. | Project Engineer proposes; another owner approves E-058. | Reconcile E-058 revision and acknowledgement. | manufacturing milestone response: stale/retried E-058 could corrupt demand revision, production order, WIP and genealogy. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-059 | project WIP reconciliation | Project Engineer | Project Management | Revise project WIP reconciliation with scope/key/revision. | project WIP reconciliation: changes demand, order, WIP and genealogy; owner ledgers remain authoritative. | Project Engineer proposes; another owner approves E-059. | Reconcile E-059 revision and acknowledgement. | project WIP reconciliation: stale/retried E-059 could corrupt demand, order, WIP and genealogy. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-060 | make-to-project completion | Project Engineer | Project Management | Revise make-to-project completion with scope/key/revision. | make-to-project completion: changes demand, order, WIP and genealogy; owner ledgers remain authoritative. | Project Engineer proposes; another owner approves E-060. | Reconcile E-060 revision and acknowledgement. | make-to-project completion: stale/retried E-060 could corrupt demand, order, WIP and genealogy. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-061 | quality hold response | Project Engineer | Project Management | Revise quality hold response with scope/key/revision. | quality hold response: changes demand, order, WIP and genealogy; owner ledgers remain authoritative. | Project Engineer proposes; another owner approves E-061. | Reconcile E-061 revision and acknowledgement. | quality hold response: stale/retried E-061 could corrupt demand, order, WIP and genealogy. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-062 | commissioning handoff | Project Engineer | Project Management | Revise commissioning handoff with scope/key/revision. | commissioning handoff: changes demand, order, WIP and genealogy; owner ledgers remain authoritative. | Project Engineer proposes; another owner approves E-062. | Reconcile E-062 revision and acknowledgement. | commissioning handoff: stale/retried E-062 could corrupt demand, order, WIP and genealogy. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-063 | as-built genealogy package | Project Engineer | Project Management | Revise as-built genealogy package with scope/key/revision. | as-built genealogy package: changes demand, order, WIP and genealogy; owner ledgers remain authoritative. | Project Engineer proposes; another owner approves E-063. | Reconcile E-063 revision and acknowledgement. | as-built genealogy package: stale/retried E-063 could corrupt demand, order, WIP and genealogy. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-064 | email service request | Service Agent | Service Management | Revise email service request with scope/key/revision. | email service request: changes channel identity, obligation, priority and chronology; owner ledgers remain authoritative. | Service Agent proposes; another owner approves E-064. | Reconcile E-064 revision and acknowledgement. | email service request: stale/retried E-064 could corrupt channel identity, obligation, priority and chronology. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-065 | portal service request | Service Agent | Service Management | Revise portal service request with scope/key/revision. | portal service request: changes authenticated customer intake, product context, attachment and consent; owner ledgers remain authoritative. | Service Agent proposes; another owner approves E-065. | Reconcile E-065 revision and acknowledgement. | portal service request: stale/retried E-065 could corrupt authenticated customer intake, product context, attachment and consent. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-066 | phone emergency case | Service Agent | Service Management | Revise phone emergency case with scope/key/revision. | phone emergency case: changes caller verification, safety triage, outage severity and rapid dispatch; owner ledgers remain authoritative. | Service Agent proposes; another owner approves E-066. | Reconcile E-066 revision and acknowledgement. | phone emergency case: stale/retried E-066 could corrupt caller verification, safety triage, outage severity and rapid dispatch. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-067 | duplicate case merge | Service Agent | Service Management | Revise duplicate case merge with scope/key/revision. | duplicate case merge: changes source case identities, obligation union and preserved channel chronology; owner ledgers remain authoritative. | Service Agent proposes; another owner approves E-067. | Reconcile E-067 revision and acknowledgement. | duplicate case merge: stale/retried E-067 could corrupt source case identities, obligation union and preserved channel chronology. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-068 | case split by obligation | Service Agent | Service Management | Revise case split by obligation with scope/key/revision. | case split by obligation: changes customer obligation, chronology, assignment and closure; owner ledgers remain authoritative. | Service Agent proposes; another owner approves E-068. | Reconcile E-068 revision and acknowledgement. | case split by obligation: stale/retried E-068 could corrupt customer obligation, chronology, assignment and closure. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-069 | severity assessment | Service Agent | Service Management | Revise severity assessment with scope/key/revision. | severity assessment: changes documented customer impact, safety exposure and severity matrix; owner ledgers remain authoritative. | Service Agent proposes; another owner approves E-069. | Reconcile E-069 revision and acknowledgement. | severity assessment: stale/retried E-069 could corrupt documented customer impact, safety exposure and severity matrix. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-070 | priority override | Service Agent | Service Management | Revise priority override with scope/key/revision. | priority override: changes queue position, entitlement promise and accountable override reason; owner ledgers remain authoritative. | Service Agent proposes; another owner approves E-070. | Reconcile E-070 revision and acknowledgement. | priority override: stale/retried E-070 could corrupt queue position, entitlement promise and accountable override reason. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-071 | SLA clock start | Service Agent | Service Management | Revise SLA clock start with scope/key/revision. | SLA clock start: changes qualified intake timestamp, business calendar and first-response target; owner ledgers remain authoritative. | Service Agent proposes; another owner approves E-071. | Reconcile E-071 revision and acknowledgement. | SLA clock start: stale/retried E-071 could corrupt qualified intake timestamp, business calendar and first-response target. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-072 | entitlement validation | Service Agent | Service Management | Revise entitlement validation with scope/key/revision. | entitlement validation: changes event-time contract coverage, installed item and remaining consumption; owner ledgers remain authoritative. | Service Agent proposes; another owner approves E-072. | Reconcile E-072 revision and acknowledgement. | entitlement validation: stale/retried E-072 could corrupt event-time contract coverage, installed item and remaining consumption. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-073 | contract-covered incident | Service Contract Manager | Service Management | Revise contract-covered incident with scope/key/revision. | contract-covered incident: changes coverage, consumption, warranty and commercial terms; owner ledgers remain authoritative. | Service Contract Manager proposes; another owner approves E-073. | Reconcile E-073 revision and acknowledgement. | contract-covered incident: stale/retried E-073 could corrupt coverage, consumption, warranty and commercial terms. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-074 | expired entitlement exception | Service Contract Manager | Service Management | Revise expired entitlement exception with scope/key/revision. | expired entitlement exception: changes lapsed coverage date, goodwill authority and billable fallback; owner ledgers remain authoritative. | Service Contract Manager proposes; another owner approves E-074. | Reconcile E-074 revision and acknowledgement. | expired entitlement exception: stale/retried E-074 could corrupt lapsed coverage date, goodwill authority and billable fallback. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-075 | warranty-covered repair | Service Contract Manager | Service Management | Revise warranty-covered repair with scope/key/revision. | warranty-covered repair: changes coverage-at-failure, installed serial and manufacturer recovery; owner ledgers remain authoritative. | Service Contract Manager proposes; another owner approves E-075. | Reconcile E-075 revision and acknowledgement. | warranty-covered repair: stale/retried E-075 could corrupt coverage-at-failure, installed serial and manufacturer recovery. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-076 | goodwill service approval | Service Contract Manager | Service Management | Revise goodwill service approval with scope/key/revision. | goodwill service approval: changes coverage, consumption, warranty and commercial terms; owner ledgers remain authoritative. | Service Contract Manager proposes; another owner approves E-076. | Reconcile E-076 revision and acknowledgement. | goodwill service approval: stale/retried E-076 could corrupt coverage, consumption, warranty and commercial terms. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-077 | billable service determination | Service Contract Manager | Service Management | Revise billable service determination with scope/key/revision. | billable service determination: changes coverage, consumption, warranty and commercial terms; owner ledgers remain authoritative. | Service Contract Manager proposes; another owner approves E-077. | Reconcile E-077 revision and acknowledgement. | billable service determination: stale/retried E-077 could corrupt coverage, consumption, warranty and commercial terms. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-078 | service estimate request | Service Contract Manager | Service Management | Revise service estimate request with scope/key/revision. | service estimate request: changes coverage, consumption, warranty and commercial terms; owner ledgers remain authoritative. | Service Contract Manager proposes; another owner approves E-078. | Reconcile E-078 revision and acknowledgement. | service estimate request: stale/retried E-078 could corrupt coverage, consumption, warranty and commercial terms. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-079 | quotation acceptance response | Service Contract Manager | Service Management | Revise quotation acceptance response with scope/key/revision. | quotation acceptance response: changes coverage, consumption, warranty and commercial terms; owner ledgers remain authoritative. | Service Contract Manager proposes; another owner approves E-079. | Reconcile E-079 revision and acknowledgement. | quotation acceptance response: stale/retried E-079 could corrupt coverage, consumption, warranty and commercial terms. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-080 | contract consumption update | Service Contract Manager | Service Management | Revise contract consumption update with scope/key/revision. | contract consumption update: changes coverage, consumption, warranty and commercial terms; owner ledgers remain authoritative. | Service Contract Manager proposes; another owner approves E-080. | Reconcile E-080 revision and acknowledgement. | contract consumption update: stale/retried E-080 could corrupt coverage, consumption, warranty and commercial terms. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-081 | service renewal signal | Service Contract Manager | Service Management | Revise service renewal signal with scope/key/revision. | service renewal signal: changes coverage, consumption, warranty and commercial terms; owner ledgers remain authoritative. | Service Contract Manager proposes; another owner approves E-081. | Reconcile E-081 revision and acknowledgement. | service renewal signal: stale/retried E-081 could corrupt coverage, consumption, warranty and commercial terms. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-082 | service order release | Field Service Coordinator | Service Management | Revise service order release with scope/key/revision. | service order release: changes appointment, dispatch, execution and completion evidence; owner ledgers remain authoritative. | Field Service Coordinator proposes; another owner approves E-082. | Reconcile E-082 revision and acknowledgement. | service order release: stale/retried E-082 could corrupt appointment, dispatch, execution and completion evidence. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-083 | appointment confirmation | Field Service Coordinator | Service Management | Revise appointment confirmation with scope/key/revision. | appointment confirmation: changes customer window, timezone, skill and travel constraint; owner ledgers remain authoritative. | Field Service Coordinator proposes; another owner approves E-083. | Reconcile E-083 revision and acknowledgement. | appointment confirmation: stale/retried E-083 could corrupt customer window, timezone, skill and travel constraint. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-084 | technician dispatch | Field Service Coordinator | Service Management | Revise technician dispatch with scope/key/revision. | technician dispatch: changes territory route, skill, safety check and customer arrival window; owner ledgers remain authoritative. | Field Service Coordinator proposes; another owner approves E-084. | Reconcile E-084 revision and acknowledgement. | technician dispatch: stale/retried E-084 could corrupt territory route, skill, safety check and customer arrival window. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-085 | technician reassignment | Field Service Coordinator | Service Management | Revise technician reassignment with scope/key/revision. | technician reassignment: changes handoff reason, work-state snapshot, replacement acceptance and notification; owner ledgers remain authoritative. | Field Service Coordinator proposes; another owner approves E-085. | Reconcile E-085 revision and acknowledgement. | technician reassignment: stale/retried E-085 could corrupt handoff reason, work-state snapshot, replacement acceptance and notification. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-086 | offline work execution | Field Service Coordinator | Service Management | Revise offline work execution with scope/key/revision. | offline work execution: changes technician device snapshot, field action sequence and reconnect merge; owner ledgers remain authoritative. | Field Service Coordinator proposes; another owner approves E-086. | Reconcile E-086 revision and acknowledgement. | offline work execution: stale/retried E-086 could corrupt technician device snapshot, field action sequence and reconnect merge. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-087 | remote support consent | Field Service Coordinator | Service Management | Revise remote support consent with scope/key/revision. | remote support consent: changes appointment, dispatch, execution and completion evidence; owner ledgers remain authoritative. | Field Service Coordinator proposes; another owner approves E-087. | Reconcile E-087 revision and acknowledgement. | remote support consent: stale/retried E-087 could corrupt appointment, dispatch, execution and completion evidence. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-088 | field part consumption | Field Service Coordinator | Service Management | Revise field part consumption with scope/key/revision. | field part consumption: changes appointment, dispatch, execution and completion evidence; owner ledgers remain authoritative. | Field Service Coordinator proposes; another owner approves E-088. | Reconcile E-088 revision and acknowledgement. | field part consumption: stale/retried E-088 could corrupt appointment, dispatch, execution and completion evidence. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-089 | customer completion signature | Field Service Coordinator | Service Management | Revise customer completion signature with scope/key/revision. | customer completion signature: changes appointment, dispatch, execution and completion evidence; owner ledgers remain authoritative. | Field Service Coordinator proposes; another owner approves E-089. | Reconcile E-089 revision and acknowledgement. | customer completion signature: stale/retried E-089 could corrupt appointment, dispatch, execution and completion evidence. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-090 | service order closure | Field Service Coordinator | Service Management | Revise service order closure with scope/key/revision. | service order closure: changes appointment, dispatch, execution and completion evidence; owner ledgers remain authoritative. | Field Service Coordinator proposes; another owner approves E-090. | Reconcile E-090 revision and acknowledgement. | service order closure: stale/retried E-090 could corrupt appointment, dispatch, execution and completion evidence. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-091 | inspection request | Quality or Maintenance Owner | Service Management | Revise inspection request with scope/key/revision. | inspection request: changes sample plan, characteristic, specification revision and inspector assignment; owner ledgers remain authoritative. | Quality or Maintenance Owner proposes; another owner approves E-091. | Reconcile E-091 revision and acknowledgement. | inspection request: stale/retried E-091 could corrupt sample plan, characteristic, specification revision and inspector assignment. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-092 | nonconformance acknowledgement | Quality or Maintenance Owner | Service Management | Revise nonconformance acknowledgement with scope/key/revision. | nonconformance acknowledgement: changes defect identity, containment owner, disposition and closure response; owner ledgers remain authoritative. | Quality or Maintenance Owner proposes; another owner approves E-092. | Reconcile E-092 revision and acknowledgement. | nonconformance acknowledgement: stale/retried E-092 could corrupt defect identity, containment owner, disposition and closure response. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-093 | service-induced equipment observation | Quality or Maintenance Owner | Service Management | Revise service-induced equipment observation with scope/key/revision. | service-induced equipment observation: changes field symptom, equipment identifier, condition timestamp and technician evidence; owner ledgers remain authoritative. | Quality or Maintenance Owner proposes; another owner approves E-093. | Reconcile E-093 revision and acknowledgement. | service-induced equipment observation: stale/retried E-093 could corrupt field symptom, equipment identifier, condition timestamp and technician evidence. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-094 | maintenance work request handoff | Quality or Maintenance Owner | Service Management | Revise maintenance work request handoff with scope/key/revision. | maintenance work request handoff: changes equipment authority, requested corrective work, priority and acceptance response; owner ledgers remain authoritative. | Quality or Maintenance Owner proposes; another owner approves E-094. | Reconcile E-094 revision and acknowledgement. | maintenance work request handoff: stale/retried E-094 could corrupt equipment authority, requested corrective work, priority and acceptance response. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-095 | equipment downtime response | Quality or Maintenance Owner | Service Management | Revise equipment downtime response with scope/key/revision. | equipment downtime response: changes equipment outage start, production impact and maintenance acknowledgement; owner ledgers remain authoritative. | Quality or Maintenance Owner proposes; another owner approves E-095. | Reconcile E-095 revision and acknowledgement. | equipment downtime response: stale/retried E-095 could corrupt equipment outage start, production impact and maintenance acknowledgement. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-096 | calibration evidence reference | Quality or Maintenance Owner | Service Management | Revise calibration evidence reference with scope/key/revision. | calibration evidence reference: changes instrument identity, due date, certificate revision and measured result; owner ledgers remain authoritative. | Quality or Maintenance Owner proposes; another owner approves E-096. | Reconcile E-096 revision and acknowledgement. | calibration evidence reference: stale/retried E-096 could corrupt instrument identity, due date, certificate revision and measured result. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-097 | warranty return disposition | Quality or Maintenance Owner | Service Management | Revise warranty return disposition with scope/key/revision. | warranty return disposition: changes failed-part quarantine, supplier claim and replacement custody; owner ledgers remain authoritative. | Quality or Maintenance Owner proposes; another owner approves E-097. | Reconcile E-097 revision and acknowledgement. | warranty return disposition: stale/retried E-097 could corrupt failed-part quarantine, supplier claim and replacement custody. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-098 | repair quality release | Quality or Maintenance Owner | Service Management | Revise repair quality release with scope/key/revision. | repair quality release: changes repair specification, inspection result, disposition approver and release timestamp; owner ledgers remain authoritative. | Quality or Maintenance Owner proposes; another owner approves E-098. | Reconcile E-098 revision and acknowledgement. | repair quality release: stale/retried E-098 could corrupt repair specification, inspection result, disposition approver and release timestamp. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-099 | root-cause package | Quality or Maintenance Owner | Service Management | Revise root-cause package with scope/key/revision. | root-cause package: changes causal analysis, contributing factor, corrective action and verification; owner ledgers remain authoritative. | Quality or Maintenance Owner proposes; another owner approves E-099. | Reconcile E-099 revision and acknowledgement. | root-cause package: stale/retried E-099 could corrupt causal analysis, contributing factor, corrective action and verification. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-100 | project-to-GL variance | Reconciliation Analyst | Reconciliation | Revise project-to-GL variance with scope/key/revision. | project-to-GL variance: changes WBS attribution versus posted journal and period cut-off; owner ledgers remain authoritative. | Reconciliation Analyst proposes; another owner approves E-100. | Reconcile E-100 revision and acknowledgement. | project-to-GL variance: stale/retried E-100 could corrupt WBS attribution versus posted journal and period cut-off. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-101 | project-to-Inventory variance | Reconciliation Analyst | Reconciliation | Revise project-to-Inventory variance with scope/key/revision. | project-to-Inventory variance: changes WBS reservation, warehouse issue and unused return quantities; owner ledgers remain authoritative. | Reconciliation Analyst proposes; another owner approves E-101. | Reconcile E-101 revision and acknowledgement. | project-to-Inventory variance: stale/retried E-101 could corrupt WBS reservation, warehouse issue and unused return quantities. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-102 | project-to-Procurement variance | Reconciliation Analyst | Reconciliation | Revise project-to-Procurement variance with scope/key/revision. | project-to-Procurement variance: changes requisition demand versus purchase commitment and subcontract milestone; owner ledgers remain authoritative. | Reconciliation Analyst proposes; another owner approves E-102. | Reconcile E-102 revision and acknowledgement. | project-to-Procurement variance: stale/retried E-102 could corrupt requisition demand versus purchase commitment and subcontract milestone. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-103 | project-to-Manufacturing variance | Reconciliation Analyst | Reconciliation | Revise project-to-Manufacturing variance with scope/key/revision. | project-to-Manufacturing variance: changes project demand versus production completion, WIP and genealogy; owner ledgers remain authoritative. | Reconciliation Analyst proposes; another owner approves E-103. | Reconcile E-103 revision and acknowledgement. | project-to-Manufacturing variance: stale/retried E-103 could corrupt project demand versus production completion, WIP and genealogy. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-104 | service-to-Sales variance | Reconciliation Analyst | Reconciliation | Revise service-to-Sales variance with scope/key/revision. | service-to-Sales variance: changes completion eligibility versus quotation, invoice and credit state; owner ledgers remain authoritative. | Reconciliation Analyst proposes; another owner approves E-104. | Reconcile E-104 revision and acknowledgement. | service-to-Sales variance: stale/retried E-104 could corrupt completion eligibility versus quotation, invoice and credit state. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-105 | service-to-Finance variance | Reconciliation Analyst | Reconciliation | Revise service-to-Finance variance with scope/key/revision. | service-to-Finance variance: changes technician cost, contract recovery and journal certification; owner ledgers remain authoritative. | Reconciliation Analyst proposes; another owner approves E-105. | Reconcile E-105 revision and acknowledgement. | service-to-Finance variance: stale/retried E-105 could corrupt technician cost, contract recovery and journal certification. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-106 | service-to-Inventory variance | Reconciliation Analyst | Reconciliation | Revise service-to-Inventory variance with scope/key/revision. | service-to-Inventory variance: changes van spare custody, serialized installation and defective return; owner ledgers remain authoritative. | Reconciliation Analyst proposes; another owner approves E-106. | Reconcile E-106 revision and acknowledgement. | service-to-Inventory variance: stale/retried E-106 could corrupt van spare custody, serialized installation and defective return. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-107 | service-to-Maintenance variance | Reconciliation Analyst | Reconciliation | Revise service-to-Maintenance variance with scope/key/revision. | service-to-Maintenance variance: changes equipment observation, downtime and maintenance-work history; owner ledgers remain authoritative. | Reconciliation Analyst proposes; another owner approves E-107. | Reconcile E-107 revision and acknowledgement. | service-to-Maintenance variance: stale/retried E-107 could corrupt equipment observation, downtime and maintenance-work history. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-108 | timesheet-to-payroll variance | Reconciliation Analyst | Reconciliation | Revise timesheet-to-payroll variance with scope/key/revision. | timesheet-to-payroll variance: changes approved period hours, pay code export and employee difference; owner ledgers remain authoritative. | Reconciliation Analyst proposes; another owner approves E-108. | Reconcile E-108 revision and acknowledgement. | timesheet-to-payroll variance: stale/retried E-108 could corrupt approved period hours, pay code export and employee difference. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-109 | cross-tenant project query | Security Officer | Security | Revise cross-tenant project query with scope/key/revision. | cross-tenant project query: changes purpose scope, least privilege and immutable review; owner ledgers remain authoritative. | Security Officer proposes; another owner approves E-109. | Reconcile E-109 revision and acknowledgement. | cross-tenant project query: stale/retried E-109 could corrupt purpose scope, least privilege and immutable review. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-110 | customer portal access grant | Security Officer | Security | Revise customer portal access grant with scope/key/revision. | customer portal access grant: changes purpose role, customer account scope, expiry and revocation; owner ledgers remain authoritative. | Security Officer proposes; another owner approves E-110. | Reconcile E-110 revision and acknowledgement. | customer portal access grant: stale/retried E-110 could corrupt purpose role, customer account scope, expiry and revocation. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-111 | subcontractor least-privilege grant | Security Officer | Security | Revise subcontractor least-privilege grant with scope/key/revision. | subcontractor least-privilege grant: changes purpose scope, least privilege and immutable review; owner ledgers remain authoritative. | Security Officer proposes; another owner approves E-111. | Reconcile E-111 revision and acknowledgement. | subcontractor least-privilege grant: stale/retried E-111 could corrupt purpose scope, least privilege and immutable review. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-112 | project manager conflict check | Security Officer | Security | Revise project manager conflict check with scope/key/revision. | project manager conflict check: changes baseline, budget and resource authority collision; owner ledgers remain authoritative. | Security Officer proposes; another owner approves E-112. | Reconcile E-112 revision and acknowledgement. | project manager conflict check: stale/retried E-112 could corrupt baseline, budget and resource authority collision. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-113 | service approver conflict check | Security Officer | Security | Revise service approver conflict check with scope/key/revision. | service approver conflict check: changes case completion, SLA pause and billing eligibility collision; owner ledgers remain authoritative. | Security Officer proposes; another owner approves E-113. | Reconcile E-113 revision and acknowledgement. | service approver conflict check: stale/retried E-113 could corrupt case completion, SLA pause and billing eligibility collision. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-114 | delegated approval expiry | Security Officer | Security | Revise delegated approval expiry with scope/key/revision. | delegated approval expiry: changes delegator, delegate, authority scope, expiration and pending decisions; owner ledgers remain authoritative. | Security Officer proposes; another owner approves E-114. | Reconcile E-114 revision and acknowledgement. | delegated approval expiry: stale/retried E-114 could corrupt delegator, delegate, authority scope, expiration and pending decisions. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-115 | customer data erasure request | Security Officer | Security | Revise customer data erasure request with scope/key/revision. | customer data erasure request: changes purpose scope, least privilege and immutable review; owner ledgers remain authoritative. | Security Officer proposes; another owner approves E-115. | Reconcile E-115 revision and acknowledgement. | customer data erasure request: stale/retried E-115 could corrupt purpose scope, least privilege and immutable review. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-116 | legal hold on case | Security Officer | Security | Revise legal hold on case with scope/key/revision. | legal hold on case: changes preservation scope, custodian notice, deletion block and release authority; owner ledgers remain authoritative. | Security Officer proposes; another owner approves E-116. | Reconcile E-116 revision and acknowledgement. | legal hold on case: stale/retried E-116 could corrupt preservation scope, custodian notice, deletion block and release authority. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-117 | privileged correction review | Security Officer | Security | Revise privileged correction review with scope/key/revision. | privileged correction review: changes administrator change, before/after values, justification and audit reviewer; owner ledgers remain authoritative. | Security Officer proposes; another owner approves E-117. | Reconcile E-117 revision and acknowledgement. | privileged correction review: stale/retried E-117 could corrupt administrator change, before/after values, justification and audit reviewer. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-118 | portfolio status publication | Reporting Steward | Reporting | Revise portfolio status publication with scope/key/revision. | portfolio status publication: changes formula, event-time lineage and certification; owner ledgers remain authoritative. | Reporting Steward proposes; another owner approves E-118. | Reconcile E-118 revision and acknowledgement. | portfolio status publication: stale/retried E-118 could corrupt formula, event-time lineage and certification. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-119 | earned-value snapshot | Reporting Steward | Reporting | Revise earned-value snapshot with scope/key/revision. | earned-value snapshot: changes formula, event-time lineage and certification; owner ledgers remain authoritative. | Reporting Steward proposes; another owner approves E-119. | Reconcile E-119 revision and acknowledgement. | earned-value snapshot: stale/retried E-119 could corrupt formula, event-time lineage and certification. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-120 | resource utilization report | Reporting Steward | Reporting | Revise resource utilization report with scope/key/revision. | resource utilization report: changes certified period measure, denominator formula and late adjustments; owner ledgers remain authoritative. | Reporting Steward proposes; another owner approves E-120. | Reconcile E-120 revision and acknowledgement. | resource utilization report: stale/retried E-120 could corrupt certified period measure, denominator formula and late adjustments. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-121 | project profitability certification | Reporting Steward | Reporting | Revise project profitability certification with scope/key/revision. | project profitability certification: changes certified revenue, posted cost, estimate and variance; owner ledgers remain authoritative. | Reporting Steward proposes; another owner approves E-121. | Reconcile E-121 revision and acknowledgement. | project profitability certification: stale/retried E-121 could corrupt certified revenue, posted cost, estimate and variance. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-122 | SLA attainment report | Reporting Steward | Reporting | Revise SLA attainment report with scope/key/revision. | SLA attainment report: changes period numerator, eligible denominator, breach exclusions and certification; owner ledgers remain authoritative. | Reporting Steward proposes; another owner approves E-122. | Reconcile E-122 revision and acknowledgement. | SLA attainment report: stale/retried E-122 could corrupt period numerator, eligible denominator, breach exclusions and certification. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-123 | first-time-fix measure | Reporting Steward | Reporting | Revise first-time-fix measure with scope/key/revision. | first-time-fix measure: changes formula, event-time lineage and certification; owner ledgers remain authoritative. | Reporting Steward proposes; another owner approves E-123. | Reconcile E-123 revision and acknowledgement. | first-time-fix measure: stale/retried E-123 could corrupt formula, event-time lineage and certification. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-124 | service backlog aging | Reporting Steward | Reporting | Revise service backlog aging with scope/key/revision. | service backlog aging: changes formula, event-time lineage and certification; owner ledgers remain authoritative. | Reporting Steward proposes; another owner approves E-124. | Reconcile E-124 revision and acknowledgement. | service backlog aging: stale/retried E-124 could corrupt formula, event-time lineage and certification. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-125 | technician productivity view | Reporting Steward | Reporting | Revise technician productivity view with scope/key/revision. | technician productivity view: changes skill, assignment, field evidence and time; owner ledgers remain authoritative. | Reporting Steward proposes; another owner approves E-125. | Reconcile E-125 revision and acknowledgement. | technician productivity view: stale/retried E-125 could corrupt skill, assignment, field evidence and time. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-126 | billing reconciliation dashboard | Reporting Steward | Reporting | Revise billing reconciliation dashboard with scope/key/revision. | billing reconciliation dashboard: changes eligibility, acceptance, commercial response and posting; owner ledgers remain authoritative. | Reporting Steward proposes; another owner approves E-126. | Reconcile E-126 revision and acknowledgement. | billing reconciliation dashboard: stale/retried E-126 could corrupt eligibility, acceptance, commercial response and posting. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-127 | offline duplicate submission | Operations Controller | Continuity and AI | Revise offline duplicate submission with scope/key/revision. | offline duplicate submission: changes replayed command key, processed-event lookup and duplicate quarantine; owner ledgers remain authoritative. | Operations Controller proposes; another owner approves E-127. | Reconcile E-127 revision and acknowledgement. | offline duplicate submission: stale/retried E-127 could corrupt replayed command key, processed-event lookup and duplicate quarantine. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-128 | integration retry after timeout | Operations Controller | Continuity and AI | Revise integration retry after timeout with scope/key/revision. | integration retry after timeout: changes recovery/advisory provenance and human authority; owner ledgers remain authoritative. | Operations Controller proposes; another owner approves E-128. | Reconcile E-128 revision and acknowledgement. | integration retry after timeout: stale/retried E-128 could corrupt recovery/advisory provenance and human authority. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-129 | event replay quarantine | Operations Controller | Continuity and AI | Revise event replay quarantine with scope/key/revision. | event replay quarantine: changes recovery/advisory provenance and human authority; owner ledgers remain authoritative. | Operations Controller proposes; another owner approves E-129. | Reconcile E-129 revision and acknowledgement. | event replay quarantine: stale/retried E-129 could corrupt recovery/advisory provenance and human authority. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-130 | restored project chronology | Operations Controller | Continuity and AI | Revise restored project chronology with scope/key/revision. | restored project chronology: changes baseline, change, task and acceptance events after recovery; owner ledgers remain authoritative. | Operations Controller proposes; another owner approves E-130. | Reconcile E-130 revision and acknowledgement. | restored project chronology: stale/retried E-130 could corrupt baseline, change, task and acceptance events after recovery. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-131 | restored service chronology | Operations Controller | Continuity and AI | Revise restored service chronology with scope/key/revision. | restored service chronology: changes case, SLA, dispatch and customer-completion events after recovery; owner ledgers remain authoritative. | Operations Controller proposes; another owner approves E-131. | Reconcile E-131 revision and acknowledgement. | restored service chronology: stale/retried E-131 could corrupt case, SLA, dispatch and customer-completion events after recovery. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-132 | AI project summary | Operations Controller | Continuity and AI | Revise AI project summary with scope/key/revision. | AI project summary: changes advisory provenance, accountable review and prohibited consequence; owner ledgers remain authoritative. | Operations Controller proposes; another owner approves E-132. | Reconcile E-132 revision and acknowledgement. | AI project summary: stale/retried E-132 could corrupt advisory provenance, accountable review and prohibited consequence. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-133 | AI case classification | Operations Controller | Continuity and AI | Revise AI case classification with scope/key/revision. | AI case classification: changes customer obligation, chronology, assignment and closure; owner ledgers remain authoritative. | Operations Controller proposes; another owner approves E-133. | Reconcile E-133 revision and acknowledgement. | AI case classification: stale/retried E-133 could corrupt customer obligation, chronology, assignment and closure. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-134 | AI dispatch recommendation | Operations Controller | Continuity and AI | Revise AI dispatch recommendation with scope/key/revision. | AI dispatch recommendation: changes territory, route, safety and acceptance; owner ledgers remain authoritative. | Operations Controller proposes; another owner approves E-134. | Reconcile E-134 revision and acknowledgement. | AI dispatch recommendation: stale/retried E-134 could corrupt territory, route, safety and acceptance. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |
| E-135 | AI billing anomaly suggestion | Operations Controller | Continuity and AI | Revise AI billing anomaly suggestion with scope/key/revision. | AI billing anomaly suggestion: changes eligibility, acceptance, commercial response and posting; owner ledgers remain authoritative. | Operations Controller proposes; another owner approves E-135. | Reconcile E-135 revision and acknowledgement. | AI billing anomaly suggestion: stale/retried E-135 could corrupt eligibility, acceptance, commercial response and posting. | Sales: commercial response. | Finance: posting evidence. | Inventory: stock response. | Procurement: sourcing response. | Manufacturing: production response. | Maintenance: equipment response. | Quality: disposition response. | Workforce: eligibility response. |

### Architecture decision records

| ID | Decision | Status | Rationale and rejected unsafe alternative | Implementation consequence |
|---|---|---|---|---|
| ADR-001 | Separate Project and Service bounded contexts | Proposed | ADR-001: Separate Project and Service bounded contexts; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-002 | Project owns delivery plan but not accounting | Proposed | ADR-002: Project owns delivery plan but not accounting; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-003 | Service owns case execution but not customer commerce | Proposed | ADR-003: Service owns case execution but not customer commerce; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-004 | WBS uses stable immutable identity | Proposed | ADR-004: WBS uses stable immutable identity; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-005 | Project hierarchy forbids cycles | Proposed | ADR-005: Project hierarchy forbids cycles; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-006 | Program and portfolio remain distinct aggregates | Proposed | ADR-006: Program and portfolio remain distinct aggregates; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-007 | Project activation requires approved charter | Proposed | ADR-007: Project activation requires approved charter; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-008 | Project closure is reversible only by governed reopen | Proposed | ADR-008: Project closure is reversible only by governed reopen; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-009 | Task and deliverable are distinct | Proposed | ADR-009: Task and deliverable are distinct; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-010 | Milestone carries explicit acceptance criteria | Proposed | ADR-010: Milestone carries explicit acceptance criteria; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-011 | Scheduling stores calendars and constraints | Proposed | ADR-011: Scheduling stores calendars and constraints; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-012 | Baseline is immutable after approval | Proposed | ADR-012: Baseline is immutable after approval; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-013 | Rebaseline creates a new version | Proposed | ADR-013: Rebaseline creates a new version; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-014 | Change control preserves prior scope | Proposed | ADR-014: Change control preserves prior scope; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-015 | Resource demand precedes named assignment | Proposed | ADR-015: Resource demand precedes named assignment; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-016 | HR owns employee eligibility | Proposed | ADR-016: HR owns employee eligibility; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-017 | Capacity snapshots are event-time records | Proposed | ADR-017: Capacity snapshots are event-time records; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-018 | Time entry and timesheet are distinct | Proposed | ADR-018: Time entry and timesheet are distinct; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-019 | Timesheet approval cannot be self-approved | Proposed | ADR-019: Timesheet approval cannot be self-approved; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-020 | Payroll export is an acknowledgement boundary | Proposed | ADR-020: Payroll export is an acknowledgement boundary; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-021 | Expense evidence is not a journal | Proposed | ADR-021: Expense evidence is not a journal; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-022 | Finance owns actual project cost | Proposed | ADR-022: Finance owns actual project cost; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-023 | Budget and forecast are versioned separately | Proposed | ADR-023: Budget and forecast are versioned separately; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-024 | Committed cost comes from Procurement acknowledgement | Proposed | ADR-024: Committed cost comes from Procurement acknowledgement; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-025 | Fixed-price and T&M billing use separate eligibility rules | Proposed | ADR-025: Fixed-price and T&M billing use separate eligibility rules; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-026 | Sales creates invoices from approved requests | Proposed | ADR-026: Sales creates invoices from approved requests; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-027 | Finance owns revenue recognition | Proposed | ADR-027: Finance owns revenue recognition; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-028 | Project profitability requires certified sources | Proposed | ADR-028: Project profitability requires certified sources; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-029 | Procurement owns supplier commitments | Proposed | ADR-029: Procurement owns supplier commitments; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-030 | Inventory owns stock and valuation | Proposed | ADR-030: Inventory owns stock and valuation; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-031 | Manufacturing owns production order and WIP | Proposed | ADR-031: Manufacturing owns production order and WIP; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-032 | Maintenance owns equipment authority | Proposed | ADR-032: Maintenance owns equipment authority; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-033 | Quality owns inspection disposition | Proposed | ADR-033: Quality owns inspection disposition; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-034 | Project risk and issue are separate aggregates | Proposed | ADR-034: Project risk and issue are separate aggregates; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-035 | Documents use immutable revision references | Proposed | ADR-035: Documents use immutable revision references; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-036 | Customer project views use purpose-scoped projections | Proposed | ADR-036: Customer project views use purpose-scoped projections; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-037 | Service request and case are distinct | Proposed | ADR-037: Service request and case are distinct; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-038 | Case merge preserves all source identities | Proposed | ADR-038: Case merge preserves all source identities; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-039 | Case split preserves obligation genealogy | Proposed | ADR-039: Case split preserves obligation genealogy; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-040 | Severity and priority are independent | Proposed | ADR-040: Severity and priority are independent; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-041 | SLA clocks are append-only timelines | Proposed | ADR-041: SLA clocks are append-only timelines; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-042 | SLA pause requires reason and authority | Proposed | ADR-042: SLA pause requires reason and authority; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-043 | Entitlement uses event-time contract evidence | Proposed | ADR-043: Entitlement uses event-time contract evidence; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-044 | Warranty never overrides entitlement silently | Proposed | ADR-044: Warranty never overrides entitlement silently; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-045 | Service contract is commercial reference | Proposed | ADR-045: Service contract is commercial reference; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-046 | Installed base is not stock serial master | Proposed | ADR-046: Installed base is not stock serial master; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-047 | Service order is not manufacturing work order | Proposed | ADR-047: Service order is not manufacturing work order; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-048 | Service appointment is not workforce attendance | Proposed | ADR-048: Service appointment is not workforce attendance; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-049 | Dispatch requires skill, availability and location policy | Proposed | ADR-049: Dispatch requires skill, availability and location policy; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-050 | Offline commands require idempotency and revision | Proposed | ADR-050: Offline commands require idempotency and revision; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-051 | Remote support requires customer consent | Proposed | ADR-051: Remote support requires customer consent; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-052 | Service parts flow through Inventory | Proposed | ADR-052: Service parts flow through Inventory; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-053 | Defective returns retain custody chain | Proposed | ADR-053: Defective returns retain custody chain; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-054 | Service estimate requests Sales quotation | Proposed | ADR-054: Service estimate requests Sales quotation; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-055 | Completion and customer acceptance are separate | Proposed | ADR-055: Completion and customer acceptance are separate; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-056 | Service billing waits for eligibility acknowledgement | Proposed | ADR-056: Service billing waits for eligibility acknowledgement; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-057 | Service profitability uses certified costs | Proposed | ADR-057: Service profitability uses certified costs; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-058 | Cross-domain writes use request and acknowledgement | Proposed | ADR-058: Cross-domain writes use request and acknowledgement; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-059 | Integration events carry tenant and causal IDs | Proposed | ADR-059: Integration events carry tenant and causal IDs; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-060 | Reconciliation never repairs by direct edit | Proposed | ADR-060: Reconciliation never repairs by direct edit; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-061 | Exceptions have owner and aging policy | Proposed | ADR-061: Exceptions have owner and aging policy; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-062 | Project and Service use separate number series | Proposed | ADR-062: Project and Service use separate number series; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-063 | Optimistic concurrency protects mutable aggregates | Proposed | ADR-063: Optimistic concurrency protects mutable aggregates; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-064 | Terminal states require immutable evidence | Proposed | ADR-064: Terminal states require immutable evidence; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-065 | Audit payloads use minimization and redaction | Proposed | ADR-065: Audit payloads use minimization and redaction; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-066 | Retention and legal hold are explicit | Proposed | ADR-066: Retention and legal hold are explicit; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-067 | Customer portal reads projections only | Proposed | ADR-067: Customer portal reads projections only; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-068 | Subcontractors receive least privilege | Proposed | ADR-068: Subcontractors receive least privilege; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-069 | Delegation expires and is audited | Proposed | ADR-069: Delegation expires and is audited; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-070 | Segregation conflicts block approval | Proposed | ADR-070: Segregation conflicts block approval; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-071 | AI is advisory for consequential actions | Proposed | ADR-071: AI is advisory for consequential actions; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-072 | AI cannot post, dispatch or approve | Proposed | ADR-072: AI cannot post, dispatch or approve; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-073 | AI output retains model and source provenance | Proposed | ADR-073: AI output retains model and source provenance; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-074 | Reports publish formula and lineage | Proposed | ADR-074: Reports publish formula and lineage; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-075 | Certified measures freeze source cut-off | Proposed | ADR-075: Certified measures freeze source cut-off; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-076 | Availability targets distinguish write and read paths | Proposed | ADR-076: Availability targets distinguish write and read paths; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-077 | Recovery preserves event chronology | Proposed | ADR-077: Recovery preserves event chronology; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-078 | Retries are safe only with idempotency | Proposed | ADR-078: Retries are safe only with idempotency; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-079 | Schema evolution preserves consumer compatibility | Proposed | ADR-079: Schema evolution preserves consumer compatibility; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-080 | Observability avoids customer content by default | Proposed | ADR-080: Observability avoids customer content by default; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-081 | Data residency is a deployment policy | Deferred | ADR-081: Data residency is a deployment policy; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-082 | Secrets never enter project or case payloads | Deferred | ADR-082: Secrets never enter project or case payloads; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-083 | Exports are watermarked and authorized | Deferred | ADR-083: Exports are watermarked and authorized; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-084 | Bulk imports use staging and quarantine | Deferred | ADR-084: Bulk imports use staging and quarantine; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-085 | Deletion uses governed retention outcome | Deferred | ADR-085: Deletion uses governed retention outcome; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |
| ADR-086 | Mobile and offline detail belongs to FCSB-022 | Deferred | ADR-086: Mobile and offline detail belongs to FCSB-022; shared mutation would erase authority and chronology. | Requires invariant, revision, idempotency, audit and accepted boundary test. |

### Open decisions

| ID | Decision | Owner | Missing repository or policy evidence | Closure evidence | Status |
|---|---|---|---|---|---|
| OD-001 | Project numbering scope | Project Management | OD-001: no tenant/company project series, reuse and collision policy policy or runtime test. | Project Management decides tenant/company project series, reuse and collision policy, exception and evidence. | Open |
| OD-002 | Program numbering scope | Project Management | OD-002: no portfolio-level program identity across participating companies policy or runtime test. | Project Management decides portfolio-level program identity across participating companies, exception and evidence. | Open |
| OD-003 | Portfolio hierarchy authority | Project Management | OD-003: no portfolio hierarchy authority policy or runtime test. | Project Management decides portfolio hierarchy authority, exception and evidence. | Open |
| OD-004 | Cross-company project sponsorship | Project Management | OD-004: no cross-company project sponsorship policy or runtime test. | Project Management decides cross-company project sponsorship, exception and evidence. | Open |
| OD-005 | Project type taxonomy owner | Project Management | OD-005: no project type taxonomy owner policy or runtime test. | Project Management decides project type taxonomy owner, exception and evidence. | Open |
| OD-006 | Project reopen policy | Project Management | OD-006: no project reopen policy policy or runtime test. | Project Management decides project reopen policy, exception and evidence. | Open |
| OD-007 | WBS maximum depth | Project Management | OD-007: no wbs maximum depth policy or runtime test. | Project Management decides wbs maximum depth, exception and evidence. | Open |
| OD-008 | WBS renumbering policy | Project Management | OD-008: no wbs renumbering policy policy or runtime test. | Project Management decides wbs renumbering policy, exception and evidence. | Open |
| OD-009 | Task dependency cycle tolerance | Project Management | OD-009: no task dependency cycle tolerance policy or runtime test. | Project Management decides task dependency cycle tolerance, exception and evidence. | Open |
| OD-010 | Scheduling engine selection | Project Management | OD-010: no scheduling engine selection policy or runtime test. | Project Management decides scheduling engine selection, exception and evidence. | Open |
| OD-011 | Calendar precedence | Project Management | OD-011: no calendar precedence policy or runtime test. | Project Management decides calendar precedence, exception and evidence. | Open |
| OD-012 | Critical-path precision | Project Management | OD-012: no critical-path precision policy or runtime test. | Project Management decides critical-path precision, exception and evidence. | Open |
| OD-013 | Baseline approval thresholds | Project Management | OD-013: no baseline approval thresholds policy or runtime test. | Project Management decides baseline approval thresholds, exception and evidence. | Open |
| OD-014 | Rebaseline materiality threshold | Inventory | OD-014: no rebaseline materiality threshold policy or runtime test. | Inventory decides rebaseline materiality threshold, exception and evidence. | Open |
| OD-015 | Change-control emergency path | Project Management | OD-015: no change-control emergency path policy or runtime test. | Project Management decides change-control emergency path, exception and evidence. | Open |
| OD-016 | Deliverable acceptance delegation | Project Management | OD-016: no deliverable acceptance delegation policy or runtime test. | Project Management decides deliverable acceptance delegation, exception and evidence. | Open |
| OD-017 | Milestone evidence minimum | Project Management | OD-017: no milestone evidence minimum policy or runtime test. | Project Management decides milestone evidence minimum, exception and evidence. | Open |
| OD-018 | Resource skill taxonomy | Project Management | OD-018: no resource skill taxonomy policy or runtime test. | Project Management decides resource skill taxonomy, exception and evidence. | Open |
| OD-019 | Resource pool ownership | Project Management | OD-019: no resource pool ownership policy or runtime test. | Project Management decides resource pool ownership, exception and evidence. | Open |
| OD-020 | Resource soft-booking horizon | Project Management | OD-020: no resource soft-booking horizon policy or runtime test. | Project Management decides resource soft-booking horizon, exception and evidence. | Open |
| OD-021 | Capacity calculation calendar | Project Management | OD-021: no capacity calculation calendar policy or runtime test. | Project Management decides capacity calculation calendar, exception and evidence. | Open |
| OD-022 | Utilization target ownership | Project Management | OD-022: no utilization target ownership policy or runtime test. | Project Management decides utilization target ownership, exception and evidence. | Open |
| OD-023 | Timesheet period cadence | Project Management | OD-023: no timesheet period cadence policy or runtime test. | Project Management decides timesheet period cadence, exception and evidence. | Open |
| OD-024 | Timesheet correction window | Project Management | OD-024: no timesheet correction window policy or runtime test. | Project Management decides timesheet correction window, exception and evidence. | Open |
| OD-025 | Time-entry rounding | Project Management | OD-025: no time-entry rounding policy or runtime test. | Project Management decides time-entry rounding, exception and evidence. | Open |
| OD-026 | Overtime source precedence | Project Management | OD-026: no overtime source precedence policy or runtime test. | Project Management decides overtime source precedence, exception and evidence. | Open |
| OD-027 | Attendance reconciliation threshold | HR/Workforce | OD-027: no attendance reconciliation threshold policy or runtime test. | HR/Workforce decides attendance reconciliation threshold, exception and evidence. | Open |
| OD-028 | Leave-overlap treatment | HR/Workforce | OD-028: no leave-overlap treatment policy or runtime test. | HR/Workforce decides leave-overlap treatment, exception and evidence. | Open |
| OD-029 | Payroll export contract | HR/Workforce | OD-029: no payroll export contract policy or runtime test. | HR/Workforce decides payroll export contract, exception and evidence. | Open |
| OD-030 | Expense policy source | Project Management | OD-030: no expense policy source policy or runtime test. | Project Management decides expense policy source, exception and evidence. | Open |
| OD-031 | Receipt retention | Project Management | OD-031: no receipt retention policy or runtime test. | Project Management decides receipt retention, exception and evidence. | Open |
| OD-032 | Expense currency date | Project Management | OD-032: no expense currency date policy or runtime test. | Project Management decides expense currency date, exception and evidence. | Open |
| OD-033 | Project budget ledger integration | Finance | OD-033: no project budget ledger integration policy or runtime test. | Finance decides project budget ledger integration, exception and evidence. | Open |
| OD-034 | Forecast cadence | Project Management | OD-034: no forecast cadence policy or runtime test. | Project Management decides forecast cadence, exception and evidence. | Open |
| OD-035 | Estimate-at-completion formula | Project Management | OD-035: no estimate-at-completion formula policy or runtime test. | Project Management decides estimate-at-completion formula, exception and evidence. | Open |
| OD-036 | Committed-cost recognition point | Project Management | OD-036: no committed-cost recognition point policy or runtime test. | Project Management decides committed-cost recognition point, exception and evidence. | Open |
| OD-037 | Actual-cost event contract | Project Management | OD-037: no actual-cost event contract policy or runtime test. | Project Management decides actual-cost event contract, exception and evidence. | Open |
| OD-038 | Project capitalization eligibility | Finance | OD-038: no project capitalization eligibility policy or runtime test. | Finance decides project capitalization eligibility, exception and evidence. | Open |
| OD-039 | Project asset handover event | Project Management | OD-039: no project asset handover event policy or runtime test. | Project Management decides project asset handover event, exception and evidence. | Open |
| OD-040 | Fixed-price billing eligibility | Finance | OD-040: no accepted deliverable, contract percentage, holdback and Sales order term policy or runtime test. | Finance decides accepted deliverable, contract percentage, holdback and Sales order term, exception and evidence. | Open |
| OD-041 | T&M billing rounding | Finance | OD-041: no t&m billing rounding policy or runtime test. | Finance decides t&m billing rounding, exception and evidence. | Open |
| OD-042 | Milestone billing partial acceptance | Finance | OD-042: no milestone billing partial acceptance policy or runtime test. | Finance decides milestone billing partial acceptance, exception and evidence. | Open |
| OD-043 | Billing hold authority | Finance | OD-043: no billing hold authority policy or runtime test. | Finance decides billing hold authority, exception and evidence. | Open |
| OD-044 | Credit request evidence | Project Management | OD-044: no credit request evidence policy or runtime test. | Project Management decides credit request evidence, exception and evidence. | Open |
| OD-045 | Revenue recognition boundary event | Finance | OD-045: no revenue recognition boundary event policy or runtime test. | Finance decides revenue recognition boundary event, exception and evidence. | Open |
| OD-046 | Profitability certification owner | Finance | OD-046: no profitability certification owner policy or runtime test. | Finance decides profitability certification owner, exception and evidence. | Open |
| OD-047 | Project procurement approval threshold | Procurement | OD-047: no project procurement approval threshold policy or runtime test. | Procurement decides project procurement approval threshold, exception and evidence. | Open |
| OD-048 | Subcontractor work evidence | Procurement | OD-048: no subcontractor work evidence policy or runtime test. | Procurement decides subcontractor work evidence, exception and evidence. | Open |
| OD-049 | Project material reservation horizon | Inventory | OD-049: no project material reservation horizon policy or runtime test. | Inventory decides project material reservation horizon, exception and evidence. | Open |
| OD-050 | Project stock return disposition | Quality | OD-050: no project stock return disposition policy or runtime test. | Quality decides project stock return disposition, exception and evidence. | Open |
| OD-051 | Manufacturing demand acknowledgement | Manufacturing | OD-051: no manufacturing demand acknowledgement policy or runtime test. | Manufacturing decides manufacturing demand acknowledgement, exception and evidence. | Open |
| OD-052 | Project WIP source contract | Manufacturing | OD-052: no project wip source contract policy or runtime test. | Manufacturing decides project wip source contract, exception and evidence. | Open |
| OD-053 | Quality hold propagation | Quality | OD-053: no quality hold propagation policy or runtime test. | Quality decides quality hold propagation, exception and evidence. | Open |
| OD-054 | Commissioning acceptance owner | Project Management | OD-054: no commissioning acceptance owner policy or runtime test. | Project Management decides commissioning acceptance owner, exception and evidence. | Open |
| OD-055 | Customer project portal fields | Project Management | OD-055: no customer project portal fields policy or runtime test. | Project Management decides customer project portal fields, exception and evidence. | Open |
| OD-056 | Service case numbering | Service Management | OD-056: no service case numbering policy or runtime test. | Service Management decides service case numbering, exception and evidence. | Open |
| OD-057 | Case merge approval | Service Management | OD-057: no case merge approval policy or runtime test. | Service Management decides case merge approval, exception and evidence. | Open |
| OD-058 | Case split SLA treatment | Service Management | OD-058: no case split sla treatment policy or runtime test. | Service Management decides case split sla treatment, exception and evidence. | Open |
| OD-059 | Severity matrix owner | Project Management | OD-059: no severity matrix owner policy or runtime test. | Project Management decides severity matrix owner, exception and evidence. | Open |
| OD-060 | Priority override authority | Project Management | OD-060: no priority override authority policy or runtime test. | Project Management decides priority override authority, exception and evidence. | Open |
| OD-061 | SLA business-calendar source | Service Management | OD-061: no sla business-calendar source policy or runtime test. | Service Management decides sla business-calendar source, exception and evidence. | Open |
| OD-062 | SLA pause reasons | Service Management | OD-062: no sla pause reasons policy or runtime test. | Service Management decides sla pause reasons, exception and evidence. | Open |
| OD-063 | Entitlement stacking | Service Management | OD-063: no entitlement stacking policy or runtime test. | Service Management decides entitlement stacking, exception and evidence. | Open |
| OD-064 | Contract consumption measure | Reporting | OD-064: no contract consumption measure policy or runtime test. | Reporting decides contract consumption measure, exception and evidence. | Open |
| OD-065 | Warranty precedence | Service Management | OD-065: no warranty precedence policy or runtime test. | Service Management decides warranty precedence, exception and evidence. | Open |
| OD-066 | Installed-base identity source | Project Management | OD-066: no installed-base identity source policy or runtime test. | Project Management decides installed-base identity source, exception and evidence. | Open |
| OD-067 | Service order type taxonomy | Service Management | OD-067: no service order type taxonomy policy or runtime test. | Service Management decides service order type taxonomy, exception and evidence. | Open |
| OD-068 | Appointment time-zone policy | Service Management | OD-068: no appointment time-zone policy policy or runtime test. | Service Management decides appointment time-zone policy, exception and evidence. | Open |
| OD-069 | Dispatch optimization authority | Service Management | OD-069: no dispatch optimization authority policy or runtime test. | Service Management decides dispatch optimization authority, exception and evidence. | Open |
| OD-070 | Technician location retention | Service Management | OD-070: no technician location retention policy or runtime test. | Service Management decides technician location retention, exception and evidence. | Open |
| OD-071 | Offline conflict resolution | Project Management | OD-071: no offline conflict resolution policy or runtime test. | Project Management decides offline conflict resolution, exception and evidence. | Open |
| OD-072 | Remote support recording consent | Service Management | OD-072: no remote support recording consent policy or runtime test. | Service Management decides remote support recording consent, exception and evidence. | Open |
| OD-073 | Van stock ownership | Inventory | OD-073: no van stock ownership policy or runtime test. | Inventory decides van stock ownership, exception and evidence. | Open |
| OD-074 | Defective-part return deadline | Project Management | OD-074: no defective-part return deadline policy or runtime test. | Project Management decides defective-part return deadline, exception and evidence. | Open |
| OD-075 | Service quotation expiration | Service Management | OD-075: no service quotation expiration policy or runtime test. | Service Management decides service quotation expiration, exception and evidence. | Open |
| OD-076 | Customer signature alternative | Project Management | OD-076: no customer signature alternative policy or runtime test. | Project Management decides customer signature alternative, exception and evidence. | Open |
| OD-077 | Service completion reversal | Service Management | OD-077: no service completion reversal policy or runtime test. | Service Management decides service completion reversal, exception and evidence. | Open |
| OD-078 | Service billing eligibility | Finance | OD-078: no completed service order, customer signature, entitlement outcome and quotation policy or runtime test. | Finance decides completed service order, customer signature, entitlement outcome and quotation, exception and evidence. | Open |
| OD-079 | First-time-fix formula | Project Management | OD-079: no first-time-fix formula policy or runtime test. | Project Management decides first-time-fix formula, exception and evidence. | Open |
| OD-080 | Service profitability source | Finance | OD-080: no service profitability source policy or runtime test. | Finance decides service profitability source, exception and evidence. | Open |

### RACI model

The model uses 33 distinct roles. Every activity has exactly one Accountable role and one different Responsible role; combined A/R assignments are prohibited. Roles: Executive Sponsor, PMO, Program Manager, Project Manager, Project Controls, Resource Manager, Project Controller, Service Management, Customer Service, Service Contract Manager, Field Service, Service Dispatcher, Technician, Sales, Finance, Cost Accounting, Procurement, Supplier Management, Inventory, Warehouse, Manufacturing, Engineering, Maintenance, Quality, HR/Workforce, Payroll, Security, Data Governance, Reporting, Internal Audit, Operations, Customer Representative, Platform Engineering.

| ID | Activity | Accountable | Responsible | Consulted | Informed |
|---|---|---|---|---|---|
| RA-001 | Approve project charter | Executive Sponsor | PMO | Project Manager, Service Dispatcher | Inventory, HR/Workforce |
| RA-002 | Register project identity | Data Governance | PMO | Service Management, Finance | Quality, Internal Audit |
| RA-003 | Approve program membership | Program Manager | PMO | Field Service, Inventory | Reporting, Executive Sponsor |
| RA-004 | Set portfolio priority | Executive Sponsor | Program Manager | Sales, Engineering | Service Management, PMO |
| RA-005 | Design WBS | Project Manager | Project Controls | Supplier Management, HR/Workforce | Project Controller, Technician |
| RA-006 | Approve WBS release | PMO | Project Manager | Manufacturing, Data Governance | Service Dispatcher, Inventory |
| RA-007 | Create deliverable | Project Manager | Engineering | Quality, Operations | Supplier Management, Executive Sponsor |
| RA-008 | Accept project milestone | Customer Representative | Project Manager | Security, Executive Sponsor | Maintenance, Reporting |
| RA-009 | Build project schedule | Project Manager | Project Controls | Internal Audit, Data Governance | Executive Sponsor, PMO |
| RA-010 | Approve planning baseline | PMO | Project Controls | Platform Engineering, Service Management | Project Controller, Executive Sponsor |
| RA-011 | Raise scope change | Project Manager | Project Controls | Program Manager, Field Service | Resource Manager, Service Dispatcher |
| RA-012 | Approve rebaseline | PMO | Project Manager | Project Controller, Sales | Field Service, Supplier Management |
| RA-013 | Forecast resource demand | Resource Manager | Project Manager | Customer Service, Supplier Management | Procurement, Maintenance |
| RA-014 | Confirm employee eligibility | HR/Workforce | Resource Manager | Technician, Warehouse | Manufacturing, Data Governance |
| RA-015 | Allocate named resource | Resource Manager | Project Manager | Cost Accounting, Maintenance | Security, Platform Engineering |
| RA-016 | Resolve capacity collision | Operations | Resource Manager | Inventory, Security | Customer Representative, Project Controls |
| RA-017 | Submit time entry | Resource Manager | Technician | Maintenance, Internal Audit | Project Controls, Service Dispatcher |
| RA-018 | Approve timesheet | Project Manager | Project Controls | Payroll, Platform Engineering | Field Service, Procurement |
| RA-019 | Correct rejected timesheet | Resource Manager | Technician | Reporting, Program Manager | Cost Accounting, Engineering |
| RA-020 | Reconcile payroll time | Payroll | HR/Workforce | Customer Representative, Resource Manager | Inventory, Security |
| RA-021 | Submit project expense | Project Controller | Project Manager | PMO, Service Contract Manager | Payroll, Customer Representative |
| RA-022 | Approve project expense | Finance | Project Controller | Resource Manager, Technician | Operations, Project Manager |
| RA-023 | Set project budget | Finance | Project Controller | Service Management, Procurement | Program Manager, Customer Service |
| RA-024 | Approve forecast revision | Finance | Project Controller | Field Service, Warehouse | Service Management, Sales |
| RA-025 | Reconcile actual project cost | Finance | Cost Accounting | Maintenance, Sales | Manufacturing, Executive Sponsor |
| RA-026 | Request milestone billing | Sales | Project Manager | Inventory, Payroll | Warehouse, Executive Sponsor |
| RA-027 | Request T&M billing | Sales | Project Controller | Engineering, Reporting | HR/Workforce, Operations |
| RA-028 | Create customer invoice | Sales | Finance | HR/Workforce, Customer Representative | Internal Audit, Program Manager |
| RA-029 | Certify project profitability | Finance | Cost Accounting | Data Governance, PMO | Service Management, Executive Sponsor |
| RA-030 | Raise project requisition | Procurement | Project Manager | Operations, Project Controls | Project Controller, Technician |
| RA-031 | Issue purchase order | Procurement | Supplier Management | Executive Sponsor, Service Management | Service Dispatcher, Warehouse |
| RA-032 | Acknowledge supplier commitment | Procurement | Supplier Management | Project Manager, Field Service | Inventory, HR/Workforce |
| RA-033 | Reserve project material | Inventory | Warehouse | Project Controller, Sales | Quality, Internal Audit |
| RA-034 | Issue project material | Inventory | Warehouse | Service Contract Manager, Procurement | Reporting, PMO |
| RA-035 | Return project material | Inventory | Warehouse | Technician, Engineering | Executive Sponsor, Project Controller |
| RA-036 | Release manufacturing order | Manufacturing | Engineering | Cost Accounting, HR/Workforce | Resource Manager, Service Dispatcher |
| RA-037 | Acknowledge production completion | Manufacturing | Engineering | Inventory, Data Governance | Field Service, Procurement |
| RA-038 | Approve quality disposition | Quality | Engineering | Operations, Cost Accounting | Executive Sponsor, PMO |
| RA-039 | Handover capital candidate | Finance | Project Controller | Security, Executive Sponsor | Manufacturing, Reporting |
| RA-040 | Register project risk | Project Manager | Project Controls | Internal Audit, Data Governance | Executive Sponsor, PMO |
| RA-041 | Escalate project issue | PMO | Project Manager | Platform Engineering, Service Management | Project Controller, Executive Sponsor |
| RA-042 | Publish customer project view | Project Manager | Reporting | Program Manager, Field Service | Resource Manager, Service Dispatcher |
| RA-043 | Capture service request | Customer Service | Service Management | Resource Manager, Finance | Service Dispatcher, Supplier Management |
| RA-044 | Create service case | Service Management | Customer Service | Field Service, Supplier Management | Procurement, Maintenance |
| RA-045 | Merge duplicate cases | Service Management | Customer Service | Technician, Manufacturing | Engineering, Data Governance |
| RA-046 | Split service obligation | Service Management | Customer Service | Cost Accounting, Quality | Security, Platform Engineering |
| RA-047 | Assign case severity | Service Management | Customer Service | Warehouse, Security | Customer Representative, Project Controls |
| RA-048 | Override case priority | Service Management | Customer Service | Maintenance, Internal Audit | Project Manager, Service Dispatcher |
| RA-049 | Start SLA clock | Service Management | Customer Service | Payroll, Platform Engineering | Field Service, Procurement |
| RA-050 | Approve SLA pause | Service Contract Manager | Service Management | Reporting, Program Manager | Cost Accounting, Engineering |
| RA-051 | Validate entitlement | Service Contract Manager | Customer Service | Customer Representative, Resource Manager | Manufacturing, Security |
| RA-052 | Resolve warranty overlap | Service Contract Manager | Maintenance | PMO, Field Service | Payroll, Customer Representative |
| RA-053 | Release service order | Service Management | Field Service | Project Controls, Sales | Operations, Project Manager |
| RA-054 | Confirm appointment | Customer Service | Service Dispatcher | Service Management, Procurement | Program Manager, Executive Sponsor |
| RA-055 | Assign field technician | Field Service | Service Dispatcher | Technician, Warehouse | Service Management, Cost Accounting |
| RA-056 | Authorize remote support | Security | Field Service | Cost Accounting, Maintenance | Finance, Manufacturing |
| RA-057 | Reserve service spare | Inventory | Field Service | Procurement, Payroll | Supplier Management, Executive Sponsor |
| RA-058 | Consume service spare | Inventory | Technician | Engineering, Reporting | HR/Workforce, Operations |
| RA-059 | Return defective part | Inventory | Field Service | HR/Workforce, Customer Representative | Internal Audit, Program Manager |
| RA-060 | Request service estimate | Sales | Service Management | Data Governance, PMO | Customer Service, Executive Sponsor |
| RA-061 | Create sales quotation | Sales | Customer Service | Operations, Resource Manager | Service Management, Executive Sponsor |
| RA-062 | Record field completion | Field Service | Technician | Executive Sponsor, Service Management | Sales, Warehouse |
| RA-063 | Record customer acceptance | Customer Representative | Field Service | Project Manager, Technician | Inventory, HR/Workforce |
| RA-064 | Request service billing | Sales | Service Management | Project Controller, Cost Accounting | Quality, Internal Audit |
| RA-065 | Certify service profitability | Finance | Cost Accounting | Service Dispatcher, Inventory | Reporting, PMO |
| RA-066 | Reconcile project to GL | Finance | Project Controller | Sales, Engineering | Executive Sponsor, Service Management |
| RA-067 | Reconcile project to Inventory | Inventory | Project Controls | Procurement, HR/Workforce | Project Controller, Technician |
| RA-068 | Reconcile project to Procurement | Procurement | Project Controls | Manufacturing, Data Governance | Service Dispatcher, Inventory |
| RA-069 | Reconcile project to Manufacturing | Manufacturing | Project Controls | Quality, Operations | Cost Accounting, Executive Sponsor |
| RA-070 | Reconcile service to Sales | Sales | Service Management | Security, Executive Sponsor | Maintenance, Reporting |
| RA-071 | Reconcile service to Finance | Finance | Service Management | Internal Audit, Project Manager | Data Governance, Executive Sponsor |
| RA-072 | Reconcile service to Inventory | Inventory | Service Management | Platform Engineering, Project Controller | Executive Sponsor, PMO |
| RA-073 | Reconcile service to Maintenance | Maintenance | Service Management | Program Manager, Field Service | Resource Manager, Service Dispatcher |
| RA-074 | Reconcile timesheet to payroll | Payroll | HR/Workforce | Service Management, Finance | Service Dispatcher, Supplier Management |
| RA-075 | Reconcile billing requests | Finance | Sales | Service Contract Manager, Supplier Management | Procurement, Maintenance |
| RA-076 | Approve customer portal access | Security | Customer Service | Service Dispatcher, Inventory | Warehouse, Payroll |
| RA-077 | Review segregation conflict | Security | Internal Audit | Finance, Engineering | HR/Workforce, Platform Engineering |
| RA-078 | Approve privileged correction | Security | Platform Engineering | Supplier Management, HR/Workforce | Customer Representative, Project Controls |
| RA-079 | Review retention disposal | Data Governance | Internal Audit | Manufacturing, Reporting | Project Manager, Service Contract Manager |
| RA-080 | Approve AI use case | Security | Data Governance | Quality, Platform Engineering | Customer Service, Finance |


## Chapter 64 — Approval and Roadmap

Architecture Review Draft approval records that the design is coherent, not that implementation may begin. Coding requires a separate milestone, resolved decisions, contracts, threat tests and cross-domain acceptance.

### Approval posture

Volume 21 is an **Architecture Review Draft**. Approval would accept bounded-context ownership, event and reconciliation contracts, risk posture, decision proposals and the implementation roadmap; it would not mark a target capability implemented. The first implementation milestone must add dedicated schema, migration, service/controller behavior and accepted tests before any status changes. Detailed mobile and offline command handling remains controlled by FCSB-022.

### Delivery sequence

1. Approve domain ownership, terminology, tenant/company/customer scope and identifiers.
2. Implement project master, WBS, lifecycle, immutable baseline and audit evidence.
3. Add resource demand, assignment, time, expense and Finance/HR reconciliation.
4. Add service request, case, SLA, entitlement and service-order aggregates.
5. Integrate Sales, Finance, Inventory, Procurement, Manufacturing, Maintenance, Quality and HR/Workforce only through accepted requests and acknowledgements.
6. Certify security, segregation, retention, observability, availability and cross-domain reconciliation.

### Version history

| Version | Date | Status | Change |
|---|---|---|---|
| 1.0 | 2026-07-18 | Architecture Review Draft | Initial Project and Service Management architecture; documentation only. |

### Controlled architecture concerns

| Design lens | Controlled concepts | Required treatment |
|---|---|---|
| Identity and grain | approval roles, pre-coding work, no implementation authorization | Scope and identify approval roles, pre-coding work, no implementation authorization; retain event time. |
| Lifecycle and evidence | approval conditions, cross-domain prerequisites | Version approval conditions, cross-domain prerequisites; correct by linked event. |
| Authority and reconciliation | version history, FCSB-022 readiness | Name owner and acknowledgement for version history, FCSB-022 readiness. |

**Ownership boundary.** Approval leaves all target capabilities Planned or Future until an accepted implementation milestone proves them.

### Architecture views

**Governance and approval**

~~~mermaid
flowchart LR
    Governanceandappro0["Governance and approval"]
    Governanceandappro1["approval roles"]
    Governanceandappro2["approval conditions"]
    Governanceandappro3["version history"]
    Governanceandappro4["pre-coding work"]
    Governanceandappro5["cross-domain prerequisites"]
    Governanceandappro6["FCSB-022 readiness"]
    Governanceandappro0 --> Governanceandappro1
    Governanceandappro1 --> Governanceandappro2
    Governanceandappro2 --> Governanceandappro3
    Governanceandappro3 --> Governanceandappro4
    Governanceandappro4 --> Governanceandappro5
    Governanceandappro3 -- "exception" --> Governanceandappro6
    Governanceandappro6 -- "reconcile" --> Governanceandappro0
~~~
