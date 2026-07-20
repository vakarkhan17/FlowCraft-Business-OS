# FlowCraft Solution Blueprint

## Volume 24 — Product Governance and Release Architecture

| Field | Value |
|---|---|
| Document code | FCSB-024 |
| Version | 1.0 Draft |
| Status | Architecture Review Draft |
| Date | 2026-07-20 |
| Owner | Enterprise Architecture and Product Governance |
| Scope | Product decisions, compatibility, packaging, quality gates, releases, support, upgrades, extensions, deprecation and lifecycle governance; documentation only |
| Accepted implementation baseline | DBA-002, DBA-003 and DBA-004 through release tag v0.4-dba004-merged |
| Prior controlled volume | [FCSB-023 — Performance and Scalability Architecture](./FCSB-Volume-23-Performance-and-Scalability-Architecture.md) |
| Next controlled volume | FCSB-025 — Product Roadmap and Future Vision |
| Approval | Pending Architecture Board, Product Governance, Engineering, Release Management, Security, Data Governance, Database Engineering, Operations, Quality Engineering, Domain Owners, Customer Success, Support and Internal Audit review |

> **Evidence discipline:** “Implemented foundation” is used only for a concrete reusable repository behavior or artifact linked in this volume. It does not mean that an enterprise release-management capability is complete. “Partial,” “Scaffold,” “Conceptual target architecture,” “Planned,” and “Future” remain distinct. This document authorizes no implementation, deployment, migration, customer rollout or production change.

## Status vocabulary

| Status | Meaning in this volume |
|---|---|
| Implemented foundation | Accepted repository evidence establishes a narrow reusable control or traceability foundation. |
| Partial | Working behavior exists, but the end-to-end product/release control is incomplete. |
| Scaffold | Metadata, route, script or development topology exists without the governed runtime described here. |
| Conceptual target architecture | A coherent target boundary is defined for review, with technology and delivery unapproved. |
| Planned | Controlled design work is required before implementation can start. |
| Future | Direction depends on later evidence, investment or technology selection. |

## Chapter 01 — Purpose and Scope

FCSB-024 governs how approved FlowCraft intent becomes a supportable product release without allowing source control, deployment tooling or customer urgency to replace architecture and business authority. It covers product capability decisions, release composition, compatibility, promotion, customer rollout, extension survival, migration, deprecation, operational handover and evidence retention across shared SaaS, dedicated cloud, private cloud, on-premises and hybrid deployments.

The product strategy is a budget-conscious manufacturing ERP with enterprise controls. That positioning depends on one governed product line that can accommodate industry, localization and customer variation through configuration and sealed extensions—not a separate source fork for every customer. Cost discipline therefore means reusable compatibility contracts, proportionate gates and automation-ready evidence, not weakened security, migration or reconciliation.

Out of scope are selecting CI/CD, registry, feature-flag, orchestration, telemetry, signing or release-portal products; setting real customer notice periods; inventing production capacity; or approving any release. Implementation remains subject to the owning FCSB domain, accepted engineering change and environment-specific authorization.

~~~mermaid
flowchart LR
  INTENT["Approved product intent"] --> ARCH["Controlled architecture"]
  ARCH --> CHANGE["Governed change"]
  CHANGE --> EVID["Implementation and assurance evidence"]
  EVID --> RC["Release candidate"]
  RC --> DEPLOY["Authorized deployment"]
  DEPLOY --> OPERATE["Supportable product capability"]
  OPERATE --> LEARN["Operational and customer evidence"]
  LEARN --> INTENT
~~~

## Chapter 02 — Executive Summary

FlowCraft currently proves manual source milestones, accepted tags, committed migration ancestry, repeatable builds/tests, narrow workflow publication immutability and audit foundations. It does not prove automated pipelines, immutable artifact promotion, branch protection, release gates, tenant rollout rings, package compatibility, upgrade automation, feature flags, deployment orchestration or a release evidence portal.

The target architecture separates four decisions. Product Governance decides why and for whom a capability should exist. Architecture authorities decide permitted boundaries and cross-domain consequences. Engineering and Quality establish what has been built and verified. Release Authority decides whether a fixed candidate, with environment and customer evidence, may be promoted. Operations executes approved deployment and recovery; domain owners retain business semantics throughout.

A release is accepted only when product, source, artifact, schema, configuration, extension, test, approval, environment and observed outcome identities can be traced together. A successful build, a green functional suite or a Git tag is necessary evidence in some release classes but never sufficient production authorization.

~~~mermaid
flowchart LR
  NEED["Approved customer outcome"] --> CHANGE["Versioned change set"]
  CHANGE --> SOURCE["Frozen source commit"]
  SOURCE --> ARTIFACT["Immutable artifact digest"]
  ARTIFACT --> MANIFEST["Release manifest"]
  MANIFEST --> DEPLOYMENT["Environment deployment record"]
  DEPLOYMENT --> OUTCOME["Observed business outcome"]
  CONTRACTS["Schema, API and extension contracts"] --> MANIFEST
  ASSURANCE["Test, security and migration results"] --> MANIFEST
  READINESS["Support and customer readiness"] --> DEPLOYMENT
~~~

## Chapter 03 — Source Authority and Current Baseline

The authority order is: approved governance decisions and controlled architecture; approved FCSB volumes; controlled FEAPB/framework material; accepted DBA milestones, migrations, tests and tags; repository README and implementation reports; then draft roadmaps. The repository contains no standalone controlled FEAPB source, so unresolved framework claims remain approval dependencies rather than inferred facts.

| Current evidence | Narrow interpretation | What it does not prove |
|---|---|---|
| Git commits, feature/documentation branches and tags through v0.4-dba004-merged | Manual milestone and source traceability foundation | Protected branches, required reviews, signed releases or deployed artifact identity |
| Root and workspace build/test scripts | Repeatable developer commands | CI execution, release gates, environment promotion or retained results |
| package-lock.json and declared package versions | Dependency-resolution baseline | Trusted registry policy, SBOM, provenance, signing or vulnerability SLA |
| Three committed Prisma migrations | Immutable accepted schema ancestry | Automated preflight, online migration safety, rollback automation or production execution |
| Dockerfiles and Compose services | Development build and topology scaffold | Production orchestration, canary, blue-green, autoscaling or customer installer |
| Workflow versions and immutable publication behavior | Versioned definition foundation | Workflow runtime, package promotion, in-flight migration engine or rollback |
| AuditLog with trace identifiers and redaction | Application audit foundation | Complete requirement-to-release lineage or deployment audit |
| Report, layout, custom-field, import and export metadata | Design and administrative scaffolds | Certified packages, compatibility engine, file distribution or customer extension runtime |
| API prefix /api/v1 | Versioned namespace foundation | Formal API compatibility policy, old-contract support or contract testing |

Repository evidence is linked in Chapter 46. Current-state statements in this volume are bounded to those artifacts even when earlier architecture defines a richer target.

~~~mermaid
flowchart LR
  GOV["Controlled governance"] --> FCSB["Approved FCSB"]
  FCSB --> FRAME["Controlled frameworks"]
  FRAME --> DBA["Accepted DBA milestones"]
  DBA --> REPO["Repository implementation evidence"]
  REPO --> REPORT["README and implementation reports"]
  REPORT --> DRAFT["Draft roadmaps and proposals"]
  REPO -. "governs current-state claims" .-> CURRENT["Current capability status"]
~~~

## Chapter 04 — Product and Release Principles

1. One governed core product line is preferred over customer-specific source forks.
2. Product value, domain semantics, architecture permission, implementation evidence and release authorization are separate decisions.
3. The same immutable artifact is promoted; environment configuration and secrets remain external.
4. Every release declares compatibility with schema, APIs, workflows, reports, integrations, mobile clients and extensions that it affects.
5. Tenant and organization isolation, authorization, audit, consistency and reconciliation are never relaxed for speed.
6. Released data identities and accepted migration history are preserved.
7. Rollback is not assumed after data effects; a tested forward fix or restore decision may be safer.
8. Customer deployment models alter operating responsibility, not product integrity.
9. Feature activation may be staged only through a governed control with ownership, expiry and kill behavior.
10. Deprecation precedes retirement except for an approved emergency security stop.
11. Evidence is fixed to the candidate; late changes create a new candidate.
12. Supportability and observability are release properties.
13. AI, mobile and integrations remain subordinate to the authoritative domain.
14. Exceptions are explicit, time-bounded and independently accepted.
15. Product governance measures outcomes and learns without rewriting historical evidence.

## Chapter 05 — Decision Rights and Governance Forums

| Forum or authority | Accountable decisions | Decisions explicitly excluded |
|---|---|---|
| Product Council | Product outcomes, portfolio priority, supported customer value and lifecycle investment | Technical design, security waiver or production execution |
| Architecture Board | Cross-volume architecture, compatibility policy, exceptions to architectural boundaries and technology direction | Sprint commitment or live incident command |
| Domain Governance | Business semantics, invariants, priority, reconciliation and acceptance of domain behavior | Platform mechanisms or release execution |
| Engineering Authority | Implementation design, code quality, dependency and build evidence | Product priority or self-approval of release risk |
| Quality Authority | Test strategy, evidence sufficiency, defect disposition recommendation | Business risk acceptance outside delegated policy |
| Security Authority | Threat, vulnerability, privacy and privileged-release decisions | Domain accounting or operational truth |
| Data and Migration Authority | Schema/data compatibility, migration safety, reconciliation and preservation | Application feature priority |
| Release Authority | Candidate freeze, gate disposition, environment promotion and release exception | Redefining product or domain semantics |
| Operations Authority | Deployment execution, runtime readiness, incident response and recovery | Altering release content during deployment |
| Customer Impact Forum | Rollout cohort, contractual coordination, communication and support readiness | Waiving core isolation, security or data integrity |
| Internal Audit | Independent control design/evidence review | Operational execution or business ownership |

Escalation follows the decision being contested. A schedule conflict goes to Product/Release Governance; a domain-semantic conflict goes to the domain authority; an unsafe cross-domain or technology boundary goes to the Architecture Board; a security veto goes to Security and the named risk acceptor. No forum can approve a decision outside its authority merely because the release date is near.

~~~mermaid
flowchart TD
  ISSUE["Release decision or conflict"] --> KIND{"Decision type"}
  KIND -->|Product value or priority| PC["Product Council"]
  KIND -->|Architecture or compatibility| AB["Architecture Board"]
  KIND -->|Business semantics| DG["Domain Governance"]
  KIND -->|Security or privacy| SG["Security Authority"]
  KIND -->|Schema or migration| DM["Data/Migration Authority"]
  KIND -->|Candidate promotion| RA["Release Authority"]
  KIND -->|Runtime execution| OP["Operations"]
  PC --> ESC["Recorded decision and evidence"]
  AB --> ESC
  DG --> ESC
  SG --> ESC
  DM --> ESC
  RA --> ESC
  OP --> ESC
~~~

## Chapter 06 — Product Ownership Model

Product ownership is layered. The Product Executive owns the commercial and strategic product outcome. Product Management owns capability discovery, supported customer need, lifecycle priority and release narrative. Each domain owner owns business semantics and acceptance criteria. Platform Product owns shared runtime and administration capabilities. Release Management owns the controlled candidate and calendar, not the content’s business meaning.

Customer requests enter one backlog with source, affected customer profile, expected outcome, regulatory or contractual context, urgency, workaround, adoption breadth and product-fit assessment. A request becomes core only when it benefits the governed product and has an owner for long-term support. Industry, localization or customer packages are considered when the need is legitimate but not universal. Unsupported forks are last-resort exceptions with reintegration and retirement plans.

| Product layer | Owner | Permitted variation |
|---|---|---|
| Core platform | Platform Product | Stable platform contracts, security and shared services |
| Core domain | Domain Product Owner | Governed business behavior common to supported customers |
| Industry package | Industry Product Owner | Sector-specific rules through exported domain contracts |
| Localization package | Localization Owner | Jurisdiction/language behavior with legal and domain review |
| Customer package | Customer Solution Owner | Tenant-specific configuration and sealed extensions |
| Partner adapter | Integration Product Owner | External contract adaptation without core-domain ownership |
| Experimental capability | Product Innovation Owner | Non-production evaluation until promoted or retired |

## Chapter 07 — Product Lifecycle

The controlled lifecycle applies to product capabilities, not only code. Idea records an observed need. Request establishes a stakeholder and desired outcome. Discovery validates users, process, product fit and alternatives. Assessment examines domain, architecture, security, data, operations, cost and customer impact. Architecture fixes boundaries and open decisions. Approval authorizes planning, not release. Implementation and testing produce evidence. Release Candidate freezes an exact composition. Release makes it available under a governed rollout. Maintenance supports it. Deprecation and Retirement close adoption and preserve obligations.

~~~mermaid
stateDiagram-v2
  [*] --> Idea
  Idea --> Request: sponsor and outcome named
  Request --> Discovery: product triage accepts
  Discovery --> Assessment: problem and users validated
  Assessment --> Architecture: cross-domain design required
  Assessment --> Rejected: product fit or value absent
  Architecture --> Approval: decisions and risks ready
  Approval --> Planning: authorities approve
  Planning --> Implementation: funded and scheduled
  Implementation --> Testing: fixed change available
  Testing --> ReleaseCandidate: gates satisfied
  Testing --> Implementation: evidence fails
  ReleaseCandidate --> Release: Release Authority approves
  ReleaseCandidate --> Implementation: candidate rejected
  Release --> Maintenance
  Maintenance --> Deprecation: replacement or end-of-life approved
  Deprecation --> Retirement: support window and migration complete
  Retirement --> [*]
  Rejected --> [*]
~~~

Each transition records actor, authority, evidence, decision time, affected version and next owner. A release can be withdrawn while the capability remains in Maintenance; a product idea can be rejected without deleting its discovery evidence.

## Chapter 08 — Product Capability Maturity Lifecycle

Existing FCSB status terms classify evidence maturity and must not be confused with product lifecycle or availability. “Implemented foundation” describes a reusable basis, not a generally available product. “Validated” means the defined evidence profile passed for a fixed version and environment. “Generally available” is a Product and Release decision with support, documentation and customer commitments.

~~~mermaid
stateDiagram-v2
  [*] --> Proposed
  Proposed --> Conceptual
  Conceptual --> Planned
  Planned --> Scaffold
  Scaffold --> Partial
  Partial --> ImplementedFoundation
  ImplementedFoundation --> Implemented
  Implemented --> Validated
  Validated --> LimitedAvailability
  LimitedAvailability --> GenerallyAvailable
  GenerallyAvailable --> Deprecated
  Deprecated --> Retired
  Proposed --> Rejected
  Conceptual --> Rejected
  Rejected --> [*]
  Retired --> [*]
~~~

| Maturity transition | Required authority | Minimum evidence |
|---|---|---|
| Conceptual to Planned | Product and Architecture | Outcome, scope, owner, dependencies and approved direction |
| Scaffold to Partial | Engineering and Product | Working bounded behavior, known gaps and source evidence |
| Partial to Implemented foundation | Architecture and Engineering | Reusable accepted control with tests and documented boundary |
| Implemented to Validated | Quality plus affected authorities | Fixed version, representative tests, security/data/operational evidence |
| Validated to Limited Availability | Release and Customer Impact | Supported cohort, monitoring, rollback/forward-fix and communications |
| Limited Availability to Generally Available | Product and Release | Adoption evidence, support model, known-risk disposition and compatibility |
| Generally Available to Deprecated | Product and Architecture | Replacement, impact inventory, support window and migration path |
| Deprecated to Retired | Product, Release and affected domains | Usage/consumer evidence, retained data/history and final communication |

## Chapter 09 — Change Classification and Intake

Every change receives a primary class and risk modifiers before planning. Classification controls evidence depth without allowing a small line count to disguise a high-impact semantic change.

| Change class | Examples | Required emphasis |
|---|---|---|
| Product capability | New planning, finance, quality or administration behavior | Product fit, domain ownership, architecture and adoption |
| Defect correction | Incorrect existing behavior | Reproduction, affected versions/data, regression and customer impact |
| Security correction | Vulnerability, secret exposure or policy defect | Exposure, exploitability, accelerated review, patch cohort and disclosure |
| Schema/data change | New relation, backfill, transformation or cleanup | Compatibility, lock/load, backup, reconciliation and forward recovery |
| Contract change | API, event, webhook, file, workflow or report contract | Consumer inventory, compatibility and deprecation |
| Configuration change | Environment or tenant setting | Scope, approval, drift, rollback and audit |
| Dependency/runtime update | Library, Node, PostgreSQL or base image | Supply chain, compatibility, performance and support |
| Documentation-only | Controlled architecture, runbook or customer guidance | Accuracy, authority, links and publication trace |
| Emergency operational change | Incident containment or urgent forward fix | Narrow scope, independent review, observation and retrospective |

Modifiers include tenant breadth, privilege, financial/inventory/manufacturing authority, data transformation, downtime, irreversible effect, integration surface, mobile lag, extension impact, AI model behavior, regulatory consequence and customer-managed execution.

~~~mermaid
flowchart LR
  IN["Request with sponsor and outcome"] --> CLASS["Classify change"]
  CLASS --> MOD["Apply risk and deployment modifiers"]
  MOD --> IMP["Identify consumers, data and customers"]
  IMP --> PATH{"Standard, expedited or reject?"}
  PATH -->|standard| DISC["Discovery and architecture"]
  PATH -->|expedited security/incident| FAST["Compressed but independent controls"]
  PATH -->|not product-aligned| REJ["Reject, defer or extension path"]
  DISC --> BACKLOG["Governed product backlog"]
  FAST --> BACKLOG
~~~

## Chapter 10 — Requirements and Architecture Gate

A candidate cannot repair an unresolved product or architecture decision. Before implementation, the change must identify the user/business outcome, capability owner, affected FCSB domains, acceptance criteria, compatibility promise, data and migration implications, security/privacy concerns, workload profile, observability need, deployment models, extension impact, documentation and support obligations.

Architecture depth is proportional to consequence. A UI label correction may need no ADR; changing ledger meaning, authorization scope, workflow state, report certification, API contract, migration strategy or extension boundary requires the owning architecture and domain decisions. The gate records open decisions that block implementation and those intentionally deferred with no claim of support.

| Gate outcome | Meaning |
|---|---|
| Approved | Boundaries and evidence profile are sufficient for controlled implementation |
| Approved with conditions | Named conditions must close before candidate freeze |
| Rework | Design or authority conflict remains |
| Deferred | Value may exist but prerequisite, funding or technology is absent |
| Rejected | Change conflicts with product strategy, authority or supportability |

## Chapter 11 — Release Architecture

A FlowCraft release is a governed composition of immutable application artifacts, migration range, approved configuration schema, controlled metadata/packages, compatibility declarations, documentation and release evidence. The release identity is distinct from a Git tag, container tag, deployment timestamp or customer activation; those are linked facts.

Release architecture separates build from deployment and deployment from activation. One release may be deployed to a shared SaaS environment and activated by tenant rings, while an on-premises customer installs the same supported version later. A customer extension can have its own package version but must declare the compatible core range.

~~~mermaid
flowchart TB
  REL["Product release identity"]
  ART["Artifact manifest and build identity"] --> REL
  MIG["Schema and migration range"] --> REL
  COMP["Compatibility profile"] --> REL
  CONF["Configuration schema"] --> REL
  EXT["Extension inventory"] --> REL
  EVID["Approved evidence bundle"] --> REL
  REL --> DEPLOY["Zero or more environment deployments"]
  DEPLOY --> ACT["Zero or more tenant/customer activations"]
  DEPLOY --> OBS["Deployment verification"]
  ACT --> USE["Available product capability"]
~~~

## Chapter 12 — Release Units and Release Trains

| Release unit | Purpose | Compatibility and approval boundary |
|---|---|---|
| Product release | Coordinated supported application baseline | Full cross-domain and deployment-profile gates |
| Release candidate | Frozen proposed product release | No content change without new candidate identity |
| Maintenance release | Compatible corrections and bounded improvements | Supported-version and regression evidence |
| Patch | Narrow corrective package without intended feature expansion | Affected-component and compatibility tests |
| Hotfix | Urgent correction to a supported release | Expedited independent review and retrospective |
| Emergency release | Time-critical security or operational containment | Minimum safe evidence; named executive/security/release risk acceptance |
| Security release | Vulnerability remediation or security control change | Security exposure, negative tests, supply-chain and disclosure controls |
| Schema/data migration release | Database/data transition that may accompany application code | Migration authority, backup, rehearsal and reconciliation |
| Integration release | API/event/file/adapter contract change | Consumer certification and partner rollout |
| Mobile release | Client package version coordinated with backend range | Store/distribution lag and minimum/maximum backend compatibility |
| AI release | Model/provider/prompt/policy/evaluation change | AI Governance, privacy, domain evaluation and fallback |
| Documentation-only release | Controlled blueprint, runbook or guidance | Document authority and link/integrity review |

A release train is a planning cadence, not permission to ship incomplete evidence. Changes may miss a train; emergency work may use an expedited path; customer-managed deployments may adopt supported releases on a different calendar. The train never forces unrelated migrations or customer extensions into one indivisible blast radius.

## Chapter 13 — Versioning Strategy

FlowCraft uses a governed semantic-versioning direction for product communication: major for intentionally breaking supported contracts or upgrade obligations, minor for backward-compatible capability, and patch for backward-compatible correction. Exact adoption remains Planned because current package versions and Git tags do not yet form a complete product-version policy.

| Versioned subject | Required identity and compatibility rule |
|---|---|
| Product | Public product version plus supported upgrade paths and deployment profiles |
| API | Contract major namespace/range; additive compatible changes within promise |
| Database schema | Ordered immutable migration ancestry and resulting schema baseline |
| Data transformation | Transformation code/version, source range, target range and reconciliation |
| Integration contract | Schema/event/file version, producer/consumer range and deprecation |
| Workflow definition | Stable definition plus immutable published version; instances pin a version |
| Report/KPI | Stable semantic identity plus formula, grain, source and certification version |
| Extension package | Namespace, version, core/API/schema dependency ranges and digest |
| Mobile client | Client version, backend compatibility window and forced-upgrade policy |
| AI capability | Use case, provider/model, prompt/policy, evaluation and fallback versions |
| Documentation baseline | Document code, version, status, date and supersession relation |

