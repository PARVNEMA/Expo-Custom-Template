# Component Design & Controlled Inputs Rules

Components in this project emphasize reusability, composition, accessibility, and clean form management.

## 1. Controlled Form Inputs (`components/forms/`)

- All form fields must be controlled and integrate seamlessly with `react-hook-form` and `zod`.
- Use existing controlled components or follow the pattern established in:
  - `ControlledInput.tsx`
  - `ControlledSelect.tsx`
  - `ControlledDateField.tsx`
  - `ControlledMultiSelect.tsx`
- Controlled components must accept:
  - `control`: `Control<T>` from `useForm`
  - `name`: `FieldPath<T>`
  - `rules` / `label` / `placeholder` / `error` handling
- Validation errors must automatically render beneath the input using `text-red-500 text-xs` with proper spacing.

```tsx
// Pattern for Controlled Form Usage:
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledInput } from '@/components/forms/ControlledInput';
import { Button } from '@/components/ui/Button';

export const LoginForm = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <View className="gap-4">
      <ControlledInput
        control={control}
        name="email"
        label="Email Address"
        placeholder="you@domain.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Sign In" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
```

## 2. Reusable Primitives (`components/ui/`)

- Favor small, composable UI building blocks over bloated mega-components with dozens of boolean flags.
- Base primitives:
  - `Button`: Primary, secondary, outline, text variants with loading indicators.
  - `Input`: Uncontrolled/standard input primitive with prefix/suffix icons and focus states.
  - `Card`: Structured container with rounded corners and consistent padding.
  - `Modal` / `BottomSheet`: Dynamic popups with backdrop blur/overlay.
- Every reusable component must forward standard accessibility attributes (`accessibilityRole`, `accessibilityLabel`).
