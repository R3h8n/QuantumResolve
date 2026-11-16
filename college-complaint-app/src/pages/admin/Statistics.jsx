import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Statistics() {
  const { complaints } = useAuth();

  // Category counts
  const categories = ['Electrical', 'Internet/Wi-Fi', 'Classroom', 'Hostel', 'Library', 'Cleanliness', 'Water'];
  const categoryData = categories.map(cat => ({
    name: cat,
    count: complaints.filter(c => c.category === cat).length
  }));

  // Status counts for Pie Chart
  const statusData = [
    { name: 'Pending', value: complaints.filter(c => c.status === 'Pending').length, color: '#f59e0b' },
    { name: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length, color: '#3b82f6' },
    { name: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length, color: '#10b981' },
    { name: 'Rejected', value: complaints.filter(c => c.status === 'Rejected').length, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Analytics & Maintenance Statistics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Complaints by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Status Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}