Version numbers do not prove compatibility. A declared patch that changes rounding, authorization, event meaning or report totals is breaking in effect and must be governed accordingly.

## Chapter 14 — Source-Control and Branch Governance

Current practice includes master, feature branches, a documentation branch and accepted tags. No repository evidence proves branch protection, required review counts, signed commits/tags, automated checks or release branches. The target model describes policy without misclassifying it as current.

| Branch/ref type | Target use | Control boundary |
|---|---|---|
| master | Accepted integrated source baseline | Protected; release intent still requires candidate evidence |
| development/integration branch | Optional coordinated pre-release integration | Must not become a hidden production baseline |
| feature branch | Bounded implementation change | Linked requirement, review, current base and disposable after merge |
| documentation branch | Controlled FCSB/document work | Cannot authorize application release |
| release branch | Optional stabilization of a supported candidate | Created only with ownership, support duration and merge-back policy |
| hotfix branch | Correction from exact supported release | Fix returns to maintained lines; no unrelated feature |
| tag | Immutable source milestone or release reference | Naming, target commit, signer/integrity direction and release record |
| customer fork | Prohibited default; exceptional controlled deviation | Architecture/Product approval, delta inventory, security updates and reintegration plan |

~~~mermaid
flowchart LR
  REQ["Approved change"] --> FEATURE["Feature branch"]
  FEATURE --> REVIEW["Peer and authority review"]
  REVIEW --> MAIN["Integrated baseline"]
  MAIN --> RC["Release candidate ref"]
  RC --> TAG["Controlled release tag"]
  TAG --> MAINT["Supported maintenance line"]
  MAINT --> HOTFIX["Hotfix from exact release"]
  HOTFIX --> TAG2["Patched release tag"]
  HOTFIX --> MERGEBACK["Merge correction to maintained successor"]
~~~

## Chapter 15 — Release Manifest and Traceability

The release manifest is the canonical index for one candidate. It records product/release version, class, source commit and tag, artifact digests, dependency and base-image inventory, migrations, configuration schema, API/integration/workflow/report/mobile/extension compatibility, feature activation, evidence bundle, approvals, deployment profiles, support state, known issues and recovery constraints.

~~~mermaid
sequenceDiagram
  participant Product
  participant Architecture
  participant Engineering
  participant Quality
  participant Release
  participant Operations
  Product->>Architecture: approved requirement and capability
  Architecture->>Engineering: decisions, constraints and evidence profile
  Engineering->>Quality: fixed commit, artifacts and migration range
  Quality->>Release: test, security, compatibility and reconciliation evidence
  Release->>Operations: approved manifest and environment plan
  Operations-->>Release: deployment identity and verification
  Release-->>Product: availability, adoption and operational outcome
~~~

Traceability is bidirectional. A defect found in production resolves to deployment, release, artifact, source, test and requirement. A requirement resolves forward to the customers/environments and versions where it is available. Audit records references rather than secrets, large binaries or customer data.

## Chapter 16 — Release Gate Model

| Gate | Accountable authority | Required disposition |
|---|---|---|
| Product requirement | Product Management | Outcome, audience, scope and lifecycle ownership accepted |
| Architecture | Architecture Board or delegated architect | Cross-volume boundaries, ADRs and open blockers resolved |
| Domain semantics | Affected Domain Owner | Business rules, authority and reconciliation accepted |
| Security/privacy | Security Authority | Threats, findings, data handling and exceptions accepted |
| Data/migration | Data and Migration Authority | Compatibility, preservation, backup and reconciliation accepted |
| API/integration | Integration Authority | Consumer range, contract tests, rollout and deprecation accepted |
| Workflow/report | Workflow or Reporting Authority | Version, in-flight or semantic/report consequences accepted |
| Performance/scalability | Performance Architecture | Representative result and capacity consequence accepted |
| Reliability/recovery | Operations Authority | Failure, rollback/forward-fix, backup and restore posture accepted |
| Quality | Quality Authority | Required functional, negative, regression and scenario evidence accepted |
| Documentation | Documentation/Product Governance | Manifest, notes, known issues and procedures complete |
| Customer readiness | Customer Impact Forum | Cohort, communication, support and contractual coordination accepted |
| Final release | Release Authority | Fixed candidate and all gate/exception evidence approved |

A gate may be Not Applicable only with rationale and owner. Waived means a known requirement is not met and therefore needs exception authority, expiry and compensating control. “Passed” without evidence identity, environment and date is invalid.

~~~mermaid
flowchart TD
  CAND["Frozen release candidate"] --> GATES["Independent gate evaluations"]
  GATES --> CLEAR{"All required gates passed?"}
  CLEAR -->|yes| APPROVE["Release Authority approval"]
  CLEAR -->|no, remediable| FIX["New change and candidate"]
  CLEAR -->|exception requested| EX["Time-bounded risk acceptance"]
  EX --> ACCEPT{"Authorized and within policy?"}
  ACCEPT -->|yes| APPROVE
  ACCEPT -->|no| FIX
  APPROVE --> PROMOTE["Environment/customer promotion"]
~~~

## Chapter 17 — Evidence-Based Release Readiness

Evidence is candidate-specific, reproducible and retained. The bundle can include approved requirements and ADRs; source review; build records; artifact identity; dependency/SBOM direction; schema and migration scripts; automated and manual test results; threat and privacy assessment; vulnerability disposition; performance results; compatibility matrices; backup/restore and rollback/forward-fix rehearsal; UAT; release notes; runbooks; support handover and communication approvals.

The repository currently contains source tests and implementation reports but no automated release evidence store. Links to local logs or screenshots are not durable release evidence unless controlled, immutable enough for the decision and free of secrets/customer data.

| Evidence property | Acceptance question |
|---|---|
| Identity | Is the evidence tied to the exact source, artifact, schema, configuration and test data version? |
| Authority | Did the correct owner create or approve it? |
| Reproducibility | Can the result be repeated from retained inputs and instructions? |
| Representativeness | Does the environment, data shape, tenant scope and workload match the risk? |
| Completeness | Are failures, exceptions and excluded scope visible? |
| Integrity | Can substitution or silent modification be detected? |
| Freshness | Did a later change invalidate the conclusion? |
| Privacy/security | Does the evidence avoid secrets and uncontrolled production/customer data? |

## Chapter 18 — Environment Promotion Architecture

Local, Development, Test, QA, Staging, UAT and Production are distinct control purposes even when a smaller customer combines physical infrastructure. Promotion moves the same artifact identity with separately approved environment configuration; it does not copy secrets or casually promote databases.

~~~mermaid
sequenceDiagram
  participant Build
  participant Dev
  participant Test
  participant QA
  participant Stage
  participant UAT
  participant Prod
  Build->>Dev: immutable candidate artifact
  Dev-->>Test: developer verification plus artifact digest
  Test-->>QA: functional and contract evidence
  QA-->>Stage: fixed candidate and migration plan
  Stage-->>UAT: production-like rehearsal evidence
  UAT-->>Prod: business acceptance and release approval
  Prod-->>Build: deployment record, observed outcome and lessons
~~~

| Environment | Data rule | Promotion purpose |
|---|---|---|
| Local | Synthetic/demo only | Developer feedback and isolated experimentation |
| Development | Synthetic or governed fixtures | Integrated behavior and early compatibility |
| Test | Repeatable versioned fixtures | Automated functional and contract evidence |
| QA | Representative synthetic/masked data | Independent regression, security and exploratory evidence |
| Staging | Production-like configuration and scale shape, separate secrets | Deployment, migration, monitoring and recovery rehearsal |
| UAT | Approved representative business scenarios | Domain/customer acceptance without production authority |
| Production | Authoritative customer data | Approved business operation under support and monitoring |

## Chapter 19 — Build, Artifact, Configuration, Secrets and Data Separation

A build consumes reviewed source and locked dependencies and produces an environment-neutral artifact with identity and integrity evidence. Configuration selects approved behavior within a schema. Secrets provide credentials or cryptographic material through an environment control plane. Data is customer or environment state. Deployment installs an artifact and binds configuration; activation exposes capability to a permitted cohort. Mixing these concerns makes promotion irreproducible and rollback ambiguous.

| Concern | May enter artifact? | Promotion rule |
|---|---|---|
| Compiled application and static resources | Yes | Built once; digest retained |
| Dependency/runtime contents | Yes | Locked, inventoried and scanned under target policy |
| Environment endpoints and limits | No | Versioned configuration validated per environment |
| Secrets, keys and certificates | Never | Referenced from approved secret custody; rotated independently |
| Tenant/customer business configuration | No | Governed configuration or package with separate lifecycle |
| Database/customer data | Never | Migrated or preserved through data controls, not artifact copying |
| Release evidence | Referenced, not embedded as mutable truth | Stored with release identity and access policy |

~~~mermaid
flowchart TB
  SOURCE["Reviewed source + lockfile"] --> BUILD["Controlled build"]
  BUILD --> ART["Immutable artifact + digest"]
  CFG["Versioned environment configuration"] --> DEP["Deployment binding"]
  SEC["Secret references"] --> DEP
  ART --> DEP
  DATA["Existing environment data"] --> MIG["Approved migration"]
  MIG --> DEP
  DEP --> VERIFY["Version, config, data and health verification"]
~~~

## Chapter 20 — Deployment Model Profiles

The supported product version and compatibility rules are common; responsibility, cadence and allowable deployment strategy differ by model.

| Model | FlowCraft release responsibility | Customer/operator responsibility | Governance consequence |
|---|---|---|---|
| Shared SaaS | Build, platform deployment, tenant-safe rollout, monitoring and rollback/forward-fix | Business readiness, tenant configuration and domain validation where requested | Fast common cadence with rings and strict cross-tenant controls |
| Dedicated cloud | Supported artifact and agreed managed deployment | Account/network/data responsibilities per contract | Customer-specific window without source divergence |
| Private cloud | Supported artifacts, prerequisites and application guidance | Platform operations, access, backup and execution unless contracted | Evidence exchange and environment certification are mandatory |
| On-premises | Supported installer/artifact direction, upgrade path and support matrix | Hardware/platform, backup, execution, logs and local integrations | Longer supported-version overlap and preflight tooling direction |
| Hybrid | Application and cross-boundary compatibility guidance | Split infrastructure and integration operation | Joint cutover, connectivity fallback and traceability |
| Customer cloud | Product artifacts and supported architecture | Landing zone, platform controls and execution | Shared-responsibility RACI controls gate support |

A deployment profile never authorizes a weaker product security or destructive migration. When an on-premises constraint prevents a required control, the issue becomes an explicit support or product decision rather than an undocumented local patch.

## Chapter 21 — Shared SaaS Multi-Customer Release

A shared SaaS release is deployed once but affects many tenant contexts. Candidate evidence must include tenant isolation, organization scope, representative tenant sizes, background work, integration behavior and data-shape compatibility. Rollout rings limit exposure only when telemetry can identify tenant and version without leaking identity.

~~~mermaid
sequenceDiagram
  participant Release
  participant Platform
  participant InternalRing
  participant PilotTenants
  participant GeneralTenants
  Release->>Platform: approve fixed candidate and stop criteria
  Platform->>InternalRing: deploy and activate
  InternalRing-->>Platform: technical and business probes
  Platform->>PilotTenants: enable approved cohort
  PilotTenants-->>Release: tenant-safe outcome and support evidence
  Release->>GeneralTenants: authorize broader activation
  GeneralTenants-->>Release: adoption, incidents and KPI observation
~~~

The ring plan declares tenant selection, excluded high-risk calendars, schema compatibility, feature state, monitoring, maximum exposure, pause/kill action, data correction and customer communication. A shared database migration may precede activation only when old and new application paths remain compatible or a coordinated maintenance window is approved.

## Chapter 22 — Dedicated-Cloud Customer Upgrade

A dedicated customer has an isolated environment and may select a supported window, but it does not receive an ungoverned build. Upgrade planning inventories exact current version, database ancestry, extensions, integrations, reports, workflows, identity provider, capacity, backup and local operating responsibilities.

~~~mermaid
sequenceDiagram
  participant Customer
  participant CustomerSuccess
  participant Release
  participant Operator
  Customer->>CustomerSuccess: request supported target and window
  CustomerSuccess->>Release: current inventory and business constraints
  Release->>Operator: validated upgrade plan and evidence profile
  Operator->>Customer: rehearsal, backup and cutover confirmation
  Customer-->>Release: UAT and downtime acceptance
  Release->>Operator: authorize exact artifacts and migrations
  Operator-->>Customer: verification, reconciliation and support handover
~~~

Customer-specific timing is allowed; customer-specific source behavior is not. If a local requirement needs an extension, it follows Chapter 27 and carries its own compatibility evidence.

## Chapter 23 — Private-Cloud and On-Premises Release

Customer-operated environments require a support contract based on evidence, not assumptions of platform control. The release package direction includes prerequisites, version inventory command, configuration schema, checksum/integrity direction, preflight, migration procedure, backup/restore requirement, validation, rollback/forward-fix, diagnostics bundle and support escalation.

~~~mermaid
sequenceDiagram
  participant FlowCraft
  participant CustomerRelease
  participant CustomerOps
  participant CustomerBusiness
  FlowCraft->>CustomerRelease: supported artifact, manifest and prerequisites
  CustomerRelease->>CustomerOps: environment and backup preflight
  CustomerOps-->>FlowCraft: sanitized compatibility result
  CustomerBusiness->>CustomerRelease: UAT and cutover approval
  CustomerRelease->>CustomerOps: authorized install steps
  CustomerOps-->>FlowCraft: version, migration and verification evidence
  FlowCraft-->>CustomerBusiness: support status and known limitations
~~~

An older version may remain supported until its declared end. FlowCraft must publish the supported upgrade graph and security constraints; the customer must not skip required intermediate migrations or conceal local forks. Diagnostics sent to FlowCraft are minimized and scrubbed of secrets and uncontrolled business data.

## Chapter 24 — Hybrid Deployment Release

Hybrid release governance treats network, identity, contract, data consistency and recovery across boundaries as one change. The plan names which side leads each step, how version skew is tolerated, what continues offline, which messages are replayed, how duplicates are prevented and how cross-system totals reconcile.

~~~mermaid
flowchart LR
  CORE["FlowCraft release"] --> CONTRACT["Cross-boundary contract range"]
  EDGE["Customer/edge component"] --> CONTRACT
  CONTRACT --> CONNECT["Connectivity and identity preflight"]
  CONNECT --> CUT["Coordinated deployment sequence"]
  CUT --> BUFFER["Buffer/retry behavior"]
  BUFFER --> REC["End-to-end reconciliation"]
  REC --> SUPPORT["Joint support handover"]
~~~

A hybrid cutover cannot declare success solely because both endpoints are healthy. The business exchange—orders, receipts, production events, files or identity assertions—must complete or be visibly pending with an owner.

## Chapter 25 — Tenant Rings, Canary and Staged Activation

Deployment, exposure and business activation are separate. A ring may be internal, synthetic, employee tenant, consenting pilot, low-risk customer cohort, regional cohort or general availability. Selection must avoid biased “easy” tenants that conceal data size, localization, integration or workflow risk.

~~~mermaid
stateDiagram-v2
  [*] --> DeployedInactive
  DeployedInactive --> InternalRing: technical enablement
  InternalRing --> PilotRing: stop criteria clear
  PilotRing --> ExpandedRing: business and support evidence accepted
  ExpandedRing --> GeneralAvailability: Release Authority approves
  InternalRing --> Paused: breach
  PilotRing --> Paused: breach
  ExpandedRing --> Paused: breach
  Paused --> RolledBack: compatible rollback
  Paused --> ForwardFix: data/effect requires correction
  RolledBack --> [*]
  ForwardFix --> InternalRing
  GeneralAvailability --> [*]
~~~

Canary concepts remain Planned because the repository has no routing, feature-flag or tenant-rollout runtime. Ring evidence includes version, feature state, tenant cohort, traffic/workload, errors, latency, domain invariants, support contacts and stop decision.

## Chapter 26 — Feature Release Control

Feature flags, entitlement checks, tenant rollout settings and kill switches can decouple artifact deployment from capability availability. They are not substitutes for versioning, migration safety or authorization. Current repository roles and metadata flags do not constitute a governed feature-flag platform.

| Control type | Intended use | Required safeguard |
|---|---|---|
| Release flag | Temporary staged exposure of compatible code | Owner, default, expiry and removal work |
| Operational kill switch | Disable optional unsafe or overloaded behavior | Tested safe-off path and audit |
| Product entitlement | Contracted module eligibility | Server-side authorization and billing/product ownership |
| Tenant configuration | Stable supported behavior choice | Typed schema, compatibility and change audit |
| Experiment flag | Product learning in approved cohort | Consent/privacy, unbiased analysis and no domain-truth variation |
| Migration switch | Controlled read/write transition | Explicit schema state, dual-write reconciliation and irreversible boundary |

Flags affecting posting, inventory, production release, quality disposition, payment, authorization or audit require the owning domain and Security; they cannot silently create two definitions of business truth.

## Chapter 27 — Customization Boundary

FlowCraft distinguishes core source, supported configuration, metadata, workflows, reports, extension packages, integration adapters, custom modules and unsupported forks.

| Variation type | Upgrade expectation | Authority |
|---|---|---|
| Core configuration | Preserved within declared schema and default changes | Product/domain owner |
| Tenant metadata | Validated and migrated through governed metadata contracts | Platform plus metadata owner |
| Workflow definition | Version-pinned; new instances use compatible published version | Workflow/domain owner |
| Customer report | Revalidated against semantic/source contract | Reporting plus source domain |
| Integration adapter | Versioned against external and FlowCraft contracts | Integration |
| Extension package | Declared core/export dependency range and tests | Product/Architecture/Security |
| Custom module | Supported only through approved APIs and extension points | Module owner plus Architecture |
| Source fork | Unsupported default; exception with delta and reintegration plan | Product Council and Architecture Board |

Core fixes must not overwrite customer-owned configuration. Conversely, customer configuration cannot override tenant isolation, permissions, ledger logic, inventory authority, audit, legal retention or sealed domain invariants.

~~~mermaid
flowchart TB
  CORE["Sealed core product"] --> EXPORTED["Versioned extension points"]
  EXPORTED --> CONFIG["Typed configuration"]
  EXPORTED --> META["Governed metadata"]
  EXPORTED --> WF["Workflow package"]
  EXPORTED --> REPORT["Report package"]
  EXPORTED --> ADAPTER["Integration adapter"]
  EXPORTED --> MODULE["Customer/industry module"]
  FORK["Direct core fork"] -. "exception only" .-> CORE
~~~

## Chapter 28 — Module Builder Governance

The Module Builder vision from FCSB-012 is a target design, not current runtime. A module release declares namespace, publisher, version, capabilities, exported and imported contracts, permissions, configuration schema, workflow/report/integration artifacts, migration requirements, dependencies, compatibility range, tests, integrity evidence, installation behavior and retirement constraints.

~~~mermaid
sequenceDiagram
  participant Builder
  participant Validator
  participant Domain
  participant Security
  participant Release
  participant Runtime
  Builder->>Validator: module source metadata and manifest
  Validator->>Domain: exported behavior and invariants
  Validator->>Security: permissions, data and extension surface
  Domain-->>Release: semantic approval
  Security-->>Release: control approval
  Release->>Runtime: approved immutable module package
  Runtime-->>Release: install, compatibility and activation evidence
~~~

An extension point is a contract, not a private implementation hook. Dependency resolution must reject cycles, missing peers and incompatible core ranges before install. Customer administrators may configure permitted tenant packages but cannot publish core/domain modules or self-approve elevated permissions.

## Chapter 29 — Workflow Release Governance

Workflow definitions retain stable identity and immutable published versions. New instances select the effective version; existing instances normally finish on their pinned version. A core release that changes invoked commands, variables, approvals, timers or permissions must inventory active workflow versions and certify compatibility.

~~~mermaid
sequenceDiagram
  participant Designer
  participant WorkflowOwner
  participant Release
  participant Runtime
  participant ActiveInstance
  Designer->>WorkflowOwner: validated definition version
  WorkflowOwner->>Release: approval, tests and migration rule
  Release->>Runtime: publish/activate for new instances
  Runtime->>ActiveInstance: retain pinned prior version
  Release->>ActiveInstance: exceptional migration plan if required
  ActiveInstance-->>Release: mapped state, reconciliation or incident
~~~

Rollback of a workflow release may mean reactivating a prior version for new instances; it does not rewrite completed history or automatically move active instances backward. Migration of in-flight work is exceptional and preserves completed approvals, deadlines, state mapping and audit.

## Chapter 30 — Report and Analytics Release Governance

A report release can change business meaning without changing a database table. Every standard or customer report declares owner, source/dataset, grain, filters, formula/KPI versions, currency/UOM/as-of behavior, security, certification, output compatibility, performance class and deprecation.

~~~mermaid
sequenceDiagram
  participant Reporting
  participant SourceDomain
  participant Finance
  participant Data
  participant Release
  Reporting->>SourceDomain: proposed source and semantic change
  SourceDomain-->>Data: authoritative field/grain confirmation
  Data-->>Reporting: lineage and reconciliation result
  Reporting->>Finance: financial meaning when applicable
  Finance-->>Release: certification or rejection
  Release->>Reporting: publish version and supersession relation
~~~

A schema rename must not silently alter a custom report. Compatibility analysis identifies report dependencies; an adapter/read model, report migration or explicit break may be required. Historical certified output retains its definition and source/as-of identity.

## Chapter 31 — API and Integration Compatibility

API, event, webhook and file changes are governed from the consumer’s perspective. Additive fields are compatible only when consumers tolerate unknown fields and optionality. Enum expansion, precision, ordering, error, retry and pagination changes can be breaking even if the transport schema still validates.

~~~mermaid
sequenceDiagram
  participant Producer
  participant ContractRegistry
  participant OldConsumer
  participant NewConsumer
  participant Release
  Producer->>ContractRegistry: proposed version and compatibility class
  ContractRegistry->>OldConsumer: producer-to-old-consumer tests
  OldConsumer-->>Release: compatibility evidence
  NewConsumer->>Producer: old-producer-to-new-consumer tests
  Producer-->>Release: behavior and error evidence
  Release->>ContractRegistry: publish, deprecate or reject
