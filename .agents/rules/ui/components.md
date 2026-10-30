# Reusable Components

## Scope

Applies when adding or changing React Native UI components.

## Ownership

- Keep one-screen and one-feature components in `feature/<name>/components/`.
- Promote a component to root `components/` only after two or more features use the same behavior and interface.
- Shared components are domain-neutral: `OrderStatusBadge` is feature-owned, while a generic `Badge` may be shared.

## API design

- Give each component one clear responsibility.
- Prefer `children`, focused slots, and small explicit props over a component with many unrelated booleans.
- Use typed props and event-specific callback names such as `onPress`, `onChangeText`, and `onSubmit`.
- Do not expose feature-specific state or implementation details through a shared component API.
- Reusable layout and presentation components must support `className` for NativeWind placement and spacing changes.
- Forward accessibility props when wrapping pressables, inputs, or other interactive primitives.

## Rendering and logic

- Keep presentational components deterministic from props.
- Put fetching, persistence, and business decisions in services, hooks, or a feature screen/container.
- Make loading, empty, error, and disabled states intentional.
- Do not duplicate a component for a small visual difference; consider a focused prop or composition point first.

## Naming

- Use PascalCase components and matching file names, such as `PrimaryButton.tsx`.
- Keep component-local types and helpers beside the component unless independently reused.
