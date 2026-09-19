import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  ShieldAlert,
  ArrowRight,
  Clock,
  Sparkles,
  Loader2
} from 'lucide-react';
import { EVENTS_EDITORIAL_NOTICE } from '../data/events';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { getPublicEvents } from '../services/publicService';
import type { EventItem } from '../types/firestore';

export const Events: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await getPublicEvents();
        setEvents(data);
      } catch (err) {
        console.error('Error loading public events:', err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const categories = ['All', 'Religious', 'Academic', 'Cultural', 'Sports', 'Competition', 'General'];

  const filteredEvents =
    selectedCategory === 'All'
      ? events
      : events.filter((e) => e.category?.toLowerCase() === selectedCategory.toLowerCase());

  const featuredEvent = events.find((e) => e.featured);

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7] text-slate-800">
      {/* 1. Page Header */}
      <section className="bg-white border-b border-[#e5e0d5] py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
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
              Official schedule for school assemblies, quarterly assessments, Islamic celebrations, and administrative programs at {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName}).
            </p>
          </div>
        </div>
      </section>

      {/* 2. Transparency & Non-fabrication Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-5 sm:pt-8">
        <div className="p-3.5 sm:p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-950">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="block font-bold">Calendar Notice:</strong>
            <p className="text-slate-700 leading-relaxed text-xs">
              {EVENTS_EDITORIAL_NOTICE} Specific calendar dates and programs are officially logged by the administrative office for the current academic session.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Featured Event Spotlight (if available) */}
      {featuredEvent && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-6">
          <div className="bg-gradient-to-br from-[#0d281e] via-[#164e37] to-[#0f3b29] rounded-2xl sm:rounded-3xl text-white p-6 sm:p-8 md:p-10 shadow-lg border border-[#1a4434] overflow-hidden relative">
            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#c59b27] text-slate-950 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Program</span>
                </span>
                <span className="text-xs font-mono text-emerald-200">{featuredEvent.date}</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
                {featuredEvent.title}
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6">
                {featuredEvent.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-emerald-100 mb-6">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#c59b27]" />
                  <span>{featuredEvent.location}</span>
                </span>
                {featuredEvent.startTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#c59b27]" />
                    <span>{featuredEvent.startTime} - {featuredEvent.endTime || 'Closing'}</span>
                  </span>
                )}
              </div>

              <Link
                to={`/events/${featuredEvent.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#f4f1ea] text-[#164e37] font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                <span>View Program Details</span>
                <ArrowRight className="w-4 h-4 text-[#c59b27]" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 4. Category Filter Tabs & Agenda List */}
      <section className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all border whitespace-nowrap shrink-0 min-h-[38px] cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#164e37] text-white border-[#164e37] shadow-2xs font-bold'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-[#d2cabb]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Agenda List */}
          {loading ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Loader2 className="w-8 h-8 text-emerald-800 animate-spin mx-auto mb-2" />
              <p className="text-xs text-slate-500">Loading scheduled programs...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No events found in this category</p>
              <p className="text-xs text-slate-400 mt-1">
                Select "All" to view the complete madrassa calendar.
              </p>
            </div>
          ) : (
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
                        {event.date}
                      </span>
                      {event.startTime && (
                        <span className="text-[11px] text-slate-500">
                          {event.startTime} - {event.endTime || 'End'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Center: Title & Description */}
                  <div className="flex-grow space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#164e37] bg-[#f4f1ea] px-2.5 py-0.5 rounded border border-[#d2cabb]">
                        {event.category || 'Program'}
                      </span>
                      {event.featured && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      <Link to={`/events/${event.id}`} className="hover:text-[#164e37] transition-colors">
                        {event.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-3xl line-clamp-2">
                      {event.description}
                    </p>
                  </div>

                  {/* Right: Venue & View Link */}
                  <div className="md:w-52 shrink-0 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-[#f0ece1]">
                    <div className="flex items-center md:justify-end gap-1.5 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                      <span className="truncate max-w-[160px]">{event.location}</span>
                    </div>
                    <Link
                      to={`/events/${event.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#164e37] hover:underline"
                    >
                      <span>View Program</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#c59b27]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Annual Academic Milestones Table */}
      <section className="py-8 sm:py-12 bg-white border-t border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
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
                    <td className="p-3 sm:p-3.5 text-slate-600 whitespace-nowrap">June Session Opening</td>
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
                    <td className="p-3 sm:p-3.5 text-slate-600 whitespace-nowrap">Quarterly Evaluation Batch</td>
                  </tr>
                  <tr className="hover:bg-[#fdfaf5]">
                    <td className="p-3 sm:p-3.5 font-bold text-slate-900 whitespace-nowrap">Year End</td>
                    <td className="p-3 sm:p-3.5 text-slate-700">Annual Sanad Distribution & Parents Assembly</td>
                    <td className="p-3 sm:p-3.5 text-slate-600">Graduating Students & Community</td>
                    <td className="p-3 sm:p-3.5 text-slate-600 whitespace-nowrap">Annual Concluding Term</td>
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
