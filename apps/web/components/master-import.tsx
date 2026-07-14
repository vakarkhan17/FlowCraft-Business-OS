'use client';

import { FormEvent, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { AppShell } from './app-shell';

type Job = { id: string; fileName: string; fileFormat: string; status: string; totalRows: number; validRows: number; invalidRows: number; duplicateRows: number };

export function MasterImport() {
  const [jobs,setJobs]=useState<Job[]>([]); const [resource,setResource]=useState('items'); const [rows,setRows]=useState('[{"itemCode":"DEMO-001"}]'); const [error,setError]=useState(''); const [saving,setSaving]=useState(false);
  const token=typeof window==='undefined'?'':localStorage.getItem('flowcraft_token')??'';
  async function load(){if(token)setJobs(await apiFetch<Job[]>('/api/v1/master-data/imports',token));}
  useEffect(()=>{void load();},[token]);
  async function submit(event:FormEvent){event.preventDefault();setSaving(true);setError('');try{const parsed=JSON.parse(rows) as Record<string,unknown>[];await apiFetch('/api/v1/master-data/imports',token,{method:'POST',body:JSON.stringify({resource,fileName:`${resource}-dry-run.json`,fileFormat:'CSV',validationOnly:true,dryRun:true,rows:parsed.map((data)=>({data}))})});await load();}catch(reason){setError(reason instanceof Error?reason.message:'Import validation failed');}finally{setSaving(false);}}
  return <AppShell title="Master Data Import" subtitle="Validation-only and dry-run import foundation with duplicate checks and row-level errors."><form onSubmit={submit} className="rounded-md border bg-white p-5 dark:bg-graphite"><div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-medium">Resource<select value={resource} onChange={(event)=>setResource(event.target.value)} className="mt-2 w-full rounded border p-2.5 dark:bg-ink"><option>items</option><option>business-partners</option><option>warehouses</option><option>uom</option><option>countries</option></select></label><label className="text-sm font-medium">Rows (JSON array)<textarea value={rows} onChange={(event)=>setRows(event.target.value)} rows={5} className="mt-2 w-full rounded border p-2.5 font-mono text-xs dark:bg-ink"/></label></div>{error?<div role="alert" className="mt-3 text-sm text-red-700">{error}</div>:null}<button disabled={saving} className="mt-4 rounded bg-signal px-4 py-2 font-semibold text-white">{saving?'Validating…':'Run validation-only import'}</button></form><section className="mt-5 rounded-md border bg-white p-5 dark:bg-graphite"><h2 className="font-semibold">Recent import jobs</h2><div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr><th className="p-2">File</th><th>Status</th><th>Total</th><th>Valid</th><th>Invalid</th><th>Duplicates</th></tr></thead><tbody>{jobs.map((job)=><tr key={job.id} className="border-t"><td className="p-2">{job.fileName}</td><td>{job.status}</td><td>{job.totalRows}</td><td>{job.validRows}</td><td>{job.invalidRows}</td><td>{job.duplicateRows}</td></tr>)}</tbody></table></div></section></AppShell>;
}
