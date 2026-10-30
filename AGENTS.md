# Agent Handbook

This is the operating guide for anyone changing this Expo / React Native project. Read this file first, then read every relevant rule in [`.agents/rules/`](.agents/rules/).

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
app/                    Expo Router routes and screen composition only
feature/<feature-name>/ Feature-owned implementation
  components/           Feature-only UI components
  services/             Feature business logic, queries, mutations, adapters
  types/                Feature TypeScript types and contracts
components/             Shared UI used by two or more features
services/               Shared cross-feature services
types/                  Shared cross-feature types
context/                App-wide React context providers
hooks/                  Shared hooks with no single feature owner
config/                 App configuration and constants
```

## Non-negotiable conventions

- Style UI with NativeWind `className` utilities only. Do not introduce `StyleSheet`, inline style objects, or CSS-in-JS for new work.
- Keep code feature-owned by default. Promote code to shared directories only after two genuine consumers exist.
- Routes compose screens and own navigation concerns; they do not contain substantial business logic, data access, or large reusable UI blocks.
- Put data access and business logic in services. Keep presentation components focused on rendering and user interactions.
- Use TypeScript deliberately: no `any`, untyped payloads, or assertions used merely to silence errors.
- Prefer small composable components over large configurable components with many unrelated boolean props.

## Required rules by task

| Task involves | Read these rules |
| --- | --- |
| Any UI change | `ui/nativewind.md`, `ui/components.md`, `ui/accessibility.md` |
| New or modified feature | `architecture/features.md`, `architecture/services-and-types.md` |
| Shared UI or shared code | `ui/components.md`, `architecture/shared-code.md` |
| Data fetching or mutations | `architecture/services-and-types.md` |
| Any source change | `quality/change-workflow.md` |

## Completion checklist

1. Confirm every new file is feature-local or genuinely shared.
2. Confirm UI uses NativeWind and follows nearby visual patterns.
3. Run the narrowest relevant validation scripts defined in `package.json`; include lint and type checks when available.
4. Report files changed, validation run, and anything intentionally out of scope.

## Guardrails

- Do not add dependencies, change Expo configuration, edit lockfiles, or alter build/deployment settings unless the task requires it.
- Do not commit, push, publish, or access/modify secrets unless explicitly requested.
- Do not invent backend response fields or product behavior. Ask when a contract is unclear.
- Do not create catch-all directories such as `utils`, `helpers`, `common`, or `misc` without a clear ownership and purpose.
