# FlowCraft Solution Blueprint

## Volume 14 — Finance Solution Architecture

| Attribute | Value |
|---|---|
| Document code | FCSB-014 |
| Version | 1.0 Draft |
| Status | Architecture Review Draft |
| Last updated | 2026-07-16 |
| Approval | Pending Architecture Board, Finance, Tax, Treasury, Data Governance, Security, Internal Audit, Inventory, Procurement, Sales, Manufacturing, Projects, Payroll, Integration, Reporting and Operations Review |
| Related volumes | [FCSB-001](./FCSB-Volume-1-Executive-and-Business-Architecture.md) through [FCSB-013](./FCSB-Volume-13-Reporting-and-Analytics-Architecture.md) |
| Next planned volume | FCSB-015 — Inventory and Warehouse Architecture |

This is a controlled architecture review draft. It does not authorize financial implementation, statutory compliance, direct database posting, payment release, or an external banking, tax, AI, or ledger technology selection.

## Chapter 1 — Purpose and Scope

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

## Chapter 2 — Executive Summary

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

## Chapter 3 — Finance Architecture Principles

**Finance authority rule:** Finance exclusively owns authoritative accounting entries, journals, subledger-to-ledger reconciliation, accounting periods, financial balances and certified financial statements. Other domains may request accounting effects but cannot write General Ledger or subledger balances directly. This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

## Chapter 4 — Current Finance Baseline

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
flowchart LR
  A[Current Finance Baseline request] --> B[Finance validation]
  B --> C[Governed control]
  C --> D[Auditable outcome]
~~~

## Chapter 5 — Target Finance Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
sequenceDiagram
  participant S as Source domain
  participant F as Finance
  participant L as Ledger
  S->>F: Request effect
  F->>F: Validate and approve
  F->>L: Controlled result
~~~

## Chapter 6 — Finance Organization Model

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Validated
  Validated --> Approved
  Approved --> Posted
  Posted --> Reversed
  Posted --> Archived
~~~

## Chapter 7 — Chart of Accounts Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
classDiagram
  class FinanceArtifact {+identity +company +status}
  class Control {+owner +effectiveDate}
  class Outcome {+audit +reconciliation}
  FinanceArtifact --> Control
  Control --> Outcome
~~~

## Chapter 8 — Account Classification and Control

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
flowchart LR
  A[Account Classification and Control request] --> B[Finance validation]
  B --> C[Governed control]
  C --> D[Auditable outcome]
~~~

## Chapter 9 — Fiscal Year and Period Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
sequenceDiagram
  participant S as Source domain
  participant F as Finance
  participant L as Ledger
  S->>F: Request effect
  F->>F: Validate and approve
  F->>L: Controlled result
~~~

## Chapter 10 — Journal Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Validated
  Validated --> Approved
  Approved --> Posted
  Posted --> Reversed
  Posted --> Archived
~~~

## Chapter 11 — Journal Lifecycle

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
classDiagram
  class FinanceArtifact {+identity +company +status}
  class Control {+owner +effectiveDate}
  class Outcome {+audit +reconciliation}
  FinanceArtifact --> Control
  Control --> Outcome
~~~

## Chapter 12 — Journal Validation

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
flowchart LR
  A[Journal Validation request] --> B[Finance validation]
  B --> C[Governed control]
  C --> D[Auditable outcome]
~~~

## Chapter 13 — Posting Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
sequenceDiagram
  participant S as Source domain
  participant F as Finance
  participant L as Ledger
  S->>F: Request effect
  F->>F: Validate and approve
  F->>L: Controlled result
~~~

## Chapter 14 — Account Determination Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Validated
  Validated --> Approved
  Approved --> Posted
  Posted --> Reversed
  Posted --> Archived
~~~

## Chapter 15 — General Ledger Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
classDiagram
  class FinanceArtifact {+identity +company +status}
  class Control {+owner +effectiveDate}
  class Outcome {+audit +reconciliation}
  FinanceArtifact --> Control
  Control --> Outcome
~~~

## Chapter 16 — Ledger and Book Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
flowchart LR
  A[Ledger and Book Architecture request] --> B[Finance validation]
  B --> C[Governed control]
  C --> D[Auditable outcome]
~~~

