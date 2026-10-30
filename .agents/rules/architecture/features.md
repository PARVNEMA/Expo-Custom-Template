# Feature Ownership and Routing

## Scope

Applies when adding, moving, or changing feature-specific screens, components, logic, or types.

## Default placement

Each product capability owns its implementation under `feature/<feature-name>/`:

```text
feature/profile/
  components/
  services/
  types/
```

- Name features for user-facing capabilities, such as `auth`, `profile`, or `orders`, not technical layers.
- Keep feature imports inward: a feature may use shared modules but must not reach into another feature’s private files.
- Promote common capability only when it has a stable cross-feature use; do not import another feature’s implementation for convenience.
- Avoid barrel exports unless they provide a deliberate public boundary.

## Route responsibilities

`app/` contains Expo Router routes, layouts, and screen composition.

- Routes may read parameters, configure navigation, assemble screens, and pass props.
- Routes must not own API calls, mutation orchestration, complex transformations, or reusable UI sections.
- When a route grows beyond composition, delegate to a named feature screen/container.
- Keep navigation-specific code near its route unless multiple routes use it.

## Structure guardrails

- Do not create root-level folders for a single feature’s code.
- Do not put unrelated feature code into an existing feature because the names are similar.
- Do not duplicate a feature to make a small variation; extract only the shared part.
