# Rule: NativeWind Styling

**Scope**: Every React Native component, screen, and layout in this project.

> **MANDATORY** — All AI agents and contributors MUST follow this rule without exception.

---

## 1. NativeWind Is the Only Styling System

All visual styling is applied exclusively through NativeWind `className` props using Tailwind utility classes.

```tsx
// ✅ CORRECT — NativeWind className
<View className="flex-1 bg-background px-4 pt-6">
  <Text className="text-xl font-bold text-text-primary">Hello</Text>
</View>

// ❌ FORBIDDEN — StyleSheet
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#fff' } });
<View style={styles.container} />

// ❌ FORBIDDEN — Inline style objects
<View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 }} />

// ❌ FORBIDDEN — CSS-in-JS libraries (styled-components, emotion)
const Container = styled.View`flex: 1;`;
```

---

## 2. Semantic Token Utilities (NOT Raw Colors)

Use the semantic Tailwind utilities from `config/theme.ts` / `tailwind.config.js`. **Never hardcode hex codes or raw color names for brand/semantic purposes.**

### Color Utilities Available

| Category | Utilities | When to use |
|---|---|---|
| Background | `bg-background`, `bg-surface`, `bg-surface-muted`, `bg-surface-card` | Page backgrounds, cards |
| Text | `text-text-primary`, `text-text-secondary`, `text-text-muted`, `text-text-inverse` | All text |
| Primary actions | `bg-primary`, `bg-primary-600`, `active:bg-primary-700` | Buttons, links |
| Borders | `border-border`, `border-border-strong`, `border-border-focus`, `border-border-error` | Inputs, dividers |
| Status | `bg-status-success`, `bg-status-error`, `text-status-error-text` | Alerts, badges |

```tsx
// ✅ CORRECT — semantic tokens
<View className="bg-background px-4">
  <Text className="text-text-primary font-semibold text-lg">Title</Text>
  <Text className="text-text-secondary text-sm">Subtitle</Text>
</View>

// ❌ FORBIDDEN — raw hardcoded colors
<View style={{ backgroundColor: '#ffffff' }}>
  <Text style={{ color: '#111827' }}>Title</Text>
</View>

// ❌ FORBIDDEN — arbitrary Tailwind values
<View className="bg-[#ffffff]">
  <Text className="text-[#111827]">Title</Text>
</View>
```

> **Exception**: Truly one-off decorative values (e.g., a gradient stop that is purely visual and has no semantic meaning) may use `bg-[#hexcode]` if approved and documented with a comment. This is rare.

---

## 3. Spacing Utilities

Use Tailwind spacing classes derived from `THEME_SPACING` tokens. Common mappings:

| Token | Tailwind | px |
|---|---|---|
| `xs` | `p-1`, `m-1` | 4 |
| `sm` | `p-2`, `m-2` | 8 |
| `md` | `p-4`, `m-4` | 16 |
| `lg` | `p-6`, `m-6` | 24 |
| `xl` | `p-8`, `m-8` | 32 |

```tsx
// ✅ CORRECT
<View className="px-4 py-6 mb-4 gap-3">

// ❌ FORBIDDEN
<View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
```

---

## 4. Border Radius Utilities

Use radius tokens: `rounded-xs`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full`.

```tsx
// ✅ CORRECT
<View className="rounded-xl overflow-hidden">
<View className="rounded-full w-10 h-10">

// ❌ FORBIDDEN
<View style={{ borderRadius: 16 }}>
```

---

## 5. Typography Utilities

Use size tokens: `text-2xs`, `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`.
Use weight tokens: `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`.

```tsx
// ✅ CORRECT
<Text className="text-2xl font-bold text-text-primary">Heading</Text>
<Text className="text-sm font-normal text-text-secondary">Body copy</Text>

// ❌ FORBIDDEN
<Text style={{ fontSize: 24, fontWeight: '700', color: '#111827' }}>Heading</Text>
```

---

## 6. Conditional Classes

Use template literals or `clsx` / `cn` for conditional class composition. Never conditionally apply `style` objects.

```tsx
// ✅ CORRECT — template literal
<View
  className={`rounded-xl px-4 flex-row items-center h-14 ${
    hasError ? 'border border-border-error' : 'border border-transparent'
  }`}
/>

// ✅ CORRECT — clsx (if already used in the codebase)
import clsx from 'clsx';
<View className={clsx('rounded-xl px-4', { 'border-border-error': hasError })} />

// ❌ FORBIDDEN — conditional inline style
<View style={{ borderColor: hasError ? '#ef4444' : 'transparent' }} />
```

---

## 7. Style Prop Exception for Dynamic Values

The ONLY acceptable use of `style` prop is for **truly dynamic computed values** that cannot be expressed as a static Tailwind class (e.g., a value derived from a JS variable at runtime).

```tsx
// ✅ Acceptable exception — dynamic width from JS measurement
<View style={{ width: measuredWidth * 0.8 }} className="rounded-lg bg-primary" />

// ❌ Not an exception — this IS expressible with Tailwind
<View style={{ padding: 16 }} />   // Use className="p-4" instead
```

When using this exception, pair it with a `className` for all non-dynamic styles.

---

## 8. Checklist Before Committing

- [ ] No `StyleSheet.create(...)` introduced
- [ ] No inline `style={{ ... }}` objects for static values
- [ ] All colors use semantic token utilities (`text-text-primary`, `bg-surface`, etc.)
- [ ] No hardcoded hex codes in `className` (no `bg-[#...]` for semantic colors)
- [ ] Spacing uses Tailwind utilities (`px-4`, `mt-6`, `gap-3`)
- [ ] Border radius uses token utilities (`rounded-xl`, etc.)
- [ ] Dynamic runtime values only use `style` prop, paired with `className` for everything else