~~~

The current /api/v1 prefix is a foundation, not a formal version-support promise. Breaking changes require a new supported contract, consumer inventory, migration guidance, adoption observation and retirement authority. Integration adapters preserve idempotency and reconciliation across version overlap.

## Chapter 32 — Database Schema and Migration Governance

Accepted migrations are immutable. A release declares exact migration ancestry and target. Expand-and-contract is preferred: add compatible structures, deploy code that tolerates both states, backfill in bounded restartable units, validate, switch consumers, and remove obsolete structures only in a later release.

~~~mermaid
stateDiagram-v2
  [*] --> Preflight
  Preflight --> BackupReady: ancestry, space and locks accepted
  BackupReady --> Rehearsed: representative-copy migration
  Rehearsed --> Authorized: results and reconciliation approved
  Authorized --> Applying
  Applying --> Validating
  Validating --> Complete: schema/data/business checks pass
  Applying --> Failed: error or stop threshold
  Validating --> Failed: mismatch
  Failed --> ForwardFix: data effects make rollback unsafe
  Failed --> RestoreDecision: approved recovery threshold
  ForwardFix --> Validating
  RestoreDecision --> Validating
  Complete --> [*]
~~~

Rollback is not promised for destructive or transforming changes. The release plan states the last reversible point, backup/restore prerequisites, acceptable lost-work consequence, forward-fix path and customer/business authority. Large manufacturing history requires lock, I/O, WAL/storage, duration, checkpoint and reconciliation evidence under FCSB-023 workload governance.

## Chapter 33 — Historical Data Compatibility

Upgrades preserve the interpretability of historical master, transaction, financial, inventory, manufacturing, quality, maintenance, audit and imported legacy records. New rules normally apply prospectively; historical records retain the versioned rates, UOM, workflow, report, costing, status and source identity needed to explain prior outcomes.

| Data concern | Preservation rule |
|---|---|
| Master data | Stable identity and effective history remain resolvable |
| Financial records | Posted amounts, currencies, rates, account effects and certification cannot be silently recalculated |
| Inventory/manufacturing | Quantity, UOM, batch/serial and genealogy evidence remains reconciled |
| Workflow approvals | Completed decisions retain definition/policy version and actor evidence |
| Reports | Historical certified output remains attributable to formula/source version |
| Audit | Release and migration do not rewrite or orphan append-only evidence |
| Legacy imports | Source key, mapping/transformation version and accepted exception remain discoverable |

When a new algorithm must reinterpret history, it produces an explicit derived version or correction under domain governance rather than overwriting the original fact.

## Chapter 34 — ERP Migration and Cutover Governance

Migration from another ERP is a program release with source assessment, data ownership, profiling, mapping, transformation, cleansing, trial loads, reconciliation, delta/freeze, cutover, fallback and post-go-live evidence. Current master-data import metadata and dry-run behavior are a partial foundation, not a migration platform.

~~~mermaid
flowchart LR
  ASSESS["Source inventory and authority"] --> PROFILE["Profile quality, volume and dependencies"]
  PROFILE --> MAP["Versioned mapping and transformation"]
  MAP --> TRIAL["Repeatable trial loads"]
  TRIAL --> RECON["Counts, amounts, quantities and samples"]
  RECON --> UAT["Domain and customer acceptance"]
  UAT --> FREEZE["Freeze/delta and cutover decision"]
  FREEZE --> CUT["Controlled production cutover"]
  CUT --> VERIFY["Operational, financial and interface verification"]
  VERIFY --> CLOSE["Evidence retention and source retirement decision"]
  VERIFY -. "fallback boundary" .-> FALL["Fallback or forward recovery"]
~~~

Opening balances and open transactions enter through governed domain interfaces and reconcile to source statements/control totals. The fallback plan distinguishes returning to the legacy system before irreversible new work from forward recovery after FlowCraft has accepted authoritative business transactions.

## Chapter 35 — Security Patch and Emergency Release

Security releases begin with affected-version and exposure analysis. Severity alone does not determine response; exploitability, tenant reach, privilege, data class, financial/manufacturing impact, available mitigation and deployment model shape urgency. Emergency handling compresses elapsed time, not independent review or artifact identity.

~~~mermaid
sequenceDiagram
  participant Security
  participant Engineering
  participant Quality
  participant Release
  participant Operations
  participant Customers
  Security->>Engineering: validated finding and affected versions
  Engineering->>Quality: narrow fix and regression surface
  Quality-->>Security: security/negative and compatibility evidence
  Security->>Release: remediation and residual-risk decision
  Release->>Operations: emergency manifest, cohort and recovery
  Operations-->>Customers: deployment/support communication as governed
  Operations-->>Security: verification and exposure closure
~~~

A hotfix branches from the exact supported release, includes no unrelated feature and returns to maintained successor lines. Customer disclosure, regulatory communication and patch deadlines follow approved policy and contracts; this volume invents no universal period.

## Chapter 36 — AI Capability Release Governance

No AI runtime exists. A future AI release binds a use case and risk tier to provider/model, route, prompt/policy, retrieval sources, evaluation dataset, thresholds, privacy/residency, cost budget, human oversight, fallback, kill switch and monitoring. Provider-side silent model changes are incompatible with governed behavior unless the route is pinned or re-evaluated.

~~~mermaid
stateDiagram-v2
  [*] --> ProposedUseCase
  ProposedUseCase --> DataPrivacyReview
  DataPrivacyReview --> Evaluating
  Evaluating --> ApprovedCandidate: quality, safety and cost thresholds met
  Evaluating --> Rejected: threshold or authority failure
  ApprovedCandidate --> LimitedRelease
  LimitedRelease --> Monitored
  Monitored --> GeneralUse: domain and AI Governance approve
  Monitored --> Disabled: drift, incident or provider change
  Disabled --> Evaluating: new model/prompt/policy
  GeneralUse --> Retired
  Rejected --> [*]
  Retired --> [*]
~~~

AI never becomes release authority, domain approver or autonomous controller of ledger, stock, quality release, production release, privilege or safety. Manual operation remains available when advisory AI is disabled.

## Chapter 37 — Mobile Release Compatibility

The repository has no accepted mobile client or synchronization runtime. The target policy treats backend and mobile versions as independently distributed because app-store, managed-device and offline delays create unavoidable skew.

~~~mermaid
sequenceDiagram
  participant MobileOld
  participant Backend
  participant MobileNew
  participant Release
  MobileOld->>Backend: supported prior contract and sync protocol
  Backend-->>MobileOld: compatible response or governed upgrade-required state
  MobileNew->>Backend: new capability negotiation
  Backend-->>MobileNew: compatible feature set and receipts
  Release->>Backend: minimum/maximum client range
  Release->>MobileOld: warning, deadline or blocked-risk policy
~~~

A mobile release declares protocol, command, receipt, delta, conflict and local-data schema compatibility. Forced upgrade is exceptional where continued operation creates security or data-integrity risk; offline users need an explicit pending-command and recovery path rather than silent data loss.

## Chapter 38 — Deprecation and Retirement

Deprecation records the affected capability or contract, replacement, first deprecated version, supported window, consumer/customer inventory, migration guide, usage observation, data/retention consequence, security posture, communication owner and final removal authority.

~~~mermaid
stateDiagram-v2
  [*] --> Supported
  Supported --> Deprecated: replacement and plan approved
  Deprecated --> MigrationAvailable
  MigrationAvailable --> AdoptionObserved
  AdoptionObserved --> RetirementReady: remaining use accepted or zero
  RetirementReady --> Retired: Product and Release approve
  Deprecated --> EmergencyDisabled: active security harm
  EmergencyDisabled --> Retired
  Retired --> ArchivedEvidence
  ArchivedEvidence --> [*]
~~~

Removal does not erase historical identity or data needed to interpret past transactions, workflows, reports, integrations or audits. An API may stop accepting new traffic while retained records remain readable through a supported historical path.

## Chapter 39 — Rollback, Forward Fix and Recovery

Rollback restores a prior compatible application/configuration state. Forward fix applies a new correction to the current state. Restore recovers data from backup and is an operational disaster/recovery action with potential lost work. Compensation creates explicit business corrections. These are different controls.

~~~mermaid
flowchart TD
  FAIL["Release verification failure"] --> EFFECT{"Authoritative data/effects changed?"}
  EFFECT -->|no| COMPAT{"Prior artifact compatible?"}
  COMPAT -->|yes| ROLLBACK["Reactivate prior artifact/config"]
  COMPAT -->|no| FORWARD["Forward fix"]
  EFFECT -->|yes| REV{"Changes safely reversible?"}
  REV -->|yes, approved| COMP["Compensating/forward migration"]
  REV -->|no| DECIDE{"Restore threshold and business authority?"}
  DECIDE -->|restore| RESTORE["Restore and reconcile lost interval"]
  DECIDE -->|retain state| FORWARD
  ROLLBACK --> VERIFY["Technical and business verification"]
  FORWARD --> VERIFY
  COMP --> VERIFY
  RESTORE --> VERIFY
~~~

A failed application release after an additive migration may roll back application code only if the prior version tolerates the expanded schema. Once customer transactions use a new required data shape, deleting the column is not rollback. Evidence and incident history are always retained.

## Chapter 40 — Release Observability

Release observability joins deployment signals to user and business outcomes. Target telemetry includes candidate and artifact version, environment, deployment phase, migration step, feature/ring state, error and latency, saturation, failed jobs, integration failures, mobile sync, security events, report anomalies and domain control totals. Tenant labeling is protected and bounded.

| Signal | Release question |
|---|---|
| Deployment status | Did each artifact/configuration instance reach the intended version? |
| Migration status | Which step, rows and reconciliation state are complete? |
| Error/latency/resource | Did the release breach FCSB-023 objectives or capacity reserve? |
| Background/integration work | Are queues, retries, oldest age and partner outcomes healthy? |
| Business invariants | Are postings, stock, production, workflow and report totals consistent? |
| Security | Did denials, privilege, exports or vulnerable components change unexpectedly? |
| Customer/support | Which cohorts report failure, confusion or adoption blockers? |

No APM, tracing, release dashboard or automated rollback exists today. Health endpoints and audit traces are narrow foundations only.

## Chapter 41 — Release Documentation and Communication

Every applicable release provides a manifest, release notes, change log, known issues, fixed defects, security advisory direction, prerequisites, migration notes, compatibility matrix, configuration changes, deployment runbook, validation steps, rollback/forward-fix plan, operational handover, support matrix and customer communication.

Documentation distinguishes user-visible change from operator action and developer detail. Financial, inventory, manufacturing, quality, workflow and reporting changes explain semantic consequences to the accountable domain audience. Security-sensitive details are distributed through an appropriate controlled channel rather than public notes.

~~~mermaid
flowchart LR
  MAN["Release manifest"] --> NOTES["User and operator release notes"]
  MAN --> COMP["Compatibility matrix"]
  MAN --> MIG["Migration and recovery guide"]
  MAN --> RUN["Deployment and validation runbook"]
  MAN --> KNOWN["Known issues and exceptions"]
  MAN --> COMM["Customer/support communication"]
  MAN --> AUDIT["Retained approval and evidence index"]
~~~

## Chapter 42 — Support and Operational Handover

Handover occurs before production authorization. Operations and Support receive supported versions, deployment/customer inventory, health and verification procedures, alerts, known failure modes, runbooks, data/migration state, feature/ring state, escalation owners, vendor/partner dependencies, diagnostic collection rules and customer communications.

~~~mermaid
sequenceDiagram
  participant Release
  participant Operations
  participant Support
  participant Domain
  participant CustomerSuccess
  Release->>Operations: manifest, runbook and recovery constraints
  Release->>Support: known issues, diagnostics and version matrix
  Release->>Domain: semantic change and reconciliation procedures
  Release->>CustomerSuccess: cohort and communication plan
  Operations-->>Release: readiness acceptance
  Support-->>Release: case and escalation readiness
  Domain-->>Release: business-verification readiness
~~~

A release is not operationally ready if the only troubleshooting path requires a developer with production database access. Diagnostic bundles must be versioned, privacy-safe and sufficient for customer-managed deployments.

## Chapter 43 — Release Metrics and KPIs

Metrics evaluate governance and product outcomes; they do not create quotas that encourage unsafe batching or hidden defects.

| Indicator | Definition direction | Decision use |
|---|---|---|
| Deployment frequency | Authorized production deployments by profile and class | Understand delivery cadence, not reward volume |
| Lead time | Approved change to production availability | Identify wait and rework while preserving gates |
| Change failure rate | Releases requiring rollback, forward fix, incident or material correction | Improve test, architecture and rollout |
| Rollback/forward-fix rate | Recovery path by release class | Expose irreversible-change and compatibility quality |
| Hotfix frequency | Urgent corrections per supported line | Detect release-quality or support debt |
| Escaped defects | Customer/production defects by severity and origin | Improve evidence profile and prevention |
| Security remediation time | Validated exposure to verified closure | Govern risk-based response |
| Migration failure rate | Failed/paused/reconciled migration executions | Improve preflight and data controls |
| Release exception count/age | Open waivers by risk, owner and expiry | Prevent permanent bypass |
| Adoption and version lag | Active customers/tenants/clients by supported version | Plan support, deprecation and communication |
| Extension compatibility rate | Installed extensions passing target upgrade | Protect no-fork strategy |
| Release-induced business anomaly | Domain control or KPI deviation attributable to release | Detect semantic regressions |

No current measured values are claimed. Measurement definitions, collection technology and service-level targets remain Planned.

## Chapter 44 — Release Exceptions and Waivers

An exception identifies the unmet control, reason, affected release/version/customer/environment, risk condition and consequence, compensating controls, owner, independent approver, start, expiry, monitoring, remediation commitment and closure evidence. It cannot waive tenant isolation, conceal an irreversible migration or transfer domain authority.

Emergency approval expires after the incident window and triggers retrospective review. Repeated exceptions indicate architecture, capacity or process debt and are escalated to Product Council and Architecture Board rather than renewed automatically.

~~~mermaid
stateDiagram-v2
  [*] --> Requested
  Requested --> Assessed
  Assessed --> Rejected: authority or risk unacceptable
  Assessed --> ApprovedTemporary: compensating control and expiry
  ApprovedTemporary --> Monitored
  Monitored --> Closed: control restored and evidence accepted
  Monitored --> Expired: deadline reached
  Expired --> Escalated
  Escalated --> Closed
  Rejected --> [*]
  Closed --> [*]
~~~

## Chapter 45 — Customer Impact and Change Communication

Customer impact governance inventories who is affected, deployment model, current supported version, local extensions/integrations, business calendar, required downtime, training, data effect, security urgency, contractual coordination, support language and acknowledgment. Communication is factual about capability, limitation, action, timing, risk and recovery without exposing other tenants or sensitive vulnerability detail.

Manufacturing and finance calendars matter: a release should not casually overlap period close, physical count, production peak, regulatory filing or migration cutover. The Customer Impact Forum recommends cohorts and windows; it cannot override a Security stop, domain reconciliation requirement or Release Authority decision.

| Communication class | Audience | Required content |
|---|---|---|
| Advance release notice | Affected administrators/business owners | Version, availability, action, compatibility and support window |
| Maintenance/cutover notice | Operators and users | Window, expected effect, fallback and status channel |
| Security advisory | Authorized customer security contacts | Affected versions, mitigation, patch path and disclosure handling |
| Deprecation notice | Consumers and owners | Replacement, migration, telemetry/adoption and retirement authority |
| Incident/recovery update | Affected customers and support | Known impact, containment, recovery and next update commitment |
| Post-release summary | Product, operations and customers as appropriate | Outcome, known issues, adopted capability and support status |


## Chapter 46 — Product and Release Capability Matrix

This matrix distinguishes product/release mechanisms from descriptive documents. Status is current-evidence based; target ownership does not imply delivery approval.

