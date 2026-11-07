---
name: react-native-feature
description: Guide and strict checklist for creating or modifying React Native features and screens in Expo. Must be called whenever any new feature or screen is created or modified to ensure strict adherence to all project rules and architecture.
---

# React Native Feature & Screen Development Skill

This skill governs the end-to-end workflow for creating or modifying screens and features in this React Native (Expo) codebase. Whenever a new feature or screen is requested, you **must follow every rule in `AGENTS.md` and `.agents/rules/` without exception**.

---

## 1. Directory & File Placement Rules

All feature code lives inside `feature/<name>/`:

```text
app/                                 Expo Router routes — thin wrappers only!
  (tabs)/                            Or route folder
    <feature>.tsx                    Thin wrapper delegating to feature screen
feature/<feature>/
  components/                        Feature screens & UI components
    <Feature>Screen.tsx
    <FeatureCard>.tsx
  services/                          Feature business logic & API calls
    <feature>.service.ts             Named object export (e.g. `postsService`)
  types/                             Feature types & Zod validation schemas
    <feature>.types.ts
    <feature>.schema.ts
```

### Prohibitions
- ❌ **NO business logic in `app/` routes**. Routes only render `<FeatureScreen />`.
- ❌ **NO arbitrary directories** like `utils/`, `helpers/`, `common/`, or `misc/`.
- ❌ **NO cross-feature internal imports**. Communicate across features via public contracts or promote to shared directories.

---

## 2. Non-Negotiable Engineering Rules

### A. Styling & UI
- **NativeWind ONLY**: Use `className="..."` utilities exclusively.
- ❌ **NO `StyleSheet.create`**, inline `style={{ ... }}`, or CSS-in-JS.
- **Design Tokens**: Use semantic tokens from `config/theme.ts`. Never hardcode raw hex values.
- **Safe Areas**: Wrap every screen in `SafeScreen` or `SafeAreaView`.
- **Accessibility**: Minimum 44×44 pt touch targets; all icon buttons and images must have `accessibilityLabel`.

### B. Forms & Validation
- **Controlled Components**: Use `react-hook-form` + `Controller` with `ControlledInput` / `ControlledSelect`.
- **Zod Validation**: Define schemas in `types/<feature>.schema.ts` and bind with `zodResolver`.
- ❌ **NO uncontrolled refs** for forms.

### C. Services & API Calls
- **Always use `apiService`**: From `@/services/api.service`. Never call `fetch` or `axios` directly.
- **Named Service Object**: Export `const <name>Service = { ... }` with a top-level `const TAG = '<Name>Service'`.
- **Mandatory Flow**: `try` -> `logger.info` -> API call -> `logger.info` -> `showToast` (if user feedback needed) -> `catch` -> `logger.error` -> `showErrorToast(error, fallback)` -> rethrow `throw error`.

### D. Toast & Error Handling (`services/toast.service.ts`)
- Use `showErrorToast` and `showToast` (or `toast.error` / `toast.success`):
  ```ts
  import { showToast, showErrorToast } from '@/services/toast.service';
  // Or: import { toast } from '@/services/toast.service';
  ```
- **Error Toasts**: Call `showErrorToast(error, 'User-friendly fallback message')`. It automatically parses error strings, Error instances, Axios errors, and server response messages.
- **Success / Info Toasts**: Call `showToast('Operation completed successfully!')` or `toast.success(...)`.
- ❌ **NO `Alert.alert()` for errors** — always use toast notifications.
- ❌ **NO Double-Toast**: Services toast on failure; calling components must not show a second error toast for the same operation.

### E. Logging & TypeScript
- ❌ **NO `console.log`** — use `logger` from `@/services/logger.service` (`logger.info`, `logger.error`, `logger.warn`, `logger.debug`).
- ❌ **NO `any`** — use strict TypeScript types or `unknown` with type guards.

---

## 3. Step-by-Step Implementation Workflow

When asked to build or modify a screen / feature:

1. **Check Rules & Schema First**:
   - Define types and Zod schema in `feature/<name>/types/`.
2. **Build Feature Service**:
   - In `feature/<name>/services/<name>.service.ts`, implement async methods with `apiService`, `logger`, and `showErrorToast` / `showToast`.
3. **Build Feature Screen & Components**:
   - In `feature/<name>/components/`, build UI using NativeWind, semantic tokens, controlled inputs, and proper loading/error states.
4. **Wire Route**:
   - Create or update the route in `app/`, keeping it as a thin wrapper importing the screen.
5. **Verify**:
   - Confirm no `any`, no `console.log`, no inline styles, and all imports use `@/` aliases.
