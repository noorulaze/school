import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Calendar,
  ArrowLeft,
  Users,
  AlertTriangle,
  FileText,
  Phone,
  Clock,
  Loader2,
  Share2,
  Check
} from 'lucide-react';
import { getPublicNoticeById } from '../services/publicService';
import type { NoticeItem } from '../types/firestore';
import { SCHOOL_INFO } from '../data/schoolInfo';

export const NoticeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<NoticeItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchNotice = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getPublicNoticeById(id);
        setNotice(data);
      } catch (err) {
        console.error('Error loading notice detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
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
        <p className="text-sm font-semibold text-slate-600">Retrieving official madrassa circular...</p>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center bg-[#fbfaf7]">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
          <Bell className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0f231c] mb-2">Notice Not Found</h1>
        <p className="text-sm text-slate-600 max-w-md mb-6 leading-relaxed">
          The requested announcement may have expired, been archived, or is only accessible to authorized institutional accounts.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#164e37] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-[#113d2b] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home Overview</span>
        </Link>
      </div>
    );
  }

  const priorityColor =
    notice.priority === 'Urgent'
      ? 'bg-rose-50 text-rose-800 border-rose-300'
      : notice.priority === 'Important'
      ? 'bg-amber-50 text-amber-900 border-amber-300'
      : 'bg-emerald-50 text-emerald-800 border-emerald-200';

  return (
    <div className="w-full bg-[#fbfaf7] text-slate-800 py-6 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#164e37] transition-colors cursor-pointer py-1.5 px-3 rounded-lg hover:bg-white border border-transparent hover:border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 text-[#c59b27]" />
            <span>Go Back</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#164e37] bg-white border border-slate-200 hover:border-emerald-300 px-3 py-1.5 rounded-xl shadow-2xs transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share Notice'}</span>
          </button>
        </div>

        {/* Notice Main Article Card */}
        <article className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e0d5] shadow-xs overflow-hidden">
          {/* Header Banner */}
          <div className="p-6 sm:p-8 md:p-10 border-b border-[#eee9df] bg-gradient-to-b from-[#f7f5ee] to-white">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#164e37] text-white tracking-wide">
                {notice.category}
              </span>

              {notice.priority && notice.priority !== 'Normal' && (
                <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full border ${priorityColor}`}>
                  <AlertTriangle className="w-3 h-3" />
                  <span>{notice.priority} Notice</span>
                </span>
              )}

              {notice.targetAudience && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  <Users className="w-3 h-3 text-slate-500" />
                  <span>Audience: {notice.targetAudience}</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f231c] tracking-tight leading-tight mb-4">
              {notice.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 pt-2 border-t border-slate-200/60 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#c59b27]" />
                <span>Published: {notice.date}</span>
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                <FileText className="w-3.5 h-3.5" />
                <span>Ref: #{notice.id}</span>
              </span>
            </div>
          </div>

          {/* Article Body */}
          <div className="p-6 sm:p-8 md:p-10 space-y-6">
            {/* Lead Summary */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#fbfaf7] border border-[#e8e4dc] text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
              {notice.description}
            </div>

            {/* Full Content Body */}
            {notice.fullContent && (
              <div className="prose max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-line pt-2">
                {notice.fullContent}
              </div>
            )}

            {/* Official Seal / Institutional Verification Block */}
            <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Authorized Issuing Desk
                </span>
                <p className="text-xs sm:text-sm font-bold text-[#0f231c]">
                  {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName})
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Korangath, Tirur, Malappuram District, Kerala
                </p>
              </div>

              <div className="flex flex-col sm:items-end gap-1 text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#164e37]" />
                  <a href={`tel:${SCHOOL_INFO.contact.phone}`} className="font-semibold hover:underline">
                    {SCHOOL_INFO.contact.phone}
                  </a>
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Office: {SCHOOL_INFO.contact.officeHours}</span>
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
