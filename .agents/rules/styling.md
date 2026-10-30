# Styling Rules

## Scope

Applies to all React Native and Expo UI code in this repository.

## Rules

- Use NativeWind utility classes through `className` for styling.
- Do not use `StyleSheet.create`, inline `style` objects, or CSS-in-JS libraries for new UI styling.
- Reuse the design tokens and utility patterns already defined in `tailwind.config.js`.
- Keep conditional classes readable; use a small helper only when conditions become difficult to follow.
- Add or update shared NativeWind tokens before repeating a project-wide color, spacing, or typography value.
