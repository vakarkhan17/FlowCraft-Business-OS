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

This document is a controlled architecture review draft. It does not authorize runtime implementation, statutory compliance, direct database posting, payment release, period reopening, statement certification, or technology selection.

## Chapter 1 — Purpose and Scope

FCSB-014 establishes the accounting operating model, control boundaries, and information contracts that must exist before Finance code is authorized. Its audience is the Architecture Board, CFO/Finance Director, controllers, GL/AP/AR/Treasury/Tax/Assets/Cost teams, domain owners, Security, Internal Audit, Engineering, QA, Reporting, Integration, and Operations. It covers Finance organization, journals, ledgers, subledgers, payments, tax, assets, planning, close, reconciliation, reporting, audit, integration, and AI boundaries; it does not select a bank, tax engine, localization, signature, ledger, or AI technology.

FCSB-001 through FCSB-013 supply business, platform, data, security, transaction, document, workflow, Studio, and reporting rules. FCSB-015 through FCSB-025 will define domain events that request accounting effects. Finance architecture must precede Inventory, Sales, Procurement, and Manufacturing posting because quantity, delivery, receipt, and production events do not by themselves determine accounts, periods, currency treatment, tax, valuation, or certification.

**Current-state classification.** The document is architecture-review material only. It changes no runtime and grants no permission to post, pay, close, reopen, certify, or claim statutory compliance.

~~~mermaid
flowchart LR
  N1[Scope approved]
  N2[Finance boundary agreed]
  N3[FCSB-015 contract gate]
  N1 -->|evidence| N2
  N2 -->|control result| N3
~~~

## Chapter 2 — Executive Summary

FlowCraft currently has company and organization structures, Currency and ExchangeRate masters, customer/supplier/term/tax master data, generic TransactionDocument records, workflow/approval and number-series metadata, audit and Digital DNA foundations, EOR registrations, and report/dashboard scaffolds. ChartOfAccount, JournalEntry, and JournalLine exist as compact schema foundations; the dashboard sums journal lines directly. There is no evidenced posting service, ledger balance engine, fiscal-period runtime, AP, AR, payment engine, bank reconciliation, tax calculation, fixed assets, budget, close, or certified statement service.

The target operating model makes Finance the exclusive authority for journals, ledger/subledger balances, accounting periods, reconciliation, and certified statements. Domains submit idempotent accounting-effect requests. Finance resolves an effective account-determination version, validates dates, company, currency, dimensions, tax, SoD, and approvals, posts atomically, exposes reconciliation controls, and feeds FCSB-013-certified reporting. Multi-company and multi-currency behavior is explicit; technology and localization remain open.

**Current-state classification.** Maturity is foundation/scaffold. The target is a controlled finance platform reached through approved increments, not a reinterpretation of existing dashboard calculations.

~~~mermaid
flowchart LR
  N1[Domain requests]
  N2[Finance posting authority]
  N3[Certified reporting]
  N1 -->|evidence| N2
  N2 -->|control result| N3
~~~

## Chapter 3 — Finance Architecture Principles

Finance exclusively owns authoritative accounting entries, journals, subledger-to-ledger reconciliation, accounting periods, financial balances, and certified financial statements. Other domains request effects through governed contracts and never write General Ledger or subledger balances directly. Every posted journal balances by company, ledger, currency policy, and posting unit; approval and posting are separate authorities; drafts are mutable only in controlled states; and posted content is immutable and undeletable.

Transaction, document, accounting, posting, and tax dates remain distinct. Closed periods reject ordinary posting; reopening and backdating are exceptional and approved. Account, determination, dimension, tax, and exchange-rate versions are preserved. Control accounts block uncontrolled manual posting; suspense use is named, aged, reconciled, and cleared. Intercompany pairs reconcile. Reports explain posted truth and cannot become it. Audit evidence complements rather than replaces ledger history.

**Current-state classification.** AI may prepare a labelled journal proposal or explanation, but cannot approve, post, pay, reopen, certify, or change source facts. Finance capability never implies legal or statutory compliance without jurisdiction-specific approval.

~~~mermaid
flowchart LR
  N1[Governed request]
  N2[Balanced approved journal]
  N3[Immutable posted truth]
  N1 -->|evidence| N2
  N2 -->|control result| N3
~~~

## Chapter 4 — Current Finance Baseline

The concrete baseline is narrow. ChartOfAccount contains companyId, code, name, accountType, parentId, and isPosting. JournalEntry contains companyId, entryNo, postingDate, memo, sourceDocumentId, and lines. JournalLine contains entryId, accountId, debit, credit, and a costCenter string. The foundation migration creates these tables and foreign keys, but no controller, service, DTO, posting lifecycle, journal status, currency, branch, profit center, tax, approval, reversal, or audit relation exists for them.

Currency and ExchangeRate are richer implemented foundations: the [Prisma models](../../apps/api/prisma/schema.prisma) and [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql) make rates tenant-scoped, dated, typed, versioned, and linked to a replaced version; the [service](../../apps/api/src/exchange-rates/exchange-rates.service.ts) enforces different currencies and replacement, the [controller](../../apps/api/src/exchange-rates/exchange-rates.controller.ts) is permission-protected, and an [accepted test](../../apps/api/test/foundation.spec.ts) rejects identical currencies. Company, CostCenter, ProfitCenter, partners, terms, tax, workflow, number series, audit, DNA, and EOR are adjacent foundations.

**Current-state classification.** Dashboard financial output is a scaffold: it loads accounts and all journal lines, computes debit-minus-credit, and presents trial-balance/P&L/balance-sheet-shaped objects without a period, ledger, posting-status, currency, close, certification, or reconciliation engine.

~~~mermaid
flowchart LR
  N1[Schema and migration]
  N2[Dashboard direct aggregation]
  N3[No finance runtime]
  N1 -->|evidence| N2
  N2 -->|control result| N3
~~~

## Chapter 5 — Target Finance Architecture

The target separates twelve layers: Finance master data; transaction and subledger intake; validation and account determination; approval and control; posting services; General Ledger; subledgers; reconciliation; close and period control; financial reporting; integration/external services; and cross-cutting security, audit, and operations. An accounting-effect request is not a journal until Finance accepts the contract and completes control checks.

Current foundations occupy only portions of master data, intake metadata, identity/scope, audit, reports, and the small account/journal schema. Planned capabilities include fiscal calendars, journal lifecycle, posting, determination, open items, reconciliation, and certification. Future capabilities include banking, treasury, external tax, multi-ledger, consolidation, e-invoicing, signature, and AI assistance, subject to explicit decisions.

**Current-state classification.** Layer ownership prevents a universal transaction service, workflow, report, customization, or external connector from bypassing Finance authority. Each boundary exposes versioned contracts and auditable failure semantics.

~~~mermaid
flowchart LR
  N1[Domain source]
  N2[Finance control plane]
  N3[Ledger and subledgers]
  N4[Close/reporting]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|control result| N4
  N2 -. exception .-> N4
~~~

## Chapter 6 — Finance Organization Model

The accounting entity is a company mapped to a legal entity and tenant. Branch and plant locate operations; business unit, department, cost center, profit center, and project provide management dimensions. Segment, business area, functional area, reporting unit, and consolidation unit are target directions, not current runtime objects. A dimension is mandatory only when an effective posting rule requires it; optional dimensions still must be valid for company and accounting date.

The [Company, CostCenter, and ProfitCenter models](../../apps/api/prisma/schema.prisma) and [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql) provide implemented organizational foundations: company currency/calendar references, company-scoped hierarchies, effective dates, and responsible users. JournalLine currently carries only an unconstrained costCenter string, so Finance must move to stable dimension identities.

**Current-state classification.** A posting contract declares required dimensions by event/account combination. Reorganizations create new effective hierarchy versions so historical balances retain the organization used at posting.

~~~mermaid
classDiagram
  class C1 {+Tenant_legal_entity +version +status}
  class C2 {+Company +version +status}
  class C3 {+Operational_dimensions +version +status}
  class C4 {+Reporting_consolidation_direction +version +status}
  C1 --> C2
  C2 --> C3
  C3 --> C4
~~~

## Chapter 7 — Chart of Accounts Architecture

A chart of accounts is a governed set of accounts and hierarchies applied to one or more companies under an approved sharing model. Each account has immutable identity distinct from its code, type, normal balance, posting permission, control/reconciliation/statistical/suspense/clearing/bank/tax/retained-earnings/intercompany attributes, company applicability, allowed currencies, effective dates, status, replacement account, and hierarchy memberships.

Account creation, activation, blocking, replacement, and closure require maker-checker review. A non-posting hierarchy node cannot receive lines. Closing an account requires zero/open-item and dependent-rule checks; replacement affects future determination only. Historical journals continue to reference the original identity. Control-account flags determine which subledger may post and prohibit ordinary manual entries.

**Current-state classification.** The current ChartOfAccount parent tree, accountType, isPosting, company uniqueness, and journal-line relation are a schema scaffold. It lacks service validation, effective dates, normal balance, control flags, currency restrictions, lifecycle, audit linkage, and tests.

~~~mermaid
classDiagram
  class C1 {+Chart_root +version +status}
  class C2 {+Account_groups +version +status}
  class C3 {+Posting_control_accounts +version +status}
  class C4 {+Effective_replacement +version +status}
  C1 --> C2
  C2 --> C3
  C3 --> C4
~~~

## Chapter 8 — Account Classification and Control

Account classification drives validation and presentation, not merely a label. Asset, liability, equity, revenue, expense, cost, and statistical accounts have defined normal balances and statement roles. Memorandum direction remains open. Control accounts accept only Finance-authorized subledger postings; clearing accounts require clearing logic; bank and tax accounts bind to approved masters; suspense accounts require purpose, owner, maximum age, and close treatment.

Open-item management and line-item display are explicit properties. Sensitive accounts can require elevated approval, documentary references, restricted dimensions, or prohibition of manual journals. An account cannot be deleted after use. Closure blocks new posting while preserving history; replacement is effective-dated and does not rewrite old lines.

**Current-state classification.** The current accountType string and isPosting boolean do not implement these controls. Classification catalogs, allowed combinations, reconciliation behavior, and sensitive-account policies are planned.

~~~mermaid
flowchart LR
  N1[Classify account]
  N2[Apply posting restrictions]
  N3[Reconcile/close]
  N4[Preserve history]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|control result| N4
  N2 -. exception .-> N4
~~~

## Chapter 9 — Fiscal Year and Period Architecture

A fiscal-year variant defines calendar or non-calendar boundaries, ordinary periods, adjustment periods, and mapping from accounting date. Company-specific fiscal calendars may distinguish GL, AP, AR, tax, and asset availability, but subordinate calendars can never remain open when the controlling GL period is hard closed. Opening and closing periods are controlled capabilities, not date labels.

Period states are Future, Open, Soft Closed, Hard Closed, and exceptionally Reopened. Soft close restricts source/category/role; hard close rejects ordinary posting. Reopening records reason, approver, scope, duration, affected reports, and re-close evidence. Backdated and future-dated requests are evaluated against accounting date, source date, policy window, and approval—not silently shifted.

**Current-state classification.** Company has an optional fiscalCalendarId field and FISCAL_YEAR is seed-registered metadata, but no fiscal calendar/period models, service, validation, close state, or accepted tests exist. This capability is planned.

~~~mermaid
stateDiagram-v2
  [*] --> Future_period
  Future_period --> Open: validate
  Open --> Soft_close: approve
  Soft_close --> Hard_close_reopen_control: validate
  Hard_close_reopen_control --> [*]
~~~

## Chapter 10 — Journal Architecture

A journal header identifies company, ledger/book, batch, source, category, transaction/document reference, transaction/posting/accounting/tax dates, currency context, description, lifecycle status, approval evidence, and reversal/correction relationships. Lines carry account, debit or credit, transaction/base/reporting amount, exchange-rate version, cost/profit center, project, partner, tax, intercompany counterparty, quantity/statistical data where permitted, and line reference.

Journal identity and source-transaction identity are separate so one source can produce several controlled postings without duplicate ambiguity. A line cannot be both debit and credit or zero unless an approved statistical design allows it. Balance is enforced at the required company/ledger/currency grain. Header totals are derived, not trusted inputs.

**Current-state classification.** Current JournalEntry and JournalLine are scaffolds with only entry number, posting date, memo/source reference, account, debit/credit, and costCenter text. They lack lifecycle, currency, ledger, dimensions, tax, approval, reversal, and audit fields.

~~~mermaid
classDiagram
  class C1 {+Journal_header +version +status}
  class C2 {+Journal_lines +version +status}
  class C3 {+Source_reversal_links +version +status}
  class C4 {+Audit_and_totals +version +status}
  C1 --> C2
  C2 --> C3
  C3 --> C4
~~~

## Chapter 11 — Journal Lifecycle

Draft permits controlled editing by the creator. Validation freezes the candidate inputs used by rule checks. Submitted transfers responsibility into workflow; Approved records authorization but does not itself create ledger truth. Scheduled is optional for future-dated authorized entries. Posting is a short-lived exclusive state; Posted is immutable. Rejected and Failed return through explicit correction paths, while Cancelled is allowed only before posting.

A posted journal can become Partially Reversed, Reversed, or Corrected only through linked journals whose effects are ordinary balanced postings. Archival changes storage/lifecycle treatment, not accounting existence. A retry of a failed posting uses the same idempotency key and never invents another journal.

**Current-state classification.** No lifecycle/status field or journal service exists today. Workflow-definition and approval metadata are adjacent foundations only; they do not execute this state machine for journals.

~~~mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Validated: validate
  Validated --> Submitted_approved: approve
  Submitted_approved --> Posting: validate
  Posting --> Posted_reversed: approve
  Posted_reversed --> [*]
~~~

## Chapter 12 — Journal Validation

Validation calculates debit and credit totals; confirms active accounts and posting flags; checks company, ledger, period, dates, currencies and preserved rate; validates cost/profit center, project, partner, tax and intercompany dimensions; enforces control-account and suspense policies; and verifies required document/reference evidence. It also checks source identity and idempotency to stop duplicate effects.

Approval and SoD checks use the proposed amounts, sensitive accounts, payment or close context, creator identity, and effective policy. Intercompany requests must balance by partner and currency under the paired design. Tax lines reconcile to calculated bases. A validation result is versioned so later configuration changes cannot silently reinterpret an approved candidate.

**Current-state classification.** The schema can store debit/credit but has no balance constraint or validation service. All journal validation is planned and must be tested with negative, boundary, concurrency, and tenant-isolation cases.

