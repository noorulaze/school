import React, { useState } from 'react';
import {
  GraduationCap,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  Search,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { CODE_OF_CONDUCT } from '../data/portal';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { IslamicPattern } from '../components/IslamicPattern';
import { SectionHeading } from '../components/SectionHeading';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

interface StudentsProps {
  onOpenAdmissionModal: () => void;
}

export const Students: React.FC<StudentsProps> = ({ onOpenAdmissionModal }) => {
  const [activeTab, setActiveTab] = useState<'attendance' | 'timetable' | 'results' | 'materials'>('timetable');
  const [searchRoll, setSearchRoll] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRoll.trim()) {
      setSearchResult(`Preview record for Student ID "${searchRoll}" [Demonstration Data: Attendance 96%, Good Academic Standing]`);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header Banner */}
      <section className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <IslamicPattern variant="rosette" className="-top-12 -right-12 text-amber-400" opacity={0.08} />
        <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-800/80 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student & Management Foundation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Student Portal & Services
          </h1>

          <p className="text-emerald-300 font-medium text-base sm:text-lg">
            Academic Services & Digital Foundation for {SCHOOL_INFO.officialName}
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Centralized portal providing class timetables, attendance tracking previews, syllabus references, and school code of conduct for our students in Korangath.
          </p>
        </div>
      </section>

      {/* Main Portal Framework */}
      <section className="py-16 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Foundation Notice */}
          <div className="max-w-4xl mx-auto mb-10 p-4 bg-emerald-50 rounded-2xl border border-emerald-200/90 flex items-start gap-3 text-xs text-emerald-950">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Digital Management Foundation Notice:</p>
              <p className="text-slate-600 mt-0.5">
                This section serves as the digital architecture for upcoming school management system integrations (online attendance, report card generation, and SMS parent notifications).
              </p>
            </div>
          </div>

          {/* Interactive Portal Workbench */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-16">
            {/* Workbench Navigation Tabs */}
            <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50/70 p-2 gap-2">
              <button
                onClick={() => setActiveTab('timetable')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'timetable'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-slate-100'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Class Timetable</span>
              </button>

              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'attendance'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Attendance Lookup (Preview)</span>
              </button>

              <button
                onClick={() => setActiveTab('results')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'results'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-slate-100'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Progress Card Gateway</span>
              </button>

              <button
                onClick={() => setActiveTab('materials')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'materials'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Prescribed References</span>
              </button>
            </div>

            {/* Workbench Tab Panels */}
            <div className="p-6 sm:p-8">
              {/* TAB 1: TIMETABLE */}
              {activeTab === 'timetable' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        General Madrasa Daily Schedule
                      </h3>
                      <p className="text-xs text-slate-500">
                        Morning & Afternoon batch sessions across junior and senior wings
                      </p>
                    </div>
                    <PlaceholderBadge label="Editable Class Timetable" size="sm" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Morning Batch */}
                    <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-emerald-900/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          Morning Session
                        </span>
                        <span className="text-xs text-slate-500">Classes 1 through 10</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">
                        [Morning Session: 6:45 AM – 8:30 AM / Editable]
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-700">
                        <li className="flex items-center justify-between py-1 border-b border-slate-200">
                          <span>06:45 AM – 07:00 AM</span>
                          <span className="font-semibold text-emerald-900">Assembly, Dua & Azkar</span>
                        </li>
                        <li className="flex items-center justify-between py-1 border-b border-slate-200">
                          <span>07:00 AM – 07:45 AM</span>
                          <span className="font-semibold text-emerald-900">Period 1: Quran & Tajweed</span>
                        </li>
                        <li className="flex items-center justify-between py-1 border-b border-slate-200">
                          <span>07:45 AM – 08:30 AM</span>
                          <span className="font-semibold text-emerald-900">Period 2: Fiqh / Arabic Grammar</span>
                        </li>
                      </ul>
                      <p className="text-[11px] text-slate-500 italic">
                        * Standard timing allowing students to proceed to general school afterwards.
                      </p>
                    </div>

                    {/* Afternoon Batch */}
                    <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-amber-900/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                          Afternoon / Evening Batch
                        </span>
                        <span className="text-xs text-slate-500">Special Hifz & Revision</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">
                        [Evening Session: 4:30 PM – 6:00 PM / Editable]
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-700">
                        <li className="flex items-center justify-between py-1 border-b border-slate-200">
                          <span>04:30 PM – 05:15 PM</span>
                          <span className="font-semibold text-amber-950">Period 1: Hifz Revision & Sabak</span>
                        </li>
                        <li className="flex items-center justify-between py-1 border-b border-slate-200">
                          <span>05:15 PM – 05:45 PM</span>
                          <span className="font-semibold text-amber-950">Period 2: Hadith & Akhlaq Mentorship</span>
                        </li>
                        <li className="flex items-center justify-between py-1 border-b border-slate-200">
                          <span>05:45 PM – 06:00 PM</span>
                          <span className="font-semibold text-amber-950">Congregational Maghrib Prayer</span>
                        </li>
                      </ul>
                      <p className="text-[11px] text-slate-500 italic">
                        * Exact batch allocations are determined at the start of each academic year.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ATTENDANCE */}
              {activeTab === 'attendance' && (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-bold text-slate-900">
                      Student Daily Attendance Portal
                    </h3>
                    <p className="text-xs text-slate-600">
                      Enter the student's registered Roll Number or Admission ID to test the portal verification system.
                    </p>
                  </div>

                  <form onSubmit={handleLookup} className="flex gap-2">
                    <div className="relative flex-grow">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="e.g. SK-2025-042"
                        value={searchRoll}
                        onChange={(e) => setSearchRoll(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                    >
                      Verify
                    </button>
                  </form>

                  {searchResult && (
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <span className="font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Demonstration Record Found
                        </span>
                        <PlaceholderBadge label="Sample Simulated Record" size="sm" />
                      </div>
                      <p className="text-slate-700">{searchResult}</p>
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-200/60 text-center font-mono text-[11px]">
                        <div className="bg-white p-2 rounded">Working Days: 180</div>
                        <div className="bg-white p-2 rounded">Attended: 173</div>
                        <div className="bg-white p-2 rounded text-emerald-700 font-bold">Rate: 96.1%</div>
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                    <p className="font-semibold mb-0.5">Note for Parents:</p>
                    <p>Live synchronized attendance will be accessible upon rollout of the centralized school database.</p>
                  </div>
                </div>
              )}

              {/* TAB 3: RESULTS */}
              {activeTab === 'results' && (
                <div className="space-y-6 max-w-xl mx-auto text-center">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Examination Progress Card Gateway
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Formal examination results are issued following term-end evaluations. The online progress card viewer is currently prepared for integration with Board exam results.
                  </p>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">Next Scheduled Evaluation:</span>
                      <PlaceholderBadge label="Notice Pending" size="sm" />
                    </div>
                    <p className="text-slate-600">
                      Mid-Term & Board Assessments: Circular will be published on the official notice board and communicated to parents.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: MATERIALS */}
              {activeTab === 'materials' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Prescribed References & Syllabi Checklists
                      </h3>
                      <p className="text-xs text-slate-500">Essential prayer booklets and recitation guides</p>
                    </div>
                    <PlaceholderBadge label="Editable Syllabi" size="sm" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-800">Daily Masnoon Azkar & Duas</p>
                        <p className="text-[11px] text-slate-500">Morning & evening remembrances</p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-1 rounded">
                        Prescribed
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-800">Tajweed Rules Summary (Noon & Meem)</p>
                        <p className="text-[11px] text-slate-500">Fundamental recitation guide</p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-1 rounded">
                        Class 3–7
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Code of Conduct & Rules */}
          <div className="space-y-8">
            <SectionHeading
              badge="Madrassa Code of Conduct"
              title="Student Etiquette &"
              highlightedText="Disciplinary Guidelines"
              subtitle="Cultivating manners that reflect the beauty of Islamic teachings in thought, word, and deed."
              alignment="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CODE_OF_CONDUCT.map((rule, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">{rule.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{rule.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admission Enquiry Hook */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs sm:text-sm font-medium text-slate-700">
                Are you looking to enroll your ward for the upcoming academic session?
              </span>
              <button
                onClick={onOpenAdmissionModal}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors"
              >
                Admission Enquiry Form
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
