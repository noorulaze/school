import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ShieldAlert } from 'lucide-react';
import { EVENTS, EVENTS_EDITORIAL_NOTICE } from '../data/events';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

export const Events: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Upcoming Events', 'Academic Programs', 'Islamic Programs', 'Notices'];

  const filteredEvents =
    selectedCategory === 'All'
      ? EVENTS
      : EVENTS.filter((e) => e.category === selectedCategory);

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7] text-slate-800">
      {/* 1. Page Header */}
      <section className="bg-white border-b border-[#e5e0d5] py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-[#164e37]">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">Events & Academic Calendar</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0f231c] tracking-tight">
              Events & Academic Calendar
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 leading-relaxed">
              Official schedule for school assemblies, quarterly assessments, Islamic celebrations, and administrative notices at {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName}).
            </p>
          </div>
        </div>
      </section>

      {/* 2. Transparency & Non-fabrication Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 sm:pt-8">
        <div className="p-3.5 sm:p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-950">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="block font-bold">Calendar Notice:</strong>
            <p className="text-slate-700 leading-relaxed text-xs">
              {EVENTS_EDITORIAL_NOTICE} Specific calendar dates are marked as administrative placeholders until confirmed by the managing committee for the current session.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Category Filter Tabs */}
      <section className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all border whitespace-nowrap shrink-0 min-h-[38px] ${
                  selectedCategory === cat
                    ? 'bg-[#164e37] text-white border-[#164e37] shadow-2xs font-bold'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-[#d2cabb]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Modern Editorial Agenda List (Not repetitive cards) */}
          <div className="border border-[#e5e0d5] bg-white rounded-xl sm:rounded-2xl overflow-hidden divide-y divide-[#e5e0d5] shadow-2xs">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 sm:p-6 hover:bg-[#fbfaf7] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5"
              >
                {/* Left: Date Badge */}
                <div className="flex items-center gap-3 sm:gap-4 md:w-56 shrink-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#f4f1ea] border border-[#d2cabb] flex flex-col items-center justify-center text-center shrink-0">
                    <Calendar className="w-5 h-5 text-[#164e37]" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900 leading-tight">
                      {event.datePlaceholder}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Event ID: {event.id}
                    </span>
                  </div>
                </div>

                {/* Center: Title & Description */}
                <div className="flex-grow space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#164e37] bg-[#f4f1ea] px-2.5 py-0.5 rounded border border-[#d2cabb]">
                      {event.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      {event.timePlaceholder}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {event.summary}
                  </p>
                </div>

                {/* Right: Venue & Placeholder Tag */}
                <div className="md:w-52 shrink-0 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-[#f0ece1]">
                  <div className="flex items-center md:justify-end gap-1.5 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                    <span className="truncate">{event.venuePlaceholder}</span>
                  </div>
                  <PlaceholderBadge label="Schedule Slot" size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Annual Academic Milestones Table */}
      <section className="py-8 sm:py-12 bg-white border-t border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-6 sm:mb-8">
            <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider block mb-1">
              Annual Milestones
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0f231c]">
              Standard Academic Term Milestones
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              General timeline of yearly educational phases observed at Sharafiyya Korangath.
            </p>
          </div>

          <div className="border border-[#e5e0d5] rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#f4f1ea] border-b border-[#d2cabb] text-[#164e37]">
                    <th className="p-3 sm:p-3.5 font-bold uppercase tracking-wider whitespace-nowrap">Phase</th>
                    <th className="p-3 sm:p-3.5 font-bold uppercase tracking-wider whitespace-nowrap">Event Milestone</th>
                    <th className="p-3 sm:p-3.5 font-bold uppercase tracking-wider whitespace-nowrap">Target Participants</th>
                    <th className="p-3 sm:p-3.5 font-bold uppercase tracking-wider whitespace-nowrap">Expected Timeframe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e0d5]">
                  <tr className="hover:bg-[#fdfaf5]">
                    <td className="p-3 sm:p-3.5 font-bold text-slate-900 whitespace-nowrap">Term 1</td>
                    <td className="p-3 sm:p-3.5 text-slate-700">Academic Session Re-opening & Welcome Assembly</td>
                    <td className="p-3 sm:p-3.5 text-slate-600">All Students & Parents</td>
                    <td className="p-3 sm:p-3.5 text-slate-600 whitespace-nowrap">[Term 1 Opening Date]</td>
                  </tr>
                  <tr className="hover:bg-[#fdfaf5]">
                    <td className="p-3 sm:p-3.5 font-bold text-slate-900 whitespace-nowrap">Mid-Session</td>
                    <td className="p-3 sm:p-3.5 text-slate-700">Milad un-Nabi Observance & Recitation Fest</td>
                    <td className="p-3 sm:p-3.5 text-slate-600">All Enrolled Classes</td>
                    <td className="p-3 sm:p-3.5 text-slate-600 whitespace-nowrap">Rabi’ al-Awwal Observance</td>
                  </tr>
                  <tr className="hover:bg-[#fdfaf5]">
                    <td className="p-3 sm:p-3.5 font-bold text-slate-900 whitespace-nowrap">Term 2</td>
                    <td className="p-3 sm:p-3.5 text-slate-700">Quarterly Oral Recitation & Written Evaluation</td>
                    <td className="p-3 sm:p-3.5 text-slate-600">Classes 1–10</td>
                    <td className="p-3 sm:p-3.5 text-slate-600 whitespace-nowrap">[Evaluation Date Placeholder]</td>
                  </tr>
                  <tr className="hover:bg-[#fdfaf5]">
                    <td className="p-3 sm:p-3.5 font-bold text-slate-900 whitespace-nowrap">Year End</td>
                    <td className="p-3 sm:p-3.5 text-slate-700">Annual Sanad Distribution & Parents Assembly</td>
                    <td className="p-3 sm:p-3.5 text-slate-600">Graduating Students & Community</td>
                    <td className="p-3 sm:p-3.5 text-slate-600 whitespace-nowrap">[Concluding Ceremony Date]</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 block sm:hidden">← Swipe table sideways to view all phases →</p>
        </div>
      </section>
    </div>
  );
};
