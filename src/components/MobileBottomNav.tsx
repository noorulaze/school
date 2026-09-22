import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home as HomeIcon,
  BookOpen,
  Bell,
  User,
  Menu as MenuIcon,
  X,
  ChevronRight,
  GraduationCap,
  Image as ImageIcon,
  Users,
  Phone,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileBottomNavProps {
  onOpenAdmissionModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenAdmissionModal }) => {
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const isActive = (path: string, aliases: string[] = []) => {
    if (path === '/') return location.pathname === '/';
    if (aliases.some((a) => location.pathname === a || location.pathname.startsWith(a + '/'))) return true;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isStudentActive = location.pathname.startsWith('/student');
  const isUpdatesActive = location.pathname.startsWith('/events') || location.pathname.startsWith('/notice');
  const isAcademicsActive = location.pathname === '/departments' || location.pathname === '/academics';

  const moreLinks = [
    { label: 'About Us', path: '/about', icon: Info },
    { label: 'Our Teachers', path: '/teachers', icon: Users },
    { label: 'Campus Gallery', path: '/gallery', icon: ImageIcon },
    { label: 'Admission Guidelines', path: '/admissions', icon: GraduationCap },
    { label: 'Contact & Location', path: '/contact', icon: Phone },
  ];

  return (
    <>
      {/* ── Fixed Mobile Bottom App Bar ───────────────────────────────── */}
      <nav
        aria-label="Mobile Navigation Bar"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#fcfbf9]/95 backdrop-blur-lg border-t border-[#e2ddd1] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* 1. HOME */}
          <Link
            to="/"
            onClick={() => setIsMoreOpen(false)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] ${
              isActive('/')
                ? 'text-[#164e37] font-bold'
                : 'text-slate-500 hover:text-[#164e37]'
            }`}
          >
            <div className="relative">
              <HomeIcon className="w-5 h-5 transition-transform" />
              {isActive('/') && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#c59b27] rounded-full" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1">Home</span>
          </Link>

          {/* 2. ACADEMICS */}
          <Link
            to="/departments"
            onClick={() => setIsMoreOpen(false)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] ${
              isAcademicsActive
                ? 'text-[#164e37] font-bold'
                : 'text-slate-500 hover:text-[#164e37]'
            }`}
          >
            <div className="relative">
              <BookOpen className="w-5 h-5 transition-transform" />
              {isAcademicsActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#c59b27] rounded-full" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1">Academics</span>
          </Link>

          {/* 3. UPDATES (EVENTS & NOTICES) */}
          <Link
            to="/events"
            onClick={() => setIsMoreOpen(false)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] ${
              isUpdatesActive
                ? 'text-[#164e37] font-bold'
                : 'text-slate-500 hover:text-[#164e37]'
            }`}
          >
            <div className="relative">
              <Bell className="w-5 h-5 transition-transform" />
              {isUpdatesActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#c59b27] rounded-full" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1">Updates</span>
          </Link>

          {/* 4. STUDENT PORTAL */}
          <Link
            to="/student/login"
            onClick={() => setIsMoreOpen(false)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] ${
              isStudentActive
                ? 'text-[#164e37] font-bold'
                : 'text-slate-500 hover:text-[#164e37]'
            }`}
          >
            <div className="relative">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isStudentActive ? 'bg-[#164e37] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <User className="w-3.5 h-3.5" />
              </div>
              {isStudentActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#c59b27] rounded-full" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Student</span>
          </Link>

          {/* 5. MORE (ACTIONS & DIRECTORY) */}
          <button
            type="button"
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-w-[56px] ${
              isMoreOpen
                ? 'text-[#164e37] font-bold'
                : 'text-slate-500 hover:text-[#164e37]'
            }`}
            aria-label="Toggle full menu options"
            aria-expanded={isMoreOpen}
          >
            <div className="relative">
              {isMoreOpen ? (
                <X className="w-5 h-5 text-[#164e37]" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1">More</span>
          </button>
        </div>
      </nav>

      {/* ── More Bottom Sheet / Drawer ─────────────────────────────────── */}
      <AnimatePresence>
        {isMoreOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end"
            onClick={() => setIsMoreOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl border-t border-[#e2ddd1] shadow-2xl p-5 pb-24 max-h-[82vh] overflow-y-auto space-y-4"
            >
              {/* Drag handle */}
              <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto" />

              {/* Sheet Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-[#0f231c]">Sharafiyya Quick Navigation</h3>
                  <p className="text-[11px] text-slate-500">School directory, pages & actions</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMoreOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsMoreOpen(false);
                    onOpenAdmissionModal();
                  }}
                  className="p-3 rounded-2xl bg-[#164e37] text-white flex flex-col items-start gap-1 text-left shadow-xs hover:bg-[#0f3b29] transition-all"
                >
                  <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-[#c59b27]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold leading-tight mt-1">Admission Enquiry</span>
                  <span className="text-[10px] text-emerald-100/80">Submit online application</span>
                </button>

                <Link
                  to="/student/login"
                  onClick={() => setIsMoreOpen(false)}
                  className="p-3 rounded-2xl bg-[#f4f9f6] border border-[#cbe3d5] text-[#164e37] flex flex-col items-start gap-1 text-left shadow-2xs hover:bg-[#e6f2ec] transition-all"
                >
                  <div className="w-7 h-7 rounded-xl bg-[#164e37]/10 flex items-center justify-center text-[#164e37]">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold leading-tight mt-1">Student Portal</span>
                  <span className="text-[10px] text-slate-500">Access student records</span>
                </Link>
              </div>

              {/* Extended Directory Links */}
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 px-1">
                  Explore School
                </p>
                {moreLinks.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setIsMoreOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-colors ${
                        active
                          ? 'bg-[#164e37] text-white'
                          : 'bg-[#fcfbf9] text-slate-700 hover:bg-[#f2efe9] border border-[#eee9df]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            active ? 'bg-white/15 text-[#c59b27]' : 'bg-[#eef6f2] text-[#164e37]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 ${active ? 'text-[#c59b27]' : 'text-slate-400'}`}
                      />
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2 text-center text-[10px] text-slate-400 border-t border-slate-100">
                Sharafiyya English Medium School · Korangath, Tirur
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
