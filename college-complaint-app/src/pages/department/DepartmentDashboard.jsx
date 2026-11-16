import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Wrench, CheckCircle, Clock } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { Link } from 'react-router-dom';

export default function DepartmentDashboard() {
  const { complaints } = useAuth();

  const assigned = complaints.filter(c => c.department === 'Electrical & Maintenance' || c.status === 'In Progress');

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold">Electrical & Maintenance Department</h2>
        <p className="text-slate-300 text-xs mt-1">Staff Tasks & Work Orders Portal</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-500 font-semibold block">TOTAL ASSIGNED</span>
          <span className="text-2xl font-bold text-gray-900">{assigned.length}</span>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <span className="text-xs text-blue-800 font-semibold block">IN PROGRESS</span>
          <span className="text-2xl font-bold text-blue-700">{assigned.filter(c => c.status === 'In Progress').length}</span>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
          <span className="text-xs text-emerald-800 font-semibold block">RESOLVED</span>
          <span className="text-2xl font-bold text-emerald-700">{assigned.filter(c => c.status === 'Resolved').length}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-sm text-gray-800">Department Work Orders</h3>
          <Link to="/department/assigned-complaints" className="text-xs text-blue-600 font-semibold">View All →</Link>
        </div>

        <div className="space-y-3">
          {assigned.slice(0, 3).map(c => (
            <div key={c.id} className="p-4 border rounded-xl flex justify-between items-center hover:bg-gray-50">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600">{c.id}</span>
                <h4 className="font-bold text-sm text-gray-800">{c.title}</h4>
                <p className="text-xs text-gray-500">{c.location}</p>
              </div>
              <StatusBadge status={c.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}