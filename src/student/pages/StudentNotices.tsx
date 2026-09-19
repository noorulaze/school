import React, { useEffect, useState } from 'react';
import { Bell, Search, Loader2 } from 'lucide-react';
import { getStudentNotices } from '../../services/studentService';
import type { NoticeItem } from '../../types/firestore';

export const StudentNotices: React.FC = () => {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getStudentNotices();
        setNotices(data);
      } catch (err) {
        console.error('Error loading notices:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = notices.filter(
    (n) =>
      search === '' ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Madrassa Notices & Circulars
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Official administrative announcements, examination dates, and academic circulars.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search circulars..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-700 focus:bg-white"
          />
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Loader2 className="w-8 h-8 text-emerald-800 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Loading notices...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Bell className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No circulars found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-all space-y-2"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span className="font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                  {n.category}
                </span>
                <span className="font-mono">{n.date}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{n.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                {n.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
