/**
 * Curated gradient color presets for the Real Estate app.
 * Use these with any gradient component instead of hardcoding colors.
 *
 * @example
 * ```tsx
 * import { GRADIENT_PRESETS } from '@/components/gradients';
 *
 * <GradientCard colors={GRADIENT_PRESETS.ocean}>...</GradientCard>
 * <GradientButton colors={GRADIENT_PRESETS.executive} title="Approve" />
 * ```
 */
export const GRADIENT_PRESETS = {
  // ─── App Brand ──────────────────────────────────────────────────────────────
  primary: ['#2A7DD1', '#1A5FA3'] as const,
  primarySoft: ['#EBF3FC', '#D1E5F9'] as const,

  // ─── Role-Based (matches profileScreen.tsx role gradients) ──────────────────
  admin: ['#1e3a8a', '#3b82f6'] as const,
  manager: ['#312e81', '#6366f1'] as const,
  executive: ['#065f46', '#10b981'] as const,
  partner: ['#0f766e', '#06b6d4'] as const,

  // ─── Decorative ─────────────────────────────────────────────────────────────
  sunset: ['#f97316', '#ef4444'] as const,
  ocean: ['#0ea5e9', '#6366f1'] as const,
  forest: ['#10b981', '#059669'] as const,
  purple: ['#8b5cf6', '#a855f7'] as const,
  gold: ['#f59e0b', '#d97706'] as const,
  rose: ['#f43f5e', '#e11d48'] as const,
  aurora: ['#06b6d4', '#8b5cf6', '#f43f5e'] as const,
  emeraldTeal: ['#10b981', '#14b8a6'] as const,

  // ─── Neutral ────────────────────────────────────────────────────────────────
  dark: ['#1f2937', '#4b5563'] as const,
  silver: ['#e5e7eb', '#d1d5db'] as const,
  charcoal: ['#111827', '#374151'] as const,
} as const;

/** Type helper for gradient preset keys */
export type GradientPresetName = keyof typeof GRADIENT_PRESETS;
