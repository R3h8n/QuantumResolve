import React from 'react';
import { useAuth } from '../../context/AuthContext';
import ComplaintCard from '../../components/ComplaintCard';
import { FileText, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const { user, complaints } = useAuth();

  const userComplaints = complaints.filter(c => c.studentName === user?.name || c.studentRoll === user?.rollNumber);

  const stats = {
    total: userComplaints.length,
    pending: userComplaints.filter(c => c.status === 'Pending').length,
    inProgress: userComplaints.filter(c => c.status === 'In Progress').length,
    resolved: userComplaints.filter(c => c.status === 'Resolved').length,
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold">Welcome back, {user?.name}! 👋</h2>
        <p className="text-blue-100 text-sm mt-1">Roll No: {user?.rollNumber} | {user?.department}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center text-gray-500 text-xs font-semibold">
            <span>TOTAL FILED</span>
            <FileText className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm bg-amber-50/20">
          <div className="flex justify-between items-center text-amber-700 text-xs font-semibold">
            <span>PENDING</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600 mt-2">{stats.pending}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm bg-blue-50/20">
          <div className="flex justify-between items-center text-blue-700 text-xs font-semibold">
            <span>IN PROGRESS</span>
            <AlertCircle className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-600 mt-2">{stats.inProgress}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm bg-emerald-50/20">
          <div className="flex justify-between items-center text-emerald-700 text-xs font-semibold">
            <span>RESOLVED</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-2">{stats.resolved}</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Your Recent Complaints</h3>
          <Link to="/student/submit-complaint" className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors">
            + Log New Issue
          </Link>
        </div>

        {userComplaints.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-center border border-dashed border-gray-300">
            <p className="text-sm text-gray-500">You haven't filed any complaints yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userComplaints.slice(0, 3).map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} linkPrefix="/student/complaint" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}