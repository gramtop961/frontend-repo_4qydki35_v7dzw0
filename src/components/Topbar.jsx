import React from 'react';
import { Search, Plus } from 'lucide-react';

export default function Topbar({ onAdd }) {
  return (
    <div className="w-full bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500">Lightweight CRM for tracking business leads</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md border border-slate-200 bg-white shadow-sm">
            <Search size={16} className="text-slate-400" />
            <input
              placeholder="Search..."
              className="outline-none text-sm text-slate-700 placeholder:text-slate-400"
              onChange={() => {}}
            />
          </div>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium shadow-sm"
          >
            <Plus size={16} />
            Add Lead
          </button>
        </div>
      </div>
    </div>
  );
}
