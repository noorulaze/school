import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Search,
  GraduationCap,
  Clock,
  BookOpen,
  Calendar,
  Sparkles,
  FileText,
  Award
} from 'lucide-react';
import { CODE_OF_CONDUCT } from '../data/portal';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { PlaceholderBadge } from '../components/PlaceholderBadge';
import { RealisticImageSlot } from '../components/RealisticImageSlot';

interface StudentsProps {
  onOpenAdmissionModal: () => void;
}

export const Students: React.FC<StudentsProps> = ({ onOpenAdmissionModal }) => {
  const [searchRoll, setSearchRoll] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRoll.trim()) {
      setSearchResult(
        `Simulation for Admission ID "${searchRoll}": [Status: Active Enrolment, Attendance: 96%, Quarterly Evaluation: In Progress, Standing: Good]`
      );
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7] text-slate-800">
      {/* 1. Page Header */}
      <section className="bg-white border-b border-[#e5e0d5] py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-[#164e37]">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">Student Information & Services</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0f231c] tracking-tight">
              Student Information & Services Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 leading-relaxed">
              Timetables, notices, co-curricular activities, study resources, and digital portal gateway for {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName}).
            </p>
          </div>
        </div>
      </section>

      {/* 2. SECTION 1: Student Portal (Marked 'Coming Soon') */}
      <section className="py-6 sm:py-10 border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#123628] text-white rounded-xl sm:rounded-2xl p-4 sm:p-8 lg:p-10 border border-[#1b5038] shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#1b5038] text-[11px] sm:text-xs font-semibold text-emerald-200 border border-[#276e4e]">
                  <Sparkles className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                  <span>Student Portal System</span>
                  <span className="text-[10px] font-bold bg-[#c59b27] text-slate-950 px-2 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                </div>

                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                  Official Digital Parent & Student Portal
                </h2>

                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  A centralized management portal is currently under active development. Once launched, parents will be able to access attendance records, quarterly grades, circulars, and fee acknowledgments online.
                </p>

                {/* Roll Number Lookup Simulation */}
                <div className="p-3.5 sm:p-4 bg-[#0e2c20] rounded-xl border border-[#1b5038] max-w-md space-y-2 text-xs">
                  <label className="block text-emerald-200 font-semibold">
                    Test Admission ID Verification (Preview Tool):
                  </label>
                  <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-grow">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 sm:top-2.5" />
                      <input
                        type="text"
                        placeholder="e.g. SK-2025-042"
                        value={searchRoll}
                        onChange={(e) => setSearchRoll(e.target.value)}
                        className="w-full min-h-[42px] sm:min-h-0 pl-9 pr-3 py-2 text-xs text-white bg-[#081a13] border border-[#225740] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c59b27]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="min-h-[42px] sm:min-h-0 px-4 py-2 bg-[#c59b27] hover:bg-[#b48318] active:bg-[#a37514] text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center justify-center shrink-0"
                    >
                      Verify
                    </button>
                  </form>

                  {searchResult && (
                    <div className="p-3 bg-[#164e37] border border-[#276e4e] rounded-lg text-emerald-100 text-[11px] space-y-1">
                      <p className="font-bold flex items-center gap-1 text-[#c59b27]">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Simulated Response:</span>
                      </p>
                      <p className="break-words">{searchResult}</p>
                    </div>
                  )}
                  <p className="text-[10px] text-emerald-300/70 italic">
                    * Authenticated database login will be activated in the next phase.
                  </p>
                </div>
              </div>

              {/* Portal Modules Preview */}
              <div className="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-[#0e2c20] border border-[#1b5038] space-y-3 text-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-[#c59b27] block">
                  Integrated Portal Modules:
                </span>
                <div className="space-y-2 text-slate-300">
                  <div className="p-2.5 rounded-lg bg-[#143d2c] border border-[#225740] flex items-center justify-between gap-2">
                    <span className="truncate">Daily Attendance Log</span>
                    <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded shrink-0">Active</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#143d2c] border border-[#225740] flex items-center justify-between gap-2">
                    <span className="truncate">Quarterly Exam Marksheet</span>
                    <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded shrink-0">Active</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#143d2c] border border-[#225740] flex items-center justify-between gap-2">
                    <span className="truncate">Daily Masnoon Azkar</span>
                    <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded shrink-0">Active</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#143d2c] border border-[#225740] flex items-center justify-between gap-2">
                    <span className="truncate">Administrative Desk</span>
                    <span className="text-[10px] bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded shrink-0">In Setup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION 2: Notices & Circulars Timeline */}
      <section className="py-8 sm:py-12 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3">
            <div>
              <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider block mb-1">
                Section 2 • Student Bulletins
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f231c]">
                Current Notices & Circulars
              </h2>
            </div>
            <PlaceholderBadge label="Official Notice Board" size="sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 text-xs">
            <div className="p-4 sm:p-5 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded inline-block">
                Enrolment
              </span>
              <h4 className="text-sm font-bold text-slate-900">Academic Session 2025–2026 Admissions</h4>
              <p className="text-slate-600 leading-relaxed">
                Registration for primary classes and transfer students is open at the administrative office in Korangath.
              </p>
              <div className="pt-2 text-[11px] text-slate-400 border-t border-[#e5e0d5]">
                Status: Applications accepted in office
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-2 py-0.5 rounded inline-block">
                Timetable
              </span>
              <h4 className="text-sm font-bold text-slate-900">Morning Assembly & Daily Azkar</h4>
              <p className="text-slate-600 leading-relaxed">
                All students must arrive 10 minutes prior to 6:45 AM for morning Azkar recitation and line assembly.
              </p>
              <div className="pt-2 text-[11px] text-slate-400 border-t border-[#e5e0d5]">
                Compliance: Mandatory for all classes
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded inline-block">
                Consultation
              </span>
              <h4 className="text-sm font-bold text-slate-900">Parent-Teacher Progress Meeting</h4>
              <p className="text-slate-600 leading-relaxed">
                Consultative sessions will be circularized via student diaries. Parents are encouraged to meet the class muallim.
              </p>
              <div className="pt-2 text-[11px] text-slate-400 border-t border-[#e5e0d5]">
                Coordination: Via Student Communication Diary
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 3: Academic Information & Batch Schedules */}
      <section className="py-8 sm:py-12 border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-6 sm:mb-8">
            <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider block mb-1">
              Section 3 • Daily Timetables
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f231c]">
              Academic Batches & Daily Sessions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Convenient morning and evening hours arranged to avoid conflict with daytime schooling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Morning Batch */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-[#e5e0d5] p-4 sm:p-7 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-[#164e37] bg-[#f4f1ea] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider border border-[#d2cabb]">
                  Primary Schedule
                </span>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-[#164e37]" />
                  <span>Mon – Sat</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Morning Batch (Standard Curriculum)
                </h3>
                <p className="text-base sm:text-lg font-mono font-bold text-[#164e37] mt-0.5">
                  06:45 AM – 08:30 AM
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated morning session concentrating on Quranic Tajweed, Fiqh rulings, and Arabic language drills before regular school hours.
              </p>

              <div className="space-y-2 text-xs pt-3 border-t border-[#e5e0d5]">
                <div className="flex flex-col sm:flex-row sm:justify-between text-slate-700 gap-0.5 sm:gap-2">
                  <span className="font-mono text-[11px] text-slate-500 sm:text-slate-600 shrink-0">06:45 AM – 07:00 AM</span>
                  <span className="font-semibold text-slate-800">Morning Azkar & Quranic Recitation</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-slate-700 gap-0.5 sm:gap-2">
                  <span className="font-mono text-[11px] text-slate-500 sm:text-slate-600 shrink-0">07:00 AM – 07:45 AM</span>
                  <span className="font-semibold text-slate-800">Tajweed Practice & Makharij Coaching</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-slate-700 gap-0.5 sm:gap-2">
                  <span className="font-mono text-[11px] text-slate-500 sm:text-slate-600 shrink-0">07:45 AM – 08:30 AM</span>
                  <span className="font-semibold text-slate-800">Islamic Fiqh & Arabic Literacy</span>
                </div>
              </div>
            </div>

            {/* Evening Batch */}
            <div className="bg-white rounded-xl sm:rounded-2xl border border-[#e5e0d5] p-4 sm:p-7 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider border border-amber-200">
                  Supplementary Session
                </span>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Mon – Thu</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Evening Batch (Hifz & Remedial)
                </h3>
                <p className="text-base sm:text-lg font-mono font-bold text-amber-800 mt-0.5">
                  04:30 PM – 06:00 PM
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Supplementary hours designed for students pursuing memorization (Hifz) of selected Surahs, remedial pronunciation, and Maghrib congregation.
              </p>

              <div className="space-y-2 text-xs pt-3 border-t border-[#e5e0d5]">
                <div className="flex flex-col sm:flex-row sm:justify-between text-slate-700 gap-0.5 sm:gap-2">
                  <span className="font-mono text-[11px] text-slate-500 sm:text-slate-600 shrink-0">04:30 PM – 05:15 PM</span>
                  <span className="font-semibold text-slate-800">Memorization Review & Memorizing (Dhor)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-slate-700 gap-0.5 sm:gap-2">
                  <span className="font-mono text-[11px] text-slate-500 sm:text-slate-600 shrink-0">05:15 PM – 05:45 PM</span>
                  <span className="font-semibold text-slate-800">Remedial Reading & Individual Coaching</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between text-slate-700 gap-0.5 sm:gap-2">
                  <span className="font-mono text-[11px] text-slate-500 sm:text-slate-600 shrink-0">05:45 PM – 06:00 PM</span>
                  <span className="font-semibold text-slate-800">Evening Azkar & Maghrib Preparation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION 4: Student Activities & Co-Curriculars */}
      <section className="py-8 sm:py-12 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider block">
                Section 4 • Co-Curricular Enrichment
              </span>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0f231c]">
                Student Activities & Character Development
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Co-curricular platforms nurture public speaking confidence, melodic recitation articulation, and practical social manners among students.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 sm:p-3.5 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-1">
                  <strong className="block text-slate-900 font-bold">
                    Qira'at & Melodic Tilawat Circles
                  </strong>
                  <p className="text-slate-600">
                    Weekly tajweed practice circles where students gain confidence in melodious Quranic recitation before peers.
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-1">
                  <strong className="block text-slate-900 font-bold">
                    Elocution & Speech Sessions (Malayalam & Arabic)
                  </strong>
                  <p className="text-slate-600">
                    Bi-weekly public speaking exercises covering Seerah of the Prophet ﷺ and Islamic ethics.
                  </p>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-1">
                  <strong className="block text-slate-900 font-bold">
                    Annual Commemorations & Milad Programs
                  </strong>
                  <p className="text-slate-600">
                    Traditional cultural presentations, Qaseeda recitation, and student talent showcases.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <RealisticImageSlot
                scene="activities"
                aspectRatio="16/10"
                label="Student Activity Hall"
                caption="Co-curricular speech and recitation assembly"
                className="shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION 5: Important Resources & Materials */}
      <section className="py-8 sm:py-12 border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3">
            <div>
              <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider block mb-1">
                Section 5 • Prescribed Study Material
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f231c]">
                Important Resources for Enrolled Students
              </h2>
            </div>
            <PlaceholderBadge label="Educational Guides" size="sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 text-xs">
            <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#e5e0d5] space-y-2">
              <BookOpen className="w-5 h-5 text-[#164e37]" />
              <h4 className="text-sm font-bold text-slate-900">Masnoon Azkar Handbook</h4>
              <p className="text-slate-600 leading-relaxed">
                Daily morning and evening invocations, eating manners, and bedtime duas.
              </p>
              <span className="inline-block text-[10px] font-semibold text-[#164e37] bg-[#f4f1ea] px-2 py-0.5 rounded">
                Prescribed Classes 1–10
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#e5e0d5] space-y-2">
              <FileText className="w-5 h-5 text-[#164e37]" />
              <h4 className="text-sm font-bold text-slate-900">Tajweed Articulation Chart</h4>
              <p className="text-slate-600 leading-relaxed">
                Diagrams of Makharij (points of vocal articulation) and rules of Noon/Meem Sakinah.
              </p>
              <span className="inline-block text-[10px] font-semibold text-[#164e37] bg-[#f4f1ea] px-2 py-0.5 rounded">
                Classes 3–8
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#e5e0d5] space-y-2">
              <Award className="w-5 h-5 text-[#164e37]" />
              <h4 className="text-sm font-bold text-slate-900">Forty Hadith Selection</h4>
              <p className="text-slate-600 leading-relaxed">
                Selected Prophetic traditions on character, truthfulness, and goodwill.
              </p>
              <span className="inline-block text-[10px] font-semibold text-[#164e37] bg-[#f4f1ea] px-2 py-0.5 rounded">
                Classes 7–10
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#e5e0d5] space-y-2">
              <Calendar className="w-5 h-5 text-[#164e37]" />
              <h4 className="text-sm font-bold text-slate-900">Student Diary & Planner</h4>
              <p className="text-slate-600 leading-relaxed">
                Daily attendance check, recitation milestone record, and parent remarks slip.
              </p>
              <span className="inline-block text-[10px] font-semibold text-[#164e37] bg-[#f4f1ea] px-2 py-0.5 rounded">
                Distributed Annually
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Student Code of Conduct & Etiquette */}
      <section className="py-8 sm:py-12 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-6 sm:mb-8">
            <h3 className="text-xl font-bold text-[#0f231c]">
              Student Code of Conduct & Moral Etiquette
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Core behavioral and disciplinary standards upheld by all enrolled students at Sharafiyya Korangath.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {CODE_OF_CONDUCT.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-[#164e37] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {idx + 1}
                </div>
                <div className="space-y-0.5">
                  <strong className="block text-slate-900">{item.title}</strong>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Admission Enquiry Action Strip */}
      <section className="py-8 sm:py-10 bg-[#f4f1ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Need Enrolment or Syllabus Clarifications?
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Our office staff in Korangath, Tirur, is available during visiting hours to assist parents.
            </p>
          </div>

          <button
            onClick={onOpenAdmissionModal}
            className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] active:bg-[#0d3323] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            <GraduationCap className="w-4 h-4 text-[#c59b27]" />
            <span>Admission Enquiry Form</span>
          </button>
        </div>
      </section>
    </div>
  );
};