| ID | Capability area | Capability | Current status | Repository evidence or target gap | Accountable owner | Supporting domains | Authority boundary | Capability-specific measurement |
|---|---|---|---|---|---|---|---|---|
| PRC-001 | Product governance | Product outcome register | Planned | No governed product backlog or outcome register is present; establish sponsor, user, value hypothesis, affected customer profiles and lifecycle owner. | Product Governance | Enterprise Architecture, Domain Owners | Product Governance owns value and lifecycle; Architecture owns cross-volume permission; Domain Owners retain business semantics. | percentage of active capabilities with named outcome, sponsor, owner and review date |
| PRC-002 | Product governance | Customer-request triage | Planned | Define one intake that distinguishes core, industry, localization, customer-extension and rejected-fork paths. | Product Governance | Enterprise Architecture, Domain Owners | Product Governance owns value and lifecycle; Architecture owns cross-volume permission; Domain Owners retain business semantics. | request age, decision lead time, product-fit disposition and duplicate-demand rate |
| PRC-003 | Product governance | Product decision forum | Conceptual target architecture | The Series Index names governance but no operating Product Council evidence exists. | Product Governance | Enterprise Architecture, Domain Owners | Product Governance owns value and lifecycle; Architecture owns cross-volume permission; Domain Owners retain business semantics. | decision volume, attendance authority, deferred dependency age and overturned-decision count |
| PRC-004 | Product governance | Domain semantic acceptance | Planned | FCSB domain authorities are documented; create release-linked semantic acceptance for affected domains. | Product Governance | Enterprise Architecture, Domain Owners | Product Governance owns value and lifecycle; Architecture owns cross-volume permission; Domain Owners retain business semantics. | domain acceptance coverage, unresolved semantic objections and post-release rule defects |
| PRC-005 | Product governance | Customer-impact assessment | Planned | No release-level customer inventory exists; require deployment model, calendar, extension and training impact. | Product Governance | Enterprise Architecture, Domain Owners | Product Governance owns value and lifecycle; Architecture owns cross-volume permission; Domain Owners retain business semantics. | customers assessed, high-impact cohorts, blackout conflicts and unacknowledged actions |
| PRC-006 | Product governance | Capability lifecycle record | Planned | Create an auditable capability identity spanning proposal, implementation, availability, deprecation and retirement. | Product Governance | Enterprise Architecture, Domain Owners | Product Governance owns value and lifecycle; Architecture owns cross-volume permission; Domain Owners retain business semantics. | capabilities by lifecycle state, stale state age and unsupported availability claims |
| PRC-007 | Product governance | Architecture exception escalation | Planned | FCSB decisions provide direction but no release exception workflow is implemented. | Product Governance | Enterprise Architecture, Domain Owners | Product Governance owns value and lifecycle; Architecture owns cross-volume permission; Domain Owners retain business semantics. | open exceptions, expiry breach, recurrence and remediation completion |
| PRC-008 | Product governance | Product-line fork prevention | Planned | FCSB-012 prohibits ordinary core forks; establish delta inventory and reintegration authority for exceptions. | Product Governance | Enterprise Architecture, Domain Owners | Product Governance owns value and lifecycle; Architecture owns cross-volume permission; Domain Owners retain business semantics. | customer forks, source delta age, security-fix lag and reintegration completion |
| PRC-009 | Source control and version identity | Accepted milestone tag trace | Implemented foundation | Git tags through v0.4-dba004-merged and [DBA-004 report](../implementation/DBA-004-enterprise-master-data-implementation.md) provide narrow source-milestone evidence. | Release Management | Engineering, Product Governance, Internal Audit | Release Management controls candidate refs and release identity; Engineering owns source changes; Internal Audit reviews traceability. | tags resolving to accepted commits, orphan tags and milestone-to-report mismatches |
| PRC-010 | Source control and version identity | Documentation branch separation | Partial | The current documentation branch separates blueprint work from master; no automated enforcement exists. | Release Management | Engineering, Product Governance, Internal Audit | Release Management controls candidate refs and release identity; Engineering owns source changes; Internal Audit reviews traceability. | documentation-only commits, prohibited-path changes and branch divergence |
| PRC-011 | Source control and version identity | Release candidate identity | Planned | Define an immutable candidate reference tied to exact source, dependency, migration and documentation versions. | Release Management | Engineering, Product Governance, Internal Audit | Release Management controls candidate refs and release identity; Engineering owns source changes; Internal Audit reviews traceability. | candidate rebuild count, post-freeze change count and candidate-to-artifact trace coverage |
| PRC-012 | Source control and version identity | Protected master policy | Planned | No branch-protection configuration is present in the repository. | Release Management | Engineering, Product Governance, Internal Audit | Release Management controls candidate refs and release identity; Engineering owns source changes; Internal Audit reviews traceability. | unreviewed integration attempts, required-check coverage and override frequency |
| PRC-013 | Source control and version identity | Feature branch traceability | Partial | Feature branches and merge history exist, but requirement links and review policy are not evidenced. | Release Management | Engineering, Product Governance, Internal Audit | Release Management controls candidate refs and release identity; Engineering owns source changes; Internal Audit reviews traceability. | merged changes with requirement, reviewer, base version and change-class identity |
| PRC-014 | Source control and version identity | Hotfix branch discipline | Planned | Define branching from an exact supported tag plus mandatory merge-back to maintained successors. | Release Management | Engineering, Product Governance, Internal Audit | Release Management controls candidate refs and release identity; Engineering owns source changes; Internal Audit reviews traceability. | hotfix source accuracy, unrelated-change count and merge-back lag |
| PRC-015 | Source control and version identity | Product semantic version policy | Planned | Root and workspace packages declare 0.1.0, but no governed product version promise exists. | Release Management | Engineering, Product Governance, Internal Audit | Release Management controls candidate refs and release identity; Engineering owns source changes; Internal Audit reviews traceability. | release version classification errors and compatibility exceptions by major, minor and patch |
| PRC-016 | Source control and version identity | Controlled release tag policy | Planned | Current tags are manual milestones; add naming, immutability, approval and artifact-manifest association. | Release Management | Engineering, Product Governance, Internal Audit | Release Management controls candidate refs and release identity; Engineering owns source changes; Internal Audit reviews traceability. | release tags with manifest, signer/integrity evidence and deployed-version linkage |
| PRC-017 | Build and artifact assurance | Workspace build command | Implemented foundation | The [root package](../../package.json) dispatches workspace builds and both application workspaces define build scripts. | Engineering Authority | Security, Quality Engineering, Release Management | Engineering owns reproducible artifacts; Security owns supply-chain controls; Release Management accepts candidate composition. | workspace build completion, failed package, toolchain version and source commit |
| PRC-018 | Build and artifact assurance | API automated test command | Implemented foundation | The [API package](../../apps/api/package.json) runs accepted TypeScript test suites from apps/api/test. | Engineering Authority | Security, Quality Engineering, Release Management | Engineering owns reproducible artifacts; Security owns supply-chain controls; Release Management accepts candidate composition. | suite count, passed/failed/skipped tests, duration and candidate commit |
| PRC-019 | Build and artifact assurance | Dependency lock baseline | Implemented foundation | The committed [package lock](../../package-lock.json) fixes resolved npm dependency versions for the current workspace. | Engineering Authority | Security, Quality Engineering, Release Management | Engineering owns reproducible artifacts; Security owns supply-chain controls; Release Management accepts candidate composition. | lockfile drift, unresolved dependency changes and vulnerable resolved versions |
| PRC-020 | Build and artifact assurance | Development container build | Scaffold | The [API Dockerfile](../../apps/api/Dockerfile) and [web Dockerfile](../../apps/web/Dockerfile) build images, but no registry or release provenance is evidenced. | Engineering Authority | Security, Quality Engineering, Release Management | Engineering owns reproducible artifacts; Security owns supply-chain controls; Release Management accepts candidate composition. | image build success, layer size, base-image age and candidate digest |
| PRC-021 | Build and artifact assurance | Reproducible build identity | Planned | Define isolated build inputs, frozen dependency behavior, toolchain identity and deterministic artifact comparison. | Engineering Authority | Security, Quality Engineering, Release Management | Engineering owns reproducible artifacts; Security owns supply-chain controls; Release Management accepts candidate composition. | same-source digest reproducibility, unpinned inputs and environment-dependent build rate |
| PRC-022 | Build and artifact assurance | Artifact manifest | Planned | No release manifest or artifact inventory service exists. | Engineering Authority | Security, Quality Engineering, Release Management | Engineering owns reproducible artifacts; Security owns supply-chain controls; Release Management accepts candidate composition. | artifacts with digest, source, runtime, dependencies, migration range and owner |
| PRC-023 | Build and artifact assurance | Software bill of materials | Future | No SBOM generator or retained component inventory exists. | Engineering Authority | Security, Quality Engineering, Release Management | Engineering owns reproducible artifacts; Security owns supply-chain controls; Release Management accepts candidate composition. | artifact component coverage, unknown component count and SBOM freshness |
| PRC-024 | Build and artifact assurance | Artifact integrity verification | Future | No signing or deployment-time provenance verification is evidenced. | Engineering Authority | Security, Quality Engineering, Release Management | Engineering owns reproducible artifacts; Security owns supply-chain controls; Release Management accepts candidate composition. | verified artifacts, rejected signature or provenance events and revocation latency |
| PRC-025 | Release gates and readiness | Candidate freeze control | Planned | No automated or governed freeze record exists. | Release Authority | Product Governance, Architecture Board, Quality Engineering, Security, Operations | Each specialist authority owns its evidence; Release Authority alone accepts the fixed candidate for promotion. | changes after freeze, candidate resets and evidence invalidations |
| PRC-026 | Release gates and readiness | Cross-volume decision conformance | Planned | FCSB volumes define review direction; bind relevant decisions and unresolved blockers to each release. | Release Authority | Product Governance, Architecture Board, Quality Engineering, Security, Operations | Each specialist authority owns its evidence; Release Authority alone accepts the fixed candidate for promotion. | applicable architecture decisions, missing approvals and expired conditions |
| PRC-027 | Release gates and readiness | Domain-semantics gate | Planned | Require each affected domain owner to accept rules, authority and reconciliation behavior. | Release Authority | Product Governance, Architecture Board, Quality Engineering, Security, Operations | Each specialist authority owns its evidence; Release Authority alone accepts the fixed candidate for promotion. | affected domains, completed acceptances and semantic defects escaping release |
| PRC-028 | Release gates and readiness | Security and privacy gate | Planned | Current npm audit evidence is limited; require threat, findings, privacy and residual-risk disposition. | Release Authority | Product Governance, Architecture Board, Quality Engineering, Security, Operations | Each specialist authority owns its evidence; Release Authority alone accepts the fixed candidate for promotion. | open findings by severity/exposure, security exceptions and evidence age |
| PRC-029 | Release gates and readiness | Candidate verification portfolio | Partial | Accepted source tests exist, but no candidate-level gate or retained result bundle exists. | Release Authority | Product Governance, Architecture Board, Quality Engineering, Security, Operations | Each specialist authority owns its evidence; Release Authority alone accepts the fixed candidate for promotion. | required suites executed, representative scenario coverage and unresolved defect severity |
| PRC-030 | Release gates and readiness | Performance and scalability gate | Planned | FCSB-023 supplies evidence standards; no enterprise performance suite exists. | Release Authority | Product Governance, Architecture Board, Quality Engineering, Security, Operations | Each specialist authority owns its evidence; Release Authority alone accepts the fixed candidate for promotion. | critical journeys assessed, percentile regressions and capacity-headroom exceptions |
| PRC-031 | Release gates and readiness | Operational readiness gate | Planned | Health and Compose are development foundations; require runbooks, alerts, recovery and support acceptance. | Release Authority | Product Governance, Architecture Board, Quality Engineering, Security, Operations | Each specialist authority owns its evidence; Release Authority alone accepts the fixed candidate for promotion. | runbook coverage, alert ownership, restore rehearsal and unresolved operational blockers |
| PRC-032 | Release gates and readiness | Customer readiness gate | Planned | No customer rollout/communication gate is implemented. | Release Authority | Product Governance, Architecture Board, Quality Engineering, Security, Operations | Each specialist authority owns its evidence; Release Authority alone accepts the fixed candidate for promotion. | affected customers prepared, UAT acceptance, training completion and communication acknowledgments |
| PRC-033 | Promotion and deployment | Environment inventory | Planned | No authoritative inventory of deployed artifact, schema, configuration and extensions exists. | Operations Authority | Release Management, Platform Engineering, Customer Operations | Release Management authorizes exact content; Operations executes deployment; customer operators execute only their contracted boundary. | environments with exact version inventory, unknown drift and stale inventory age |
| PRC-034 | Promotion and deployment | Immutable artifact promotion | Conceptual target architecture | FCSB-006 and FCSB-012 define build-once direction; no pipeline or registry exists. | Operations Authority | Release Management, Platform Engineering, Customer Operations | Release Management authorizes exact content; Operations executes deployment; customer operators execute only their contracted boundary. | digest continuity across environments and environment-specific rebuild count |
| PRC-035 | Promotion and deployment | Configuration schema validation | Planned | Environment variables are consumed, but no versioned release configuration schema is evidenced. | Operations Authority | Release Management, Platform Engineering, Customer Operations | Release Management authorizes exact content; Operations executes deployment; customer operators execute only their contracted boundary. | configuration keys validated, unknown/deprecated keys and default-use exceptions |
| PRC-036 | Promotion and deployment | Secret-reference separation | Partial | Environment variables separate values from source in normal use, but no production secret platform or policy enforcement exists. | Operations Authority | Release Management, Platform Engineering, Customer Operations | Release Management authorizes exact content; Operations executes deployment; customer operators execute only their contracted boundary. | secrets embedded in artifacts/config, unresolved references and rotation verification |
| PRC-037 | Promotion and deployment | Staging rehearsal | Planned | No production-like staging evidence or automated deployment rehearsal exists. | Operations Authority | Release Management, Platform Engineering, Customer Operations | Release Management authorizes exact content; Operations executes deployment; customer operators execute only their contracted boundary. | candidate rehearsals, migration duration variance and rehearsal-to-production drift |
| PRC-038 | Promotion and deployment | SaaS rollout rings | Future | No tenant routing, canary or staged-activation runtime exists. | Operations Authority | Release Management, Platform Engineering, Customer Operations | Release Management authorizes exact content; Operations executes deployment; customer operators execute only their contracted boundary. | tenants by ring, exposure duration, stop-threshold breaches and ring rollback time |
| PRC-039 | Promotion and deployment | Customer-operated installer direction | Future | No on-premises installer, preflight utility or diagnostic bundle exists. | Operations Authority | Release Management, Platform Engineering, Customer Operations | Release Management authorizes exact content; Operations executes deployment; customer operators execute only their contracted boundary. | supported installs, preflight failures, local divergence and diagnostic completeness |
| PRC-040 | Promotion and deployment | Deployment verification record | Planned | Health can confirm database reachability, but no release-aware deployment record exists. | Operations Authority | Release Management, Platform Engineering, Customer Operations | Release Management authorizes exact content; Operations executes deployment; customer operators execute only their contracted boundary. | instances at intended digest, smoke outcomes, migration status and verification owner |
| PRC-041 | Contract and compatibility governance | API namespace baseline | Implemented foundation | The [API bootstrap](../../apps/api/src/main.ts) mounts routes below api/v1. | Architecture Board | Integration, Database Engineering, Workflow Governance, Reporting, Mobile Product | Architecture sets compatibility policy; contract owners certify their surfaces and consumer migration. | routes outside versioned prefix, namespace collisions and versioned route coverage |
| PRC-042 | Contract and compatibility governance | API compatibility policy | Planned | The namespace exists without a formal backward-compatibility or support-window contract. | Architecture Board | Integration, Database Engineering, Workflow Governance, Reporting, Mobile Product | Architecture sets compatibility policy; contract owners certify their surfaces and consumer migration. | breaking changes detected, supported versions, consumer adoption and exception count |
| PRC-043 | Contract and compatibility governance | Contract test profile | Planned | Current tests validate services but not producer/consumer version matrices. | Architecture Board | Integration, Database Engineering, Workflow Governance, Reporting, Mobile Product | Architecture sets compatibility policy; contract owners certify their surfaces and consumer migration. | producer-old-consumer and old-producer-new-consumer combinations executed |
| PRC-044 | Contract and compatibility governance | Webhook and event evolution | Future | No webhook or event runtime exists. | Architecture Board | Integration, Database Engineering, Workflow Governance, Reporting, Mobile Product | Architecture sets compatibility policy; contract owners certify their surfaces and consumer migration. | published schemas, compatible consumers, replay behavior and retirement readiness |
| PRC-045 | Contract and compatibility governance | File-contract versioning | Planned | Import/export metadata exists, but durable file contracts and version negotiation are incomplete. | Architecture Board | Integration, Database Engineering, Workflow Governance, Reporting, Mobile Product | Architecture sets compatibility policy; contract owners certify their surfaces and consumer migration. | file schema versions, rejected/unknown versions and reconciliation by contract |
| PRC-046 | Contract and compatibility governance | Workflow compatibility inventory | Planned | Published workflow versions exist; active runtime consumers and migration tooling do not. | Architecture Board | Integration, Database Engineering, Workflow Governance, Reporting, Mobile Product | Architecture sets compatibility policy; contract owners certify their surfaces and consumer migration. | definition versions affected, command contract changes and in-flight migration need |
| PRC-047 | Contract and compatibility governance | Report semantic compatibility | Planned | Report metadata exists without certified semantic versioning. | Architecture Board | Integration, Database Engineering, Workflow Governance, Reporting, Mobile Product | Architecture sets compatibility policy; contract owners certify their surfaces and consumer migration. | reports affected by source/formula change, reconciliation pass and customer report migration |
| PRC-048 | Contract and compatibility governance | Mobile backend compatibility | Future | No accepted mobile client exists. | Architecture Board | Integration, Database Engineering, Workflow Governance, Reporting, Mobile Product | Architecture sets compatibility policy; contract owners certify their surfaces and consumer migration. | client versions by backend range, forced-upgrade exposure and sync-protocol failures |
| PRC-049 | Database, data and ERP migration | Accepted migration ancestry | Implemented foundation | Three ordered folders in [Prisma migrations](../../apps/api/prisma/migrations) establish the accepted schema chain. | Data and Migration Authority | Database Engineering, Domain Owners, Operations, Quality Engineering | Database Engineering owns mechanism; Data/Migration Authority accepts preservation and recovery; domains certify business totals. | target ancestry, missing or modified migration checksum and schema drift |
| PRC-050 | Database, data and ERP migration | Migration immutability control | Implemented foundation | The [DBA-002 report](../implementation/DBA-002-foundation-implementation.md), [DBA-003 report](../implementation/DBA-003-enterprise-structure-implementation.md) and [DBA-004 report](../implementation/DBA-004-enterprise-master-data-implementation.md) identify additive accepted migrations whose files remain in [Prisma migrations](../../apps/api/prisma/migrations). | Data and Migration Authority | Database Engineering, Domain Owners, Operations, Quality Engineering | Database Engineering owns mechanism; Data/Migration Authority accepts preservation and recovery; domains certify business totals. | modified accepted files, out-of-order migrations and undocumented baseline changes |
| PRC-051 | Database, data and ERP migration | Migration preflight | Planned | No automated ancestry, lock, space, duration, backup or compatibility preflight exists. | Data and Migration Authority | Database Engineering, Domain Owners, Operations, Quality Engineering | Database Engineering owns mechanism; Data/Migration Authority accepts preservation and recovery; domains certify business totals. | preflight checks passed, predicted lock/load, free capacity and blocked executions |
| PRC-052 | Database, data and ERP migration | Expand-and-contract plan | Planned | Controlled volumes define the pattern; no generic orchestration exists. | Data and Migration Authority | Database Engineering, Domain Owners, Operations, Quality Engineering | Database Engineering owns mechanism; Data/Migration Authority accepts preservation and recovery; domains certify business totals. | changes using compatible phases, dual-state duration and premature removal attempts |
| PRC-053 | Database, data and ERP migration | Large-history migration rehearsal | Planned | No scale-shaped manufacturing or financial migration suite exists. | Data and Migration Authority | Database Engineering, Domain Owners, Operations, Quality Engineering | Database Engineering owns mechanism; Data/Migration Authority accepts preservation and recovery; domains certify business totals. | rows and bytes migrated, checkpoint recovery, lock budget and reconciliation variance |
| PRC-054 | Database, data and ERP migration | Data reconciliation bundle | Partial | Master import jobs retain summary/row outcomes; full cross-domain control totals are absent. | Data and Migration Authority | Database Engineering, Domain Owners, Operations, Quality Engineering | Database Engineering owns mechanism; Data/Migration Authority accepts preservation and recovery; domains certify business totals. | source, staged, accepted, rejected and committed counts plus amount/quantity differences |
| PRC-055 | Database, data and ERP migration | ERP cutover orchestration | Future | No delta, freeze, cutover, fallback or legacy-source retirement runtime exists. | Data and Migration Authority | Database Engineering, Domain Owners, Operations, Quality Engineering | Database Engineering owns mechanism; Data/Migration Authority accepts preservation and recovery; domains certify business totals. | trial cycles, cutover checkpoint completion, fallback boundary and post-go-live exceptions |
| PRC-056 | Database, data and ERP migration | Historical interpretation preservation | Planned | Effective dates and immutable identities provide foundations; release-level compatibility evidence is absent. | Data and Migration Authority | Database Engineering, Domain Owners, Operations, Quality Engineering | Database Engineering owns mechanism; Data/Migration Authority accepts preservation and recovery; domains certify business totals. | historical records resolvable by version, orphan identities and recalculation exceptions |
| PRC-057 | Extensions, workflow and reporting | Workflow published-version immutability | Implemented foundation | The [workflow service](../../apps/api/src/workflows/workflows.service.ts) rejects edits to published versions and [tests](../../apps/api/test/foundation.spec.ts) cover it. | Product Governance | Platform Engineering, Workflow Governance, Reporting, Security, Domain Owners | Product governs extension support; platform governs mechanics; workflow/report/domain owners retain executable and semantic authority. | published mutations rejected, versions created and publication audit records |
| PRC-058 | Extensions, workflow and reporting | Module package manifest | Future | FCSB-012 defines the target; no package model, compiler, resolver or registry exists. | Product Governance | Platform Engineering, Workflow Governance, Reporting, Security, Domain Owners | Product governs extension support; platform governs mechanics; workflow/report/domain owners retain executable and semantic authority. | packages with namespace, digest, dependencies, permissions, migrations and compatibility range |
| PRC-059 | Extensions, workflow and reporting | Extension-point catalog | Planned | No executable catalog of sealed and exported extension contracts exists. | Product Governance | Platform Engineering, Workflow Governance, Reporting, Security, Domain Owners | Product governs extension support; platform governs mechanics; workflow/report/domain owners retain executable and semantic authority. | extension points by owner/version, prohibited override attempts and consumer count |
| PRC-060 | Extensions, workflow and reporting | Customer extension compatibility | Planned | Custom-field and customization metadata are scaffolds without upgrade certification. | Product Governance | Platform Engineering, Workflow Governance, Reporting, Security, Domain Owners | Product governs extension support; platform governs mechanics; workflow/report/domain owners retain executable and semantic authority. | installed extensions tested, incompatible contracts and remediation lead time |
| PRC-061 | Extensions, workflow and reporting | Workflow in-flight migration | Future | No workflow instance runtime or migration engine exists. | Product Governance | Platform Engineering, Workflow Governance, Reporting, Security, Domain Owners | Product governs extension support; platform governs mechanics; workflow/report/domain owners retain executable and semantic authority. | instances assessed, mappings accepted, stale approvals and migration incidents |
| PRC-062 | Extensions, workflow and reporting | Report publication package | Scaffold | [Report definitions](../../apps/api/prisma/schema.prisma) and preview behavior exist without certification or package lifecycle. | Product Governance | Platform Engineering, Workflow Governance, Reporting, Security, Domain Owners | Product governs extension support; platform governs mechanics; workflow/report/domain owners retain executable and semantic authority. | reports with owner, semantic version, source lineage, certification and compatibility |
| PRC-063 | Extensions, workflow and reporting | Custom report impact analysis | Planned | No dependency graph maps schema/semantic changes to customer reports. | Product Governance | Platform Engineering, Workflow Governance, Reporting, Security, Domain Owners | Product governs extension support; platform governs mechanics; workflow/report/domain owners retain executable and semantic authority. | customer reports assessed, broken dependencies and migrated definitions |
| PRC-064 | Extensions, workflow and reporting | Core-fork exception register | Planned | No current controlled fork inventory is present. | Product Governance | Platform Engineering, Workflow Governance, Reporting, Security, Domain Owners | Product governs extension support; platform governs mechanics; workflow/report/domain owners retain executable and semantic authority. | fork count, delta size, supported versions, security lag and reintegration date |
| PRC-065 | Customer release models | Shared SaaS tenant-safe release | Conceptual target architecture | Tenant/organization guards exist, but no production SaaS rollout runtime or evidence exists. | Customer Impact Forum | Customer Success, Release Management, Operations, Support, Domain Owners | Customer Impact Forum governs cohort and communication; Release Authority governs candidate; deployment responsibility follows contract. | tenant-isolation scenarios, cohort errors, cross-tenant denials and business reconciliation |
| PRC-066 | Customer release models | Dedicated-cloud upgrade plan | Planned | Define exact current/target inventory, window, extensions, integrations and shared responsibility. | Customer Impact Forum | Customer Success, Release Management, Operations, Support, Domain Owners | Customer Impact Forum governs cohort and communication; Release Authority governs candidate; deployment responsibility follows contract. | dedicated environments assessed, rehearsal pass and customer acceptance |
| PRC-067 | Customer release models | Private-cloud release evidence exchange | Planned | No standardized customer operator evidence package exists. | Customer Impact Forum | Customer Success, Release Management, Operations, Support, Domain Owners | Customer Impact Forum governs cohort and communication; Release Authority governs candidate; deployment responsibility follows contract. | preflight/result packages received, incomplete diagnostics and support exceptions |
| PRC-068 | Customer release models | On-premises supported-version matrix | Planned | No formal support window or upgrade graph is published. | Customer Impact Forum | Customer Success, Release Management, Operations, Support, Domain Owners | Customer Impact Forum governs cohort and communication; Release Authority governs candidate; deployment responsibility follows contract. | installations by supported version, lag, security exposure and upgrade-path coverage |
| PRC-069 | Customer release models | Hybrid cutover plan | Planned | Cross-boundary version, buffer and reconciliation rules remain project-specific. | Customer Impact Forum | Customer Success, Release Management, Operations, Support, Domain Owners | Customer Impact Forum governs cohort and communication; Release Authority governs candidate; deployment responsibility follows contract. | hybrid endpoints compatible, buffered backlog, duplicate rate and end-to-end totals |
| PRC-070 | Customer release models | Customer blackout calendar | Planned | No release calendar integrates close, count, production or regulatory windows. | Customer Impact Forum | Customer Success, Release Management, Operations, Support, Domain Owners | Customer Impact Forum governs cohort and communication; Release Authority governs candidate; deployment responsibility follows contract. | planned releases conflicting with blackout, approved overrides and reschedule lead time |
| PRC-071 | Customer release models | Tenant activation consent | Future | No feature rollout platform or consent workflow exists. | Customer Impact Forum | Customer Success, Release Management, Operations, Support, Domain Owners | Customer Impact Forum governs cohort and communication; Release Authority governs candidate; deployment responsibility follows contract. | pilot tenants with recorded consent, activation scope and withdrawal outcome |
| PRC-072 | Customer release models | Customer communication package | Planned | Implementation reports are internal evidence, not a governed customer release-note service. | Customer Impact Forum | Customer Success, Release Management, Operations, Support, Domain Owners | Customer Impact Forum governs cohort and communication; Release Authority governs candidate; deployment responsibility follows contract. | affected customers notified, delivery failures, acknowledgment and action completion |
| PRC-073 | Security, patch and emergency governance | Dependency vulnerability check | Partial | Accepted reports document npm audit, but no continuous multi-layer vulnerability program exists. | Security Authority | Engineering, Release Management, Operations, Customer Success, Legal/Privacy | Security owns exposure and remediation acceptance; Release owns candidate promotion; Operations executes containment and deployment. | dependencies scanned, validated findings, affected versions and remediation age |
| PRC-074 | Security, patch and emergency governance | Security release classification | Planned | Define vulnerability, exposure, affected customer/version and disclosure attributes. | Security Authority | Engineering, Release Management, Operations, Customer Success, Legal/Privacy | Security owns exposure and remediation acceptance; Release owns candidate promotion; Operations executes containment and deployment. | findings classified, misclassification rate and time to affected-version inventory |
| PRC-075 | Security, patch and emergency governance | Emergency candidate path | Planned | No expedited release workflow is implemented. | Security Authority | Engineering, Release Management, Operations, Customer Success, Legal/Privacy | Security owns exposure and remediation acceptance; Release owns candidate promotion; Operations executes containment and deployment. | elapsed validation time, independent reviewers, residual-risk approvals and retrospective completion |
| PRC-076 | Security, patch and emergency governance | Hotfix scope isolation | Planned | Define exact supported source line and prohibit unrelated features. | Security Authority | Engineering, Release Management, Operations, Customer Success, Legal/Privacy | Security owns exposure and remediation acceptance; Release owns candidate promotion; Operations executes containment and deployment. | files/requirements outside hotfix scope, regression surface and merge-back status |
| PRC-077 | Security, patch and emergency governance | Privileged deployment authorization | Future | No production deployment identity, PAM or dual-control runtime exists. | Security Authority | Engineering, Release Management, Operations, Customer Success, Legal/Privacy | Security owns exposure and remediation acceptance; Release owns candidate promotion; Operations executes containment and deployment. | deployments by approved identity, break-glass use and independent authorization |
| PRC-078 | Security, patch and emergency governance | Security advisory handling | Planned | No controlled customer advisory channel is evidenced. | Security Authority | Engineering, Release Management, Operations, Customer Success, Legal/Privacy | Security owns exposure and remediation acceptance; Release owns candidate promotion; Operations executes containment and deployment. | affected contacts reached, embargo handling, mitigation uptake and disclosure exceptions |
| PRC-079 | Security, patch and emergency governance | Patch cohort governance | Future | No automated fleet/customer cohort system exists. | Security Authority | Engineering, Release Management, Operations, Customer Success, Legal/Privacy | Security owns exposure and remediation acceptance; Release owns candidate promotion; Operations executes containment and deployment. | patched environments, exposed supported versions and rollout pause events |
| PRC-080 | Security, patch and emergency governance | Emergency disablement | Future | No feature kill-switch platform exists; only conceptual safe-disablement direction is defined. | Security Authority | Engineering, Release Management, Operations, Customer Success, Legal/Privacy | Security owns exposure and remediation acceptance; Release owns candidate promotion; Operations executes containment and deployment. | time to disable, affected tenants, residual paths and restored-service validation |
| PRC-081 | Observability, support and release learning | Database-backed health probe | Scaffold | The [health controller](../../apps/api/src/health/health.controller.ts) runs SELECT 1 but is not release-aware readiness. | Operations Authority | Support, Release Management, Performance Engineering, Domain Owners, Product Governance | Operations owns runtime signals; Support owns case readiness; Product and domains interpret adoption and business outcomes. | probe result, database response time and false-healthy incidents |
| PRC-082 | Observability, support and release learning | Application audit trace foundation | Implemented foundation | The [AuditService](../../apps/api/src/audit/audit.service.ts) creates trace identifiers and redacts credential fields. | Operations Authority | Support, Release Management, Performance Engineering, Domain Owners, Product Governance | Operations owns runtime signals; Support owns case readiness; Product and domains interpret adoption and business outcomes. | audited changes with trace, redaction failures and orphan release references |
| PRC-083 | Observability, support and release learning | Release-aware telemetry | Future | No APM, tracing, release dashboard or centralized metrics runtime exists. | Operations Authority | Support, Release Management, Performance Engineering, Domain Owners, Product Governance | Operations owns runtime signals; Support owns case readiness; Product and domains interpret adoption and business outcomes. | events tagged by artifact, migration, ring and feature state with bounded tenant context |
| PRC-084 | Observability, support and release learning | Business verification probes | Planned | Define non-destructive checks for finance, inventory, manufacturing, workflow and reporting outcomes. | Operations Authority | Support, Release Management, Performance Engineering, Domain Owners, Product Governance | Operations owns runtime signals; Support owns case readiness; Product and domains interpret adoption and business outcomes. | domain probes executed, reconciliation differences and false-positive rate |
| PRC-085 | Observability, support and release learning | Support version inventory | Planned | No customer/environment version inventory service exists. | Operations Authority | Support, Release Management, Performance Engineering, Domain Owners, Product Governance | Operations owns runtime signals; Support owns case readiness; Product and domains interpret adoption and business outcomes. | support cases with exact version/configuration, unknown-version cases and inventory freshness |
| PRC-086 | Observability, support and release learning | Privacy-safe diagnostic bundle | Future | No standard customer-operated diagnostic collector exists. | Operations Authority | Support, Release Management, Performance Engineering, Domain Owners, Product Governance | Operations owns runtime signals; Support owns case readiness; Product and domains interpret adoption and business outcomes. | bundles complete, secrets/customer fields removed and time to diagnosis |
| PRC-087 | Observability, support and release learning | Post-release review | Planned | Git history records changes but no governed release retrospective is evidenced. | Operations Authority | Support, Release Management, Performance Engineering, Domain Owners, Product Governance | Operations owns runtime signals; Support owns case readiness; Product and domains interpret adoption and business outcomes. | reviews completed, action closure, repeated failure mechanisms and learning lead time |
| PRC-088 | Observability, support and release learning | Release KPI governance | Planned | No measured deployment, failure, hotfix, exception or adoption indicators exist. | Operations Authority | Support, Release Management, Performance Engineering, Domain Owners, Product Governance | Operations owns runtime signals; Support owns case readiness; Product and domains interpret adoption and business outcomes. | metric definition approval, data completeness, gaming checks and decision use |
| PRC-089 | Deprecation, mobile and AI lifecycle | Deprecation announcement record | Planned | No product-level deprecation register exists. | Product Governance | Architecture Board, Mobile Product, AI Governance, Security, Support, Domain Owners | Product owns supported lifecycle; specialist authorities own compatibility and risk; Release enforces availability and retirement. | deprecated capabilities with owner, replacement, affected consumers and notice evidence |
| PRC-090 | Deprecation, mobile and AI lifecycle | Usage and adoption observation | Future | No release portal or product telemetry proves feature/contract adoption. | Product Governance | Architecture Board, Mobile Product, AI Governance, Security, Support, Domain Owners | Product owns supported lifecycle; specialist authorities own compatibility and risk; Release enforces availability and retirement. | active consumers by version, unknown consumers and retirement blockers |
| PRC-091 | Deprecation, mobile and AI lifecycle | Retirement authorization | Planned | Define Product, Architecture, domain and Release approvals plus retained-data consequences. | Product Governance | Architecture Board, Mobile Product, AI Governance, Security, Support, Domain Owners | Product owns supported lifecycle; specialist authorities own compatibility and risk; Release enforces availability and retirement. | retirements with zero/accepted use, completed migration and archived evidence |
| PRC-092 | Deprecation, mobile and AI lifecycle | API retirement enforcement | Future | No gateway or contract registry can observe/block retired API use. | Product Governance | Architecture Board, Mobile Product, AI Governance, Security, Support, Domain Owners | Product owns supported lifecycle; specialist authorities own compatibility and risk; Release enforces availability and retirement. | requests to deprecated versions, consumer migration and post-retirement attempts |
| PRC-093 | Deprecation, mobile and AI lifecycle | Mobile client lag policy | Future | No mobile clients or distribution telemetry exist. | Product Governance | Architecture Board, Mobile Product, AI Governance, Security, Support, Domain Owners | Product owns supported lifecycle; specialist authorities own compatibility and risk; Release enforces availability and retirement. | clients below minimum version, offline grace usage and upgrade completion |
| PRC-094 | Deprecation, mobile and AI lifecycle | AI use-case release gate | Future | No model, provider, prompt, evaluation or monitoring runtime exists. | Product Governance | Architecture Board, Mobile Product, AI Governance, Security, Support, Domain Owners | Product owns supported lifecycle; specialist authorities own compatibility and risk; Release enforces availability and retirement. | AI versions with risk tier, evaluation, domain approval, fallback and monitoring |
| PRC-095 | Deprecation, mobile and AI lifecycle | AI provider change control | Future | Provider abstraction is architectural only. | Product Governance | Architecture Board, Mobile Product, AI Governance, Security, Support, Domain Owners | Product owns supported lifecycle; specialist authorities own compatibility and risk; Release enforces availability and retirement. | provider/model changes evaluated, silent-version incidents and fallback parity |
| PRC-096 | Deprecation, mobile and AI lifecycle | Product roadmap handoff | Planned | FCSB-025 is controlled but not started by this volume. | Product Governance | Architecture Board, Mobile Product, AI Governance, Security, Support, Domain Owners | Product owns supported lifecycle; specialist authorities own compatibility and risk; Release enforces availability and retirement. | approved open decisions, investment dependencies and roadmap-ready evidence |

