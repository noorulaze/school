import React, { useEffect, useState } from 'react';
import {
  Award,
  Loader2,
  Printer,
  ShieldCheck
} from 'lucide-react';
import { subscribeStudentAuth } from '../../services/authService';
import {
  getStudentProfile,
  getStudentPublishedExamResults,
  type StudentExamSummary
} from '../../services/studentService';
import { getGradeBadgeStyle } from '../../utils/gradingUtils';
import { SCHOOL_INFO } from '../../data/schoolInfo';
import type { StudentDocument } from '../../types/firestore';

export const StudentResults: React.FC = () => {
  const [profile, setProfile] = useState<StudentDocument | null>(null);
  const [examSummaries, setExamSummaries] = useState<StudentExamSummary[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeStudentAuth(async (currentUser) => {
      if (currentUser) {
        setLoading(true);
        try {
          const [p, results] = await Promise.all([
            getStudentProfile(currentUser.uid, currentUser.studentId),
            getStudentPublishedExamResults(currentUser.uid, currentUser.studentId),
          ]);
          setProfile(p);
          setExamSummaries(results);
          if (results.length > 0) {
            setSelectedExamId(results[0].examId);
          }
        } catch (err) {
          console.error('[StudentResults] Error retrieving student examination results:', err);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsub();
  }, []);

  const currentExam = examSummaries.find((e) => e.examId === selectedExamId) || examSummaries[0] || null;

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#e5e0d5] p-12 text-center shadow-xs">
        <Loader2 className="w-8 h-8 text-[#164e37] animate-spin mx-auto mb-2" />
        <p className="text-xs text-slate-500 font-medium">Retrieving published examination results...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl font-sans text-slate-800">
      {/* ── 1. Page Header (Hidden on Print) ────────────────────────── */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-[#e5e0d5] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#164e37]/10 text-[#164e37] text-[10px] font-bold uppercase tracking-widest border border-[#164e37]/20">
              Student Academic Records
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-slate-500">Confidential & Private</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0f231c] tracking-tight">
            My Examination Results
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Official published scores for {profile?.name || 'Student'} ({profile?.studentId || 'ID'}).
          </p>
        </div>

        {currentExam && (
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer min-h-[42px]"
          >
            <Printer className="w-4 h-4 text-[#c59b27]" />
            <span>Print Result Sheet</span>
          </button>
        )}
      </div>

      {/* ── 2. Exam Selector if multiple published exams exist ─────── */}
      {examSummaries.length > 1 && (
        <div className="print:hidden bg-white p-3.5 sm:p-4 rounded-2xl border border-[#e5e0d5] shadow-2xs">
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Select Examination Cycle:
          </label>
          <div className="flex flex-wrap gap-2">
            {examSummaries.map((exam) => (
              <button
                key={exam.examId}
                type="button"
                onClick={() => setSelectedExamId(exam.examId)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedExamId === exam.examId
                    ? 'bg-[#164e37] text-white shadow-xs'
                    : 'bg-[#fbfaf7] text-slate-700 border border-[#d2cabb] hover:border-[#164e37]'
                }`}
              >
                <span>{exam.examName}</span>
                <span className="text-[10px] opacity-75 ml-1.5">({exam.academicYear})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. Main Result Sheet / Certificate Display ─────────────── */}
      {!currentExam ? (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-dashed border-[#d2cabb] p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#f4f9f6] flex items-center justify-center mx-auto mb-3">
            <Award className="w-7 h-7 text-[#164e37]/40" />
          </div>
          <h3 className="text-base font-bold text-[#0f231c]">
            No published examination results available yet.
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
            Your scores will appear here once officially approved and published by the school administration.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e0d5] shadow-xs overflow-hidden print:border-none print:shadow-none print:p-0">
          {/* Institutional Crest & Details Header */}
          <div className="bg-gradient-to-b from-[#0f281f] to-[#164e37] text-white p-6 sm:p-8 text-center relative overflow-hidden print:bg-white print:text-black print:border-b-2 print:border-slate-800 print:p-4">
            <div className="max-w-xl mx-auto space-y-2">
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider print:text-slate-900">
                {SCHOOL_INFO.officialName}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-medium print:text-slate-600">
                {SCHOOL_INFO.localName} · Islamic English Medium School
              </p>
              <p className="text-[11px] text-emerald-200/70 print:text-slate-500">
                Korangath, Niramaruthur, Tirur, Malappuram, Kerala
              </p>

              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-xs rounded-full border border-white/20 text-xs font-bold text-amber-300 print:text-slate-800 print:border-slate-400">
                  Official Student Evaluation Report
                </span>
              </div>
            </div>
          </div>

          {/* Student & Examination Metadata Bar */}
          <div className="bg-[#fbfaf7] border-b border-[#e5e0d5] p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Student Name</span>
              <span className="font-bold text-[#0f231c] text-sm truncate block">{profile?.name || 'Student'}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Student ID</span>
              <span className="font-mono font-bold text-[#164e37] text-sm block">{profile?.studentId || 'N/A'}</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Class & Division</span>
              <span className="font-semibold text-slate-800 text-sm block">
                {currentExam.className} {currentExam.division ? `(${currentExam.division})` : ''}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Academic Session</span>
              <span className="font-semibold text-slate-800 text-sm block">{currentExam.academicYear}</span>
            </div>
          </div>

          {/* Subject Breakdown Table (Desktop & Tablet) */}
          <div className="p-4 sm:p-6 space-y-5">
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-[#e5e0d5]">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#f4f1ea] text-[#124432] uppercase text-[10px] tracking-wider font-bold border-b border-[#d2cabb]">
                  <tr>
                    <th className="p-3.5">Subject</th>
                    <th className="p-3.5 text-center">Marks Obtained</th>
                    <th className="p-3.5 text-center">Maximum Marks</th>
                    <th className="p-3.5 text-center">Percentage</th>
                    <th className="p-3.5 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ede8de] bg-white">
                  {currentExam.subjects.map((sub) => {
                    const badge = getGradeBadgeStyle(sub.grade);
                    return (
                      <tr key={sub.id} className="hover:bg-[#fbfaf7] transition-colors">
                        <td className="p-3.5 font-bold text-[#0f231c]">{sub.subjectName}</td>
                        <td className="p-3.5 text-center font-bold text-[#164e37]">{sub.marksObtained}</td>
                        <td className="p-3.5 text-center text-slate-500">{sub.maximumMarks}</td>
                        <td className="p-3.5 text-center font-semibold text-slate-800">{sub.percentage}%</td>
                        <td className="p-3.5 text-center">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-black border ${badge.bg} ${badge.text} ${badge.border}`}
                          >
                            {sub.grade}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Card View (< 640px) */}
            <div className="sm:hidden space-y-2.5">
              {currentExam.subjects.map((sub) => {
                const badge = getGradeBadgeStyle(sub.grade);
                return (
                  <div key={sub.id} className="p-3 rounded-xl border border-[#e5e0d5] bg-[#fbfaf7] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-[#0f231c] block">{sub.subjectName}</span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Score: <strong className="text-[#164e37]">{sub.marksObtained}</strong> / {sub.maximumMarks} ({sub.percentage}%)
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-md text-xs font-black border ${badge.bg} ${badge.text} ${badge.border}`}
                    >
                      {sub.grade}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Overall Summary Card */}
            <div className="bg-[#f4f9f6] rounded-2xl border border-[#d3e5da] p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Total Marks</span>
                <span className="text-xl sm:text-2xl font-black text-[#164e37] mt-0.5 block">
                  {currentExam.totalMarksObtained}
                  <span className="text-xs font-normal text-slate-400 ml-1">/ {currentExam.totalMaximumMarks}</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Overall Percentage</span>
                <span className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5 block">
                  {currentExam.overallPercentage}%
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Overall Grade</span>
                <span className="text-xl sm:text-2xl font-black text-[#164e37] mt-0.5 block">
                  {currentExam.overallGrade}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Result Status</span>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-black mt-1 ${
                    currentExam.resultStatus === 'Failed'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {currentExam.resultStatus}
                </span>
              </div>
            </div>

            {/* Verification / Security Seal Notice */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-slate-400 border-t border-[#ede8de]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified by Sharafiyya Academic Examination Registry</span>
              </div>
              <span className="font-mono">Generated: {new Date().toLocaleDateString('en-GB')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
