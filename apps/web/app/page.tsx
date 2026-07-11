import Link from 'next/link';
import { ArrowRight, BarChart3, Factory, ShieldCheck, Workflow } from 'lucide-react';

const kpis = [
  { label: 'Open work orders', value: '42' },
  { label: 'Pending approvals', value: '18' },
  { label: 'QC rejection', value: '2.8%' },
  { label: 'Inventory value', value: '$1.9M' }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-ink text-white">
      <section
        className="relative flex min-h-[92vh] items-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/manufacturing-hero.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/82 to-ink/20" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/8 px-3 py-2 text-sm text-white/80 backdrop-blur">
              <Factory size={16} />
              Manufacturing ERP platform
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-normal sm:text-6xl lg:text-7xl">
              FlowCraft ERP
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
              A customizable operating system for manufacturing teams: finance, purchase, sales, warehouse, MRP,
              production, quality, costing, maintenance, approvals, reports, and print layouts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#008f66]"
              >
                Open dashboard
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/customization"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Configure ERP
                <Workflow size={17} />
              </Link>
            </div>
          </div>

          <div className="hidden items-end justify-end lg:flex">
            <div className="grid w-full max-w-md grid-cols-2 gap-3">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="rounded-md border border-white/12 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase text-white/60">{kpi.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{kpi.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-10 px-5 pb-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 rounded-md border border-white/10 bg-paper p-4 text-ink shadow-soft dark:bg-graphite dark:text-paper md:grid-cols-3">
          {[
            { title: 'Config-first process control', icon: Workflow },
            { title: 'Role-secured operations', icon: ShieldCheck },
            { title: 'Management-ready analytics', icon: BarChart3 }
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3 rounded-md border border-ink/10 p-4 dark:border-white/10">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-signal/12 text-signal">
                <item.icon size={20} />
              </span>
              <span className="font-medium">{item.title}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
