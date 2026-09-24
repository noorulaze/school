import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  Sparkles,
  Share2,
  Check,
  Loader2,
  Building2,
  Phone
} from 'lucide-react';
import { getPublicEventById } from '../services/publicService';
import type { EventItem } from '../types/firestore';
import { SCHOOL_INFO } from '../data/schoolInfo';

export const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getPublicEventById(id);
        setEvent(data);
      } catch (err) {
        console.error('Error loading event detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 bg-[#fbfaf7]">
        <Loader2 className="w-9 h-9 text-[#164e37] animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600">Retrieving event schedule...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center bg-[#fbfaf7]">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
          <Calendar className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0f231c] mb-2">Event Not Found</h1>
        <p className="text-sm text-slate-600 max-w-md mb-6 leading-relaxed">
          The requested event may have concluded, been rescheduled, or is currently pending administrative publication.
        </p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#164e37] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-[#113d2b] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Events</span>
        </Link>
      </div>
    );
  }

  const coverUrl = event.coverImage || event.image;

  return (
    <div className="w-full bg-[#fbfaf7] text-slate-800 py-6 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Controls */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#164e37] transition-colors cursor-pointer py-1.5 px-3 rounded-lg hover:bg-white border border-transparent hover:border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 text-[#c59b27]" />
            <span>Back to Events</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#164e37] bg-white border border-slate-200 hover:border-emerald-300 px-3 py-1.5 rounded-xl shadow-2xs transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share Event'}</span>
          </button>
        </div>

        {/* Event Main Card */}
        <article className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e0d5] shadow-xs overflow-hidden">
          {/* Cover Banner if available */}
          {coverUrl ? (
            <div className="w-full h-64 sm:h-80 md:h-96 relative overflow-hidden bg-slate-900">
              <img
                src={coverUrl}
                alt={event.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ) : (
            <div className="w-full h-32 sm:h-44 bg-gradient-to-r from-[#0f281f] via-[#164e37] to-[#1c5f43] relative overflow-hidden flex items-center px-6 sm:px-10">
              <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
              <div className="text-white">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#c59b27] block mb-1">
                  School Program & Event
                </span>
                <span className="text-lg sm:text-xl font-bold opacity-90">
                  {SCHOOL_INFO.officialName}
                </span>
              </div>
            </div>
          )}

          {/* Header & Badges */}
          <div className="p-6 sm:p-8 md:p-10 border-b border-[#eee9df]">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#164e37] text-white tracking-wide">
                {event.category || 'School Event'}
              </span>

              {event.featured && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  <span>Featured Program</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f231c] tracking-tight leading-tight mb-6">
              {event.title}
            </h1>

            {/* Event Key Facts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {/* Date */}
              <div className="p-3.5 rounded-xl bg-[#fbfaf7] border border-[#e8e4dc] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-[#164e37]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Scheduled Date
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {event.date}
                  </span>
                </div>
              </div>

              {/* Time */}
              <div className="p-3.5 rounded-xl bg-[#fbfaf7] border border-[#e8e4dc] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#c59b27]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Program Timing
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {event.startTime ? `${event.startTime} - ${event.endTime || 'Closing'}` : 'Morning Session'}
                  </span>
                </div>
              </div>

              {/* Venue */}
              <div className="p-3.5 rounded-xl bg-[#fbfaf7] border border-[#e8e4dc] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-blue-700" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Location / Venue
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 truncate block">
                    {event.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Full Details */}
          <div className="p-6 sm:p-8 md:p-10 space-y-6">
            {/* Lead summary */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 text-sm sm:text-base font-medium text-emerald-950 leading-relaxed">
              {event.description}
            </div>

            {/* Detailed description */}
            {event.fullDescription && (
              <div className="prose max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-line pt-2">
                {event.fullDescription}
              </div>
            )}

            {/* Participation & Community Card */}
            <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#164e37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f231c]">
                    Organized by {SCHOOL_INFO.officialName}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    For participation queries, guest arrangements, or volunteering details:
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
                  <Phone className="w-3.5 h-3.5 text-[#164e37]" />
                  <a href={`tel:${SCHOOL_INFO.contact.phone}`} className="hover:underline">
                    {SCHOOL_INFO.contact.phone}
                  </a>
                </span>
                <Link
                  to="/events"
                  className="px-3.5 py-1.5 bg-[#164e37] text-white font-bold text-xs rounded-xl hover:bg-[#113d2b] transition-colors"
                >
                  All Events
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
