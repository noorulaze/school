import React, { useEffect, useState } from 'react';
import { CheckSquare, Calendar, Clock, ShieldCheck, Loader2 } from 'lucide-react';
import { subscribeStudentAuth } from '../../services/authService';
import { getStudentAttendance, getStudentProfile } from '../../services/studentService';
import type { AttendanceRecord, StudentDocument } from '../../types/firestore';

export const StudentAttendance: React.FC = () => {
  const [profile, setProfile] = useState<StudentDocument | null>(null);
  const [attendance, setAttendance] = useState<AttendanceRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeStudentAuth(async (u) => {
      if (u) {
        setLoading(true);
        try {
          const [p, att] = await Promise.all([
            getStudentProfile(u.uid, u.studentId),
            getStudentAttendance(u.uid),
          ]);
          setProfile(p);
          setAttendance(att);
        } catch (err) {
          console.error('Attendance error:', err);
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
        <p className="text-xs text-slate-500">Checking attendance logs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Attendance Status & Records
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Daily class attendance status for {profile?.name || 'Student'} ({profile?.studentId}).
        </p>
      </div>

      {attendance ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
            <div>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                Overall Attendance Percentage
              </span>
              <div className="text-4xl font-black text-emerald-950 mt-1">
                {attendance.percentage}%
              </div>
            </div>
            <div className="text-right text-xs text-slate-600">
              <p>
                Days Present: <strong className="text-slate-900">{attendance.presentDays}</strong>
              </p>
              <p>
                Total Working Days: <strong className="text-slate-900">{attendance.totalDays}</strong>
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* AUTHENTIC EMPTY STATE - NO FAKE PERCENTAGES OR NUMBERS */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs text-center">
          <div className="w-16 h-16 bg-slate-100 text-emerald-800 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-200">
            <CheckSquare className="w-8 h-8 text-[#164e37]" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Official Attendance Ledger Under Compilation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
            Attendance for academic batch <strong className="text-slate-800 font-semibold">{profile?.academicYear || '2025–2026'}</strong> is recorded daily in the classroom register by the class ustad. Periodic portal synchronizations take place at the conclusion of each academic month.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>Session Cycle</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Regular academic classes held according to the school session schedule.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#c59b27]" />
                <span>Verification</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Records are formally cross-checked against physical roll registers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                <Clock className="w-4 h-4 text-slate-600" />
                <span>Inquiries</span>
              </div>
              <p className="text-[11px] text-slate-500">
                For urgent leave records or attendance certificates, visit the office desk.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
