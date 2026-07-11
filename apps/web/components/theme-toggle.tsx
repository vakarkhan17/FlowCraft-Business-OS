'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={() => setDark((value) => !value)}
      className="flex h-10 w-10 items-center justify-center rounded-md border border-ink/10 bg-white text-ink shadow-sm transition hover:border-signal dark:border-white/10 dark:bg-graphite dark:text-paper"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
