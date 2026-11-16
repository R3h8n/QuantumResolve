import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, User, Wrench, Lock, Mail, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('student@college.edu');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setError('');
    if (selectedRole === 'student') {
      setEmail('student@college.edu');
    } else if (selectedRole === 'admin') {
      setEmail('admin.chief@college.edu');
    } else if (selectedRole === 'department') {
      setEmail('electrical.dept@college.edu');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const normalizedRole = role === 'staff' ? 'department' : role;
    const res = await login(email, password, normalizedRole);
    setLoading(false);

    if (res === true || res?.success) {
      navigate(`/${normalizedRole}/dashboard`);
    } else {
      setError('Cannot connect to backend. Make sure "node server.js" is running on port 5000.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-xl mb-3">
            Q
          </div>
          <h1 className="text-2xl font-bold text-slate-900">QuantumResolve</h1>
          <p className="text-sm text-slate-500 mt-1">Select your institutional portal to continue</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => handleRoleSelect('student')}
            className={`flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium rounded-lg transition-all ${
              role === 'student'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            Student
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('admin')}
            className={`flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium rounded-lg transition-all ${
              role === 'admin'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Admin
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('department')}
            className={`flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium rounded-lg transition-all ${
              role === 'department'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-4 h-4" />
            Staff
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Institutional Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@college.edu"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          New student?{' '}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Create Student Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;