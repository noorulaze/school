import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Search, Loader2 } from 'lucide-react';
import { getStudentEvents } from '../../services/studentService';
import type { EventItem } from '../../types/firestore';

export const StudentEvents: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getStudentEvents();
        setEvents(data);
      } catch (err) {
        console.error('Error loading events:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = events.filter(
    (ev) =>
      search === '' ||
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.description.toLowerCase().includes(search.toLowerCase()) ||
      ev.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Upcoming School Events
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Academic programs, student competitions, parent-teacher interactions, and celebrations.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events by title or venue..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-700 focus:bg-white"
          />
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Loader2 className="w-8 h-8 text-emerald-800 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Loading scheduled events...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No events found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2">
                  <span className="font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    {ev.category || 'School Event'}
                  </span>
                  <span className="font-semibold text-slate-600">{ev.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{ev.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{ev.location}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                  {ev.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
