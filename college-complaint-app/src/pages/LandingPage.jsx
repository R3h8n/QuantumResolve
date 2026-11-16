import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, CheckCircle2, Wrench, ArrowRight, Server, FilePlus } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Header Navigation */}
      <header className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-600/30">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white block leading-tight">QuantumResolve</span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">College Facilities Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            to="/login" 
            className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all shadow-md shadow-blue-600/30"
          >
            Student Register
          </Link>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-16 flex flex-col justify-center items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-6">
          <Server className="w-3.5 h-3.5" /> Campus Infrastructure & Maintenance Management
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight max-w-4xl">
          Centralized Campus Complaint & Facility Tracking
        </h1>

        <p className="text-base sm:text-lg text-slate-400 mb-10 max-w-2xl leading-relaxed">
          Submit classroom, hostel, electrical, and network maintenance requests. Receive real-time status updates and track department resolutions transparently.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            to="/login" 
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-xl shadow-blue-600/30"
          >
            <FilePlus className="w-4 h-4" /> File a Complaint
          </Link>
          <Link 
            to="/register" 
            className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-8 py-3.5 rounded-xl font-bold text-sm transition-all"
          >
            Create Student Account <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left w-full">
          <div className="bg-slate-800/50 border border-slate-700/60 p-6 rounded-2xl backdrop-blur-sm">
            <Clock className="w-7 h-7 text-blue-400 mb-3" />
            <h3 className="font-bold text-base text-white mb-1.5">Live Progress Log</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Follow every step of your issue from initial filing to department assignment and repair completion.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/60 p-6 rounded-2xl backdrop-blur-sm">
            <Wrench className="w-7 h-7 text-amber-400 mb-3" />
            <h3 className="font-bold text-base text-white mb-1.5">Department Dispatch</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automatic routing to Electrical, IT Services, Plumbing, and Hostel Maintenance units.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/60 p-6 rounded-2xl backdrop-blur-sm">
            <CheckCircle2 className="w-7 h-7 text-emerald-400 mb-3" />
            <h3 className="font-bold text-base text-white mb-1.5">Executive Oversight</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Central administration monitors service timelines and maintains facility standards.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-800">
        Quantum Resolve — College Complaint & Facility Management System
      </footer>
    </div>
  );
}