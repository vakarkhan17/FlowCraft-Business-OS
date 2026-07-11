'use client';

import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Check,
  ClipboardList,
  Columns3,
  FileSpreadsheet,
  GripVertical,
  LayoutTemplate,
  Plus,
  Settings2,
  ToggleLeft,
  ToggleRight,
  Workflow
} from 'lucide-react';
import { AppShell } from '@/components/app-shell';

const initialModules = [
  'Accounting & Finance',
  'Purchasing',
  'Sales',
  'Warehouse Management',
  'Material Resource Planning',
  'Production',
  'Quality Control',
  'Costing',
  'Maintenance & Engineering',
  'Approval Workflow',
  'Dynamic Report Builder',
  'Dynamic Print Layout Designer'
].map((name) => ({ name, enabled: true }));

const initialSteps = ['Purchase Request', 'RFQ', 'Purchase Order', 'GRN', 'Supplier Invoice', 'Payment'];

const layoutSections = [
  { key: 'logo', label: 'Company logo', x: 24, y: 24 },
  { key: 'header', label: 'Header', x: 132, y: 24 },
  { key: 'table', label: 'Item table', x: 24, y: 160 },
  { key: 'terms', label: 'Terms', x: 24, y: 610 },
  { key: 'signature', label: 'Signature block', x: 360, y: 700 },
  { key: 'qr', label: 'QR / Barcode', x: 468, y: 24 }
];

export default function CustomizationPage() {
  const [modules, setModules] = useState(initialModules);
  const [steps, setSteps] = useState(initialSteps);
  const [requiredPoField, setRequiredPoField] = useState(true);

  const activeModuleCount = useMemo(() => modules.filter((module) => module.enabled).length, [modules]);

  function moveStep(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= steps.length) return;
    const next = [...steps];
    [next[index], next[target]] = [next[target], next[index]];
    setSteps(next);
  }

  return (
    <AppShell title="Settings and Customization" subtitle="Client-specific modules, fields, workflows, approvals, print layouts, reports, and numbering">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-md border border-ink/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-graphite">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Settings2 size={19} className="text-signal" />
                Module Configuration
              </h2>
              <p className="mt-1 text-sm text-steel dark:text-white/60">{activeModuleCount} modules enabled</p>
            </div>
            <button
              type="button"
              title="Add module"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-ink/10 text-signal hover:border-signal dark:border-white/10"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="mt-5 grid gap-2">
            {modules.map((module, index) => (
              <button
                key={module.name}
                type="button"
                onClick={() =>
                  setModules((current) =>
                    current.map((item, itemIndex) => (itemIndex === index ? { ...item, enabled: !item.enabled } : item))
                  )
                }
                className="flex items-center justify-between rounded-md border border-ink/10 px-3 py-3 text-left transition hover:border-signal dark:border-white/10"
              >
                <span className="text-sm font-medium">{module.name}</span>
                {module.enabled ? <ToggleRight className="text-signal" size={24} /> : <ToggleLeft className="text-steel" size={24} />}
              </button>
            ))}
          </div>
        </section>

        <section id="workflow" className="rounded-md border border-ink/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-graphite">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Workflow size={19} className="text-signal" />
                Workflow Designer
              </h2>
              <p className="mt-1 text-sm text-steel dark:text-white/60">Purchasing flow version 1</p>
            </div>
            <span className="rounded-md bg-signal/12 px-3 py-1 text-sm font-semibold text-signal">Active</span>
          </div>

          <div className="mt-5 space-y-3">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-md border border-ink/10 p-3 dark:border-white/10">
                <GripVertical size={18} className="text-steel" />
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink/5 text-sm font-semibold dark:bg-white/10">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 text-sm font-medium">{step}</span>
                <button
                  type="button"
                  aria-label={`Move ${step} up`}
                  title="Move up"
                  onClick={() => moveStep(index, -1)}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 hover:border-signal dark:border-white/10"
                >
                  <ArrowUp size={15} />
                </button>
                <button
                  type="button"
                  aria-label={`Move ${step} down`}
                  title="Move down"
                  onClick={() => moveStep(index, 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 hover:border-signal dark:border-white/10"
                >
                  <ArrowDown size={15} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="rounded-md border border-ink/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-graphite">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <ClipboardList size={19} className="text-brass" />
            Custom Field Engine
          </h2>
          <div className="mt-5 space-y-3">
            <div className="rounded-md border border-ink/10 p-3 dark:border-white/10">
              <p className="text-sm font-medium">Purchase Order: Machine Line</p>
              <p className="mt-1 text-sm text-steel dark:text-white/60">Select: Line A, Line B, Line C</p>
            </div>
            <button
              type="button"
              onClick={() => setRequiredPoField((value) => !value)}
              className="flex w-full items-center justify-between rounded-md border border-ink/10 px-3 py-3 text-sm font-medium dark:border-white/10"
            >
              Required field
              {requiredPoField ? <Check className="text-signal" size={18} /> : <span className="h-4 w-4 rounded border border-ink/25" />}
            </button>
          </div>
        </section>

        <section id="print" className="rounded-md border border-ink/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-graphite">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <LayoutTemplate size={19} className="text-signal" />
            Print Layout Designer
          </h2>
          <div className="manufacturing-grid relative mt-5 aspect-[0.72] rounded-md border border-ink/10 bg-paper p-3 dark:border-white/10 dark:bg-ink">
            {layoutSections.map((section) => (
              <div
                key={section.key}
                className="absolute rounded-md border border-signal/40 bg-white px-2 py-1 text-xs font-semibold text-ink shadow-sm dark:bg-graphite dark:text-paper"
                style={{ left: `${section.x / 6}%`, top: `${section.y / 9}%` }}
              >
                {section.label}
              </div>
            ))}
          </div>
        </section>

        <section id="reports" className="rounded-md border border-ink/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-graphite">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <FileSpreadsheet size={19} className="text-brass" />
            Report Builder
          </h2>
          <div className="mt-5 space-y-3">
            {[
              ['Base table', 'transaction_documents'],
              ['Fields', 'Document no, status, amount'],
              ['Filters', 'Date range, document type'],
              ['Summary', 'Grouped totals by status'],
              ['Exports', 'Excel, PDF']
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-ink/10 p-3 dark:border-white/10">
                <p className="text-xs uppercase text-steel dark:text-white/60">{label}</p>
                <p className="mt-1 text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-md border border-ink/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-graphite">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Columns3 size={19} className="text-signal" />
          Approval and Numbering Rules
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            ['PO Amount Approval', 'Level 1 Manager, Level 2 Finance'],
            ['Document Numbering', 'PO-YYYY-00001 with yearly reset'],
            ['Transaction Statuses', 'Draft, Pending Approval, Approved, Closed']
          ].map(([title, body]) => (
            <div key={title} className="rounded-md border border-ink/10 p-4 dark:border-white/10">
              <p className="font-medium">{title}</p>
              <p className="mt-2 text-sm text-steel dark:text-white/60">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
