import React from 'react';

export default function FilterDropdown({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      {label && <label className="text-xs font-medium text-gray-600 uppercase">{label}:</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 shadow-sm"
      >
        <option value="All">All {label || 'Items'}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}