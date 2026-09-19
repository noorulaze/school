import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { StudentSidebar } from './StudentSidebar';
import { Menu, X, GraduationCap, ExternalLink } from 'lucide-react';
import { subscribeStudentAuth, type AuthSessionUser } from '../../services/authService';
import { getStudentProfile } from '../../services/studentService';
import type { StudentDocument } from '../../types/firestore';

export const StudentLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [studentUser, setStudentUser] = useState<AuthSessionUser | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentDocument | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsub = subscribeStudentAuth(async (u) => {
      setStudentUser(u);
      if (u) {
        const p = await getStudentProfile(u.uid, u.studentId);
        setStudentProfile(p);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 flex flex-col md:flex-row font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 shrink-0 fixed inset-y-0 left-0 z-30 shadow-xl">
        <StudentSidebar />
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#091f17] z-10 animate-in slide-in-from-left duration-200">
            <div className="absolute top-2.5 right-2.5 z-20">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <StudentSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                  Student Portal
                </span>
                <span className="hidden sm:inline text-xs text-slate-400">•</span>
                <span className="hidden sm:inline text-xs font-mono font-bold text-slate-700">
                  {studentProfile?.studentId || studentUser?.studentId || 'SK-2025-001'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors border border-emerald-200/60"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Public Website</span>
            </Link>

            <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#164e37] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                {studentProfile?.name ? studentProfile.name.charAt(0) : 'S'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  {studentProfile?.name || 'Enrolled Student'}
                </p>
                <p className="text-[10px] text-slate-500 truncate max-w-[160px]">
                  {studentProfile?.className || 'Class 5 - Intermediate'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
