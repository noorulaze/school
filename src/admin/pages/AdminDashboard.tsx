import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Bell,
  Calendar,
  GraduationCap,
  BookOpen,
  Inbox,
  ArrowUpRight,
  UserPlus,
  PlusCircle,
  CheckCircle2
} from 'lucide-react';
import {
  getDashboardStats,
  getAdmissionsAdmin,
  updateAdmissionStatus,
  getNoticesAdmin,
  getEventsAdmin
} from '../../services/adminService';
import type { DashboardStats, AdmissionEnquiry, NoticeItem, EventItem } from '../../types/firestore';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalNotices: 0,
    totalEvents: 0,
    totalTeachers: 0,
    totalDepartments: 0,
    totalGallery: 0,
    totalStudents: 0,
    newAdmissions: 0,
  });
  const [recentAdmissions, setRecentAdmissions] = useState<AdmissionEnquiry[]>([]);
  const [recentNotices, setRecentNotices] = useState<NoticeItem[]>([]);
  const [recentEvents, setRecentEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [st, adm, nots, evts] = await Promise.all([
        getDashboardStats(),
        getAdmissionsAdmin(),
        getNoticesAdmin(),
        getEventsAdmin(),
      ]);
      setStats(st);
      setRecentAdmissions(adm.slice(0, 5));
      setRecentNotices(nots.slice(0, 3));
      setRecentEvents(evts.slice(0, 3));
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'New' | 'Contacted' | 'Closed') => {
    await updateAdmissionStatus(id, newStatus);
    loadData();
  };

  const statCards = [
    {
      label: 'Enrolled Students',
      value: stats.totalStudents,
      icon: Users,
      link: '/admin/students',
      color: 'from-emerald-800 to-[#164e37]',
      accent: 'text-emerald-300',
    },
    {
      label: 'New Admissions',
      value: stats.newAdmissions,
      icon: Inbox,
      link: '/admin/admissions',
      color: 'from-amber-600 to-amber-700',
      accent: 'text-amber-200',
    },
    {
      label: 'Published Notices',
      value: stats.totalNotices,
      icon: Bell,
      link: '/admin/notices',
      color: 'from-sky-700 to-sky-900',
      accent: 'text-sky-300',
    },
    {
      label: 'Upcoming Events',
      value: stats.totalEvents,
      icon: Calendar,
      link: '/admin/events',
      color: 'from-teal-700 to-teal-900',
      accent: 'text-teal-300',
    },
    {
      label: 'Faculty & Teachers',
      value: stats.totalTeachers,
      icon: GraduationCap,
      link: '/admin/teachers',
      color: 'from-indigo-700 to-indigo-900',
      accent: 'text-indigo-300',
    },
    {
      label: 'Academic Departments',
      value: stats.totalDepartments,
      icon: BookOpen,
      link: '/admin/departments',
      color: 'from-emerald-900 to-slate-900',
      accent: 'text-emerald-200',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0d281e] via-[#164e37] to-[#0d281e] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-[#1a4434]">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#c59b27]/20 text-[#c59b27] border border-[#c59b27]/40 mb-3">
            Administration Portal Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Sharaful Islam Madrassa Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
            Welcome to the centralized administration management portal. Monitor real-time student records, publish official notices, organize upcoming events, and review admission enquiries.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/admin/students"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c59b27] hover:bg-[#b0881e] text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Manage Students</span>
            </Link>
            <Link
              to="/admin/notices"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl backdrop-blur-xs transition-all border border-white/15"
            >
              <PlusCircle className="w-4 h-4 text-[#c59b27]" />
              <span>Publish Notice</span>
            </Link>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-[#c59b27]/10 to-transparent pointer-events-none hidden md:block" />
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.link}
              className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all hover:border-emerald-300 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">
                    {card.label}
                  </span>
                  <span className="text-3xl font-black text-slate-900 tracking-tight block">
                    {loading ? '...' : card.value}
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-xs`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-950">
                <span>View and manage</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Admissions Enquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enquiries Preview (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Admission Enquiries</h2>
              <p className="text-xs text-slate-500">Live submissions received from the public website</p>
            </div>
            <Link
              to="/admin/admissions"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentAdmissions.length === 0 ? (
            <div className="text-center py-10 px-4">
              <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No Admission Enquiries Yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Submissions from the website's admission forms will automatically appear in this inbox.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAdmissions.map((adm) => (
                <div
                  key={adm.id}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {adm.applicantName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          adm.status === 'New'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : adm.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {adm.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      <strong className="text-slate-700">Type:</strong> {adm.enquiryType} • <strong className="text-slate-700">Phone:</strong> {adm.phone}
                    </p>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1 italic">
                      "{adm.message}"
                    </p>
                  </div>

                  {/* Status Toggle Quick Dropdown */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <select
                      value={adm.status}
                      onChange={(e) => handleStatusChange(adm.id, e.target.value as any)}
                      className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1 font-medium text-slate-700 focus:ring-1 focus:ring-emerald-700 focus:outline-hidden"
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

        {/* Quick Operations & System Health (1 Col) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-1">Quick Actions</h2>
            <p className="text-xs text-slate-500 mb-4">Direct shortcuts to common management duties</p>

            <div className="space-y-2.5">
              <Link
                to="/admin/students"
                className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 text-emerald-950 hover:bg-emerald-100 font-semibold text-xs transition-colors border border-emerald-200/50"
              >
                <UserPlus className="w-4 h-4 text-emerald-700" />
                <span>Add / Manage Student Records</span>
              </Link>
              <Link
                to="/admin/notices"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-800 hover:bg-slate-100 font-semibold text-xs transition-colors border border-slate-200"
              >
                <Bell className="w-4 h-4 text-[#c59b27]" />
                <span>Post Official Madrassa Notice</span>
              </Link>
              <Link
                to="/admin/events"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-800 hover:bg-slate-100 font-semibold text-xs transition-colors border border-slate-200"
              >
                <Calendar className="w-4 h-4 text-[#164e37]" />
                <span>Schedule Academic or Public Event</span>
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-800 hover:bg-slate-100 font-semibold text-xs transition-colors border border-slate-200"
              >
                <BookOpen className="w-4 h-4 text-slate-600" />
                <span>Edit Madrassa Office Details</span>
              </Link>
            </div>
          </div>

          {/* Database Status */}
          <div className="bg-[#0d281e] text-white rounded-2xl p-5 border border-[#1a4434] shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#c59b27]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#c59b27]">
                Backend Infrastructure
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connected to Firebase Cloud Firestore and Authentication with resilient fallback storage.
            </p>
          </div>
        </div>
      </div>

      {/* Notices & Events Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Circulars */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#164e37]" />
              <h2 className="text-base font-bold text-slate-900">Latest Circulars & Notices</h2>
            </div>
            <Link
              to="/admin/notices"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>Manage Notices</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentNotices.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">No notices logged yet.</p>
          ) : (
            <div className="space-y-3">
              {recentNotices.map((n) => (
                <div
                  key={n.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {n.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        n.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {n.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{n.date}</span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{n.title}</h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{n.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#c59b27]" />
              <h2 className="text-base font-bold text-slate-900">Upcoming Events & Milestones</h2>
            </div>
            <Link
              to="/admin/events"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>Manage Events</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentEvents.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">No events scheduled yet.</p>
          ) : (
            <div className="space-y-3">
              {recentEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {ev.category || 'Event'}
                      </span>
                      {ev.featured && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                          Featured
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-slate-500">{ev.date}</span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{ev.title}</h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{ev.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