## Chapter 17 — Accounts Payable Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
sequenceDiagram
  participant S as Source domain
  participant F as Finance
  participant L as Ledger
  S->>F: Request effect
  F->>F: Validate and approve
  F->>L: Controlled result
~~~

## Chapter 18 — Supplier Invoice Lifecycle

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Validated
  Validated --> Approved
  Approved --> Posted
  Posted --> Reversed
  Posted --> Archived
~~~

## Chapter 19 — Accounts Receivable Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
classDiagram
  class FinanceArtifact {+identity +company +status}
  class Control {+owner +effectiveDate}
  class Outcome {+audit +reconciliation}
  FinanceArtifact --> Control
  Control --> Outcome
~~~

## Chapter 20 — Customer Invoice and Receipt Lifecycle

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
flowchart LR
  A[Customer Invoice and Receipt Lifecycle request] --> B[Finance validation]
  B --> C[Governed control]
  C --> D[Auditable outcome]
~~~

## Chapter 21 — Open-Item and Settlement Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
sequenceDiagram
  participant S as Source domain
  participant F as Finance
  participant L as Ledger
  S->>F: Request effect
  F->>F: Validate and approve
  F->>L: Controlled result
~~~

## Chapter 22 — Payment Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Validated
  Validated --> Approved
  Approved --> Posted
  Posted --> Reversed
  Posted --> Archived
~~~

## Chapter 23 — Cash and Bank Management

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
classDiagram
  class FinanceArtifact {+identity +company +status}
  class Control {+owner +effectiveDate}
  class Outcome {+audit +reconciliation}
  FinanceArtifact --> Control
  Control --> Outcome
~~~

## Chapter 24 — Bank Reconciliation Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
flowchart LR
  A[Bank Reconciliation Architecture request] --> B[Finance validation]
  B --> C[Governed control]
  C --> D[Auditable outcome]
~~~

## Chapter 25 — Treasury Direction

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
sequenceDiagram
  participant S as Source domain
  participant F as Finance
  participant L as Ledger
  S->>F: Request effect
  F->>F: Validate and approve
  F->>L: Controlled result
~~~

## Chapter 26 — Tax Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Validated
  Validated --> Approved
  Approved --> Posted
  Posted --> Reversed
  Posted --> Archived
~~~

## Chapter 27 — Tax Determination and Posting

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
classDiagram
  class FinanceArtifact {+identity +company +status}
  class Control {+owner +effectiveDate}
  class Outcome {+audit +reconciliation}
  FinanceArtifact --> Control
  Control --> Outcome
~~~

## Chapter 28 — Fixed Assets Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
flowchart LR
  A[Fixed Assets Architecture request] --> B[Finance validation]
  B --> C[Governed control]
  C --> D[Auditable outcome]
~~~

## Chapter 29 — Depreciation Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
sequenceDiagram
  participant S as Source domain
  participant F as Finance
  participant L as Ledger
  S->>F: Request effect
  F->>F: Validate and approve
  F->>L: Controlled result
~~~

## Chapter 30 — Budget Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Validated
  Validated --> Approved
  Approved --> Posted
  Posted --> Reversed
  Posted --> Archived
~~~

## Chapter 31 — Commitment and Encumbrance Direction

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
classDiagram
  class FinanceArtifact {+identity +company +status}
  class Control {+owner +effectiveDate}
  class Outcome {+audit +reconciliation}
  FinanceArtifact --> Control
  Control --> Outcome
~~~

## Chapter 32 — Accrual and Deferral Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
flowchart LR
  A[Accrual and Deferral Architecture request] --> B[Finance validation]
  B --> C[Governed control]
  C --> D[Auditable outcome]
~~~

## Chapter 33 — Recurring Journal Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
sequenceDiagram
  participant S as Source domain
  participant F as Finance
  participant L as Ledger
  S->>F: Request effect
  F->>F: Validate and approve
  F->>L: Controlled result
~~~

## Chapter 34 — Allocation Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Validated
  Validated --> Approved
  Approved --> Posted
  Posted --> Reversed
  Posted --> Archived
~~~

## Chapter 35 — Cost Center and Profit Center Accounting

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
classDiagram
  class FinanceArtifact {+identity +company +status}
  class Control {+owner +effectiveDate}
  class Outcome {+audit +reconciliation}
  FinanceArtifact --> Control
  Control --> Outcome
~~~

