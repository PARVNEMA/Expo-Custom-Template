# Quality Assurance & Change Workflow

Every modification to the codebase must follow a rigorous verification workflow to ensure zero regressions, complete type safety, and clean maintainability.

## 1. Incremental Verification

Before declaring any change or feature complete:
1. **Type Checking**:
   - Run the TypeScript compiler with zero errors:
     ```bash
     npx tsc --noEmit
     ```
2. **Linting**:
   - Run ESLint to ensure code style and static rules conform:
     ```bash
     npm run lint
     ```
3. **No Unhandled Errors**:
   - Ensure async operations are safely wrapped with try/catch blocks, errors are logged via `logger.error`, and feedback is given via `toast.error`.

## 2. Review Checklist

- [ ] All new files reside in the proper feature-owned or shared directory.
- [ ] No `StyleSheet.create` or inline styles were introduced (pure NativeWind `className`).
- [ ] Design tokens (colors, font sizes) originate from `config/theme.ts`.
- [ ] No `any` type was introduced.
- [ ] Controlled forms use `ControlledInput` / `react-hook-form` / `zod`.
- [ ] Interactive elements meet 44x44pt touch target and have accessibility labels.
- [ ] Logging uses `services/logger.service.ts` with sensitive data masked.
- [ ] Errors from API operations notify users via `services/toast.service.ts`.
