import React, { useEffect, useState } from 'react';
import { Award, BookOpen, Clock, ShieldCheck, Loader2 } from 'lucide-react';
import { subscribeStudentAuth } from '../../services/authService';
import { getStudentAcademicRecords, getStudentProfile } from '../../services/studentService';
import type { AcademicRecord, StudentDocument } from '../../types/firestore';

export const StudentAcademics: React.FC = () => {
  const [profile, setProfile] = useState<StudentDocument | null>(null);
  const [academics, setAcademics] = useState<AcademicRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeStudentAuth(async (u) => {
      if (u) {
        setLoading(true);
        try {
          const [p, acd] = await Promise.all([
            getStudentProfile(u.uid, u.studentId),
            getStudentAcademicRecords(u.uid),
          ]);
          setProfile(p);
          setAcademics(acd);
        } catch (err) {
          console.error('Academics fetch error:', err);
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
        <p className="text-xs text-slate-500">Retrieving academic evaluation ledger...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Academic Records & Evaluations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Quarterly examination marks and recitation grading for {profile?.name || 'Student'} ({profile?.studentId}).
        </p>
      </div>

      {academics.length > 0 ? (
        <div className="space-y-6">
          {academics.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{rec.term}</h3>
                  <p className="text-xs text-slate-500">Academic Year: {rec.academicYear}</p>
                </div>
                <span className="text-sm font-black px-3 py-1 bg-emerald-100 text-emerald-900 rounded-xl">
                  Grade: {rec.overallGrade}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px]">
                      <th className="py-2">Subject / Field</th>
                      <th className="py-2 text-right">Max Marks</th>
                      <th className="py-2 text-right">Obtained</th>
                      <th className="py-2 text-right">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rec.subjects.map((sub, idx) => (
                      <tr key={idx}>
                        <td className="py-2 font-medium text-slate-800">{sub.name}</td>
                        <td className="py-2 text-right text-slate-500">{sub.maxMarks}</td>
                        <td className="py-2 text-right font-bold text-slate-900">{sub.obtainedMarks}</td>
                        <td className="py-2 text-right font-bold text-emerald-800">{sub.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* AUTHENTIC EMPTY STATE - NO FAKE MARKS OR FAKE PERCENTAGES */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs text-center">
          <div className="w-16 h-16 bg-amber-50 text-[#c59b27] rounded-3xl flex items-center justify-center mx-auto mb-4 border border-amber-200">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Term Evaluations Scheduled for Examination Board Release
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
            The curriculum assessments for <strong className="text-slate-800 font-semibold">{profile?.className || 'the current class'}</strong> are actively underway. Official marks, Tajweed recitation remarks, and quarterly scorecards will be released through this portal following faculty tabulation.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>Evaluation Scope</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Covers Qur’anic recitation, memorization, basic Fiqh, and moral discipline.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#c59b27]" />
                <span>Board Moderation</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Grades are scrutinized by the Examination Committee before publication.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                <Clock className="w-4 h-4 text-slate-600" />
                <span>Report Cards</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Printed report cards are distributed during parent-teacher interactions.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
