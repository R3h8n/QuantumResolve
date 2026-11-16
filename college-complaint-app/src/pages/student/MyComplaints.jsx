import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ComplaintCard from '../../components/ComplaintCard';
import SearchBar from '../../components/SearchBar';
import FilterDropdown from '../../components/FilterDropdown';
import { mockCategories } from '../../mockData';

export default function MyComplaints() {
  const { user, complaints } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');

  const myComplaints = complaints.filter(c => c.studentName === user?.name || c.studentRoll === user?.rollNumber);

  const filtered = myComplaints.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || c.category === category;
    const matchesStatus = status === 'All' || c.status === status;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Complaints</h2>
          <p className="text-xs text-gray-500">Search and check status updates on your filed complaints</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by Complaint ID or title..." />
        <div className="flex flex-wrap gap-3">
          <FilterDropdown label="Category" options={mockCategories} value={category} onChange={setCategory} />
          <FilterDropdown label="Status" options={['Pending', 'In Progress', 'Resolved', 'Rejected']} value={status} onChange={setStatus} />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">No matching complaints found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(complaint => (
            <ComplaintCard key={complaint.id} complaint={complaint} linkPrefix="/student/complaint" />
          ))}
        </div>
      )}
    </div>
  );
}