## Chapter 36 — Intercompany Accounting

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
flowchart LR
  A[Intercompany Accounting request] --> B[Finance validation]
  B --> C[Governed control]
  C --> D[Auditable outcome]
~~~

## Chapter 37 — Foreign Currency Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
sequenceDiagram
  participant S as Source domain
  participant F as Finance
  participant L as Ledger
  S->>F: Request effect
  F->>F: Validate and approve
  F->>L: Controlled result
~~~

## Chapter 38 — Revaluation and Translation

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Validated
  Validated --> Approved
  Approved --> Posted
  Posted --> Reversed
  Posted --> Archived
~~~

## Chapter 39 — Inventory and Manufacturing Accounting Boundaries

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
classDiagram
  class FinanceArtifact {+identity +company +status}
  class Control {+owner +effectiveDate}
  class Outcome {+audit +reconciliation}
  FinanceArtifact --> Control
  Control --> Outcome
~~~

## Chapter 40 — Procurement, Sales, Project and Payroll Boundaries

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
flowchart LR
  A[Procurement, Sales, Project and Payroll Boundaries request] --> B[Finance validation]
  B --> C[Governed control]
  C --> D[Auditable outcome]
~~~

## Chapter 41 — Period Close Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
sequenceDiagram
  participant S as Source domain
  participant F as Finance
  participant L as Ledger
  S->>F: Request effect
  F->>F: Validate and approve
  F->>L: Controlled result
~~~

## Chapter 42 — Reconciliation Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Validated
  Validated --> Approved
  Approved --> Posted
  Posted --> Reversed
  Posted --> Archived
~~~

## Chapter 43 — Financial Reporting Architecture

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
classDiagram
  class FinanceArtifact {+identity +company +status}
  class Control {+owner +effectiveDate}
  class Outcome {+audit +reconciliation}
  FinanceArtifact --> Control
  Control --> Outcome
~~~

## Chapter 44 — Finance Security, SoD and Audit

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
flowchart LR
  A[Finance Security, SoD and Audit request] --> B[Finance validation]
  B --> C[Governed control]
  C --> D[Auditable outcome]
~~~

## Chapter 45 — Finance Capability, Risk, Example and Responsibility Models

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

~~~mermaid
sequenceDiagram
  participant S as Source domain
  participant F as Finance
  participant L as Ledger
  S->>F: Request effect
  F->>F: Validate and approve
  F->>L: Controlled result
~~~

### Finance capability matrix

