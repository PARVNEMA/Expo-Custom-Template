# Agent Handbook

> **⚠️ STRICTLY MANDATORY** — Every AI agent, coding assistant, and contributor working in this repository **MUST** read this file first and follow every rule without exception. No workarounds. No shortcuts. No inline styles. No raw `console.log`. No `any`.

---

## Instruction Priority

Follow instructions in this exact order — higher wins on conflict:

1. User / system prompt instructions
2. This file (`AGENTS.md`)
3. The applicable rule files under `.agents/rules/`
4. The closest existing local pattern in the codebase

If two rules conflict, **stop and ask** rather than silently choosing.

---

## Before Writing Any Code

1. Read the applicable rule files for your task type (see task matrix below).
2. Inspect the closest existing implementation in the codebase.
3. Reuse existing components, services, types, and hooks before creating new ones.
4. Keep changes within the requested scope — do not reformat unrelated files.

---

## Directory Map

```text
app/                    Expo Router routes — thin wrappers only, no business logic
feature/<name>/         Feature-owned implementation
  components/           Feature-only UI components and screens
  services/             Feature business logic, API calls, adapters
  types/                Feature TypeScript types (*.types.ts) and Zod schemas (*.schema.ts)
components/
  forms/                Controlled inputs (ControlledInput, ControlledSelect, etc.)
  ui/                   Primitive design elements (Button, Card, Modal, etc.)
  common/               Shared layout wrappers (BottomSheet, UpdatePromptModal)
  gradients/            Gradient utility components
services/               Shared cross-feature services (api, logger, toast, auth)
types/                  Shared cross-feature types and contracts
context/                App-wide React context providers
hooks/                  Shared hooks with no single feature owner
config/                 Design tokens and constants (theme.ts, constants.ts)
```

---

## Non-Negotiable Conventions

| Convention | Rule |
|---|---|
| **Feature-Based Architecture** | All feature code lives in `feature/<name>/{components,services,types}`. Routes in `app/` are thin wrappers. |
| **NativeWind Only** | Style with `className` utilities only. No `StyleSheet`, inline `style` objects, or CSS-in-JS. |
| **Semantic Design Tokens** | All colors, spacing, radii, and font sizes from `config/theme.ts`. Never hardcode hex values. |
| **API via `apiService` only** | Never call `fetch` or `axios` directly. Always go through `@/services/api.service`. |
| **try/catch + logger + toast** | Every async service method must have try/catch, log with `logger`, and `showErrorToast(...)` (or `toast.error(...)`) on failure. |
| **Controlled Components** | All form inputs must be controlled via `react-hook-form` + `Controller`. No uncontrolled refs for forms. |
| **Zod Validation** | All form and API input validation uses Zod schemas. Use `zodResolver` in every `useForm`. |
| **No `any`** | Strict TypeScript throughout. Use `unknown` + type guards if truly uncertain. |
| **No `console.log`** | Use `logger` from `@/services/logger.service` for all logging. |
| **Toast for errors** | All failed operations must surface a friendly `showErrorToast(error, fallbackMessage)` (or `toast.error(...)`) — never `Alert.alert()`. |
| **44pt Touch Targets** | Every interactive element must be at least 44 × 44 pt. |
| **Accessibility Labels** | All icon-only buttons and images must have `accessibilityLabel`. |
| **Safe Areas** | Every screen must use `SafeScreen` or `SafeAreaView`. |

---

## Task → Rules Matrix

| Task type | Read these rule files |
|---|---|
| New feature or screen | `architecture/features.md`, `architecture/services-and-types.md`, `ui/modern-styling.md`, skill: `.agents/skills/react-native-feature/SKILL.md` |
| Any UI change | `ui/nativewind.md`, `ui/components.md`, `ui/design-tokens.md`, `ui/modern-styling.md`, `ui/accessibility.md` |
| API call or data fetching | `architecture/api-service.md`, `architecture/services-and-types.md` |
| Form or input | `ui/reusable-components.md`, `architecture/types-and-validation.md` |
| Types or Zod schema | `architecture/types-and-validation.md`, `architecture/services-and-types.md` |
| Shared / promoted code | `architecture/shared-code.md`, `ui/components.md` |
| Logging or error handling | `architecture/api-service.md` |
| Any source change | `quality/change-workflow.md` |

---

## Rule Files Index

### Architecture
| File | Subject |
|---|---|
| [`.agents/rules/architecture/features.md`](.agents/rules/architecture/features.md) | Feature-based directory structure, route rules, cross-feature boundaries |
| [`.agents/rules/architecture/api-service.md`](.agents/rules/architecture/api-service.md) | `apiService` usage, try/catch pattern, logger, toast on every API call |
| [`.agents/rules/architecture/services-and-types.md`](.agents/rules/architecture/services-and-types.md) | Service file conventions, type file conventions, `@/` imports, no `any` |
| [`.agents/rules/architecture/types-and-validation.md`](.agents/rules/architecture/types-and-validation.md) | Zod schema authoring, inferred types, validation message rules |
| [`.agents/rules/architecture/shared-code.md`](.agents/rules/architecture/shared-code.md) | When and how to promote feature code to shared directories |

### UI
| File | Subject |
|---|---|
| [`.agents/rules/ui/nativewind.md`](.agents/rules/ui/nativewind.md) | NativeWind-only styling, semantic utilities, conditional classes |
| [`.agents/rules/ui/design-tokens.md`](.agents/rules/ui/design-tokens.md) | `config/theme.ts` tokens, adding new tokens, programmatic color use |
| [`.agents/rules/ui/components.md`](.agents/rules/ui/components.md) | Component placement, file structure, error handling in components, toast |
| [`.agents/rules/ui/reusable-components.md`](.agents/rules/ui/reusable-components.md) | Controlled component pattern, `react-hook-form` wiring, form pattern |
| [`.agents/rules/ui/modern-styling.md`](.agents/rules/ui/modern-styling.md) | Touch targets, safe areas, keyboard avoiding, loading/empty/error states |
|

### Quality
| File | Subject |
|---|---|
| [`.agents/rules/quality/change-workflow.md`](.agents/rules/quality/change-workflow.md) | Pre-code checklist, scope discipline, `tsc` + `lint` verification, completion report |

---

## Completion Checklist

Before reporting a task as done:

- [ ] Every new file is feature-local or promoted correctly to a shared directory
- [ ] No `utils/`, `helpers/`, `common/`, or `misc/` directories created
- [ ] UI uses NativeWind `className` only — no `StyleSheet`, no inline styles
- [ ] All colors/spacing/radii use `config/theme.ts` semantic tokens
- [ ] Every async service method has try/catch → logger → showErrorToast (or toast.error) → rethrow
- [ ] No `console.log` — only `logger`
- [ ] All forms use `react-hook-form` + `zodResolver` + `ControlledInput`
- [ ] No `any` types
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` passes
- [ ] Files changed, validation results, and out-of-scope items reported

---

## Guardrails

- Do not add npm dependencies unless the task requires it.
- Do not edit `app.json`, `package.json`, lockfiles, or build config unless explicitly requested.
- Do not commit, push, or publish unless explicitly asked.
- Do not invent backend response fields. Ask if a contract is unclear.
- Do not access or modify secrets or environment values.
