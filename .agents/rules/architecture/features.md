# Rule: Feature-Based Architecture

**Scope**: Every new feature, screen, route, or business-logic unit added to this codebase.

> **MANDATORY** — All AI agents and contributors MUST follow this rule without exception.

---

## 1. Directory Structure

Every feature lives under `feature/<feature-name>/` and owns exactly three sub-directories:

```
feature/
└── <feature-name>/
    ├── components/   # UI components used only by this feature
    ├── services/     # Business logic, API calls, data adapters
    └── types/        # TypeScript types and Zod schemas for this feature
```

**`app/` routes are thin compositional wrappers only.** They import from `feature/` and render. No business logic, no local state that could live in a service, no inline data fetching.

---

## 2. Placement Rules

| What you're creating | Where it goes |
|---|---|
| Screen or page | `app/<route>/<DescriptiveName>.tsx` — imports feature component (e.g. `PostListPage.tsx`, `LoginPage.tsx`) |
| Feature-only UI | `feature/<name>/components/` |
| Feature service / mutation / query | `feature/<name>/services/` |
| Feature type or Zod schema | `feature/<name>/types/` |
| Shared UI used by ≥ 2 features | `components/ui/` or `components/forms/` |
| Shared service (e.g. auth, api) | `services/` |
| Shared type (e.g. ApiResponse) | `types/` |
| App-wide context | `context/` |
| Shared hook (no single feature owner) | `hooks/` |
| Design tokens, constants | `config/` |

**NEVER** create `utils/`, `helpers/`, `common/`, or `misc/` directories. If you feel you need one, identify ownership and place it in the right feature or shared directory instead.

---

## 3. Route File Naming in `app/`

Expo Router uses the **filename** as the URL segment. The default `index.tsx` is allowed by the framework but gives no information about what the route does. Use a **descriptive PascalCase name** instead.

### Naming Convention

```
app/<segment>/<DescriptiveName>.tsx
```

| Route intent | ❌ Avoid | ✅ Use |
|---|---|---|
| List / overview screen | `posts/index.tsx` | `posts/PostListPage.tsx` |
| Detail screen | `posts/[id].tsx` | `posts/[id]/PostDetailPage.tsx` |
| Create / form screen | `posts/create.tsx` | `posts/create/CreatePostPage.tsx` |
| Auth login | `(auth)/login.tsx` | `(auth)/login/LoginPage.tsx` |
| Tab home | `(tabs)/index.tsx` | `(tabs)/home/HomePage.tsx` |

> Expo Router resolves the **folder name** as the segment, not the file name, so `posts/PostListPage.tsx` still maps to `/posts`.

### What Routes May and May NOT Do

✅ **Allowed in `app/`**:
- Import and render feature components
- Read route params (`useLocalSearchParams`)
- Declare screen-level `<Stack.Screen options={...} />`
- Use `useFocusEffect` for navigation side effects

❌ **Forbidden in `app/`**:
- Direct API calls (`apiService.get(...)`)
- Business logic or data transformations
- Feature-specific `useState` beyond navigation/modal toggles
- Inline JSX of substantial complexity (extract to feature component)

---

## 4. Promoting to Shared

A feature component, hook, or type becomes **shared** only when two or more distinct features need it.

- Move it to `components/`, `hooks/`, or `types/` respectively.
- Delete the original from the feature directory.
- Update all import paths.
- Document the promotion in a comment at the top of the new file.

---

## 5. Cross-Feature Communication

Features communicate through:
1. **Shared services** in `services/` (e.g., `authService`, `apiService`)
2. **Context providers** in `context/` (e.g., `AuthContext`)
3. **Navigation params** via Expo Router

Features must **NOT** import directly from another feature's internal directories:

```ts
// ❌ FORBIDDEN — cross-feature internal import
import { UserCard } from '@/feature/profile/components/UserCard';

// ✅ CORRECT — use shared components or expose via context/shared service
import { UserCard } from '@/components/ui/UserCard';
```

---

## 6. Concrete Example

**Task**: Add a "Posts" feature that lists and shows detail for posts.

```
app/
├── posts/
│   ├── PostListPage.tsx       ← thin: renders <PostListScreen />
│   └── [id]/
│       └── PostDetailPage.tsx ← thin: renders <PostDetailScreen />
feature/
└── posts/
    ├── components/
    │   ├── PostListScreen.tsx
    │   ├── PostDetailScreen.tsx
    │   └── PostCard.tsx
    ├── services/
    │   └── posts.service.ts
    └── types/
        └── posts.types.ts
```

`app/posts/PostListPage.tsx`:
```tsx
import PostListScreen from '@/feature/posts/components/PostListScreen';
export default PostListScreen;
```

`feature/posts/services/posts.service.ts`:
```ts
import { apiService } from '@/services/api.service';
import { logger } from '@/services/logger.service';
import { showErrorToast } from '@/services/toast.service';
import type { Post } from '../types/posts.types';

const TAG = 'PostsService';

export const postsService = {

  async fetchAll(): Promise<Post[]> {
    try {
      logger.info(TAG, 'Fetching posts list');
      const posts = await apiService.get<Post[]>('/posts');
      logger.info(TAG, `Fetched ${posts.length} posts`);
      return posts;
    } catch (error) {
      logger.error(TAG, 'Failed to fetch posts', error as Error);
      showErrorToast(error, 'Could not load posts. Please try again.');
      throw error;
    }
  },

};
```

---

## 7. Checklist Before Committing

- [ ] All new files placed under `feature/<name>/{components,services,types}` or a correct shared location
- [ ] `app/` routes contain no business logic
- [ ] No cross-feature internal imports
- [ ] No `utils/`, `helpers/`, `common/`, or `misc/` directories created
- [ ] Shared promotion documented if a component moved out of a feature
