import React, { useEffect, useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { subscribeStudentAuth } from '../../services/authService';
import { getStudentProfile } from '../../services/studentService';
import type { StudentDocument } from '../../types/firestore';

export const StudentProfile: React.FC = () => {
  const [profile, setProfile] = useState<StudentDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeStudentAuth(async (u) => {
      if (u) {
        setLoading(true);
        try {
          const p = await getStudentProfile(u.uid, u.studentId);
          setProfile(p);
        } catch (err) {
          console.error('Error fetching student profile:', err);
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
        <p className="text-xs text-slate-500">Loading student profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Student Profile & Enrollment Details
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Official academic enrollment record registered at Sharaful Islam Madrassa.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Banner */}
        <div className="bg-[#091f17] p-6 text-white border-b border-[#14392b] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#164e37] border border-[#c59b27]/80 text-white flex items-center justify-center font-bold text-2xl shadow-md">
              {profile?.name ? profile.name.charAt(0) : 'S'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{profile?.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-mono text-xs font-bold text-[#c59b27] bg-[#c59b27]/15 px-2 py-0.5 rounded-md">
                  {profile?.studentId}
                </span>
                <span className="text-xs text-emerald-300 font-medium">{profile?.className}</span>
              </div>
            </div>
          </div>

          <div className="self-start sm:self-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Status: Active</span>
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Registered Student Name
              </span>
              <span className="font-bold text-slate-800 text-sm">{profile?.name}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Institutional Student ID
              </span>
              <span className="font-mono font-bold text-slate-800 text-sm">{profile?.studentId}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Portal Login Email
              </span>
              <span className="font-mono text-slate-800">{profile?.email}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Current Class / Standard
              </span>
              <span className="font-semibold text-slate-800">{profile?.className}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Primary Academic Department
              </span>
              <span className="font-semibold text-slate-800">{profile?.department}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Academic Session / Batch
              </span>
              <span className="font-semibold text-slate-800">{profile?.academicYear}</span>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950 space-y-1.5 leading-relaxed">
            <div className="flex items-center gap-2 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-[#c59b27]" />
              <span>Official Institutional Notice</span>
            </div>
            <p className="text-[11px] text-amber-900">
              Student details are officially synchronized with the Sharafiyya Korangath office register. For updates to student names, guardian contact details, or department transfers, please contact the Madrassa administrative desk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
