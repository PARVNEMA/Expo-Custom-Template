# Rule: Shared Code Promotion

**Scope**: Decisions about when and how to move code from feature-local to shared directories.

> **MANDATORY** — All AI agents and contributors MUST follow this rule without exception.

---

## 1. The Promotion Threshold

Code is promoted from a feature directory to a shared directory **only when two or more distinct features need it**.

| Item | Stays feature-local | Promoted to shared |
|---|---|---|
| UI component | Used in 1 feature | Used in ≥ 2 features → `components/ui/` or `components/forms/` |
| Hook | Used in 1 feature | Used in ≥ 2 features → `hooks/` |
| Type / interface | 1 feature | ≥ 2 features → `types/` |
| Service function | 1 feature | ≥ 2 features → `services/` |

---

## 2. Promotion Checklist

When promoting:

1. Move the file to the correct shared location.
2. Update all import paths in every file that referenced it.
3. Delete the original from the feature directory.
4. Add a comment at the top of the promoted file explaining it was promoted and when:

```ts
// Promoted from feature/posts/components/AvatarBadge.tsx — 2024-01
// Now shared by feature/posts and feature/profile.
```

5. Verify with `npx tsc --noEmit` that no imports are broken.

---

## 3. Forbidden Shared Directories

Never create catch-all directories. These are banned:

```
utils/    ← banned
helpers/  ← banned
common/   ← banned (the components/common/ dir is for truly shared layout wrappers only)
misc/     ← banned
lib/      ← banned (unless for a dedicated third-party adapter, explicitly named)
```

If you feel you need one of these, identify ownership:
- Is it UI? → `components/ui/`
- Is it a hook? → `hooks/`
- Is it a service? → `services/`
- Is it a type? → `types/`
- Is it configuration? → `config/`

---

## 4. Checklist Before Committing

- [ ] No new `utils/`, `helpers/`, `common/`, or `misc/` directories created
- [ ] Code promoted only when genuinely needed by 2+ features
- [ ] Original file deleted after promotion
- [ ] All import paths updated and TypeScript confirmed passing
