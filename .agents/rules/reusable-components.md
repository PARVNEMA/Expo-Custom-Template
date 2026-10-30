# Reusable Component Rules

## Scope

Applies when creating or changing UI components.

## Rules

- Build reusable components for UI patterns used by two or more screens or features.
- Place cross-feature components in `components/`; keep single-feature components inside that feature's `components/` directory.
- Give reusable components a narrow, explicit prop interface and sensible defaults where appropriate.
- Prefer composition through `children`, slots, and focused props over duplicated or screen-specific component variants.
- Do not make a component shared prematurely: keep one-off screen markup local until a second real use exists.
- Keep components presentation-focused. Put data fetching, mutations, and feature business logic in services or feature-level containers.
- Ensure reusable components support `className` so callers can apply NativeWind layout and spacing adjustments.
