# Modern Professional Mobile Styling Rules

Mobile applications built with this template must feel polished, fluid, responsive, and native to both iOS and Android.

## 1. Visual Polish & Hierarchy

1. **Rhythm & Spacing (4pt/8pt grid)**:
   - Stick to consistent spacing increments: `gap-2` (8px), `gap-3` (12px), `gap-4` (16px), `gap-6` (24px).
   - Use generous horizontal screen margins: standard screen containers must use `px-4` or `px-6`.
2. **Cards and Groupings**:
   - Prefer grouping content inside cohesive surface cards with subtle borders (`border border-neutral-150` or `border-neutral-200`) and soft radiuses (`rounded-2xl` or `rounded-xl`).
   - Avoid harsh drop shadows. Use subtle elevation or ambient borders instead of dark high-opacity shadows.
3. **High-Contrast, Legible Typography**:
   - Maintain strict contrast ratios (WCAG AA).
   - Avoid faint gray text on white cards. Use `text-neutral-900` for titles and `text-neutral-500` for metadata.

## 2. Touch Targets & Micro-Interactions

1. **Minimum Touch Target**:
   - Every tappable element (buttons, icon buttons, list items, checkboxes) must have a minimum interactive dimension of **44x44 points** (`min-h-[44px] min-w-[44px]`).
   - Use `hitSlop` or internal padding (`p-2.5` / `p-3`) on small icon buttons to ensure effortless tapping.
2. **Instant Visual Feedback**:
   - Interactive elements must provide visual feedback on press. Use `active:opacity-70` or `active:scale-[0.98]`.
   - Incorporate haptic feedback for key user interactions (e.g. `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` for primary button taps or toggle switches).
3. **Smooth Empty and Loading States**:
   - Never show blank screens during asynchronous operations. Always render skeletons or standard `LoadingSpinner` components.
   - Screen lists must handle empty states gracefully using informative icons, title, and descriptive message.

## 3. Keyboard & Screen Ergonomics

1. **Keyboard Avoidance**:
   - Wrap forms with `KeyboardAvoidingWrapper` or `react-native-keyboard-controller` to ensure inputs are never occluded by the virtual keyboard.
2. **Safe Screen Wrapper**:
   - Wrap screen root components in `SafeScreen` or respect safe area insets to prevent UI clipping by notches, island cutouts, and system home bars.
