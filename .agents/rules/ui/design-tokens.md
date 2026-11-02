# Rule: Design Tokens & Centralized Theming

**Scope**: All visual values — colors, typography, spacing, and border radius — anywhere in the codebase.

> **MANDATORY** — All AI agents and contributors MUST follow this rule without exception.

---

## 1. Single Source of Truth: `config/theme.ts`

All design tokens are defined in [`config/theme.js`](../../../config/theme.js) and re-exported through [`config/theme.ts`](../../../config/theme.ts). The Tailwind config reads from `theme.js` to generate utility classes.

```
config/
├── theme.js    ← raw token definitions (PALETTE, THEME_COLORS, THEME_TYPOGRAPHY, etc.)
└── theme.ts    ← TypeScript re-export for programmatic use in components
```

**Never define colors, font sizes, spacing values, or radii anywhere else.**

---

## 2. Token Hierarchy

```
PALETTE (primitive brand + neutral scales)
  └── THEME_COLORS (semantic role aliases built on top of PALETTE)
        └── Tailwind utilities (generated from THEME_COLORS by tailwind.config.js)
```

| Layer | Example | Use in |
|---|---|---|
| `PALETTE.primary[600]` | `#2563eb` | Only inside `theme.js` to build `THEME_COLORS` |
| `THEME_COLORS.text.primary` | `#111827` | Programmatic use in JS/TS (e.g., chart colors) |
| `text-text-primary` | Tailwind class | NativeWind `className` in components |

---

## 3. Available Semantic Tokens

### Colors

```
Background  : bg-background, bg-background-secondary, bg-background-tertiary
Surface     : bg-surface, bg-surface-card, bg-surface-elevated, bg-surface-muted
Text        : text-text-primary, text-text-secondary, text-text-muted,
              text-text-placeholder, text-text-disabled, text-text-inverse, text-text-link
Primary     : bg-primary, bg-primary-{50–950}, text-primary, border-primary
Secondary   : bg-secondary, bg-secondary-{50–950}
Accent      : bg-accent, bg-accent-{50–950}
Border      : border-border, border-border-subtle, border-border-strong,
              border-border-focus, border-border-error
Status      : bg-status-success, bg-status-error, bg-status-warning, bg-status-info
              text-status-success-text, text-status-error-text, etc.
```

### Typography

```
Font size   : text-2xs, text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl
Font weight : font-light, font-normal, font-medium, font-semibold, font-bold, font-extrabold
```

### Spacing

```
p-xs (4px), p-sm (8px), p-md (16px), p-lg (24px), p-xl (32px), p-2xl (40px), p-3xl (48px)
(same for m-, px-, py-, mx-, my-, gap-, etc.)
```

### Border Radius

```
rounded-xs (4px), rounded-sm (8px), rounded-md (12px), rounded-lg (16px),
rounded-xl (20px), rounded-2xl (24px), rounded-full (9999px)
```

---

## 4. Programmatic Use (JS/TS, not className)

When you need a color value in JavaScript (e.g., for `ActivityIndicator`, `react-native-svg`, chart libraries), import from `config/theme.ts`:

```tsx
import { THEME_COLORS } from '@/config/theme';

// ✅ CORRECT — programmatic use from theme
<ActivityIndicator color={THEME_COLORS.primary.DEFAULT} />
<SvgCircle fill={THEME_COLORS.status.success.DEFAULT} />

// ❌ FORBIDDEN — hardcoded hex
<ActivityIndicator color="#2563eb" />
<SvgCircle fill="#16a34a" />
```

---

## 5. Adding New Tokens

If you need a new color, spacing value, or radius that does not exist yet:

1. Add the primitive value to `PALETTE` in `config/theme.js` (if it's a new brand color).
2. Add a semantic alias to the appropriate section in `THEME_COLORS`, `THEME_SPACING`, or `THEME_RADIUS`.
3. `tailwind.config.js` will automatically pick up the new token and generate the utility class.
4. Use the new utility class in components — never hardcode the raw value.

```js
// config/theme.js — adding a new semantic token

const THEME_COLORS = {
  // ... existing tokens
  surface: {
    // ... existing surface tokens
    highlight: '#fef9c3', // ← new token — add here, not in the component
  },
};
```

Then in the component:
```tsx
<View className="bg-surface-highlight" /> // ✅ uses the new token
<View style={{ backgroundColor: '#fef9c3' }} /> // ❌ bypasses the token system
```

---

## 6. Dark Mode

This template uses a single light-mode palette by default. If dark mode support is added:

- Dark-mode variants must be defined as new semantic tokens in `theme.js` (e.g., `background.dark`, `surface.dark`).
- Toggle via NativeWind's `dark:` prefix: `className="bg-background dark:bg-background-dark"`.
- Never hardcode dark-mode colors in individual components.

---

## 7. Checklist Before Committing

- [ ] No hardcoded hex codes (`#xxxxxx`) in any component or style
- [ ] No hardcoded numeric spacing or font size values in `style` props
- [ ] All colors reference a semantic token (`text-text-primary`, `bg-surface-muted`, etc.)
- [ ] Programmatic color use imports from `@/config/theme`
- [ ] New design values added to `config/theme.js` first, then used via utility classes
