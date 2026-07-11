import { LucideIcon } from 'lucide-react';

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = 'signal'
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: 'signal' | 'brass' | 'ink';
}) {
  const toneClass = {
    signal: 'bg-signal/12 text-signal',
    brass: 'bg-brass/15 text-[#8a5d12]',
    ink: 'bg-ink/10 text-ink dark:bg-white/10 dark:text-paper'
  }[tone];

  return (
    <div className="rounded-md border border-ink/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-graphite">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase text-steel dark:text-white/60">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-normal">{value}</p>
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-md ${toneClass}`}>
          <Icon size={20} />
        </span>
      </div>
    </div>
  );
}
