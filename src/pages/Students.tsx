import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Search,
  GraduationCap
} from 'lucide-react';
import { CODE_OF_CONDUCT } from '../data/portal';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

interface StudentsProps {
  onOpenAdmissionModal: () => void;
}

export const Students: React.FC<StudentsProps> = ({ onOpenAdmissionModal }) => {
  const [searchRoll, setSearchRoll] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRoll.trim()) {
      setSearchResult(`Simulated portal response for ID "${searchRoll}" [Status: Active Enrolment, Attendance: 96%, Conduct: Good Standing]`);
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7]">
      {/* Page Header & Breadcrumb */}
      <section className="bg-white border-b border-[#e5e0d5] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-[#164e37]">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">Student Information & Services</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f231c]">
            Student Information & Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Portal access, notices, batch timings, student activities, and study resources for {SCHOOL_INFO.officialName}.
          </p>
        </div>
      </section>

      {/* Main Content: 5 Dedicated Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* 1. Student Portal (with Coming Soon) */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5e0d5] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider">
                Section 1
              </span>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
                Coming Soon
              </span>
            </div>
            <PlaceholderBadge label="Portal System" size="sm" />
          </div>

          <h2 className="text-xl font-bold text-[#0f231c]">
            Student Portal
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            A digital portal is being developed for Sharafiyya Korangath to allow parents and guardians to access real-time student attendance records, quarterly progress cards, and fee status using their student admission ID.
          </p>

          {/* Demonstration Search Form */}
          <div className="p-4 bg-[#fbfaf7] rounded-lg border border-[#e5e0d5] max-w-md space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Student ID / Roll Number Lookup (Preview):
            </label>
            <form onSubmit={handleLookup} className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="e.g. SK-2025-042"
                  value={searchRoll}
                  onChange={(e) => setSearchRoll(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#d2cabb] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#164e37]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold rounded-md transition-colors"
              >
                Verify
              </button>
            </form>

            {searchResult && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-950 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  Portal Preview Output:
                </p>
                <p className="text-slate-600">{searchResult}</p>
              </div>
            )}
            <p className="text-[10px] text-slate-400 italic">
              * Full authenticated parent login portal functionality is coming soon.
            </p>
          </div>
        </section>

        {/* 2. Notices */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5e0d5] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider">
              Section 2
            </span>
            <PlaceholderBadge label="Active Bulletins" size="sm" />
          </div>

          <h2 className="text-xl font-bold text-[#0f231c]">
            Notices & Circulars
          </h2>

          <div className="divide-y divide-[#e5e0d5] border border-[#e5e0d5] rounded-lg overflow-hidden text-xs">
            <div className="p-4 bg-[#fbfaf7] space-y-1">
              <div className="flex justify-between items-center">
                <strong className="text-slate-900 text-xs">Academic Session 2025–2026 Admissions Notice</strong>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">Admissions</span>
              </div>
              <p className="text-slate-600">Application process for Class 1 and lateral enrolments is open at the madrassa office.</p>
            </div>

            <div className="p-4 bg-white space-y-1">
              <div className="flex justify-between items-center">
                <strong className="text-slate-900 text-xs">Class Timetable & Assembly Notice</strong>
                <span className="text-[10px] font-semibold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">Academic</span>
              </div>
              <p className="text-slate-600">Students are reminded to arrive 10 minutes prior to 6:45 AM for morning assembly and Azkar.</p>
            </div>

            <div className="p-4 bg-[#fbfaf7] space-y-1">
              <div className="flex justify-between items-center">
                <strong className="text-slate-900 text-xs">Parent-Teacher Consultative Meet Notification</strong>
                <span className="text-[10px] font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">Meeting</span>
              </div>
              <p className="text-slate-600">Schedule will be circularized to parents via student communication diary.</p>
            </div>
          </div>
        </section>

        {/* 3. Academic Information */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5e0d5] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider">
              Section 3
            </span>
            <PlaceholderBadge label="Standardized Schedule" size="sm" />
          </div>

          <h2 className="text-xl font-bold text-[#0f231c]">
            Academic Information & Batch Schedules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] space-y-2">
              <span className="font-bold text-emerald-900 uppercase text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Morning Batch (Standard)
              </span>
              <h3 className="text-sm font-bold text-slate-900">06:45 AM – 08:30 AM</h3>
              <p className="text-slate-600 leading-relaxed">
                Operates Monday to Saturday. Focuses on core Quranic Tajweed, Fiqh rulings, and Arabic language fundamentals prior to regular school hours.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] space-y-2">
              <span className="font-bold text-amber-900 uppercase text-[10px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Evening Batch (Hifz & Revision)
              </span>
              <h3 className="text-sm font-bold text-slate-900">04:30 PM – 06:00 PM</h3>
              <p className="text-slate-600 leading-relaxed">
                Supplementary session for students pursuing memorization (Hifz) of selected Surahs, remedial recitation support, and evening Maghrib congregational prayer.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Student Activities */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5e0d5] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider">
              Section 4
            </span>
            <PlaceholderBadge label="Activity Framework" size="sm" />
          </div>

          <h2 className="text-xl font-bold text-[#0f231c]">
            Student Activities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] space-y-1.5">
              <strong className="block text-slate-900 text-xs">Qira'at & Recitation Practice</strong>
              <p className="text-slate-600 leading-relaxed">Weekly tajweed coaching sessions allowing students to gain melodic articulation confidence.</p>
            </div>

            <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] space-y-1.5">
              <strong className="block text-slate-900 text-xs">Moral Storytelling & Seerah</strong>
              <p className="text-slate-600 leading-relaxed">Interactive lessons on the character of the Sahabah, honesty, and kindness to parents.</p>
            </div>

            <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] space-y-1.5">
              <strong className="block text-slate-900 text-xs">Milad Observance & Speeches</strong>
              <p className="text-slate-600 leading-relaxed">Student elocution in Malayalam and Arabic, devotional tributes, and commemorative assemblies.</p>
            </div>
          </div>
        </section>

        {/* 5. Important Resources */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5e0d5] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider">
              Section 5
            </span>
            <PlaceholderBadge label="Educational Materials" size="sm" />
          </div>

          <h2 className="text-xl font-bold text-[#0f231c]">
            Important Resources
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] flex items-center justify-between">
              <div>
                <strong className="block text-slate-900">Daily Masnoon Azkar Booklet</strong>
                <span className="text-slate-500 text-[11px]">Morning & evening remembrances checklist</span>
              </div>
              <span className="text-[10px] font-semibold bg-[#f4f1ea] text-slate-700 px-2 py-1 rounded border border-[#d2cabb]">
                Prescribed
              </span>
            </div>

            <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] flex items-center justify-between">
              <div>
                <strong className="block text-slate-900">Tajweed Rules Reference Chart</strong>
                <span className="text-slate-500 text-[11px]">Noon Sakinah, Meem Sakinah, and Madd rulings</span>
              </div>
              <span className="text-[10px] font-semibold bg-[#f4f1ea] text-slate-700 px-2 py-1 rounded border border-[#d2cabb]">
                Classes 3–7
              </span>
            </div>
          </div>
        </section>

        {/* Student Code of Conduct */}
        <section className="bg-[#f4f1ea] p-6 rounded-xl border border-[#e5e0d5] space-y-4">
          <div className="border-b border-[#d2cabb] pb-2">
            <h3 className="text-base font-bold text-slate-900">
              Student Code of Conduct & Etiquette
            </h3>
            <p className="text-xs text-slate-600">
              Behavioral standards upheld by all enrolled students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {CODE_OF_CONDUCT.map((item, idx) => (
              <div key={idx} className="bg-white p-3.5 rounded-lg border border-[#e5e0d5] space-y-1">
                <strong className="text-slate-900 text-xs block">{idx + 1}. {item.title}</strong>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#d2cabb] flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-700">
              For new admissions or transfer certificates, consult the administrative office directly.
            </p>
            <button
              onClick={onOpenAdmissionModal}
              className="px-4 py-2 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Admission Enquiry</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
