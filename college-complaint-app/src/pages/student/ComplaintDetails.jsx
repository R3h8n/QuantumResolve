import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import { ArrowLeft, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ComplaintDetails() {
  const { id } = useParams();
  const { complaints } = useAuth();

  const complaint = complaints.find(c => c.id === id);

  if (!complaint) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Complaint not found.</p>
        <Link to="/student/my-complaints" className="text-blue-600 font-semibold text-xs mt-2 inline-block">← Back to complaints</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/student/my-complaints" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" /> Back to List
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-gray-100">
          <div>
            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              {complaint.id}
            </span>
            <h2 className="text-xl font-bold text-gray-900 mt-2">{complaint.title}</h2>
          </div>
          <StatusBadge status={complaint.status} />
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl text-xs">
          <div>
            <span className="text-gray-400 block font-semibold uppercase">Category</span>
            <span className="font-semibold text-gray-800">{complaint.category}</span>
          </div>
          <div>
            <span className="text-gray-400 block font-semibold uppercase">Priority</span>
            <span className="font-semibold text-gray-800">{complaint.priority}</span>
          </div>
          <div>
            <span className="text-gray-400 block font-semibold uppercase">Location</span>
            <span className="font-semibold text-gray-800">{complaint.location}</span>
          </div>
          <div>
            <span className="text-gray-400 block font-semibold uppercase">Date Filed</span>
            <span className="font-semibold text-gray-800">{complaint.date}</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-bold uppercase text-gray-500 mb-1">Issue Description</h4>
          <p className="text-sm text-gray-700 bg-white p-3 border rounded-lg">{complaint.description}</p>
        </div>

        {/* Assigned Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="border p-3 rounded-lg">
            <span className="text-gray-400 block font-semibold uppercase">Assigned Department</span>
            <span className="font-bold text-gray-800">{complaint.department || 'Awaiting Assignment'}</span>
          </div>
          <div className="border p-3 rounded-lg">
            <span className="text-gray-400 block font-semibold uppercase">Estimated Resolution</span>
            <span className="font-bold text-gray-800">{complaint.estimatedResolution || 'Pending'}</span>
          </div>
        </div>

        {/* Remarks */}
        {(complaint.adminRemarks || complaint.staffRemarks) && (
          <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl space-y-2 text-xs">
            {complaint.adminRemarks && (
              <div>
                <span className="font-bold text-blue-900">Admin Remark:</span> {complaint.adminRemarks}
              </div>
            )}
            {complaint.staffRemarks && (
              <div>
                <span className="font-bold text-blue-900">Staff Update:</span> {complaint.staffRemarks}
              </div>
            )}
          </div>
        )}

        {/* Timeline */}
        <div>
          <h4 className="text-xs font-bold uppercase text-gray-500 mb-4">Progress Timeline</h4>
          <div className="space-y-4 pl-4 border-l-2 border-gray-200">
            {complaint.timeline.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[21px] top-0 bg-blue-600 text-white rounded-full p-1">
                  <Clock className="w-3 h-3" />
                </div>
                <div className="text-xs font-bold text-gray-900">{step.status}</div>
                <div className="text-[11px] text-gray-400">{step.date}</div>
                <div className="text-xs text-gray-600 mt-1">{step.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}