| Capability ID | Capability | Owner | Current status | Target maturity | Dependencies | Authority | Priority |
|---|---|---|---|---|---|---|---|
| FIN-CAP-001 | Finance organization | Finance | Implemented foundation | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-002 | Legal-entity mapping | Finance | Implemented foundation | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-003 | Company scope | Finance | Implemented foundation | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-004 | Branch and plant dimensions | Finance | Implemented foundation | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-005 | Cost-center hierarchy | Finance | Implemented foundation | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-006 | Profit-center hierarchy | Finance | Implemented foundation | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-007 | Chart of accounts | Finance | Implemented foundation | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-008 | Account groups | Finance | Implemented foundation | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-009 | Account hierarchy | Finance | Implemented foundation | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-010 | Account effective dating | Finance | Implemented foundation | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-011 | Account currency restriction | Finance | Implemented foundation | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-012 | Control accounts | Finance | Implemented foundation | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-013 | Suspense governance | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-014 | Fiscal variants | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-015 | Period calendar | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-016 | Soft close | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-017 | Hard close | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-018 | Period reopening | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-019 | Journal identity | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-020 | Journal batches | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-021 | Journal lines | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-022 | Debit-credit balancing | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-023 | Journal approval | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-024 | Journal posting | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-025 | Journal reversal | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-026 | Posting idempotency | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-027 | Posting outbox | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-028 | Account determination | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-029 | Posting profile | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-030 | Posting simulation | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-031 | General ledger | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-032 | Ledger balances | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-033 | Opening carry-forward | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-034 | Secondary ledger direction | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-035 | AP supplier invoice | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-036 | AP credit note | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-037 | Three-way match | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-038 | Non-PO invoice | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-039 | Supplier advance | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-040 | Supplier payment | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-041 | Payment proposal | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-042 | Payment dual control | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-043 | AR customer invoice | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-044 | AR credit note | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-045 | Customer receipt | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-046 | Collections | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-047 | Open-item clearing | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-048 | Partial settlement | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-049 | Write-off | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-050 | Bank master | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-051 | Bank statement import | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-052 | Bank reconciliation | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-053 | Cash positioning | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-054 | Treasury direction | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-055 | Tax codes | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P1 |
| FIN-CAP-056 | Tax determination | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-057 | Withholding direction | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-058 | Fixed asset register | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-059 | Asset capitalization | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-060 | Depreciation direction | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-061 | Asset disposal | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-062 | Budget versioning | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-063 | Budget revisions | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-064 | Commitments | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-065 | Encumbrance direction | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-066 | Accrual schedule | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-067 | Deferral schedule | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-068 | Recurring journals | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-069 | Allocation rules | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-070 | Cost accounting direction | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-071 | Intercompany pairing | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-072 | Intercompany reconciliation | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-073 | Foreign currency | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-074 | Realized gain/loss | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-075 | Revaluation | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-076 | Translation direction | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-077 | Inventory accounting | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-078 | Manufacturing accounting | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-079 | Procurement accounting | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-080 | Sales accounting | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-081 | Project accounting | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-082 | Payroll journal import | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-083 | Period close cockpit | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-084 | Subledger reconciliation | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-085 | Financial statements | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-086 | AP aging | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-087 | AR aging | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-088 | Finance reporting certification | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-089 | Report lineage | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-090 | Finance audit | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-091 | Segregation of duties | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-092 | Break-glass | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-093 | Finance permissions | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-094 | Secure export | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-095 | Data retention | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-096 | Integration contracts | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-097 | Bank API direction | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-098 | Payment file direction | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-099 | E-invoicing direction | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-100 | Finance operations | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-101 | Posting observability | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-102 | Close observability | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-103 | Incident response | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-104 | AI journal draft | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-105 | AI explanation | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-106 | AI payment prohibition | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-107 | Customer customization controls | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-108 | Finance test suite | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-109 | Statutory localization direction | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-110 | Consolidation direction | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-111 | Data migration controls | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-112 | Finance master data | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |
| FIN-CAP-113 | Tax reporting direction | Finance | Planned | Governed controlled capability | FCSB-001–014 | Finance | P2 |

### Finance risk register

| Risk ID | Finance area | Risk | Current condition | Impact | Target mitigation | Owner | Residual-risk direction |
|---|---|---|---|---|---|---|---|
| FIN-RSK-001 | Finance control | Unbalanced journal | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-002 | Finance control | Duplicate journal | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-003 | Finance control | Duplicate posting | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-004 | Finance control | Wrong account | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-005 | Finance control | Wrong company | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-006 | Finance control | Wrong period | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-007 | Finance control | Closed-period posting | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-008 | Finance control | Unauthorized backdating | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-009 | Finance control | Wrong currency | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-010 | Finance control | Wrong exchange rate | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-011 | Finance control | Missing dimension | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-012 | Finance control | Control-account manual posting | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-013 | Finance control | Suspense-account abuse | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-014 | Finance control | Approval bypass | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-015 | Finance control | SoD conflict | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-016 | Finance control | Journal deletion | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-017 | Finance control | Reversal abuse | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-018 | Finance control | Incorrect account determination | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-019 | Finance control | AP duplicate invoice | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-020 | Finance control | Three-way-match bypass | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-021 | Finance control | Supplier fraud | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-022 | Finance control | Unauthorized supplier payment | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-023 | Finance control | Bank-account substitution | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-024 | Finance control | Payment-file tampering | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-025 | Finance control | AR duplicate invoice | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-026 | Finance control | Receipt misallocation | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-027 | Finance control | Improper write-off | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-028 | Finance control | Customer-credit abuse | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-029 | Finance control | Bank reconciliation mismatch | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-030 | Finance control | Unidentified cash | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-031 | Finance control | Tax-rate error | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-032 | Finance control | Tax-jurisdiction error | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-033 | Finance control | Unsupported tax claim | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-034 | Finance control | Asset misclassification | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-035 | Finance control | Wrong depreciation | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-036 | Finance control | Asset disposal fraud | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-037 | Finance control | Budget override | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-038 | Finance control | Commitment omission | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-039 | Finance control | Accrual omission | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-040 | Finance control | Deferral error | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-041 | Finance control | Recurring-journal duplication | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-042 | Finance control | Allocation manipulation | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-043 | Finance control | Cost-center misstatement | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-044 | Finance control | Profit-center misstatement | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-045 | Finance control | Intercompany mismatch | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-046 | Finance control | Currency revaluation error | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-047 | Finance control | Inventory/GL mismatch | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-048 | Finance control | WIP/GL mismatch | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-049 | Finance control | Manufacturing variance error | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-050 | Finance control | Payroll import duplication | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-051 | Finance control | Subledger/GL mismatch | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-052 | Finance control | Suspense not cleared | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-053 | Finance control | Period close incomplete | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-054 | Finance control | Period reopened improperly | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-055 | Finance control | Financial statement error | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-056 | Finance control | Report not reconciled | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-057 | Finance control | Cross-tenant finance access | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-058 | Finance control | Sensitive-field leakage | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-059 | Finance control | Export abuse | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-060 | Finance control | Audit tampering | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-061 | Finance control | Direct database posting | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-062 | Finance control | Integration replay | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-063 | Finance control | Bank API compromise | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-064 | Finance control | AI-generated fraudulent draft | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-065 | Finance control | AI autonomous payment attempt | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-066 | Finance control | Long-running posting | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-067 | Finance control | Posting deadlock | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-068 | Finance control | Failed batch partial state | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-069 | Finance control | Customer customization bypass | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |
| FIN-RSK-070 | Finance control | Statutory localization defect | Scaffold or no runtime | Misstatement, fraud, or disclosure | Validation, SoD, reconciliation, audit | Finance | Reduced |

