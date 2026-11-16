import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import UpdateComplaintModal from './UpdateComplaintModal';

export default function AssignedComplaints() {
  const { complaints } = useAuth();
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const assigned = complaints.filter(c => c.department === 'Electrical & Maintenance' || c.status === 'In Progress');

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Assigned Department Complaints</h2>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Title</th>
                <th className="p-3">Location</th>
                <th className="p-3">Est. Resolution</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assigned.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-blue-600">{c.id}</td>
                  <td className="p-3 font-medium text-gray-800">{c.title}</td>
                  <td className="p-3 text-gray-600">{c.location}</td>
                  <td className="p-3 text-gray-600">{c.estimatedResolution || 'Not set'}</td>
                  <td className="p-3"><StatusBadge status={c.status} /></td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedComplaint(c)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs"
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedComplaint && (
        <UpdateComplaintModal 
          complaint={selectedComplaint} 
          onClose={() => setSelectedComplaint(null)} 
        />
      )}
    </div>
  );
}