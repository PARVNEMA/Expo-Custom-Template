# Design Tokens & Theme Rules

A single centralized source of truth governs all visual design decisions in this application: colors, text sizing, typography, spacing, border radiuses, and elevation.

## 1. Single Source of Truth: `config/theme.ts`

- All colors, semantic roles, and typography metrics are defined in [`config/theme.ts`](file:///F:/Expo-Custom-Template/config/theme.ts).
- Never use random inline hex codes (e.g. `#111827`, `#9CA3AF`, `#f1f1f1`) directly in JSX or Tailwind arbitrarily. Always use named semantic classes or the `THEME_COLORS` constants.

---

## 2. Standard Semantic Color Dictionary

Always use these semantic token names across screens and components:

### A. Backgrounds (`bg-*`)
- `bg-background` / `bg-background-primary`: Default clean screen background (`#ffffff`).
- `bg-background-secondary`: Light canvas / grouped view background (`#f9fafb`).
- `bg-background-tertiary`: Inset background (`#f3f4f6`).
- `bg-background-dark`: Dark background (`#111827`).
- `bg-background-overlay`: Backdrop modal overlay (`rgba(0,0,0,0.5)`).

### B. Surfaces & Cards (`bg-*`)
- `bg-surface` / `bg-surface-card`: Cards, modals, bottom sheets (`#ffffff`).
- `bg-surface-muted`: Muted background for form text inputs, chips, search bars (`#f3f4f6`).
- `bg-surface-subtle`: Subtle alternating rows or active highlight (`#f9fafb`).
- `bg-surface-dark`: Dark surface (`#1f2937`).

### C. Text Hierarchy (`text-*`)
- `text-text-primary`: Primary headings, titles, active input text (`#111827`).
- `text-text-secondary`: Body copy, descriptions, subtitles (`#4b5563`).
- `text-text-muted`: Captions, timestamps, helper notes (`#6b7280`).
- `text-text-placeholder`: Form input placeholder text (`#9ca3af`).
- `text-text-disabled`: Inactive / disabled states (`#9ca3af`).
- `text-text-inverse`: White text for dark surfaces or primary buttons (`#ffffff`).
- `text-text-link`: Clickable hyperlinks (`#2563eb`).

### D. Borders & Dividers (`border-*`)
- `border-border`: Standard card & container outlines (`#e5e7eb`).
- `border-border-subtle`: Hairline dividers & separators (`#f3f4f6`).
- `border-border-strong`: Emphasized borders, hover states (`#d1d5db`).
- `border-border-focus`: Active focused input outline (`#2563eb`).
- `border-border-error`: Form validation error border (`#ef4444`).

### E. Status & Feedback (`bg-*`, `text-*`, `border-*`)
- **Success**: `bg-status-success`, `text-status-success-text`, `bg-status-success-subtle`, `border-status-success-border`.
- **Error**: `bg-status-error`, `text-status-error-text`, `bg-status-error-subtle`, `border-status-error-border`.
- **Warning**: `bg-status-warning`, `text-status-warning-text`, `bg-status-warning-subtle`, `border-status-warning-border`.
- **Info**: `bg-status-info`, `text-status-info-text`, `bg-status-info-subtle`, `border-status-info-border`.

### F. Brand Scales
- `primary`: `primary-50` through `primary-950` (Primary button CTAs, brand highlights).
- `secondary`: `secondary-50` through `secondary-950`.
- `accent`: `accent-50` through `accent-950`.
- `neutral`: `neutral-50` through `neutral-950`.

---

## 3. Typography Scales (`text-*`)

- `text-2xs`: 10px / 14px line-height (micro tags, overline headers)
- `text-xs`: 12px / 16px line-height (captions, validation errors)
- `text-sm`: 14px / 20px line-height (form labels, secondary text)
- `text-base`: 16px / 24px line-height (body copy, button text)
- `text-lg`: 18px / 28px line-height (card titles, prominent text)
- `text-xl`: 20px / 28px line-height (modal titles, section headers)
- `text-2xl`: 24px / 32px line-height (screen headers)
- `text-3xl`: 30px / 36px line-height (hero titles)
- `text-4xl`: 36px / 40px line-height (display banners)
