import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Bell,
  Calendar,
  GraduationCap,
  BookOpen,
  Image,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { logoutAdmin } from '../../services/authService';

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onCloseMobile }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Students', path: '/admin/students', icon: Users },
    { label: 'Notices', path: '/admin/notices', icon: Bell },
    { label: 'Events', path: '/admin/events', icon: Calendar },
    { label: 'Teachers', path: '/admin/teachers', icon: GraduationCap },
    { label: 'Departments', path: '/admin/departments', icon: BookOpen },
    { label: 'Gallery', path: '/admin/gallery', icon: Image },
    { label: 'Admissions', path: '/admin/admissions', icon: Inbox },
    { label: 'School Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0d281e] text-slate-300 flex flex-col justify-between h-full border-r border-[#1a4434] select-none">
      {/* Brand Header */}
      <div>
        <div className="p-4 sm:p-5 border-b border-[#1a4434] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#164e37] text-white flex items-center justify-center shrink-0 border border-[#c59b27]/70 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#c59b27]" />
            </div>
            <div className="min-w-0">
              <h2 className="text-white font-extrabold text-sm tracking-tight truncate leading-tight">
                Sharaful Islam
              </h2>
              <span className="text-[10px] text-emerald-300/80 font-medium block truncate">
                Admin Control Panel
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-190px)]" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#164e37] text-white font-bold shadow-xs border-l-3 border-[#c59b27]'
                      : 'text-slate-300 hover:text-white hover:bg-[#123628]'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-[#c59b27] shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-3.5 border-t border-[#1a4434] space-y-2 bg-[#091f17]">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-emerald-200/80 hover:text-white hover:bg-[#123628] transition-colors"
        >
          <span className="flex items-center gap-2 truncate">
            <ExternalLink className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>View Public Website</span>
          </span>
          <span className="text-[10px] uppercase font-mono text-emerald-400">Live</span>
        </a>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-rose-300 hover:text-white hover:bg-rose-900/30 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
