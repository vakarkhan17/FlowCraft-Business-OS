# FlowCraft Solution Blueprint

## Volume 20 — Maintenance and Asset Reliability Architecture

| Document control | Value |
|---|---|
| Document code | FCSB-020 |
| Version | 1.0 Draft |
| Status | Architecture Review Draft |
| Last updated | 2026-07-18 |
| Scope | Maintenance and Asset Reliability architecture; documentation only |
| Approval | Pending Architecture Board, Maintenance, Asset Management, Reliability, Manufacturing, Production Planning, Inventory, Warehouse, Quality, Procurement, Finance, Cost Accounting, Engineering, Safety/HSE, Data Governance, Security, Integration, Reporting, Operations and Internal Audit Review |
| Predecessors | FCSB-001 through FCSB-019 |
| Next planned volume | FCSB-021 — Project and Service Management Architecture |

> This architecture does not prove or authorize an operational EAM/CMMS. **Implemented foundation** is reserved for a narrow capability supported by concrete model/field, migration and service or accepted-test evidence. **Partial** denotes incomplete behavior; **Scaffold** a reusable generic primitive; **Registered metadata only** an enum, seed or object registration without execution; **Planned** a governed target; and **Future** a deferred technology direction. A generic transaction, workflow, EOR or seeded code is never treated as maintenance runtime.

## Status and authority conventions

Current-state claims are intentionally narrow. Maintenance owns equipment condition, maintenance work and technical release. Inventory owns spare and tool movements; Manufacturing owns production execution and restart; Quality owns product and inspection disposition; Procurement owns supplier commerce; Finance owns accounting and settlement; Safety/HSE owns permits and isolation where defined. Cross-domain changes use requests and acknowledgements, never direct writes.

## 1. Purpose and Scope

FCSB-020 defines the target operating model for maintainable assets, equipment work, reliability evidence, spares coordination, calibration dependencies and maintenance cost requests before an EAM/CMMS runtime is designed. It is written for architecture, Maintenance, Asset Management, Reliability, Operations and every domain that receives a maintenance effect request.

The volume does not implement an asset register, schedule work, move a spare, stop production, approve inspection evidence, procure a service, authorize hazardous work or post cost. It follows Manufacturing Execution and Quality because equipment readiness must now be connected to—yet remain separate from—production and product-disposition authority. FCSB-001 through FCSB-019 remain controlling context; FCSB-021 through FCSB-025 remain future roadmap work.

**Controlled concepts:** purpose; audience; scope; out of scope; predecessor volumes; future volumes; equipment authority; cross-domain requests.

## 2. Executive Summary

The accepted repository contains organization, item, supplier, serial-warranty and generic platform foundations, plus Maintenance vocabulary registered in enums and seed metadata. It contains no dedicated Equipment, Functional Location, Maintenance Request, Notification, Maintenance Order, Breakdown, Meter, Calibration or Reliability runtime and therefore cannot be presented as an operational CMMS.

The target separates technical-object governance, strategy and plans, intake, order control, scheduling, technician evidence, spares and services, safety coordination, reliability analysis, calibration, costing and reconciliation. Maintenance decides equipment condition and return-to-service; Manufacturing decides restart, Inventory moves spares, Quality decides inspection consequences, Procurement owns supplier commerce, Finance posts value and Safety/HSE authorizes permits and isolation.

**Controlled concepts:** current foundations; metadata scaffolds; EAM absence; target layers; work management; reliability; spares; calibration; costing; maturity.

## 3. Maintenance and Reliability Principles

Maintenance records must distinguish request, notification, order, operation, completion, technical closure, equipment release and financial settlement. Asset hierarchy, strategy, criticality, task-list and preventive-plan versions are immutable once used; meter readings and technical events remain attributable and corrections append rather than overwrite.

A spare requirement is not a reservation and a reservation is not an issue. Calibration completion changes instrument state but cannot clear historical Quality evidence. Failure coding records observation rather than proving root cause. AI and predictive models may recommend work but cannot approve an order, clear a permit, release equipment, restart production, issue stock or post finance effects.

**Controlled concepts:** equipment condition; return to service; production restart; product disposition; spare movement; cost posting; request versus order; technical closure; settlement; calibration impact; immutable history; AI restriction.

The following non-equivalence rules are mandatory architecture constraints:

- Equipment condition does not equal Inventory stock status.
- Maintenance hold does not equal Manufacturing production stop.
- Equipment release does not equal Quality release.
- Work-order completion does not equal equipment return-to-service.
- Equipment return-to-service does not equal production restart.
- Breakdown does not automatically create financial posting.
- Spare requirement does not equal Inventory reservation.
- Spare reservation does not equal spare issue.
- Maintenance completion does not equal Finance settlement.
- Calibration completion does not equal Quality acceptance of historical inspection results.
- Failed calibration requires Quality impact assessment where inspection evidence is affected.
- Warranty eligibility does not equal Procurement commercial claim.
- External service completion does not equal supplier invoice approval.
- Maintenance technical closure does not equal asset capitalization or retirement.
- AI may recommend only; it cannot approve consequential maintenance states or cross-domain effects.

## 4. Current Maintenance Baseline

The baseline supports tenant, company, plant, department, location, cost center, profit center, warehouse, Item, Manufacturer, Supplier, SerialNumber and User identity. Item.isMaintenanceSpare and SerialNumber warranty dates are concrete fields; Maintenance role/module/transaction enums and ASSET, MAINTENANCE_REQUEST and MAINTENANCE_WORK_ORDER seed records are vocabulary only.

Generic TransactionDocument, TransactionLink, WorkflowDefinition, ApprovalRequest, NumberSeries, AuditLog, ReportDefinition, Digital DNA and dashboard services are reusable scaffolds. None supplies equipment state, work planning, permit gates, PM calculation, spare issue, calibration execution, reliability formulae or settlement. No Maintenance controller, service, DTO, route or accepted Maintenance test exists.

**Controlled concepts:** Plant; Department; Location; CostCenter; ProfitCenter; Warehouse; Item spare flag; Supplier; Manufacturer; Serial warranty; generic transaction; workflow; audit; reporting; current limitations.

