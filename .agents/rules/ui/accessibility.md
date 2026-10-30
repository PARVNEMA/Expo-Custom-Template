# UI Accessibility

## Scope

Applies to every interactive or information-bearing UI change.

## Rules

- Use semantic React Native primitives: `Pressable` for actions and `TextInput` for text entry.
- Give every icon-only control an accessible label that states the action.
- Expose disabled state and prevent disabled controls from firing actions.
- Provide labels for inputs; placeholder text alone is not a label.
- Keep touch targets comfortably tappable and avoid competing gestures in a small area.
- Ensure loading, errors, and success can be discovered by screen readers where supported.
- Do not use color alone to convey error, selection, or completion.
