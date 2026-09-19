import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Bell,
  CheckSquare,
  Award,
  ArrowUpRight,
  Info,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { subscribeStudentAuth, type AuthSessionUser } from '../../services/authService';
import {
  getStudentProfile,
  getStudentAttendance,
  getStudentAcademicRecords,
  getStudentNotices,
  getStudentEvents
} from '../../services/studentService';
import type {
  StudentDocument,
  AttendanceRecord,
  AcademicRecord,
  NoticeItem,
  EventItem
} from '../../types/firestore';

export const StudentDashboard: React.FC = () => {
  const [user, setUser] = useState<AuthSessionUser | null>(null);
  const [profile, setProfile] = useState<StudentDocument | null>(null);
  const [attendance, setAttendance] = useState<AttendanceRecord | null>(null);
  const [academics, setAcademics] = useState<AcademicRecord[]>([]);
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeStudentAuth(async (u) => {
      setUser(u);
      if (u) {
        setLoading(true);
        try {
          const [p, att, acd, ntc, evts] = await Promise.all([
            getStudentProfile(u.uid, u.studentId),
            getStudentAttendance(u.uid),
            getStudentAcademicRecords(u.uid),
            getStudentNotices(),
            getStudentEvents(),
          ]);
          setProfile(p);
          setAttendance(att);
          setAcademics(acd);
          setNotices(ntc.slice(0, 3));
          setEvents(evts.slice(0, 2));
        } catch (err) {
          console.error('Failed to load student dashboard:', err);
        } finally {
          setLoading(false);
        }
      }
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <Loader2 className="w-8 h-8 text-emerald-800 animate-spin mx-auto mb-2" />
        <p className="text-xs text-slate-500">Loading student workspace...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Student Welcome Header Card */}
      <div className="bg-gradient-to-r from-[#091f17] via-[#164e37] to-[#091f17] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-[#14392b]">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#c59b27]/20 text-[#c59b27] border border-[#c59b27]/40">
                Active Student Enrollment
              </span>
              <span className="text-xs text-emerald-300/80 font-mono">
                {profile?.academicYear || '2025–2026 Batch'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Assalamu Alaikum, {profile?.name || user?.displayName || 'Student'}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-emerald-100/90 font-medium">
              <span>
                Student ID: <strong className="font-mono text-white">{profile?.studentId || user?.studentId || 'SK-2025-001'}</strong>
              </span>
              <span>•</span>
              <span>{profile?.className || 'Class 5 - Intermediate'}</span>
              <span>•</span>
              <span>{profile?.department || 'Qur’an & Tajweed'}</span>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <Link
              to="/student/profile"
              className="px-4 py-2 bg-[#c59b27] hover:bg-[#b0881e] text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all text-center"
            >
              View Full Profile
            </Link>
          </div>
        </div>

        {/* Subtle decorative glow */}
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#c59b27]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Grid of Academic Records & Attendance (AUTHENTIC EMPTY STATES) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <CheckSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Attendance Record</h3>
                  <span className="text-[10px] text-slate-400">Current Academic Term</span>
                </div>
              </div>
              <Link
                to="/student/attendance"
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-0.5"
              >
                <span>Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Authentic Display (No fake numbers) */}
            {attendance ? (
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-900">{attendance.percentage}%</span>
                  <span className="text-xs text-slate-500">
                    {attendance.presentDays} / {attendance.totalDays} Days Attended
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
                <Info className="w-6 h-6 text-slate-400 mx-auto" />
                <h4 className="text-xs font-bold text-slate-800">Attendance Records Under Compilation</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Official attendance sheets for the ongoing academic term are being compiled by the class ustad. Check back soon or request a status statement from the administration desk.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Status: Enrolled & Regular</span>
            <span className="font-mono text-emerald-800 font-semibold">Academic Batch 2025–2026</span>
          </div>
        </div>

        {/* Academic Evaluations Widget */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Academic Progress</h3>
                  <span className="text-[10px] text-slate-400">Evaluation Marks & Reports</span>
                </div>
              </div>
              <Link
                to="/student/academics"
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-0.5"
              >
                <span>Reports</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Authentic Display (No fake grades) */}
            {academics.length > 0 ? (
              <div className="space-y-2">
                {academics.map((rec) => (
                  <div key={rec.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl text-xs">
                    <span className="font-semibold text-slate-800">{rec.term}</span>
                    <span className="font-bold text-emerald-800">{rec.overallGrade}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
                <ShieldCheck className="w-6 h-6 text-slate-400 mx-auto" />
                <h4 className="text-xs font-bold text-slate-800">Evaluations Scheduled for Release</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Quarterly assessment marks and recitation grading will be published on your portal following review and verification by the Madrassa Academic Board.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Curriculum Board: Sharaful Islam</span>
            <span className="text-emerald-800 font-semibold">Semester in Progress</span>
          </div>
        </div>
      </div>

      {/* Announcements & Upcoming Madrassa Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notices */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#c59b27]" />
              <h3 className="text-sm font-bold text-slate-900">Madrassa Announcements</h3>
            </div>
            <Link
              to="/student/notices"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {notices.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">No current announcements.</p>
          ) : (
            <div className="space-y-3">
              {notices.map((n) => (
                <div
                  key={n.id}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span className="font-bold text-emerald-800 uppercase tracking-wider">
                      {n.category}
                    </span>
                    <span>{n.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{n.title}</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">{n.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Events */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#164e37]" />
              <h3 className="text-sm font-bold text-slate-900">Upcoming Events & Gatherings</h3>
            </div>
            <Link
              to="/student/events"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {events.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">No upcoming events scheduled.</p>
          ) : (
            <div className="space-y-3">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span className="font-bold text-teal-800">{ev.category || 'Madrassa Event'}</span>
                    <span>{ev.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{ev.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Location: {ev.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
