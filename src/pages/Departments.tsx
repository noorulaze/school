import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { DEPARTMENTS, type DepartmentItem } from '../data/departments';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

interface DepartmentsProps {
  onOpenAdmissionModal: () => void;
}

export const Departments: React.FC<DepartmentsProps> = ({ onOpenAdmissionModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Foundational', 'Theological', 'Language', 'Character & Ethics'];

  const filteredDepartments = selectedCategory === 'All'
    ? DEPARTMENTS
    : DEPARTMENTS.filter((d) => d.category === selectedCategory);

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7]">
      {/* Page Header & Breadcrumb */}
      <section className="bg-white border-b border-[#e5e0d5] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-[#164e37]">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">Educational Departments</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f231c]">
            Curriculum & Academic Wings
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Detailed breakdown of religious disciplines, prescribed syllabi, and educational streams at {SCHOOL_INFO.officialName}.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                selectedCategory === cat
                  ? 'bg-[#164e37] text-white border-[#164e37]'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-[#d2cabb]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDepartments.map((dept: DepartmentItem) => (
            <div
              key={dept.id}
              className="bg-white rounded-xl border border-[#e5e0d5] p-6 flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#164e37] bg-[#f4f1ea] px-2 py-0.5 rounded border border-[#d2cabb]">
                      {dept.code}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {dept.category}
                    </span>
                  </div>
                  <PlaceholderBadge label="Editable Syllabus" size="sm" />
                </div>

                <h2 className="text-lg font-bold text-slate-900 mb-0.5">
                  {dept.name}
                </h2>

                {dept.arabicName && (
                  <p className="font-amiri text-sm text-[#164e37] mb-3" dir="rtl">
                    {dept.arabicName}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {dept.fullDescription}
                </p>

                {/* Syllabus Highlights Box */}
                <div className="p-3.5 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] text-xs space-y-2 mb-4">
                  <strong className="block text-slate-800 text-[11px] uppercase tracking-wider">
                    Prescribed Syllabi Overview:
                  </strong>
                  <ul className="space-y-1.5">
                    {dept.syllabusOverview.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Outcomes */}
                <div className="space-y-1.5 mb-4">
                  <strong className="block text-slate-800 text-[11px] uppercase tracking-wider">
                    Key Outcomes:
                  </strong>
                  <div className="flex flex-wrap gap-1.5">
                    {dept.keyOutcomes.map((outcome, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-[#f4f1ea] text-slate-800 px-2 py-0.5 rounded border border-[#d2cabb]"
                      >
                        {outcome}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e5e0d5] flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Target: {dept.targetLevels}</span>
                <button
                  onClick={onOpenAdmissionModal}
                  className="font-bold text-[#164e37] hover:underline flex items-center gap-1"
                >
                  <span>Admission Enquiry</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Stages Overview Table */}
        <section className="bg-white rounded-xl border border-[#e5e0d5] p-6 space-y-4">
          <div className="border-b border-[#e5e0d5] pb-3">
            <h3 className="text-base font-bold text-slate-900">
              Overview of Madrassa Academic Stages
            </h3>
            <p className="text-xs text-slate-600">
              Structure of progression from foundational Qaida through senior high school batches.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left school-table">
              <thead>
                <tr>
                  <th>Stage / Wing</th>
                  <th>Target Grades</th>
                  <th>Primary Focus</th>
                  <th>Class Sessions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e0d5] text-xs">
                <tr>
                  <td className="font-bold text-slate-900">Foundational Wing</td>
                  <td>Preparatory & Class 1–2</td>
                  <td>Alphabet phonetics, Noorani Qaida, basic duas, prayer posture</td>
                  <td>Morning (6:45 AM – 8:30 AM)</td>
                </tr>
                <tr>
                  <td className="font-bold text-slate-900">Primary Madrasa Wing</td>
                  <td>Class 3 through 5</td>
                  <td>Fluent recitation with Tajweed rules, fundamental Fiqh, memorization of Amma Juz</td>
                  <td>Morning (6:45 AM – 8:30 AM)</td>
                </tr>
                <tr>
                  <td className="font-bold text-slate-900">Intermediate Wing</td>
                  <td>Class 6 through 7</td>
                  <td>Arabic grammar basics (Nahw & Sarf), Hadith studies, Seerah of the Prophet</td>
                  <td>Morning / Evening Batches</td>
                </tr>
                <tr>
                  <td className="font-bold text-slate-900">Senior Madrasa Wing</td>
                  <td>Class 8 through 10</td>
                  <td>Comprehensive Islamic theology, jurisprudential rulings, contemporary ethics</td>
                  <td>Morning / Evening Batches</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center pt-2">
          <button
            onClick={onOpenAdmissionModal}
            className="px-6 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
          >
            Submit Student Admission Enquiry
          </button>
        </div>
      </div>
    </div>
  );
};
