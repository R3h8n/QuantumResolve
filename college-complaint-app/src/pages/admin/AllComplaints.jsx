import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../../components/SearchBar';
import FilterDropdown from '../../components/FilterDropdown';
import StatusBadge from '../../components/StatusBadge';
import { mockCategories } from '../../mockData';

export default function AllComplaints() {
  const { complaints } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');

  const filtered = complaints.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || c.category === category;
    const matchesStatus = status === 'All' || c.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">All College Complaints</h2>

      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by ID or title..." />
        <div className="flex flex-wrap gap-3">
          <FilterDropdown label="Category" options={mockCategories} value={category} onChange={setCategory} />
          <FilterDropdown label="Status" options={['Pending', 'In Progress', 'Resolved', 'Rejected']} value={status} onChange={setStatus} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold uppercase">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Location</th>
                <th className="p-3">Student</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-blue-600">{c.id}</td>
                  <td className="p-3 font-medium text-gray-800 max-w-xs truncate">{c.title}</td>
                  <td className="p-3 text-gray-600">{c.category}</td>
                  <td className="p-3 text-gray-600">{c.location}</td>
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