import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import {
  Menu,
  X,
  Shield,
  ExternalLink,
  Search,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  CheckCircle2,
  Inbox,
  Calendar
} from 'lucide-react';
import { subscribeAdminAuth, logoutAdmin, type AuthSessionUser } from '../../services/authService';
import { getAdmissionsAdmin, getNoticesAdmin } from '../../services/adminService';

interface RouteMeta {
  title: string;
  subtitle: string;
}

const ROUTE_META: Record<string, RouteMeta> = {
  '/admin': {
    title: 'Dashboard Overview',
    subtitle: 'Real-time school administrative statistics & quick actions'
  },
  '/admin/students': {
    title: 'Student Directory',
    subtitle: 'Manage enrolled student accounts, class levels, and portal access'
  },
  '/admin/teachers': {
    title: 'Teacher Management',
    subtitle: 'Faculty profiles, qualifications, and published directory'
  },
  '/admin/notices': {
    title: 'Notices & Announcements',
    subtitle: 'Publish, schedule, and manage official circulars'
  },
  '/admin/events': {
    title: 'Event Management',
    subtitle: 'Schedule and manage school calendar programs and activities'
  },
  '/admin/academics': {
    title: 'Academic Programs',
    subtitle: 'Manage academic departments, curriculum modules, and levels'
  },
  '/admin/departments': {
    title: 'Academic Programs',
    subtitle: 'Manage academic departments, curriculum modules, and levels'
  },
  '/admin/gallery': {
    title: 'Media & Photo Gallery',
    subtitle: 'Curate campus photos, achievements, and event albums'
  },
  '/admin/admissions': {
    title: 'Admission Enquiries',
    subtitle: 'Review public applicant submissions, contact status, and workflow'
  },
  '/admin/settings': {
    title: 'School Profile & Settings',
    subtitle: 'Update institutional profile, contacts, and campus office hours'
  },
};

