'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Factory, LockKeyhole } from 'lucide-react';
import { API_URL } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@flowcraft.local');
  const [password, setPassword] = useState('FlowCraft123!');
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');

    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      setError('Invalid email or password');
      return;
    }

    const data = await response.json();
    localStorage.setItem('flowcraft_token', data.accessToken);
    router.push('/dashboard');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-5 text-ink dark:bg-ink dark:text-paper">
      <form onSubmit={submit} className="w-full max-w-sm rounded-md border border-ink/10 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-graphite">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-signal text-white">
            <Factory size={23} />
          </span>
          <div>
            <h1 className="text-xl font-semibold">FlowCraft ERP</h1>
            <p className="text-sm text-steel dark:text-white/60">Secure workspace login</p>
          </div>
        </div>

        <label className="mt-7 block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-md border border-ink/15 px-3 py-3 outline-none transition focus:border-signal dark:border-white/15 dark:bg-ink"
        />

        <label className="mt-4 block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-md border border-ink/15 px-3 py-3 outline-none transition focus:border-signal dark:border-white/15 dark:bg-ink"
        />

        {error ? <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-signal px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#008f66]"
        >
          <LockKeyhole size={17} />
          Sign in
        </button>
      </form>
    </main>
  );
}