## Chapter 47 — Architecture Scenario Catalog

Scale and timing values in these scenarios are governed inputs, not production claims.

| ID | Scenario | Deployment model | Trigger | Governance and release path | Evidence required | Recovery direction | Scenario-specific risk | Accountable owner | Current status |
|---|---|---|---|---|---|---|---|---|---|
| RLS-001 | Standard SaaS release across multiple customers | Shared SaaS | A compatible minor release contains UI, API and bounded schema additions for customers with different tenant sizes and integrations. | Release Authority freezes one artifact; Operations deploys inactive, verifies internal tenant, then advances consenting pilot and general rings with tenant-scoped stop criteria. | Manifest/digest, migration rehearsal, tenant-isolation tests, representative workload, domain probes, ring telemetry and support readiness. | Pause activation first; reactivate prior application only while schema remains backward compatible; reconcile any accepted business work. | Pilot tenants may be unrepresentatively small, concealing large-tenant query or integration behavior. | Release Management | Conceptual target architecture |
| RLS-002 | Dedicated-cloud customer upgrade | Dedicated cloud | One customer requests a supported target during a plant shutdown and has custom identity, reports and partner links. | Customer Success inventories current version and constraints; Release validates extension and integration compatibility; customer UAT and operator rehearsal precede the isolated window. | Current/target inventory, backup, migration duration, extension tests, UAT, downtime acceptance and joint RACI. | Stop before migration irreversible point or apply approved forward fix; customer and FlowCraft reconcile business readiness. | An undocumented local configuration or adapter can make a standard upgrade unsafe. | Customer Success | Planned |
| RLS-003 | On-premises customer on older supported version | On-premises | A customer remains two supported versions behind because its validation calendar is annual. | Product publishes an explicit upgrade graph and security posture; customer runs preflight and required intermediate migrations without receiving a unique source build. | Supported-version matrix, platform prerequisites, migration ancestry, local extension inventory, diagnostic bundle and customer acceptance. | Maintain prior supported operation until cutover; after irreversible new work, use forward recovery rather than skipping ancestry. | Security fixes may become impossible to backport economically while contractual support remains ambiguous. | Product Governance | Planned |
| RLS-004 | Emergency security hotfix | All supported models | Security confirms an exploitable authorization defect affecting selected supported versions. | Security identifies exposure and mitigation; Engineering creates the smallest fix from exact release lines; Quality executes negative/regression tests; Release authorizes an accelerated cohort. | Affected-version inventory, exploit/denial evidence, reviewed diff, test result, residual risk, deployment record and advisory decision. | Disable the affected optional path where safe; deploy patched artifact; rollback only if it does not restore exposure. | Urgency can cause an unrelated change or incomplete merge-back to remain in a supported line. | Security | Planned |
| RLS-005 | Large manufacturing-history schema migration | SaaS or dedicated | A new genealogy index and normalized relation must cover years of production history. | Database Engineering uses expand-and-contract, online-safe index direction, checkpointed backfill and throttling against production receipt budgets; Manufacturing certifies history totals. | Actual plans, history shape, lock/IO/WAL estimates, representative rehearsal, checkpoints, counts, samples and production-command workload. | Pause/restart backfill; keep old reads until reconciliation; forward-correct inconsistent rows rather than dropping accepted history. | Backfill competes with shop-floor writes and creates a long partial state that old code does not understand. | Data and Migration Authority | Planned |
| RLS-006 | Customer workflow extension survives core upgrade | Customer extension | A tenant workflow calls a core purchase-approval command whose optional fields change. | Workflow owner pins active instances, validates the extension package against the new command contract and publishes a compatible version for new instances. | Definition/package versions, dependency range, active-instance inventory, command contract tests, approval/SoD parity and tenant isolation. | Keep old instances on the old compatible definition; block new activation or publish a corrected version without rewriting completed approvals. | A seemingly additive command change alters approver resolution or makes in-flight tasks impossible to complete. | Workflow Governance | Planned |
| RLS-007 | Custom report compatibility after schema change | Dedicated or SaaS tenant | A source column is normalized and several customer reports reference the former shape. | Reporting dependency analysis maps affected definitions; a governed compatibility view or migrated report version is certified with the source domain. | Report inventory, source lineage, formula/grain comparison, totals reconciliation, security test and performance result. | Retain the prior report version/read model during the support window or publish a corrected version with disclosed semantic change. | A report may still render while silently omitting rows or changing currency/as-of meaning. | Reporting | Planned |
| RLS-008 | Older supported API contract | Integration | A partner remains on an older API major while FlowCraft adds fields and new status values. | Integration maintains the promised contract, tests producer-to-old-consumer behavior and publishes adoption/deprecation evidence without changing domain truth. | Contract versions, consumer identity, fixtures, unknown-enum behavior, error/idempotency tests, throughput result and migration guide. | Route the supported old contract or adapter; reject unsupported behavior explicitly rather than coercing data. | An enum expansion treated as harmless can crash or misroute an old partner consumer. | Integration | Planned |
| RLS-009 | Application rollback after migrated data | Dedicated cloud | New application behavior fails after an additive migration and some records use newly optional fields. | Release assesses whether the prior application tolerates the expanded schema and new rows. If yes, application rollback preserves data; otherwise a forward fix is required. | Schema compatibility matrix, affected-row query, prior-version rehearsal, business reconciliation and recovery authority. | Reactivate prior artifact only with proven read/write tolerance; never reverse by deleting migrated data used by accepted transactions. | Binary rollback can succeed technically while old code corrupts or ignores new data states. | Release Authority | Planned |
| RLS-010 | Legacy ERP migration cutover | On-premises to FlowCraft | A manufacturer moves masters, open orders, balances and selected history from a legacy ERP. | Migration Governance profiles and maps sources, performs trial loads, reconciles counts/amounts/quantities, freezes/deltas, obtains domain sign-off and controls source retirement. | Source inventory, mapping versions, trial results, exceptions, control totals, UAT, cutover checkpoints and post-go-live verification. | Return to legacy only before FlowCraft accepts irreversible new business; afterward use forward correction and retained source evidence. | Opening balances may reconcile globally while company, currency, item or batch detail is misclassified. | Migration Programme | Conceptual target architecture |
| RLS-011 | Mobile client lags backend release | Mobile | Offline devices return after the backend has advanced to a newer sync contract. | Backend preserves the supported protocol range and capability negotiation; Mobile Product defines warning, grace and forced-upgrade rules; receipts stay truthful. | Client/backend matrix, offline-duration cohort, command/delta fixtures, conflict tests, pending-command reconciliation and security review. | Keep old clients on bounded compatible behavior or return explicit upgrade-required state without discarding pending commands. | A forced upgrade during offline work can strand commands or duplicate replay after reinstall. | Mobile Product | Future |
| RLS-012 | AI provider or model change | AI advisory | A provider retires a pinned model or changes regional availability. | AI Governance treats the replacement as a release: repeat privacy/residency review, golden-set evaluation, prompt/tool tests, cost/capacity check and domain acceptance. | Provider/model identity, contract, evaluation dataset/results, prompt/policy versions, red-team findings, fallback parity and human-oversight proof. | Keep AI disabled or on the approved prior route; core ERP operation continues without advisory output. | A model replacement can change numerical reliability or refusal behavior while the API contract remains identical. | AI Governance | Future |
| RLS-013 | Financial report logic change | Reporting and Finance | A calculation changes consolidation elimination or foreign-currency presentation. | Finance owns semantic approval; Reporting versions the measure/report; Data proves lineage and reconciliation; Release communicates the effective version and historical treatment. | Formula and grain diff, rate/source versions, company samples, trial balance reconciliation, certification, regression and communication. | Retain prior certified definition/output for historical reproduction; forward-publish correction rather than silently overwrite. | A minor formula edit can create a financial misstatement across all customers using the report. | Finance | Planned |
| RLS-014 | Production-planning rule enhancement | Manufacturing planning | A new lot-sizing rule should affect new planned orders while open released orders already exist. | Planning defines applicability and effective date; Manufacturing assesses open orders; Engineering preserves rule version; Release separates proposal recalculation from authoritative release. | Rule/version diff, representative demand and constraints, open-order inventory, schedule comparison, exception handling and user acceptance. | Keep existing released orders pinned; disable new rule and regenerate only unapproved proposals when safe. | Replanning existing open orders can invalidate material commitments and shop-floor priorities. | Production Planning | Planned |
| RLS-015 | Multi-currency logic upgrade | Finance | Rounding or rate-selection logic changes while historical transactions use prior rate versions. | Finance and Tax define prospective versus corrective application; Data preserves rate and algorithm identity; reports reconcile original and derived views. | Currency/rate fixtures, precision/rounding boundaries, historical samples, journal/report totals, tax review and effective-date proof. | Restore prior algorithm for new transactions only if compatible; correct history through explicit governed adjustment or derived report version. | Recomputing history under new rounding can alter posted amounts and audit explanations. | Finance | Planned |
| RLS-016 | Module Builder extension upgrade | Customer module | A certified customer module targets an older core API and adds workflow/report artifacts. | Resolver direction compares declared ranges and transitive dependencies; domain and Security review changed permissions; customer rehearsal proves upgrade and uninstall/forward path. | Module manifest/digest, dependency lock, extension-point versions, permission diff, migrations, tests and environment inventory. | Leave current module active if compatible; otherwise block core activation or ship a reviewed extension upgrade. | A transitive package can request broader permissions or shadow a core identity. | Platform Product | Future |
| RLS-017 | Selected-tenant feature rollout | Shared SaaS | A new warehouse dashboard is deployed but enabled for selected pilot tenants only. | Product selects the cohort; Platform enforces server-side tenant eligibility; Reporting validates metric semantics; Release defines stop and expiry. | Flag/config version, tenant list, authorization tests, dashboard query/load result, staleness disclosure and adoption evidence. | Disable the optional dashboard without affecting warehouse commands; retain audit and remove the temporary flag after decision. | Client-only hiding can expose the feature API to non-entitled tenants. | Product Governance | Future |
| RLS-018 | Unsafe rollback requiring forward fix | Any | A migration transformed data and new business transactions now depend on the target representation. | Release declares rollback unsafe; Data and domain owners design a bounded corrective migration; Operations protects evidence and monitors reconciliation. | Affected-row scope, transformation version, new-transaction inventory, correction plan, backup, rehearsal, control totals and approvals. | Apply the smallest forward correction; restore only if business authority accepts lost work and recovery consequences. | Pressure to “roll back” can cause destructive reversal and erase valid post-release transactions. | Data and Migration Authority | Planned |
| RLS-019 | Dependency-only maintenance release | All | A runtime library receives a non-exploited supported update with transitive changes. | Engineering rebuilds from the same source with new lockfile; Security reviews provenance/advisory; Quality targets affected runtime and regression paths. | Dependency diff, lockfile, license/provenance direction, vulnerability scan, build digest, runtime tests and performance smoke. | Return to prior locked dependency if no data/protocol effect and vulnerability posture permits. | A transitive major behavior change can escape because product code did not change. | Engineering Authority | Planned |
| RLS-020 | Configuration-only production change | Dedicated or SaaS | An operator changes timeout, endpoint or feature configuration without rebuilding code. | Configuration is versioned, schema-validated, reviewed for scope and tested in staging; deployment record links old/new values without exposing secrets. | Configuration schema/version, diff, approvers, environment, validation, secret references, smoke and rollback value. | Restore the prior validated configuration; rotate secrets independently if exposure occurs. | Configuration can change business behavior or disable controls while bypassing source review. | Operations | Planned |
| RLS-021 | Integration outage recovery release | Hybrid | An adapter fix is ready while the partner has a large replay backlog after outage. | Integration validates new and replay traffic, idempotency and throttling; Release sequences adapter deployment before paced backlog drain. | Partner contract/version, backlog age/volume, duplicate fixtures, retry budget, throughput and reconciliation. | Pause replay, retain accepted-message ledger and revert adapter only if old contract remains valid. | Backlog replay can mask a fix defect by overwhelming both systems and creating duplicate effects. | Integration | Planned |
| RLS-022 | Workflow defect hotfix with active approvals | SaaS | A published approval workflow routes one branch to the wrong role while instances are active. | Workflow and domain owners classify affected states, publish a corrected version for new instances and decide explicit migration/reassignment for active approvals. | Definition diff/digest, active instances by node, SoD checks, reassignment approval, notification and completed-history preservation. | Suspend affected tasks, correct by forward migration or reassignment; never rewrite completed approval history. | Bulk reassignment can transfer approval authority or invalidate deadlines. | Workflow Governance | Planned |
| RLS-023 | Report deprecation with external consumers | Customer cloud | A standard export report is being replaced, but external BI jobs still consume its columns. | Reporting inventories schedules, exports and external consumers; Integration confirms contract use; Product publishes overlap and migration guidance. | Usage inventory, consumer owners, replacement equivalence, data totals, schedule migration and retirement decision. | Keep the deprecated report read-only during the approved window; block new consumers. | Unknown file consumers can fail silently after retirement and create stale management reports. | Reporting | Planned |
| RLS-024 | Failed SaaS pilot requiring pause | Shared SaaS | Pilot tenants show elevated posting latency and support cases after activation. | Operations pauses further rings; Finance validates posting integrity; Performance Engineering compares candidate/baseline; Release decides rollback or fix. | Ring cohort/version, p95/p99 and DB contribution, posting totals, error taxonomy, support cases and stop decision. | Disable optional capability or reactivate compatible prior artifact; reconcile all pilot transactions. | A technical rollback without checking queued/retried postings can duplicate financial effects. | Operations | Conceptual target architecture |
| RLS-025 | Customer requests direct core fork | Dedicated/on-premises | A customer asks for a bespoke core calculation that conflicts with supported product semantics. | Product assesses reusable need; Domain and Architecture consider configuration/extension; a fork requires executive exception, delta ownership and reintegration/retirement. | Business rationale, affected invariants, alternatives, cost/support/security impact, upgrade delta and customer acceptance. | Prefer sealed extension; if exception expires, migrate back to core or retire the deviation. | A permanent fork misses security fixes and makes every future migration customer-specific. | Product Council | Planned |
| RLS-026 | Schema correction after partial migration | Dedicated | A batch migration stops after some rows gain target values and others remain old. | Migration runner uses durable checkpoints; Data classifies states; application remains dual-compatible; a corrected forward migration resumes from verified scope. | Migration status table/direction, checkpoint, row-state query, error sample, corrected script, replay and totals. | Do not rerun blindly; resume idempotently or apply targeted correction with retained failed evidence. | Duplicate transformation or skipped rows can remain hidden behind a successful schema version. | Database Engineering | Planned |
| RLS-027 | Release during finance close blackout | SaaS | A general release window overlaps month-end close for several customers. | Customer Impact Forum excludes affected tenants or reschedules; Security may override only for urgent exposure with Finance-approved mitigations. | Customer close calendars, affected tenant list, security urgency, posting/report readiness and communication. | Delay activation for close tenants; if urgent, use smallest patch and dedicated reconciliation/support watch. | A broad release can lengthen close or make certification evidence incomparable across versions. | Customer Impact Forum | Planned |
| RLS-028 | Localization package update | Multi-country | A tax/localization package changes an effective rule for one jurisdiction. | Localization owner obtains qualified interpretation; Tax and Domain approve effective date; package dependency and historical behavior remain explicit. | Rule source, jurisdiction, effective date, test cases, core range, tax/report reconciliation and customer notice. | Retain prior version for historical records; issue explicit correction if authority changes retrospectively. | A localization package can override core tax authority or apply the new rule to the wrong company/country. | Localization Governance | Future |
| RLS-029 | Documentation-only architecture release | Documentation | FCSB-024 and the Series Index change without application artifacts. | Document owner validates code/title/status, links, evidence claims, diagrams, tables, semantic uniqueness and roadmap sequence; Release trace is the documentation commit. | Changed-file list, validation results, reviewer scope, commit hash, branch and remote synchronization. | Revert or supersede documentation without implying application rollback. | A documentation status can be mistaken for implemented software or production approval. | Enterprise Architecture | Partial |
| RLS-030 | Support-line retirement | All customer models | A major product line reaches end of support while some on-premises customers remain. | Product confirms replacement and contractual position; Security describes residual exposure; Customer Success drives upgrade plans; Release records final supported artifact. | Install base/version inventory, adoption blockers, migration guides, security posture, notices, exceptions and retirement approval. | Provide only the approved extended-support exception or isolate risk; do not create undocumented patches indefinitely. | Unknown installations or local forks can remain exposed after the team stops testing the line. | Product Governance | Planned |