### Finance transaction and use-case catalog

| Example ID | Example | Finance owner | Source domain | Main transaction | Main accounts/effects | Approval | Reconciliation | Main risk | Current status |
|---|---|---|---|---|---|---|---|---|---|
| FIN-EX-001 | Manual journal | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-002 | Recurring journal | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-003 | Accrual | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-004 | Accrual reversal | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-005 | Prepayment | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-006 | Deferred revenue | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-007 | Deferred expense | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-008 | Supplier invoice | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-009 | Supplier credit note | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-010 | Three-way match | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-011 | Non-PO invoice | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-012 | Supplier advance | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-013 | Supplier payment | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-014 | Payment reversal | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-015 | Customer invoice | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-016 | Customer credit note | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-017 | Customer receipt | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-018 | Unapplied receipt | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-019 | Partial settlement | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-020 | Write-off | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-021 | Refund | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-022 | Bank transfer | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-023 | Bank fee | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-024 | Interest | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-025 | Bank-statement import | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-026 | Bank reconciliation | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-027 | Petty cash | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-028 | Foreign-currency invoice | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-029 | Foreign-currency payment | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-030 | Realized gain/loss | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-031 | Revaluation | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-032 | Tax invoice | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-033 | Withholding direction | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-034 | Asset acquisition | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-035 | Asset capitalization | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-036 | Depreciation | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-037 | Asset transfer | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-038 | Asset improvement | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-039 | Asset disposal | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-040 | Budget creation | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-041 | Budget revision | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-042 | Budget transfer | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-043 | Purchase commitment | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-044 | Commitment relief | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-045 | Cost allocation | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-046 | Profit-center allocation | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-047 | Intercompany invoice | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-048 | Intercompany settlement | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-049 | Intercompany reconciliation | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-050 | Inventory receipt accounting | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-051 | Inventory issue accounting | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-052 | Inventory adjustment accounting | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-053 | Cost-of-goods-sold posting | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-054 | Production material consumption | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-055 | Production completion | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-056 | WIP posting | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-057 | Scrap posting | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-058 | Rework posting | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-059 | Manufacturing variance | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-060 | Payroll journal import | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-061 | Employee expense | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-062 | Project cost | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-063 | Project billing | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-064 | Period close | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-065 | Period reopening | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-066 | Trial balance | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-067 | AP aging | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-068 | AR aging | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-069 | Balance sheet | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-070 | Income statement | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-071 | Cash-flow statement direction | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |
| FIN-EX-072 | AI-generated journal draft | Financial Controller | Governed domain | Controlled finance request | Balanced proposed effect | Finance approval | Subledger to GL | Incorrect determination | Planned |

