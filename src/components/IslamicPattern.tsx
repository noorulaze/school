import React from 'react';

interface IslamicPatternProps {
  className?: string;
  variant?: 'star' | 'border' | 'rosette' | 'grid';
  opacity?: number;
}

export const IslamicPattern: React.FC<IslamicPatternProps> = ({
  className = '',
  variant = 'star',
  opacity = 0.12,
}) => {
  if (variant === 'border') {
    return (
      <div className={`w-full overflow-hidden flex items-center justify-center py-2 ${className}`}>
        <svg
          className="w-full max-w-4xl h-4 text-amber-500/40"
          viewBox="0 0 400 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 6 L10 0 L20 6 L30 0 L40 6 L50 0 L60 6 L70 0 L80 6 L90 0 L100 6 L110 0 L120 6 L130 0 L140 6 L150 0 L160 6 L170 0 L180 6 L190 0 L200 6 L210 0 L220 6 L230 0 L240 6 L250 0 L260 6 L270 0 L280 6 L290 0 L300 6 L310 0 L320 6 L330 0 L340 6 L350 0 L360 6 L370 0 L380 6 L390 0 L400 6"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="200" cy="6" r="3" fill="currentColor" />
        </svg>
      </div>
    );
  }

  if (variant === 'rosette') {
    return (
      <svg
        className={`pointer-events-none absolute ${className}`}
        width="320"
        height="320"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <circle cx="100" cy="100" r="90" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="75" stroke="#10B981" strokeWidth="0.8" />
        {/* 8 Pointed Star */}
        <polygon
          points="100,20 120,70 175,70 135,105 150,160 100,130 50,160 65,105 25,70 80,70"
          stroke="#D4AF37"
          strokeWidth="1.2"
          fill="none"
        />
        <polygon
          points="100,30 115,75 160,75 128,105 140,150 100,125 60,150 72,105 40,75 85,75"
          stroke="#064E3B"
          strokeWidth="0.8"
          fill="none"
        />
        <circle cx="100" cy="100" r="30" stroke="#D4AF37" strokeWidth="1" />
        <circle cx="100" cy="100" r="10" fill="#D4AF37" opacity="0.4" />
      </svg>
    );
  }

  // Default 8-pointed star
  return (
    <div
      className={`pointer-events-none absolute inset-0 bg-islamic-pattern ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
};
