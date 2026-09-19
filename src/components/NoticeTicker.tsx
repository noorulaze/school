import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronRight, X } from 'lucide-react';

interface NoticeTickerProps {
  onOpenAdmissionModal?: () => void;
}

export const NoticeTicker: React.FC<NoticeTickerProps> = ({ onOpenAdmissionModal }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#123827] text-white text-xs border-b border-[#1b5038]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#c59b27] text-[#0a251b] font-bold text-[10px] tracking-wide uppercase">
            <Bell className="w-3 h-3" />
            <span>Official Notice</span>
          </span>

          <p className="truncate text-slate-100 text-xs">
            <strong className="font-semibold text-amber-300">Academic Year 2025–2026:</strong> Admission enquiry is currently open for Class 1 & preparatory streams. Visit the school office in Korangath.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          {onOpenAdmissionModal ? (
            <button
              onClick={onOpenAdmissionModal}
              className="text-amber-300 hover:text-white font-semibold underline text-[11px] sm:text-xs flex items-center gap-0.5"
            >
              <span>Enquire Online</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          ) : (
            <Link
              to="/contact"
              className="text-amber-300 hover:text-white font-semibold underline text-[11px] sm:text-xs flex items-center gap-0.5"
            >
              <span>Details</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          )}

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 text-emerald-300 hover:text-white rounded transition-colors ml-1"
            title="Dismiss notification"
            aria-label="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