### Finance RACI

Roles: Architecture Board; CFO/Finance Director; Financial Controller; General Ledger Accountant; AP Accountant; AR Accountant; Treasury; Tax; Fixed Assets Accountant; Cost Accountant; Budget Owner; Procurement; Sales; Inventory; Manufacturing; Projects; Payroll; Security; Internal Audit; Operations.

| Activity ID | Activity | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|---|
| FIN-RAC-001 | Define chart of accounts | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-002 | Create account | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-003 | Change account | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-004 | Open period | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-005 | Close period | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-006 | Reopen period | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-007 | Create journal | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-008 | Approve journal | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-009 | Post journal | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-010 | Reverse journal | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-011 | Configure account determination | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-012 | Enter supplier invoice | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-013 | Approve supplier invoice | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-014 | Release supplier payment | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-015 | Enter customer invoice | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-016 | Allocate receipt | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-017 | Approve write-off | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-018 | Configure bank account | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-019 | Reconcile bank | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-020 | Configure tax | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-021 | Approve tax return direction | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-022 | Create asset | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-023 | Run depreciation | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-024 | Dispose asset | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-025 | Create budget | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-026 | Revise budget | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-027 | Create accrual | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-028 | Configure recurring journal | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-029 | Run allocation | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-030 | Reconcile subledger | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-031 | Reconcile Inventory | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-032 | Reconcile intercompany | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-033 | Run revaluation | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-034 | Execute period close | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-035 | Certify financial statements | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-036 | Review audit | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-037 | Investigate finance incident | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |
| FIN-RAC-038 | Approve AI-generated draft | General Ledger Accountant, Financial Controller | CFO/Finance Director | AP Accountant, AR Accountant, Treasury, Tax, Fixed Assets Accountant, Cost Accountant, Budget Owner, Procurement, Sales, Inventory, Manufacturing, Projects, Payroll, Security, Internal Audit, Operations | Architecture Board |

### Current-versus-target evidence matrix

| Area | Current evidence | Target boundary |
|---|---|---|
| Accounts and journals | Company-scoped schema scaffold and dashboard aggregation | Finance-controlled ledger and immutable postings |
| Exchange rates | Tenant-scoped versioned master service | Finance rate selection and preserved financial effect |
| Partners/tax/terms | Master-data records and validations | Governed AP, AR, tax and payment contracts |
| Workflow/audit | Metadata, audit and Digital DNA foundations | Finance approvals, SoD, lineage and non-repudiation evidence |
| Runtime topology | PostgreSQL/API/web only | Approved future posting, integration, banking and close services |

## Chapter 46 — Decisions, Approval and Roadmap

This chapter defines the controlled Finance target. Current repository evidence is foundation or scaffold only: company-scoped account and journal models, dashboard-derived balances, versioned exchange-rate masters, organizational and partner/tax/term master data, transaction/workflow/number-series metadata, EOR, audit, Digital DNA, reports, and platform topology. No production finance runtime is evidenced. Finance validates domain requests, applies approved account, currency, dimension, period, approval, and segregation-of-duties policy, and alone creates financial truth. Every posting balances; posted journals are immutable; correction is linked reversal or adjustment; closed periods reject ordinary posting. Future work needs approved requirements, controlled data contracts, reconciliation, lineage, tests, runbooks, and operations evidence. AI remains a labelled draft/explanation assistant only and cannot approve, post, pay, reopen, or certify.

### Finance architecture decision register

