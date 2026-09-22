import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginStudent } from '../../services/authService';
import {
  GraduationCap,
  Lock,
  User,
  AlertCircle,
  Loader2,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const StudentLogin: React.FC = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
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

  const handleFillDemo = () => {
    setIdentifier('SK-2025-001');
    setPassword('Student@123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-slate-800 flex flex-col justify-center items-center px-4 py-8 sm:py-12 relative overflow-hidden font-sans">
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

      <div className="w-full max-w-md relative z-10 space-y-4">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#164e37] hover:text-[#0f3b29] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Public Website</span>
          </Link>
          <span className="text-[11px] font-semibold text-slate-400">Student Area</span>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-sm hover:shadow-md border border-[#e5e0d5] overflow-hidden transition-shadow"
        >
          {/* Card Header */}
          <div className="bg-[#0f231c] text-white p-6 sm:p-7 text-center relative overflow-hidden">
            {/* Subtle corner watermark */}
            <div className="w-12 h-12 rounded-2xl bg-[#164e37] border border-[#c59b27]/60 flex items-center justify-center mx-auto mb-3 shadow-sm">
              <GraduationCap className="w-6 h-6 text-[#c59b27]" />
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#164e37] border border-[#c59b27]/30 text-[10px] font-bold text-amber-300 uppercase tracking-widest mb-1.5">
              <span>Private Access</span>
            </span>

            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Student Digital Portal
            </h1>
            <p className="text-xs text-emerald-100/80 mt-1 font-medium">
              Sharafiyya English Medium School · Korangath, Tirur
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-7 space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <div className="flex-1">
                  <strong className="block font-bold">Authentication Failed</strong>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student ID or Registered Email
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
                    placeholder="e.g. SK-2025-001 or email"
                    className="w-full pl-10 pr-3 py-2.5 bg-[#fcfbf9] border border-[#d8d3c5] rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#164e37] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Portal Password
                </label>
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

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-[#164e37] hover:bg-[#0f3b29] text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
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

            {/* Quick Demo Helper */}
            <div className="pt-3 border-t border-[#ede8de] text-center space-y-2">
              <button
                type="button"
                onClick={handleFillDemo}
                className="inline-flex items-center gap-1.5 text-xs text-[#164e37] hover:text-[#0f3b29] font-bold bg-[#eef6f2] hover:bg-[#e2f0e8] px-3 py-1.5 rounded-lg border border-[#cbe3d5] transition-colors cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Fill Sample Credentials (SK-2025-001)</span>
              </button>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                For student credentials or password resets, contact the school administrative office.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Security & Privacy Assurance Notice */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#e5e0d5] text-center text-xs text-slate-500 space-y-1 shadow-2xs">
          <p className="font-semibold text-slate-700 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#164e37]" />
            <span>Secure Student Data Isolation</span>
          </p>
          <p className="text-[11px] text-slate-500">
            Authenticated records are private to each enrolled student account.
          </p>
        </div>
      </div>
    </div>
  );
};
