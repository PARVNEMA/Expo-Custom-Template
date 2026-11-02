# Rule: API Service & Error Handling

**Scope**: Every file that makes network requests, calls `apiService`, or handles async data operations.

> **MANDATORY** — All AI agents and contributors MUST follow this rule without exception.

---

## 1. Always Use `apiService`

All HTTP communication goes through the singleton `apiService` from `@/services/api.service`.

```ts
// ✅ CORRECT
import { apiService } from '@/services/api.service';
const data = await apiService.get<MyType>('/endpoint');

// ❌ FORBIDDEN — never call fetch, axios, or any HTTP client directly
const res = await fetch('https://api.example.com/endpoint');
const res = await axios.get('/endpoint');
```

`apiService` handles: auth token injection, token refresh, retry logic, and centralised error formatting. Bypassing it loses all of these guarantees.

---

## 2. Mandatory try/catch in Every Service Method

Every async function in `feature/<name>/services/` or `services/` that calls `apiService` **must** wrap the call in try/catch.

### Pattern

```ts
import { apiService } from '@/services/api.service';
import { logger } from '@/services/logger.service';
import { toast } from '@/services/toast.service';
import { ApiError } from '@/types/api.types';

export async function createPost(payload: CreatePostPayload): Promise<Post> {
  try {
    logger.info('PostsService', 'Creating new post', { title: payload.title });

    const post = await apiService.post<Post>('/posts', payload);

    logger.info('PostsService', `Post created successfully`, { id: post.id });
    return post;
  } catch (error) {
    const apiError = error as ApiError;
    logger.error('PostsService', 'Failed to create post', error as Error, { payload });
    toast.error(
      apiError.message ?? 'Failed to create post. Please try again.',
      'Create Error'
    );
    throw error; // Re-throw so the caller / React Query can react
  }
}
```

### Rules

| Rule | Reason |
|---|---|
| Log **before** the request with `logger.info` | Provides a request trail |
| Log **after** success with `logger.info` | Confirms completion |
| Log in `catch` with `logger.error` | Captures failures for debugging |
| Call `toast.error(...)` in `catch` | Surfaces the failure to the user |
| Re-throw after logging and toasting | Lets React Query / UI state react |
| Never swallow errors silently | Silent failures hide bugs |

---

## 3. Logger Signature

```ts
// Correct signatures — use the matching level
logger.debug(tag: string, message: string, context?: LogContext): void
logger.info(tag: string, message: string, context?: LogContext): void
logger.warn(tag: string, message: string, context?: LogContext): void
logger.error(tag: string, message: string, error?: unknown, context?: LogContext): void
```

- `tag` — the service name, e.g. `'PostsService'`, `'AuthService'`
- `message` — a human-readable description of what is happening
- `context` — a plain object with relevant IDs or data (automatically sanitised for secrets)
- `error` — the raw caught error (for `logger.error` only)

```ts
// ❌ FORBIDDEN — raw console calls
console.log('Fetching posts');
console.error('Error:', error);

// ✅ CORRECT
logger.info('PostsService', 'Fetching posts');
logger.error('PostsService', 'Failed to fetch posts', error as Error);
```

---

## 4. Toast for User-Facing Errors

Every API failure **must** show a toast. The message must be human-readable (not a raw HTTP status or stack trace).

```ts
// ✅ CORRECT
toast.error('Could not load your profile. Please try again.', 'Load Failed');
toast.success('Profile updated successfully!');
toast.warning('Your session is about to expire.');
toast.info('Changes saved.');

// ❌ FORBIDDEN — raw error messages or no notification at all
toast.error(error.toString());         // Not user-friendly
toast.error(JSON.stringify(apiError)); // Not user-friendly
// (no toast at all)                   // User has no feedback
```

---

## 5. Service File Structure

Services are exported as a **named object** (`postsService`, `authService`, etc.) whose methods are the async operations. This groups related operations under one import, mirrors the existing `apiService` / `authService` pattern, and makes the service identity explicit in every log tag.

