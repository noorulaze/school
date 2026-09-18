import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  arabicAccent?: string;
  title: string;
  highlightedText?: string;
  subtitle?: string;
  alignment?: 'center' | 'left';
  theme?: 'dark' | 'light';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  arabicAccent,
  title,
  highlightedText,
  subtitle,
  alignment = 'center',
  theme = 'light',
  className = '',
}) => {
  const isCenter = alignment === 'center';
  const isDark = theme === 'dark';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'} ${className}`}>
      {arabicAccent && (
        <p
          className={`font-amiri text-lg sm:text-xl tracking-wide mb-2 ${
            isDark ? 'text-amber-400/90' : 'text-emerald-700/90'
          }`}
          dir="rtl"
        >
          {arabicAccent}
        </p>
      )}

      {badge && (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 ${
          isDark
            ? 'bg-emerald-800/60 text-amber-300 border border-amber-400/30'
            : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          {badge}
        </div>
      )}

      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${
        isDark ? 'text-white' : 'text-slate-900'
      }`}>
        {title}{' '}
        {highlightedText && (
          <span className="relative whitespace-nowrap">
            <span className={isDark ? 'text-amber-400' : 'text-emerald-700'}>
              {highlightedText}
            </span>
            <svg
              className="absolute -bottom-1.5 left-0 w-full h-2 text-amber-500/40"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
              fill="none"
            >
              <path d="M0 6 Q 50 12 100 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        )}
      </h2>

      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {subtitle}
        </p>
      )}

      {isCenter && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400" />
          <div className="w-2 h-2 rotate-45 bg-amber-500" />
          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400" />
        </div>
      )}
    </div>
  );
};
