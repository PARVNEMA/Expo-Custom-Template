# Rule: Components & Error Handling via Toast

**Scope**: All React Native components — shared (`components/`) and feature-local (`feature/*/components/`).

> **MANDATORY** — All AI agents and contributors MUST follow this rule without exception.

---

## 1. Component Placement Decision

| Condition | Location |
|---|---|
| Used by exactly one feature | `feature/<name>/components/` |
| Used by two or more features | `components/ui/` (primitive) or `components/forms/` (form input) |
| Wraps a third-party primitive | `components/ui/` |

Never put feature-specific business logic in `components/ui/` or `components/forms/`. Those directories contain **pure UI** only.

---

## 2. Component File Structure

Every component file follows this order:

```tsx
// 1. React and React Native imports
import React, { useState, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';

// 2. Third-party library imports
import { useRouter } from 'expo-router';

// 3. Internal imports — services, hooks, components
import { toast } from '@/services/toast.service';
import { logger } from '@/services/logger.service';
import Button from '@/components/ui/Button';

// 4. Feature-local imports
import { deletePost } from '../services/posts.service';
import type { Post } from '../types/posts.types';

// 5. Types / interfaces for THIS file
interface PostCardProps {
  post: Post;
  onDelete?: (id: number) => void;
}

// 6. Component implementation
export default function PostCard({ post, onDelete }: PostCardProps) { ... }
```

---

## 3. Error Handling in Components

### Rule: All async operations in a component MUST handle errors with toast

```tsx
// ✅ CORRECT — try/catch with toast in the component handler
const handleDelete = useCallback(async () => {
  try {
    await deletePost(post.id);
    toast.success('Post deleted.');
    onDelete?.(post.id);
  } catch {
    // Service already called toast.error — no double-toast needed
    // Only log here if extra context is needed
    logger.warn('PostCard', 'Delete failed for post', { id: post.id });
  }
}, [post.id, onDelete]);

// ❌ FORBIDDEN — unhandled async, no user feedback
const handleDelete = async () => {
  await deletePost(post.id); // throws? user never knows
};

// ❌ FORBIDDEN — alert() for errors
const handleDelete = async () => {
  try {
    await deletePost(post.id);
  } catch (e) {
    Alert.alert('Error', 'Something went wrong'); // use toast instead
  }
};
```

### Double-Toast Rule

Services already call `toast.error(...)` in their catch blocks. Components that call those services should **NOT** toast again for the same error — they only need to handle local state (e.g., reset a loading flag, close a modal).

```tsx
// ✅ CORRECT — service toasts, component cleans up state
try {
  await deletePost(post.id);
  setDeleting(false);
} catch {
  setDeleting(false); // reset loading state — no second toast
}

// ❌ FORBIDDEN — double toast
try {
  await deletePost(post.id);
} catch (e) {
  toast.error('Failed to delete'); // service already did this
}
```

---

## 4. Loading & Async State Pattern

```tsx
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (data: FormValues) => {
  if (isLoading) return;          // prevent double-submission
  setIsLoading(true);
  try {
    await createPost(data);
    toast.success('Post created!');
    router.back();
  } catch {
    // service handled toast — just reset state
  } finally {
    setIsLoading(false);          // always reset loading
  }
};

return (
  <Button
    title="Submit"
    loading={isLoading}
    disabled={isLoading}
    onPress={handleSubmit}
  />
);
```

---

## 5. UI Component Standards

### Shared UI Components (`components/ui/`)

- Accept a typed `Props` interface — no `any`.
- Apply a default `className` and accept an optional `className` prop to allow overrides.
- Must not import from any `feature/` directory.
- Must not call `apiService`, `toast`, or `logger` directly — pass callbacks as props.

```tsx
// components/ui/Card.tsx — ✅ CORRECT
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export default function Card({ children, className, onPress }: CardProps) {
  return (
    <Pressable
      className={`bg-surface-card rounded-xl p-4 shadow-sm ${className ?? ''}`}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}
```

### Loading States

Always use the shared `LoadingSpinner` component for full-screen loading, or `ActivityIndicator` sized to its context.

```tsx
import LoadingSpinner from '@/components/ui/LoadingSpinner';

if (isLoading) return <LoadingSpinner />;
```

### Empty States

Every list component must render a non-empty, user-friendly message when there is no data:

```tsx
if (!data || data.length === 0) {
  return (
    <View className="flex-1 items-center justify-center py-12">
      <Text className="text-text-muted text-base text-center">No posts yet.</Text>
    </View>
  );
}
```

---

## 6. ErrorBoundary Usage

Wrap every major screen or feature subtree with `ErrorBoundary` to catch render-time crashes:

```tsx
// app/posts/index.tsx
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import PostListScreen from '@/feature/posts/components/PostListScreen';

export default function PostsRoute() {
  return (
    <ErrorBoundary>
      <PostListScreen />
    </ErrorBoundary>
  );
}
```

The `ErrorBoundary` component logs the error and renders a "Try Again" fallback. Do not use bare try/catch in render functions to suppress rendering errors.

---

## 7. Props Typing Rules

```tsx
// ✅ CORRECT — explicit prop interface
interface MyProps {
  title: string;
  count?: number;
  onPress: () => void;
  children?: React.ReactNode;
}

// ❌ FORBIDDEN — any or untyped
function MyComponent({ title, onPress }: any) { ... }
function MyComponent(props) { ... }
```

---

## 8. Checklist Before Committing

- [ ] Component placed in the correct directory (feature-local vs shared)
- [ ] All async handlers wrapped in try/catch
- [ ] Loading state prevents double-submission
- [ ] `finally` block resets loading state
- [ ] No `Alert.alert()` for errors — only `toast`
- [ ] No double-toast (service toasts, component cleans up state)
- [ ] Props typed with a named `interface` — no `any`
- [ ] Empty states handled for all list/data components
- [ ] Major screens wrapped in `ErrorBoundary`
- [ ] No imports from `feature/` inside `components/ui/` or `components/forms/`
