# Mobile Accessibility (A11y) Rules

Every user interface must be usable by people using assistive technologies, such as VoiceOver (iOS) and TalkBack (Android).

## 1. Accessible Properties

1. **Labels for Non-Text Elements**:
   - Every `Pressable`, `TouchableOpacity`, and icon-only button must include an `accessibilityLabel` explaining its purpose (e.g. `accessibilityLabel="Close modal"`).
   - Use `accessibilityHint` when the outcome of the action is not obvious from the label.
2. **Proper Roles**:
   - Specify `accessibilityRole` on interactive items:
     - Buttons: `accessibilityRole="button"`
     - Headers: `accessibilityRole="header"`
     - Links: `accessibilityRole="link"`
     - Checkboxes / Toggles: `accessibilityRole="checkbox"` or `accessibilityRole="switch"`
     - Images: `accessibilityRole="image"`
3. **Accessibility State**:
   - Provide `accessibilityState={{ disabled: boolean, selected: boolean, busy: boolean }}` when dynamic states change.

## 2. Touch Targets & Scalable Text

- **Minimum Size**: Tappable areas must never be smaller than 44x44pt.
- **Dynamic Type**: Use Tailwind font sizing and avoid setting fixed heights on text container parents that cause text truncation when users increase system font size.
