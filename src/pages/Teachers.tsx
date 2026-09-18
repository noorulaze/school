import React from 'react';
import { Users, CheckCircle2, ShieldCheck, UserCheck } from 'lucide-react';
import { TEACHERS, FACULTY_EDITORIAL_NOTICE } from '../data/teachers';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { IslamicPattern } from '../components/IslamicPattern';
import { SectionHeading } from '../components/SectionHeading';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

export const Teachers: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Header Banner */}
      <section className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <IslamicPattern variant="rosette" className="-top-12 -left-12 text-amber-400" opacity={0.08} />
        <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-800/80 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Honored Muallims & Mentors</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Teaching Faculty
          </h1>

          <p className="text-emerald-300 font-medium text-base sm:text-lg">
            Guiding Minds & Spirits at {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName})
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Our muallims embody scholarly piety, pedagogical patience, and continuous dedication to nurturing every child in the traditions of Islam.
          </p>
        </div>
      </section>

      {/* Main Faculty Directory */}
      <section className="py-16 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Institutional Compliance Notice */}
          <div className="max-w-4xl mx-auto mb-12 p-4 bg-amber-50 rounded-2xl border border-amber-200/90 flex items-start gap-3">
            <PlaceholderBadge label="Official Roster Notice" size="md" className="shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <p className="font-bold">Information Integrity Notice:</p>
              <p>{FACULTY_EDITORIAL_NOTICE}</p>
            </div>
          </div>

          {/* Faculty Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEACHERS.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center border border-amber-400/30 shadow-xs">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <PlaceholderBadge label="Profile Placeholder" size="sm" />
                  </div>

                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    {teacher.designation}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">
                    {teacher.namePlaceholder}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {teacher.bioPlaceholder}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1.5 mb-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-slate-500 font-medium">Role:</span>
                      <span className="text-slate-800 font-semibold text-right">{teacher.departmentRole}</span>
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-slate-500 font-medium">Credentials:</span>
                      <span className="text-slate-800 font-mono text-[11px] text-right">{teacher.qualificationPlaceholder}</span>
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-slate-500 font-medium">Experience:</span>
                      <span className="text-slate-800 font-mono text-[11px] text-right">{teacher.experiencePlaceholder}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{teacher.schedulePlaceholder}</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">Tirur, Kerala</span>
                </div>
              </div>
            ))}
          </div>

          {/* Ethos of the Muallim Banner */}
          <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 space-y-6">
            <SectionHeading
              badge="Teacher Code of Ethics"
              title="The Guiding Principles of Our"
              highlightedText="Educators"
              subtitle="The muallim is more than an instructor; they are a spiritual guardian and living example of Prophetic courtesy."
              alignment="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <h4 className="text-sm font-bold text-slate-900">Merciful Patience (Sabr)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Treating every child with gentleness, listening to their recitation struggles, and uplifting their confidence.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-2">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
                <h4 className="text-sm font-bold text-slate-900">Personal Integrity (Amanah)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Safeguarding the sacred trust placed by parents, adhering strictly to authenticated syllabus standards.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <Users className="w-5 h-5 text-slate-700" />
                <h4 className="text-sm font-bold text-slate-900">Community Partnership</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Regular consultation with parents to monitor homework, regular prayer habits at home, and good manners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
