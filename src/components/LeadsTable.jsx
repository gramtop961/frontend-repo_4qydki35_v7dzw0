import React, { useMemo, useState } from 'react';
import { Edit, Trash2, Filter, ChevronDown, Mail, Phone, Building2, User2, Search, X } from 'lucide-react';

const STATUSES = ['New', 'Contacted', 'Qualified', 'Converted'];

const Badge = ({ status }) => {
  const styles = {
    New: 'bg-sky-100 text-sky-700 border-sky-200',
    Contacted: 'bg-amber-100 text-amber-700 border-amber-200',
    Qualified: 'bg-violet-100 text-violet-700 border-violet-200',
    Converted: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };
  return (
    <span className={`px-2 py-1 text-xs rounded-full border ${styles[status]}`}>{status}</span>
  );
};

function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg border border-slate-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h3 className="text-base font-semibold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default function LeadsTable({ leads, setLeads, onAddClick }) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', status: 'New' });
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return leads
      .filter((l) => (statusFilter === 'All' ? true : l.status === statusFilter))
      .filter((l) =>
        [l.name, l.company, l.email, l.phone].some((v) => v.toLowerCase().includes(query.toLowerCase()))
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [leads, statusFilter, query]);

  const resetForm = () => setForm({ name: '', company: '', email: '', phone: '', status: 'New' });

  const startAdd = () => {
    setEditing(null);
    resetForm();
    setOpen(true);
    onAddClick?.();
  };

  const startEdit = (lead) => {
    setEditing(lead.id);
    setForm({ name: lead.name, company: lead.company, email: lead.email, phone: lead.phone, status: lead.status });
    setOpen(true);
  };

  const saveLead = (e) => {
    e.preventDefault();
    if (editing) {
      setLeads((prev) => prev.map((l) => (l.id === editing ? { ...l, ...form } : l)));
    } else {
      const id = Math.random().toString(36).slice(2);
      setLeads((prev) => [{ id, ...form, createdAt: new Date().toISOString() }, ...prev]);
    }
    setOpen(false);
  };

  const deleteLead = (id) => {
    if (confirm('Delete this lead?')) setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-3 flex flex-col md:flex-row md:items-center gap-3 justify-between border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-slate-200 bg-white shadow-sm w-64">
            <Search size={16} className="text-slate-400" />
            <input
              placeholder="Search leads..."
              className="outline-none text-sm text-slate-700 placeholder:text-slate-400 w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="text-sm px-3 py-2 rounded-md border border-slate-200 bg-white shadow-sm pr-8 appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-2 top-2.5 text-slate-400 pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={startAdd} className="text-sm px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
            Add Lead
          </button>
          <button className="text-sm px-3 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50 shadow-sm flex items-center gap-2">
            <Filter size={16} />
            Advanced
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-600">
              <th className="text-left font-medium px-4 py-3">Lead</th>
              <th className="text-left font-medium px-4 py-3">Company</th>
              <th className="text-left font-medium px-4 py-3">Contact</th>
              <th className="text-left font-medium px-4 py-3">Status</th>
              <th className="text-right font-medium px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center">
                      <User2 size={16} className="text-slate-500" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">{lead.name}</div>
                      <div className="text-slate-500 text-xs">Added {new Date(lead.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Building2 size={16} className="text-slate-400" />
                    {lead.company}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col text-slate-700 gap-1">
                    <div className="flex items-center gap-2"><Mail size={16} className="text-slate-400" />{lead.email}</div>
                    <div className="flex items-center gap-2"><Phone size={16} className="text-slate-400" />{lead.phone}</div>
                  </div>
                </td>
                <td className="px-4 py-3"><Badge status={lead.status} /></td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => startEdit(lead)} className="px-2 py-1 rounded-md border border-slate-200 hover:bg-slate-100">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => deleteLead(lead.id)} className="px-2 py-1 rounded-md border border-slate-200 hover:bg-rose-50 text-rose-600 border-rose-200">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-500">No leads found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Lead' : 'Add Lead'}>
        <form className="space-y-3" onSubmit={saveLead}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500">Name</label>
              <input
                required
                className="mt-1 w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-slate-500">Company</label>
              <input
                className="mt-1 w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-slate-500">Email</label>
              <input
                type="email"
                required
                className="mt-1 w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-slate-500">Phone</label>
              <input
                className="mt-1 w-full px-3 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs text-slate-500">Status</label>
              <select
                className="mt-1 w-full px-3 py-2 rounded-md border border-slate-200 bg-white"
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50">Cancel</button>
            <button type="submit" className="px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white">
              {editing ? 'Save Changes' : 'Create Lead'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