## Chapter 48 — Product and Release Risk Register

Every condition below describes a concrete failure mechanism. Residual direction is qualitative because no production release-control runtime or measured risk baseline exists.

| Risk ID | Area | Risk | Triggering condition | Technical or business impact | Specific mitigation/control | Accountable owner | Residual-risk direction |
|---|---|---|---|---|---|---|---|
| RSK-024-001 | Product governance | Customer request becomes permanent fork | A customer-specific rule is coded into core without product-fit or extension analysis. | Every upgrade carries divergent logic, security fixes lag, and support cost compounds by customer. | Require core/industry/localization/extension classification, Architecture approval for any fork, delta inventory and dated reintegration or retirement. | Product Governance | Declines as sealed extension points cover valid variation and fork exceptions expire. |
| RSK-024-002 | Product governance | Release date overrides domain authority | Schedule pressure allows Release or Engineering to approve finance, inventory or manufacturing meaning. | The product ships behavior no accountable domain accepted, creating incorrect postings, stock or production decisions. | Make domain-semantic gate independently owned and non-delegable; unresolved meaning creates a new candidate or defer decision. | Domain Governance | Remains material until release records prove the correct domain acceptance. |
| RSK-024-003 | Product governance | Capability marked generally available from a scaffold | A route, DTO or metadata flag is presented as supported product capability without end-to-end evidence. | Customers contract for behavior lacking runtime, support, recovery or compatibility. | Use the maturity lifecycle, evidence-linked status and Product/Release approval before availability claims. | Product Governance | Declines with periodic status audits and support inventory reconciliation. |
| RSK-024-004 | Product governance | Product Council accumulates unresolved exceptions | Temporary waivers recur without remediation or portfolio trade-off. | Control debt becomes the normal product model and risk is hidden across releases. | Trend exception cause and age, cap renewal authority, and escalate repeated debt to Product Council and Architecture Board. | Architecture Board | Declines when expired exceptions block candidates and funded remediation closes root causes. |
| RSK-024-005 | Product governance | Customer impact assessed after candidate freeze | Affected deployments, calendars or extensions are discovered only during rollout. | Release timing slips or customers receive unsafe/unplanned changes. | Inventory customer model/version/extensions during assessment and refresh before freeze; Customer Impact gate owns completeness. | Customer Impact Forum | Declines when supported install inventory and blackout calendars are current. |
| RSK-024-006 | Product governance | Ownership ends at release | No owner is accountable for adoption, defects, deprecation or support after deployment. | Orphan capabilities persist without maintenance or retirement decisions. | Capability lifecycle record carries Product and Domain ownership through maintenance and retirement. | Product Governance | Declines when every available capability has lifecycle owner and review date. |
| RSK-024-007 | Product governance | Documentation changes redefine approved authority | A later draft silently changes a domain or security boundary set by an earlier controlled volume. | Teams implement contradictory rules and cannot explain which decision governed. | Apply authority hierarchy, cross-volume impact review and explicit ADR/change control; preserve superseded versions. | Enterprise Architecture | Declines after controlled-source reconciliation and Architecture Board approval. |
| RSK-024-008 | Product governance | Release metrics drive gaming | Teams optimize deployment count or lead time by splitting releases, hiding failures or bypassing gates. | Metrics improve while customer risk and product quality deteriorate. | Pair flow metrics with change failure, escaped defect, exception and business-outcome measures; audit definitions and incentives. | Product Governance | Declines when reviews use balanced indicators and investigate anomalous reporting. |
| RSK-024-009 | Source control | Unprotected master accepts unreviewed change | Repository settings permit direct or insufficiently reviewed integration. | Unsafe code or migration enters the accepted source baseline without independent evidence. | Adopt protected-branch policy, required reviews/checks, restricted overrides and audit of emergency use. | Engineering Authority | Declines only after repository controls and bypass monitoring are implemented. |
| RSK-024-010 | Source control | Release tag points to wrong commit | A manual tag is created from an unapproved or moving candidate reference. | Customers and operators cannot reproduce the intended release source. | Release Authority verifies exact candidate commit and manifest before immutable tag creation; record tag-to-artifact mapping. | Release Management | Declines when tag creation is controlled and mismatches are automatically rejected. |
| RSK-024-011 | Source control | Hotfix never returns to successor line | A correction is patched only on an old support branch. | The vulnerability or defect reappears in the next minor/major release. | Hotfix manifest lists maintained lines and merge-back commits; closure requires regression evidence on each affected successor. | Engineering Authority | Declines when support-line comparison detects missing correction. |
| RSK-024-012 | Source control | Customer source divergence remains undisclosed | Customer-operated code changes are omitted from support inventory. | FlowCraft guidance and patches are applied to an unknown code base. | Require version and delta attestation for support, classify fork status and supply a reintegration plan. | Customer Solution Owner | Remains high for installations that cannot provide a trustworthy inventory. |
| RSK-024-013 | Source control | Candidate changes after evidence collection | A late commit is added without resetting tests and approvals. | Evidence describes different code from the deployed artifact. | Freeze exact source and artifact digests; any content change creates a new candidate and invalidates affected evidence. | Release Authority | Declines when manifest checks compare every gate to candidate identity. |
| RSK-024-014 | Source control | Branch history treated as deployment evidence | A merged commit or tag is assumed to prove production state. | Incident responders diagnose the wrong version and release status is misstated. | Maintain environment deployment records with artifact digest, migration, configuration, operator and verification. | Operations | Declines when support and telemetry resolve live version independently of Git history. |
| RSK-024-015 | Build assurance | Dependency lock changes without review | A transitive resolution changes during maintenance or merge without recognized product code edits. | Behavior, vulnerability or license exposure changes silently. | Review lockfile diff, trusted source, advisory and affected runtime tests; bind final lockfile to candidate. | Engineering Authority | Declines with automated dependency-diff policy and provenance evidence. |
| RSK-024-016 | Build assurance | Environment-dependent build output | Build scripts fetch mutable inputs or embed environment values. | The same source produces different artifacts across promotion stages. | Freeze toolchain/dependencies, isolate build, remove environment secrets/configuration and compare digests from repeated builds. | Engineering Authority | Declines when reproducibility checks pass for supported artifact types. |
| RSK-024-017 | Build assurance | Malicious package enters artifact | A compromised registry account or transitive dependency supplies hostile code. | Build or runtime can exfiltrate data, alter behavior or compromise the release pipeline. | Use trusted registries, dependency review, minimized lifecycle scripts, SBOM/provenance, scanning and revocation direction. | Security | Remains material until supply-chain controls and incident response are exercised. |
| RSK-024-018 | Build assurance | Container base image ages unnoticed | A tagged base image retains vulnerable OS/runtime components while application tests pass. | Supported releases accumulate exploitable components outside npm visibility. | Inventory base digest/version, rebuild on validated advisories, scan image and track supported artifact exposure. | Security | Declines when image inventory and patch cohorts are complete. |
| RSK-024-019 | Build assurance | Artifact contains secret or tenant data | Build context, generated file or test fixture copies sensitive material into an image/package. | Credentials or customer information propagates to registries and customer installs. | Minimize build context, scan source/artifact, use synthetic fixtures, reference secrets at runtime and revoke on detection. | Security | Declines with zero secret findings and tested containment. |
| RSK-024-020 | Build assurance | Artifact registry loses provenance | A stored binary is retained without source, builder, dependency or integrity identity. | Release review and incident response cannot establish origin or tampering. | Require manifest, digest, build identity, provenance evidence, retention and controlled deletion before registry adoption. | Release Engineering | Declines when every deployed artifact resolves to a trusted build record. |
| RSK-024-021 | Release gates | Gate marked passed without evidence identity | An approver records success but not candidate, environment, date or result. | Later changes or stale evidence are mistaken for current readiness. | Gate schema requires evidence URI/version, candidate digest, authority, execution context and freshness. | Release Authority | Declines when incomplete gate records cannot approve promotion. |
| RSK-024-022 | Release gates | Not-applicable abused as waiver | A required security, migration or customer gate is labeled irrelevant to avoid exception approval. | Material risk disappears from the release record. | Require rationale and specialist owner for N/A; policy engine distinguishes N/A from unmet/waived. | Internal Audit | Declines when independent sampling finds no unsupported exclusions. |
| RSK-024-023 | Release gates | Functional tests substitute for recovery evidence | Build and service suites pass, but deployment, restore or forward-fix is unrehearsed. | A production failure becomes prolonged or destructive. | Evidence profile separately requires migration, backup/restore, rollback/forward-fix and operational runbook results. | Operations | Declines when recovery rehearsals match each deployment model and release class. |
| RSK-024-024 | Release gates | Security finding accepted by wrong authority | Product or Engineering closes a high-risk finding without Security/risk-owner decision. | Known exposure ships without accountable acceptance. | Route finding disposition by exposure and policy; record Security assessment, compensating controls, approver and expiry. | Security | Declines when unresolved findings block release automatically. |
| RSK-024-025 | Release gates | UAT uses nonrepresentative business scenario | Users validate happy-path demo data but not currencies, plants, histories or exceptions. | Release passes while real customer workflows or reconciliations fail. | Version representative UAT scenarios by domain and customer profile; document excluded scope and accepted risk. | Quality Authority | Declines as production incidents feed scenario coverage. |
| RSK-024-026 | Release gates | Performance gate compares different workload | Candidate and baseline use different data, environment or workload mix. | A regression is accepted as improvement or noise. | Apply FCSB-023 versioned workload/dataset/environment contract and variance-aware comparison. | Performance Engineering | Declines when raw comparable evidence is retained. |
| RSK-024-027 | Release gates | Release note omits breaking behavior | Technical compatibility is declared while user/process behavior changed. | Customers cannot prepare training, integrations or controls. | Product and domain owners review user, operator and semantic notes against change inventory. | Product Management | Declines when support cases and adoption issues trace back to complete notes. |
| RSK-024-028 | Release gates | Exception expires during rollout | A time-bounded waiver is valid at candidate approval but lapses before later customer cohorts deploy. | Later deployments operate without authorized risk coverage. | Bind exception validity to rollout schedule; pause cohorts at expiry and require renewed independent decision. | Release Authority | Declines when deployment admission checks exception state. |
| RSK-024-029 | Promotion | Environment rebuild changes artifact | Production builds from source again rather than promoting the tested digest. | Production may contain different dependencies or generated output. | Build once, promote immutable artifact and verify digest before deployment. | Release Engineering | Declines when environment-specific rebuild count is zero. |
| RSK-024-030 | Promotion | Configuration drift invalidates rehearsal | Staging and production differ in undocumented flags, limits or endpoints. | A tested candidate behaves differently after promotion. | Version and validate configuration schema/diff; approve environment-specific values and continuously inventory drift. | Operations | Declines when unexplained drift is eliminated and intentional differences are tested. |
| RSK-024-031 | Promotion | Secret rotation confused with application rollback | Operators restore old configuration including obsolete credentials. | Recovery reintroduces compromised or expired secrets. | Separate secret references/versions from artifact configuration; rollback code without reverting security state unless Security approves. | Security | Declines after runbooks and tests preserve rotation state. |
| RSK-024-032 | Promotion | SaaS pilot cohort hides risk | Pilot tenants lack large history, complex scopes, localization or integrations. | Ring evidence overstates readiness for general tenants. | Select representative cohorts against risk dimensions and supplement with synthetic scale/compatibility tests. | Customer Impact Forum | Declines when cohort coverage is explicit and generalization is reviewed. |
| RSK-024-033 | Promotion | Canary cannot detect business corruption | Telemetry observes HTTP errors but not posting, stock or workflow invariants. | Release proceeds while authoritative results are wrong. | Add domain control totals and safe business probes to stop criteria; domain owners interpret deviations. | Domain Governance | Declines when ring decisions include reconciled business outcomes. |
| RSK-024-034 | Promotion | On-premises preflight trusts self-reported version | A customer’s files, schema or local changes differ from the declared baseline. | Installer applies an unsupported path and fails mid-upgrade. | Use read-only inventory/checksum preflight, migration ancestry validation and explicit fork detection. | Customer Operations | Remains material until customer evidence is complete and supportable. |
| RSK-024-035 | Promotion | Deployment succeeds but activation state is unknown | Artifact is installed while feature/tenant entitlement differs across instances. | Users receive inconsistent behavior and support cannot reproduce it. | Record deployment and activation separately; reconcile flag/config state by environment and tenant cohort. | Platform Engineering | Declines with authoritative activation inventory. |
| RSK-024-036 | Promotion | Customer calendar collision | Release overlaps close, stock count, production peak or filing. | Downtime or semantic change disrupts critical business control. | Maintain customer blackout calendar, identify affected cohorts early and require explicit exception for urgent security work. | Customer Impact Forum | Declines as calendar coverage and communication improve. |
| RSK-024-037 | Compatibility | Additive API field breaks strict client | A consumer rejects unknown properties despite provider classifying the change compatible. | Integration fails without a server error during rollout. | Test real old-consumer behavior, publish compatibility assumptions and version when tolerance is not guaranteed. | Integration | Declines when certified consumers follow unknown-field policy. |
| RSK-024-038 | Compatibility | Enum expansion changes partner routing | New status value is accepted by schema but old consumer maps it to default action. | Orders or receipts are misclassified rather than visibly rejected. | Define unknown-value behavior, contract tests and partner adoption; use new version if semantics cannot be safely ignored. | Integration | Declines when all supported consumers certify the expanded domain. |
| RSK-024-039 | Compatibility | Workflow command changes under active instances | A service command removes or reinterprets input used by a pinned definition. | Long-running instances fail or execute different business logic. | Inventory workflow dependencies, preserve compatible command version or migrate instances through approved mapping. | Workflow Governance | Declines when active version/command compatibility is measured. |
| RSK-024-040 | Compatibility | Report renders with altered meaning | Source schema or formula changes but columns still resolve. | Financial or operational totals differ silently. | Version semantic definitions, run source-to-report reconciliation and require domain/Finance certification. | Reporting | Declines when historical and new output are reproducible by definition version. |
| RSK-024-041 | Compatibility | Mobile backend drops old protocol too soon | Backend release assumes immediate client upgrade despite offline/store lag. | Devices cannot upload commands or may lose pending work. | Publish client/backend range, maintain bounded old protocol and provide explicit upgrade/recovery state. | Mobile Product | Remains high until version adoption and pending-command recovery are observable. |
| RSK-024-042 | Compatibility | Customer extension depends on private API | A custom module calls internal service or database detail not declared as extension point. | Core refactor breaks the customer upgrade and encourages fork patches. | Enforce exported contract catalog, static/runtime compatibility tests and reject unsupported dependencies. | Platform Product | Declines as extension SDK/contracts replace private coupling. |
| RSK-024-043 | Compatibility | Localization package applies wrong jurisdiction | Package activation uses tenant rather than company/legal jurisdiction context. | Tax or statutory behavior changes for unaffected entities. | Declare jurisdiction and effective-date predicates; Tax/Localization tests cover multi-company tenants. | Localization Governance | Declines when activation scope and historical application reconcile. |
| RSK-024-044 | Compatibility | Version number masks breaking semantics | A patch/minor label is chosen from code size despite changed rounding, authorization or error behavior. | Consumers skip migration and release governance appropriate to the real impact. | Classify compatibility from observable contract and domain effect; Architecture may reclassify release. | Architecture Board | Declines when breaking-change review is part of candidate intake. |
| RSK-024-045 | Data migration | Accepted migration file is edited | An old migration is changed to make a new environment pass. | Existing databases and new installs produce divergent schemas with the same migration identity. | Protect accepted folders, verify checksums and add a new reviewed forward migration. | Data and Migration Authority | Declines when immutable ancestry is enforced. |
| RSK-024-046 | Data migration | Backfill cannot resume deterministically | A long transformation fails without checkpoint, source version or idempotent rule. | Rerun duplicates or skips records, leaving ambiguous partial state. | Use stable batches, durable checkpoint, transformation version, per-row outcome and source/target totals. | Database Engineering | Declines after interruption/restart rehearsal passes. |
| RSK-024-047 | Data migration | Rollback deletes post-release transactions | Recovery script reverses schema/data after users created records in the new form. | Valid business work and audit history are lost. | Declare irreversible boundary, prefer forward correction and require business authority for restore/lost-work decisions. | Data and Migration Authority | Remains material for every transforming production migration. |
| RSK-024-048 | Data migration | Large index blocks production commands | Migration builds or validates an index with unsafe locking on a history table. | Shop-floor, order or posting transactions time out. | Rehearse on representative history, select reviewed online/concurrent approach, monitor locks and schedule/throttle. | Database Engineering | Declines when lock budget and production journey evidence pass. |
| RSK-024-049 | Data migration | Control totals reconcile only globally | Migration totals match overall but company, currency, item, batch or period partitions are wrong. | Financial or manufacturing records are assigned to incorrect contexts. | Reconcile hierarchically by domain dimensions and sample traceability to source identity. | Domain Data Owner | Declines when detailed differences are zero or explicitly accepted. |
| RSK-024-050 | Data migration | Legacy source retired before evidence closure | Access to mappings, source records or exception files is removed immediately after cutover. | Disputes and audit queries cannot be resolved. | Retain governed source snapshot/archive, mappings, checksums, sign-offs and retrieval owner until retirement approval. | Migration Programme | Declines after retention and retrieval are tested. |
| RSK-024-051 | Data migration | Historical algorithm reapplied silently | Upgrade recalculates old rates, costs or statuses using current rules. | Past reports and audit explanations change without correction record. | Preserve source/rule versions; create explicit derived/correction version with domain approval. | Data Governance | Declines when historical reproduction tests pass. |
| RSK-024-052 | Data migration | Backup exists but restore is unusable | Release proceeds after storage copy without restore and business consistency test. | Recovery window fails or restored database is internally inconsistent. | Validate restore in isolation, migration ancestry, identities, control totals and application compatibility. | Operations | Declines only with current restore evidence for the deployment profile. |
| RSK-024-053 | Extensions | Module manifest omits transitive dependency | Installer validates direct core range but not a nested library or package. | Activation fails or loads incompatible behavior at runtime. | Resolve full dependency graph, lock exact versions and reject cycles/conflicts before staging. | Platform Engineering | Declines when upgrade preview covers all transitive consumers. |
| RSK-024-054 | Extensions | Extension requests excessive permission | A customer module adds a convenient broad role action beyond its use case. | Tenant users gain access to protected data or commands. | Permission diff, least-privilege review, Security/domain approval and negative tests gate install. | Security | Declines as extension permissions are deny-by-default and observable. |
| RSK-024-055 | Extensions | Two packages override same UI or workflow slot | Install order determines behavior without declared conflict policy. | Customer outcome changes unpredictably after upgrade. | Name extension points, merge precedence and conflicts; fail installation instead of last-write-wins. | Platform Product | Declines when resolver detects all conflicting contributions. |
| RSK-024-056 | Extensions | Workflow rollback rewrites completed approvals | Operator tries to return instances to a prior graph by modifying history. | Audit and SoD evidence becomes false. | Pin versions, preserve completed states and use explicit forward migration/reassignment for active work. | Workflow Governance | Declines when runtime forbids history mutation. |
| RSK-024-057 | Extensions | Customer report loses row security | Migrated report bypasses the governed source and reads broader tables. | Cross-company or tenant data is exposed. | Certify dataset/row policy, run negative scope tests and prohibit direct production table credentials. | Reporting | Declines when all published reports resolve through governed security contracts. |
| RSK-024-058 | Extensions | Feature flag becomes permanent architecture | Temporary dual path remains after rollout and accumulates incompatible data states. | Testing and migration complexity grows until neither path can retire. | Every release flag has owner, creation release, expiry, cleanup work and state-convergence plan. | Product Governance | Declines when overdue flags block new release approval. |
| RSK-024-059 | Extensions | Core upgrade overwrites customer configuration | Default migration treats tenant-owned settings as obsolete template data. | Customer behavior is lost or silently reset. | Separate product defaults from tenant values, migrate schemas idempotently and present conflicts for controlled resolution. | Platform Engineering | Declines when upgrade tests include representative customized tenants. |
| RSK-024-060 | Extensions | Uninstall assumed reversible | Package removal deletes fields/data still referenced by transactions, workflows or reports. | Historical records break and dependent packages fail. | Use dependency/data impact analysis; prefer deactivation or forward migration while preserving identities. | Architecture Board | Remains material until package lifecycle and retention contracts exist. |
| RSK-024-061 | Security and operations | Emergency release bypasses independent review | The incident author approves and deploys their own fix. | A malicious or faulty patch gains privileged production access. | Require second qualified reviewer, Security/Release approval and separate deployment identity even on expedited path. | Security | Declines after privileged release controls and retrospective audits are operational. |
| RSK-024-062 | Security and operations | Patch fixes one line but leaves supported versions exposed | Affected-version inventory is incomplete across SaaS, dedicated and on-premises customers. | Known vulnerability remains exploitable in an apparently supported line. | Maintain supported install/version inventory and patch/mitigation status by deployment model. | Security | Remains high where customer-operated inventories are unknown. |
| RSK-024-063 | Security and operations | Advisory leaks exploit detail prematurely | Broad release notes expose weakness before customers can patch. | Attackers gain actionable information during rollout. | Coordinate restricted advisory, embargo/notification authority and staged mitigation without hiding material customer risk. | Security | Declines when communication channels and customer contacts are tested. |
| RSK-024-064 | Security and operations | AI provider changes model silently | Provider alias resolves to a materially different model without FlowCraft evaluation. | Advice quality, privacy, refusal or tool behavior changes outside release control. | Pin model where possible, detect route identity, disable on mismatch and re-run governed evaluation. | AI Governance | Remains high for providers that cannot guarantee version control. |
| RSK-024-065 | Security and operations | AI fallback weakens data policy | Primary route fails and runtime sends sensitive context to an unapproved provider. | Customer data crosses residency or retention boundaries. | Fallback must be approved for same classification/risk or fail closed to non-AI operation. | Privacy | Declines when routing policy and outage tests enforce equivalence. |
| RSK-024-066 | Security and operations | Release telemetry exposes tenant identity | High-cardinality labels or logs include tenant/customer names or sensitive payload. | Observability becomes a cross-tenant confidentiality and cost risk. | Use opaque bounded labels, minimize fields, apply access/retention controls and test redaction. | Security | Declines when telemetry schemas and access reviews pass. |
| RSK-024-067 | Security and operations | Support bundle captures secrets or banking data | Customer diagnostic collection indiscriminately archives configuration, logs and payloads. | Sensitive data leaves customer custody and spreads through tickets. | Use allowlisted collector, local preview/redaction, classification, encryption, expiry and access audit. | Support | Declines when sample bundles show no prohibited content. |
| RSK-024-068 | Security and operations | Operations rolls back without domain reconciliation | Technical metrics recover and incident is closed before queued or accepted business work is checked. | Duplicate, missing or inconsistent transactions remain. | Recovery runbook names domain control totals, pending work, owners and closure acceptance. | Operations | Declines when incident closure requires business verification. |
| RSK-024-069 | Lifecycle | Deprecated API has unknown consumers | No registry or telemetry identifies integrations still using the old contract. | Retirement breaks customers without warning or owner. | Build consumer registry, observe version use, communicate migration and require explicit residual-use decision. | Integration | Remains material until unknown traffic is eliminated. |
| RSK-024-070 | Lifecycle | Support window promises exceed maintenance capacity | Product commits to many concurrent lines across deployment models. | Security fixes and compatibility tests cannot be delivered consistently. | Model support cost, define maintained lines and require Product Council investment or narrower promise. | Product Council | Declines when support inventory matches funded capacity. |
| RSK-024-071 | Lifecycle | Retired feature leaves orphan data | Code and UI are removed while records, permissions, reports or audit references remain. | Historical access fails or sensitive data has no lifecycle owner. | Retirement plan covers data retention, read path, access, purge/hold and dependency cleanup. | Data Governance | Declines after orphan and retrieval tests pass. |
| RSK-024-072 | Lifecycle | Customer misses deprecation communication | Contact, language or channel is wrong and required action is not acknowledged. | Customer remains on unsupported contract or release. | Maintain role-based contacts, delivery evidence, escalation and Customer Success follow-up. | Customer Success | Declines when acknowledgment/action coverage is measured. |
| RSK-024-073 | Lifecycle | Mobile forced upgrade strands offline work | Client is blocked before pending commands and attachments synchronize. | Field or warehouse work is lost or duplicated. | Negotiate protocol, preserve/export pending state and provide tested recovery before hard block. | Mobile Product | Remains high until offline client/runtime exists and is exercised. |
| RSK-024-074 | Lifecycle | Release KPI lacks consistent definition | Business units publish measures with different start/stop timestamps, population exclusions and failure classifications. | Governance decisions compare incompatible data and incentives distort behavior. | Version metric formula, scope, source, owner and quality checks; retain definition with results. | Product Governance | Declines when KPI certification and lineage are established. |
| RSK-024-075 | Lifecycle | FCSB-025 roadmap starts from unapproved release assumptions | Future investment planning treats conceptual FCSB-024 mechanisms as delivered. | Roadmap dependencies, cost and sequence become unreliable. | Handoff only approved decisions, open dependencies and evidence status; retain conceptual labels. | Enterprise Architecture | Declines when Architecture Board reviews the FCSB-024 disposition before roadmap baseline. |
| RSK-024-076 | Lifecycle | Retirement removes emergency recovery knowledge | Runbooks/artifacts for an old line are deleted before retained customer or data obligations end. | A late restore, audit or legal inquiry cannot be supported. | Archive exact final artifacts, migrations, documentation, known issues and retrieval authority for the required period. | Release Management | Declines when archive restoration and custody are tested. |

