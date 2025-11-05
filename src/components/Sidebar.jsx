import React from 'react';
import { Home, Users, BarChart3, Settings, LogOut } from 'lucide-react';

const NavItem = ({ icon: Icon, label, active }) => (
  <button className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors w-full text-left ${
    active ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
  }`}>
    <Icon size={18} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-slate-900 text-white h-screen sticky top-0 border-r border-slate-800">
      <div className="px-4 py-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center font-bold">L</div>
          <div className="text-lg font-semibold">LeadSphere</div>
        </div>
      </div>
      <nav className="p-3 flex-1 space-y-1">
        <NavItem icon={Home} label="Dashboard" active />
        <NavItem icon={Users} label="Leads" />
        <NavItem icon={BarChart3} label="Analytics" />
        <NavItem icon={Settings} label="Settings" />
      </nav>
      <div className="p-3 border-t border-slate-800">
        <button className="flex items-center gap-3 px-3 py-2 rounded-md w-full text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