~~~mermaid
flowchart LR
  N1[Candidate journal]
  N2[Structural checks]
  N3[Policy/SoD checks]
  N4[Validated snapshot or errors]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|control result| N4
  N2 -. exception .-> N4
~~~

## Chapter 13 — Posting Architecture

A domain submits an idempotent PostingRequest containing event identity, company, event type/version, source date, amounts, currencies, quantities, dimensions, and references. Finance selects an effective PostingProfile and AccountDetermination version, simulates proposed journals, validates controls, and obtains approval when required. The posting command then writes the journal, lines, ledger effects, open items, reconciliation references, audit event, and future outbox record atomically.

Failures before commit leave no financial effect. Ambiguous infrastructure failure is resolved by idempotency lookup rather than blind retry. Batch posting isolates each permitted atomic unit and records accepted/rejected outcomes. No generic transaction, workflow, customization, integration, or reporting service may write Finance tables directly.

**Current-state classification.** No posting request, profile, batch, service, outbox, or idempotency runtime exists. The current journal tables are not proof of atomic posting.

~~~mermaid
sequenceDiagram
  participant P1 as Domain event request
  participant P2 as Determine and simulate
  participant P3 as Approve
  participant P4 as Atomic Finance posting
  participant P5 as Result/outbox
  P1->>P2: submit governed evidence
  P2->>P3: validate and authorize
  P3->>P4: validate and authorize
  P4->>P5: record reconciled outcome
~~~

## Chapter 14 — Account Determination Architecture

Account determination converts a business event into proposed debit/credit roles. Inputs can include source domain, company, transaction type, item/account category, customer/supplier group, tax category, warehouse/plant, cost/profit center, project, currency, and effective accounting date. Rules specify posting keys/roles, account identities, required dimensions, priority, applicability, and effective period.

Resolution is deterministic: exact rules outrank governed fallbacks; ambiguity is an error; missing rules enter an exception queue rather than an unnamed suspense account. Simulation returns the selected rule/version and trace. Rule publication requires Finance approval, test cases, conflict analysis, and controlled activation. Changes affect new requests only.

**Current-state classification.** TaxCode has optional payableAccountId and receivableAccountId strings and EOR contains Finance object registrations, but there is no account-determination model, rule language, service, simulator, or test. The capability is planned.

~~~mermaid
flowchart LR
  N1[Business event facts]
  N2[Candidate rules]
  N3[Priority/ambiguity check]
  N4[Proposed accounts]
  N5[Finance approval]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|policy check| N4
  N4 -->|control result| N5
  N2 -. exception .-> N5
~~~

## Chapter 15 — General Ledger Architecture

The journal is the immutable posting truth; ledger entries are indexed accounting effects derived from posted journal lines. Balances are controlled projections at account, company, period, ledger/book, currency, and applicable dimension grain. Opening balance and carry-forward are generated through auditable close/open procedures. Adjustment, reversal, and closing entries remain journals rather than direct balance edits.

Whether the physical implementation uses one journal table plus projections or separate ledger entry tables remains open. Balance tables, if selected, are rebuildable and reconcile to journal truth. Concurrent posting must serialize the required balance grain without sacrificing journal atomicity. Ledger queries exclude drafts and failed candidates by construction.

**Current-state classification.** The repository has JournalEntry/JournalLine tables and dashboard arithmetic, but no status-filtered ledger, balance, period balance, carry-forward, closing, rebuild, or reconciliation service. General Ledger is a scaffold/concept, not implemented.

~~~mermaid
classDiagram
  class C1 {+Posted_journals +version +status}
  class C2 {+Ledger_index_projection +version +status}
  class C3 {+Period_balances +version +status}
  class C4 {+Carry_forward_and_reconciliation +version +status}
  C1 --> C2
  C2 --> C3
  C3 --> C4
~~~

## Chapter 16 — Ledger and Book Architecture

A primary ledger records the company’s authoritative accounting basis. Secondary, statutory, management, tax, currency, adjustment, and reporting books are directions requiring business and localization decisions. A LedgerGroup could route one approved source effect to a controlled set of books, but each generated journal remains balanced, attributable, and reconcilable.

Parallel accounting can use separate ledgers, adjustment layers, or reporting transformations; the choice affects volume, close, rates, assets, reporting, and audit. It cannot be made by adding a ledger label to the existing journal. Posting scope, allowed source/category, currency basis, period calendar, and reconciliation are book configuration.

**Current-state classification.** No ledger or book model exists. Single-versus-multiple ledger, physical storage, book currency, and parallel-accounting choices remain open; no current behavior should be inferred.

~~~mermaid
flowchart LR
  N1[Source effect]
  N2[Primary book]
  N3[Optional approved books]
  N4[Cross-book reconciliation]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|control result| N4
  N2 -. exception .-> N4
~~~

## Chapter 17 — Accounts Payable Architecture

AP owns supplier financial documents and open items after Procurement supplies purchase-order, receipt, supplier, quantity, price, and acceptance evidence. Supplier invoices, credit/debit notes, advances, prepayments, retention, withholding, expense allocation, due dates, and settlement are Finance documents. Procurement owns the commercial order/receipt truth; AP owns invoice accounting and payable status.

A PO invoice follows two- or three-way match policy across ordered, received, and invoiced quantity/value/tolerance. Exceptions are classified and routed for buyer, receiver, budget, tax, or Finance resolution. Approval precedes posting; posting creates the supplier open item and control-account effect. Reversal restores match consumption and open-item state through linked effects.

**Current-state classification.** Supplier, BusinessPartner, PaymentTerm, TaxCode, PURCHASE_ORDER, GOODS_RECEIPT, and SUPPLIER_INVOICE metadata exist, but there is no AP invoice/open-item/match/payment service. AP is planned.

~~~mermaid
flowchart LR
  N1[Supplier invoice intake]
  N2[PO/receipt match]
  N3[Exception/approval]
  N4[AP posting/open item]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|control result| N4
  N2 -. exception .-> N4
~~~

## Chapter 18 — Supplier Invoice Lifecycle

Captured records preserve the supplier document image/reference and source data. Validated confirms supplier, company, currency, dates, duplicates, tax, terms, dimensions, and arithmetic. Matched records the PO/receipt comparisons. Exception isolates discrepancies without posting. Approved authorizes the resolved candidate; Posted creates AP and GL effects. Partially Paid and Paid are settlement states, while Disputed tracks collection hold separately.

Credit notes, reversals, and cancellations follow explicit linked-document rules. Closed requires zero residual or approved disposition and complete reconciliation. A duplicate key combines supplier identity, invoice reference, company, and policy attributes; it is not defeated by trivial formatting changes.

**Current-state classification.** No supplier invoice lifecycle model exists. The EOR registration is Registered metadata only and generic TransactionDocument does not supply these AP controls.

~~~mermaid
stateDiagram-v2
  [*] --> Captured_validated
  Captured_validated --> Matched_or_exception: validate
  Matched_or_exception --> Approved_posted: approve
  Approved_posted --> Part_paid_paid_closed: validate
  Part_paid_paid_closed --> [*]
~~~

## Chapter 19 — Accounts Receivable Architecture

AR receives billable-event evidence from Sales, Projects, or Service and creates customer invoices, credit/debit notes, deposits, advance receipts, retentions, installments, and open items. Sales owns order/delivery and commercial terms; AR owns invoice accounting, due date, receivable control account, collection status, allocation, settlement, and financial reversal.

Credit limits and profiles inform controlled Sales/AR decisions but do not replace invoice approval or posting. Write-off requires reason, tolerance or elevated authority, and a specific expense/account effect. Collections activity changes follow-up status, not the posted amount. Reversal and credit note semantics are distinguished to preserve tax and document history.

**Current-state classification.** Customer and CreditProfile models provide company, limit, term, and block-policy foundations; SALES_INVOICE and RECEIPT are EOR metadata. No AR invoice, collection, open-item, or settlement runtime exists.

~~~mermaid
flowchart LR
  N1[Billable event]
  N2[AR invoice/open item]
  N3[Collection/receipt]
  N4[Settlement or credit]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|control result| N4
  N2 -. exception .-> N4
~~~

## Chapter 20 — Customer Invoice and Receipt Lifecycle

Invoice creation binds delivery/service evidence, customer, company, currency, tax determination, price and accounting date. Approval confirms exceptions, tax, credit policy, and dimensions before posting. A posted invoice creates receivable and revenue/tax effects. Cash receipt capture creates bank/cash and unapplied-cash effects until a permitted allocation clears open items.

Allocation can be exact, partial, multiple-invoice, on-account, overpayment, or foreign-currency settlement. Refund, dispute, credit note, and write-off are separate controlled transactions. Each change preserves receipt identity, bank evidence, allocation history, user, date, currency effect, and reconciliation state.

**Current-state classification.** The dashboard’s receivable number looks for a hard-coded account code; it is not an AR lifecycle. No receipt allocation or customer settlement service is evidenced.

~~~mermaid
sequenceDiagram
  participant P1 as Delivery/service evidence
  participant P2 as Invoice approval/posting
  participant P3 as Receipt capture
  participant P4 as Allocation/refund/close
  P1->>P2: submit governed evidence
  P2->>P3: validate and authorize
  P3->>P4: record reconciled outcome
~~~

## Chapter 21 — Open-Item and Settlement Architecture

An open item is a posted subledger obligation with original and remaining amount by transaction/base currency, due date, partner, document, and control account. Clearing links settlement effects to one or more open items. Partial payment reduces remaining amount; residual-item policy closes the original and creates a linked remainder; on-account payment remains unapplied until allocation.

Settlement records date, currency, preserved rate, realized exchange difference, discount, tolerance, and write-off authority. Netting is a future direction requiring legal, tax, partner, and intercompany policy. Reversing a clearing operation reopens the affected items without altering original history.

**Current-state classification.** No open-item, clearing, allocation, settlement, or exchange-difference model exists. AP/AR open-item control is planned.

~~~mermaid
flowchart LR
  N1[Open obligations]
  N2[Payment/receipt candidate]
  N3[Allocation and currency effect]
  N4[Cleared/residual/reopened]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|control result| N4
  N2 -. exception .-> N4
~~~

## Chapter 22 — Payment Architecture

A PaymentProposal selects eligible approved AP open items by company, due date, method, currency, bank, hold, discount, and policy. A separate PaymentBatch fixes beneficiaries, bank instructions, amounts, references, and control totals. Supplier-master or bank-account changes after proposal invalidate or revalidate the batch; beneficiary data is never accepted from an ungoverned invoice payload.

Preparation, approval, and release are separate duties. Dual authorization is mandatory for release under approved thresholds/policy. File generation or bank API submission uses a signed/hashed controlled payload, idempotent instruction reference, status inquiry, rejection/cancellation handling, and settlement reconciliation. AI cannot select final beneficiaries, authorize, or release money.

**Current-state classification.** PAYMENT is an EOR registration only. There are no payment request/proposal/batch/method/bank/file/API models or services, so payment is Future/Open pending design.

~~~mermaid
sequenceDiagram
  participant P1 as Approved AP items
  participant P2 as Proposal and beneficiary validation
  participant P3 as Dual authorization
  participant P4 as Bank instruction
  participant P5 as Settlement reconciliation
  P1->>P2: submit governed evidence
  P2->>P3: validate and authorize
  P3->>P4: validate and authorize
  P4->>P5: record reconciled outcome
~~~

## Chapter 23 — Cash and Bank Management

Bank master data distinguishes institution, branch, routing identifiers, account identity, currency, company ownership, signatories, status, and permitted payment/receipt use. Sensitive account details require field protection and maker-checker changes. Cash and petty-cash accounts use accountable custodians, limits, vouchers, replenishment, count, and surprise-review controls.

Cash position combines reconciled bank, ledger, approved payment, receipt, transfer, fee, interest, deposit, withdrawal, and unidentified-cash items at an explicit as-of time. Forecasting remains non-authoritative and must distinguish expected from posted cash. Internal transfers require paired effects and in-transit reconciliation.

**Current-state classification.** No Bank, BankAccount, BankStatement, cash position, petty cash, or treasury model/service exists. Chart accounts can be named as bank accounts only by convention today, which is insufficient.

~~~mermaid
classDiagram
  class C1 {+Bank_account_master +version +status}
  class C2 {+Cash_transactions +version +status}
  class C3 {+Statement_evidence +version +status}
  class C4 {+Position_and_controls +version +status}
  C1 --> C2
  C2 --> C3
  C3 --> C4
~~~

## Chapter 24 — Bank Reconciliation Architecture

A bank-statement import preserves source file/API identity, account, statement number, opening/closing balance, currency, and immutable lines. The import must prove continuity and control totals before matching. Internal candidates come from posted receipts, payments, transfers, fees, and interest for the same controlled bank account.

Matching supports one-to-one, one-to-many, and many-to-one with date/amount/reference tolerances. Suggestions are explainable and never silently confirmed. Manual matches record rationale and approver where material. Unmatched statement lines can create a controlled exception or proposed journal, not direct ledger writes. Completion requires balance reconciliation and sign-off.

**Current-state classification.** There is no bank statement or reconciliation runtime. Dashboard cash figures derived from account code 1000 do not constitute bank evidence.

~~~mermaid
flowchart LR
  N1[Statement/control totals]
  N2[Match candidates]
  N3[Suggested/manual match]
  N4[Unmatched resolution]
  N5[Signed reconciliation]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|policy check| N4
  N4 -->|control result| N5
  N2 -. exception .-> N5
~~~

## Chapter 25 — Treasury Direction

Treasury direction covers liquidity by company/currency, bank positions, short-term forecast, intercompany funding, loans, deposits, interest, facilities, guarantees, counterparty exposure, and potential hedge records. It does not authorize dealing, hedge accounting, or risk valuation. Each instrument needs contract identity, limits, approvals, settlement, accounting, valuation policy, and reconciliation.

Treasury and Accounting duties are separated: Treasury proposes and executes approved external transactions; Finance validates accounting; independent roles confirm settlements and reconcile bank/ledger. Forecasts and exposures are management information, not posted balances. Intercompany funding also uses paired company records.

**Current-state classification.** No treasury models, market data, facilities, instruments, or services exist. Scope, technology, accounting treatment, and integrations remain Open/Future.

~~~mermaid
flowchart LR
  N1[Liquidity inputs]
  N2[Treasury decision]
  N3[Authorized settlement]
  N4[Finance accounting]
  N5[Counterparty reconciliation]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|policy check| N4
  N4 -->|control result| N5
  N2 -. exception .-> N5
~~~

