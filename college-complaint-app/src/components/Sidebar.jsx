import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  PlusSquare, 
  ListFilter, 
  UserCheck, 
  BarChart3, 
  Settings, 
  CheckCircle2, 
  FileText
} from 'lucide-react';

export default function Sidebar() {
  const { user } = useAuth();

  const studentLinks = [
    { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/student/submit-complaint", label: "Submit Complaint", icon: PlusSquare },
    { to: "/student/my-complaints", label: "My Complaints", icon: ListFilter },
    { to: "/student/profile", label: "My Profile", icon: UserCheck },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/all-complaints", label: "All Complaints", icon: FileText },
    { to: "/admin/management", label: "Manage Complaints", icon: Settings },
    { to: "/admin/statistics", label: "Analytics & Stats", icon: BarChart3 },
  ];

  const departmentLinks = [
    { to: "/department/dashboard", label: "Dept Dashboard", icon: LayoutDashboard },
    { to: "/department/assigned-complaints", label: "Assigned Complaints", icon: CheckCircle2 },
  ];

  const links = user?.role === 'admin' 
    ? adminLinks 
    : user?.role === 'department' 
    ? departmentLinks 
    : studentLinks;

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-57px)] p-4 hidden md:block">
      <div className="mb-6 px-3 py-2 bg-slate-800/60 rounded-lg border border-slate-700/50">
        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">Active Portal</span>
        <span className="text-sm font-bold text-white capitalize">{user?.role} Workspace</span>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}