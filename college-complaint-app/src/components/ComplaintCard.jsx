import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { Calendar, MapPin, Tag, ArrowRight } from 'lucide-react';

export default function ComplaintCard({ complaint, linkPrefix = "/student/complaint" }) {
  const priorityColor = {
    'High': 'text-red-600 bg-red-50 border-red-200',
    'Medium': 'text-orange-600 bg-orange-50 border-orange-200',
    'Low': 'text-gray-600 bg-gray-50 border-gray-200',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-5 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-mono font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            {complaint.id}
          </span>
          <StatusBadge status={complaint.status} />
        </div>

        <h4 className="text-base font-bold text-gray-900 mb-2 line-clamp-1">{complaint.title}</h4>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{complaint.description}</p>

        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-gray-400" />
            <span>{complaint.category}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{complaint.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>{complaint.date}</span>
          </div>
          <div>
            Priority: <span className={`font-semibold px-1.5 py-0.5 rounded border text-[10px] ${priorityColor[complaint.priority]}`}>{complaint.priority}</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
        <span className="text-xs text-gray-400">By: {complaint.studentName}</span>
        <Link
          to={`${linkPrefix}/${complaint.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          View Details <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}