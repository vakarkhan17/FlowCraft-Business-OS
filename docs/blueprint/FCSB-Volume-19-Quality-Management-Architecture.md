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

> This volume is an architecture proposal, not evidence that an operational QMS exists. “Implemented foundation” is used only where a linked schema field, migration, seed, service, route or accepted test exists. “Registered metadata only” means a name or enumerated value is present without runtime behavior. Everything else is explicitly Partial, Scaffold, Planned, Future or Open.

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
| Stock-status masters | Implemented foundation | [StockStatus model](../../apps/api/prisma/schema.prisma#L1859), [quality-hold seeds](../../apps/api/prisma/seed.ts#L237) | Inventory master, not a Quality-owned disposition ledger |
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

The current **StockStatus** model and seeded QUALITY_HOLD/REJECTED records are implemented foundations, while **Batch.qualityStatus** is only a coarse foundation field; neither proves governed transitions ([schema](../../apps/api/prisma/schema.prisma#L1859), [seed](../../apps/api/prisma/seed.ts#L237)). The target read model reconciles Quality decisions to Inventory acknowledgements rather than treating duplicated status text as truth.

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

Electronic approval binds actor, purpose, object version, timestamp and authentication context. Break-glass hold authority is allowed because delay can increase harm; break-glass release is prohibited. Bulk actions require preview, bounded scope and independent approval. Repository identity/permissions and AuditLog are implemented foundations, while these quality-specific policies are Planned ([AuditLog](../../apps/api/prisma/schema.prisma#L1357)).

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

| ID | Capability | Current status | Repository evidence or absence basis | Accountable owner | Authority boundary |
|---|---|---|---|---|---|
| QCAP-001 | Item inspection-required flag | Implemented foundation | [Item.isQualityInspectionRequired](../../apps/api/prisma/schema.prisma#L1417); [seed](../../apps/api/prisma/seed.ts#L278) | Quality / Item Governance | Trigger flag only; no automatic request |
| QCAP-002 | Batch quality-status field | Implemented foundation | [Batch.qualityStatus](../../apps/api/prisma/schema.prisma#L1887); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql) | Inventory | Coarse text field; Inventory remains authoritative |
| QCAP-003 | Stock-status master | Implemented foundation | [StockStatus](../../apps/api/prisma/schema.prisma#L1859); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql) | Inventory | Master data only; no Quality transition engine |
| QCAP-004 | QUALITY_HOLD stock-status seed | Implemented foundation | [Seed registration](../../apps/api/prisma/seed.ts#L237) | Inventory | Seeded status does not enact a hold |
| QCAP-005 | REJECTED stock-status seed | Implemented foundation | [Seed registration](../../apps/api/prisma/seed.ts#L237) | Inventory | Seeded status does not execute disposition |
| QCAP-006 | Supplier master identity | Implemented foundation | [Supplier model](../../apps/api/prisma/schema.prisma#L1459); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql) | Procurement | No qualification, SCAR or quality scorecard |
| QCAP-007 | Customer master identity | Implemented foundation | [Customer model](../../apps/api/prisma/schema.prisma#L1485); [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql) | Sales | No complaint-quality or customer specification runtime |
| QCAP-008 | Batch identity | Implemented foundation | [Batch model](../../apps/api/prisma/schema.prisma#L1878) | Inventory | No Quality-owned genealogy edges |
| QCAP-009 | Serial identity | Implemented foundation | [SerialNumber model](../../apps/api/prisma/schema.prisma#L1899) | Inventory | No inspected-sample linkage |
| QCAP-010 | Plant identity | Implemented foundation | [Plant model](../../apps/api/prisma/schema.prisma#L383) | Operations | No Quality authority assignment by plant |
| QCAP-011 | Warehouse identity | Implemented foundation | [Warehouse model](../../apps/api/prisma/schema.prisma#L818) | Inventory / Warehouse | No hold/release acknowledgement contract |
| QCAP-012 | Unit-of-measure masters | Implemented foundation | [Item and UOM references](../../apps/api/prisma/schema.prisma#L1385) | Master Data | No tolerance conversion governance |
| QCAP-013 | Generic workflow definitions | Scaffold | [WorkflowDefinition](../../apps/api/prisma/schema.prisma#L1135); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql) | Platform | No Quality lifecycle policies or runtime |
| QCAP-014 | Generic approval requests | Scaffold | [ApprovalRequest](../../apps/api/prisma/schema.prisma#L1300); [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql) | Platform / Security | No quality-specific purpose-bound signature |
| QCAP-015 | Generic number series | Scaffold | [NumberSeries](../../apps/api/prisma/schema.prisma#L1330) | Platform | No governed QI/NCR/CAPA numbering policy |
| QCAP-016 | Generic audit log | Scaffold | [AuditLog](../../apps/api/prisma/schema.prisma#L1357) | Security | No immutable observation-version semantics |
| QCAP-017 | Generic report definitions | Scaffold | [ReportDefinition](../../apps/api/prisma/schema.prisma#L1226) | Reporting | No governed Quality semantic measures |
| QCAP-018 | Generic transaction links | Scaffold | [TransactionLink](../../apps/api/prisma/schema.prisma#L2345) | Platform | No typed quality genealogy |
| QCAP-019 | QUALITY module code | Registered metadata only | [ModuleCode.QUALITY](../../apps/api/prisma/schema.prisma#L32) | Platform | Enumeration has no operational behavior |
| QCAP-020 | QC inspection transaction kind | Registered metadata only | [TransactionKind.QC_INSPECTION](../../apps/api/prisma/schema.prisma#L70) | Platform | Kind is not an inspection aggregate |
| QCAP-021 | Quality Manager role seed | Registered metadata only | [Seed role](../../apps/api/prisma/seed.ts#L10) | Security | Role name lacks Quality policy enforcement |
| QCAP-022 | Quality department seed | Registered metadata only | [Seed department](../../apps/api/prisma/seed.ts#L150) | Organization | Department record lacks decision authority |
| QCAP-023 | Quality Inspection EOR registration | Registered metadata only | [Seed EOR](../../apps/api/prisma/seed.ts#L28) | Platform | Registration does not provide controller/service/test |
| QCAP-024 | Characteristic master | Planned | Absent: no dedicated Characteristic master model/service/test | Quality | Quality-owned quality master data target |
| QCAP-025 | Characteristic versioning | Planned | Absent: no dedicated Characteristic versioning model/service/test | Quality | Quality-owned quality master data target |
| QCAP-026 | Method master | Planned | Absent: no dedicated Method master model/service/test | Quality | Quality-owned quality master data target |
| QCAP-027 | Method qualification rule | Planned | Absent: no dedicated Method qualification rule model/service/test | Quality | Quality-owned quality master data target |
| QCAP-028 | Defect taxonomy | Planned | Absent: no dedicated Defect taxonomy model/service/test | Quality | Quality-owned quality master data target |
| QCAP-029 | Severity taxonomy | Planned | Absent: no dedicated Severity taxonomy model/service/test | Quality | Quality-owned quality master data target |
| QCAP-030 | Disposition taxonomy | Planned | Absent: no dedicated Disposition taxonomy model/service/test | Quality | Quality-owned quality master data target |
| QCAP-031 | Quality reason codes | Planned | Absent: no dedicated Quality reason codes model/service/test | Quality | Quality-owned quality master data target |
| QCAP-032 | Quality master publication | Planned | Absent: no dedicated Quality master publication model/service/test | Quality | Quality-owned quality master data target |
| QCAP-033 | Product specification | Planned | Absent: no dedicated Product specification model/service/test | Quality Engineering | Quality-owned specifications and plans target |
| QCAP-034 | Supplier-item specification | Planned | Absent: no dedicated Supplier-item specification model/service/test | Quality Engineering | Quality-owned specifications and plans target |
| QCAP-035 | Customer-item specification | Planned | Absent: no dedicated Customer-item specification model/service/test | Quality Engineering | Quality-owned specifications and plans target |
| QCAP-036 | Specification precedence | Planned | Absent: no dedicated Specification precedence model/service/test | Quality Engineering | Quality-owned specifications and plans target |
| QCAP-037 | Specification effective dating | Planned | Absent: no dedicated Specification effective dating model/service/test | Quality Engineering | Quality-owned specifications and plans target |
| QCAP-038 | Quality plan | Planned | Absent: no dedicated Quality plan model/service/test | Quality Engineering | Quality-owned specifications and plans target |
| QCAP-039 | Inspection plan | Planned | Absent: no dedicated Inspection plan model/service/test | Quality Engineering | Quality-owned specifications and plans target |
| QCAP-040 | Plan validation | Planned | Absent: no dedicated Plan validation model/service/test | Quality Engineering | Quality-owned specifications and plans target |
| QCAP-041 | Plan snapshot | Planned | Absent: no dedicated Plan snapshot model/service/test | Quality Engineering | Quality-owned specifications and plans target |
| QCAP-042 | Sampling-plan master | Planned | Absent: no dedicated Sampling-plan master model/service/test | Quality Engineering | Quality-owned sampling and requests target |
| QCAP-043 | AQL table resolution | Planned | Absent: no dedicated AQL table resolution model/service/test | Quality Engineering | Quality-owned sampling and requests target |
| QCAP-044 | Switching-rule history | Planned | Absent: no dedicated Switching-rule history model/service/test | Quality Engineering | Quality-owned sampling and requests target |
| QCAP-045 | Random sample selection | Planned | Absent: no dedicated Random sample selection model/service/test | Quality Engineering | Quality-owned sampling and requests target |
| QCAP-046 | Sample identity | Planned | Absent: no dedicated Sample identity model/service/test | Quality Engineering | Quality-owned sampling and requests target |
| QCAP-047 | Inspection-request creation | Planned | Absent: no dedicated Inspection-request creation model/service/test | Quality Engineering | Quality-owned sampling and requests target |
| QCAP-048 | Source-event idempotency | Planned | Absent: no dedicated Source-event idempotency model/service/test | Quality Engineering | Quality-owned sampling and requests target |
| QCAP-049 | Reinspection relationship | Planned | Absent: no dedicated Reinspection relationship model/service/test | Quality Engineering | Quality-owned sampling and requests target |
| QCAP-050 | Resample authorization | Planned | Absent: no dedicated Resample authorization model/service/test | Quality Engineering | Quality-owned sampling and requests target |
| QCAP-051 | Inspector work queue | Planned | Absent: no dedicated Inspector work queue model/service/test | Quality Operations | Quality-owned execution and results target |
| QCAP-052 | Inspector qualification check | Planned | Absent: no dedicated Inspector qualification check model/service/test | Quality Operations | Quality-owned execution and results target |
| QCAP-053 | Step prerequisite enforcement | Planned | Absent: no dedicated Step prerequisite enforcement model/service/test | Quality Operations | Quality-owned execution and results target |
| QCAP-054 | Manual result capture | Planned | Absent: no dedicated Manual result capture model/service/test | Quality Operations | Quality-owned execution and results target |
| QCAP-055 | Device result ingestion | Planned | Absent: no dedicated Device result ingestion model/service/test | Quality Operations | Quality-owned execution and results target |
| QCAP-056 | Result normalization | Planned | Absent: no dedicated Result normalization model/service/test | Quality Operations | Quality-owned execution and results target |
| QCAP-057 | Result rule evaluation | Planned | Absent: no dedicated Result rule evaluation model/service/test | Quality Operations | Quality-owned execution and results target |
| QCAP-058 | Result correction lineage | Planned | Absent: no dedicated Result correction lineage model/service/test | Quality Operations | Quality-owned execution and results target |
| QCAP-059 | Inspection outcome approval | Planned | Absent: no dedicated Inspection outcome approval model/service/test | Quality Operations | Quality-owned execution and results target |
| QCAP-060 | Incoming inspection trigger | Planned | Absent: no dedicated Incoming inspection trigger model/service/test | Supplier Quality | Quality-owned incoming and external inspection target |
| QCAP-061 | Receipt hold request | Planned | Absent: no dedicated Receipt hold request model/service/test | Supplier Quality | Quality-owned incoming and external inspection target |
| QCAP-062 | Supplier risk-based severity | Planned | Absent: no dedicated Supplier risk-based severity model/service/test | Supplier Quality | Quality-owned incoming and external inspection target |
| QCAP-063 | Certificate-at-receipt validation | Planned | Absent: no dedicated Certificate-at-receipt validation model/service/test | Supplier Quality | Quality-owned incoming and external inspection target |
| QCAP-064 | Remote source inspection | Planned | Absent: no dedicated Remote source inspection model/service/test | Supplier Quality | Quality-owned incoming and external inspection target |
| QCAP-065 | Dock-to-stock eligibility | Planned | Absent: no dedicated Dock-to-stock eligibility model/service/test | Supplier Quality | Quality-owned incoming and external inspection target |
| QCAP-066 | Receipt release request | Planned | Absent: no dedicated Receipt release request model/service/test | Supplier Quality | Quality-owned incoming and external inspection target |
| QCAP-067 | Incoming rejection decision | Planned | Absent: no dedicated Incoming rejection decision model/service/test | Supplier Quality | Quality-owned incoming and external inspection target |
| QCAP-068 | Supplier escape recording | Planned | Absent: no dedicated Supplier escape recording model/service/test | Supplier Quality | Quality-owned incoming and external inspection target |
| QCAP-069 | In-process checkpoint | Planned | Absent: no dedicated In-process checkpoint model/service/test | Quality / Manufacturing | Quality observes; Manufacturing owns execution |
| QCAP-070 | First-piece control | Planned | Absent: no dedicated First-piece control model/service/test | Quality / Manufacturing | Quality observes; Manufacturing owns execution |
| QCAP-071 | Patrol schedule | Planned | Absent: no dedicated Patrol schedule model/service/test | Quality / Manufacturing | Quality observes; Manufacturing owns execution |
| QCAP-072 | Periodic inspection | Planned | Absent: no dedicated Periodic inspection model/service/test | Quality / Manufacturing | Quality observes; Manufacturing owns execution |
| QCAP-073 | Final inspection | Planned | Absent: no dedicated Final inspection model/service/test | Quality / Manufacturing | Quality observes; Manufacturing owns execution |
| QCAP-074 | Pre-dispatch inspection | Planned | Absent: no dedicated Pre-dispatch inspection model/service/test | Quality / Manufacturing | Quality observes; Manufacturing owns execution |
| QCAP-075 | Customer-specific inspection | Planned | Absent: no dedicated Customer-specific inspection model/service/test | Quality / Manufacturing | Quality observes; Manufacturing owns execution |
| QCAP-076 | Destructive-test sequencing | Planned | Absent: no dedicated Destructive-test sequencing model/service/test | Quality / Manufacturing | Quality observes; Manufacturing owns execution |
| QCAP-077 | Partial-population acceptance | Planned | Absent: no dedicated Partial-population acceptance model/service/test | Quality / Manufacturing | Quality observes; Manufacturing owns execution |
| QCAP-078 | Population-scoped hold | Planned | Absent: no dedicated Population-scoped hold model/service/test | Quality Governance | Quality decides; operational domain applies effect |
| QCAP-079 | Emergency hold | Planned | Absent: no dedicated Emergency hold model/service/test | Quality Governance | Quality decides; operational domain applies effect |
| QCAP-080 | Hold expansion | Planned | Absent: no dedicated Hold expansion model/service/test | Quality Governance | Quality decides; operational domain applies effect |
| QCAP-081 | Hold reduction | Planned | Absent: no dedicated Hold reduction model/service/test | Quality Governance | Quality decides; operational domain applies effect |
| QCAP-082 | Competing-hold evaluation | Planned | Absent: no dedicated Competing-hold evaluation model/service/test | Quality Governance | Quality decides; operational domain applies effect |
| QCAP-083 | Independent release approval | Planned | Absent: no dedicated Independent release approval model/service/test | Quality Governance | Quality decides; operational domain applies effect |
| QCAP-084 | Release-effect request | Planned | Absent: no dedicated Release-effect request model/service/test | Quality Governance | Quality decides; operational domain applies effect |
| QCAP-085 | Release reversal | Planned | Absent: no dedicated Release reversal model/service/test | Quality Governance | Quality decides; operational domain applies effect |
| QCAP-086 | Effect acknowledgement | Planned | Absent: no dedicated Effect acknowledgement model/service/test | Quality Governance | Quality decides; operational domain applies effect |
| QCAP-087 | NCR creation | Planned | Absent: no dedicated NCR creation model/service/test | Quality Engineering | Quality-owned ncr and disposition target |
| QCAP-088 | NCR lifecycle | Planned | Absent: no dedicated NCR lifecycle model/service/test | Quality Engineering | Quality-owned ncr and disposition target |
| QCAP-089 | Affected-scope analysis | Planned | Absent: no dedicated Affected-scope analysis model/service/test | Quality Engineering | Quality-owned ncr and disposition target |
| QCAP-090 | Containment plan | Planned | Absent: no dedicated Containment plan model/service/test | Quality Engineering | Quality-owned ncr and disposition target |
| QCAP-091 | Containment verification | Planned | Absent: no dedicated Containment verification model/service/test | Quality Engineering | Quality-owned ncr and disposition target |
| QCAP-092 | Split disposition | Planned | Absent: no dedicated Split disposition model/service/test | Quality Engineering | Quality-owned ncr and disposition target |
| QCAP-093 | Use-as-is decision | Planned | Absent: no dedicated Use-as-is decision model/service/test | Quality Engineering | Quality-owned ncr and disposition target |
| QCAP-094 | Deviation management | Planned | Absent: no dedicated Deviation management model/service/test | Quality Engineering | Quality-owned ncr and disposition target |
| QCAP-095 | Concession and waiver | Planned | Absent: no dedicated Concession and waiver model/service/test | Quality Engineering | Quality-owned ncr and disposition target |
| QCAP-096 | Corrective action | Planned | Absent: no dedicated Corrective action model/service/test | Quality Governance | Quality-owned capa and root cause target |
| QCAP-097 | Preventive action | Planned | Absent: no dedicated Preventive action model/service/test | Quality Governance | Quality-owned capa and root cause target |
| QCAP-098 | CAPA case | Planned | Absent: no dedicated CAPA case model/service/test | Quality Governance | Quality-owned capa and root cause target |
| QCAP-099 | CAPA aggregation | Planned | Absent: no dedicated CAPA aggregation model/service/test | Quality Governance | Quality-owned capa and root cause target |
| QCAP-100 | Five-whys evidence | Planned | Absent: no dedicated Five-whys evidence model/service/test | Quality Governance | Quality-owned capa and root cause target |
| QCAP-101 | Fault-tree evidence | Planned | Absent: no dedicated Fault-tree evidence model/service/test | Quality Governance | Quality-owned capa and root cause target |
| QCAP-102 | Cause confidence | Planned | Absent: no dedicated Cause confidence model/service/test | Quality Governance | Quality-owned capa and root cause target |
| QCAP-103 | Action-to-cause coverage | Planned | Absent: no dedicated Action-to-cause coverage model/service/test | Quality Governance | Quality-owned capa and root cause target |
| QCAP-104 | Effectiveness verification | Planned | Absent: no dedicated Effectiveness verification model/service/test | Quality Governance | Quality-owned capa and root cause target |
| QCAP-105 | Supplier quality profile | Planned | Absent: no dedicated Supplier quality profile model/service/test | Supplier Quality | Quality decides technical status; Procurement owns commercial action |
| QCAP-106 | Supplier-item qualification | Planned | Absent: no dedicated Supplier-item qualification model/service/test | Supplier Quality | Quality decides technical status; Procurement owns commercial action |
| QCAP-107 | Supplier audit | Planned | Absent: no dedicated Supplier audit model/service/test | Supplier Quality | Quality decides technical status; Procurement owns commercial action |
| QCAP-108 | Supplier performance scorecard | Planned | Absent: no dedicated Supplier performance scorecard model/service/test | Supplier Quality | Quality decides technical status; Procurement owns commercial action |
| QCAP-109 | SCAR issue | Planned | Absent: no dedicated SCAR issue model/service/test | Supplier Quality | Quality decides technical status; Procurement owns commercial action |
| QCAP-110 | SCAR staged response | Planned | Absent: no dedicated SCAR staged response model/service/test | Supplier Quality | Quality decides technical status; Procurement owns commercial action |
| QCAP-111 | Supplier containment verification | Planned | Absent: no dedicated Supplier containment verification model/service/test | Supplier Quality | Quality decides technical status; Procurement owns commercial action |
| QCAP-112 | Supplier restriction recommendation | Planned | Absent: no dedicated Supplier restriction recommendation model/service/test | Supplier Quality | Quality decides technical status; Procurement owns commercial action |
| QCAP-113 | Supplier quality trend | Planned | Absent: no dedicated Supplier quality trend model/service/test | Supplier Quality | Quality decides technical status; Procurement owns commercial action |
| QCAP-114 | Complaint-quality triage | Planned | Absent: no dedicated Complaint-quality triage model/service/test | Customer Quality | Quality investigates; Sales/Customer Service own customer action |
| QCAP-115 | Complaint safety escalation | Planned | Absent: no dedicated Complaint safety escalation model/service/test | Customer Quality | Quality investigates; Sales/Customer Service own customer action |
| QCAP-116 | Returned-unit chain of custody | Planned | Absent: no dedicated Returned-unit chain of custody model/service/test | Customer Quality | Quality investigates; Sales/Customer Service own customer action |
| QCAP-117 | Failure reproduction | Planned | Absent: no dedicated Failure reproduction model/service/test | Customer Quality | Quality investigates; Sales/Customer Service own customer action |
| QCAP-118 | No-fault-found outcome | Planned | Absent: no dedicated No-fault-found outcome model/service/test | Customer Quality | Quality investigates; Sales/Customer Service own customer action |
| QCAP-119 | Customer-quality investigation | Planned | Absent: no dedicated Customer-quality investigation model/service/test | Customer Quality | Quality investigates; Sales/Customer Service own customer action |
| QCAP-120 | Customer response review | Planned | Absent: no dedicated Customer response review model/service/test | Customer Quality | Quality investigates; Sales/Customer Service own customer action |
| QCAP-121 | Field-failure trend | Planned | Absent: no dedicated Field-failure trend model/service/test | Customer Quality | Quality investigates; Sales/Customer Service own customer action |
| QCAP-122 | Customer escape measure | Planned | Absent: no dedicated Customer escape measure model/service/test | Customer Quality | Quality investigates; Sales/Customer Service own customer action |
| QCAP-123 | Quality genealogy | Planned | Absent: no dedicated Quality genealogy model/service/test | Quality / Data Governance | Quality-owned traceability and recall target |
| QCAP-124 | Result-to-sample trace | Planned | Absent: no dedicated Result-to-sample trace model/service/test | Quality / Data Governance | Quality-owned traceability and recall target |
| QCAP-125 | Instrument-to-result trace | Planned | Absent: no dedicated Instrument-to-result trace model/service/test | Quality / Data Governance | Quality-owned traceability and recall target |
| QCAP-126 | Decision-to-effect trace | Planned | Absent: no dedicated Decision-to-effect trace model/service/test | Quality / Data Governance | Quality-owned traceability and recall target |
| QCAP-127 | Backward source trace | Planned | Absent: no dedicated Backward source trace model/service/test | Quality / Data Governance | Quality-owned traceability and recall target |
| QCAP-128 | Forward exposure trace | Planned | Absent: no dedicated Forward exposure trace model/service/test | Quality / Data Governance | Quality-owned traceability and recall target |
| QCAP-129 | Related-lot discovery | Planned | Absent: no dedicated Related-lot discovery model/service/test | Quality / Data Governance | Quality-owned traceability and recall target |
| QCAP-130 | Recall population support | Future | Absent: no dedicated Recall population support model/service/test | Quality / Data Governance | Quality-owned traceability and recall target |
| QCAP-131 | Recall-list versioning | Future | Absent: no dedicated Recall-list versioning model/service/test | Quality / Data Governance | Quality-owned traceability and recall target |
| QCAP-132 | Instrument-class requirement | Planned | Absent: no dedicated Instrument-class requirement model/service/test | Maintenance / Quality | Quality assesses evidence; Maintenance owns equipment work |
| QCAP-133 | Instrument eligibility check | Planned | Absent: no dedicated Instrument eligibility check model/service/test | Maintenance / Quality | Quality assesses evidence; Maintenance owns equipment work |
| QCAP-134 | Calibration-status consumption | Planned | Absent: no dedicated Calibration-status consumption model/service/test | Maintenance / Quality | Quality assesses evidence; Maintenance owns equipment work |
| QCAP-135 | Calibration certificate reference | Planned | Absent: no dedicated Calibration certificate reference model/service/test | Maintenance / Quality | Quality assesses evidence; Maintenance owns equipment work |
| QCAP-136 | Out-of-tolerance impact | Planned | Absent: no dedicated Out-of-tolerance impact model/service/test | Maintenance / Quality | Quality assesses evidence; Maintenance owns equipment work |
| QCAP-137 | Result impact assessment | Planned | Absent: no dedicated Result impact assessment model/service/test | Maintenance / Quality | Quality assesses evidence; Maintenance owns equipment work |
| QCAP-138 | Calibration-extension review | Planned | Absent: no dedicated Calibration-extension review model/service/test | Maintenance / Quality | Quality assesses evidence; Maintenance owns equipment work |
| QCAP-139 | External lab qualification | Planned | Absent: no dedicated External lab qualification model/service/test | Maintenance / Quality | Quality assesses evidence; Maintenance owns equipment work |
| QCAP-140 | Reinspection after calibration failure | Planned | Absent: no dedicated Reinspection after calibration failure model/service/test | Maintenance / Quality | Quality assesses evidence; Maintenance owns equipment work |
| QCAP-141 | Control chart | Planned | Absent: no dedicated Control chart model/service/test | Quality Assurance | Quality-owned statistics audits and documents target |
| QCAP-142 | Run-rule signal | Planned | Absent: no dedicated Run-rule signal model/service/test | Quality Assurance | Quality-owned statistics audits and documents target |
| QCAP-143 | Process capability | Planned | Absent: no dedicated Process capability model/service/test | Quality Assurance | Quality-owned statistics audits and documents target |
| QCAP-144 | Acceptance-sampling analytics | Planned | Absent: no dedicated Acceptance-sampling analytics model/service/test | Quality Assurance | Quality-owned statistics audits and documents target |
| QCAP-145 | Quality audit program | Planned | Absent: no dedicated Quality audit program model/service/test | Quality Assurance | Quality-owned statistics audits and documents target |
| QCAP-146 | Audit checklist version | Planned | Absent: no dedicated Audit checklist version model/service/test | Quality Assurance | Quality-owned statistics audits and documents target |
| QCAP-147 | Audit finding | Planned | Absent: no dedicated Audit finding model/service/test | Quality Assurance | Quality-owned statistics audits and documents target |
| QCAP-148 | Certificate of analysis | Planned | Absent: no dedicated Certificate of analysis model/service/test | Quality Assurance | Quality-owned statistics audits and documents target |
| QCAP-149 | Certificate supersession | Planned | Absent: no dedicated Certificate supersession model/service/test | Quality Assurance | Quality-owned statistics audits and documents target |
| QCAP-150 | Inspection timeliness measure | Planned | Absent: no dedicated Inspection timeliness measure model/service/test | Reporting / Quality | Read-only evidence use; source authority retained |
| QCAP-151 | First-pass yield measure | Planned | Absent: no dedicated First-pass yield measure model/service/test | Reporting / Quality | Read-only evidence use; source authority retained |
| QCAP-152 | Defect-rate measure | Planned | Absent: no dedicated Defect-rate measure model/service/test | Reporting / Quality | Read-only evidence use; source authority retained |
| QCAP-153 | Hold-aging measure | Planned | Absent: no dedicated Hold-aging measure model/service/test | Reporting / Quality | Read-only evidence use; source authority retained |
| QCAP-154 | NCR cycle-time measure | Planned | Absent: no dedicated NCR cycle-time measure model/service/test | Reporting / Quality | Read-only evidence use; source authority retained |
| QCAP-155 | CAPA effectiveness measure | Planned | Absent: no dedicated CAPA effectiveness measure model/service/test | Reporting / Quality | Read-only evidence use; source authority retained |
| QCAP-156 | Quality management dashboard | Planned | Absent: no dedicated Quality management dashboard model/service/test | Reporting / Quality | Read-only evidence use; source authority retained |
| QCAP-157 | Cross-domain reconciliation | Planned | Absent: no dedicated Cross-domain reconciliation model/service/test | Reporting / Quality | Read-only evidence use; source authority retained |
| QCAP-158 | Certified quality snapshot | Planned | Absent: no dedicated Certified quality snapshot model/service/test | Reporting / Quality | Read-only evidence use; source authority retained |
| QCAP-159 | Quality scope authorization | Planned | Absent: no dedicated Quality scope authorization model/service/test | Security / Integration | Policy-controlled cross-domain contract |
| QCAP-160 | Inspector-release segregation | Planned | Absent: no dedicated Inspector-release segregation model/service/test | Security / Integration | Policy-controlled cross-domain contract |
| QCAP-161 | Plan author-publisher segregation | Planned | Absent: no dedicated Plan author-publisher segregation model/service/test | Security / Integration | Policy-controlled cross-domain contract |
| QCAP-162 | CAPA implementer-verifier segregation | Planned | Absent: no dedicated CAPA implementer-verifier segregation model/service/test | Security / Integration | Policy-controlled cross-domain contract |
| QCAP-163 | Break-glass hold | Planned | Absent: no dedicated Break-glass hold model/service/test | Security / Integration | Policy-controlled cross-domain contract |
| QCAP-164 | Electronic quality signature | Planned | Absent: no dedicated Electronic quality signature model/service/test | Security / Integration | Policy-controlled cross-domain contract |
| QCAP-165 | Quality event publication | Planned | Absent: no dedicated Quality event publication model/service/test | Security / Integration | Policy-controlled cross-domain contract |
| QCAP-166 | Idempotent domain command | Planned | Absent: no dedicated Idempotent domain command model/service/test | Security / Integration | Policy-controlled cross-domain contract |
| QCAP-167 | Integration replay defense | Planned | Absent: no dedicated Integration replay defense model/service/test | Security / Integration | Policy-controlled cross-domain contract |
| QCAP-168 | Offline inspection capture | Future | Absent: no dedicated Offline inspection capture model/service/test | Product Governance | Advisory only until governed future phase |
| QCAP-169 | Mobile sample identification | Future | Absent: no dedicated Mobile sample identification model/service/test | Product Governance | Advisory only until governed future phase |
| QCAP-170 | Edge instrument gateway | Future | Absent: no dedicated Edge instrument gateway model/service/test | Product Governance | Advisory only until governed future phase |
| QCAP-171 | Computer-vision recommendation | Future | Absent: no dedicated Computer-vision recommendation model/service/test | Product Governance | Advisory only until governed future phase |
| QCAP-172 | AI defect clustering | Future | Absent: no dedicated AI defect clustering model/service/test | Product Governance | Advisory only until governed future phase |
| QCAP-173 | AI cause hypothesis | Future | Absent: no dedicated AI cause hypothesis model/service/test | Product Governance | Advisory only until governed future phase |
| QCAP-174 | Predictive quality signal | Future | Absent: no dedicated Predictive quality signal model/service/test | Product Governance | Advisory only until governed future phase |
| QCAP-175 | Digital certificate verification | Planned | Absent: no dedicated Digital certificate verification model/service/test | Product Governance | Advisory only until governed future phase |
| QCAP-176 | Federated supplier-quality exchange | Future | Absent: no dedicated Federated supplier-quality exchange model/service/test | Product Governance | Advisory only until governed future phase |


## 56. Quality Risk, Example and Responsibility Models

### 56.1 Quality risk register

The register describes concrete failure conditions rather than generic project concerns. Residual direction is an architecture expectation, not a claim that controls operate today.

| Risk ID | Quality area | Risk | Current condition | Impact | Target mitigation | Owner | Residual-risk direction |
|---|---|---|---|---|---|---|---|
| QR-001 | Master data and plans | Wrong specification version | Wrong specification version: requirement-version unresolved at plan-resolution via version-snapshot QR001 | Wrong specification version causes customer-misstatement during plan-resolution; exposure marker version-snapshot QR001 | For Wrong specification version, enforce version-snapshot plus state-guard; verify plan-resolution QR001 | Quality Manager | ↓ QR-001; watch plan-resolution |
| QR-002 | Master data and plans | Wrong inspection plan | Wrong inspection plan: requirement-version unresolved at plan-resolution via identity-scan QR002 | Wrong inspection plan causes false-closure during plan-resolution; exposure marker identity-scan QR002 | For Wrong inspection plan, enforce identity-scan plus state-guard; verify plan-resolution QR002 | Quality Manager | ↓ QR-002; watch plan-resolution |
| QR-003 | Master data and plans | Wrong sampling plan | Wrong sampling plan: requirement-version unresolved at plan-resolution via scope-checksum QR003 | Wrong sampling plan causes stock-unavailability during plan-resolution; exposure marker scope-checksum QR003 | For Wrong sampling plan, enforce scope-checksum plus state-guard; verify plan-resolution QR003 | Quality Manager | ↓ QR-003; watch plan-resolution |
| QR-004 | Sampling | Wrong sample size | Wrong sample size: population-identity unresolved at plan-resolution via independent-signature QR004 | Wrong sample size causes trend-distortion during plan-resolution; exposure marker independent-signature QR004 | For Wrong sample size, enforce independent-signature plus state-guard; verify plan-resolution QR004 | Quality Manager | ↓ QR-004; watch plan-resolution |
| QR-005 | Sampling | Sample substitution | Sample substitution: population-identity unresolved at plan-resolution via quantity-balance QR005 | Sample substitution causes customer-misstatement during plan-resolution; exposure marker quantity-balance QR005 | For Sample substitution, enforce quantity-balance plus state-guard; verify plan-resolution QR005 | Quality Manager | ↓ QR-005; watch plan-resolution |
| QR-006 | Integration and operations | Wrong lot | Wrong lot: population-identity unresolved at plan-resolution via state-guard QR006 | Wrong lot causes metrology-doubt during plan-resolution; exposure marker state-guard QR006 | For Wrong lot, enforce state-guard plus state-guard; verify plan-resolution QR006 | Integration and Operations | ↓ QR-006; watch plan-resolution |
| QR-007 | Integration and operations | Wrong batch | Wrong batch: population-identity unresolved at plan-resolution via trusted-timestamp QR007 | Wrong batch causes stock-unavailability during plan-resolution; exposure marker trusted-timestamp QR007 | For Wrong batch, enforce trusted-timestamp plus state-guard; verify plan-resolution QR007 | Integration and Operations | ↓ QR-007; watch plan-resolution |
| QR-008 | Integration and operations | Wrong serial | Wrong serial: population-identity unresolved at plan-resolution via qualification-check QR008 | Wrong serial causes authority-breach during plan-resolution; exposure marker qualification-check QR008 | For Wrong serial, enforce qualification-check plus state-guard; verify plan-resolution QR008 | Integration and Operations | ↓ QR-008; watch plan-resolution |
| QR-009 | Integration and operations | Wrong item | Wrong item: population-identity unresolved at plan-resolution via domain-receipt QR009 | Wrong item causes false-closure during plan-resolution; exposure marker domain-receipt QR009 | For Wrong item, enforce domain-receipt plus state-guard; verify plan-resolution QR009 | Integration and Operations | ↓ QR-009; watch plan-resolution |
| QR-010 | Supplier quality | Wrong supplier | Wrong supplier: population-identity unresolved at plan-resolution via exception-queue QR010 | Wrong supplier causes authority-breach during plan-resolution; exposure marker exception-queue QR010 | For Wrong supplier, enforce exception-queue plus state-guard; verify plan-resolution QR010 | Supplier Quality Engineer | ↓ QR-010; watch plan-resolution |
| QR-011 | Customer quality | Wrong customer | Wrong customer: population-identity unresolved at plan-resolution via lineage-hash QR011 | Wrong customer causes supplier-recourse-loss during plan-resolution; exposure marker lineage-hash QR011 | For Wrong customer, enforce lineage-hash plus state-guard; verify plan-resolution QR011 | Customer Quality Engineer | ↓ QR-011; watch plan-resolution |
| QR-012 | Inspection evidence | Wrong inspection type | Wrong inspection type: dedicated-control absent at plan-resolution via expiry-rule QR012 | Wrong inspection type causes supplier-recourse-loss during plan-resolution; exposure marker expiry-rule QR012 | For Wrong inspection type, enforce expiry-rule plus state-guard; verify plan-resolution QR012 | Quality Manager | ↓ QR-012; watch plan-resolution |
| QR-013 | Inspection evidence | Missing inspection | Missing inspection: dedicated-control absent at source-intake via version-snapshot QR013 | Missing inspection causes unsafe-continuation during source-intake; exposure marker version-snapshot QR013 | For Missing inspection, enforce version-snapshot plus trusted-timestamp; verify source-intake QR013 | Quality Manager | ↓ QR-013; watch source-intake |
| QR-014 | Inspection evidence | Duplicate inspection | Duplicate inspection: dedicated-control absent at source-intake via identity-scan QR014 | Duplicate inspection causes population-exposure during source-intake; exposure marker identity-scan QR014 | For Duplicate inspection, enforce identity-scan plus trusted-timestamp; verify source-intake QR014 | Quality Manager | ↓ QR-014; watch source-intake |
| QR-015 | Inspection evidence | Fake inspection | Fake inspection: authorization-lineage insufficient at source-intake via scope-checksum QR015 | Fake inspection causes population-exposure during source-intake; exposure marker scope-checksum QR015 | For Fake inspection, enforce scope-checksum plus trusted-timestamp; verify source-intake QR015 | Quality Manager | ↓ QR-015; watch source-intake |
| QR-016 | Integration and operations | Unqualified inspector | Unqualified inspector: dedicated-control absent at source-intake via independent-signature QR016 | Unqualified inspector causes invalid-acceptance during source-intake; exposure marker independent-signature QR016 | For Unqualified inspector, enforce independent-signature plus trusted-timestamp; verify source-intake QR016 | Integration and Operations | ↓ QR-016; watch source-intake |
| QR-017 | Security and authority | Shared-terminal attribution loss | Shared-terminal attribution loss: dedicated-control absent at source-intake via quantity-balance QR017 | Shared-terminal attribution loss causes supplier-recourse-loss during source-intake; exposure marker quantity-balance QR017 | For Shared-terminal attribution loss, enforce quantity-balance plus trusted-timestamp; verify source-intake QR017 | Security and Quality Director | ↓ QR-017; watch source-intake |
| QR-018 | Inspection evidence | Result tampering | Result tampering: authorization-lineage insufficient at source-intake via state-guard QR018 | Result tampering causes stock-unavailability during source-intake; exposure marker state-guard QR018 | For Result tampering, enforce state-guard plus trusted-timestamp; verify source-intake QR018 | Quality Manager | ↓ QR-018; watch source-intake |
| QR-019 | Inspection evidence | Measurement rounding error | Measurement rounding error: measurement-fitness unresolved at source-intake via trusted-timestamp QR019 | Measurement rounding error causes trend-distortion during source-intake; exposure marker trusted-timestamp QR019 | For Measurement rounding error, enforce trusted-timestamp plus trusted-timestamp; verify source-intake QR019 | Quality Manager | ↓ QR-019; watch source-intake |
| QR-020 | Measurement equipment | Instrument out of calibration | Instrument out of calibration: measurement-fitness unresolved at source-intake via qualification-check QR020 | Instrument out of calibration causes supplier-recourse-loss during source-intake; exposure marker qualification-check QR020 | For Instrument out of calibration, enforce qualification-check plus trusted-timestamp; verify source-intake QR020 | Maintenance and Quality Manager | ↓ QR-020; watch source-intake |
| QR-021 | Measurement equipment | Instrument wrong range | Instrument wrong range: measurement-fitness unresolved at source-intake via domain-receipt QR021 | Instrument wrong range causes false-closure during source-intake; exposure marker domain-receipt QR021 | For Instrument wrong range, enforce domain-receipt plus trusted-timestamp; verify source-intake QR021 | Maintenance and Quality Manager | ↓ QR-021; watch source-intake |
| QR-022 | Master data and plans | Inspection passed despite failed characteristic | Inspection passed despite failed characteristic: requirement-version unresolved at source-intake via exception-queue QR022 | Inspection passed despite failed characteristic causes trend-distortion during source-intake; exposure marker exception-queue QR022 | For Inspection passed despite failed characteristic, enforce exception-queue plus trusted-timestamp; verify source-intake QR022 | Quality Manager | ↓ QR-022; watch source-intake |
| QR-023 | Inspection evidence | Partial result treated as final | Partial result treated as final: dedicated-control absent at source-intake via lineage-hash QR023 | Partial result treated as final causes recall-delay during source-intake; exposure marker lineage-hash QR023 | For Partial result treated as final, enforce lineage-hash plus trusted-timestamp; verify source-intake QR023 | Quality Manager | ↓ QR-023; watch source-intake |
| QR-024 | Integration and operations | Conditional acceptance lost | Conditional acceptance lost: dedicated-control absent at source-intake via expiry-rule QR024 | Conditional acceptance lost causes metrology-doubt during source-intake; exposure marker expiry-rule QR024 | For Conditional acceptance lost, enforce expiry-rule plus trusted-timestamp; verify source-intake QR024 | Integration and Operations | ↓ QR-024; watch source-intake |
| QR-025 | Hold and release | Hold not propagated | Hold not propagated: decision-effect unacknowledged at sample-selection via version-snapshot QR025 | Hold not propagated causes broken-lineage during sample-selection; exposure marker version-snapshot QR025 | For Hold not propagated, enforce version-snapshot plus qualification-check; verify sample-selection QR025 | Quality Manager | ↓ QR-025; watch sample-selection |
| QR-026 | Hold and release | Hold scope too broad | Hold scope too broad: decision-effect unacknowledged at sample-selection via identity-scan QR026 | Hold scope too broad causes population-exposure during sample-selection; exposure marker identity-scan QR026 | For Hold scope too broad, enforce identity-scan plus qualification-check; verify sample-selection QR026 | Quality Manager | ↓ QR-026; watch sample-selection |
| QR-027 | Hold and release | Hold scope too narrow | Hold scope too narrow: decision-effect unacknowledged at sample-selection via scope-checksum QR027 | Hold scope too narrow causes broken-lineage during sample-selection; exposure marker scope-checksum QR027 | For Hold scope too narrow, enforce scope-checksum plus qualification-check; verify sample-selection QR027 | Quality Manager | ↓ QR-027; watch sample-selection |
| QR-028 | Hold and release | Release without approval | Release without approval: decision-effect unacknowledged at sample-selection via independent-signature QR028 | Release without approval causes customer-misstatement during sample-selection; exposure marker independent-signature QR028 | For Release without approval, enforce independent-signature plus qualification-check; verify sample-selection QR028 | Quality Manager | ↓ QR-028; watch sample-selection |
| QR-029 | Hold and release | Partial release over-applied | Partial release over-applied: decision-effect unacknowledged at sample-selection via quantity-balance QR029 | Partial release over-applied causes invalid-acceptance during sample-selection; exposure marker quantity-balance QR029 | For Partial release over-applied, enforce quantity-balance plus qualification-check; verify sample-selection QR029 | Quality Manager | ↓ QR-029; watch sample-selection |
| QR-030 | Hold and release | Inventory status mismatch | Inventory status mismatch: decision-effect unacknowledged at sample-selection via state-guard QR030 | Inventory status mismatch causes false-closure during sample-selection; exposure marker state-guard QR030 | For Inventory status mismatch, enforce state-guard plus qualification-check; verify sample-selection QR030 | Quality Manager | ↓ QR-030; watch sample-selection |
| QR-031 | Hold and release | Manufacturing continues through hold | Manufacturing continues through hold: decision-effect unacknowledged at sample-selection via trusted-timestamp QR031 | Manufacturing continues through hold causes unsafe-continuation during sample-selection; exposure marker trusted-timestamp QR031 | For Manufacturing continues through hold, enforce trusted-timestamp plus qualification-check; verify sample-selection QR031 | Quality Manager | ↓ QR-031; watch sample-selection |
| QR-032 | Supplier quality | Supplier receipt accepted before Quality | Supplier receipt accepted before Quality: population-identity unresolved at sample-selection via qualification-check QR032 | Supplier receipt accepted before Quality causes customer-misstatement during sample-selection; exposure marker qualification-check QR032 | For Supplier receipt accepted before Quality, enforce qualification-check plus qualification-check; verify sample-selection QR032 | Supplier Quality Engineer | ↓ QR-032; watch sample-selection |
| QR-033 | Hold and release | Customer shipment released before Quality | Customer shipment released before Quality: population-identity unresolved at sample-selection via domain-receipt QR033 | Customer shipment released before Quality causes recall-delay during sample-selection; exposure marker domain-receipt QR033 | For Customer shipment released before Quality, enforce domain-receipt plus qualification-check; verify sample-selection QR033 | Quality Manager | ↓ QR-033; watch sample-selection |
| QR-034 | Nonconformance and disposition | NCR not created | NCR not created: nonconformance-scope incomplete at sample-selection via exception-queue QR034 | NCR not created causes invalid-acceptance during sample-selection; exposure marker exception-queue QR034 | For NCR not created, enforce exception-queue plus qualification-check; verify sample-selection QR034 | Quality Manager | ↓ QR-034; watch sample-selection |
| QR-035 | Nonconformance and disposition | Duplicate NCR | Duplicate NCR: nonconformance-scope incomplete at sample-selection via lineage-hash QR035 | Duplicate NCR causes customer-misstatement during sample-selection; exposure marker lineage-hash QR035 | For Duplicate NCR, enforce lineage-hash plus qualification-check; verify sample-selection QR035 | Quality Manager | ↓ QR-035; watch sample-selection |
| QR-036 | Nonconformance and disposition | NCR closed early | NCR closed early: nonconformance-scope incomplete at sample-selection via expiry-rule QR036 | NCR closed early causes authority-breach during sample-selection; exposure marker expiry-rule QR036 | For NCR closed early, enforce expiry-rule plus qualification-check; verify sample-selection QR036 | Quality Manager | ↓ QR-036; watch sample-selection |
| QR-037 | Nonconformance and disposition | Defect code misclassification | Defect code misclassification: nonconformance-scope incomplete at work-assignment via version-snapshot QR037 | Defect code misclassification causes stock-unavailability during work-assignment; exposure marker version-snapshot QR037 | For Defect code misclassification, enforce version-snapshot plus domain-receipt; verify work-assignment QR037 | Quality Manager | ↓ QR-037; watch work-assignment |
| QR-038 | Nonconformance and disposition | Severity understated | Severity understated: nonconformance-scope incomplete at work-assignment via identity-scan QR038 | Severity understated causes population-exposure during work-assignment; exposure marker identity-scan QR038 | For Severity understated, enforce identity-scan plus domain-receipt; verify work-assignment QR038 | Quality Manager | ↓ QR-038; watch work-assignment |
| QR-039 | Nonconformance and disposition | Containment incomplete | Containment incomplete: nonconformance-scope incomplete at work-assignment via scope-checksum QR039 | Containment incomplete causes trend-distortion during work-assignment; exposure marker scope-checksum QR039 | For Containment incomplete, enforce scope-checksum plus domain-receipt; verify work-assignment QR039 | Quality Manager | ↓ QR-039; watch work-assignment |
| QR-040 | Nonconformance and disposition | Related lots missed | Related lots missed: population-identity unresolved at work-assignment via independent-signature QR040 | Related lots missed causes metrology-doubt during work-assignment; exposure marker independent-signature QR040 | For Related lots missed, enforce independent-signature plus domain-receipt; verify work-assignment QR040 | Quality Manager | ↓ QR-040; watch work-assignment |
| QR-041 | Nonconformance and disposition | Related shipments missed | Related shipments missed: dedicated-control absent at work-assignment via quantity-balance QR041 | Related shipments missed causes trend-distortion during work-assignment; exposure marker quantity-balance QR041 | For Related shipments missed, enforce quantity-balance plus domain-receipt; verify work-assignment QR041 | Quality Manager | ↓ QR-041; watch work-assignment |
| QR-042 | Nonconformance and disposition | Rework without Quality approval | Rework without Quality approval: nonconformance-scope incomplete at work-assignment via state-guard QR042 | Rework without Quality approval causes trend-distortion during work-assignment; exposure marker state-guard QR042 | For Rework without Quality approval, enforce state-guard plus domain-receipt; verify work-assignment QR042 | Quality Manager | ↓ QR-042; watch work-assignment |
| QR-043 | Inspection evidence | Reinspection skipped | Reinspection skipped: dedicated-control absent at work-assignment via trusted-timestamp QR043 | Reinspection skipped causes false-closure during work-assignment; exposure marker trusted-timestamp QR043 | For Reinspection skipped, enforce trusted-timestamp plus domain-receipt; verify work-assignment QR043 | Quality Manager | ↓ QR-043; watch work-assignment |
| QR-044 | Nonconformance and disposition | Scrap without disposition | Scrap without disposition: nonconformance-scope incomplete at work-assignment via qualification-check QR044 | Scrap without disposition causes invalid-acceptance during work-assignment; exposure marker qualification-check QR044 | For Scrap without disposition, enforce qualification-check plus domain-receipt; verify work-assignment QR044 | Quality Manager | ↓ QR-044; watch work-assignment |
| QR-045 | Nonconformance and disposition | Deviation expired | Deviation expired: nonconformance-scope incomplete at work-assignment via domain-receipt QR045 | Deviation expired causes recall-delay during work-assignment; exposure marker domain-receipt QR045 | For Deviation expired, enforce domain-receipt plus domain-receipt; verify work-assignment QR045 | Quality Manager | ↓ QR-045; watch work-assignment |
| QR-046 | Nonconformance and disposition | Concession over-applied | Concession over-applied: nonconformance-scope incomplete at work-assignment via exception-queue QR046 | Concession over-applied causes trend-distortion during work-assignment; exposure marker exception-queue QR046 | For Concession over-applied, enforce exception-queue plus domain-receipt; verify work-assignment QR046 | Quality Manager | ↓ QR-046; watch work-assignment |
| QR-047 | Nonconformance and disposition | Waiver reused | Waiver reused: nonconformance-scope incomplete at work-assignment via lineage-hash QR047 | Waiver reused causes customer-misstatement during work-assignment; exposure marker lineage-hash QR047 | For Waiver reused, enforce lineage-hash plus domain-receipt; verify work-assignment QR047 | Quality Manager | ↓ QR-047; watch work-assignment |
| QR-048 | CAPA | CAPA missing | CAPA missing: cause-effectiveness unproven at work-assignment via expiry-rule QR048 | CAPA missing causes broken-lineage during work-assignment; exposure marker expiry-rule QR048 | For CAPA missing, enforce expiry-rule plus domain-receipt; verify work-assignment QR048 | Quality Manager | ↓ QR-048; watch work-assignment |
| QR-049 | CAPA | Wrong root cause | Wrong root cause: cause-effectiveness unproven at result-capture via version-snapshot QR049 | Wrong root cause causes supplier-recourse-loss during result-capture; exposure marker version-snapshot QR049 | For Wrong root cause, enforce version-snapshot plus exception-queue; verify result-capture QR049 | Quality Manager | ↓ QR-049; watch result-capture |
| QR-050 | CAPA | Corrective action ineffective | Corrective action ineffective: cause-effectiveness unproven at result-capture via identity-scan QR050 | Corrective action ineffective causes metrology-doubt during result-capture; exposure marker identity-scan QR050 | For Corrective action ineffective, enforce identity-scan plus exception-queue; verify result-capture QR050 | Quality Manager | ↓ QR-050; watch result-capture |
| QR-051 | CAPA | Effectiveness check skipped | Effectiveness check skipped: cause-effectiveness unproven at result-capture via scope-checksum QR051 | Effectiveness check skipped causes population-exposure during result-capture; exposure marker scope-checksum QR051 | For Effectiveness check skipped, enforce scope-checksum plus exception-queue; verify result-capture QR051 | Quality Manager | ↓ QR-051; watch result-capture |
| QR-052 | CAPA | CAPA closed early | CAPA closed early: cause-effectiveness unproven at result-capture via independent-signature QR052 | CAPA closed early causes trend-distortion during result-capture; exposure marker independent-signature QR052 | For CAPA closed early, enforce independent-signature plus exception-queue; verify result-capture QR052 | Quality Manager | ↓ QR-052; watch result-capture |
| QR-053 | Supplier quality | SCAR overdue | SCAR overdue: dedicated-control absent at result-capture via quantity-balance QR053 | SCAR overdue causes trend-distortion during result-capture; exposure marker quantity-balance QR053 | For SCAR overdue, enforce quantity-balance plus exception-queue; verify result-capture QR053 | Supplier Quality Engineer | ↓ QR-053; watch result-capture |
| QR-054 | Supplier quality | Supplier response accepted without verification | Supplier response accepted without verification: population-identity unresolved at result-capture via state-guard QR054 | Supplier response accepted without verification causes invalid-acceptance during result-capture; exposure marker state-guard QR054 | For Supplier response accepted without verification, enforce state-guard plus exception-queue; verify result-capture QR054 | Supplier Quality Engineer | ↓ QR-054; watch result-capture |
| QR-055 | Customer quality | Complaint suppressed | Complaint suppressed: dedicated-control absent at result-capture via trusted-timestamp QR055 | Complaint suppressed causes false-closure during result-capture; exposure marker trusted-timestamp QR055 | For Complaint suppressed, enforce trusted-timestamp plus exception-queue; verify result-capture QR055 | Customer Quality Engineer | ↓ QR-055; watch result-capture |
| QR-056 | Customer quality | Return mislinked | Return mislinked: population-identity unresolved at result-capture via qualification-check QR056 | Return mislinked causes customer-misstatement during result-capture; exposure marker qualification-check QR056 | For Return mislinked, enforce qualification-check plus exception-queue; verify result-capture QR056 | Customer Quality Engineer | ↓ QR-056; watch result-capture |
| QR-057 | Customer quality | Failure analysis incomplete | Failure analysis incomplete: dedicated-control absent at result-capture via domain-receipt QR057 | Failure analysis incomplete causes broken-lineage during result-capture; exposure marker domain-receipt QR057 | For Failure analysis incomplete, enforce domain-receipt plus exception-queue; verify result-capture QR057 | Customer Quality Engineer | ↓ QR-057; watch result-capture |
| QR-058 | Traceability and recall | Traceability gap | Traceability gap: dedicated-control absent at result-capture via exception-queue QR058 | Traceability gap causes population-exposure during result-capture; exposure marker exception-queue QR058 | For Traceability gap, enforce exception-queue plus exception-queue; verify result-capture QR058 | Quality Director and Data Governance | ↓ QR-058; watch result-capture |
| QR-059 | Traceability and recall | Recall scope incomplete | Recall scope incomplete: dedicated-control absent at result-capture via lineage-hash QR059 | Recall scope incomplete causes population-exposure during result-capture; exposure marker lineage-hash QR059 | For Recall scope incomplete, enforce lineage-hash plus exception-queue; verify result-capture QR059 | Quality Director and Data Governance | ↓ QR-059; watch result-capture |
| QR-060 | Audit and documents | Certificate generated from stale data | Certificate generated from stale data: dedicated-control absent at result-capture via expiry-rule QR060 | Certificate generated from stale data causes trend-distortion during result-capture; exposure marker expiry-rule QR060 | For Certificate generated from stale data, enforce expiry-rule plus exception-queue; verify result-capture QR060 | Quality Assurance Manager | ↓ QR-060; watch result-capture |
| QR-061 | Audit and documents | Certificate not revoked after correction | Certificate not revoked after correction: dedicated-control absent at technical-review via version-snapshot QR061 | Certificate not revoked after correction causes supplier-recourse-loss during technical-review; exposure marker version-snapshot QR061 | For Certificate not revoked after correction, enforce version-snapshot plus lineage-hash; verify technical-review QR061 | Quality Assurance Manager | ↓ QR-061; watch technical-review |
| QR-062 | Measurement equipment | Calibration overdue | Calibration overdue: measurement-fitness unresolved at technical-review via identity-scan QR062 | Calibration overdue causes invalid-acceptance during technical-review; exposure marker identity-scan QR062 | For Calibration overdue, enforce identity-scan plus lineage-hash; verify technical-review QR062 | Maintenance and Quality Manager | ↓ QR-062; watch technical-review |
| QR-063 | Measurement equipment | Failed calibration impact not assessed | Failed calibration impact not assessed: measurement-fitness unresolved at technical-review via scope-checksum QR063 | Failed calibration impact not assessed causes invalid-acceptance during technical-review; exposure marker scope-checksum QR063 | For Failed calibration impact not assessed, enforce scope-checksum plus lineage-hash; verify technical-review QR063 | Maintenance and Quality Manager | ↓ QR-063; watch technical-review |
| QR-064 | Analytics | SPC false alarm | SPC false alarm: dedicated-control absent at technical-review via independent-signature QR064 | SPC false alarm causes unsafe-continuation during technical-review; exposure marker independent-signature QR064 | For SPC false alarm, enforce independent-signature plus lineage-hash; verify technical-review QR064 | Quality Reporting Owner | ↓ QR-064; watch technical-review |
| QR-065 | Analytics | SPC missed signal | SPC missed signal: dedicated-control absent at technical-review via quantity-balance QR065 | SPC missed signal causes population-exposure during technical-review; exposure marker quantity-balance QR065 | For SPC missed signal, enforce quantity-balance plus lineage-hash; verify technical-review QR065 | Quality Reporting Owner | ↓ QR-065; watch technical-review |
| QR-066 | Audit and documents | Audit finding deleted | Audit finding deleted: dedicated-control absent at technical-review via state-guard QR066 | Audit finding deleted causes metrology-doubt during technical-review; exposure marker state-guard QR066 | For Audit finding deleted, enforce state-guard plus lineage-hash; verify technical-review QR066 | Quality Assurance Manager | ↓ QR-066; watch technical-review |
| QR-067 | Audit and documents | Auditor conflict of interest | Auditor conflict of interest: dedicated-control absent at technical-review via trusted-timestamp QR067 | Auditor conflict of interest causes metrology-doubt during technical-review; exposure marker trusted-timestamp QR067 | For Auditor conflict of interest, enforce trusted-timestamp plus lineage-hash; verify technical-review QR067 | Quality Assurance Manager | ↓ QR-067; watch technical-review |
| QR-068 | Security and authority | Quality record tampering | Quality record tampering: authorization-lineage insufficient at technical-review via qualification-check QR068 | Quality record tampering causes authority-breach during technical-review; exposure marker qualification-check QR068 | For Quality record tampering, enforce qualification-check plus lineage-hash; verify technical-review QR068 | Security and Quality Director | ↓ QR-068; watch technical-review |
| QR-069 | Master data and plans | Cross-plant access | Cross-plant access: requirement-version unresolved at technical-review via domain-receipt QR069 | Cross-plant access causes metrology-doubt during technical-review; exposure marker domain-receipt QR069 | For Cross-plant access, enforce domain-receipt plus lineage-hash; verify technical-review QR069 | Quality Manager | ↓ QR-069; watch technical-review |
| QR-070 | Security and authority | Cross-tenant leakage | Cross-tenant leakage: authorization-lineage insufficient at technical-review via exception-queue QR070 | Cross-tenant leakage causes stock-unavailability during technical-review; exposure marker exception-queue QR070 | For Cross-tenant leakage, enforce exception-queue plus lineage-hash; verify technical-review QR070 | Security and Quality Director | ↓ QR-070; watch technical-review |
| QR-071 | Security and authority | Direct Inventory write | Direct Inventory write: authorization-lineage insufficient at technical-review via lineage-hash QR071 | Direct Inventory write causes invalid-acceptance during technical-review; exposure marker lineage-hash QR071 | For Direct Inventory write, enforce lineage-hash plus lineage-hash; verify technical-review QR071 | Inventory and Security | ↓ QR-071; watch technical-review |
| QR-072 | Security and authority | Direct Manufacturing write | Direct Manufacturing write: authorization-lineage insufficient at technical-review via expiry-rule QR072 | Direct Manufacturing write causes recall-delay during technical-review; exposure marker expiry-rule QR072 | For Direct Manufacturing write, enforce expiry-rule plus lineage-hash; verify technical-review QR072 | Manufacturing and Security | ↓ QR-072; watch technical-review |
| QR-073 | Security and authority | Direct Procurement write | Direct Procurement write: authorization-lineage insufficient at hold-handoff via version-snapshot QR073 | Direct Procurement write causes invalid-acceptance during hold-handoff; exposure marker version-snapshot QR073 | For Direct Procurement write, enforce version-snapshot plus expiry-rule; verify hold-handoff QR073 | Security and Quality Director | ↓ QR-073; watch hold-handoff |
| QR-074 | Security and authority | Direct Sales write | Direct Sales write: authorization-lineage insufficient at hold-handoff via identity-scan QR074 | Direct Sales write causes authority-breach during hold-handoff; exposure marker identity-scan QR074 | For Direct Sales write, enforce identity-scan plus expiry-rule; verify hold-handoff QR074 | Security and Quality Director | ↓ QR-074; watch hold-handoff |
| QR-075 | Security and authority | Direct Maintenance write | Direct Maintenance write: authorization-lineage insufficient at hold-handoff via scope-checksum QR075 | Direct Maintenance write causes metrology-doubt during hold-handoff; exposure marker scope-checksum QR075 | For Direct Maintenance write, enforce scope-checksum plus expiry-rule; verify hold-handoff QR075 | Security and Quality Director | ↓ QR-075; watch hold-handoff |
| QR-076 | Security and authority | Direct Finance write | Direct Finance write: authorization-lineage insufficient at hold-handoff via independent-signature QR076 | Direct Finance write causes authority-breach during hold-handoff; exposure marker independent-signature QR076 | For Direct Finance write, enforce independent-signature plus expiry-rule; verify hold-handoff QR076 | Security and Quality Director | ↓ QR-076; watch hold-handoff |
| QR-077 | Security and authority | Customization bypass | Customization bypass: authorization-lineage insufficient at hold-handoff via quantity-balance QR077 | Customization bypass causes supplier-recourse-loss during hold-handoff; exposure marker quantity-balance QR077 | For Customization bypass, enforce quantity-balance plus expiry-rule; verify hold-handoff QR077 | Security and Quality Director | ↓ QR-077; watch hold-handoff |
| QR-078 | Inspection evidence | AI inspection attempt | AI inspection attempt: advisory-boundary untested at hold-handoff via state-guard QR078 | AI inspection attempt causes metrology-doubt during hold-handoff; exposure marker state-guard QR078 | For AI inspection attempt, enforce state-guard plus expiry-rule; verify hold-handoff QR078 | Quality Manager | ↓ QR-078; watch hold-handoff |
| QR-079 | Hold and release | AI release attempt | AI release attempt: decision-effect unacknowledged at hold-handoff via trusted-timestamp QR079 | AI release attempt causes invalid-acceptance during hold-handoff; exposure marker trusted-timestamp QR079 | For AI release attempt, enforce trusted-timestamp plus expiry-rule; verify hold-handoff QR079 | Quality Manager | ↓ QR-079; watch hold-handoff |
| QR-080 | Nonconformance and disposition | AI NCR closure attempt | AI NCR closure attempt: nonconformance-scope incomplete at hold-handoff via qualification-check QR080 | AI NCR closure attempt causes recall-delay during hold-handoff; exposure marker qualification-check QR080 | For AI NCR closure attempt, enforce qualification-check plus expiry-rule; verify hold-handoff QR080 | Quality Manager | ↓ QR-080; watch hold-handoff |
| QR-081 | CAPA | AI CAPA closure attempt | AI CAPA closure attempt: cause-effectiveness unproven at hold-handoff via domain-receipt QR081 | AI CAPA closure attempt causes customer-misstatement during hold-handoff; exposure marker domain-receipt QR081 | For AI CAPA closure attempt, enforce domain-receipt plus expiry-rule; verify hold-handoff QR081 | Quality Manager | ↓ QR-081; watch hold-handoff |
| QR-082 | Supplier quality | AI supplier approval attempt | AI supplier approval attempt: population-identity unresolved at hold-handoff via exception-queue QR082 | AI supplier approval attempt causes population-exposure during hold-handoff; exposure marker exception-queue QR082 | For AI supplier approval attempt, enforce exception-queue plus expiry-rule; verify hold-handoff QR082 | Supplier Quality Engineer | ↓ QR-082; watch hold-handoff |
| QR-083 | Audit and documents | AI certificate issuance attempt | AI certificate issuance attempt: advisory-boundary untested at hold-handoff via lineage-hash QR083 | AI certificate issuance attempt causes recall-delay during hold-handoff; exposure marker lineage-hash QR083 | For AI certificate issuance attempt, enforce lineage-hash plus expiry-rule; verify hold-handoff QR083 | Quality Assurance Manager | ↓ QR-083; watch hold-handoff |
| QR-084 | Security and authority | Unsupported regulatory claim | Unsupported regulatory claim: dedicated-control absent at hold-handoff via expiry-rule QR084 | Unsupported regulatory claim causes authority-breach during hold-handoff; exposure marker expiry-rule QR084 | For Unsupported regulatory claim, enforce expiry-rule plus expiry-rule; verify hold-handoff QR084 | Security and Quality Director | ↓ QR-084; watch hold-handoff |
| QR-085 | Master data and plans | Ambiguous specification precedence | Ambiguous specification precedence: requirement-version unresolved at release-approval via version-snapshot QR085 | Ambiguous specification precedence causes metrology-doubt during release-approval; exposure marker version-snapshot QR085 | For Ambiguous specification precedence, enforce version-snapshot plus version-snapshot; verify release-approval QR085 | Quality Manager | ↓ QR-085; watch release-approval |
| QR-086 | Master data and plans | Tolerance unit conversion drift | Tolerance unit conversion drift: requirement-version unresolved at release-approval via identity-scan QR086 | Tolerance unit conversion drift causes invalid-acceptance during release-approval; exposure marker identity-scan QR086 | For Tolerance unit conversion drift, enforce identity-scan plus version-snapshot; verify release-approval QR086 | Quality Manager | ↓ QR-086; watch release-approval |
| QR-087 | Master data and plans | Critical characteristic omitted | Critical characteristic omitted: requirement-version unresolved at release-approval via scope-checksum QR087 | Critical characteristic omitted causes stock-unavailability during release-approval; exposure marker scope-checksum QR087 | For Critical characteristic omitted, enforce scope-checksum plus version-snapshot; verify release-approval QR087 | Quality Manager | ↓ QR-087; watch release-approval |
| QR-088 | Master data and plans | Plan changed during execution | Plan changed during execution: requirement-version unresolved at release-approval via independent-signature QR088 | Plan changed during execution causes trend-distortion during release-approval; exposure marker independent-signature QR088 | For Plan changed during execution, enforce independent-signature plus version-snapshot; verify release-approval QR088 | Quality Manager | ↓ QR-088; watch release-approval |
| QR-089 | Integration and operations | Sampling switching history reset | Sampling switching history reset: dedicated-control absent at release-approval via quantity-balance QR089 | Sampling switching history reset causes supplier-recourse-loss during release-approval; exposure marker quantity-balance QR089 | For Sampling switching history reset, enforce quantity-balance plus version-snapshot; verify release-approval QR089 | Integration and Operations | ↓ QR-089; watch release-approval |
| QR-090 | Sampling | Biased sample selection | Biased sample selection: population-identity unresolved at release-approval via state-guard QR090 | Biased sample selection causes invalid-acceptance during release-approval; exposure marker state-guard QR090 | For Biased sample selection, enforce state-guard plus version-snapshot; verify release-approval QR090 | Quality Manager | ↓ QR-090; watch release-approval |
| QR-091 | Sampling | Destructive sample not reconciled | Destructive sample not reconciled: population-identity unresolved at release-approval via trusted-timestamp QR091 | Destructive sample not reconciled causes customer-misstatement during release-approval; exposure marker trusted-timestamp QR091 | For Destructive sample not reconciled, enforce trusted-timestamp plus version-snapshot; verify release-approval QR091 | Quality Manager | ↓ QR-091; watch release-approval |
| QR-092 | Inspection evidence | Result entered against wrong step | Result entered against wrong step: dedicated-control absent at release-approval via qualification-check QR092 | Result entered against wrong step causes trend-distortion during release-approval; exposure marker qualification-check QR092 | For Result entered against wrong step, enforce qualification-check plus version-snapshot; verify release-approval QR092 | Quality Manager | ↓ QR-092; watch release-approval |
| QR-093 | Integration and operations | Device timestamp spoofing | Device timestamp spoofing: dedicated-control absent at release-approval via domain-receipt QR093 | Device timestamp spoofing causes stock-unavailability during release-approval; exposure marker domain-receipt QR093 | For Device timestamp spoofing, enforce domain-receipt plus version-snapshot; verify release-approval QR093 | Integration and Operations | ↓ QR-093; watch release-approval |
| QR-094 | Inspection evidence | Result correction hides original | Result correction hides original: dedicated-control absent at release-approval via exception-queue QR094 | Result correction hides original causes stock-unavailability during release-approval; exposure marker exception-queue QR094 | For Result correction hides original, enforce exception-queue plus version-snapshot; verify release-approval QR094 | Quality Manager | ↓ QR-094; watch release-approval |
| QR-095 | Inspection evidence | Environmental condition missing | Environmental condition missing: dedicated-control absent at release-approval via lineage-hash QR095 | Environmental condition missing causes recall-delay during release-approval; exposure marker lineage-hash QR095 | For Environmental condition missing, enforce lineage-hash plus version-snapshot; verify release-approval QR095 | Quality Manager | ↓ QR-095; watch release-approval |
| QR-096 | Measurement equipment | Instrument identity impersonated | Instrument identity impersonated: measurement-fitness unresolved at release-approval via expiry-rule QR096 | Instrument identity impersonated causes customer-misstatement during release-approval; exposure marker expiry-rule QR096 | For Instrument identity impersonated, enforce expiry-rule plus version-snapshot; verify release-approval QR096 | Maintenance and Quality Manager | ↓ QR-096; watch release-approval |
| QR-097 | Measurement equipment | Uncertainty guard band ignored | Uncertainty guard band ignored: measurement-fitness unresolved at domain-acknowledgement via version-snapshot QR097 | Uncertainty guard band ignored causes unsafe-continuation during domain-acknowledgement; exposure marker version-snapshot QR097 | For Uncertainty guard band ignored, enforce version-snapshot plus identity-scan; verify domain-acknowledgement QR097 | Maintenance and Quality Manager | ↓ QR-097; watch domain-acknowledgement |
| QR-098 | Hold and release | Emergency hold never reviewed | Emergency hold never reviewed: decision-effect unacknowledged at domain-acknowledgement via identity-scan QR098 | Emergency hold never reviewed causes metrology-doubt during domain-acknowledgement; exposure marker identity-scan QR098 | For Emergency hold never reviewed, enforce identity-scan plus identity-scan; verify domain-acknowledgement QR098 | Quality Manager | ↓ QR-098; watch domain-acknowledgement |
| QR-099 | Hold and release | Competing hold cleared accidentally | Competing hold cleared accidentally: decision-effect unacknowledged at domain-acknowledgement via scope-checksum QR099 | Competing hold cleared accidentally causes recall-delay during domain-acknowledgement; exposure marker scope-checksum QR099 | For Competing hold cleared accidentally, enforce scope-checksum plus identity-scan; verify domain-acknowledgement QR099 | Quality Manager | ↓ QR-099; watch domain-acknowledgement |
| QR-100 | Hold and release | Release acknowledgement missing | Release acknowledgement missing: decision-effect unacknowledged at domain-acknowledgement via independent-signature QR100 | Release acknowledgement missing causes metrology-doubt during domain-acknowledgement; exposure marker independent-signature QR100 | For Release acknowledgement missing, enforce independent-signature plus identity-scan; verify domain-acknowledgement QR100 | Quality Manager | ↓ QR-100; watch domain-acknowledgement |
| QR-101 | Hold and release | Release reversal delayed | Release reversal delayed: decision-effect unacknowledged at domain-acknowledgement via quantity-balance QR101 | Release reversal delayed causes trend-distortion during domain-acknowledgement; exposure marker quantity-balance QR101 | For Release reversal delayed, enforce quantity-balance plus identity-scan; verify domain-acknowledgement QR101 | Quality Manager | ↓ QR-101; watch domain-acknowledgement |
| QR-102 | Nonconformance and disposition | Disposition quantities do not balance | Disposition quantities do not balance: nonconformance-scope incomplete at domain-acknowledgement via state-guard QR102 | Disposition quantities do not balance causes false-closure during domain-acknowledgement; exposure marker state-guard QR102 | For Disposition quantities do not balance, enforce state-guard plus identity-scan; verify domain-acknowledgement QR102 | Quality Manager | ↓ QR-102; watch domain-acknowledgement |
| QR-103 | Integration and operations | Use-as-is lacks Engineering review | Use-as-is lacks Engineering review: dedicated-control absent at domain-acknowledgement via trusted-timestamp QR103 | Use-as-is lacks Engineering review causes supplier-recourse-loss during domain-acknowledgement; exposure marker trusted-timestamp QR103 | For Use-as-is lacks Engineering review, enforce trusted-timestamp plus identity-scan; verify domain-acknowledgement QR103 | Integration and Operations | ↓ QR-103; watch domain-acknowledgement |
| QR-104 | Nonconformance and disposition | Customer concession absent | Customer concession absent: population-identity unresolved at domain-acknowledgement via qualification-check QR104 | Customer concession absent causes population-exposure during domain-acknowledgement; exposure marker qualification-check QR104 | For Customer concession absent, enforce qualification-check plus identity-scan; verify domain-acknowledgement QR104 | Quality Manager | ↓ QR-104; watch domain-acknowledgement |
| QR-105 | Nonconformance and disposition | Rework cycles exceed limit | Rework cycles exceed limit: nonconformance-scope incomplete at domain-acknowledgement via domain-receipt QR105 | Rework cycles exceed limit causes unsafe-continuation during domain-acknowledgement; exposure marker domain-receipt QR105 | For Rework cycles exceed limit, enforce domain-receipt plus identity-scan; verify domain-acknowledgement QR105 | Quality Manager | ↓ QR-105; watch domain-acknowledgement |
| QR-106 | Nonconformance and disposition | Scrap destruction unverified | Scrap destruction unverified: nonconformance-scope incomplete at domain-acknowledgement via exception-queue QR106 | Scrap destruction unverified causes population-exposure during domain-acknowledgement; exposure marker exception-queue QR106 | For Scrap destruction unverified, enforce exception-queue plus identity-scan; verify domain-acknowledgement QR106 | Quality Manager | ↓ QR-106; watch domain-acknowledgement |
| QR-107 | Nonconformance and disposition | Containment sorting instruction stale | Containment sorting instruction stale: nonconformance-scope incomplete at domain-acknowledgement via lineage-hash QR107 | Containment sorting instruction stale causes customer-misstatement during domain-acknowledgement; exposure marker lineage-hash QR107 | For Containment sorting instruction stale, enforce lineage-hash plus identity-scan; verify domain-acknowledgement QR107 | Quality Manager | ↓ QR-107; watch domain-acknowledgement |
| QR-108 | Nonconformance and disposition | NCR populations merged incorrectly | NCR populations merged incorrectly: nonconformance-scope incomplete at domain-acknowledgement via expiry-rule QR108 | NCR populations merged incorrectly causes stock-unavailability during domain-acknowledgement; exposure marker expiry-rule QR108 | For NCR populations merged incorrectly, enforce expiry-rule plus identity-scan; verify domain-acknowledgement QR108 | Quality Manager | ↓ QR-108; watch domain-acknowledgement |
| QR-109 | Integration and operations | Cause hypothesis treated as proof | Cause hypothesis treated as proof: dedicated-control absent at NCR-triage via version-snapshot QR109 | Cause hypothesis treated as proof causes recall-delay during NCR-triage; exposure marker version-snapshot QR109 | For Cause hypothesis treated as proof, enforce version-snapshot plus scope-checksum; verify NCR-triage QR109 | Integration and Operations | ↓ QR-109; watch NCR-triage |
| QR-110 | CAPA | Action owner outside authority | Action owner outside authority: dedicated-control absent at NCR-triage via identity-scan QR110 | Action owner outside authority causes authority-breach during NCR-triage; exposure marker identity-scan QR110 | For Action owner outside authority, enforce identity-scan plus scope-checksum; verify NCR-triage QR110 | Quality Manager | ↓ QR-110; watch NCR-triage |
| QR-111 | CAPA | CAPA due date silently extended | CAPA due date silently extended: cause-effectiveness unproven at NCR-triage via scope-checksum QR111 | CAPA due date silently extended causes stock-unavailability during NCR-triage; exposure marker scope-checksum QR111 | For CAPA due date silently extended, enforce scope-checksum plus scope-checksum; verify NCR-triage QR111 | Quality Manager | ↓ QR-111; watch NCR-triage |
| QR-112 | CAPA | Effectiveness population too small | Effectiveness population too small: cause-effectiveness unproven at NCR-triage via independent-signature QR112 | Effectiveness population too small causes population-exposure during NCR-triage; exposure marker independent-signature QR112 | For Effectiveness population too small, enforce independent-signature plus scope-checksum; verify NCR-triage QR112 | Quality Manager | ↓ QR-112; watch NCR-triage |
| QR-113 | Supplier quality | Supplier score denominator distorted | Supplier score denominator distorted: population-identity unresolved at NCR-triage via quantity-balance QR113 | Supplier score denominator distorted causes trend-distortion during NCR-triage; exposure marker quantity-balance QR113 | For Supplier score denominator distorted, enforce quantity-balance plus scope-checksum; verify NCR-triage QR113 | Supplier Quality Engineer | ↓ QR-113; watch NCR-triage |
| QR-114 | Supplier quality | Supplier certificate forged | Supplier certificate forged: population-identity unresolved at NCR-triage via state-guard QR114 | Supplier certificate forged causes supplier-recourse-loss during NCR-triage; exposure marker state-guard QR114 | For Supplier certificate forged, enforce state-guard plus scope-checksum; verify NCR-triage QR114 | Supplier Quality Engineer | ↓ QR-114; watch NCR-triage |
| QR-115 | Nonconformance and disposition | SCAR remote containment unconfirmed | SCAR remote containment unconfirmed: nonconformance-scope incomplete at NCR-triage via trusted-timestamp QR115 | SCAR remote containment unconfirmed causes stock-unavailability during NCR-triage; exposure marker trusted-timestamp QR115 | For SCAR remote containment unconfirmed, enforce trusted-timestamp plus scope-checksum; verify NCR-triage QR115 | Quality Manager | ↓ QR-115; watch NCR-triage |
| QR-116 | Customer quality | Complaint personal data overexposed | Complaint personal data overexposed: dedicated-control absent at NCR-triage via qualification-check QR116 | Complaint personal data overexposed causes metrology-doubt during NCR-triage; exposure marker qualification-check QR116 | For Complaint personal data overexposed, enforce qualification-check plus scope-checksum; verify NCR-triage QR116 | Customer Quality Engineer | ↓ QR-116; watch NCR-triage |
| QR-117 | Integration and operations | No-fault-found overstated | No-fault-found overstated: dedicated-control absent at NCR-triage via domain-receipt QR117 | No-fault-found overstated causes stock-unavailability during NCR-triage; exposure marker domain-receipt QR117 | For No-fault-found overstated, enforce domain-receipt plus scope-checksum; verify NCR-triage QR117 | Integration and Operations | ↓ QR-117; watch NCR-triage |
| QR-118 | Customer quality | Returned unit chain broken | Returned unit chain broken: dedicated-control absent at NCR-triage via exception-queue QR118 | Returned unit chain broken causes authority-breach during NCR-triage; exposure marker exception-queue QR118 | For Returned unit chain broken, enforce exception-queue plus scope-checksum; verify NCR-triage QR118 | Customer Quality Engineer | ↓ QR-118; watch NCR-triage |
| QR-119 | Traceability and recall | Recall list exported without scope | Recall list exported without scope: dedicated-control absent at NCR-triage via lineage-hash QR119 | Recall list exported without scope causes invalid-acceptance during NCR-triage; exposure marker lineage-hash QR119 | For Recall list exported without scope, enforce lineage-hash plus scope-checksum; verify NCR-triage QR119 | Quality Director and Data Governance | ↓ QR-119; watch NCR-triage |
| QR-120 | Traceability and recall | Quality genealogy inference treated as fact | Quality genealogy inference treated as fact: dedicated-control absent at NCR-triage via expiry-rule QR120 | Quality genealogy inference treated as fact causes false-closure during NCR-triage; exposure marker expiry-rule QR120 | For Quality genealogy inference treated as fact, enforce expiry-rule plus scope-checksum; verify NCR-triage QR120 | Quality Director and Data Governance | ↓ QR-120; watch NCR-triage |

### 56.2 Quality example catalog

Each scenario names the owning Quality role and every possible domain request. “None” means no request is permitted for that scenario, not that the domain is unimportant.

| ID | Example | Quality owner | Source | Main Quality transaction | Quality effect | Inventory request | Manufacturing request | Procurement request | Sales request | Maintenance request | Finance request | Approval | Reconciliation | Specific risk | Current status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| QE-001 | Incoming raw material inspection | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Incoming raw material inspection: govern plan-observation-outcome using version-snapshot at plan-resolution QE001 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | Incoming raw material inspection risks false-closure if version-snapshot fails at plan-resolution QE001 | Planned |
| QE-002 | Supplier batch inspection | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Supplier batch inspection: govern plan-observation-outcome using identity-scan at plan-resolution QE002 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | Supplier batch inspection risks recall-delay if identity-scan fails at plan-resolution QE002 | Planned |
| QE-003 | Partial incoming acceptance | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Partial incoming acceptance: govern approved-quantity-restrictions using scope-checksum at plan-resolution QE003 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | Partial incoming acceptance risks supplier-recourse-loss if scope-checksum fails at plan-resolution QE003 | Planned |
| QE-004 | Incoming rejection | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Incoming rejection: govern source-version-quality-conclusion using independent-signature at plan-resolution QE004 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | Incoming rejection risks authority-breach if independent-signature fails at plan-resolution QE004 | Planned |
| QE-005 | First-piece inspection | Quality Inspector | Manufacturing order/operation event | Production inspection | First-piece inspection: govern plan-observation-outcome using quantity-balance at plan-resolution QE005 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | First-piece inspection risks unsafe-continuation if quantity-balance fails at plan-resolution QE005 | Planned |
| QE-006 | Patrol inspection | Quality Inspector | Manufacturing order/operation event | Production inspection | Patrol inspection: govern plan-observation-outcome using state-guard at plan-resolution QE006 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | Patrol inspection risks population-exposure if state-guard fails at plan-resolution QE006 | Planned |
| QE-007 | In-process hold | Quality Engineer | Manufacturing order/operation event | Production inspection | In-process hold: govern restricted-population-receipt using trusted-timestamp at plan-resolution QE007 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | In-process hold risks trend-distortion if trusted-timestamp fails at plan-resolution QE007 | Planned |
| QE-008 | Final inspection | Quality Inspector | Manufacturing order/operation event | Production inspection | Final inspection: govern plan-observation-outcome using qualification-check at plan-resolution QE008 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | Final inspection risks customer-misstatement if qualification-check fails at plan-resolution QE008 | Planned |
| QE-009 | Pre-dispatch inspection | Customer Quality Engineer | Sales delivery, complaint or return | Pre-dispatch inspection | Pre-dispatch inspection: govern plan-observation-outcome using domain-receipt at plan-resolution QE009 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Pre-dispatch inspection risks metrology-doubt if domain-receipt fails at plan-resolution QE009 | Planned |
| QE-010 | Customer-specific certificate | Customer Quality Engineer | Sales delivery, complaint or return | Quality certificate | Customer-specific certificate: govern released-revocable-document using exception-queue at plan-resolution QE010 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Customer-specific certificate risks stock-unavailability if exception-queue fails at plan-resolution QE010 | Planned |
| QE-011 | Batch hold | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Batch hold: govern restricted-population-receipt using lineage-hash at plan-resolution QE011 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Batch hold risks invalid-acceptance if lineage-hash fails at plan-resolution QE011 | Planned |
| QE-012 | Serial hold | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Serial hold: govern restricted-population-receipt using expiry-rule at plan-resolution QE012 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Serial hold risks broken-lineage if expiry-rule fails at plan-resolution QE012 | Planned |
| QE-013 | Partial release | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Partial release: govern approved-quantity-restrictions using version-snapshot at source-intake QE013 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Partial release risks false-closure if version-snapshot fails at source-intake QE013 | Planned |
| QE-014 | Full release | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Full release: govern approved-quantity-restrictions using identity-scan at source-intake QE014 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Full release risks recall-delay if identity-scan fails at source-intake QE014 | Planned |
| QE-015 | NCR from incoming defect | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | NCR from incoming defect: govern defect-bounded-disposition using scope-checksum at source-intake QE015 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | NCR from incoming defect risks supplier-recourse-loss if scope-checksum fails at source-intake QE015 | Planned |
| QE-016 | NCR from production defect | Quality Engineer | Manufacturing order/operation event | Production inspection | NCR from production defect: govern defect-bounded-disposition using independent-signature at source-intake QE016 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | NCR from production defect risks authority-breach if independent-signature fails at source-intake QE016 | Planned |
| QE-017 | NCR from customer complaint | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | NCR from customer complaint: govern defect-bounded-disposition using quantity-balance at source-intake QE017 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | NCR from customer complaint risks unsafe-continuation if quantity-balance fails at source-intake QE017 | Planned |
| QE-018 | Containment | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Containment: govern defect-bounded-disposition using state-guard at source-intake QE018 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Containment risks population-exposure if state-guard fails at source-intake QE018 | Planned |
| QE-019 | Sorting | Quality Engineer | Manufacturing order/operation event | Production inspection | Sorting: govern source-version-quality-conclusion using trusted-timestamp at source-intake QE019 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | Sorting risks trend-distortion if trusted-timestamp fails at source-intake QE019 | Planned |
| QE-020 | Rework approval | Quality Engineer | Manufacturing order/operation event | Rework quality decision | Rework approval: govern defect-bounded-disposition using qualification-check at source-intake QE020 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | Rework approval risks customer-misstatement if qualification-check fails at source-intake QE020 | Planned |
| QE-021 | Scrap disposition | Quality Engineer | Manufacturing order/operation event | Scrap disposition | Scrap disposition: govern defect-bounded-disposition using domain-receipt at source-intake QE021 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | Scrap disposition risks metrology-doubt if domain-receipt fails at source-intake QE021 | Planned |
| QE-022 | Return-to-supplier disposition | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Return-to-supplier disposition: govern source-version-quality-conclusion using exception-queue at source-intake QE022 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | Return-to-supplier disposition risks stock-unavailability if exception-queue fails at source-intake QE022 | Planned |
| QE-023 | Use-as-is direction | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Use-as-is direction: govern source-version-quality-conclusion using lineage-hash at source-intake QE023 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Use-as-is direction risks invalid-acceptance if lineage-hash fails at source-intake QE023 | Planned |
| QE-024 | Deviation | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Deviation: govern defect-bounded-disposition using expiry-rule at source-intake QE024 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Deviation risks broken-lineage if expiry-rule fails at source-intake QE024 | Planned |
| QE-025 | Concession | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Concession: govern defect-bounded-disposition using version-snapshot at sample-selection QE025 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Concession risks false-closure if version-snapshot fails at sample-selection QE025 | Planned |
| QE-026 | Waiver | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Waiver: govern defect-bounded-disposition using identity-scan at sample-selection QE026 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Waiver risks recall-delay if identity-scan fails at sample-selection QE026 | Planned |
| QE-027 | CAPA | Quality Engineer | Inspection, audit or quality signal | CAPA | CAPA: govern cause-action-effectiveness using scope-checksum at sample-selection QE027 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | CAPA risks supplier-recourse-loss if scope-checksum fails at sample-selection QE027 | Planned |
| QE-028 | Root-cause analysis | Quality Engineer | Inspection, audit or quality signal | CAPA | Root-cause analysis: govern cause-action-effectiveness using independent-signature at sample-selection QE028 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Root-cause analysis risks authority-breach if independent-signature fails at sample-selection QE028 | Planned |
| QE-029 | Corrective action | Quality Engineer | Inspection, audit or quality signal | CAPA | Corrective action: govern cause-action-effectiveness using quantity-balance at sample-selection QE029 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Corrective action risks unsafe-continuation if quantity-balance fails at sample-selection QE029 | Planned |
| QE-030 | Preventive action | Quality Engineer | Inspection, audit or quality signal | CAPA | Preventive action: govern cause-action-effectiveness using state-guard at sample-selection QE030 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Preventive action risks population-exposure if state-guard fails at sample-selection QE030 | Planned |
| QE-031 | Effectiveness verification | Quality Engineer | Inspection, audit or quality signal | CAPA | Effectiveness verification: govern cause-action-effectiveness using trusted-timestamp at sample-selection QE031 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Effectiveness verification risks trend-distortion if trusted-timestamp fails at sample-selection QE031 | Planned |
| QE-032 | SCAR | Supplier Quality Engineer | Procurement receipt or supplier case | SCAR | SCAR: govern source-version-quality-conclusion using qualification-check at sample-selection QE032 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | SCAR risks customer-misstatement if qualification-check fails at sample-selection QE032 | Planned |
| QE-033 | Supplier response | Supplier Quality Engineer | Procurement receipt or supplier case | SCAR | Supplier response: govern source-version-quality-conclusion using domain-receipt at sample-selection QE033 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | Supplier response risks metrology-doubt if domain-receipt fails at sample-selection QE033 | Planned |
| QE-034 | Supplier verification | Supplier Quality Engineer | Procurement receipt or supplier case | SCAR | Supplier verification: govern source-version-quality-conclusion using exception-queue at sample-selection QE034 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | Supplier verification risks stock-unavailability if exception-queue fails at sample-selection QE034 | Planned |
| QE-035 | Customer complaint | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | Customer complaint: govern source-version-quality-conclusion using lineage-hash at sample-selection QE035 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Customer complaint risks invalid-acceptance if lineage-hash fails at sample-selection QE035 | Planned |
| QE-036 | Customer return | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | Customer return: govern source-version-quality-conclusion using expiry-rule at sample-selection QE036 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Customer return risks broken-lineage if expiry-rule fails at sample-selection QE036 | Planned |
| QE-037 | Failure analysis | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | Failure analysis: govern source-version-quality-conclusion using version-snapshot at work-assignment QE037 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Failure analysis risks false-closure if version-snapshot fails at work-assignment QE037 | Planned |
| QE-038 | Batch trace | Quality Director | Batch/serial and transaction genealogy | Quality exposure query | Batch trace: govern versioned-exposure-completeness using identity-scan at work-assignment QE038 | On-hand/in-transit trace | Execution genealogy query | Upstream trace | Delivery/customer trace | — | Exposure reference only | Recall governance for external action | Confirmed, suspect, cleared and unknown scopes | Batch trace risks recall-delay if identity-scan fails at work-assignment QE038 | Planned |
| QE-039 | Serial trace | Quality Director | Batch/serial and transaction genealogy | Quality exposure query | Serial trace: govern versioned-exposure-completeness using scope-checksum at work-assignment QE039 | On-hand/in-transit trace | Execution genealogy query | Upstream trace | Delivery/customer trace | — | Exposure reference only | Recall governance for external action | Confirmed, suspect, cleared and unknown scopes | Serial trace risks supplier-recourse-loss if scope-checksum fails at work-assignment QE039 | Planned |
| QE-040 | Recall query | Quality Director | Batch/serial and transaction genealogy | Quality exposure query | Recall query: govern versioned-exposure-completeness using independent-signature at work-assignment QE040 | On-hand/in-transit trace | Execution genealogy query | Upstream trace | Delivery/customer trace | — | Exposure reference only | Recall governance for external action | Confirmed, suspect, cleared and unknown scopes | Recall query risks authority-breach if independent-signature fails at work-assignment QE040 | Future |
| QE-041 | Instrument calibration due | Quality Engineer | Maintenance equipment/calibration event | Instrument impact assessment | Instrument calibration due: govern fitness-dependent-decisions using quantity-balance at work-assignment QE041 | Hold affected population when decided | Reinspection/containment request only | External lab contract only | Affected-delivery review only | Equipment work/state request | Cost reference only | Quality Manager and Maintenance authority | Instrument version, result and affected decision | Instrument calibration due risks unsafe-continuation if quantity-balance fails at work-assignment QE041 | Planned |
| QE-042 | Failed calibration | Quality Engineer | Maintenance equipment/calibration event | Instrument impact assessment | Failed calibration: govern fitness-dependent-decisions using state-guard at work-assignment QE042 | Hold affected population when decided | Reinspection/containment request only | External lab contract only | Affected-delivery review only | Equipment work/state request | Cost reference only | Quality Manager and Maintenance authority | Instrument version, result and affected decision | Failed calibration risks population-exposure if state-guard fails at work-assignment QE042 | Planned |
| QE-043 | Out-of-tolerance impact review | Quality Manager | Governed quality event | Quality control record | Out-of-tolerance impact review: govern source-version-quality-conclusion using trusted-timestamp at work-assignment QE043 | As required by decision | As required by decision | As required by source | As required by exposure | As required by cause | Reference only | Quality Manager | Source, decision and acknowledgements | Out-of-tolerance impact review risks trend-distortion if trusted-timestamp fails at work-assignment QE043 | Planned |
| QE-044 | SPC alert | Quality Engineer | Approved result series | Statistical quality signal | SPC alert: govern source-version-quality-conclusion using qualification-check at work-assignment QE044 | No automatic movement | Process-review advisory | — | None | Asset review if indicated | — | Human quality review | Series context, rule and reviewer decision | SPC alert risks customer-misstatement if qualification-check fails at work-assignment QE044 | Planned |
| QE-045 | Audit finding | Quality Manager | Approved audit program | Quality audit finding | Audit finding: govern source-version-quality-conclusion using domain-receipt at work-assignment QE045 | None unless finding requires hold | Corrective-action request only | Supplier action if supplier audit | — | Action if equipment finding | — | Independent audit closure | Finding, response, action and evidence | Audit finding risks metrology-doubt if domain-receipt fails at work-assignment QE045 | Planned |
| QE-046 | Audit follow-up | Quality Manager | Approved audit program | Quality audit finding | Audit follow-up: govern source-version-quality-conclusion using exception-queue at work-assignment QE046 | None unless finding requires hold | Corrective-action request only | Supplier action if supplier audit | — | Action if equipment finding | — | Independent audit closure | Finding, response, action and evidence | Audit follow-up risks stock-unavailability if exception-queue fails at work-assignment QE046 | Planned |
| QE-047 | CoA generation | Customer Quality Engineer | Sales delivery, complaint or return | Quality certificate | CoA generation: govern released-revocable-document using lineage-hash at work-assignment QE047 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | CoA generation risks invalid-acceptance if lineage-hash fails at work-assignment QE047 | Planned |
| QE-048 | CoC generation | Customer Quality Engineer | Sales delivery, complaint or return | Quality certificate | CoC generation: govern released-revocable-document using expiry-rule at work-assignment QE048 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | CoC generation risks broken-lineage if expiry-rule fails at work-assignment QE048 | Planned |
| QE-049 | Certificate revocation | Customer Quality Engineer | Sales delivery, complaint or return | Quality certificate | Certificate revocation: govern released-revocable-document using version-snapshot at result-capture QE049 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Certificate revocation risks false-closure if version-snapshot fails at result-capture QE049 | Planned |
| QE-050 | AI NCR draft | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | AI NCR draft: govern defect-bounded-disposition using identity-scan at result-capture QE050 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | AI NCR draft risks recall-delay if identity-scan fails at result-capture QE050 | Planned |
| QE-051 | AI CAPA draft | Quality Engineer | Inspection, audit or quality signal | CAPA | AI CAPA draft: govern cause-action-effectiveness using scope-checksum at result-capture QE051 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | AI CAPA draft risks supplier-recourse-loss if scope-checksum fails at result-capture QE051 | Planned |
| QE-052 | AI inspection summary | Quality Product Owner | Authorized quality evidence subset | Labeled AI draft | AI inspection summary: govern plan-observation-outcome using independent-signature at result-capture QE052 | — | None | — | None | — | None | Human owner before any record use | Prompt, model, sources and human edits | AI inspection summary risks authority-breach if independent-signature fails at result-capture QE052 | Future |
| QE-053 | Incoming certificate mismatch | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Incoming certificate mismatch: govern released-revocable-document using quantity-balance at result-capture QE053 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | Incoming certificate mismatch risks unsafe-continuation if quantity-balance fails at result-capture QE053 | Planned |
| QE-054 | Skip-lot eligibility review | Quality Manager | Governed quality event | Quality control record | Skip-lot eligibility review: govern source-version-quality-conclusion using state-guard at result-capture QE054 | As required by decision | As required by decision | As required by source | As required by exposure | As required by cause | Reference only | Quality Manager | Source, decision and acknowledgements | Skip-lot eligibility review risks population-exposure if state-guard fails at result-capture QE054 | Planned |
| QE-055 | Tightened incoming sampling | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Tightened incoming sampling: govern source-version-quality-conclusion using trusted-timestamp at result-capture QE055 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | Tightened incoming sampling risks trend-distortion if trusted-timestamp fails at result-capture QE055 | Planned |
| QE-056 | Destructive receipt sample | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Destructive receipt sample: govern source-version-quality-conclusion using qualification-check at result-capture QE056 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | Destructive receipt sample risks customer-misstatement if qualification-check fails at result-capture QE056 | Planned |
| QE-057 | Supplier remote containment | Supplier Quality Engineer | Procurement receipt or supplier case | SCAR | Supplier remote containment: govern defect-bounded-disposition using domain-receipt at result-capture QE057 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | Supplier remote containment risks metrology-doubt if domain-receipt fails at result-capture QE057 | Planned |
| QE-058 | Supplier-item qualification | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Supplier-item qualification: govern source-version-quality-conclusion using exception-queue at result-capture QE058 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | Supplier-item qualification risks stock-unavailability if exception-queue fails at result-capture QE058 | Planned |
| QE-059 | Supplier audit escalation | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Supplier audit escalation: govern source-version-quality-conclusion using lineage-hash at result-capture QE059 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | Supplier audit escalation risks invalid-acceptance if lineage-hash fails at result-capture QE059 | Planned |
| QE-060 | SCAR overdue escalation | Supplier Quality Engineer | Procurement receipt or supplier case | SCAR | SCAR overdue escalation: govern source-version-quality-conclusion using expiry-rule at result-capture QE060 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | SCAR overdue escalation risks broken-lineage if expiry-rule fails at result-capture QE060 | Planned |
| QE-061 | Receipt hold acknowledgement failure | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Receipt hold acknowledgement failure: govern restricted-population-receipt using version-snapshot at technical-review QE061 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | Receipt hold acknowledgement failure risks false-closure if version-snapshot fails at technical-review QE061 | Planned |
| QE-062 | Incoming quantity split disposition | Supplier Quality Engineer | Procurement receipt or supplier case | Incoming inspection | Incoming quantity split disposition: govern source-version-quality-conclusion using identity-scan at technical-review QE062 | Hold-release exact receipt-population | — | Supplier-commercial review | — | None | Claim-reference only | Quality-Procurement approval | Receipt-batch-decision-PO reconciliation | Incoming quantity split disposition risks recall-delay if identity-scan fails at technical-review QE062 | Planned |
| QE-063 | Setup-change first piece | Quality Inspector | Manufacturing order/operation event | Production inspection | Setup-change first piece: govern source-version-quality-conclusion using scope-checksum at technical-review QE063 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | Setup-change first piece risks supplier-recourse-loss if scope-checksum fails at technical-review QE063 | Planned |
| QE-064 | Tool-change first piece | Quality Inspector | Manufacturing order/operation event | Production inspection | Tool-change first piece: govern source-version-quality-conclusion using independent-signature at technical-review QE064 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | Tool-change first piece risks authority-breach if independent-signature fails at technical-review QE064 | Planned |
| QE-065 | Shift patrol overdue | Quality Inspector | Manufacturing order/operation event | Production inspection | Shift patrol overdue: govern source-version-quality-conclusion using quantity-balance at technical-review QE065 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | Shift patrol overdue risks unsafe-continuation if quantity-balance fails at technical-review QE065 | Planned |
| QE-066 | Critical dimension failure | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | Critical dimension failure: govern source-version-quality-conclusion using state-guard at technical-review QE066 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Critical dimension failure risks population-exposure if state-guard fails at technical-review QE066 | Planned |
| QE-067 | Operation-window containment | Quality Engineer | Manufacturing order/operation event | Production inspection | Operation-window containment: govern defect-bounded-disposition using trusted-timestamp at technical-review QE067 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | Operation-window containment risks trend-distortion if trusted-timestamp fails at technical-review QE067 | Planned |
| QE-068 | WIP genealogy gap | Quality Engineer | Manufacturing order/operation event | Production inspection | WIP genealogy gap: govern versioned-exposure-completeness using qualification-check at technical-review QE068 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | WIP genealogy gap risks customer-misstatement if qualification-check fails at technical-review QE068 | Planned |
| QE-069 | Post-rework reinspection | Quality Inspector | Manufacturing order/operation event | Rework quality decision | Post-rework reinspection: govern plan-observation-outcome using domain-receipt at technical-review QE069 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | Post-rework reinspection risks metrology-doubt if domain-receipt fails at technical-review QE069 | Planned |
| QE-070 | Second rework cycle denial | Quality Engineer | Manufacturing order/operation event | Rework quality decision | Second rework cycle denial: govern defect-bounded-disposition using exception-queue at technical-review QE070 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | Second rework cycle denial risks stock-unavailability if exception-queue fails at technical-review QE070 | Planned |
| QE-071 | Final genealogy review | Quality Inspector | Manufacturing order/operation event | Production inspection | Final genealogy review: govern versioned-exposure-completeness using lineage-hash at technical-review QE071 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | Final genealogy review risks invalid-acceptance if lineage-hash fails at technical-review QE071 | Planned |
| QE-072 | Finished-goods release rejection | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Finished-goods release rejection: govern approved-quantity-restrictions using expiry-rule at technical-review QE072 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Finished-goods release rejection risks broken-lineage if expiry-rule fails at technical-review QE072 | Planned |
| QE-073 | Shipment batch substitution | Customer Quality Engineer | Sales delivery, complaint or return | Pre-dispatch inspection | Shipment batch substitution: govern source-version-quality-conclusion using version-snapshot at hold-handoff QE073 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Shipment batch substitution risks false-closure if version-snapshot fails at hold-handoff QE073 | Planned |
| QE-074 | Customer requirement precedence | Customer Quality Engineer | Sales delivery, complaint or return | Pre-dispatch inspection | Customer requirement precedence: govern source-version-quality-conclusion using identity-scan at hold-handoff QE074 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Customer requirement precedence risks recall-delay if identity-scan fails at hold-handoff QE074 | Planned |
| QE-075 | Packaging defect at staging | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Packaging defect at staging: govern defect-bounded-disposition using scope-checksum at hold-handoff QE075 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Packaging defect at staging risks supplier-recourse-loss if scope-checksum fails at hold-handoff QE075 | Planned |
| QE-076 | Customer concession request | Customer Quality Engineer | Sales delivery, complaint or return | Pre-dispatch inspection | Customer concession request: govern defect-bounded-disposition using independent-signature at hold-handoff QE076 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Customer concession request risks authority-breach if independent-signature fails at hold-handoff QE076 | Planned |
| QE-077 | Delivery certificate correction | Customer Quality Engineer | Sales delivery, complaint or return | Quality certificate | Delivery certificate correction: govern released-revocable-document using quantity-balance at hold-handoff QE077 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Delivery certificate correction risks unsafe-continuation if quantity-balance fails at hold-handoff QE077 | Planned |
| QE-078 | Complaint safety escalation | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | Complaint safety escalation: govern source-version-quality-conclusion using state-guard at hold-handoff QE078 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Complaint safety escalation risks population-exposure if state-guard fails at hold-handoff QE078 | Planned |
| QE-079 | Returned serial chain of custody | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | Returned serial chain of custody: govern source-version-quality-conclusion using trusted-timestamp at hold-handoff QE079 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Returned serial chain of custody risks trend-distortion if trusted-timestamp fails at hold-handoff QE079 | Planned |
| QE-080 | No-fault-found analysis | Quality Manager | Governed quality event | Quality control record | No-fault-found analysis: govern source-version-quality-conclusion using qualification-check at hold-handoff QE080 | As required by decision | As required by decision | As required by source | As required by exposure | As required by cause | Reference only | Quality Manager | Source, decision and acknowledgements | No-fault-found analysis risks customer-misstatement if qualification-check fails at hold-handoff QE080 | Planned |
| QE-081 | Field-failure related-lot search | Customer Quality Engineer | Sales delivery, complaint or return | Customer-quality case | Field-failure related-lot search: govern source-version-quality-conclusion using domain-receipt at hold-handoff QE081 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Field-failure related-lot search risks metrology-doubt if domain-receipt fails at hold-handoff QE081 | Planned |
| QE-082 | Customer escape CAPA | Customer Quality Engineer | Sales delivery, complaint or return | Pre-dispatch inspection | Customer escape CAPA: govern cause-action-effectiveness using exception-queue at hold-handoff QE082 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Customer escape CAPA risks stock-unavailability if exception-queue fails at hold-handoff QE082 | Planned |
| QE-083 | Emergency batch hold | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Emergency batch hold: govern restricted-population-receipt using lineage-hash at hold-handoff QE083 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Emergency batch hold risks invalid-acceptance if lineage-hash fails at hold-handoff QE083 | Planned |
| QE-084 | Competing holds review | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Competing holds review: govern restricted-population-receipt using expiry-rule at hold-handoff QE084 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Competing holds review risks broken-lineage if expiry-rule fails at hold-handoff QE084 | Planned |
| QE-085 | Hold-scope expansion | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Hold-scope expansion: govern restricted-population-receipt using version-snapshot at release-approval QE085 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Hold-scope expansion risks false-closure if version-snapshot fails at release-approval QE085 | Planned |
| QE-086 | Hold-scope reduction | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Hold-scope reduction: govern restricted-population-receipt using identity-scan at release-approval QE086 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Hold-scope reduction risks recall-delay if identity-scan fails at release-approval QE086 | Planned |
| QE-087 | Release dual approval | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Release dual approval: govern approved-quantity-restrictions using scope-checksum at release-approval QE087 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Release dual approval risks supplier-recourse-loss if scope-checksum fails at release-approval QE087 | Planned |
| QE-088 | Release acknowledgement timeout | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Release acknowledgement timeout: govern approved-quantity-restrictions using independent-signature at release-approval QE088 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Release acknowledgement timeout risks authority-breach if independent-signature fails at release-approval QE088 | Planned |
| QE-089 | Release reversal | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Release reversal: govern approved-quantity-restrictions using quantity-balance at release-approval QE089 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Release reversal risks unsafe-continuation if quantity-balance fails at release-approval QE089 | Planned |
| QE-090 | Mixed-lot partial release | Quality Engineer | Inspection, audit or quality signal | Hold/release decision | Mixed-lot partial release: govern approved-quantity-restrictions using state-guard at release-approval QE090 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Mixed-lot partial release risks population-exposure if state-guard fails at release-approval QE090 | Planned |
| QE-091 | Expired deviation block | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Expired deviation block: govern defect-bounded-disposition using trusted-timestamp at release-approval QE091 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Expired deviation block risks trend-distortion if trusted-timestamp fails at release-approval QE091 | Planned |
| QE-092 | Concession quantity exhaustion | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Concession quantity exhaustion: govern defect-bounded-disposition using qualification-check at release-approval QE092 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Concession quantity exhaustion risks customer-misstatement if qualification-check fails at release-approval QE092 | Planned |
| QE-093 | NCR duplicate linkage | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | NCR duplicate linkage: govern defect-bounded-disposition using domain-receipt at release-approval QE093 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | NCR duplicate linkage risks metrology-doubt if domain-receipt fails at release-approval QE093 | Planned |
| QE-094 | Defect severity escalation | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Defect severity escalation: govern defect-bounded-disposition using exception-queue at release-approval QE094 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Defect severity escalation risks stock-unavailability if exception-queue fails at release-approval QE094 | Planned |
| QE-095 | Containment effectiveness check | Quality Engineer | Inspection, audit or quality signal | CAPA | Containment effectiveness check: govern defect-bounded-disposition using lineage-hash at release-approval QE095 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Containment effectiveness check risks invalid-acceptance if lineage-hash fails at release-approval QE095 | Planned |
| QE-096 | Use-as-is Engineering review | Quality Engineer | Inspection, audit or quality signal | NCR/disposition | Use-as-is Engineering review: govern source-version-quality-conclusion using expiry-rule at release-approval QE096 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Use-as-is Engineering review risks broken-lineage if expiry-rule fails at release-approval QE096 | Planned |
| QE-097 | Scrap destruction witness | Quality Engineer | Manufacturing order/operation event | Scrap disposition | Scrap destruction witness: govern defect-bounded-disposition using version-snapshot at domain-acknowledgement QE097 | Population hold-release | Stop-rework-scrap-continue request | — | Exposure review | Causal-equipment review | Variance-write-off reference | Quality-Manufacturing approval | Operation-genealogy-scope-effect reconciliation | Scrap destruction witness risks false-closure if version-snapshot fails at domain-acknowledgement QE097 | Planned |
| QE-098 | Preventive trend action | Quality Engineer | Inspection, audit or quality signal | CAPA | Preventive trend action: govern cause-action-effectiveness using identity-scan at domain-acknowledgement QE098 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Preventive trend action risks recall-delay if identity-scan fails at domain-acknowledgement QE098 | Planned |
| QE-099 | Cause hypothesis rejection | Quality Engineer | Inspection, audit or quality signal | CAPA | Cause hypothesis rejection: govern cause-action-effectiveness using scope-checksum at domain-acknowledgement QE099 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Cause hypothesis rejection risks supplier-recourse-loss if scope-checksum fails at domain-acknowledgement QE099 | Planned |
| QE-100 | Ineffective CAPA reopening | Quality Engineer | Inspection, audit or quality signal | CAPA | Ineffective CAPA reopening: govern cause-action-effectiveness using independent-signature at domain-acknowledgement QE100 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Ineffective CAPA reopening risks authority-breach if independent-signature fails at domain-acknowledgement QE100 | Planned |
| QE-101 | Effectiveness window extension | Quality Engineer | Inspection, audit or quality signal | CAPA | Effectiveness window extension: govern cause-action-effectiveness using quantity-balance at domain-acknowledgement QE101 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Effectiveness window extension risks unsafe-continuation if quantity-balance fails at domain-acknowledgement QE101 | Planned |
| QE-102 | Cross-site CAPA learning | Quality Engineer | Inspection, audit or quality signal | CAPA | Cross-site CAPA learning: govern cause-action-effectiveness using state-guard at domain-acknowledgement QE102 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Cross-site CAPA learning risks population-exposure if state-guard fails at domain-acknowledgement QE102 | Planned |
| QE-103 | Calibration extension request | Quality Engineer | Maintenance equipment/calibration event | Instrument impact assessment | Calibration extension request: govern fitness-dependent-decisions using trusted-timestamp at domain-acknowledgement QE103 | Hold affected population when decided | Reinspection/containment request only | External lab contract only | Affected-delivery review only | Equipment work/state request | Cost reference only | Quality Manager and Maintenance authority | Instrument version, result and affected decision | Calibration extension request risks trend-distortion if trusted-timestamp fails at domain-acknowledgement QE103 | Planned |
| QE-104 | External laboratory qualification | Quality Engineer | Maintenance equipment/calibration event | Instrument impact assessment | External laboratory qualification: govern fitness-dependent-decisions using qualification-check at domain-acknowledgement QE104 | Hold affected population when decided | Reinspection/containment request only | External lab contract only | Affected-delivery review only | Equipment work/state request | Cost reference only | Quality Manager and Maintenance authority | Instrument version, result and affected decision | External laboratory qualification risks customer-misstatement if qualification-check fails at domain-acknowledgement QE104 | Planned |
| QE-105 | Instrument range mismatch | Quality Engineer | Maintenance equipment/calibration event | Instrument impact assessment | Instrument range mismatch: govern fitness-dependent-decisions using domain-receipt at domain-acknowledgement QE105 | Hold affected population when decided | Reinspection/containment request only | External lab contract only | Affected-delivery review only | Equipment work/state request | Cost reference only | Quality Manager and Maintenance authority | Instrument version, result and affected decision | Instrument range mismatch risks metrology-doubt if domain-receipt fails at domain-acknowledgement QE105 | Planned |
| QE-106 | Control-chart run-rule signal | Quality Engineer | Approved result series | Statistical quality signal | Control-chart run-rule signal: govern source-version-quality-conclusion using exception-queue at domain-acknowledgement QE106 | No automatic movement | Process-review advisory | — | None | Asset review if indicated | — | Human quality review | Series context, rule and reviewer decision | Control-chart run-rule signal risks stock-unavailability if exception-queue fails at domain-acknowledgement QE106 | Planned |
| QE-107 | Capability study qualification | Quality Engineer | Inspection, audit or quality signal | CAPA | Capability study qualification: govern cause-action-effectiveness using lineage-hash at domain-acknowledgement QE107 | Scoped status-effect | Scoped containment-execution | Supplier-action if sourced | Customer-review if exposed | Equipment-action if causal | Financial-effect reference | Quality-domain approval | Decision-quantity-acknowledgement reconciliation | Capability study qualification risks invalid-acceptance if lineage-hash fails at domain-acknowledgement QE107 | Planned |
| QE-108 | Audit conflict reassignment | Quality Manager | Approved audit program | Quality audit finding | Audit conflict reassignment: govern source-version-quality-conclusion using expiry-rule at domain-acknowledgement QE108 | None unless finding requires hold | Corrective-action request only | Supplier action if supplier audit | — | Action if equipment finding | — | Independent audit closure | Finding, response, action and evidence | Audit conflict reassignment risks broken-lineage if expiry-rule fails at domain-acknowledgement QE108 | Planned |
| QE-109 | Certificate authenticity verification | Customer Quality Engineer | Sales delivery, complaint or return | Quality certificate | Certificate authenticity verification: govern released-revocable-document using version-snapshot at NCR-triage QE109 | Returned/staged-population hold-release | Genealogy-query only | — | Customer-remedy authorization | — | Credit-reserve reference | Quality-Sales approval | Delivery-return-population-decision reconciliation | Certificate authenticity verification risks false-closure if version-snapshot fails at NCR-triage QE109 | Planned |
| QE-110 | Quality-to-Inventory reconciliation | Quality Manager | Governed quality event | Quality control record | Quality-to-Inventory reconciliation: govern source-version-quality-conclusion using identity-scan at NCR-triage QE110 | As required by decision | As required by decision | As required by source | As required by exposure | As required by cause | Reference only | Quality Manager | Source, decision and acknowledgements | Quality-to-Inventory reconciliation risks recall-delay if identity-scan fails at NCR-triage QE110 | Planned |

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
| Approve critical inspection outcome | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Enter inspection result | — | — | — | A | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Correct inspection result | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Issue Quality hold decision | — | — | — | A | R | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Apply inventory hold status | — | — | — | C | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Record Manufacturing hold/stop | — | — | — | C | — | — | — | — | A | R | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve Quality release decision | — | — | A | R | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Apply inventory release effect | — | — | — | C | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Continue production after release | — | — | — | C | — | — | — | — | A | R | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Create NCR | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Classify defect severity | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Coordinate containment | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Execute inventory containment | — | — | — | C | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Execute production containment | — | — | — | C | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve use-as-is disposition | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve rework quality criteria | — | — | — | A | R | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Execute rework | — | — | — | C | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Record scrap intent | — | — | — | C | — | — | — | — | A | R | — | C | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — |
| Move inventory to scrap status | — | — | — | C | — | — | — | — | — | — | — | A | R | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — |
| Post scrap financial effect | — | — | — | C | — | — | — | — | — | — | — | C | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — |
| Approve deviation | — | — | — | C | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — |
| Approve concession | — | — | A | R | — | — | — | C | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — |
| Obtain customer concession | — | — | — | C | — | — | — | R | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — | — | — | — | — | — |
| Issue supplier return request | — | — | — | C | — | — | C | C | — | — | — | — | — | A | R | C | — | — | — | — | — | — | — | — | — | — | — | — |
| Open CAPA | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve root cause | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Implement manufacturing corrective action | — | — | — | C | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Implement maintenance corrective action | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — | — | R | — |
| Verify CAPA effectiveness | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Issue SCAR | — | — | — | A | — | — | R | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Send SCAR commercially | — | — | — | C | — | — | C | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Verify supplier response | — | — | — | A | — | — | R | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Restrict supplier commercially | — | — | — | C | — | — | C | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Intake customer complaint | — | — | — | C | — | — | — | R | — | — | — | — | — | — | — | C | A | — | — | — | — | — | — | — | — | — | — | — |
| Investigate customer complaint | — | — | — | A | — | — | — | R | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — |
| Authorize customer return | — | — | — | C | — | — | — | C | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — |
| Perform returned-unit failure analysis | — | — | — | A | — | — | — | R | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — |
| Authorize customer credit | — | — | — | C | — | — | — | C | — | — | — | — | — | — | — | R | — | — | A | — | — | — | — | — | — | — | — | — |
| Perform batch/serial exposure trace | — | — | A | C | R | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Authorize recall action | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | C | R | A |
| Schedule instrument calibration | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — | — | R | — |
| Assess failed-calibration impact | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — |
| Approve SPC baseline | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Conduct Quality audit | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | C | — | — |
| Close Quality audit finding | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | C | — | — |
| Issue quality certificate | — | — | — | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
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
| QADR-001 | Quality owns disposition | Proposed | Quality owns disposition: keep accountable-domain authority; reject Quality-side execution; decision proof version-snapshot at plan-resolution QADR001 |
| QADR-002 | Quality owns hold and release decisions | Proposed | Quality owns hold and release decisions: keep accountable-domain authority; reject Quality-side execution; decision proof identity-scan at plan-resolution QADR002 |
| QADR-003 | Inventory owns stock movement | Proposed | Inventory owns stock movement: keep accountable-domain authority; reject Quality-side execution; decision proof scope-checksum at plan-resolution QADR003 |
| QADR-004 | Manufacturing owns production execution | Proposed | Manufacturing owns production execution: keep accountable-domain authority; reject Quality-side execution; decision proof independent-signature at plan-resolution QADR004 |
| QADR-005 | Procurement owns supplier commercial action | Proposed | Procurement owns supplier commercial action: keep accountable-domain authority; reject Quality-side execution; decision proof quantity-balance at plan-resolution QADR005 |
| QADR-006 | Sales owns customer commercial action | Proposed | Sales owns customer commercial action: keep accountable-domain authority; reject Quality-side execution; decision proof state-guard at plan-resolution QADR006 |
| QADR-007 | Maintenance owns equipment readiness | Proposed | Maintenance owns equipment readiness: keep accountable-domain authority; reject Quality-side execution; decision proof trusted-timestamp at plan-resolution QADR007 |
| QADR-008 | Finance owns financial posting | Proposed | Finance owns financial posting: keep accountable-domain authority; reject Quality-side execution; decision proof qualification-check at plan-resolution QADR008 |
| QADR-009 | Inspection does not equal movement | Proposed | Inspection does not equal movement: separate lifecycles; reject implicit side-effects; decision proof domain-receipt at plan-resolution QADR009 |
| QADR-010 | Quality hold does not equal Inventory movement | Proposed | Quality hold does not equal Inventory movement: separate lifecycles; reject implicit side-effects; decision proof exception-queue at plan-resolution QADR010 |
| QADR-011 | Quality release does not equal stock transfer | Proposed | Quality release does not equal stock transfer: separate lifecycles; reject implicit side-effects; decision proof lineage-hash at plan-resolution QADR011 |
| QADR-012 | Nonconformance does not equal scrap | Proposed | Nonconformance does not equal scrap: separate lifecycles; reject implicit side-effects; decision proof expiry-rule at plan-resolution QADR012 |
| QADR-013 | Rework approval does not equal rework execution | Proposed | Rework approval does not equal rework execution: separate lifecycles; reject implicit side-effects; decision proof version-snapshot at source-intake QADR013 |
| QADR-014 | Scrap disposition does not equal scrap movement | Proposed | Scrap disposition does not equal scrap movement: separate lifecycles; reject implicit side-effects; decision proof identity-scan at source-intake QADR014 |
| QADR-015 | Supplier defect does not equal supplier debit | Proposed | Supplier defect does not equal supplier debit: separate lifecycles; reject implicit side-effects; decision proof scope-checksum at source-intake QADR015 |
| QADR-016 | Customer complaint does not equal return or credit | Proposed | Customer complaint does not equal return or credit: separate lifecycles; reject implicit side-effects; decision proof independent-signature at source-intake QADR016 |
| QADR-017 | CAPA does not equal NCR closure | Proposed | CAPA does not equal NCR closure: separate lifecycles; reject implicit side-effects; decision proof quantity-balance at source-intake QADR017 |
| QADR-018 | Corrective action does not equal effectiveness | Proposed | Corrective action does not equal effectiveness: separate lifecycles; reject implicit side-effects; decision proof state-guard at source-intake QADR018 |
| QADR-019 | Sampling plans are versioned | Proposed | Sampling plans are versioned: preserve reproducibility; reject in-place reinterpretation; decision proof trusted-timestamp at source-intake QADR019 |
| QADR-020 | Inspection plans are versioned | Proposed | Inspection plans are versioned: preserve reproducibility; reject in-place reinterpretation; decision proof qualification-check at source-intake QADR020 |
| QADR-021 | Specifications are versioned | Proposed | Specifications are versioned: preserve reproducibility; reject in-place reinterpretation; decision proof domain-receipt at source-intake QADR021 |
| QADR-022 | Quality plans are versioned | Proposed | Quality plans are versioned: preserve reproducibility; reject in-place reinterpretation; decision proof exception-queue at source-intake QADR022 |
| QADR-023 | Results are immutable | Proposed | Results are immutable: preserve reproducibility; reject in-place reinterpretation; decision proof lineage-hash at source-intake QADR023 |
| QADR-024 | Corrections supersede | Proposed | Corrections supersede: preserve reproducibility; reject in-place reinterpretation; decision proof expiry-rule at source-intake QADR024 |
| QADR-025 | Batch/serial traceability is preserved | Proposed | Batch/serial traceability is preserved: preserve reproducibility; reject in-place reinterpretation; decision proof version-snapshot at sample-selection QADR025 |
| QADR-026 | Quality status and Inventory stock status are separate | Proposed | Quality status and Inventory stock status are separate: retain attributable evidence; reject unaudited default; decision proof identity-scan at sample-selection QADR026 |
| QADR-027 | Hold scope is explicit | Proposed | Hold scope is explicit: bind population scope; reject lot-wide inference; decision proof scope-checksum at sample-selection QADR027 |
| QADR-028 | Partial release is explicit | Proposed | Partial release is explicit: bind population scope; reject lot-wide inference; decision proof independent-signature at sample-selection QADR028 |
| QADR-029 | Partial disposition is explicit | Proposed | Partial disposition is explicit: bind population scope; reject lot-wide inference; decision proof quantity-balance at sample-selection QADR029 |
| QADR-030 | Quality and Manufacturing cannot self-approve each other’s authority | Proposed | Quality and Manufacturing cannot self-approve each other’s authority: enforce segregation; reject ungoverned mutation; decision proof state-guard at sample-selection QADR030 |
| QADR-031 | Supplier corrective action does not authorize Procurement claim | Proposed | Supplier corrective action does not authorize Procurement claim: retain attributable evidence; reject unaudited default; decision proof trusted-timestamp at sample-selection QADR031 |
| QADR-032 | Customer complaint investigation does not authorize Sales credit | Proposed | Customer complaint investigation does not authorize Sales credit: retain attributable evidence; reject unaudited default; decision proof qualification-check at sample-selection QADR032 |
| QADR-033 | Calibration result does not equal Maintenance release | Proposed | Calibration result does not equal Maintenance release: separate lifecycles; reject implicit side-effects; decision proof domain-receipt at sample-selection QADR033 |
| QADR-034 | Out-of-tolerance instrument requires impact review | Proposed | Out-of-tolerance instrument requires impact review: retain attributable evidence; reject unaudited default; decision proof exception-queue at sample-selection QADR034 |
| QADR-035 | Audit finding does not automatically create CAPA | Proposed | Audit finding does not automatically create CAPA: retain attributable evidence; reject unaudited default; decision proof lineage-hash at sample-selection QADR035 |
| QADR-036 | CAPA requires effectiveness verification | Proposed | CAPA requires effectiveness verification: retain attributable evidence; reject unaudited default; decision proof expiry-rule at sample-selection QADR036 |
| QADR-037 | Certificates are generated from governed evidence | Proposed | Certificates are generated from governed evidence: retain attributable evidence; reject unaudited default; decision proof version-snapshot at work-assignment QADR037 |
| QADR-038 | Certificates are revocable | Proposed | Certificates are revocable: retain attributable evidence; reject unaudited default; decision proof identity-scan at work-assignment QADR038 |
| QADR-039 | Direct database writes across domains are prohibited | Proposed | Direct database writes across domains are prohibited: enforce segregation; reject ungoverned mutation; decision proof scope-checksum at work-assignment QADR039 |
| QADR-040 | Customization cannot bypass inspection, hold, release, NCR, CAPA, SoD or reconciliation | Proposed | Customization cannot bypass inspection, hold, release, NCR, CAPA, SoD or reconciliation: enforce segregation; reject ungoverned mutation; decision proof independent-signature at work-assignment QADR040 |
| QADR-041 | AI may summarize evidence | Proposed | AI may summarize evidence: retain human authority; reject autonomous consequence; decision proof quantity-balance at work-assignment QADR041 |
| QADR-042 | AI may draft NCR or CAPA text only | Proposed | AI may draft NCR or CAPA text only: retain human authority; reject autonomous consequence; decision proof state-guard at work-assignment QADR042 |
| QADR-043 | AI cannot inspect autonomously | Proposed | AI cannot inspect autonomously: retain human authority; reject autonomous consequence; decision proof trusted-timestamp at work-assignment QADR043 |
| QADR-044 | AI cannot accept or reject | Proposed | AI cannot accept or reject: retain human authority; reject autonomous consequence; decision proof qualification-check at work-assignment QADR044 |
| QADR-045 | AI cannot release holds | Proposed | AI cannot release holds: retain human authority; reject autonomous consequence; decision proof domain-receipt at work-assignment QADR045 |
| QADR-046 | AI cannot close NCR | Proposed | AI cannot close NCR: retain human authority; reject autonomous consequence; decision proof exception-queue at work-assignment QADR046 |
| QADR-047 | AI cannot close CAPA | Proposed | AI cannot close CAPA: retain human authority; reject autonomous consequence; decision proof lineage-hash at work-assignment QADR047 |
| QADR-048 | AI cannot approve supplier | Proposed | AI cannot approve supplier: retain human authority; reject autonomous consequence; decision proof expiry-rule at work-assignment QADR048 |
| QADR-049 | AI cannot approve customer concession | Proposed | AI cannot approve customer concession: retain human authority; reject autonomous consequence; decision proof version-snapshot at result-capture QADR049 |
| QADR-050 | AI cannot issue certificates without human approval | Proposed | AI cannot issue certificates without human approval: retain human authority; reject autonomous consequence; decision proof identity-scan at result-capture QADR050 |
| QADR-051 | Current Quality flags are foundations, not QMS runtime | Implemented | [Item flag](../../apps/api/prisma/schema.prisma#L1417), [Batch field](../../apps/api/prisma/schema.prisma#L1887) and [QC metadata](../../apps/api/prisma/schema.prisma#L70) prove vocabulary only; operational-QMS interpretation rejected QADR051 |
| QADR-052 | FCSB-019 does not authorize implementation | Proposed | FCSB-019 does not authorize implementation: retain attributable evidence; reject unaudited default; decision proof independent-signature at result-capture QADR052 |
| QADR-053 | FCSB-020 depends on approved calibration/equipment-quality boundaries | Deferred | FCSB-020 depends on approved calibration/equipment-quality boundaries: retain attributable evidence; reject unaudited default; decision proof quantity-balance at result-capture QADR053 |
| QADR-054 | Inspection requests snapshot resolved plans | Proposed | Inspection requests snapshot resolved plans: preserve reproducibility; reject in-place reinterpretation; decision proof state-guard at result-capture QADR054 |
| QADR-055 | Source-event creation is idempotent | Proposed | Source-event creation is idempotent: retain attributable evidence; reject unaudited default; decision proof trusted-timestamp at result-capture QADR055 |
| QADR-056 | Sample identity is separate from inventory identity | Proposed | Sample identity is separate from inventory identity: retain attributable evidence; reject unaudited default; decision proof qualification-check at result-capture QADR056 |
| QADR-057 | Critical failed characteristics cannot be averaged away | Proposed | Critical failed characteristics cannot be averaged away: enforce segregation; reject ungoverned mutation; decision proof domain-receipt at result-capture QADR057 |
| QADR-058 | Blank results never imply conformity | Proposed | Blank results never imply conformity: retain attributable evidence; reject unaudited default; decision proof exception-queue at result-capture QADR058 |
| QADR-059 | Result corrections retain original observations | Proposed | Result corrections retain original observations: preserve reproducibility; reject in-place reinterpretation; decision proof lineage-hash at result-capture QADR059 |
| QADR-060 | Reinspection is a related request | Proposed | Reinspection is a related request: retain attributable evidence; reject unaudited default; decision proof expiry-rule at result-capture QADR060 |
| QADR-061 | Competing holds survive independent release | Proposed | Competing holds survive independent release: bind population scope; reject lot-wide inference; decision proof version-snapshot at technical-review QADR061 |
| QADR-062 | Emergency hold authority expires | Proposed | Emergency hold authority expires: bind population scope; reject lot-wide inference; decision proof identity-scan at technical-review QADR062 |
| QADR-063 | Release requires domain acknowledgement | Proposed | Release requires domain acknowledgement: bind population scope; reject lot-wide inference; decision proof scope-checksum at technical-review QADR063 |
| QADR-064 | Disposition quantities reconcile to affected population | Proposed | Disposition quantities reconcile to affected population: bind population scope; reject lot-wide inference; decision proof independent-signature at technical-review QADR064 |
| QADR-065 | Deviation usage is metered | Proposed | Deviation usage is metered: retain attributable evidence; reject unaudited default; decision proof quantity-balance at technical-review QADR065 |
| QADR-066 | Concessions disclose customer authority when required | Proposed | Concessions disclose customer authority when required: retain attributable evidence; reject unaudited default; decision proof state-guard at technical-review QADR066 |
| QADR-067 | Root-cause claims retain contrary evidence | Proposed | Root-cause claims retain contrary evidence: preserve reproducibility; reject in-place reinterpretation; decision proof trusted-timestamp at technical-review QADR067 |
| QADR-068 | Action owners remain in authoritative domains | Proposed | Action owners remain in authoritative domains: retain attributable evidence; reject unaudited default; decision proof qualification-check at technical-review QADR068 |
| QADR-069 | Effectiveness criteria are frozen before closure | Proposed | Effectiveness criteria are frozen before closure: retain attributable evidence; reject unaudited default; decision proof domain-receipt at technical-review QADR069 |
| QADR-070 | Supplier scorecards cannot suspend suppliers automatically | Proposed | Supplier scorecards cannot suspend suppliers automatically: enforce segregation; reject ungoverned mutation; decision proof exception-queue at technical-review QADR070 |
| QADR-071 | Complaint evidence minimizes personal data | Proposed | Complaint evidence minimizes personal data: retain attributable evidence; reject unaudited default; decision proof lineage-hash at technical-review QADR071 |
| QADR-072 | Recall support is not recall authorization | Proposed | Recall support is not recall authorization: separate lifecycles; reject implicit side-effects; decision proof expiry-rule at technical-review QADR072 |
| QADR-073 | Instrument fitness is evaluated at observation time | Proposed | Instrument fitness is evaluated at observation time: retain attributable evidence; reject unaudited default; decision proof version-snapshot at hold-handoff QADR073 |
| QADR-074 | Control limits differ from specification limits | Proposed | Control limits differ from specification limits: retain attributable evidence; reject unaudited default; decision proof identity-scan at hold-handoff QADR074 |
| QADR-075 | Analytics cannot mutate Quality evidence | Proposed | Analytics cannot mutate Quality evidence: enforce segregation; reject ungoverned mutation; decision proof scope-checksum at hold-handoff QADR075 |

### 57.2 Open-decision register

No item below is silently resolved by this draft. The evidence gate is specific to the decision and must be reviewed before design approval.

| Open decision | Decision topic | Evidence required before resolution | Accountable forum |
|---|---|---|---|
| QOD-001 | Quality organization model | Quality organization model needs an approved design artifact, version-snapshot evidence and witnessed plan-resolution failure test QOD001 | Architecture Board and Quality |
| QOD-002 | Characteristic model | Characteristic model needs an approved design artifact, identity-scan evidence and witnessed plan-resolution failure test QOD002 | Architecture Board and Quality |
| QOD-003 | Specification model | Specification model needs an approved design artifact, scope-checksum evidence and witnessed plan-resolution failure test QOD003 | Architecture Board and Quality |
| QOD-004 | Quality plan model | Quality plan model needs an approved design artifact, independent-signature evidence and witnessed plan-resolution failure test QOD004 | Architecture Board and Quality |
| QOD-005 | Inspection plan model | Inspection plan model needs an approved design artifact, quantity-balance evidence and witnessed plan-resolution failure test QOD005 | Architecture Board and Quality |
| QOD-006 | Sampling plan model | Sampling plan model needs an approved design artifact, state-guard evidence and witnessed plan-resolution failure test QOD006 | Architecture Board and Quality |
| QOD-007 | Incoming inspection contract | Incoming inspection contract needs an approved design artifact, trusted-timestamp evidence and witnessed plan-resolution failure test QOD007 | Architecture Board and Quality |
| QOD-008 | In-process inspection contract | In-process inspection contract needs an approved design artifact, qualification-check evidence and witnessed plan-resolution failure test QOD008 | Architecture Board and Quality |
| QOD-009 | Final inspection contract | Final inspection contract needs an approved design artifact, domain-receipt evidence and witnessed plan-resolution failure test QOD009 | Architecture Board and Quality |
| QOD-010 | Pre-dispatch contract | Pre-dispatch contract needs an approved design artifact, exception-queue evidence and witnessed plan-resolution failure test QOD010 | Architecture Board and Quality |
| QOD-011 | Hold model | Hold model needs an approved design artifact, lineage-hash evidence and witnessed plan-resolution failure test QOD011 | Architecture Board and Quality |
| QOD-012 | Release model | Release model needs an approved design artifact, expiry-rule evidence and witnessed plan-resolution failure test QOD012 | Architecture Board and Quality |
| QOD-013 | Inventory quality-status contract | Inventory quality-status contract needs an approved design artifact, version-snapshot evidence and witnessed source-intake failure test QOD013 | Architecture Board and Quality |
| QOD-014 | NCR model | NCR model needs an approved design artifact, identity-scan evidence and witnessed source-intake failure test QOD014 | Architecture Board and Quality |
| QOD-015 | Defect taxonomy | Defect taxonomy needs an approved design artifact, scope-checksum evidence and witnessed source-intake failure test QOD015 | Architecture Board and Quality |
| QOD-016 | Containment model | Containment model needs an approved design artifact, independent-signature evidence and witnessed source-intake failure test QOD016 | Security, Data Governance and Quality |
| QOD-017 | Disposition model | Disposition model needs an approved design artifact, quantity-balance evidence and witnessed source-intake failure test QOD017 | Architecture Board and Quality |
| QOD-018 | Rework quality contract | Rework quality contract needs an approved design artifact, state-guard evidence and witnessed source-intake failure test QOD018 | Architecture Board and Quality |
| QOD-019 | Scrap disposition contract | Scrap disposition contract needs an approved design artifact, trusted-timestamp evidence and witnessed source-intake failure test QOD019 | Architecture Board and Quality |
| QOD-020 | Deviation model | Deviation model needs an approved design artifact, qualification-check evidence and witnessed source-intake failure test QOD020 | Architecture Board and Quality |
| QOD-021 | Concession model | Concession model needs an approved design artifact, domain-receipt evidence and witnessed source-intake failure test QOD021 | Architecture Board and Quality |
| QOD-022 | Waiver model | Waiver model needs an approved design artifact, exception-queue evidence and witnessed source-intake failure test QOD022 | Security, Data Governance and Quality |
| QOD-023 | CAPA model | CAPA model needs an approved design artifact, lineage-hash evidence and witnessed source-intake failure test QOD023 | Architecture Board and Quality |
| QOD-024 | Root-cause methods | Root-cause methods needs an approved design artifact, expiry-rule evidence and witnessed source-intake failure test QOD024 | Architecture Board and Quality |
| QOD-025 | Effectiveness model | Effectiveness model needs an approved design artifact, version-snapshot evidence and witnessed sample-selection failure test QOD025 | Architecture Board and Quality |
| QOD-026 | Supplier quality model | Supplier quality model needs an approved design artifact, identity-scan evidence and witnessed sample-selection failure test QOD026 | Procurement and Quality |
| QOD-027 | SCAR model | SCAR model needs an approved design artifact, scope-checksum evidence and witnessed sample-selection failure test QOD027 | Procurement and Quality |
| QOD-028 | Customer complaint model | Customer complaint model needs an approved design artifact, independent-signature evidence and witnessed sample-selection failure test QOD028 | Security, Data Governance and Quality |
| QOD-029 | Return quality model | Return quality model needs an approved design artifact, quantity-balance evidence and witnessed sample-selection failure test QOD029 | Sales, Customer Service and Quality |
| QOD-030 | Failure-analysis model | Failure-analysis model needs an approved design artifact, state-guard evidence and witnessed sample-selection failure test QOD030 | Security, Data Governance and Quality |
| QOD-031 | Batch trace model | Batch trace model needs an approved design artifact, trusted-timestamp evidence and witnessed sample-selection failure test QOD031 | Architecture Board and Quality |
| QOD-032 | Serial trace model | Serial trace model needs an approved design artifact, qualification-check evidence and witnessed sample-selection failure test QOD032 | Architecture Board and Quality |
| QOD-033 | Recall support model | Recall support model needs an approved design artifact, domain-receipt evidence and witnessed sample-selection failure test QOD033 | Architecture Board and Quality |
| QOD-034 | Instrument model | Instrument model needs an approved design artifact, exception-queue evidence and witnessed sample-selection failure test QOD034 | Maintenance and Quality |
| QOD-035 | Calibration contract | Calibration contract needs an approved design artifact, lineage-hash evidence and witnessed sample-selection failure test QOD035 | Maintenance and Quality |
| QOD-036 | Out-of-tolerance process | Out-of-tolerance process needs an approved design artifact, expiry-rule evidence and witnessed sample-selection failure test QOD036 | Architecture Board and Quality |
| QOD-037 | SPC model | SPC model needs an approved design artifact, version-snapshot evidence and witnessed work-assignment failure test QOD037 | Architecture Board and Quality |
| QOD-038 | Audit model | Audit model needs an approved design artifact, identity-scan evidence and witnessed work-assignment failure test QOD038 | Architecture Board and Quality |
| QOD-039 | Certificate model | Certificate model needs an approved design artifact, scope-checksum evidence and witnessed work-assignment failure test QOD039 | Architecture Board and Quality |
| QOD-040 | Reporting model | Reporting model needs an approved design artifact, independent-signature evidence and witnessed work-assignment failure test QOD040 | Architecture Board and Quality |
| QOD-041 | Reconciliation model | Reconciliation model needs an approved design artifact, quantity-balance evidence and witnessed work-assignment failure test QOD041 | Architecture Board and Quality |
| QOD-042 | Retention model | Retention model needs an approved design artifact, state-guard evidence and witnessed work-assignment failure test QOD042 | Security, Data Governance and Quality |
| QOD-043 | AI boundary | AI boundary needs an approved design artifact, trusted-timestamp evidence and witnessed work-assignment failure test QOD043 | Security, Data Governance and Quality |
| QOD-044 | Quality authority delegation | Quality authority delegation needs an approved design artifact, qualification-check evidence and witnessed work-assignment failure test QOD044 | Architecture Board and Quality |
| QOD-045 | Inspector qualification model | Inspector qualification model needs an approved design artifact, domain-receipt evidence and witnessed work-assignment failure test QOD045 | Architecture Board and Quality |
| QOD-046 | Method and unit conversion policy | Method and unit conversion policy needs an approved design artifact, exception-queue evidence and witnessed work-assignment failure test QOD046 | Architecture Board and Quality |
| QOD-047 | Specification precedence policy | Specification precedence policy needs an approved design artifact, lineage-hash evidence and witnessed work-assignment failure test QOD047 | Architecture Board and Quality |
| QOD-048 | Sampling switching rules | Sampling switching rules needs an approved design artifact, expiry-rule evidence and witnessed work-assignment failure test QOD048 | Architecture Board and Quality |
| QOD-049 | Sample randomization method | Sample randomization method needs an approved design artifact, version-snapshot evidence and witnessed result-capture failure test QOD049 | Architecture Board and Quality |
| QOD-050 | Destructive sample accounting | Destructive sample accounting needs an approved design artifact, identity-scan evidence and witnessed result-capture failure test QOD050 | Architecture Board and Quality |
| QOD-051 | Inspection correction workflow | Inspection correction workflow needs an approved design artifact, scope-checksum evidence and witnessed result-capture failure test QOD051 | Architecture Board and Quality |
| QOD-052 | Critical-characteristic approval threshold | Critical-characteristic approval threshold needs an approved design artifact, independent-signature evidence and witnessed result-capture failure test QOD052 | Architecture Board and Quality |
| QOD-053 | Emergency hold expiry | Emergency hold expiry needs an approved design artifact, quantity-balance evidence and witnessed result-capture failure test QOD053 | Architecture Board and Quality |
| QOD-054 | Partial release acknowledgement | Partial release acknowledgement needs an approved design artifact, state-guard evidence and witnessed result-capture failure test QOD054 | Architecture Board and Quality |
| QOD-055 | Competing-hold evaluation | Competing-hold evaluation needs an approved design artifact, trusted-timestamp evidence and witnessed result-capture failure test QOD055 | Architecture Board and Quality |
| QOD-056 | Disposition quantity tolerance | Disposition quantity tolerance needs an approved design artifact, qualification-check evidence and witnessed result-capture failure test QOD056 | Architecture Board and Quality |
| QOD-057 | Customer concession authority | Customer concession authority needs an approved design artifact, domain-receipt evidence and witnessed result-capture failure test QOD057 | Sales, Customer Service and Quality |
| QOD-058 | Supplier restriction recommendation | Supplier restriction recommendation needs an approved design artifact, exception-queue evidence and witnessed result-capture failure test QOD058 | Procurement and Quality |
| QOD-059 | Complaint privacy classification | Complaint privacy classification needs an approved design artifact, lineage-hash evidence and witnessed result-capture failure test QOD059 | Security, Data Governance and Quality |
| QOD-060 | Recall governance handoff | Recall governance handoff needs an approved design artifact, expiry-rule evidence and witnessed result-capture failure test QOD060 | Architecture Board and Quality |
| QOD-061 | External laboratory qualification | External laboratory qualification needs an approved design artifact, version-snapshot evidence and witnessed technical-review failure test QOD061 | Maintenance and Quality |
| QOD-062 | Calibration extension authority | Calibration extension authority needs an approved design artifact, identity-scan evidence and witnessed technical-review failure test QOD062 | Maintenance and Quality |
| QOD-063 | Statistical baseline approval | Statistical baseline approval needs an approved design artifact, scope-checksum evidence and witnessed technical-review failure test QOD063 | Architecture Board and Quality |
| QOD-064 | Audit independence rules | Audit independence rules needs an approved design artifact, independent-signature evidence and witnessed technical-review failure test QOD064 | Architecture Board and Quality |
| QOD-065 | Certificate verification mechanism | Certificate verification mechanism needs an approved design artifact, quantity-balance evidence and witnessed technical-review failure test QOD065 | Architecture Board and Quality |

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
