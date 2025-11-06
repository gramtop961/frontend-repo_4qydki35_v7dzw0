import React, { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import StatsCards from './components/StatsCards';
import LeadsTable from './components/LeadsTable';

const sampleLeads = [
  {
    id: 'l1',
    name: 'Ava Thompson',
    company: 'Northwind Co.',
    email: 'ava.thompson@example.com',
    phone: '+1 (555) 201-3389',
    status: 'New',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: 'l2',
    name: 'Michael Carter',
    company: 'Globex Inc',
    email: 'm.carter@globex.com',
    phone: '+1 (555) 901-2211',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
  },
  {
    id: 'l3',
    name: 'Sophia Lee',
    company: 'Innotech',
    email: 'sophia.lee@innotech.ai',
    phone: '+1 (555) 444-1900',
    status: 'Qualified',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
  },
  {
    id: 'l4',
    name: 'Noah Patel',
    company: 'Acme Corp',
    email: 'noah.patel@acme.com',
    phone: '+1 (555) 888-7720',
    status: 'Converted',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(),
  },
];

export default function App() {
  const [leads, setLeads] = useState(sampleLeads);
  const [addSignal, setAddSignal] = useState(0);

  const recent = useMemo(
    () => [...leads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
    [leads]
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Topbar onAdd={() => setAddSignal((s) => s + 1)} />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            <StatsCards leads={leads} />

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800">Recent Leads</h2>
                <span className="text-sm text-slate-500">{recent.length} shown</span>
              </div>
              <LeadsTable leads={leads} setLeads={setLeads} addSignal={addSignal} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
