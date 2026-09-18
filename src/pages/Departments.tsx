import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Layers, Award, FileText } from 'lucide-react';
import { DEPARTMENTS, type DepartmentItem } from '../data/departments';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { IslamicPattern } from '../components/IslamicPattern';
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
    <div className="w-full flex flex-col">
      {/* Header Banner */}
      <section className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <IslamicPattern variant="rosette" className="-bottom-16 -left-16 text-amber-400" opacity={0.08} />
        <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-800/80 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Academic Curriculum & Wings</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Educational Departments
          </h1>

          <p className="text-emerald-300 font-medium text-base sm:text-lg">
            Structured Islamic Learning at {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName})
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Comprehensive religious education combining accurate Quranic articulation, Islamic jurisprudence, Arabic literacy, and moral tarbiyyah.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Department Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredDepartments.map((dept: DepartmentItem) => (
              <div
                key={dept.id}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        {dept.code}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {dept.category}
                      </span>
                    </div>
                    <PlaceholderBadge label="Editable Department Syllabus" size="sm" />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                    {dept.name}
                  </h2>

                  {dept.arabicName && (
                    <p className="font-amiri text-lg text-emerald-700 mb-3" dir="rtl">
                      {dept.arabicName}
                    </p>
                  )}

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {dept.fullDescription}
                  </p>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 mb-6 space-y-3">
                    <p className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-700" />
                      Prescribed Syllabus Overview
                    </p>
                    <ul className="space-y-2">
                      {dept.syllabusOverview.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-600" />
                      Key Learning Outcomes
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.keyOutcomes.map((outcome, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-amber-50 text-amber-900 px-3 py-1 rounded-lg border border-amber-200/70"
                        >
                          {outcome}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Target Level: {dept.targetLevels}</span>
                  <button
                    onClick={onOpenAdmissionModal}
                    className="text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1"
                  >
                    <span>Enquire for this Stream</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Curriculum Methodology Banner */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-emerald-900 text-white border border-amber-400/40 relative overflow-hidden shadow-xl">
            <IslamicPattern variant="grid" opacity={0.06} />
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Pedagogical Approach
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                How Knowledge is Taught at Sharaful Islam Madrassa
              </h3>
              <p className="text-sm text-emerald-100/90 leading-relaxed font-light">
                Instruction is conducted in disciplined, clean classroom environments where muallims give personal attention to each child's pronunciation, prayer performance, and understanding. Periodic oral testing and parent progress checks ensure consistent advancement.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenAdmissionModal}
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md"
                >
                  Admission Enquiry for 2025–2026 Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