## Chapter 26 — Tax Architecture

Tax masters require jurisdiction, tax category/code, tax type, effective rate, recoverable percentage, input/output nature, inclusive/exclusive treatment, tax base, exemption and reverse-charge/withholding directions, payable/receivable accounts, validity, and evidence. Jurisdiction and place-of-supply rules cannot be generalized across countries.

Tax documents preserve the determined rule/version, base, rate, amount, rounding, source lines, tax date, reporting period, and adjustment relation. Tax periods and returns require separate approval, reconciliation to GL/subledgers, and localization evidence. A configured rate never proves statutory correctness.

**Current-state classification.** TaxCategory and TaxCode fields in the [Prisma schema](../../apps/api/prisma/schema.prisma), the [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql), registry validation, and [master-data tests](../../apps/api/test/master-data.spec.ts) are implemented master-data foundations. There is no calculation, return, withholding, jurisdiction, or filing runtime.

~~~mermaid
classDiagram
  class C1 {+Jurisdiction_rule +version +status}
  class C2 {+Tax_code_and_base +version +status}
  class C3 {+Input_output_posting +version +status}
  class C4 {+Period_report_audit +version +status}
  C1 --> C2
  C2 --> C3
  C3 --> C4
~~~

## Chapter 27 — Tax Determination and Posting

Determination receives company, jurisdiction context, customer/supplier tax profile, item/service category, transaction type, ship-from/to, exemptions, accounting/tax date, currency, and inclusive status. It resolves one effective rule set and explains every component. Missing, conflicting, or expired rules block automated posting.

Authorized override requires reason, documentary evidence, approver, affected base/rate/account, and audit. Posting separates recoverable input, nonrecoverable cost, output/payable, withholding, rounding, and base effects as required by the approved localization. Reconciliation compares source tax documents, subledger tax lines, control accounts, and return totals.

**Current-state classification.** Current master-data validation only checks nonnegative rates and recoverable percentages. It does not determine jurisdiction, calculate tax, or post tax entries.

~~~mermaid
flowchart LR
  N1[Transaction facts]
  N2[Jurisdiction and exemption]
  N3[Rule resolution]
  N4[Tax lines/override]
  N5[Reconciliation]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|policy check| N4
  N4 -->|control result| N5
  N2 -. exception .-> N5
~~~

## Chapter 28 — Fixed Assets Architecture

The fixed-asset subledger identifies asset class, asset/component, company, location, custodian, cost center, acquisition source, capitalization date, quantity, currency, cost, accumulated depreciation, book values, status, and document evidence. Asset-under-construction accumulates eligible cost until approved capitalization; operational maintenance assets are not automatically accounting assets.

Lifecycle transactions include acquisition, capitalization, transfer, improvement, component split/merge direction, impairment, revaluation direction, retirement, sale/disposal, and reversal. Each transaction validates period, book, account determination, custody, approval, and reconciliation to GL. Disposal separates proceeds, derecognition, accumulated depreciation, and gain/loss.

**Current-state classification.** ASSET is seed-registered under Maintenance, but no Finance Asset/AssetBook/AssetTransaction model or service exists. Fixed assets accounting is Future.

~~~mermaid
stateDiagram-v2
  [*] --> Acquisition_AUC
  Acquisition_AUC --> Capitalization: validate
  Capitalization --> Depreciation_transfer: approve
  Depreciation_transfer --> Impairment_disposal: validate
  Impairment_disposal --> GL_reconciliation: approve
  GL_reconciliation --> [*]
~~~

## Chapter 29 — Depreciation Architecture

A DepreciationBook binds accounting basis, currency, calendar, method catalog, useful life, residual value, convention, start date, and account determination. A run calculates by asset/component and period using preserved policy versions. Straight-line or other methods are not assumed until Finance and localization approve them.

Proration, pause, catch-up, life/value adjustment, impairment interaction, disposal cutoff, reversal, and forecast have explicit semantics. Simulation precedes approval; posting creates ordinary controlled journals and book movements. Re-running the same book/period is idempotent and reconciles run totals to asset balances and GL.

**Current-state classification.** No depreciation book, method, schedule, run, forecast, or posting engine exists. This chapter sets requirements without selecting methods or claiming compliance.

~~~mermaid
stateDiagram-v2
  [*] --> Book_and_policy
  Book_and_policy --> Period_calculation: validate
  Period_calculation --> Simulation_approval: approve
  Simulation_approval --> Posting: validate
  Posting --> Asset_GL_reconciliation: approve
  Asset_GL_reconciliation --> [*]
~~~

## Chapter 30 — Budget Architecture

A budget model defines fiscal year, scenario, company/organization, account and financial dimensions, period grain, currency, and workflow. Versions distinguish original, revision, transfer, forecast, and approved baseline. Actuals are posted Finance truth; budget amounts never become journal balances.

Creation and revision require owners, rationale, supporting assumptions, validation against active accounts/dimensions, and effective approval. Freeze prevents ordinary edits. Transfers preserve source and target, amount, period, authority, and before/after availability. Budget-versus-actual reporting names the budget version and actual cutoff.

**Current-state classification.** No Budget model, workflow, service, or report certification exists. Cost/profit centers and reporting scaffolds are foundations only.

~~~mermaid
stateDiagram-v2
  [*] --> Draft_budget
  Draft_budget --> Review_approve: validate
  Review_approve --> Freeze: approve
  Freeze --> Revision_transfer: validate
  Revision_transfer --> Actual_comparison: approve
  Actual_comparison --> [*]
~~~

## Chapter 31 — Commitment and Encumbrance Direction

Commitment accounting represents approved future obligations separately from posted actuals. Requisitions, purchase orders, and contracts can reserve budget under distinct stages; encumbrance is a direction subject to policy. Each commitment records source identity/version, company, account/dimensions, amount/currency, period, supplier where known, expiry, and status.

Relief occurs on cancellation, expiry, supersession, receipt/invoice conversion, or approved override. Conversion avoids double counting and links commitment relief to actual accounting. Availability control can warn or block according to approved budget policy; override requires independent authority. Commitment-to-budget and commitment-to-actual reconciliation is mandatory.

**Current-state classification.** Generic purchase transactions exist, but there is no commitment, reservation, encumbrance, availability-control, or relief runtime.

~~~mermaid
flowchart LR
  N1[Requisition reserve]
  N2[PO/contract commitment]
  N3[Availability control]
  N4[Relief/actual conversion]
  N5[Reconciliation]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|policy check| N4
  N4 -->|control result| N5
  N2 -. exception .-> N5
~~~

## Chapter 32 — Accrual and Deferral Architecture

Accruals recognize incurred amounts not yet invoiced; prepayments and deferred expense/revenue allocate posted amounts across future recognition periods. Each schedule holds source, company, accounts, dimensions, currency, start/end dates, frequency, calculation basis, remaining amount, approval, and policy version.

Generation produces ordinary draft journals with schedule/run identity. Posting, adjustment, termination, catch-up, and reversal never edit prior posted periods. An auto-reversing accrual links the reversal to the original and validates the target period. Recognition totals reconcile to source amount and GL balances.

**Current-state classification.** No accrual, deferral, recognition schedule, generator, or reconciliation service exists. Recurring capability must not be inferred from workflow metadata.

~~~mermaid
stateDiagram-v2
  [*] --> Source_amount
  Source_amount --> Approved_schedule: validate
  Approved_schedule --> Periodic_recognition: approve
  Periodic_recognition --> Adjustment_reversal: validate
  Adjustment_reversal --> Balance_reconciliation: approve
  Balance_reconciliation --> [*]
~~~

## Chapter 33 — Recurring Journal Architecture

A recurring template defines journal category, company/book, frequency, start/end, amount rule, currency, accounts, dimensions, reference requirements, approval policy, and responsible owner. It is versioned and cannot contain a free-form path around account determination or period controls.

Each occurrence has a unique schedule-period key. Generation creates an ordinary Draft journal; validation, approval, and posting remain the same as manual or sourced journals. Missing periods, suspended templates, holidays, amount changes, failures, and termination are visible. Regeneration is idempotent and never duplicates a posted occurrence.

**Current-state classification.** No scheduler, recurring template, journal generator, or posting service exists. Number-series and workflow metadata are insufficient.

~~~mermaid
sequenceDiagram
  participant P1 as Template/version
  participant P2 as Due occurrence
  participant P3 as Draft journal generation
  participant P4 as Normal approval/posting
  participant P5 as Suspend/terminate
  P1->>P2: submit governed evidence
  P2->>P3: validate and authorize
  P3->>P4: validate and authorize
  P4->>P5: record reconciled outcome
~~~

## Chapter 34 — Allocation Architecture

An allocation rule identifies source balances, target dimensions/accounts, driver dataset, fixed or percentage shares, statistical quantity, headcount/revenue/cost direction, sequence, effective dates, rounding, and residual treatment. Iterative allocation remains an open direction and requires convergence and explainability controls.

A simulation freezes source period/balances, driver version, target set, and proposed debits/credits. Finance and Cost Accounting review before posting. The posted allocation is a balanced journal linked to rule/run; reversal uses the run identity. Reconciliation proves source relieved/retained amount, target totals, and rounding.

**Current-state classification.** No allocation rule, driver, simulation, run, or journal service exists. Cost-center hierarchy alone does not implement cost allocation.

~~~mermaid
flowchart LR
  N1[Source pool]
  N2[Driver and targets]
  N3[Simulation]
  N4[Approval/posting]
  N5[Run reconciliation]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|policy check| N4
  N4 -->|control result| N5
  N2 -. exception .-> N5
~~~

## Chapter 35 — Cost Center and Profit Center Accounting

Cost centers represent responsibility for costs; profit centers support management responsibility for revenue and result. Both require owner, company, hierarchy, validity, and allowed posting relationships. Actuals come from posted journals; budgets, commitments, allocations, and internal-charge directions remain distinguishable measures.

Historical reporting uses the hierarchy version effective at posting or an explicitly restated view. Reorganization never rewrites journal dimensions. Invalid or expired centers block new posting. Internal charges require a controlled event, counterparty dimension, allocation or transfer rule, and balanced effect. Variance reporting states actual, budget, commitment, and cutoff.

**Current-state classification.** CostCenter and ProfitCenter are implemented master-data foundations evidenced by their [Prisma fields](../../apps/api/prisma/schema.prisma) and [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql). JournalLine has only free-text costCenter and no profitCenter relation, so accounting integration is planned.

~~~mermaid
flowchart LR
  N1[Hierarchy/owners]
  N2[Validated journal dimensions]
  N3[Actual/budget/commitment views]
  N4[Historical reorganization]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|control result| N4
  N2 -. exception .-> N4
~~~

## Chapter 36 — Intercompany Accounting

An intercompany relationship identifies two companies as trading partners and maps due-to/due-from, revenue/expense, tax, settlement, and currency policies. A business event creates paired documents and proposed journals with a common intercompany reference. Each company retains its own approvals, periods, currency basis, and legal accounting.

Pairing checks mirrored amount/currency, counterparty, document reference, tax/transfer-pricing evidence, and timing. Mismatches remain in an exception queue and can block close. Settlement clears paired open items. Elimination and consolidation are future directions and cannot alter company ledgers. Disputes preserve both sides and resolution history.

**Current-state classification.** Company hierarchy exists, but no intercompany partner, pair, mismatch, settlement, elimination, or reconciliation runtime exists.

~~~mermaid
sequenceDiagram
  participant P1 as Company A source
  participant P2 as Paired Finance requests
  participant P3 as Company A/B journals
  participant P4 as Mismatch resolution
  participant P5 as Settlement/elimination direction
  P1->>P2: submit governed evidence
  P2->>P3: validate and authorize
  P3->>P4: validate and authorize
  P4->>P5: record reconciled outcome
~~~

## Chapter 37 — Foreign Currency Architecture

Every foreign-currency posting preserves transaction currency/amount, functional or company base currency/amount, exchange-rate identity/version/type/date/source, quotation convention, precision, and rounding. Reporting and group currency are additional views requiring approved books or translation design, not replacements for base accounting.

Rate selection follows event policy: invoice, receipt/payment, revaluation, and translation may use different approved types/dates. Direct and indirect quotation are normalized without losing source representation. Realized exchange effects arise on settlement; unrealized effects arise from controlled revaluation and remain separately identifiable. Reversal uses the original-rate policy unless an approved rule states otherwise.

**Current-state classification.** Currency and Company base/reporting fields in the [Prisma schema](../../apps/api/prisma/schema.prisma), plus the versioned [ExchangeRate service](../../apps/api/src/exchange-rates/exchange-rates.service.ts) and [accepted test](../../apps/api/test/foundation.spec.ts), are implemented foundations. Journal lines have no currency/rate fields, so financial currency accounting is planned.

~~~mermaid
flowchart LR
  N1[Transaction currency]
  N2[Preserved rate]
  N3[Base amount/rounding]
  N4[Settlement or translation]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|control result| N4
  N2 -. exception .-> N4
~~~

## Chapter 38 — Revaluation and Translation

Open-item revaluation recalculates eligible foreign-currency AP/AR items at a valuation date; monetary balance and bank revaluation apply defined account scopes. The run freezes rate type/date/version, eligible population, prior valuations, company/book, and rounding policy. It produces unrealized gain/loss and adjustment effects with trace to each item/account.

Reversal policy specifies next-period reversal or replacement by a subsequent run. Settlement realizes exchange differences and clears applicable unrealized effects without double counting. Translation into reporting/group currency is a separate direction with historical/average/closing-rate policy and equity treatment requiring Finance approval. Run totals reconcile to eligible source balances and GL.

**Current-state classification.** No revaluation, valuation run, unrealized posting, reversal, settlement FX, or translation runtime exists.

~~~mermaid
sequenceDiagram
  participant P1 as Eligible foreign balances
  participant P2 as Valuation rates
  participant P3 as Unrealized journal
  participant P4 as Reversal/settlement
  participant P5 as Translation/reconciliation
  P1->>P2: submit governed evidence
  P2->>P3: validate and authorize
  P3->>P4: validate and authorize
  P4->>P5: record reconciled outcome
~~~

## Chapter 39 — Inventory and Manufacturing Accounting Boundaries

Inventory owns item, warehouse, stock status, quantity, batch/serial, movement, and operational valuation inputs. Manufacturing owns orders, consumption, output, WIP events, scrap, rework, co/by-product, subcontracting, and production variance evidence. Neither domain writes Finance journals or balances.

