import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import StudentDashboard from './pages/student/StudentDashboard';
import SubmitComplaint from './pages/student/SubmitComplaint';
import MyComplaints from './pages/student/MyComplaints';
import ComplaintDetails from './pages/student/ComplaintDetails';
import StudentProfile from './pages/student/StudentProfile';

import AdminDashboard from './pages/admin/AdminDashboard';
import AllComplaints from './pages/admin/AllComplaints';
import ComplaintManagement from './pages/admin/ComplaintManagement';
import Statistics from './pages/admin/Statistics';

import DepartmentDashboard from './pages/department/DepartmentDashboard';
import AssignedComplaints from './pages/department/AssignedComplaints';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return <Layout>{children}</Layout>;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Portal Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Student Portal */}
          <Route path="/student/dashboard" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/submit-complaint" element={<ProtectedRoute allowedRole="student"><SubmitComplaint /></ProtectedRoute>} />
          <Route path="/student/my-complaints" element={<ProtectedRoute allowedRole="student"><MyComplaints /></ProtectedRoute>} />
          <Route path="/student/complaint/:id" element={<ProtectedRoute allowedRole="student"><ComplaintDetails /></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute allowedRole="student"><StudentProfile /></ProtectedRoute>} />

          {/* Admin Portal */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/all-complaints" element={<ProtectedRoute allowedRole="admin"><AllComplaints /></ProtectedRoute>} />
          <Route path="/admin/management" element={<ProtectedRoute allowedRole="admin"><ComplaintManagement /></ProtectedRoute>} />
          <Route path="/admin/statistics" element={<ProtectedRoute allowedRole="admin"><Statistics /></ProtectedRoute>} />

          {/* Department Staff Portal */}
          <Route path="/department/dashboard" element={<ProtectedRoute allowedRole="department"><DepartmentDashboard /></ProtectedRoute>} />
          <Route path="/department/assigned-complaints" element={<ProtectedRoute allowedRole="department"><AssignedComplaints /></ProtectedRoute>} />

          {/* Fallback Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}