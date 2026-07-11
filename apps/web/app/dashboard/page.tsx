import {
  AlertTriangle,
  BadgeDollarSign,
  Banknote,
  Boxes,
  CircleDollarSign,
  ClipboardCheck,
  Factory,
  Gauge,
  HandCoins,
  LineChart,
  ReceiptText,
  Wrench
} from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { StatCard } from '@/components/stat-card';

const kpis = [
  { label: 'Total sales', value: '$62,500', icon: CircleDollarSign, tone: 'signal' as const },
  { label: 'Total purchases', value: '$12,500', icon: ReceiptText, tone: 'brass' as const },
  { label: 'Gross profit', value: '$50,000', icon: LineChart, tone: 'signal' as const },
  { label: 'Net profit', value: '$50,000', icon: BadgeDollarSign, tone: 'signal' as const },
  { label: 'Receivables', value: '$62,500', icon: HandCoins, tone: 'ink' as const },
  { label: 'Payables', value: '$0', icon: Banknote, tone: 'ink' as const },
  { label: 'Inventory value', value: '$47,300', icon: Boxes, tone: 'brass' as const },
  { label: 'Pending approvals', value: '18', icon: ClipboardCheck, tone: 'ink' as const }
];

const workOrders = [
  { no: 'WO-2026-0042', item: 'Precision Valve Assembly', status: 'In progress', progress: 68 },
  { no: 'WO-2026-0043', item: 'Pump Housing CNC Run', status: 'Material issued', progress: 42 },
  { no: 'WO-2026-0044', item: 'Hydraulic Coupling Batch', status: 'QC hold', progress: 81 }
];

const departments = [
  { name: 'Production', value: 92 },
  { name: 'Quality', value: 88 },
  { name: 'Maintenance', value: 81 },
  { name: 'Warehouse', value: 86 }
];

export default function DashboardPage() {
  return (
    <AppShell title="Management Dashboard" subtitle="Manufacturing performance, finance, operations, and approvals in one view">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <StatCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-md border border-ink/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-graphite">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Production Status</h2>
              <p className="mt-1 text-sm text-steel dark:text-white/60">Open work orders and shop-floor progress</p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-signal/12 text-signal">
              <Factory size={20} />
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {workOrders.map((order) => (
              <div key={order.no} className="rounded-md border border-ink/10 p-4 dark:border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{order.no}</p>
                    <p className="text-sm text-steel dark:text-white/60">{order.item}</p>
                  </div>
                  <span className="rounded-md bg-brass/15 px-3 py-1 text-xs font-semibold text-[#8a5d12]">{order.status}</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-ink/8 dark:bg-white/10">
                  <div className="h-2 rounded-full bg-signal" style={{ width: `${order.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="approvals" className="rounded-md border border-ink/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-graphite">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Approval Inbox</h2>
              <p className="mt-1 text-sm text-steel dark:text-white/60">Amount and department-based approval queue</p>
            </div>
            <ClipboardCheck className="text-signal" size={22} />
          </div>
          <div className="mt-5 space-y-3">
            {['PO-2026-00001', 'SO-2026-00018', 'MR-2026-00009'].map((doc, index) => (
              <div key={doc} className="flex items-center justify-between rounded-md border border-ink/10 p-3 dark:border-white/10">
                <div>
                  <p className="font-medium">{doc}</p>
                  <p className="text-sm text-steel dark:text-white/60">{index === 0 ? 'Finance review' : 'Manager review'}</p>
                </div>
                <span className="rounded-md bg-signal/12 px-3 py-1 text-xs font-semibold text-signal">Pending</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section id="inventory" className="rounded-md border border-ink/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-graphite">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle size={19} className="text-brass" />
            Low Stock Items
          </h2>
          <div className="mt-5 space-y-3">
            {['Aluminium 6061 Bar', 'Cutting Inserts', 'Hydraulic Seals'].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-md bg-ink/5 px-3 py-3 dark:bg-white/8">
                <span className="text-sm font-medium">{item}</span>
                <span className="text-sm text-steel dark:text-white/60">{[500, 120, 76][index]} min</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-ink/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-graphite">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Gauge size={19} className="text-signal" />
            Department KPIs
          </h2>
          <div className="mt-5 space-y-4">
            {departments.map((department) => (
              <div key={department.name}>
                <div className="flex justify-between text-sm">
                  <span>{department.name}</span>
                  <span className="font-semibold">{department.value}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-ink/8 dark:bg-white/10">
                  <div className="h-2 rounded-full bg-signal" style={{ width: `${department.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-ink/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-graphite">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Wrench size={19} className="text-brass" />
            Maintenance
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-md bg-ink/5 p-4 dark:bg-white/8">
              <p className="text-xs uppercase text-steel dark:text-white/60">Pending jobs</p>
              <p className="mt-2 text-2xl font-semibold">7</p>
            </div>
            <div className="rounded-md bg-ink/5 p-4 dark:bg-white/8">
              <p className="text-xs uppercase text-steel dark:text-white/60">Downtime</p>
              <p className="mt-2 text-2xl font-semibold">18h</p>
            </div>
            <div className="col-span-2 rounded-md bg-ink/5 p-4 dark:bg-white/8">
              <p className="text-xs uppercase text-steel dark:text-white/60">QC rejection percentage</p>
              <p className="mt-2 text-2xl font-semibold">2.8%</p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
