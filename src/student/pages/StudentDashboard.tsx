import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  GraduationCap,
  BookOpen,
  Bell,
  Calendar,
  FileText,
  KeyRound,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Download,
} from 'lucide-react';
import {
  subscribeStudentAuth,
  logoutStudent,
  changeStudentPassword,
  type AuthSessionUser,
} from '../../services/authService';
import {
  getStudentProfile,
  getStudentAcademicRecords,
  getStudentAnnouncements,
  getStudentEvents,
} from '../../services/studentService';
import type {
  StudentDocument,
  AcademicRecord,
  NoticeItem,
  EventItem,
} from '../../types/firestore';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthSessionUser | null>(null);
  const [profile, setProfile] = useState<StudentDocument | null>(null);
  const [academics, setAcademics] = useState<AcademicRecord[]>([]);
  const [announcements, setAnnouncements] = useState<NoticeItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'profile' | 'academics' | 'announcements' | 'events' | 'documents' | 'account'
  >('profile');

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState<string | null>(null);
  const [pwdError, setPwdError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeStudentAuth(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setLoading(true);
        try {
          const [prof, acd, ann, evts] = await Promise.all([
            getStudentProfile(currentUser.uid, currentUser.studentId),
            getStudentAcademicRecords(currentUser.uid),
            getStudentAnnouncements(),
            getStudentEvents(),
          ]);
          setProfile(prof);
          setAcademics(acd);
          setAnnouncements(ann);
          setEvents(evts);
        } catch (err) {
          console.error('[StudentDashboard] Error fetching student records:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await logoutStudent();
    navigate('/student/login');
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdSuccess(null);
    setPwdError(null);

    if (newPassword.length < 6) {
      setPwdError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdError('Passwords do not match.');
      return;
    }

    setPwdLoading(true);
    try {
      await changeStudentPassword(newPassword);
      setPwdSuccess('Your password has been changed successfully.');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPwdError(err.message || 'Failed to update password.');
    } finally {
      setPwdLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8">
        <Loader2 className="w-8 h-8 text-[#164e37] animate-spin mb-3" />
        <p className="text-xs font-semibold text-slate-500">Loading your private student workspace...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'academics', label: 'Academic Information', icon: GraduationCap },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'account', label: 'Account', icon: KeyRound },
  ] as const;

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* ── Welcome Banner ────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#0f231c] via-[#164e37] to-[#0f231c] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#1b5038] relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {profile?.profileImage ? (
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#c59b27]/80 shadow-sm shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-[#091f17] border border-[#c59b27]/70 flex items-center justify-center text-[#c59b27] font-black text-2xl shrink-0 shadow-sm">
                {(profile?.name || user?.displayName || 'S').charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#c59b27]/20 text-amber-300 border border-[#c59b27]/40 uppercase tracking-wider">
                  Enrolled Student
                </span>
                <span className="text-xs text-emerald-200/80 font-mono">
                  {profile?.academicYear || '2025–2026'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white truncate">
                {profile?.name || user?.displayName || 'Enrolled Student'}
              </h1>
              <p className="text-xs text-emerald-100/80 mt-0.5">
                Student ID: <strong className="font-mono text-amber-300">{profile?.studentId || user?.studentId || 'SK-2025-001'}</strong>
                {profile?.section && ` · ${profile.section}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Navigation Tabs ───────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#e5e0d5] p-1.5 shadow-2xs overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#164e37] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#164e37] hover:bg-[#f4f9f6]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#c59b27]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tab Panels ────────────────────────────────────────────── */}

      {/* 1. MY PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-[#e5e0d5] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#f0ece3]">
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#0f231c]">Personal Enrollment Profile</h2>
              <p className="text-xs text-slate-500 mt-0.5">Verified details on record with Sharafiyya English Medium School</p>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>{profile?.accountStatus || 'Active'}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-4 rounded-2xl bg-[#fcfbf9] border border-[#eee9df]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Full Name
              </span>
              <p className="text-sm font-extrabold text-[#0f231c]">{profile?.name || user?.displayName || '—'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fcfbf9] border border-[#eee9df]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Student Admission ID
              </span>
              <p className="text-sm font-mono font-extrabold text-[#164e37]">{profile?.studentId || user?.studentId || '—'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fcfbf9] border border-[#eee9df]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Enrolled Class
              </span>
              <p className="text-sm font-extrabold text-[#0f231c]">{profile?.className || 'Class 5 - Intermediate'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fcfbf9] border border-[#eee9df]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Class Section
              </span>
              <p className="text-sm font-extrabold text-[#0f231c]">{profile?.section || 'Section A'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fcfbf9] border border-[#eee9df]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Department / Stream
              </span>
              <p className="text-sm font-extrabold text-[#0f231c]">{profile?.department || 'Qur’an & Tajweed'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fcfbf9] border border-[#eee9df]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Academic Year
              </span>
              <p className="text-sm font-extrabold text-[#0f231c]">{profile?.academicYear || '2025–2026'}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#eef6f2] border border-[#d2e5da] text-xs text-[#164e37] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 shrink-0 text-[#164e37] mt-0.5" />
            <div>
              <strong className="block font-bold">Privacy & Security Guard</strong>
              <span className="text-[11px] leading-relaxed">
                Your profile and records are tied to your unique authenticated account ID ({user?.uid}). Only authorized administrators can update academic classifications.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. ACADEMIC INFORMATION */}
      {activeTab === 'academics' && (
        <div className="bg-white rounded-3xl border border-[#e5e0d5] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-4 border-b border-[#f0ece3]">
            <h2 className="text-base sm:text-lg font-black text-[#0f231c]">Academic Records & Curriculum</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Current enrolled syllabus: <strong>{profile?.className || 'Class 5'}</strong> ({profile?.department || 'General'})
            </p>
          </div>

          {academics.length > 0 ? (
            <div className="space-y-4">
              {academics.map((record) => (
                <div key={record.id} className="p-5 rounded-2xl border border-[#e5e0d5] bg-[#fcfbf9] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-[#0f231c]">{record.term}</h3>
                      <span className="text-xs text-slate-500">{record.academicYear}</span>
                    </div>
                    <span className="text-sm font-black px-3 py-1 bg-[#164e37] text-white rounded-xl">
                      {record.overallGrade}
                    </span>
                  </div>

                  {record.subjects && record.subjects.length > 0 && (
                    <div className="border-t border-[#eee9df] pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {record.subjects.map((sub, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-white rounded-xl text-xs border border-[#eee9df]">
                          <span className="font-semibold text-slate-700">{sub.name}</span>
                          <span className="font-bold text-[#164e37]">{sub.obtainedMarks} / {sub.maxMarks} ({sub.grade})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center space-y-3 bg-[#fcfbf9] rounded-2xl border border-[#eee9df] p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#eef6f2] text-[#164e37] flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-[#0f231c]">Academic Evaluations in Progress</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Official marks and evaluation statements for the ongoing term have not yet been published by the academic board. Only verified records from the school database are shown here.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="bg-white rounded-3xl border border-[#e5e0d5] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-4 border-b border-[#f0ece3]">
            <h2 className="text-base sm:text-lg font-black text-[#0f231c]">School Announcements & Circulars</h2>
            <p className="text-xs text-slate-500 mt-0.5">Notices released for students and guardians</p>
          </div>

          {announcements.length > 0 ? (
            <div className="space-y-3">
              {announcements.map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 sm:p-5 rounded-2xl border border-[#e5e0d5] hover:border-[#164e37]/40 bg-[#fcfbf9] transition-all space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {notice.category || 'Notice'}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{notice.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0f231c]">{notice.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{notice.description || notice.fullContent}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center space-y-2 bg-[#fcfbf9] rounded-2xl border border-[#eee9df] p-6">
              <Bell className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-700">No New Announcements</h3>
              <p className="text-xs text-slate-500">You are completely up to date with all circulars.</p>
            </div>
          )}
        </div>
      )}

      {/* 4. EVENTS */}
      {activeTab === 'events' && (
        <div className="bg-white rounded-3xl border border-[#e5e0d5] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-4 border-b border-[#f0ece3]">
            <h2 className="text-base sm:text-lg font-black text-[#0f231c]">Upcoming School Events</h2>
            <p className="text-xs text-slate-500 mt-0.5">Programmes and important calendar dates</p>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-5 rounded-2xl border border-[#e5e0d5] bg-[#fcfbf9] space-y-2.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                        {evt.category || 'Event'}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{evt.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#0f231c]">{evt.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{evt.description}</p>
                  </div>
                  {evt.location && (
                    <p className="text-[11px] text-slate-500 pt-2 border-t border-[#eee9df]">
                      📍 Location: <strong>{evt.location}</strong>
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center space-y-2 bg-[#fcfbf9] rounded-2xl border border-[#eee9df] p-6">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-700">No Upcoming Events</h3>
              <p className="text-xs text-slate-500">Upcoming calendar events will be listed here.</p>
            </div>
          )}
        </div>
      )}

      {/* 5. DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-3xl border border-[#e5e0d5] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-4 border-b border-[#f0ece3]">
            <h2 className="text-base sm:text-lg font-black text-[#0f231c]">Student Documents & Records</h2>
            <p className="text-xs text-slate-500 mt-0.5">Certificates, enrollment records, and official files</p>
          </div>

          {profile?.documents && profile.documents.length > 0 ? (
            <div className="space-y-3">
              {profile.documents.map((docItem) => (
                <div
                  key={docItem.id}
                  className="flex items-center justify-between p-4 rounded-2xl border border-[#e5e0d5] bg-[#fcfbf9] hover:bg-white transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#164e37]/10 text-[#164e37] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#0f231c] truncate">{docItem.title}</h3>
                      <p className="text-[11px] text-slate-400">Uploaded {docItem.uploadedAt}</p>
                    </div>
                  </div>

                  <a
                    href={docItem.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold rounded-xl shadow-2xs transition-colors shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center space-y-3 bg-[#fcfbf9] rounded-2xl border border-[#eee9df] p-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">No Documents Uploaded</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Official certificates, evaluation dossiers, or fee receipts uploaded by the school administration will appear here securely.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 6. ACCOUNT */}
      {activeTab === 'account' && (
        <div className="bg-white rounded-3xl border border-[#e5e0d5] p-6 sm:p-8 shadow-xs space-y-6 max-w-2xl">
          <div className="pb-4 border-b border-[#f0ece3]">
            <h2 className="text-base sm:text-lg font-black text-[#0f231c]">Account Security & Settings</h2>
            <p className="text-xs text-slate-500 mt-0.5">Manage your student credentials and portal session</p>
          </div>

          {/* Change Password Form */}
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#164e37]" />
              <span>Change Portal Password</span>
            </h3>

            {pwdSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{pwdSuccess}</span>
              </div>
            )}

            {pwdError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{pwdError}</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                New Password (Minimum 6 characters)
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-[#fcfbf9] border border-[#d8d3c5] rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#164e37] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-[#fcfbf9] border border-[#d8d3c5] rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#164e37] focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={pwdLoading}
              className="px-5 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {pwdLoading ? 'Updating Password...' : 'Save New Password'}
            </button>
          </form>

          {/* Sign Out Section */}
          <div className="pt-6 border-t border-[#f0ece3] flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-800">Sign Out of Session</h4>
              <p className="text-[11px] text-slate-500">Always sign out when using a shared family or campus device.</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
