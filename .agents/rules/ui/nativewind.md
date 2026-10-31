# NativeWind / Tailwind CSS Styling Rules

This project exclusively uses **NativeWind (v4)** for UI styling. All styling must adhere strictly to utility-first Tailwind classes.

## 1. Zero Raw `StyleSheet` & Zero Inline Styles

- **Forbidden**: `StyleSheet.create({ ... })` is strictly prohibited for new UI.
- **Forbidden**: Inline style objects like `style={{ marginTop: 16, backgroundColor: '#fff' }}` are prohibited.
- **Allowed Exception**: Dynamic runtime values that cannot be precomputed (such as animated values directly driven by `react-native-reanimated` style hooks) may use animated style objects. All other static or state-based styling must use `className`.

## 2. Dynamic & Conditional Classes

- Use template literals or utilities like `clsx` / string concatenation for conditional classes:
  ```tsx
  <View
    className={`p-4 rounded-xl border ${
      isActive ? 'border-primary-500 bg-primary-50' : 'border-neutral-200 bg-white'
    }`}
  >
  ```
- Keep class groupings readable:
  1. Layout & Flexbox (`flex-1`, `flex-row`, `items-center`, `justify-between`)
  2. Spacing (`p-4`, `mx-2`, `gap-3`)
  3. Sizing (`w-full`, `h-12`, `min-h-[44px]`)
  4. Background & Colors (`bg-white`, `bg-neutral-50`)
  5. Borders & Radius (`rounded-xl`, `border`, `border-neutral-200`)
  6. Typography & Text (`text-base`, `font-medium`, `text-neutral-900`)

## 3. Safe Areas and Platform Specifics

- Utilize `react-native-safe-area-context` or padding utilities instead of hardcoded platform offsets.
- For platform-specific tweaks, use Tailwind's platform prefixes if configured, or clean component wrappers (e.g. `KeyboardAvoidingWrapper`).