They submit versioned accounting-effect requests for receipts, issues, transfers, adjustments, COGS, material consumption, completion, WIP, scrap/rework, overhead, and variance. Finance validates company, period, quantity/value agreement, costing/valuation version, account determination, dimensions, currency, and approval before posting. Reconciliation ties source movement/event control totals to Finance journals and inventory/WIP accounts.

**Current-state classification.** Generic transaction kinds and item costing metadata exist, but no inventory ledger, costing engine, posting contract, WIP, variance, or Inventory-to-GL reconciliation runtime exists. FCSB-015 and FCSB-018 must refine these contracts.

~~~mermaid
sequenceDiagram
  participant P1 as Inventory/manufacturing events
  participant P2 as Accounting-effect contract
  participant P3 as Finance validation/posting
  participant P4 as Quantity/value reconciliation
  P1->>P2: submit governed evidence
  P2->>P3: validate and authorize
  P3->>P4: record reconciled outcome
~~~

## Chapter 40 — Procurement, Sales, Project and Payroll Boundaries

Procurement owns requisition, order, receipt, supplier and match evidence; Sales owns order, delivery, return and commercial evidence; Projects own time/cost/milestone/billing evidence; Payroll owns approved payroll results and sensitive employee detail. Finance owns commitments, invoices, payments/receipts, project accounting, payroll journals, taxes, open items, and balances.

Each domain contract carries source identity/version, company, dates, amounts/currency, dimensions, partner, evidence, and reversal/correction semantics. Purchase orders may create commitments, goods receipts may request accrual/inventory effects, deliveries may request COGS direction, invoices create subledger effects, and payroll imports create proposed journals only after totals, duplicates, period, dimensions, confidentiality, and approval validation.

**Current-state classification.** Generic transactions and EOR registrations exist; there are no domain-to-Finance posting contracts, project accounting, employee expense, or payroll import services.

~~~mermaid
sequenceDiagram
  participant P1 as Source-domain evidence
  participant P2 as Finance effect request
  participant P3 as Subledger/journal processing
  participant P4 as Cross-domain reconciliation
  P1->>P2: submit governed evidence
  P2->>P3: validate and authorize
  P3->>P4: record reconciled outcome
~~~

## Chapter 41 — Period Close Architecture

The close calendar consists of tasks with owner, due time, dependency, company/book/period, evidence, exception state, and sign-off. It coordinates AP, AR, inventory, manufacturing, fixed assets, tax, bank, payroll, intercompany, suspense, accruals, revaluation, allocations, trial balance review, statements, and management approvals.

Soft close restricts ordinary posting while late approved items complete. Hard close requires reconciliations and control checklist completion. Reopening is exceptional, scoped, time-limited, independently approved, disclosed to Reporting, and followed by rerun/reconciliation/re-certification. Close status must be enforced by posting, not only displayed in a cockpit.

**Current-state classification.** No fiscal period, close task, dependency, close state, checklist, reopen, or sign-off runtime exists. Dashboard statements are not close evidence.

~~~mermaid
flowchart LR
  N1[Close calendar]
  N2[Subledger tasks]
  N3[Reconciliation/adjustments]
  N4[Soft/hard close]
  N5[Exceptional reopen]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|policy check| N4
  N4 -->|control result| N5
  N2 -. exception .-> N5
~~~

## Chapter 42 — Reconciliation Architecture

Every subledger and material control account has an owner, population definition, frequency, tolerance, and close consequence. Controls cover AP/AR open items to control accounts, Inventory/WIP/Assets/Tax/Bank/Payroll to GL, intercompany pairs, and suspense/clearing. Checks compare counts, transaction/base currency amounts, account/dimension totals, and source IDs.

Exceptions identify missing, duplicate, timing, currency, mapping, or posting defects and preserve investigation, adjustment/reversal, rerun, and sign-off. Reconciliation does not force a match through unexplained journals. Material failures block close or statement certification. A reconciliation run is reproducible against source and ledger cutoffs.

**Current-state classification.** No reconciliation model, engine, exception workflow, sign-off, or close-block integration exists. Current account sums are reporting scaffolds only.

~~~mermaid
flowchart LR
  N1[Source/subledger control totals]
  N2[GL control totals]
  N3[Difference classification]
  N4[Resolution/rerun]
  N5[Sign-off/close gate]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|policy check| N4
  N4 -->|control result| N5
  N2 -. exception .-> N5
~~~

## Chapter 43 — Financial Reporting Architecture

Finance supplies posted, period-controlled, reconciled datasets for trial balance, GL detail, balance sheet, income statement, cash-flow direction, changes in equity direction, AP/AR aging, cost/profit-center analysis, budget-to-actual, intercompany, currency, and audit reporting. Statement rules identify account hierarchy/version, book, company, period, currency, eliminations, and comparative treatment.

FCSB-013 governs datasets, metrics, security, lineage, certification, export, and retention. Finance certifies financial definitions and control evidence. A report cannot post or correct Finance truth; a dashboard total cannot become a balance. Certification binds close status, reconciliation results, statement version, source cutoff, preparer/reviewer, and disclosure of adjustments or restatements.

**Current-state classification.** The dashboard directly computes simplified outputs from all journal lines and hard-coded account codes. It lacks posted status, period, currency, statement mapping, close, reconciliation, and certification, so it is a scaffold.

~~~mermaid
flowchart LR
  N1[Posted Finance dataset]
  N2[Statement mapping]
  N3[Reconciliation/close evidence]
  N4[Certification]
  N5[Governed distribution]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|policy check| N4
  N4 -->|control result| N5
  N2 -. exception .-> N5
~~~

## Chapter 44 — Finance Security, SoD and Audit

Server-side SoD separates journal creator/approver/poster; supplier or beneficiary maintainer/payment preparer/releaser; customer credit approver/sales approver; bank-account maintainer/payment releaser; account master maintainer/journal poster; period controller/journal creator; tax configurator/return approver; asset custodian/disposal approver; and budget owner/transfer approver.

Access is tenant/company/organization scoped and sensitive fields are minimized or masked. Super Admin is not a routine finance operator. Break-glass requires incident reason, time limit, independent approval where feasible, enhanced audit, and retrospective review. Audit records intent and access; immutable journals and linked corrections provide accounting history. Digital DNA can support identity/provenance but is not a digital signature.

**Current-state classification.** Current permissions, organization access, audit, and DNA are foundations. Finance-specific SoD policy, non-repudiation, signature, payment authorization, break-glass, threat tests, and finance audit reports are planned/open.

~~~mermaid
flowchart LR
  N1[Identity/scope]
  N2[SoD decision]
  N3[Finance operation]
  N4[Audit/DNA]
  N5[Independent review]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|policy check| N4
  N4 -->|control result| N5
  N2 -. exception .-> N5
~~~

## Chapter 45 — Finance Capability, Risk, Example and Responsibility Models

The matrices below convert architecture into reviewable work. Capability status is individually grounded in schema, migration, service/controller, seed, or accepted-test evidence; a database table without execution controls is a Scaffold. Risks describe the actual missing control and consequence rather than repeating a generic impact. Examples show intended debit/credit or nonposting effects, ownership, approval, and reconciliation.

The RACI separates GL, AP, AR, Treasury, Tax, Fixed Assets, Cost Accounting, Budget Owners, source domains, Security, Internal Audit, and Operations. Accountable roles remain singular where practical. These matrices are architecture controls and backlog inputs, not claims that the functions exist.

**Current-state classification.** Evidence links are repository-relative. “Implemented foundation” is used only where a currently reachable service or governed master-data foundation is supported by accepted schema/migration/test evidence; no production Finance transaction capability receives that label.

~~~mermaid
flowchart LR
  N1[Evidence map]
  N2[Capability/risk/use case]
  N3[RACI control]
  N4[Architecture review]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|control result| N4
  N2 -. exception .-> N4
~~~

### Finance capability matrix

| Capability ID | Capability | Owner | Current status | Target maturity | Dependencies | Authority | Priority |
|---|---|---|---|---|---|---|---|
| FIN-CAP-001 | Finance organization | Finance | Implemented foundation — [Company, LegalEntity and organization models](../../apps/api/prisma/schema.prisma); [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql). | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-002 | Legal-entity mapping | AP | Partial — Company.legalEntityId and LegalEntity models exist; no Finance book/ledger binding. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-003 | Company accounting scope | Finance | Implemented foundation — Company.baseCurrencyId/reportingCurrencyId/fiscalCalendarId in [schema](../../apps/api/prisma/schema.prisma) and accepted foundation/DBA-003 migrations. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-004 | Branch/plant dimensions | Finance | Partial — organization models exist; JournalLine has no branch/plant dimension. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-005 | Cost-center hierarchy | Cost Accounting | Implemented foundation — CostCenter parent/effective/owner fields in [schema](../../apps/api/prisma/schema.prisma), [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql), and accepted organization tests. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-006 | Profit-center hierarchy | Cost Accounting | Implemented foundation — ProfitCenter hierarchy/effective fields in [schema](../../apps/api/prisma/schema.prisma) and [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql). | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-007 | Currency master | Finance | Implemented foundation — Currency model/relations in [schema](../../apps/api/prisma/schema.prisma), [foundation migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql), and seed records. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-008 | Exchange-rate versioning | Finance | Implemented foundation — ExchangeRate version/replacement fields, [service](../../apps/api/src/exchange-rates/exchange-rates.service.ts), [controller](../../apps/api/src/exchange-rates/exchange-rates.controller.ts), migration, and [accepted test](../../apps/api/test/foundation.spec.ts). | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-009 | Customer credit foundation | AR | Implemented foundation — Customer/CreditProfile fields in [schema](../../apps/api/prisma/schema.prisma), DBA-004 migration, registry service, and master-data tests. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-010 | Supplier payment-term foundation | Treasury | Implemented foundation — Supplier default currency/payment-term fields in [schema](../../apps/api/prisma/schema.prisma), DBA-004 migration, and registry service. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-011 | Payment terms | Treasury | Implemented foundation — PaymentTerm model, [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql), registry validation, seed data, and [negative test](../../apps/api/test/master-data.spec.ts). | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-012 | Credit terms/profile | Finance | Implemented foundation — CreditTerm/CreditProfile [schema](../../apps/api/prisma/schema.prisma), [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql), registry, and seed records. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-013 | Tax category/code masters | Tax | Implemented foundation — TaxCategory/TaxCode effective fields, [DBA-004 migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql), registry validation, and tests. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-014 | Chart of accounts | AR | Scaffold — ChartOfAccount model and foundation migration exist; no controller/service/lifecycle/test. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-015 | Account groups | Finance | Planned — no account groups runtime. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-016 | Account hierarchy | AR | Scaffold — ChartOfAccount.parentId relation exists; no governed hierarchy service or test. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-017 | Account lifecycle | Finance | Planned — no account lifecycle runtime. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-018 | Control-account policy | Finance | Planned — no control-account policy runtime. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-019 | Suspense governance | Finance | Planned — no suspense governance runtime. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-020 | Fiscal-year variants | AR | Planned — no fiscal-year variants runtime. | Controlled foundation | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-021 | Fiscal periods | Finance | Planned — no fiscal periods runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-022 | Period close states | Finance | Planned — no period close states runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-023 | Period reopening | Finance | Planned — no period reopening runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-024 | Journal header | Finance | Scaffold — JournalEntry schema/migration exists; no status, currency, ledger, approval, service, or test. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-025 | Journal lines | Finance | Scaffold — JournalLine debit/credit/account/costCenter fields exist; no balance/dimension/currency validation. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-026 | Journal batches | Finance | Planned — no journal batches runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-027 | Journal lifecycle | Finance | Planned — no journal lifecycle runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-028 | Journal balance validation | Finance | Planned — no journal balance validation runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-029 | Journal approval | AP | Planned — no journal approval runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-030 | Journal reversal/correction | Finance | Planned — no journal reversal/correction runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-031 | Posting requests | Finance | Planned — no posting requests runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-032 | Posting engine | Finance | Planned — no posting engine runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-033 | Posting idempotency | Finance | Planned — no posting idempotency runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-034 | Posting outbox | Finance | Planned — no posting outbox runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-035 | Account-determination rules | Finance | Planned — no account-determination rules runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-036 | Account-determination simulation | Finance | Planned — no account-determination simulation runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-037 | General Ledger | Finance | Scaffold — dashboard [financialReports](../../apps/api/src/dashboard/dashboard.service.ts) sums journal lines; no posted ledger/balance/period runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-038 | Ledger balances | Finance | Planned — no ledger balances runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-039 | Opening carry-forward | AR | Planned — no opening carry-forward runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-040 | Multiple-ledger direction | Finance | Planned — no multiple-ledger direction runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-041 | AP supplier invoice | AP | Planned — no ap supplier invoice runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-042 | AP credit note | AP | Planned — no ap credit note runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-043 | AP duplicate detection | AP | Planned — no ap duplicate detection runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-044 | Three-way match | AP | Planned — no three-way match runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-045 | Non-PO invoice | Finance | Planned — no non-po invoice runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-046 | Supplier advance/prepayment | Treasury | Planned — no supplier advance/prepayment runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-047 | AP open items | AP | Planned — no ap open items runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-048 | Payment proposal | Treasury | Planned — no payment proposal runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-049 | Payment batch | Treasury | Planned — no payment batch runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-050 | Dual payment authorization | Treasury | Planned — no dual payment authorization runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-051 | Payment file | Treasury | Planned — no payment file runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-052 | Bank API | Treasury | Planned — no bank api runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-053 | AR customer invoice | AR | Planned — no ar customer invoice runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-054 | AR credit note | AR | Planned — no ar credit note runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-055 | Customer receipt | AR | Planned — no customer receipt runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-056 | Receipt allocation | Cost Accounting | Planned — no receipt allocation runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-057 | Collections | AR | Planned — no collections runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-058 | AR open items | AR | Planned — no ar open items runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-059 | Write-off | AR | Planned — no write-off runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-060 | Bank master/account | Treasury | Planned — no bank master/account runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-061 | Bank statement import | Treasury | Planned — no bank statement import runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-062 | Bank matching | Treasury | Planned — no bank matching runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-063 | Bank reconciliation sign-off | Treasury | Planned — no bank reconciliation sign-off runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-064 | Cash position | Treasury | Planned — no cash position runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-065 | Petty cash | Treasury | Planned — no petty cash runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-066 | Treasury liquidity | Treasury | Planned — no treasury liquidity runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-067 | Treasury instruments | Treasury | Planned — no treasury instruments runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-068 | Tax determination | Tax | Partial — TaxCode master/validation exists; no jurisdiction resolution or calculation service. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-069 | Tax posting | Tax | Planned — no tax posting runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-070 | Tax period/return | Tax | Planned — no tax period/return runtime. | Governed target | FCSB-014/domain contract | Finance | P1 |
| FIN-CAP-071 | Withholding direction | Finance | Planned — no withholding direction runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-072 | Fixed-asset register | Fixed Assets | Planned — no fixed-asset register runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-073 | Asset books | Fixed Assets | Planned — no asset books runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-074 | Asset capitalization | Fixed Assets | Planned — no asset capitalization runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-075 | Depreciation runs | Fixed Assets | Planned — no depreciation runs runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-076 | Asset transfer/improvement | Fixed Assets | Planned — no asset transfer/improvement runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-077 | Asset disposal | Fixed Assets | Planned — no asset disposal runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-078 | Budget models | Finance | Planned — no budget models runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-079 | Budget versions | Finance | Planned — no budget versions runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-080 | Budget transfer | Finance | Planned — no budget transfer runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-081 | Commitments | Finance | Planned — no commitments runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-082 | Encumbrance direction | Finance | Planned — no encumbrance direction runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-083 | Availability control | Finance | Planned — no availability control runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-084 | Accrual schedules | Finance | Planned — no accrual schedules runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-085 | Deferral schedules | Finance | Planned — no deferral schedules runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-086 | Recurring journals | Finance | Planned — no recurring journals runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-087 | Allocation rules | Cost Accounting | Planned — no allocation rules runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-088 | Allocation simulation | Cost Accounting | Planned — no allocation simulation runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-089 | Cost accounting | Cost Accounting | Planned — no cost accounting runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-090 | Intercompany partners | AR | Planned — no intercompany partners runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-091 | Paired intercompany journals | Finance | Planned — no paired intercompany journals runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-092 | Intercompany reconciliation | Finance | Planned — no intercompany reconciliation runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-093 | Foreign-currency posting | Finance | Planned — no foreign-currency posting runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-094 | Realized FX | Finance | Planned — no realized fx runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-095 | Revaluation | Finance | Planned — no revaluation runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-096 | Translation direction | Finance | Planned — no translation direction runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-097 | Inventory accounting contract | Cost Accounting | Planned — no inventory accounting contract runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-098 | Manufacturing accounting contract | Cost Accounting | Planned — no manufacturing accounting contract runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-099 | Procurement accounting contract | Finance | Planned — no procurement accounting contract runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-100 | Sales accounting contract | Finance | Planned — no sales accounting contract runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-101 | Project accounting | Finance | Planned — no project accounting runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-102 | Payroll journal import | Finance | Planned — no payroll journal import runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-103 | Close calendar | AR | Planned — no close calendar runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-104 | Close checklist | Finance | Planned — no close checklist runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-105 | Subledger-to-GL reconciliation | Finance | Planned — no subledger-to-gl reconciliation runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-106 | Finance reporting datasets | Finance | Scaffold — dashboard shapes trial balance/P&L/balance sheet and FCSB-013 report metadata exists; no certified Finance dataset. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-107 | Financial statement certification | Finance | Planned — no financial statement certification runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-108 | Finance SoD | Security | Planned — no finance sod runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-109 | Finance audit trail | Finance | Planned — no finance audit trail runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-110 | Break-glass | Security | Planned — no break-glass runtime. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-111 | Finance data retention | Finance | Approved control — Finance data retention is prohibited or constrained by FCSB-014; no runtime claimed. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-112 | Posting observability | Finance | Approved control — Posting observability is prohibited or constrained by FCSB-014; no runtime claimed. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-113 | Finance incident response | Finance | Approved control — Finance incident response is prohibited or constrained by FCSB-014; no runtime claimed. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-114 | AI journal drafting | Finance | Approved control — AI journal drafting is prohibited or constrained by FCSB-014; no runtime claimed. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-115 | AI explanation | Finance | Approved control — AI explanation is prohibited or constrained by FCSB-014; no runtime claimed. | Governed target | FCSB-014/domain contract | Finance | P2 |
| FIN-CAP-116 | AI payment/posting prohibition | Treasury | Approved architecture control — no AI Finance runtime or posting/payment service exists. | Governed target | FCSB-014/domain contract | Finance | P2 |