export const AdminLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AuthSessionUser | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [newAdmissionsCount, setNewAdmissionsCount] = useState(0);
  const [recentNotifications, setRecentNotifications] = useState<
    Array<{ id: string; title: string; desc: string; time: string; link: string; type: string }>
  >([]);

  const location = useLocation();
  const navigate = useNavigate();
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = subscribeAdminAuth((u) => setAdminUser(u));
    return () => unsub();
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsNotificationsOpen(false);
    setIsProfileOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Load notification alerts (new admission enquiries & notices)
  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const [admissions, notices] = await Promise.all([
          getAdmissionsAdmin(),
          getNoticesAdmin()
        ]);
        const newOnes = admissions.filter((a) => a.status === 'New');
        setNewAdmissionsCount(newOnes.length);

        const list: Array<{ id: string; title: string; desc: string; time: string; link: string; type: string }> = [];
        newOnes.slice(0, 3).forEach((a) => {
          list.push({
            id: `adm-${a.id}`,
            title: `New Admission: ${a.applicantName}`,
            desc: `${a.enquiryType} • Ph: ${a.phone}`,
            time: 'Pending review',
            link: '/admin/admissions',
            type: 'admission'
          });
        });

        notices.slice(0, 2).forEach((n) => {
          list.push({
            id: `not-${n.id}`,
            title: `Circular: ${n.title}`,
            desc: n.description || 'Published circular',
            time: n.date,
            link: '/admin/notices',
            type: 'notice'
          });
        });

        setRecentNotifications(list);
      } catch (e) {
        console.warn('Could not load admin alerts:', e);
      }
    };
    loadAlerts();
  }, [location.pathname]);

  // Handle outside click to close popovers
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login');
  };

  const currentMeta = ROUTE_META[location.pathname] || {
    title: 'Admin Workspace',
    subtitle: 'Sharafiyya English Medium School Control Panel'
  };

  // Quick navigation items for search
  const quickJumpList = [
    { label: 'Students Directory', path: '/admin/students', section: 'Records' },
    { label: 'Teachers Management', path: '/admin/teachers', section: 'Staff' },
    { label: 'Publish Notice', path: '/admin/notices', section: 'Announcements' },
    { label: 'Calendar Events', path: '/admin/events', section: 'Programs' },
    { label: 'Academic Programs', path: '/admin/academics', section: 'Curriculum' },
    { label: 'Campus Gallery', path: '/admin/gallery', section: 'Media' },
    { label: 'Admission Enquiries', path: '/admin/admissions', section: 'Intake' },
    { label: 'School Settings', path: '/admin/settings', section: 'Configuration' },
  ].filter((item) =>
    searchQuery === '' ||
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.section.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 flex flex-col md:flex-row font-sans">
      {/* Desktop Fixed Left Sidebar */}
      <div className="hidden md:flex md:w-64 shrink-0 fixed inset-y-0 left-0 z-30 shadow-xl">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#0d281e] z-10 animate-in slide-in-from-left duration-200">
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
            <AdminSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-2xs">
          {/* Left: Mobile Toggle & Page Title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-black text-slate-900 tracking-tight truncate leading-tight">
                {currentMeta.title}
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-500 truncate hidden sm:block">
                {currentMeta.subtitle}
              </p>
            </div>
          </div>

          {/* Right: Quick Search + Notifications + Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Bar */}
            <div className="relative hidden lg:block w-56 xl:w-64">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Quick find..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#164e37] focus:bg-white transition-all"
                />
              </div>

              {/* Search Suggestions Dropdown */}
              {isSearchOpen && searchQuery.trim() !== '' && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
                  <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">
                    Direct Navigation
                  </div>
                  {quickJumpList.length === 0 ? (
                    <div className="p-3 text-center text-xs text-slate-500">
                      No matching sections found.
                    </div>
                  ) : (
                    <div className="space-y-0.5">
                      {quickJumpList.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-[#eef6f2] hover:text-[#164e37] transition-colors"
                        >
                          <span>{item.label}</span>
                          <span className="text-[10px] text-slate-400 uppercase font-mono">
                            {item.section}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Public Website Link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 px-2.5 py-1.5 rounded-xl hover:bg-emerald-50 transition-colors border border-emerald-200/80"
              title="Open public website in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#c59b27]" />
              <span className="hidden xl:inline">Live Site</span>
            </a>

            {/* Notifications Bell Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Open notifications menu"
              >
                <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                {newAdmissionsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
                )}
              </button>

              {/* Notification Popover */}
              {isNotificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3.5 bg-[#0d281e] text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#c59b27]" />
                      <span className="text-xs font-bold">Admin Notifications</span>
                    </div>
                    {newAdmissionsCount > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#164e37] text-amber-300 border border-[#c59b27]/40">
                        {newAdmissionsCount} Pending
                      </span>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto p-2 divide-y divide-slate-100">
                    {recentNotifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1.5" />
                        <span>All systems up to date. No pending alerts.</span>
                      </div>
                    ) : (
                      recentNotifications.map((notif) => (
                        <Link
                          key={notif.id}
                          to={notif.link}
                          onClick={() => setIsNotificationsOpen(false)}
                          className="p-2.5 rounded-xl hover:bg-slate-50 flex items-start gap-2.5 transition-colors group block"
                        >
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                            {notif.type === 'admission' ? (
                              <Inbox className="w-3.5 h-3.5 text-[#164e37]" />
                            ) : (
                              <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-slate-900 group-hover:text-[#164e37] truncate">
                              {notif.title}
                            </p>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              {notif.desc}
                            </p>
                            <span className="text-[9px] font-mono text-slate-400 mt-1 block">
                              {notif.time}
                            </span>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>

                  <div className="p-2.5 border-t border-slate-100 bg-slate-50 text-center">
                    <Link
                      to="/admin/admissions"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-xs font-bold text-[#164e37] hover:text-[#0f3b29]"
                    >
                      View All Admission Enquiries →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 pl-2 border-l border-slate-200 py-1 hover:opacity-90 transition-opacity cursor-pointer"
                aria-label="Toggle admin profile menu"
              >
                <div className="w-8 h-8 rounded-xl bg-[#164e37] text-white flex items-center justify-center text-xs font-bold border border-[#c59b27]/60 shadow-xs">
                  {adminUser?.email ? adminUser.email[0].toUpperCase() : 'A'}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    {adminUser?.displayName || 'Administrator'}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate max-w-[120px]">
                    Super Admin
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* Profile Menu Popover */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">
                      {adminUser?.displayName || 'Administrator'}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono truncate mt-0.5">
                      {adminUser?.email || 'admin@sharafiyya.edu'}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                      <Shield className="w-3 h-3 text-emerald-700" />
                      <span>Role: System Administrator</span>
                    </span>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      to="/admin/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#164e37] transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span>School Settings</span>
                    </Link>
                    <a
                      href="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#164e37] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-[#c59b27]" />
                      <span>Visit Public Website</span>
                    </a>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Body Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
