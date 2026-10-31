# Feature-First Architecture Rules

Every application capability and business domain must be organized as an isolated, self-contained feature inside the `feature/` directory.

## 1. Directory Structure

Each feature lives inside `feature/<feature-name>/` and follows this standard layout:

```text
feature/<feature-name>/
├── components/     # UI screens, widgets, cards, and forms private to this feature
├── services/       # API integration, business logic, storage, and transformers
└── types/          # TypeScript interfaces, contracts, Zod schemas, and view models
```

### Folder Responsibilities:
- **`components/`**: Houses all visual UI components used exclusively by this feature. No cross-feature dependencies allowed.
- **`services/`**: Houses classes, functions, and query/mutation handlers. Encapsulates all domain-specific data operations and side-effects.
- **`types/`**: Houses interfaces, request/response models, state types, and domain contracts.

## 2. Relationship with `app/` (Expo Router)

- Routes inside `app/` are **pure composition and navigation coordinators**.
- Routes must **NOT** contain heavy UI definitions, inline API fetching, or complex business logic.
- A route imports the feature screen or main orchestrator from `feature/<feature-name>/components/...` and passes navigation/route parameters.

```tsx
// Good: app/(app)/profile.tsx
import { ProfileScreen } from '@/feature/profile/components/ProfileScreen';

export default function ProfileRoute() {
  return <ProfileScreen />;
}
```

```tsx
// Bad: app/(app)/profile.tsx
// Defining raw JSX views, calling axios or SecureStore directly in route files
```

## 3. Strict Boundary & Isolation Rules

1. **No Feature-to-Feature Component Ingestion**: A component in `feature/auth` must never import a component from `feature/dashboard`.
2. **Promoting to Shared**:
   - If two or more features genuinely require the same component, logic, or type, promote it to the root level:
     - Shared UI -> `components/`
     - Shared Business Logic -> `services/`
     - Shared Types -> `types/`
3. **No Unstructured Utilities**:
   - Do not create random `utils/` or `helpers/` subdirectories inside features without clear domain responsibilities. Place business logic in `services/`.
