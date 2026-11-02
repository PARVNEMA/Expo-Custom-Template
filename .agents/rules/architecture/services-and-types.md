# Rule: Services & Types Organisation

**Scope**: All service files, type definitions, and Zod validation schemas in this project.

> **MANDATORY** — All AI agents and contributors MUST follow this rule without exception.

---

## 1. Service File Conventions

### Naming

| Scope | Location | Naming convention |
|---|---|---|
| Feature service | `feature/<name>/services/<name>.service.ts` | `posts.service.ts` |
| Shared service | `services/<name>.service.ts` | `api.service.ts` |

### Structure

A service file exports a **named service object** (e.g. `postsService`, `authService`). All async methods live on that object. This mirrors the existing `apiService` / `authService` pattern and avoids unbounded named-export lists.

```ts
// feature/posts/services/posts.service.ts

import { apiService } from '@/services/api.service';
import { logger } from '@/services/logger.service';
import { toast } from '@/services/toast.service';
import type { Post } from '../types/posts.types';

const TAG = 'PostsService'; // Module-level constant for logger tag

export const postsService = {
  async fetchAll(): Promise<Post[]> { ... },
  async fetchById(id: number): Promise<Post> { ... },
  async create(payload: CreatePostPayload): Promise<Post> { ... },
  async update(id: number, payload: UpdatePostPayload): Promise<Post> { ... },
  async remove(id: number): Promise<void> { ... },
};
```

**Rules**:
- Export a **single named object** per service file — not a default export, not a class.
- Name the object `<featureName>Service` in camelCase (e.g. `postsService`, `profileService`).
- Define a module-level `const TAG = '<FeatureName>Service'` and use it in every `logger` call.
- Do not export raw data or constants from service files — those belong in `types/` or `config/`.

---

## 2. Types File Conventions

### Naming

| Scope | Location | Naming convention |
|---|---|---|
| Feature types | `feature/<name>/types/<name>.types.ts` | `posts.types.ts` |
| Feature schemas | `feature/<name>/types/<name>.schema.ts` | `posts.schema.ts` |
| Shared types | `types/<name>.types.ts` | `api.types.ts` |

### What goes in a types file

```ts
// feature/posts/types/posts.types.ts

// ─── Entity Types ─────────────────────────────────────────────────────────────

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// ─── Request Payload Types ────────────────────────────────────────────────────

export interface CreatePostPayload {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostPayload {
  title?: string;
  body?: string;
}

// ─── UI / ViewModel Types (if needed) ────────────────────────────────────────

export interface PostCardProps {
  post: Post;
  onPress: (id: number) => void;
}
```

---

## 3. Zod Validation Schemas

All form and API payload validation uses **Zod**. Schema files live alongside type files.

### Naming

`feature/<name>/types/<name>.schema.ts`

### Pattern

```ts
// feature/posts/types/posts.schema.ts

import { z } from 'zod';

// ─── Form Schemas ─────────────────────────────────────────────────────────────

export const createPostSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),
  body: z
    .string({ required_error: 'Body is required' })
    .min(10, 'Body must be at least 10 characters'),
});

export const updatePostSchema = createPostSchema.partial();

// ─── Inferred Types from Schemas ─────────────────────────────────────────────

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
export type UpdatePostFormValues = z.infer<typeof updatePostSchema>;
```

**Rules**:
- Always infer TypeScript types from Zod schemas with `z.infer<typeof schema>`.
- Use these inferred types as the form's `FieldValues` type in `useForm<CreatePostFormValues>()`.
- Never duplicate type definitions — if a type is inferred from a schema, do not redefine it manually.
- Validation error messages must be user-friendly English strings (no error codes, no JSON).

---

## 4. Strict TypeScript Requirements

```ts
// ❌ FORBIDDEN
const data: any = response.data;
function handleData(input: any) { ... }
const user = response as any;

// ✅ CORRECT
const data: Post[] = response.data;
function handleData(input: Post) { ... }
const user = response as User; // only when the type is genuinely known
```

- **No `any`** — type everything explicitly or use `unknown` with a type guard.
- **No type assertions** (`as SomeType`) solely to silence a TypeScript error; understand and fix the root cause.
- **No implicit `any`** from untyped function parameters.

---

## 5. Shared vs Feature Types

Promote a type to `types/` (shared) only when two or more distinct features reference it.

```ts
// types/api.types.ts — shared, used by apiService and all features
export interface ApiResponse<T> { data: T; message?: string; success: boolean; timestamp: string; }
export interface ApiError { message: string; status: number; code?: string; details?: unknown; }
export interface PaginatedResponse<T> { data: T[]; pagination: PaginationMeta; }

// feature/posts/types/posts.types.ts — feature-local
export interface Post { id: number; title: string; body: string; userId: number; }
```

---

## 6. Import Aliases

Always use `@/` path aliases. Never use relative `../../../` paths that cross feature or module boundaries.

```ts
// ✅ CORRECT
import { apiService } from '@/services/api.service';
import { toast } from '@/services/toast.service';
import { logger } from '@/services/logger.service';
import type { Post } from '@/feature/posts/types/posts.types';

// ❌ FORBIDDEN — brittle relative paths across boundaries
import { apiService } from '../../../services/api.service';
```

---

## 7. Checklist Before Committing

- [ ] Service files are named `<name>.service.ts` and located correctly
- [ ] Type files are named `<name>.types.ts` and schema files `<name>.schema.ts`
- [ ] All Zod schemas have friendly validation messages
- [ ] TypeScript types are inferred from schemas — no duplication
- [ ] No `any` types — `unknown` with type guards if truly uncertain
- [ ] `@/` path aliases used for all cross-directory imports
- [ ] Feature types stay feature-local unless genuinely shared
