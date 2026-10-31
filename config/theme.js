/**
 * Centralized Design System Tokens
 * Single source of truth for semantic colors, typography, spacing, and radiuses.
 * Consumed by tailwind.config.js and exported for direct programmatic use in React Native components.
 */

// 1. Primitive Brand & Neutral Palettes
const PALETTE = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  secondary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  accent: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
};

// 2. Semantic Color Roles (Standard names across all screens)
const THEME_COLORS = {
  // Brand color aliases
  primary: {
    ...PALETTE.primary,
    DEFAULT: PALETTE.primary[600],
    hover: PALETTE.primary[700],
    subtle: PALETTE.primary[50],
  },
  secondary: {
    ...PALETTE.secondary,
    DEFAULT: PALETTE.secondary[600],
    hover: PALETTE.secondary[700],
    subtle: PALETTE.secondary[50],
  },
  accent: {
    ...PALETTE.accent,
    DEFAULT: PALETTE.accent[600],
    hover: PALETTE.accent[700],
    subtle: PALETTE.accent[50],
  },
  neutral: PALETTE.neutral,

  // Background semantic tokens
  background: {
    DEFAULT: '#ffffff',
    primary: '#ffffff',
    secondary: '#f9fafb', // neutral-50
    tertiary: '#f3f4f6',  // neutral-100
    dark: '#111827',      // neutral-900
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Surface & Card semantic tokens
  surface: {
    DEFAULT: '#ffffff',
    card: '#ffffff',
    elevated: '#ffffff',
    muted: '#f3f4f6',     // neutral-100 (for input backgrounds, chips, gray fields)
    subtle: '#f9fafb',    // neutral-50
    dark: '#1f2937',      // neutral-800
  },

  // Text semantic tokens
  text: {
    DEFAULT: '#111827',   // neutral-900
    primary: '#111827',   // neutral-900 (Main headers, strong labels, inputs)
    secondary: '#4b5563', // neutral-600 (Subtitles, body copy, descriptions)
    muted: '#6b7280',     // neutral-500 (Captions, helper text, timestamps)
    placeholder: '#9ca3af', // neutral-400 (Input placeholders)
    disabled: '#9ca3af',  // neutral-400
    inverse: '#ffffff',   // Text on primary buttons or dark surfaces
    link: PALETTE.primary[600],
  },

  // Border & Divider semantic tokens
  border: {
    DEFAULT: '#e5e7eb',   // neutral-200 (Default subtle card/input borders)
    subtle: '#f3f4f6',    // neutral-100
    strong: '#d1d5db',    // neutral-300
    focus: PALETTE.primary[600],
    error: '#ef4444',
  },

  // Feedback & Status semantic tokens
  status: {
    success: {
      DEFAULT: '#16a34a',
      subtle: '#f0fdf4',
      border: '#bbf7d0',
      text: '#15803d',
    },
    error: {
      DEFAULT: '#ef4444',
      subtle: '#fef2f2',
      border: '#fecaca',
      text: '#b91c1c',
    },
    warning: {
      DEFAULT: '#f59e0b',
      subtle: '#fffbeb',
      border: '#fde68a',
      text: '#b45309',
    },
    info: {
      DEFAULT: '#3b82f6',
      subtle: '#eff6ff',
      border: '#bfdbfe',
      text: '#1d4ed8',
    },
  },
};

const THEME_TYPOGRAPHY = {
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  fontSize: {
    '2xs': ['10px', { lineHeight: '14px', letterSpacing: '0.2px' }],
    xs: ['12px', { lineHeight: '16px', letterSpacing: '0px' }],
    sm: ['14px', { lineHeight: '20px', letterSpacing: '0px' }],
    base: ['16px', { lineHeight: '24px', letterSpacing: '0px' }],
    lg: ['18px', { lineHeight: '28px', letterSpacing: '-0.2px' }],
    xl: ['20px', { lineHeight: '28px', letterSpacing: '-0.2px' }],
    '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.4px' }],
    '3xl': ['30px', { lineHeight: '36px', letterSpacing: '-0.6px' }],
    '4xl': ['36px', { lineHeight: '40px', letterSpacing: '-0.8px' }],
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

const THEME_SPACING = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
};

const THEME_RADIUS = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

const THEME = {
  colors: THEME_COLORS,
  typography: THEME_TYPOGRAPHY,
  spacing: THEME_SPACING,
  radius: THEME_RADIUS,
};

module.exports = {
  PALETTE,
  THEME_COLORS,
  THEME_TYPOGRAPHY,
  THEME_SPACING,
  THEME_RADIUS,
  THEME,
};
