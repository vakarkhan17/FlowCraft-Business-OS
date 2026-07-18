# FlowCraft Solution Blueprint

## Volume 19 — Quality Management Architecture

| Document control | Value |
|---|---|
| Document code | FCSB-019 |
| Version | 1.0 Draft |
| Status | Architecture Review Draft |
| Last updated | 2026-07-18 |
| Scope | Quality Management architecture; documentation only |
| Approval | Pending Architecture Board, Quality, Manufacturing, Inventory, Warehouse, Procurement, Supplier Management, Sales, Customer Service, Maintenance, Finance, Engineering, Data Governance, Security, Integration, Reporting, Operations and Internal Audit Review |
| Predecessors | FCSB-001 through FCSB-018 |
| Next planned volume | FCSB-020 — Maintenance and Asset Reliability Architecture |

> This volume is an architecture proposal, not evidence that an operational QMS exists. “Implemented foundation” is used only where a linked schema field, migration, service, route or accepted test supports the stated narrow capability; a seed alone is not sufficient. “Registered metadata only” means a seeded name, code or enumerated value is present without runtime behavior. Everything else is explicitly Partial, Scaffold, Planned, Future or Open.

## 1. Purpose and Scope

FCSB-019 defines how FlowCraft should plan quality, request and execute inspections, preserve measurements, control product status, investigate nonconformance, drive corrective action, and exchange decisions with operational domains. It covers incoming, in-process, first-piece, patrol, final and pre-dispatch inspection; hold and release; deviation, concession, rework and scrap boundaries; supplier and customer quality; traceability; measurement equipment; audit, certificates, reporting and reconciliation. It does not authorize direct inventory movements, production confirmations, purchase-order changes, customer commitments, maintenance work or financial postings. Those effects remain commands to their authoritative domains. The document does not add code, schemas, migrations, runtime services or configuration and does not start FCSB-020.

The architecture treats a quality record as controlled evidence: its source, plan version, sample, characteristic, method, instrument, result, evaluator, disposition and downstream acknowledgements must remain reconstructable. Regulatory interpretation, jurisdiction-specific electronic signatures, laboratory accreditation and record-retention periods remain subject to legal and industry review.

## 2. Executive Summary

The target design separates quality judgment from physical and commercial execution. Quality owns specifications, plans, inspection requests, sampled evidence, acceptance decisions, holds, releases, nonconformances, CAPA, supplier-quality decisions and quality documents. Inventory owns stock identity, status and location movement; Manufacturing owns order and operation execution, WIP, consumption, rework and scrap intent; Procurement and Sales own supplier and customer commitments; Maintenance owns asset condition and calibration work; Finance owns valuation and posting. Quality publishes signed decisions and requests effects, while the receiving domain validates and records the effect under its own controls.

FlowCraft currently supplies only narrow foundations: an item inspection-required flag, a batch quality-status string, stock-status masters, supplier/customer masters, generic transaction/workflow/report/audit structures and registered quality metadata. There is no accepted inspection, sampling, NCR, CAPA, calibration, audit or certificate runtime. The roadmap therefore begins with governed masters and immutable evidence, then introduces inspection and status orchestration, followed by nonconformance/CAPA, external quality, statistical control and advanced assurance.

## 3. Quality Management Principles

Quality architecture follows twelve constraints. Decisions are evidence-led and attributable; specifications are versioned and effective-dated; the plan used at execution is snapshotted; results are append-only with explicit correction; sample identity is distinct from inventory identity; disposition never silently moves stock; release requires acknowledged cross-domain effect; critical-characteristic failure cannot be averaged away; supplier and customer records preserve the commercial boundary; instrument fitness is evaluated at result time; electronic approval is purpose-bound; tenant, company, plant and operational scope are enforced; and analytics cannot mutate operational evidence. Automation may recommend a sample, classification or route, but a governed human or deterministic rule remains accountable for consequential acceptance, release, concession and CAPA closure.

The system must prefer visible exceptions over optimistic defaults. Missing specifications, overdue calibration, incomplete samples, unavailable approvers, stale plans, ambiguous units or failed integrations produce controlled blocks or escalation—not assumed conformity. Corrections preserve the original observation, reason, author and approval.

## 4. Current Quality Baseline

The accepted repository baseline is master-data and metadata oriented. The Item model contains **isQualityInspectionRequired** and Batch contains **qualityStatus**; seeded stock statuses include quality hold and rejected. A QC inspection transaction kind, QUALITY module, Quality Manager role, Quality department and QUALITY_INSPECTION enterprise-object registration exist. These facts establish vocabulary and configuration anchors, not an operational QMS. Generic workflow definitions, approval requests, number series, audit logs, transaction documents/links and report definitions are reusable foundations, but no dedicated Quality controller, service, Prisma model, migration or accepted Quality test exists.

