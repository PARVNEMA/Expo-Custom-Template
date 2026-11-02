# Rule: Types, Validation & Zod Schemas

**Scope**: All TypeScript type definitions, Zod schemas, and form validation across the project.

> **MANDATORY** — All AI agents and contributors MUST follow this rule without exception.

---

## 1. Two Files, Two Purposes

For every feature that has forms or API payloads, maintain exactly two files:

| File | Contains | Example |
|---|---|---|
| `<name>.types.ts` | Entity shapes, request/response interfaces, component prop types | `posts.types.ts` |
| `<name>.schema.ts` | Zod schemas + inferred form value types | `posts.schema.ts` |

Never mix entity interfaces with Zod schemas in the same file.

---

## 2. Entity Types (`*.types.ts`)

Entity types model the data as it arrives from or is sent to the API.

```ts
// feature/posts/types/posts.types.ts

// ─── API Entity ───────────────────────────────────────────────────────────────

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// ─── Request Payloads ─────────────────────────────────────────────────────────

export interface CreatePostPayload {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostPayload {
  title?: string;
  body?: string;
}

// ─── UI / ViewModel ───────────────────────────────────────────────────────────

export interface PostSummary {
  id: number;
  title: string;
  excerpt: string; // derived — first 100 chars of body
}
```

---

## 3. Zod Schemas (`*.schema.ts`)

Schemas validate and coerce user input before it reaches a service call.

```ts
// feature/posts/types/posts.schema.ts

import { z } from 'zod';

// ─── Create Schema ────────────────────────────────────────────────────────────

export const createPostSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters')
    .trim(),
  body: z
    .string({ required_error: 'Body is required' })
    .min(10, 'Body must be at least 10 characters')
    .trim(),
});

// ─── Update Schema (all fields optional) ─────────────────────────────────────

export const updatePostSchema = createPostSchema.partial();

// ─── Login Schema ─────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please enter a valid email address'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters'),
});

// ─── Register Schema ──────────────────────────────────────────────────────────

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(2, 'Name must be at least 2 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Please enter a valid email address'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string({ required_error: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ─── Inferred Form Types (export from schema, not duplicated in types.ts) ────

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
export type UpdatePostFormValues = z.infer<typeof updatePostSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
```

### Zod Validation Message Rules

| Input type | Required message | Format message |
|---|---|---|
| String | `'<Field> is required'` | `'Please enter a valid <field>'` |
| Email | `'Email is required'` | `'Please enter a valid email address'` |
| Min length | — | `'<Field> must be at least N characters'` |
| Max length | — | `'<Field> cannot exceed N characters'` |
| Password match | — | `'Passwords do not match'` |
| Number min/max | `'<Field> is required'` | `'<Field> must be between N and M'` |

- All messages are **user-friendly English** — no error codes, no JSON, no technical terms.
- Use `required_error` for missing-value messages and the `.min()/.max()/.email()` argument for format errors.

---

## 4. Inferred Types Are Canon

When a type is derivable from a Zod schema, **do not define it again manually in `.types.ts`**.

```ts
// ✅ CORRECT — inferred from schema
// posts.schema.ts
export type CreatePostFormValues = z.infer<typeof createPostSchema>;

// posts.service.ts — import the inferred type, don't redefine
import type { CreatePostFormValues } from '../types/posts.schema';

// ❌ FORBIDDEN — manual duplicate of what schema already defines
// posts.types.ts
export interface CreatePostFormValues { title: string; body: string; } // ← redundant
```

**Exception**: API payload types (`CreatePostPayload`) are often different from form types (e.g., they include server-generated fields or have different optional/required constraints). These may live in `.types.ts` separately.

---

## 5. Shared Types in `types/`

Types promoted to `types/` (used by 2+ features) follow the same two-file pattern at the root level:

```
types/
├── api.types.ts     ← ApiResponse<T>, ApiError, PaginatedResponse<T>
└── auth.types.ts    ← User, AuthResponse, AuthContextType
```

```ts
// types/api.types.ts

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  timestamp: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: unknown;   // ← unknown, not any
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

---

## 6. No `any` Policy

```ts
// ❌ ALL FORBIDDEN
const data: any = response;
function process(input: any) { ... }
error as any;
(obj as any).someField;

// ✅ CORRECT alternatives
const data: Post = response;
function process(input: Post) { ... }
const err = error as Error;       // when you know the type
const err = error as unknown;     // when you don't — then narrow with type guard
if (err instanceof Error) { ... } // type guard to narrow unknown
```

---

## 7. Using Forms with Schemas

```tsx
// Always use zodResolver to connect the schema to react-hook-form
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema, CreatePostFormValues } from '../types/posts.schema';

const { control, handleSubmit, formState: { errors } } = useForm<CreatePostFormValues>({
  resolver: zodResolver(createPostSchema),
  defaultValues: {
    title: '',
    body: '',
  },
});
```

---

## 8. Checklist Before Committing

- [ ] Entity types in `*.types.ts`, Zod schemas in `*.schema.ts`
- [ ] Form value types inferred from schemas with `z.infer<typeof schema>`
- [ ] No duplicate type definitions — inferred types used directly
- [ ] All validation messages are user-friendly English
- [ ] `required_error` used for missing-value messages in Zod
- [ ] No `any` — use specific types or `unknown` with type guards
- [ ] `zodResolver` used in every `useForm` call
- [ ] `defaultValues` provided to `useForm`
- [ ] Shared types in `types/` promoted only when used by 2+ features