| Decision ID | Decision | Status | Rationale |
|---|---|---|---|
| FIN-ADR-001 | Finance owns General Ledger and journal authority | Approved | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-002 | Domains request accounting effects through governed contracts | Approved | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-003 | Posted journals are immutable | Approved | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-004 | Posted journals cannot be deleted | Approved | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-005 | Correction uses linked reversal or adjustment | Approved | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-006 | Approval and posting are separate | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-007 | Journal identity and source-transaction identity are separate | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-008 | Every journal balances | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-009 | Control-account manual posting is restricted | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-010 | Closed periods reject ordinary posting | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-011 | Reopening requires exceptional approval | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-012 | Account determination is versioned | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-013 | Chart-of-accounts changes are effective-dated | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-014 | Account numbers are not primary keys | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-015 | Financial dimensions are validated | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-016 | Currency rates are versioned and preserved | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-017 | Realized and unrealized currency effects are separate | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-018 | Subledgers reconcile to General Ledger | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-019 | AP and AR use open-item control | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-020 | Payment release requires dual control | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-021 | AI cannot release payment | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-022 | Bank reconciliation is evidence-based | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-023 | Tax rules are jurisdiction-specific and versioned | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-024 | No unsupported statutory compliance claim is permitted | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-025 | Fixed-assets postings reconcile to GL | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-026 | Depreciation policies are versioned | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-027 | Budgets are versioned and approved | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-028 | Commitments remain separate from actuals | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-029 | Accruals and deferrals use controlled schedules | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-030 | Recurring journals generate controlled journals | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-031 | Allocations are simulated and approved before posting | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-032 | Intercompany entries are paired and reconciled | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-033 | Inventory owns quantity truth | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-034 | Finance owns inventory financial valuation postings | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-035 | Manufacturing requests WIP and variance effects | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-036 | Payroll imports cannot bypass Finance validation | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-037 | Financial reporting uses posted Finance truth | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-038 | Certified statements require reconciliation | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-039 | Finance security is server-enforced | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-040 | SoD applies to setup, posting, payment and close | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-041 | Direct Finance database writes are prohibited | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-042 | External banking uses controlled integration contracts | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-043 | Finance outputs preserve lineage | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-044 | AI may explain or draft only | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-045 | AI cannot post, approve or pay | Proposed | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-046 | Current journal/account models are scaffolds | Open | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-047 | Finance technology and statutory-localization choices remain unselected | Open | Preserves Finance authority, controls, and auditability. |
| FIN-ADR-048 | FCSB-014 does not authorize implementation | Open | Preserves Finance authority, controls, and auditability. |

### Open decisions

| Open ID | Decision | Owner | Required input |
|---|---|---|---|
| FIN-OPEN-001 | Physical journal and ledger architecture | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-002 | Single-ledger versus multi-ledger strategy | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-003 | Chart-of-accounts sharing model | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-004 | Account-code structure | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-005 | Financial-dimension model | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-006 | Fiscal-period implementation | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-007 | Posting-engine architecture | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-008 | Posting-batch model | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-009 | Account-determination rule language | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-010 | Subledger architecture | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-011 | Open-item settlement model | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-012 | Payment-engine architecture | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-013 | Bank-file formats | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-014 | Bank API direction | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-015 | Treasury scope | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-016 | Tax-engine strategy | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-017 | Localization-package model | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-018 | Withholding-tax direction | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-019 | Fixed-assets book model | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-020 | Depreciation method catalog | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-021 | Budget model | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-022 | Commitment accounting scope | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-023 | Allocation-engine strategy | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-024 | Intercompany automation | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-025 | Consolidation direction | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-026 | Foreign-currency revaluation model | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-027 | Inventory valuation integration | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-028 | Manufacturing costing integration | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-029 | Period-close orchestration | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-030 | Reconciliation-engine architecture | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-031 | Finance reporting certification workflow | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-032 | Finance data-retention policy | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-033 | Finance AI use-case boundary | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-034 | Electronic-signature requirements | Architecture Board and Finance | Approved requirements, control design, operations evidence |
| FIN-OPEN-035 | Statutory reporting approach | Architecture Board and Finance | Approved requirements, control design, operations evidence |

### Approval conditions and roadmap

Approval requires Architecture Board, Finance, Tax, Treasury, Data Governance, Security, Internal Audit, Inventory, Procurement, Sales, Manufacturing, Projects, Payroll, Integration, Reporting and Operations review. Before coding, approve the financial data model, journal/ledger and posting boundaries, account determination, period controls, subledger contracts, SoD, payment and banking controls, tax/localization scope, reconciliation, reporting certification, retention, testing, observability, incident handling, and every open technology decision.

Before FCSB-015, Inventory and Finance must agree inventory quantity authority, valuation request contract, cost-of-goods-sold and adjustment boundaries, accounting determination inputs, timing, reconciliation, and close dependencies. FCSB-016 through FCSB-025 may request effects through these contracts but cannot write Finance balances directly.

| Version | Date | Change | Approval state |
|---|---|---|---|
| 1.0 Draft | 2026-07-16 | Initial Finance Solution Architecture | Pending named review |