| Evidence-backed element | Classification | Concrete evidence | Architectural limitation |
|---|---|---|---|
| Item inspection-required flag | Implemented foundation | [Item.isQualityInspectionRequired](../../apps/api/prisma/schema.prisma#L1417), [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql), [seeded items](../../apps/api/prisma/seed.ts#L278) | Boolean trigger only; no plan selection or inspection creation |
| Batch quality-status field | Implemented foundation | [Batch.qualityStatus](../../apps/api/prisma/schema.prisma#L1887), [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql) | Free status field; no governed transition or release effect |
| Stock-status model | Implemented foundation | [StockStatus model](../../apps/api/prisma/schema.prisma#L1859), [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql) | Inventory master-data structure, not a Quality-owned transition or disposition ledger |
| QUALITY_HOLD and REJECTED codes | Registered metadata only | [Seed registration](../../apps/api/prisma/seed.ts#L237) | Seeded labels do not enact a hold, rejection, release or movement |
| Quality vocabulary | Registered metadata only | [QUALITY/QC_INSPECTION enums](../../apps/api/prisma/schema.prisma#L32), [Quality role and inspection EOR seeds](../../apps/api/prisma/seed.ts#L10) | Registration does not execute inspection |
| Generic control records | Scaffold | [WorkflowDefinition](../../apps/api/prisma/schema.prisma#L1135), [ApprovalRequest](../../apps/api/prisma/schema.prisma#L1300), [AuditLog](../../apps/api/prisma/schema.prisma#L1357) | No quality-specific state, policy or service |

~~~mermaid
flowchart LR
    I["Item inspection flag<br/>implemented foundation"] --> G["Potential quality trigger"]
    B["Batch qualityStatus<br/>implemented foundation"] --> S["Status vocabulary"]
    M["QUALITY and QC_INSPECTION<br/>registered metadata"] --> R["Discoverable object"]
    G --> X["No inspection runtime"]
    S --> X
    R --> X
    X --> P["FCSB-019 planned architecture"]
~~~

## 5. Target Quality Architecture

The target separates a Quality Core from domain adapters. The core owns characteristic, specification, plan, sampling, inspection, result, decision, hold, release, nonconformance, CAPA, supplier-quality, audit and certificate aggregates. A policy layer resolves effective versions and authority; an evidence store preserves observations, attachments, signatures and lineage; orchestration issues idempotent requests to Inventory, Manufacturing, Procurement, Sales, Maintenance and Finance. Acknowledgements are correlated to the decision version so a Quality release is never confused with completed stock movement or production continuation.

Read models provide role-scoped work queues, genealogy, reconciliation and analytics without changing evidence. Integration uses stable identifiers, source version, tenant/company/plant context, causation and correlation IDs. Failed cross-domain requests remain visible and retryable. No adapter may bypass the owning domain’s validation.

~~~mermaid
flowchart TB
    SRC["Receipts, operations, returns,<br/>complaints and schedules"] --> QG["Quality request gateway"]
    QG --> QC["Quality Core<br/>plans · inspections · NCR · CAPA"]
    QC --> EV["Immutable quality evidence"]
    QC --> OR["Cross-domain orchestrator"]
    OR --> INV["Inventory commands"]
    OR --> MFG["Manufacturing commands"]
    OR --> COM["Procurement / Sales commands"]
    OR --> MNT["Maintenance commands"]
    OR --> FIN["Finance notifications"]
    INV & MFG & COM & MNT & FIN --> ACK["Versioned acknowledgements"]
    ACK --> QC
~~~

## 6. Quality Organization Model

Quality authority is scoped by tenant, company, plant, laboratory, product family and decision class. The Quality Director owns policy and exceptional authority; Quality Managers own site controls and final local accountability; Quality Engineers maintain plans, analyze failures and lead CAPA; Inspectors capture observations; Supplier and Customer Quality Engineers manage external cases while respecting Procurement and Sales ownership. A person may hold multiple roles, but policy evaluates the acting assignment and prohibits incompatible action pairs such as result entry and independent release for a critical lot.

Delegation is time-bounded, reasoned and auditable. Central standards can constrain local plans without erasing plant-specific methods. Internal Audit observes evidence and control operation without approving operational dispositions.

~~~mermaid
flowchart TB
    AB["Architecture Board"] --> QD["Quality Director<br/>policy authority"]
    QD --> QM1["Plant A Quality Manager"]
    QD --> QM2["Plant B Quality Manager"]
    QM1 --> QE["Quality Engineer"]
    QM1 --> QI["Quality Inspector"]
    QM1 --> SQE["Supplier Quality Engineer"]
    QM2 --> CQE["Customer Quality Engineer"]
    IA["Internal Audit"] -. "independent assurance" .-> QD
    OPS["Operations owners"] -. "effect acknowledgements" .-> QM1
~~~

## 7. Quality Master-Data Boundary

Quality owns characteristics, methods, specification versions, quality-plan versions, inspection-plan versions, sampling rules, defect codes, severity classes, disposition codes, reason taxonomies, CAPA types, audit criteria and certificate templates. It references—but does not duplicate—Item, UOM, supplier, customer, plant, warehouse, batch, serial, operation, equipment and employee identity from their authoritative domains. References store the external immutable identifier and relevant version where interpretation depends on it.

Master publication requires draft, review, approval, effective-from and supersession semantics. Deactivation cannot invalidate historical evidence. Unit conversions used for tolerances must be governed; unresolved conversions block plan release. Local extensions are namespaced and cannot redefine a centrally controlled critical characteristic.

~~~mermaid
flowchart LR
    QMD["Quality-owned masters"] --> CH["Characteristics / methods"]
    QMD --> SP["Specifications / plans"]
    QMD --> DF["Defects / dispositions"]
    EXT["Referenced domain masters"] --> IT["Item / UOM"]
    EXT --> BP["Supplier / Customer"]
    EXT --> LOC["Plant / Warehouse"]
    EXT --> TR["Batch / Serial / Operation / Asset"]
    CH & SP & DF --> PUB["Governed publication"]
    IT & BP & LOC & TR --> REF["Version-aware references"]
    PUB & REF --> EXE["Inspection interpretation"]
~~~

## 8. Quality Characteristic Architecture

A characteristic defines what is observed, not where it is used. It carries type (variable, attribute, ordinal or narrative), canonical unit, precision, method compatibility, criticality, data sensitivity, allowed qualifiers and calculation rule. Dimensional results preserve raw instrument value, entered value, unit, converted value and rounding rule. Attribute characteristics use controlled answer sets; calculated characteristics retain formula version and source-result links. Critical characteristics require enhanced authorization and cannot be omitted by ad hoc execution.

Characteristics are composed into specification lines and plan steps rather than copied. A change creates a new version, allowing prior inspections to remain interpretable. Measurement uncertainty and guard-band policy are associated with the method/specification use, not silently embedded in a display.

~~~mermaid
classDiagram
    class Characteristic {
      +code
      +dataType
      +canonicalUnit
      +criticality
      +version
    }
    class Method {
      +methodCode
      +precision
      +instrumentClass
    }
    class SpecificationLine {
      +target
      +lowerLimit
      +upperLimit
      +guardBand
    }
    class Result {
      +rawValue
      +enteredUnit
      +normalizedValue
      +qualifier
    }
    Characteristic "1" --> "*" SpecificationLine
    Method "1" --> "*" SpecificationLine
    SpecificationLine "1" --> "*" Result
~~~

## 9. Specification Architecture

A specification binds characteristics and acceptance logic to a subject: item, material family, process output, supplier-item combination, customer-item combination or engineering revision. Versions have effective dates, scope precedence and explicit approval. Resolution considers tenant, company, plant, source, customer/supplier and event date; ambiguous equal-priority matches block execution. The selected version and every resolved line are snapshotted on the inspection request.

Limits distinguish design targets from acceptance limits, unilateral from bilateral tolerance, and regulatory from commercial constraints. Conditional lines may depend on grade, route, batch attribute or destination, but the condition language must be deterministic and testable. Emergency changes require an expiring deviation and retrospective review; editing an active version in place is prohibited.

~~~mermaid
flowchart TD
    CTX["Item + revision + plant + partner + date"] --> CAND["Find effective specifications"]
    CAND --> PRI{"Unique precedence?"}
    PRI -- "No match" --> BLOCK1["Block: missing specification"]
    PRI -- "Tie" --> BLOCK2["Block: ambiguous authority"]
    PRI -- "Yes" --> SNAP["Snapshot specification version"]
    SNAP --> LINES["Resolve conditional lines"]
    LINES --> VALID{"Units and methods valid?"}
    VALID -- No --> BLOCK3["Block plan release"]
    VALID -- Yes --> READY["Inspection-ready contract"]
~~~

## 10. Quality Plan Architecture

The quality plan states why and when quality control applies across a product or process lifecycle. It maps trigger conditions—supplier receipt, operation completion, first production after setup, elapsed interval, final completion, shipment staging, return receipt or complaint—to an inspection plan and response policy. It also defines skip-lot eligibility, severity escalation, responsible group, required independence, retention class and downstream hold behavior.

Plans are versioned at publication and resolved at the source event’s business time. Trigger evaluation is idempotent: the same source event and plan version produce one request unless a governed resample is authorized. Plan changes do not rewrite open work; migration of an open request requires a documented decision comparing old and new controls.

~~~mermaid
flowchart LR
    LIFE["Lifecycle trigger catalog"] --> RCV["Receipt"]
    LIFE --> OPR["Operation"]
    LIFE --> FIN["Final completion"]
    LIFE --> SHP["Shipment staging"]
    LIFE --> RET["Return / complaint"]
    RCV & OPR & FIN & SHP & RET --> QP["Effective Quality Plan"]
    QP --> IP["Inspection Plan version"]
    QP --> RP["Response policy"]
    QP --> OWN["Responsible quality group"]
~~~

## 11. Inspection Plan Architecture

An inspection plan is an executable sequence of steps. Each step specifies characteristic, method, sampling applicability, sequence constraints, required instrument class, instruction reference, evidence type, evaluator qualification, tolerance source and failure response. Parallel steps are explicit; prerequisites prevent a destructive test from preceding measurements that require an intact sample. Conditional branches are deterministic and captured in the execution trace.

Plan publication validates characteristic and method versions, units, qualifications, instrument classes, sampling compatibility and critical-step coverage. A released plan is immutable. The inspection request snapshots it so later master changes do not alter expected work. Optional steps remain visible with the reason skipped; a critical step cannot be marked not applicable without separately approved deviation authority.

~~~mermaid
flowchart TD
    P0["Plan header and scope"] --> P1["Step 10: visual attribute"]
    P1 --> P2["Step 20: dimensional variable"]
    P2 --> D{"Visual defect found?"}
    D -- No --> P3["Step 30: functional test"]
    D -- Yes --> P4["Step 25: defect photograph"]
    P4 --> P3
    P3 --> P5["Step 40: destructive sample"]
    P5 --> C["Completeness and critical-step check"]
~~~

## 12. Sampling Plan Architecture

Sampling converts lot context and inspection severity into a defensible sample instruction. The rule records standard or enterprise method, lot-size bands, inspection level, AQL or equivalent parameters, code letter, sample size, acceptance/rejection numbers, rounding and switching rules. Variable and attribute methods are distinct. The resolved instruction is frozen on the request, including the population identity and randomization seed where selection is automated.

Skip-lot, tightened, normal and reduced inspection transitions require qualified history and cannot be manually selected without authority. A rejected sample does not imply automatic lot movement; it creates a Quality decision path. Sample substitution, inaccessible units, damaged samples and destructive testing are recorded. Bias analysis monitors whether operators repeatedly choose easy-to-reach units.

~~~mermaid
flowchart TD
    LOT["Lot size and risk class"] --> MODE{"Current switching state"}
    MODE -- Tightened --> T["Larger sample / stricter Ac-Re"]
    MODE -- Normal --> N["Standard sample / Ac-Re"]
    MODE -- Reduced --> R["Reduced sample with eligibility"]
    T & N & R --> PICK["Randomized sample-unit selection"]
    PICK --> OBS["Observed defect count or variables"]
    OBS --> RULE{"Acceptance rule"}
    RULE -- Accept --> PASS["Recommend conforming"]
    RULE -- Reject --> FAIL["Escalate disposition"]
~~~

## 13. Inspection Request Architecture

The inspection request is the Quality-owned transaction that connects a source event to controlled execution. It records request number, type, source-domain reference and version, item, plant, supplier/customer where relevant, quantity and UOM, batch/serial population, plan/specification snapshots, priority, due time, responsible group, hold requirement and correlation identifiers. Source data is copied only where required to preserve decision context.

Creation is idempotent on tenant, source event, trigger, subject and plan version. Amendments are versioned; cancellation requires a reason and cannot erase collected results. Reinspection and resampling are related requests with an explicit basis rather than revisions that obscure a failure. A request may span a coherent lot but cannot combine populations whose specification or ownership differs.

~~~mermaid
classDiagram
    class InspectionRequest {
      +requestNumber
      +inspectionType
      +sourceReference
      +population
      +dueAt
      +state
    }
    class PlanSnapshot {
      +planVersion
      +specificationVersion
      +resolvedAt
    }
    class SampleInstruction {
      +sampleSize
      +selectionSeed
      +acceptRejectRule
    }
    class DomainAcknowledgement {
      +effectType
      +decisionVersion
      +status
    }
    InspectionRequest "1" *-- "1" PlanSnapshot
    InspectionRequest "1" *-- "0..1" SampleInstruction
    InspectionRequest "1" --> "*" DomainAcknowledgement
~~~

## 14. Inspection Lifecycle

The lifecycle distinguishes preparation, execution, evaluation and downstream completion. Draft requests may be corrected before assignment. Released requests are immutable in scope except through approved amendment. In progress means at least one controlled observation exists. Awaiting review separates data capture from decision. Accepted, rejected and conditional outcomes are Quality judgments; effect pending means Inventory, Manufacturing or another domain has not yet acknowledged the requested consequence. Closed requires complete evidence and required acknowledgements. Cancelled remains auditable.

Transitions enforce qualification, step completeness, instrument fitness, critical failures, dual control and open deviations. Reopening creates a new evaluation version and never deletes the prior decision. Timeouts escalate ownership but do not auto-accept material.

~~~mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Released: validate snapshots
    Released --> Assigned
    Assigned --> InProgress: first result
    InProgress --> AwaitingReview: required steps complete
    AwaitingReview --> Accepted: conformity approved
    AwaitingReview --> Rejected: failure approved
    AwaitingReview --> Conditional: concession basis
    Accepted --> EffectPending
    Rejected --> EffectPending
    Conditional --> EffectPending
    EffectPending --> Closed: acknowledgements reconciled
    Draft --> Cancelled: authorized cancellation
    AwaitingReview --> InProgress: correction or more evidence
~~~

## 15. Inspection Execution Architecture

Execution presents only the frozen plan and authorized contextual instructions. The inspector claims or receives a work item, verifies sample identity, confirms environmental and instrument prerequisites, captures results in step order, attaches required evidence and records interruptions. Offline capture is future work and, if introduced, must preserve device identity, trusted time, signed payloads, conflict rules and expiry; it cannot silently merge competing results.

The engine validates qualification, unit, precision, range, attachment requirement and instrument state at entry. It does not infer a pass from a blank value. Supervisory override requires a bounded reason code and cannot override a missing critical observation. Every save is attributable; workstation and integration provenance are retained without exposing unnecessary personal data.

~~~mermaid
sequenceDiagram
    participant I as Inspector
    participant Q as Quality Execution
    participant M as Method Service
    participant C as Calibration Register
    participant E as Evidence Store
    I->>Q: Claim request and identify sample
    Q->>M: Resolve frozen step instruction
    Q->>C: Verify instrument at observation time
    C-->>Q: Fitness and calibration version
    I->>Q: Submit raw value and qualifier
    Q->>E: Append signed observation and provenance
    E-->>Q: Evidence identifier
    Q-->>I: Step evaluation and next permitted action
~~~

## 16. Inspection Result Architecture

Results are observations plus evaluation, not a mutable cell. A result records request/step/sample identity, characteristic and method snapshot, raw value, entered unit, normalized value, qualitative code, instrument, environmental context, timestamp, actor, source, attachments, uncertainty where applicable and rule evaluation. Manual, device-imported and calculated results are distinguishable. The final inspection outcome is derived from versioned result evaluations and separately approved.

Correction appends a replacement linked to the superseded observation, reason and approver; both remain visible. Outliers cannot be deleted to obtain acceptance. Rounding occurs only under the recorded rule. A result may be technically valid but unusable for disposition if the instrument is later found out of tolerance, initiating an impact assessment.

~~~mermaid
flowchart TD
    RAW["Raw observation + provenance"] --> VAL["Format, range and unit validation"]
    VAL --> NORM["Canonical conversion without losing raw value"]
    NORM --> TOL["Evaluate frozen limits and guard band"]
    TOL --> R1["Conforming"]
    TOL --> R2["Nonconforming"]
    TOL --> R3["Indeterminate / review"]
    R1 & R2 & R3 --> APP["Append immutable result version"]
    APP --> CORR["Correction links replacement; original retained"]
~~~

## 17. Incoming Inspection

Incoming inspection begins from a Procurement/Inventory receipt notification but is owned by Quality. The request references purchase order, receipt line, supplier, item, batch/serial and received quantity while preserving Procurement’s commercial authority and Inventory’s stock authority. Risk-based plan selection considers approved supplier status, item criticality, recent defects and switching history. Inventory places or maintains the receipt in its own non-available status when policy requires; Quality never moves it.

Acceptance issues a release request to Inventory and may update supplier-quality metrics after acknowledgement. Rejection opens containment and supplier-quality disposition; Procurement decides return, debit or claim terms. Quantity discrepancies remain receipt issues unless they also create a quality concern.

~~~mermaid
sequenceDiagram
    participant P as Procurement
    participant V as Inventory Receipt
    participant Q as Quality
    participant S as Supplier Management
    V->>Q: Receipt-created event with lot identity
    Q->>Q: Resolve supplier-item plan and sample
    Q->>V: Request quality-hold status
    V-->>Q: Hold movement acknowledgement
    Q->>Q: Execute and approve inspection
    alt accepted
      Q->>V: Request release for decision version
    else rejected
      Q->>S: Publish supplier-quality case
      S->>P: Request commercial return/claim action
    end
~~~

## 18. In-Process Inspection

In-process inspection observes WIP at a defined operation without taking ownership of production execution. Manufacturing publishes order, operation, resource, quantity, batch/serial genealogy and execution version. Quality selects the plan and records results. A critical failure can issue a quality-hold request against the defined WIP population and a stop/containment advisory, but Manufacturing records the operation state, stop, rework execution, confirmation and material consequences.

Sampling must avoid confusing produced quantity with inspectable population. Results link to operation and parameter context so later genealogy can identify affected output. When Manufacturing continues under approved deviation, Quality records the bounded concession and expiry; the production order retains the execution decision and authorization reference.

~~~mermaid
sequenceDiagram
    participant M as Manufacturing Execution
    participant Q as Quality
    participant W as WIP Control
    M->>Q: Operation checkpoint and genealogy
    Q->>Q: Execute in-process characteristics
    alt critical failure
      Q->>W: Request hold for affected WIP scope
      W->>M: Record controlled production stop/hold
      M-->>Q: Operation-state acknowledgement
    else conforming
      Q->>M: Publish quality-clear decision
      M-->>Q: Continue/confirmation acknowledgement
    end
~~~

## 19. First-Piece Inspection

First-piece inspection is triggered after setup, tooling change, material change, engineering revision, prolonged stoppage or other policy event. Manufacturing owns the setup and identifies the first-piece population; Quality owns the plan, complete characteristic evidence and approval. Production beyond the permitted containment quantity remains blocked or segregated under Manufacturing controls until the approved quality decision is acknowledged.

The first-piece record links machine, tool, program, operation, operator context and engineering revision without making Quality authoritative for those masters. Failure routes to setup correction and a new first-piece request; results from the failed piece remain evidence. A successful result cannot be reused after a trigger that invalidates setup equivalence.

~~~mermaid
stateDiagram-v2
    [*] --> Triggered
    Triggered --> SetupContained: manufacturing identifies first piece
    SetupContained --> Measuring: quality starts full plan
    Measuring --> Failed: any required failure
    Failed --> SetupCorrection: manufacturing adjusts process
    SetupCorrection --> Triggered: new first-piece identity
    Measuring --> Approved: complete conformity
    Approved --> ProductionReleased: manufacturing acknowledges
    ProductionReleased --> [*]
~~~

## 20. Patrol and Periodic Inspection

Patrol inspection samples an operating process by elapsed time, produced quantity, shift, campaign or risk signal rather than by receipt. The scheduler creates due work from an approved recurrence rule and production context; missed rounds escalate without being backdated. Inspectors record actual route, observation time and sampled operation or resource. Periodic results form a process-control series but do not replace final-product acceptance unless the plan explicitly defines that relationship.

If a patrol result breaches an action limit, Quality defines the affected time or genealogy window and requests containment. Manufacturing decides and records process adjustment or stoppage. Schedule changes are versioned; repeated deferrals require management review. Mobile route execution remains future and must handle clock integrity and offline conflict.

~~~mermaid
flowchart LR
    CLK["Time / quantity / shift trigger"] --> DUE["Patrol work due"]
    DUE --> ROUTE["Inspector follows governed route"]
    ROUTE --> SERIES["Append process observation"]
    SERIES --> LIMIT{"Control or action limit crossed?"}
    LIMIT -- No --> NEXT["Calculate next due point"]
    LIMIT -- Yes --> WINDOW["Define affected production window"]
    WINDOW --> CONT["Request Manufacturing containment"]
    CONT --> NEXT
~~~

## 21. Final Inspection

Final inspection confirms completed output against the released final plan before the product becomes eligible for finished-goods release. Manufacturing publishes the completed order, quantity, genealogy and operation state; Quality verifies the correct specification revision, complete upstream evidence and required final characteristics. The Quality outcome does not post production completion or receipt. It requests Inventory status treatment for the identified batch/serial population and returns a quality decision to Manufacturing.

Partial acceptance is explicit by subpopulation and cannot be represented by a single lot-wide flag. Missing genealogy, incomplete critical steps or unresolved upstream nonconformance blocks final acceptance. Reinspection after correction creates a related request and preserves the original failure.

~~~mermaid
flowchart TD
    COMP["Manufacturing completed quantity"] --> GENE{"Genealogy complete?"}
    GENE -- No --> BLOCK["Block final review"]
    GENE -- Yes --> FINAL["Execute final inspection plan"]
    FINAL --> UP{"Upstream NCR or missing critical evidence?"}
    UP -- Yes --> REVIEW["Disposition review"]
    UP -- No --> DEC["Approve subpopulation decision"]
    DEC --> INV["Request Inventory release or hold"]
    INV --> ACK["Acknowledge exact batch/serial scope"]
~~~

## 22. Pre-Dispatch and Customer-Specific Inspection

Pre-dispatch inspection applies shipment, destination and customer-specific requirements after Sales and Warehouse identify the intended delivery population. Quality resolves customer-item specifications, certificate obligations, packaging observations and sampling rules, but Sales owns the commitment and Warehouse owns picking and staging. Substitution of a batch or serial invalidates any decision whose inspected population no longer matches the delivery.

Customer-specific criteria are additive or precedence-governed; they cannot silently weaken statutory or enterprise critical limits. Quality publishes a dispatch-clear decision and certificate readiness, while Warehouse records the physical release. Failed inspection sends a bounded hold request and Customer Service/Sales decide communication and promise-date changes.

~~~mermaid
sequenceDiagram
    participant S as Sales
    participant W as Warehouse
    participant Q as Quality
    participant C as Customer Service
    W->>Q: Staged delivery population
    Q->>S: Resolve customer-specific obligations
    S-->>Q: Order and destination version
    Q->>Q: Inspect packaging, product and documents
    alt clear
      Q->>W: Dispatch-clear decision for exact population
    else failed
      Q->>W: Request staging hold
      Q->>C: Notify quality exception
    end
~~~

## 23. Quality Hold Architecture

A Quality hold is a governed prohibition decision against a precisely identified population or process window. It records reason, severity, source, scope, issuer, effective time, required controls, expiry or review point and decision version. It may target batch, serials, receipt units, WIP genealogy, delivery staging or related lots. Quality owns the hold decision; Inventory, Manufacturing or Warehouse owns its physical/status implementation and acknowledgement.

Hold expansion and reduction are new versions. An unacknowledged request is visible as effect pending and escalates; it is never displayed as physically secured. Emergency hold authority is broader than release authority and expires quickly. Duplicate holds coexist by cause, so resolving one does not release a population still constrained by another.

~~~mermaid
stateDiagram-v2
    [*] --> Proposed
    Proposed --> ActiveDecision: authorized quality issuer
    ActiveDecision --> EffectPending: send scoped hold request
    EffectPending --> Enforced: domain acknowledgement
    EffectPending --> FailedEffect: rejection or timeout
    Enforced --> UnderReview
    UnderReview --> Expanded: new affected scope
    Expanded --> Enforced
    UnderReview --> ReleaseCandidate: cause resolved
    ReleaseCandidate --> Superseded: release decision approved
    FailedEffect --> Escalated
~~~

## 24. Quality Release Architecture

Release is a positive Quality decision that specified constraints are satisfied; it is not an inventory movement, manufacturing continuation or shipment execution. The evaluator checks completed inspection evidence, open holds, NCR dispositions, concessions, expiry, instrument impact and required independent approval. The release identifies exact population, permitted use, effective time and decision version. Broad “release all” operations are prohibited.

Quality sends the release request to the authoritative domain. That domain validates current identity and competing restrictions, records its status or movement and returns acknowledgement. Rejection or partial application remains reconcilable. Release reversal creates a new hold; it never edits the prior release. Critical or concession-based release uses dual control.

~~~mermaid
sequenceDiagram
    participant QI as Quality Evaluator
    participant QA as Independent Approver
    participant Q as Quality Core
    participant D as Owning Domain
    QI->>Q: Propose population-specific release
    Q->>Q: Check evidence, holds, NCR and expiry
    Q->>QA: Request purpose-bound approval
    QA-->>Q: Sign decision version
    Q->>D: Request effect with population and version
    D->>D: Validate identity and competing blocks
    D-->>Q: Applied, partial or rejected acknowledgement
~~~

## 25. Inventory Quality Status Boundary

Inventory owns stock-status codes as inventory masters and owns every status/location movement. Quality owns inspection and disposition semantics and requests an intended status effect. The interface includes batch/serial or quantity scope, source status expectation, requested target class, quality decision version, reason and idempotency key. Inventory may reject a stale or impossible request and explains why.

The current **StockStatus** model is an implemented foundation, while seeded QUALITY_HOLD/REJECTED codes are registered metadata only and **Batch.qualityStatus** is a coarse foundation field; none proves governed transitions ([schema](../../apps/api/prisma/schema.prisma#L1859), [seed](../../apps/api/prisma/seed.ts#L237)). The target read model reconciles Quality decisions to Inventory acknowledgements rather than treating duplicated status text as truth.

~~~mermaid
flowchart LR
    QD["Quality decision ledger"] --> REQ["Status-effect request<br/>population + expected state"]
    REQ --> IV["Inventory validation"]
    IV --> MOVE["Inventory-owned status/location movement"]
    IV --> REJ["Reject stale or invalid request"]
    MOVE --> ACK1["Applied acknowledgement"]
    REJ --> ACK2["Rejected acknowledgement with reason"]
    ACK1 & ACK2 --> REC["Quality-to-Inventory reconciliation"]
~~~

## 26. Nonconformance Architecture

A nonconformance (NCR) records departure from a requirement and the evidence needed to contain and decide it. The aggregate contains NCR number, origin, detected-at stage, subject population, requirement/version, defect observations, severity, risk assessment, containment, ownership, related inspections, genealogy, attachments, disposition lines, approvals and downstream acknowledgements. Multiple defects may belong to one coherent event; unrelated populations are not combined for convenience.

NCR creation can follow a failed result, complaint, supplier issue, audit or manual observation. It never deletes the source evidence. Severity and reportability rules control escalation. Duplicate detection links cases but does not auto-close them. Personal data in complaint evidence is minimized and access-scoped.

~~~mermaid
classDiagram
    class Nonconformance {
      +ncrNumber
      +origin
      +severity
      +affectedScope
      +state
    }
    class DefectObservation {
      +defectCode
      +requirement
      +location
      +evidence
    }
    class ContainmentAction {
      +actionType
      +domainRequest
      +acknowledgement
    }
    class DispositionLine {
      +population
      +decision
      +approval
    }
    Nonconformance "1" *-- "*" DefectObservation
    Nonconformance "1" *-- "*" ContainmentAction
    Nonconformance "1" *-- "*" DispositionLine
~~~

## 27. Nonconformance Lifecycle

The NCR lifecycle separates recording, containment, investigation, disposition and verification. Open captures the issue; triage validates scope and severity; containment pending waits for authoritative-domain action; contained confirms the immediate exposure is controlled. Investigation builds cause evidence. Disposition review selects bounded treatment. Execution pending waits for Inventory, Manufacturing, Procurement, Sales, Maintenance or Finance actions. Verification confirms results and acknowledgements before closure.

Cancellation is limited to demonstrable misclassification and retains the record. Reopening creates a new version linked to the closure rationale. Severe events cannot close with overdue containment, incomplete affected-population analysis, unacknowledged effects or unresolved regulatory assessment.

~~~mermaid
stateDiagram-v2
    [*] --> Open
    Open --> Triage
    Triage --> ContainmentPending
    ContainmentPending --> Contained: effects acknowledged
    Contained --> Investigation
    Investigation --> DispositionReview
    DispositionReview --> ExecutionPending
    ExecutionPending --> Verification: domain actions complete
    Verification --> Closed: evidence and effectiveness accepted
    Verification --> Investigation: ineffective or new scope
    Closed --> Reopened: governed new evidence
    Triage --> Cancelled: proven duplicate or miscoding
~~~

## 28. Defect and Failure Classification

Defect classification uses controlled dimensions rather than one overloaded code: requirement family, physical or procedural manifestation, location, severity, detectability, recurrence, suspected source and regulatory significance. A defect code describes what was observed; a cause code is assigned only after investigation; a disposition code states what is authorized. Keeping these separate prevents premature root-cause claims.

Taxonomies support industry and plant extensions under governed parent codes. Severity calculation combines product/process criticality with actual exposure and is reviewable. Images and free text supplement, but do not replace, structured classification. Reclassification retains history because trends depend on understanding coding drift.

~~~mermaid
flowchart TB
    OBS["Observed failure"] --> MAN["Manifestation<br/>crack · dimension · contamination"]
    OBS --> LOC["Location<br/>receipt · operation · final · field"]
    OBS --> SEV["Severity and exposure"]
    OBS --> REQ["Violated requirement version"]
    MAN & LOC & SEV & REQ --> DEF["Defect classification"]
    DEF -. "not equivalent" .-> CAUSE["Investigated cause"]
    DEF -. "not equivalent" .-> DISP["Approved disposition"]
~~~

## 29. Containment Architecture

Containment limits exposure while investigation continues. The plan identifies affected and potentially affected populations, search logic, customer/supplier exposure, required holds, process stop requests, segregation, enhanced inspection, communication and accountable owners. Each action has due time and authoritative domain. Quality coordinates and verifies containment evidence but cannot directly stop a machine, move stock, cancel a shipment or change a purchase order.

Containment effectiveness is measured by acknowledgements and boundary checks: inventory quantities reconcile, WIP windows match genealogy, staged deliveries are identified and remote sites respond. Temporary sorting has a defined instruction, trained performers and disposition of screened units. Containment remains open until scope confidence and cross-domain effects are verified.

~~~mermaid
flowchart TD
    NCR["NCR severity and suspected window"] --> SCOPE["Define confirmed and suspect populations"]
    SCOPE --> INV["Request Inventory segregation"]
    SCOPE --> MFG["Request Manufacturing stop/window control"]
    SCOPE --> SALES["Request Sales shipment review"]
    SCOPE --> PROC["Request Procurement supplier containment"]
    INV & MFG & SALES & PROC --> ACK["Collect domain acknowledgements"]
    ACK --> CHECK{"All quantities and genealogy reconciled?"}
    CHECK -- No --> EXPAND["Expand scope and escalate"]
    CHECK -- Yes --> CON["Containment verified"]
~~~

## 30. Disposition Architecture

Disposition assigns an authorized treatment to each affected population: use-as-is, rework, repair, return to supplier, scrap, downgrade, regrade or conditional release. Quality owns the quality decision and technical acceptance conditions. Manufacturing owns rework execution and scrap intent for WIP; Inventory owns movement/status; Procurement owns supplier return/claim; Sales owns customer commitment; Finance owns write-off or valuation effects.

A disposition line specifies quantity, UOM, batch/serial scope, decision basis, instructions, expiry, approvals and requested domain effects. Split disposition requires quantity reconciliation to the affected population. Use-as-is for critical deviation requires heightened authority. Closing the NCR waits for effect acknowledgements and verification, not merely approval.

~~~mermaid
flowchart LR
    POP["Affected population"] --> SPLIT["Reconciled disposition lines"]
    SPLIT --> UAI["Use-as-is / concession"]
    SPLIT --> RWK["Rework or repair request"]
    SPLIT --> RTS["Supplier return request"]
    SPLIT --> SCR["Scrap request"]
    SPLIT --> DNG["Downgrade / regrade"]
    UAI & RWK & RTS & SCR & DNG --> DOM["Authoritative-domain execution"]
    DOM --> VER["Quality verification and NCR closure"]
~~~

## 31. Deviation Architecture

A deviation authorizes a bounded departure before or during execution; it is not retrospective concealment of a nonconformance. It records requirement, proposed alternative, risk analysis, affected item/process/site, maximum quantity or time, start and expiry, monitoring, approvers and revocation conditions. Engineering owns design-change authority; Quality owns quality acceptance; operational owners decide whether to execute under the deviation.

Expired deviations cannot be used to accept new output. Usage is metered against quantity and time, with alerts before exhaustion. If actual conditions exceed scope, an NCR is opened. Permanent need routes to controlled master/specification change rather than repeated temporary approval.

~~~mermaid
stateDiagram-v2
    [*] --> Requested
    Requested --> RiskAssessed
    RiskAssessed --> Approved: bounded authorities sign
    RiskAssessed --> Rejected
    Approved --> Active: effective time reached
    Active --> Exhausted: quantity limit reached
    Active --> Expired: end time reached
    Active --> Revoked: risk condition triggered
    Active --> Superseded: permanent change approved
    Exhausted --> [*]
    Expired --> [*]
    Revoked --> [*]
~~~

## 32. Concession and Waiver Architecture

A concession accepts a known nonconformity for a defined population, often with customer or regulatory conditions; a waiver relaxes a requirement prospectively within explicit scope. Both retain the violated requirement, technical rationale, risk, compensating controls, quantity, customer/supplier involvement, financial/commercial references, expiry and signatures. Neither becomes a hidden specification revision.

Quality controls technical acceptance and evidence. Sales obtains customer authorization where contractually required; Engineering evaluates design impact; Finance records any price or reserve effect; Operations executes the bounded use. Repeated concessions trigger trend review and CAPA. Certificate output discloses the concession only when policy or contract requires and never misstates conformity.

~~~mermaid
flowchart TD
    EXC["Known exception"] --> TYPE{"Timing and purpose"}
    TYPE -- "Existing nonconforming population" --> CONC["Concession"]
    TYPE -- "Prospective bounded relaxation" --> WAIV["Waiver"]
    CONC & WAIV --> TECH["Quality and Engineering assessment"]
    TECH --> CUST{"Customer authorization required?"}
    CUST -- Yes --> SALES["Sales obtains customer decision"]
    CUST -- No --> AUTH["Internal approval matrix"]
    SALES --> AUTH
    AUTH --> USE["Metered scope and expiry"]
~~~

## 33. Rework Quality Boundary

Quality defines the accepted defect, required outcome, verification characteristics and release criteria for rework. Manufacturing owns route creation, labor/resource execution, material consumption, operation confirmations, WIP genealogy and completion. Quality cannot post a rework order or alter operation state. The rework request references NCR/disposition, affected population, approved instruction, maximum cycles and post-rework inspection plan.

Manufacturing acknowledges start and completion with new genealogy. Quality then executes reinspection; a pass creates a release decision, while failure may permit another authorized cycle or escalate disposition. Original defects and every cycle remain traceable to prevent endless rework and concealed yield loss.

~~~mermaid
sequenceDiagram
    participant Q as Quality
    participant M as Manufacturing
    participant I as Inventory
    Q->>M: Approved rework request and acceptance criteria
    M->>M: Create route; execute labor/material/operations
    M-->>Q: Completion and genealogy acknowledgement
    Q->>Q: Perform post-rework inspection
    alt conforming
      Q->>I: Request release for reworked population
    else failed
      Q->>M: Publish failure for new disposition decision
    end
~~~

## 34. Scrap Quality Boundary

Quality may decide that a population is technically unacceptable and recommend scrap, but the operational and financial effects remain separated. Manufacturing owns scrap intent and production/WIP recording; Inventory owns stock movement and destruction status; authorized Operations controls physical destruction; Finance owns write-off and variance posting. Quality records the disposition basis, affected identity, evidence and any witness requirement.

High-value, regulated or security-sensitive scrap requires dual control and destruction evidence. Quantity and UOM reconcile across NCR, genealogy, inventory and finance acknowledgements. Salvage or recovery is a separate approved disposition so material cannot re-enter availability under a scrap decision.

~~~mermaid
sequenceDiagram
    participant Q as Quality
    participant M as Manufacturing
    participant I as Inventory
    participant O as Operations
    participant F as Finance
    Q->>M: Publish technical scrap disposition
    M-->>Q: Record WIP scrap intent and genealogy
    Q->>I: Request scrap-status effect
    I-->>Q: Inventory quantity acknowledgement
    O-->>Q: Destruction/witness evidence
    F-->>Q: Financial-effect reference
    Q->>Q: Reconcile identities and quantities
~~~

## 35. Corrective Action Architecture

Corrective action eliminates or controls a verified cause of an existing nonconformity. It records cause linkage, action, accountable owner, due date, implementation evidence, risk, validation method and effectiveness measure. Actions may belong to Quality, Engineering, Manufacturing, Procurement, Supplier Management, Sales, Maintenance, Security or Operations; Quality coordinates the case but does not execute another domain’s work.

Closure requires evidence that the action was implemented as approved and did not create an unmanaged risk. Due-date changes preserve the original commitment and reason. A correction that fixes one unit is not mislabeled corrective action unless it addresses systemic cause. Weak actions such as “retrain operator” require evidence that the causal mechanism supports them.

~~~mermaid
flowchart LR
    CAUSE["Verified cause and scope"] --> DESIGN["Design corrective action"]
    DESIGN --> OWNER["Assign authoritative owner"]
    OWNER --> IMPL["Owner implements and supplies evidence"]
    IMPL --> VALID["Quality validates implementation"]
    VALID --> EFF["Effectiveness measure scheduled"]
    EFF --> CLOSE{"Sustained target met?"}
    CLOSE -- Yes --> DONE["Corrective action complete"]
    CLOSE -- No --> REDESIGN["Escalate and redesign"]
~~~

## 36. Preventive Action Direction

Preventive action addresses credible risk before a nonconformance occurs. Signals may come from near misses, control-chart shifts, supplier trends, audit observations, FMEA changes, equipment degradation or cross-site learning. The case records the hypothesized failure mechanism, evidence strength, exposure, proposed control, owner, success criterion and review horizon. It remains distinct from correction and corrective action.

Because indiscriminate preventive tasks create bureaucracy, prioritization uses risk and expected control value. Predictive models may surface signals but cannot autonomously change specifications, hold stock or close actions. Preventive action runtime is Planned; model governance, explainability and false-positive monitoring are prerequisites for AI-assisted recommendations.

~~~mermaid
flowchart TD
    SIG["Near miss / trend / audit / FMEA signal"] --> HYP["Hypothesized failure mechanism"]
    HYP --> RISK["Exposure and control-gap assessment"]
    RISK --> VALUE{"Action value exceeds burden?"}
    VALUE -- No --> MON["Monitor with documented rationale"]
    VALUE -- Yes --> PA["Preventive action proposal"]
    PA --> OWN["Domain owner implements control"]
    OWN --> OBS["Observe leading indicator"]
~~~

## 37. CAPA Architecture

CAPA is the governed case that links issue intake, risk, containment, investigation, correction, corrective or preventive actions, approvals and effectiveness. It can aggregate related NCRs, complaints, audits or supplier cases when a documented relationship exists. The Quality owner controls case coherence; each action remains accountable to its executing domain. Critical CAPA requires independent approval and executive visibility.

The architecture prevents “paper closure”: mandatory causal evidence, action completion, late-task escalation and effectiveness scheduling are state guards. Scope changes are versioned. Related cases retain bidirectional links without merging histories. CAPA records include regulatory-reportability assessment but do not infer jurisdictional obligations without approved policy.

~~~mermaid
stateDiagram-v2
    [*] --> Intake
    Intake --> Containment
    Containment --> Investigation
    Investigation --> ActionPlanning
    ActionPlanning --> Implementation
    Implementation --> Verification
    Verification --> EffectivenessPending
    EffectivenessPending --> Closed: sustained criteria met
    EffectivenessPending --> Reopened: ineffective
    Investigation --> Escalated: critical/reportable
    Escalated --> ActionPlanning
~~~

## 38. Root-Cause Analysis Direction

Root-cause analysis stores hypotheses and evidence, not only a final code. Methods may include five-whys, fishbone, fault tree, change analysis, process mapping or designed experiment. Each causal claim records supporting and contradicting evidence, tested mechanism, affected scope and confidence. Contributing conditions are separated from root causes and escape causes, enabling actions that address occurrence and detection.

The facilitator cannot close analysis merely because a preferred cause was selected. Human-error labels require examination of system, instruction, workload, interface and control conditions. AI may cluster similar narratives or propose hypotheses in a future phase, but sources, uncertainty and reviewer decisions remain visible; no model may assign blame or approve cause.

~~~mermaid
flowchart TB
    PROB["Evidence-based problem statement"] --> H1["Method / process hypothesis"]
    PROB --> H2["Material / supplier hypothesis"]
    PROB --> H3["Machine / measurement hypothesis"]
    PROB --> H4["Environment / system hypothesis"]
    H1 & H2 & H3 & H4 --> TEST["Mechanism tests and contrary evidence"]
    TEST --> OCC["Occurrence cause"]
    TEST --> ESC["Escape/detection cause"]
    OCC & ESC --> LINK["Action-to-cause coverage"]
~~~

## 39. CAPA Effectiveness Verification

Effectiveness verification asks whether the approved action produced a sustained, risk-appropriate outcome. The plan is defined before closure and specifies metric, baseline, target, population, observation period, data source, evaluator independence and confounders. A training completion count is implementation evidence, not effectiveness unless the causal theory predicts it as the outcome.

At the due point, the verifier retrieves immutable operational evidence, compares the planned criterion and records effective, ineffective or indeterminate. Ineffective cases reopen or spawn escalated action; indeterminate cases extend only with justified authority. Statistical confidence is proportional to risk and occurrence frequency. The actor who implemented a critical action cannot be the sole effectiveness approver.

~~~mermaid
sequenceDiagram
    participant C as CAPA Owner
    participant D as Domain Data
    participant V as Independent Verifier
    participant Q as Quality Governance
    C->>Q: Freeze effectiveness plan before closure
    Q->>D: Schedule evidence window and metric
    D-->>V: Immutable observations and baseline
    V->>V: Evaluate target, duration and confounders
    V-->>Q: Effective, ineffective or indeterminate
    Q-->>C: Close, reopen or extend with authority
~~~

## 40. Supplier Quality Management

Supplier Quality maintains quality status, qualification evidence, audits, supplier-item controls, performance trends, inspection severity recommendations and approved quality decisions. Procurement remains authoritative for supplier onboarding, commercial status, purchase orders, pricing, claims and termination. The current Supplier master is an implemented foundation ([Supplier model](../../apps/api/prisma/schema.prisma#L1459)); approved-supplier quality status and supplier-quality runtime are Planned.

Performance combines normalized defects, severity, response timeliness, escape rate and audit findings with transparent denominators. Scorecards do not silently suspend a supplier. Quality can recommend restriction and require enhanced inspection; Procurement executes commercial consequences under approval. Supplier-provided certificates are verified against receipt identity and trust policy rather than treated as automatic acceptance.

~~~mermaid
flowchart LR
    SUP["Procurement-owned Supplier"] --> SQP["Supplier Quality Profile"]
    SQP --> QUAL["Qualification and audit evidence"]
    SQP --> PERF["Defect and response metrics"]
    SQP --> CTRL["Supplier-item inspection controls"]
    QUAL & PERF & CTRL --> REC["Quality recommendation"]
    REC --> PROC["Procurement commercial decision"]
    PROC --> PO["PO and supplier-status effects"]
    PO --> FEED["Outcome feedback to Supplier Quality"]
~~~

## 41. Supplier Corrective Action Request

A supplier corrective action request (SCAR) packages a verified supplier-related problem, affected receipts, requirement, containment demand, response stages, due dates and acceptance criteria. Supplier Quality owns technical evaluation and response adequacy; Procurement owns contractual delivery, escalation and claim channels. The supplier’s acknowledgement, containment, causal analysis, action plan and effectiveness evidence are separately versioned so a late revision cannot overwrite earlier commitments.

Critical SCARs require confirmation that remote stock and in-transit material are contained. Acceptance of a supplier response does not release internal inventory; Quality makes a population-specific decision and Inventory applies status. Chronic overdue or ineffective SCAR trends support a supplier restriction recommendation, not an automatic commercial block.

~~~mermaid
sequenceDiagram
    participant SQ as Supplier Quality
    participant P as Procurement
    participant S as Supplier
    participant I as Inventory
    SQ->>P: Approved SCAR package and severity
    P->>S: Contractual issue and response milestones
    S-->>SQ: Acknowledge and remote containment
    S-->>SQ: Cause, actions and evidence versions
    SQ->>SQ: Evaluate adequacy and effectiveness
    alt internal material releasable
      SQ->>I: Population-specific release request
    else response inadequate
      SQ->>P: Escalation/restriction recommendation
    end
~~~

## 42. Customer Complaint Quality Boundary

Customer Service owns complaint intake and customer communication; Sales owns commercial commitments; Quality owns technical investigation, defect classification, risk assessment and quality decision. The complaint-quality case references customer, product, batch/serial, delivery, symptom, use context and attachments while minimizing personal data. Safety or regulatory indicators trigger controlled escalation without waiting for complete technical proof.

Quality may request retained-sample inspection, genealogy search, containment or return analysis. It cannot issue credit, promise replacement or authorize return logistics. Customer-visible root-cause and action statements pass technical, legal and commercial review. Duplicate complaints link to a common investigation while preserving each customer interaction and jurisdiction.

~~~mermaid
flowchart TD
    CS["Customer Service intake"] --> TRI["Privacy-aware quality triage"]
    TRI --> SAFE{"Safety or reportability signal?"}
    SAFE -- Yes --> ESC["Legal/regulatory escalation"]
    SAFE -- No --> INV["Technical investigation"]
    ESC --> INV
    INV --> GEN["Genealogy and retained-sample review"]
    GEN --> DEC["Quality conclusion"]
    DEC --> SALES["Sales/Customer Service response and remedy"]
    DEC --> CAPA["NCR/CAPA when systemic"]
~~~

## 43. Customer Return and Failure Analysis

Sales or Customer Service authorizes a return commercially; Warehouse/Inventory receive and identify it; Quality owns failure analysis. The quality request binds returned unit, original delivery, batch/serial, claimed symptom, condition on arrival and chain of custody. Triage distinguishes confirmed product failure, no-fault-found, transport damage, misuse, wrong item and indeterminate outcomes without altering the customer’s complaint record.

Destructive analysis requires approval and evidence capture. Results may open NCR/CAPA and define related-population containment. Inventory decides return stock status and location; Finance determines credit/reserve effects; Sales communicates remedy. A no-fault-found outcome is not automatically a rejected claim and is reported with uncertainty.

~~~mermaid
sequenceDiagram
    participant CS as Customer Service
    participant W as Warehouse
    participant Q as Quality Lab
    participant S as Sales
    participant F as Finance
    CS->>W: Authorized return reference
    W-->>Q: Received identity and chain of custody
    Q->>Q: Reproduce symptom and perform analysis
    Q-->>S: Technical outcome and related risk
    S-->>CS: Approved customer communication/remedy
    F-->>Q: Financial-effect reference when applicable
~~~

## 44. Traceability and Quality Genealogy

Quality genealogy links source event, inspection request, samples, results, instruments, specification/plan versions, decisions, holds, NCR, dispositions, CAPA, certificates and domain acknowledgements. It references Inventory batch/serial and Manufacturing execution genealogy rather than reconstructing ownership. A graph edge records relationship type, source authority, business time and evidence version. Absence is represented explicitly; inferred links are labeled and never used as sole release evidence.

Queries support backward source tracing, forward affected-population tracing and decision provenance. Access respects tenant/company and sensitive complaint or personnel data. Corrections add superseding nodes. The current Batch, SerialNumber and generic TransactionLink are implemented/scaffold foundations ([Batch and SerialNumber](../../apps/api/prisma/schema.prisma#L1878), [TransactionLink](../../apps/api/prisma/schema.prisma#L2345)); quality genealogy runtime is Planned.

~~~mermaid
flowchart LR
    SRC["Supplier receipt / production operation"] --> LOT["Inventory batch or serial identity"]
    LOT --> INS["Inspection request and sample"]
    INS --> RES["Results + instrument evidence"]
    RES --> DEC["Quality decision"]
    DEC --> NCR["NCR / disposition / CAPA"]
    DEC --> CERT["Certificate version"]
    DEC --> ACK["Inventory / Manufacturing acknowledgement"]
    LOT --> SHIP["Delivery population"]
    SHIP --> CMP["Complaint / return"]
    CMP --> NCR
~~~

## 45. Recall Support Direction

Quality provides recall-support evidence: hazard/defect basis, affected and suspect genealogy, inspection/NCR/CAPA links, distribution trace references, decision versions and reconciliation. Recall authorization, regulatory reporting, customer notification, market withdrawal and logistics require Legal, Executive, Sales, Operations and domain-specific governance outside Quality’s sole authority. This volume does not define jurisdictional recall procedure.

The support process freezes the query criteria, records data completeness and separates confirmed, potentially affected, cleared and unknown populations. Sales identifies customers and deliveries; Inventory identifies on-hand and in-transit stock; Manufacturing supplies genealogy; Procurement coordinates upstream suppliers. Every exported population list is versioned and access-controlled. Recall runtime is Future pending legal and records requirements.

~~~mermaid
flowchart TB
    SIGNAL["Critical complaint / NCR / authority signal"] --> BOARD["Recall governance decision"]
    BOARD --> CRIT["Freeze affected-population criteria"]
    CRIT --> MFG["Manufacturing genealogy"]
    CRIT --> INV["Inventory on-hand/in-transit"]
    CRIT --> SALES["Sales delivery/customer trace"]
    CRIT --> PROC["Procurement upstream trace"]
    MFG & INV & SALES & PROC --> RECON["Confirmed · suspect · cleared · unknown"]
    RECON --> ACT["Legally governed recall actions"]
~~~

## 46. Measurement and Test Equipment Direction

Quality methods specify required instrument class, range, resolution, accuracy and uncertainty; Maintenance/Metrology owns equipment identity, condition, calibration work and service state. At observation time, Quality verifies that the selected instrument was eligible for the method and captures its calibration/version reference. Manual instruments, gauges, laboratory systems and automated test equipment share this contract but may use different integration adapters.

Equipment out-of-tolerance triggers impact assessment over results since the last known valid point. Quality identifies potentially affected decisions; Maintenance supplies calibration evidence and condition; operational domains perform resulting holds or rework. The current repository has no quality-instrument or calibration model, so the capability is Planned and must align with FCSB-020 without starting that volume.

~~~mermaid
classDiagram
    class QualityMethod {
      +requiredInstrumentClass
      +range
      +resolution
      +uncertaintyRule
    }
    class EquipmentIdentity {
      +assetId
      +equipmentClass
      +owner
    }
    class CalibrationEvidence {
      +performedAt
      +validUntil
      +result
      +certificate
    }
    class Observation {
      +observedAt
      +instrumentVersion
      +fitnessDecision
    }
    QualityMethod --> EquipmentIdentity
    EquipmentIdentity --> CalibrationEvidence
    EquipmentIdentity --> Observation
~~~

## 47. Calibration Boundary

Maintenance/Metrology schedules, executes and records calibration work, adjusts equipment state and controls overdue assets. Quality defines method suitability, consumes the calibration status at result time and owns the impact assessment on quality evidence. A calibration certificate is not edited by Quality; its verified identifier and validity are referenced. Outsourced calibration requires provider qualification and certificate authenticity checks.

When an instrument fails calibration, Maintenance publishes the as-found condition and validity interval. Quality searches affected observations, evaluates decision risk and requests holds or reinspection as needed. Inventory and Manufacturing apply those effects. Temporary extension of calibration requires risk-based authority, bounded duration and prohibited-use categories; it is not an automatic grace period.

~~~mermaid
sequenceDiagram
    participant M as Maintenance/Metrology
    participant Q as Quality
    participant D as Domain Operations
    M->>M: Perform scheduled calibration
    alt in tolerance
      M-->>Q: Valid status and certificate reference
    else out of tolerance
      M-->>Q: As-found error and last-valid boundary
      Q->>Q: Find affected results and decisions
      Q->>D: Request hold/reinspection for affected scope
      D-->>Q: Effect acknowledgements
    end
~~~

## 48. Statistical Quality Direction

Statistical quality consumes approved result series for control charts, capability, acceptance sampling review and trend detection. The semantic layer preserves characteristic, method, instrument, process, product, shift and plan-version context so unlike populations are not pooled. Control limits describe process behavior and remain distinct from specification limits. Recalculation records method, exclusions, baseline window and approval.

Signals create review work; they do not autonomously reject product, stop production or change sampling. Low-volume, autocorrelated or non-normal data requires suitable methods and stated limitations. AI-based anomaly detection is Future and must expose model version, features, threshold, drift and human resolution. Operational statistical runtime and accepted tests do not exist in the baseline.

~~~mermaid
flowchart LR
    R["Approved variable/attribute results"] --> SEG["Homogeneous context segmentation"]
    SEG --> CHART["Control chart and run rules"]
    SEG --> CAP["Capability estimate with assumptions"]
    CHART --> SIG["Assignable-cause signal"]
    CAP --> GAP["Specification-capability gap"]
    SIG & GAP --> REV["Quality engineer review"]
    REV --> NCR["NCR/CAPA or monitoring decision"]
    REV --> MFG["Manufacturing advisory; no direct stop"]
~~~

## 49. Quality Audit Architecture

Quality audit manages program, scope, criteria, checklist version, auditor independence, schedule, evidence, findings, grading, response, action and closure. Audit types include system, process, product, supplier and layered process audits. The audited owner supplies evidence and actions; the auditor records objective evidence and finding; Quality governance approves closure. Internal Audit remains independent and may rely on, but does not operate, Quality’s program.

Checklist answers cannot substitute for evidence. Finding severity follows controlled criteria and links to CAPA where systemic. Rescheduling records cause and risk. Supplier audits preserve Procurement’s commercial boundary. Sensitive security or personnel evidence uses restricted references rather than unrestricted attachments. Audit runtime is Planned; generic workflow/audit-log models are only scaffolds.

~~~mermaid
stateDiagram-v2
    [*] --> Programmed
    Programmed --> Scheduled
    Scheduled --> Fieldwork
    Fieldwork --> EvidenceReview
    EvidenceReview --> FindingsIssued
    FindingsIssued --> ResponseDue
    ResponseDue --> ActionVerification
    ActionVerification --> Closed: findings resolved
    ActionVerification --> Escalated: overdue or ineffective
    Scheduled --> Rescheduled: approved reason and risk
~~~

## 50. Certificates and Quality Documents

Quality documents include inspection reports, certificates of analysis/conformance, deviation/concession records, supplier-quality notices and audit reports. A document is rendered from approved evidence and a governed template version; it records issuer, population, specification, results included or summarized, statement of conformity, signature purpose, issue time and supersession. A certificate cannot claim broader conformity than the inspected and released population.

Corrections issue a new version that references the superseded output. Customer-specific language passes approved template and legal review. Public verification uses a non-guessable token or signature and exposes only authorized fields. The current ReportDefinition and layout/customization structures are scaffolds ([ReportDefinition](../../apps/api/prisma/schema.prisma#L1226)); no certificate generator, signature or controlled document store is implemented.

~~~mermaid
flowchart TD
    DEC["Approved population decision"] --> ELIG{"Certificate eligibility rules"}
    ELIG -- No --> BLOCK["Block issuance with reason"]
    ELIG -- Yes --> DATA["Assemble frozen results/specification"]
    DATA --> TPL["Apply governed template version"]
    TPL --> SIGN["Purpose-bound issuer signature"]
    SIGN --> DOC["Immutable certificate version"]
    DOC --> VERIFY["Scoped authenticity verification"]
    DOC --> SUPER["Later correction supersedes; never overwrites"]
~~~

## 51. Quality Reporting and Analytics

Quality reporting uses governed definitions for inspection timeliness, first-pass yield, defect rate, supplier escapes, complaint rate, hold aging, NCR cycle time, CAPA overdue/effectiveness, audit closure and instrument impact. Each measure declares numerator, denominator, grain, event time, exclusions, late-data policy and owner. Drill-through respects row scope and privacy. Operational queues are distinguished from certified management measures.

The repository’s report-definition and dashboard services are scaffolds, not quality analytics. A quality dashboard may not calculate acceptance from a generic QC transaction count. Trend views identify specification/plan version changes to prevent false comparisons. Export watermarking and purpose logging apply to supplier, customer and personnel-sensitive datasets.

~~~mermaid
flowchart LR
    ODS["Quality operational evidence"] --> SEM["Governed quality semantic layer"]
    SEM --> KPI1["Inspection timeliness"]
    SEM --> KPI2["Defect and escape rates"]
    SEM --> KPI3["NCR/CAPA aging"]
    SEM --> KPI4["Supplier/customer quality"]
    KPI1 & KPI2 & KPI3 & KPI4 --> DASH["Role-scoped dashboards"]
    DASH --> DRILL["Authorized evidence drill-through"]
    SEM --> CERT["Certified period snapshot"]
~~~

## 52. Quality Reconciliation

Reconciliation proves that Quality decisions and authoritative-domain effects agree. Daily and close-period controls compare hold/release requests with Inventory statuses and quantities; rework/scrap dispositions with Manufacturing genealogy and Inventory effects; supplier decisions with Procurement actions; customer-quality outcomes with Sales/return references; instrument impact with reinspection; and quality-cost events with Finance references. Differences are aged, owned and resolved without editing source systems.

The reconciliation key combines tenant, population identity, decision version and requested effect. Partial acknowledgements are first-class. Dashboard health does not equal reconciliation completion. Certified reports disclose unresolved high-risk differences. Generic transaction links are a scaffold, but no quality reconciliation service exists.

~~~mermaid
flowchart TB
    Q["Quality decisions and effect requests"] --> MATCH["Identity/version/quantity matcher"]
    I["Inventory acknowledgements"] --> MATCH
    M["Manufacturing acknowledgements"] --> MATCH
    P["Procurement/Sales actions"] --> MATCH
    F["Finance references"] --> MATCH
    MATCH --> OK["Matched"]
    MATCH --> PART["Partial or stale"]
    MATCH --> MISS["Missing / conflicting"]
    PART & MISS --> CASE["Owned reconciliation exception"]
    CASE --> RES["Resolution evidence; no source overwrite"]
~~~

## 53. Quality Security and Segregation of Duties

Authorization evaluates action, object type, tenant/company/plant scope, quality role, qualification, population criticality, decision value, relationship to prior actions and delegation. Inspectors may enter results but cannot independently release their own critical failures. Plan authors cannot publish their own critical plan version. CAPA implementers cannot solely verify effectiveness. Supplier users can access only explicitly shared SCAR evidence. Internal Audit has read-only assurance access.

Electronic approval binds actor, purpose, object version, timestamp and authentication context. Break-glass hold authority is allowed because delay can increase harm; break-glass release is prohibited. Bulk actions require preview, bounded scope and independent approval. Repository identity/permissions and the generic AuditLog are platform scaffolds, while these quality-specific policies are Planned ([AuditLog](../../apps/api/prisma/schema.prisma#L1357)).

~~~mermaid
flowchart TD
    ACT["Requested quality action"] --> SCOPE{"Tenant/company/plant scope valid?"}
    SCOPE -- No --> DENY["Deny and audit"]
    SCOPE -- Yes --> QUAL{"Role and qualification valid?"}
    QUAL -- No --> DENY
    QUAL -- Yes --> SOD{"Prior action creates conflict?"}
    SOD -- Yes --> IND["Require independent actor"]
    SOD -- No --> RISK{"Critical decision?"}
    RISK -- Yes --> DUAL["Dual purpose-bound approval"]
    RISK -- No --> ALLOW["Authorize and append audit"]
    IND --> DUAL
~~~

## 54. Quality Threat Model

Quality evidence is vulnerable to falsified results, sample substitution, instrument impersonation, plan downgrades, premature release, attachment malware, certificate forgery, cross-tenant leakage, integration replay, time manipulation, collusive approval and analytics re-identification. Controls combine signed/versioned evidence, plan snapshots, sample identity, device trust, least privilege, dual control, malware scanning, content hashing, nonces/idempotency, trusted timestamps, reconciliation and anomaly review. Availability attacks are handled by safe-state rules: outage never implies acceptance.

Threat controls are proportional to consequence. A failed device signature routes to quarantine for review; it does not discard the observation silently. Privacy design minimizes customer and employee identifiers and separates operational evidence from broad analytics. The current platform provides authentication/audit foundations, not these quality-specific controls.

~~~mermaid
flowchart TB
    ADV["Malicious or compromised actor"] --> FAL["Forge result or certificate"]
    ADV --> SUB["Substitute sample/instrument"]
    ADV --> BYP["Bypass hold or approval"]
    ADV --> LEAK["Exfiltrate complaint/evidence"]
    ADV --> REP["Replay integration message"]
    FAL --> SIG["Hashes, signatures and version lineage"]
    SUB --> ID["Sample/device identity verification"]
    BYP --> SOD["Dual control and domain reconciliation"]
    LEAK --> PRIV["Purpose scope, masking and export logs"]
    REP --> NONCE["Nonce, idempotency and trusted time"]
~~~


## 55. Quality Capability Matrix

The matrix separates repository reality from target architecture. Every current foundation, scaffold and registration cites concrete evidence. Planned and Future rows explicitly state the absence of a dedicated Quality model, migration, service/controller or accepted test; they are not implementation claims. Status applies independently to each capability, even when a neighboring generic platform primitive exists.

| ID | Capability | Current status | Repository evidence or absence basis | Accountable owner | Supporting/dependency domain | Authority boundary |
|---|---|---|---|---|---|---|
| QCAP-001 | Item inspection-required flag | Implemented foundation | [Item.isQualityInspectionRequired](../../apps/api/prisma/schema.prisma#L1417); [seed](../../apps/api/prisma/seed.ts#L278) | Item Governance | Quality | Item Governance owns the Item field; Quality defines when the flag should trigger governed inspection. |
| QCAP-002 | Batch quality-status field | Implemented foundation | [Batch.qualityStatus](../../apps/api/prisma/schema.prisma#L1887); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql) | Inventory | Quality | Inventory owns the Batch field and stock identity; Quality supplies disposition semantics only. |
| QCAP-003 | Stock-status master | Implemented foundation | [StockStatus](../../apps/api/prisma/schema.prisma#L1859); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql) | Inventory | Warehouse / Quality | Inventory owns stock-status masters and transitions; Quality requests effects and Warehouse executes physical handling. |
| QCAP-004 | QUALITY_HOLD stock-status seed | Registered metadata only | [Seed registration](../../apps/api/prisma/seed.ts#L237) | Inventory | Quality / Data Governance | Inventory owns the registered code; the seed does not prove a hold workflow or Quality transition engine. |
| QCAP-005 | REJECTED stock-status seed | Registered metadata only | [Seed registration](../../apps/api/prisma/seed.ts#L237) | Inventory | Quality / Data Governance | Inventory owns the registered code; rejection and disposition behavior remain unimplemented. |
| QCAP-006 | Supplier master identity | Implemented foundation | [Supplier model](../../apps/api/prisma/schema.prisma#L1459); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql) | Procurement | Supplier Quality | Procurement owns Supplier identity and commercial status; Supplier Quality references it for technical decisions. |
| QCAP-007 | Customer master identity | Implemented foundation | [Customer model](../../apps/api/prisma/schema.prisma#L1485); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql) | Sales | Customer Quality | Sales owns Customer identity and relationship; Customer Quality references it for complaints and specifications. |
| QCAP-008 | Batch identity | Implemented foundation | [Batch model](../../apps/api/prisma/schema.prisma#L1878) | Inventory | Manufacturing / Quality | Inventory owns batch identity; Manufacturing supplies genealogy and Quality links evidence without rewriting the batch. |
| QCAP-009 | Serial identity | Implemented foundation | [SerialNumber model](../../apps/api/prisma/schema.prisma#L1899) | Inventory | Manufacturing / Quality | Inventory owns serial identity and custody; Quality attaches inspection evidence to the authoritative serial. |
| QCAP-010 | Plant identity | Implemented foundation | [Plant model](../../apps/api/prisma/schema.prisma#L383) | Operations | Quality / Organization Governance | Operations owns Plant structure; Quality scopes authority and plans to the referenced plant. |
| QCAP-011 | Warehouse identity | Implemented foundation | [Warehouse model](../../apps/api/prisma/schema.prisma#L818) | Inventory | Warehouse / Quality | Inventory owns Warehouse identity; Warehouse operates it and Quality only requests controlled status or location effects. |
| QCAP-012 | Unit-of-measure masters | Implemented foundation | [Item and UOM references](../../apps/api/prisma/schema.prisma#L1385) | Master Data Governance | Quality Engineering | Master Data owns UOM and conversion governance; Quality snapshots approved conversions for tolerances and results. |
| QCAP-013 | Generic workflow definitions | Scaffold | [WorkflowDefinition](../../apps/api/prisma/schema.prisma#L1135); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql) | Platform Engineering | Quality Product Owner | Platform owns the generic primitive; Quality-specific lifecycle guards and runtime remain absent. |
| QCAP-014 | Generic approval requests | Scaffold | [ApprovalRequest](../../apps/api/prisma/schema.prisma#L1300); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql) | Platform Engineering | Security / Quality | Platform owns the record; Security and Quality must define purpose-bound signatures and SoD. |
| QCAP-015 | Generic number series | Scaffold | [NumberSeries](../../apps/api/prisma/schema.prisma#L1330) | Platform Engineering | Quality / Data Governance | Platform owns numbering infrastructure; Quality numbering policy is not implemented. |
| QCAP-016 | Generic audit log | Scaffold | [AuditLog](../../apps/api/prisma/schema.prisma#L1357) | Security | Platform / Quality | Security owns audit infrastructure; immutable Quality-observation semantics remain a target. |
| QCAP-017 | Generic report definitions | Scaffold | [ReportDefinition](../../apps/api/prisma/schema.prisma#L1226) | Reporting | Quality / Data Governance | Reporting owns the generic definition; Quality measures and certification rules remain unimplemented. |
| QCAP-018 | Generic transaction links | Scaffold | [TransactionLink](../../apps/api/prisma/schema.prisma#L2345) | Platform Engineering | Data Governance / Quality | Platform owns generic links; typed Quality genealogy and completeness rules remain unimplemented. |
| QCAP-019 | QUALITY module code | Registered metadata only | [ModuleCode.QUALITY](../../apps/api/prisma/schema.prisma#L32) | Platform Engineering | Quality Product Owner | Platform owns the enum; the registered module code supplies no Quality runtime. |
| QCAP-020 | QC inspection transaction kind | Registered metadata only | [TransactionKind.QC_INSPECTION](../../apps/api/prisma/schema.prisma#L70) | Platform Engineering | Quality Product Owner | Platform owns the enum; the transaction kind does not execute inspection. |
| QCAP-021 | Quality Manager role seed | Registered metadata only | [Seed role](../../apps/api/prisma/seed.ts#L10) | Security | Quality Director | Security owns role registration; Quality-specific permissions and SoD remain unimplemented. |
| QCAP-022 | Quality department seed | Registered metadata only | [Seed department](../../apps/api/prisma/seed.ts#L150) | Organization Governance | Quality Director | Organization Governance owns the seeded department; it does not grant decision authority. |
| QCAP-023 | Quality Inspection EOR registration | Registered metadata only | [Seed EOR](../../apps/api/prisma/seed.ts#L28) | Platform Engineering | Quality Product Owner | Platform owns EOR registration; no Quality controller, service or test is supplied. |
| QCAP-024 | Characteristic master | Planned | Absent: no dedicated Characteristic master model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Characteristic master; supporting domains provide referenced identity and controlled technical input. |
| QCAP-025 | Characteristic versioning | Planned | Absent: no dedicated Characteristic versioning model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Characteristic versioning; supporting domains provide referenced identity and controlled technical input. |
| QCAP-026 | Method master | Planned | Absent: no dedicated Method master model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Method master; supporting domains provide referenced identity and controlled technical input. |
| QCAP-027 | Method qualification rule | Planned | Absent: no dedicated Method qualification rule model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Method qualification rule; supporting domains provide referenced identity and controlled technical input. |
| QCAP-028 | Defect taxonomy | Planned | Absent: no dedicated Defect taxonomy model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Defect taxonomy; supporting domains provide referenced identity and controlled technical input. |
| QCAP-029 | Severity taxonomy | Planned | Absent: no dedicated Severity taxonomy model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Severity taxonomy; supporting domains provide referenced identity and controlled technical input. |
| QCAP-030 | Disposition taxonomy | Planned | Absent: no dedicated Disposition taxonomy model/service/test | Quality | Inventory / Manufacturing / Procurement / Sales | Quality owns the NCR or disposition meaning for Disposition taxonomy; each downstream domain executes only its authoritative action. |
| QCAP-031 | Quality reason codes | Planned | Absent: no dedicated Quality reason codes model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Quality reason codes; supporting domains provide referenced identity and controlled technical input. |
| QCAP-032 | Quality master publication | Planned | Absent: no dedicated Quality master publication model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Quality master publication; supporting domains provide referenced identity and controlled technical input. |
| QCAP-033 | Product specification | Planned | Absent: no dedicated Product specification model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Product specification; supporting domains provide referenced identity and controlled technical input. |
| QCAP-034 | Supplier-item specification | Planned | Absent: no dedicated Supplier-item specification model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Supplier-item specification; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-035 | Customer-item specification | Planned | Absent: no dedicated Customer-item specification model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Customer-item specification; supporting domains provide referenced identity and controlled technical input. |
| QCAP-036 | Specification precedence | Planned | Absent: no dedicated Specification precedence model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Specification precedence; supporting domains provide referenced identity and controlled technical input. |
| QCAP-037 | Specification effective dating | Planned | Absent: no dedicated Specification effective dating model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Specification effective dating; supporting domains provide referenced identity and controlled technical input. |
| QCAP-038 | Quality plan | Planned | Absent: no dedicated Quality plan model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Quality plan; supporting domains provide referenced identity and controlled technical input. |
| QCAP-039 | Inspection plan | Planned | Absent: no dedicated Inspection plan model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Inspection plan; supporting domains provide referenced identity and controlled technical input. |
| QCAP-040 | Plan validation | Planned | Absent: no dedicated Plan validation model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Plan validation; supporting domains provide referenced identity and controlled technical input. |
| QCAP-041 | Plan snapshot | Planned | Absent: no dedicated Plan snapshot model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Plan snapshot; supporting domains provide referenced identity and controlled technical input. |
| QCAP-042 | Sampling-plan master | Planned | Absent: no dedicated Sampling-plan master model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Sampling-plan master; supporting domains provide referenced identity and controlled technical input. |
| QCAP-043 | AQL table resolution | Planned | Absent: no dedicated AQL table resolution model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for AQL table resolution; supporting domains provide referenced identity and controlled technical input. |
| QCAP-044 | Switching-rule history | Planned | Absent: no dedicated Switching-rule history model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Switching-rule history; supporting domains provide referenced identity and controlled technical input. |
| QCAP-045 | Random sample selection | Planned | Absent: no dedicated Random sample selection model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Random sample selection; supporting domains provide referenced identity and controlled technical input. |
| QCAP-046 | Sample identity | Planned | Absent: no dedicated Sample identity model/service/test | Quality Engineering | Data Governance / Engineering / Master Data | Quality Engineering owns the Quality master or planning semantics for Sample identity; supporting domains provide referenced identity and controlled technical input. |
| QCAP-047 | Inspection-request creation | Planned | Absent: no dedicated Inspection-request creation model/service/test | Quality Operations | Security / Integration / Quality Engineering | Quality Operations owns execution control for Inspection-request creation; supporting services enforce identity, qualification, plan and evidence rules. |
| QCAP-048 | Source-event idempotency | Planned | Absent: no dedicated Source-event idempotency model/service/test | Quality Operations | Security / Integration / Quality Engineering | Quality Operations owns execution control for Source-event idempotency; supporting services enforce identity, qualification, plan and evidence rules. |
| QCAP-049 | Reinspection relationship | Planned | Absent: no dedicated Reinspection relationship model/service/test | Quality Operations | Security / Integration / Quality Engineering | Quality Operations owns execution control for Reinspection relationship; supporting services enforce identity, qualification, plan and evidence rules. |
| QCAP-050 | Resample authorization | Planned | Absent: no dedicated Resample authorization model/service/test | Quality Operations | Security / Integration / Quality Engineering | Quality Operations owns execution control for Resample authorization; supporting services enforce identity, qualification, plan and evidence rules. |
| QCAP-051 | Inspector work queue | Planned | Absent: no dedicated Inspector work queue model/service/test | Quality Operations | Security / Integration / Quality Engineering | Quality Operations owns execution control for Inspector work queue; supporting services enforce identity, qualification, plan and evidence rules. |
| QCAP-052 | Inspector qualification check | Planned | Absent: no dedicated Inspector qualification check model/service/test | Quality Operations | Security / Integration / Quality Engineering | Quality Operations owns execution control for Inspector qualification check; supporting services enforce identity, qualification, plan and evidence rules. |
| QCAP-053 | Step prerequisite enforcement | Planned | Absent: no dedicated Step prerequisite enforcement model/service/test | Quality Operations | Security / Integration / Quality Engineering | Quality Operations owns execution control for Step prerequisite enforcement; supporting services enforce identity, qualification, plan and evidence rules. |
| QCAP-054 | Manual result capture | Planned | Absent: no dedicated Manual result capture model/service/test | Quality Operations | Security / Integration / Quality Engineering | Quality Operations owns execution control for Manual result capture; supporting services enforce identity, qualification, plan and evidence rules. |
| QCAP-055 | Device result ingestion | Planned | Absent: no dedicated Device result ingestion model/service/test | Quality Operations | Security / Integration / Quality Engineering | Quality Operations owns execution control for Device result ingestion; supporting services enforce identity, qualification, plan and evidence rules. |
| QCAP-056 | Result normalization | Planned | Absent: no dedicated Result normalization model/service/test | Quality Operations | Security / Integration / Quality Engineering | Quality Operations owns execution control for Result normalization; supporting services enforce identity, qualification, plan and evidence rules. |
| QCAP-057 | Result rule evaluation | Planned | Absent: no dedicated Result rule evaluation model/service/test | Quality Operations | Security / Integration / Quality Engineering | Quality Operations owns execution control for Result rule evaluation; supporting services enforce identity, qualification, plan and evidence rules. |
| QCAP-058 | Result correction lineage | Planned | Absent: no dedicated Result correction lineage model/service/test | Quality Operations | Security / Integration / Quality Engineering | Quality Operations owns execution control for Result correction lineage; supporting services enforce identity, qualification, plan and evidence rules. |
| QCAP-059 | Inspection outcome approval | Planned | Absent: no dedicated Inspection outcome approval model/service/test | Quality Operations | Security / Integration / Quality Engineering | Quality Operations owns execution control for Inspection outcome approval; supporting services enforce identity, qualification, plan and evidence rules. |
| QCAP-060 | Incoming inspection trigger | Planned | Absent: no dedicated Incoming inspection trigger model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Incoming inspection trigger; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-061 | Receipt hold request | Planned | Absent: no dedicated Receipt hold request model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Receipt hold request; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-062 | Supplier risk-based severity | Planned | Absent: no dedicated Supplier risk-based severity model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Supplier risk-based severity; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-063 | Certificate-at-receipt validation | Planned | Absent: no dedicated Certificate-at-receipt validation model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Certificate-at-receipt validation; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-064 | Remote source inspection | Planned | Absent: no dedicated Remote source inspection model/service/test | Supplier Quality | Quality / relevant source domain | Supplier Quality is accountable for Remote source inspection; supporting domains provide governed inputs without transferring authoritative write access. |
| QCAP-065 | Dock-to-stock eligibility | Planned | Absent: no dedicated Dock-to-stock eligibility model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Dock-to-stock eligibility; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-066 | Receipt release request | Planned | Absent: no dedicated Receipt release request model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Receipt release request; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-067 | Incoming rejection decision | Planned | Absent: no dedicated Incoming rejection decision model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Incoming rejection decision; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-068 | Supplier escape recording | Planned | Absent: no dedicated Supplier escape recording model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Supplier escape recording; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-069 | In-process checkpoint | Planned | Absent: no dedicated In-process checkpoint model/service/test | Quality | Manufacturing / Inventory / Sales | Quality owns inspection and acceptance for In-process checkpoint; Manufacturing owns execution, Inventory owns movement and Sales owns customer commitment. |
| QCAP-070 | First-piece control | Planned | Absent: no dedicated First-piece control model/service/test | Quality | Manufacturing / Inventory / Sales | Quality owns inspection and acceptance for First-piece control; Manufacturing owns execution, Inventory owns movement and Sales owns customer commitment. |
| QCAP-071 | Patrol schedule | Planned | Absent: no dedicated Patrol schedule model/service/test | Quality | Manufacturing / Inventory / Sales | Quality owns inspection and acceptance for Patrol schedule; Manufacturing owns execution, Inventory owns movement and Sales owns customer commitment. |
| QCAP-072 | Periodic inspection | Planned | Absent: no dedicated Periodic inspection model/service/test | Quality | Manufacturing / Inventory / Sales | Quality owns inspection and acceptance for Periodic inspection; Manufacturing owns execution, Inventory owns movement and Sales owns customer commitment. |
| QCAP-073 | Final inspection | Planned | Absent: no dedicated Final inspection model/service/test | Quality | Manufacturing / Inventory / Sales | Quality owns inspection and acceptance for Final inspection; Manufacturing owns execution, Inventory owns movement and Sales owns customer commitment. |
| QCAP-074 | Pre-dispatch inspection | Planned | Absent: no dedicated Pre-dispatch inspection model/service/test | Quality | Manufacturing / Inventory / Sales | Quality owns inspection and acceptance for Pre-dispatch inspection; Manufacturing owns execution, Inventory owns movement and Sales owns customer commitment. |
| QCAP-075 | Customer-specific inspection | Planned | Absent: no dedicated Customer-specific inspection model/service/test | Quality | Quality / relevant source domain | Quality is accountable for Customer-specific inspection; supporting domains provide governed inputs without transferring authoritative write access. |
| QCAP-076 | Destructive-test sequencing | Planned | Absent: no dedicated Destructive-test sequencing model/service/test | Quality | Manufacturing / Inventory / Sales | Quality owns inspection and acceptance for Destructive-test sequencing; Manufacturing owns execution, Inventory owns movement and Sales owns customer commitment. |
| QCAP-077 | Partial-population acceptance | Planned | Absent: no dedicated Partial-population acceptance model/service/test | Quality | Manufacturing / Inventory / Sales | Quality owns inspection and acceptance for Partial-population acceptance; Manufacturing owns execution, Inventory owns movement and Sales owns customer commitment. |
| QCAP-078 | Population-scoped hold | Planned | Absent: no dedicated Population-scoped hold model/service/test | Quality | Inventory / Manufacturing | Quality owns the decision for Population-scoped hold; Inventory or Manufacturing validates, applies and acknowledges the operational effect. |
| QCAP-079 | Emergency hold | Planned | Absent: no dedicated Emergency hold model/service/test | Quality | Inventory / Manufacturing | Quality owns the decision for Emergency hold; Inventory or Manufacturing validates, applies and acknowledges the operational effect. |
| QCAP-080 | Hold expansion | Planned | Absent: no dedicated Hold expansion model/service/test | Quality | Inventory / Manufacturing | Quality owns the decision for Hold expansion; Inventory or Manufacturing validates, applies and acknowledges the operational effect. |
| QCAP-081 | Hold reduction | Planned | Absent: no dedicated Hold reduction model/service/test | Quality | Inventory / Manufacturing | Quality owns the decision for Hold reduction; Inventory or Manufacturing validates, applies and acknowledges the operational effect. |
| QCAP-082 | Competing-hold evaluation | Planned | Absent: no dedicated Competing-hold evaluation model/service/test | Quality | Inventory / Manufacturing | Quality owns the decision for Competing-hold evaluation; Inventory or Manufacturing validates, applies and acknowledges the operational effect. |
| QCAP-083 | Independent release approval | Planned | Absent: no dedicated Independent release approval model/service/test | Quality | Inventory / Manufacturing | Quality owns the decision for Independent release approval; Inventory or Manufacturing validates, applies and acknowledges the operational effect. |
| QCAP-084 | Release-effect request | Planned | Absent: no dedicated Release-effect request model/service/test | Quality | Inventory / Manufacturing | Quality owns the decision for Release-effect request; Inventory or Manufacturing validates, applies and acknowledges the operational effect. |
| QCAP-085 | Release reversal | Planned | Absent: no dedicated Release reversal model/service/test | Quality | Inventory / Manufacturing | Quality owns the decision for Release reversal; Inventory or Manufacturing validates, applies and acknowledges the operational effect. |
| QCAP-086 | Effect acknowledgement | Planned | Absent: no dedicated Effect acknowledgement model/service/test | Quality | Inventory / Manufacturing | Quality owns the decision for Effect acknowledgement; Inventory or Manufacturing validates, applies and acknowledges the operational effect. |
| QCAP-087 | NCR creation | Planned | Absent: no dedicated NCR creation model/service/test | Quality | Inventory / Manufacturing / Procurement / Sales | Quality owns the NCR or disposition meaning for NCR creation; each downstream domain executes only its authoritative action. |
| QCAP-088 | NCR lifecycle | Planned | Absent: no dedicated NCR lifecycle model/service/test | Quality | Inventory / Manufacturing / Procurement / Sales | Quality owns the NCR or disposition meaning for NCR lifecycle; each downstream domain executes only its authoritative action. |
| QCAP-089 | Affected-scope analysis | Planned | Absent: no dedicated Affected-scope analysis model/service/test | Quality | Inventory / Manufacturing / Procurement / Sales | Quality owns the NCR or disposition meaning for Affected-scope analysis; each downstream domain executes only its authoritative action. |
| QCAP-090 | Containment plan | Planned | Absent: no dedicated Containment plan model/service/test | Quality | Inventory / Manufacturing / Procurement / Sales | Quality owns the NCR or disposition meaning for Containment plan; each downstream domain executes only its authoritative action. |
| QCAP-091 | Containment verification | Planned | Absent: no dedicated Containment verification model/service/test | Quality | Inventory / Manufacturing / Procurement / Sales | Quality owns the NCR or disposition meaning for Containment verification; each downstream domain executes only its authoritative action. |
| QCAP-092 | Split disposition | Planned | Absent: no dedicated Split disposition model/service/test | Quality | Inventory / Manufacturing / Procurement / Sales | Quality owns the NCR or disposition meaning for Split disposition; each downstream domain executes only its authoritative action. |
| QCAP-093 | Use-as-is decision | Planned | Absent: no dedicated Use-as-is decision model/service/test | Quality | Inventory / Manufacturing / Procurement / Sales | Quality owns the NCR or disposition meaning for Use-as-is decision; each downstream domain executes only its authoritative action. |
| QCAP-094 | Deviation management | Planned | Absent: no dedicated Deviation management model/service/test | Quality | Inventory / Manufacturing / Procurement / Sales | Quality owns the NCR or disposition meaning for Deviation management; each downstream domain executes only its authoritative action. |
| QCAP-095 | Concession and waiver | Planned | Absent: no dedicated Concession and waiver model/service/test | Quality | Inventory / Manufacturing / Procurement / Sales | Quality owns the NCR or disposition meaning for Concession and waiver; each downstream domain executes only its authoritative action. |
| QCAP-096 | Corrective action | Planned | Absent: no dedicated Corrective action model/service/test | Quality | Authoritative action domains / Internal Audit | Quality governs evidence and acceptance for Corrective action; action owners implement changes and an independent verifier evaluates effectiveness. |
| QCAP-097 | Preventive action | Planned | Absent: no dedicated Preventive action model/service/test | Quality | Authoritative action domains / Internal Audit | Quality governs evidence and acceptance for Preventive action; action owners implement changes and an independent verifier evaluates effectiveness. |
| QCAP-098 | CAPA case | Planned | Absent: no dedicated CAPA case model/service/test | Quality | Authoritative action domains / Internal Audit | Quality governs evidence and acceptance for CAPA case; action owners implement changes and an independent verifier evaluates effectiveness. |
| QCAP-099 | CAPA aggregation | Planned | Absent: no dedicated CAPA aggregation model/service/test | Quality | Authoritative action domains / Internal Audit | Quality governs evidence and acceptance for CAPA aggregation; action owners implement changes and an independent verifier evaluates effectiveness. |
| QCAP-100 | Five-whys evidence | Planned | Absent: no dedicated Five-whys evidence model/service/test | Quality | Authoritative action domains / Internal Audit | Quality governs evidence and acceptance for Five-whys evidence; action owners implement changes and an independent verifier evaluates effectiveness. |
| QCAP-101 | Fault-tree evidence | Planned | Absent: no dedicated Fault-tree evidence model/service/test | Quality | Authoritative action domains / Internal Audit | Quality governs evidence and acceptance for Fault-tree evidence; action owners implement changes and an independent verifier evaluates effectiveness. |
| QCAP-102 | Cause confidence | Planned | Absent: no dedicated Cause confidence model/service/test | Quality | Authoritative action domains / Internal Audit | Quality governs evidence and acceptance for Cause confidence; action owners implement changes and an independent verifier evaluates effectiveness. |
| QCAP-103 | Action-to-cause coverage | Planned | Absent: no dedicated Action-to-cause coverage model/service/test | Quality | Authoritative action domains / Internal Audit | Quality governs evidence and acceptance for Action-to-cause coverage; action owners implement changes and an independent verifier evaluates effectiveness. |
| QCAP-104 | Effectiveness verification | Planned | Absent: no dedicated Effectiveness verification model/service/test | Quality | Authoritative action domains / Internal Audit | Quality governs evidence and acceptance for Effectiveness verification; action owners implement changes and an independent verifier evaluates effectiveness. |
| QCAP-105 | Supplier quality profile | Planned | Absent: no dedicated Supplier quality profile model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Supplier quality profile; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-106 | Supplier-item qualification | Planned | Absent: no dedicated Supplier-item qualification model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Supplier-item qualification; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-107 | Supplier audit | Planned | Absent: no dedicated Supplier audit model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Supplier audit; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-108 | Supplier performance scorecard | Planned | Absent: no dedicated Supplier performance scorecard model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Supplier performance scorecard; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-109 | SCAR issue | Planned | Absent: no dedicated SCAR issue model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for SCAR issue; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-110 | SCAR staged response | Planned | Absent: no dedicated SCAR staged response model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for SCAR staged response; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-111 | Supplier containment verification | Planned | Absent: no dedicated Supplier containment verification model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Supplier containment verification; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-112 | Supplier restriction recommendation | Planned | Absent: no dedicated Supplier restriction recommendation model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Supplier restriction recommendation; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-113 | Supplier quality trend | Planned | Absent: no dedicated Supplier quality trend model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Supplier quality trend; Procurement owns commercial action and Inventory owns receipt status/movement. |
| QCAP-114 | Complaint-quality triage | Planned | Absent: no dedicated Complaint-quality triage model/service/test | Customer Quality | Sales / Customer Service / Inventory | Customer Quality owns technical investigation for Complaint-quality triage; Sales/Customer Service owns remedy and Inventory owns return movement/status. |
| QCAP-115 | Complaint safety escalation | Planned | Absent: no dedicated Complaint safety escalation model/service/test | Customer Quality | Sales / Customer Service / Inventory | Customer Quality owns technical investigation for Complaint safety escalation; Sales/Customer Service owns remedy and Inventory owns return movement/status. |
| QCAP-116 | Returned-unit chain of custody | Planned | Absent: no dedicated Returned-unit chain of custody model/service/test | Customer Quality | Sales / Customer Service / Inventory | Customer Quality owns technical investigation for Returned-unit chain of custody; Sales/Customer Service owns remedy and Inventory owns return movement/status. |
| QCAP-117 | Failure reproduction | Planned | Absent: no dedicated Failure reproduction model/service/test | Customer Quality | Sales / Customer Service / Inventory | Customer Quality owns technical investigation for Failure reproduction; Sales/Customer Service owns remedy and Inventory owns return movement/status. |
| QCAP-118 | No-fault-found outcome | Planned | Absent: no dedicated No-fault-found outcome model/service/test | Customer Quality | Sales / Customer Service / Inventory | Customer Quality owns technical investigation for No-fault-found outcome; Sales/Customer Service owns remedy and Inventory owns return movement/status. |
| QCAP-119 | Customer-quality investigation | Planned | Absent: no dedicated Customer-quality investigation model/service/test | Customer Quality | Sales / Customer Service / Inventory | Customer Quality owns technical investigation for Customer-quality investigation; Sales/Customer Service owns remedy and Inventory owns return movement/status. |
| QCAP-120 | Customer response review | Planned | Absent: no dedicated Customer response review model/service/test | Customer Quality | Sales / Customer Service / Inventory | Customer Quality owns technical investigation for Customer response review; Sales/Customer Service owns remedy and Inventory owns return movement/status. |
| QCAP-121 | Field-failure trend | Planned | Absent: no dedicated Field-failure trend model/service/test | Customer Quality | Sales / Customer Service / Inventory | Customer Quality owns technical investigation for Field-failure trend; Sales/Customer Service owns remedy and Inventory owns return movement/status. |
| QCAP-122 | Customer escape measure | Planned | Absent: no dedicated Customer escape measure model/service/test | Customer Quality | Sales / Customer Service / Inventory | Customer Quality owns technical investigation for Customer escape measure; Sales/Customer Service owns remedy and Inventory owns return movement/status. |
| QCAP-123 | Quality genealogy | Planned | Absent: no dedicated Quality genealogy model/service/test | Quality | Inventory / Manufacturing / Data Governance / Sales | Quality owns Quality lineage and exposure classification for Quality genealogy; source domains remain authoritative for identity, genealogy and delivery records. |
| QCAP-124 | Result-to-sample trace | Planned | Absent: no dedicated Result-to-sample trace model/service/test | Quality | Inventory / Manufacturing / Data Governance / Sales | Quality owns Quality lineage and exposure classification for Result-to-sample trace; source domains remain authoritative for identity, genealogy and delivery records. |
| QCAP-125 | Instrument-to-result trace | Planned | Absent: no dedicated Instrument-to-result trace model/service/test | Quality Engineering | Maintenance / Metrology | Quality decides inspection fitness and evidence impact for Instrument-to-result trace; Maintenance/Metrology owns equipment state and calibration execution. |
| QCAP-126 | Decision-to-effect trace | Planned | Absent: no dedicated Decision-to-effect trace model/service/test | Quality | Inventory / Manufacturing / Data Governance / Sales | Quality owns Quality lineage and exposure classification for Decision-to-effect trace; source domains remain authoritative for identity, genealogy and delivery records. |
| QCAP-127 | Backward source trace | Planned | Absent: no dedicated Backward source trace model/service/test | Quality | Inventory / Manufacturing / Data Governance / Sales | Quality owns Quality lineage and exposure classification for Backward source trace; source domains remain authoritative for identity, genealogy and delivery records. |
| QCAP-128 | Forward exposure trace | Planned | Absent: no dedicated Forward exposure trace model/service/test | Quality | Inventory / Manufacturing / Data Governance / Sales | Quality owns Quality lineage and exposure classification for Forward exposure trace; source domains remain authoritative for identity, genealogy and delivery records. |
| QCAP-129 | Related-lot discovery | Planned | Absent: no dedicated Related-lot discovery model/service/test | Quality | Inventory / Manufacturing / Data Governance / Sales | Quality owns Quality lineage and exposure classification for Related-lot discovery; source domains remain authoritative for identity, genealogy and delivery records. |
| QCAP-130 | Recall population support | Future | Absent: no dedicated Recall population support model/service/test | Quality | Inventory / Manufacturing / Data Governance / Sales | Quality owns Quality lineage and exposure classification for Recall population support; source domains remain authoritative for identity, genealogy and delivery records. |
| QCAP-131 | Recall-list versioning | Future | Absent: no dedicated Recall-list versioning model/service/test | Quality | Inventory / Manufacturing / Data Governance / Sales | Quality owns Quality lineage and exposure classification for Recall-list versioning; source domains remain authoritative for identity, genealogy and delivery records. |
| QCAP-132 | Instrument-class requirement | Planned | Absent: no dedicated Instrument-class requirement model/service/test | Quality Engineering | Maintenance / Metrology | Quality decides inspection fitness and evidence impact for Instrument-class requirement; Maintenance/Metrology owns equipment state and calibration execution. |
| QCAP-133 | Instrument eligibility check | Planned | Absent: no dedicated Instrument eligibility check model/service/test | Quality Engineering | Maintenance / Metrology | Quality decides inspection fitness and evidence impact for Instrument eligibility check; Maintenance/Metrology owns equipment state and calibration execution. |
| QCAP-134 | Calibration-status consumption | Planned | Absent: no dedicated Calibration-status consumption model/service/test | Quality Engineering | Maintenance / Metrology | Quality decides inspection fitness and evidence impact for Calibration-status consumption; Maintenance/Metrology owns equipment state and calibration execution. |
| QCAP-135 | Calibration certificate reference | Planned | Absent: no dedicated Calibration certificate reference model/service/test | Quality Engineering | Maintenance / Metrology | Quality decides inspection fitness and evidence impact for Calibration certificate reference; Maintenance/Metrology owns equipment state and calibration execution. |
| QCAP-136 | Out-of-tolerance impact | Planned | Absent: no dedicated Out-of-tolerance impact model/service/test | Quality Engineering | Maintenance / Metrology | Quality decides inspection fitness and evidence impact for Out-of-tolerance impact; Maintenance/Metrology owns equipment state and calibration execution. |
| QCAP-137 | Result impact assessment | Planned | Absent: no dedicated Result impact assessment model/service/test | Quality Engineering | Maintenance / Inventory / Manufacturing | Quality assesses which inspection results and product decisions are suspect; Maintenance supplies as-found calibration evidence and operating domains apply holds or reinspection effects. |
| QCAP-138 | Calibration-extension review | Planned | Absent: no dedicated Calibration-extension review model/service/test | Quality Engineering | Maintenance / Metrology | Quality decides inspection fitness and evidence impact for Calibration-extension review; Maintenance/Metrology owns equipment state and calibration execution. |
| QCAP-139 | External lab qualification | Planned | Absent: no dedicated External lab qualification model/service/test | Quality | Procurement / Metrology / Legal | Quality approves laboratory method competence and evidence acceptability; Procurement owns the commercial relationship and Metrology/Legal supply specialist review. |
| QCAP-140 | Reinspection after calibration failure | Planned | Absent: no dedicated Reinspection after calibration failure model/service/test | Quality Engineering | Maintenance / Metrology | Quality decides inspection fitness and evidence impact for Reinspection after calibration failure; Maintenance/Metrology owns equipment state and calibration execution. |
| QCAP-141 | Control chart | Planned | Absent: no dedicated Control chart model/service/test | Quality Assurance | Reporting / Manufacturing / Security | Quality Assurance owns the governed interpretation for Control chart; source data, process action and document security remain with their domain owners. |
| QCAP-142 | Run-rule signal | Planned | Absent: no dedicated Run-rule signal model/service/test | Quality Assurance | Reporting / Manufacturing / Security | Quality Assurance owns the governed interpretation for Run-rule signal; source data, process action and document security remain with their domain owners. |
| QCAP-143 | Process capability | Planned | Absent: no dedicated Process capability model/service/test | Quality | Authoritative action domains / Internal Audit | Quality governs evidence and acceptance for Process capability; action owners implement changes and an independent verifier evaluates effectiveness. |
| QCAP-144 | Acceptance-sampling analytics | Planned | Absent: no dedicated Acceptance-sampling analytics model/service/test | Quality Assurance | Reporting / Manufacturing / Security | Quality Assurance owns the governed interpretation for Acceptance-sampling analytics; source data, process action and document security remain with their domain owners. |
| QCAP-145 | Quality audit program | Planned | Absent: no dedicated Quality audit program model/service/test | Quality Assurance | Reporting / Manufacturing / Security | Quality Assurance owns the governed interpretation for Quality audit program; source data, process action and document security remain with their domain owners. |
| QCAP-146 | Audit checklist version | Planned | Absent: no dedicated Audit checklist version model/service/test | Quality Assurance | Reporting / Manufacturing / Security | Quality Assurance owns the governed interpretation for Audit checklist version; source data, process action and document security remain with their domain owners. |
| QCAP-147 | Audit finding | Planned | Absent: no dedicated Audit finding model/service/test | Quality Assurance | Reporting / Manufacturing / Security | Quality Assurance owns the governed interpretation for Audit finding; source data, process action and document security remain with their domain owners. |
| QCAP-148 | Certificate of analysis | Planned | Absent: no dedicated Certificate of analysis model/service/test | Quality Assurance | Reporting / Manufacturing / Security | Quality Assurance owns the governed interpretation for Certificate of analysis; source data, process action and document security remain with their domain owners. |
| QCAP-149 | Certificate supersession | Planned | Absent: no dedicated Certificate supersession model/service/test | Quality Assurance | Reporting / Manufacturing / Security | Quality Assurance owns the governed interpretation for Certificate supersession; source data, process action and document security remain with their domain owners. |
| QCAP-150 | Inspection timeliness measure | Planned | Absent: no dedicated Inspection timeliness measure model/service/test | Reporting | Quality / Data Governance | Reporting owns delivery of Inspection timeliness measure; Quality owns measure meaning/certification and source domains retain their records. |
| QCAP-151 | First-pass yield measure | Planned | Absent: no dedicated First-pass yield measure model/service/test | Reporting | Quality / Data Governance | Reporting owns delivery of First-pass yield measure; Quality owns measure meaning/certification and source domains retain their records. |
| QCAP-152 | Defect-rate measure | Planned | Absent: no dedicated Defect-rate measure model/service/test | Reporting | Quality / Data Governance | Reporting owns delivery of Defect-rate measure; Quality owns measure meaning/certification and source domains retain their records. |
| QCAP-153 | Hold-aging measure | Planned | Absent: no dedicated Hold-aging measure model/service/test | Reporting | Quality / Data Governance | Reporting owns delivery of Hold-aging measure; Quality owns measure meaning/certification and source domains retain their records. |
| QCAP-154 | NCR cycle-time measure | Planned | Absent: no dedicated NCR cycle-time measure model/service/test | Reporting | Quality / Data Governance | Reporting owns delivery of NCR cycle-time measure; Quality owns measure meaning/certification and source domains retain their records. |
| QCAP-155 | CAPA effectiveness measure | Planned | Absent: no dedicated CAPA effectiveness measure model/service/test | Reporting | Quality / Data Governance | Reporting owns delivery of CAPA effectiveness measure; Quality owns measure meaning/certification and source domains retain their records. |
| QCAP-156 | Quality management dashboard | Planned | Absent: no dedicated Quality management dashboard model/service/test | Reporting | Quality / Data Governance | Reporting owns delivery of Quality management dashboard; Quality owns measure meaning/certification and source domains retain their records. |
| QCAP-157 | Cross-domain reconciliation | Planned | Absent: no dedicated Cross-domain reconciliation model/service/test | Operations | Quality / Inventory / Manufacturing / Commercial domains | Operations owns exception resolution for Cross-domain reconciliation; Quality and each source domain correct only their own authoritative record. |
| QCAP-158 | Certified quality snapshot | Planned | Absent: no dedicated Certified quality snapshot model/service/test | Reporting | Quality / Data Governance | Reporting owns delivery of Certified quality snapshot; Quality owns measure meaning/certification and source domains retain their records. |
| QCAP-159 | Quality scope authorization | Planned | Absent: no dedicated Quality scope authorization model/service/test | Security | Quality / Internal Audit | Security owns enforcement for Quality scope authorization; Quality defines consequential actions and Internal Audit assesses control evidence. |
| QCAP-160 | Inspector-release segregation | Planned | Absent: no dedicated Inspector-release segregation model/service/test | Security | Quality / Internal Audit | Security owns enforcement for Inspector-release segregation; Quality defines consequential actions and Internal Audit assesses control evidence. |
| QCAP-161 | Plan author-publisher segregation | Planned | Absent: no dedicated Plan author-publisher segregation model/service/test | Security | Quality / Internal Audit | Security owns enforcement for Plan author-publisher segregation; Quality defines consequential actions and Internal Audit assesses control evidence. |
| QCAP-162 | CAPA implementer-verifier segregation | Planned | Absent: no dedicated CAPA implementer-verifier segregation model/service/test | Security | Quality / Internal Audit | Security owns enforcement for CAPA implementer-verifier segregation; Quality defines consequential actions and Internal Audit assesses control evidence. |
| QCAP-163 | Break-glass hold | Planned | Absent: no dedicated Break-glass hold model/service/test | Security | Quality / Internal Audit | Security owns enforcement for Break-glass hold; Quality defines consequential actions and Internal Audit assesses control evidence. |
| QCAP-164 | Electronic quality signature | Planned | Absent: no dedicated Electronic quality signature model/service/test | Security | Quality / Internal Audit | Security owns enforcement for Electronic quality signature; Quality defines consequential actions and Internal Audit assesses control evidence. |
| QCAP-165 | Quality event publication | Planned | Absent: no dedicated Quality event publication model/service/test | Integration | Quality / Owning domain | Quality event publication is delivered by Integration; Quality supplies decision context and the receiving domain validates its authoritative effect. |
| QCAP-166 | Idempotent domain command | Planned | Absent: no dedicated Idempotent domain command model/service/test | Integration | Quality / Owning domain | Idempotent domain command is delivered by Integration; Quality supplies decision context and the receiving domain validates its authoritative effect. |
| QCAP-167 | Integration replay defense | Planned | Absent: no dedicated Integration replay defense model/service/test | Integration | Quality / Owning domain | Integration replay defense is delivered by Integration; Quality supplies decision context and the receiving domain validates its authoritative effect. |
| QCAP-168 | Offline inspection capture | Future | Absent: no dedicated Offline inspection capture model/service/test | Quality Product Owner | Security / Integration / AI Governance / Quality | Quality Product Owner owns the future capability decision for Offline inspection capture; advisory technology cannot obtain inspection, release or closure authority. |
| QCAP-169 | Mobile sample identification | Future | Absent: no dedicated Mobile sample identification model/service/test | Quality Product Owner | Security / Integration / AI Governance / Quality | Quality Product Owner owns the future capability decision for Mobile sample identification; advisory technology cannot obtain inspection, release or closure authority. |
| QCAP-170 | Edge instrument gateway | Future | Absent: no dedicated Edge instrument gateway model/service/test | Quality Engineering | Maintenance / Metrology | Quality decides inspection fitness and evidence impact for Edge instrument gateway; Maintenance/Metrology owns equipment state and calibration execution. |
| QCAP-171 | Computer-vision recommendation | Future | Absent: no dedicated Computer-vision recommendation model/service/test | Quality Product Owner | Security / Integration / AI Governance / Quality | Quality Product Owner owns the future capability decision for Computer-vision recommendation; advisory technology cannot obtain inspection, release or closure authority. |
| QCAP-172 | AI defect clustering | Future | Absent: no dedicated AI defect clustering model/service/test | Quality Product Owner | Security / Integration / AI Governance / Quality | Quality Product Owner owns the future capability decision for AI defect clustering; advisory technology cannot obtain inspection, release or closure authority. |
| QCAP-173 | AI cause hypothesis | Future | Absent: no dedicated AI cause hypothesis model/service/test | Quality Product Owner | Security / Integration / AI Governance / Quality | Quality Product Owner owns the future capability decision for AI cause hypothesis; advisory technology cannot obtain inspection, release or closure authority. |
| QCAP-174 | Predictive quality signal | Future | Absent: no dedicated Predictive quality signal model/service/test | Quality Product Owner | Security / Integration / AI Governance / Quality | Quality Product Owner owns the future capability decision for Predictive quality signal; advisory technology cannot obtain inspection, release or closure authority. |
| QCAP-175 | Digital certificate verification | Planned | Absent: no dedicated Digital certificate verification model/service/test | Quality Assurance | Reporting / Manufacturing / Security | Quality Assurance owns the governed interpretation for Digital certificate verification; source data, process action and document security remain with their domain owners. |
| QCAP-176 | Federated supplier-quality exchange | Future | Absent: no dedicated Federated supplier-quality exchange model/service/test | Supplier Quality | Procurement / Inventory | Supplier Quality owns the technical decision for Federated supplier-quality exchange; Procurement owns commercial action and Inventory owns receipt status/movement. |


## 56. Quality Risk, Example and Responsibility Models

### 56.1 Quality risk register

The register describes concrete failure conditions rather than generic project concerns. Residual direction is an architecture expectation, not a claim that controls operate today.

| Risk ID | Quality area | Risk | Current condition | Impact | Target mitigation | Owner | Residual-risk direction |
|---|---|---|---|---|---|---|---|
| QR-001 | Master data and plans | Wrong specification version | An inspection request resolves overlapping enterprise, plant and customer specifications incorrectly, or keeps a cached revision after supersession. | Results may be accepted against obsolete limits, invalidating the inspection decision and any Inventory release or customer certificate. | Freeze the resolved specification on request creation; validate effective dates and precedence; block ties; require Quality and Engineering approval for controlled overrides. | Quality Engineering | Low after precedence test cases and cache invalidation monitoring; emergency supersession timing remains monitored. |
| QR-002 | Master data and plans | Wrong inspection plan | The request selects a plan for another inspection type, item, operation or plant, or uses a stale revision missing a critical characteristic, method or instrument class. | The inspector performs the wrong work and Quality may release material that was never evaluated against mandatory controls, affecting Manufacturing and Inventory. | Validate plan applicability, revision, critical-step coverage, methods and instrument requirements before release; snapshot the validated plan on the request. | Quality Engineering | Low when plan-publication and request-resolution tests pass; local master-data errors remain subject to periodic review. |
| QR-003 | Master data and plans | Wrong sampling plan | Lot context resolves the wrong AQL, inspection level, switching state or variable-versus-attribute rule because supplier, item or severity inputs are stale. | The sample cannot support the lot decision, allowing defective supply into Inventory or rejecting conforming supply and disrupting Procurement. | Snapshot all sampling inputs and resolved rule; validate supplier-item severity and switching history; block ambiguous matches; independently approve manual departures. | Quality Engineering | Medium-low because statistical assumptions can still be wrong even when rule resolution is controlled. |
| QR-004 | Sampling | Wrong sample size | The lot-size band, severity level or switching state is misread, the population is incomplete, or an inspector manually reduces the derived sample. | A biased or undersized sample overstates acceptance confidence and may release defective units across the entire receipt or batch. | Derive sample size from the frozen population and rule; prohibit unapproved reduction; reconcile selected, tested and unavailable units; require independent override approval. | Quality Manager | Medium-low; rare inaccessible units and destructive testing still require documented statistical judgment. |
| QR-005 | Sampling | Sample substitution | An inspector replaces a randomly selected unit with an easier unit, silently swaps a damaged sample, or tests a serial or batch different from the recorded selection. | Randomization integrity and sample-to-result traceability are lost, so the inspection outcome cannot defend release of the source population. | Scan each selected sample identity at collection and test; record substitutions with reason, original identity and approval; audit selection patterns for operator bias. | Quality Operations Manager | Medium-low because physical sample tampering remains possible without supervised collection or device controls. |
| QR-006 | Integration and operations | Wrong lot | A split receipt, relabeled container or manual entry attaches the inspection request to a neighboring supplier lot rather than the population sampled. | Results and disposition apply to the wrong stock, leaving the actual lot uninspected and potentially releasing unrelated Inventory. | Validate receipt line, supplier lot and container labels at request creation and sampling; reconcile inspected quantity to the authoritative receipt population. | Supplier Quality Engineer | Low after barcode validation and receipt reconciliation; damaged or unreadable supplier labels remain an exception. |
| QR-007 | Integration and operations | Wrong batch | A stale barcode, alias or manual lookup links results to another internal batch with the same item or production order. | Quality status, certificate and hold decisions become attached to the wrong batch, corrupting Inventory and Manufacturing genealogy. | Require authoritative batch scans at sample collection and result entry; reject item or plant mismatch; reconcile decision scope to batch genealogy before release. | Quality Manager | Low after scan enforcement; relabeling operations still need independent batch-identity checks. |
| QR-008 | Integration and operations | Wrong serial | The inspected unit is physically different from the serial recorded because of transposition, duplicate label or sample exchange. | A defective serial may ship while a conforming serial is blocked, and customer traceability becomes unreliable. | Scan and display serial identity at each custody transfer; detect duplicates; bind photographs or device results to the serial; verify before disposition. | Quality Operations Manager | Low for serialized scans; residual label-counterfeit risk requires physical marking controls. |
| QR-009 | Integration and operations | Wrong item | The receipt or production event carries an alternate SKU, obsolete item code or variant while plan resolution uses a visually similar item. | The wrong requirements and methods are applied, invalidating acceptance and potentially disrupting Inventory, Manufacturing and customer commitments. | Validate authoritative item, revision and variant against source event and sample label; block plan resolution when identity or revision is ambiguous. | Quality Engineering | Low after item/revision validation; packaging misidentification remains a physical-control risk. |
| QR-010 | Supplier quality | Wrong supplier | A receipt line inherits the vendor from another PO line, or a subcontractor lot is recorded under the approved supplier. | Supplier-specific inspection severity and qualification are bypassed, weakening incoming control and Procurement recourse. | Bind supplier and manufacturing-site identity from the PO and receipt; validate supplier-item approval; record subcontract source where required. | Supplier Quality Engineer | Medium-low because undeclared supplier sub-tier changes depend on contractual disclosure and audit. |
| QR-011 | Customer quality | Wrong customer | Pre-dispatch inspection resolves requirements from a different sold-to, ship-to or destination after an order or delivery change. | The shipment may lack mandatory customer tests or carry an inappropriate certificate, creating rejection or contractual exposure. | Resolve customer requirements from the current Sales order and delivery version; invalidate inspection when customer, destination or product population changes. | Customer Quality Engineer | Low after delivery-version correlation; late customer changes still require controlled reinspection. |
| QR-012 | Inspection evidence | Wrong inspection type | A source trigger creates an incoming, in-process, final or pre-dispatch request under the wrong type and therefore selects incompatible controls. | Required timing, sampling and release gates may be skipped, allowing downstream activity before the intended Quality decision. | Map each source event to an approved inspection type; validate event, subject and lifecycle stage; block generic fallback and test every trigger route. | Quality Product Owner | Low when trigger-contract tests remain current; new source events require governance before activation. |
| QR-013 | Inspection evidence | Missing inspection | A qualifying receipt, operation, setup change, final batch or staged shipment produces no request because the event is lost or the item flag and plan disagree. | Material can move, production can continue or shipment can leave without required Quality evidence. | Reconcile source events to expected requests; use idempotent trigger processing, missing-request alerts and a domain gate that requires an acknowledged Quality decision. | Quality Operations Manager | Medium-low because source-system outages can delay detection; safe-state operational procedures remain required. |
| QR-014 | Inspection evidence | Duplicate inspection | Retries or competing triggers create two inspection requests for the same source event and plan version. | Conflicting outcomes, double sampling and inconsistent release requests confuse Inventory or Manufacturing and weaken auditability. | Enforce an idempotency key using source event, subject, trigger and plan version; link authorized reinspection or resampling as separate typed relationships. | Quality Product Owner | Low after idempotency and duplicate-detection tests; legitimate split populations still need careful scoping. |
| QR-015 | Inspection evidence | Fake inspection | A user fabricates observations without examining the selected sample, imports a forged device file or copies prior results. | Quality evidence and release become fraudulent, exposing customers and defeating audit, supplier and regulatory assurance. | Require attributable capture, sample and instrument identity, device provenance, anomaly review and independent approval for critical outcomes; protect raw evidence from overwrite. | Quality Director | Medium because collusion and sophisticated device forgery cannot be eliminated solely by application controls. |
| QR-016 | Integration and operations | Unqualified inspector | An assigned user lacks current method, product, site or instrument qualification when executing a controlled step. | Measurements may be invalid and Quality decisions unreliable, requiring reinspection and possible holds across Inventory or Manufacturing. | Check qualification and expiry at assignment and observation time; block incompatible steps; route exceptional supervision through documented approval. | Quality Manager | Low when qualification records are current; emergency staffing and newly introduced methods remain monitored. |
| QR-017 | Security and authority | Shared-terminal attribution loss | Multiple inspectors use one logged-in workstation or leave a session open, making result authorship uncertain. | Electronic evidence cannot prove who observed or corrected a result, weakening SoD, investigations and certificate assurance. | Require individual re-authentication for result submission and approval, short session locks, workstation policy and review of concurrent or improbable activity. | Security | Medium-low because physical credential sharing requires supervisory and cultural controls beyond software. |
| QR-018 | Inspection evidence | Result tampering | A user or integration alters raw values, pass/fail evaluation, attachment or timestamp after observation without a controlled correction. | Failed characteristics can be hidden and released product, NCR history and certificates become untrustworthy. | Store append-only result versions with hashes, source provenance and correction linkage; restrict database writes; alert on integrity or sequence anomalies. | Security and Quality Manager | Low after immutable storage and monitoring; privileged-administrator compromise remains a residual threat. |
| QR-019 | Inspection evidence | Measurement rounding error | Entered precision, unit conversion or display rounding changes a value near an acceptance limit and reverses pass/fail. | Quality may accept out-of-tolerance product or reject conforming product, affecting release, scrap and customer assurance. | Preserve raw and normalized values; govern conversion and rounding rules by characteristic/method; evaluate limits before display rounding; test boundary cases. | Quality Engineering | Low after boundary test coverage; measurement uncertainty near limits still requires guard-band policy. |
| QR-020 | Measurement equipment | Instrument out of calibration | Calibration is expired at measurement time, drift is later discovered in an as-found failure, or status data arrives late from Maintenance. | All results since the last-known-valid point may be suspect, leaving accepted batches, WIP or shipments exposed. | Verify Maintenance-owned calibration status at observation time; link instrument to results; trigger impact assessment, hold and reinspection when as-found failure occurs. | Quality Manager | Medium-low because the true onset of drift may precede the last calibration and require conservative scope. |
| QR-021 | Measurement equipment | Instrument wrong range | An instrument is calibrated but lacks the required range, resolution, accuracy or uncertainty for the characteristic. | The recorded value appears valid while being incapable of demonstrating conformity, invalidating inspection and downstream release. | Match method requirements to instrument class and current configuration; block out-of-range selection; review overload and resolution indicators in device data. | Quality Engineering | Low after eligibility checks; manual devices still depend on correct setup and reading technique. |
| QR-022 | Master data and plans | Inspection passed despite failed characteristic | A critical characteristic fails but an average score, manual override or incorrect aggregation marks the overall inspection accepted. | Mandatory failure is concealed and Inventory release or Manufacturing continuation proceeds for nonconforming product. | Encode critical-characteristic fail-fast rules; prohibit averaging or ordinary override; require independent Quality review and explicit concession path if legally permissible. | Quality Director | Low after rule and SoD tests; incorrect criticality classification remains an upstream master-data risk. |
| QR-023 | Inspection evidence | Partial result treated as final | Some required steps, samples, attachments or calculated results are incomplete when the request is evaluated as finished. | Quality may release an untested population and later evidence cannot show that all plan requirements were satisfied. | Enforce step, sample and attachment completeness; distinguish provisional from final evaluations; block approval until critical and conditional branches resolve. | Quality Operations Manager | Low after completeness guards; externally delayed laboratory results remain a scheduling risk. |
| QR-024 | Integration and operations | Conditional acceptance lost | A concession, expiry, restricted use or customer condition is omitted when the accepted outcome is transmitted downstream. | Inventory or Manufacturing may treat restricted material as fully available, and Sales may ship beyond the approved condition. | Represent conditional acceptance as an explicit decision version with constraints; include conditions in every domain request and reconcile their acknowledgement. | Quality Manager | Medium-low because downstream users can still misunderstand conditions without clear operational display and training. |
| QR-025 | Hold and release | Hold not propagated | Quality issues a hold but Inventory or Manufacturing does not acknowledge it because the command is lost, rejected or delayed. | The affected batch remains available or the operation continues while Quality incorrectly appears to have controlled the exposure. | Keep the hold in effect-pending state until domain acknowledgement; retry idempotently, escalate timeouts and reconcile Quality scope to Inventory and WIP state. | Quality Operations Manager | Medium until cross-domain availability and escalation objectives are proven under outage testing. |
| QR-026 | Hold and release | Hold scope too broad | A lot-wide hold is sent when only defined serials, quantities or a production window are affected. | Conforming stock and WIP are unnecessarily blocked, disrupting production, fulfillment and inventory availability. | Require explicit population type, quantity, UOM and genealogy basis; preview scope; approve expansions separately and reconcile partial application. | Quality Manager | Low after scoped-command validation; uncertain genealogy may still justify conservative temporary over-containment. |
| QR-027 | Hold and release | Hold scope too narrow | The hold names only sampled units or current stock while related batch quantities, WIP, in-transit material or deliveries remain outside scope. | Nonconforming product can continue through operations or reach customers despite the Quality decision. | Derive confirmed and suspect populations from authoritative genealogy; include remote and in-transit locations; expand scope until completeness is verified. | Quality Director | Medium-low because incomplete external or legacy genealogy may require manual investigation. |
| QR-028 | Hold and release | Release without approval | A user, integration or customization sends a release before required independent approval, with incomplete inspection or open NCR constraints. | Restricted stock or WIP becomes usable and audit evidence cannot establish accountable Quality acceptance. | Enforce purpose-bound approval on the exact decision version; block release with missing evidence or holds; deny domain commands to unauthorized identities. | Quality Director | Low after authorization and abuse testing; break-glass hold remains allowed but break-glass release stays prohibited. |
| QR-029 | Hold and release | Partial release over-applied | Quality approves only selected serials or a defined quantity, but Inventory releases the whole batch or ignores a competing hold. | Unapproved product becomes available or ships, and Quality-to-Inventory quantities no longer reconcile. | Transmit exact identities, quantity, UOM and decision version; require Inventory partial acknowledgement; compare applied scope and preserve all competing holds. | Inventory Manager | Low after population-level reconciliation; bulk warehouse operations remain a monitored execution risk. |
| QR-030 | Hold and release | Inventory status mismatch | Quality decision state and Inventory stock status diverge because an effect is rejected, manually reversed or applied to a different population. | Users see contradictory availability, causing accidental issue, shipment or duplicate containment work. | Run continuous decision-to-stock reconciliation keyed by batch/serial, quantity and version; age exceptions and prohibit Quality from directly repairing Inventory records. | Inventory Manager | Low with daily reconciliation; transient timing differences remain visible as effect pending. |
| QR-031 | Hold and release | Manufacturing continues through hold | A Quality hold on WIP or an operation window is not translated into a Manufacturing stop/block, or a supervisor overrides it without authority. | Subsequent operations consume or transform suspect WIP, expanding affected genealogy and rework or scrap exposure. | Manufacturing must acknowledge the defined hold and record operation state; Quality monitors acknowledgement and expands containment when production crosses the boundary. | Production Manager | Medium-low because physical continuation can occur during communication or system outages and needs shop-floor controls. |
| QR-032 | Supplier quality | Supplier receipt accepted before Quality | Inventory makes a receipt available before the required incoming inspection reaches an approved outcome. | Uninspected supplier material can be issued to production, weakening supplier control and increasing containment scope. | Use an Inventory-owned non-available receipt status; require a correlated Quality release decision before availability; reconcile receipt and released quantities. | Inventory Manager | Low after receipt-gate tests; emergency-use concessions require separate documented authority. |
| QR-033 | Hold and release | Customer shipment released before Quality | Warehouse dispatches staged goods before final or customer-specific Quality clearance is acknowledged. | Customers may receive uninspected product or missing required documents, creating complaints, returns and contractual exposure. | Gate dispatch on a population-specific Quality clearance; invalidate clearance after batch substitution; reconcile staged, inspected and shipped identities. | Warehouse Manager | Low after dispatch-gate testing; manual carrier loading remains an operational supervision risk. |
| QR-034 | Nonconformance and disposition | NCR not created | A failed result, complaint, audit finding or supplier defect that meets NCR policy is left only as free text or an inspection failure. | Containment, disposition and trend evidence are absent, allowing recurrence and preventing accountable cross-domain action. | Define deterministic NCR triggers and reviewer queues; reconcile qualifying failures to NCRs; require documented justification for non-creation. | Quality Manager | Low after trigger reconciliation; novel failure modes may still depend on professional judgment. |
| QR-035 | Nonconformance and disposition | Duplicate NCR | Multiple teams open separate NCRs for the same event or retry, fragmenting affected population, actions and ownership. | Conflicting containment or disposition can be issued and defect metrics overstate occurrence while evidence remains split. | Use source-event idempotency and similarity review; link genuinely related cases without merging histories; require one controlling NCR for each coherent event. | Quality Manager | Low after duplicate controls; cross-site events may still require linked local records. |
| QR-036 | Nonconformance and disposition | NCR closed early | The NCR closes while containment is unresolved, disposition is not executed, reinspection or domain acknowledgement is open, or required CAPA remains pending. | Affected product may remain available and management sees false completion while Inventory, Manufacturing or supplier actions are unfinished. | Enforce closure gates for scope, containment, disposition quantities, reinspection and all domain acknowledgements; keep linked CAPA/effectiveness obligations visible. | Quality Director | Low after state-guard tests; external supplier or customer actions can still extend closure timing. |
| QR-037 | Nonconformance and disposition | Defect code misclassification | An inspector selects a convenient defect code that describes the wrong manifestation or confuses cause, defect and disposition. | Trend analysis targets the wrong problem, sampling severity may not escalate and CAPA can address an unrelated mechanism. | Separate manifestation, severity, cause and disposition taxonomies; provide evidence-guided coding; review high-severity and frequently recoded defects. | Quality Engineering | Medium-low because novel defects require controlled taxonomy extension and expert interpretation. |
| QR-038 | Nonconformance and disposition | Severity understated | Actual safety, regulatory, customer or functional exposure is scored as minor due to missing context or commercial pressure. | Containment, approval and escalation are weakened, potentially allowing serious defects to ship or avoid CAPA. | Derive severity from controlled criteria and product criticality; require independent review for downgrades; preserve original and revised assessments. | Quality Director | Medium because severity contains professional judgment and changing exposure information. |
| QR-039 | Nonconformance and disposition | Containment incomplete | Only current stock is held while related WIP, in-transit material, supplier stock or shipped product is ignored because the genealogy window is incomplete. | Defective product continues through production or reaches customers, and later recall or sorting scope grows substantially. | Map confirmed and suspect populations across Inventory, Manufacturing, Procurement and Sales; require domain acknowledgements; expand scope until genealogy completeness is justified. | Quality Director | Medium because external supplier and customer holdings may be only partially visible even after internal reconciliation. |
| QR-040 | Nonconformance and disposition | Related lots missed | Investigation traces only the failed lot and overlooks sibling lots made from the same supplier delivery, machine campaign, tool or process window. | Potentially affected Inventory and WIP remain available, and customer exposure may be discovered only after another failure. | Use backward and forward genealogy across material, resource, tool and time window; document cleared, suspect and unknown related lots; reconcile every domain response. | Quality Engineering | Medium because incomplete legacy or supplier genealogy can leave unknown populations requiring conservative containment. |
| QR-041 | Nonconformance and disposition | Related shipments missed | The affected batch or serial search does not include staged, in-transit or already delivered populations, or Sales delivery links are stale. | Customers may continue using affected product and Customer Service cannot coordinate timely technical communication. | Trace Quality population to current delivery versions and carrier status; classify on-hand, staged, in-transit and delivered exposure; require Sales acknowledgement. | Customer Quality Engineer | Medium because third-party logistics and distributor visibility may remain delayed. |
| QR-042 | Nonconformance and disposition | Rework without Quality approval | Manufacturing starts an informal repair or alternate route before Quality approves the NCR disposition, criteria and affected population. | Original defects can be obscured, genealogy and cost become incomplete, and the reworked output may never receive required reinspection. | Block rework execution without a versioned Quality disposition; provide approved route constraints and acceptance criteria; correlate Manufacturing execution and post-rework inspection. | Production Manager | Low after production-order gating; physical bench repair outside the system remains a supervisory risk. |
| QR-043 | Inspection evidence | Reinspection skipped | A reworked, sorted or conditionally accepted population is released using the original failed inspection without the required follow-up request. | The correction is never verified, so nonconforming product can return to available stock or production. | Make reinspection a mandatory related request for applicable dispositions; prevent release until the new plan is complete and its population reconciles to execution. | Quality Manager | Low after disposition-state guards; exceptional destructive or unavailable samples still require approved alternative evidence. |
| QR-044 | Nonconformance and disposition | Scrap without disposition | WIP or stock is moved to scrap, destroyed or financially written off without an approved Quality disposition for the identified quantity. | Quality evidence, Inventory history, Manufacturing genealogy and Finance write-off cannot be reconciled, and salvage may escape control. | Require a population-specific Quality scrap decision before operational effects; separately acknowledge Manufacturing intent, Inventory movement, destruction and Finance posting. | Operations Manager | Low after cross-domain gating; emergency physical destruction still needs retrospective evidence and dual control. |
| QR-045 | Nonconformance and disposition | Deviation expired | Production or inspection continues after the approved time or quantity limit, or a cached deviation remains presented as active. | Output is accepted outside authorized requirements, invalidating Quality release and potentially customer or regulatory commitments. | Meter deviation usage by time and quantity; check validity at each decision; block exhausted or revoked scope; route permanent need to controlled specification change. | Quality Manager | Low after real-time validity checks; delayed source-event timestamps remain monitored. |
| QR-046 | Nonconformance and disposition | Concession over-applied | A concession approved for a defined batch, serial set, quantity, customer or use is reused for other populations or orders. | Nonconforming product is treated as broadly acceptable and customer-specific authorization or pricing conditions are bypassed. | Bind concession to violated requirement, population, use, customer and expiry; decrement authorized quantity; reject reuse outside exact scope. | Quality Director | Low after scoped validation; manual relabeling or order substitution remains an operational risk. |
| QR-047 | Nonconformance and disposition | Waiver reused | A prospective waiver is copied into later orders, sites or revisions after its approved duration or rationale has ended. | A temporary relaxation becomes an uncontrolled specification change and weakens inspection across unrelated populations. | Version waivers with explicit subject, site, quantity and expiry; prohibit template cloning without new review; trend recurrence toward permanent controlled change. | Quality Director | Low after expiry and scope enforcement; repeated business pressure still requires governance oversight. |
| QR-048 | CAPA | CAPA missing | A systemic, recurrent, high-severity or audit-defined issue closes as a local correction without opening CAPA. | The causal mechanism persists across products or sites and management loses visibility of systemic action obligations. | Define risk-based CAPA criteria; reconcile qualifying NCR, complaint, audit and supplier cases to CAPA decisions; require documented non-escalation approval. | Quality Director | Medium-low because identifying systemic recurrence still requires expert judgment and cross-site data. |
| QR-049 | CAPA | Wrong root cause | A favored hypothesis is accepted without mechanism testing, a symptom is labeled causal, or an operator is blamed without examining process, system and control evidence. | Corrective action targets the wrong mechanism, recurrence continues and CAPA closure creates false assurance. | Record hypotheses, supporting and contrary evidence; distinguish occurrence and escape causes; require causal verification and independent Quality approval before action selection. | Quality Engineering | Medium because complex failures may have interacting causes and limited experimental evidence. |
| QR-050 | CAPA | Corrective action ineffective | An action is implemented but does not control the verified cause, is applied to the wrong scope or creates a new failure mode. | Defects recur while cost and schedule increase, and customers or suppliers may receive misleading closure statements. | Map every action to a proven cause and affected scope; validate implementation; predefine outcome metrics and reopen when recurrence or adverse effects appear. | Quality Manager | Medium-low because low-frequency failures may require long observation periods to prove sustained control. |
| QR-051 | CAPA | Effectiveness check skipped | Implementation evidence is mistaken for effectiveness, so the case closes without observing the planned metric, population or duration. | Training or procedure completion is reported as success while the defect mechanism remains active. | Freeze effectiveness criteria before action closure; schedule an independent verifier; block final closure until sufficient outcome evidence is evaluated. | Quality Director | Low after lifecycle enforcement; rare-event effectiveness may remain indeterminate rather than proven. |
| QR-052 | CAPA | CAPA closed early | Actions are marked complete before the effectiveness window ends, the target metric is reached or an independent verifier records the outcome. | Systemic risk remains while dashboards and customer or supplier responses show a falsely closed CAPA. | Separate implementation complete from effectiveness complete; enforce due window, metric and verifier; reopen ineffective cases and preserve original closure attempt. | Quality Director | Low after state-guard and SoD tests; extended evidence windows can still delay final assurance. |
| QR-053 | Supplier quality | SCAR overdue | The supplier misses acknowledgement, containment, root-cause or action milestones and the case remains in a passive waiting state. | Defective supply may continue, Procurement lacks timely escalation evidence and production disruption grows. | Set severity-based SCAR milestones; escalate overdue stages to Supplier Quality and Procurement; require interim containment and restrict inspection severity recommendations until verified. | Supplier Quality Manager | Medium because commercial leverage and supplier capability determine actual response speed. |
| QR-054 | Supplier quality | Supplier response accepted without verification | The supplier submits persuasive paperwork but containment is unconfirmed, root cause unsupported or action effectiveness absent, and Supplier Quality closes the response. | Defects recur in later receipts and Procurement may lift controls or settle claims on unreliable technical evidence. | Verify each response stage against receipt, remote containment and recurrence evidence; require proof of cause and effectiveness; escalate inadequate response to Procurement. | Supplier Quality Manager | Medium-low because remote evidence can be incomplete or deliberately selective without onsite audit. |
| QR-055 | Customer quality | Complaint suppressed | A complaint is downgraded, hidden in Customer Service notes or omitted from Quality intake due to commercial pressure or incomplete symptom data. | Safety or systemic signals are missed, affected product remains in the field and complaint metrics understate exposure. | Reconcile complaint intake to Quality triage; protect severity/reportability escalation; audit cancellations and downgrades; allow confidential escalation to Quality and Legal. | Customer Service Manager | Medium because customers may provide incomplete information or avoid formal complaint channels. |
| QR-056 | Customer quality | Return mislinked | A returned unit is associated with the wrong delivery, batch, serial or customer complaint because labels are damaged or authorization references are reused. | Failure analysis reaches the wrong genealogy, customer remedy may be incorrect and Inventory return status becomes unreliable. | Establish chain of custody from return authorization through receipt; verify serial/batch and delivery; record uncertainty and prohibit inferred identity from driving release. | Customer Quality Engineer | Medium-low because damaged or counterfeit identity may remain unresolved after investigation. |
| QR-057 | Customer quality | Failure analysis incomplete | Analysis stops after reproducing a symptom, omits destructive tests or relevant use conditions, or closes as no-fault-found without exhausting the approved plan. | The true defect and related population remain unknown, weakening customer response, containment and CAPA decisions. | Use a versioned analysis plan with required evidence, environmental context and destructive-test approval; document limitations and independent technical review. | Customer Quality Engineer | Medium because returned units may be altered, intermittent or insufficient to reproduce the field failure. |
| QR-058 | Traceability and recall | Traceability gap | A quality result, decision or NCR lacks a reliable link to sample, batch/serial, operation, instrument or downstream acknowledgement. | Affected populations cannot be bounded, certificates cannot be defended and holds or recalls become slower and broader. | Require typed lineage at each transaction; monitor orphan records and completeness; block consequential decisions when mandatory identity edges are absent. | Data Governance | Medium-low because external and legacy records may retain incomplete genealogy despite internal controls. |
| QR-059 | Traceability and recall | Recall scope incomplete | Recall support uses an outdated query or omits suspect lots, in-transit stock, distributors or delivered serials because source genealogy is incomplete. | Affected product remains with customers while cleared product may be unnecessarily withdrawn, increasing harm and cost. | Freeze and version recall criteria; combine Manufacturing, Inventory, Procurement and Sales traces; classify confirmed, suspect, cleared and unknown populations; reconcile totals. | Quality Director | Medium-high until legal, distributor and external-data operating procedures are approved and tested. |
| QR-060 | Audit and documents | Certificate generated from stale data | A result is corrected, specification superseded, population changed or release reversed after an earlier snapshot is used to render a certificate. | The customer receives a conformity claim that no longer matches approved evidence, creating contractual and assurance exposure. | Revalidate certificate eligibility at issuance; bind results, specification, population and release versions; invalidate cached output and issue a superseding document after any relevant change. | Quality Manager | Low after event-driven invalidation and issuance checks; documents already downloaded still require customer notification. |
| QR-061 | Audit and documents | Certificate not revoked after correction | A corrected inspection or reversed release invalidates an issued certificate but the old version remains marked current or verifiable. | Customers and auditors may rely on an obsolete conformity statement even after Quality knows it is wrong. | Link corrections and release reversals to certificate status; automatically suspend eligibility; require controlled revocation/supersession and notify Sales or Customer Service. | Quality Assurance Manager | Low after revocation propagation; recipients may retain offline copies that require explicit communication. |
| QR-062 | Measurement equipment | Calibration overdue | Maintenance-owned calibration due date passes while the instrument remains selectable for inspection or disconnected status data is stale. | New measurements may be invalid and affected production or receipts require retrospective hold and reinspection. | Block instrument eligibility after due time; consume Maintenance status with freshness checks; alert owners before expiry and provide controlled extension workflow. | Maintenance Manager | Low after eligibility gating; physical use outside connected workflows remains a supervisory risk. |
| QR-063 | Measurement equipment | Failed calibration impact not assessed | An instrument fails as-found calibration but Quality does not search results since the last-known-valid date or evaluate accepted populations. | Suspect inspections remain approved, allowing affected Inventory, WIP or shipments to escape hold and reinspection. | Publish the as-found error and validity boundary from Maintenance; traverse instrument-to-result lineage; open impact cases, request holds and document reinspection decisions. | Quality Manager | Medium because drift onset may be unknown and require a conservative, potentially broad impact window. |
| QR-064 | Analytics | SPC false alarm | Control charts mix products, plan revisions or shifts, use an unapproved baseline, or apply an unsuitable run rule. | Manufacturing adjusts a stable process unnecessarily, increasing variation, downtime or scrap while trust in Quality analytics declines. | Segment homogeneous populations; version baseline, subgroup and rules; flag plan changes; require Quality Engineer review before any Manufacturing advisory. | Quality Engineering | Medium-low because natural process changes can still challenge model assumptions between reviews. |
| QR-065 | Analytics | SPC missed signal | Control limits are wrong, data is excluded or delayed, subgrouping masks a shift, or a method revision is not reflected in the series. | A real deterioration continues undetected, producing broader WIP, Inventory and customer exposure before containment starts. | Validate completeness and ordering; govern limits and subgroup definitions; monitor excluded data and latency; require periodic chart review against known events. | Quality Engineering | Medium-low because weak or rare signals may remain statistically ambiguous even with correct data. |
| QR-066 | Audit and documents | Audit finding deleted | An auditor or administrator removes or overwrites a finding, objective evidence or severity after issue rather than using controlled correction. | Management and Internal Audit lose the true assurance history, and required actions or CAPA can disappear. | Make issued findings immutable; append corrections with reason and approval; restrict deletion privileges; reconcile audit evidence and action links. | Quality Assurance Manager | Low after immutable records and privileged-access monitoring; collusion remains a residual assurance risk. |
| QR-067 | Audit and documents | Auditor conflict of interest | The auditor owns, designed or recently executed the process being audited and is assigned without disclosed independence review. | Findings may be suppressed or softened, making audit conclusions and follow-up unreliable. | Record auditor relationships and competence; block prohibited assignments; approve justified exceptions and require independent review of findings. | Quality Director | Medium-low because organizational familiarity and subtle reporting pressure cannot be fully detected automatically. |
| QR-068 | Security and authority | Quality record tampering | A privileged user changes inspection, NCR, CAPA, audit or certificate evidence directly in storage or through an ungoverned integration. | Disposition, traceability and assurance records become unreliable across every downstream domain. | Use append-only versions, cryptographic integrity, least privilege, database separation, audit monitoring and independent recovery comparison. | Security | Low after technical controls; privileged compromise and collusion remain included in threat monitoring. |
| QR-069 | Master data and plans | Cross-plant access | A user authorized for one plant views or changes another plant’s inspections, holds, supplier cases or certificates without delegated scope. | Sensitive evidence leaks and unauthorized decisions can affect stock or production outside the user’s operational accountability. | Evaluate plant scope on every read and action; require time-bounded delegation; test bulk and search endpoints; audit cross-scope attempts. | Security | Low after scope tests; centrally assigned roles require periodic necessity review. |
| QR-070 | Security and authority | Cross-tenant leakage | A query, export, attachment link or integration message omits tenant filtering and exposes another tenant’s Quality evidence. | Confidential customer, supplier and product information is disclosed and decisions may be attached to the wrong tenant. | Enforce tenant keys in data access and storage paths; use isolation tests, signed download authorization and tenant-aware event routing. | Security | Very low after isolation testing, but treated as critical residual risk requiring continuous monitoring. |
| QR-071 | Security and authority | Direct Inventory write | A Quality customization directly changes stock status, location or quantity instead of sending an Inventory command. | Inventory validation and history are bypassed, so physical stock and Quality decision state diverge and Finance valuation may be affected. | Permit only typed, idempotent Inventory commands with expected state and population; deny Quality database permissions; reconcile returned Inventory acknowledgements. | Inventory Product Owner | Low after permission and integration abuse tests; privileged database administration remains monitored. |
| QR-072 | Security and authority | Direct Manufacturing write | Quality code changes operation state, production confirmation, WIP, rework execution or scrap intent directly. | Manufacturing genealogy and capacity evidence become unauditable, and Quality disposition appears to execute work it does not own. | Expose controlled Manufacturing requests only; enforce service/database authorization; require Manufacturing validation and versioned execution acknowledgement. | Manufacturing Product Owner | Low after contract and permission tests; emergency shop-floor actions still require subsequent reconciliation. |
| QR-073 | Security and authority | Direct Procurement write | A Quality workflow changes supplier commercial status, PO, return, debit or claim without Procurement authorization. | Technical supplier evidence becomes an unauthorized commercial sanction and contractual records lose accountable ownership. | Route verified Quality recommendations and SCAR evidence to Procurement; deny commercial mutation privileges; reconcile Procurement’s accepted or rejected action. | Procurement Product Owner | Low after access controls; urgent supplier containment still needs rapid but accountable commercial coordination. |
| QR-074 | Security and authority | Direct Sales write | Quality directly creates return authorization, replacement, customer promise, credit or order change after a complaint or concession. | Technical investigation bypasses Sales authority and may create inconsistent commitments or Finance effects. | Send a scoped technical decision to Sales and Customer Service; prohibit commercial writes; retain their remedy acknowledgement on the Quality case. | Sales Product Owner | Low after permission tests; manual off-system customer promises remain a commercial-control risk. |
| QR-075 | Security and authority | Direct Maintenance write | Quality changes equipment condition, calibration status, hold/release state or maintenance work order directly after an instrument concern. | Equipment history becomes unreliable and Quality may present an instrument as ready without Maintenance evidence. | Consume Maintenance-owned state and issue work or impact requests; deny equipment-state mutations; correlate Maintenance completion and calibration evidence. | Maintenance Product Owner | Low after contract enforcement; disconnected calibration providers still require controlled evidence import. |
| QR-076 | Security and authority | Direct Finance write | Quality disposition or complaint logic posts journals, write-offs, debit, credit or refund records without Finance validation. | Financial ledgers, periods, valuation and approvals are bypassed, creating material reconciliation and audit risk. | Publish approved quality-cost evidence only; require Finance to determine and post effects; deny Quality posting permissions and retain posting references. | Finance Controller | Low after posting-access tests; manual Finance interpretation of ambiguous Quality scope remains reviewed. |
| QR-077 | Security and authority | Customization bypass | A custom rule, workflow or extension skips inspection, hold, release, NCR, CAPA, SoD or reconciliation checks. | Local convenience silently weakens mandatory Quality controls and creates behavior not visible to central governance or audit. | Define non-bypassable policy gates; statically and dynamically test extensions; require signed publication, change review and kill switch for violations. | Quality Product Owner | Medium-low because novel extension paths require continuous control testing and governance. |
| QR-078 | Inspection evidence | AI inspection attempt | An AI model infers a measurement or pass/fail outcome from images or text and writes it as completed inspection without qualified human execution. | Unvalidated model output becomes Quality evidence and may drive release despite missing sample, method or instrument controls. | Restrict AI identities to read and draft scopes; label outputs; block result and outcome APIs; require qualified inspector verification of every observation. | AI Governance and Quality Director | Low while execution permissions remain technically denied; future validated vision systems require separate approved architecture. |
| QR-079 | Hold and release | AI release attempt | A model recommendation or agent triggers release while inspection is incomplete, a hold remains open or no accountable human has approved the decision. | Inventory or Manufacturing may act on an unauthorised release with no purpose-bound signature or defensible accountability. | Deny AI identities access to release and downstream command endpoints; require exact-version human approval and independent check for critical populations. | Security and Quality Director | Very low after denied-command abuse tests; human automation bias remains a monitored decision risk. |
| QR-080 | Nonconformance and disposition | AI NCR closure attempt | An AI agent marks an NCR closed from summarized notes while containment, disposition, reinspection or domain acknowledgements remain open. | The authoritative nonconformance record shows false completion and affected material may remain uncontrolled. | Deny AI closure permissions; expose outstanding closure gates to a qualified Quality approver; record AI summaries only as labeled review aids. | Quality Director | Very low after permission tests; reviewers remain susceptible to accepting incomplete AI summaries. |
| QR-081 | CAPA | AI CAPA closure attempt | A model concludes that actions are effective or closes CAPA before the metric, evidence window and independent verification are complete. | Systemic causes can persist while governance and external responses rely on an unsupported effectiveness claim. | Block AI state transitions and approvals; require frozen effectiveness criteria, independent human verification and explicit evidence before closure. | Quality Director | Very low technically; automation bias in the human effectiveness review remains monitored. |
| QR-082 | Supplier quality | AI supplier approval attempt | A model changes approved-supplier quality status or recommends unrestricted use solely from scorecard or document analysis. | Defective supply may enter production and Procurement’s commercial supplier authority is bypassed. | Limit AI to explainable risk summaries; require Supplier Quality verification and Procurement’s separate commercial decision; deny supplier-status writes. | Supplier Quality Manager | Low while writes are denied; model bias can still influence human supplier assessment and requires outcome monitoring. |
| QR-083 | Audit and documents | AI certificate issuance attempt | A model generates and publishes a certificate without checking current release, result corrections, template authority or human signature. | A customer receives an unauthorised or false conformity statement that cannot be defended. | Deny AI issue/sign endpoints; revalidate eligibility from governed evidence; require purpose-bound Quality approval and auditable document publication. | Quality Assurance Manager | Very low after endpoint denial; draft wording hallucination remains subject to qualified document review. |
| QR-084 | Security and authority | Unsupported regulatory claim | Generic architecture is marketed as ISO, GMP, FDA, medical-device or other regulated compliance without validated workflows, signatures, retention or operating evidence. | Customers and executives may rely on a false assurance statement, creating legal, contractual and reputational exposure. | Use jurisdiction and industry-specific compliance profiles only after specialist review, control mapping, validation evidence and formal approval; label this volume non-certifying. | Legal/Compliance direction | Medium because compliance depends on implementation, operating evidence and changing law beyond architecture documentation. |
| QR-085 | Master data and plans | Ambiguous specification precedence | Enterprise, plant, supplier and customer specifications have overlapping effective scope with equal priority, and the resolver chooses one silently. | Inspectors use uncertain limits and later decisions or certificates cannot show which authority governed acceptance. | Define precedence rules and conflict diagnostics; block request release on equal-priority matches; obtain Quality, Engineering and commercial-owner resolution. | Quality Engineering | Low after ambiguity tests; exceptional contractual language may still require manual legal interpretation. |
| QR-086 | Master data and plans | Tolerance unit conversion drift | A changed conversion factor, precision rule or unit master alters normalized limits or results between plan publication and execution. | Values near tolerance can switch pass/fail and historical inspections become irreproducible. | Version conversion and rounding rules; snapshot them with the specification; preserve raw values; regression-test boundary conversions before publication. | Data Governance | Low after versioned conversion tests; external laboratory unit interpretation remains contractually controlled. |
| QR-087 | Master data and plans | Critical characteristic omitted | A specification or inspection-plan revision drops a safety, regulatory or key functional characteristic through mapping error or local override. | Product can pass without its most consequential requirement being tested, affecting production release and customers. | Maintain governed critical-characteristic coverage; compare specification and plan versions at publication; block release on missing coverage; require independent Quality approval. | Quality Engineering | Low after coverage testing; newly identified criticality still requires prompt master-data change. |
| QR-088 | Master data and plans | Plan changed during execution | An open inspection reads live plan data after a revision, so later steps or limits differ from those used for earlier results. | One request contains incompatible requirements and cannot support a coherent acceptance decision. | Snapshot the released plan and specification on request creation; prohibit live master substitution; migrate open work only through a documented comparison and approval. | Quality Product Owner | Low once immutable snapshots are enforced; emergency corrections may still require cancellation and reinspection. |
| QR-089 | Integration and operations | Sampling switching history reset | Supplier-item normal, tightened or reduced inspection history is lost during master change, site transfer or data migration. | Sampling severity becomes unjustifiably reduced or overly burdensome, distorting incoming risk control and supplier performance. | Store switching history by governed supplier-item-site key; validate migration and resets; require Quality approval with reason for any manual state change. | Supplier Quality Manager | Medium-low because business restructures and supplier-site changes may require expert continuity decisions. |
| QR-090 | Sampling | Biased sample selection | Samples are repeatedly taken from accessible top layers, preferred cavities, shifts or containers rather than the randomized population. | Defects concentrated elsewhere are missed and the lot decision overstates conformity. | Generate traceable random selections across containers and production strata; record inaccessible units; analyze selection distribution and investigate operator patterns. | Quality Operations Manager | Medium because physical accessibility and destructive-test logistics can still introduce unavoidable sampling bias. |
| QR-091 | Sampling | Destructive sample not reconciled | Units consumed or damaged by testing remain counted as available receipt or finished quantity, or are silently replaced in the sample count. | Inventory quantity, sampling evidence and Finance or production yield no longer agree, and tested units may be shipped. | Identify destructive samples before execution; request Inventory or Manufacturing quantity treatment; reconcile selected, destroyed and dispositioned units with acknowledgements. | Quality Manager | Low after quantity reconciliation; laboratory loss or breakage still needs documented exception handling. |
| QR-092 | Inspection evidence | Result entered against wrong step | An inspector records a value under a similar characteristic or repeated plan step, often after navigating out of sequence. | The intended characteristic remains untested while another step appears complete, invalidating evaluation. | Display method, unit and sample context prominently; enforce step prerequisites; validate value type/range; require correction rather than moving data between steps. | Quality Operations Manager | Low after interface and validation controls; similar repeated characteristics remain a usability risk. |
| QR-093 | Integration and operations | Device timestamp spoofing | A device or imported file reports a manipulated time to make an observation appear within calibration, hold or plan-validity windows. | Evidence chronology and instrument eligibility become unreliable, enabling acceptance of otherwise invalid results. | Use trusted ingestion time, device certificates and bounded clock drift; retain device and server timestamps; quarantine implausible sequences for review. | Security | Low after device-trust controls; disconnected equipment with weak clocks requires supervised import policy. |
| QR-094 | Inspection evidence | Result correction hides original | A user replaces an inconvenient value or attachment instead of recording a superseding correction with reason and approval. | Failure evidence disappears, undermining NCR, CAPA, audit and certificate history. | Make originals immutable; link corrected versions, reason, actor and approval; show both in review and alert on repeated corrections near limits. | Quality Manager | Low after append-only controls; collusive justification remains an assurance risk. |
| QR-095 | Inspection evidence | Environmental condition missing | Temperature, humidity, stabilization time or other required test condition is absent, outside range or captured after the measurement. | A technically precise result may not be valid for the method and can support a false acceptance. | Define mandatory environmental prerequisites by method; capture from trusted source at observation time; block evaluation or require documented invalidation and retest. | Quality Engineering | Medium-low because local environmental gradients and sensor placement can remain uncertain. |
| QR-096 | Measurement equipment | Instrument identity impersonated | A device file or manual entry names a calibrated instrument while a different, overdue or unsuitable device was actually used. | Instrument-to-result genealogy and calibration assurance are false, expanding later impact assessment uncertainty. | Authenticate connected devices; scan manual instrument identity; compare operator, location and method compatibility; investigate impossible concurrent use. | Maintenance and Quality Manager | Medium-low because manual instruments still depend on physical custody and anti-substitution controls. |
| QR-097 | Measurement equipment | Uncertainty guard band ignored | A result near the specification limit is evaluated on nominal value alone despite a method requiring uncertainty or guard-band treatment. | Product with insufficient confidence may be accepted, or conservative policy is applied inconsistently across plants and laboratories. | Version the uncertainty and decision rule with the method/specification; calculate it from qualified inputs; block ordinary override and retain calculation evidence. | Quality Engineering | Medium-low because uncertainty estimates and customer rules may change and require metrology review. |
| QR-098 | Hold and release | Emergency hold never reviewed | A broad break-glass hold remains active after its short authority window because no owner reviews scope, evidence or continued need. | Quarantine ages without a defensible reason, customer dates slip and operators lose confidence that emergency restrictions still represent a live Quality concern. | Set mandatory expiry and review owner; escalate before timeout; require a governed hold version to continue, narrow or release each population. | Quality Manager | Low after expiry workflow; unresolved high-severity investigations may justifiably keep material held longer. |
| QR-099 | Hold and release | Competing hold cleared accidentally | A release resolves one NCR or inspection hold but downstream logic removes all restrictions on the same population. | Material constrained by another defect, recall, credit, maintenance or legal hold becomes available. | Maintain holds as independent causes; calculate effective restriction from all active decisions; release only the named hold version and reconcile remaining blocks. | Inventory Manager | Low after competing-hold tests; external legal holds require reliable integration and visibility. |
| QR-100 | Hold and release | Release acknowledgement missing | Quality approves release and sends the request, but Inventory or Manufacturing provides no applied, partial or rejected response. | Users may assume availability or continuation while the authoritative domain remains blocked, creating schedule and reconciliation errors. | Keep the decision effect pending; retry with the same idempotency key; escalate by age; display no completion until exact domain acknowledgement arrives. | Quality Operations Manager | Medium-low until operational recovery objectives and manual fallback reconciliation are proven. |
| QR-101 | Hold and release | Release reversal delayed | New failure evidence requires re-hold, but the reversal message is queued or acted on after stock issue, production consumption or shipment. | Exposure expands during the delay and the original release remains operationally effective despite Quality’s changed decision. | Publish high-priority reversal with exact population; alert Inventory, Manufacturing and Sales; reconcile quantities already consumed or shipped and open containment. | Quality Director | Medium because completed physical effects cannot be undone and require broader response. |
| QR-102 | Nonconformance and disposition | Disposition quantities do not balance | Use-as-is, rework, return, scrap and held quantities do not sum to the affected population because of UOM, split or duplicate lines. | Units become unaccounted for, receive multiple treatments or escape disposition, breaking Inventory, Manufacturing and Finance reconciliation. | Validate UOM and quantity conservation before approval; lock overlapping identities; reconcile every domain effect and investigate residual quantity. | Quality Manager | Low after quantity controls; measurement loss and conversion tolerances still need explicit policy. |
| QR-103 | Integration and operations | Use-as-is lacks Engineering review | Quality accepts a design or functional deviation without Engineering assessment where fit, function, safety or interchangeability is affected. | Technically unacceptable product may be released and the decision can conflict with controlled design requirements. | Route defined criticality and requirement types to Engineering; require documented technical rationale and independent Quality approval; obtain customer authority where needed. | Engineering Manager | Medium-low because the need for Engineering review depends on correct defect and requirement classification. |
| QR-104 | Nonconformance and disposition | Customer concession absent | Quality proposes shipment of nonconforming product but Sales has not obtained the customer’s required written concession for the exact population and condition. | Shipment breaches contract and the customer may reject product or dispute the certificate and payment. | Encode when customer authority is mandatory; bind authorization to order, population, requirement and expiry; block release until Sales records it. | Sales Manager | Low after order-release gating; informal customer conversations remain unacceptable evidence. |
| QR-105 | Nonconformance and disposition | Rework cycles exceed limit | A population undergoes repeated rework beyond the approved count, masking process instability and degrading material or product. | Genealogy, yield and cost are understated, and cumulative rework can create new defects not covered by the original plan. | Set maximum cycles in the disposition; count Manufacturing executions; require new risk review and expanded inspection before any additional cycle. | Quality Manager | Medium-low because product-specific cumulative damage may require Engineering analysis beyond a simple cycle count. |
| QR-106 | Nonconformance and disposition | Scrap destruction unverified | High-value, regulated or security-sensitive scrap is moved to scrap status but physical destruction or witness evidence is absent. | Material can be recovered, resold or reintroduced while Inventory and Finance records show it destroyed. | Require destruction method, custody, witness and evidence for designated classes; reconcile identity and quantity to Inventory movement and Finance posting. | Operations Manager | Medium-low because offsite disposal depends on qualified vendors and chain-of-custody assurance. |
| QR-107 | Nonconformance and disposition | Containment sorting instruction stale | Operators sort under an obsolete defect definition, visual standard or acceptance boundary after the NCR scope changes. | Defective units can be classified good, conforming units rejected and containment metrics become unreliable. | Version and issue the sorting instruction with examples, population and expiry; withdraw superseded copies; verify training and audit sort accuracy. | Quality Engineering | Low after document control; rapidly evolving failure understanding may still require repeated instruction updates. |
| QR-108 | Nonconformance and disposition | NCR populations merged incorrectly | Separate lots, causes or specifications are combined into one NCR to simplify administration despite different disposition or exposure. | Containment and root cause become ambiguous, quantities cannot reconcile and one population’s evidence may justify another’s release. | Define coherent-event criteria; keep separate disposition lines and source links; require review before merging and preserve distinct histories when uncertain. | Quality Manager | Low after merge rules; cross-site systemic cases still require linked aggregation without erasing local scope. |
| QR-109 | Integration and operations | Cause hypothesis treated as proof | A plausible five-whys statement, correlation or AI suggestion is accepted as root cause without testing the mechanism or contrary evidence. | Corrective actions address an assumption and recurrence continues while CAPA appears technically complete. | Record hypotheses separately; require mechanism tests, supporting and contradicting evidence, occurrence and escape cause analysis, and independent approval. | Quality Engineering | Medium because some low-frequency failures cannot be reproduced and may remain probabilistic. |
| QR-110 | CAPA | Action owner outside authority | CAPA assigns a task to Quality that requires Manufacturing, Maintenance, Procurement, Sales, Security or Finance to change its authoritative record or process. | The action cannot be executed accountably, is marked complete through commentary, or causes an unauthorized cross-domain write. | Assign each action to the authoritative domain with Quality acceptance criteria; require domain evidence and acknowledgement; escalate refusal rather than reassigning ownership silently. | Quality Manager | Low after ownership validation; cross-functional actions still require coordinated accountability. |
| QR-111 | CAPA | CAPA due date silently extended | An owner edits the committed due date without preserving the original, reason, risk assessment or approval. | Overdue systemic risk disappears from metrics and customers, auditors or management receive misleading timeliness information. | Append approved extension versions; retain original date and lateness; require risk-based authority and escalation; report cumulative extension history. | Quality Director | Low after immutable due-date history; repeated justified extensions still signal capacity or scope risk. |
| QR-112 | CAPA | Effectiveness population too small | The effectiveness check uses too few events, too short a duration or a convenient subset that cannot reveal recurrence. | An ineffective action is declared successful and the failure mechanism persists outside the sampled evidence. | Define population, confidence and duration before implementation closure; review exclusions; extend as indeterminate rather than accept weak evidence. | Quality Engineering | Medium because rare events can require long observation and may never yield strong statistical proof. |
| QR-113 | Supplier quality | Supplier score denominator distorted | Supplier defect rates use receipts, quantities or severity denominators inconsistently, exclude rejected lots or mix supplier sites. | Scorecards unfairly reward or penalize suppliers and Procurement decisions are based on misleading technical performance. | Govern measure grain, site, quantity and period; reconcile numerator to NCR/inspection evidence and denominator to Procurement receipts; disclose exclusions. | Reporting Owner | Low after semantic certification; product-mix and severity differences still require contextual interpretation. |
| QR-114 | Supplier quality | Supplier certificate forged | A certificate of analysis or conformance is altered, copied from another lot or issued by an untrusted supplier identity. | Incoming inspection may be reduced or material accepted on false evidence, exposing production and customers. | Verify supplier, lot and document signature or trusted channel; compare declared results to receipt/specification; sample independently based on risk and anomalies. | Supplier Quality Manager | Medium because external document authenticity and supplier collusion cannot be completely eliminated. |
| QR-115 | Nonconformance and disposition | SCAR remote containment unconfirmed | A supplier states that stock, WIP and shipments are contained but supplies no quantity, location or traceable evidence. | Additional defective lots can arrive while internal teams believe the source is controlled. | Require population counts, site acknowledgement, shipment list and objective evidence; verify through follow-up receipt data or audit; escalate to Procurement when unproven. | Supplier Quality Manager | Medium because Supplier Quality may lack immediate physical access to remote facilities. |
| QR-116 | Customer quality | Complaint personal data overexposed | Complaint attachments, exports or dashboards expose customer names, contact details or use context beyond investigation need. | Privacy obligations are breached and sensitive customer information becomes available to broad Quality or supplier audiences. | Minimize and classify personal data; separate identity from technical evidence; apply purpose-based access, redacted exports, retention and disclosure logging. | Data Protection and Customer Quality | Low after privacy controls; free-text and images remain sources of incidental personal data. |
| QR-117 | Integration and operations | No-fault-found overstated | A returned unit cannot reproduce the symptom, and the case is closed as customer misuse or conforming product despite incomplete conditions or intermittent behavior. | A real field defect and related exposure are missed, damaging customer trust and preventing CAPA. | Report no-fault-found with limitations and tests performed; review use context and genealogy; trend recurrence; avoid denying remedy solely from non-reproduction. | Customer Quality Engineer | Medium because intermittent failures and changed returned units may remain unresolved. |
| QR-118 | Customer quality | Returned unit chain broken | Custody, packaging, storage or identity of a returned serial is not recorded from customer authorization through laboratory analysis. | Damage or contamination introduced after return can be mistaken for product failure, and evidence may be inadmissible or misleading. | Seal and label returned units; record each transfer, condition and storage environment; quarantine custody exceptions and qualify conclusions accordingly. | Customer Quality Engineer | Low after custody controls; third-party carriers remain a residual source of handling uncertainty. |
| QR-119 | Traceability and recall | Recall list exported without scope | A user exports a recall-support list without the frozen query version, completeness class, purpose or access restrictions. | Recipients may act on stale or overbroad customer/product data, creating privacy exposure and inconsistent recall execution. | Version and watermark exports; include criteria, generation time and confirmed/suspect/unknown classes; restrict recipients and revoke superseded lists. | Legal/Compliance direction | Medium-low because copies outside FlowCraft require controlled distribution and recipient discipline. |
| QR-120 | Traceability and recall | Quality genealogy inference treated as fact | A probabilistic, manually inferred or incomplete relationship is displayed as authoritative batch, serial or decision lineage. | Holds, release, customer exposure or cause analysis can target the wrong population and omit the real one. | Label inferred edges with source and confidence; prohibit them as sole release evidence; seek authoritative Inventory or Manufacturing confirmation and record unresolved gaps. | Data Governance | Medium because some historical and external genealogy cannot be upgraded beyond inference. |

### 56.2 Quality example catalog

Each scenario names the owning Quality role and every possible domain request. “None” means no request is permitted for that scenario, not that the domain is unimportant.

| ID | Example | Quality owner | Source | Main Quality transaction | Quality effect | Inventory request | Manufacturing request | Procurement request | Sales request | Maintenance request | Finance request | Approval | Reconciliation | Specific risk | Current status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| QE-001 | Incoming raw material inspection | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Resolve supplier-item specification and sampling plan; record selected samples and accept, reject or split the receipt lot. | Keep the receipt non-available, then apply release or rejection to the exact lot quantity. | Do not consume the lot until Inventory confirms Quality clearance. | If rejected, open supplier return or claim review; acceptance creates no commercial action. | No Sales request. | No Maintenance request unless an instrument issue is found. | Reference any supplier claim or quality cost; Finance decides accounting. | Quality Inspector records results; Quality Manager approves rejection, partial acceptance or critical release. | Match PO receipt, supplier lot, sampled units, accepted quantity, rejected quantity and Inventory acknowledgements. | A stale supplier specification or unscanned lot could release untested raw material. | Planned |
| QE-002 | Supplier batch inspection | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Inspect the identified supplier batch under its approved supplier-item plan and preserve batch-level defect evidence. | Hold the batch on receipt and release only the approved batch or quantity. | Prevent issue to production until Inventory acknowledges release. | Use failure evidence for SCAR or commercial review without altering the PO. | No Sales request. | No Maintenance request unless measurement fitness is questioned. | Reference failure costs or debit evidence; Finance posts nothing from Quality directly. | Supplier Quality Engineer evaluates; Quality Manager approves the batch decision. | Reconcile supplier batch, internal batch, receipt quantity, sample population, outcome and Procurement action. | The certificate or sample may belong to another supplier batch. | Planned |
| QE-003 | Partial incoming acceptance | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | For a 1,000-unit receipt, approve 800 conforming units and hold or reject the identified remaining 200. | Apply available status to exactly 800 units and retain non-available status for 200. | Allow consumption only from the released quantity or serial set. | Arrange return, replacement or claim only for the rejected 200 units. | No Sales request. | No Maintenance request. | Record supplier debit or inventory effect only from authoritative Procurement and Inventory references. | Quality Manager approves the split decision; Inventory approves executable quantity treatment. | Prove 1,000 received equals 800 released plus 200 held/rejected and match every acknowledgement. | A lot-wide release could accidentally make all 1,000 units available. | Planned |
| QE-004 | Incoming rejection | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Reject the inspected supplier lot, open containment and record defect, severity and disposition evidence. | Retain the full affected receipt in rejected or hold status and block issue. | Identify consumed quantity and contain resulting WIP. | Decide supplier return, replacement, claim and commercial escalation. | Review customer exposure only if the material entered delivered product. | Review equipment only if the defect may be measurement-related. | Process debit, write-off or reserve only from Procurement and Inventory evidence. | Quality Manager approves rejection; Procurement separately approves commercial action. | Reconcile received, sampled, rejected, consumed, returned and scrapped quantities with domain acknowledgements. | Inventory might issue the receipt before rejection propagation completes. | Planned |
| QE-005 | First-piece inspection | Quality Inspector | Manufacturing order/operation event | Production inspection | After setup, tool or engineering change, execute the complete critical-characteristic plan on the identified first piece. | Hold separately received first-piece material only if Inventory movement is involved. | Restrict production beyond the allowed containment quantity; after failure correct setup and present a new first piece. | No Procurement request unless supplied tooling or material caused failure. | Advise Sales only if the event threatens a committed delivery. | Request equipment review when machine or gauge condition is suspected. | Receive setup loss or rework-cost references; Finance owns posting. | Quality Manager approves independently from the inspector; Manufacturing owns continuation. | Match trigger, setup/tool revision, first-piece serial, result and Manufacturing continuation acknowledgement. | Production could continue on a failed or pre-change first-piece approval. | Planned |
| QE-006 | Patrol inspection | Quality Inspector | Manufacturing order/operation event | Production inspection | At the time, quantity or shift interval, sample the actual production window and evaluate process characteristics. | Request hold only for material in the affected time or genealogy window. | On an action-limit breach, record stop or adjustment and preserve the operation window. | No Procurement request unless supplied material is implicated. | Review delivery exposure if affected output has shipped or staged. | Request machine-condition review when the signal suggests equipment degradation. | Receive downtime or scrap references; no Quality posting. | Quality Engineer reviews the signal; Production Manager owns process action. | Align inspection time, shift, resource, produced genealogy, process action and containment. | A late or mis-timed patrol can miss the actual affected production window. | Planned |
| QE-007 | In-process hold | Quality Engineer | Manufacturing order/operation event | Production inspection | A failed characteristic defines the exact WIP, operation and genealogy window subject to Quality hold. | Hold related stock only where identified material or transferred WIP exists in Inventory. | Stop or block named operations and prevent subsequent confirmation until acknowledgement. | Review supplier action only when incoming material caused failure. | Assess shipment commitments only if affected output progressed downstream. | Review resource condition if equipment is a suspected contributor. | Receive WIP or rework cost references after operational action. | Quality Manager issues the hold; Production Manager is accountable for enforcement. | Reconcile WIP identity, operation state, produced quantity and related Inventory status. | Subsequent operations may continue before Manufacturing acknowledges the hold. | Planned |
| QE-008 | Final inspection | Quality Inspector | Manufacturing order/operation event | Production inspection | Review completed batch genealogy and upstream NCRs, inspect required final characteristics, then approve full or partial outcome. | Receive finished goods and apply status separately; release only approved batch, serials or quantity. | Provide completion and genealogy; Quality acceptance is not production confirmation. | No Procurement request unless an upstream supplier defect is discovered. | Advise Sales of restricted or delayed availability. | Request equipment review only when evidence indicates it. | Receive scrap, rework or variance references; Finance owns valuation. | Independent Quality approval is required for critical final outcomes. | Match completed quantity, genealogy, samples, open NCRs, released quantity and Inventory acknowledgement. | Incomplete genealogy or unresolved NCR can be overlooked during final release. | Planned |
| QE-009 | Pre-dispatch inspection | Customer Quality Engineer | Sales delivery, complaint or return | Pre-dispatch inspection | Inspect the exact staged delivery population, packaging and destination-specific requirements before dispatch clearance. | Retain staged stock under Warehouse/Inventory control until acknowledgement. | No Manufacturing request unless a defect requires controlled rework. | No Procurement request unless supplied packaging or material is causal. | Confirm current order, ship-to and customer obligations; decide commitment changes after failure. | No Maintenance request unless test equipment fails. | Receive customer claim or rework references; Finance decides effects. | Quality Manager approves clearance; Sales owns commitment and Warehouse owns loading. | Reconcile staged batch/serials, inspected population, clearance version and shipment. | Warehouse may substitute a batch after inspection and ship uninspected goods. | Planned |
| QE-010 | Customer-specific certificate | Quality Assurance Manager | Sales order and customer document requirement | Quality certificate | Select certificate type from the Sales order and render approved results for the released batch or serial population. | Confirm the certificate population remains released with no competing hold. | Provide production genealogy only as referenced evidence. | No Procurement request. | Sales or Customer Service delivers the approved document and manages communication. | Confirm instrument evidence when the certificate includes measured values. | No financial request unless an error leads to a commercial claim. | Quality Manager signs the governed document for its stated purpose. | Match order requirement, template version, release, results, population and delivered certificate version. | A corrected result or batch substitution could leave a stale certificate in customer use. | Planned |
| QE-011 | Batch hold | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Issue a reasoned hold against the exact batch, quantity, scope and decision version. | Apply Inventory-owned non-available status and movement restrictions. | Block consumption or production use of the held batch. | Review supplier action when the hold originates from incoming quality. | Review staged or shipped exposure. | Review equipment only if condition contributed. | Receive reserve or valuation reference; do not post from Quality. | Quality Manager approves; emergency hold is time-bounded and independently reviewed. | Compare hold scope to Inventory quantity/status and Manufacturing consumption genealogy. | A batch alias or partial quantity can leave stock outside the hold. | Planned |
| QE-012 | Serial hold | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Restrict named serials while preserving the defect and inspection basis for each unit. | Apply status/location controls only to those serials. | Block installation, processing or completion of held serials. | Engage Procurement only for supplier-provided serials. | Prevent shipment or notify Customer Service for committed or delivered serials. | Hold associated equipment only under Maintenance authority. | Receive unit-cost references after disposition. | Quality Manager approves serial hold and reduction. | Reconcile serial list across Quality, Inventory, Manufacturing and delivery trace. | A transposed serial can hold the good unit and release the defective one. | Planned |
| QE-013 | Partial release | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Approve only a defined quantity, container set or serial list while retaining all other restrictions. | Release the exact population and return partial or rejected acknowledgement. | Continue work only for WIP explicitly covered. | Act only on supplier quantity separately rejected or returned. | Commit only released population to delivery. | No Maintenance request. | Value only quantities Inventory confirms as released or dispositioned. | Independent Quality approval is required where critical or concession-based. | Prove released plus held quantities equal the source population and competing holds remain active. | Inventory may apply a partial decision to the whole batch. | Planned |
| QE-014 | Full release | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Approve the complete population after evidence, holds and NCR constraints resolve. | Release the matching quantity or serial population after current-state validation. | Continue production only after domain acknowledgement. | No Procurement request unless a supplier case closes separately. | Use released population for fulfillment; Sales does not approve technical release. | No Maintenance request. | No posting request; Finance consumes later operational effects. | Quality Manager approves; critical release requires independent review. | Reconcile decision version, full population, acknowledgement and absence of competing holds. | A hidden hold or stale population snapshot can make full release unsafe. | Planned |
| QE-015 | NCR from incoming defect | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Create an NCR from failed incoming evidence with supplier-lot scope, severity and containment. | Hold the receipt and find related on-hand or consumed quantity. | Contain WIP that consumed the lot. | Open return, claim or SCAR review under Procurement authority. | Review customer exposure only if affected output shipped. | Review measurement equipment if failure validity is questioned. | Receive claim, scrap or rework references; Finance posts separately. | Quality Manager approves disposition; Procurement approves commercial action. | Link inspection, receipt, supplier lot, holds, genealogy, disposition and Procurement acknowledgement. | Limiting the NCR to current stock can miss WIP and related supplier lots. | Planned |
| QE-016 | NCR from production defect | Quality Engineer | Manufacturing order/operation event | Production inspection | Create an NCR tied to order, operation, WIP window and failed characteristic. | Hold transferred or finished quantities where Inventory owns them. | Record stop, containment, rework or scrap execution against genealogy. | Review supplied material only when evidence supports supplier cause. | Assess deliveries exposed to the production window. | Review equipment condition when machine contribution is plausible. | Receive rework, scrap and variance references. | Quality Manager approves disposition; Manufacturing owns execution. | Reconcile operation window, WIP, output, disposition and reinspection. | A narrow genealogy window can allow subsequent operations to consume suspect WIP. | Planned |
| QE-017 | NCR from customer complaint | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | Create an NCR when complaint evidence indicates nonconformance or systemic exposure and link delivery population. | Hold returned, on-hand and related stock identified by investigation. | Contain related production output and preserve genealogy. | Notify Procurement if supplier material is implicated. | Sales and Customer Service manage remedy and communication. | Review equipment if field failure suggests calibration or machine condition. | Finance decides credit, refund or reserve from commercial evidence. | Customer Quality leads; Quality Manager approves disposition and escalation. | Link complaint, delivery, identity, return, related lots, containment, remedy and CAPA. | The symptom may be suppressed or linked to the wrong delivered unit. | Planned |
| QE-018 | Containment | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Define confirmed and suspect populations, controls, owners, due times and verification evidence. | Segregate on-hand and in-transit stock and acknowledge quantities. | Stop or isolate affected operation and WIP windows. | Coordinate supplier stock and shipment containment through Procurement. | Identify staged, delivered and customer-held exposure through Sales. | Hold equipment only under Maintenance authority. | Receive exposure-cost references; no automatic posting. | Quality Manager approves scope; each domain executes its own action. | Reconcile every population across Inventory, Manufacturing, Procurement and Sales before declaring effectiveness. | Supplier stock, WIP or shipments can remain outside an apparently complete containment. | Planned |
| QE-019 | Sorting | Quality Engineer | Manufacturing order/operation event | Production inspection | Issue a versioned sorting instruction, defect standard, population and acceptance rule. | Segregate unsorted, accepted and rejected quantities. | Provide trained personnel and record production-side sorting execution. | Coordinate supplier sorting or recovery when sourced externally. | Communicate delivery impact through Sales or Customer Service. | Request equipment only if needed for sorting. | Receive labor, scrap or supplier-cost references. | Quality Engineer approves instruction; Quality Manager approves disposition. | Balance original population to good, bad, damaged and unprocessed quantities. | An obsolete visual standard can classify defective units as good. | Planned |
| QE-020 | Rework approval | Quality Engineer | Manufacturing order/operation event | Rework quality decision | Approve bounded rework route, affected batch, maximum cycles, criteria and reinspection. | Move or status the population for rework under Inventory control. | Create and execute route, labor, materials and genealogy. | Engage Procurement only if supplier performs or funds rework. | Inform Sales when commitment or concession is affected. | Request Maintenance-controlled assets when required. | Receive rework cost and variance references. | Quality Manager approves disposition; Production Manager approves execution. | Match NCR quantity, route, completion, movements, costs and reinspection. | Manufacturing may begin repair before approval or exceed the cycle limit. | Planned |
| QE-021 | Scrap disposition | Quality Engineer | Manufacturing order/operation event | Scrap disposition | Decide the population is technically unacceptable and approve scrap with evidence and witness rules. | Move exact stock quantity to scrap status/location and preserve history. | Record WIP scrap intent and genealogy. | Choose supplier return or claim separately when recovery applies. | Review customer exposure if related units shipped. | No Maintenance request unless equipment is causal. | Post write-off only after authoritative quantity and value evidence. | Quality approves disposition; Operations, Inventory and Finance approve their effects. | Reconcile NCR population, WIP intent, movement, destruction and posting. | Scrap can be moved or destroyed without approval or quantity reconciliation. | Planned |
| QE-022 | Return-to-supplier disposition | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Approve technical rejection and identify the supplier receipt population eligible for return. | Hold and move exact quantity to return staging. | Contain WIP if quantity was consumed. | Authorize return, logistics, replacement and claim against the PO. | Review customer exposure only when applicable. | No Maintenance request. | Process debit or valuation only from Procurement and Inventory records. | Quality Manager approves rejection; Procurement approves commercial return. | Match receipt, rejected quantity, shipment, supplier acknowledgement, residual stock and finance references. | Quality rejection may be mistaken for authority to return or debit the supplier. | Planned |
| QE-023 | Use-as-is direction | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Approve a nonconforming population for bounded use after technical and customer implications are reviewed. | Release only the authorized population with restricted-use condition. | Consume or complete only within approved product, route or destination. | Pursue supplier recovery separately. | Obtain customer authority when contractually required. | No Maintenance request. | Record price or reserve only through Sales and Finance decisions. | Quality Director approves; Engineering and customer authority participate where needed. | Reconcile population, use, expiry, approval, acknowledgement and certificate disclosure. | Use-as-is can be reused as an uncontrolled specification change. | Planned |
| QE-024 | Deviation | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Authorize a prospective, time- or quantity-bounded departure with monitoring and revocation conditions. | Identify affected stock without changing status unless a Quality decision requires it. | Execute only the approved route, operation and quantity. | Apply supplier deviation through Procurement agreement. | Record customer acceptance where contractual requirements are affected. | Engage Maintenance only for equipment-related scope. | Receive cost references; Finance does not approve technical deviation. | Quality and Engineering approve scope; domain owner approves execution. | Track usage, affected output, inspection evidence and expiry. | An expired deviation can continue through a cached authorization. | Planned |
| QE-025 | Concession | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Accept a known nonconformity for an exact population, use and customer condition. | Release only named quantity or serials with concession reference. | Execute downstream work only within stated conditions. | Pursue supplier recovery through Procurement. | Obtain customer authorization where required. | No Maintenance request. | Record price adjustment only after Sales and Finance approval. | Quality Director approves; Engineering and customer approvers participate by risk. | Reconcile requirement, population, customer/order, approval, expiry and effects. | The concession can be applied to another batch, customer or quantity. | Planned |
| QE-026 | Waiver | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Approve a prospective relaxation for a requirement, site, quantity and period before work. | Do not change status unless later inspection or disposition requires it. | Execute under the waiver only for metered scope. | Apply supplier waiver through Procurement agreement. | Secure customer authority when contractual. | Engage Maintenance only for equipment requirements. | No direct financial request. | Quality Director and requirement owner approve; Legal reviews regulated implications. | Compare waiver scope and expiry to every affected request and population. | A temporary waiver can become an uncontrolled permanent standard. | Planned |
| QE-027 | CAPA | Quality Engineer | Inspection, audit or quality signal | CAPA | Open a governed case linking issue, risk, containment, causes, actions and effectiveness. | Request stock control only for identified exposure. | Assign Manufacturing actions without executing production changes. | Assign supplier/commercial actions through Procurement. | Assign customer actions through Sales or Customer Service. | Assign equipment actions through Maintenance. | Assign accounting actions through Finance. | Quality Director approves cause, plan and closure; action owner cannot solely verify. | Reconcile source cases, domain actions, implementation, evidence window and effectiveness. | CAPA can close on completed tasks while the cause remains uncontrolled. | Planned |
| QE-028 | Root-cause analysis | Quality Engineer | Inspection, audit or quality signal | CAPA | Test occurrence and escape hypotheses against supporting and contrary evidence. | Request population trace only when cause changes exposure. | Obtain process, operation and genealogy evidence. | Obtain supplier process evidence through Supplier Quality. | Obtain field-use evidence through Customer Service and Sales. | Obtain equipment history from Maintenance. | Use financial trends only as supporting evidence. | Quality Engineering leads; Quality Manager independently approves cause. | Link accepted causes to tests and actions; preserve rejected hypotheses. | A symptom or operator-blame narrative may be accepted without mechanism evidence. | Planned |
| QE-029 | Corrective action | Quality Engineer | Inspection, audit or quality signal | CAPA | Accept an action that controls a verified cause and defines implementation evidence. | Apply Inventory action only through Inventory. | Manufacturing implements process or route changes. | Procurement implements supplier-commercial action. | Sales implements customer-process action. | Maintenance implements equipment action. | Finance implements accounting controls. | Quality accepts action design; domain owner executes; separate verifier checks effectiveness. | Reconcile cause coverage, owner evidence, due date and unintended effects. | A convenient retraining action may not address the causal mechanism. | Planned |
| QE-030 | Preventive action | Quality Engineer | Inspection, audit or quality signal | CAPA | Act on a credible near miss, trend, audit or FMEA risk and define a leading indicator. | Request stock control only for evidenced exposure. | Manufacturing implements process prevention. | Procurement handles supplier prevention commercially. | Sales owns customer-facing changes. | Maintenance implements condition controls. | Finance evaluates cost but not technical need. | Quality Manager approves risk basis; domain owner approves implementation. | Track hypothesis, action, leading indicator and review horizon. | Low-value prevention can add bureaucracy without measurable risk reduction. | Planned |
| QE-031 | Effectiveness verification | Quality Engineer | Inspection, audit or quality signal | CAPA | Compare frozen metric, baseline, population and window to post-action evidence; record effective, ineffective or indeterminate. | Read Inventory outcomes without changing records. | Use Manufacturing recurrence data without self-approval. | Use supplier recurrence independently from claim status. | Use complaint data independently from remedy. | Use Maintenance equipment evidence. | Use Finance measures only when causally relevant. | Independent verifier approves; Quality Director closes CAPA. | Reconcile planned criterion, complete data, exclusions, result and reopening. | A small or convenient population can make an ineffective action appear successful. | Planned |
| QE-032 | SCAR | Supplier Quality Engineer | Procurement receipt or supplier case | SCAR | Issue a technical supplier case with receipts, requirement, severity, containment milestones and response criteria. | Hold affected receipts and related stock. | Contain WIP that consumed suspect material. | Send contractual communication, manage claim and decide restriction. | Assess customer exposure only if output shipped. | Engage Maintenance only for equipment contribution. | Receive debit or reserve references after Procurement action. | Supplier Quality Manager approves technical SCAR; Procurement approves escalation. | Match defects, receipt lots, supplier responses, holds, recurrence and commercial outcome. | Paperwork can be accepted while remote stock or root cause remains unverified. | Planned |
| QE-033 | Supplier response | Supplier Quality Engineer | Procurement receipt or supplier case | SCAR | Record acknowledgement, containment, cause, action and effectiveness as separate supplier stages. | Maintain holds until evidence is verified. | Continue enhanced checks for affected production. | Escalate late or inadequate response through Procurement. | Review Sales exposure only when applicable. | No Maintenance request. | No direct financial request. | Supplier Quality evaluates each stage; Quality Manager accepts technical completion. | Compare supplier claims to remote quantities, incoming results and recurrence. | A polished response can hide unsupported cause or containment. | Planned |
| QE-034 | Supplier verification | Supplier Quality Engineer | Procurement receipt or supplier case | SCAR | Verify containment and corrective action using objective lot, process, audit and later receipt evidence. | Release internal stock only through separate decision. | Adjust use controls only after verified outcomes. | Procurement decides commercial restrictions. | Review Sales exposure only when applicable. | No Maintenance request. | No direct Finance request. | Supplier Quality Manager approves verification; Procurement owns commercial status. | Compare SCAR commitments, evidence, later performance and restriction decision. | Supplier-selected evidence may omit continuing defects. | Planned |
| QE-035 | Customer complaint | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | Identify item, batch/serial, delivery and symptom and perform risk-based technical investigation. | Hold returned, on-hand or related stock when exposure is supported. | Contain related production and provide genealogy. | Engage Procurement if supplier cause is substantiated. | Sales decides replacement/return; Customer Service communicates. | Review equipment when implicated. | Finance decides credit or refund from Sales authority. | Customer Quality leads; Quality Manager approves severity and containment. | Link complaint, delivery, identity, investigation, holds, remedy and financial reference. | Suppressed or mislinked evidence can hide field exposure. | Planned |
| QE-036 | Customer return | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | Inspect the authorized returned unit, record condition and custody, and classify technical outcome. | Receive it into controlled non-available status and apply disposition. | Provide original genealogy and execute approved rework separately. | Engage supplier only with causal evidence. | Sales authorizes return and remedy. | Review equipment if analysis indicates. | Finance processes credit/refund from Sales and return evidence. | Customer Quality approves outcome; Sales approves remedy. | Match authorization, identity, delivery, condition, outcome, disposition and remedy. | A damaged label or reused authorization can link the wrong serial. | Planned |
| QE-037 | Failure analysis | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | Execute approved analysis, preserve destructive evidence and state no-fault-found limitations. | Hold returned and related populations only when evidence defines scope. | Provide genealogy and implement later corrective work. | Obtain supplier evidence when implicated. | Use the approved technical statement for customer communication. | Provide equipment and calibration evidence. | No direct financial request. | Customer Quality performs; Quality Manager approves conclusion and escalation. | Trace symptom, conditions, result, cause confidence, population and NCR/CAPA. | Stopping at symptom reproduction can miss the true mechanism. | Planned |
| QE-038 | Batch trace | Quality Director | Batch/serial and transaction genealogy | Quality exposure query | Trace batch backward to sources and forward through inspection, production, disposition and delivery. | Provide authoritative quantities, locations, movements and status. | Provide consumption and output genealogy. | Provide supplier lot and receipt links. | Provide delivery and customer exposure. | Provide equipment link only when relevant. | Provide costing references only through Finance. | Quality Director approves consequential exposure classification. | Classify confirmed, suspect, cleared and unknown quantities and reconcile totals. | An inferred or missing edge can exclude an affected output batch. | Planned |
| QE-039 | Serial trace | Quality Director | Batch/serial and transaction genealogy | Quality exposure query | Trace one serial through receipt/manufacture, inspection, rework, shipment and return. | Provide authoritative identity, custody and status. | Provide operation, component and rework genealogy. | Provide supplier origin for purchased serials. | Provide order, delivery and return references. | Provide equipment history when relevant. | Provide unit cost only through Finance. | Quality Manager approves any hold or exposure decision. | Match one serial across sources and flag custody contradictions. | A duplicate or transposed serial can target the wrong unit. | Planned |
| QE-040 | Recall query | Quality Director | Batch/serial and transaction genealogy | Quality exposure query | Freeze defect and genealogy criteria and produce confirmed, suspect, cleared and unknown populations. | Identify on-hand, quarantined and in-transit quantities. | Identify affected WIP, output and process windows. | Identify upstream suppliers and open purchase flow. | Identify delivered customers and staged shipments. | Identify equipment only within causal scope. | Estimate exposure through Finance-controlled analysis. | Legal/Compliance and executive governance authorize recall action. | Version query and reconcile all domain populations before action. | An incomplete query can omit affected customers or over-recall good product. | Future |
| QE-041 | Instrument calibration due | Quality Engineer | Maintenance equipment/calibration event | Instrument impact assessment | Identify upcoming expiry and prevent the instrument from being assigned after its valid-until time. | No stock action unless instrument unavailability delays or invalidates inspection. | No production action unless inspection capacity affects an operation gate. | No Procurement request except outsourced calibration contracting. | No Sales request. | Schedule and execute calibration; update equipment state and certificate. | Receive calibration cost through Maintenance records. | Maintenance approves work and equipment state; Quality approves inspection-use criteria. | Match instrument, due date, work order, certificate and next eligible inspection use. | A stale Maintenance status can leave an overdue instrument selectable. | Planned |
| QE-042 | Failed calibration | Quality Engineer | Maintenance equipment/calibration event | Instrument impact assessment | On as-found failure, define last-known-valid boundary and identify every result produced in the suspect interval. | Request hold for affected accepted batches or serials. | Request containment and reinspection for affected WIP or output. | Review supplier receipts tested with the instrument; no commercial action without Procurement. | Review delivered populations and customer communication through Sales. | Record as-found/as-left evidence, equipment hold and corrective work. | Receive reinspection, scrap or reserve references; Finance decides posting. | Maintenance approves equipment state; Quality Manager approves result-impact decisions. | Reconcile instrument interval, linked results, affected populations, holds, reinspection and final disposition. | Suspect results can remain accepted if the impact search starts too late. | Planned |
| QE-043 | Out-of-tolerance impact review | Quality Manager | Maintenance as-found calibration failure and linked inspection results | Instrument impact assessment | Assess measurement error direction and magnitude against each linked result and decision since the last valid point. | Hold only populations whose acceptance could change or whose uncertainty is unresolved. | Reinspect or contain WIP and finished output under Manufacturing authority. | Review supplier decisions based on affected measurements. | Review customer exposure for shipped populations. | Provide calibration evidence and investigation; do not let Quality change equipment state. | Quantify cost only after operational scope is known. | Quality Manager approves impact classification; Maintenance approves calibration evidence. | Trace every result to instrument, specification limit, decision, domain effect and reinspection outcome. | A blanket review may miss near-limit failures or over-hold unaffected product. | Planned |
| QE-044 | SPC alert | Quality Engineer | Approved result series | Statistical quality signal | Review the versioned chart signal, population, baseline and rule before opening containment or NCR. | Hold output only when Quality defines an affected population. | Record process stop or adjustment after human review. | No Procurement request unless supplier input is implicated. | Assess delivery exposure only when output window has progressed. | Review equipment when the signal supports machine deterioration. | Receive downtime or scrap references; Finance owns accounting. | Quality Engineer validates the signal; Production Manager approves process action. | Align chart data, subgroup, plan revision, event time, genealogy and action. | Mixed populations or wrong limits can trigger a false alarm or miss a real shift. | Planned |
| QE-045 | Audit finding | Quality Manager | Approved audit program | Quality audit finding | Record objective evidence, criterion, severity and audited scope without immediately assuming root cause or CAPA. | Request Inventory action only if the finding identifies product exposure. | Assign Manufacturing correction through its owner. | Assign supplier action through Procurement for supplier audits. | Assign customer-process action through Sales where relevant. | Assign equipment action through Maintenance. | Assign Finance control action through Finance. | Auditor issues finding; Quality Manager approves grading; audited owner responds. | Link criterion, evidence, finding version, response, action and closure verification. | Auditor conflict or editable evidence can suppress a significant control failure. | Planned |
| QE-046 | Audit follow-up | Quality Manager | Approved audit program | Quality audit finding | Verify correction and systemic action against the issued finding and objective evidence. | Check Inventory evidence only for affected product findings. | Confirm Manufacturing action without self-verification by its implementer. | Verify supplier action and Procurement handoff. | Verify Sales/customer-process action where applicable. | Verify Maintenance action and equipment records. | Verify Finance controls through Finance evidence. | Independent auditor or Quality reviewer approves closure. | Reconcile finding due date, extensions, action evidence, retest and residual observation. | A finding can close on uploaded paperwork without control operation being tested. | Planned |
| QE-047 | CoA generation | Quality Assurance Manager | Released batch and approved laboratory or inspection results | Quality certificate | Assemble approved measured results, methods and specification limits for the exact released population. | Confirm batch/serial remains released with no competing hold. | Provide genealogy and production references only as approved content. | No Procurement request. | Sales supplies customer/order requirement and delivers the issued CoA. | Confirm calibration references for included measurements. | No financial request. | Quality Manager signs the data-bearing document for its stated purpose. | Match result versions, specification, release, population, template, signature and delivery. | A corrected result or stale specification can make the CoA false. | Planned |
| QE-048 | CoC generation | Quality Assurance Manager | Released population and customer conformity requirement | Quality certificate | Generate a conformity statement only when the exact population meets governed eligibility and release rules. | Confirm stock population and current release. | Provide completed genealogy where required by the template. | No Procurement request. | Sales supplies customer requirement and controls delivery. | No Maintenance request unless certificate cites equipment evidence. | No financial request. | Quality Manager approves conformity wording and purpose-bound signature. | Match specification, release decision, population, template and issued version. | The statement can claim broader conformity than inspection evidence supports. | Planned |
| QE-049 | Certificate revocation | Quality Assurance Manager | Corrected evidence or reversed release affecting an issued certificate | Certificate revocation | When corrected evidence or reversed release invalidates a document, mark the old version revoked and issue a controlled successor if eligible. | Confirm affected population is re-held when required. | Contain affected production or output when the reversal reaches Manufacturing. | No Procurement request unless supplier evidence caused revocation. | Notify Sales and Customer Service to contact recipients and stop use. | Review instrument status if calibration caused invalidation. | Assess commercial/financial consequence only through Sales and Finance. | Quality Manager approves revocation and any replacement document. | Link original certificate, invalidating event, revocation time, successor and recipient notification. | Customers may continue relying on an offline certificate if notification is delayed. | Planned |
| QE-050 | AI NCR draft | Quality Engineer | Authorized inspection, complaint or audit evidence | Labeled AI NCR draft | AI summarizes source inspection evidence into a clearly labeled draft without creating final severity, hold or disposition. | No Inventory command is permitted. | No Manufacturing command is permitted. | No Procurement action is permitted. | No Sales action is permitted. | No Maintenance action is permitted. | No Finance action is permitted. | Quality Engineer verifies every source fact, affected scope and wording before creating an NCR. | Retain model/version, prompt, cited sources, draft, human edits and final author. | Hallucinated scope or omitted failed evidence could enter the NCR if review is superficial. | Future |
| QE-051 | AI CAPA draft | Quality Engineer | Authorized NCR, cause and action evidence | Labeled AI CAPA draft | AI organizes linked NCR, cause evidence and proposed actions into a labeled draft without approving cause, owners or closure. | No Inventory request may be generated automatically. | No Manufacturing task or process change may be executed. | No supplier or commercial action may be sent. | No customer communication may be issued. | No equipment work may be ordered. | No accounting action may be created. | Quality Manager verifies sources, cause logic and action authority before controlled use. | Retain model, prompt, sources, omissions, human revisions and final accountable author. | The draft can turn a hypothesis into asserted cause or assign action outside domain authority. | Future |
| QE-052 | AI inspection summary | Quality Product Owner | Authorized quality evidence subset | Labeled AI draft | AI summarizes completed observations and exceptions for review without creating results or changing outcome. | No hold or release request is permitted from the summary. | No stop, continuation or rework request is permitted. | No supplier action is permitted. | No customer clearance or statement is permitted. | No equipment-state action is permitted. | No posting is permitted. | Inspector and Quality reviewer confirm summary against immutable source results. | Compare every summary statement to cited request, step, sample and result version. | A failed critical characteristic can be omitted or softened by summarization. | Future |
| QE-053 | Incoming certificate mismatch | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Compare supplier certificate lot, item, result units and specification to the actual receipt; record mismatch as evidence. | Hold the receipt until mismatch and inspection requirements resolve. | Do not issue material to production. | Request corrected document or supplier investigation through Procurement. | No Sales request unless downstream customer exposure exists. | No Maintenance request. | No financial request unless Procurement opens a claim. | Supplier Quality Manager approves acceptance of corrected evidence or rejection. | Match certificate identity, receipt, supplier lot, specification and resulting inspection/disposition. | A certificate from another lot can be accepted as proof for the receipt. | Planned |
| QE-054 | Skip-lot eligibility review | Supplier Quality Engineer | Supplier-item inspection history and next incoming receipt | Skip-lot eligibility decision | Evaluate qualified supplier-item history, severity, recurrence and switching rules before allowing a receipt to skip routine sampling. | Keep receipt non-available until skip-lot eligibility and any document checks complete. | Do not consume until Inventory acknowledges the decision. | Procurement supplies supplier/site identity but does not approve technical skip-lot. | No Sales request. | No Maintenance request. | No financial request. | Supplier Quality Manager approves entry, continuation or removal from skip-lot. | Reconcile qualifying history, skipped receipts, periodic checks and any escape that resets eligibility. | A reset or wrong supplier site can let a high-risk receipt bypass inspection. | Planned |
| QE-055 | Tightened incoming sampling | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | After rejection or severe defect, resolve the tightened sample and acceptance rule for subsequent supplier lots. | Hold each receipt pending the tightened inspection outcome. | Prevent production issue until released. | Notify Procurement of increased control and supplier response expectations. | No Sales request unless supply risk affects commitments. | No Maintenance request. | Track additional inspection cost only through Finance reporting. | Supplier Quality Manager approves switching state and later return to normal. | Link triggering failures, switching history, sample sizes, outcomes and supplier action. | A lost switching state can revert to normal sampling too early. | Planned |
| QE-056 | Destructive receipt sample | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Select and consume the approved sample units, record test destruction and evaluate the remaining receipt population. | Remove destroyed quantity from availability and preserve disposition. | Do not treat destroyed units as usable production material. | Address replacement or commercial quantity through Procurement when contractually applicable. | No Sales request. | No Maintenance request unless laboratory equipment fails. | Receive consumption or supplier-cost reference; Finance decides value treatment. | Quality Manager approves destructive plan and any substitution. | Balance receipt quantity to destroyed samples, accepted quantity and rejected/held quantity. | Destroyed units can remain in available quantity or be silently replaced by easier samples. | Planned |
| QE-057 | Supplier remote containment | Supplier Quality Engineer | Procurement receipt or supplier case | SCAR | Define affected supplier lots and require evidence that supplier stock, WIP and shipments are isolated. | Hold matching internal and in-transit receipt populations. | Contain WIP that consumed identified lots. | Send contractual containment demand and manage shipment stops. | Review customer exposure if affected output shipped. | No Maintenance request. | No direct financial request. | Supplier Quality verifies technical evidence; Procurement approves supplier communication. | Reconcile supplier quantities/locations, open shipments, internal receipts and later verification. | Supplier paperwork may claim containment while outbound material continues. | Planned |
| QE-058 | Supplier-item qualification | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Review supplier site, item/process capability, audit, trial lots and required inspection controls before Quality approval. | Receive trial material in controlled status until qualification inspection passes. | Use trial material only under approved production constraints. | Procurement owns onboarding and commercial approval. | No Sales request unless customer approval is required. | No Maintenance request. | Finance evaluates cost but not technical qualification. | Supplier Quality Manager approves quality qualification; Procurement approves commercial supplier status. | Link supplier site, item/revision, audits, trials, results, restrictions and approval expiry. | Approval at supplier level can be incorrectly applied to an unqualified item or site. | Planned |
| QE-059 | Supplier audit escalation | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | A major supplier audit finding triggers heightened Quality controls and a documented restriction recommendation. | Apply enhanced receipt hold/inspection only to affected supplier-item scope. | Contain production if supplied material exposure exists. | Procurement decides commercial escalation, new orders or restriction. | Review customer exposure where necessary. | No Maintenance request. | Finance handles claims only after Procurement action. | Supplier Quality approves technical recommendation; Procurement approves sanction. | Reconcile audit finding, SCAR/CAPA, incoming controls, supplier decision and later evidence. | Supplier Quality may be mistaken as having authority to suspend the supplier commercially. | Planned |
| QE-060 | SCAR overdue escalation | Supplier Quality Engineer | Procurement receipt or supplier case | SCAR | Escalate a missed SCAR containment, cause, action or effectiveness milestone with current risk and supply exposure. | Maintain or broaden holds on affected receipts as justified. | Continue production containment or enhanced checks for exposed WIP. | Procurement contacts supplier and decides commercial escalation. | Review delivery risk through Sales. | No Maintenance request. | Finance receives claim reference only after Procurement decision. | Supplier Quality Manager approves technical escalation; Procurement owns sanction. | Link overdue stage, reminders, interim containment, new receipts and Procurement response. | An overdue case may remain passive while additional defective supply arrives. | Planned |
| QE-061 | Receipt hold acknowledgement failure | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Keep the incoming request effect pending when Inventory rejects or does not acknowledge the receipt hold. | Retry the exact receipt-population command and escalate; do not display the hold as enforced. | Prevent issue through Manufacturing’s receipt-clearance gate where possible. | Notify Procurement that supplier material remains operationally uncontrolled. | No Sales request. | No Maintenance request. | No Finance request. | Quality Manager owns escalation; Inventory Manager owns applying or rejecting stock control. | Compare Quality hold request, Inventory status, receipt quantity, retry history and final acknowledgement. | The receipt can remain available while users believe Quality already secured it. | Planned |
| QE-062 | Incoming quantity split disposition | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Divide one receipt into accepted, supplier-return, rework, scrap and held quantities with explicit evidence. | Apply separate status/location effects and conserve total quantity. | Contain or rework only any consumed or production-linked portion. | Authorize return or claim for the supplier-responsible quantity. | No Sales request unless customer exposure exists. | No Maintenance request. | Post debit/write-off only from acknowledged operational quantities. | Quality Manager approves technical split; each domain approves its effect. | Prove all disposition lines sum to receipt quantity and do not overlap identities. | UOM or split errors can leave unaccounted units or apply two dispositions. | Planned |
| QE-063 | Setup-change first piece | Quality Inspector | Manufacturing order/operation event | Production inspection | A setup parameter change triggers a new first-piece request using the current operation and plan revision. | No Inventory action unless sample material moves. | Hold production beyond containment quantity until pass; after failure correct setup and present a new unit. | No Procurement request. | Advise Sales only if delay affects commitment. | Review machine condition when setup cannot stabilize. | Receive setup loss reference. | Quality independently approves first piece; Manufacturing owns setup and continuation. | Match setup-change event, parameter version, unit identity, result and continuation. | A prior setup approval can be reused after parameters change. | Planned |
| QE-064 | Tool-change first piece | Quality Inspector | Manufacturing order/operation event | Production inspection | Identify the new or serviced tool and inspect the first unit against all tool-sensitive critical characteristics. | No Inventory action unless affected output has transferred. | Restrict continuation, record tool identity and correct or replace tool after failure. | Engage Procurement only for supplier-provided tooling defects. | Advise Sales of delay only when needed. | Maintenance supplies tool/equipment condition where it owns the asset. | Receive tooling loss or downtime reference. | Quality approves outcome; Manufacturing owns tool installation and production state. | Link tool change, tool identity, operation, first-piece serial, result and genealogy. | Approval from the previous tool can be applied to output from the replacement. | Planned |
| QE-065 | Shift patrol overdue | Quality Inspector | Manufacturing order/operation event | Production inspection | A scheduled shift or interval inspection is not completed by its due production point and is not backdated. | Request hold for the unobserved production window when policy requires. | Define and contain output produced since the missed due point; record supervisor response. | No Procurement request unless supplied material is causal. | Assess delivery exposure if window has shipped. | Review staffing/equipment cause where relevant. | Receive downtime or sorting cost reference. | Quality Manager decides retrospective scope; Production Manager executes containment. | Reconcile due point, actual inspection time, production genealogy and disposition of the gap window. | A missed patrol can leave an entire shift’s deterioration undetected. | Planned |
| QE-066 | Critical dimension failure | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | A measured critical dimension exceeds its frozen tolerance and must force a failed outcome. | Hold exact batch/serial and related stock population. | Stop affected operation/window and correct process before new first-piece or reinspection. | Review supplier cause only with evidence. | Assess customer exposure for shipped related output. | Review gauge and machine fitness. | Receive scrap/rework cost reference. | Quality Manager independently confirms critical failure; ordinary override is prohibited. | Link raw value, method, instrument, tolerance, operation window, hold and disposition. | Averaging or manual override can convert the critical failure into an overall pass. | Planned |
| QE-067 | Operation-window containment | Quality Engineer | Manufacturing order/operation event | Production inspection | Use failure time, last-known-good point and genealogy to define suspect output around an operation. | Hold transferred or finished quantities in the suspect window. | Stop operation and isolate WIP/output while the boundary is refined. | Review supplier input if causal evidence supports it. | Identify staged or delivered output through Sales. | Review equipment condition when relevant. | Receive containment-cost references. | Quality approves technical window; Production Manager applies execution control. | Reconcile timestamps, confirmations, batches/serials, locations and released/held quantities. | An overly narrow time window can let affected output escape downstream. | Planned |
| QE-068 | WIP genealogy gap | Quality Engineer | Manufacturing order/operation event | Production inspection | An in-process failure cannot be linked completely to consumed batches, components or subsequent output. | Hold transferred output and source stock conservatively where identities are known. | Stop continuation and reconstruct production order/operation genealogy. | Trace supplier lots when consumed material links are incomplete. | Review shipped output only after exposure is bounded. | Review equipment history if it helps define window. | Estimate financial exposure after scope is known. | Quality Director approves conservative scope; Manufacturing owns genealogy correction. | Classify confirmed, suspect and unknown WIP/output and resolve every missing edge. | Unknown genealogy can either miss affected product or force excessive containment. | Planned |
| QE-069 | Post-rework reinspection | Quality Inspector | Manufacturing order/operation event | Rework quality decision | Create a new request using approved post-rework criteria after Manufacturing completes the exact population. | Keep reworked stock non-available until the new outcome is acknowledged. | Provide completion, cycle count and genealogy; no further work without disposition. | No Procurement request unless supplier performed rework. | Advise Sales only if release timing changes. | Review equipment if rework or test requires it. | Receive rework-cost reference. | Inspector executes; Quality Manager approves outcome independently from Manufacturing. | Match NCR, approved route, completion quantity, reinspection samples, result and release. | Reworked product can be released on the original failed inspection. | Planned |
| QE-070 | Second rework cycle denial | Quality Engineer | Manufacturing order/operation event | Rework quality decision | Reject another rework cycle when the approved maximum is reached or cumulative product risk is unacceptable. | Keep the population held pending alternate disposition. | Do not start another route; provide completed cycle genealogy and condition. | Engage supplier only if responsibility applies. | Review customer concession only through Sales if proposed. | Review equipment only if causal. | Receive accumulated cost and proposed scrap value. | Quality Manager denies; Engineering reviews any exceptional additional cycle. | Reconcile cycle count, quantities, defects, costs and final disposition. | Repeated rework can degrade product while hiding yield and process instability. | Planned |
| QE-071 | Final genealogy review | Quality Inspector | Manufacturing order/operation event | Production inspection | Verify completed quantity has source batches, operations, rework and serial links before final acceptance. | Hold finished stock when mandatory genealogy is missing. | Supply and correct Manufacturing genealogy; Quality does not edit execution history. | Trace supplier sources for unresolved material links. | Block customer clearance until exposure can be reconstructed. | Provide resource/equipment links where required. | No financial action until production identity and quantity reconcile. | Quality Manager approves genealogy adequacy; Manufacturing owns correction. | Compare order quantity, components, operations, output batches/serials and open gaps. | A batch may pass final tests while its affected source material remains unknown. | Planned |
| QE-072 | Finished-goods release rejection | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Decline release because final evidence, genealogy, NCR closure or approval is incomplete. | Keep finished goods non-available and return rejected acknowledgement if release was requested. | Correct missing production evidence or execute approved disposition. | Engage Procurement only for supplier-caused defect. | Sales revises commitment; Quality does not promise availability. | Review equipment only if evidence validity is involved. | Receive delay, rework or scrap references. | Quality Manager rejects technical release; Inventory and Manufacturing own corrections. | Track each blocking reason to resolution and confirm no stock became available. | Operational pressure can bypass unresolved final Quality gates. | Planned |
| QE-073 | Shipment batch substitution | Customer Quality Engineer | Sales delivery, complaint or return | Pre-dispatch inspection | Invalidate pre-dispatch inspection and certificate when Warehouse replaces the staged batch or serial population. | Keep substituted stock staged/non-available until new clearance. | Provide genealogy for substituted production output if requested. | No Procurement request unless substitution arises from supply defect. | Sales confirms order/customer requirements for the new population. | No Maintenance request. | No direct financial request. | Quality Manager approves new inspection; Warehouse Manager owns pick change. | Compare original and substituted population, inspection, certificate, order and shipped identities. | Warehouse can ship an uninspected replacement under the prior batch clearance. | Planned |
| QE-074 | Customer requirement precedence | Customer Quality Engineer | Sales delivery, complaint or return | Pre-dispatch inspection | Resolve enterprise, plant and customer-item requirements and block equal-priority or conflicting acceptance rules. | No status action until a unique specification is frozen. | Use the resolved requirement for applicable production inspection. | No Procurement request. | Sales validates current customer/order requirement but cannot lower technical controls. | No Maintenance request unless method requirements change. | No financial request. | Quality and Engineering approve technical precedence; Sales confirms contract source. | Record all candidate specifications, precedence decision, order version and inspection snapshot. | The wrong customer override can weaken enterprise critical limits or use obsolete criteria. | Planned |
| QE-075 | Packaging defect at staging | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Record packaging defect against the staged delivery and determine whether product, label or packaging population is affected. | Hold staged goods or packaging components under exact scope. | Execute packaging rework through Manufacturing/Warehouse process where applicable. | Engage Procurement for supplied packaging defect. | Sales decides delivery delay and customer communication. | No Maintenance request unless packaging equipment caused failure. | Receive rework, scrap or supplier claim references. | Quality Manager approves packaging disposition; Warehouse/Manufacturing owns execution. | Reconcile staged quantity, packaging lot, rework, reinspection and final shipped population. | A cosmetic code can understate a label defect that creates traceability risk. | Planned |
| QE-076 | Customer concession request | Customer Quality Engineer | Sales delivery, complaint or return | Pre-dispatch inspection | Prepare technical nonconformance, affected population, risk and proposed conditions for customer decision. | Keep population held until required customer authority and Quality release exist. | Do not continue restricted processing beyond approved scope. | No Procurement request unless supplier recovery is separate. | Sales obtains written customer authorization tied to order and population. | No Maintenance request. | Finance processes any price effect only after Sales agreement. | Quality Director approves technical proposal; Sales owns customer request. | Link requirement, population, customer response, expiry, release and commercial effect. | Informal customer acceptance can be applied without exact scope or authority. | Planned |
| QE-077 | Delivery certificate correction | Customer Quality Engineer | Sales delivery, complaint or return | Quality certificate | Correct a certificate error through a new document version while retaining the issued original and reason. | Confirm current population release before replacement issuance. | Provide corrected genealogy reference only from Manufacturing. | No Procurement request. | Sales/Customer Service sends replacement and instructs recipient to stop using old version. | Review calibration evidence if the correction concerns measured results. | Assess commercial consequence separately. | Quality Manager approves correction, supersession and replacement. | Match invalid field, source correction, old/new documents, recipient and acknowledgement. | Editing the existing file can erase proof of what the customer originally received. | Planned |
| QE-078 | Complaint safety escalation | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | Escalate symptom, exposure and available evidence immediately when safety or reportability indicators are present. | Hold returned, on-hand and related stock under a conservative scope. | Stop or contain related production windows. | Notify Procurement of supplier-related exposure through governed channels. | Sales and Customer Service suspend ordinary remedy messaging pending approved guidance. | Review equipment if causal. | Finance supports exposure analysis but makes no technical decision. | Quality Director and Legal/Compliance approve escalation path and external statement. | Track complaint, risk assessment, population, holds, legal decision and communications. | Commercial downgrading or delayed escalation can leave hazardous product in use. | Planned |
| QE-079 | Returned serial chain of custody | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | Record seal, condition, storage and each transfer of the returned serial from receipt to analysis. | Receive the serial into restricted return status and log custody location. | Provide original manufacturing history; do not alter return evidence. | No Procurement request unless supplier analysis is required. | Sales/Customer Service supplies return authorization and customer context. | Provide laboratory/equipment custody where relevant. | No financial request until remedy is approved. | Customer Quality owns technical custody; Warehouse owns physical receipt transfers. | Reconcile return authorization, serial, seals, handlers, storage, tests and disposition. | Unrecorded handling can introduce damage later misclassified as field failure. | Planned |
| QE-080 | No-fault-found analysis | Customer Quality Engineer | Authorized customer return with an intermittent or unreproduced symptom | Returned-unit failure analysis | Document attempted reproduction, conditions, tests, limitations and uncertainty rather than asserting conformity or misuse. | Keep returned unit status until disposition is approved. | Provide genealogy and process evidence for comparison. | Review supplier evidence only when component cause is plausible. | Sales decides remedy without treating no-fault-found as automatic claim denial. | Provide equipment/test evidence. | Finance follows Sales remedy. | Customer Quality Manager approves conclusion and trend escalation. | Link symptom, conditions, tests, exclusions, recurrence trend, disposition and response. | An intermittent real defect can be dismissed because the returned unit does not reproduce it. | Planned |
| QE-081 | Field-failure related-lot search | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | Use returned-unit evidence to define material, process, equipment and time-window relationships and find related lots. | Hold confirmed and suspect on-hand/in-transit populations. | Contain WIP and output within the related manufacturing window. | Trace upstream supplier lots and open receipts through Procurement. | Identify delivered related lots and customer exposure. | Review common equipment history when causal. | Finance estimates exposure only after scope is classified. | Customer Quality proposes scope; Quality Director approves consequential containment. | Classify confirmed, suspect, cleared and unknown lots and reconcile domain totals. | Searching only the complaint batch can miss sibling lots made under the same failure condition. | Planned |
| QE-082 | Customer escape CAPA | Customer Quality Engineer | Sales delivery, complaint or return | Pre-dispatch inspection | Open CAPA for a defect that passed internal controls and reached a customer, addressing occurrence and escape causes. | Hold related stock identified by exposure analysis. | Implement process and detection actions through Manufacturing. | Implement supplier action through Procurement when causal. | Sales/Customer Service manages customer response. | Maintenance implements equipment action where causal. | Finance handles credits and quality-cost references. | Quality Director approves cause, action plan and effectiveness; owners cannot self-verify. | Link complaint, internal inspection escape, related lots, actions, recurrence and customer outcome. | CAPA can fix the process defect but leave the failed detection control unchanged. | Planned |
| QE-083 | Emergency batch hold | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Issue an immediate broad batch restriction on credible high-severity evidence before full investigation. | Apply non-available status urgently and acknowledge exact batch quantity. | Stop consumption/processing of the batch and related WIP. | Pause supplier shipments through Procurement when incoming cause is suspected. | Review staged/delivered exposure through Sales. | Hold equipment only through Maintenance when relevant. | No immediate posting; record exposure references. | Authorized Quality Manager issues; Quality Director reviews scope and continuation before expiry. | Reconcile emergency decision, applied quantities, related genealogy and timed review outcome. | The emergency hold can remain overbroad indefinitely or fail to reach active WIP. | Planned |
| QE-084 | Competing holds review | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Evaluate all active Quality, inventory, legal and operational restrictions before releasing one cause. | Release only the named hold while preserving every other Inventory restriction. | Continue production only if no other WIP or operation hold applies. | Preserve supplier restriction independently. | Preserve shipment/legal/customer restrictions independently. | Preserve equipment hold independently under Maintenance. | Preserve Finance/legal blocks separately. | Quality approves its hold release; each owning domain approves its restriction. | List each hold cause, population, version and resulting effective availability after action. | Closing one NCR can accidentally clear a separate active hold. | Planned |
| QE-085 | Hold-scope expansion | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Extend hold from confirmed units to related lots, locations, WIP or shipments when new genealogy evidence broadens exposure. | Apply additional status controls to newly identified stock. | Stop newly included operations or WIP. | Contain additional supplier stock/shipments through Procurement. | Identify additional staged or delivered populations. | Extend equipment hold only through Maintenance. | Update exposure estimate without posting automatically. | Quality Director approves expansion; domains acknowledge their effects. | Compare previous and new scope, incremental quantities, acknowledgements and unknown population. | Expansion may miss remote locations or double-count stock already held. | Planned |
| QE-086 | Hold-scope reduction | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Remove cleared serials, quantities or time windows after evidence proves they are not affected while retaining the suspect remainder. | Release only cleared population and preserve residual holds. | Continue only cleared WIP/operations. | No Procurement action unless supplier scope changes. | Update Sales exposure only for cleared delivery population. | No Maintenance action unless equipment scope changes. | No direct financial action. | Quality Manager approves evidence-based reduction; critical cases require independent review. | Reconcile original scope, cleared evidence, released quantity and remaining restrictions. | An optimistic scope reduction can release units still connected to the failure. | Planned |
| QE-087 | Release dual approval | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Require a second qualified approver for critical, concession-based or high-value release after evidence review. | Apply release only after both signatures bind the same population/version. | Continue production only after acknowledged release. | No Procurement request. | Use released population for commitments after acknowledgement. | No Maintenance request. | No posting request. | Quality evaluator proposes; independent Quality Manager/Director approves. | Verify distinct actors, purpose, timestamps, decision version, population and domain acknowledgement. | The same person or delegated account can satisfy both approvals and defeat SoD. | Planned |
| QE-088 | Release acknowledgement timeout | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Treat an unacknowledged Inventory or Manufacturing release as effect pending rather than completed. | Retry exact idempotent request and escalate to Inventory owner. | Retry or escalate continuation request to Manufacturing owner. | No Procurement request. | Do not promise availability to Sales before authoritative acknowledgement. | No Maintenance request. | No Finance request. | Quality Operations owns monitoring; domain owner resolves application/rejection. | Track request, retries, timeout age, authoritative state and final response. | Users may act on Quality approval while the stock or operation remains blocked. | Planned |
| QE-089 | Release reversal | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Issue a new hold when corrected evidence, new defect or certificate invalidation overturns an earlier release. | Re-hold remaining on-hand/in-transit population and report quantity already moved. | Contain unconsumed and downstream WIP/output. | Stop supplier use or shipments through Procurement if causal. | Identify staged and delivered exposure and notify through Sales. | Review equipment if calibration caused reversal. | Finance assesses impact after physical scope is known. | Quality Director approves reversal and exposure scope. | Link original release, invalidating event, new hold, domain effects, certificates and customer exposure. | Delay can allow stock to be consumed or shipped before reversal applies. | Planned |
| QE-090 | Mixed-lot partial release | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Approve conforming containers or serials from mixed supplier/internal lots without treating the location as one population. | Release exact tracked units and retain each rejected lot portion. | Consume only released identities. | Return or claim only supplier-responsible rejected portions. | Commit only released identities to delivery. | No Maintenance request. | Value exact accepted/rejected quantities from Inventory evidence. | Quality Manager approves split; Inventory validates tracked execution. | Reconcile each lot, container/serial, quantity, outcome, movement and supplier action. | Warehouse-level bulk release can make all mixed lots available. | Planned |
| QE-091 | Expired deviation block | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Reject inspection or execution reliance on a deviation whose time, quantity or revision limit has ended. | Hold affected output pending valid disposition. | Stop further execution under the expired authority. | Notify Procurement if supplier deviation is affected. | Notify Sales if customer authorization must be renewed. | No Maintenance request unless equipment scope applies. | No direct financial request. | Quality Manager confirms expiry; new approval requires full authority matrix. | Identify output created before/after expiry and reconcile hold, disposition and replacement authorization. | Cached deviation status can allow unauthorized output after expiration. | Planned |
| QE-092 | Concession quantity exhaustion | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Stop use when cumulative released quantity reaches the concession’s approved maximum. | Keep remaining population held. | Do not consume or complete additional units under the concession. | Handle supplier remainder through Procurement. | Obtain a new customer decision through Sales if more quantity is proposed. | No Maintenance request. | Update commercial effect only through Sales/Finance. | Quality Director approves any new concession; no automatic extension. | Compare authorized, released, consumed, shipped and remaining quantities. | Quantity can be counted in different UOMs and exceed the approved concession. | Planned |
| QE-093 | NCR duplicate linkage | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Identify two NCRs for the same event and establish one controlling case while preserving each record and relationship. | Prevent duplicate or conflicting hold/release requests. | Prevent competing rework/scrap instructions. | Consolidate supplier communication under Procurement without deleting evidence. | Consolidate customer response references. | No Maintenance request unless duplicate equipment actions exist. | Prevent duplicated cost references. | Quality Manager approves controlling-case designation and closure of duplicate. | Match source event, population, defects, actions and domain commands across both NCRs. | Merging unrelated populations can be as harmful as leaving duplicates uncoordinated. | Planned |
| QE-094 | Defect severity escalation | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Raise severity when new exposure, recurrence, customer impact or safety evidence exceeds the original assessment. | Expand hold scope as justified. | Broaden production containment and stop criteria. | Escalate supplier containment through Procurement. | Escalate customer and legal review through Sales/Customer Service. | Review equipment scope when causal. | Update exposure estimate without automatic posting. | Quality Director approves critical escalation; Legal reviews reportability. | Preserve original/revised severity, new evidence, scope changes and acknowledgements. | Commercial pressure can delay escalation while affected product remains available. | Planned |
| QE-095 | Containment effectiveness check | Quality Engineer | Inspection, audit or quality signal | CAPA | Verify that every requested stock, WIP, supplier and shipment control is physically or systemically applied. | Compare held quantity/status to request. | Compare operation/WIP block to affected window. | Verify supplier remote stock and shipment stops. | Verify staged/delivered exposure actions. | Verify equipment hold through Maintenance when relevant. | No direct financial request. | Quality Manager approves effectiveness only after domain evidence. | Reconcile confirmed/suspect quantities, acknowledgements, exceptions and leakage findings. | Acknowledged commands may not reflect actual physical segregation. | Planned |
| QE-096 | Use-as-is Engineering review | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Evaluate fit, function, safety, interchangeability and design impact before Quality accepts the defect. | Keep population held until technical review and release. | Use only within approved route/product condition. | No Procurement request unless supplier recovery follows. | Obtain customer authority through Sales when required. | No Maintenance request. | No direct financial request. | Engineering approves technical acceptability; Quality Director approves disposition. | Link violated requirement, engineering rationale, population, customer condition and release. | A cosmetic classification can conceal functional or design risk. | Planned |
| QE-097 | Scrap destruction witness | Quality Engineer | Manufacturing order/operation event | Scrap disposition | Observe or verify destruction of designated scrap population using approved method and custody. | Confirm scrap movement and exact identity/quantity. | Confirm WIP scrap intent and genealogy. | Verify external disposal vendor through Procurement if used. | No Sales request unless field-return product is involved. | No Maintenance request. | Finance posts only from movement and destruction evidence. | Operations witness is responsible; Quality verifies disposition compliance. | Match NCR, serial/batch, movement, witness evidence, vendor record and posting. | Undestroyed scrap can be recovered, resold or reintroduced. | Planned |
| QE-098 | Preventive trend action | Quality Engineer | Inspection, audit or quality signal | CAPA | Open preventive action from a statistically credible near miss or deterioration before a defect occurs. | No stock action unless current exposure is identified. | Manufacturing implements process control within change governance. | Procurement acts if supplier trend is causal. | Sales acts only for customer-process prevention. | Maintenance addresses condition trend when causal. | Finance reviews investment but not technical need. | Quality Manager approves risk and success indicator; domain owner implements. | Track trend basis, action, leading indicator, review horizon and unintended effects. | A weak trend can drive costly action without reducing real risk. | Planned |
| QE-099 | Cause hypothesis rejection | Quality Engineer | Inspection, audit or quality signal | CAPA | Document why a proposed cause fails mechanism tests or conflicts with evidence and prevent it from driving action. | No Inventory request unless scope changes. | Request additional process evidence where needed. | Request supplier evidence through Supplier Quality. | Request field-use evidence through Customer Quality. | Request equipment evidence from Maintenance. | No financial request. | Quality Engineer recommends rejection; Quality Manager approves causal record. | Link hypothesis, tests, contrary evidence, decision and replacement investigation path. | Teams may keep a convenient rejected hypothesis because actions are already underway. | Planned |
| QE-100 | Ineffective CAPA reopening | Quality Engineer | Inspection, audit or quality signal | CAPA | Reopen CAPA when recurrence, missed metric or new evidence disproves effectiveness. | Hold newly exposed populations where justified. | Reinstate or expand Manufacturing actions. | Reopen supplier action through Procurement. | Renew customer containment or communication through Sales. | Renew Maintenance action where causal. | Update financial exposure after scope changes. | Independent verifier records failure; Quality Director approves reopening. | Link prior closure, new evidence, affected scope, revised cause/action and new effectiveness plan. | A failed action may be defended rather than reopened, allowing recurrence. | Planned |
| QE-101 | Effectiveness window extension | Quality Engineer | Inspection, audit or quality signal | CAPA | Extend observation only when data is insufficient, preserving original due date, reason and residual risk. | No Inventory request unless new evidence identifies exposure. | Continue domain action and monitoring; do not declare success. | Continue supplier monitoring where applicable. | Continue complaint/field monitoring where applicable. | Continue equipment monitoring where causal. | No direct financial request. | Quality Director approves extension; independent verifier remains assigned. | Track original/extended window, expected events, collected data, exclusions and next decision. | Repeated extension can conceal an action that cannot demonstrate effectiveness. | Planned |
| QE-102 | Cross-site CAPA learning | Quality Engineer | Inspection, audit or quality signal | CAPA | Translate an approved cause/control lesson to other sites after confirming comparable process and risk. | Review site stock exposure separately; do not copy holds automatically. | Each site assesses and implements Manufacturing change under local authority. | Review supplier/site applicability through Procurement. | Review customer applicability through Sales. | Review equipment applicability through Maintenance. | Finance evaluates site-specific cost. | Central Quality approves lesson; local Quality and domain owners approve adoption. | Record source CAPA, comparability evidence, local decision, implementation and outcome. | Blindly copying an action can create ineffective or harmful controls at a different site. | Planned |
| QE-103 | Calibration extension request | Quality Engineer | Maintenance equipment/calibration event | Instrument impact assessment | Assess a short, bounded extension using instrument stability, history, method criticality and prohibited uses. | No stock action unless extension is denied after use. | Restrict production inspection uses not covered by extension. | Use external calibration sourcing through Procurement if needed. | No Sales request. | Maintenance approves equipment-state exception and schedules calibration. | Receive cost reference only. | Quality approves inspection-use risk; Maintenance owns equipment authorization. | Link instrument, due date, history, allowed methods, expiry, approval and later calibration result. | A blanket grace period can authorize an unstable instrument for critical measurements. | Planned |
| QE-104 | External laboratory qualification | Quality Engineer | Maintenance equipment/calibration event | Instrument impact assessment | Evaluate laboratory accreditation scope, method competence, uncertainty, data integrity and sample custody. | Hold samples/receipt populations until valid external results arrive. | Use results for production decisions only within qualified scope. | Procurement owns laboratory contract and commercial onboarding. | No Sales request unless customer approval is required. | Maintenance/Metrology reviews instrument/certificate evidence where applicable. | Finance processes laboratory cost only from Procurement. | Quality Manager approves technical qualification; Procurement approves supplier relationship. | Link lab site, method scope, audit/certificates, trial results, expiry and actual reports. | A qualified laboratory can issue a result for a method outside its approved scope. | Planned |
| QE-105 | Instrument range mismatch | Quality Engineer | Maintenance equipment/calibration event | Instrument impact assessment | Detect that selected gauge range, resolution or accuracy cannot demonstrate the characteristic tolerance. | Hold affected population if measurement was already used. | Request reinspection before production continuation or final release. | No Procurement request unless external equipment supplied. | Review shipment exposure if result supported release. | Maintenance provides equipment specification/state; Quality decides inspection fitness. | Receive reinspection cost reference. | Quality Engineer approves method eligibility; Maintenance does not approve product acceptance. | Match method requirement, instrument configuration, raw results, affected decisions and retest. | A calibrated but unsuitable instrument can produce plausible invalid results. | Planned |
| QE-106 | Control-chart run-rule signal | Quality Engineer | Approved result series | Statistical quality signal | Validate the specific run, trend or zone rule against homogeneous, complete and timely data. | Hold defined output only after human scope decision. | Manufacturing records process check, adjustment or stop. | Review supplier input only with evidence. | Review delivery exposure if output window shipped. | Review equipment condition when indicated. | Receive process-loss reference. | Quality Engineer confirms signal; Production Manager owns process intervention. | Link chart version, points, subgroup, rule, time window, genealogy and action. | A plan revision or delayed data can mimic the run-rule pattern. | Planned |
| QE-107 | Capability study qualification | Quality Engineer | Inspection, audit or quality signal | CAPA | Confirm stable process, measurement suitability, distribution assumptions and representative sampling before reporting capability. | No stock movement is triggered by a study alone. | Manufacturing supplies stable process conditions and acts on approved findings. | No Procurement request unless supplier process is studied. | No Sales request unless a customer report is approved. | Maintenance supplies measurement-system evidence. | Finance uses results only for analysis. | Quality Engineering approves method and interpretation. | Record study population, exclusions, stability evidence, gauge evidence, calculation and limitations. | Pooling shifts or revisions can produce a misleading capability index. | Planned |
| QE-108 | Audit conflict reassignment | Quality Manager | Approved audit program | Quality audit finding | Remove an auditor whose ownership, recent work or reporting relationship compromises independence. | No Inventory request unless the audit finding identifies exposure. | No Manufacturing action until independent audit scope is restored. | No Procurement request unless supplier audit staffing changes. | No Sales request. | No Maintenance request. | No Finance request. | Quality Director approves reassignment; Internal Audit reviews critical conflicts. | Preserve original assignment, disclosed conflict, replacement competence and audit schedule impact. | Schedule pressure can retain a conflicted auditor and soften findings. | Planned |
| QE-109 | Certificate authenticity verification | Customer Quality Engineer | Sales delivery, complaint or return | Quality certificate | Verify signature, issuer, document status and population without exposing restricted result data. | Confirm referenced batch/serial and release status for authorized verifier. | Provide genealogy only under approved scope. | No Procurement request. | Sales/Customer Service supports customer verification channel. | No Maintenance request unless certificate includes calibration evidence. | No financial request. | Quality Assurance owns verification rules; Security approves token/signature controls. | Match verification token, certificate version, revocation status, requester scope and response. | A guessable token or stale cache can validate a revoked or unrelated certificate. | Planned |
| QE-110 | Quality-to-Inventory reconciliation | Quality Manager | Quality effect requests and Inventory acknowledgements | Reconciliation exception/certification | Compare every hold, release and disposition request with Inventory-owned quantity, batch/serial, status and movement acknowledgement. | Inventory resolves authoritative status or quantity exception; Quality does not edit it. | Use Manufacturing genealogy only to explain consumed or produced quantities. | Use Procurement return references for supplier dispositions. | Use Sales delivery references for shipped exposure. | No Maintenance request. | Use Finance reference only for completed value effects. | Operations owns exception resolution; Quality Manager certifies Quality-side decision evidence. | Age missing, partial, stale and conflicting effects until both source records agree. | A partial or rejected Inventory acknowledgement can be mistaken for complete release. | Planned |

### 56.3 Quality RACI

Legend: A = accountable, R = responsible, C = consulted, I = informed. Every activity has exactly one A and one different R; no cell combines A/R.

| Role | Abbreviation |
|---|---|
| Architecture Board | AB |
| Quality Product Owner | QPO |
| Quality Director | QD |
| Quality Manager | QM |
| Quality Engineer | QE |
| Quality Inspector | QI |
| Supplier Quality Engineer | SQE |
| Customer Quality Engineer | CQE |
| Production Manager | PM |
| Production Supervisor | PS |
| Operator | OP |
| Inventory | INV |
| Warehouse | WH |
| Procurement | PROC |
| Supplier Management | SM |
| Sales | SALES |
| Customer Service | CS |
| Maintenance | MNT |
| Finance | FIN |
| Cost Accountant | CA |
| Engineering | ENG |
| Data Governance | DG |
| Security | SEC |
| Integration | INT |
| Reporting | REP |
| Internal Audit | IA |
| Operations | OPS |
| Legal/Compliance direction | LC |

| Activity | AB | QPO | QD | QM | QE | QI | SQE | CQE | PM | PS | OP | —NV | WH | PROC | SM | SALES | CS | MNT | FIN | CA | ENG | DG | SEC | —NT | REP | —A | OPS | LC |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Approve Quality architecture | A | R | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | C | — | — |
| Maintain Quality product roadmap | — | A | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve enterprise Quality policy | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | C | — | — |
| Assign plant Quality authority | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Publish characteristic master | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Publish specification version | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Publish Quality plan | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Publish inspection plan | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve sampling plan | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Create incoming inspection request | — | — | — | A | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Execute incoming inspection | — | — | — | A | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Create in-process inspection request | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Execute first-piece inspection | — | — | — | A | — | R | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Execute patrol inspection | — | — | — | A | — | R | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Execute final inspection | — | — | — | A | — | R | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Execute pre-dispatch inspection | — | — | — | A | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve inspection outcome | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Create inspection result | — | — | — | A | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Correct inspection result | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Issue Quality hold | — | — | — | A | R | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Apply inventory hold status | — | — | — | C | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Record Manufacturing hold/stop | — | — | — | C | — | — | — | — | A | R | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Release Quality hold | — | — | A | R | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Apply inventory release effect | — | — | — | C | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Continue production after release | — | — | — | C | — | — | — | — | A | R | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Create NCR | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve NCR disposition | — | — | A | R | C | — | — | — | C | — | — | C | — | C | — | C | — | — | C | — | C | — | — | — | — | — | — | — |
| Close NCR | — | — | A | R | C | — | — | — | C | — | — | C | — | C | — | C | — | — | — | — | — | — | — | — | — | C | — | — |
| Classify defect severity | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Coordinate containment | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Execute inventory containment | — | — | — | C | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Execute production containment | — | — | — | C | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve use-as-is disposition | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve rework disposition | — | — | — | A | R | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Execute rework | — | — | — | C | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Record scrap intent | — | — | — | C | — | — | — | — | A | R | — | C | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — |
| Approve scrap disposition | — | — | — | A | R | — | — | — | C | — | — | C | C | — | — | — | — | — | C | C | — | — | — | — | — | — | C | — |
| Move inventory to scrap status | — | — | — | C | — | — | — | — | — | — | — | A | R | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — |
| Post scrap financial effect | — | — | — | C | — | — | — | — | — | — | — | C | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — |
| Approve deviation | — | — | — | C | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — |
| Approve concession | — | — | A | R | — | — | — | C | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve waiver | — | — | A | R | C | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | C | — | — | — | — | — | — | C |
| Obtain customer concession | — | — | — | C | — | — | — | R | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — | — | — | — | — | — |
| Issue supplier return request | — | — | — | C | — | — | C | C | — | — | — | — | — | A | R | C | — | — | — | — | — | — | — | — | — | — | — | — |
| Create CAPA | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve root cause | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Implement manufacturing corrective action | — | — | — | C | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Implement maintenance corrective action | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — | — | R | — |
| Verify CAPA effectiveness | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Close CAPA | — | — | A | R | C | — | — | — | C | — | — | — | — | C | — | C | — | C | — | — | — | — | — | — | — | C | — | — |
| Issue SCAR | — | — | — | A | — | — | R | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Send SCAR commercially | — | — | — | C | — | — | C | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Accept supplier corrective response | — | — | — | A | — | — | R | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve supplier restriction recommendation | — | — | A | C | — | — | R | — | — | — | — | C | — | C | C | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Restrict supplier commercially | — | — | — | C | — | — | C | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Intake customer complaint | — | — | — | C | — | — | — | R | — | — | — | — | — | — | — | C | A | — | — | — | — | — | — | — | — | — | — | — |
| Investigate customer complaint | — | — | — | A | — | — | — | R | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve customer-facing technical statement | — | — | — | A | — | — | — | R | — | — | — | — | — | — | — | C | C | — | — | — | — | — | — | — | — | — | — | C |
| Authorize customer return | — | — | — | C | — | — | — | C | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — |
| Perform returned-unit failure analysis | — | — | — | A | — | — | — | R | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — |
| Authorize customer credit | — | — | — | C | — | — | — | C | — | — | — | — | — | — | — | R | — | — | A | — | — | — | — | — | — | — | — | — |
| Perform batch/serial exposure trace | — | — | A | C | R | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Authorize recall action | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | C | R | A |
| Schedule instrument calibration | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — | — | R | — |
| Review failed calibration impact | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — |
| Approve SPC baseline | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Perform Quality audit | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | C | — | — |
| Close Quality audit finding | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | C | — | — |
| Issue quality certificate | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Revoke quality certificate | — | — | — | A | R | — | — | C | — | — | — | — | — | — | — | C | C | — | — | — | — | — | C | — | — | — | — | C |
| Certify quality report snapshot | — | — | A | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | R | — | — | — |
| Resolve Quality reconciliation exception | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — |
| Administer Quality access policy | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | C | — | — |
| Review Quality control assurance | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — |
| Govern quality-data semantics | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | R | — | — | — |
| Operate Quality integration | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | R | — |

### 56.4 Quality responsibility and trace views

~~~mermaid
flowchart LR
    RCV["Receipt identity"] --> BAT["Inventory batch"]
    BAT --> SMP["Incoming sample units"]
    SMP --> RES["Characteristic results"]
    RES --> DEC["Quality decision version"]
    DEC --> MOV["Inventory movement acknowledgement"]
    BAT --> USE["Manufacturing consumption genealogy"]
    USE --> OUT["Output batches"]
    OUT --> EXP["Forward exposure set"]
~~~

~~~mermaid
flowchart LR
    SER["Inventory serial"] --> OP["Manufacturing operation history"]
    OP --> IQ["Inspection requests"]
    IQ --> IR["Instrumented results"]
    IR --> NR["NCR and disposition"]
    NR --> RW["Rework genealogy"]
    RW --> FD["Final decision"]
    FD --> DL["Delivery or return reference"]
~~~

~~~mermaid
flowchart TB
    Q["Quality decision and evidence"] --> IREQ["Requests status effect"]
    INV["Inventory identity and movement"] --> IACK["Acknowledges movement"]
    Q --> MREQ["Requests stop/rework/scrap criteria"]
    MFG["Manufacturing execution and genealogy"] --> MACK["Acknowledges execution"]
    Q --> CREQ["Requests commercial review"]
    COM["Procurement / Sales commercial authority"] --> CACK["Acknowledges action"]
    IREQ --> INV
    MREQ --> MFG
    CREQ --> COM
    IACK & MACK & CACK --> Q
~~~

~~~mermaid
flowchart TD
    DRAFT["Quality policy or master draft"] --> REVIEW["Domain and Data Governance review"]
    REVIEW --> SEC["Security and SoD assessment"]
    SEC --> QAPP["Quality accountable approval"]
    QAPP --> PUB["Versioned publication"]
    PUB --> MON["Operational evidence and reconciliation"]
    MON --> AUD["Independent assurance"]
    AUD --> CHANGE["Governed change proposal"]
    CHANGE --> DRAFT
~~~


## 57. Architecture Decisions and Open Decisions

### 57.1 Architecture decision register

These decisions are Proposed unless repository evidence supports the narrow foundation statement. Proposed means subject to architecture approval; it does not authorize implementation.

| ADR | Decision | Status | Quality-specific rationale and unsafe alternative rejected |
|---|---|---|---|
| QADR-001 | Quality owns disposition | Proposed | Disposition is a technical acceptance decision supported by inspection and NCR evidence. Letting Inventory or Manufacturing choose it would allow operational convenience to determine conformity; those domains execute only the approved movement or production treatment. |
| QADR-002 | Quality owns hold and release decisions | Proposed | Quality decides whether evidence permits or restricts use, while Inventory and Manufacturing apply the effect. Combining decision and execution would hide whether a batch was technically released or merely moved. |
| QADR-003 | Inventory owns stock movement | Proposed | Only Inventory validates quantity, location, batch/serial status and competing restrictions before movement. A Quality-side update would bypass stock history, availability controls and valuation reconciliation. |
| QADR-004 | Manufacturing owns production execution | Proposed | Quality defines acceptance, hold and rework criteria, but Manufacturing records operation state, labor, material, WIP and genealogy. Quality execution writes would make the evidence owner rewrite the process being judged. |
| QADR-005 | Procurement owns supplier commercial action | Proposed | Supplier Quality may reject material or verify a SCAR, but Procurement authorizes return, debit, claim and restriction. Technical evidence must not become an automatic contractual sanction. |
| QADR-006 | Sales owns customer commercial action | Proposed | Customer Quality determines technical cause and exposure; Sales authorizes return, replacement and commitment. Allowing Quality to promise a remedy would bypass contract, order and credit controls. |
| QADR-007 | Maintenance owns equipment readiness | Proposed | Maintenance controls equipment condition, work and calibration state; Quality decides whether that evidence makes the instrument fit for inspection. Quality cannot clear equipment by accepting product results. |
| QADR-008 | Finance owns financial posting | Proposed | Quality supplies disposition and cost evidence, but Finance selects account, value, period and approval. Automatic journals from NCR or scrap decisions would bypass financial policy and close controls. |
| QADR-009 | Inspection does not equal movement | Proposed | Inspection records evidence and acceptance; it does not change physical custody or quantity. Treating completion as movement would obscure whether Inventory applied the required status. |
| QADR-010 | Quality hold does not equal Inventory movement | Proposed | The hold prohibits use of a population, whereas Inventory records how stock is segregated. Equating them would show material secured before Inventory validates and acknowledges the effect. |
| QADR-011 | Quality release does not equal stock transfer | Proposed | Release removes a Quality restriction but does not choose warehouse, bin or movement type. Automatic transfer could relocate the wrong quantity and erase other Inventory or legal holds. |
| QADR-012 | Nonconformance does not equal scrap | Proposed | An NCR establishes requirement failure and investigation scope; scrap is only one disposition with operational and financial effects. Automatic scrap would preclude rework, return, concession or cause review. |
| QADR-013 | Rework approval does not equal rework execution | Proposed | Quality approves defect scope, route constraints and reinspection criteria. Manufacturing creates and confirms rework operations; otherwise labor, material and genealogy would be invented by the approving domain. |
| QADR-014 | Scrap disposition does not equal scrap movement | Proposed | Quality decides technical unacceptability, while Inventory or Manufacturing records quantity and Operations verifies destruction. Collapsing them would make approved intent indistinguishable from completed disposal. |
| QADR-015 | Supplier defect does not equal supplier debit | Proposed | A verified supplier defect supports technical rejection but not contract amount, tax or claim. Procurement and Finance authorize debit; automatic recovery could overcharge the supplier or reference the wrong receipt. |
| QADR-016 | Customer complaint does not equal return or credit | Proposed | A complaint is evidence requiring technical triage; it is not proof that return or refund is contractually due. Sales and Finance must decide remedy so Quality cannot convert an allegation into a commercial transaction. |
| QADR-017 | CAPA does not equal NCR closure | Proposed | An NCR may finish disposition while systemic actions and their effectiveness remain open. Closing both together would hide long-running recurrence risk and let completed product treatment masquerade as preventive control. |
| QADR-018 | Corrective action does not equal effectiveness | Proposed | Implementation proves a task occurred, not that the causal mechanism stayed controlled. A separate population, metric, time window and independent verifier prevent paperwork completion from becoming false assurance. |
| QADR-019 | Sampling plans are versioned | Proposed | Lot bands, AQL, severity and switching rules determine statistical confidence. Editing them in place would make historical lot decisions unreproducible and conceal why a supplier receipt was accepted. |
| QADR-020 | Inspection plans are versioned | Proposed | Step, method, instrument and critical-characteristic changes alter what conformity means. Frozen versions prevent an open or completed request from silently inheriting different work. |
| QADR-021 | Specifications are versioned | Proposed | Acceptance limits and customer/plant precedence must be reconstructed at business time. Overwriting a specification could turn an obsolete-limit acceptance into an apparently current decision. |
| QADR-022 | Quality plans are versioned | Proposed | Trigger, inspection type, responsibility and response policy evolve independently. Versioning ensures source events can be replayed and prevents a later plan from rewriting why an inspection existed. |
| QADR-023 | Results are immutable | Proposed | An observation is primary Quality evidence with actor, sample, method, instrument and time. Mutable cells would allow failed values to disappear and invalidate NCR, release and certificate lineage. |
| QADR-024 | Corrections supersede | Proposed | A correction must explain and replace an original without deleting it. Overwrite would prevent reviewers from seeing what drove the earlier outcome and whether downstream release or documents require reversal. |
| QADR-025 | Batch/serial traceability is preserved | Proposed | Quality decisions must remain linked to Inventory identity and Manufacturing genealogy. Reassigning results to convenience identifiers would make containment and customer exposure searches target the wrong population. |
| QADR-026 | Quality status and Inventory stock status are separate | Proposed | Quality status expresses inspection or disposition meaning; Inventory status governs availability and movement. A single shared flag would let either domain overwrite the other’s authority and obscure unacknowledged effects. |
| QADR-027 | Hold scope is explicit | Proposed | A hold must state batch, serials, quantity, UOM or process window. Implicit lot-wide behavior can over-block conforming stock or miss related WIP and cannot be reconciled to domain action. |
| QADR-028 | Partial release is explicit | Proposed | Release of 800 from 1,000 units must not be represented by one batch boolean. Exact identities and quantities protect the remaining 200 and expose any Inventory over-application. |
| QADR-029 | Partial disposition is explicit | Proposed | Different quantities may be reworked, returned, scrapped or accepted. Combining them into one header decision loses quantity conservation and prevents Manufacturing, Inventory and Finance from reconciling their effects. |
| QADR-030 | Quality and Manufacturing cannot self-approve each other’s authority | Proposed | Quality cannot approve its own execution record, and Manufacturing cannot approve its own conformity. Independent decisions preserve evidence that rework or continuation occurred only after valid technical acceptance. |
| QADR-031 | Supplier corrective action does not authorize Procurement claim | Proposed | Supplier Quality verifies containment, cause and action; it does not determine contract value or debit. Procurement must translate evidence into a claim so technical closure cannot create unauthorized commercial recovery. |
| QADR-032 | Customer complaint investigation does not authorize Sales credit | Proposed | Quality establishes technical outcome and exposure, while Sales and Finance determine remedy and accounting. Automatic credit would bypass customer agreement and could pay an unsupported or mislinked complaint. |
| QADR-033 | Calibration result does not equal Maintenance release | Proposed | A calibration certificate describes as-found/as-left evidence, but Maintenance controls equipment service state and work completion. Quality may judge inspection fitness without clearing the asset for operational use. |
| QADR-034 | Out-of-tolerance instrument requires impact review | Proposed | As-found failure can invalidate results since the last-known-valid boundary. Merely recalibrating the device would leave accepted batches untouched; instrument-to-result search, holds and reinspection are therefore mandatory. |
| QADR-035 | Audit finding does not automatically create CAPA | Proposed | A finding first requires severity, scope and systemic-risk assessment. Automatic CAPA creates bureaucracy for local corrections, while no CAPA at all may miss recurrence; the decision and rationale must be governed. |
| QADR-036 | CAPA requires effectiveness verification | Proposed | Cause and action approval cannot prove sustained outcome. Closure waits for the predeclared metric, complete population and independent verifier so task completion is not reported as risk elimination. |
| QADR-037 | Certificates are generated from governed evidence | Proposed | A certificate is an external conformity statement, not a free-form report. It must bind released population, result/specification versions, template and signature; copying dashboard data could publish stale or unauthorized claims. |
| QADR-038 | Certificates are revocable | Proposed | Corrections, release reversal or population change can invalidate a document after issue. Without revocation and supersession, customers would continue verifying a statement Quality knows is obsolete. |
| QADR-039 | Direct database writes across domains are prohibited | Proposed | Quality must request effects through validated domain contracts. Direct writes bypass state rules, history, SoD and acknowledgements, making stock, production, commercial or financial records diverge from Quality evidence. |
| QADR-040 | Customization cannot bypass inspection, hold, release, NCR, CAPA, SoD or reconciliation | Proposed | Local extensions may add behavior but cannot disable mandatory gates. An unrestricted customization could create a hidden release path that central policy, audit and cross-domain reconciliation cannot detect. |
| QADR-041 | AI may summarize evidence | Proposed | Summaries can reduce review effort when every statement cites immutable source evidence and remains labeled. Treating a summary as an observation would replace accountable inspection with probabilistic text generation. |
| QADR-042 | AI may draft NCR or CAPA text only | Proposed | Drafting is allowed because a qualified owner verifies facts, scope, cause language and authority before saving. Direct creation could hallucinate populations, assign actions outside domains or prematurely assert root cause. |
| QADR-043 | AI cannot inspect autonomously | Proposed | Inspection requires verified sample, method, instrument, environment and qualified observer. A generic model lacks those controls; autonomous results would be unverifiable evidence even if predictions appear accurate. |
| QADR-044 | AI cannot accept or reject | Proposed | Acceptance and rejection are consequential decisions against frozen requirements. Model scores cannot carry accountable approval or resolve missing evidence, critical failures, concessions and downstream exposure. |
| QADR-045 | AI cannot release holds | Proposed | Release requires complete evidence, competing-hold review and purpose-bound human approval. Granting an AI release endpoint could turn a recommendation into Inventory availability or Manufacturing continuation without accountability. |
| QADR-046 | AI cannot close NCR | Proposed | NCR closure requires verified containment, executed disposition, reinspection and domain acknowledgements. An AI summary cannot establish that physical or operational effects occurred and would conceal open exposure. |
| QADR-047 | AI cannot close CAPA | Proposed | CAPA closure requires independent effectiveness evidence over a defined window. A model cannot own actions or approve their outcome; autonomous closure would report systemic risk controlled without accountable verification. |
| QADR-048 | AI cannot approve supplier | Proposed | Supplier technical qualification and commercial onboarding depend on audits, site/item scope and accountable decisions. Model scoring may inform review but cannot expose production to a supplier or bypass Procurement authority. |
| QADR-049 | AI cannot approve customer concession | Proposed | A concession combines technical risk, population scope and often customer contractual consent. A model cannot represent Quality, Engineering, Sales or the customer and therefore cannot create valid acceptance authority. |
| QADR-050 | AI cannot issue certificates without human approval | Proposed | Certificates communicate conformity externally and may require purpose-bound signature. AI-generated wording can omit limits or overstate scope; qualified Quality approval remains mandatory before publication. |
| QADR-051 | Current Quality flags are foundations, not QMS runtime | Implemented | The linked Item flag, Batch field and QC metadata store vocabulary only; they create no inspection, sampling, hold, release or CAPA behavior. Calling them runtime would contradict repository evidence and readiness controls. |
| QADR-052 | FCSB-019 does not authorize implementation | Proposed | Architecture Review Draft records proposed boundaries and open decisions. Treating publication as build approval would bypass backlog, security, data, migration, operating-readiness and test governance. |
| QADR-053 | FCSB-020 depends on approved calibration/equipment-quality boundaries | Deferred | Maintenance architecture must own equipment state and calibration execution while exposing evidence to Quality. Starting it without this approved seam risks duplicate calibration authority or Quality-controlled work orders. |
| QADR-054 | Inspection requests snapshot resolved plans | Proposed | Execution must retain the exact specification, plan, sampling and method interpretation selected at creation. Live lookup could change remaining steps mid-inspection and invalidate one coherent outcome. |
| QADR-055 | Source-event creation is idempotent | Proposed | Receipt, operation or shipment retries must produce one request for the same trigger and plan. Duplicate requests can generate conflicting results, holds and releases; reinspection is modeled explicitly instead. |
| QADR-056 | Sample identity is separate from inventory identity | Proposed | Inventory identifies the lot or serial population, while Quality identifies selected and tested units. Collapsing them would either imply the whole lot was measured or allow sample substitution to go unnoticed. |
| QADR-057 | Critical failed characteristics cannot be averaged away | Proposed | One critical failure represents mandatory nonconformity regardless of other passing values. Aggregate scoring would permit release by dilution and defeat the specification’s safety or functional intent. |
| QADR-058 | Blank results never imply conformity | Proposed | Missing observation means evidence is incomplete, not zero defect. Default pass behavior could release an untested population and erase the distinction between not measured and measured conforming. |
| QADR-059 | Result corrections retain original observations | Proposed | The original value may have driven hold, NCR or certificate action. Keeping it with correction reason and approval allows downstream reversals to be understood and prevents history laundering. |
| QADR-060 | Reinspection is a related request | Proposed | A new sample after rework or disputed result is new evidence with its own plan and population. Replacing the failed request would hide the reason, failure and sequence that justified another inspection. |
| QADR-061 | Competing holds survive independent release | Proposed | Each hold represents a distinct cause and authority. Releasing one NCR or inspection must not clear legal, inventory or another Quality restriction; otherwise unrelated exposure becomes available silently. |
| QADR-062 | Emergency hold authority expires | Proposed | Broad immediate restriction is justified when delay increases harm, but it cannot remain unreviewed. Expiry forces evidence-based continuation, reduction or release and prevents indefinite over-containment by break-glass authority. |
| QADR-063 | Release requires domain acknowledgement | Proposed | Quality approval proves technical permission, not applied stock or operation state. Until Inventory or Manufacturing responds, the effect remains pending; assuming success would create false availability and irreconcilable history. |
| QADR-064 | Disposition quantities reconcile to affected population | Proposed | Every affected unit must receive one bounded treatment. Quantity conservation prevents unaccounted product, overlapping rework/scrap and inconsistent Inventory, Manufacturing or Finance effects. |
| QADR-065 | Deviation usage is metered | Proposed | A deviation is temporary authority limited by time, quantity and context. Without metering it becomes a reusable specification change, allowing later output to claim approval it never received. |
| QADR-066 | Concessions disclose customer authority when required | Proposed | Quality can assess technical acceptability but cannot invent contractual consent. Binding customer authorization to order and population prevents a private technical decision from overriding customer requirements. |
| QADR-067 | Root-cause claims retain contrary evidence | Proposed | Causal confidence depends on what was tested and disproved as well as supporting observations. Deleting contrary evidence encourages confirmation bias and makes ineffective corrective action look rational. |
| QADR-068 | Action owners remain in authoritative domains | Proposed | Quality defines acceptance criteria and verifies completion, but process, supplier, customer, equipment and finance changes belong to their owners. Assigning Quality as executor would bypass domain controls and weaken accountability. |
| QADR-069 | Effectiveness criteria are frozen before closure | Proposed | Defining the metric after results are known allows selection of a convenient success measure. Predeclared population, target and window protect CAPA from retrospective evidence cherry-picking. |
| QADR-070 | Supplier scorecards cannot suspend suppliers automatically | Proposed | Performance measures may be incomplete, mix sites or lag current containment. Supplier Quality can recommend restriction, but Procurement must decide the commercial relationship with current contractual evidence. |
| QADR-071 | Complaint evidence minimizes personal data | Proposed | Technical investigation normally needs product, use and delivery context, not broad customer identity. Excess data increases privacy harm and may leak to suppliers or analytics without improving Quality decisions. |
| QADR-072 | Recall support is not recall authorization | Proposed | Quality can bound affected product and evidence, but Legal/Compliance and executive governance decide notification and withdrawal. Treating a genealogy query as recall authority would bypass jurisdictional and communication controls. |
| QADR-073 | Instrument fitness is evaluated at observation time | Proposed | A later valid certificate cannot prove the device was eligible when the measurement occurred. Capturing contemporaneous calibration, range and method compatibility makes every result defensible and enables impact analysis. |
| QADR-074 | Control limits differ from specification limits | Proposed | Control limits describe process behavior; specifications define product acceptance. Using one for the other can trigger needless process adjustments or release output that violates customer requirements. |
| QADR-075 | Analytics cannot mutate Quality evidence | Proposed | Reports and models consume certified observations but do not own them. Write-back from a dashboard could change results or dispositions without execution context, attribution or reconciliation. |

### 57.2 Open-decision register

No item below is silently resolved by this draft. The evidence gate is specific to the decision and must be reviewed before design approval.

| Open decision | Decision topic | Evidence required before resolution | Accountable forum |
|---|---|---|---|
| QOD-001 | Quality organization model | Approved tenant/company/plant authority map; central-versus-local policy rights; delegation expiry; inspector/approver incompatibilities; emergency hold authority; and SoD tests using real assignment scenarios. | Architecture Board and Quality |
| QOD-002 | Characteristic model | Canonical variable, attribute, ordinal and calculated characteristic schema; unit/precision rules; criticality; method compatibility; formula lineage; version transitions; and historical result replay. | Architecture Board and Quality |
| QOD-003 | Specification model | Subject and partner scope; enterprise/plant/customer precedence; effective dating; limit and guard-band semantics; Engineering/Quality approval; ambiguity blocking; and supersession replay cases. | Architecture Board and Quality |
| QOD-004 | Quality plan model | Trigger catalog; item/process/partner applicability; inspection-type mapping; skip-lot and response policy; responsible group; version publication; and source-event resolution examples. | Architecture Board and Quality |
| QOD-005 | Inspection plan model | Ordered/parallel step semantics; characteristic/method snapshots; critical-step coverage; conditional branches; qualification and instrument requirements; destructive-test ordering; and publication validation failures. | Architecture Board and Quality |
| QOD-006 | Sampling plan model | Lot-size bands; inspection levels; AQL or equivalent; Ac/Re derivation; attribute versus variable methods; normal/tightened/reduced switching; override authority; and historical replay test cases. | Architecture Board and Quality |
| QOD-007 | Incoming inspection contract | Versioned receipt-line event with supplier/item/lot/quantity/UOM; idempotency key; hold request; partial acceptance; rejected acknowledgement; retry behavior; and Procurement commercial handoff. | Architecture Board and Quality |
| QOD-008 | In-process inspection contract | Production order/operation/version, WIP population, checkpoint and genealogy payload; hold/stop request; continuation acknowledgement; late event treatment; and rework/reinspection correlation. | Architecture Board and Quality |
| QOD-009 | Final inspection contract | Completed quantity and genealogy contract; upstream NCR completeness; partial/full decision; Inventory receipt/status acknowledgement; Manufacturing completion separation; and stale completion rejection. | Architecture Board and Quality |
| QOD-010 | Pre-dispatch contract | Sales order/delivery version, ship-to requirements, staged batch/serial population, substitution invalidation, dispatch clearance, Warehouse acknowledgement and certificate dependency. | Architecture Board and Quality |
| QOD-011 | Hold model | Exact quantity/batch/serial/process-window scope; overlapping causes; expansion/reduction; emergency expiry; effect-pending state; partial application; domain acknowledgement; and release reversal tests. | Architecture Board and Quality |
| QOD-012 | Release model | Evidence and open-hold eligibility; independent approval thresholds; exact population/version; competing-hold preservation; Inventory/Manufacturing rejection or partial response; timeout escalation; and reversal. | Architecture Board and Quality |
| QOD-013 | Inventory quality-status contract | Inventory-owned status code and transition policy; expected-source status; batch/serial/quantity identity; idempotent Quality request; movement history; partial acknowledgement; mismatch reconciliation; and permission-denial tests. | Architecture Board and Quality |
| QOD-014 | NCR model | Origin and requirement linkage; affected-population lines; defect observations; containment and disposition states; quantity conservation; severity/reportability; typed domain acknowledgements; cancellation/reopen rules; and closure-guard tests. | Architecture Board and Quality |
| QOD-015 | Defect taxonomy | Separate manifestation, location, severity, cause and disposition dimensions; enterprise/plant extensions; reclassification history; critical defect mapping; coding examples; and trend continuity after taxonomy change. | Architecture Board and Quality |
| QOD-016 | Containment model | Confirmed/suspect/unknown population semantics; Inventory, WIP, supplier and shipment actions; sorting instructions; scope expansion; remote evidence; acknowledgement completeness; leakage tests; and effectiveness approval. | Security, Data Governance and Quality |
| QOD-017 | Disposition model | Use-as-is, rework, repair, supplier return, scrap, downgrade and regrade semantics; split quantities; Engineering/customer authority; expiry; downstream commands; destruction evidence; and closure reconciliation. | Architecture Board and Quality |
| QOD-018 | Rework quality contract | NCR/disposition version, exact population, approved route constraints, maximum cycles, Manufacturing execution identity, material/labor genealogy, post-rework plan and release-blocking acknowledgement. | Architecture Board and Quality |
| QOD-019 | Scrap disposition contract | Quality technical decision, WIP scrap intent, Inventory scrap movement, destruction/witness class, Finance write-off reference, salvage prohibition, quantity/UOM balance and high-value dual control. | Architecture Board and Quality |
| QOD-020 | Deviation model | Prospective requirement departure; affected process/item/site; time and quantity limits; Engineering/Quality authority; monitoring; metered usage; revocation; exhaustion; permanent-change handoff; and expired-use tests. | Architecture Board and Quality |
| QOD-021 | Concession model | Existing nonconforming population; violated requirement; technical risk; exact quantity/use/customer; customer authorization; certificate disclosure; price-effect reference; expiry and over-application prevention. | Architecture Board and Quality |
| QOD-022 | Waiver model | Prospective relaxation scope; requirement and site; permitted quantity/duration; monitoring; customer/legal authority; usage metering; renewal prohibition; and evidence that repeated waivers trigger permanent change. | Security, Data Governance and Quality |
| QOD-023 | CAPA model | Source-case aggregation; risk and containment; occurrence/escape cause approval; domain-owned actions; due-date versioning; implementation validation; independent effectiveness state; reopening; and paper-closure abuse tests. | Architecture Board and Quality |
| QOD-024 | Root-cause methods | Approved five-whys, fishbone, fault-tree, change-analysis and experiment records; hypothesis confidence; supporting/contrary evidence; occurrence versus escape cause; operator-blame safeguards; and approval competence. | Architecture Board and Quality |
| QOD-025 | Effectiveness model | Frozen baseline, target, population, source and observation window; data-completeness rules; verifier independence; effective/ineffective/indeterminate outcomes; extension authority; and low-frequency evidence policy. | Architecture Board and Quality |
| QOD-026 | Supplier quality model | Supplier-site/item qualification; quality status distinct from commercial status; audit and trial evidence; incoming severity; skip-lot history; scorecard denominators; restriction recommendation; and Procurement decision handoff. | Procurement and Quality |
| QOD-027 | SCAR model | Affected receipt/lot and requirement package; severity-based acknowledgement/containment/cause/action/effectiveness milestones; supplier portal trust; remote containment proof; technical acceptance; overdue escalation; and Procurement communication. | Procurement and Quality |
| QOD-028 | Customer complaint model | Customer Service intake contract; product/delivery/batch/serial identity; symptom and use context; privacy classification; safety/reportability triage; Quality investigation; Sales remedy separation; duplicate and trend handling. | Security, Data Governance and Quality |
| QOD-029 | Return quality model | Sales authorization, Warehouse receipt, chain of custody, returned condition, Inventory non-available status, Quality analysis, technical disposition, Sales remedy and Finance credit-reference reconciliation. | Sales, Customer Service and Quality |
| QOD-030 | Failure-analysis model | Versioned test plan; symptom reproduction; environmental/use conditions; destructive-test approval; evidence custody; confirmed/no-fault-found/indeterminate outcomes; cause confidence; related-population escalation; and technical-statement review. | Security, Data Governance and Quality |
| QOD-031 | Batch trace model | Authoritative Inventory batch identity, supplier receipt and Manufacturing consumption/output genealogy; Quality result/decision links; location and delivery edges; completeness classes; correction lineage; and forward/backward query benchmarks. | Architecture Board and Quality |
| QOD-032 | Serial trace model | One-unit identity and custody across receipt/manufacture, operation, inspection, rework, shipment and return; duplicate/transposition controls; missing-edge handling; and consequential exposure validation. | Architecture Board and Quality |
| QOD-033 | Recall support model | Frozen defect/query criteria; confirmed/suspect/cleared/unknown classes; Inventory/WIP/in-transit/distributor/delivery coverage; versioned exports; privacy access; reconciliation totals; Legal handoff; and drill results. | Architecture Board and Quality |
| QOD-034 | Instrument model | Maintenance-owned equipment identity and condition; class/range/resolution/accuracy; Quality method compatibility; location and custody; status freshness; observation-time reference; and device authentication. | Maintenance and Quality |
| QOD-035 | Calibration contract | Equipment identity; due/valid dates; as-found/as-left values; certificate and provider trust; last-known-valid boundary; Maintenance state event; Quality impact-assessment trigger; extension authority; and failure simulations. | Maintenance and Quality |
| QOD-036 | Out-of-tolerance process | As-found error direction/magnitude; instrument-to-result search interval; near-limit decision evaluation; affected population holds; reinspection alternatives; customer/supplier exposure; closure evidence; and conservative-boundary rules. | Architecture Board and Quality |
| QOD-037 | SPC model | Homogeneous segmentation; subgroup and baseline approval; control-limit calculation; rule version; data lateness/exclusion monitoring; plan-change discontinuity; false/missed signal evaluation; and human Manufacturing advisory. | Architecture Board and Quality |
| QOD-038 | Audit model | Program and audit types; criteria/checklist version; auditor competence and independence; objective evidence and attachment security; finding grading; correction/action response; reschedule authority; and independent closure tests. | Architecture Board and Quality |
| QOD-039 | Certificate model | Eligibility from released population; result/specification snapshot; customer/template version; statement-of-conformity boundaries; purpose-bound signature; supersession/revocation; authenticity verification; restricted disclosure; and recipient notification. | Architecture Board and Quality |
| QOD-040 | Reporting model | Named numerator/denominator, grain, event time, exclusions and owner for each Quality measure; plan-version segmentation; role scope; drill-through; late data; certified snapshots; and source-to-report lineage. | Architecture Board and Quality |
| QOD-041 | Reconciliation model | Decision/effect identity and version keys; Inventory quantity/status, Manufacturing execution, Procurement/Sales action and Finance reference matching; partial/rejected acknowledgements; exception aging; ownership; and period certification. | Architecture Board and Quality |
| QOD-042 | Retention model | Record classes for raw results, attachments, NCR/CAPA, audit and certificates; jurisdiction/customer rules; Quality/legal holds; superseded-document retention; deletion proof; privacy minimization; and active-case protection tests. | Security, Data Governance and Quality |
| QOD-043 | AI boundary | Permitted summarization and drafting; denied inspection/accept/reject/release/closure/certificate commands; model/version identity; prompt/source logs; human approval; output labels; kill switch; hallucination, bias and drift evaluations. | Security, Data Governance and Quality |
| QOD-044 | Quality authority delegation | Delegable actions by severity and scope; effective and expiry times; forbidden critical-release delegation; acting-role display; absence handling; revocation; approval-history attribution; and emergency coverage scenarios. | Architecture Board and Quality |
| QOD-045 | Inspector qualification model | Method, item family, plant, instrument and criticality competence; evidence provider; expiry and suspension; assignment/observation-time checks; supervised exception; retraining; and invalid-result impact after lapse. | Architecture Board and Quality |
| QOD-046 | Method and unit conversion policy | Canonical unit and precision; approved conversion/version; raw-value preservation; rounding and uncertainty order; method/instrument compatibility; boundary regression cases; and external-laboratory interpretation. | Architecture Board and Quality |
| QOD-047 | Specification precedence policy | Enterprise, legal, plant, customer, supplier and engineering-revision precedence; additive versus overriding rules; equal-priority block; contractual evidence; effective-date examples; and emergency supersession handling. | Architecture Board and Quality |
| QOD-048 | Sampling switching rules | Normal/tightened/reduced/skip-lot state inputs; supplier-site/item history; qualifying and disqualifying events; reset/migration behavior; manual authority; recurrence response; and replay over representative receipt sequences. | Architecture Board and Quality |
| QOD-049 | Sample randomization method | Population freeze; container/strata coverage; random seed and algorithm; serial selection; inaccessible/damaged substitution; operator-bias monitoring; destructive samples; and independent reproducibility tests. | Architecture Board and Quality |
| QOD-050 | Destructive sample accounting | Selected and consumed identities; Inventory or WIP quantity treatment; replacement prohibition; laboratory breakage; UOM conversion; supplier commercial responsibility; and balance to accepted/rejected remainder. | Architecture Board and Quality |
| QOD-051 | Inspection correction workflow | Immutable original observation; corrected value/attachment; reason and qualification; independent approval thresholds; outcome recalculation; hold/release and certificate invalidation; and repeated-correction monitoring. | Architecture Board and Quality |
| QOD-052 | Critical-characteristic approval threshold | Criticality source and coverage; fail-fast evaluation; prohibited averaging/ordinary override; independent reviewer competence; concession/Engineering/customer escalation; and abuse tests for incomplete or failed evidence. | Architecture Board and Quality |
| QOD-053 | Emergency hold expiry | Authorized issuers; maximum break-glass duration; default conservative state; mandatory review queue; evidence for continue/narrow/release; escalation when approver absent; and tests proving expiry never auto-releases. | Architecture Board and Quality |
| QOD-054 | Partial release acknowledgement | Exact batch/serial/container or quantity/UOM request; expected Inventory/WIP state; applied/partial/rejected response; competing holds; idempotent retry; quantity conservation; and over-application detection. | Architecture Board and Quality |
| QOD-055 | Competing-hold evaluation | Independent hold causes and authorities; effective restriction calculation; release of one version only; legal/inventory/Quality precedence; hidden-hold display; reversal; and tests covering overlapping partial populations. | Architecture Board and Quality |
| QOD-056 | Disposition quantity tolerance | UOM and conversion basis; rounding/loss/destructive-sample tolerance; identity overlap prohibition; line-total conservation; residual quantity resolution; domain acknowledgement variance; and Finance reconciliation threshold. | Architecture Board and Quality |
| QOD-057 | Customer concession authority | Requirement classes needing customer consent; authorized customer representative; Sales request channel; order/population/use binding; expiry and quantity; wording; certificate disclosure; and invalid informal-approval examples. | Sales, Customer Service and Quality |
| QOD-058 | Supplier restriction recommendation | Technical triggers, severity and scorecard basis; supplier-site/item scope; interim incoming controls; Supplier Quality approval; Procurement acceptance/rejection; effective date; removal evidence; and no automatic commercial sanction. | Procurement and Quality |
| QOD-059 | Complaint privacy classification | Minimum customer/use data by investigation type; sensitive free-text/image detection; Quality/supplier access roles; pseudonymization; disclosure purpose; export redaction; retention; and data-subject/legal handling. | Security, Data Governance and Quality |
| QOD-060 | Recall governance handoff | Quality exposure package; executive and Legal/Compliance authority; jurisdiction and reportability assessment; Sales/customer notification; Inventory/Operations execution; versioned lists; distributor acknowledgement; and decision drill. | Architecture Board and Quality |
| QOD-061 | External laboratory qualification | Legal entity and site; accreditation scope; method competence/uncertainty; sample custody; electronic data/signature trust; audit and proficiency evidence; Procurement contract; expiry; and out-of-scope-result rejection. | Maintenance and Quality |
| QOD-062 | Calibration extension authority | Eligible instrument/method classes; stability history; critical-use prohibitions; maximum duration; Quality inspection-use risk; Maintenance equipment approval; metrology sign-off; usage log; expiry block; and later as-found review. | Maintenance and Quality |
| QOD-063 | Statistical baseline approval | Stable-process evidence; product/method/plan segmentation; subgroup and time window; special-cause exclusions; minimum data; Quality statistician approval; revision triggers; and false/missed-signal back-testing. | Architecture Board and Quality |
| QOD-064 | Audit independence rules | Ownership and recent-work conflicts; reporting relationships; competence; supplier/commercial conflicts; disclosure; prohibited assignments; exception approval; reassignment; co-auditor review; and Internal Audit oversight. | Architecture Board and Quality |
| QOD-065 | Certificate verification mechanism | Non-guessable token or digital signature; issuer and tenant; certificate version/status; population and permitted fields; revocation freshness; access/rate limits; privacy-safe response; offline copy handling; and penetration tests. | Architecture Board and Quality |

### 57.3 Consequential-control views

~~~mermaid
flowchart TD
    ATT["Actor attempts release"] --> AUTH{"Release authority and scope?"}
    AUTH -- No --> DENY["Deny; create security event"]
    AUTH -- Yes --> OWN{"Actor entered critical results?"}
    OWN -- Yes --> DUAL["Require independent approver"]
    OWN -- No --> CHECK["Check holds, NCR, expiry and evidence"]
    DUAL --> CHECK
    CHECK --> REQ["Send versioned domain-effect request"]
    REQ --> ACK{"Acknowledged exactly?"}
    ACK -- No --> ESC["Keep effect pending and escalate"]
    ACK -- Yes --> DONE["Reconciled release"]
~~~

~~~mermaid
flowchart LR
    AI["AI service"] --> READ["Read authorized evidence"]
    READ --> SUM["Draft summary / classification / hypothesis"]
    SUM --> LAB["Label model, sources and uncertainty"]
    LAB --> HUMAN["Qualified human review"]
    HUMAN --> SAVE["Human-authored controlled record"]
    AI -. blocked .-> INS["Inspect / accept / reject"]
    AI -. blocked .-> REL["Release / dispose"]
    AI -. blocked .-> CLS["Close NCR or CAPA"]
    AI -. blocked .-> CERT["Issue certificate"]
~~~

~~~mermaid
sequenceDiagram
    participant Q as Supplier Quality
    participant I as Inventory
    participant P as Procurement
    participant S as Supplier
    Q->>I: Request hold for defective receipt scope
    I-->>Q: Segregation acknowledgement
    Q->>P: Technical defect and SCAR package
    P->>S: Commercially authorized notification
    S-->>Q: Containment and response evidence
    Q-->>P: Verified or inadequate recommendation
    P->>P: Claim/restriction decision
~~~

~~~mermaid
sequenceDiagram
    participant CS as Customer Service
    participant Q as Customer Quality
    participant L as Legal/Compliance
    participant S as Sales
    CS->>Q: Complaint and delivery identity
    Q->>Q: Technical triage and exposure analysis
    alt safety/reportability signal
      Q->>L: Escalate governed assessment
    end
    Q-->>S: Technical conclusion; no credit authority
    S-->>CS: Approved commitment and communication
~~~

## 58. Approval and Roadmap

Approval of this volume establishes an architecture baseline only. It does not create production permission, regulatory certification or authority to implement a Quality runtime. Reviewers must confirm domain ownership, current-versus-target classification, data and privacy boundaries, threat controls, reconciliation, RACI separation and the open-decision evidence plan. Any future implementation requires separately approved backlog, data design, security review, migration strategy, operational readiness, accepted tests and release governance.

The sequence begins with governed characteristics, specifications, plans, sampling and authority; proceeds to immutable inspection requests/results and acknowledged hold/release effects; adds NCR, disposition, CAPA and supplier/customer quality; then introduces instrument/calibration integration, audits, certificates and certified analytics. Mobile, recall support, statistical automation and AI remain later gates. FCSB-020 is next planned and has not been started; its maintenance design must consume, not overwrite, the equipment-quality and calibration boundaries proposed here.

### 58.1 Domain reconciliation contracts

~~~mermaid
sequenceDiagram
    participant Q as Quality
    participant I as Inventory
    Q->>I: Hold/release request with population and decision version
    I->>I: Validate status, quantity, batch and serial
    I-->>Q: Applied/partial/rejected movement acknowledgement
    Q->>Q: Reconcile exact quantity and competing holds
~~~

~~~mermaid
sequenceDiagram
    participant Q as Quality
    participant M as Manufacturing
    Q->>M: Stop, rework or scrap criteria request
    M->>M: Record operation, WIP and execution genealogy
    M-->>Q: Execution version and affected quantity
    Q->>Q: Verify disposition and post-action inspection
~~~

~~~mermaid
sequenceDiagram
    participant Q as Supplier Quality
    participant P as Procurement
    Q->>P: Verified defect, SCAR or restriction recommendation
    P->>P: Decide supplier communication, claim or PO action
    P-->>Q: Commercial-action reference and scope
    Q->>Q: Reconcile supplier-quality case without posting claim
~~~

~~~mermaid
sequenceDiagram
    participant Q as Customer Quality
    participant S as Sales
    Q->>S: Technical conclusion, concession need or exposure
    S->>S: Decide commitment, return authorization or remedy
    S-->>Q: Customer-action reference and authorized population
    Q->>Q: Reconcile quality case without issuing credit
~~~

~~~mermaid
sequenceDiagram
    participant Q as Quality
    participant F as Finance
    Q->>F: Disposition/cost-of-quality evidence reference
    F->>F: Validate account, valuation, period and approval
    F-->>Q: Posting or reserve reference
    Q->>Q: Reconcile reference; never infer financial posting
~~~

### 58.2 Controlled roadmap

~~~mermaid
flowchart LR
    G0["Gate 0<br/>approve FCSB-019 and open decisions"] --> G1["Gate 1<br/>masters, authority and specifications"]
    G1 --> G2["Gate 2<br/>inspection evidence and status orchestration"]
    G2 --> G3["Gate 3<br/>NCR, disposition and CAPA"]
    G3 --> G4["Gate 4<br/>supplier/customer quality and calibration"]
    G4 --> G5["Gate 5<br/>audit, certificates and analytics"]
    G5 --> G6["Later<br/>mobile, statistical automation and governed AI"]
~~~

### 58.3 Approval checklist

| Gate | Required approval evidence | Release condition |
|---|---|---|
| Architecture | Architecture Board resolves or explicitly carries every QOD | No unresolved authority contradiction |
| Quality | Quality Director accepts plan/result/disposition semantics | Critical controls have named accountable owners |
| Domains | Inventory, Manufacturing, Procurement, Sales, Maintenance and Finance sign their contracts | No direct cross-domain write exists |
| Data | Data Governance approves identifiers, versioning, lineage and retention direction | Historical decisions remain reproducible |
| Security | Security validates scope, SoD, signatures, attachments and AI prohibitions | Consequential-action abuse tests pass |
| Integration | Integration and Operations validate idempotency, retries and reconciliation | Failure never defaults to acceptance |
| Assurance | Internal Audit can trace source, evidence, approval and acknowledgement | Control evidence is independently reviewable |

### 58.4 Repository evidence and document boundary

The blueprint depends on the [Series Index](./FCSB-Series-Index.md), [Volume 15 Inventory and Warehouse](./FCSB-Volume-15-Inventory-and-Warehouse-Architecture.md), [Volume 17 Procurement and Supplier](./FCSB-Volume-17-Procurement-and-Supplier-Architecture.md), [Volume 18 Manufacturing Execution](./FCSB-Volume-18-Manufacturing-Execution-Architecture.md), the [Prisma schema](../../apps/api/prisma/schema.prisma), [seed](../../apps/api/prisma/seed.ts), accepted [DBA-004 report](../implementation/DBA-004-enterprise-master-data-implementation.md), and current tests. These links define the evidence boundary; they do not convert target Quality capabilities into implemented functions.

**Approval state:** Architecture Review Draft. No Quality runtime, schema, migration, credential, Docker, API, frontend or test change is authorized by this document.