```ts
// feature/posts/services/posts.service.ts

import { apiService } from '@/services/api.service';
import { logger } from '@/services/logger.service';
import { toast } from '@/services/toast.service';
import type { ApiError } from '@/types/api.types';
import type { Post, CreatePostPayload, UpdatePostPayload } from '../types/posts.types';

const TAG = 'PostsService';

export const postsService = {

  async fetchAll(): Promise<Post[]> {
    try {
      logger.info(TAG, 'Fetching all posts');
      const posts = await apiService.get<Post[]>('/posts');
      logger.info(TAG, `Fetched ${posts.length} posts`);
      return posts;
    } catch (error) {
      logger.error(TAG, 'Failed to fetch posts', error as Error);
      toast.error('Could not load posts. Please try again.', 'Load Error');
      throw error;
    }
  },

  async fetchById(id: number): Promise<Post> {
    try {
      logger.info(TAG, `Fetching post ${id}`);
      const post = await apiService.get<Post>(`/posts/${id}`);
      logger.info(TAG, `Fetched post ${id}`);
      return post;
    } catch (error) {
      logger.error(TAG, `Failed to fetch post ${id}`, error as Error, { id });
      toast.error('Could not load this post. Please try again.', 'Load Error');
      throw error;
    }
  },

  async create(payload: CreatePostPayload): Promise<Post> {
    try {
      logger.info(TAG, 'Creating new post', { title: payload.title });
      const post = await apiService.post<Post>('/posts', payload);
      logger.info(TAG, 'Post created successfully', { id: post.id });
      toast.success('Post created!');
      return post;
    } catch (error) {
      const apiError = error as ApiError;
      logger.error(TAG, 'Failed to create post', error as Error, { payload });
      toast.error(apiError.message ?? 'Failed to create post. Please try again.', 'Create Error');
      throw error;
    }
  },

  async update(id: number, payload: UpdatePostPayload): Promise<Post> {
    try {
      logger.info(TAG, `Updating post ${id}`, { id });
      const post = await apiService.put<Post>(`/posts/${id}`, payload);
      logger.info(TAG, `Post ${id} updated successfully`);
      toast.success('Post updated successfully!');
      return post;
    } catch (error) {
      const apiError = error as ApiError;
      logger.error(TAG, `Failed to update post ${id}`, error as Error, { id, payload });
      toast.error(apiError.message ?? 'Failed to update post.', 'Update Error');
      throw error;
    }
  },

  async remove(id: number): Promise<void> {
    try {
      logger.info(TAG, `Deleting post ${id}`);
      await apiService.delete(`/posts/${id}`);
      logger.info(TAG, `Post ${id} deleted`);
      toast.success('Post deleted.');
    } catch (error) {
      logger.error(TAG, `Failed to delete post ${id}`, error as Error, { id });
      toast.error('Could not delete this post. Please try again.', 'Delete Error');
      throw error;
    }
  },

};
```

### Usage at the call site

```ts
// In a component or hook — one import gives access to all operations
import { postsService } from '@/feature/posts/services/posts.service';

const posts  = await postsService.fetchAll();
const post   = await postsService.fetchById(42);
const newPost = await postsService.create({ title, body, userId });
await postsService.update(42, { title: 'Updated' });
await postsService.remove(42);
```

### Why an object, not plain exports?

| Plain named exports | Service object |
|---|---|
| `import { fetchPosts, deletePost }` — grows unbounded | `import { postsService }` — one import forever |
| Naming collisions across features | Namespaced: `postsService.fetchAll` vs `profileService.fetchAll` |
| No shared TAG constant enforcement | TAG lives once, all methods inherit it |
| Harder to mock in tests | Replace `postsService` with one object mock |

---

## 6. What NOT to Do

```ts
// ❌ No try/catch
export async function fetchPosts() {
  return apiService.get('/posts'); // errors are unhandled
}

// ❌ Swallowing errors
try {
  return await apiService.get('/posts');
} catch {
  return []; // silent failure — user sees empty list with no explanation
}

// ❌ No logger calls
try {
  return await apiService.get('/posts');
} catch (error) {
  toast.error('Error loading posts');
  throw error; // error disappears — no trace for debugging
}

// ❌ No toast on failure
try {
  return await apiService.get('/posts');
} catch (error) {
  logger.error('PostsService', 'Failed', error as Error);
  throw error; // user sees nothing
}
```

---

## 7. Checklist Before Committing

- [ ] Every async service function has a try/catch
- [ ] `logger.info` called before and after every request
- [ ] `logger.error` called in every catch block with the raw error
- [ ] `toast.error(...)` called in every catch block with a friendly message
- [ ] No raw `console.log` / `console.error` in service files
- [ ] No direct `fetch` or `axios` calls — only `apiService`
- [ ] Errors are re-thrown after logging (not swallowed)