### Finance risk register

| Risk ID | Finance area | Risk | Current condition | Impact | Target mitigation | Owner | Residual-risk direction |
|---|---|---|---|---|---|---|---|
| FIN-RSK-001 | GL | Unbalanced journal | JournalLine has debit/credit fields but no balance constraint or posting validator. | Unbalanced journal can cause misstatement or failed close. | Compute totals at required company/ledger/currency grain and reject before posting. | GL Accountant | Down |
| FIN-RSK-002 | GL | Duplicate journal | Duplicate journal control absent; capability planned/future. | Duplicate journal can cause misstatement or failed close. | Enforce company/source/category/reference uniqueness and duplicate review. | GL Accountant | Down |
| FIN-RSK-003 | GL | Duplicate posting | Duplicate posting control absent; capability planned/future. | Duplicate posting can cause control, disclosure, or audit failure. | Use immutable source-event idempotency keys and atomic result lookup. | GL Accountant | Down |
| FIN-RSK-004 | GL | Wrong account | Wrong account control absent; capability planned/future. | Wrong account can cause misstatement or failed close. | Resolve active posting account through versioned determination; reject invalid overrides. | GL Accountant | Down |
| FIN-RSK-005 | GL | Wrong company | Wrong company control absent; capability planned/future. | Wrong company can cause control, disclosure, or audit failure. | Bind source company to tenant/legal entity and validate every account/dimension relation. | GL Accountant | Down |
| FIN-RSK-006 | GL | Wrong period | Wrong period control absent; capability planned/future. | Wrong period can cause misstatement or failed close. | Map accounting date through company fiscal calendar and reject unmapped dates. | GL Accountant | Down |
| FIN-RSK-007 | GL | Closed-period posting | Closed-period posting control absent; capability planned/future. | Closed-period posting can cause misstatement or failed close. | Check authoritative period state inside the posting transaction. | GL Accountant | Down |
| FIN-RSK-008 | GL | Unauthorized backdating | Unauthorized backdating control absent; capability planned/future. | Unauthorized backdating can cause control, disclosure, or audit failure. | Apply backdate window, reason, elevated approval, and retrospective report disclosure. | GL Accountant | Down |
| FIN-RSK-009 | GL | Wrong currency | Wrong currency control absent; capability planned/future. | Wrong currency can cause misstatement or failed close. | Require transaction/base currency and permitted account/company currency combination. | GL Accountant | Down |
| FIN-RSK-010 | GL | Wrong exchange rate | ExchangeRate is versioned, but JournalLine stores no currency or rate reference. | Wrong exchange rate can cause control, disclosure, or audit failure. | Persist approved ExchangeRate identity/version and verify rate type/date. | GL Accountant | Down |
| FIN-RSK-011 | GL | Missing dimension | Missing dimension control absent; capability planned/future. | Missing dimension can cause control, disclosure, or audit failure. | Derive required-dimension rules by account/event and reject incomplete lines. | GL Accountant | Down |
| FIN-RSK-012 | GL | Control-account manual posting | Control-account manual posting control absent; capability planned/future. | Control-account manual posting can cause misstatement or failed close. | Permit control accounts only from the named subledger posting profile. | GL Accountant | Down |
| FIN-RSK-013 | GL | Suspense-account abuse | Suspense-account abuse control absent; capability planned/future. | Suspense-account abuse can cause misstatement or failed close. | Require purpose, owner, ageing limit, reconciliation, and close escalation. | GL Accountant | Down |
| FIN-RSK-014 | AP | Approval bypass | Approval bypass control absent; capability planned/future. | Approval bypass can cause control, disclosure, or audit failure. | Cryptographically bind approved candidate hash/version to the posting command. | AP Manager | Down |
| FIN-RSK-015 | GL | SoD conflict | SoD conflict control absent; capability planned/future. | SoD conflict can cause control, disclosure, or audit failure. | Evaluate effective role conflicts for setup, creation, approval, posting, release, and close. | GL Accountant | Down |
| FIN-RSK-016 | GL | Journal deletion | Journal deletion control absent; capability planned/future. | Journal deletion can cause misstatement or failed close. | Deny delete for posted identities; retain linked reversal and archive history. | GL Accountant | Down |
| FIN-RSK-017 | GL | Reversal abuse | Reversal abuse control absent; capability planned/future. | Reversal abuse can cause control, disclosure, or audit failure. | Require original journal, permitted period, reason, independent approval, and full/partial trace. | GL Accountant | Down |
| FIN-RSK-018 | GL | Incorrect account determination | Incorrect account determination control absent; capability planned/future. | Incorrect account determination can cause misstatement or failed close. | Publish conflict-tested effective rules and expose simulation trace. | GL Accountant | Down |
| FIN-RSK-019 | AP | AP duplicate invoice | AP duplicate invoice control absent; capability planned/future. | AP duplicate invoice can cause control, disclosure, or audit failure. | Normalize supplier/reference/company keys and combine exact/fuzzy duplicate review. | AP Manager | Down |
| FIN-RSK-020 | AP | Three-way-match bypass | Three-way-match bypass control absent; capability planned/future. | Three-way-match bypass can cause control, disclosure, or audit failure. | Block invoice approval until ordered/received/invoiced tolerances or approved exception. | AP Manager | Down |
| FIN-RSK-021 | Treasury | Supplier fraud | Supplier fraud control absent; capability planned/future. | Supplier fraud can cause fraud or cash loss. | Maker-check supplier identity/bank changes and separate them from invoice/payment authority. | Treasury | Down |
| FIN-RSK-022 | Treasury | Unauthorized supplier payment | Unauthorized supplier payment control absent; capability planned/future. | Unauthorized supplier payment can cause fraud or cash loss. | Select posted due items, enforce dual release, and reconcile bank settlement. | Treasury | Down |
| FIN-RSK-023 | Treasury | Bank-account substitution | Bank-account substitution control absent; capability planned/future. | Bank-account substitution can cause fraud or cash loss. | Invalidate proposals after beneficiary change and re-verify approved bank master. | Treasury | Down |
| FIN-RSK-024 | Treasury | Payment-file tampering | Payment-file tampering control absent; capability planned/future. | Payment-file tampering can cause fraud or cash loss. | Hash/sign generated payload, protect custody, and compare bank acknowledgement totals. | Treasury | Down |
| FIN-RSK-025 | AR | AR duplicate invoice | AR duplicate invoice control absent; capability planned/future. | AR duplicate invoice can cause control, disclosure, or audit failure. | Enforce source billing-event and invoice-number idempotency. | AR Manager | Down |
| FIN-RSK-026 | AR | Receipt misallocation | Receipt misallocation control absent; capability planned/future. | Receipt misallocation can cause misstatement or failed close. | Preserve receipt identity; require customer/open-item evidence and reversible allocation. | AR Manager | Down |
| FIN-RSK-027 | AR | Improper write-off | Improper write-off control absent; capability planned/future. | Improper write-off can cause control, disclosure, or audit failure. | Apply tolerance/account/reason policy and independent approval above threshold. | AR Manager | Down |
| FIN-RSK-028 | AR | Customer-credit abuse | Customer-credit abuse control absent; capability planned/future. | Customer-credit abuse can cause control, disclosure, or audit failure. | Separate credit override from Sales approval and time-limit temporary limits. | AR Manager | Down |
| FIN-RSK-029 | GL | Bank reconciliation mismatch | Bank reconciliation mismatch control absent; capability planned/future. | Bank reconciliation mismatch can cause fraud or cash loss. | Prove statement continuity/control totals and block sign-off on unexplained difference. | GL Accountant | Down |
| FIN-RSK-030 | GL | Unidentified cash | Unidentified cash control absent; capability planned/future. | Unidentified cash can cause control, disclosure, or audit failure. | Post to governed clearing with owner/ageing and prohibit silent AR allocation. | GL Accountant | Down |
| FIN-RSK-031 | Tax | Tax-rate error | Tax-rate error control absent; capability planned/future. | Tax-rate error can cause tax or compliance exposure. | Resolve effective tax rule version and reconcile base/rate/amount. | Tax | Down |
| FIN-RSK-032 | Tax | Tax-jurisdiction error | Tax-jurisdiction error control absent; capability planned/future. | Tax-jurisdiction error can cause tax or compliance exposure. | Determine jurisdiction from approved company/partner/item/ship facts; block ambiguity. | Tax | Down |
| FIN-RSK-033 | Tax | Unsupported tax claim | Unsupported tax claim control absent; capability planned/future. | Unsupported tax claim can cause tax or compliance exposure. | Require localization/legal approval and label unapproved outputs non-statutory. | Tax | Down |
| FIN-RSK-034 | Fixed Assets | Asset misclassification | Asset misclassification control absent; capability planned/future. | Asset misclassification can cause control, disclosure, or audit failure. | Validate asset class, capitalization threshold policy, source, custodian, and accounts. | Fixed Assets Accountant | Down |
| FIN-RSK-035 | Fixed Assets | Wrong depreciation | Wrong depreciation control absent; capability planned/future. | Wrong depreciation can cause control, disclosure, or audit failure. | Version method/life/convention and test run calculations before posting. | Fixed Assets Accountant | Down |
| FIN-RSK-036 | Fixed Assets | Asset disposal fraud | Asset disposal fraud control absent; capability planned/future. | Asset disposal fraud can cause fraud or cash loss. | Separate custodian, disposal approver, proceeds handling, and asset derecognition. | Fixed Assets Accountant | Down |
| FIN-RSK-037 | Financial Controller | Budget override | Budget override control absent; capability planned/future. | Budget override can cause misstatement or failed close. | Log override reason/authority and prevent budget changes from altering actuals. | Financial Controller | Down |
| FIN-RSK-038 | Financial Controller | Commitment omission | Commitment omission control absent; capability planned/future. | Commitment omission can cause misstatement or failed close. | Create/relieve source-linked commitments idempotently and reconcile to procurement. | Financial Controller | Down |
| FIN-RSK-039 | GL | Accrual omission | Accrual omission control absent; capability planned/future. | Accrual omission can cause misstatement or failed close. | Run completeness controls over unbilled receipts/services and approved accrual schedule. | GL Accountant | Down |
| FIN-RSK-040 | GL | Deferral error | Deferral error control absent; capability planned/future. | Deferral error can cause misstatement or failed close. | Reconcile schedule opening, recognized, adjusted, and remaining balances. | GL Accountant | Down |
| FIN-RSK-041 | GL | Recurring-journal duplication | Recurring-journal duplication control absent; capability planned/future. | Recurring-journal duplication can cause misstatement or failed close. | Use template/version/period occurrence key and normal posting controls. | GL Accountant | Down |
| FIN-RSK-042 | GL | Allocation manipulation | Allocation manipulation control absent; capability planned/future. | Allocation manipulation can cause misstatement or failed close. | Freeze driver/source/targets, simulate, approve, and reconcile run totals. | GL Accountant | Down |
| FIN-RSK-043 | GL | Cost-center misstatement | Cost-center misstatement control absent; capability planned/future. | Cost-center misstatement can cause misstatement or failed close. | Validate effective center/company/account combination and preserve hierarchy version. | GL Accountant | Down |
| FIN-RSK-044 | GL | Profit-center misstatement | Profit-center misstatement control absent; capability planned/future. | Profit-center misstatement can cause misstatement or failed close. | Derive or validate responsible profit center and block expired combinations. | GL Accountant | Down |
| FIN-RSK-045 | GL | Intercompany mismatch | Intercompany mismatch control absent; capability planned/future. | Intercompany mismatch can cause control, disclosure, or audit failure. | Use shared pair ID and compare partner, currency, tax, period, and amounts. | GL Accountant | Down |
| FIN-RSK-046 | GL | Currency revaluation error | Currency revaluation error control absent; capability planned/future. | Currency revaluation error can cause misstatement or failed close. | Freeze eligible population/rates and reconcile unrealized/reversal/settlement effects. | GL Accountant | Down |
| FIN-RSK-047 | Inventory | Inventory/GL mismatch | Inventory/GL mismatch control absent; capability planned/future. | Inventory/GL mismatch can cause misstatement or failed close. | Reconcile movement/value control totals to source-linked Finance journals. | Inventory and Financial Controller | Down |
| FIN-RSK-048 | Cost | WIP/GL mismatch | WIP/GL mismatch control absent; capability planned/future. | WIP/GL mismatch can cause misstatement or failed close. | Reconcile production order WIP events/cost components to WIP control accounts. | Cost Accountant | Down |
| FIN-RSK-049 | Cost | Manufacturing variance error | Manufacturing variance error control absent; capability planned/future. | Manufacturing variance error can cause misstatement or failed close. | Version costing inputs and reconcile standard/actual/variance by order. | Cost Accountant | Down |
| FIN-RSK-050 | GL | Payroll import duplication | Payroll import duplication control absent; capability planned/future. | Payroll import duplication can cause control, disclosure, or audit failure. | Validate file/run identity, totals, confidentiality, period, and source approval. | GL Accountant | Down |
| FIN-RSK-051 | GL | Subledger/GL mismatch | Subledger/GL mismatch control absent; capability planned/future. | Subledger/GL mismatch can cause misstatement or failed close. | Automate control-account population comparison with owned exceptions and close block. | GL Accountant | Down |
| FIN-RSK-052 | AR | Suspense not cleared | Suspense not cleared control absent; capability planned/future. | Suspense not cleared can cause control, disclosure, or audit failure. | Age suspense by source/owner; escalate and block close above policy. | AR Manager | Down |
| FIN-RSK-053 | GL | Period close incomplete | Period close incomplete control absent; capability planned/future. | Period close incomplete can cause misstatement or failed close. | Dependency-gate hard close on reconciliations, adjustments, review, and sign-off. | GL Accountant | Down |
| FIN-RSK-054 | GL | Period reopened improperly | Period reopened improperly control absent; capability planned/future. | Period reopened improperly can cause misstatement or failed close. | Time-box scope, require exceptional approval, and rerun impacted reports/reconciliations. | GL Accountant | Down |
| FIN-RSK-055 | GL | Financial statement error | Financial statement error control absent; capability planned/future. | Financial statement error can cause misstatement or failed close. | Bind certified statement to posted dataset, mapping version, close, and reconciliation. | GL Accountant | Down |
| FIN-RSK-056 | GL | Report not reconciled | Report not reconciled control absent; capability planned/future. | Report not reconciled can cause misstatement or failed close. | Require source/GL control totals and Finance sign-off before certification. | GL Accountant | Down |
| FIN-RSK-057 | Security | Cross-tenant finance access | Account/journal rows are company-scoped; no Finance server policy tests exist. | Cross-tenant finance access can cause control, disclosure, or audit failure. | Enforce tenant/company predicates server-side and run negative isolation tests. | Security and Financial Controller | Down |
| FIN-RSK-058 | Security | Sensitive-field leakage | Sensitive-field leakage control absent; capability planned/future. | Sensitive-field leakage can cause control, disclosure, or audit failure. | Classify/mask bank, tax, payroll, and partner data in APIs, logs, caches, and exports. | Security and Financial Controller | Down |
| FIN-RSK-059 | Security | Export abuse | Export abuse control absent; capability planned/future. | Export abuse can cause control, disclosure, or audit failure. | Require distinct export permission, watermark/custody/expiry, and audit. | Security and Financial Controller | Down |
| FIN-RSK-060 | Security | Audit tampering | Audit tampering control absent; capability planned/future. | Audit tampering can cause fraud or cash loss. | Use append-only protected audit storage and independent monitoring; rely on ledger history too. | Security and Financial Controller | Down |
| FIN-RSK-061 | Security | Direct database posting | Finance tables exist without a posting service boundary. | Direct database posting can cause control, disclosure, or audit failure. | Restrict database credentials and route all writes through Finance posting service. | Security and Financial Controller | Down |
| FIN-RSK-062 | GL | Integration replay | Integration replay control absent; capability planned/future. | Integration replay can cause control, disclosure, or audit failure. | Use partner message identity, idempotency, sequence/checkpoint, and replay audit. | GL Accountant | Down |
| FIN-RSK-063 | AP | Bank API compromise | Bank API compromise control absent; capability planned/future. | Bank API compromise can cause fraud or cash loss. | Use least-privilege service identity, secure keys, dual release, limits, and bank confirmation. | AP Manager | Down |
| FIN-RSK-064 | Security | AI-generated fraudulent draft | AI-generated fraudulent draft control absent; capability planned/future. | AI-generated fraudulent draft can cause fraud or cash loss. | Label AI origin, cite inputs, restrict context, and require human validation/approval. | Security and Financial Controller | Down |
| FIN-RSK-065 | Treasury | AI autonomous payment attempt | AI autonomous payment attempt control absent; capability planned/future. | AI autonomous payment attempt can cause fraud or cash loss. | Deny AI any release credential or payment/posting command capability. | Treasury | Down |
| FIN-RSK-066 | GL | Long-running posting | Long-running posting control absent; capability planned/future. | Long-running posting can cause control, disclosure, or audit failure. | Budget work, batch safely, time out before commit, and observe latency. | GL Accountant | Down |
| FIN-RSK-067 | GL | Posting deadlock | Posting deadlock control absent; capability planned/future. | Posting deadlock can cause control, disclosure, or audit failure. | Use deterministic lock order, bounded retry, idempotency, and concurrency tests. | GL Accountant | Down |
| FIN-RSK-068 | AR | Failed batch partial state | Failed batch partial state control absent; capability planned/future. | Failed batch partial state can cause control, disclosure, or audit failure. | Define atomic unit, persist per-item outcome, and reconcile accepted/rejected totals. | AR Manager | Down |
| FIN-RSK-069 | AR | Customer customization bypass | Customer customization bypass control absent; capability planned/future. | Customer customization bypass can cause control, disclosure, or audit failure. | Compile extensions against non-bypassable balance/period/account/SoD policies. | AR Manager | Down |
| FIN-RSK-070 | Tax | Statutory localization defect | Statutory localization defect control absent; capability planned/future. | Statutory localization defect can cause tax or compliance exposure. | Version localization packages and require jurisdictional tests/legal approval. | Tax | Down |

