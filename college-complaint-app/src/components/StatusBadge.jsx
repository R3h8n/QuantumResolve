import React from 'react';

export default function StatusBadge({ status }) {
  const styles = {
    'Pending': 'bg-amber-100 text-amber-800 border-amber-300',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-300',
    'Resolved': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    'Rejected': 'bg-rose-100 text-rose-800 border-rose-300'
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
}