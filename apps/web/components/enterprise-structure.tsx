'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Archive, ChevronDown, ChevronRight, ChevronsDownUp, ChevronsUpDown, Edit3, FolderTree, Move, Plus, Search } from 'lucide-react';
import { AppShell } from './app-shell';
import { apiFetch } from '@/lib/api';

interface TreeNode { id: string; nodeType: string; nodeCode: string; nodeName: string; status: string; children: TreeNode[] }
interface NodeDetail extends TreeNode { relationshipHistory?: Array<Record<string, unknown>>; overrides?: Array<Record<string, unknown>> }

export function EnterpriseStructure() {
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [selected, setSelected] = useState<NodeDetail | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [nodeType, setNodeType] = useState('');
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().slice(0, 10));
  const [settings, setSettings] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = typeof window === 'undefined' ? '' : localStorage.getItem('flowcraft_token') ?? '';

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setTree(await apiFetch<TreeNode[]>(`/organization/tree?effectiveDate=${effectiveDate}`, token)); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to load organization tree'); }
    finally { setLoading(false); }
  }, [effectiveDate, token]);
  useEffect(() => { void load(); }, [load]);

  const allIds = useMemo(() => {
    const ids: string[] = []; const visit = (nodes: TreeNode[]) => nodes.forEach((node) => { ids.push(node.id); visit(node.children); }); visit(tree); return ids;
  }, [tree]);

  async function select(node: TreeNode) {
    const detail = await apiFetch<NodeDetail>(`/organization/nodes/${node.id}`, token); setSelected(detail);
    setSettings(await apiFetch<Record<string, unknown>>(`/organization/nodes/${node.id}/inherited-settings?effectiveDate=${effectiveDate}`, token));
  }

  async function createChild() {
    if (!selected) return;
    const nodeTypeValue = window.prompt('Child node type (for example DEPARTMENT or TEAM)');
    const referenceId = window.prompt('Typed record UUID'); const nodeCode = window.prompt('Node code'); const nodeName = window.prompt('Node name');
    if (!nodeTypeValue || !referenceId || !nodeCode || !nodeName) return;
    await apiFetch('/organization/nodes', token, { method: 'POST', body: JSON.stringify({ nodeType: nodeTypeValue, referenceId, nodeCode, nodeName, parentNodeId: selected.id, displayOrder: 0 }) }); await load();
  }

  async function editNode() {
    if (!selected) return; const nodeName = window.prompt('Node name', selected.nodeName); if (!nodeName) return;
    await apiFetch(`/organization/nodes/${selected.id}`, token, { method: 'PATCH', body: JSON.stringify({ nodeName }) }); await load();
  }

  async function archiveNode() {
    if (!selected || !window.confirm(`Archive ${selected.nodeName}?`)) return;
    await apiFetch(`/organization/nodes/${selected.id}/archive`, token, { method: 'POST', body: JSON.stringify({ reason: 'Archived from enterprise structure' }) }); setSelected(null); await load();
  }

  async function moveNode() {
    if (!selected) return; const newParentNodeId = window.prompt('New parent node UUID (leave blank for root)'); if (newParentNodeId === null) return;
    const body = { newParentNodeId: newParentNodeId || null, changeReason: 'Moved from enterprise structure screen' };
    const impact = await apiFetch<Record<string, unknown>>(`/organization/nodes/${selected.id}/move/preview`, token, { method: 'POST', body: JSON.stringify(body) });
    if (!window.confirm(`Move impact:\n${JSON.stringify(impact, null, 2)}\n\nConfirm move?`)) return;
    await apiFetch(`/organization/nodes/${selected.id}/move`, token, { method: 'POST', body: JSON.stringify(body) }); await load();
  }

  function render(nodes: TreeNode[], depth = 0): React.ReactNode {
    return nodes.map((node) => {
      const open = expanded.has(node.id); const matches = (!search || `${node.nodeCode} ${node.nodeName}`.toLowerCase().includes(search.toLowerCase())) && (!nodeType || node.nodeType === nodeType);
      return <div key={node.id}>{matches ? <div className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm ${selected?.id === node.id ? 'bg-signal/10 text-signal' : 'hover:bg-ink/5 dark:hover:bg-white/5'}`} style={{ paddingLeft: `${depth * 18 + 8}px` }}><button aria-label={open ? 'Collapse node' : 'Expand node'} onClick={() => setExpanded((current) => { const next = new Set(current); open ? next.delete(node.id) : next.add(node.id); return next; })}>{node.children.length ? open ? <ChevronDown size={16} /> : <ChevronRight size={16} /> : <span className="inline-block w-4" />}</button><button onClick={() => void select(node)} className="min-w-0 flex-1 text-left"><span className="block truncate font-medium">{node.nodeName}</span><span className="text-xs text-steel">{node.nodeType} · {node.nodeCode}</span></button></div> : null}{open ? render(node.children, depth + 1) : null}</div>;
    });
  }

  return <AppShell title="Enterprise Structure" subtitle="Effective-dated organization hierarchy, inheritance, access, and controlled moves">
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-md border border-ink/10 bg-white p-4 dark:border-white/10 dark:bg-graphite">
        <div className="flex flex-wrap gap-2"><label className="relative min-w-48 flex-1"><Search className="absolute left-3 top-2.5" size={16}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search tree" className="w-full rounded border py-2 pl-9 pr-2 dark:bg-ink"/></label><select value={nodeType} onChange={(e)=>setNodeType(e.target.value)} className="rounded border px-2 dark:bg-ink"><option value="">All types</option>{['ENTERPRISE_GROUP','LEGAL_ENTITY','COMPANY','BRANCH','PLANT','BUSINESS_UNIT','DIVISION','DEPARTMENT','SECTION','TEAM','LOCATION','COST_CENTER','PROFIT_CENTER'].map((type)=><option key={type}>{type}</option>)}</select><input aria-label="Effective date" type="date" value={effectiveDate} onChange={(e)=>setEffectiveDate(e.target.value)} className="rounded border px-2 dark:bg-ink"/></div>
        <div className="mt-3 flex gap-2"><button onClick={()=>setExpanded(new Set(allIds))} className="flex items-center gap-1 rounded border px-2 py-1 text-xs"><ChevronsUpDown size={14}/>Expand all</button><button onClick={()=>setExpanded(new Set())} className="flex items-center gap-1 rounded border px-2 py-1 text-xs"><ChevronsDownUp size={14}/>Collapse all</button></div>
        <div className="mt-4 max-h-[65vh] overflow-auto">{loading ? <p className="p-8 text-center text-steel">Loading hierarchy…</p> : error ? <p className="rounded bg-red-50 p-3 text-red-700">{error}</p> : tree.length ? render(tree) : <p className="p-8 text-center text-steel">No organization nodes exist for this date.</p>}</div>
      </section>
      <section className="rounded-md border border-ink/10 bg-white p-5 dark:border-white/10 dark:bg-graphite">{selected ? <><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase text-steel">{selected.nodeType}</p><h2 className="mt-1 text-xl font-semibold">{selected.nodeName}</h2><p className="text-sm text-steel">{selected.nodeCode} · {selected.status}</p></div><FolderTree className="text-signal"/></div><div className="mt-5 flex flex-wrap gap-2"><button onClick={()=>void createChild()} className="flex items-center gap-1 rounded bg-signal px-3 py-2 text-sm text-white"><Plus size={15}/>Create child</button><button onClick={()=>void editNode()} className="flex items-center gap-1 rounded border px-3 py-2 text-sm"><Edit3 size={15}/>Edit</button><button onClick={()=>void moveNode()} className="flex items-center gap-1 rounded border px-3 py-2 text-sm"><Move size={15}/>Preview move</button><button onClick={()=>void archiveNode()} className="flex items-center gap-1 rounded border px-3 py-2 text-sm text-red-700"><Archive size={15}/>Archive</button></div><div className="mt-6 grid gap-4 lg:grid-cols-2"><div className="rounded border p-4"><h3 className="font-semibold">Inherited settings</h3><pre className="mt-3 overflow-auto text-xs text-steel">{JSON.stringify(settings, null, 2)}</pre></div><div className="rounded border p-4"><h3 className="font-semibold">Relationship history</h3><pre className="mt-3 overflow-auto text-xs text-steel">{JSON.stringify(selected.relationshipHistory ?? [], null, 2)}</pre></div></div></> : <div className="flex min-h-80 flex-col items-center justify-center text-center text-steel"><FolderTree size={36}/><p className="mt-3">Select a node to inspect settings, history, and available actions.</p></div>}</section>
    </div>
  </AppShell>;
}