### Finance transaction and use-case example catalog

| Example ID | Example | Finance owner | Source domain | Main transaction | Debit/credit or financial effect | Approval | Reconciliation | Specific risk | Current status |
|---|---|---|---|---|---|---|---|---|---|
| FIN-EX-001 | Manual journal | GL Accountant | Finance | Manual journal document/run | Dr/Cr accounts selected by approved purpose; journal must balance | GL/Finance maker-checker | Source schedule/run to posted journal | Unbalanced journal | Planned |
| FIN-EX-002 | Recurring journal | GL Accountant | Finance | Recurring journal document/run | Generate ordinary balanced journal from approved template | GL/Finance maker-checker | Source schedule/run to posted journal | Duplicate journal | Planned |
| FIN-EX-003 | Accrual | GL Accountant | Finance | Accrual document/run | Dr expense; Cr accrued liability | GL/Finance maker-checker | Source schedule/run to posted journal | Duplicate posting | Planned |
| FIN-EX-004 | Accrual reversal | GL Accountant | Finance | Accrual reversal document/run | Dr accrued liability; Cr expense, linked to original | GL/Finance maker-checker | Source schedule/run to posted journal | Wrong account | Planned |
| FIN-EX-005 | Prepayment | Financial Controller | Treasury/Bank | Prepayment document/run | Dr prepaid asset; Cr AP/cash | GL/Finance maker-checker | Bank evidence to bank GL | Wrong company | Planned |
| FIN-EX-006 | Deferred revenue | Financial Controller | Finance | Deferred revenue document/run | Dr receivable; Cr deferred revenue until recognition | GL/Finance maker-checker | Source schedule/run to posted journal | Wrong period | Planned |
| FIN-EX-007 | Deferred expense | Financial Controller | Finance | Deferred expense document/run | Dr deferred expense/prepayment; Cr source liability/cash | GL/Finance maker-checker | Source schedule/run to posted journal | Closed-period posting | Planned |
| FIN-EX-008 | Supplier invoice | AP Manager | Procurement/AP | Supplier invoice document/run | Dr expense/inventory and input tax; Cr AP control | AP maker-checker and exception owner | AP items/match to AP control | Unauthorized backdating | Planned |
| FIN-EX-009 | Supplier credit note | AP Manager | Procurement/AP | Supplier credit note document/run | Dr AP control; Cr expense/inventory/tax correction | AP maker-checker and exception owner | AP items/match to AP control | Wrong currency | Planned |
| FIN-EX-010 | Three-way match | AP Manager | Procurement/AP | Three-way match document/run | No posting until PO, receipt, invoice quantities/values pass | AP maker-checker and exception owner | AP items/match to AP control | Wrong exchange rate | Planned |
| FIN-EX-011 | Non-PO invoice | AP Manager | Procurement/AP | Non-PO invoice document/run | Dr approved expense/tax; Cr AP control | AP maker-checker and exception owner | AP items/match to AP control | Missing dimension | Planned |
| FIN-EX-012 | Supplier advance | AP Manager | Procurement/AP | Supplier advance document/run | Dr supplier advance; Cr bank/AP clearing | AP maker-checker and exception owner | AP items/match to AP control | Control-account manual posting | Planned |
| FIN-EX-013 | Supplier payment | AP Manager | Procurement/AP | Supplier payment document/run | Dr AP control; Cr bank; clear supplier items | Treasury dual authorization | AP items/match to AP control | Suspense-account abuse | Planned |
| FIN-EX-014 | Payment reversal | Treasury | Treasury/Bank | Payment reversal document/run | Dr bank/payment clearing; Cr AP control and reopen items | Treasury dual authorization | Bank evidence to bank GL | Approval bypass | Planned |
| FIN-EX-015 | Customer invoice | AR Manager | Sales/AR | Customer invoice document/run | Dr AR control; Cr revenue/output tax | AR maker-checker | AR items/allocation to AR control | SoD conflict | Planned |
| FIN-EX-016 | Customer credit note | AR Manager | Sales/AR | Customer credit note document/run | Dr revenue/tax correction; Cr AR control | AR maker-checker | AR items/allocation to AR control | Journal deletion | Planned |
| FIN-EX-017 | Customer receipt | AR Manager | Sales/AR | Customer receipt document/run | Dr bank/unapplied cash; Cr AR control when allocated | AR maker-checker | AR items/allocation to AR control | Reversal abuse | Planned |
| FIN-EX-018 | Unapplied receipt | AR Manager | Sales/AR | Unapplied receipt document/run | Dr bank; Cr unapplied-cash liability/clearing | AR maker-checker | AR items/allocation to AR control | Incorrect account determination | Planned |
| FIN-EX-019 | Partial settlement | Financial Controller | Finance | Partial settlement document/run | Dr bank; Cr AR control for allocated amount | GL/Finance maker-checker | Source schedule/run to posted journal | AP duplicate invoice | Planned |
| FIN-EX-020 | Write-off | AR Manager | Finance | Write-off document/run | Dr write-off expense; Cr AR control within authority | Controller plus independent approver | AR items/allocation to AR control | Three-way-match bypass | Planned |
| FIN-EX-021 | Refund | AR Manager | Sales/AR | Refund document/run | Dr customer payable/AR control; Cr bank after approval | Treasury dual authorization | AR items/allocation to AR control | Supplier fraud | Planned |
| FIN-EX-022 | Bank transfer | Treasury | Treasury/Bank | Bank transfer document/run | Dr receiving bank/in-transit; Cr sending bank | Treasury dual authorization | Bank evidence to bank GL | Unauthorized supplier payment | Planned |
| FIN-EX-023 | Bank fee | Treasury | Treasury/Bank | Bank fee document/run | Dr bank-fee expense; Cr bank | GL/Finance maker-checker | Bank evidence to bank GL | Bank-account substitution | Planned |
| FIN-EX-024 | Interest income | Treasury | Treasury/Bank | Interest income document/run | Dr bank; Cr interest income | GL/Finance maker-checker | Bank evidence to bank GL | Payment-file tampering | Planned |
| FIN-EX-025 | Bank-statement import | Treasury | Treasury/Bank | Bank-statement import document/run | No journal; create immutable statement evidence | GL/Finance maker-checker | Bank evidence to bank GL | AR duplicate invoice | Future |
| FIN-EX-026 | Bank reconciliation | Treasury | Treasury/Bank | Bank reconciliation document/run | Post only approved unmatched fees/interest; clear matched entries | GL/Finance maker-checker | Bank evidence to bank GL | Receipt misallocation | Future |
| FIN-EX-027 | Petty cash expense | Treasury | Treasury/Bank | Petty cash expense document/run | Dr petty-cash expense; Cr petty cash | GL/Finance maker-checker | Bank evidence to bank GL | Improper write-off | Planned |
| FIN-EX-028 | Foreign-currency invoice | GL Accountant | Finance | Foreign-currency invoice document/run | Dr expense/asset and tax; Cr AP in transaction/base currency | GL/Finance maker-checker | Source schedule/run to posted journal | Customer-credit abuse | Planned |
| FIN-EX-029 | Foreign-currency payment | GL Accountant | Treasury/Bank | Foreign-currency payment document/run | Dr AP; Cr bank; calculate settlement FX | GL/Finance maker-checker | Bank evidence to bank GL | Bank reconciliation mismatch | Planned |
| FIN-EX-030 | Realized gain/loss | Financial Controller | Finance | Realized gain/loss document/run | Dr/Cr realized FX and clear settlement difference | Finance human reviewer; normal approval still required | Source schedule/run to posted journal | Unidentified cash | Planned |
| FIN-EX-031 | Open-item revaluation | GL Accountant | Finance | Open-item revaluation document/run | Dr/Cr unrealized FX against revaluation adjustment | GL/Finance maker-checker | Source schedule/run to posted journal | Tax-rate error | Planned |
| FIN-EX-032 | Tax invoice | Tax Manager | Finance | Tax invoice document/run | Dr expense/asset and tax; Cr AP/AR tax control as applicable | Tax preparer/reviewer | Source schedule/run to posted journal | Tax-jurisdiction error | Planned |
| FIN-EX-033 | Withholding direction | Tax Manager | Finance | Withholding direction document/run | Dr AP control/gross payable split; Cr withholding payable direction | Tax preparer/reviewer | Source schedule/run to posted journal | Unsupported tax claim | Planned |
| FIN-EX-034 | Asset acquisition | Fixed Assets Accountant | Fixed Assets | Asset acquisition document/run | Dr asset/AUC; Cr AP/bank | GL/Finance maker-checker | Asset book to asset GL | Asset misclassification | Planned |
| FIN-EX-035 | Asset capitalization | Fixed Assets Accountant | Fixed Assets | Asset capitalization document/run | Dr fixed asset; Cr AUC after capitalization approval | GL/Finance maker-checker | Asset book to asset GL | Wrong depreciation | Planned |
| FIN-EX-036 | Depreciation | Fixed Assets Accountant | Fixed Assets | Depreciation document/run | Dr depreciation expense; Cr accumulated depreciation | GL/Finance maker-checker | Asset book to asset GL | Asset disposal fraud | Planned |
| FIN-EX-037 | Asset transfer | Fixed Assets Accountant | Fixed Assets | Asset transfer document/run | Move asset cost/depreciation dimensions; no gain/loss | GL/Finance maker-checker | Asset book to asset GL | Budget override | Planned |
| FIN-EX-038 | Asset improvement | Fixed Assets Accountant | Fixed Assets | Asset improvement document/run | Dr asset component; Cr AP/bank or capitalization clearing | GL/Finance maker-checker | Asset book to asset GL | Commitment omission | Planned |
| FIN-EX-039 | Asset disposal | Fixed Assets Accountant | Fixed Assets | Asset disposal document/run | Dr bank/receivable and accumulated depreciation; Cr asset; gain/loss balance | Controller plus independent approver | Asset book to asset GL | Accrual omission | Planned |
| FIN-EX-040 | Budget creation | Financial Controller / Budget Owner | Finance | Budget creation document/run | No journal; approved budget version only | Budget owner and controller | Budget/commitment version totals | Deferral error | Planned |
| FIN-EX-041 | Budget revision | Financial Controller / Budget Owner | Finance | Budget revision document/run | No journal; new approved budget version with audit trail | Budget owner and controller | Budget/commitment version totals | Recurring-journal duplication | Planned |
| FIN-EX-042 | Budget transfer | Financial Controller / Budget Owner | Finance | Budget transfer document/run | No journal; reduce source and increase target budget | Budget owner and controller | Budget/commitment version totals | Allocation manipulation | Planned |
| FIN-EX-043 | Purchase commitment | Financial Controller / Budget Owner | Procurement/AP | Purchase commitment document/run | No journal; reserve budget/record commitment separately | Budget owner and controller | Budget/commitment version totals | Cost-center misstatement | Planned |
| FIN-EX-044 | Commitment relief | Financial Controller / Budget Owner | Finance | Commitment relief document/run | Reduce commitment and link to receipt/invoice actual | Budget owner and controller | Budget/commitment version totals | Profit-center misstatement | Planned |
| FIN-EX-045 | Cost allocation | Cost Accountant | Finance | Cost allocation document/run | Dr target costs; Cr source pool via balanced allocation journal | GL/Finance maker-checker | Source schedule/run to posted journal | Intercompany mismatch | Planned |
| FIN-EX-046 | Profit-center allocation | Cost Accountant | Finance | Profit-center allocation document/run | Dr/Cr profit-center dimensions under approved driver | GL/Finance maker-checker | Source schedule/run to posted journal | Currency revaluation error | Planned |
| FIN-EX-047 | Intercompany invoice | Financial Controller | Finance | Intercompany invoice document/run | Mirror revenue/expense or due-to/due-from in paired companies | GL/Finance maker-checker | Paired company journals/balances | Inventory/GL mismatch | Planned |
| FIN-EX-048 | Intercompany settlement | Financial Controller | Finance | Intercompany settlement document/run | Dr due-to; Cr bank / Dr bank; Cr due-from as paired settlement | GL/Finance maker-checker | Paired company journals/balances | WIP/GL mismatch | Planned |
| FIN-EX-049 | Intercompany reconciliation | Financial Controller | Finance | Intercompany reconciliation document/run | No journal; compare paired documents, journals, currency, and balances | GL/Finance maker-checker | Paired company journals/balances | Manufacturing variance error | Planned |
| FIN-EX-050 | Inventory receipt accounting | AR Manager | Sales/AR | Inventory receipt accounting document/run | Dr inventory; Cr GRNI/AP/accrual per approved event | AR maker-checker | AR items/allocation to AR control | Payroll import duplication | Planned |
| FIN-EX-051 | Inventory issue accounting | Cost Accountant | Inventory | Inventory issue accounting document/run | Dr expense/WIP/COGS; Cr inventory | GL/Finance maker-checker | Inventory values to inventory GL | Subledger/GL mismatch | Planned |
| FIN-EX-052 | Inventory adjustment accounting | Cost Accountant | Inventory | Inventory adjustment accounting document/run | Dr/Cr inventory and approved variance account | GL/Finance maker-checker | Inventory values to inventory GL | Suspense not cleared | Planned |
| FIN-EX-053 | Cost-of-goods-sold posting | Financial Controller | Finance | Cost-of-goods-sold posting document/run | Dr COGS; Cr inventory after governed delivery/valuation event | GL/Finance maker-checker | Source schedule/run to posted journal | Period close incomplete | Planned |
| FIN-EX-054 | Production material consumption | Cost Accountant | Manufacturing | Production material consumption document/run | Dr WIP; Cr raw-material inventory | GL/Finance maker-checker | Order costs to WIP/variance GL | Period reopened improperly | Planned |
| FIN-EX-055 | Production completion | Cost Accountant | Manufacturing | Production completion document/run | Dr finished goods; Cr WIP/production clearing | GL/Finance maker-checker | Order costs to WIP/variance GL | Financial statement error | Planned |
| FIN-EX-056 | WIP posting | Cost Accountant | Manufacturing | WIP posting document/run | Dr WIP; Cr material/labor/overhead sources | GL/Finance maker-checker | Order costs to WIP/variance GL | Report not reconciled | Planned |
| FIN-EX-057 | Scrap posting | Cost Accountant | Manufacturing | Scrap posting document/run | Dr scrap/variance expense; Cr WIP/inventory | GL/Finance maker-checker | Order costs to WIP/variance GL | Cross-tenant finance access | Planned |
| FIN-EX-058 | Rework posting | Cost Accountant | Manufacturing | Rework posting document/run | Dr WIP/rework expense; Cr labor/material sources | GL/Finance maker-checker | Order costs to WIP/variance GL | Sensitive-field leakage | Planned |
| FIN-EX-059 | Manufacturing variance | Cost Accountant | Manufacturing | Manufacturing variance document/run | Dr/Cr production variance accounts; clear production control | GL/Finance maker-checker | Order costs to WIP/variance GL | Export abuse | Planned |
| FIN-EX-060 | Payroll journal import | Payroll and GL Accountant | Payroll | Payroll journal import document/run | Dr/Cr payroll expense, liabilities, tax, cash clearing from validated totals | GL/Finance maker-checker | Source schedule/run to posted journal | Audit tampering | Planned |
| FIN-EX-061 | Employee expense | Project Accountant | Finance | Employee expense document/run | Dr expense/input tax; Cr employee payable/cash | GL/Finance maker-checker | Source schedule/run to posted journal | Direct database posting | Planned |
| FIN-EX-062 | Project cost | Project Accountant | Projects | Project cost document/run | Dr project WIP/expense; Cr AP/payroll/inventory source | GL/Finance maker-checker | Source schedule/run to posted journal | Integration replay | Planned |
| FIN-EX-063 | Project billing | Project Accountant | Projects | Project billing document/run | Dr AR; Cr project revenue/deferred revenue under approved recognition | GL/Finance maker-checker | Source schedule/run to posted journal | Bank API compromise | Planned |
| FIN-EX-064 | Period close | GL Accountant | Finance | Period close document/run | Post close adjustments only; lock period after reconciliations | GL/Finance maker-checker | Posted GL, close, and certifications | AI-generated fraudulent draft | Planned |
| FIN-EX-065 | Period reopening | GL Accountant | Finance | Period reopening document/run | No direct effect; temporarily authorize scoped postings then re-close | Controller plus independent approver | Posted GL, close, and certifications | AI autonomous payment attempt | Planned |
| FIN-EX-066 | Trial balance | GL Accountant | Finance | Trial balance document/run | No journal; sum posted debits/credits by account/period/book | GL/Finance maker-checker | Posted GL, close, and certifications | Long-running posting | Planned |
| FIN-EX-067 | AP aging | AP Manager | Finance | AP aging document/run | No journal; age AP open items by due date/as-of cutoff | GL/Finance maker-checker | AP items/match to AP control | Posting deadlock | Planned |
| FIN-EX-068 | AR aging | AR Manager | Sales/AR | AR aging document/run | No journal; age AR open items by due date/as-of cutoff | GL/Finance maker-checker | AR items/allocation to AR control | Failed batch partial state | Planned |
| FIN-EX-069 | Balance sheet | Financial Controller | Finance | Balance sheet document/run | No journal; certified mapping of posted closing balances | GL/Finance maker-checker | Source schedule/run to posted journal | Customer customization bypass | Planned |
| FIN-EX-070 | Income statement | GL Accountant | Finance | Income statement document/run | No journal; certified revenue/expense mapping by period | GL/Finance maker-checker | Posted GL, close, and certifications | Statutory localization defect | Planned |
| FIN-EX-071 | Cash-flow statement direction | Treasury | Treasury/Bank | Cash-flow statement direction document/run | No journal; reconcile cash-flow classifications to certified statements | GL/Finance maker-checker | Bank evidence to bank GL | Unbalanced journal | Planned |
| FIN-EX-072 | AI-generated journal draft | GL Accountant | Finance | AI-generated journal draft document/run | Draft only: proposed balanced lines with citations; human approval required | Finance human reviewer; normal approval still required | Source schedule/run to posted journal | Duplicate journal | Planned |

