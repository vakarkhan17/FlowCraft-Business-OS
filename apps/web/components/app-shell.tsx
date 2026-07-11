import Link from 'next/link';
import { BarChart3, Boxes, Factory, FileText, LayoutTemplate, Settings, ShieldCheck, Workflow } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/customization', label: 'Customization', icon: Settings },
  { href: '/customization#workflow', label: 'Workflows', icon: Workflow },
  { href: '/customization#print', label: 'Print Layouts', icon: LayoutTemplate },
  { href: '/customization#reports', label: 'Reports', icon: FileText },
  { href: '/dashboard#inventory', label: 'Inventory', icon: Boxes },
  { href: '/dashboard#approvals', label: 'Approvals', icon: ShieldCheck }
];

export function AppShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-paper">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-ink/10 bg-white/90 px-4 py-5 dark:border-white/10 dark:bg-graphite/80 lg:block">
        <Link href="/" className="flex items-center gap-3 rounded-md px-2 py-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-signal text-white">
            <Factory size={22} />
          </span>
          <span>
            <span className="block text-sm font-semibold">FlowCraft ERP</span>
            <span className="block text-xs text-steel dark:text-white/60">Manufacturing OS</span>
          </span>
        </Link>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-steel transition hover:bg-ink/5 hover:text-ink dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <item.icon size={17} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-ink/10 bg-paper/90 px-5 py-4 backdrop-blur dark:border-white/10 dark:bg-ink/90 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold tracking-normal lg:text-2xl">{title}</h1>
              <p className="mt-1 text-sm text-steel dark:text-white/60">{subtitle}</p>
            </div>
            <ThemeToggle />
          </div>
        </header>
        <div className="px-5 py-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
