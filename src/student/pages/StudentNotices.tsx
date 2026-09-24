import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, Loader2, AlertTriangle, ArrowRight } from 'lucide-react';
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
          School Notices & Circulars
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
              <div className="flex items-center justify-between text-[10px] text-slate-500 flex-wrap gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                    {n.category}
                  </span>
                  {n.priority && n.priority !== 'Normal' && (
                    <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full ${
                      n.priority === 'Urgent'
                        ? 'bg-rose-100 text-rose-900 border border-rose-200'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}>
                      <AlertTriangle className="w-2.5 h-2.5" />
                      <span>{n.priority}</span>
                    </span>
                  )}
                </div>
                <span className="font-mono">{n.date}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{n.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {n.description}
              </p>
              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <Link
                  to={`/notice/${n.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#164e37] hover:underline"
                >
                  <span>Read Full Circular</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c59b27]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