## Chapter 49 — Architecture Decision Records

Architecture decisions distinguish the normative position from implementation evidence. “Proposed” decisions take effect only through FCSB-024 approval; “Accepted foundation” records a narrow repository fact and does not imply the target control plane exists.

| ADR | Decision | Status | Rationale | Rejected or conditional alternative | Accountable authority | Required realization evidence |
|---|---|---|---|---|---|---|
| ADR-024-001 | One governed product line serves supported deployment models. | Proposed | A common source and release lineage keeps fixes, audit evidence and compatibility coherent. | Permanent customer forks; exceptional forks require executive authority, delta custody and an exit date. | Product Council | Approved product-line policy and fork register. |
| ADR-024-002 | A capability has one lifecycle identity from proposal through retirement. | Proposed | The identity connects value, architecture, implementation, availability, support and deprecation evidence. | Separate roadmap, engineering and support names with manual reconciliation. | Product Governance | Capability register with state history and owners. |
| ADR-024-003 | Product availability is an evidence decision, not code-presence inference. | Proposed | Routes, models and metadata can be scaffolds without operationally supportable behavior. | Treating merge or deployment as general availability. | Product Governance | Signed availability record linked to release manifest. |
| ADR-024-004 | Domain authorities retain semantic acceptance independent of schedule authority. | Proposed | Release timing must not decide finance, inventory, manufacturing or payroll meaning. | Release manager accepts unresolved domain behavior to protect a date. | Architecture Board | Domain gate evidence for every affected invariant. |
| ADR-024-005 | Every release candidate is an immutable source and artifact identity. | Proposed | Evidence remains valid only when it describes exact content. | Moving branch names or rebuilds as candidate identity. | Release Authority | Candidate digest, source ref and evidence bundle. |
| ADR-024-006 | Build once and promote the same artifact digest. | Proposed | Environment rebuilds introduce untested dependency and generation variance. | Recompile independently in test and production. | Release Engineering | Promotion records prove identical digest. |
| ADR-024-007 | Runtime configuration, secrets and customer data remain outside artifacts. | Proposed | Promotion must not carry credentials or tenant state between environments. | Environment-specific images or packaged secret files. | Security | Artifact scan plus configuration and secret references. |
| ADR-024-008 | Release manifests are append-only after approval. | Proposed | Correction history must remain visible and approvals must not silently move. | Editing an approved manifest in place. | Release Authority | Versioned manifest and supersession link. |
| ADR-024-009 | Gate outcomes bind to candidate, environment, evidence version and authority. | Proposed | A bare pass/fail cannot prove freshness or relevance. | Checklist completion without evidence identity. | Quality Authority | Machine-readable gate record with immutable references. |
| ADR-024-010 | Not-applicable is a governed disposition distinct from waiver. | Proposed | A genuinely irrelevant gate and accepted unmet control carry different risk. | Using N/A to bypass exception approval. | Internal Audit | Specialist rationale and decision record. |
| ADR-024-011 | Promotion authority is separated from code authorship. | Proposed | Independent release control reduces accidental and malicious self-approval. | Developer authors, approves and deploys own change. | Release Authority | Identity and role evidence across commit, approval and deploy. |
| ADR-024-012 | Shared SaaS uses risk-based tenant rings with explicit stop criteria. | Proposed | Controlled exposure limits blast radius while business and technical signals mature. | Immediate fleet-wide activation. | Operations | Cohort definition, entry/exit evidence and pause history. |
| ADR-024-013 | Dedicated-cloud upgrades are customer-windowed but product-governed. | Proposed | Isolation changes scheduling, not semantic or security obligations. | Treat each dedicated customer as an independent product fork. | Customer Impact Forum | Customer plan tied to supported artifact and compatibility matrix. |
| ADR-024-014 | Private/on-premises upgrades use a signed bundle and read-only preflight. | Proposed | FlowCraft cannot rely on direct infrastructure control or self-reported state. | Remote mutable installer that discovers incompatibility during write. | Release Engineering | Bundle digest, compatibility declaration and preflight report. |
| ADR-024-015 | Hybrid release plans govern cloud and site components as one compatibility set. | Proposed | Partial availability can split authoritative business processes. | Independent component releases without a compatibility window. | Architecture Board | Cross-component matrix and degraded-mode test. |
| ADR-024-016 | Feature deployment and customer activation are separately recorded. | Proposed | Installed code does not prove that a tenant can or should use behavior. | Single deployed flag used as availability truth. | Product Governance | Deployment record plus tenant activation state. |
| ADR-024-017 | Release flags are temporary controls with expiry and convergence. | Proposed | Permanent dual paths multiply test, data and support states. | Indefinite flags as customer customization. | Architecture Board | Flag owner, creation release, expiry and removal evidence. |
| ADR-024-018 | Customer variation uses configuration or sealed extensions before core forks. | Proposed | Supported variation preserves upgradeability and security-fix reach. | Editing private core internals for each customer. | Platform Product | Extension-point decision and compatibility evidence. |
| ADR-024-019 | Extension packages declare full dependency, permission, data and lifecycle contracts. | Proposed | Install/uninstall risk spans more than code compatibility. | Package name and core version range alone. | Platform Product | Validated manifest and dependency graph. |
| ADR-024-020 | Workflow instances remain pinned to immutable published definitions. | Proposed | Long-running approvals need reproducible authority and audit history. | Mutating a published graph in place. | Workflow Governance | Definition version and instance binding; repository foundation is evidenced by [WorkflowService](../../apps/api/src/workflows/workflows.service.ts). |
| ADR-024-021 | Reports are released against versioned semantic and security contracts. | Proposed | A rendering success can conceal changed totals or scope. | Column-level schema compatibility as sufficient report assurance. | Reporting Governance | Dataset/formula version, row-security tests and reconciliation. |
| ADR-024-022 | Public APIs use explicit compatibility and deprecation contracts. | Proposed | A stable URL prefix alone does not govern consumer behavior. | Assume additive JSON changes are harmless to every client. | Integration Governance | Consumer tests, version range and retirement record; current prefix is evidenced in [main.ts](../../apps/api/src/main.ts). |
| ADR-024-023 | Database migrations are immutable, forward-only records after acceptance. | Accepted foundation | Existing migration ancestry already establishes durable history and must not be rewritten. | Editing prior migration files to accommodate a new change. | Data and Migration Authority | Accepted migration folders and [DBA-002 report](../implementation/DBA-002-foundation-implementation.md). |
| ADR-024-024 | Transforming migrations require restartable checkpoints and reconciliation. | Proposed | Partial failure must have a deterministic continuation and explainable result. | One opaque transaction or blind full rerun for every data volume. | Database Engineering | Checkpoint log, exception ledger and partitioned totals. |
| ADR-024-025 | Post-migration rollback never assumes destructive schema reversal is safe. | Proposed | New-version transactions may make reversal lossy. | Automatic down migration after production activation. | Data and Migration Authority | Declared point of no return and forward-fix/restore decision tree. |
| ADR-024-026 | Historical records preserve source and rule version. | Proposed | Current algorithms must not silently reinterpret closed business history. | Recompute all past results with current logic during upgrade. | Data Governance | Historical reproduction and correction lineage. |
| ADR-024-027 | ERP cutover retains source evidence until reconciliation and retention approval. | Proposed | Audit, dispute and recovery depend on mappings and source identity. | Delete legacy access immediately after go-live. | Migration Programme | Archive custody, checksum, retrieval test and sign-off. |
| ADR-024-028 | Emergency releases accelerate sequence but preserve independent review and traceability. | Proposed | Urgency raises exposure and cannot justify invisible authority. | Single-person build, approval and deployment. | Security Authority | Incident link, second reviewer, minimal diff and retrospective. |
| ADR-024-029 | Security patch cohorts are driven by exposure, not commercial preference. | Proposed | Known vulnerabilities require an authoritative affected-version response. | Patch only customers already scheduled for normal upgrades. | Security Authority | Exposure inventory, mitigation state and cohort completion. |
| ADR-024-030 | AI releases identify provider, model, policy, prompt/tool contract and evaluation set. | Proposed | Model behavior can change without conventional code changes. | Treat provider alias or prompt text as ordinary configuration. | AI Governance | Versioned AI release card and evaluation evidence. |
| ADR-024-031 | AI fallback must meet the same data-policy boundary or fail closed. | Proposed | Availability cannot silently override residency, retention or authorization. | Route any failed request to a convenient secondary provider. | Privacy Authority | Approved routing matrix and outage test. |
| ADR-024-032 | Mobile support uses an explicit client/backend protocol window. | Proposed | Store lag and offline work prevent synchronized upgrades. | Require all devices to upgrade at backend deployment time. | Mobile Product | Compatibility matrix, adoption evidence and pending-work recovery. |
| ADR-024-033 | Deprecation begins with consumer discovery and a supported replacement. | Proposed | Notice without known consumers or viable migration creates unmanaged breakage. | Announce a date first and investigate use later. | Product Governance | Consumer inventory, migration guide and exception record. |
| ADR-024-034 | Retirement covers data, audit, support and recovery—not only UI/code removal. | Proposed | Orphan records and obligations survive feature removal. | Delete implementation after traffic reaches zero. | Data Governance | Retention/access design and archived final artifacts. |
| ADR-024-035 | Recovery chooses forward fix, artifact rollback, configuration reversal or restore explicitly. | Proposed | These actions have different data and authority consequences. | Use the word rollback for every recovery action. | Operations | Incident decision record with chosen mechanism and invariants. |
| ADR-024-036 | Technical health and business verification are separate release signals. | Proposed | HTTP success cannot prove posting, stock, workflow or report correctness. | Promote solely from infrastructure and error-rate metrics. | Operations | Release-aware telemetry plus domain control totals. |
| ADR-024-037 | Release telemetry uses bounded, opaque customer dimensions. | Proposed | Raw tenant identity and payload labels create privacy, isolation and cost exposure. | Log customer names and transaction bodies for convenience. | Security | Approved telemetry schema, redaction and access review. |
| ADR-024-038 | Support handover precedes broad activation. | Proposed | Support must know exact version, risks, diagnostics and escalation before customer contact. | Publish runbooks after general release. | Support Authority | Readiness acceptance and versioned support pack. |
| ADR-024-039 | Customer impact is a release gate with calendar and action ownership. | Proposed | ERP upgrades intersect close, inventory counts, production and filings. | Generic release announcement as sufficient preparation. | Customer Impact Forum | Affected-customer register, blackout check and acknowledgment. |
| ADR-024-040 | Release exceptions are scoped, compensating, expiring and non-precedential. | Proposed | A permanent vague waiver erodes the architecture baseline. | Open-ended approval attached to a release train. | Architecture Board | Exception record with owner, cohort, expiry and closure. |
| ADR-024-041 | Release KPIs pair delivery flow with failure, risk and business outcome. | Proposed | Speed-only metrics reward smaller accounting units and control bypass. | Deployment frequency as the primary success measure. | Product Council | Versioned KPI catalog and periodic data-quality review. |
| ADR-024-042 | Current repository evidence is classified conservatively. | Accepted foundation | Git, scripts, migrations, workflow and audit code prove narrow foundations—not a release platform. | Infer CI/CD, registry, flags or observability from intended architecture. | Enterprise Architecture | Capability matrix links each implemented-foundation statement to a concrete repository path. |
| ADR-024-043 | No CI/CD, artifact registry or fleet orchestrator is assumed present. | Accepted baseline | The repository contains no pipeline configuration or runtime evidence for those services. | Describe target controls as currently implemented. | Enterprise Architecture | Repository inspection and explicit Planned/Future classifications. |
| ADR-024-044 | Documentation releases do not imply application readiness. | Proposed | Architecture approval and production acceptance are different control outcomes. | Reuse blueprint status as software release status. | Architecture Board | Document manifest and separate product release record. |
| ADR-024-045 | FCSB-025 receives approved decisions and open dependencies, not invented delivery claims. | Proposed | Roadmap sequencing must start from evidence and unresolved investment choices. | Treat every FCSB-024 target as funded or built. | Product Council | Approved handoff pack after FCSB-024 review. |

## Chapter 50 — Open Decisions

Open decisions are deliberately not converted into architecture facts. Each must be closed by the named authority with evidence sufficient for the target gate; silence preserves the current Planned or Future classification.

