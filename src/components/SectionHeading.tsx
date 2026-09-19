import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  arabicAccent?: string;
  title: string;
  highlightedText?: string;
  subtitle?: string;
  alignment?: 'center' | 'left';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  arabicAccent,
  title,
  highlightedText,
  subtitle,
  alignment = 'center',
  className = '',
}) => {
  const isCenter = alignment === 'center';

  return (
    <div className={`mb-8 sm:mb-10 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'} ${className}`}>
      {arabicAccent && (
        <p
          className="font-amiri text-lg text-[#164e37] mb-1.5 font-normal tracking-wide"
          dir="rtl"
        >
          {arabicAccent}
        </p>
      )}

      {badge && (
        <div className="inline-block text-[11px] font-bold tracking-wider uppercase text-[#164e37] mb-2">
          {badge}
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold text-[#0f231c] tracking-tight">
        {title}{' '}
        {highlightedText && (
          <span className="text-[#164e37] font-extrabold underline decoration-[#c59b27] decoration-2 underline-offset-4">
            {highlightedText}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}

      {isCenter && (
        <div className="flex items-center justify-center gap-1.5 mt-3">
          <div className="w-8 h-px bg-[#164e37]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#c59b27]" />
          <div className="w-8 h-px bg-[#164e37]" />
        </div>
      )}
    </div>
  );
};
