import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { complaints } = useAuth();

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'Pending').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
    rejected: complaints.filter(c => c.status === 'Rejected').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Admin Executive Overview</h2>
        <span className="text-xs text-gray-500">Live Campus Complaints System</span>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-xs text-gray-500 font-semibold block">TOTAL</span>
          <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
        </div>
        <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200">
          <span className="text-xs text-amber-800 font-semibold block">PENDING</span>
          <span className="text-2xl font-bold text-amber-700">{stats.pending}</span>
        </div>
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200">
          <span className="text-xs text-blue-800 font-semibold block">IN PROGRESS</span>
          <span className="text-2xl font-bold text-blue-700">{stats.inProgress}</span>
        </div>
        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200">
          <span className="text-xs text-emerald-800 font-semibold block">RESOLVED</span>
          <span className="text-2xl font-bold text-emerald-700">{stats.resolved}</span>
        </div>
        <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200 col-span-2 md:col-span-1">
          <span className="text-xs text-rose-800 font-semibold block">REJECTED</span>
          <span className="text-2xl font-bold text-rose-700">{stats.rejected}</span>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-sm text-gray-800">Recent Campus Complaints</h3>
          <Link to="/admin/all-complaints" className="text-xs text-blue-600 font-semibold hover:underline">
            View All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Student</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {complaints.slice(0, 5).map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50">
                  <td className="p-3 font-mono font-bold text-blue-600">{c.id}</td>
                  <td className="p-3 font-medium text-gray-800 max-w-xs truncate">{c.title}</td>
                  <td className="p-3 text-gray-600">{c.category}</td>
                  <td className="p-3 text-gray-600">{c.studentName}</td>
                  <td className="p-3 font-bold">{c.priority}</td>
                  <td className="p-3"><StatusBadge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}