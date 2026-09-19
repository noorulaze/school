import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  CheckSquare,
  Award,
  Bell,
  Calendar,
  LogOut,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { logoutStudent } from '../../services/authService';

interface StudentSidebarProps {
  onCloseMobile?: () => void;
}

export const StudentSidebar: React.FC<StudentSidebarProps> = ({ onCloseMobile }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutStudent();
    navigate('/student/login');
  };

  const navItems = [
    { label: 'Portal Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Student Profile', path: '/student/profile', icon: User },
    { label: 'Attendance Records', path: '/student/attendance', icon: CheckSquare },
    { label: 'Academic Evaluations', path: '/student/academics', icon: Award },
    { label: 'Announcements', path: '/student/notices', icon: Bell },
    { label: 'Madrassa Events', path: '/student/events', icon: Calendar },
  ];

  return (
    <aside className="w-64 bg-[#091f17] text-slate-300 flex flex-col justify-between h-full border-r border-[#14392b] select-none">
      <div>
        {/* Student Portal Header */}
        <div className="p-4 sm:p-5 border-b border-[#14392b] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#164e37] text-white flex items-center justify-center shrink-0 border border-[#c59b27]/80 shadow-xs">
            <GraduationCap className="w-5 h-5 text-[#c59b27]" />
          </div>
          <div className="min-w-0">
            <h2 className="text-white font-extrabold text-sm tracking-tight truncate leading-tight">
              Sharafiyya Portal
            </h2>
            <span className="text-[10px] text-emerald-300/80 font-medium block truncate">
              Student Digital Space
            </span>
          </div>
        </div>

        {/* Links */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-190px)]" aria-label="Student Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#164e37] text-white font-bold shadow-xs border-l-3 border-[#c59b27]'
                      : 'text-slate-300 hover:text-white hover:bg-[#113325]'
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

      {/* Footer / Actions */}
      <div className="p-3.5 border-t border-[#14392b] space-y-2 bg-[#06150f]">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-emerald-200/80 hover:text-white hover:bg-[#113325] transition-colors"
        >
          <span className="flex items-center gap-2 truncate">
            <ExternalLink className="w-3.5 h-3.5 text-[#c59b27]" />
            <span>Public Website</span>
          </span>
          <span className="text-[10px] uppercase font-mono text-emerald-400">Home</span>
        </a>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-300 hover:text-white hover:bg-rose-900/30 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Sign Out of Portal</span>
        </button>
      </div>
    </aside>
  );
};
