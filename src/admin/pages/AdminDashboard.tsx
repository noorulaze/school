import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Bell,
  Calendar,
  GraduationCap,
  Inbox,
  ArrowUpRight,
  UserPlus,
  Plus,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Shield,
  Activity,
  MapPin,
  FileSpreadsheet,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  getDashboardStats,
  getAdmissionsAdmin,
  updateAdmissionStatus,
  getNoticesAdmin,
  getEventsAdmin,
  getStudentsAdmin,
  getTeachersAdmin,
  getGalleryAdmin,
  getContactMessagesAdmin
} from '../../services/adminService';
import { subscribeAdminAuth, type AuthSessionUser } from '../../services/authService';
import type {
  DashboardStats,
  AdmissionEnquiry,
  NoticeItem,
  EventItem,
  StudentDocument,
  TeacherItem,
  GalleryItem,
  ContactMessage
} from '../../types/firestore';

interface ActivityItem {
  id: string;
  type: 'admission' | 'student' | 'notice' | 'event' | 'gallery';
  title: string;
  subtitle: string;
  timestamp: string;
  dateObj: Date;
  link: string;
}

export const AdminDashboard: React.FC = () => {
  const [adminUser, setAdminUser] = useState<AuthSessionUser | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalNotices: 0,
    totalEvents: 0,
    totalTeachers: 0,
    totalDepartments: 0,
    totalGallery: 0,
    totalStudents: 0,
    newAdmissions: 0,
  });

  const [admissions, setAdmissions] = useState<AdmissionEnquiry[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [students, setStudents] = useState<StudentDocument[]>([]);
  const [teachers, setTeachers] = useState<TeacherItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

  // Dynamic greeting based on local time
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const todayFormatted = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }, []);

  // Fetch real data from services
  const loadData = async () => {
    setLoading(true);
    try {
      const [st, adm, nots, evts, studList, teachList, galList, msgList] = await Promise.all([
        getDashboardStats(),
        getAdmissionsAdmin(),
        getNoticesAdmin(),
        getEventsAdmin(),
        getStudentsAdmin(),
        getTeachersAdmin(),
        getGalleryAdmin(),
        getContactMessagesAdmin(),
      ]);

      setStats(st);
      setAdmissions(adm);
      setMessages(msgList);
      setNotices(nots);
      setEvents(evts);
      setStudents(studList);
      setTeachers(teachList);
      setGallery(galList);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const unsub = subscribeAdminAuth((u) => setAdminUser(u));
    return () => unsub();
  }, []);

  // Handle live admission status update directly from the dashboard
  const handleStatusChange = async (id: string, newStatus: 'New' | 'Contacted' | 'Closed') => {
    setStatusUpdatingId(id);
    try {
      await updateAdmissionStatus(id, newStatus);
      setAdmissions((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus, updatedAt: new Date().toISOString() } : a))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // Helper for relative timestamps
  const formatRelativeTime = (isoOrDateStr?: string): string => {
    if (!isoOrDateStr) return 'Recently';
    const date = new Date(isoOrDateStr);
    if (isNaN(date.getTime())) return isoOrDateStr;

    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSec < 60) return 'Just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Compile real recent activity from all collections
  const recentActivities = useMemo(() => {
    const list: ActivityItem[] = [];

    // 1. Admission submissions
    admissions.slice(0, 4).forEach((a) => {
      const dateObj = new Date(a.createdAt || Date.now());
      list.push({
        id: `act-adm-${a.id}`,
        type: 'admission',
        title: 'New Admission Enquiry',
        subtitle: `${a.applicantName} • ${a.enquiryType}`,
        timestamp: formatRelativeTime(a.createdAt),
        dateObj,
        link: '/admin/admissions',
      });
    });

    // 2. Student registrations
    students.slice(0, 4).forEach((s) => {
      const dateObj = new Date(s.createdAt || Date.now());
      list.push({
        id: `act-stu-${s.id}`,
        type: 'student',
        title: 'Student Account Registered',
        subtitle: `${s.name} (${s.studentId}) • ${s.className}`,
        timestamp: formatRelativeTime(s.createdAt),
        dateObj,
        link: '/admin/students',
      });
    });

    // 3. Published Notices
    notices.slice(0, 3).forEach((n) => {
      const dateObj = new Date(n.createdAt || n.date || Date.now());
      list.push({
        id: `act-not-${n.id}`,
        type: 'notice',
        title: 'Notice Published',
        subtitle: n.title,
        timestamp: formatRelativeTime(n.createdAt || n.date),
        dateObj,
        link: '/admin/notices',
      });
    });

    // 4. Events
    events.slice(0, 3).forEach((e) => {
      const dateObj = new Date(e.createdAt || e.date || Date.now());
      list.push({
        id: `act-evt-${e.id}`,
        type: 'event',
        title: 'School Event Scheduled',
        subtitle: `${e.title} • ${e.date}`,
        timestamp: formatRelativeTime(e.createdAt || e.date),
        dateObj,
        link: '/admin/events',
      });
    });

    // 5. Gallery
    gallery.slice(0, 2).forEach((g) => {
      const dateObj = new Date(g.createdAt || Date.now());
      list.push({
        id: `act-gal-${g.id}`,
        type: 'gallery',
        title: 'Gallery Media Uploaded',
        subtitle: g.title || 'Campus photography album',
        timestamp: formatRelativeTime(g.createdAt),
        dateObj,
        link: '/admin/gallery',
      });
    });

    // Sort chronologically newest first
    return list.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime()).slice(0, 7);
  }, [admissions, students, notices, events, gallery]);

  // Admission status metrics
  const admissionCounts = useMemo(() => {
    const newCount = admissions.filter((a) => a.status === 'New').length;
    const contactedCount = admissions.filter((a) => a.status === 'Contacted').length;
    const closedCount = admissions.filter((a) => a.status === 'Closed').length;
    const total = admissions.length;
    return {
      new: newCount,
      contacted: contactedCount,
      closed: closedCount,
      total,
    };
  }, [admissions]);

  // Unread contact messages count
  const unreadMessagesCount = useMemo(() => {
    return messages.filter((m) => m.status === 'Unread').length;
  }, [messages]);

  // Top 3 published notices
  const topPublishedNotices = useMemo(() => {
    return notices.filter((n) => n.published).slice(0, 3);
  }, [notices]);

  // Top 3 published upcoming events
  const topUpcomingEvents = useMemo(() => {
    return events.filter((e) => e.published).slice(0, 3);
  }, [events]);

  // 4 Primary Overview Cards
  const primaryStats = [
    {
      label: 'Total Students',
      value: stats.totalStudents,
      description: 'Active enrolled accounts',
      icon: Users,
      link: '/admin/students',
      color: 'bg-emerald-50 text-[#164e37] border-emerald-100',
    },
    {
      label: 'Total Teachers',
      value: stats.totalTeachers || teachers.length,
      description: 'Faculty & instructional staff',
      icon: GraduationCap,
      link: '/admin/teachers',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    },
    {
      label: 'Pending Admissions',
      value: admissionCounts.new,
      description: 'Enquiries awaiting review',
      icon: Inbox,
      link: '/admin/admissions',
      color: 'bg-amber-50 text-amber-700 border-amber-100',
      highlight: admissionCounts.new > 0,
    },
    {
      label: 'Upcoming Events',
      value: stats.totalEvents,
      description: 'Scheduled school programs',
      icon: Calendar,
      link: '/admin/events',
      color: 'bg-teal-50 text-teal-800 border-teal-100',
    },
  ];

  // Quick Action Buttons
  const quickActions = [
    { label: 'Add Student', link: '/admin/students', icon: UserPlus, color: 'text-emerald-700 bg-emerald-50' },
    { label: 'Add Teacher', link: '/admin/teachers', icon: GraduationCap, color: 'text-indigo-700 bg-indigo-50' },
    { label: 'Create Notice', link: '/admin/notices', icon: Bell, color: 'text-amber-700 bg-amber-50' },
    { label: 'Create Event', link: '/admin/events', icon: Calendar, color: 'text-teal-700 bg-teal-50' },
    { label: 'View Admissions', link: '/admin/admissions', icon: Inbox, color: 'text-sky-700 bg-sky-50' },
    { label: 'Upload Gallery', link: '/admin/gallery', icon: ImageIcon, color: 'text-rose-700 bg-rose-50' },
  ];

  return (
    <div className="space-y-6 sm:space-y-7 max-w-7xl mx-auto pb-10 font-sans">
      {/* 1. Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#164e37]/10 text-[#164e37] border border-[#164e37]/20 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#164e37] animate-pulse" />
                <span>Live Admin Console</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">•</span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                {todayFormatted}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              {greeting}, {adminUser?.displayName || 'Admin'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
              Manage Sharafiyya English Medium School from one place.
            </p>
          </div>

          {/* Quick Header Status & Profile Pill */}
          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center pt-2 md:pt-0">
            <Link
              to="/admin/admissions"
              className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
              title="View Admission Notifications"
            >
              <Bell className="w-4 h-4 text-[#c59b27]" />
              <span className="hidden sm:inline">Enquiries</span>
              {admissionCounts.new > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                  {admissionCounts.new}
                </span>
              )}
            </Link>

            <Link
              to="/admin/settings"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#164e37] hover:bg-[#103b29] text-white text-xs font-bold shadow-2xs transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>School Settings</span>
            </Link>
          </div>
        </div>

        {/* Subtle decorative background watermark */}
        <div className="absolute right-0 top-0 bottom-0 w-72 bg-gradient-to-l from-emerald-50/60 to-transparent pointer-events-none hidden lg:block" />
      </motion.div>

      {/* 2. Primary 4 Overview Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {primaryStats.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                to={item.link}
                className={`group block bg-white rounded-2xl p-5 border transition-all shadow-2xs hover:shadow-sm ${
                  item.highlight
                    ? 'border-amber-300 ring-1 ring-amber-200/60'
                    : 'border-slate-200/90 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      {item.label}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-900 tracking-tight">
                        {loading ? '...' : item.value}
                      </span>
                    </div>
                  </div>

                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px] truncate">
                    {item.description}
                  </span>
                  <span className="font-bold text-[#164e37] group-hover:text-emerald-950 inline-flex items-center gap-0.5 shrink-0 ml-1">
                    <span>Manage</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Compact Quick Actions Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c59b27]" />
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              Quick Administrative Actions
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Direct shortcuts to common management duties
          </span>
        </div>

        {/* Scrollable on small screens, grid on desktop */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 sm:pb-0 sm:grid sm:grid-cols-3 lg:grid-cols-6 scrollbar-none">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                to={action.link}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/80 hover:bg-[#eef6f2] border border-slate-200/80 hover:border-emerald-300 transition-all text-slate-800 hover:text-[#164e37] shrink-0 min-w-[140px] sm:min-w-0"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${action.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold leading-tight">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Data Center Summary Hub */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#0d281e] to-emerald-900 rounded-2xl border border-emerald-800/60 p-4 sm:p-5 shadow-xs text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-[#c59b27] flex items-center justify-center border border-[#c59b27]/30">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <span>Data Center Spreadsheet Hub</span>
                <span className="text-[10px] uppercase font-bold bg-[#c59b27] text-slate-950 px-2 py-0.2 rounded-full">
                  Excel Mode
                </span>
              </h2>
              <p className="text-[11px] text-emerald-200/80">
                Click any summary metric below to open its editable spreadsheet table in the Data Center
              </p>
            </div>
          </div>

          <Link
            to="/admin/data-center"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all self-start sm:self-center shrink-0"
          >
            <span>Open Data Center</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#c59b27]" />
          </Link>
        </div>

        {/* 4 Clickable Summary Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/admin/data-center?section=admissions"
            className="group p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all block"
          >
            <div className="flex items-center justify-between text-xs text-emerald-200/90 mb-1">
              <span>New Admissions</span>
              <Inbox className="w-3.5 h-3.5 text-[#c59b27]" />
            </div>
            <div className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
              {admissionCounts.new}
            </div>
            <span className="text-[10px] text-emerald-300/70 block mt-0.5">Open admissions table →</span>
          </Link>

          <Link
            to="/admin/data-center?section=messages"
            className="group p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all block"
          >
            <div className="flex items-center justify-between text-xs text-emerald-200/90 mb-1">
              <span>Unread Messages</span>
              <Mail className="w-3.5 h-3.5 text-sky-300" />
            </div>
            <div className="text-xl font-black text-white group-hover:text-sky-300 transition-colors">
              {unreadMessagesCount}
            </div>
            <span className="text-[10px] text-emerald-300/70 block mt-0.5">Open messages table →</span>
          </Link>

          <Link
            to="/admin/data-center?section=students"
            className="group p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all block"
          >
            <div className="flex items-center justify-between text-xs text-emerald-200/90 mb-1">
              <span>Total Students</span>
              <Users className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors">
              {stats.totalStudents || students.length}
            </div>
            <span className="text-[10px] text-emerald-300/70 block mt-0.5">Open students table →</span>
          </Link>

          <Link
            to="/admin/data-center?section=teachers"
            className="group p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all block"
          >
            <div className="flex items-center justify-between text-xs text-emerald-200/90 mb-1">
              <span>Total Teachers</span>
              <GraduationCap className="w-3.5 h-3.5 text-indigo-300" />
            </div>
            <div className="text-xl font-black text-white group-hover:text-indigo-300 transition-colors">
              {stats.totalTeachers || teachers.length}
            </div>
            <span className="text-[10px] text-emerald-300/70 block mt-0.5">Open teachers table →</span>
          </Link>
        </div>
      </div>

      {/* 5. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-start">
        {/* Left Column (8 of 12 cols): Admissions Overview + Notices & Events */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-7">
          {/* A. Admission Enquiries Overview */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-amber-600" />
                  <h2 className="text-base font-bold text-slate-900">
                    Admission Enquiries Overview
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Submissions received directly through the public website admission forms
                </p>
              </div>

              <Link
                to="/admin/admissions"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#164e37] hover:text-[#0f3b29] self-start sm:self-auto bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60 transition-colors"
              >
                <span>Open Admissions Inbox</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Admission Status Breakdown Pills & Bar */}
            <div className="py-4">
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-3">
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                    New Enquiries
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-amber-900 mt-0.5 block">
                    {admissionCounts.new}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-sky-50/80 border border-sky-200/70 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 block">
                    Contacted
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-sky-900 mt-0.5 block">
                    {admissionCounts.contacted}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">
                    Closed
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5 block">
                    {admissionCounts.closed}
                  </span>
                </div>
              </div>

              {/* Progress representation bar */}
              {admissionCounts.total > 0 && (
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden flex">
                  <div
                    className="bg-amber-500 h-full transition-all"
                    style={{ width: `${(admissionCounts.new / admissionCounts.total) * 100}%` }}
                    title={`New: ${admissionCounts.new}`}
                  />
                  <div
                    className="bg-sky-500 h-full transition-all"
                    style={{ width: `${(admissionCounts.contacted / admissionCounts.total) * 100}%` }}
                    title={`Contacted: ${admissionCounts.contacted}`}
                  />
                  <div
                    className="bg-slate-300 h-full transition-all"
                    style={{ width: `${(admissionCounts.closed / admissionCounts.total) * 100}%` }}
                    title={`Closed: ${admissionCounts.closed}`}
                  />
                </div>
              )}
            </div>

            {/* Recent Admissions List with Live Status Changer */}
            <div className="pt-2">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Recent Submissions
              </h3>

              {admissions.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-700">No Admission Enquiries Found</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Submissions from the website's admission forms will automatically appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {admissions.slice(0, 4).map((adm) => (
                    <div
                      key={adm.id}
                      className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {adm.applicantName}
                          </span>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              adm.status === 'New'
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : adm.status === 'Contacted'
                                ? 'bg-sky-100 text-sky-800 border border-sky-200'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {adm.status}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {formatRelativeTime(adm.createdAt)}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 truncate">
                          <strong className="text-slate-700 font-semibold">{adm.enquiryType}</strong> • Ph: {adm.phone}
                          {adm.email && ` • ${adm.email}`}
                        </p>
                        {adm.message && (
                          <p className="text-[11px] text-slate-600 italic line-clamp-1 mt-0.5">
                            "{adm.message}"
                          </p>
                        )}
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                        <select
                          value={adm.status}
                          disabled={statusUpdatingId === adm.id}
                          onChange={(e) => handleStatusChange(adm.id, e.target.value as any)}
                          className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1 font-semibold text-slate-700 focus:ring-1 focus:ring-[#164e37] focus:outline-none cursor-pointer disabled:opacity-50"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* B. Subgrid: Published Notices Preview & Upcoming Events Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Notices Preview */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#164e37]" />
                    <h2 className="text-sm font-bold text-slate-900">Latest Notices</h2>
                  </div>
                  <Link
                    to="/admin/notices"
                    className="text-xs font-bold text-[#164e37] hover:text-[#0f3b29] flex items-center gap-1"
                  >
                    <span>View all notices</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                {topPublishedNotices.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    <Bell className="w-6 h-6 text-slate-300 mx-auto mb-1.5" />
                    <span>No published notices available.</span>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {topPublishedNotices.map((n) => (
                      <div
                        key={n.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-emerald-200 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                            {n.category}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{n.date}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{n.title}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{n.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4">
                <Link
                  to="/admin/notices"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/80 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-[#164e37]" />
                  <span>Create New Circular</span>
                </Link>
              </div>
            </div>

            {/* Events Preview */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#c59b27]" />
                    <h2 className="text-sm font-bold text-slate-900">Upcoming Events</h2>
                  </div>
                  <Link
                    to="/admin/events"
                    className="text-xs font-bold text-[#164e37] hover:text-[#0f3b29] flex items-center gap-1"
                  >
                    <span>View all events</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                {topUpcomingEvents.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    <Calendar className="w-6 h-6 text-slate-300 mx-auto mb-1.5" />
                    <span>No upcoming events scheduled.</span>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {topUpcomingEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-emerald-200 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-900 border border-teal-200">
                            {ev.category || 'Event'}
                          </span>
                          {ev.featured && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900">
                              Featured
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-slate-400 ml-auto">{ev.date}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{ev.title}</h4>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{ev.location || 'School Campus'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4">
                <Link
                  to="/admin/events"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/80 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-[#164e37]" />
                  <span>Schedule Event</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 of 12 cols): Recent Activity + Institutional Info */}
        <div className="lg:col-span-4 space-y-6 sm:space-y-7">
          {/* Recent Activity Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#164e37]" />
                <h2 className="text-sm font-bold text-slate-900">Recent Activity</h2>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Real-time updates" />
            </div>

            {recentActivities.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-400">
                <Clock className="w-7 h-7 text-slate-300 mx-auto mb-2" />
                <p className="font-semibold text-slate-700 text-xs">No Recent Activity</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Administrative changes and public form submissions will be tracked here.
                </p>
              </div>
            ) : (
              <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {recentActivities.map((act) => {
                  return (
                    <Link
                      key={act.id}
                      to={act.link}
                      className="group block relative text-xs hover:bg-slate-50/80 p-1.5 -ml-1.5 rounded-lg transition-colors"
                    >
                      {/* Marker dot */}
                      <span className="absolute -left-[17px] top-2.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#164e37] group-hover:scale-110 transition-transform" />

                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-slate-800 group-hover:text-[#164e37] line-clamp-1">
                          {act.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {act.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {act.subtitle}
                      </p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Institutional Overview Card */}
          <div className="bg-[#0f231c] text-white rounded-2xl p-5 border border-[#1a4434] shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#c59b27]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#c59b27]">
                Backend Infrastructure
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connected to Firebase Cloud Firestore and Authentication with resilient fallback storage.
            </p>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200/90 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All systems operational</span>
              </span>
              <Link to="/admin/settings" className="hover:text-white font-bold flex items-center gap-1">
                <span>Settings</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
