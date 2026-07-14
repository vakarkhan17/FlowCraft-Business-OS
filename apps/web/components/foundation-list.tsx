'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Archive, Eye, Pencil, Plus, RefreshCw, Search, X } from 'lucide-react';
import { AppShell } from './app-shell';
import { apiFetch } from '@/lib/api';

type RecordValue = string | number | boolean | null | undefined;
type DataRecord = Record<string, RecordValue>;

interface Column { key: string; label: string }
interface FormField { key: string; label: string; required?: boolean; type?: 'text' | 'number' | 'date' }
interface PageResult { data: DataRecord[]; meta?: { page: number; pageSize: number; total: number } }

export function FoundationList({ title, subtitle, endpoint, objectCode, columns, fields, archiveEnabled = true, wrapData = false }: {
  title: string; subtitle: string; endpoint: string; objectCode: string; columns: Column[]; fields: FormField[]; archiveEnabled?: boolean; wrapData?: boolean;
}) {
  const [rows, setRows] = useState<DataRecord[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});

  const token = typeof window === 'undefined' ? '' : localStorage.getItem('flowcraft_token') ?? '';
  const user = useMemo(() => {
    if (typeof window === 'undefined') return { permissions: [] as string[], roles: [] as string[] };
    try { return JSON.parse(localStorage.getItem('flowcraft_user') ?? '{}') as { permissions?: string[]; roles?: string[] }; }
    catch { return { permissions: [], roles: [] }; }
  }, []);
  const can = (action: string) => user.roles?.includes('SUPER_ADMIN') || user.permissions?.includes(`${objectCode}.${action}`);

  const load = useCallback(async () => {
    if (!token) { setError('Please sign in to load this screen.'); setLoading(false); return; }
    setLoading(true); setError('');
    try {
      const separator = endpoint.includes('?') ? '&' : '?';
      const result = await apiFetch<PageResult | DataRecord[]>(`${endpoint}${separator}search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}&page=${page}&pageSize=20`, token);
      const data = Array.isArray(result) ? result : result.data;
      setRows(data); setTotal(Array.isArray(result) ? data.length : result.meta?.total ?? data.length);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to load records'); }
    finally { setLoading(false); }
  }, [endpoint, page, search, status, token]);

  useEffect(() => { void load(); }, [load]);

  async function create(event: FormEvent) {
    event.preventDefault(); setSaving(true); setError('');
    try {
      const body = Object.fromEntries(fields.map((field) => [field.key, field.type === 'number' ? Number(form[field.key]) : form[field.key]]));
      await apiFetch(endpoint, token, { method: 'POST', body: JSON.stringify(wrapData ? { data: body } : body) });
      setForm({}); setShowForm(false); await load();
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Save failed'); }
    finally { setSaving(false); }
  }

  async function edit(row: DataRecord) {
    const editable = fields.find((field) => row[field.key] !== undefined);
    if (!editable) return;
    const next = window.prompt(`Update ${editable.label}`, String(row[editable.key] ?? ''));
    if (next === null) return;
    const body = { [editable.key]: editable.type === 'number' ? Number(next) : next };
    await apiFetch(`${endpoint}/${row.id}`, token, { method: 'PATCH', body: JSON.stringify(wrapData ? { data: body } : body) });
    await load();
  }

  async function archive(row: DataRecord) {
    if (!window.confirm('Archive this record? Historical data will be retained.')) return;
    await apiFetch(`${endpoint}/${row.id}/archive`, token, { method: 'POST', body: JSON.stringify({ reason: 'Archived from foundation settings' }) });
    await load();
  }

  return <AppShell title={title} subtitle={subtitle}>
    <section className="rounded-md border border-ink/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-graphite">
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative min-w-56 flex-1"><Search className="absolute left-3 top-3 text-steel" size={17} /><input aria-label="Search" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search records" className="w-full rounded-md border border-ink/15 py-2.5 pl-10 pr-3 dark:border-white/15 dark:bg-ink" /></label>
        <select aria-label="Status filter" value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="rounded-md border border-ink/15 px-3 py-2.5 dark:border-white/15 dark:bg-ink"><option value="">All statuses</option><option value="ACTIVE">Active</option><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option><option value="ARCHIVED">Archived</option></select>
        <button onClick={() => void load()} title="Refresh" className="rounded-md border border-ink/15 p-2.5"><RefreshCw size={17} /></button>
        {can('CREATE') ? <button onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded-md bg-signal px-4 py-2.5 text-sm font-semibold text-white"><Plus size={17} />Create</button> : null}
      </div>
      {error ? <div role="alert" className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
      {loading ? <div className="mt-6 animate-pulse rounded-md bg-ink/5 p-8 text-center text-sm text-steel">Loading records…</div> : rows.length === 0 ? <div className="mt-6 rounded-md border border-dashed border-ink/20 p-10 text-center text-sm text-steel">No records match the current filters.</div> : <div className="mt-5 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-ink/10">{columns.map((column) => <th key={column.key} className="px-3 py-3 font-semibold">{column.label}</th>)}<th className="px-3 py-3">Actions</th></tr></thead><tbody>{rows.map((row) => <tr key={String(row.id)} className="border-b border-ink/8">{columns.map((column) => <td key={column.key} className="px-3 py-3">{column.key === 'status' ? <span className="rounded-full bg-signal/10 px-2.5 py-1 text-xs font-semibold text-signal">{String(row[column.key] ?? '—')}</span> : String(row[column.key] ?? '—')}</td>)}<td className="flex gap-2 px-3 py-3"><button onClick={() => window.alert(JSON.stringify(row, null, 2))} title="View"><Eye size={16} /></button>{can('EDIT') ? <button onClick={() => void edit(row)} title="Edit"><Pencil size={16} /></button> : null}{archiveEnabled && can('ARCHIVE') ? <button onClick={() => void archive(row)} title="Archive"><Archive size={16} /></button> : null}</td></tr>)}</tbody></table></div>}
      <div className="mt-5 flex items-center justify-between text-sm text-steel"><span>{total} records</span><div className="flex gap-2"><button disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="rounded border px-3 py-1 disabled:opacity-40">Previous</button><span className="px-2 py-1">Page {page}</span><button disabled={page * 20 >= total} onClick={() => setPage((value) => value + 1)} className="rounded border px-3 py-1 disabled:opacity-40">Next</button></div></div>
    </section>
    {showForm ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-5"><form onSubmit={create} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-md bg-white p-6 text-ink shadow-xl"><div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Create {title.replace(/s$/, '')}</h2><button type="button" onClick={() => setShowForm(false)} title="Close"><X size={20} /></button></div><div className="mt-5 grid gap-4 sm:grid-cols-2">{fields.map((field) => <label key={field.key} className="text-sm font-medium">{field.label}{field.required ? ' *' : ''}<input required={field.required} type={field.type ?? 'text'} value={form[field.key] ?? ''} onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))} className="mt-2 w-full rounded-md border border-ink/15 px-3 py-2.5" /></label>)}</div><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setShowForm(false)} className="rounded-md border px-4 py-2">Cancel</button><button disabled={saving} className="rounded-md bg-signal px-4 py-2 font-semibold text-white disabled:opacity-50">{saving ? 'Saving…' : 'Save'}</button></div></form></div> : null}
  </AppShell>;
}
