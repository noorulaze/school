import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { DEPARTMENTS, type DepartmentItem } from '../data/departments';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { PlaceholderBadge } from '../components/PlaceholderBadge';
import { RealisticImageSlot } from '../components/RealisticImageSlot';

interface DepartmentsProps {
  onOpenAdmissionModal: () => void;
}

export const Departments: React.FC<DepartmentsProps> = ({ onOpenAdmissionModal }) => {
  const [activeTab, setActiveTab] = useState<string>(DEPARTMENTS[0].id);

  const activeDepartment: DepartmentItem =
    DEPARTMENTS.find((d) => d.id === activeTab) || DEPARTMENTS[0];

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7] text-slate-800">
      {/* 1. Page Header */}
      <section className="bg-white border-b border-[#e5e0d5] py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-[#164e37]">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">Academic Departments</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0f231c] tracking-tight">
              Curriculum & Academic Wings
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Structured religious disciplines and moral education syllabus taught at {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName}) under recognized board standards.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Academic Streams Prospectus (Not repetitive cards) */}
      <section className="py-8 sm:py-12 border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Stream Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 mb-6 sm:mb-8">
            {DEPARTMENTS.map((dept) => {
              const isSelected = dept.id === activeTab;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveTab(dept.id)}
                  className={`p-3 sm:p-4 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[76px] ${
                    isSelected
                      ? 'bg-[#164e37] text-white border-[#164e37] shadow-sm'
                      : 'bg-white text-slate-800 border-[#e5e0d5] hover:border-[#164e37]'
                  }`}
                >
                  <span
                    className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${
                      isSelected ? 'text-[#c59b27]' : 'text-slate-400'
                    }`}
                  >
                    Stream {dept.code}
                  </span>
                  <span className="text-xs sm:text-sm font-bold mt-1 line-clamp-1">
                    {dept.name}
                  </span>
                  <span
                    className={`font-amiri text-xs mt-1 block ${
                      isSelected ? 'text-emerald-200' : 'text-[#c59b27]'
                    }`}
                    dir="rtl"
                  >
                    {dept.arabicName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stream Deep-Dive View */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-[#e5e0d5] p-4 sm:p-8 lg:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Left Column: Stream Details */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#164e37] bg-[#f4f1ea] px-3 py-1 rounded-full border border-[#d2cabb]">
                    Stream {activeDepartment.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                    {activeDepartment.targetLevels}
                  </span>
                  <PlaceholderBadge label="Standardized Syllabus" size="sm" />
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c]">
                    {activeDepartment.name}
                  </h2>
                  <p className="font-amiri text-base text-[#c59b27] mt-0.5" dir="rtl">
                    {activeDepartment.arabicName}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeDepartment.fullDescription}
                </p>

                {/* Focus Areas & Topics */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Core Learning Modules:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeDepartment.syllabusOverview.map((topic: string, i: number) => (
                      <div
                        key={i}
                        className="p-3 bg-[#fbfaf7] rounded-lg border border-[#e5e0d5] flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#164e37] shrink-0" />
                        <span className="text-slate-800 font-medium">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Outcomes */}
                <div className="p-4 rounded-xl bg-[#f4f1ea] border border-[#d2cabb] space-y-1 text-xs">
                  <strong className="block text-slate-900 font-bold">
                    Target Pedagogical Outcome:
                  </strong>
                  <p className="text-slate-600 leading-relaxed">
                    By completing this stream, students develop consistent accuracy, memorization stability, and practical appreciation of daily Islamic worship and ethical responsibilities.
                  </p>
                </div>
              </div>

              {/* Right Column: Visual Scene Slot */}
              <div className="lg:col-span-5 space-y-4">
                <RealisticImageSlot
                  scene={activeDepartment.id === 'dept-quran-hadith' ? 'quran_study' : activeDepartment.id === 'dept-arabic' ? 'library' : 'classroom'}
                  aspectRatio="4/3"
                  label={`Classroom Session: ${activeDepartment.name}`}
                  caption={`Study materials for ${activeDepartment.name}`}
                  className="shadow-sm"
                />

                <div className="p-4 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Batch Sessions:</span>
                    <span className="font-semibold text-slate-800">Morning & Evening</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Evaluation Method:</span>
                    <span className="font-semibold text-slate-800">Quarterly Oral & Written</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Target Enrolment:</span>
                    <span className="font-semibold text-slate-800">{activeDepartment.targetLevels}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Academic Progression Stages (Classes 1 to 10) */}
      <section className="py-8 sm:py-12 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-3xl mb-6 sm:mb-8">
            <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider block mb-1">
              Curriculum Matrix
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0f231c]">
              Academic Progression by Class Level
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Progression ladder from primary fundamentals to advanced study.
            </p>
          </div>

          <div className="border border-[#e5e0d5] rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#f4f1ea] border-b border-[#d2cabb] text-[#164e37]">
                    <th className="p-3 sm:p-3.5 font-bold uppercase tracking-wider">Class Stage</th>
                    <th className="p-3 sm:p-3.5 font-bold uppercase tracking-wider">Age Group</th>
                    <th className="p-3 sm:p-3.5 font-bold uppercase tracking-wider">Core Focus</th>
                    <th className="p-3 sm:p-3.5 font-bold uppercase tracking-wider">Quranic Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e0d5]">
                  <tr className="hover:bg-[#fdfaf5]">
                    <td className="p-3 sm:p-3.5 font-bold text-slate-900 whitespace-nowrap">Primary (Classes 1–4)</td>
                    <td className="p-3 sm:p-3.5 text-slate-600 whitespace-nowrap">5 – 9 Years</td>
                    <td className="p-3 sm:p-3.5 text-slate-700">Arabic alphabet, basic Fiqh of Wudu & Salah, short daily Adhkar</td>
                    <td className="p-3 sm:p-3.5 text-slate-700">Qaida Nooraniyyah, Makharij, Last 10 Surahs</td>
                  </tr>
                  <tr className="hover:bg-[#fdfaf5]">
                    <td className="p-3 sm:p-3.5 font-bold text-slate-900 whitespace-nowrap">Intermediate (Classes 5–7)</td>
                    <td className="p-3 sm:p-3.5 text-slate-600 whitespace-nowrap">10 – 12 Years</td>
                    <td className="p-3 sm:p-3.5 text-slate-700">Detailed Taharah & Sawm rulings, Seerah narratives, introductory grammar</td>
                    <td className="p-3 sm:p-3.5 text-slate-700">Juz Amma fluent recitation, Noon & Meem Sakinah rules</td>
                  </tr>
                  <tr className="hover:bg-[#fdfaf5]">
                    <td className="p-3 sm:p-3.5 font-bold text-slate-900 whitespace-nowrap">Senior Secondary (Classes 8–10)</td>
                    <td className="p-3 sm:p-3.5 text-slate-600 whitespace-nowrap">13 – 15 Years</td>
                    <td className="p-3 sm:p-3.5 text-slate-700">Comprehensive Fiqh, Forty Hadith, Islamic moral ethics, modern challenges</td>
                    <td className="p-3 sm:p-3.5 text-slate-700">Complete Tilawat with full Tajweed, Surah Yaseen, Mulk memorization</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 block sm:hidden">← Swipe table sideways to view full curriculum details →</p>
        </div>
      </section>

      {/* 4. Admission CTA */}
      <section className="py-8 sm:py-10 bg-[#f4f1ea] border-t border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Seek Enrolment Guidance for Your Child
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Our teachers will assess the student’s current recitation level to assign them to the appropriate class.
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
