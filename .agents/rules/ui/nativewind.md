# NativeWind Styling

## Scope

Applies to every visual styling change in React Native and Expo UI code.

## Required approach

- Use NativeWind utilities through `className` for new styling.
- Reuse `tailwind.config.js` tokens for colors, spacing, typography, radii, and repeated visual values.
- Use supported NativeWind state and responsive utilities instead of creating a second styling system.

## Prohibited approaches

- Do not add `StyleSheet.create` for new UI styling.
- Do not use inline `style={{ ... }}` objects for routine layout, spacing, color, or typography.
- Do not add CSS-in-JS or another styling library.
- Do not hardcode repeated raw colors, pixel values, or font values when a Tailwind token can express the decision.

## Class composition

- Keep static classes directly in `className`.
- Keep conditional classes local and readable; use an existing class-merging helper only when it makes conditions clearer.
- Add or reuse a named token when a visual value repeats across components.

## Narrow exception

Use a style prop only when a React Native or third-party API requires a runtime-calculated value unavailable through utilities, such as an animated transform or measured dimension. Keep it minimal, explain it near the code, and leave static styling in `className`.
