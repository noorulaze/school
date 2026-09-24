import type { GradeTier } from '../types/firestore';

export const DEFAULT_GRADING_SCALE: GradeTier[] = [
  { grade: 'A+', minPercentage: 90, maxPercentage: 100, description: 'Outstanding' },
  { grade: 'A', minPercentage: 80, maxPercentage: 89.99, description: 'Excellent' },
  { grade: 'B+', minPercentage: 70, maxPercentage: 79.99, description: 'Very Good' },
  { grade: 'B', minPercentage: 60, maxPercentage: 69.99, description: 'Good' },
  { grade: 'C+', minPercentage: 50, maxPercentage: 59.99, description: 'Above Average' },
  { grade: 'C', minPercentage: 40, maxPercentage: 49.99, description: 'Average' },
  { grade: 'D', minPercentage: 35, maxPercentage: 39.99, description: 'Pass' },
  { grade: 'F', minPercentage: 0, maxPercentage: 34.99, description: 'Needs Improvement / Fail' },
];

/**
 * Calculates grade from percentage against given grade tiers (defaults to school standard)
 */
export function calculateGrade(
  percentage: number,
  tiers: GradeTier[] = DEFAULT_GRADING_SCALE
): string {
  if (isNaN(percentage) || percentage < 0) return 'F';
  const rounded = Math.round(percentage * 100) / 100;
  
  // Sort descending by minPercentage
  const sorted = [...tiers].sort((a, b) => b.minPercentage - a.minPercentage);
  for (const tier of sorted) {
    if (rounded >= tier.minPercentage) {
      return tier.grade;
    }
  }
  return 'F';
}

/**
 * Calculates percentage rounded to 2 decimal places
 */
export function calculatePercentage(obtained: number, maximum: number): number {
  if (!maximum || maximum <= 0 || isNaN(obtained) || obtained < 0) return 0;
  const p = (obtained / maximum) * 100;
  return Math.round(p * 100) / 100;
}

/**
 * Calculates academic result status
 */
export function calculateResultStatus(percentage: number): 'Distinction' | 'Passed' | 'Failed' {
  if (percentage >= 75) return 'Distinction';
  if (percentage >= 35) return 'Passed';
  return 'Failed';
}

/**
 * Visual styling token for grades conforming to school palette
 */
export function getGradeBadgeStyle(grade: string): { bg: string; text: string; border: string } {
  switch (grade.toUpperCase()) {
    case 'A+':
      return { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' };
    case 'A':
      return { bg: 'bg-[#eef6f2]', text: 'text-[#164e37]', border: 'border-[#164e37]/25' };
    case 'B+':
      return { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' };
    case 'B':
      return { bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-200' };
    case 'C+':
    case 'C':
      return { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' };
    case 'D':
      return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' };
    case 'F':
    default:
      return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
  }
}
