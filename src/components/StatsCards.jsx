import React, { useMemo } from 'react';

function StatCard({ title, value, accent }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-1 text-2xl font-semibold text-slate-800">{value}</div>
      <div className={`mt-3 h-1.5 rounded-full ${accent}`}></div>
    </div>
  );
}

function MiniBarChart({ data }) {
  const max = useMemo(() => Math.max(1, ...data.map((d) => d.value)), [data]);
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm text-slate-500">Leads by Status</div>
          <div className="text-sm text-slate-400">Last 30 days</div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3 items-end h-28">
        {data.map((d) => (
          <div key={d.label} className="flex flex-col items-center gap-1">
            <div
              className={`w-full rounded-md ${d.color}`}
              style={{ height: `${(d.value / max) * 100}%` }}
              title={`${d.label}: ${d.value}`}
            />
            <div className="text-[11px] text-slate-500">{d.label.slice(0, 3)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StatsCards({ leads }) {
  const total = leads.length;
  const converted = leads.filter((l) => l.status === 'Converted').length;
  const rate = total ? Math.round((converted / total) * 100) : 0;

  const byStatus = ['New', 'Contacted', 'Qualified', 'Converted', 'Closed'].map((s) => ({
    label: s,
    value: leads.filter((l) => l.status === s).length,
    color:
      s === 'New'
        ? 'bg-sky-500'
        : s === 'Contacted'
        ? 'bg-amber-500'
        : s === 'Qualified'
        ? 'bg-violet-500'
        : s === 'Converted'
        ? 'bg-emerald-500'
        : 'bg-slate-400',
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Total Leads" value={total} accent="bg-blue-600" />
      <StatCard title="Converted" value={converted} accent="bg-emerald-500" />
      <StatCard title="Conversion Rate" value={`${rate}%`} accent="bg-violet-500" />
      <div className="md:col-span-3">
        <MiniBarChart data={byStatus} />
      </div>
    </div>
  );
}