| Open decision | Decision required | Evidence required | Accountable authority | Target gate |
|---|---|---|---|---|
| OD-024-001 | Which Product Council members hold final value, architecture and commercial vetoes? | Named charter, quorum, escalation and conflict-resolution evidence. | Executive Sponsor | Before FCSB-024 approval |
| OD-024-002 | What capability identifier spans roadmap, source, manifest, support and retirement? | Data owner, uniqueness, lifecycle states and integration boundary. | Product Governance | Before product registry design |
| OD-024-003 | Which deployment models and support lines are commercially supported first? | Customer portfolio, regulatory constraints, operating cost and maintenance capacity. | Product Council | Before release-train funding |
| OD-024-004 | What semantic-version promise applies before product version 1.0? | Compatibility commitments, customer contracts and migration expectations. | Release Authority | Before first governed candidate |
| OD-024-005 | Which branch-protection checks and override roles will repository hosting enforce? | Hosting plan, identity groups, review policy and emergency procedure. | Engineering Authority | Before CI/CD activation |
| OD-024-006 | Which CI/CD platform is authoritative? | Security review, runner isolation, deployment reach, cost, regional operation and evidence retention. | Release Engineering | Before pipeline implementation |
| OD-024-007 | Which artifact registry stores containers, packages, SBOMs and signatures? | Registry control plane, retention, immutability, replication, customer access and revocation. | Release Engineering | Before build promotion |
| OD-024-008 | What provenance and signing standard is required per artifact class? | Threat model, customer verification needs, key custody and offline-install constraints. | Security Authority | Before artifact contract approval |
| OD-024-009 | How long are manifests, evidence bundles, artifacts and logs retained? | Audit, legal, support-line, privacy and storage obligations by deployment model. | Records Governance | Before release evidence service |
| OD-024-010 | Which quality gates are mandatory for patch, minor, major and emergency classes? | Risk classification, test inventory, authority ownership and measured execution cost. | Quality Authority | Before gate automation |
| OD-024-011 | What constitutes representative UAT for each ERP domain? | Customer profiles, currencies, jurisdictions, history sizes, exceptions and critical journeys. | Domain Governance | Before general availability gate |
| OD-024-012 | Which performance budgets block promotion and at what confidence? | FCSB-023 approved workloads, baselines, variance, environment parity and business SLOs. | Performance Engineering | Before performance gate implementation |
| OD-024-013 | How are release exceptions stored, approved, expired and made non-precedential? | Workflow authority, schema, notification, enforcement and audit sampling. | Architecture Board | Before first waiver |
| OD-024-014 | Which tenant attributes define SaaS pilot and canary cohorts? | Scale, domain use, localization, integrations, customizations, risk tolerance and consent. | Customer Impact Forum | Before SaaS rollout design |
| OD-024-015 | Which business stop signals can halt automated rollout? | Finance, inventory, manufacturing, workflow and reporting control totals with safe thresholds. | Domain Governance | Before ring automation |
| OD-024-016 | What fleet/customer inventory is authoritative for version and activation state? | Deployment ownership, privacy boundary, customer-operated reporting and reconciliation. | Operations | Before cohort governance |
| OD-024-017 | How will dedicated-cloud customer windows interact with urgent security deadlines? | Contract terms, exposure tiers, mitigation options, escalation and forced-action authority. | Security Authority | Before dedicated upgrade policy |
| OD-024-018 | How will on-premises customers verify signed bundles offline? | Customer key distribution, trust rotation, revocation and air-gapped operating procedure. | Security Authority | Before installer selection |
| OD-024-019 | Which read-only preflight facts are mandatory for private deployments? | Schema ancestry, source/artifact identity, local delta, capacity, backup, integrations and extension inventory. | Customer Operations | Before on-prem upgrade tooling |
| OD-024-020 | What compatibility window governs hybrid site/cloud components during interrupted rollout? | Business process tolerance, protocol negotiation, queue durability and recovery evidence. | Architecture Board | Before hybrid release pilot |
| OD-024-021 | Which feature-control service and data model will support tenant-scoped activation? | Isolation, consistency, audit, expiry, emergency disablement and offline behavior. | Platform Product | Before feature-flag implementation |
| OD-024-022 | Who can create, approve, activate and retire high-risk flags? | SoD analysis, role model, incident path and domain ownership. | Security Authority | Before activation service approval |
| OD-024-023 | What extension points are supported in the first Module Builder release? | Use cases, stability budget, permissions, data lifecycle and upgrade compatibility. | Platform Product | Before package SDK contract |
| OD-024-024 | How are package conflicts and transitive dependencies resolved? | Manifest grammar, precedence, cycles, version solver and customer remediation experience. | Architecture Board | Before installer architecture |
| OD-024-025 | What uninstall behavior preserves transaction history and dependent reports? | Retention obligations, dependency graph, deactivation alternative and read compatibility. | Data Governance | Before package lifecycle approval |
| OD-024-026 | Which workflow command versions remain supported for active instances? | Instance duration, command inventory, semantic change risk and migration tooling. | Workflow Governance | Before workflow release policy |
| OD-024-027 | What report semantic contract is certifiable across upgrades? | Dataset IDs, formula versions, security policy, layout variation and reconciliation owners. | Reporting Governance | Before report publication gate |
| OD-024-028 | Which public API compatibility rules cover unknown fields, enums and errors? | Consumer-language behavior, integration inventory, contract tests and deprecation cost. | Integration Governance | Before external API commitment |
| OD-024-029 | Where is the API consumer registry and who attests current use? | Gateway/runtime telemetry, partner contacts, customer declarations and privacy boundaries. | Integration Governance | Before first API retirement |
| OD-024-030 | What migration runner provides checkpoints, locks and outcome evidence? | Prisma compatibility, transaction strategy, scale testing, multi-tenant sequencing and recovery. | Data and Migration Authority | Before transforming migration |
| OD-024-031 | Which partitioned control totals are mandatory for finance, inventory and manufacturing migration? | Domain invariants, tolerances, ownership and query performance. | Domain Governance | Before ERP cutover design |
| OD-024-032 | What is the authoritative point of no return for each migration class? | Data writes, backward compatibility, backup restore time and business lost-work tolerance. | Data and Migration Authority | Before production migration approval |
| OD-024-033 | Which vulnerability severity and exploitability model determines emergency timing? | Threat intelligence, data/business exposure, customer environment and regulatory deadlines. | Security Authority | Before security SLA publication |
| OD-024-034 | How are customer security advisories delivered under embargo? | Verified contacts, secure channel, translation, acknowledgment, disclosure and legal requirements. | Security Authority | Before first coordinated disclosure |
| OD-024-035 | Which AI providers, regions, models and use cases are allowed? | FCSB-018 risk tiers, data classes, residency, contracts, evaluation and human authority. | AI Governance | Before any AI availability claim |
| OD-024-036 | What mobile protocol window and forced-upgrade rule preserve offline work? | Client distribution lag, queue format, encryption, recovery and minimum secure version. | Mobile Product | Before mobile client release |
| OD-024-037 | Which telemetry platform carries release identity without exposing customer data? | FCSB-023 observability decision, label cardinality, tenancy, retention and access controls. | Operations | Before production ring rollout |
| OD-024-038 | Who certifies support readiness for each deployment model? | Runbook ownership, skills, support hours, diagnostic access, customer responsibilities and escalation. | Support Authority | Before broad availability |
| OD-024-039 | What deprecation notice and support windows apply by contract and deployment model? | Customer obligations, install-base visibility, security capacity, replacement maturity and legal review. | Product Council | Before first deprecation |
| OD-024-040 | Which FCSB-024 decisions are approved inputs versus unresolved investments for FCSB-025? | Architecture Board disposition, capability status, risk acceptance, dependencies, cost and sequence. | Product Council | FCSB-025 entry gate |

## Chapter 51 — Product and Release Governance RACI

The matrix assigns exactly one accountable role and one different responsible role to every activity. Consulted and informed assignments show required participation without diluting decision ownership.

**Legend:** A = accountable; R = responsible; C = consulted; I = informed; — = no standing assignment for that activity.

| Code | Role | Code | Role |
|---|---|---|---|
| PC | Product Council | PG | Product Governance |
| EA | Enterprise Architecture | DA | Domain Authorities |
| RA | Release Authority | PM | Product Management |
| ENG | Engineering | RE | Release Engineering |
| QA | Quality Authority | SEC | Security |
| PRV | Privacy | DATA | Data and Migration Authority |
| DBE | Database Engineering | OPS | Operations |
| SRE | Reliability Engineering | PERF | Performance Engineering |
| INT | Integration Governance | WF | Workflow Governance |
| REP | Reporting Governance | MOD | Module Builder Governance |
| LOC | Localization Governance | MOB | Mobile Product |
| AI | AI Governance | SUP | Support |
| CS | Customer Success | CUST | Customer Operations |
| FIN | Finance Domain | INV | Inventory Domain |
| MFG | Manufacturing Domain | HR | Human Capital Domain |
| AUD | Internal Audit | LEG | Legal and Compliance |
| PROC | Procurement Domain | SAL | Sales and Commercial Domain |

| Activity | PC | PG | EA | DA | RA | PM | ENG | RE | QA | SEC | PRV | DATA | DBE | OPS | SRE | PERF | INT | WF | REP | MOD | LOC | MOB | AI | SUP | CS | CUST | FIN | INV | MFG | HR | AUD | LEG | PROC | SAL |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Approve product-governance charter | A | R | C | — | — | I | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — |
| Maintain capability lifecycle register | I | A | — | C | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — |
| Assess customer request for product fit | — | R | C | C | — | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | I |
| Approve exceptional customer core fork | A | C | R | — | — | — | C | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | I | — | — | — |
| Maintain product outcome and adoption measures | I | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | C | — | — | — | — | — | — | — | — | C |
| Authorize capability general availability | I | A | — | C | R | — | — | — | C | C | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — |
| Withdraw an availability claim | I | A | — | — | C | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | C | — | — | — | — | — | — | — | — | — |
| Prioritize cross-domain release scope | A | R | — | C | C | C | I | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve product support-line portfolio | A | R | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | C | I | — | — | — | — | — | — | C | — | — |
| Prepare FCSB-025 governance handoff | C | A | R | — | C | I | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Maintain architecture authority hierarchy | I | — | A | R | — | — | — | — | — | C | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — |
| Classify a cross-volume architecture change | — | R | A | C | I | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve architecture exception | I | — | A | C | R | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — |
| Audit expired architecture exceptions | I | C | R | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — |
| Accept finance semantic change | — | — | — | R | I | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | A | — | — | — | C | — | — | — |
| Accept inventory semantic change | — | — | — | R | I | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | A | C | — | — | — | — | — |
| Accept manufacturing semantic change | — | — | — | R | I | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | C | A | — | — | — | — | — |
| Accept human-capital semantic change | — | — | — | R | I | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | A | — | — | — | — |
| Accept procurement semantic change | — | — | — | R | I | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | C | — | — | — | — | A | — |
| Accept sales and commercial semantic change | — | — | — | R | I | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | A |
| Approve localization rule effective date | — | — | — | R | I | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — | C | — | — | — | — | C | — | — |
| Interpret statutory or contractual release obligation | I | — | — | — | — | — | — | — | — | C | C | — | — | — | — | — | — | — | — | — | R | — | — | — | — | — | C | — | — | — | — | A | — | — |
| Protect master integration policy | — | — | — | — | C | — | A | R | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | I | — | — | — |
| Review feature-branch change | — | — | — | C | I | — | A | — | R | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Freeze release-candidate source reference | — | — | — | — | A | — | C | R | C | — | — | — | — | I | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Create controlled release tag | — | — | — | — | A | — | C | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | I | — | — | — | — | — | — | C | — | — | — |
| Maintain hotfix merge-back evidence | — | — | — | — | C | — | A | R | C | I | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Review dependency lockfile change | — | — | — | — | — | — | A | C | I | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — |
| Approve third-party component license disposition | I | — | — | — | — | — | C | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | R | — |
| Build immutable application artifact | — | — | — | — | I | — | R | A | C | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Generate software bill of materials | — | — | — | — | I | — | C | R | — | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — |
| Sign release artifact | — | — | — | — | A | — | — | C | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | I | — | — | — | — | C | — | — | — |
| Publish artifact to controlled registry | — | — | — | — | R | — | — | A | — | C | — | — | — | C | — | — | — | — | — | — | — | — | — | I | — | — | — | — | — | — | — | — | — | — |
| Revoke compromised artifact | — | — | — | — | C | — | — | R | — | A | — | — | — | C | — | — | — | — | — | — | — | — | — | — | C | I | — | — | — | — | — | — | — | — |
| Define release manifest schema | — | — | R | — | A | — | I | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | C | — | — | — |
| Assemble candidate release manifest | — | — | — | — | A | — | C | R | C | — | — | C | — | I | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve functional gate | — | — | — | C | I | C | R | — | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve security gate | — | — | — | — | I | — | C | — | R | A | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve privacy gate | — | — | — | — | I | — | — | — | — | R | A | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — |
| Approve migration gate | — | — | — | C | I | — | — | — | — | — | — | A | R | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve performance gate | — | — | — | — | I | — | — | — | R | — | — | — | — | C | C | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve operational-readiness gate | — | — | — | — | I | — | — | — | — | C | — | — | — | A | R | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — |
| Approve customer-impact gate | — | — | — | C | I | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | A | C | — | — | — | — | — | — | — | — |
| Approve domain-semantic gate | — | — | — | A | I | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | C | C | C | — | — | — | — |
| Approve reporting-reconciliation gate | — | — | — | — | I | — | — | — | C | — | — | C | — | — | — | — | — | — | A | — | — | — | — | — | — | — | R | — | — | — | — | — | — | — |
| Record not-applicable gate disposition | I | — | C | — | R | — | — | — | C | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — |
| Authorize production promotion | I | — | — | — | A | — | — | — | C | C | — | C | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Audit release evidence completeness | I | — | — | — | R | — | — | — | C | C | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — |
| Define shared-SaaS tenant cohorts | — | — | — | C | — | — | — | — | — | C | — | — | — | A | C | — | — | — | — | — | — | — | — | — | R | I | — | — | — | — | — | — | — | — |
| Operate SaaS pilot deployment | — | — | — | — | C | — | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | C | I | — | — | — | — | — | — | — | — | — |
| Interpret SaaS business stop signals | — | — | — | A | I | — | — | — | — | — | — | — | — | R | — | — | — | — | C | — | — | — | — | — | — | — | C | C | C | — | — | — | — | — |
| Schedule dedicated-cloud customer upgrade | — | — | — | — | C | I | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | C | A | R | — | — | — | — | — | — | — | — |
| Execute dedicated-cloud deployment | — | — | — | — | C | — | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | I | — | C | — | — | — | — | — | — | — | — |
| Package private-cloud or on-premises bundle | — | — | — | — | I | — | R | A | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — |
| Execute customer-site preflight | — | — | — | — | I | — | — | — | — | C | — | C | — | C | — | — | — | — | — | — | — | — | — | R | — | A | — | — | — | — | — | — | — | — |
| Authorize unsupported customer delta exception | I | — | A | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | C | R | — | — | — | — | — | — | — | — |
| Coordinate hybrid component compatibility window | — | — | A | — | I | — | — | — | — | — | — | — | — | R | C | — | C | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — |
| Pause rollout after threshold breach | — | — | — | C | C | — | — | — | — | C | — | — | — | A | R | — | — | — | — | — | — | — | — | — | I | — | — | — | — | — | — | — | — | — |
| Resume a paused rollout | I | — | — | C | A | — | — | — | C | C | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Maintain customer blackout calendar | — | — | — | — | I | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | R | C | C | C | — | — | — | — | — |
| Define supported customization boundary | I | C | A | — | — | — | C | — | — | C | — | — | — | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve Module Builder package contract | — | — | R | — | — | — | I | — | — | C | — | C | — | — | — | — | — | C | — | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Validate module dependency graph | — | — | — | — | I | — | R | C | — | C | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve extension permission diff | — | — | — | C | I | — | — | — | — | A | — | — | — | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — | C | — | — | — |
| Resolve extension-point conflict | — | I | A | — | — | — | C | — | — | — | — | — | — | — | — | — | — | C | C | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve package data-lifecycle plan | — | — | — | — | I | — | — | — | — | — | — | A | — | — | — | — | — | — | C | R | — | — | — | — | — | — | — | — | — | — | — | C | — | — |
| Govern workflow definition publication | — | — | — | R | I | — | — | — | — | C | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — |
| Approve active workflow version migration | — | — | — | C | I | — | R | — | — | — | — | C | — | C | — | — | — | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Certify report semantic version | — | — | — | R | I | — | — | — | C | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — |
| Verify report row-security behavior | — | — | — | — | I | — | — | — | C | A | — | — | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — |
| Approve public API compatibility rule | — | — | R | — | I | — | C | — | — | — | — | — | — | — | — | — | A | — | — | C | — | C | — | — | — | — | — | — | — | — | — | — | — | — |
| Certify integration consumer migration | — | — | — | — | I | — | — | — | R | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — | C | C | — | — | — | — | — | — | — | — |
| Authorize API retirement | I | A | C | — | — | — | — | — | — | — | — | — | — | — | — | — | R | — | — | — | — | — | — | C | C | — | — | — | — | — | — | — | — | — |
| Own finance migration reconciliation | — | — | — | — | I | — | — | — | — | — | — | R | C | — | — | — | — | — | C | — | — | — | — | — | — | — | A | — | — | — | C | — | — | — |
| Own inventory migration reconciliation | — | — | — | — | I | — | — | — | — | — | — | R | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | C | — | C | — | — | — |
| Own manufacturing migration reconciliation | — | — | — | — | I | — | — | — | — | — | — | R | C | — | — | — | — | — | — | — | — | — | — | — | — | — | C | C | A | — | — | — | — | — |
| Design restartable data backfill | — | — | — | — | I | — | C | — | — | — | — | A | R | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Execute production database migration | — | — | — | — | I | — | — | — | — | — | — | C | A | R | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Approve migration point of no return | I | — | — | C | C | — | — | — | — | — | — | A | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — |
| Retain legacy source evidence | — | — | — | — | — | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | I | C | — | — | — | — | C | A | — | — |
| Certify backup restore before migration | — | — | — | — | I | — | — | — | — | — | — | C | C | A | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Classify vulnerability release urgency | — | — | — | — | I | — | R | — | — | A | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — |
| Approve emergency release | I | — | — | — | R | — | — | — | C | A | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Deploy emergency correction | — | — | — | — | — | — | — | R | — | C | — | — | — | A | C | — | — | — | — | — | — | — | — | I | — | — | — | — | — | — | — | — | — | — |
| Coordinate customer security advisory | — | — | — | — | — | — | — | — | — | A | C | — | — | — | — | — | — | — | — | — | — | — | — | C | R | I | — | — | — | — | — | C | — | — |
| Procure external release or security service | I | — | — | — | — | — | — | C | — | R | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | A | — |
| Approve AI release risk tier | — | — | — | C | I | — | — | — | — | C | R | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — | — | C | — | — |
| Execute AI evaluation suite | — | — | — | C | I | — | — | — | R | — | C | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — | — | — | — | — |
| Authorize AI provider fallback | — | — | — | — | I | — | — | — | — | C | A | — | — | C | — | — | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | C | — | — |
| Approve mobile client/backend compatibility window | — | — | — | — | I | — | — | — | — | C | — | — | — | C | — | — | R | — | — | — | — | A | — | C | — | — | — | — | — | — | — | — | — | — |
| Release mobile client package | — | — | — | — | I | — | — | — | R | C | — | — | — | — | — | — | C | — | — | — | — | A | — | C | — | — | — | — | — | — | — | — | — | — |
| Recover offline work during forced upgrade | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | A | — | R | I | C | — | — | — | — | — | — | — | — |
| Define release-aware telemetry schema | — | — | — | — | I | — | — | — | — | C | C | — | — | R | A | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Operate release health dashboard | — | — | — | — | I | — | — | — | — | — | — | — | — | A | R | C | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — |
| Investigate performance regression | — | — | — | — | I | — | C | — | — | — | — | — | C | C | R | A | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — |
| Prepare deployment runbook | — | — | — | — | I | — | — | C | — | C | — | C | — | A | — | — | — | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — |
| Accept support handover | — | — | — | — | I | — | — | — | C | — | — | — | — | R | — | — | — | — | — | — | — | — | — | A | C | — | — | — | — | — | — | — | — | — |
| Triage release-related customer case | — | — | — | — | I | C | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | A | R | — | — | — | — | — | — | — | — | — |
| Confirm customer post-upgrade business outcome | — | I | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | A | R | — | — | — | — | — | — | — | — |
| Approve production incident closure | — | — | — | R | I | — | — | — | — | C | — | — | — | A | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | C | — | — | — |
| Run post-release review | I | A | — | — | R | — | — | — | C | — | — | — | — | C | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — |
| Maintain release KPI definitions | I | A | — | — | C | — | — | — | — | — | — | — | — | — | — | R | — | — | — | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — |
| Certify release KPI data quality | I | R | — | — | — | — | — | — | — | — | — | — | — | C | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | A | — | — | — |
| Approve capability deprecation | I | A | — | — | — | R | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | C | C | — | — | — | — | — | — | — | — | — |
| Deliver customer deprecation migration plan | — | I | — | — | — | C | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | R | A | C | — | — | — | — | — | — | — | — |
| Authorize capability retirement | A | R | C | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | I | C | — | — |
| Archive final supported release assets | — | — | — | — | A | — | — | — | — | C | — | C | — | — | — | — | — | — | — | — | — | — | — | R | — | — | — | — | — | — | I | C | — | — |
| Verify retired-data retention and access | I | — | — | — | — | — | — | — | — | — | — | A | — | — | — | — | — | — | — | — | — | — | — | C | — | — | — | — | — | — | R | C | — | — |

## Chapter 52 — Approval and Roadmap

Approval of this volume authorizes the target governance model for controlled planning; it does not declare a CI/CD platform, artifact registry, feature-control service, deployment orchestrator, release portal, observability platform, package installer, mobile runtime or AI runtime implemented.

### Architecture approval conditions

| Condition | Acceptance evidence | Approving authority |
|---|---|---|
| Authority coherence | No FCSB-024 decision overrides FCSB-001 through FCSB-023 without an explicit, approved cross-volume ADR. | Architecture Board |
| Status integrity | Every current-state claim is linked to concrete repository evidence and every unsupported control is Planned, Future, Partial, Scaffold or Conceptual target architecture. | Enterprise Architecture and Internal Audit |
| Product accountability | Product Council, Product Governance, domain authorities and Release Authority accept their distinct decision rights. | Executive Sponsor |
| Candidate integrity | Candidate identity, build-once promotion, manifest and evidence-binding decisions are accepted before automation selection. | Release Authority |
| Data safety | Immutable migration history, restartable transformation, reconciliation and point-of-no-return rules are accepted. | Data and Migration Authority |
| Security and privacy | Supply-chain, emergency, advisory, telemetry, AI and customer-data boundaries are accepted. | Security and Privacy Authorities |
| Customer operability | Deployment-model profiles, calendars, support handover, communication and customer responsibilities are accepted. | Customer Impact Forum |
| Lifecycle completeness | Availability, deprecation, retirement, archive and retained-data responsibilities have named owners. | Product Council |
| Open-decision discipline | Chapter 50 decisions are assigned and remain unresolved rather than being converted into assumptions. | Architecture Board |
| Documentation control | Only FCSB-024 and the Series Index change; FCSB-025 remains unstarted. | Documentation Owner |

### Controlled realization sequence

1. **Governance foundation:** approve charters, capability identity, decision rights, change classes, exception schema and current-state evidence rules.
2. **Release identity foundation:** select source protections, candidate/manifests, build platform, registry, provenance/signing and retention.
3. **Evidence gates:** implement functional, security, privacy, migration, performance, operational, customer-impact and semantic gate records.
4. **Promotion controls:** establish environment inventory, immutable promotion, configuration/secret separation and deployment-model-specific admission.
5. **Customer release controls:** introduce SaaS rings, dedicated windows, private/on-premises preflight and hybrid compatibility orchestration.
6. **Extensibility governance:** deliver temporary feature controls, supported extension contracts, Module Builder manifests, workflow/report/API compatibility.
7. **Data and recovery controls:** implement checkpointed migration, hierarchical reconciliation, restore rehearsal, forward-fix and incident business verification.
8. **Lifecycle and learning:** operationalize support inventory, release telemetry, KPIs, post-release review, deprecation and archive retrieval.

Each phase requires a separate funded delivery decision and evidence update. The sequence is not a promise that the corresponding runtime exists today.

### Approval record

| Field | Required value |
|---|---|
| Decision | Approve, approve with dated conditions, return for revision, or reject |
| Scope | FCSB-024 product governance and release architecture only |
| Decision authorities | Product Council, Architecture Board, Release Authority, Security, Data and Migration, Operations and Internal Audit |
| Evidence baseline | Repository and FCSB sources cited in Chapters 03 and 46 |
| Unresolved matters | Chapter 50 open-decision identifiers, owners and target gates |
| Risk disposition | Chapter 48 risks accepted, mitigated, transferred or assigned for treatment |
| Effective version | Approved document commit and Series Index record |
| Supersession | A later controlled FCSB-024 version or explicit cross-volume ADR |

### Version history

| Version | Date | Status | Change |
|---|---|---|---|
| 1.0 | 2026-07-20 | Architecture Review Draft | First controlled FCSB-024 product governance and release architecture; documentation-only. |

### FCSB-025 entry boundary

The next planned volume remains **FCSB-025 — Product Roadmap and Future Vision**. It may begin only after FCSB-024 is committed, pushed, indexed and presented for architecture review. Its inputs are the approved decision set, capability-status baseline, unresolved investment decisions, risk ownership and realization sequence from this volume. This section does not start, outline or pre-approve FCSB-025.

**Approval gate:** architecture review pending.
