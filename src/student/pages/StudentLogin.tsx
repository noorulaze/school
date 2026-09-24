import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginStudent, loginAdmin } from '../../services/authService';
import {
  Lock,
  User,
  AlertCircle,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const StudentLogin: React.FC = () => {
  const navigate = useNavigate();
  // Mode toggle between student and admin login
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Student login state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  // Admin login state (temporary testing credentials)
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginStudent(identifier, password);
      navigate('/student/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid Student ID or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginAdmin(adminUsername, adminPassword);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid administrator username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-slate-800 flex flex-col justify-between items-center px-3.5 sm:px-4 py-4 sm:py-10 relative overflow-hidden font-sans">
      {/* Subtle background ambient details */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="login-subtle-geo" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 60 30 L 30 60 L 0 30 Z" fill="none" stroke="#164e37" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-subtle-geo)" />
        </svg>
      </div>

      {/* Top Mobile App Bar / Back Link */}
      <div className="w-full max-w-md relative z-10 flex items-center justify-between pb-2 sm:pb-4">
        {isAdminMode ? (
          <button
            type="button"
            onClick={() => {
              setIsAdminMode(false);
              setError(null);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-[#e5e0d5] text-xs font-bold text-[#164e37] hover:bg-[#f4f9f6] transition-all shadow-2xs group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Student Login</span>
          </button>
        ) : (
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-[#e5e0d5] text-xs font-bold text-[#164e37] hover:bg-[#f4f9f6] transition-all shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to School</span>
          </Link>
        )}
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {isAdminMode ? 'Admin Portal' : 'Student Portal'}
        </span>
      </div>

      <div className="w-full max-w-md relative z-10 my-auto space-y-3 sm:space-y-4">
        {/* Login Card */}
        <motion.div
          key={isAdminMode ? 'admin-card' : 'student-card'}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-xs hover:shadow-md border border-[#e5e0d5] overflow-hidden transition-shadow"
        >
          {/* Card Header with School Crest */}
          <div className="bg-[#0f231c] text-white p-5 sm:p-7 text-center relative overflow-hidden">
            {/* School Crest Emblem */}
            <div className="w-12 h-12 rounded-2xl bg-[#164e37] border border-[#c59b27]/60 flex items-center justify-center mx-auto mb-2.5 shadow-sm overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-8 h-8" aria-hidden="true">
                <circle cx="50" cy="50" r="46" fill="none" stroke="#c59b27" strokeWidth="2.5" strokeDasharray="3 2" />
                <path d="M24 64 C36 58, 45 61, 50 67 C55 61, 64 58, 76 64 L76 38 C64 34, 55 37, 50 43 C45 37, 36 34, 24 38 Z" fill="#ffffff" />
                <circle cx="50" cy="27" r="5" fill="#c59b27" />
                <circle cx="52" cy="26" r="4" fill="#164e37" />
                <line x1="50" y1="43" x2="50" y2="67" stroke="#164e37" strokeWidth="2.5" />
              </svg>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#164e37] border border-[#c59b27]/30 text-[9px] font-bold text-amber-300 uppercase tracking-widest mb-1">
              <span>{isAdminMode ? 'Administrator Workspace' : 'Private Access'}</span>
            </span>

            <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white">
              {isAdminMode ? 'Admin Portal Login' : 'Student Digital Portal'}
            </h1>
            <p className="text-[11px] sm:text-xs text-emerald-100/80 mt-0.5 font-medium">
              {isAdminMode
                ? 'Temporary Testing Access · Sharafiyya English Medium School'
                : 'Sharafiyya English Medium School · Korangath, Tirur'}
            </p>
          </div>

          {/* Form Content */}
          <div className="p-5 sm:p-7 space-y-3.5">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <div className="flex-1">
                  <strong className="block font-bold">Authentication Failed</strong>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {!isAdminMode ? (
              /* STUDENT LOGIN FORM */
              <>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Student ID or Custom Username *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Enter Student ID (e.g. SK-2025-001) or username"
                        className="w-full pl-10 pr-3 py-2.5 bg-[#fcfbf9] border border-[#d8d3c5] rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#164e37] focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Portal Password
                      </label>
                      <span className="text-[10px] text-slate-400">
                        Contact Admin to Reset
                      </span>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-3 py-2.5 bg-[#fcfbf9] border border-[#d8d3c5] rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#164e37] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-4 bg-[#164e37] hover:bg-[#0f3b29] active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#c59b27]" />
                          <span>Verifying Credentials...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-[#c59b27]" />
                          <span>Log In to Student Portal</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Faculty & Staff Access Switcher */}
                <div className="pt-4 border-t border-[#ede8de] flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    Faculty & School Staff:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminMode(true);
                      setError(null);
                    }}
                    className="text-xs font-bold text-[#164e37] hover:text-[#0f3b29] hover:bg-[#eef6f2] transition-colors inline-flex items-center gap-1.5 cursor-pointer py-1.5 px-3 rounded-xl border border-[#cbe3d5]"
                  >
                    <Shield className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span>Admin Login</span>
                  </button>
                </div>
              </>
            ) : (
              /* ADMIN LOGIN FORM */
              <>
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Admin Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        placeholder="Enter username"
                        className="w-full pl-10 pr-3 py-2.5 bg-[#fcfbf9] border border-[#d8d3c5] rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#164e37] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Admin Password
                      </label>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-3 py-2.5 bg-[#fcfbf9] border border-[#d8d3c5] rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#164e37] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-4 bg-[#164e37] hover:bg-[#0f3b29] active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#c59b27]" />
                          <span>Authenticating Admin...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-[#c59b27]" />
                          <span>Log In to Admin Workspace</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Return to Student Login */}
                <div className="pt-4 border-t border-[#ede8de] flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    Student or Parent:
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminMode(false);
                      setError(null);
                    }}
                    className="text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer py-1.5 px-3 rounded-xl border border-slate-300"
                  >
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Student Login</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Security & Privacy Assurance Notice */}
        <div className="p-3 rounded-2xl bg-white border border-[#e5e0d5] text-center text-xs text-slate-500 space-y-0.5 shadow-2xs">
          <p className="font-semibold text-slate-700 flex items-center justify-center gap-1.5 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#164e37]" />
            <span>{isAdminMode ? 'Restricted Administrator Area' : 'Secure Student Data Isolation'}</span>
          </p>
          <p className="text-[10px] text-slate-500">
            {isAdminMode
              ? 'Authorized school administrative access only.'
              : 'Authenticated records are private to each enrolled student account.'}
          </p>
        </div>
      </div>
    </div>
  );
};
