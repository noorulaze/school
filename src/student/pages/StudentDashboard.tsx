import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  GraduationCap,
  BookOpen,
  Bell,
  Calendar,
  FileText,
  Settings,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Lock,
  Copy,
  Check,
  Clock
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
  getStudentAttendance,
  updateStudentUsername,
  updateStudentPersonalInfo,
  completeFirstLogin,
} from '../../services/studentService';
import type {
  StudentDocument,
  AcademicRecord,
  NoticeItem,
  EventItem,
  AttendanceRecord,
} from '../../types/firestore';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthSessionUser | null>(null);
  const [profile, setProfile] = useState<StudentDocument | null>(null);
  const [academics, setAcademics] = useState<AcademicRecord[]>([]);
  const [announcements, setAnnouncements] = useState<NoticeItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord | null>(null);
  const [loading, setLoading] = useState(true);

  // Active Tab (8 modern academic sections)
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'profile' | 'academics' | 'subjects' | 'notices' | 'events' | 'documents' | 'account'
  >('dashboard');

  // First Login / Password Setup Modal
  const [showFirstLoginModal, setShowFirstLoginModal] = useState(false);
  const [firstLoginPass, setFirstLoginPass] = useState('');
  const [firstLoginConfirm, setFirstLoginConfirm] = useState('');
  const [firstLoginError, setFirstLoginError] = useState<string | null>(null);
  const [firstLoginLoading, setFirstLoginLoading] = useState(false);

  // Account Settings Forms state
  const [customUsername, setCustomUsername] = useState('');
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameSuccess, setUsernameSuccess] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  // Personal Info Form
  const [personalPhone, setPersonalPhone] = useState('');
  const [personalAddress, setPersonalAddress] = useState('');
  const [personalEmergency, setPersonalEmergency] = useState('');
  const [personalBlood, setPersonalBlood] = useState('');
  const [personalBio, setPersonalBio] = useState('');
  const [infoLoading, setInfoLoading] = useState(false);
  const [infoSuccess, setInfoSuccess] = useState<string | null>(null);
  const [infoError, setInfoError] = useState<string | null>(null);

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState<string | null>(null);
  const [pwdError, setPwdError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    const unsub = subscribeStudentAuth(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setLoading(true);
        try {
          const [prof, acd, ann, evts, att] = await Promise.all([
            getStudentProfile(currentUser.uid, currentUser.studentId),
            getStudentAcademicRecords(currentUser.uid),
            getStudentAnnouncements(),
            getStudentEvents(),
            getStudentAttendance(currentUser.uid),
          ]);
          setProfile(prof);
          setAcademics(acd);
          setAnnouncements(ann);
          setEvents(evts);
          setAttendance(att);

          if (prof) {
            setCustomUsername(prof.username || '');
            setPersonalPhone(prof.phone || '');
            setPersonalAddress(prof.address || '');
            setPersonalEmergency(prof.emergencyContact || '');
            setPersonalBlood(prof.bloodGroup || '');
            setPersonalBio(prof.bio || '');

            if (prof.firstLogin || prof.mustChangePassword || currentUser.mustChangePassword) {
              setShowFirstLoginModal(true);
            }
          }
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

  // First Login Completion
  const handleCompleteFirstLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFirstLoginError(null);
    if (firstLoginPass.length < 6) {
      setFirstLoginError('Password must be at least 6 characters long.');
      return;
    }
    if (firstLoginPass !== firstLoginConfirm) {
      setFirstLoginError('Passwords do not match.');
      return;
    }

    setFirstLoginLoading(true);
    try {
      if (profile) {
        await completeFirstLogin(profile.uid, firstLoginPass);
        setShowFirstLoginModal(false);
        setProfile({ ...profile, firstLogin: false, mustChangePassword: false });
      }
    } catch (err: any) {
      setFirstLoginError(err.message || 'Failed to set password.');
    } finally {
      setFirstLoginLoading(false);
    }
  };

  // Username Update
  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameSuccess(null);
    setUsernameError(null);
    setUsernameLoading(true);
    try {
      if (profile) {
        const res = await updateStudentUsername(profile.uid, customUsername);
        setUsernameSuccess(`Custom username updated to "${res.username}". You can now sign in using either this username or your permanent Student ID.`);
        setProfile({ ...profile, username: res.username });
      }
    } catch (err: any) {
      setUsernameError(err.message || 'Failed to update username.');
    } finally {
      setUsernameLoading(false);
    }
  };

  // Personal Info Update
  const handleUpdatePersonalInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfoSuccess(null);
    setInfoError(null);
    setInfoLoading(true);
    try {
      if (profile) {
        const updated = await updateStudentPersonalInfo(profile.uid, {
          phone: personalPhone,
          address: personalAddress,
          emergencyContact: personalEmergency,
          bloodGroup: personalBlood,
          bio: personalBio,
        });
        setProfile(updated);
        setInfoSuccess('Personal contact and emergency information updated successfully.');
      }
    } catch (err: any) {
      setInfoError(err.message || 'Failed to update information.');
    } finally {
      setInfoLoading(false);
    }
  };

  // Password Change
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
      if (profile) {
        await completeFirstLogin(profile.uid, newPassword);
      } else {
        await changeStudentPassword(newPassword);
      }
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
        <Loader2 className="w-8 h-8 text-[#0e3827] animate-spin mb-3" />
        <p className="text-xs font-semibold text-slate-500">Loading student workspace...</p>
      </div>
    );
  }

  // 8 Modern Academic Tabs
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'academics', label: 'Academic Information', icon: GraduationCap },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'notices', label: 'Notices', icon: Bell },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'account', label: 'Account Settings', icon: Settings },
  ] as const;

  const effectiveStudentId = profile?.studentId || user?.studentId || 'SK-2025-001';

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* ── First Login / Password Setup Mandatory Modal ────────── */}
      {showFirstLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="p-6 bg-[#0e3827] text-white text-center relative border-b border-[#164e37]">
              <div className="w-12 h-12 rounded-2xl bg-[#164e37] border border-[#c59b27]/60 flex items-center justify-center mx-auto mb-3 text-[#c59b27]">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-black text-white">Complete Your Account Setup</h2>
              <p className="text-xs text-emerald-200/90 mt-1">
                Welcome to Sharafiyya English Medium School. Please set your private password to activate your portal workspace.
              </p>
            </div>

            <form onSubmit={handleCompleteFirstLogin} className="p-6 space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Permanent Student ID
                </span>
                <span className="font-mono font-black text-emerald-950 text-sm">
                  {effectiveStudentId}
                </span>
              </div>

              {firstLoginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{firstLoginError}</span>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Create New Password *
                </label>
                <input
                  type="password"
                  required
                  value={firstLoginPass}
                  onChange={(e) => setFirstLoginPass(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e3827]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  value={firstLoginConfirm}
                  onChange={(e) => setFirstLoginConfirm(e.target.value)}
                  placeholder="Re-type your password"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e3827]"
                />
              </div>

              <button
                type="submit"
                disabled={firstLoginLoading || firstLoginPass.length < 6}
                className="w-full py-3 bg-[#0e3827] hover:bg-[#164e37] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {firstLoginLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#c59b27]" />
                    <span>Securing Account...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#c59b27]" />
                    <span>Activate Account & Enter Dashboard</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Welcome Banner ────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#091f17] via-[#0e3827] to-[#164e37] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-[#1b5038] relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0e3827] border-2 border-[#c59b27]/80 flex items-center justify-center text-[#c59b27] font-black text-2xl shrink-0 shadow-md">
              {(profile?.name || user?.displayName || 'S').charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#c59b27]/20 text-amber-300 border border-[#c59b27]/40 uppercase tracking-wider">
                  Sharafiyya Student
                </span>
                <span className="text-xs text-emerald-200/90 font-mono">
                  {profile?.academicYear || '2025–2026'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white truncate">
                {profile?.name || user?.displayName || 'Enrolled Student'}
              </h1>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                Student ID: <strong className="font-mono text-amber-300">{effectiveStudentId}</strong>
                {profile?.className && ` · ${profile.className}`}
                {profile?.section && ` (${profile.section})`}
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

      {/* ── 8 Navigation Tabs ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-1.5 shadow-2xs overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#0e3827] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0e3827] hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#c59b27]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TAB PANELS ────────────────────────────────────────────── */}

      {/* 1. DASHBOARD OVERVIEW */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Permanent ID
              </span>
              <span className="font-mono text-lg font-black text-[#0e3827] block truncate">
                {effectiveStudentId}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block">Assigned Unique Code</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Account Status
              </span>
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-base">
                <CheckCircle2 className="w-4 h-4" />
                <span>{profile?.accountStatus || 'Active'}</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Verified Enrollment</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Attendance Log
              </span>
              <span className="text-lg font-black text-slate-800 block">
                {attendance ? `${attendance.percentage}%` : 'Recorded Daily'}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block">Session Verification</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Official Notices
              </span>
              <span className="text-lg font-black text-slate-800 block">
                {announcements.length}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block">Active Bulletins</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Profile Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#0e3827]" />
                  <span>Academic Standing</span>
                </h3>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {profile?.className || 'Class 5'}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Student Name</span>
                  <span className="font-bold text-slate-900">{profile?.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Department</span>
                  <span className="font-semibold text-slate-800">{profile?.department || 'General'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Class Section</span>
                  <span className="font-semibold text-slate-800">{profile?.section || 'Section A'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Custom Username</span>
                  <span className="font-mono text-slate-700">{profile?.username || 'Not configured'}</span>
                </div>
              </div>
            </div>

            {/* Recent School Notices */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#0e3827]" />
                  <span>Important Notices</span>
                </h3>
                <button
                  onClick={() => setActiveTab('notices')}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-bold"
                >
                  View All
                </button>
              </div>
              {announcements.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No announcements published for students at this time.
                </div>
              ) : (
                <div className="space-y-3">
                  {announcements.slice(0, 3).map((notice) => (
                    <div key={notice.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                      <div className="flex justify-between font-bold text-slate-900 mb-1">
                        <span>{notice.title}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{notice.date}</span>
                      </div>
                      <p className="text-slate-600 line-clamp-2">{notice.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. MY PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">Personal Enrollment Profile</h2>
              <p className="text-xs text-slate-500 mt-0.5">Verified details on record with Sharafiyya English Medium School</p>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>{profile?.accountStatus || 'Active'}</span>
            </span>
          </div>

          {/* Read-Only Permanent Student ID Badge */}
          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0e3827] text-[#c59b27] flex items-center justify-center font-black">
                ID
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">
                  Permanent Student ID (Non-Modifiable)
                </span>
                <span className="font-mono text-base font-black text-emerald-950">
                  {effectiveStudentId}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(effectiveStudentId);
                setCopiedId(true);
                setTimeout(() => setCopiedId(false), 2000);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-800 hover:bg-emerald-100/50 transition-colors cursor-pointer self-start sm:self-auto"
            >
              {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
              <span>{copiedId ? 'Copied' : 'Copy ID'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Full Student Name
              </span>
              <p className="text-sm font-extrabold text-slate-900">{profile?.name || user?.displayName || '—'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Enrolled Class
              </span>
              <p className="text-sm font-extrabold text-slate-900">{profile?.className || 'Class 5 - Intermediate'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Class Section
              </span>
              <p className="text-sm font-extrabold text-slate-900">{profile?.section || 'Section A'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Department / Wing
              </span>
              <p className="text-sm font-extrabold text-slate-900">{profile?.department || 'General'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Academic Session
              </span>
              <p className="text-sm font-mono font-extrabold text-slate-900">{profile?.academicYear || '2025–2026'}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Registered Contact Phone
              </span>
              <p className="text-sm font-extrabold text-slate-900">{profile?.phone || 'Not provided'}</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. ACADEMIC INFORMATION */}
      {activeTab === 'academics' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">Official Evaluation Records</h2>
              <p className="text-xs text-slate-500 mt-0.5">Formal evaluations and continuous assessment grades</p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {academics.length} Published Reports
            </span>
          </div>

          {academics.length === 0 ? (
            <div className="py-12 text-center space-y-3 bg-slate-50 rounded-2xl border border-slate-200 p-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">No Evaluations Published Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Academic report cards and term evaluations are published directly by the examination controller. As soon as evaluations are finalized, your verified grades will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {academics.map((rec) => (
                <div key={rec.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center font-bold text-slate-900">
                    <span className="text-sm">{rec.term}</span>
                    <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Grade: {rec.overallGrade}
                    </span>
                  </div>
                  <div className="divide-y divide-slate-200 text-xs">
                    {rec.subjects.map((sub, i) => (
                      <div key={i} className="py-1.5 flex justify-between">
                        <span className="text-slate-700">{sub.name}</span>
                        <span className="font-bold text-slate-900">{sub.obtainedMarks} / {sub.maxMarks}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. SUBJECTS & CURRICULUM */}
      {activeTab === 'subjects' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-base sm:text-lg font-black text-slate-900">Enrolled Subjects & Curriculum</h2>
            <p className="text-xs text-slate-500 mt-0.5">Course framework for {profile?.className || 'Current Class'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { code: 'ENG-101', name: 'English Language & Communication', dept: 'Languages' },
              { code: 'SCI-102', name: 'General Science & Environmental Studies', dept: 'Science' },
              { code: 'MTH-103', name: 'Mathematics & Logical Reasoning', dept: 'Mathematics' },
              { code: 'MAL-104', name: 'Malayalam Language & Literature', dept: 'Languages' },
              { code: 'ARB-105', name: 'Arabic Language Studies', dept: 'Languages' },
              { code: 'ISL-106', name: 'Islamic Studies, Values & Morals', dept: 'Moral Science' },
              { code: 'ICT-107', name: 'Digital Literacy & Computer Foundations', dept: 'Computing' },
              { code: 'SOC-108', name: 'Social Studies & Indian Heritage', dept: 'Humanities' },
            ].map((sub) => (
              <div key={sub.code} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {sub.code}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">{sub.dept}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{sub.name}</h4>
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>Active Curriculum</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. NOTICES */}
      {activeTab === 'notices' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">Official Student Circulars</h2>
              <p className="text-xs text-slate-500 mt-0.5">Authoritative notices issued by school administration</p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {announcements.length} Published
            </span>
          </div>

          {announcements.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
              No circulars have been published yet.
            </div>
          ) : (
            <div className="space-y-3">
              {announcements.map((item) => (
                <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{item.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 6. EVENTS */}
      {activeTab === 'events' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">Upcoming Academic Events</h2>
              <p className="text-xs text-slate-500 mt-0.5">Programs, competitions, and institutional schedules</p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {events.length} Events
            </span>
          </div>

          {events.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
              No upcoming events scheduled at this time.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((ev) => (
                <div key={ev.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{ev.title}</span>
                    <span className="text-[10px] text-emerald-800 font-mono bg-emerald-100 px-2 py-0.5 rounded-md">
                      {ev.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{ev.description}</p>
                  <div className="text-[10px] text-slate-400 pt-1">
                    Location: {ev.location}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 7. DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-base sm:text-lg font-black text-slate-900">Institutional Documents & Dossiers</h2>
            <p className="text-xs text-slate-500 mt-0.5">Official downloadable certificates, fee receipts, and identity documents</p>
          </div>

          <div className="py-12 text-center space-y-3 bg-slate-50 rounded-2xl border border-slate-200 p-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No Documents Uploaded</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Official certificates, admission dossiers, or receipts uploaded by the school administration will appear here securely for direct download.
            </p>
          </div>
        </div>
      )}

      {/* 8. ACCOUNT SETTINGS */}
      {activeTab === 'account' && (
        <div className="space-y-6">
          {/* Permanent Student ID Section */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-black text-slate-900">Permanent Student Identifier</h2>
              <p className="text-xs text-slate-500 mt-0.5">Your permanent unique identifier assigned by school administration</p>
            </div>

            <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">
                  Permanent Student ID
                </span>
                <span className="font-mono text-xl font-black text-emerald-950">
                  {effectiveStudentId}
                </span>
                <p className="text-[11px] text-emerald-800 mt-1">
                  This permanent ID remains active throughout your enrollment. It cannot be altered by students or username changes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(effectiveStudentId);
                  setCopiedId(true);
                  setTimeout(() => setCopiedId(false), 2000);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900 hover:bg-emerald-100/50 transition-colors cursor-pointer self-start sm:self-auto shadow-2xs"
              >
                {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                <span>{copiedId ? 'Copied' : 'Copy Student ID'}</span>
              </button>
            </div>
          </div>

          {/* Change Custom Username */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-black text-slate-900">Custom Login Username</h2>
              <p className="text-xs text-slate-500 mt-0.5">Set an easy-to-remember username to use alongside your Student ID</p>
            </div>

            {usernameSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{usernameSuccess}</span>
              </div>
            )}

            {usernameError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{usernameError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateUsername} className="space-y-3 max-w-md">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Custom Username (3–25 characters)
                </label>
                <input
                  type="text"
                  required
                  value={customUsername}
                  onChange={(e) => setCustomUsername(e.target.value)}
                  placeholder="e.g. rayan2025"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e3827]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Letters, numbers, dots, and hyphens permitted. You can always log in using your Student ID even if you set a custom username.
                </span>
              </div>
              <button
                type="submit"
                disabled={usernameLoading || !customUsername.trim()}
                className="px-5 py-2.5 bg-[#0e3827] hover:bg-[#164e37] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {usernameLoading ? 'Saving...' : 'Save Custom Username'}
              </button>
            </form>
          </div>

          {/* Update Allowed Personal Info */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-black text-slate-900">Personal & Emergency Details</h2>
              <p className="text-xs text-slate-500 mt-0.5">Keep your address and emergency contact details up to date</p>
            </div>

            {infoSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{infoSuccess}</span>
              </div>
            )}

            {infoError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{infoError}</span>
              </div>
            )}

            <form onSubmit={handleUpdatePersonalInfo} className="space-y-4 max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={personalPhone}
                    onChange={(e) => setPersonalPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e3827]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Emergency Contact
                  </label>
                  <input
                    type="tel"
                    value={personalEmergency}
                    onChange={(e) => setPersonalEmergency(e.target.value)}
                    placeholder="Parent / Guardian phone"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e3827]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Blood Group
                  </label>
                  <input
                    type="text"
                    value={personalBlood}
                    onChange={(e) => setPersonalBlood(e.target.value.toUpperCase())}
                    placeholder="e.g. O+, B+, A+"
                    maxLength={5}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e3827]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    value={personalAddress}
                    onChange={(e) => setPersonalAddress(e.target.value)}
                    placeholder="Town / Village, Tirur"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e3827]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Personal Bio / Academic Interests
                </label>
                <textarea
                  rows={2}
                  value={personalBio}
                  onChange={(e) => setPersonalBio(e.target.value)}
                  placeholder="Share a short note about your academic aspirations..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e3827]"
                />
              </div>

              <button
                type="submit"
                disabled={infoLoading}
                className="px-5 py-2.5 bg-[#0e3827] hover:bg-[#164e37] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {infoLoading ? 'Saving Info...' : 'Update Personal Info'}
              </button>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4 max-w-md">
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-black text-slate-900">Change Portal Password</h2>
              <p className="text-xs text-slate-500 mt-0.5">Choose a secure password known only to you</p>
            </div>

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

            <form onSubmit={handlePasswordChange} className="space-y-3">
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
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e3827]"
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
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e3827]"
                />
              </div>

              <button
                type="submit"
                disabled={pwdLoading}
                className="px-5 py-2.5 bg-[#0e3827] hover:bg-[#164e37] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {pwdLoading ? 'Updating Password...' : 'Save New Password'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