### Finance RACI

Roles covered: Architecture Board; CFO/Finance Director; Financial Controller; General Ledger Accountant; AP Accountant; AR Accountant; Treasury; Tax; Fixed Assets Accountant; Cost Accountant; Budget Owner; Procurement; Sales; Inventory; Manufacturing; Projects; Payroll; Security; Internal Audit; Operations.

| Activity ID | Activity | Responsible | Accountable | Consulted | Informed |
|---|---|---|---|---|---|
| FIN-RAC-001 | Define chart of accounts | GL Accountant | Financial Controller | Security, Internal Audit, Operations | CFO/Finance Director |
| FIN-RAC-002 | Create account | GL Accountant | Financial Controller | Security, Internal Audit, Operations | CFO/Finance Director |
| FIN-RAC-003 | Change account | GL Accountant | Financial Controller | Security, Internal Audit, Operations | CFO/Finance Director |
| FIN-RAC-004 | Open period | Financial Controller | CFO/Finance Director | GL, AP, AR, Treasury, Tax, Assets, Cost, Operations | Architecture Board, Internal Audit |
| FIN-RAC-005 | Close period | Financial Controller | CFO/Finance Director | GL, AP, AR, Treasury, Tax, Assets, Cost, Operations | Architecture Board, Internal Audit |
| FIN-RAC-006 | Reopen period | Financial Controller | CFO/Finance Director | GL, AP, AR, Treasury, Tax, Assets, Cost, Operations | Architecture Board, Internal Audit |
| FIN-RAC-007 | Create journal | GL Accountant | Financial Controller | Security, Internal Audit, Operations | CFO/Finance Director |
| FIN-RAC-008 | Approve journal | GL Accountant | Financial Controller | Security, Internal Audit, Operations | CFO/Finance Director |
| FIN-RAC-009 | Post journal | GL Accountant | Financial Controller | Security, Internal Audit, Operations | CFO/Finance Director |
| FIN-RAC-010 | Reverse journal | GL Accountant | Financial Controller | Security, Internal Audit, Operations | CFO/Finance Director |
| FIN-RAC-011 | Configure account determination | GL Accountant | Financial Controller | Security, Internal Audit, Operations | CFO/Finance Director |
| FIN-RAC-012 | Enter supplier invoice | AP Accountant | Financial Controller | Procurement, Tax, GL Accountant | Internal Audit |
| FIN-RAC-013 | Approve supplier invoice | AP Accountant | Financial Controller | Procurement, Tax, GL Accountant | Internal Audit |
| FIN-RAC-014 | Release supplier payment | Treasury | CFO/Finance Director | AP Accountant, Security | Internal Audit, Operations |
| FIN-RAC-015 | Enter customer invoice | AR Accountant | Financial Controller | Sales, Treasury, Tax | Internal Audit |
| FIN-RAC-016 | Allocate receipt | AR Accountant | Financial Controller | Sales, Treasury, Tax | Internal Audit |
| FIN-RAC-017 | Approve write-off | AR Accountant | Financial Controller | Sales, Treasury, Tax | Internal Audit |
| FIN-RAC-018 | Configure bank account | Treasury | CFO/Finance Director | Security, GL Accountant | Internal Audit, Operations |
| FIN-RAC-019 | Reconcile bank | Treasury | Financial Controller | Security, GL Accountant | Internal Audit, Operations |
| FIN-RAC-020 | Configure tax | Tax | Tax | GL Accountant, Security, Financial Controller | Internal Audit |
| FIN-RAC-021 | Approve tax return direction | Tax | CFO/Finance Director | GL Accountant, Security | Internal Audit |
| FIN-RAC-022 | Create asset | Fixed Assets Accountant | Fixed Assets Accountant | Operations, Tax, GL Accountant, Financial Controller | Internal Audit |
| FIN-RAC-023 | Run depreciation | Fixed Assets Accountant | Financial Controller | Operations, Tax, GL Accountant | Internal Audit |
| FIN-RAC-024 | Dispose asset | Fixed Assets Accountant | Financial Controller | Operations, Tax, GL Accountant | Internal Audit |
| FIN-RAC-025 | Create budget | Budget Owner | Budget Owner | Financial Controller, Cost Accountant | Internal Audit |
| FIN-RAC-026 | Revise budget | Budget Owner | CFO/Finance Director | Financial Controller, Cost Accountant | Internal Audit |
| FIN-RAC-027 | Create accrual | GL Accountant | Financial Controller | Security, Internal Audit, Operations | CFO/Finance Director |
| FIN-RAC-028 | Configure recurring journal | GL Accountant | Financial Controller | Security, Internal Audit, Operations | CFO/Finance Director |
| FIN-RAC-029 | Run allocation | Cost Accountant | Financial Controller | Budget Owner, GL Accountant | Internal Audit |
| FIN-RAC-030 | Reconcile AP/AR | AP Accountant | Financial Controller | Procurement, Tax, GL Accountant | Internal Audit |
| FIN-RAC-031 | Reconcile Inventory | Cost Accountant | Financial Controller | Inventory, Manufacturing, GL Accountant | Internal Audit |
| FIN-RAC-032 | Reconcile intercompany | GL Accountant | Financial Controller | Treasury, Tax, Cost Accountant | Internal Audit |
| FIN-RAC-033 | Run revaluation | GL Accountant | Financial Controller | Treasury, Tax, Cost Accountant | Internal Audit |
| FIN-RAC-034 | Execute period close | Financial Controller | CFO/Finance Director | GL, AP, AR, Treasury, Tax, Assets, Cost, Operations | Architecture Board, Internal Audit |
| FIN-RAC-035 | Certify financial statements | Financial Controller | CFO/Finance Director | GL, AP, AR, Treasury, Tax, Assets, Cost, Operations | Architecture Board, Internal Audit |
| FIN-RAC-036 | Review audit | Internal Audit | Architecture Board | Security, CFO, Operations | Finance teams |
| FIN-RAC-037 | Investigate finance incident | Operations | Operations | Security, Finance owners, Internal Audit, CFO/Finance Director | Architecture Board |
| FIN-RAC-038 | Approve AI-generated draft | Financial Controller | CFO/Finance Director | Security, Internal Audit, GL Accountant | Architecture Board |

