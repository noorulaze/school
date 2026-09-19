import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ShieldAlert } from 'lucide-react';
import { EVENTS, EVENTS_EDITORIAL_NOTICE, type SchoolEvent } from '../data/events';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

export const Events: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Upcoming Events', 'Academic Programs', 'Islamic Programs', 'Notices'];

  const filteredEvents = selectedCategory === 'All'
    ? EVENTS
    : EVENTS.filter((e) => e.category === selectedCategory);

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7]">
      {/* Page Header & Breadcrumb */}
      <section className="bg-white border-b border-[#e5e0d5] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-[#164e37]">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">Events & Calendar</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f231c]">
            Events & Academic Programs
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Schedules for upcoming events, academic assessments, Islamic observances, and official notices at {SCHOOL_INFO.officialName}.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Compliance Notice */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-950">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">Schedule Transparency Notice:</p>
            <p className="text-slate-700 leading-relaxed">
              {EVENTS_EDITORIAL_NOTICE}
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
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

        {/* Events Cards Grid */}
        <div className="space-y-4">
          {filteredEvents.map((event: SchoolEvent) => (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-[#e5e0d5] p-5 sm:p-6 shadow-2xs space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#f4f1ea] text-[#164e37] border border-[#d2cabb]">
                  {event.category}
                </span>
                <PlaceholderBadge label="Editable Event Placeholder" size="sm" />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                  {event.fullDetails}
                </p>
              </div>

              {/* Event Logistics Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#164e37] shrink-0" />
                  <span>{event.datePlaceholder}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#164e37] shrink-0" />
                  <span>{event.timePlaceholder}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#164e37] shrink-0" />
                  <span>{event.venuePlaceholder}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
