import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { useAuth } from '../../context/AuthContext';

export default function UpdateComplaintModal({ complaint, onClose }) {
  const { updateDepartmentProgress } = useAuth();
  const [status, setStatus] = useState(complaint.status);
  const [remarks, setRemarks] = useState(complaint.staffRemarks || '');
  const [estDate, setEstDate] = useState(complaint.estimatedResolution || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDepartmentProgress(complaint.id, status, remarks, estDate);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={`Update Complaint Work Order #${complaint.id}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm bg-white"
          >
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Estimated Resolution Date</label>
          <input
            type="date"
            value={estDate}
            onChange={(e) => setEstDate(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Staff Work Remarks</label>
          <textarea
            rows={3}
            placeholder="Details on repair work performed..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-lg text-xs"
        >
          Submit Resolution Update
        </button>
      </form>
    </Modal>
  );
}