RACI accountability is functional; runtime SoD still separates individuals. A GL preparer cannot approve the same journal, an AP processor cannot release its payment, a Treasury bank-master maker cannot release an instruction using that change, and configuration owners cannot self-certify the resulting close or statement.

### Current-versus-target evidence matrix

| Area | Concrete current evidence | Classification | Target boundary |
|---|---|---|---|
| Account/journal | ChartOfAccount, JournalEntry and JournalLine in schema and foundation migration | Scaffold | Versioned COA, controlled lifecycle, posting/ledger/open-item services |
| Currency/rates | [Schema](../../apps/api/prisma/schema.prisma), [migration](../../apps/api/prisma/migrations/20260711000000_foundation_platform_schema/migration.sql), [service](../../apps/api/src/exchange-rates/exchange-rates.service.ts), controller, seed, and [test](../../apps/api/test/foundation.spec.ts) | Implemented foundation | Journal currency/rate preservation, settlement/revaluation/translation |
| Organization | Company/CostCenter/ProfitCenter [schema](../../apps/api/prisma/schema.prisma), [DBA-003 migration](../../apps/api/prisma/migrations/20260712143659_enterprise_structure_model/migration.sql), and tests | Implemented foundation | Validated journal dimensions and historical hierarchy |
| Partners/terms/tax | [DBA-004 schema](../../apps/api/prisma/schema.prisma), [migration](../../apps/api/prisma/migrations/20260714000000_enterprise_master_data_platform/migration.sql), registry/seed, and [tests](../../apps/api/test/master-data.spec.ts) | Implemented master-data foundation | AP/AR/tax determination and subledger controls |
| Finance objects | Seed registers invoices, payment, receipt, COA, journal, fiscal year | Registered metadata only | Runtime ownership and contracts |
| Financial dashboard | DashboardService sums all JournalLine records and uses hard-coded codes | Scaffold | Posted/period/currency/reconciled certified datasets |
| Runtime topology | PostgreSQL, API, web; no finance queue, bank, tax, close, or ledger service | Foundation only | Approved secure/observable Finance services |

## Chapter 46 — Decisions, Approval and Roadmap

The decision register fixes non-negotiable authority and integrity rules while leaving physical ledger, multi-book, tax/localization, banking, assets, budget, consolidation, signature, and AI choices open pending requirements. Approval requires Architecture Board, Finance, Tax, Treasury, Data Governance, Security, Internal Audit, Inventory, Procurement, Sales, Manufacturing, Projects, Payroll, Integration, Reporting, and Operations review.

Before Finance coding, approve journal/ledger data model, fiscal periods, posting/idempotency, account determination, subledgers/open items, payments/banks, tax/localization, assets, planning, intercompany/FX, close/reconciliation, reporting certification, security/SoD, retention, migration, testing, observability, and recovery. Before FCSB-015, Inventory and Finance must agree quantity authority, valuation/costing inputs, event contracts, account determination, timing, correction, reconciliation, and close dependencies.

**Current-state classification.** A new reviewed version and explicit implementation milestone are required to authorize runtime work. This draft does not start FCSB-015 and does not change the Series Index.

~~~mermaid
flowchart LR
  N1[Open decisions]
  N2[Named approvals]
  N3[Implementation readiness]
  N4[FCSB-015 gate]
  N1 -->|evidence| N2
  N2 -->|policy check| N3
  N3 -->|control result| N4
  N2 -. exception .-> N4
~~~

### Finance architecture decision register

| Decision ID | Decision | Status | Finance-specific rationale |
|---|---|---|---|
| FIN-ADR-001 | Finance owns GL and journal authority | Approved | Controls finance owns gl and journal authority. |
| FIN-ADR-002 | Domains request effects through governed contracts | Approved | Controls domains request effects through governed contracts. |
| FIN-ADR-003 | Posted journals are immutable | Approved | Controls posted journals are immutable. |
| FIN-ADR-004 | Posted journals cannot be deleted | Approved | Controls posted journals cannot be deleted. |
| FIN-ADR-005 | Correction uses linked reversal or adjustment | Approved | Controls correction uses linked reversal or adjustment. |
| FIN-ADR-006 | Approval and posting are separate | Approved | Controls approval and posting are separate. |
| FIN-ADR-007 | Journal and source identities are separate | Approved | Controls journal and source identities are separate. |
| FIN-ADR-008 | Every journal balances | Approved | Controls every journal balances. |
| FIN-ADR-009 | Control-account manual posting is restricted | Approved | Controls control-account manual posting is restricted. |
| FIN-ADR-010 | Closed periods reject ordinary posting | Approved | Controls closed periods reject ordinary posting. |
| FIN-ADR-011 | Reopening requires exceptional approval | Approved | Controls reopening requires exceptional approval. |
| FIN-ADR-012 | Account determination is versioned | Proposed | Controls account determination is versioned. |
| FIN-ADR-013 | COA changes are effective-dated | Proposed | Controls coa changes are effective-dated. |
| FIN-ADR-014 | Account numbers are not primary keys | Proposed | Controls account numbers are not primary keys. |
| FIN-ADR-015 | Financial dimensions are validated | Proposed | Controls financial dimensions are validated. |
| FIN-ADR-016 | Currency rates are versioned and preserved | Proposed | Controls currency rates are versioned and preserved. |
| FIN-ADR-017 | Realized and unrealized FX are separate | Proposed | Controls realized and unrealized fx are separate. |
| FIN-ADR-018 | Subledgers reconcile to GL | Proposed | Controls subledgers reconcile to gl. |
| FIN-ADR-019 | AP and AR use open-item control | Proposed | Controls ap and ar use open-item control. |
| FIN-ADR-020 | Payment release requires dual control | Proposed | Controls payment release requires dual control. |
| FIN-ADR-021 | AI cannot release payment | Proposed | Controls ai cannot release payment. |
| FIN-ADR-022 | Bank reconciliation is evidence-based | Proposed | Controls bank reconciliation is evidence-based. |
| FIN-ADR-023 | Tax rules are jurisdiction-specific/versioned | Proposed | Controls tax rules are jurisdiction-specific/versioned. |
| FIN-ADR-024 | Unsupported statutory claims are prohibited | Proposed | Controls unsupported statutory claims are prohibited. |
| FIN-ADR-025 | Fixed-assets postings reconcile to GL | Proposed | Controls fixed-assets postings reconcile to gl. |
| FIN-ADR-026 | Depreciation policies are versioned | Proposed | Controls depreciation policies are versioned. |
| FIN-ADR-027 | Budgets are versioned and approved | Proposed | Controls budgets are versioned and approved. |
| FIN-ADR-028 | Commitments remain separate from actuals | Proposed | Controls commitments remain separate from actuals. |
| FIN-ADR-029 | Accruals/deferrals use controlled schedules | Proposed | Controls accruals/deferrals use controlled schedules. |
| FIN-ADR-030 | Recurring templates generate ordinary journals | Proposed | Controls recurring templates generate ordinary journals. |
| FIN-ADR-031 | Allocations are simulated/approved | Proposed | Controls allocations are simulated/approved. |
| FIN-ADR-032 | Intercompany entries are paired/reconciled | Proposed | Controls intercompany entries are paired/reconciled. |
| FIN-ADR-033 | Inventory owns quantity truth | Proposed | Controls inventory owns quantity truth. |
| FIN-ADR-034 | Finance owns inventory financial postings | Proposed | Controls finance owns inventory financial postings. |
| FIN-ADR-035 | Manufacturing requests WIP/variance effects | Proposed | Controls manufacturing requests wip/variance effects. |
| FIN-ADR-036 | Payroll imports pass Finance validation | Proposed | Controls payroll imports pass finance validation. |
| FIN-ADR-037 | Financial reporting uses posted Finance truth | Proposed | Controls financial reporting uses posted finance truth. |
| FIN-ADR-038 | Certified statements require reconciliation | Proposed | Controls certified statements require reconciliation. |
| FIN-ADR-039 | Finance security is server-enforced | Proposed | Controls finance security is server-enforced. |
| FIN-ADR-040 | SoD covers setup/posting/payment/close | Proposed | Controls sod covers setup/posting/payment/close. |
| FIN-ADR-041 | Direct Finance database writes are prohibited | Proposed | Controls direct finance database writes are prohibited. |
| FIN-ADR-042 | External banking uses controlled contracts | Proposed | Controls external banking uses controlled contracts. |
| FIN-ADR-043 | Finance outputs preserve lineage | Proposed | Controls finance outputs preserve lineage. |
| FIN-ADR-044 | AI may explain/draft only | Proposed | Controls ai may explain/draft only. |
| FIN-ADR-045 | AI cannot post/approve/pay | Proposed | Controls ai cannot post/approve/pay. |
| FIN-ADR-046 | Current account/journal models are scaffolds | Open | Controls current account/journal models are scaffolds. |
| FIN-ADR-047 | Technology/localization choices remain unselected | Open | Controls technology/localization choices remain unselected. |
| FIN-ADR-048 | FCSB-014 does not authorize implementation | Open | Controls fcsb-014 does not authorize implementation. |

### Open decisions

| Open ID | Decision | Accountable owner | Evidence required before selection |
|---|---|---|---|
| FIN-OPEN-001 | Physical journal/ledger architecture | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-002 | Single versus multiple ledger strategy | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-003 | COA sharing model | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-004 | Account-code structure | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-005 | Financial-dimension model | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-006 | Fiscal-period implementation | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-007 | Posting-engine architecture | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-008 | Posting-batch model | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-009 | Account-determination language | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-010 | Subledger architecture | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-011 | Open-item settlement model | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-012 | Payment-engine architecture | Treasury and CFO | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-013 | Bank-file formats | Treasury and CFO | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-014 | Bank API direction | Treasury and CFO | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-015 | Treasury scope | Treasury and CFO | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-016 | Tax-engine strategy | Tax and CFO | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-017 | Localization-package model | Tax and CFO | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-018 | Withholding-tax direction | Tax and CFO | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-019 | Fixed-assets book model | Fixed Assets and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-020 | Depreciation-method catalog | Fixed Assets and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-021 | Budget model | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-022 | Commitment-accounting scope | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-023 | Allocation-engine strategy | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-024 | Intercompany automation | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-025 | Consolidation direction | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-026 | FX revaluation model | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-027 | Inventory valuation integration | Controller and domain owner | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-028 | Manufacturing costing integration | Controller and domain owner | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-029 | Period-close orchestration | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-030 | Reconciliation-engine architecture | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-031 | Reporting certification workflow | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-032 | Finance retention policy | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-033 | Finance AI boundary | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-034 | Electronic-signature requirements | Architecture Board and Controller | Requirements, controls, tests, operations, reconciliation |
| FIN-OPEN-035 | Statutory reporting approach | Tax and CFO | Requirements, controls, tests, operations, reconciliation |

### Approval conditions

Architecture approval requires the named reviewers and resolution or explicit deferral of material open decisions. Coding requires a separately accepted implementation milestone with journal/ledger model, account determination, period control, subledger contracts, payment/bank security, tax/localization scope, assets/planning design, FX/intercompany treatment, reconciliation/close, certified reporting, SoD, migration, test, observability, recovery, and retention evidence.

Before FCSB-015, Finance and Inventory must approve event identity, quantity/value authority, valuation input/version, receipt/issue/transfer/adjustment/COGS effects, correction/reversal, period timing, account determination, and Inventory-to-GL reconciliation. No FCSB-015 content is created here.

| Version | Date | Change | Approval state |
|---|---|---|---|
| 1.0 Draft rewrite | 2026-07-16 | Replaced templated content with evidence-backed Finance architecture | Pending named review |
