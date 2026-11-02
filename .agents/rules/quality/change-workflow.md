# Rule: Change Workflow & Verification

**Scope**: Every source code change regardless of size.

> **MANDATORY** — All AI agents and contributors MUST follow this rule without exception.

---

## 1. Before Writing Any Code

1. Read `AGENTS.md` and the rules listed in the task matrix for your change type.
2. Find the closest existing implementation in the codebase that does something similar — match its patterns.
3. Check `components/ui/`, `components/forms/`, `services/`, and `hooks/` for reusable pieces before creating new ones.

---

## 2. Scope Discipline

- Make only the changes required by the task.
- Do **not** reformat, rename, reorganize, or refactor files that are outside the request scope.
- Do **not** change ESLint config, Babel config, `app.json`, `package.json`, or lockfiles unless the task explicitly requires it.
- Do **not** add new npm dependencies unless the task explicitly requires it.

---

## 3. Verification (Run After Every Change)

Run these in order after every non-trivial change:

```bash
# 1. TypeScript — catch all type errors
npx tsc --noEmit

# 2. Lint — catch style and rule violations
npm run lint
```

**Do not leave TypeScript errors or lint warnings unresolved.** Fix every error before considering the task done.

---

## 4. Completion Report

After every task, report:

1. **Files changed** — list every file created, modified, or deleted.
2. **Validation run** — confirm `tsc --noEmit` and `npm run lint` passed.
3. **Out of scope** — anything intentionally not changed and why.

---

## 5. Guardrails

- Never commit, push, or publish unless explicitly asked.
- Never access, log, or modify secrets or environment values.
- Never invent API response fields — ask if a backend contract is unclear.
- Never create catch-all directories (`utils/`, `helpers/`, `misc/`).
