import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, BookOpen, MapPin } from 'lucide-react';

export default function StudentProfile() {
  const { user } = useAuth();

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-3">
          {user?.name.charAt(0)}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
        <p className="text-xs text-blue-600 font-semibold">{user?.rollNumber}</p>
      </div>

      <div className="space-y-4 text-xs">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Mail className="w-4 h-4 text-gray-400" />
          <div>
            <span className="text-gray-400 block font-semibold">EMAIL</span>
            <span className="font-semibold text-gray-800">{user?.email}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <BookOpen className="w-4 h-4 text-gray-400" />
          <div>
            <span className="text-gray-400 block font-semibold">DEPARTMENT</span>
            <span className="font-semibold text-gray-800">{user?.department}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Phone className="w-4 h-4 text-gray-400" />
          <div>
            <span className="text-gray-400 block font-semibold">PHONE</span>
            <span className="font-semibold text-gray-800">{user?.phone}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <MapPin className="w-4 h-4 text-gray-400" />
          <div>
            <span className="text-gray-400 block font-semibold">HOSTEL ROOM / LOCATION</span>
            <span className="font-semibold text-gray-800">{user?.room}</span>
          </div>
        </div>
      </div>
    </div>
  );
}