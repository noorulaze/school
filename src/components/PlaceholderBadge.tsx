import React from 'react';
import { Edit3 } from 'lucide-react';

interface PlaceholderBadgeProps {
  label?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const PlaceholderBadge: React.FC<PlaceholderBadgeProps> = ({
  label = 'Editable Placeholder',
  className = '',
  size = 'sm',
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border border-amber-300/80 bg-amber-50/90 text-amber-800 shadow-xs ${
        size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      } ${className}`}
      title="This field contains placeholder content intended to be updated with official institutional records."
    >
      <Edit3 className={size === 'sm' ? 'w-2.5 h-2.5 text-amber-600' : 'w-3 h-3 text-amber-600'} />
      <span>{label}</span>
    </span>
  );
};
