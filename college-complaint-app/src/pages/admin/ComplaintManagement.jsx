import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';

export default function ComplaintManagement() {
  const { complaints, updateComplaintStatus } = useAuth();
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [status, setStatus] = useState('In Progress');
  const [department, setDepartment] = useState('Electrical & Maintenance');
  const [remarks, setRemarks] = useState('');

  const handleOpenModal = (c) => {
    setSelectedComplaint(c);
    setStatus(c.status);
    setDepartment(c.department || 'Electrical & Maintenance');
    setRemarks(c.adminRemarks || '');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (selectedComplaint) {
      updateComplaintStatus(selectedComplaint.id, status, remarks, department);
      setSelectedComplaint(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Manage & Assign Complaints</h2>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Title</th>
                <th className="p-3">Assigned Dept</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {complaints.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-blue-600">{c.id}</td>
                  <td className="p-3 font-medium text-gray-800">{c.title}</td>
                  <td className="p-3 text-gray-600">{c.department || 'Not Assigned'}</td>
                  <td className="p-3 font-bold">{c.priority}</td>
                  <td className="p-3"><StatusBadge status={c.status} /></td>
                  <td className="p-3">
                    <button
                      onClick={() => handleOpenModal(c)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-xs"
                    >
                      Update / Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal 
        isOpen={!!selectedComplaint} 
        onClose={() => setSelectedComplaint(null)}
        title={`Manage Complaint #${selectedComplaint?.id}`}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm bg-white"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Assign Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm bg-white"
            >
              <option value="Electrical & Maintenance">Electrical & Maintenance</option>
              <option value="IT Services">IT Services</option>
              <option value="Plumbing & Cleanliness">Plumbing & Cleanliness</option>
              <option value="General Maintenance">General Maintenance</option>
              <option value="Transport Cell">Transport Cell</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Admin Remarks</label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Add instructions or feedback for staff/student..."
              className="w-full border rounded-lg p-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-lg text-xs"
          >
            Save Changes
          </button>
        </form>
      </Modal>
    </div>
  );
}