# Agent Handbook

This is the operating guide for anyone changing this Expo / React Native project. Read this file first, then read every relevant rule in [`.agents/rules/`](.agents/rules/).

## Mandatory Instructions for Antigravity & AI Agents

Whenever Antigravity or any AI coding assistant runs in this repository, **all instructions and rules specified in this document and under `.agents/rules/` are strictly mandatory and MUST be followed without exception.** Do not bypass these rules, create ad-hoc workarounds, or write unstyled or inline-styled code.

## Instruction order

Follow instructions in this order: user and system instructions, this file, applicable `.agents/rules/` files, then the closest existing local pattern. If two instructions conflict, identify the conflict and ask rather than silently choosing.

## Before changing code

1. Inspect the target feature, route/screen, and closest comparable implementation.
2. Read every rule listed in the task matrix below.
3. Keep the change within the requested feature and scope.
4. Reuse existing components, services, types, hooks, and Tailwind tokens before creating new ones.
5. Preserve unrelated user changes; never reformat, rename, or reorganize files outside the request.

## Directory map

```text
app/                    Expo Router routes and screen composition only (no heavy UI/business logic)
feature/<feature-name>/ Feature-owned implementation
  components/           Feature-only UI components and screens
  services/             Feature business logic, queries, mutations, adapters
  types/                Feature TypeScript types and contracts
components/             Shared UI used by two or more features
  forms/                Controlled inputs (ControlledInput, ControlledSelect, etc.)
  ui/                   Primitive design elements (Button, Card, Modal, etc.)
services/               Shared cross-feature services (api.service.ts, logger.service.ts, toast.service.ts)
types/                  Shared cross-feature types and contracts
context/                App-wide React context providers
hooks/                  Shared hooks with no single feature owner
config/                 App configuration and design tokens (theme.ts, constants.ts)
```

## Non-negotiable conventions

- **Feature-Based Architecture**: Group by feature (`feature/<feature-name>/{components,services,types}`). Routes in `app/` are thin compositional wrappers.
- **NativeWind Only**: Style UI with NativeWind `className` utilities only. Do not introduce `StyleSheet`, inline style objects, or CSS-in-JS for new work.
- **Centralized Design Tokens**: Take all colors, font sizes, radiuses, and spacing from `config/theme.ts` (available as Tailwind utilities). Never hardcode random hex color codes.
- **Reusable & Controlled Components**: Form inputs must be controlled (`ControlledInput`, etc.) and wired with `react-hook-form` + `zod`.
- **Modern Mobile App Aesthetics**: Follow `.agents/rules/ui/modern-styling.md` for professional mobile app standards: min 44x44pt touch targets, active feedback/haptics, safe areas, clean elevation, and accessibility labels.
- **Central Utility Logger**: Use `logger` (`services/logger.service.ts`) everywhere for structured logging. Never use raw `console.log` for app telemetry or debugging.
- **Central Utility Toast**: Use `toast` (`services/toast.service.ts`) for user notifications. All failed API requests must surface friendly error toasts.
- **Strict TypeScript**: No `any`, untyped payloads, or assertions used merely to silence errors.

## Required rules by task

| Task involves | Read these rules |
| --- | --- |
| Any UI change | `ui/nativewind.md`, `ui/components.md`, `ui/design-tokens.md`, `ui/modern-styling.md`, `ui/accessibility.md` |
| New or modified feature | `architecture/features.md`, `architecture/services-and-types.md`, `ui/modern-styling.md` |
| Shared UI or shared code | `ui/components.md`, `ui/design-tokens.md`, `architecture/shared-code.md` |
| Data fetching, APIs, or mutations | `architecture/services-and-types.md` |
| Logging & Error notifications | `architecture/services-and-types.md`, `ui/modern-styling.md` |
| Any source change | `quality/change-workflow.md` |

## Completion checklist

1. Confirm every new file is feature-local or genuinely shared.
2. Confirm UI uses NativeWind and follows `config/theme.ts` tokens.
3. Confirm logging uses `logger` and API errors notify via `toast`.
4. Run the narrowest relevant validation scripts (`npx tsc --noEmit`, `npm run lint`).
5. Report files changed, validation run, and anything intentionally out of scope.

## Guardrails

- Do not add dependencies, change Expo configuration, edit lockfiles, or alter build/deployment settings unless the task requires it.
- Do not commit, push, publish, or access/modify secrets unless explicitly requested.
- Do not invent backend response fields or product behavior. Ask when a contract is unclear.
- Do not create catch-all directories such as `utils`, `helpers`, `common`, or `misc` without a clear ownership and purpose.
