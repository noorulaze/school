import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { EVENTS, EVENTS_EDITORIAL_NOTICE, type SchoolEvent } from '../data/events';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { IslamicPattern } from '../components/IslamicPattern';
import { SectionHeading } from '../components/SectionHeading';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

export const Events: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Academic', 'Cultural', 'Spiritual', 'Admissions', 'Meeting'];

  const filteredEvents = selectedCategory === 'All'
    ? EVENTS
    : EVENTS.filter((e) => e.category === selectedCategory);

  return (
    <div className="w-full flex flex-col">
      {/* Header Banner */}
      <section className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <IslamicPattern variant="rosette" className="-top-12 -left-12 text-amber-400" opacity={0.08} />
        <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-800/80 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Academic Milestones & Programs</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Events & Academic Calendar
          </h1>

          <p className="text-emerald-300 font-medium text-base sm:text-lg">
            Happenings & Gatherings at {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName})
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Stay informed on annual convocations, spiritual commemorations, examination circulars, and parent-teacher consultative meets.
          </p>
        </div>
      </section>

      {/* Main Events List */}
      <section className="py-16 bg-[#FDFBF7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Institutional Compliance Notice */}
          <div className="mb-10 p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
            <PlaceholderBadge label="Schedule Notice" size="sm" className="shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Administrative Timeline Notice:</p>
              <p>{EVENTS_EDITORIAL_NOTICE}</p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Events Feed */}
          <div className="space-y-6">
            {filteredEvents.map((event: SchoolEvent) => (
              <div
                key={event.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                      {event.category}
                    </span>
                    <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {event.statusBadge}
                    </span>
                  </div>
                  <PlaceholderBadge label="Event Slot Editable" size="sm" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  {event.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {event.fullDetails}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{event.datePlaceholder}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{event.timePlaceholder}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{event.venuePlaceholder}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Academic Year Milestones Overview */}
          <div className="mt-16 bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <SectionHeading
              badge="Yearly Flow"
              title="Academic Term"
              highlightedText="Structure"
              subtitle="Overview of typical yearly schedules under the madrasa academic board."
              alignment="left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-800 uppercase">Term 1</span>
                <p className="text-xs font-bold text-slate-900">Commencement & Review</p>
                <p className="text-[11px] text-slate-500">
                  Enrollment of new students, textbook distribution, and introductory Tajweed diagnostics.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-800 uppercase">Mid-Year</span>
                <p className="text-xs font-bold text-slate-900">Milad & Cultural Meets</p>
                <p className="text-[11px] text-slate-500">
                  Qira'at competitions, Seerah exhibitions, and mid-term evaluation tests.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-800 uppercase">Term 2</span>
                <p className="text-xs font-bold text-slate-900">Advanced Syllabi & Fiqh</p>
                <p className="text-[11px] text-slate-500">
                  Completion of prescribed chapters in jurisprudence, Arabic grammar, and Hadith.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-800 uppercase">Conclusion</span>
                <p className="text-xs font-bold text-slate-900">Board Exams & Annual Day</p>
                <p className="text-[11px] text-slate-500">
                  Annual assessments, issuance of merit certificates, and general convocation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
