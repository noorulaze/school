import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginStudent } from '../../services/authService';
import { GraduationCap, Lock, User, AlertCircle, Loader2, ArrowLeft, KeyRound } from 'lucide-react';

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
    <div className="min-h-screen bg-[#071912] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background Decorative Rings */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#164e37]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#c59b27]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Return to website */}
      <div className="w-full max-w-md mb-6 flex justify-between items-center z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Madrassa Website</span>
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/40 z-10">
        {/* Banner */}
        <div className="bg-[#091f17] p-8 text-center text-white border-b border-[#14392b]">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#164e37] border border-[#c59b27]/80 flex items-center justify-center shadow-lg">
            <GraduationCap className="w-8 h-8 text-[#c59b27]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Student Digital Portal
          </h1>
          <p className="text-xs text-emerald-200/90 mt-1 font-medium">
            Sharafiyya English Medium School • Korangath, Tirur
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs leading-relaxed animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <div>
                <strong className="font-bold block text-rose-900">Login Unsuccessful</strong>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
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
                  placeholder="e.g. SK-2025-001 or student email"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#164e37] hover:bg-[#113d2b] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Entering Student Portal...</span>
                </>
              ) : (
                <span>Access Student Portal</span>
              )}
            </button>
          </form>

          {/* Development Quick-Fill Helper */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-800 hover:text-emerald-950 font-semibold bg-emerald-50 hover:bg-emerald-100/70 px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-emerald-200/50"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Fill Demo Credentials (SK-2025-001)</span>
            </button>
            <p className="text-[11px] text-slate-400 mt-2">
              For student access credentials or password resets, contact the Madrassa administrative office.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