| Evidence-backed element | Classification | Concrete evidence | Maintenance limitation |
|---|---|---|---|
| Plant, department and location | Implemented foundation | [Organization models](../../apps/api/prisma/schema.prisma#L383); [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql); [organization tests](../../apps/api/test/organization.spec.ts) | Organization scope exists; maintenance plant, planning plant, work center, crew and functional location do not. |
| Cost center and profit center | Implemented foundation | [CostCenter and ProfitCenter](../../apps/api/prisma/schema.prisma#L638); [organization service](../../apps/api/src/organization/organization-entities.service.ts) | Finance-owned references exist; there is no maintenance costing or settlement runtime. |
| Maintenance-spare classification | Implemented foundation | [Item.isMaintenanceSpare](../../apps/api/prisma/schema.prisma#L1418); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [registry](../../apps/api/src/master-data/master-data.registry.ts) | A Boolean identifies potential spares; no availability, reservation, issue, return or fitted-component process exists. |
| Manufacturer, Supplier and SerialNumber | Implemented foundation | [Master models](../../apps/api/prisma/schema.prisma#L1459); [DBA-004 report](../implementation/DBA-004-enterprise-master-data-implementation.md); [master-data tests](../../apps/api/test/master-data.spec.ts) | Referenced identities and warranty dates exist; equipment, warranty eligibility, contractor and service aggregates do not. |
| Maintenance enums and EOR seeds | Registered metadata only | [Transaction kinds](../../apps/api/prisma/schema.prisma#L72); [seed registrations](../../apps/api/prisma/seed.ts#L30) | Codes do not implement request, order, completion, asset or spare-issue behavior. |
| Generic platform records | Scaffold | [TransactionDocument](../../apps/api/prisma/schema.prisma#L2321); [WorkflowDefinition](../../apps/api/prisma/schema.prisma#L1135); [AuditLog](../../apps/api/prisma/schema.prisma#L1357) | No maintenance-specific state machine, authority policy, reconciliation or runtime test is present. |

~~~mermaid
flowchart LR
    CurrentMaintenanceA["Current maintenance baseline"]
    CurrentMaintenanceB["Location"]
    CurrentMaintenanceC["CostCenter"]
    CurrentMaintenanceD["ProfitCenter"]
    CurrentMaintenanceE["Warehouse"]
    CurrentMaintenanceF["Item spare flag"]
    CurrentMaintenanceB --> CurrentMaintenanceC --> CurrentMaintenanceD --> CurrentMaintenanceE --> CurrentMaintenanceF
    CurrentMaintenanceA -.-> CurrentMaintenanceD
~~~

## 5. Target Maintenance Architecture

The target architecture is layered so technical-object identity and history remain stable beneath strategy, intake, work-order, scheduling and execution services. Coordination adapters exchange versioned requests and acknowledgements with Inventory, Manufacturing, Quality, Procurement, Finance and Safety/HSE rather than writing those domains' records.

Reliability, calibration, cost and reporting projections read governed maintenance evidence without mutating it. Mobile, offline, sensors and AI occupy constrained edge layers: their submissions carry device, user, time, source and confidence provenance and remain provisional until server-side validation and accountable review.

**Controlled concepts:** technical object foundation; strategy planning; intake; work orders; scheduling; dispatch; technician execution; spares; external service; safety; calibration; reliability; costing; reconciliation; mobile IoT AI.

The fifteen target layers are ordered as a dependency model, not a deployment prescription: technical objects; strategy/planning; intake; work orders; scheduling/dispatch; technician execution; spare/tool coordination; external services; safety/permits; calibration/measurement; reliability/health; costing; reporting/reconciliation; security/audit/operations; and mobile/offline/IoT/AI direction.

~~~mermaid
flowchart TB
    TargetMaintenanceLA["Target maintenance layers"]
    TargetMaintenanceLB["technical object foundation"]
    TargetMaintenanceLC["strategy planning"]
    TargetMaintenanceLD["intake"]
    TargetMaintenanceLE["work orders"]
    TargetMaintenanceLF["scheduling"]
    TargetMaintenanceLB --> TargetMaintenanceLC
    TargetMaintenanceLC --> TargetMaintenanceLD
    TargetMaintenanceLC --> TargetMaintenanceLE
    TargetMaintenanceLD & TargetMaintenanceLE --> TargetMaintenanceLF
    TargetMaintenanceLA -.-> TargetMaintenanceLC
~~~

## 6. Maintenance Organization Model

Maintenance authority is scoped by tenant, company, maintenance plant, planning plant, department and maintenance work center. The Asset Manager governs technical-object identity; the Maintenance Manager owns site execution; planners define job scope; schedulers allocate capacity; supervisors dispatch; technicians capture work; Reliability Engineers analyze performance; Metrology governs instruments within its assigned authority.

Crew membership, skill, shift, delegation and contractor sponsorship are effective-dated. Cost center assignment describes expected responsibility but does not grant Finance posting rights. Safety/HSE remains independent for permit and isolation authorization, and a central planning group cannot silently assume a plant's equipment-release authority.

**Controlled concepts:** tenant; company; maintenance plant; planning plant; department; work center; crew; technician; planner; scheduler; supervisor; reliability engineer; asset manager; metrology; contractor; Safety/HSE; cost center.

~~~mermaid
flowchart LR
    MaintenanceOrganizA["Maintenance organization"]
    MaintenanceOrganizB["metrology"]
    MaintenanceOrganizC["contractor"]
    MaintenanceOrganizD["Safety/HSE"]
    MaintenanceOrganizE["cost center"]
    MaintenanceOrganizF["tenant"]
    MaintenanceOrganizB & MaintenanceOrganizC --> MaintenanceOrganizD
    MaintenanceOrganizD --> MaintenanceOrganizE --> MaintenanceOrganizF
    MaintenanceOrganizF -.-> MaintenanceOrganizC
    MaintenanceOrganizA -.-> MaintenanceOrganizE
~~~

## 7. Asset and Technical Object Boundary

A technical object is a maintenance subject, not automatically an accounting asset, inventory item or production resource. Equipment identifies an individually maintained unit; a functional location identifies the enduring installation context; a machine may be a Manufacturing resource linked to equipment; a fixed asset remains a Finance reference.

Maintainable serialized components, rotables, tools and instruments require explicit custody and installation semantics. Vehicle, facility and IT/OT extensions are future specializations. Maintenance owns condition and technical history, while Inventory owns item and serial stock identity, Manufacturing owns resource use and Finance owns capitalization and depreciation.

**Controlled concepts:** asset; fixed asset; equipment; machine; functional location; technical object; maintainable item; serialized component; rotable; tool; instrument; vehicle; facility; IT/OT asset; ownership.

~~~mermaid
flowchart TB
    AssetTechnicalObjeA["Asset technical-object boundary"]
    AssetTechnicalObjeB["rotable"]
    AssetTechnicalObjeC["tool"]
    AssetTechnicalObjeD["instrument"]
    AssetTechnicalObjeE["vehicle"]
    AssetTechnicalObjeF["facility"]
    AssetTechnicalObjeB --> AssetTechnicalObjeD
    AssetTechnicalObjeC --> AssetTechnicalObjeD
    AssetTechnicalObjeD --> AssetTechnicalObjeE
    AssetTechnicalObjeE -- "acknowledged" --> AssetTechnicalObjeF
    AssetTechnicalObjeA -.-> AssetTechnicalObjeB
~~~

## 8. Functional Location Architecture

Functional locations form an effective-dated site-to-position hierarchy—site, plant, area, line, system, subsystem and installation position. Codes are stable within an approved naming policy; parent changes create relationship history so past work remains interpretable at the location that applied when executed.

A location can carry criticality, responsible work center and cost-assignment defaults, but transactions snapshot resolved values. An installation point constrains compatible equipment categories without becoming the equipment record. Deactivation blocks new work while preserving historical references and cannot be used to erase an unfavorable reliability history.

**Controlled concepts:** functional location; hierarchy; site; plant; area; line; system; subsystem; position; location code; effective dates; parent child; criticality; cost assignment; installation point; history.

~~~mermaid
flowchart LR
    FunctionalLocationA["Functional-location hierarchy"]
    FunctionalLocationB["line"]
    FunctionalLocationC["system"]
    FunctionalLocationD["subsystem"]
    FunctionalLocationE["position"]
    FunctionalLocationF["location code"]
    FunctionalLocationB --> FunctionalLocationC --> FunctionalLocationE
    FunctionalLocationB --> FunctionalLocationD --> FunctionalLocationE
    FunctionalLocationE --> FunctionalLocationF
    FunctionalLocationA -.-> FunctionalLocationF
~~~

## 9. Equipment Architecture

Equipment receives an immutable identity independent of a mutable label, manufacturer serial or physical position. Category, manufacturer, model, technical specification, commissioning date, owner, criticality, cost center, strategy and warranty are version-aware attributes; plant, functional location and installed components are historical relationships.

Condition status is maintained by Maintenance and must not overwrite Inventory stock status or Manufacturing resource state. Technical history links registration, installation, meter readings, notifications, work, failure, calibration and release evidence. Duplicate checks consider manufacturer, serial, model and ownership while allowing documented legitimate re-identification.

**Controlled concepts:** equipment identity; category; manufacturer; model; serial number; specification; plant; functional location; installation; status; commissioning; warranty; criticality; cost center; owner; strategy; history.

~~~mermaid
sequenceDiagram
    participant M as "functional location"
    participant G as "installation"
    participant O as "status"
    M->>G: Equipment model
    G->>O: commissioning
    O-->>M: warranty
~~~

## 10. Equipment Lifecycle

The equipment lifecycle separates registration and installation from operational condition. Proposed, Registered, Installed and Commissioning establish identity and readiness evidence; Available, Running and Standby describe Maintenance's technical view; Maintenance Requested, Under Maintenance, Breakdown, Maintenance Hold, Awaiting Inspection Direction and Ready for Release govern intervention.

Released to Operations is a Maintenance decision, not a Manufacturing restart. Out of Service, Decommissioned and Retired preserve technical history; Finance independently retires or disposes the accounting asset. Every transition records reason, actor, business time, effective time, source order and competing holds.

**Controlled concepts:** Proposed; Registered; Installed; Commissioning; Available; Running; Standby; Maintenance requested; Under maintenance; Breakdown; Maintenance hold; Awaiting inspection; Ready for release; Released to operations; Out of service; Decommissioned; Retired.

~~~mermaid
classDiagram
    class ReadyForRelease
    class ReleasedToOperations
    class OutOfService
    class Decommissioned
    ReadyForRelease "1" --> "*" ReleasedToOperations : Equipment lifecycle
    ReleasedToOperations --> OutOfService : Decommissioned
    OutOfService --> Decommissioned : Retired
~~~

## 11. Asset Hierarchy and Component Structure

The as-maintained hierarchy records parent equipment, subassembly, replaceable assembly, serialized component, rotable and installation position. Installation and removal events carry valid-from/to time, work-order provenance, condition, meter snapshot and custody handoff; a swap closes one relationship before opening the replacement relationship.

As-designed structure is an Engineering reference and may differ from the physical configuration. Maintenance owns the verified as-maintained view, Inventory owns off-equipment serial custody, and genealogy reconciles both without fabricating continuity. Backdated corrections require overlap checks and an auditable reason.

**Controlled concepts:** parent equipment; child equipment; replaceable assembly; serialized component; rotable; subassembly; installation position; validity; removal; swap; history; as-maintained; as-designed.

~~~mermaid
stateDiagram-v2
    [*] --> AssetHierarchyB: Parent equipment
    AssetHierarchyB --> AssetHierarchyC: Asset hierarchy
    AssetHierarchyC --> AssetHierarchyD: Installed child
    AssetHierarchyD --> AssetHierarchyE: Installation position
    AssetHierarchyE --> [*]: As-maintained history
~~~

~~~mermaid
flowchart LR
    ComponentInstallatA["Component installation removal"]
    ComponentInstallatB["Removed component serial"]
    ComponentInstallatC["Removal work event"]
    ComponentInstallatD["Inventory custody acknowledgement"]
    ComponentInstallatE["Replacement component serial"]
    ComponentInstallatF["New installation interval"]
    ComponentInstallatB --> ComponentInstallatC
    ComponentInstallatC --> ComponentInstallatD
    ComponentInstallatC --> ComponentInstallatE
    ComponentInstallatD & ComponentInstallatE --> ComponentInstallatF
    ComponentInstallatA -.-> ComponentInstallatC
~~~

## 12. Asset Criticality Architecture

Criticality combines separately scored safety, production, quality, environmental-direction, financial, redundancy, detectability and replacement-lead-time factors. The architecture preserves factor inputs, scale version, rationale and assessor instead of storing only an opaque final class.

A risk score and criticality class guide priority, strategy, spare and review policy but do not override an active hazard or permit decision. Reviews are triggered by configuration, duty, failure pattern or consequence changes. The method remains configurable and must not be represented as a certified industry technique without governance evidence.

**Controlled concepts:** safety criticality; production criticality; quality criticality; environmental direction; financial impact; redundancy; detectability; replacement lead time; risk score; class; review; version; approval.

~~~mermaid
flowchart TB
    CriticalityModelA["Criticality model"]
    CriticalityModelB["environmental direction"]
    CriticalityModelC["financial impact"]
    CriticalityModelD["redundancy"]
    CriticalityModelE["detectability"]
    CriticalityModelF["replacement lead time"]
    CriticalityModelB & CriticalityModelC --> CriticalityModelD
    CriticalityModelD --> CriticalityModelE --> CriticalityModelF
    CriticalityModelF -.-> CriticalityModelC
    CriticalityModelA -.-> CriticalityModelE
~~~

## 13. Maintenance Strategy Architecture

A strategy states the governed basis for intervention: run-to-failure, calendar preventive, usage preventive, condition-based, predictive advisory, mandatory-direction, calibration-related, shutdown, opportunity or risk-based. Applicability depends on equipment class, criticality, failure behavior, duty and available detection evidence.

Strategy versions require approval and effective dating; open plans retain their selected version until explicitly migrated. Predictive direction never suppresses deterministic mandatory work. Run-to-failure is an affirmative decision with consequence and spare assumptions, not the absence of planning.

**Controlled concepts:** run to failure; time preventive; usage preventive; condition based; predictive; mandatory direction; calibration; shutdown; opportunity maintenance; risk based; versioning; approval.

~~~mermaid
flowchart LR
    StrategyModelA["Strategy model"]
    StrategyModelB["condition based"]
    StrategyModelC["predictive"]
    StrategyModelD["mandatory direction"]
    StrategyModelE["calibration"]
    StrategyModelF["shutdown"]
    StrategyModelB --> StrategyModelC --> StrategyModelD --> StrategyModelE --> StrategyModelF
    StrategyModelA -.-> StrategyModelD
~~~

## 14. Maintenance Plan Architecture

A maintenance plan binds equipment or functional-location scope to an approved strategy, cycle, counter/calendar basis, task list and maintenance package. Start date, call horizon, tolerance, shift factors and due-date basis are snapshotted so each generated call can be reproduced.

Freeze protects near-term calls from silent recalculation. Suspension requires reason, authority and exposure review; reactivation defines whether missed calls are generated, merged or explicitly waived. A plan cannot calculate usage work without a valid counter lineage or calendar work without a governed business-time policy.

**Controlled concepts:** plan identity; equipment scope; location scope; strategy; cycle; counter; calendar; task list; package; start date; due date; call horizon; tolerance; shift; freeze; suspension; reactivation.

~~~mermaid
flowchart TB
    MaintenancePlanA["Maintenance plan"]
    MaintenancePlanB["shift"]
    MaintenancePlanC["freeze"]
    MaintenancePlanD["suspension"]
    MaintenancePlanE["reactivation"]
    MaintenancePlanF["plan identity"]
    MaintenancePlanB --> MaintenancePlanC
    MaintenancePlanC --> MaintenancePlanD
    MaintenancePlanC --> MaintenancePlanE
    MaintenancePlanD & MaintenancePlanE --> MaintenancePlanF
    MaintenancePlanA -.-> MaintenancePlanC
~~~

## 15. Preventive Maintenance

Preventive execution begins with a reproducible call from time, usage, condition or inspection basis. Calls distinguish Due, Overdue, Deferred and Skipped-with-approval; deferral preserves original due date, exposure interval, approver and compensating inspection rather than rewriting history.

Completion records which tasks and readings satisfy the call. Next-call calculation uses the governed completion basis—planned date, actual completion or counter reading—and retains the formula version. Duplicate calls, late meter data and schedule changes are reconciled before creating orders.

**Controlled concepts:** time PM; usage PM; condition PM; inspection PM; PM call; due; overdue; deferred; skipped; completion basis; next call; history.

~~~mermaid
flowchart LR
    PmLifecycleA["PM lifecycle"]
    PmLifecycleB["inspection PM"]
    PmLifecycleC["PM call"]
    PmLifecycleD["due"]
    PmLifecycleE["overdue"]
    PmLifecycleF["deferred"]
    PmLifecycleB & PmLifecycleC --> PmLifecycleD
    PmLifecycleD --> PmLifecycleE --> PmLifecycleF
    PmLifecycleF -.-> PmLifecycleC
    PmLifecycleA -.-> PmLifecycleE
~~~

## 16. Maintenance Task List Architecture

A versioned task list sequences operations with standard time, required skill, crew size, tool class, spare quantities, safety prerequisites, instruction, measurement and acceptance criteria. Attachments are version-bound; a technician must see the exact instruction released with the order.

Effective dates and applicability prevent a generic task list from being used on an incompatible model or installation. Local additions cannot delete centrally required safety or verification steps. Actual execution records deviations and findings without mutating the standard used for planning.

**Controlled concepts:** task list; version; operation sequence; standard time; crew; skill; tool; spare; safety requirement; instruction; measurement; acceptance criteria; attachment; effective dates.

~~~mermaid
flowchart TB
    TaskListA["Task list"]
    TaskListB["acceptance criteria"]
    TaskListC["attachment"]
    TaskListD["effective dates"]
    TaskListE["task list"]
    TaskListF["version"]
    TaskListB --> TaskListD
    TaskListC --> TaskListD
    TaskListD --> TaskListE
    TaskListE -- "acknowledged" --> TaskListF
    TaskListA -.-> TaskListB
~~~

## 17. Maintenance Request Architecture

A request captures an observed need before technical assessment: requester, equipment or location, symptom, suggested urgency, safety concern, production impact, attachments, event time and source. It can originate from an operator, inspection, meter threshold, customer service, Quality case or approved integration.

Duplicate detection compares subject, symptom, time and open work but never silently discards a safety concern. Triage validates identity and scope, separates emergency containment from normal planning, and records acceptance, rejection or linkage to a notification. A requester cannot self-authorize consequential work solely by choosing an emergency label.

**Controlled concepts:** request identity; requester; equipment; location; symptom; priority suggestion; safety concern; production impact; attachment; time; source; duplicates; status; triage.

~~~mermaid
flowchart LR
    MaintenanceRequestA["Maintenance request"]
    MaintenanceRequestB["attachment"]
    MaintenanceRequestC["time"]
    MaintenanceRequestD["source"]
    MaintenanceRequestE["duplicates"]
    MaintenanceRequestF["status"]
    MaintenanceRequestB --> MaintenanceRequestC --> MaintenanceRequestE
    MaintenanceRequestB --> MaintenanceRequestD --> MaintenanceRequestE
    MaintenanceRequestE --> MaintenanceRequestF
    MaintenanceRequestA -.-> MaintenanceRequestF
~~~

## 18. Maintenance Notification Architecture

A notification is Maintenance's assessed technical record, richer than the intake request and still distinct from a work order. It identifies the technical object, breakdown flag, malfunction start, symptoms, damage observations, prospective failure/cause codes, priority, impacts, reporter and responsible planner group.

Observed failure mode and cause remain provisional until evidence supports classification. The notification may link multiple requests and later orders while preserving their identities. Production, safety and quality impacts create coordination tasks; they do not transfer those domains' decision authority to Maintenance.

**Controlled concepts:** notification; technical object; breakdown flag; malfunction start; damage; symptom; failure mode; cause; priority; production impact; safety impact; quality impact; reporter; planner group; status.

~~~mermaid
sequenceDiagram
    participant M as "reporter"
    participant G as "planner group"
    participant O as "status"
    M->>G: Maintenance notification
    G->>O: notification
    O-->>M: technical object
~~~

## 19. Request and Notification Lifecycle

Draft and Submitted describe requester preparation; Triaged produces Accepted, Rejected or Duplicate outcomes. Accepted work may become Planned, Converted to Work Order or Monitoring. Resolved and Closed require evidence appropriate to the record, while Reopened preserves the prior closure and reason.

A request remains the reported need, a notification remains the technical assessment, and an order authorizes planned execution. Conversion creates links rather than replacing history. Duplicate closure names the surviving record, and monitoring establishes a dated review condition instead of becoming an indefinite queue.

**Controlled concepts:** Draft; Submitted; Triaged; Accepted; Rejected; Duplicate; Planned; Converted to work order; Monitoring; Resolved; Closed; Reopened.

~~~mermaid
classDiagram
    class Submitted
    class Triaged
    class Accepted
    class Rejected
    Submitted "1" --> "*" Triaged : Request notification lifecycle
    Triaged --> Accepted : Rejected
    Accepted --> Rejected : Duplicate
~~~

## 20. Maintenance Priority and Criticality

Priority combines immediacy with consequence: Emergency, Urgent, High, Normal and Low are governed outcomes informed by safety escalation, production and quality impact, asset criticality, redundancy and service target. Criticality is a relatively stable asset attribute; priority is a time-specific work decision.

Overrides record the original calculation, new level, evidence, approver and expiry. Understatement triggers missed-response escalation; overstatement is monitored because persistent emergency coding destroys schedule credibility. Safety/HSE may impose immediate safe-state action without granting order-approval authority.

**Controlled concepts:** Emergency; Urgent; High; Normal; Low; safety escalation; production impact; quality impact; mandatory direction; asset criticality; service target; override; approval; escalation.

~~~mermaid
stateDiagram-v2
    [*] --> PriorityDecisionB: asset criticality
    PriorityDecisionB --> PriorityDecisionC: Priority decision
    PriorityDecisionC --> PriorityDecisionD: override
    PriorityDecisionD --> PriorityDecisionE: approval
    PriorityDecisionE --> [*]: escalation
~~~

## 21. Maintenance Work Order Architecture

The work order is Maintenance's controlled execution aggregate: order type, equipment/location, source request or notification, priority, planner group, work center, crew, dates, operations, spares, tools, external services, permits, cost object, status and revision. It snapshots approved planning inputs while actuals append during execution.

An order can request Inventory reservation, Safety permit, Manufacturing window, Quality coordination, Procurement service and Finance cost treatment, but it cannot complete those records. Revisions after approval identify changed scope and require revalidation proportional to risk.

**Controlled concepts:** order identity; type; equipment; location; source reference; priority; planner group; work center; crew; dates; operations; spares; tools; services; permits; cost object; status; revision.

~~~mermaid
flowchart LR
    WorkOrderModelA["Work-order model"]
    WorkOrderModelB["type"]
    WorkOrderModelC["equipment"]
    WorkOrderModelD["location"]
    WorkOrderModelE["source reference"]
    WorkOrderModelF["priority"]
    WorkOrderModelB --> WorkOrderModelC
    WorkOrderModelC --> WorkOrderModelD
    WorkOrderModelC --> WorkOrderModelE
    WorkOrderModelD & WorkOrderModelE --> WorkOrderModelF
    WorkOrderModelA -.-> WorkOrderModelC
~~~

## 22. Work Order Lifecycle

Draft and Planning assemble scope; Awaiting Approval and Approved establish authority; Material Pending and Permit Pending expose prerequisites; Ready, Scheduled and Dispatched coordinate execution. In Progress may become Paused, Blocked or Partially Completed before Completed and Awaiting Verification.

Ready for Release is not Released, and Technically Closed is not Financially Settled. Cancelled preserves consumed resources and reasons; Archived is a retention state. Every transition validates current revision, prerequisite acknowledgements, actor authority and incompatible duties.

**Controlled concepts:** Draft; Planning; Awaiting approval; Approved; Material pending; Permit pending; Ready; Scheduled; Dispatched; In progress; Paused; Blocked; Partially completed; Completed; Awaiting verification; Ready for release; Technically closed; Financially settled; Cancelled; Archived.

~~~mermaid
flowchart TB
    WorkOrderLifecycleA["Work-order lifecycle"]
    WorkOrderLifecycleB["Awaiting approval"]
    WorkOrderLifecycleC["Approved"]
    WorkOrderLifecycleD["Material pending"]
    WorkOrderLifecycleE["Permit pending"]
    WorkOrderLifecycleF["Ready"]
    WorkOrderLifecycleB & WorkOrderLifecycleC --> WorkOrderLifecycleD
    WorkOrderLifecycleD --> WorkOrderLifecycleE --> WorkOrderLifecycleF
    WorkOrderLifecycleF -.-> WorkOrderLifecycleC
    WorkOrderLifecycleA -.-> WorkOrderLifecycleE
~~~

## 23. Work Order Validation and Release

Order release validates technical-object identity, location, priority, work scope, task-list version, technician skills, material and tool readiness, permit requirements, safety prerequisites, quality impact, production coordination, cost center and approval. Failed checks produce named blockers rather than a generic invalid status.

Segregation rules distinguish planning, approval, dispatch, execution and equipment release. Emergency containment may precede full planning under a controlled break-glass route, but hazardous-work authorization and equipment-release verification cannot be bypassed. Cross-domain acknowledgements are correlated to the exact order revision.

**Controlled concepts:** equipment; functional location; priority; scope; task list; skill; material readiness; tool readiness; permit readiness; safety; quality impact; production coordination; cost center; approval; SoD.

~~~mermaid
flowchart LR
    WorkOrderValidatioA["Work-order validation"]
    WorkOrderValidatioB["SoD"]
    WorkOrderValidatioC["equipment"]
    WorkOrderValidatioD["functional location"]
    WorkOrderValidatioE["priority"]
    WorkOrderValidatioF["scope"]
    WorkOrderValidatioB --> WorkOrderValidatioC --> WorkOrderValidatioD --> WorkOrderValidatioE --> WorkOrderValidatioF
    WorkOrderValidatioA -.-> WorkOrderValidatioD
~~~

## 24. Maintenance Planning

Planning decomposes accepted need into job scope, operations, estimated duration, skills, crew, spares, tools, external service, permits, production window, Quality coordination and a coherent work package. Assumptions, alternatives and access constraints are visible to the approver.

A revision is required when findings materially change equipment, method, safety isolation, cost or cross-domain effects. Planning may request availability but cannot reserve stock, contract a supplier or stop production. Standard task lists accelerate planning without replacing equipment-specific review.

**Controlled concepts:** scope; job plan; operation; duration; skill; crew; spare; tool; external service; permit; production window; quality coordination; work package; revision; approval.

~~~mermaid
flowchart TB
    PlanningA["Planning"]
    PlanningB["operation"]
    PlanningC["duration"]
    PlanningD["skill"]
    PlanningE["crew"]
    PlanningF["spare"]
    PlanningB --> PlanningC
    PlanningC --> PlanningD
    PlanningC --> PlanningE
    PlanningD & PlanningE --> PlanningF
    PlanningA -.-> PlanningC
~~~

## 25. Maintenance Scheduling

Scheduling selects ready backlog into frozen weekly and daily horizons using priority, crew capacity, technician availability, shift, production/shutdown windows, material and permit readiness. Backlog age and schedule adherence are calculated from preserved selection and change history.

Rescheduling records the displaced work, reason, initiator and consequence. A frozen schedule requires elevated approval to change but never blocks a true emergency response. Maintenance capacity decisions cannot rewrite Manufacturing's production schedule; both domains negotiate a versioned window.

**Controlled concepts:** backlog; ready backlog; frozen schedule; weekly schedule; daily schedule; crew capacity; technician availability; shift; production window; shutdown window; material readiness; permit readiness; priority; rescheduling; adherence.

~~~mermaid
flowchart LR
    SchedulingA["Scheduling"]
    SchedulingB["crew capacity"]
    SchedulingC["technician availability"]
    SchedulingD["shift"]
    SchedulingE["production window"]
    SchedulingF["shutdown window"]
    SchedulingB & SchedulingC --> SchedulingD
    SchedulingD --> SchedulingE --> SchedulingF
    SchedulingF -.-> SchedulingC
    SchedulingA -.-> SchedulingE
~~~

## 26. Dispatch Architecture

Dispatch turns a scheduled operation into an acknowledged crew or technician assignment. The queue presents route, priority, equipment availability, permit state, material readiness and start permission; acceptance records device, user and time before labor begins.

Reassignment preserves the original dispatch and reason. A supervisor can escalate unacknowledged emergency work but cannot impersonate a technician's execution evidence. Dispatch readiness is withdrawn when a permit, hold, tool or equipment condition changes.

**Controlled concepts:** work queue; crew assignment; technician assignment; route; priority; start permission; equipment availability; permit state; material readiness; acknowledgement; reassignment; escalation.

~~~mermaid
flowchart TB
    DispatchA["Dispatch"]
    DispatchB["reassignment"]
    DispatchC["escalation"]
    DispatchD["work queue"]
    DispatchE["crew assignment"]
    DispatchF["technician assignment"]
    DispatchB --> DispatchD
    DispatchC --> DispatchD
    DispatchD --> DispatchE
    DispatchE -- "acknowledged" --> DispatchF
    DispatchA -.-> DispatchB
~~~

## 27. Technician Execution

Technician evidence is operation-scoped: start, pause, resume and completion events accompany actual labor, duration, findings, measurements, photographs, notes, failure observations, parts and tools used, safety confirmation and signature. Offline submissions remain provisional until identity, chronology and current order revision are validated.

A completion attests performed work; it does not verify return-to-service. Corrections append original value, corrected value, reason and reviewer. Required measurements retain unit, method, instrument and acceptance evaluation rather than a bare pass flag.

**Controlled concepts:** operation; start; pause; resume; complete; actual labor; duration; findings; measurements; photos; notes; failure observations; parts used; tools used; safety confirmation; signature.

~~~mermaid
flowchart LR
    TechnicianExecutioA["Technician execution"]
    TechnicianExecutioB["signature"]
    TechnicianExecutioC["operation"]
    TechnicianExecutioD["start"]
    TechnicianExecutioE["pause"]
    TechnicianExecutioF["resume"]
    TechnicianExecutioB --> TechnicianExecutioC --> TechnicianExecutioE
    TechnicianExecutioB --> TechnicianExecutioD --> TechnicianExecutioE
    TechnicianExecutioE --> TechnicianExecutioF
    TechnicianExecutioA -.-> TechnicianExecutioF
~~~

## 28. Labor and Crew Reporting

Labor evidence separates regular, overtime-direction, travel-direction, setup, active work, waiting and delay time by technician, crew, skill, shift, operation and event interval. Contractor hours retain supplier and service-entry context; corrections require reason and approval.

Maintenance confirms technical time, not payroll entitlement or financial posting. Payroll and Finance consume approved evidence under their own rules, and costing reconciles accepted quantities back to work-order operation. Shared crew totals cannot obscure individual attribution for controlled tasks.

**Controlled concepts:** technician; crew; skill; shift; regular time; overtime; travel; setup; active work; waiting; delay; contractor hours; correction; approval; payroll boundary; costing boundary.

~~~mermaid
sequenceDiagram
    participant M as "waiting"
    participant G as "delay"
    participant O as "contractor hours"
    M->>G: Labor capture
    G->>O: correction
    O-->>M: approval
~~~

## 29. Spare Parts Planning Boundary

A planned spare specifies item, quantity, UOM, required date, preferred warehouse, acceptable alternative, substitution rules and whether the item is critical, repairable or rotable. Maintenance requests availability and reservation but never treats an estimate as stock truth.

Inventory validates on-hand, allocation, batch/serial, status and warehouse scope. Shortage may create a Procurement request with required date and technical equivalence, while Procurement owns sourcing. Substitution requires Maintenance fitness review and Inventory-controlled issue of the approved identity.

**Controlled concepts:** planned spare; quantity; UOM; required date; warehouse; alternative; substitution; critical spare; repairable spare; rotable; availability request; reservation request; shortage; procurement request.

~~~mermaid
classDiagram
    class Quantity
    class Uom
    class RequiredDate
    class Warehouse
    Quantity "1" --> "*" Uom : Spare planning
    Uom --> RequiredDate : warehouse
    RequiredDate --> Warehouse : alternative
~~~

## 30. Spare Reservation and Issue Boundary

Maintenance emits a reservation request tied to order revision and operation. Inventory validates availability and allocation, then returns a reservation identity. A separate issue request produces the authoritative batch/serial movement; unused return, scrap and reversal are also Inventory transactions.

Emergency issue uses an Inventory-controlled exception path with later order reconciliation. Maintenance records fitted and removed components but cannot update warehouse quantity. Quantity, UOM, batch, serial, status and order references must reconcile across requested, reserved, issued, installed, returned and consumed states.

**Controlled concepts:** reservation request; Inventory validation; allocation; issue request; actual issue; batch; serial; return; unused spare; scrap; reversal; emergency issue; reconciliation.

~~~mermaid
stateDiagram-v2
    [*] --> SpareReservationB: unused spare
    SpareReservationB --> SpareReservationC: Spare reservation
    SpareReservationC --> SpareReservationD: reversal
    SpareReservationD --> SpareReservationE: emergency issue
    SpareReservationE --> [*]: reconciliation
~~~

~~~mermaid
flowchart LR
    SpareIssueA["Spare issue"]
    SpareIssueB["allocation"]
    SpareIssueC["issue request"]
    SpareIssueD["actual issue"]
    SpareIssueE["batch"]
    SpareIssueF["serial"]
    SpareIssueB --> SpareIssueC
    SpareIssueC --> SpareIssueD
    SpareIssueC --> SpareIssueE
    SpareIssueD & SpareIssueE --> SpareIssueF
    SpareIssueA -.-> SpareIssueC
~~~

## 31. Maintenance Tools and Test Equipment

A work operation identifies required tool class, condition and calibration state. Tool identity, tool-crib custody, checkout, return, damage, loss and replacement belong to the owning tool or Inventory domain; Maintenance records use and suitability at execution.

An overdue or incompatible test instrument blocks controlled measurement. Checkout does not prove use, and use does not prove return. Tool traceability links order, operation, user, interval and condition so damage or calibration failure can scope affected work.

**Controlled concepts:** tool requirement; tool identity; tool crib; availability; checkout; return; condition; calibration requirement; damage; loss; replacement; traceability.

~~~mermaid
flowchart TB
    ToolControlA["Tool control"]
    ToolControlB["calibration requirement"]
    ToolControlC["damage"]
    ToolControlD["loss"]
    ToolControlE["replacement"]
    ToolControlF["traceability"]
    ToolControlB & ToolControlC --> ToolControlD
    ToolControlD --> ToolControlE --> ToolControlF
    ToolControlF -.-> ToolControlC
    ToolControlA -.-> ToolControlE
~~~

## 32. External Service and Contractor Maintenance

External service planning defines technical scope, supplier reference, service purchase-order dependency, contractor qualification direction, site access, permit needs, labor evidence and expected report. Procurement owns supplier selection, order and commercial terms; Security and Safety/HSE govern access and permits.

Maintenance accepts technical completion only after service evidence and equipment verification. That acceptance may support—but does not approve—invoice eligibility. Contractor users are sponsored, time-bounded and restricted to assigned assets and orders; their identity is never replaced by a generic vendor login.

**Controlled concepts:** external service; scope of work; supplier; service PO; contractor qualification; site access; permit; labor evidence; service report; completion; acceptance; invoice boundary; Procurement authority.

~~~mermaid
flowchart LR
    ExternalServiceA["External service"]
    ExternalServiceB["Technical service scope"]
    ExternalServiceC["Service purchase-order dependency"]
    ExternalServiceD["Contractor dispatch"]
    ExternalServiceE["Service report evidence"]
    ExternalServiceF["Maintenance technical acceptance"]
    ExternalServiceB --> ExternalServiceC --> ExternalServiceD --> ExternalServiceE --> ExternalServiceF
    ExternalServiceA -.-> ExternalServiceD
~~~

~~~mermaid
flowchart TB
    ContractorFlowA["Contractor flow"]
    ContractorFlowB["Named sponsor"]
    ContractorFlowC["Individual contractor identity"]
    ContractorFlowD["Scoped site access"]
    ContractorFlowE["Permit acknowledgement"]
    ContractorFlowF["Access revocation"]
    ContractorFlowB --> ContractorFlowC
    ContractorFlowC --> ContractorFlowD
    ContractorFlowC --> ContractorFlowE
    ContractorFlowD & ContractorFlowE --> ContractorFlowF
    ContractorFlowA -.-> ContractorFlowC
~~~

## 33. Breakdown Maintenance

A breakdown declaration records malfunction start, affected equipment, production impact and immediate safety state, then places a Maintenance hold as required. Emergency triage coordinates safe access, dispatch, diagnosis, repair, test and readiness without skipping permit or evidence controls.

Breakdown end is supported by restoration evidence and distinguished from production restart and final downtime reconciliation. Failure codes can remain provisional at release; the notification and order preserve later analysis. Financial effects arise only through Finance-owned posting.

**Controlled concepts:** breakdown declaration; malfunction start; production impact; emergency triage; safety state; equipment hold; dispatch; diagnosis; repair; test; ready for release; release; downtime; failure coding.

~~~mermaid
flowchart LR
    BreakdownA["Breakdown"]
    BreakdownB["breakdown declaration"]
    BreakdownC["malfunction start"]
    BreakdownD["production impact"]
    BreakdownE["emergency triage"]
    BreakdownF["safety state"]
    BreakdownB & BreakdownC --> BreakdownD
    BreakdownD --> BreakdownE --> BreakdownF
    BreakdownF -.-> BreakdownC
    BreakdownA -.-> BreakdownE
~~~

## 34. Corrective Maintenance

Corrective work addresses a detected defect that may be immediate, planned or deliberately deferred. The record connects defect evidence, priority, order, repair or replacement, verification, follow-up and repeat-failure escalation while retaining the original symptom.

Deferral names operating limits, expiry, monitoring and approver. Replacement updates as-maintained history and requests Inventory movements where applicable. Closure cannot suppress an unresolved safety, quality or reliability consequence, and recurring defects require an analysis path rather than repeated anonymous repairs.

**Controlled concepts:** detected defect; planned corrective; deferred corrective; priority; work order; repair; replacement; verification; follow-up; repeat failure; escalation; closure.

~~~mermaid
flowchart TB
    CorrectiveMaintenaA["Corrective maintenance"]
    CorrectiveMaintenaB["follow-up"]
    CorrectiveMaintenaC["repeat failure"]
    CorrectiveMaintenaD["escalation"]
    CorrectiveMaintenaE["closure"]
    CorrectiveMaintenaF["detected defect"]
    CorrectiveMaintenaB --> CorrectiveMaintenaD
    CorrectiveMaintenaC --> CorrectiveMaintenaD
    CorrectiveMaintenaD --> CorrectiveMaintenaE
    CorrectiveMaintenaE -- "acknowledged" --> CorrectiveMaintenaF
    CorrectiveMaintenaA -.-> CorrectiveMaintenaB
~~~

## 35. Equipment Hold Architecture

A Maintenance hold is a scoped technical restriction on equipment or a defined component/configuration. It records reason, start, issuer, safety condition, production and quality impacts, review/expiry, release criteria and acknowledgements. Scope expansion and reduction are versioned.

Maintenance owns the hold, while Manufacturing independently stops or changes production and Quality preserves any product hold. Competing Maintenance, Safety and Quality restrictions remain visible; clearing one cannot release another. Unacknowledged downstream impact requests remain exceptions, not assumed control.

**Controlled concepts:** maintenance hold; equipment; scope; reason; start; issuer; safety condition; production impact; quality impact; review; expiry; release criteria; competing holds; acknowledgement.

~~~mermaid
flowchart LR
    EquipmentHoldA["Equipment hold"]
    EquipmentHoldB["production impact"]
    EquipmentHoldC["quality impact"]
    EquipmentHoldD["review"]
    EquipmentHoldE["expiry"]
    EquipmentHoldF["release criteria"]
    EquipmentHoldB --> EquipmentHoldC --> EquipmentHoldE
    EquipmentHoldB --> EquipmentHoldD --> EquipmentHoldE
    EquipmentHoldE --> EquipmentHoldF
    EquipmentHoldA -.-> EquipmentHoldF
~~~

## 36. Equipment Release and Return-to-Service

Completion moves work to verification, not directly to service. Maintenance evaluates tests, safety clearance, Quality/calibration dependencies, open defects and operating constraints before issuing unconditional or conditional equipment release on a specific configuration.

Manufacturing receives the release and decides whether and when to restart production. A failed test, new defect or revoked clearance reverses readiness without erasing the prior decision. Every release identifies approver, order revision, evidence, conditions and acknowledged recipient.

**Controlled concepts:** work completion; verification; test run; safety clearance; quality dependency; calibration dependency; open defect; conditional release; maintenance release; manufacturing restart; audit; reversal.

~~~mermaid
sequenceDiagram
    participant M as "calibration dependency"
    participant G as "open defect"
    participant O as "conditional release"
    M->>G: Equipment release
    G->>O: maintenance release
    O-->>M: manufacturing restart
~~~

~~~mermaid
classDiagram
    class CalibrationDependency
    class OpenDefect
    class ConditionalRelease
    class MaintenanceRelease
    CalibrationDependency "1" --> "*" OpenDefect : Return to service
    OpenDefect --> ConditionalRelease : maintenance release
    ConditionalRelease --> MaintenanceRelease : manufacturing restart
~~~

## 37. Downtime Architecture

Downtime intervals distinguish planned, unplanned, breakdown, active maintenance, waiting for material, technician, permit or vendor, and test time. Start/end evidence, reason, equipment scope and approving role are preserved; overlapping categories are resolved by explicit precedence or parallel dimensions.

Maintenance downtime is not automatically production loss. Manufacturing reconciles whether capacity or orders were affected, and Finance separately evaluates cost. Backdating and corrections retain the original interval so availability metrics can be reproduced.

**Controlled concepts:** planned downtime; unplanned downtime; breakdown downtime; maintenance downtime; waiting material; waiting technician; waiting permit; waiting vendor; test time; production loss; start; end; reason; approval; reconciliation.

~~~mermaid
stateDiagram-v2
    [*] --> DowntimeB: planned downtime
    DowntimeB --> DowntimeC: Downtime
    DowntimeC --> DowntimeD: breakdown downtime
    DowntimeD --> DowntimeE: maintenance downtime
    DowntimeE --> [*]: waiting material
~~~

## 38. Failure Coding Architecture

Failure evidence separates symptom, damage, failure mode, mechanism, cause, detection method, affected component, severity and repeat occurrence. Codes belong to versioned hierarchies with applicability by equipment class and effective date; free text supplements but does not silently create taxonomy.

A selected cause code is an observed or suspected classification, not a verified root cause. Review can revise coding through an append-only correction linked to new evidence. Reliability calculations snapshot the code version and can regroup analytically without rewriting source events.

**Controlled concepts:** symptom; damage; failure mode; failure mechanism; cause; detection method; component; severity; repeat occurrence; coding hierarchy; version; review.

~~~mermaid
flowchart LR
    FailureClassificatA["Failure classification"]
    FailureClassificatB["symptom"]
    FailureClassificatC["damage"]
    FailureClassificatD["failure mode"]
    FailureClassificatE["failure mechanism"]
    FailureClassificatF["cause"]
    FailureClassificatB --> FailureClassificatC
    FailureClassificatC --> FailureClassificatD
    FailureClassificatC --> FailureClassificatE
    FailureClassificatD & FailureClassificatE --> FailureClassificatF
    FailureClassificatA -.-> FailureClassificatC
~~~

## 39. Root-Cause and Repeat-Failure Analysis

Repeat detection groups comparable failures by equipment family, component, mode, duty and time window, then identifies chronic bad actors for review. A root-cause case records hypotheses, evidence, tests, disconfirmation, verified cause and accountable action rather than treating a workshop opinion as fact.

Reliability owns the analysis; Engineering contributes design evidence; Quality owns CAPA or product-impact work where applicable. Actions link to orders or governed changes and remain open until effectiveness evidence is reviewed. Similarity algorithms may suggest clusters but cannot close the case.

**Controlled concepts:** repeat failure; chronic bad actor; root-cause case; hypothesis; evidence; verification; action; reliability review; CAPA boundary; Quality boundary; Engineering boundary.

~~~mermaid
flowchart TB
    RootCauseAnalysisA["Root-cause analysis"]
    RootCauseAnalysisB["hypothesis"]
    RootCauseAnalysisC["evidence"]
    RootCauseAnalysisD["verification"]
    RootCauseAnalysisE["action"]
    RootCauseAnalysisF["reliability review"]
    RootCauseAnalysisB & RootCauseAnalysisC --> RootCauseAnalysisD
    RootCauseAnalysisD --> RootCauseAnalysisE --> RootCauseAnalysisF
    RootCauseAnalysisF -.-> RootCauseAnalysisC
    RootCauseAnalysisA -.-> RootCauseAnalysisE
~~~

~~~mermaid
flowchart LR
    RepeatFailureA["Repeat failure"]
    RepeatFailureB["Quality boundary"]
    RepeatFailureC["Engineering boundary"]
    RepeatFailureD["repeat failure"]
    RepeatFailureE["chronic bad actor"]
    RepeatFailureF["root-cause case"]
    RepeatFailureB --> RepeatFailureC --> RepeatFailureD --> RepeatFailureE --> RepeatFailureF
    RepeatFailureA -.-> RepeatFailureD
~~~

## 40. Reliability Engineering Architecture

Reliability views define the equipment population, operating-time basis, qualifying failure count, repair-duration basis and formula version before calculating availability, MTBF, MTTR or future MTTF direction. Bad-actor and reliability-centered-maintenance analyses retain inclusion and exclusion decisions.

No accepted statistical runtime exists, and Weibull or other distributional direction remains future analysis requiring adequate data and method review. Missing meter time, changed duty, censored intervals and hierarchy changes are data-quality exceptions rather than silently normalized inputs.

**Controlled concepts:** reliability object; failure population; operating time; failure count; repair duration; availability; MTBF; MTTR; MTTF; bad actor; Weibull direction; RCM direction; data quality; formula version.

~~~mermaid
flowchart TB
    ReliabilityModelA["Reliability model"]
    ReliabilityModelB["failure population"]
    ReliabilityModelC["operating time"]
    ReliabilityModelD["failure count"]
    ReliabilityModelE["repair duration"]
    ReliabilityModelF["availability"]
    ReliabilityModelB --> ReliabilityModelC
    ReliabilityModelC --> ReliabilityModelD
    ReliabilityModelC --> ReliabilityModelE
    ReliabilityModelD & ReliabilityModelE --> ReliabilityModelF
    ReliabilityModelA -.-> ReliabilityModelC
~~~

~~~mermaid
flowchart LR
    MtbfMttrDirectionA["MTBF MTTR direction"]
    MtbfMttrDirectionB["failure count"]
    MtbfMttrDirectionC["repair duration"]
    MtbfMttrDirectionD["availability"]
    MtbfMttrDirectionE["MTBF"]
    MtbfMttrDirectionF["MTTR"]
    MtbfMttrDirectionB & MtbfMttrDirectionC --> MtbfMttrDirectionD
    MtbfMttrDirectionD --> MtbfMttrDirectionE --> MtbfMttrDirectionF
    MtbfMttrDirectionF -.-> MtbfMttrDirectionC
    MtbfMttrDirectionA -.-> MtbfMttrDirectionE
~~~

## 41. Asset Health and Condition Monitoring

Asset health is a governed interpretation of condition readings, thresholds, trends, alarms, inspections and recent work. Each indicator retains source, unit, timestamp, confidence, rule/model version and history; a composite health score is advisory and decomposable into its contributors.

An alarm can create a request or inspection recommendation but cannot release an order or stop production by itself. Human review resolves false signals and missing context. Threshold changes are effective-dated so prior alerts remain explainable.

**Controlled concepts:** health indicator; condition reading; threshold; trend; alarm; advisory; inspection; maintenance trigger; human review; health score; source; confidence; history.

~~~mermaid
flowchart TB
    AssetHealthA["Asset health"]
    AssetHealthB["condition reading"]
    AssetHealthC["threshold"]
    AssetHealthD["trend"]
    AssetHealthE["alarm"]
    AssetHealthF["advisory"]
    AssetHealthB --> AssetHealthD
    AssetHealthC --> AssetHealthD
    AssetHealthD --> AssetHealthE
    AssetHealthE -- "acknowledged" --> AssetHealthF
    AssetHealthA -.-> AssetHealthB
~~~

~~~mermaid
classDiagram
    class HealthScore
    class Source
    class Confidence
    class History
    HealthScore "1" --> "*" Source : Condition monitoring
    Source --> Confidence : history
    Confidence --> History : health indicator
~~~

## 42. Measurement Points, Meters and Counters

A measurement point identifies characteristic, unit, equipment/location, valid range and source expectations. A reading records value, source, attributed user or device, event timestamp and receipt timestamp. Meters represent state; counters accumulate usage with explicit reset, rollover and replacement events.

Corrections append and identify superseded values. Counter-based triggers use validated monotonic segments rather than naive subtraction across rollover. Unit conversion, duplicate readings, late arrival and device-clock drift are resolved before plan calculation.

**Controlled concepts:** measurement point; characteristic; unit; equipment; location; counter; meter; reading; source; timestamp; reset; rollover; correction; threshold; trigger.

~~~mermaid
flowchart LR
    MeasurementPointA["Measurement point"]
    MeasurementPointB["trigger"]
    MeasurementPointC["measurement point"]
    MeasurementPointD["characteristic"]
    MeasurementPointE["unit"]
    MeasurementPointF["equipment"]
    MeasurementPointB --> MeasurementPointC --> MeasurementPointE
    MeasurementPointB --> MeasurementPointD --> MeasurementPointE
    MeasurementPointE --> MeasurementPointF
    MeasurementPointA -.-> MeasurementPointF
~~~

~~~mermaid
sequenceDiagram
    participant M as "reset"
    participant G as "rollover"
    participant O as "correction"
    M->>G: Meter counter
    G->>O: threshold
    O-->>M: trigger
~~~

## 43. Condition-Based Maintenance

A condition rule evaluates an approved threshold, trend or rate-of-change against validated readings and may raise an alarm, inspection or work request. It records rule version, data window, outcome, override and review so the reason for intervention is reconstructable.

False alarms feed tuning without deleting history; missed signals trigger investigation of coverage, sensor and threshold assumptions. A rule cannot directly approve a work order, issue a spare or release equipment. Manual override is time-bounded and independently reviewed for critical assets.

**Controlled concepts:** condition rule; threshold; trend; rate of change; alarm; inspection trigger; work request; work order; override; false alarm; missed signal; review.

~~~mermaid
stateDiagram-v2
    [*] --> ConditionBasedMainB: missed signal
    ConditionBasedMainB --> ConditionBasedMainC: Condition-based maintenance
    ConditionBasedMainC --> ConditionBasedMainD: condition rule
    ConditionBasedMainD --> ConditionBasedMainE: threshold
    ConditionBasedMainE --> [*]: trend
~~~

## 44. Predictive Maintenance Direction

Predictive direction ingests validated sensor features into a versioned model that returns failure probability, remaining-useful-life direction, confidence and an advisory recommendation. Training lineage, operating context, drift, false-positive and false-negative performance are governed by AI and Reliability review.

Predictions are untrusted recommendations until a human evaluates technical context. They cannot approve work, change equipment condition, stop or restart production, issue spares, clear calibration impact or post cost. Low confidence and drift route to observation rather than hidden automation.

**Controlled concepts:** sensor data; model; feature; prediction; remaining useful life; confidence; advisory; human review; recommendation; model version; drift; false positive; false negative; AI governance.

~~~mermaid
flowchart LR
    PredictiveMaintenaA["Predictive maintenance"]
    PredictiveMaintenaB["drift"]
    PredictiveMaintenaC["false positive"]
    PredictiveMaintenaD["false negative"]
    PredictiveMaintenaE["AI governance"]
    PredictiveMaintenaF["sensor data"]
    PredictiveMaintenaB --> PredictiveMaintenaC
    PredictiveMaintenaC --> PredictiveMaintenaD
    PredictiveMaintenaC --> PredictiveMaintenaE
    PredictiveMaintenaD & PredictiveMaintenaE --> PredictiveMaintenaF
    PredictiveMaintenaA -.-> PredictiveMaintenaC
~~~

## 45. Calibration and Metrology Coordination

Calibration coordination links instrument identity, schedule, work order, reference-standard direction, as-found and as-left results, pass/fail, certificate, status and next due date. Internal and external calibration preserve executor, method, environmental context and evidence provenance.

Maintenance or Metrology owns instrument state where assigned; Quality consumes that state for inspection fitness. A pass does not validate every historical measurement, and a failure places the instrument in a controlled state while triggering impact scoping. Certificate presence alone is not proof of authenticity or method suitability.

**Controlled concepts:** instrument; schedule; calibration order; reference standard; as-found; as-left; pass fail; certificate; status; equipment hold; recalibration; external calibration; Quality dependency.

~~~mermaid
flowchart TB
    CalibrationA["Calibration"]
    CalibrationB["as-found"]
    CalibrationC["as-left"]
    CalibrationD["pass fail"]
    CalibrationE["certificate"]
    CalibrationF["status"]
    CalibrationB & CalibrationC --> CalibrationD
    CalibrationD --> CalibrationE --> CalibrationF
    CalibrationF -.-> CalibrationC
    CalibrationA -.-> CalibrationE
~~~

## 46. Out-of-Tolerance Instrument Impact Boundary

A failed calibration establishes the last-known-valid point and a suspect interval, then identifies affected measurement records by instrument, method and time. Maintenance corrects equipment and sends a versioned impact request; Quality independently decides inspection fitness, product hold and reinspection for Quality evidence.

Closure reconciles instrument correction, population search, Quality acknowledgement and any remaining unknowns. Maintenance cannot mark historical inspections acceptable, and Quality cannot rewrite calibration results. Conservative scope remains explicit where drift onset is uncertain.

**Controlled concepts:** failed calibration; last-known-valid point; suspect interval; affected measurements; Quality impact request; product hold; reinspection; equipment correction; closure; traceability.

~~~mermaid
flowchart LR
    OutOfToleranceImpaA["Out-of-tolerance impact"]
    OutOfToleranceImpaB["traceability"]
    OutOfToleranceImpaC["failed calibration"]
    OutOfToleranceImpaD["last-known-valid point"]
    OutOfToleranceImpaE["suspect interval"]
    OutOfToleranceImpaF["affected measurements"]
    OutOfToleranceImpaB --> OutOfToleranceImpaC --> OutOfToleranceImpaD --> OutOfToleranceImpaE --> OutOfToleranceImpaF
    OutOfToleranceImpaA -.-> OutOfToleranceImpaD
~~~

~~~mermaid
flowchart TB
    QualityCalibrationA["Quality calibration boundary"]
    QualityCalibrationB["Quality impact request"]
    QualityCalibrationC["product hold"]
    QualityCalibrationD["reinspection"]
    QualityCalibrationE["equipment correction"]
    QualityCalibrationF["closure"]
    QualityCalibrationB --> QualityCalibrationC
    QualityCalibrationC --> QualityCalibrationD
    QualityCalibrationC --> QualityCalibrationE
    QualityCalibrationD & QualityCalibrationE --> QualityCalibrationF
    QualityCalibrationA -.-> QualityCalibrationC
~~~

## 47. Warranty Architecture

Warranty records supplier, equipment or component, coverage interval, covered failure types, exclusions and evidence requirements. A failure event can be technically eligible based on dates and condition, while preservation of photographs, readings, service history and removed-part custody supports later review.

Procurement owns the commercial claim and negotiation; Maintenance provides failure and repair evidence. Eligibility is not a receivable or supplier commitment. Repair, replacement and recovery remain linked to the original event without rewriting technical history.

**Controlled concepts:** warranty; supplier; equipment; component; start; end; coverage; exclusion; failure event; evidence; eligibility; Procurement claim; repair; replacement; recovery; history.

~~~mermaid
flowchart LR
    WarrantyA["Warranty"]
    WarrantyB["exclusion"]
    WarrantyC["failure event"]
    WarrantyD["evidence"]
    WarrantyE["eligibility"]
    WarrantyF["Procurement claim"]
    WarrantyB & WarrantyC --> WarrantyD
    WarrantyD --> WarrantyE --> WarrantyF
    WarrantyF -.-> WarrantyC
    WarrantyA -.-> WarrantyE
~~~

## 48. Maintenance Contract and Service Agreement Direction

A contract reference identifies supplier, covered assets, service scope, response target, preventive visits, breakdown support, parts coverage, exclusions, expiry, renewal and cost reference. Maintenance uses coverage to plan service; Procurement remains owner of the agreement and supplier performance remedy.

Visit and service evidence are reconciled to the contract version applicable on the event date. Expired coverage blocks automatic assumptions but not emergency technical action. SLA reporting distinguishes acknowledged request, arrival, restoration and commercial interpretation.

**Controlled concepts:** contract; supplier; scope; asset coverage; SLA; preventive visits; breakdown response; parts coverage; exclusions; expiry; renewal; service evidence; Procurement ownership; cost reference.

~~~mermaid
flowchart TB
    MaintenanceContracA["Maintenance contract"]
    MaintenanceContracB["Procurement ownership"]
    MaintenanceContracC["cost reference"]
    MaintenanceContracD["contract"]
    MaintenanceContracE["supplier"]
    MaintenanceContracF["scope"]
    MaintenanceContracB --> MaintenanceContracD
    MaintenanceContracC --> MaintenanceContracD
    MaintenanceContracD --> MaintenanceContracE
    MaintenanceContracE -- "acknowledged" --> MaintenanceContracF
    MaintenanceContracA -.-> MaintenanceContracB
~~~

## 49. Shutdown and Turnaround Direction

A shutdown groups an approved asset list, work packages, dependencies, material, contractors, permits, safety controls and a production window. Critical-path direction, progress and delay are planning concepts only; the repository has no project-management or turnaround runtime.

Maintenance coordinates technical completion, Safety/HSE clears permits and isolation, and Manufacturing decides restart after equipment releases and production readiness. Scope additions expose schedule and risk impact; omitted work remains a visible exception rather than disappearing from backlog.

**Controlled concepts:** shutdown; scope; asset list; work package; dependencies; critical path; material; contractor; permit; safety; production window; progress; delay; restart; closure.

~~~mermaid
flowchart LR
    ShutdownTurnaroundA["Shutdown turnaround"]
    ShutdownTurnaroundB["permit"]
    ShutdownTurnaroundC["safety"]
    ShutdownTurnaroundD["production window"]
    ShutdownTurnaroundE["progress"]
    ShutdownTurnaroundF["delay"]
    ShutdownTurnaroundB --> ShutdownTurnaroundC --> ShutdownTurnaroundE
    ShutdownTurnaroundB --> ShutdownTurnaroundD --> ShutdownTurnaroundE
    ShutdownTurnaroundE --> ShutdownTurnaroundF
    ShutdownTurnaroundA -.-> ShutdownTurnaroundF
~~~

## 50. Safety and Permit-to-Work Boundary

The work order declares hazards and required permit/isolation classes, while Safety/HSE owns policy, permit approval, energy isolation, lockout/tagout direction and hazardous-work authorization. Permit issuer and receiver identities, validity, equipment scope, start conditions, suspension and closure are preserved.

Maintenance cannot self-clear a missing or expired permit by changing order status. A permit allows defined work under stated conditions; it does not verify technical completion or release equipment. Jurisdiction-specific compliance interpretation remains outside this architecture pending qualified review.

**Controlled concepts:** work permit; hazard; isolation; lockout tagout; confined space; hot work; energy isolation; permit issuer; receiver; start condition; suspension; closure; Safety authority.

~~~mermaid
sequenceDiagram
    participant M as "Safety authority"
    participant G as "work permit"
    participant O as "hazard"
    M->>G: Permit to work
    G->>O: isolation
    O-->>M: lockout tagout
~~~

~~~mermaid
classDiagram
    class Closure
    class SafetyAuthority
    class WorkPermit
    class Hazard
    Closure "1" --> "*" SafetyAuthority : Safety isolation direction
    SafetyAuthority --> WorkPermit : hazard
    WorkPermit --> Hazard : isolation
~~~

## 51. Maintenance Costing Boundary

Maintenance supplies attributable labor, spare use, tool, external-service, contractor, overhead-direction, breakdown and preventive cost evidence by order, operation, equipment, cost center and asset reference. These are cost inputs, not journals.

Finance and Cost Accounting own valuation, rates, posting, accrual, settlement and reconciliation. Inventory supplies authoritative spare valuation. Corrections to technical quantities trigger a financial adjustment request rather than a direct ledger update, and closed periods follow Finance policy.

**Controlled concepts:** labor cost; spare cost; tool cost; external service; contractor; overhead; breakdown cost; preventive cost; capital expense direction; cost center; asset reference; order cost; Finance posting; reconciliation.

~~~mermaid
stateDiagram-v2
    [*] --> MaintenanceCostingB: labor cost
    MaintenanceCostingB --> MaintenanceCostingC: Maintenance costing
    MaintenanceCostingC --> MaintenanceCostingD: tool cost
    MaintenanceCostingD --> MaintenanceCostingE: external service
    MaintenanceCostingE --> [*]: contractor
~~~

## 52. Repair-versus-Capitalization Boundary

Maintenance documents whether work is routine repair, major overhaul, component replacement, betterment-direction or life-extension-direction, including before/after condition and scope. It may flag a capital candidate but cannot classify or capitalize the transaction.

Finance reviews policy, value and accounting-asset structure, approves expense versus capital treatment and controls depreciation. Technical closure can precede classification; financial settlement remains pending until resolved. Asset retirement and decommissioning are linked but separately authorized.

**Controlled concepts:** routine repair; major overhaul; betterment; life extension; component replacement; capital candidate; Finance review; approval; asset accounting; depreciation boundary; technical evidence.

~~~mermaid
flowchart LR
    RepairVersusCapitaA["Repair versus capitalization"]
    RepairVersusCapitaB["life extension"]
    RepairVersusCapitaC["component replacement"]
    RepairVersusCapitaD["capital candidate"]
    RepairVersusCapitaE["Finance review"]
    RepairVersusCapitaF["approval"]
    RepairVersusCapitaB --> RepairVersusCapitaC
    RepairVersusCapitaC --> RepairVersusCapitaD
    RepairVersusCapitaC --> RepairVersusCapitaE
    RepairVersusCapitaD & RepairVersusCapitaE --> RepairVersusCapitaF
    RepairVersusCapitaA -.-> RepairVersusCapitaC
~~~

## 53. Maintenance Reporting and Analytics

Governed measures include PM compliance, schedule compliance, backlog and age, breakdown rate, MTBF, MTTR, availability, downtime, repeat failure, emergency-work share, spare shortage, cost, asset health, contractor performance and calibration due. Each measure defines grain, population, clock, exclusions, formula version and owner.

Reporting follows FCSB-013: analytical projections are reproducible and cannot mutate work evidence. Late events and corrections trigger restatement markers. Cross-domain measures label their contributing authority—for example Maintenance downtime versus Manufacturing production loss—rather than presenting an unqualified total.

**Controlled concepts:** PM compliance; schedule compliance; backlog; age; breakdown rate; MTBF; MTTR; availability; downtime; repeat failure; emergency work; spare shortage; cost; health; contractor performance; calibration due; reporting boundary.

~~~mermaid
flowchart TB
    ReportingA["Reporting"]
    ReportingB["spare shortage"]
    ReportingC["cost"]
    ReportingD["health"]
    ReportingE["contractor performance"]
    ReportingF["calibration due"]
    ReportingB & ReportingC --> ReportingD
    ReportingD --> ReportingE --> ReportingF
    ReportingF -.-> ReportingC
    ReportingA -.-> ReportingE
~~~

## 54. Maintenance Reconciliation

Reconciliation proves that Maintenance requests and domain acknowledgements agree. Inventory reconciliation compares planned, reserved, issued, installed and returned spares; Manufacturing compares equipment release with stop/restart and downtime; Quality compares calibration-impact and hold dependencies; Procurement compares external-service evidence; Finance compares accepted quantities, costs and settlement.

Each exception records correlation identity, expected and actual state, age, owner and resolution. Work-order completion, equipment condition and cross-domain effect remain separate fields. Reconciliation is continuous as well as period-end and cannot be satisfied by manually marking a request complete without authoritative acknowledgement.

**Controlled concepts:** Maintenance to Inventory; Maintenance to Manufacturing; Maintenance to Quality; Maintenance to Procurement; Maintenance to Finance; equipment state; spare quantity; order completion; downtime; external service; cost; calibration; exception aging.

~~~mermaid
flowchart LR
    InventoryReconciliA["Inventory reconciliation"]
    InventoryReconciliB["Planned spare demand"]
    InventoryReconciliC["Reservation acknowledgement"]
    InventoryReconciliD["Issued batch or serial"]
    InventoryReconciliE["Installed or returned quantity"]
    InventoryReconciliF["Inventory exception owner"]
    InventoryReconciliB --> InventoryReconciliC --> InventoryReconciliD --> InventoryReconciliE --> InventoryReconciliF
    InventoryReconciliA -.-> InventoryReconciliD
~~~

~~~mermaid
flowchart TB
    ManufacturingReconA["Manufacturing reconciliation"]
    ManufacturingReconB["Maintenance hold request"]
    ManufacturingReconC["Production stop acknowledgement"]
    ManufacturingReconD["Equipment release decision"]
    ManufacturingReconE["Manufacturing restart record"]
    ManufacturingReconF["Downtime boundary variance"]
    ManufacturingReconB --> ManufacturingReconC
    ManufacturingReconC --> ManufacturingReconD
    ManufacturingReconC --> ManufacturingReconE
    ManufacturingReconD & ManufacturingReconE --> ManufacturingReconF
    ManufacturingReconA -.-> ManufacturingReconC
~~~

~~~mermaid
flowchart LR
    QualityReconciliatA["Quality reconciliation"]
    QualityReconciliatB["Failed instrument interval"]
    QualityReconciliatC["Affected inspection search"]
    QualityReconciliatD["Quality impact assessment"]
    QualityReconciliatE["Reinspection or product hold"]
    QualityReconciliatF["Impact closure acknowledgement"]
    QualityReconciliatB & QualityReconciliatC --> QualityReconciliatD
    QualityReconciliatD --> QualityReconciliatE --> QualityReconciliatF
    QualityReconciliatF -.-> QualityReconciliatC
    QualityReconciliatA -.-> QualityReconciliatE
~~~

~~~mermaid
flowchart TB
    ProcurementReconciA["Procurement reconciliation"]
    ProcurementReconciB["External service requirement"]
    ProcurementReconciC["Purchase-order reference"]
    ProcurementReconciD["Supplier service evidence"]
    ProcurementReconciE["Maintenance acceptance"]
    ProcurementReconciF["Invoice eligibility response"]
    ProcurementReconciB --> ProcurementReconciD
    ProcurementReconciC --> ProcurementReconciD
    ProcurementReconciD --> ProcurementReconciE
    ProcurementReconciE -- "acknowledged" --> ProcurementReconciF
    ProcurementReconciA -.-> ProcurementReconciB
~~~

~~~mermaid
flowchart LR
    FinanceReconciliatA["Finance reconciliation"]
    FinanceReconciliatB["Accepted labor and spare quantities"]
    FinanceReconciliatC["Cost object validation"]
    FinanceReconciliatD["Finance posting acknowledgement"]
    FinanceReconciliatE["Work-order settlement"]
    FinanceReconciliatF["Maintenance cost variance"]
    FinanceReconciliatB --> FinanceReconciliatC --> FinanceReconciliatE
    FinanceReconciliatB --> FinanceReconciliatD --> FinanceReconciliatE
    FinanceReconciliatE --> FinanceReconciliatF
    FinanceReconciliatA -.-> FinanceReconciliatF
~~~

## 55. Maintenance Security and Segregation of Duties

Authorization combines tenant, company, plant, technical-object scope, role, order state and action purpose. Requesters cannot approve their own consequential order; planners do not self-approve high-risk scope; dispatchers do not fabricate technician evidence; technicians do not approve equipment release for controlled work; calibration executors do not decide Quality impact.

Maintenance cannot issue Inventory, restart Manufacturing, release Quality, approve suppliers or post Finance. Contractor and cross-plant access are time-bounded and sponsored; shared terminals require reauthentication for signatures. Break-glass permits containment, never autonomous release or bypass of Safety/HSE authority.

**Controlled concepts:** requester approver; planner approver; dispatcher technician; technician release; Inventory issue; Manufacturing restart; Quality release; Procurement supplier; Finance posting; calibration impact; shared terminal; contractor; cross plant; break glass; audit; tenant isolation; AI.

~~~mermaid
sequenceDiagram
    participant M as "Finance posting"
    participant G as "calibration impact"
    participant O as "shared terminal"
    M->>G: Segregation of duties
    G->>O: contractor
    O-->>M: cross plant
~~~

~~~mermaid
classDiagram
    class InventoryIssue
    class ManufacturingRestart
    class QualityRelease
    class ProcurementSupplier
    InventoryIssue "1" --> "*" ManufacturingRestart : Contractor access
    ManufacturingRestart --> QualityRelease : Procurement supplier
    QualityRelease --> ProcurementSupplier : Finance posting
~~~

## 56. Maintenance Threat Model

Threats include fabricated completion, spare theft, equipment-state tampering, unauthorized release, manipulated downtime, false meter readings, spoofed sensors, contractor identity abuse, warranty-evidence alteration and forged calibration certificates. Direct cross-domain writes and cross-tenant reads are treated as boundary violations.

Controls combine scoped authorization, append-only event history, dual control, signed acknowledgements, device provenance, anomaly detection, reconciliation and independent audit. Customization and AI execute through the same policy gates; no extension can grant release, restart, issue or posting authority it does not own.

**Controlled concepts:** fake completion; spare theft; state tampering; unauthorized release; downtime manipulation; meter falsification; sensor spoofing; contractor abuse; warranty manipulation; certificate forgery; direct writes; AI attempt; cross tenant.

~~~mermaid
stateDiagram-v2
    [*] --> ThreatModelB: unauthorized release
    ThreatModelB --> ThreatModelC: Threat model
    ThreatModelC --> ThreatModelD: meter falsification
    ThreatModelD --> ThreatModelE: sensor spoofing
    ThreatModelE --> [*]: contractor abuse
~~~

~~~mermaid
flowchart LR
    AiRestrictionFlowA["AI restriction flow"]
    AiRestrictionFlowB["direct writes"]
    AiRestrictionFlowC["AI attempt"]
    AiRestrictionFlowD["cross tenant"]
    AiRestrictionFlowE["fake completion"]
    AiRestrictionFlowF["spare theft"]
    AiRestrictionFlowB --> AiRestrictionFlowC
    AiRestrictionFlowC --> AiRestrictionFlowD
    AiRestrictionFlowC --> AiRestrictionFlowE
    AiRestrictionFlowD & AiRestrictionFlowE --> AiRestrictionFlowF
    AiRestrictionFlowA -.-> AiRestrictionFlowC
~~~

## 57. Maintenance Capability Matrix

The capability matrix distinguishes concrete repository foundations from scaffolds, registrations, planned domain behavior and future technology. An Implemented foundation row cites a model or field plus migration and service or accepted test where available; a seed or enum alone is classified as Registered metadata only.

Ownership is singular per capability. Supporting domains provide referenced identity, decisions or acknowledgements but do not share the accountable record. Absence statements are capability-specific and do not imply that generic metadata executes a maintenance process.

**Controlled concepts:** capability ID; status; evidence basis; accountable owner; supporting domain; authority boundary; current foundation; target behavior.

### 57.1 Evidence-based capability register

| Capability ID | Capability | Current status | Repository evidence or absence basis | Accountable owner | Supporting/dependency domain | Authority boundary |
|---|---|---|---|---|---|---|
| MCAP-001 | Tenant identity | Implemented foundation | [Tenant model](../../apps/api/prisma/schema.prisma#L86); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql); [authentication service](../../apps/api/src/auth/auth.service.ts) | Platform Engineering | Maintenance / Security | Platform owns tenant identity; Maintenance records must carry that tenant and cannot infer another scope. |
| MCAP-002 | Company identity | Implemented foundation | [Company model](../../apps/api/prisma/schema.prisma#L178); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql); [company service](../../apps/api/src/companies/companies.service.ts) | Organization Governance | Maintenance / Finance | Organization Governance owns company identity; Maintenance references it for technical and cost scope. |
| MCAP-003 | Plant identity | Implemented foundation | [Plant model](../../apps/api/prisma/schema.prisma#L383); [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql); [organization service and tests](../../apps/api/test/organization.spec.ts) | Operations | Maintenance / Manufacturing | Operations owns plant structure; Maintenance defines maintenance and planning authority inside an authorized plant. |
| MCAP-004 | Department identity | Implemented foundation | [Department model](../../apps/api/prisma/schema.prisma#L496); [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql); [organization tests](../../apps/api/test/organization.spec.ts) | Organization Governance | Maintenance | Organization Governance owns department identity; Maintenance assigns responsibilities without rewriting the organization tree. |
| MCAP-005 | Location identity | Implemented foundation | [Location model](../../apps/api/prisma/schema.prisma#L598); [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql); [organization service](../../apps/api/src/organization/organization-entities.service.ts) | Organization Governance | Maintenance / Operations | The organization location is reusable context, not an implemented functional-location hierarchy. |
| MCAP-006 | Cost-center identity | Implemented foundation | [CostCenter model](../../apps/api/prisma/schema.prisma#L638); [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql); [organization tests](../../apps/api/test/organization.spec.ts) | Finance | Maintenance / Cost Accounting | Finance owns cost-center identity; Maintenance attaches evidence and cannot post or settle cost. |
| MCAP-007 | Profit-center identity | Implemented foundation | [ProfitCenter model](../../apps/api/prisma/schema.prisma#L670); [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql) | Finance | Maintenance / Operations | Finance owns profit-center structure; Maintenance may reference it for reporting only. |
| MCAP-008 | Organization hierarchy and history | Implemented foundation | [OrganizationNode and relationship history](../../apps/api/prisma/schema.prisma#L705); [hierarchy service](../../apps/api/src/organization/organization-hierarchy.service.ts); [accepted organization tests](../../apps/api/test/organization.spec.ts) | Organization Governance | Maintenance / Security | The effective-dated organization hierarchy scopes authority but is not an asset or functional-location hierarchy. |
| MCAP-009 | Organization access scope | Implemented foundation | [UserOrganizationAccess](../../apps/api/prisma/schema.prisma#L798); [scope service](../../apps/api/src/organization/organization-scope.service.ts); [scope tests](../../apps/api/test/organization.spec.ts) | Security | Maintenance / Organization Governance | Security owns access evaluation; Maintenance supplies object and plant context for authorization. |
| MCAP-010 | Warehouse identity | Implemented foundation | [Warehouse model](../../apps/api/prisma/schema.prisma#L818); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [master-data tests](../../apps/api/test/master-data.spec.ts) | Inventory | Maintenance / Warehouse | Inventory owns warehouse identity and custody; Maintenance only requests spare availability, reservation, issue and return. |
| MCAP-011 | Item master | Implemented foundation | [Item model](../../apps/api/prisma/schema.prisma#L1385); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [master-data service](../../apps/api/src/master-data/master-data.service.ts) | Master Data Governance | Maintenance / Inventory / Procurement | Master Data owns item identity; operational spare quantity and movement remain Inventory-owned. |
| MCAP-012 | Maintenance-spare item flag | Implemented foundation | [Item.isMaintenanceSpare](../../apps/api/prisma/schema.prisma#L1418); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [registry exposure](../../apps/api/src/master-data/master-data.registry.ts) | Master Data Governance | Maintenance / Inventory | The Boolean classification is implemented; it does not reserve, issue or fit a spare. |
| MCAP-013 | Unit-of-measure master | Implemented foundation | [UnitOfMeasure model](../../apps/api/prisma/schema.prisma#L1648); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [master-data tests](../../apps/api/test/master-data.spec.ts) | Master Data Governance | Maintenance / Inventory / Metrology | Master Data owns units and conversions; Maintenance snapshots the unit used for work and readings. |
| MCAP-014 | Manufacturer master | Implemented foundation | [Manufacturer model](../../apps/api/prisma/schema.prisma#L1772); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [master-data registry](../../apps/api/src/master-data/master-data.registry.ts) | Master Data Governance | Asset Management / Procurement | Manufacturer identity supports equipment references but does not create an equipment master. |
| MCAP-015 | Supplier master | Implemented foundation | [Supplier model](../../apps/api/prisma/schema.prisma#L1459); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [supplier validation test](../../apps/api/test/master-data.spec.ts) | Procurement | Maintenance / Supplier Management | Procurement owns supplier identity and approval; Maintenance records technical service evidence. |
| MCAP-016 | Serial-number identity | Implemented foundation | [SerialNumber model](../../apps/api/prisma/schema.prisma#L1899); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [serial tests](../../apps/api/test/master-data.spec.ts) | Inventory | Maintenance / Asset Management | Inventory owns stock serial identity; an equipment or installed-component identity remains planned. |
| MCAP-017 | Serial warranty dates | Implemented foundation | [SerialNumber warranty fields](../../apps/api/prisma/schema.prisma#L1907); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql); [date validation service](../../apps/api/src/master-data/master-data.service.ts) | Inventory | Maintenance / Procurement | Warranty dates are implemented master fields; eligibility, evidence and claims remain planned. |
| MCAP-018 | User identity | Implemented foundation | [User model](../../apps/api/prisma/schema.prisma#L852); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql); [authentication service](../../apps/api/src/auth/auth.service.ts) | Security | Maintenance / Contractor Management | Security owns authenticated user identity; technician qualification and contractor sponsorship remain planned. |
| MCAP-019 | Generic workflow definition | Scaffold | [WorkflowDefinition](../../apps/api/prisma/schema.prisma#L1135); [workflow service](../../apps/api/src/workflows/workflows.service.ts); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql) | Platform Engineering | Maintenance / Security | The versioned workflow scaffold has no maintenance lifecycle guards, timers or runtime instance semantics. |
| MCAP-020 | Generic approval request | Scaffold | [ApprovalRequest](../../apps/api/prisma/schema.prisma#L1300); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql) | Platform Engineering | Maintenance / Safety / Security | The generic record does not establish order, permit, deferral or equipment-release authority. |
| MCAP-021 | Generic number series | Scaffold | [NumberSeries](../../apps/api/prisma/schema.prisma#L1330); [number-series service](../../apps/api/src/number-series/number-series.service.ts) | Platform Engineering | Maintenance / Data Governance | Number generation is reusable; maintenance document series and collision policy remain unconfigured. |
| MCAP-022 | Generic audit log | Scaffold | [AuditLog](../../apps/api/prisma/schema.prisma#L1357); [audit service](../../apps/api/src/audit/audit.service.ts) | Security | Maintenance / Internal Audit | Audit infrastructure exists but maintenance-specific immutable event and signature semantics remain planned. |
| MCAP-023 | Generic transaction document | Scaffold | [TransactionDocument](../../apps/api/prisma/schema.prisma#L2321); [transaction service](../../apps/api/src/transactions/transactions.service.ts) | Platform Engineering | Maintenance / Integration | The generic document can carry a kind but does not implement a request, notification or work-order aggregate. |
| MCAP-024 | Generic transaction links | Scaffold | [TransactionLink](../../apps/api/prisma/schema.prisma#L2345); [transaction-link service](../../apps/api/src/transactions/transactions.service.ts) | Platform Engineering | Maintenance / Data Governance | Generic links do not enforce typed technical genealogy, completeness or reconciliation. |
| MCAP-025 | Generic report definition | Scaffold | [ReportDefinition](../../apps/api/prisma/schema.prisma#L1226); [report service](../../apps/api/src/reports/reports.service.ts) | Reporting | Maintenance / Reliability | Report metadata and preview exist; governed maintenance measures and semantic models do not. |
| MCAP-026 | Dashboard work-order count | Partial | [Dashboard service WORK_ORDER query](../../apps/api/src/dashboard/dashboard.service.ts#L15); [TransactionKind.WORK_ORDER](../../apps/api/prisma/schema.prisma#L67) | Reporting | Maintenance / Manufacturing | A generic count is present but WORK_ORDER is a shared transaction kind and no Maintenance work-order runtime exists. |
| MCAP-027 | Digital DNA service | Scaffold | [Digital DNA service](../../apps/api/src/digital-dna/digital-dna.service.ts); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql) | Data Governance | Maintenance / Asset Management | Immutable identity generation is reusable; asset and equipment identity policies remain planned. |
| MCAP-028 | MAINTENANCE role enum | Registered metadata only | [Role.MAINTENANCE](../../apps/api/prisma/schema.prisma#L21); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql) | Security | Maintenance | The enum is vocabulary and grants no maintenance permission or object authority. |
| MCAP-029 | MAINTENANCE module enum | Registered metadata only | [ModuleCode.MAINTENANCE](../../apps/api/prisma/schema.prisma#L34); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql) | Platform Engineering | Maintenance | Module registration does not provide EAM behavior. |
| MCAP-030 | Maintenance transaction kinds | Registered metadata only | [Maintenance transaction kinds](../../apps/api/prisma/schema.prisma#L72); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql) | Platform Engineering | Maintenance / Inventory | Registered kinds do not execute requests, orders, spare issues or completion reports. |
| MCAP-031 | Maintenance Manager role seed | Registered metadata only | [Role seed](../../apps/api/prisma/seed.ts#L10) | Security | Maintenance Director | A seeded role name has no demonstrated maintenance-specific permissions or SoD policy. |
| MCAP-032 | Maintenance department seed | Registered metadata only | [Department seed](../../apps/api/prisma/seed.ts#L151) | Organization Governance | Maintenance Director | A seeded department supplies organization vocabulary but no planning or release authority. |
| MCAP-033 | Maintenance EOR registrations | Registered metadata only | [ASSET and maintenance EOR seeds](../../apps/api/prisma/seed.ts#L30) | Platform Engineering | Maintenance Product Owner | Registered objects expose metadata names only; no dedicated table, controller, service or accepted test exists. |
| MCAP-034 | Spare item/category/warehouse seeds | Registered metadata only | [Spare classifications](../../apps/api/prisma/seed.ts#L228); [spare warehouse seed](../../apps/api/prisma/seed.ts#L240) | Master Data Governance | Maintenance / Inventory | Seeded classifications do not prove stock availability, reservation, issue or maintenance consumption. |
| MCAP-035 | Asset and Technical Object Boundary — asset | Planned | Absent: no Asset and Technical Object Boundary — asset aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-036 | Functional Location Architecture — functional location | Planned | Absent: no Functional Location Architecture — functional location aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-037 | Equipment Architecture — equipment identity | Planned | Absent: no Equipment Architecture — equipment identity aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-038 | Equipment Lifecycle — Proposed | Planned | Absent: no Equipment Lifecycle — Proposed aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-039 | Asset Hierarchy and Component Structure — parent equipment | Planned | Absent: no Asset Hierarchy and Component Structure — parent equipment aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-040 | Asset Criticality Architecture — safety criticality | Planned | Absent: no Asset Criticality Architecture — safety criticality aggregate or accepted test. | Safety/HSE | Maintenance / Operations | Safety/HSE owns it; Maintenance / Operations responds through governed requests. |
| MCAP-041 | Maintenance Strategy Architecture — run to failure | Planned | Absent: no Maintenance Strategy Architecture — run to failure aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-042 | Maintenance Plan Architecture — plan identity | Planned | Absent: no Maintenance Plan Architecture — plan identity aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-043 | Preventive Maintenance — time PM | Planned | Absent: no Preventive Maintenance — time PM aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-044 | Maintenance Task List Architecture — task list | Planned | Absent: no Maintenance Task List Architecture — task list aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-045 | Maintenance Request Architecture — request identity | Planned | Absent: no Maintenance Request Architecture — request identity aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-046 | Maintenance Notification Architecture — notification | Planned | Absent: no Maintenance Notification Architecture — notification aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-047 | Request and Notification Lifecycle — Draft | Planned | Absent: no Request and Notification Lifecycle — Draft aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-048 | Maintenance Priority and Criticality — Emergency | Planned | Absent: no Maintenance Priority and Criticality — Emergency aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-049 | Maintenance Work Order Architecture — order identity | Planned | Absent: no Maintenance Work Order Architecture — order identity aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-050 | Work Order Lifecycle — Draft | Planned | Absent: no Work Order Lifecycle — Draft aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-051 | Work Order Validation and Release — equipment | Planned | Absent: no Work Order Validation and Release — equipment aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-052 | Maintenance Planning — scope | Planned | Absent: no Maintenance Planning — scope aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-053 | Maintenance Scheduling — backlog | Planned | Absent: no Maintenance Scheduling — backlog aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-054 | Dispatch Architecture — work queue | Planned | Absent: no Dispatch Architecture — work queue aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-055 | Technician Execution — operation | Planned | Absent: no Technician Execution — operation aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-056 | Labor and Crew Reporting — technician | Planned | Absent: no Labor and Crew Reporting — technician aggregate or accepted test. | Reporting | Reliability / Maintenance / Data Governance | Reporting owns it; Reliability / Maintenance / Data Governance responds through governed requests. |
| MCAP-057 | Spare Parts Planning Boundary — planned spare | Planned | Absent: no Spare Parts Planning Boundary — planned spare aggregate or accepted test. | Inventory | Maintenance / Warehouse / Procurement | Inventory owns it; Maintenance / Warehouse / Procurement responds through governed requests. |
| MCAP-058 | Spare Reservation and Issue Boundary — reservation request | Planned | Absent: no Spare Reservation and Issue Boundary — reservation request aggregate or accepted test. | Inventory | Maintenance / Warehouse / Procurement | Inventory owns it; Maintenance / Warehouse / Procurement responds through governed requests. |
| MCAP-059 | Maintenance Tools and Test Equipment — tool requirement | Planned | Absent: no Maintenance Tools and Test Equipment — tool requirement aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-060 | External Service and Contractor Maintenance — external service | Planned | Absent: no External Service and Contractor Maintenance — external service aggregate or accepted test. | Procurement | Maintenance / Supplier Management | Procurement owns it; Maintenance / Supplier Management responds through governed requests. |
| MCAP-061 | Breakdown Maintenance — breakdown declaration | Planned | Absent: no Breakdown Maintenance — breakdown declaration aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-062 | Corrective Maintenance — detected defect | Planned | Absent: no Corrective Maintenance — detected defect aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-063 | Equipment Hold Architecture — maintenance hold | Planned | Absent: no Equipment Hold Architecture — maintenance hold aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-064 | Equipment Release and Return-to-Service — work completion | Planned | Absent: no Equipment Release and Return-to-Service — work completion aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-065 | Downtime Architecture — planned downtime | Planned | Absent: no Downtime Architecture — planned downtime aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-066 | Failure Coding Architecture — symptom | Planned | Absent: no Failure Coding Architecture — symptom aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-067 | Root-Cause and Repeat-Failure Analysis — repeat failure | Planned | Absent: no Root-Cause and Repeat-Failure Analysis — repeat failure aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-068 | Reliability Engineering Architecture — reliability object | Planned | Absent: no Reliability Engineering Architecture — reliability object aggregate or accepted test. | Reliability Manager | Maintenance / Engineering / Data Governance | Reliability Manager owns it; Maintenance / Engineering / Data Governance responds through governed requests. |
| MCAP-069 | Asset Health and Condition Monitoring — health indicator | Planned | Absent: no Asset Health and Condition Monitoring — health indicator aggregate or accepted test. | Reliability Manager | Maintenance / Engineering / Data Governance | Reliability Manager owns it; Maintenance / Engineering / Data Governance responds through governed requests. |
| MCAP-070 | Measurement Points, Meters and Counters — measurement point | Planned | Absent: no Measurement Points, Meters and Counters — measurement point aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-071 | Condition-Based Maintenance — condition rule | Planned | Absent: no Condition-Based Maintenance — condition rule aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-072 | Predictive Maintenance Direction — sensor data | Future | Absent: no Predictive Maintenance Direction — sensor data aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-073 | Calibration and Metrology Coordination — instrument | Planned | Absent: no Calibration and Metrology Coordination — instrument aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-074 | Out-of-Tolerance Instrument Impact Boundary — failed calibration | Planned | Absent: no Out-of-Tolerance Instrument Impact Boundary — failed calibration aggregate or accepted test. | Quality | Maintenance / Metrology | Quality owns it; Maintenance / Metrology responds through governed requests. |
| MCAP-075 | Warranty Architecture — warranty | Planned | Absent: no Warranty Architecture — warranty aggregate or accepted test. | Procurement | Maintenance / Supplier Management | Procurement owns it; Maintenance / Supplier Management responds through governed requests. |
| MCAP-076 | Maintenance Contract and Service Agreement Direction — contract | Planned | Absent: no Maintenance Contract and Service Agreement Direction — contract aggregate or accepted test. | Procurement | Maintenance / Supplier Management | Procurement owns it; Maintenance / Supplier Management responds through governed requests. |
| MCAP-077 | Shutdown and Turnaround Direction — shutdown | Planned | Absent: no Shutdown and Turnaround Direction — shutdown aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-078 | Safety and Permit-to-Work Boundary — work permit | Planned | Absent: no Safety and Permit-to-Work Boundary — work permit aggregate or accepted test. | Safety/HSE | Maintenance / Operations | Safety/HSE owns it; Maintenance / Operations responds through governed requests. |
| MCAP-079 | Maintenance Costing Boundary — labor cost | Planned | Absent: no Maintenance Costing Boundary — labor cost aggregate or accepted test. | Finance | Maintenance / Cost Accounting | Finance owns it; Maintenance / Cost Accounting responds through governed requests. |
| MCAP-080 | Repair-versus-Capitalization Boundary — routine repair | Planned | Absent: no Repair-versus-Capitalization Boundary — routine repair aggregate or accepted test. | Finance | Maintenance / Cost Accounting | Finance owns it; Maintenance / Cost Accounting responds through governed requests. |
| MCAP-081 | Maintenance Reporting and Analytics — PM compliance | Planned | Absent: no Maintenance Reporting and Analytics — PM compliance aggregate or accepted test. | Reporting | Reliability / Maintenance / Data Governance | Reporting owns it; Reliability / Maintenance / Data Governance responds through governed requests. |
| MCAP-082 | Maintenance Reconciliation — Maintenance to Inventory | Planned | Absent: no Maintenance Reconciliation — Maintenance to Inventory aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-083 | Maintenance Security and Segregation of Duties — requester approver | Planned | Absent: no Maintenance Security and Segregation of Duties — requester approver aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-084 | Maintenance Threat Model — fake completion | Planned | Absent: no Maintenance Threat Model — fake completion aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-085 | Asset and Technical Object Boundary — fixed asset | Planned | Absent: no Asset and Technical Object Boundary — fixed asset aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-086 | Functional Location Architecture — hierarchy | Planned | Absent: no Functional Location Architecture — hierarchy aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-087 | Equipment Architecture — category | Planned | Absent: no Equipment Architecture — category aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-088 | Equipment Lifecycle — Registered | Planned | Absent: no Equipment Lifecycle — Registered aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-089 | Asset Hierarchy and Component Structure — child equipment | Planned | Absent: no Asset Hierarchy and Component Structure — child equipment aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-090 | Asset Criticality Architecture — production criticality | Planned | Absent: no Asset Criticality Architecture — production criticality aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-091 | Maintenance Strategy Architecture — time preventive | Planned | Absent: no Maintenance Strategy Architecture — time preventive aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-092 | Maintenance Plan Architecture — equipment scope | Planned | Absent: no Maintenance Plan Architecture — equipment scope aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-093 | Preventive Maintenance — usage PM | Planned | Absent: no Preventive Maintenance — usage PM aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-094 | Maintenance Task List Architecture — version | Planned | Absent: no Maintenance Task List Architecture — version aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-095 | Maintenance Request Architecture — requester | Planned | Absent: no Maintenance Request Architecture — requester aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-096 | Maintenance Notification Architecture — technical object | Planned | Absent: no Maintenance Notification Architecture — technical object aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-097 | Request and Notification Lifecycle — Submitted | Planned | Absent: no Request and Notification Lifecycle — Submitted aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-098 | Maintenance Priority and Criticality — Urgent | Planned | Absent: no Maintenance Priority and Criticality — Urgent aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-099 | Maintenance Work Order Architecture — type | Planned | Absent: no Maintenance Work Order Architecture — type aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-100 | Work Order Lifecycle — Planning | Planned | Absent: no Work Order Lifecycle — Planning aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-101 | Work Order Validation and Release — functional location | Planned | Absent: no Work Order Validation and Release — functional location aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-102 | Maintenance Planning — job plan | Planned | Absent: no Maintenance Planning — job plan aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-103 | Maintenance Scheduling — ready backlog | Planned | Absent: no Maintenance Scheduling — ready backlog aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-104 | Dispatch Architecture — crew assignment | Planned | Absent: no Dispatch Architecture — crew assignment aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-105 | Technician Execution — start | Planned | Absent: no Technician Execution — start aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-106 | Labor and Crew Reporting — crew | Planned | Absent: no Labor and Crew Reporting — crew aggregate or accepted test. | Reporting | Reliability / Maintenance / Data Governance | Reporting owns it; Reliability / Maintenance / Data Governance responds through governed requests. |
| MCAP-107 | Spare Parts Planning Boundary — quantity | Planned | Absent: no Spare Parts Planning Boundary — quantity aggregate or accepted test. | Inventory | Maintenance / Warehouse / Procurement | Inventory owns it; Maintenance / Warehouse / Procurement responds through governed requests. |
| MCAP-108 | Spare Reservation and Issue Boundary — Inventory validation | Planned | Absent: no Spare Reservation and Issue Boundary — Inventory validation aggregate or accepted test. | Inventory | Maintenance / Warehouse / Procurement | Inventory owns it; Maintenance / Warehouse / Procurement responds through governed requests. |
| MCAP-109 | Maintenance Tools and Test Equipment — tool identity | Planned | Absent: no Maintenance Tools and Test Equipment — tool identity aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-110 | External Service and Contractor Maintenance — scope of work | Planned | Absent: no External Service and Contractor Maintenance — scope of work aggregate or accepted test. | Procurement | Maintenance / Supplier Management | Procurement owns it; Maintenance / Supplier Management responds through governed requests. |
| MCAP-111 | Breakdown Maintenance — malfunction start | Planned | Absent: no Breakdown Maintenance — malfunction start aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-112 | Corrective Maintenance — planned corrective | Planned | Absent: no Corrective Maintenance — planned corrective aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-113 | Equipment Hold Architecture — equipment | Planned | Absent: no Equipment Hold Architecture — equipment aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-114 | Equipment Release and Return-to-Service — verification | Planned | Absent: no Equipment Release and Return-to-Service — verification aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-115 | Downtime Architecture — unplanned downtime | Planned | Absent: no Downtime Architecture — unplanned downtime aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-116 | Failure Coding Architecture — damage | Planned | Absent: no Failure Coding Architecture — damage aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-117 | Root-Cause and Repeat-Failure Analysis — chronic bad actor | Planned | Absent: no Root-Cause and Repeat-Failure Analysis — chronic bad actor aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-118 | Reliability Engineering Architecture — failure population | Planned | Absent: no Reliability Engineering Architecture — failure population aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-119 | Asset Health and Condition Monitoring — condition reading | Planned | Absent: no Asset Health and Condition Monitoring — condition reading aggregate or accepted test. | Reliability Manager | Maintenance / Engineering / Data Governance | Reliability Manager owns it; Maintenance / Engineering / Data Governance responds through governed requests. |
| MCAP-120 | Measurement Points, Meters and Counters — characteristic | Planned | Absent: no Measurement Points, Meters and Counters — characteristic aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-121 | Condition-Based Maintenance — threshold | Planned | Absent: no Condition-Based Maintenance — threshold aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-122 | Predictive Maintenance Direction — model | Future | Absent: no Predictive Maintenance Direction — model aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-123 | Calibration and Metrology Coordination — schedule | Planned | Absent: no Calibration and Metrology Coordination — schedule aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-124 | Out-of-Tolerance Instrument Impact Boundary — last-known-valid point | Planned | Absent: no Out-of-Tolerance Instrument Impact Boundary — last-known-valid point aggregate or accepted test. | Quality | Maintenance / Metrology | Quality owns it; Maintenance / Metrology responds through governed requests. |
| MCAP-125 | Warranty Architecture — supplier | Planned | Absent: no Warranty Architecture — supplier aggregate or accepted test. | Procurement | Maintenance / Supplier Management | Procurement owns it; Maintenance / Supplier Management responds through governed requests. |
| MCAP-126 | Maintenance Contract and Service Agreement Direction — supplier | Planned | Absent: no Maintenance Contract and Service Agreement Direction — supplier aggregate or accepted test. | Procurement | Maintenance / Supplier Management | Procurement owns it; Maintenance / Supplier Management responds through governed requests. |
| MCAP-127 | Shutdown and Turnaround Direction — scope | Planned | Absent: no Shutdown and Turnaround Direction — scope aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-128 | Safety and Permit-to-Work Boundary — hazard | Planned | Absent: no Safety and Permit-to-Work Boundary — hazard aggregate or accepted test. | Safety/HSE | Maintenance / Operations | Safety/HSE owns it; Maintenance / Operations responds through governed requests. |
| MCAP-129 | Maintenance Costing Boundary — spare cost | Planned | Absent: no Maintenance Costing Boundary — spare cost aggregate or accepted test. | Inventory | Maintenance / Warehouse / Procurement | Inventory owns it; Maintenance / Warehouse / Procurement responds through governed requests. |
| MCAP-130 | Repair-versus-Capitalization Boundary — major overhaul | Planned | Absent: no Repair-versus-Capitalization Boundary — major overhaul aggregate or accepted test. | Finance | Maintenance / Cost Accounting | Finance owns it; Maintenance / Cost Accounting responds through governed requests. |
| MCAP-131 | Maintenance Reporting and Analytics — schedule compliance | Planned | Absent: no Maintenance Reporting and Analytics — schedule compliance aggregate or accepted test. | Reporting | Reliability / Maintenance / Data Governance | Reporting owns it; Reliability / Maintenance / Data Governance responds through governed requests. |
| MCAP-132 | Maintenance Reconciliation — Maintenance to Manufacturing | Planned | Absent: no Maintenance Reconciliation — Maintenance to Manufacturing aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-133 | Maintenance Security and Segregation of Duties — planner approver | Planned | Absent: no Maintenance Security and Segregation of Duties — planner approver aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-134 | Maintenance Threat Model — spare theft | Planned | Absent: no Maintenance Threat Model — spare theft aggregate or accepted test. | Inventory | Maintenance / Warehouse / Procurement | Inventory owns it; Maintenance / Warehouse / Procurement responds through governed requests. |
| MCAP-135 | Asset and Technical Object Boundary — equipment | Planned | Absent: no Asset and Technical Object Boundary — equipment aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-136 | Functional Location Architecture — site | Planned | Absent: no Functional Location Architecture — site aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-137 | Equipment Architecture — manufacturer | Planned | Absent: no Equipment Architecture — manufacturer aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-138 | Equipment Lifecycle — Installed | Planned | Absent: no Equipment Lifecycle — Installed aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-139 | Asset Hierarchy and Component Structure — replaceable assembly | Planned | Absent: no Asset Hierarchy and Component Structure — replaceable assembly aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-140 | Asset Criticality Architecture — quality criticality | Planned | Absent: no Asset Criticality Architecture — quality criticality aggregate or accepted test. | Quality | Maintenance / Metrology | Quality owns it; Maintenance / Metrology responds through governed requests. |
| MCAP-141 | Maintenance Strategy Architecture — usage preventive | Planned | Absent: no Maintenance Strategy Architecture — usage preventive aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-142 | Maintenance Plan Architecture — location scope | Planned | Absent: no Maintenance Plan Architecture — location scope aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-143 | Preventive Maintenance — condition PM | Planned | Absent: no Preventive Maintenance — condition PM aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-144 | Maintenance Task List Architecture — operation sequence | Planned | Absent: no Maintenance Task List Architecture — operation sequence aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-145 | Maintenance Request Architecture — equipment | Planned | Absent: no Maintenance Request Architecture — equipment aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-146 | Maintenance Notification Architecture — breakdown flag | Planned | Absent: no Maintenance Notification Architecture — breakdown flag aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-147 | Request and Notification Lifecycle — Triaged | Planned | Absent: no Request and Notification Lifecycle — Triaged aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-148 | Maintenance Priority and Criticality — High | Planned | Absent: no Maintenance Priority and Criticality — High aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-149 | Maintenance Work Order Architecture — equipment | Planned | Absent: no Maintenance Work Order Architecture — equipment aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-150 | Work Order Lifecycle — Awaiting approval | Planned | Absent: no Work Order Lifecycle — Awaiting approval aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-151 | Work Order Validation and Release — priority | Planned | Absent: no Work Order Validation and Release — priority aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-152 | Maintenance Planning — operation | Planned | Absent: no Maintenance Planning — operation aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-153 | Maintenance Scheduling — frozen schedule | Planned | Absent: no Maintenance Scheduling — frozen schedule aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-154 | Dispatch Architecture — technician assignment | Planned | Absent: no Dispatch Architecture — technician assignment aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-155 | Technician Execution — pause | Planned | Absent: no Technician Execution — pause aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-156 | Labor and Crew Reporting — skill | Planned | Absent: no Labor and Crew Reporting — skill aggregate or accepted test. | Reporting | Reliability / Maintenance / Data Governance | Reporting owns it; Reliability / Maintenance / Data Governance responds through governed requests. |
| MCAP-157 | Spare Parts Planning Boundary — UOM | Planned | Absent: no Spare Parts Planning Boundary — UOM aggregate or accepted test. | Inventory | Maintenance / Warehouse / Procurement | Inventory owns it; Maintenance / Warehouse / Procurement responds through governed requests. |
| MCAP-158 | Spare Reservation and Issue Boundary — allocation | Planned | Absent: no Spare Reservation and Issue Boundary — allocation aggregate or accepted test. | Inventory | Maintenance / Warehouse / Procurement | Inventory owns it; Maintenance / Warehouse / Procurement responds through governed requests. |
| MCAP-159 | Maintenance Tools and Test Equipment — tool crib | Planned | Absent: no Maintenance Tools and Test Equipment — tool crib aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-160 | External Service and Contractor Maintenance — supplier | Planned | Absent: no External Service and Contractor Maintenance — supplier aggregate or accepted test. | Procurement | Maintenance / Supplier Management | Procurement owns it; Maintenance / Supplier Management responds through governed requests. |
| MCAP-161 | Breakdown Maintenance — production impact | Planned | Absent: no Breakdown Maintenance — production impact aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-162 | Corrective Maintenance — deferred corrective | Planned | Absent: no Corrective Maintenance — deferred corrective aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-163 | Equipment Hold Architecture — scope | Planned | Absent: no Equipment Hold Architecture — scope aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-164 | Equipment Release and Return-to-Service — test run | Planned | Absent: no Equipment Release and Return-to-Service — test run aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-165 | Downtime Architecture — breakdown downtime | Planned | Absent: no Downtime Architecture — breakdown downtime aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-166 | Failure Coding Architecture — failure mode | Planned | Absent: no Failure Coding Architecture — failure mode aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-167 | Root-Cause and Repeat-Failure Analysis — root-cause case | Planned | Absent: no Root-Cause and Repeat-Failure Analysis — root-cause case aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-168 | Reliability Engineering Architecture — operating time | Planned | Absent: no Reliability Engineering Architecture — operating time aggregate or accepted test. | Reliability Manager | Maintenance / Engineering / Data Governance | Reliability Manager owns it; Maintenance / Engineering / Data Governance responds through governed requests. |
| MCAP-169 | Asset Health and Condition Monitoring — threshold | Planned | Absent: no Asset Health and Condition Monitoring — threshold aggregate or accepted test. | Reliability Manager | Maintenance / Engineering / Data Governance | Reliability Manager owns it; Maintenance / Engineering / Data Governance responds through governed requests. |
| MCAP-170 | Measurement Points, Meters and Counters — unit | Planned | Absent: no Measurement Points, Meters and Counters — unit aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-171 | Condition-Based Maintenance — trend | Planned | Absent: no Condition-Based Maintenance — trend aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-172 | Predictive Maintenance Direction — feature | Future | Absent: no Predictive Maintenance Direction — feature aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-173 | Calibration and Metrology Coordination — calibration order | Planned | Absent: no Calibration and Metrology Coordination — calibration order aggregate or accepted test. | Maintenance Manager | Maintenance Planning / Operations / Security | Maintenance Manager owns it; Maintenance Planning / Operations / Security responds through governed requests. |
| MCAP-174 | Out-of-Tolerance Instrument Impact Boundary — suspect interval | Planned | Absent: no Out-of-Tolerance Instrument Impact Boundary — suspect interval aggregate or accepted test. | Quality | Maintenance / Metrology | Quality owns it; Maintenance / Metrology responds through governed requests. |
| MCAP-175 | Warranty Architecture — equipment | Planned | Absent: no Warranty Architecture — equipment aggregate or accepted test. | Procurement | Maintenance / Supplier Management | Procurement owns it; Maintenance / Supplier Management responds through governed requests. |
| MCAP-176 | Maintenance Contract and Service Agreement Direction — scope | Planned | Absent: no Maintenance Contract and Service Agreement Direction — scope aggregate or accepted test. | Procurement | Maintenance / Supplier Management | Procurement owns it; Maintenance / Supplier Management responds through governed requests. |
| MCAP-177 | Shutdown and Turnaround Direction — asset list | Planned | Absent: no Shutdown and Turnaround Direction — asset list aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-178 | Safety and Permit-to-Work Boundary — isolation | Planned | Absent: no Safety and Permit-to-Work Boundary — isolation aggregate or accepted test. | Safety/HSE | Maintenance / Operations | Safety/HSE owns it; Maintenance / Operations responds through governed requests. |
| MCAP-179 | Maintenance Costing Boundary — tool cost | Planned | Absent: no Maintenance Costing Boundary — tool cost aggregate or accepted test. | Finance | Maintenance / Cost Accounting | Finance owns it; Maintenance / Cost Accounting responds through governed requests. |
| MCAP-180 | Repair-versus-Capitalization Boundary — betterment | Planned | Absent: no Repair-versus-Capitalization Boundary — betterment aggregate or accepted test. | Finance | Maintenance / Cost Accounting | Finance owns it; Maintenance / Cost Accounting responds through governed requests. |
| MCAP-181 | Maintenance Reporting and Analytics — backlog | Planned | Absent: no Maintenance Reporting and Analytics — backlog aggregate or accepted test. | Reporting | Reliability / Maintenance / Data Governance | Reporting owns it; Reliability / Maintenance / Data Governance responds through governed requests. |
| MCAP-182 | Maintenance Reconciliation — Maintenance to Quality | Planned | Absent: no Maintenance Reconciliation — Maintenance to Quality aggregate or accepted test. | Quality | Maintenance / Metrology | Quality owns it; Maintenance / Metrology responds through governed requests. |
| MCAP-183 | Maintenance Security and Segregation of Duties — dispatcher technician | Planned | Absent: no Maintenance Security and Segregation of Duties — dispatcher technician aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-184 | Maintenance Threat Model — state tampering | Planned | Absent: no Maintenance Threat Model — state tampering aggregate or accepted test. | Maintenance Product Owner | Reliability / AI Governance / Security | Maintenance Product Owner owns it; Reliability / AI Governance / Security responds through governed requests. |
| MCAP-185 | Asset and Technical Object Boundary — machine | Planned | Absent: no Asset and Technical Object Boundary — machine aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-186 | Functional Location Architecture — plant | Planned | Absent: no Functional Location Architecture — plant aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-187 | Equipment Architecture — model | Planned | Absent: no Equipment Architecture — model aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-188 | Equipment Lifecycle — Commissioning | Planned | Absent: no Equipment Lifecycle — Commissioning aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-189 | Asset Hierarchy and Component Structure — serialized component | Planned | Absent: no Asset Hierarchy and Component Structure — serialized component aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |
| MCAP-190 | Asset Criticality Architecture — environmental direction | Planned | Absent: no Asset Criticality Architecture — environmental direction aggregate or accepted test. | Asset Manager | Maintenance / Engineering / Operations | Asset Manager owns it; Maintenance / Engineering / Operations responds through governed requests. |

## 58. Maintenance Risk, Example and Responsibility Models

The risk register describes concrete failure conditions, operational impacts, target controls, accountable owners and residual direction. The example catalog traces realistic requests and acknowledgements across Inventory, Manufacturing, Quality, Procurement, Safety/HSE and Finance without direct writes.

The RACI assigns exactly one accountable and one different responsible role per activity. A current-versus-target matrix separates existing organization/master-data/platform evidence from planned maintenance aggregates and future predictive/mobile functions.

**Controlled concepts:** risk register; example catalog; RACI; current versus target; effect requests; approval; reconciliation; specific risk; residual direction.

### 58.1 Maintenance risk register

The register states a concrete failure condition, resulting operational consequence, target control owner and remaining risk direction. Residual direction is a design expectation, not a claim that controls operate today.

| Risk ID | Maintenance area | Risk | Current condition | Impact | Target mitigation | Owner | Residual-risk direction |
|---|---|---|---|---|---|---|---|
| MR-001 | Technical object | Wrong equipment selected | Technical object — Wrong equipment selected: missing freeze the selected revision before Finance settlement. | Technical object — Wrong equipment selected: unsafe readiness reaches Operations; Quality exposure stays open; exposure during dispatch. | For wrong equipment selected, require independent approval when plan policy changes with a scoped blocker. | Asset Manager | Low after historical replay testing. |
| MR-002 | Technical object | Duplicate equipment identity | Technical object — Duplicate equipment identity: missing check effective dates during shutdown scope change. | Technical object — Duplicate equipment identity: preventive basis becomes irreproducible; warranty evidence is incomplete; exposure at technician start. | For duplicate equipment identity, reconcile quantity and serial during Quality impact review plus immutable correction. | Asset Manager | Medium-low while contractor work is required. |
| MR-003 | Technical object | Wrong functional location | Technical object — Wrong functional location: missing require independent approval at inventory handoff. | Technical object — Wrong functional location: owning domain acts on a false request; preventive compliance is distorted; exposure before technical closure. | For wrong functional location, compare configuration history when reliability measures refresh and verify the recipient. | Asset Manager | Low with immutable event monitoring. |
| MR-004 | Technical object | Asset hierarchy corruption | Technical object — Asset hierarchy corruption: missing preserve original evidence when plan policy changes. | Technical object — Asset hierarchy corruption: critical capacity remains unexpectedly unavailable; work readiness is false; exposure during equipment verification. | For asset hierarchy corruption, validate event chronology on contractor reassignment with quantity reconciliation. | Asset Manager | Low with periodic independent sampling. |
| MR-005 | Technical object | Equipment moved without history | Technical object — Equipment moved without history: missing validate prerequisite acknowledgement at technician start. | Technical object — Equipment moved without history: audit chronology cannot defend closure; supplier remedy is weakened; exposure at spare handoff. | For equipment moved without history, retain formula lineage at inventory handoff plus independent sampling. | Asset Manager | Medium until device provenance is proven. |
| MR-006 | Technical object | Component swap not recorded | Technical object — Component swap not recorded: missing reconcile quantity and serial when a counter segment changes. | Technical object — Component swap not recorded: reliability population is misstated; contractor accountability is obscured; exposure during permit suspension. | For component swap not recorded, verify device provenance after break-glass containment and age any mismatch. | Asset Manager | Medium-low because physical bypass remains. |
| MR-007 | Criticality and strategy | Wrong criticality class | Criticality and strategy — Wrong criticality class: missing verify permit scope after break-glass containment. | Criticality and strategy — Wrong criticality class: spare custody no longer balances; a consequential action lacks authority; exposure after offline synchronization. | For wrong criticality class, check effective dates after offline synchronization with historical replay. | Reliability Manager | Low once negative authorization tests pass. |
| MR-008 | Criticality and strategy | Maintenance strategy wrong | Criticality and strategy — Maintenance strategy wrong: missing bind individual authentication during Quality impact review. | Criticality and strategy — Maintenance strategy wrong: permit assumptions differ from field state; planned capacity is displaced; exposure at calibration review. | For maintenance strategy wrong, validate prerequisite acknowledgement before equipment release plus negative authorization. | Reliability Manager | Medium-low until outage drills pass. |
| MR-009 | Preventive maintenance | PM interval wrong | Preventive maintenance — PM interval wrong: missing compare configuration history before a production restart request. | Preventive maintenance — PM interval wrong: historical inspection exposure stays unresolved; cost allocation is misstated; exposure during supplier acceptance. | For pM interval wrong, bind individual authentication during shutdown scope change and preserve source provenance. | Maintenance Planner | Medium-low while emergency access exists. |
| MR-010 | Preventive maintenance | PM due date wrong | Preventive maintenance — PM due date wrong: missing test lifecycle guards before technical closure. | Preventive maintenance — PM due date wrong: contract remedy loses supporting evidence; equipment availability is overstated; exposure before Finance settlement. | For pM due date wrong, age unresolved exceptions when a counter segment changes with a named exception owner. | Maintenance Planner | Low after formula and boundary review. |
| MR-011 | Preventive maintenance | PM deferred without approval | Preventive maintenance — PM deferred without approval: missing age unresolved exceptions after offline synchronization. | Preventive maintenance — PM deferred without approval: cost attribution reaches the wrong object; installed configuration is uncertain; exposure when production resumes. | For pM deferred without approval, block ambiguous matches before technical closure plus configuration comparison. | Maintenance Planner | Medium pending cross-domain service evidence. |
| MR-012 | Preventive maintenance | PM skipped silently | Preventive maintenance — PM skipped silently: missing validate event chronology when reliability measures refresh. | Preventive maintenance — PM skipped silently: contractor action lacks personal accountability; Inventory custody diverges; exposure after counter correction. | For pM skipped silently, replay backdated corrections at calibration failure and monitor overrides. | Maintenance Planner | Medium until legacy records are reconciled. |
| MR-013 | Intake and priority | Maintenance request lost | Intake and priority — Maintenance request lost: missing confirm owning-domain authority before supplier acceptance. | Intake and priority — Maintenance request lost: equipment configuration cannot be reconstructed; permit assurance is lost; exposure during shutdown change. | For maintenance request lost, freeze the selected revision before Finance settlement and retain its actor. | Maintenance Manager | Low; field identity remains observable. |
| MR-014 | Intake and priority | Duplicate notification | Intake and priority — Duplicate notification: missing block ambiguous matches at calibration failure. | Intake and priority — Duplicate notification: backlog priority no longer reflects consequence; shutdown scope is incomplete; exposure at plan reactivation. | For duplicate notification, preserve original evidence at technician start with a scoped blocker. | Maintenance Manager | Low after historical replay testing. |
| MR-015 | Intake and priority | Priority understated | Intake and priority — Priority understated: missing retain formula lineage before equipment release. | Intake and priority — Priority understated: downtime and production loss diverge; exception aging is concealed; exposure during reliability refresh. | For priority understated, verify permit scope before a production restart request plus immutable correction. | Maintenance Manager | Medium-low while contractor work is required. |
| MR-016 | Intake and priority | Priority overstated | Intake and priority — Priority overstated: missing monitor abnormal override use on contractor reassignment. | Intake and priority — Priority overstated: automation exceeds its advisory authority; Manufacturing coordination fails; exposure after contractor reassignment. | For priority overstated, test lifecycle guards before supplier acceptance and verify the recipient. | Maintenance Manager | Low with immutable event monitoring. |
| MR-017 | Intake and priority | Breakdown not declared | Intake and priority — Breakdown not declared: missing replay backdated corrections before order release. | Intake and priority — Breakdown not declared: wrong technical object receives work; reliability analysis is biased; exposure during hierarchy correction. | For breakdown not declared, confirm owning-domain authority before order release with quantity reconciliation. | Maintenance Manager | Low with periodic independent sampling. |
| MR-018 | Intake and priority | Breakdown end falsified | Intake and priority — Breakdown end falsified: missing verify device provenance before Finance settlement. | Intake and priority — Breakdown end falsified: unsafe readiness reaches Operations; meter chronology is broken; exposure before warranty submission. | For breakdown end falsified, monitor abnormal override use when plan policy changes plus independent sampling. | Maintenance Manager | Medium until device provenance is proven. |
| MR-019 | Work management | Work order created for wrong asset | Work management — Work order created for wrong asset: missing scan authoritative identity during shutdown scope change. | Work management — Work order created for wrong asset: preventive basis becomes irreproducible; technical history is unreliable; exposure at schedule freeze. | For work order created for wrong asset, scan authoritative identity during Quality impact review and age any mismatch. | Maintenance Manager | Medium-low because physical bypass remains. |
| MR-020 | Work management | Work order released without approval | Work management — Work order released without approval: missing freeze the selected revision at inventory handoff. | Work management — Work order released without approval: owning domain acts on a false request; Quality exposure stays open; exposure during meter rollover. | For work order released without approval, require independent approval when reliability measures refresh with historical replay. | Maintenance Manager | Low once negative authorization tests pass. |
| MR-021 | Work management | Work order starts without permit | Work management — Work order starts without permit: missing check effective dates when plan policy changes. | Work management — Work order starts without permit: critical capacity remains unexpectedly unavailable; warranty evidence is incomplete; exposure after service rejection. | For work order starts without permit, reconcile quantity and serial on contractor reassignment plus negative authorization. | Safety/HSE | Medium-low until outage drills pass. |
| MR-022 | Work management | Work order starts without material | Work management — Work order starts without material: missing require independent approval at technician start. | Work management — Work order starts without material: audit chronology cannot defend closure; preventive compliance is distorted; exposure while a hold remains. | For work order starts without material, compare configuration history at inventory handoff and preserve source provenance. | Maintenance Manager | Medium-low while emergency access exists. |
| MR-023 | Work management | Technician unqualified | Work management — Technician unqualified: missing preserve original evidence when a counter segment changes. | Work management — Technician unqualified: reliability population is misstated; work readiness is false; exposure at order release. | For technician unqualified, validate event chronology after break-glass containment with a named exception owner. | Maintenance Manager | Low after formula and boundary review. |
| MR-024 | Work management | Contractor unqualified | Work management — Contractor unqualified: missing validate prerequisite acknowledgement after break-glass containment. | Work management — Contractor unqualified: spare custody no longer balances; supplier remedy is weakened; exposure during dispatch. | For contractor unqualified, retain formula lineage after offline synchronization plus configuration comparison. | Maintenance Manager | Medium pending cross-domain service evidence. |
| MR-025 | Work management | Shared terminal attribution loss | Work management — Shared terminal attribution loss: missing reconcile quantity and serial during Quality impact review. | Work management — Shared terminal attribution loss: permit assumptions differ from field state; contractor accountability is obscured; exposure at technician start. | For shared terminal attribution loss, verify device provenance before equipment release and monitor overrides. | Maintenance Manager | Medium until legacy records are reconciled. |
| MR-026 | Work management | Labor time falsified | Work management — Labor time falsified: missing verify permit scope before a production restart request. | Work management — Labor time falsified: historical inspection exposure stays unresolved; a consequential action lacks authority; exposure before technical closure. | For labor time falsified, check effective dates during shutdown scope change and retain its actor. | Maintenance Manager | Low; field identity remains observable. |
| MR-027 | Downtime and failure | Downtime misclassified | Downtime and failure — Downtime misclassified: missing bind individual authentication before technical closure. | Downtime and failure — Downtime misclassified: contract remedy loses supporting evidence; planned capacity is displaced; exposure during equipment verification. | For downtime misclassified, validate prerequisite acknowledgement when a counter segment changes with a scoped blocker. | Reliability Manager | Low after historical replay testing. |
| MR-028 | Spares and tools | Spare shortage | Spares and tools — Spare shortage: missing compare configuration history after offline synchronization. | Spares and tools — Spare shortage: cost attribution reaches the wrong object; cost allocation is misstated; exposure at spare handoff. | For spare shortage, bind individual authentication before technical closure plus immutable correction. | Maintenance Supervisor | Medium-low while contractor work is required. |
| MR-029 | Spares and tools | Wrong spare issued | Spares and tools — Wrong spare issued: missing test lifecycle guards when reliability measures refresh. | Spares and tools — Wrong spare issued: contractor action lacks personal accountability; equipment availability is overstated; exposure during permit suspension. | For wrong spare issued, age unresolved exceptions at calibration failure and verify the recipient. | Maintenance Supervisor | Low with immutable event monitoring. |
| MR-030 | Spares and tools | Wrong batch or serial spare | Spares and tools — Wrong batch or serial spare: missing age unresolved exceptions before supplier acceptance. | Spares and tools — Wrong batch or serial spare: equipment configuration cannot be reconstructed; installed configuration is uncertain; exposure after offline synchronization. | For wrong batch or serial spare, block ambiguous matches before Finance settlement with quantity reconciliation. | Maintenance Supervisor | Low with periodic independent sampling. |
| MR-031 | Spares and tools | Spare theft | Spares and tools — Spare theft: missing validate event chronology at calibration failure. | Spares and tools — Spare theft: backlog priority no longer reflects consequence; Inventory custody diverges; exposure at calibration review. | For spare theft, replay backdated corrections at technician start plus independent sampling. | Maintenance Supervisor | Medium until device provenance is proven. |
| MR-032 | Spares and tools | Spare return not recorded | Spares and tools — Spare return not recorded: missing confirm owning-domain authority before equipment release. | Spares and tools — Spare return not recorded: downtime and production loss diverge; permit assurance is lost; exposure during supplier acceptance. | For spare return not recorded, freeze the selected revision before a production restart request and age any mismatch. | Maintenance Supervisor | Medium-low because physical bypass remains. |
| MR-033 | Spares and tools | Tool overdue for calibration | Spares and tools — Tool overdue for calibration: missing block ambiguous matches on contractor reassignment. | Spares and tools — Tool overdue for calibration: automation exceeds its advisory authority; shutdown scope is incomplete; exposure before Finance settlement. | For tool overdue for calibration, preserve original evidence before supplier acceptance with historical replay. | Maintenance Supervisor | Low once negative authorization tests pass. |
| MR-034 | Spares and tools | Tool not returned | Spares and tools — Tool not returned: missing retain formula lineage before order release. | Spares and tools — Tool not returned: wrong technical object receives work; exception aging is concealed; exposure when production resumes. | For tool not returned, verify permit scope before order release plus negative authorization. | Maintenance Supervisor | Medium-low until outage drills pass. |
| MR-035 | External service and warranty | External service incomplete | External service and warranty — External service incomplete: missing monitor abnormal override use before Finance settlement. | External service and warranty — External service incomplete: unsafe readiness reaches Operations; Manufacturing coordination fails; exposure after counter correction. | For external service incomplete, test lifecycle guards when plan policy changes and preserve source provenance. | Contractor Manager | Medium-low while emergency access exists. |
| MR-036 | External service and warranty | Contractor service accepted without evidence | External service and warranty — Contractor service accepted without evidence: missing replay backdated corrections during shutdown scope change. | External service and warranty — Contractor service accepted without evidence: preventive basis becomes irreproducible; reliability analysis is biased; exposure during shutdown change. | For contractor service accepted without evidence, confirm owning-domain authority during Quality impact review with a named exception owner. | Contractor Manager | Low after formula and boundary review. |
| MR-037 | Hold release and safety | Equipment hold not propagated | Hold release and safety — Equipment hold not propagated: missing verify device provenance at inventory handoff. | Hold release and safety — Equipment hold not propagated: owning domain acts on a false request; meter chronology is broken; exposure at plan reactivation. | For equipment hold not propagated, monitor abnormal override use when reliability measures refresh plus configuration comparison. | Maintenance Director | Medium pending cross-domain service evidence. |
| MR-038 | Hold release and safety | Manufacturing continues on maintenance hold | Hold release and safety — Manufacturing continues on maintenance hold: missing scan authoritative identity when plan policy changes. | Hold release and safety — Manufacturing continues on maintenance hold: critical capacity remains unexpectedly unavailable; technical history is unreliable; exposure during reliability refresh. | For manufacturing continues on maintenance hold, scan authoritative identity on contractor reassignment and monitor overrides. | Maintenance Director | Medium until legacy records are reconciled. |
| MR-039 | Hold release and safety | Equipment released without verification | Hold release and safety — Equipment released without verification: missing freeze the selected revision at technician start. | Hold release and safety — Equipment released without verification: audit chronology cannot defend closure; Quality exposure stays open; exposure after contractor reassignment. | For equipment released without verification, require independent approval at inventory handoff and retain its actor. | Maintenance Director | Low; field identity remains observable. |
| MR-040 | Hold release and safety | Production restarted before Maintenance release | Hold release and safety — Production restarted before Maintenance release: missing check effective dates when a counter segment changes. | Hold release and safety — Production restarted before Maintenance release: reliability population is misstated; warranty evidence is incomplete; exposure during hierarchy correction. | For production restarted before Maintenance release, reconcile quantity and serial after break-glass containment with a scoped blocker. | Maintenance Director | Low after historical replay testing. |
| MR-041 | Hold release and safety | Quality hold confused with Maintenance release | Hold release and safety — Quality hold confused with Maintenance release: missing require independent approval after break-glass containment. | Hold release and safety — Quality hold confused with Maintenance release: spare custody no longer balances; preventive compliance is distorted; exposure before warranty submission. | For quality hold confused with Maintenance release, compare configuration history after offline synchronization plus immutable correction. | Quality Manager | Medium-low while contractor work is required. |
| MR-042 | Calibration and condition | Calibration overdue | Calibration and condition — Calibration overdue: missing preserve original evidence during Quality impact review. | Calibration and condition — Calibration overdue: permit assumptions differ from field state; work readiness is false; exposure at schedule freeze. | For calibration overdue, validate event chronology before equipment release and verify the recipient. | Metrology | Low with immutable event monitoring. |
| MR-043 | Calibration and condition | Calibration failed | Calibration and condition — Calibration failed: missing validate prerequisite acknowledgement before a production restart request. | Calibration and condition — Calibration failed: historical inspection exposure stays unresolved; supplier remedy is weakened; exposure during meter rollover. | For calibration failed, retain formula lineage during shutdown scope change with quantity reconciliation. | Metrology | Low with periodic independent sampling. |
| MR-044 | Calibration and condition | Out-of-tolerance impact not assessed | Calibration and condition — Out-of-tolerance impact not assessed: missing reconcile quantity and serial before technical closure. | Calibration and condition — Out-of-tolerance impact not assessed: contract remedy loses supporting evidence; contractor accountability is obscured; exposure after service rejection. | For out-of-tolerance impact not assessed, verify device provenance when a counter segment changes plus independent sampling. | Metrology | Medium until device provenance is proven. |
| MR-045 | Calibration and condition | Failed instrument reused | Calibration and condition — Failed instrument reused: missing verify permit scope after offline synchronization. | Calibration and condition — Failed instrument reused: cost attribution reaches the wrong object; a consequential action lacks authority; exposure while a hold remains. | For failed instrument reused, check effective dates before technical closure and age any mismatch. | Metrology | Medium-low because physical bypass remains. |
| MR-046 | Calibration and condition | Meter reading falsified | Calibration and condition — Meter reading falsified: missing bind individual authentication when reliability measures refresh. | Calibration and condition — Meter reading falsified: contractor action lacks personal accountability; planned capacity is displaced; exposure at order release. | For meter reading falsified, validate prerequisite acknowledgement at calibration failure with historical replay. | Metrology | Low once negative authorization tests pass. |
| MR-047 | Calibration and condition | Counter rollover mishandled | Calibration and condition — Counter rollover mishandled: missing compare configuration history before supplier acceptance. | Calibration and condition — Counter rollover mishandled: equipment configuration cannot be reconstructed; cost allocation is misstated; exposure during dispatch. | For counter rollover mishandled, bind individual authentication before Finance settlement plus negative authorization. | Metrology | Medium-low until outage drills pass. |
| MR-048 | Calibration and condition | Sensor spoofing | Calibration and condition — Sensor spoofing: missing test lifecycle guards at calibration failure. | Calibration and condition — Sensor spoofing: backlog priority no longer reflects consequence; equipment availability is overstated; exposure at technician start. | For sensor spoofing, age unresolved exceptions at technician start and preserve source provenance. | Metrology | Medium-low while emergency access exists. |
| MR-049 | Calibration and condition | Condition signal missed | Calibration and condition — Condition signal missed: missing age unresolved exceptions before equipment release. | Calibration and condition — Condition signal missed: downtime and production loss diverge; installed configuration is uncertain; exposure before technical closure. | For condition signal missed, block ambiguous matches before a production restart request with a named exception owner. | Metrology | Low after formula and boundary review. |
| MR-050 | Calibration and condition | False predictive alert | Calibration and condition — False predictive alert: missing validate event chronology on contractor reassignment. | Calibration and condition — False predictive alert: automation exceeds its advisory authority; Inventory custody diverges; exposure during equipment verification. | For false predictive alert, replay backdated corrections before supplier acceptance plus configuration comparison. | Metrology | Medium pending cross-domain service evidence. |
| MR-051 | Calibration and condition | Missed predictive alert | Calibration and condition — Missed predictive alert: missing confirm owning-domain authority before order release. | Calibration and condition — Missed predictive alert: wrong technical object receives work; permit assurance is lost; exposure at spare handoff. | For missed predictive alert, freeze the selected revision before order release and monitor overrides. | Metrology | Medium until legacy records are reconciled. |
| MR-052 | Downtime and failure | Root cause unsupported | Downtime and failure — Root cause unsupported: missing block ambiguous matches before Finance settlement. | Downtime and failure — Root cause unsupported: unsafe readiness reaches Operations; shutdown scope is incomplete; exposure during permit suspension. | For root cause unsupported, preserve original evidence when plan policy changes and retain its actor. | Reliability Manager | Low; field identity remains observable. |
| MR-053 | Downtime and failure | Repeat failure not escalated | Downtime and failure — Repeat failure not escalated: missing retain formula lineage during shutdown scope change. | Downtime and failure — Repeat failure not escalated: preventive basis becomes irreproducible; exception aging is concealed; exposure after offline synchronization. | For repeat failure not escalated, verify permit scope during Quality impact review with a scoped blocker. | Reliability Manager | Low after historical replay testing. |
| MR-054 | Downtime and failure | MTBF distorted | Downtime and failure — MTBF distorted: missing monitor abnormal override use at inventory handoff. | Downtime and failure — MTBF distorted: owning domain acts on a false request; Manufacturing coordination fails; exposure at calibration review. | For mTBF distorted, test lifecycle guards when reliability measures refresh plus immutable correction. | Reliability Manager | Medium-low while contractor work is required. |
| MR-055 | Downtime and failure | MTTR distorted | Downtime and failure — MTTR distorted: missing replay backdated corrections when plan policy changes. | Downtime and failure — MTTR distorted: critical capacity remains unexpectedly unavailable; reliability analysis is biased; exposure during supplier acceptance. | For mTTR distorted, confirm owning-domain authority on contractor reassignment and verify the recipient. | Reliability Manager | Low with immutable event monitoring. |
| MR-056 | Downtime and failure | Availability overstated | Downtime and failure — Availability overstated: missing verify device provenance at technician start. | Downtime and failure — Availability overstated: audit chronology cannot defend closure; meter chronology is broken; exposure before Finance settlement. | For availability overstated, monitor abnormal override use at inventory handoff with quantity reconciliation. | Reliability Manager | Low with periodic independent sampling. |
| MR-057 | External service and warranty | Warranty expired incorrectly | External service and warranty — Warranty expired incorrectly: missing scan authoritative identity when a counter segment changes. | External service and warranty — Warranty expired incorrectly: reliability population is misstated; technical history is unreliable; exposure when production resumes. | For warranty expired incorrectly, scan authoritative identity after break-glass containment plus independent sampling. | Contractor Manager | Medium until device provenance is proven. |
| MR-058 | External service and warranty | Warranty claim missed | External service and warranty — Warranty claim missed: missing freeze the selected revision after break-glass containment. | External service and warranty — Warranty claim missed: spare custody no longer balances; Quality exposure stays open; exposure after counter correction. | For warranty claim missed, require independent approval after offline synchronization and age any mismatch. | Contractor Manager | Medium-low because physical bypass remains. |
| MR-059 | External service and warranty | Maintenance contract expired | External service and warranty — Maintenance contract expired: missing check effective dates during Quality impact review. | External service and warranty — Maintenance contract expired: permit assumptions differ from field state; warranty evidence is incomplete; exposure during shutdown change. | For maintenance contract expired, reconcile quantity and serial before equipment release with historical replay. | Contractor Manager | Low once negative authorization tests pass. |
| MR-060 | External service and warranty | Contractor access not revoked | External service and warranty — Contractor access not revoked: missing require independent approval before a production restart request. | External service and warranty — Contractor access not revoked: historical inspection exposure stays unresolved; preventive compliance is distorted; exposure at plan reactivation. | For contractor access not revoked, compare configuration history during shutdown scope change plus negative authorization. | Contractor Manager | Medium-low until outage drills pass. |
| MR-061 | Hold release and safety | Permit expired | Hold release and safety — Permit expired: missing preserve original evidence before technical closure. | Hold release and safety — Permit expired: contract remedy loses supporting evidence; work readiness is false; exposure during reliability refresh. | For permit expired, validate event chronology when a counter segment changes and preserve source provenance. | Safety/HSE | Medium-low while emergency access exists. |
| MR-062 | Hold release and safety | Isolation bypassed | Hold release and safety — Isolation bypassed: missing validate prerequisite acknowledgement after offline synchronization. | Hold release and safety — Isolation bypassed: cost attribution reaches the wrong object; supplier remedy is weakened; exposure after contractor reassignment. | For isolation bypassed, retain formula lineage before technical closure with a named exception owner. | Safety/HSE | Low after formula and boundary review. |
| MR-063 | Hold release and safety | Shutdown work omitted | Hold release and safety — Shutdown work omitted: missing reconcile quantity and serial when reliability measures refresh. | Hold release and safety — Shutdown work omitted: contractor action lacks personal accountability; contractor accountability is obscured; exposure during hierarchy correction. | For shutdown work omitted, verify device provenance at calibration failure plus configuration comparison. | Maintenance Director | Medium pending cross-domain service evidence. |
| MR-064 | Finance governance and security | Capital repair misclassified | Finance governance and security — Capital repair misclassified: missing verify permit scope before supplier acceptance. | Finance governance and security — Capital repair misclassified: equipment configuration cannot be reconstructed; a consequential action lacks authority; exposure before warranty submission. | For capital repair misclassified, check effective dates before Finance settlement and monitor overrides. | Finance | Medium until legacy records are reconciled. |
| MR-065 | Finance governance and security | Maintenance cost posted to wrong asset | Finance governance and security — Maintenance cost posted to wrong asset: missing bind individual authentication at calibration failure. | Finance governance and security — Maintenance cost posted to wrong asset: backlog priority no longer reflects consequence; planned capacity is displaced; exposure at schedule freeze. | For maintenance cost posted to wrong asset, validate prerequisite acknowledgement at technician start and retain its actor. | Finance | Low; field identity remains observable. |
| MR-066 | Work management | Work order technically closed early | Work management — Work order technically closed early: missing compare configuration history before equipment release. | Work management — Work order technically closed early: downtime and production loss diverge; cost allocation is misstated; exposure during meter rollover. | For work order technically closed early, bind individual authentication before a production restart request with a scoped blocker. | Maintenance Manager | Low after historical replay testing. |
| MR-067 | Work management | Work order financially settled early | Work management — Work order financially settled early: missing test lifecycle guards on contractor reassignment. | Work management — Work order financially settled early: automation exceeds its advisory authority; equipment availability is overstated; exposure after service rejection. | For work order financially settled early, age unresolved exceptions before supplier acceptance plus immutable correction. | Maintenance Manager | Medium-low while contractor work is required. |
| MR-068 | Finance governance and security | Cross-plant access | Finance governance and security — Cross-plant access: missing age unresolved exceptions before order release. | Finance governance and security — Cross-plant access: wrong technical object receives work; installed configuration is uncertain; exposure while a hold remains. | For cross-plant access, block ambiguous matches before order release and verify the recipient. | Security | Low with immutable event monitoring. |
| MR-069 | Finance governance and security | Cross-tenant leakage | Finance governance and security — Cross-tenant leakage: missing validate event chronology before Finance settlement. | Finance governance and security — Cross-tenant leakage: unsafe readiness reaches Operations; Inventory custody diverges; exposure at order release. | For cross-tenant leakage, replay backdated corrections when plan policy changes with quantity reconciliation. | Security | Low with periodic independent sampling. |
| MR-070 | Finance governance and security | Direct Inventory write | Finance governance and security — Direct Inventory write: missing confirm owning-domain authority during shutdown scope change. | Finance governance and security — Direct Inventory write: preventive basis becomes irreproducible; permit assurance is lost; exposure during dispatch. | For direct Inventory write, freeze the selected revision during Quality impact review plus independent sampling. | Inventory Manager | Medium until device provenance is proven. |
| MR-071 | Finance governance and security | Direct Manufacturing restart | Finance governance and security — Direct Manufacturing restart: missing block ambiguous matches at inventory handoff. | Finance governance and security — Direct Manufacturing restart: owning domain acts on a false request; shutdown scope is incomplete; exposure at technician start. | For direct Manufacturing restart, preserve original evidence when reliability measures refresh and age any mismatch. | Security | Medium-low because physical bypass remains. |
| MR-072 | Finance governance and security | Direct Quality release | Finance governance and security — Direct Quality release: missing retain formula lineage when plan policy changes. | Finance governance and security — Direct Quality release: critical capacity remains unexpectedly unavailable; exception aging is concealed; exposure before technical closure. | For direct Quality release, verify permit scope on contractor reassignment with historical replay. | Quality Manager | Low once negative authorization tests pass. |
| MR-073 | Finance governance and security | Direct Finance posting | Finance governance and security — Direct Finance posting: missing monitor abnormal override use at technician start. | Finance governance and security — Direct Finance posting: audit chronology cannot defend closure; Manufacturing coordination fails; exposure during equipment verification. | For direct Finance posting, test lifecycle guards at inventory handoff plus negative authorization. | Finance | Medium-low until outage drills pass. |
| MR-074 | Finance governance and security | Customization bypass | Finance governance and security — Customization bypass: missing replay backdated corrections when a counter segment changes. | Finance governance and security — Customization bypass: reliability population is misstated; reliability analysis is biased; exposure at spare handoff. | For customization bypass, confirm owning-domain authority after break-glass containment and preserve source provenance. | Security | Medium-low while emergency access exists. |
| MR-075 | Finance governance and security | AI work-order approval attempt | Finance governance and security — AI work-order approval attempt: missing verify device provenance after break-glass containment. | Finance governance and security — AI work-order approval attempt: spare custody no longer balances; meter chronology is broken; exposure during permit suspension. | For aI work-order approval attempt, monitor abnormal override use after offline synchronization with a named exception owner. | Security | Low after formula and boundary review. |
| MR-076 | Finance governance and security | AI equipment-release attempt | Finance governance and security — AI equipment-release attempt: missing scan authoritative identity during Quality impact review. | Finance governance and security — AI equipment-release attempt: permit assumptions differ from field state; technical history is unreliable; exposure after offline synchronization. | For aI equipment-release attempt, scan authoritative identity before equipment release plus configuration comparison. | Security | Medium pending cross-domain service evidence. |
| MR-077 | Finance governance and security | AI production-restart attempt | Finance governance and security — AI production-restart attempt: missing freeze the selected revision before a production restart request. | Finance governance and security — AI production-restart attempt: historical inspection exposure stays unresolved; Quality exposure stays open; exposure at calibration review. | For aI production-restart attempt, require independent approval during shutdown scope change and monitor overrides. | Security | Medium until legacy records are reconciled. |
| MR-078 | Finance governance and security | AI spare-issue attempt | Finance governance and security — AI spare-issue attempt: missing check effective dates before technical closure. | Finance governance and security — AI spare-issue attempt: contract remedy loses supporting evidence; warranty evidence is incomplete; exposure during supplier acceptance. | For aI spare-issue attempt, reconcile quantity and serial when a counter segment changes and retain its actor. | Security | Low; field identity remains observable. |
| MR-079 | Finance governance and security | AI calibration-impact decision | Finance governance and security — AI calibration-impact decision: missing require independent approval after offline synchronization. | Finance governance and security — AI calibration-impact decision: cost attribution reaches the wrong object; preventive compliance is distorted; exposure before Finance settlement. | For aI calibration-impact decision, compare configuration history before technical closure with a scoped blocker. | Security | Low after historical replay testing. |
| MR-080 | Finance governance and security | AI cost-posting attempt | Finance governance and security — AI cost-posting attempt: missing preserve original evidence when reliability measures refresh. | Finance governance and security — AI cost-posting attempt: contractor action lacks personal accountability; work readiness is false; exposure when production resumes. | For aI cost-posting attempt, validate event chronology at calibration failure plus immutable correction. | Security | Medium-low while contractor work is required. |
| MR-081 | Finance governance and security | Unsupported safety or regulatory claim | Finance governance and security — Unsupported safety or regulatory claim: missing validate prerequisite acknowledgement before supplier acceptance. | Finance governance and security — Unsupported safety or regulatory claim: equipment configuration cannot be reconstructed; supplier remedy is weakened; exposure after counter correction. | For unsupported safety or regulatory claim, retain formula lineage before Finance settlement and verify the recipient. | Security | Low with immutable event monitoring. |
| MR-082 | Technical object | Overlapping component installation | Technical object — Overlapping component installation: missing reconcile quantity and serial at calibration failure. | Technical object — Overlapping component installation: backlog priority no longer reflects consequence; contractor accountability is obscured; exposure during shutdown change. | For overlapping component installation, verify device provenance at technician start with quantity reconciliation. | Asset Manager | Low with periodic independent sampling. |
| MR-083 | Technical object | Manufacturer serial collision | Technical object — Manufacturer serial collision: missing verify permit scope before equipment release. | Technical object — Manufacturer serial collision: downtime and production loss diverge; a consequential action lacks authority; exposure at plan reactivation. | For manufacturer serial collision, check effective dates before a production restart request plus independent sampling. | Asset Manager | Medium until device provenance is proven. |
| MR-084 | Technical object | Equipment category misclassified | Technical object — Equipment category misclassified: missing bind individual authentication on contractor reassignment. | Technical object — Equipment category misclassified: automation exceeds its advisory authority; planned capacity is displaced; exposure during reliability refresh. | For equipment category misclassified, validate prerequisite acknowledgement before supplier acceptance and age any mismatch. | Asset Manager | Medium-low because physical bypass remains. |
| MR-085 | Technical object | Fixed asset confused with equipment | Technical object — Fixed asset confused with equipment: missing compare configuration history before order release. | Technical object — Fixed asset confused with equipment: wrong technical object receives work; cost allocation is misstated; exposure after contractor reassignment. | For fixed asset confused with equipment, bind individual authentication before order release with historical replay. | Asset Manager | Low once negative authorization tests pass. |
| MR-086 | Technical object | Inventory serial confused with installed equipment | Technical object — Inventory serial confused with installed equipment: missing test lifecycle guards before Finance settlement. | Technical object — Inventory serial confused with installed equipment: unsafe readiness reaches Operations; equipment availability is overstated; exposure during hierarchy correction. | For inventory serial confused with installed equipment, age unresolved exceptions when plan policy changes plus negative authorization. | Maintenance Supervisor | Medium-low until outage drills pass. |
| MR-087 | Technical object | Decommissioned equipment receives work | Technical object — Decommissioned equipment receives work: missing age unresolved exceptions during shutdown scope change. | Technical object — Decommissioned equipment receives work: preventive basis becomes irreproducible; installed configuration is uncertain; exposure before warranty submission. | For decommissioned equipment receives work, block ambiguous matches during Quality impact review and preserve source provenance. | Asset Manager | Medium-low while emergency access exists. |
| MR-088 | Technical object | Technical specification superseded silently | Technical object — Technical specification superseded silently: missing validate event chronology at inventory handoff. | Technical object — Technical specification superseded silently: owning domain acts on a false request; Inventory custody diverges; exposure at schedule freeze. | For technical specification superseded silently, replay backdated corrections when reliability measures refresh with a named exception owner. | Asset Manager | Low after formula and boundary review. |
| MR-089 | Technical object | Equipment owner scope missing | Technical object — Equipment owner scope missing: missing confirm owning-domain authority when plan policy changes. | Technical object — Equipment owner scope missing: critical capacity remains unexpectedly unavailable; permit assurance is lost; exposure during meter rollover. | For equipment owner scope missing, freeze the selected revision on contractor reassignment plus configuration comparison. | Asset Manager | Medium pending cross-domain service evidence. |
| MR-090 | Technical object | As-designed structure treated as as-maintained | Technical object — As-designed structure treated as as-maintained: missing block ambiguous matches at technician start. | Technical object — As-designed structure treated as as-maintained: audit chronology cannot defend closure; shutdown scope is incomplete; exposure after service rejection. | For as-designed structure treated as as-maintained, preserve original evidence at inventory handoff and monitor overrides. | Asset Manager | Medium until legacy records are reconciled. |
| MR-091 | Criticality and strategy | Criticality factors overwritten | Criticality and strategy — Criticality factors overwritten: missing retain formula lineage when a counter segment changes. | Criticality and strategy — Criticality factors overwritten: reliability population is misstated; exception aging is concealed; exposure while a hold remains. | For criticality factors overwritten, verify permit scope after break-glass containment and retain its actor. | Reliability Manager | Low; field identity remains observable. |
| MR-092 | Criticality and strategy | Redundancy assumption obsolete | Criticality and strategy — Redundancy assumption obsolete: missing monitor abnormal override use after break-glass containment. | Criticality and strategy — Redundancy assumption obsolete: spare custody no longer balances; Manufacturing coordination fails; exposure at order release. | For redundancy assumption obsolete, test lifecycle guards after offline synchronization with a scoped blocker. | Reliability Manager | Low after historical replay testing. |
| MR-093 | Criticality and strategy | Run-to-failure chosen without consequence review | Criticality and strategy — Run-to-failure chosen without consequence review: missing replay backdated corrections during Quality impact review. | Criticality and strategy — Run-to-failure chosen without consequence review: permit assumptions differ from field state; reliability analysis is biased; exposure during dispatch. | For run-to-failure chosen without consequence review, confirm owning-domain authority before equipment release plus immutable correction. | Reliability Manager | Medium-low while contractor work is required. |
| MR-094 | Criticality and strategy | Mandatory-direction task omitted | Criticality and strategy — Mandatory-direction task omitted: missing verify device provenance before a production restart request. | Criticality and strategy — Mandatory-direction task omitted: historical inspection exposure stays unresolved; meter chronology is broken; exposure at technician start. | For mandatory-direction task omitted, monitor abnormal override use during shutdown scope change and verify the recipient. | Reliability Manager | Low with immutable event monitoring. |
| MR-095 | Criticality and strategy | Strategy revision applied retroactively | Criticality and strategy — Strategy revision applied retroactively: missing scan authoritative identity before technical closure. | Criticality and strategy — Strategy revision applied retroactively: contract remedy loses supporting evidence; technical history is unreliable; exposure before technical closure. | For strategy revision applied retroactively, scan authoritative identity when a counter segment changes with quantity reconciliation. | Reliability Manager | Low with periodic independent sampling. |
| MR-096 | Criticality and strategy | Critical spare not linked to critical asset | Criticality and strategy — Critical spare not linked to critical asset: missing freeze the selected revision after offline synchronization. | Criticality and strategy — Critical spare not linked to critical asset: cost attribution reaches the wrong object; Quality exposure stays open; exposure during equipment verification. | For critical spare not linked to critical asset, require independent approval before technical closure plus independent sampling. | Maintenance Supervisor | Medium until device provenance is proven. |
| MR-097 | Criticality and strategy | Opportunity maintenance displaces higher risk work | Criticality and strategy — Opportunity maintenance displaces higher risk work: missing check effective dates when reliability measures refresh. | Criticality and strategy — Opportunity maintenance displaces higher risk work: contractor action lacks personal accountability; warranty evidence is incomplete; exposure at spare handoff. | For opportunity maintenance displaces higher risk work, reconcile quantity and serial at calibration failure and age any mismatch. | Reliability Manager | Medium-low because physical bypass remains. |
| MR-098 | Criticality and strategy | Predictive strategy suppresses preventive work | Criticality and strategy — Predictive strategy suppresses preventive work: missing require independent approval before supplier acceptance. | Criticality and strategy — Predictive strategy suppresses preventive work: equipment configuration cannot be reconstructed; preventive compliance is distorted; exposure during permit suspension. | For predictive strategy suppresses preventive work, compare configuration history before Finance settlement with historical replay. | Reliability Manager | Low once negative authorization tests pass. |
| MR-099 | Preventive maintenance | PM call duplicated | Preventive maintenance — PM call duplicated: missing preserve original evidence at calibration failure. | Preventive maintenance — PM call duplicated: backlog priority no longer reflects consequence; work readiness is false; exposure after offline synchronization. | For pM call duplicated, validate event chronology at technician start plus negative authorization. | Maintenance Planner | Medium-low until outage drills pass. |
| MR-100 | Preventive maintenance | PM call not generated | Preventive maintenance — PM call not generated: missing validate prerequisite acknowledgement before equipment release. | Preventive maintenance — PM call not generated: downtime and production loss diverge; supplier remedy is weakened; exposure at calibration review. | For pM call not generated, retain formula lineage before a production restart request and preserve source provenance. | Maintenance Planner | Medium-low while emergency access exists. |
| MR-101 | Preventive maintenance | Suspended plan continues calling | Preventive maintenance — Suspended plan continues calling: missing reconcile quantity and serial on contractor reassignment. | Preventive maintenance — Suspended plan continues calling: automation exceeds its advisory authority; contractor accountability is obscured; exposure during supplier acceptance. | For suspended plan continues calling, verify device provenance before supplier acceptance with a named exception owner. | Maintenance Planner | Low after formula and boundary review. |
| MR-102 | Preventive maintenance | Reactivated plan loses missed calls | Preventive maintenance — Reactivated plan loses missed calls: missing verify permit scope before order release. | Preventive maintenance — Reactivated plan loses missed calls: wrong technical object receives work; a consequential action lacks authority; exposure before Finance settlement. | For reactivated plan loses missed calls, check effective dates before order release plus configuration comparison. | Maintenance Planner | Medium pending cross-domain service evidence. |
| MR-103 | Preventive maintenance | Counter-based PM uses stale reading | Preventive maintenance — Counter-based PM uses stale reading: missing bind individual authentication before Finance settlement. | Preventive maintenance — Counter-based PM uses stale reading: unsafe readiness reaches Operations; planned capacity is displaced; exposure when production resumes. | For counter-based PM uses stale reading, validate prerequisite acknowledgement when plan policy changes and monitor overrides. | Maintenance Planner | Medium until legacy records are reconciled. |
| MR-104 | Preventive maintenance | Calendar shift changes frozen call | Preventive maintenance — Calendar shift changes frozen call: missing compare configuration history during shutdown scope change. | Preventive maintenance — Calendar shift changes frozen call: preventive basis becomes irreproducible; cost allocation is misstated; exposure after counter correction. | For calendar shift changes frozen call, bind individual authentication during Quality impact review and retain its actor. | Maintenance Planner | Low; field identity remains observable. |
| MR-105 | Preventive maintenance | Wrong task-list revision | Preventive maintenance — Wrong task-list revision: missing test lifecycle guards at inventory handoff. | Preventive maintenance — Wrong task-list revision: owning domain acts on a false request; equipment availability is overstated; exposure during shutdown change. | For wrong task-list revision, age unresolved exceptions when reliability measures refresh with a scoped blocker. | Maintenance Planner | Low after historical replay testing. |
| MR-106 | Preventive maintenance | Critical PM operation omitted | Preventive maintenance — Critical PM operation omitted: missing age unresolved exceptions when plan policy changes. | Preventive maintenance — Critical PM operation omitted: critical capacity remains unexpectedly unavailable; installed configuration is uncertain; exposure at plan reactivation. | For critical PM operation omitted, block ambiguous matches on contractor reassignment plus immutable correction. | Maintenance Planner | Medium-low while contractor work is required. |
| MR-107 | Preventive maintenance | Next-call basis changed after completion | Preventive maintenance — Next-call basis changed after completion: missing validate event chronology at technician start. | Preventive maintenance — Next-call basis changed after completion: audit chronology cannot defend closure; Inventory custody diverges; exposure during reliability refresh. | For next-call basis changed after completion, replay backdated corrections at inventory handoff and verify the recipient. | Maintenance Planner | Low with immutable event monitoring. |
| MR-108 | Preventive maintenance | Overdue PM hidden by plan reset | Preventive maintenance — Overdue PM hidden by plan reset: missing confirm owning-domain authority when a counter segment changes. | Preventive maintenance — Overdue PM hidden by plan reset: reliability population is misstated; permit assurance is lost; exposure after contractor reassignment. | For overdue PM hidden by plan reset, freeze the selected revision after break-glass containment with quantity reconciliation. | Maintenance Planner | Low with periodic independent sampling. |
| MR-109 | Preventive maintenance | PM completion linked to wrong equipment | Preventive maintenance — PM completion linked to wrong equipment: missing block ambiguous matches after break-glass containment. | Preventive maintenance — PM completion linked to wrong equipment: spare custody no longer balances; shutdown scope is incomplete; exposure during hierarchy correction. | For pM completion linked to wrong equipment, preserve original evidence after offline synchronization plus independent sampling. | Maintenance Planner | Medium until device provenance is proven. |
| MR-110 | Intake and priority | Request closed as duplicate without survivor | Intake and priority — Request closed as duplicate without survivor: missing retain formula lineage during Quality impact review. | Intake and priority — Request closed as duplicate without survivor: permit assumptions differ from field state; exception aging is concealed; exposure before warranty submission. | For request closed as duplicate without survivor, verify permit scope before equipment release and age any mismatch. | Maintenance Manager | Medium-low because physical bypass remains. |
| MR-111 | Intake and priority | Safety concern stripped during triage | Intake and priority — Safety concern stripped during triage: missing monitor abnormal override use before a production restart request. | Intake and priority — Safety concern stripped during triage: historical inspection exposure stays unresolved; Manufacturing coordination fails; exposure at schedule freeze. | For safety concern stripped during triage, test lifecycle guards during shutdown scope change with historical replay. | Safety/HSE | Low once negative authorization tests pass. |
| MR-112 | Intake and priority | Emergency label used to bypass planning | Intake and priority — Emergency label used to bypass planning: missing replay backdated corrections before technical closure. | Intake and priority — Emergency label used to bypass planning: contract remedy loses supporting evidence; reliability analysis is biased; exposure during meter rollover. | For emergency label used to bypass planning, confirm owning-domain authority when a counter segment changes plus negative authorization. | Maintenance Manager | Medium-low until outage drills pass. |
| MR-113 | Intake and priority | Breakdown start backdated | Intake and priority — Breakdown start backdated: missing verify device provenance after offline synchronization. | Intake and priority — Breakdown start backdated: cost attribution reaches the wrong object; meter chronology is broken; exposure after service rejection. | For breakdown start backdated, monitor abnormal override use before technical closure and preserve source provenance. | Maintenance Manager | Medium-low while emergency access exists. |
| MR-114 | Intake and priority | Production impact not communicated | Intake and priority — Production impact not communicated: missing scan authoritative identity when reliability measures refresh. | Intake and priority — Production impact not communicated: contractor action lacks personal accountability; technical history is unreliable; exposure while a hold remains. | For production impact not communicated, scan authoritative identity at calibration failure with a named exception owner. | Maintenance Manager | Low after formula and boundary review. |
| MR-115 | Intake and priority | Quality impact not communicated | Intake and priority — Quality impact not communicated: missing freeze the selected revision before supplier acceptance. | Intake and priority — Quality impact not communicated: equipment configuration cannot be reconstructed; Quality exposure stays open; exposure at order release. | For quality impact not communicated, require independent approval before Finance settlement plus configuration comparison. | Quality Manager | Medium pending cross-domain service evidence. |
| MR-116 | Intake and priority | Notification converted to wrong order | Intake and priority — Notification converted to wrong order: missing check effective dates at calibration failure. | Intake and priority — Notification converted to wrong order: backlog priority no longer reflects consequence; warranty evidence is incomplete; exposure during dispatch. | For notification converted to wrong order, reconcile quantity and serial at technician start and monitor overrides. | Maintenance Manager | Medium until legacy records are reconciled. |
| MR-117 | Intake and priority | Anonymous request defeats attribution | Intake and priority — Anonymous request defeats attribution: missing require independent approval before equipment release. | Intake and priority — Anonymous request defeats attribution: downtime and production loss diverge; preventive compliance is distorted; exposure at technician start. | For anonymous request defeats attribution, compare configuration history before a production restart request and retain its actor. | Maintenance Manager | Low; field identity remains observable. |
| MR-118 | Work management | Work order uses obsolete revision | Work management — Work order uses obsolete revision: missing preserve original evidence on contractor reassignment. | Work management — Work order uses obsolete revision: automation exceeds its advisory authority; work readiness is false; exposure before technical closure. | For work order uses obsolete revision, validate event chronology before supplier acceptance with a scoped blocker. | Maintenance Manager | Low after historical replay testing. |
| MR-119 | Work management | Completion evidence fabricated | Work management — Completion evidence fabricated: missing validate prerequisite acknowledgement before order release. | Work management — Completion evidence fabricated: wrong technical object receives work; supplier remedy is weakened; exposure during equipment verification. | For completion evidence fabricated, retain formula lineage before order release plus immutable correction. | Maintenance Manager | Medium-low while contractor work is required. |
| MR-120 | Work management | Operation sequence bypassed | Work management — Operation sequence bypassed: missing reconcile quantity and serial before Finance settlement. | Work management — Operation sequence bypassed: unsafe readiness reaches Operations; contractor accountability is obscured; exposure at spare handoff. | For operation sequence bypassed, verify device provenance when plan policy changes and verify the recipient. | Maintenance Manager | Low with immutable event monitoring. |
| MR-121 | Work management | Required measurement omitted | Work management — Required measurement omitted: missing verify permit scope during shutdown scope change. | Work management — Required measurement omitted: preventive basis becomes irreproducible; a consequential action lacks authority; exposure during permit suspension. | For required measurement omitted, check effective dates during Quality impact review with quantity reconciliation. | Maintenance Manager | Low with periodic independent sampling. |
| MR-122 | Work management | Cancelled order hides consumed resources | Work management — Cancelled order hides consumed resources: missing bind individual authentication at inventory handoff. | Work management — Cancelled order hides consumed resources: owning domain acts on a false request; planned capacity is displaced; exposure after offline synchronization. | For cancelled order hides consumed resources, validate prerequisite acknowledgement when reliability measures refresh plus independent sampling. | Maintenance Manager | Medium until device provenance is proven. |
| MR-123 | Work management | Dispatch acknowledged by wrong technician | Work management — Dispatch acknowledged by wrong technician: missing compare configuration history when plan policy changes. | Work management — Dispatch acknowledged by wrong technician: critical capacity remains unexpectedly unavailable; cost allocation is misstated; exposure at calibration review. | For dispatch acknowledged by wrong technician, bind individual authentication on contractor reassignment and age any mismatch. | Maintenance Manager | Medium-low because physical bypass remains. |
| MR-124 | Work management | Schedule freeze bypassed | Work management — Schedule freeze bypassed: missing test lifecycle guards at technician start. | Work management — Schedule freeze bypassed: audit chronology cannot defend closure; equipment availability is overstated; exposure during supplier acceptance. | For schedule freeze bypassed, age unresolved exceptions at inventory handoff with historical replay. | Maintenance Manager | Low once negative authorization tests pass. |
| MR-125 | Work management | Emergency work displaces critical backlog silently | Work management — Emergency work displaces critical backlog silently: missing age unresolved exceptions when a counter segment changes. | Work management — Emergency work displaces critical backlog silently: reliability population is misstated; installed configuration is uncertain; exposure before Finance settlement. | For emergency work displaces critical backlog silently, block ambiguous matches after break-glass containment plus negative authorization. | Maintenance Manager | Medium-low until outage drills pass. |
| MR-126 | Work management | Paused work remains recorded as active | Work management — Paused work remains recorded as active: missing validate event chronology after break-glass containment. | Work management — Paused work remains recorded as active: spare custody no longer balances; Inventory custody diverges; exposure when production resumes. | For paused work remains recorded as active, replay backdated corrections after offline synchronization and preserve source provenance. | Maintenance Manager | Medium-low while emergency access exists. |
| MR-127 | Work management | Rework scope added without reapproval | Work management — Rework scope added without reapproval: missing confirm owning-domain authority during Quality impact review. | Work management — Rework scope added without reapproval: permit assumptions differ from field state; permit assurance is lost; exposure after counter correction. | For rework scope added without reapproval, freeze the selected revision before equipment release with a named exception owner. | Maintenance Manager | Low after formula and boundary review. |
| MR-128 | Downtime and failure | Downtime interval overlaps incorrectly | Downtime and failure — Downtime interval overlaps incorrectly: missing block ambiguous matches before a production restart request. | Downtime and failure — Downtime interval overlaps incorrectly: historical inspection exposure stays unresolved; shutdown scope is incomplete; exposure during shutdown change. | For downtime interval overlaps incorrectly, preserve original evidence during shutdown scope change plus configuration comparison. | Reliability Manager | Medium pending cross-domain service evidence. |
| MR-129 | Downtime and failure | Maintenance downtime treated as production loss | Downtime and failure — Maintenance downtime treated as production loss: missing retain formula lineage before technical closure. | Downtime and failure — Maintenance downtime treated as production loss: contract remedy loses supporting evidence; exception aging is concealed; exposure at plan reactivation. | For maintenance downtime treated as production loss, verify permit scope when a counter segment changes and monitor overrides. | Reliability Manager | Medium until legacy records are reconciled. |
| MR-130 | Downtime and failure | Failure mode confused with cause | Downtime and failure — Failure mode confused with cause: missing monitor abnormal override use after offline synchronization. | Downtime and failure — Failure mode confused with cause: cost attribution reaches the wrong object; Manufacturing coordination fails; exposure during reliability refresh. | For failure mode confused with cause, test lifecycle guards before technical closure and retain its actor. | Reliability Manager | Low; field identity remains observable. |
| MR-131 | Downtime and failure | Chronic bad actor population incomplete | Downtime and failure — Chronic bad actor population incomplete: missing replay backdated corrections when reliability measures refresh. | Downtime and failure — Chronic bad actor population incomplete: contractor action lacks personal accountability; reliability analysis is biased; exposure after contractor reassignment. | For chronic bad actor population incomplete, confirm owning-domain authority at calibration failure with a scoped blocker. | Reliability Manager | Low after historical replay testing. |
| MR-132 | Downtime and failure | Repair duration excludes waiting inconsistently | Downtime and failure — Repair duration excludes waiting inconsistently: missing verify device provenance before supplier acceptance. | Downtime and failure — Repair duration excludes waiting inconsistently: equipment configuration cannot be reconstructed; meter chronology is broken; exposure during hierarchy correction. | For repair duration excludes waiting inconsistently, monitor abnormal override use before Finance settlement plus immutable correction. | Reliability Manager | Medium-low while contractor work is required. |
| MR-133 | Downtime and failure | Failure code taxonomy changed historically | Downtime and failure — Failure code taxonomy changed historically: missing scan authoritative identity at calibration failure. | Downtime and failure — Failure code taxonomy changed historically: backlog priority no longer reflects consequence; technical history is unreliable; exposure before warranty submission. | For failure code taxonomy changed historically, scan authoritative identity at technician start and verify the recipient. | Reliability Manager | Low with immutable event monitoring. |
| MR-134 | Downtime and failure | No-fault-found repair closes investigation | Downtime and failure — No-fault-found repair closes investigation: missing freeze the selected revision before equipment release. | Downtime and failure — No-fault-found repair closes investigation: downtime and production loss diverge; Quality exposure stays open; exposure at schedule freeze. | For no-fault-found repair closes investigation, require independent approval before a production restart request with quantity reconciliation. | Reliability Manager | Low with periodic independent sampling. |
| MR-135 | Downtime and failure | Component failure assigned to parent equipment only | Downtime and failure — Component failure assigned to parent equipment only: missing check effective dates on contractor reassignment. | Downtime and failure — Component failure assigned to parent equipment only: automation exceeds its advisory authority; warranty evidence is incomplete; exposure during meter rollover. | For component failure assigned to parent equipment only, reconcile quantity and serial before supplier acceptance plus independent sampling. | Reliability Manager | Medium until device provenance is proven. |

### 58.2 Maintenance example catalog

Each example identifies the owning Maintenance role and allowed requests. “No request” means the scenario does not authorize that effect; it does not remove the receiving domain from governance.

| ID | Example | Maintenance owner | Source | Main Maintenance transaction | Maintenance effect | Inventory request | Manufacturing request | Quality request | Procurement request | Safety request | Finance request | Approval | Reconciliation | Specific risk | Current status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ME-001 | Routine calendar PM | Maintenance Planner | Approved plan and due call | Preventive maintenance call | Routine calendar PM: Maintenance preserves due-call basis; retains installed configuration, production window and permit validity. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact routine calendar pm revision. | Verify actor, revision and chronology after routine calendar pm. | Routine calendar PM: unacknowledged Inventory effect during contractor execution. | Planned |
| ME-002 | Overdue lubrication PM | Maintenance Planner | Approved plan and due call | Preventive maintenance call | Overdue lubrication PM: Maintenance preserves due-call basis; retains equipment scope, plan snapshot and Finance dependency. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of overdue lubrication pm. | Compare owning-domain responses; age overdue lubrication pm mismatches. | Overdue lubrication PM: premature production restart during cost settlement. | Planned |
| ME-003 | Approved PM deferral | Maintenance Planner | Approved plan and due call | Preventive maintenance call | Approved PM deferral: Maintenance preserves due-call basis; retains order revision, tool fitness and priority override. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for approved pm deferral. | Approved PM deferral: unresolved Quality exposure at service acceptance. | Planned |
| ME-004 | Rejected PM deferral | Maintenance Planner | Approved plan and due call | Preventive maintenance call | Rejected PM deferral: Maintenance preserves due-call basis; retains event chronology, warranty basis and contractor sponsor. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Planner approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for rejected pm deferral. | Rejected PM deferral: expired permit use at domain handoff. | Planned |
| ME-005 | Explicitly skipped PM | Maintenance Planner | Approved plan and due call | Preventive maintenance call | Explicitly skipped PM: Maintenance preserves due-call basis; retains individual actor, work-center assignment and warehouse request. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact explicitly skipped pm revision. | Verify actor, revision and chronology after explicitly skipped pm. | Explicitly skipped PM: fabricated technician evidence inside a frozen schedule. | Planned |
| ME-006 | Counter-based overhaul call | Maintenance Planner | Approved plan and due call | Preventive maintenance call | Counter-based overhaul call: Maintenance preserves due-call basis; retains meter basis, Inventory response and release constraints. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of counter-based overhaul call. | Compare owning-domain responses; age counter-based overhaul call mismatches. | Counter-based overhaul call: wrong spare custody when production resumes. | Planned |
| ME-007 | Condition-triggered bearing inspection | Maintenance Planner | Approved plan and due call | Preventive maintenance call | Condition-triggered bearing inspection: Maintenance preserves due-call basis; retains permit dependency, technical signature and exception age. | No Inventory request. | No Manufacturing request. | Quality assesses exposure from condition-triggered bearing inspection. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for condition-triggered bearing inspection. | Condition-triggered bearing inspection: unsupported supplier acceptance while backlog ages. | Planned |
| ME-008 | Inspection-round defect | Maintenance Planner | Approved plan and due call | Preventive maintenance call | Inspection-round defect: Maintenance preserves due-call basis; retains spare identity, supplier reference and Quality impact. | No Inventory request. | No Manufacturing request. | Quality assesses exposure from inspection-round defect. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Planner approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for inspection-round defect. | Inspection-round defect: incorrect capital classification after offline sync. | Planned |
| ME-009 | Frozen PM schedule change | Maintenance Planner | Approved plan and due call | Preventive maintenance call | Frozen PM schedule change: Maintenance preserves due-call basis; retains external acknowledgement, labor category and schedule displacement. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact frozen pm schedule change revision. | Verify actor, revision and chronology after frozen pm schedule change. | Frozen PM schedule change: lost meter chronology after component replacement. | Planned |
| ME-010 | Suspended PM plan | Maintenance Planner | Approved plan and due call | Preventive maintenance call | Suspended PM plan: Maintenance preserves due-call basis; retains verification result, counter segment and root-cause case. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of suspended pm plan. | Compare owning-domain responses; age suspended pm plan mismatches. | Suspended PM plan: misstated downtime within shutdown work. | Planned |
| ME-011 | Reactivated PM with missed calls | Maintenance Planner | Approved plan and due call | Preventive maintenance call | Reactivated PM with missed calls: Maintenance preserves due-call basis; retains open exception, calibration status and instrument identity. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for reactivated pm with missed calls. | Reactivated PM with missed calls: hidden repeat failure after plan reactivation. | Planned |
| ME-012 | Shutdown-based PM package | Maintenance Planner | Approved plan and due call | Preventive maintenance call | Shutdown-based PM package: Maintenance preserves due-call basis; retains condition constraint, reconciliation owner and task-list version. | No Inventory request. | Manufacturing acknowledges the window for shutdown-based pm package. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Planner approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for shutdown-based pm package. | Shutdown-based PM package: invalid PM compliance under emergency pressure. | Planned |
| ME-013 | Emergency pump breakdown | Maintenance Supervisor | Attributed malfunction report | Breakdown notification and corrective order | Emergency pump breakdown: Maintenance records malfunction and repair readiness; retains formula version, safety clearance and request causation. | No Inventory request. | Manufacturing acknowledges the window for emergency pump breakdown. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact emergency pump breakdown revision. | Verify actor, revision and chronology after emergency pump breakdown. | Emergency pump breakdown: contractor attribution loss while a hold remains. | Planned |
| ME-014 | Corrective seal repair | Maintenance Supervisor | Attributed malfunction report | Breakdown notification and corrective order | Corrective seal repair: Maintenance records malfunction and repair readiness; retains source provenance, downtime interval and permit validity. | No Inventory request. | Manufacturing acknowledges the window for corrective seal repair. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of corrective seal repair. | Compare owning-domain responses; age corrective seal repair mismatches. | Corrective seal repair: overwritten calibration evidence after meter correction. | Planned |
| ME-015 | Repeat gearbox breakdown | Maintenance Supervisor | Attributed malfunction report | Breakdown notification and corrective order | Repeat gearbox breakdown: Maintenance records malfunction and repair readiness; retains cost object, failure observation and Finance dependency. | No Inventory request. | Manufacturing acknowledges the window for repeat gearbox breakdown. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for repeat gearbox breakdown. | Repeat gearbox breakdown: unsafe conditional release during reliability refresh. | Planned |
| ME-016 | No-fault-found motor trip | Maintenance Supervisor | Attributed malfunction report | Breakdown notification and corrective order | No-fault-found motor trip: Maintenance records malfunction and repair readiness; retains shutdown window, component position and priority override. | No Inventory request. | Manufacturing acknowledges the window for no-fault-found motor trip. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Supervisor approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for no-fault-found motor trip. | No-fault-found motor trip: AI authority escalation following master change. | Planned |
| ME-017 | Temporary corrective repair | Maintenance Supervisor | Attributed malfunction report | Breakdown notification and corrective order | Temporary corrective repair: Maintenance records malfunction and repair readiness; retains Quality dependency, approval lineage and contractor sponsor. | No Inventory request. | Manufacturing acknowledges the window for temporary corrective repair. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact temporary corrective repair revision. | Verify actor, revision and chronology after temporary corrective repair. | Temporary corrective repair: wrong reliability population at calibration review. | Planned |
| ME-018 | Deferred corrosion repair | Maintenance Supervisor | Attributed malfunction report | Breakdown notification and corrective order | Deferred corrosion repair: Maintenance records malfunction and repair readiness; retains contract coverage, production window and warehouse request. | No Inventory request. | Manufacturing acknowledges the window for deferred corrosion repair. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of deferred corrosion repair. | Compare owning-domain responses; age deferred corrosion repair mismatches. | Deferred corrosion repair: unreconciled external cost during permit suspension. | Planned |
| ME-019 | Breakdown during night shift | Maintenance Supervisor | Attributed malfunction report | Breakdown notification and corrective order | Breakdown during night shift: Maintenance records malfunction and repair readiness; retains original due date, plan snapshot and release constraints. | No Inventory request. | Manufacturing acknowledges the window for breakdown during night shift. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for breakdown during night shift. | Breakdown during night shift: stale work-order scope during technical closure. | Planned |
| ME-020 | Standby equipment failure | Maintenance Supervisor | Attributed malfunction report | Breakdown notification and corrective order | Standby equipment failure: Maintenance records malfunction and repair readiness; retains installed configuration, tool fitness and exception age. | No Inventory request. | Manufacturing acknowledges the window for standby equipment failure. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Supervisor approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for standby equipment failure. | Standby equipment failure: omitted shutdown dependency during contractor execution. | Planned |
| ME-021 | Production bottleneck failure | Maintenance Supervisor | Attributed malfunction report | Breakdown notification and corrective order | Production bottleneck failure: Maintenance records malfunction and repair readiness; retains equipment scope, warranty basis and Quality impact. | No Inventory request. | Manufacturing acknowledges the window for production bottleneck failure. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact production bottleneck failure revision. | Verify actor, revision and chronology after production bottleneck failure. | Production bottleneck failure: warranty recovery loss during cost settlement. | Planned |
| ME-022 | Utility equipment interruption | Maintenance Supervisor | Attributed malfunction report | Breakdown notification and corrective order | Utility equipment interruption: Maintenance records malfunction and repair readiness; retains order revision, work-center assignment and schedule displacement. | No Inventory request. | Manufacturing acknowledges the window for utility equipment interruption. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of utility equipment interruption. | Compare owning-domain responses; age utility equipment interruption mismatches. | Utility equipment interruption: cross-plant data exposure at service acceptance. | Planned |
| ME-023 | Remote-site emergency repair | Maintenance Supervisor | Attributed malfunction report | Breakdown notification and corrective order | Remote-site emergency repair: Maintenance records malfunction and repair readiness; retains event chronology, Inventory response and root-cause case. | No Inventory request. | Manufacturing acknowledges the window for remote-site emergency repair. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for remote-site emergency repair. | Remote-site emergency repair: false equipment readiness at domain handoff. | Planned |
| ME-024 | Breakdown with unknown cause | Maintenance Supervisor | Attributed malfunction report | Breakdown notification and corrective order | Breakdown with unknown cause: Maintenance records malfunction and repair readiness; retains individual actor, technical signature and instrument identity. | No Inventory request. | Manufacturing acknowledges the window for breakdown with unknown cause. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Supervisor approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for breakdown with unknown cause. | Breakdown with unknown cause: unacknowledged Inventory effect inside a frozen schedule. | Planned |
| ME-025 | Immediate equipment hold | Maintenance Manager | Verified condition evidence | Equipment condition decision | Immediate equipment hold: Maintenance issues a scoped condition decision; retains meter basis, supplier reference and task-list version. | No Inventory request. | Manufacturing acknowledges the window for immediate equipment hold. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact immediate equipment hold revision. | Verify actor, revision and chronology after immediate equipment hold. | Immediate equipment hold: premature production restart when production resumes. | Planned |
| ME-026 | Scoped component hold | Maintenance Manager | Verified condition evidence | Equipment condition decision | Scoped component hold: Maintenance issues a scoped condition decision; retains permit dependency, labor category and request causation. | Inventory validates or moves scoped component hold. | Manufacturing acknowledges the window for scoped component hold. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of scoped component hold. | Compare owning-domain responses; age scoped component hold mismatches. | Scoped component hold: unresolved Quality exposure while backlog ages. | Planned |
| ME-027 | Conditional equipment release | Maintenance Manager | Verified condition evidence | Equipment condition decision | Conditional equipment release: Maintenance issues a scoped condition decision; retains spare identity, counter segment and permit validity. | No Inventory request. | Manufacturing acknowledges the window for conditional equipment release. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for conditional equipment release. | Conditional equipment release: expired permit use after offline sync. | Planned |
| ME-028 | Unconditional return-to-service | Maintenance Manager | Verified condition evidence | Equipment condition decision | Unconditional return-to-service: Maintenance issues a scoped condition decision; retains external acknowledgement, calibration status and Finance dependency. | No Inventory request. | Manufacturing acknowledges the window for unconditional return-to-service. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for unconditional return-to-service. | Unconditional return-to-service: fabricated technician evidence after component replacement. | Planned |
| ME-029 | Production restart after maintenance | Maintenance Manager | Verified condition evidence | Equipment condition decision | Production restart after maintenance: Maintenance publishes equipment release for Manufacturing's separate restart decision; retains verification result, reconciliation owner and priority override. | No Inventory request. | Manufacturing acknowledges the window for production restart after maintenance. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact production restart after maintenance revision. | Verify actor, revision and chronology after production restart after maintenance. | Production restart after maintenance: wrong spare custody within shutdown work. | Planned |
| ME-030 | Failed test-run reversal | Maintenance Manager | Verified condition evidence | Equipment condition decision | Failed test-run reversal: Maintenance issues a scoped condition decision; retains open exception, safety clearance and contractor sponsor. | No Inventory request. | Manufacturing acknowledges the window for failed test-run reversal. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of failed test-run reversal. | Compare owning-domain responses; age failed test-run reversal mismatches. | Failed test-run reversal: unsupported supplier acceptance after plan reactivation. | Planned |
| ME-031 | Release with monitored defect | Maintenance Manager | Verified condition evidence | Equipment condition decision | Release with monitored defect: Maintenance issues a scoped condition decision; retains condition constraint, downtime interval and warehouse request. | No Inventory request. | Manufacturing acknowledges the window for release with monitored defect. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for release with monitored defect. | Release with monitored defect: incorrect capital classification under emergency pressure. | Planned |
| ME-032 | Competing Quality and Maintenance holds | Maintenance Manager | Verified condition evidence | Equipment condition decision | Competing Quality and Maintenance holds: Maintenance issues a scoped condition decision; retains formula version, failure observation and release constraints. | No Inventory request. | Manufacturing acknowledges the window for competing quality and maintenance holds. | Quality assesses exposure from competing quality and maintenance holds. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for competing quality and maintenance holds. | Competing Quality and Maintenance holds: lost meter chronology while a hold remains. | Planned |
| ME-033 | Safety isolation still active | Maintenance Manager | Verified condition evidence | Equipment condition decision | Safety isolation still active: Maintenance issues a scoped condition decision; retains source provenance, component position and exception age. | No Inventory request. | Manufacturing acknowledges the window for safety isolation still active. | No Quality request. | No Procurement request. | Safety/HSE clears safety isolation still active. | No Finance request. | Maintenance Manager approves the exact safety isolation still active revision. | Verify actor, revision and chronology after safety isolation still active. | Safety isolation still active: misstated downtime after meter correction. | Planned |
| ME-034 | Release after external repair | Maintenance Manager | Verified condition evidence | Equipment condition decision | Release after external repair: Maintenance issues a scoped condition decision; retains cost object, approval lineage and Quality impact. | No Inventory request. | Manufacturing acknowledges the window for release after external repair. | No Quality request. | Procurement owns commercial action for release after external repair. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of release after external repair. | Compare owning-domain responses; age release after external repair mismatches. | Release after external repair: hidden repeat failure during reliability refresh. | Planned |
| ME-035 | Out-of-service declaration | Maintenance Manager | Verified condition evidence | Equipment condition decision | Out-of-service declaration: Maintenance issues a scoped condition decision; retains shutdown window, production window and schedule displacement. | No Inventory request. | Manufacturing acknowledges the window for out-of-service declaration. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for out-of-service declaration. | Out-of-service declaration: invalid PM compliance following master change. | Planned |
| ME-036 | Decommissioning technical closure | Maintenance Manager | Verified condition evidence | Equipment condition decision | Decommissioning technical closure: Maintenance issues a scoped condition decision; retains Quality dependency, plan snapshot and root-cause case. | No Inventory request. | Manufacturing acknowledges the window for decommissioning technical closure. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for decommissioning technical closure. | Decommissioning technical closure: contractor attribution loss at calibration review. | Planned |
| ME-037 | Routine spare reservation | Maintenance Supervisor | Released operation material plan | Maintenance material/tool request | Routine spare reservation: Maintenance links technical need to fitted use; retains contract coverage, tool fitness and instrument identity. | Inventory validates or moves routine spare reservation. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact routine spare reservation revision. | Verify actor, revision and chronology after routine spare reservation. | Routine spare reservation: overwritten calibration evidence during permit suspension. | Planned |
| ME-038 | Planned spare issue | Maintenance Supervisor | Released operation material plan | Maintenance material/tool request | Planned spare issue: Maintenance links technical need to fitted use; retains original due date, warranty basis and task-list version. | Inventory validates or moves planned spare issue. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of planned spare issue. | Compare owning-domain responses; age planned spare issue mismatches. | Planned spare issue: unsafe conditional release during technical closure. | Planned |
| ME-039 | Emergency spare issue | Maintenance Supervisor | Released operation material plan | Maintenance material/tool request | Emergency spare issue: Maintenance links technical need to fitted use; retains installed configuration, work-center assignment and request causation. | Inventory validates or moves emergency spare issue. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for emergency spare issue. | Emergency spare issue: AI authority escalation during contractor execution. | Planned |
| ME-040 | Wrong spare return correction | Maintenance Supervisor | Released operation material plan | Maintenance material/tool request | Wrong spare return correction: Maintenance links technical need to fitted use; retains equipment scope, Inventory response and permit validity. | Inventory validates or moves wrong spare return correction. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Supervisor approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for wrong spare return correction. | Wrong spare return correction: wrong reliability population during cost settlement. | Planned |
| ME-041 | Rotable pump replacement | Maintenance Supervisor | Released operation material plan | Maintenance material/tool request | Rotable pump replacement: Maintenance links technical need to fitted use; retains order revision, technical signature and Finance dependency. | Inventory validates or moves rotable pump replacement. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact rotable pump replacement revision. | Verify actor, revision and chronology after rotable pump replacement. | Rotable pump replacement: unreconciled external cost at service acceptance. | Planned |
| ME-042 | Serialized bearing cartridge swap | Maintenance Supervisor | Released operation material plan | Maintenance material/tool request | Serialized bearing cartridge swap: Maintenance links technical need to fitted use; retains event chronology, supplier reference and priority override. | Inventory validates or moves serialized bearing cartridge swap. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of serialized bearing cartridge swap. | Compare owning-domain responses; age serialized bearing cartridge swap mismatches. | Serialized bearing cartridge swap: stale work-order scope at domain handoff. | Planned |
| ME-043 | Substitute seal approval | Maintenance Supervisor | Released operation material plan | Maintenance material/tool request | Substitute seal approval: Maintenance links technical need to fitted use; retains individual actor, labor category and contractor sponsor. | Inventory validates or moves substitute seal approval. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for substitute seal approval. | Substitute seal approval: omitted shutdown dependency inside a frozen schedule. | Planned |
| ME-044 | Critical spare shortage | Maintenance Supervisor | Released operation material plan | Maintenance material/tool request | Critical spare shortage: Maintenance links technical need to fitted use; retains meter basis, counter segment and warehouse request. | Inventory validates or moves critical spare shortage. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Supervisor approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for critical spare shortage. | Critical spare shortage: warranty recovery loss when production resumes. | Planned |
| ME-045 | Unused spare return | Maintenance Supervisor | Released operation material plan | Maintenance material/tool request | Unused spare return: Maintenance links technical need to fitted use; retains permit dependency, calibration status and release constraints. | Inventory validates or moves unused spare return. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact unused spare return revision. | Verify actor, revision and chronology after unused spare return. | Unused spare return: cross-plant data exposure while backlog ages. | Planned |
| ME-046 | Removed component quarantine | Maintenance Supervisor | Released operation material plan | Maintenance material/tool request | Removed component quarantine: Maintenance links technical need to fitted use; retains spare identity, reconciliation owner and exception age. | Inventory validates or moves removed component quarantine. | No Manufacturing request. | Quality assesses exposure from removed component quarantine. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of removed component quarantine. | Compare owning-domain responses; age removed component quarantine mismatches. | Removed component quarantine: false equipment readiness after offline sync. | Planned |
| ME-047 | Tool checkout | Maintenance Supervisor | Released operation material plan | Maintenance material/tool request | Tool checkout: Maintenance links technical need to fitted use; retains external acknowledgement, safety clearance and Quality impact. | Inventory validates or moves tool checkout. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for tool checkout. | Tool checkout: unacknowledged Inventory effect after component replacement. | Planned |
| ME-048 | Calibrated torque-tool use | Maintenance Supervisor | Released operation material plan | Maintenance material/tool request | Calibrated torque-tool use: Maintenance links technical need to fitted use; retains verification result, downtime interval and schedule displacement. | Inventory validates or moves calibrated torque-tool use. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Supervisor approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for calibrated torque-tool use. | Calibrated torque-tool use: premature production restart within shutdown work. | Planned |
| ME-049 | External contractor repair | Contractor Manager | Service scope and supplier reference | External-service technical record | External contractor repair: Maintenance accepts technical service evidence; retains open exception, failure observation and root-cause case. | No Inventory request. | No Manufacturing request. | No Quality request. | Procurement owns commercial action for external contractor repair. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact external contractor repair revision. | Verify actor, revision and chronology after external contractor repair. | External contractor repair: unresolved Quality exposure after plan reactivation. | Planned |
| ME-050 | Warranty-covered repair | Contractor Manager | Service scope and supplier reference | External-service technical record | Warranty-covered repair: Maintenance accepts technical service evidence; retains condition constraint, component position and instrument identity. | No Inventory request. | No Manufacturing request. | No Quality request. | Procurement owns commercial action for warranty-covered repair. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of warranty-covered repair. | Compare owning-domain responses; age warranty-covered repair mismatches. | Warranty-covered repair: expired permit use under emergency pressure. | Planned |
| ME-051 | Service-contract preventive visit | Contractor Manager | Service scope and supplier reference | External-service technical record | Service-contract preventive visit: Maintenance accepts technical service evidence; retains formula version, approval lineage and task-list version. | No Inventory request. | No Manufacturing request. | No Quality request. | Procurement owns commercial action for service-contract preventive visit. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for service-contract preventive visit. | Service-contract preventive visit: fabricated technician evidence while a hold remains. | Planned |
| ME-052 | Failed external service | Contractor Manager | Service scope and supplier reference | External-service technical record | Failed external service: Maintenance accepts technical service evidence; retains source provenance, production window and request causation. | No Inventory request. | No Manufacturing request. | No Quality request. | Procurement owns commercial action for failed external service. | No Safety/HSE request. | No Finance request. | Contractor Manager approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for failed external service. | Failed external service: wrong spare custody after meter correction. | Planned |
| ME-053 | Unplanned vendor callout | Contractor Manager | Service scope and supplier reference | External-service technical record | Unplanned vendor callout: Maintenance accepts technical service evidence; retains cost object, plan snapshot and permit validity. | No Inventory request. | No Manufacturing request. | No Quality request. | Procurement owns commercial action for unplanned vendor callout. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact unplanned vendor callout revision. | Verify actor, revision and chronology after unplanned vendor callout. | Unplanned vendor callout: unsupported supplier acceptance during reliability refresh. | Planned |
| ME-054 | Contractor time confirmation | Contractor Manager | Service scope and supplier reference | External-service technical record | Contractor time confirmation: Maintenance accepts technical service evidence; retains shutdown window, tool fitness and Finance dependency. | No Inventory request. | No Manufacturing request. | No Quality request. | Procurement owns commercial action for contractor time confirmation. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of contractor time confirmation. | Compare owning-domain responses; age contractor time confirmation mismatches. | Contractor time confirmation: incorrect capital classification following master change. | Planned |
| ME-055 | Supplier technician site access | Contractor Manager | Service scope and supplier reference | External-service technical record | Supplier technician site access: Maintenance accepts technical service evidence; retains Quality dependency, warranty basis and priority override. | No Inventory request. | No Manufacturing request. | No Quality request. | Procurement owns commercial action for supplier technician site access. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for supplier technician site access. | Supplier technician site access: lost meter chronology at calibration review. | Planned |
| ME-056 | Warranty eligibility review | Contractor Manager | Service scope and supplier reference | External-service technical record | Warranty eligibility review: Maintenance accepts technical service evidence; retains contract coverage, work-center assignment and contractor sponsor. | No Inventory request. | No Manufacturing request. | No Quality request. | Procurement owns commercial action for warranty eligibility review. | No Safety/HSE request. | No Finance request. | Contractor Manager approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for warranty eligibility review. | Warranty eligibility review: misstated downtime during permit suspension. | Planned |
| ME-057 | Missed warranty recovery | Contractor Manager | Service scope and supplier reference | External-service technical record | Missed warranty recovery: Maintenance accepts technical service evidence; retains original due date, Inventory response and warehouse request. | No Inventory request. | No Manufacturing request. | No Quality request. | Procurement owns commercial action for missed warranty recovery. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact missed warranty recovery revision. | Verify actor, revision and chronology after missed warranty recovery. | Missed warranty recovery: hidden repeat failure during technical closure. | Planned |
| ME-058 | Contract renewal warning | Contractor Manager | Service scope and supplier reference | External-service technical record | Contract renewal warning: Maintenance accepts technical service evidence; retains installed configuration, technical signature and release constraints. | No Inventory request. | No Manufacturing request. | No Quality request. | Procurement owns commercial action for contract renewal warning. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of contract renewal warning. | Compare owning-domain responses; age contract renewal warning mismatches. | Contract renewal warning: invalid PM compliance during contractor execution. | Planned |
| ME-059 | External calibration visit | Contractor Manager | Service scope and supplier reference | External-service technical record | External calibration visit: Maintenance accepts technical service evidence; retains equipment scope, supplier reference and exception age. | No Inventory request. | No Manufacturing request. | Quality assesses exposure from external calibration visit. | Procurement owns commercial action for external calibration visit. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for external calibration visit. | External calibration visit: contractor attribution loss during cost settlement. | Planned |
| ME-060 | Service report rejection | Contractor Manager | Service scope and supplier reference | External-service technical record | Service report rejection: Maintenance accepts technical service evidence; retains order revision, labor category and Quality impact. | No Inventory request. | No Manufacturing request. | No Quality request. | Procurement owns commercial action for service report rejection. | No Safety/HSE request. | No Finance request. | Contractor Manager approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for service report rejection. | Service report rejection: overwritten calibration evidence at service acceptance. | Planned |
| ME-061 | Technician overtime | Maintenance Scheduler | Crew dispatch event | Dispatch and labor confirmation | Technician overtime: Maintenance captures attributed dispatch and time; retains event chronology, counter segment and schedule displacement. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | Finance reviews technician overtime evidence. | Maintenance Manager approves the exact technician overtime revision. | Verify actor, revision and chronology after technician overtime. | Technician overtime: unsafe conditional release at domain handoff. | Planned |
| ME-062 | Crew split across orders | Maintenance Scheduler | Crew dispatch event | Dispatch and labor confirmation | Crew split across orders: Maintenance captures attributed dispatch and time; retains individual actor, calibration status and root-cause case. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of crew split across orders. | Compare owning-domain responses; age crew split across orders mismatches. | Crew split across orders: AI authority escalation inside a frozen schedule. | Planned |
| ME-063 | Travel time to remote asset | Maintenance Scheduler | Crew dispatch event | Dispatch and labor confirmation | Travel time to remote asset: Maintenance captures attributed dispatch and time; retains meter basis, reconciliation owner and instrument identity. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for travel time to remote asset. | Travel time to remote asset: wrong reliability population when production resumes. | Planned |
| ME-064 | Material-waiting labor | Maintenance Scheduler | Crew dispatch event | Dispatch and labor confirmation | Material-waiting labor: Maintenance captures attributed dispatch and time; retains permit dependency, safety clearance and task-list version. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Scheduler approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for material-waiting labor. | Material-waiting labor: unreconciled external cost while backlog ages. | Planned |
| ME-065 | Permit-waiting downtime | Maintenance Scheduler | Crew dispatch event | Dispatch and labor confirmation | Permit-waiting downtime: Maintenance captures attributed dispatch and time; retains spare identity, downtime interval and request causation. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | Safety/HSE clears permit-waiting downtime. | No Finance request. | Maintenance Manager approves the exact permit-waiting downtime revision. | Verify actor, revision and chronology after permit-waiting downtime. | Permit-waiting downtime: stale work-order scope after offline sync. | Planned |
| ME-066 | Vendor-waiting downtime | Maintenance Scheduler | Crew dispatch event | Dispatch and labor confirmation | Vendor-waiting downtime: Maintenance captures attributed dispatch and time; retains external acknowledgement, failure observation and permit validity. | No Inventory request. | No Manufacturing request. | No Quality request. | Procurement owns commercial action for vendor-waiting downtime. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of vendor-waiting downtime. | Compare owning-domain responses; age vendor-waiting downtime mismatches. | Vendor-waiting downtime: omitted shutdown dependency after component replacement. | Planned |
| ME-067 | Emergency schedule break | Maintenance Scheduler | Crew dispatch event | Dispatch and labor confirmation | Emergency schedule break: Maintenance captures attributed dispatch and time; retains verification result, component position and Finance dependency. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for emergency schedule break. | Emergency schedule break: warranty recovery loss within shutdown work. | Planned |
| ME-068 | Frozen weekly schedule | Maintenance Scheduler | Crew dispatch event | Dispatch and labor confirmation | Frozen weekly schedule: Maintenance captures attributed dispatch and time; retains open exception, approval lineage and priority override. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Scheduler approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for frozen weekly schedule. | Frozen weekly schedule: cross-plant data exposure after plan reactivation. | Planned |
| ME-069 | Daily dispatch reassignment | Maintenance Scheduler | Crew dispatch event | Dispatch and labor confirmation | Daily dispatch reassignment: Maintenance captures attributed dispatch and time; retains condition constraint, production window and contractor sponsor. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact daily dispatch reassignment revision. | Verify actor, revision and chronology after daily dispatch reassignment. | Daily dispatch reassignment: false equipment readiness under emergency pressure. | Planned |
| ME-070 | Unqualified technician assignment | Maintenance Scheduler | Crew dispatch event | Dispatch and labor confirmation | Unqualified technician assignment: Maintenance captures attributed dispatch and time; retains formula version, plan snapshot and warehouse request. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of unqualified technician assignment. | Compare owning-domain responses; age unqualified technician assignment mismatches. | Unqualified technician assignment: unacknowledged Inventory effect while a hold remains. | Planned |
| ME-071 | Shared-terminal correction | Maintenance Scheduler | Crew dispatch event | Dispatch and labor confirmation | Shared-terminal correction: Maintenance captures attributed dispatch and time; retains source provenance, tool fitness and release constraints. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for shared-terminal correction. | Shared-terminal correction: premature production restart after meter correction. | Planned |
| ME-072 | Paused operation handover | Maintenance Scheduler | Crew dispatch event | Dispatch and labor confirmation | Paused operation handover: Maintenance captures attributed dispatch and time; retains cost object, warranty basis and exception age. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Scheduler approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for paused operation handover. | Paused operation handover: unresolved Quality exposure during reliability refresh. | Planned |
| ME-073 | Routine meter reading | Metrology | Attributed reading or calibration | Measurement or calibration event | Routine meter reading: Maintenance records reading and instrument lineage; retains shutdown window, work-center assignment and Quality impact. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact routine meter reading revision. | Verify actor, revision and chronology after routine meter reading. | Routine meter reading: expired permit use following master change. | Planned |
| ME-074 | Counter rollover | Metrology | Attributed reading or calibration | Measurement or calibration event | Counter rollover: Maintenance records reading and instrument lineage; retains Quality dependency, Inventory response and schedule displacement. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of counter rollover. | Compare owning-domain responses; age counter rollover mismatches. | Counter rollover: fabricated technician evidence at calibration review. | Planned |
| ME-075 | Counter replacement | Metrology | Attributed reading or calibration | Measurement or calibration event | Counter replacement: Maintenance records reading and instrument lineage; retains contract coverage, technical signature and root-cause case. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for counter replacement. | Counter replacement: wrong spare custody during permit suspension. | Planned |
| ME-076 | Manual reading correction | Metrology | Attributed reading or calibration | Measurement or calibration event | Manual reading correction: Maintenance records reading and instrument lineage; retains original due date, supplier reference and instrument identity. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Metrology approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for manual reading correction. | Manual reading correction: unsupported supplier acceptance during technical closure. | Planned |
| ME-077 | Calibration due | Metrology | Attributed reading or calibration | Measurement or calibration event | Calibration due: Maintenance records reading and instrument lineage; retains installed configuration, labor category and task-list version. | No Inventory request. | No Manufacturing request. | Quality assesses exposure from calibration due. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact calibration due revision. | Verify actor, revision and chronology after calibration due. | Calibration due: incorrect capital classification during contractor execution. | Planned |
| ME-078 | Calibration pass | Metrology | Attributed reading or calibration | Measurement or calibration event | Calibration pass: Maintenance updates instrument fitness from attributable as-found and as-left evidence; retains equipment scope, counter segment and request causation. | No Inventory request. | No Manufacturing request. | Quality assesses exposure from calibration pass. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of calibration pass. | Compare owning-domain responses; age calibration pass mismatches. | Calibration pass: lost meter chronology during cost settlement. | Planned |
| ME-079 | Calibration fail | Metrology | Attributed reading or calibration | Measurement or calibration event | Calibration fail: Maintenance restricts the instrument and opens a suspect-interval assessment; retains order revision, calibration status and permit validity. | No Inventory request. | No Manufacturing request. | Quality assesses exposure from calibration fail. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for calibration fail. | Calibration fail: misstated downtime at service acceptance. | Planned |
| ME-080 | Out-of-tolerance impact | Metrology | Attributed reading or calibration | Measurement or calibration event | Out-of-tolerance impact: Maintenance records reading and instrument lineage; retains event chronology, reconciliation owner and Finance dependency. | No Inventory request. | No Manufacturing request. | Quality assesses exposure from out-of-tolerance impact. | No Procurement request. | No Safety/HSE request. | No Finance request. | Metrology approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for out-of-tolerance impact. | Out-of-tolerance impact: hidden repeat failure at domain handoff. | Planned |
| ME-081 | Quality reinspection after failed calibration | Metrology | Attributed reading or calibration | Measurement or calibration event | Quality reinspection after failed calibration: Maintenance records reading and instrument lineage; retains individual actor, safety clearance and priority override. | No Inventory request. | No Manufacturing request. | Quality assesses exposure from quality reinspection after failed calibration. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact quality reinspection after failed calibration revision. | Verify actor, revision and chronology after quality reinspection after failed calibration. | Quality reinspection after failed calibration: invalid PM compliance inside a frozen schedule. | Planned |
| ME-082 | Reference-standard expiry | Metrology | Attributed reading or calibration | Measurement or calibration event | Reference-standard expiry: Maintenance records reading and instrument lineage; retains meter basis, downtime interval and contractor sponsor. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of reference-standard expiry. | Compare owning-domain responses; age reference-standard expiry mismatches. | Reference-standard expiry: contractor attribution loss when production resumes. | Planned |
| ME-083 | Forged certificate suspicion | Metrology | Attributed reading or calibration | Measurement or calibration event | Forged certificate suspicion: Maintenance records reading and instrument lineage; retains permit dependency, failure observation and warehouse request. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for forged certificate suspicion. | Forged certificate suspicion: overwritten calibration evidence while backlog ages. | Planned |
| ME-084 | Failed instrument quarantine | Metrology | Attributed reading or calibration | Measurement or calibration event | Failed instrument quarantine: Maintenance records reading and instrument lineage; retains spare identity, component position and release constraints. | No Inventory request. | No Manufacturing request. | Quality assesses exposure from failed instrument quarantine. | No Procurement request. | No Safety/HSE request. | No Finance request. | Metrology approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for failed instrument quarantine. | Failed instrument quarantine: unsafe conditional release after offline sync. | Planned |
| ME-085 | Vibration alert direction | Reliability Engineer | Versioned population or signal | Reliability review case | Vibration alert direction: Maintenance reviews population and signal evidence; retains external acknowledgement, approval lineage and exception age. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact vibration alert direction revision. | Verify actor, revision and chronology after vibration alert direction. | Vibration alert direction: AI authority escalation after component replacement. | Planned |
| ME-086 | Oil-analysis trend | Reliability Engineer | Versioned population or signal | Reliability review case | Oil-analysis trend: Maintenance reviews population and signal evidence; retains verification result, production window and Quality impact. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of oil-analysis trend. | Compare owning-domain responses; age oil-analysis trend mismatches. | Oil-analysis trend: wrong reliability population within shutdown work. | Planned |
| ME-087 | Thermography hot-spot finding | Reliability Engineer | Versioned population or signal | Reliability review case | Thermography hot-spot finding: Maintenance reviews population and signal evidence; retains open exception, plan snapshot and schedule displacement. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for thermography hot-spot finding. | Thermography hot-spot finding: unreconciled external cost after plan reactivation. | Planned |
| ME-088 | Predictive failure recommendation | Reliability Engineer | Versioned population or signal | Reliability review case | Predictive failure recommendation: Maintenance reviews population and signal evidence; retains condition constraint, tool fitness and root-cause case. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Reliability Engineer approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for predictive failure recommendation. | Predictive failure recommendation: stale work-order scope under emergency pressure. | Future |
| ME-089 | False predictive alert | Reliability Engineer | Versioned population or signal | Reliability review case | False predictive alert: Maintenance reviews population and signal evidence; retains formula version, warranty basis and instrument identity. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact false predictive alert revision. | Verify actor, revision and chronology after false predictive alert. | False predictive alert: omitted shutdown dependency while a hold remains. | Future |
| ME-090 | Missed condition signal | Reliability Engineer | Versioned population or signal | Reliability review case | Missed condition signal: Maintenance reviews population and signal evidence; retains source provenance, work-center assignment and task-list version. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of missed condition signal. | Compare owning-domain responses; age missed condition signal mismatches. | Missed condition signal: warranty recovery loss after meter correction. | Planned |
| ME-091 | Repeat-failure analysis | Reliability Engineer | Versioned population or signal | Reliability review case | Repeat-failure analysis: Maintenance reviews population and signal evidence; retains cost object, Inventory response and request causation. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for repeat-failure analysis. | Repeat-failure analysis: cross-plant data exposure during reliability refresh. | Planned |
| ME-092 | Chronic bad-actor review | Reliability Engineer | Versioned population or signal | Reliability review case | Chronic bad-actor review: Maintenance reviews population and signal evidence; retains shutdown window, technical signature and permit validity. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Reliability Engineer approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for chronic bad-actor review. | Chronic bad-actor review: false equipment readiness following master change. | Planned |
| ME-093 | MTBF population correction | Reliability Engineer | Versioned population or signal | Reliability review case | MTBF population correction: Maintenance reviews population and signal evidence; retains Quality dependency, supplier reference and Finance dependency. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Maintenance Manager approves the exact mtbf population correction revision. | Verify actor, revision and chronology after mtbf population correction. | MTBF population correction: unacknowledged Inventory effect at calibration review. | Planned |
| ME-094 | MTTR duration correction | Reliability Engineer | Versioned population or signal | Reliability review case | MTTR duration correction: Maintenance reviews population and signal evidence; retains contract coverage, labor category and priority override. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Independent verification precedes closure of mttr duration correction. | Compare owning-domain responses; age mttr duration correction mismatches. | MTTR duration correction: premature production restart during permit suspension. | Planned |
| ME-095 | Availability restatement | Reliability Engineer | Versioned population or signal | Reliability review case | Availability restatement: Maintenance reviews population and signal evidence; retains original due date, counter segment and contractor sponsor. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for availability restatement. | Availability restatement: unresolved Quality exposure during technical closure. | Planned |
| ME-096 | Asset-health downgrade | Reliability Engineer | Versioned population or signal | Reliability review case | Asset-health downgrade: Maintenance reviews population and signal evidence; retains installed configuration, calibration status and warehouse request. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | No Finance request. | Reliability Engineer approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for asset-health downgrade. | Asset-health downgrade: expired permit use during contractor execution. | Planned |
| ME-097 | Shutdown work package | Safety/HSE Coordinator | Hazard-reviewed work package | Shutdown work coordination | Shutdown work package: Maintenance coordinates work with permit authority; retains equipment scope, reconciliation owner and release constraints. | No Inventory request. | Manufacturing acknowledges the window for shutdown work package. | No Quality request. | No Procurement request. | Safety/HSE clears shutdown work package. | No Finance request. | Maintenance Manager approves the exact shutdown work package revision. | Verify actor, revision and chronology after shutdown work package. | Shutdown work package: fabricated technician evidence during cost settlement. | Planned |
| ME-098 | Permit-to-work approval | Safety/HSE Coordinator | Hazard-reviewed work package | Shutdown work coordination | Permit-to-work approval: Maintenance coordinates work with permit authority; retains order revision, safety clearance and exception age. | No Inventory request. | Manufacturing acknowledges the window for permit-to-work approval. | No Quality request. | No Procurement request. | Safety/HSE clears permit-to-work approval. | No Finance request. | Independent verification precedes closure of permit-to-work approval. | Compare owning-domain responses; age permit-to-work approval mismatches. | Permit-to-work approval: wrong spare custody at service acceptance. | Planned |
| ME-099 | Isolation clearance | Safety/HSE Coordinator | Hazard-reviewed work package | Shutdown work coordination | Isolation clearance: Maintenance coordinates work with permit authority; retains event chronology, downtime interval and Quality impact. | No Inventory request. | Manufacturing acknowledges the window for isolation clearance. | No Quality request. | No Procurement request. | Safety/HSE clears isolation clearance. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for isolation clearance. | Isolation clearance: unsupported supplier acceptance at domain handoff. | Planned |
| ME-100 | Expired permit suspension | Safety/HSE Coordinator | Hazard-reviewed work package | Shutdown work coordination | Expired permit suspension: Maintenance coordinates work with permit authority; retains individual actor, failure observation and schedule displacement. | No Inventory request. | Manufacturing acknowledges the window for expired permit suspension. | No Quality request. | No Procurement request. | Safety/HSE clears expired permit suspension. | No Finance request. | Safety/HSE Coordinator approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for expired permit suspension. | Expired permit suspension: incorrect capital classification inside a frozen schedule. | Planned |
| ME-101 | Hot-work direction | Safety/HSE Coordinator | Hazard-reviewed work package | Shutdown work coordination | Hot-work direction: Maintenance coordinates work with permit authority; retains meter basis, component position and root-cause case. | No Inventory request. | Manufacturing acknowledges the window for hot-work direction. | No Quality request. | No Procurement request. | Safety/HSE clears hot-work direction. | No Finance request. | Maintenance Manager approves the exact hot-work direction revision. | Verify actor, revision and chronology after hot-work direction. | Hot-work direction: lost meter chronology when production resumes. | Planned |
| ME-102 | Confined-space direction | Safety/HSE Coordinator | Hazard-reviewed work package | Shutdown work coordination | Confined-space direction: Maintenance coordinates work with permit authority; retains permit dependency, approval lineage and instrument identity. | No Inventory request. | Manufacturing acknowledges the window for confined-space direction. | No Quality request. | No Procurement request. | Safety/HSE clears confined-space direction. | No Finance request. | Independent verification precedes closure of confined-space direction. | Compare owning-domain responses; age confined-space direction mismatches. | Confined-space direction: misstated downtime while backlog ages. | Planned |
| ME-103 | Energy-isolation verification | Safety/HSE Coordinator | Hazard-reviewed work package | Shutdown work coordination | Energy-isolation verification: Maintenance coordinates work with permit authority; retains spare identity, production window and task-list version. | No Inventory request. | Manufacturing acknowledges the window for energy-isolation verification. | No Quality request. | No Procurement request. | Safety/HSE clears energy-isolation verification. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for energy-isolation verification. | Energy-isolation verification: hidden repeat failure after offline sync. | Planned |
| ME-104 | Shutdown scope addition | Safety/HSE Coordinator | Hazard-reviewed work package | Shutdown work coordination | Shutdown scope addition: Maintenance coordinates work with permit authority; retains external acknowledgement, plan snapshot and request causation. | No Inventory request. | Manufacturing acknowledges the window for shutdown scope addition. | No Quality request. | No Procurement request. | Safety/HSE clears shutdown scope addition. | No Finance request. | Safety/HSE Coordinator approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for shutdown scope addition. | Shutdown scope addition: invalid PM compliance after component replacement. | Planned |
| ME-105 | Omitted shutdown job | Safety/HSE Coordinator | Hazard-reviewed work package | Shutdown work coordination | Omitted shutdown job: Maintenance coordinates work with permit authority; retains verification result, tool fitness and permit validity. | No Inventory request. | Manufacturing acknowledges the window for omitted shutdown job. | No Quality request. | No Procurement request. | Safety/HSE clears omitted shutdown job. | No Finance request. | Maintenance Manager approves the exact omitted shutdown job revision. | Verify actor, revision and chronology after omitted shutdown job. | Omitted shutdown job: contractor attribution loss within shutdown work. | Planned |
| ME-106 | Turnaround contractor mobilization | Safety/HSE Coordinator | Hazard-reviewed work package | Shutdown work coordination | Turnaround contractor mobilization: Maintenance coordinates work with permit authority; retains open exception, warranty basis and Finance dependency. | No Inventory request. | Manufacturing acknowledges the window for turnaround contractor mobilization. | No Quality request. | Procurement owns commercial action for turnaround contractor mobilization. | Safety/HSE clears turnaround contractor mobilization. | No Finance request. | Independent verification precedes closure of turnaround contractor mobilization. | Compare owning-domain responses; age turnaround contractor mobilization mismatches. | Turnaround contractor mobilization: overwritten calibration evidence after plan reactivation. | Planned |
| ME-107 | Restart readiness review | Safety/HSE Coordinator | Hazard-reviewed work package | Shutdown work coordination | Restart readiness review: Maintenance coordinates work with permit authority; retains condition constraint, work-center assignment and priority override. | No Inventory request. | Manufacturing acknowledges the window for restart readiness review. | No Quality request. | No Procurement request. | Safety/HSE clears restart readiness review. | No Finance request. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for restart readiness review. | Restart readiness review: unsafe conditional release under emergency pressure. | Planned |
| ME-108 | Break-glass containment | Safety/HSE Coordinator | Hazard-reviewed work package | Shutdown work coordination | Break-glass containment: Maintenance coordinates work with permit authority; retains formula version, Inventory response and contractor sponsor. | No Inventory request. | Manufacturing acknowledges the window for break-glass containment. | No Quality request. | No Procurement request. | Safety/HSE clears break-glass containment. | No Finance request. | Safety/HSE Coordinator approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for break-glass containment. | Break-glass containment: AI authority escalation while a hold remains. | Planned |
| ME-109 | Maintenance cost collection | Maintenance Manager | Accepted technical quantities | Maintenance closure or classification request | Maintenance cost collection: Maintenance submits technical evidence to its owner; retains source provenance, technical signature and warehouse request. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | Finance reviews maintenance cost collection evidence. | Maintenance Manager approves the exact maintenance cost collection revision. | Verify actor, revision and chronology after maintenance cost collection. | Maintenance cost collection: wrong reliability population after meter correction. | Planned |
| ME-110 | Repair-versus-capital review | Maintenance Manager | Accepted technical quantities | Maintenance closure or classification request | Repair-versus-capital review: Maintenance submits technical evidence to its owner; retains cost object, supplier reference and release constraints. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | Finance reviews repair-versus-capital review evidence. | Independent verification precedes closure of repair-versus-capital review. | Compare owning-domain responses; age repair-versus-capital review mismatches. | Repair-versus-capital review: unreconciled external cost during reliability refresh. | Planned |
| ME-111 | Work-order technical close | Maintenance Manager | Accepted technical quantities | Maintenance closure or classification request | Work-order technical close: Maintenance locks verified technical scope while financial status remains open; retains shutdown window, labor category and exception age. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | Finance reviews work-order technical close evidence. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for work-order technical close. | Work-order technical close: stale work-order scope following master change. | Planned |
| ME-112 | Work-order settlement | Maintenance Manager | Accepted technical quantities | Maintenance closure or classification request | Work-order settlement: Maintenance submits accepted quantities for Finance-owned settlement; retains Quality dependency, counter segment and Quality impact. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | Finance reviews work-order settlement evidence. | Maintenance Manager approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for work-order settlement. | Work-order settlement: omitted shutdown dependency at calibration review. | Planned |
| ME-113 | Asset retirement direction | Maintenance Manager | Accepted technical quantities | Maintenance closure or classification request | Asset retirement direction: Maintenance submits technical evidence to its owner; retains contract coverage, calibration status and schedule displacement. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | Finance reviews asset retirement direction evidence. | Maintenance Manager approves the exact asset retirement direction revision. | Verify actor, revision and chronology after asset retirement direction. | Asset retirement direction: warranty recovery loss during permit suspension. | Planned |
| ME-114 | Capital overhaul candidate | Maintenance Manager | Accepted technical quantities | Maintenance closure or classification request | Capital overhaul candidate: Maintenance submits technical evidence to its owner; retains original due date, reconciliation owner and root-cause case. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | Finance reviews capital overhaul candidate evidence. | Independent verification precedes closure of capital overhaul candidate. | Compare owning-domain responses; age capital overhaul candidate mismatches. | Capital overhaul candidate: cross-plant data exposure during technical closure. | Planned |
| ME-115 | Wrong cost-center correction | Maintenance Manager | Accepted technical quantities | Maintenance closure or classification request | Wrong cost-center correction: Maintenance submits technical evidence to its owner; retains installed configuration, safety clearance and instrument identity. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | Finance reviews wrong cost-center correction evidence. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for wrong cost-center correction. | Wrong cost-center correction: false equipment readiness during contractor execution. | Planned |
| ME-116 | Spare valuation reconciliation | Maintenance Manager | Accepted technical quantities | Maintenance closure or classification request | Spare valuation reconciliation: Maintenance submits technical evidence to its owner; retains equipment scope, downtime interval and task-list version. | Inventory validates or moves spare valuation reconciliation. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | Finance reviews spare valuation reconciliation evidence. | Maintenance Manager approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for spare valuation reconciliation. | Spare valuation reconciliation: unacknowledged Inventory effect during cost settlement. | Planned |
| ME-117 | External-service accrual request | Maintenance Manager | Accepted technical quantities | Maintenance closure or classification request | External-service accrual request: Maintenance submits technical evidence to its owner; retains order revision, failure observation and request causation. | No Inventory request. | No Manufacturing request. | No Quality request. | Procurement owns commercial action for external-service accrual request. | No Safety/HSE request. | Finance reviews external-service accrual request evidence. | Maintenance Manager approves the exact external-service accrual request revision. | Verify actor, revision and chronology after external-service accrual request. | External-service accrual request: premature production restart at service acceptance. | Planned |
| ME-118 | Cross-plant work assignment | Maintenance Manager | Accepted technical quantities | Maintenance closure or classification request | Cross-plant work assignment: Maintenance submits technical evidence to its owner; retains event chronology, component position and permit validity. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | Finance reviews cross-plant work assignment evidence. | Independent verification precedes closure of cross-plant work assignment. | Compare owning-domain responses; age cross-plant work assignment mismatches. | Cross-plant work assignment: unresolved Quality exposure at domain handoff. | Planned |
| ME-119 | AI maintenance recommendation | Maintenance Manager | Accepted technical quantities | Maintenance closure or classification request | AI maintenance recommendation: Maintenance submits technical evidence to its owner; retains individual actor, approval lineage and Finance dependency. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | Finance reviews ai maintenance recommendation evidence. | Emergency authority contains only; release needs normal approval. | Reconcile plan, actuals, condition and exceptions for ai maintenance recommendation. | AI maintenance recommendation: expired permit use inside a frozen schedule. | Future |
| ME-120 | AI autonomous release attempt | Maintenance Manager | Accepted technical quantities | Maintenance closure or classification request | AI autonomous release attempt: Maintenance rejects the unauthorized release and records a security event; retains meter basis, production window and priority override. | No Inventory request. | No Manufacturing request. | No Quality request. | No Procurement request. | No Safety/HSE request. | Finance reviews ai autonomous release attempt evidence. | Maintenance Manager approves; incompatible duties are checked. | Match source, equipment, requests and acknowledgements for ai autonomous release attempt. | AI autonomous release attempt: fabricated technician evidence when production resumes. | Future |

### 58.3 Maintenance RACI

Legend: A = accountable, R = responsible, C = consulted, and — = no assigned decision duty. Every activity has one A and one different R; no cell combines A/R.

| Role | Abbreviation |
|---|---|
| Architecture Board | AB |
| Maintenance Product Owner | MPO |
| Maintenance Director | MD |
| Asset Manager | AM |
| Reliability Manager | RM |
| Reliability Engineer | RE |
| Maintenance Manager | MM |
| Maintenance Planner | MP |
| Maintenance Scheduler | MS |
| Maintenance Supervisor | MSV |
| Technician | TECH |
| Metrology | MET |
| Engineering | ENG |
| Production Manager | PM |
| Production Supervisor | PS |
| Operator | OP |
| Inventory | INV |
| Warehouse | WH |
| Procurement | PROC |
| Supplier Management | SUP |
| Quality | QUAL |
| Finance | FIN |
| Cost Accountant | CA |
| Safety/HSE | HSE |
| Contractor Manager | CM |
| Security | SEC |
| Data Governance | DG |
| Integration | INT |
| Reporting | REP |
| Internal Audit | IA |
| Operations | OPS |

| Activity | AB | MPO | MD | AM | RM | RE | MM | MP | MS | MSV | TECH | MET | ENG | PM | PS | OP | INV | WH | PROC | SUP | QUAL | FIN | CA | HSE | CM | SEC | DG | INT | REP | IA | OPS |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Approve Maintenance architecture | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Maintain Maintenance roadmap | — | A | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Approve equipment governance policy | — | C | — | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Register equipment identity | — | C | — | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Publish functional-location hierarchy | — | C | — | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Approve component-history correction | — | C | — | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Approve asset criticality | — | C | — | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Publish maintenance strategy | — | C | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Publish maintenance plan | — | C | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Approve PM deferral | — | C | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Approve skipped PM | — | C | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Publish task-list version | — | C | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Submit maintenance request | — | C | — | — | — | — | A | — | — | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Triage maintenance request | — | C | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Create maintenance notification | — | C | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Assign maintenance priority | — | C | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Declare breakdown | — | C | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Create work order | — | C | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Plan work-order scope | — | C | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Approve work-order release | — | C | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Schedule ready work | — | C | — | — | — | — | A | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Dispatch technician | — | C | — | — | — | — | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Execute work-order operation | — | C | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Confirm technician labor | — | C | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Verify work completion | — | C | — | — | — | — | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Issue equipment hold | — | C | — | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Approve equipment release | — | C | — | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Decide production restart | — | C | — | — | — | — | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Record downtime | — | C | — | — | — | — | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Approve downtime correction | — | C | — | — | — | — | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Classify failure mode | — | C | — | — | — | — | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Verify root cause | — | C | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Review repeat failure | — | C | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Approve reliability formula | — | C | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Review bad actor | — | C | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Publish measurement point | — | C | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Capture meter reading | — | C | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Approve meter correction | — | C | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Review condition alarm | — | C | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Review predictive recommendation | — | C | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Publish calibration schedule | — | C | — | — | — | — | — | — | — | — | R | A | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Execute calibration | — | C | — | — | — | — | — | — | — | — | R | A | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Approve instrument status | — | C | — | — | — | — | — | — | — | — | R | A | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Assess Quality impact | — | C | — | — | — | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | A | — | — | — | — | C | — | — | — | — | — |
| Plan spare requirement | — | C | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Execute spare reservation | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Execute spare issue | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Execute spare return | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Approve spare substitution fitness | — | C | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Control tool checkout | — | C | — | — | — | — | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Accept external technical service | — | C | — | — | — | — | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Approve supplier commercial action | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | R | — | — | — | — | — | C | — | — | — | — | — |
| Sponsor contractor access | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | R | A | — | — | — | — | — |
| Revoke contractor access | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | R | A | — | — | — | — | — |
| Approve permit-to-work | — | C | — | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | C | — | — | — | — | — |
| Verify safety isolation | — | C | — | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | C | — | — | — | — | — |
| Coordinate shutdown package | — | C | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Approve shutdown scope change | — | C | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Decide shutdown restart | — | C | — | — | — | — | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Confirm maintenance cost evidence | — | C | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Post maintenance cost | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | R | — | — | C | — | — | — | — | — |
| Classify repair versus capital | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | R | — | — | C | — | — | — | — | — |
| Settle work order | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | R | — | — | C | — | — | — | — | — |
| Reconcile Maintenance to Inventory | — | C | — | — | — | — | R | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Reconcile Maintenance to Manufacturing | — | C | — | — | — | — | R | — | — | — | — | — | — | A | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Reconcile Maintenance to Quality | — | C | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | — | C | — | — | — | — | — |
| Reconcile Maintenance to Procurement | — | C | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — | — | C | — | — | — | — | — |
| Reconcile Maintenance to Finance | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | R | — | — | C | — | — | — | — | — |
| Publish maintenance measure | — | C | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | A | — | — |
| Review Maintenance access | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | R | — |
| Review break-glass use | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | R | — |
| Investigate maintenance threat | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | R | — |
| Approve retention policy | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — |
| Approve legacy equipment migration | — | C | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | A | — | — | — | — |
| Audit Maintenance controls | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | R | — | — | — | A | — |

### 58.4 Current-versus-target evidence matrix

| Concern | Current repository evidence | Current classification | Target FCSB-020 contract |
|---|---|---|---|
| Organization | Plant, Department, Location, CostCenter and organization-scope services | Implemented foundation | Maintenance plant, planning authority, work center, crew and delegated release scope |
| Technical objects | Manufacturer and SerialNumber masters; ASSET seed registration | Foundation plus registered metadata | Versioned functional location, equipment, installed-component and technical-history aggregates |
| Spares | Item.isMaintenanceSpare, seeded spare group/category/warehouse | Foundation plus registered metadata | Maintenance demand contracts reconciled to Inventory reservation, issue, return and serial custody |
| Work management | Generic transaction kinds/documents, workflow and approvals | Scaffold and registered metadata | Request, notification, order, planning, scheduling, dispatch, execution, verification and release lifecycles |
| Reliability | No dedicated model, service, route or accepted test | Planned | Failure populations, formula versions, MTBF/MTTR, availability, bad actors and health evidence |
| Calibration | No calibration aggregate; Quality architecture defines the boundary | Planned | Metrology-owned instrument state and versioned Quality impact request/acknowledgement |
| Costing | CostCenter and generic finance scaffold | Foundation and scaffold | Maintenance quantities sent to Finance-owned rates, posting, capitalization and settlement |
| Predictive/mobile | No sensor, model, mobile or offline maintenance runtime | Future | Provenance-rich advisory signals and provisional offline evidence with no autonomous authority |

## 59. Architecture Decisions and Open Decisions

Architecture decisions establish non-negotiable ownership and lifecycle separations, while proposed choices remain subject to review. Each rationale names the maintenance consequence and rejects a concrete unsafe alternative such as conflating release with restart or completion with settlement.

Open decisions are not silently answered by this draft. Every item names the evidence required—schemas, authority matrices, state-transition tests, reconciliation cases, formula examples or threat analysis—before the accountable forum can resolve it.

**Controlled concepts:** ADR register; decision status; rationale; unsafe alternative; open decision; evidence gate; accountable forum.

### 59.1 Maintenance architecture decision register

Entries are Proposed unless explicitly Deferred. They require architecture approval and do not authorize implementation.

| ADR | Decision | Status | Maintenance-specific rationale and unsafe alternative rejected |
|---|---|---|---|
| MADR-001 | Maintenance owns equipment condition | Proposed | Equipment condition needs one technical authority and a traceable state history. Reject allowing production, stock or accounting convenience to set equipment condition.  |
| MADR-002 | Maintenance owns maintenance hold | Proposed | A Maintenance hold records a technical restriction with explicit scope and criteria. Reject using a Manufacturing stop or Inventory block as an undocumented substitute.  |
| MADR-003 | Maintenance owns equipment return-to-service | Proposed | Return-to-service depends on verified repair, tests and open defects. Reject equating technician completion with accountable equipment readiness.  |
| MADR-004 | Manufacturing owns production restart | Proposed | Only Manufacturing can assess orders, WIP, labor and production windows before restart. Reject Maintenance changing production execution state after release.  |
| MADR-005 | Quality owns product and inspection disposition | Proposed | Inspection fitness and product disposition depend on Quality evidence. Reject Maintenance clearing product or inspection restrictions while repairing equipment.  |
| MADR-006 | Inventory owns spare movement | Proposed | Inventory must validate stock, batch, serial, location and valuation for every spare movement. Reject Maintenance decrementing quantity from a work order.  |
| MADR-007 | Finance owns maintenance posting | Proposed | Finance applies rates, periods, accounts and settlement policy to accepted maintenance evidence. Reject a breakdown or completion event generating an automatic journal.  |
| MADR-008 | Procurement owns supplier commercial action | Proposed | Procurement controls supplier approval, purchase orders, contracts and claims. Reject Maintenance turning technical preference into a commercial commitment.  |
| MADR-009 | Safety owns permit and isolation authorization | Proposed | Safety/HSE owns permit and isolation authority where configured. Reject an order status or supervisor note self-authorizing hazardous work.  |
| MADR-010 | Work request does not equal work order | Proposed | A request states reported need; an order authorizes governed execution. Reject converting an unassessed symptom directly into released work.  |
| MADR-011 | Notification does not equal work order | Proposed | A notification preserves technical assessment and failure evidence before planning. Reject collapsing it into an order and losing diagnostic history.  |
| MADR-012 | Work-order completion does not equal equipment release | Proposed | Completion proves tasks were reported; release requires separate verification of equipment condition. Reject a completion button making equipment available.  |
| MADR-013 | Equipment release does not equal production restart | Proposed | Maintenance release supplies readiness evidence, while Manufacturing decides operational restart. Reject sending a release command that resumes production automatically.  |
| MADR-014 | Spare requirement does not equal reservation | Proposed | A spare requirement is a planning estimate without stock commitment. Reject displaying planned quantity as reserved availability.  |
| MADR-015 | Reservation does not equal issue | Proposed | Reservation allocates stock; issue records an authoritative physical movement. Reject treating allocation acknowledgement as consumption or installation.  |
| MADR-016 | Maintenance completion does not equal Finance settlement | Proposed | Technical completion leaves rates, accruals, periods and classification unresolved. Reject marking a work order financially settled from Maintenance.  |
| MADR-017 | Calibration completion does not equal Quality acceptance of historical results | Proposed | Calibration establishes instrument state; Quality determines effects on inspections and product. Reject a calibration pass/fail rewriting historical inspection acceptance.  |
| MADR-018 | Failure code does not equal root cause | Proposed | Failure codes classify observations and hypotheses, not proven causality. Reject closing root-cause analysis from a selected cause code alone.  |
| MADR-019 | Asset hierarchy is versioned | Proposed | Versioned hierarchy preserves where equipment and components belonged at each event. Reject overwriting parent links and reinterpreting historical work.  |
| MADR-020 | Equipment installation and removal are historical | Proposed | Installation and removal events establish configuration chronology and custody handoff. Reject updating only the current component pointer.  |
| MADR-021 | Technical history is immutable | Proposed | Append-only technical history supports audit, reliability and warranty reconstruction. Reject deleting or replacing unfavorable work, readings or failures.  |
| MADR-022 | PM plan versions are preserved | Proposed | Every PM call must retain the plan version and calculation inputs used. Reject recalculating prior calls under the newest plan.  |
| MADR-023 | PM deferral requires authority | Proposed | Deferral changes exposure and requires scoped authority, expiry and compensating controls. Reject editing the due date to hide overdue work.  |
| MADR-024 | Skipped PM is explicit | Proposed | An approved skip remains a visible lifecycle outcome with reason. Reject deleting the call or marking unperformed work complete.  |
| MADR-025 | Equipment criticality is versioned | Proposed | Criticality changes influence strategy, priority and spares, so factor lineage must persist. Reject replacing historical class values in place.  |
| MADR-026 | Equipment hold scope is explicit | Proposed | Hold scope identifies affected equipment, components and conditions. Reject a plant-wide Boolean that cannot express partial or conditional restriction.  |
| MADR-027 | Competing holds are preserved | Proposed | Maintenance, Safety and Quality restrictions can coexist independently. Reject clearing every restriction when one owner releases its hold.  |
| MADR-028 | Conditional release is explicit | Proposed | Conditional release must carry operating limits, expiry and recipient acknowledgement. Reject conveying constraints only in technician free text.  |
| MADR-029 | Breakdown start and end are evidence-based | Proposed | Evidence-based malfunction timestamps protect downtime and reliability measures. Reject planners backdating intervals to improve performance metrics.  |
| MADR-030 | Downtime categories are separate | Proposed | Separate downtime categories explain active repair and waiting causes. Reject one undifferentiated duration that masks material, permit or vendor delay.  |
| MADR-031 | Maintenance downtime does not equal production loss | Proposed | Manufacturing determines actual lost production from schedules and capacity. Reject reporting every Maintenance downtime minute as production loss.  |
| MADR-032 | Technician time does not equal payroll posting | Proposed | Maintenance confirms technical time while Payroll applies compensation policy. Reject technician confirmation becoming automatic payroll approval.  |
| MADR-033 | External service completion does not equal invoice approval | Proposed | Maintenance accepts technical deliverables; Procurement and AP validate commercial and invoice conditions. Reject service completion approving payment.  |
| MADR-034 | Warranty eligibility does not equal supplier claim | Proposed | Technical eligibility provides evidence for a Procurement-owned claim. Reject Maintenance creating a supplier receivable from a warranty flag.  |
| MADR-035 | Maintenance cannot directly write Inventory | Proposed | Inventory authorization, quantity, serial and valuation controls cannot be bypassed. Reject direct Prisma or API stock updates from Maintenance code.  |
| MADR-036 | Maintenance cannot directly restart Manufacturing | Proposed | Production state belongs to Manufacturing even after equipment release. Reject a Maintenance adapter writing restart or operation status.  |
| MADR-037 | Maintenance cannot directly release a Quality hold | Proposed | Quality restrictions survive Maintenance repair until Quality decides disposition. Reject equipment release clearing a product hold.  |
| MADR-038 | Maintenance cannot directly post Finance | Proposed | Posting and settlement require Finance rules and closed-period controls. Reject Maintenance writing journals, accruals or asset values.  |
| MADR-039 | Tool and calibration status remain owning-domain authoritative | Proposed | The domain that owns a tool or calibration state remains authoritative. Reject a copied status on the work order being treated as current truth.  |
| MADR-040 | Out-of-tolerance calibration triggers Quality impact assessment | Proposed | Failed calibration creates a suspect measurement interval requiring Quality assessment. Reject Maintenance unilaterally declaring affected inspections valid.  |
| MADR-041 | Predictive maintenance output is advisory | Deferred | Predictions carry confidence and model lineage but remain planning advice. Reject a model directly creating approved or dispatched work.  |
| MADR-042 | Sensor events are untrusted until validated | Deferred | Sensor identity, time, unit and integrity must be validated before use. Reject raw telemetry changing equipment condition or due dates.  |
| MADR-043 | AI cannot approve work orders | Proposed | Order approval is a consequential human or deterministic-policy act. Reject AI elevating its recommendation into approval.  |
| MADR-044 | AI cannot release equipment | Proposed | Equipment release requires verified technical evidence and accountable authority. Reject AI changing readiness from a health score.  |
| MADR-045 | AI cannot restart production | Proposed | Manufacturing restart depends on production context outside the model. Reject AI issuing a restart after a maintenance prediction.  |
| MADR-046 | AI cannot issue spares | Proposed | Inventory must control allocation and movement of spares. Reject AI converting predicted demand into an issued quantity.  |
| MADR-047 | AI cannot approve calibration impact | Proposed | Quality owns impact on inspection evidence and product. Reject AI closing a calibration-impact case from statistical confidence.  |
| MADR-048 | AI cannot post costs | Proposed | Finance owns rates, accounts, periods and classification. Reject AI turning maintenance estimates into posted cost.  |
| MADR-049 | Current asset and equipment-like fields are foundations only | Proposed | Current fields, enums and seed registrations are narrow anchors only. Reject labeling them an equipment, work-order or reliability runtime.  |
| MADR-050 | FCSB-020 does not authorize implementation | Proposed | This draft records proposed architecture pending named reviews. Reject beginning schema or service implementation solely because the volume exists.  |
| MADR-051 | Functional location is distinct from organization location | Proposed | Organization Location and Functional Location have different purpose and history. Reject reusing organization nodes as installation positions without a governed mapping.  |
| MADR-052 | Equipment is distinct from fixed asset | Proposed | Equipment condition and accounting recognition evolve independently. Reject making FixedAsset the Maintenance aggregate or retiring both together automatically.  |
| MADR-053 | Equipment is distinct from Inventory serial | Proposed | Inventory serial identifies stock custody; equipment identifies a maintainable installed unit. Reject assuming every serialized item is active equipment.  |
| MADR-054 | Machine resource is distinct from equipment | Proposed | Manufacturing resource describes capacity and execution; equipment describes condition and maintenance history. Reject a shared mutable status field.  |
| MADR-055 | As-maintained hierarchy is event-derived | Proposed | Installed configuration must be reconstructed from valid installation/removal events. Reject storing only an unversioned current-child collection.  |
| MADR-056 | Backdated installation requires overlap validation | Proposed | Backdated changes can create impossible overlapping configurations. Reject accepting them without timeline validation and independent review.  |
| MADR-057 | Criticality score retains factor lineage | Proposed | Criticality must retain factor inputs, scale, rationale and version. Reject an unexplained score that cannot support strategy review.  |
| MADR-058 | Run-to-failure is an approved strategy | Proposed | Run-to-failure is acceptable only with documented consequence, redundancy and spare assumptions. Reject treating missing PM as an implicit strategy.  |
| MADR-059 | PM calls preserve calculation basis | Proposed | A generated PM call must snapshot cycle, counter/calendar input and shift policy. Reject deriving history from the current plan at report time.  |
| MADR-060 | Frozen schedule changes are explicit | Proposed | Frozen schedule changes affect commitments and displaced risk. Reject overwriting assignments without reason, approver and displaced-work visibility.  |
| MADR-061 | Task-list use snapshots its version | Proposed | Execution must retain the released task-list version and attachments. Reject showing technicians a mutable latest instruction.  |
| MADR-062 | Emergency authority permits containment only | Proposed | Emergency authority enables safe containment, not release or financial effects. Reject a broad emergency role that bypasses permits and SoD.  |
| MADR-063 | Order revisions trigger proportional reapproval | Proposed | Material scope changes after approval require proportionate revalidation. Reject technicians expanding high-risk work under the original approval.  |
| MADR-064 | Dispatch does not create labor evidence | Proposed | Dispatch assigns and requests acknowledgement; it does not prove labor began. Reject creating time from a supervisor's assignment timestamp.  |
| MADR-065 | Offline execution is provisional | Proposed | Offline entries remain provisional until identity, order revision and sequence reconcile. Reject last-write-wins synchronization of maintenance evidence.  |
| MADR-066 | Technician completion requires independent verification where controlled | Proposed | Controlled work needs verification separate from the performer. Reject a technician self-releasing equipment after recording completion.  |
| MADR-067 | Spare substitution requires technical fitness review | Proposed | Substitute spares require technical equivalence and Inventory-controlled issue. Reject warehouse availability alone determining fitness.  |
| MADR-068 | Rotable custody reconciles with Inventory | Proposed | Rotable installation/removal must reconcile installed position with off-equipment Inventory custody. Reject independent histories that lose the serialized unit.  |
| MADR-069 | Contractor identity is individual and sponsored | Proposed | Contractor actions require a sponsored individual identity and scoped expiry. Reject shared supplier accounts that erase personal attribution.  |
| MADR-070 | Maintenance accepts technical service only | Proposed | Maintenance may accept service scope and technical result only. Reject that acceptance changing supplier approval or invoice status.  |
| MADR-071 | Equipment release names the installed configuration | Proposed | Release must identify the as-maintained configuration actually verified. Reject releasing a parent asset while component swaps remain unreconciled.  |
| MADR-072 | Failure cause remains provisional until verified | Proposed | Cause remains suspected until evidence verifies and alternatives are considered. Reject changing a provisional code into root cause through closure.  |
| MADR-073 | Reliability formulas are versioned | Proposed | Reliability measures must preserve population, clocks, exclusions and formula version. Reject a dashboard calculation with hidden mutable assumptions.  |
| MADR-074 | Meter corrections append rather than overwrite | Proposed | Meter corrections retain original and corrected readings with reason. Reject overwriting the value used for a prior PM call.  |
| MADR-075 | Counter rollover creates a new segment | Proposed | Rollover, reset and replacement create explicit counter segments. Reject subtracting across discontinuities as if the counter were monotonic.  |
| MADR-076 | Asset-health score is decomposable | Deferred | A health score must expose indicators, weights, confidence and version. Reject an opaque score authorizing work or release.  |
| MADR-077 | Condition alarms create recommendations only | Proposed | Condition alarms can recommend inspection or a request after human review. Reject threshold events directly approving orders or stopping production.  |
| MADR-078 | Calibration certificates require provenance | Proposed | Certificates require supplier, standard, method, result and integrity provenance. Reject trusting an attachment merely because its filename says certificate.  |
| MADR-079 | Warranty recovery remains Procurement-owned | Proposed | Procurement owns claim submission, negotiation and recovery. Reject Maintenance closing warranty based only on technical eligibility.  |
| MADR-080 | Repair-versus-capitalization remains Finance-owned | Proposed | Finance decides expense, capitalization and depreciation effects using Maintenance evidence. Reject technical closure classifying an overhaul as capital.  |

### 59.2 Open-decision register

No open item is resolved by implication. The named evidence must be reviewed by the accountable forum before solution design approval.

| Open decision | Decision topic | Evidence required before resolution | Accountable forum |
|---|---|---|---|
| MOD-001 | Asset model | Asset model: require technical identity, category, ownership, condition and accounting-reference separation; include authority matrix and negative authorization tests, failure recovery, and a offline example. | Architecture Board and Maintenance |
| MOD-002 | Fixed-asset reference model | Fixed-asset reference model: require reference cardinality, capitalization ownership and retirement linkage; include request and acknowledgement payloads, aged exception ownership, and a breakdown example. | Architecture Board and Maintenance |
| MOD-003 | Functional-location model | Functional-location model: require parent compatibility, code stability, move history and installation points; include formula grain and worked histories, manual review path, and a emergency example. | Architecture Board and Maintenance |
| MOD-004 | Equipment model | Equipment model: require manufacturer serial duplicates, category attributes and plant ownership; include tenant and plant threat analysis, purpose-bound approval, and a deferred-work example. | Architecture Board and Maintenance |
| MOD-005 | Equipment status model | Equipment status model: require transition guards, competing holds, release reversal and decommissioning; include routine and breakdown scenarios, rollback totals, and a backdated-event example. | Architecture Board and Maintenance |
| MOD-006 | Component hierarchy | Component hierarchy: require installation overlap, removal condition, swap chronology and as-maintained replay; include migration and duplicate-resolution mapping, individual attribution, and a shutdown example. | Architecture Board and Maintenance |
| MOD-007 | Rotable model | Rotable model: require off-equipment custody, repair loop, serial identity and fitted-position reconciliation; include role-owned acceptance criteria, capacity evidence, and a negative permission example. | Architecture Board, Maintenance and Inventory |
| MOD-008 | Serialized component model | Serialized component model: require serial authority, installation position, removed-part custody and swap history; include state-transition and concurrency tests, idempotency correlation, and a calibration example. | Architecture Board and Maintenance |
| MOD-009 | Criticality model | Criticality model: require factor scales, redundancy, consequence weights, approval and revision triggers; include effective-date and backdated corrections, service objectives, and a reconciliation example. | Architecture Board and Maintenance |
| MOD-010 | Maintenance strategy model | Maintenance strategy model: require run-to-failure rationale, applicability, effective dates and mandatory-work precedence; include outage retry and reconciliation cases, destruction holds, and a contractor example. | Architecture Board, Reliability, Security and AI Governance |
| MOD-011 | Maintenance plan model | Maintenance plan model: require cycle, counter, horizon, tolerance, freeze and next-call calculations; include contractor and offline abuse tests, configuration snapshots, and a migration example. | Architecture Board, Reliability, Security and AI Governance |
| MOD-012 | PM call model | PM call model: require calendar and usage basis, duplicate prevention, deferral and completion replay; include retention and legal-review assumptions, late-event restatement, and a cross-plant example. | Architecture Board and Maintenance |
| MOD-013 | PM defer and skip policy | PM defer and skip policy: require original due date, exposure, expiry, compensating control and approver authority; include observability and support ownership, guarded terminal states, and a routine example. | Architecture Board and Maintenance |
| MOD-014 | Task-list model | Task-list model: require operation sequence, skills, tools, spares, safety steps and version snapshot; include data-quality and provenance thresholds, operational runbooks, and a offline example. | Architecture Board and Maintenance |
| MOD-015 | Request model | Request model: require reporter identity, symptoms, duplicate detection, urgency and triage outcomes; include accessibility and exception workflow, independent verification, and a breakdown example. | Architecture Board and Maintenance |
| MOD-016 | Notification model | Notification model: require malfunction chronology, provisional codes, impacts and order conversion links; include performance workload assumptions, cross-scope isolation, and a emergency example. | Architecture Board and Maintenance |
| MOD-017 | Priority model | Priority model: require criticality inputs, impact dimensions, override expiry and escalation behavior; include canonical schema and uniqueness cases, historical replay, and a deferred-work example. | Architecture Board and Maintenance |
| MOD-018 | Work-order aggregate | Work-order aggregate: require aggregate invariants, revisions, prerequisites, closure and cancellation evidence; include authority matrix and negative authorization tests, source confidence, and a backdated-event example. | Architecture Board and Maintenance |
| MOD-019 | Work-order state model | Work-order state model: require aggregate invariants, revisions, prerequisites, closure and cancellation evidence; include request and acknowledgement payloads, immutable identity lineage, and a shutdown example. | Architecture Board and Maintenance |
| MOD-020 | Planning model | Planning model: require job scope, operation estimates, skills, spares, permits and revision approval; include formula grain and worked histories, failure recovery, and a negative permission example. | Architecture Board and Maintenance |
| MOD-021 | Scheduling model | Scheduling model: require ready backlog, frozen horizons, crew capacity, displacement and adherence; include tenant and plant threat analysis, aged exception ownership, and a calibration example. | Architecture Board and Maintenance |
| MOD-022 | Dispatch model | Dispatch model: require assignment acknowledgement, reallocation, start permission and device identity; include routine and breakdown scenarios, manual review path, and a reconciliation example. | Architecture Board and Maintenance |
| MOD-023 | Technician execution model | Technician execution model: require offline chronology, signatures, findings, measurements and correction review; include migration and duplicate-resolution mapping, purpose-bound approval, and a contractor example. | Architecture Board and Maintenance |
| MOD-024 | Labor-reporting model | Labor-reporting model: require time categories, crew attribution, overtime boundary and payroll separation; include role-owned acceptance criteria, rollback totals, and a migration example. | Architecture Board and Maintenance |
| MOD-025 | Spare planning contract | Spare planning contract: require item alternatives, quantity, UOM, required date and shortage response; include state-transition and concurrency tests, individual attribution, and a cross-plant example. | Architecture Board, Maintenance and Inventory |
| MOD-026 | Reservation contract | Reservation contract: require idempotent request, allocation acknowledgement, expiry and cancellation; include effective-date and backdated corrections, capacity evidence, and a routine example. | Architecture Board, Maintenance and Inventory |
| MOD-027 | Issue contract | Issue contract: require batch/serial movement, reversal, return and fitted-use reconciliation; include outage retry and reconciliation cases, idempotency correlation, and a offline example. | Architecture Board, Maintenance and Inventory |
| MOD-028 | Tool model | Tool model: require checkout, condition, calibration eligibility, damage and return custody; include contractor and offline abuse tests, service objectives, and a breakdown example. | Architecture Board, Maintenance and Inventory |
| MOD-029 | External-service contract | External-service contract: require technical scope, service report, acceptance and invoice boundary; include retention and legal-review assumptions, destruction holds, and a emergency example. | Architecture Board, Maintenance, Procurement and Security |
| MOD-030 | Contractor model | Contractor model: require qualification, sponsorship, plant scope, permit and access revocation; include observability and support ownership, configuration snapshots, and a deferred-work example. | Architecture Board, Maintenance, Procurement and Security |
| MOD-031 | Breakdown model | Breakdown model: require declaration, malfunction start/end, emergency dispatch and restoration evidence; include data-quality and provenance thresholds, late-event restatement, and a backdated-event example. | Architecture Board and Maintenance |
| MOD-032 | Equipment-hold model | Equipment-hold model: require population scope, competing restrictions, acknowledgement and review expiry; include accessibility and exception workflow, guarded terminal states, and a shutdown example. | Architecture Board and Maintenance |
| MOD-033 | Equipment-release model | Equipment-release model: require verification, conditions, installed configuration and reversal; include performance workload assumptions, operational runbooks, and a negative permission example. | Architecture Board and Maintenance |
| MOD-034 | Manufacturing restart contract | Manufacturing restart contract: require Maintenance release reference, production authority and window acknowledgement; include canonical schema and uniqueness cases, independent verification, and a calibration example. | Architecture Board and Maintenance |
| MOD-035 | Downtime taxonomy | Downtime taxonomy: require category precedence, interval overlap, correction and production-loss boundary; include authority matrix and negative authorization tests, cross-scope isolation, and a reconciliation example. | Architecture Board and Maintenance |
| MOD-036 | Failure-code taxonomy | Failure-code taxonomy: require taxonomy hierarchy, applicability, provisional cause and version retention; include request and acknowledgement payloads, historical replay, and a contractor example. | Architecture Board, Reliability, Security and AI Governance |
| MOD-037 | Root-cause model | Root-cause model: require hypotheses, disconfirming evidence, verification and action effectiveness; include formula grain and worked histories, source confidence, and a migration example. | Architecture Board and Maintenance |
| MOD-038 | Reliability model | Reliability model: require population, clocks, exclusions, censored data and formula versions; include tenant and plant threat analysis, immutable identity lineage, and a cross-plant example. | Architecture Board and Maintenance |
| MOD-039 | MTBF and MTTR formulas | MTBF and MTTR formulas: require failure qualification, operating time, repair interval and worked calculations; include routine and breakdown scenarios, failure recovery, and a routine example. | Architecture Board, Maintenance, Reliability and Finance |
| MOD-040 | Asset-health model | Asset-health model: require indicator decomposition, confidence, thresholds and history; include migration and duplicate-resolution mapping, aged exception ownership, and a offline example. | Architecture Board and Maintenance |
| MOD-041 | Measurement-point model | Measurement-point model: require characteristic, unit, range, source, correction and trigger; include role-owned acceptance criteria, manual review path, and a breakdown example. | Architecture Board and Maintenance |
| MOD-042 | Meter model | Meter model: require reading attribution, replacement, reset and unit continuity; include state-transition and concurrency tests, purpose-bound approval, and a emergency example. | Architecture Board and Maintenance |
| MOD-043 | Counter model | Counter model: require monotonic segments, rollover, correction and usage-call linkage; include effective-date and backdated corrections, rollback totals, and a deferred-work example. | Architecture Board and Maintenance |
| MOD-044 | Condition-monitoring model | Condition-monitoring model: require threshold, trend, false alarm, missed signal and human review; include outage retry and reconciliation cases, individual attribution, and a backdated-event example. | Architecture Board and Maintenance |
| MOD-045 | Predictive-maintenance model | Predictive-maintenance model: require training lineage, confidence, drift, false outcomes and advisory-only policy; include contractor and offline abuse tests, capacity evidence, and a shutdown example. | Architecture Board, Reliability, Security and AI Governance |
| MOD-046 | Calibration model | Calibration model: require schedule, standards, as-found/as-left, certificate and instrument status; include retention and legal-review assumptions, idempotency correlation, and a negative permission example. | Architecture Board, Maintenance, Metrology and Quality |
| MOD-047 | Quality impact contract | Quality impact contract: require suspect interval, affected inspection search, hold and reinspection acknowledgement; include observability and support ownership, service objectives, and a calibration example. | Architecture Board, Maintenance, Metrology and Quality |
| MOD-048 | Warranty model | Warranty model: require coverage dates, exclusions, evidence preservation and commercial claim separation; include data-quality and provenance thresholds, destruction holds, and a reconciliation example. | Architecture Board, Maintenance, Procurement and Security |
| MOD-049 | Maintenance-contract model | Maintenance-contract model: require asset coverage, response targets, visits, expiry and Procurement ownership; include accessibility and exception workflow, configuration snapshots, and a contractor example. | Architecture Board, Reliability, Security and AI Governance |
| MOD-050 | Shutdown model | Shutdown model: require asset scope, dependencies, permits, materials, progress and restart gates; include performance workload assumptions, late-event restatement, and a migration example. | Architecture Board and Maintenance |
| MOD-051 | Permit model | Permit model: require hazards, isolation, issuer/receiver, validity, suspension and closure; include canonical schema and uniqueness cases, guarded terminal states, and a cross-plant example. | Architecture Board, Maintenance and Safety/HSE |
| MOD-052 | Safety integration | Safety integration: require policy ownership, energy isolation, hazardous work and emergency coordination; include authority matrix and negative authorization tests, operational runbooks, and a routine example. | Architecture Board, Maintenance and Safety/HSE |
| MOD-053 | Maintenance costing contract | Maintenance costing contract: require labor, spare, service quantities, cost objects, rates and posting acknowledgement; include request and acknowledgement payloads, independent verification, and a offline example. | Architecture Board, Maintenance, Reliability and Finance |
| MOD-054 | Capitalization contract | Capitalization contract: require repair evidence, betterment indicators, Finance decision and depreciation boundary; include formula grain and worked histories, cross-scope isolation, and a breakdown example. | Architecture Board, Maintenance, Reliability and Finance |
| MOD-055 | Reporting model | Reporting model: require measure grain, formula owner, late events, restatement and read-only access; include tenant and plant threat analysis, historical replay, and a emergency example. | Architecture Board and Maintenance |
| MOD-056 | Reconciliation model | Reconciliation model: require expected versus actual state, correlation, aging, owner and correction; include routine and breakdown scenarios, source confidence, and a deferred-work example. | Architecture Board and Maintenance |
| MOD-057 | Retention model | Retention model: require record classes, legal review, holds, archive and destruction authority; include migration and duplicate-resolution mapping, immutable identity lineage, and a backdated-event example. | Architecture Board and Maintenance |
| MOD-058 | AI boundary | AI boundary: require recommendation provenance, prohibited actions, human review and abuse tests; include role-owned acceptance criteria, failure recovery, and a shutdown example. | Architecture Board, Reliability, Security and AI Governance |
| MOD-059 | Maintenance-plant authority model | Maintenance-plant authority model: require company and plant scope, local release authority, delegation and cross-plant denial; include state-transition and concurrency tests, aged exception ownership, and a negative permission example. | Architecture Board, Reliability, Security and AI Governance |
| MOD-060 | Planning-plant delegation | Planning-plant delegation: require central planning reach, local execution approval, expiry and workload ownership; include effective-date and backdated corrections, manual review path, and a calibration example. | Architecture Board and Maintenance |
| MOD-061 | Work-center and crew model | Work-center and crew model: require crew membership, skill capacity, shift validity and dispatch accountability; include outage retry and reconciliation cases, purpose-bound approval, and a reconciliation example. | Architecture Board and Maintenance |
| MOD-062 | Technician qualification model | Technician qualification model: require method, equipment, site and permit competence with effective expiry; include contractor and offline abuse tests, rollback totals, and a contractor example. | Architecture Board and Maintenance |
| MOD-063 | Equipment duplicate policy | Equipment duplicate policy: require manufacturer serial matching, alias handling, merge review and surviving identity; include retention and legal-review assumptions, individual attribution, and a migration example. | Architecture Board and Maintenance |
| MOD-064 | Installation-history correction | Installation-history correction: require overlap prevention, backdated correction, work-order provenance and replay; include observability and support ownership, capacity evidence, and a cross-plant example. | Architecture Board and Maintenance |
| MOD-065 | Critical-spare classification | Critical-spare classification: require equipment applicability, lead-time consequence, substitution and Inventory ownership; include data-quality and provenance thresholds, idempotency correlation, and a routine example. | Architecture Board, Maintenance and Inventory |
| MOD-066 | PM freeze horizon | PM freeze horizon: require horizon calculation, protected calls, override authority and displaced-work visibility; include accessibility and exception workflow, service objectives, and a offline example. | Architecture Board and Maintenance |
| MOD-067 | Emergency work policy | Emergency work policy: require containment authority, minimum permit controls, retrospective planning and review; include performance workload assumptions, destruction holds, and a breakdown example. | Architecture Board and Maintenance |
| MOD-068 | Order revision policy | Order revision policy: require material change criteria, revalidation, approval scope and technician notification; include canonical schema and uniqueness cases, configuration snapshots, and a emergency example. | Architecture Board and Maintenance |
| MOD-069 | Offline execution policy | Offline execution policy: require device identity, local sequence, conflict handling and provisional evidence; include authority matrix and negative authorization tests, late-event restatement, and a deferred-work example. | Architecture Board and Maintenance |
| MOD-070 | Contractor access policy | Contractor access policy: require qualification, sponsorship, plant scope, permit and access revocation; include request and acknowledgement payloads, guarded terminal states, and a backdated-event example. | Architecture Board, Maintenance, Procurement and Security |
| MOD-071 | Service acceptance evidence | Service acceptance evidence: require technical deliverables, verification, rejected evidence and invoice separation; include formula grain and worked histories, operational runbooks, and a shutdown example. | Architecture Board, Maintenance, Procurement and Security |
| MOD-072 | Conditional release policy | Conditional release policy: require operating constraints, expiry, recipient acknowledgement and reversal; include tenant and plant threat analysis, independent verification, and a negative permission example. | Architecture Board and Maintenance |
| MOD-073 | Break-glass policy | Break-glass policy: require safe containment purpose, duration, monitoring and independent post-event review; include routine and breakdown scenarios, cross-scope isolation, and a calibration example. | Architecture Board, Maintenance and Safety/HSE |
| MOD-074 | Migration and cutover strategy | Migration and cutover strategy: require source mapping, duplicate resolution, rehearsal totals, rollback and cutover reconciliation; include migration and duplicate-resolution mapping, historical replay, and a reconciliation example. | Architecture Board and Maintenance |
| MOD-075 | Legacy equipment identity mapping | Legacy equipment identity mapping: require source identifiers, manufacturer serial collisions, aliases and ownership; include role-owned acceptance criteria, source confidence, and a contractor example. | Architecture Board and Maintenance |

## 60. Approval and Roadmap

Approval requires Architecture Board and named domain reviewers to accept ownership, state, evidence, integration, security, safety and reporting contracts. Coding must wait for approved technical-object aggregates, lifecycle guards, effect contracts, reconciliation behavior, retention, SoD and migration strategy.

Version 1.0 Draft is documentation only and does not authorize implementation. FCSB-021 remains Project and Service Management Architecture, with Volumes 22–25 unchanged. Future work must preserve FCSB-020 boundaries and record approved changes through controlled architecture governance.

**Controlled concepts:** approval roles; approval conditions; version history; pre-coding work; cross-domain prerequisites; next volume; documentation-only authority.

~~~mermaid
flowchart TB
    GovernanceAndApproA["Governance and approval"]
    GovernanceAndApproB["documentation-only authority"]
    GovernanceAndApproC["approval roles"]
    GovernanceAndApproD["approval conditions"]
    GovernanceAndApproE["version history"]
    GovernanceAndApproF["pre-coding work"]
    GovernanceAndApproB & GovernanceAndApproC --> GovernanceAndApproD
    GovernanceAndApproD --> GovernanceAndApproE --> GovernanceAndApproF
    GovernanceAndApproF -.-> GovernanceAndApproC
    GovernanceAndApproA -.-> GovernanceAndApproE
~~~

### 60.1 Approval roles and conditions

| Approval role | Approval condition |
|---|---|
| Architecture Board | Accept aggregate boundaries, authority ownership, state separations and the controlled roadmap. |
| Maintenance and Asset Management | Accept equipment identity, hierarchy, condition, work and release governance. |
| Reliability | Accept criticality, failure, formula, health and predictive-advisory definitions. |
| Manufacturing and Production Planning | Accept stop/window/restart contracts without transferring production authority. |
| Inventory and Warehouse | Accept spare/tool request and acknowledgement contracts with Inventory-owned movements. |
| Quality and Metrology | Accept calibration-state and out-of-tolerance impact boundaries. |
| Procurement and Supplier Management | Accept contractor, external-service, warranty and contract commercial boundaries. |
| Finance and Cost Accounting | Accept evidence, posting, capitalization and settlement separations. |
| Engineering and Safety/HSE | Accept configuration references, permit/isolation authority and safe coordination. |
| Security, Data Governance and Integration | Accept scope, SoD, identity, retention, event contracts and threat controls. |
| Reporting, Operations and Internal Audit | Accept measure definitions, support ownership, reconciliation and assurance evidence. |

### 60.2 Work required before Maintenance coding

Before implementation, approve the open decisions; define canonical aggregates and state machines; specify domain request/acknowledgement contracts; prove tenant, plant and object authorization; agree permit and equipment-release controls; define reconciliation and retention; prepare migration/duplicate-resolution rules; and create negative, concurrency, outage, backdated-event and SoD test catalogs. No generic scaffold should be extended into maintenance execution until those gates are traceable to an approved ADR.

### 60.3 Version history

| Version | Date | Status | Change |
|---|---|---|---|
| 1.0 Draft | 2026-07-18 | Architecture Review Draft | Initial complete Maintenance and Asset Reliability architecture reference; documentation only. |

### 60.4 Repository evidence reviewed

Evidence review covered README and workspace manifests; FCSB-001 through FCSB-019 and the controlled Series Index; DBA-002, DBA-003 and DBA-004 assessments and implementation reports; Prisma schema, seed and all three accepted migrations; organization, master-data, transaction, workflow, report, layout, customization, enterprise-object, audit, Digital DNA, authentication, common, dashboard, API tests and web settings routes; Docker Compose topology; and Git history/tags through `v0.4-dba004-merged`. Searches found no dedicated asset/equipment/functional-location/maintenance/calibration/reliability controller, service, DTO, route, model or test.

### 60.5 Roadmap boundary

FCSB-020 does not authorize code, schema, migration, seed, API, frontend, test, deployment or operational data changes. FCSB-021 — Project and Service Management Architecture remains the next planned volume; FCSB-022 through FCSB-025 retain their controlled titles and sequence. Any implementation proposal must return through architecture change control with evidence against this volume.
