# Rule: Reusable & Controlled Components

**Scope**: All form inputs, controlled inputs, and reusable UI primitives.

> **MANDATORY** — All AI agents and contributors MUST follow this rule without exception.

---

## 1. All Form Inputs MUST Be Controlled

Every form input in this project must be a **controlled component** wired to `react-hook-form` through the `Controller` wrapper. Uncontrolled inputs (`ref`-only, no `value`/`onChange`) are forbidden for form use.

```tsx
// ✅ CORRECT — controlled via react-hook-form Controller
import { Controller } from 'react-hook-form';

<Controller
  control={control}
  name="email"
  render={({ field: { onChange, onBlur, value } }) => (
    <TextInput
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
    />
  )}
/>

// ❌ FORBIDDEN — uncontrolled ref-based form input
const emailRef = useRef<TextInput>(null);
<TextInput ref={emailRef} />
```

---

## 2. Use Existing Controlled Components

Before creating a new controlled input, check if one already exists in `components/forms/`:

| Component | Use for |
|---|---|
| `ControlledInput` | Single-line and multi-line text inputs |
| `ControlledSelect` | Single-option dropdown / picker |
| `ControlledMultiSelect` | Multi-option picker |
| `ControlledDateField` | Date picker inputs |
| `ControlledDocumentPicker` | File / document attachment |

```tsx
// ✅ CORRECT — reuse existing controlled components
import ControlledInput from '@/components/forms/ControlledInput';
import ControlledSelect from '@/components/forms/ControlledSelect';

<ControlledInput
  control={control}
  name="title"
  label="Post Title"
  required
  error={errors.title}
  placeholder="Enter a title"
/>
```

Only create a new controlled component when no existing one covers the use case. Place it in `components/forms/` and follow the pattern below.

---

## 3. Controlled Component Pattern

Every controlled component in `components/forms/` must follow this exact structure:

```tsx
// components/forms/ControlledRating.tsx

import React from 'react';
import { View, Text } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

// ─── Props Interface ──────────────────────────────────────────────────────────

interface ControlledRatingProps<T extends FieldValues> {
  control: Control<T>;              // react-hook-form control object
  name: Path<T>;                    // typed field name — no 'any'
  label?: string;                   // optional visible label
  required?: boolean;               // shows * indicator
  error?: { message?: string };     // from formState.errors.<name>
  max?: number;                     // component-specific props below
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ControlledRating<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  error,
  max = 5,
}: ControlledRatingProps<T>) {
  return (
    <View className="mb-5">
      {/* Label */}
      {label && (
        <Text className="text-[11px] font-bold text-text-secondary uppercase mb-2 tracking-wider">
          {label}
          {required && <Text className="text-red-500"> *</Text>}
        </Text>
      )}

      {/* Controller wrapper */}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row gap-2">
            {Array.from({ length: max }).map((_, i) => (
              <Pressable
                key={i}
                onPress={() => onChange(i + 1)}
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  value > i ? 'bg-primary' : 'bg-surface-muted'
                }`}
                accessibilityLabel={`Rate ${i + 1} out of ${max}`}
              >
                <Text className={value > i ? 'text-white' : 'text-text-muted'}>
                  {i + 1}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      />

      {/* Error message */}
      {error && (
        <Text className="text-red-500 text-xs mt-1 ml-1">{error.message}</Text>
      )}
    </View>
  );
}
```

### Mandatory Elements in Every Controlled Component

| Element | Required | Notes |
|---|---|---|
| `control: Control<T>` | ✅ | Typed generic, not `any` |
| `name: Path<T>` | ✅ | Typed field path |
| `error?: { message?: string }` | ✅ | Renders inline error |
| `label?: string` | ✅ | Uppercase, small, secondary color |
| `required?: boolean` | ✅ | Shows red asterisk |
| `Controller` wrapper | ✅ | Must wrap the actual input |
| Error text below the input | ✅ | `text-red-500 text-xs mt-1` |

---

## 4. Form Wiring with `react-hook-form` + `zod`

Every form screen follows this pattern:

```tsx
// feature/posts/components/CreatePostScreen.tsx

import React from 'react';
import { View, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import ControlledInput from '@/components/forms/ControlledInput';
import Button from '@/components/ui/Button';
import { showToast, showErrorToast } from '@/services/toast.service';
import { postsService } from '../services/posts.service';
import { createPostSchema, CreatePostFormValues } from '../types/posts.schema';

export default function CreatePostScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: '', body: '' },
  });

  const onSubmit = async (data: CreatePostFormValues) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await postsService.create({ ...data, userId: 1 });
      showToast('Post created!');
      reset();
    } catch {
      // service already called showErrorToast — no double toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="px-4 pt-6 pb-10">
      <ControlledInput
        control={control}
        name="title"
        label="Title"
        required
        error={errors.title}
        placeholder="Enter post title"
      />
      <ControlledInput
        control={control}
        name="body"
        label="Body"
        required
        error={errors.body}
        placeholder="Write your post..."
        multiline
      />
      <Button
        title="Create Post"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={isSubmitting}
        fullWidth
      />
    </ScrollView>
  );
}
```

---

## 5. Shared UI Component Reuse

Before building a new UI primitive, check if one exists in `components/ui/`:

| Component | Purpose |
|---|---|
| `Button` | Primary, secondary, outline, ghost variants |
| `Card` | Elevated surface with optional press handler |
| `Input` | Base unstyled input (wrapped by `ControlledInput`) |
| `CustomModal` | Bottom sheet / modal overlay |
| `LoadingSpinner` | Full-screen loading indicator |
| `SafeScreen` | Safe area + keyboard avoiding wrapper |
| `ManagedFlatList` | FlatList with built-in loading/empty/error states |
| `ErrorBoundary` | Render error boundary with retry |
| `ListItem` | Row item with left icon, title, subtitle, right content |

Extend existing components with new props before creating a new one.

---

## 6. Checklist Before Committing

- [ ] All form inputs use `ControlledInput` / existing controlled components
- [ ] No uncontrolled refs used for form inputs
- [ ] `useForm` uses `zodResolver` — no manual validation
- [ ] `defaultValues` specified in `useForm`
- [ ] `errors.<field>` passed as `error` prop to each controlled input
- [ ] Form submit handler has `isSubmitting` guard and `finally` reset
- [ ] No `Alert.alert()` in form handlers — only `toast`
- [ ] New controlled components follow the exact pattern above
- [ ] New controlled components accept generic `Control<T>` and `Path<T>` — no `any`
