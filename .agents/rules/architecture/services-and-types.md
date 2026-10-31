# Services and Types Rules

Services encapsulate business logic, API calls, storage access, and device interactions. Types provide compile-time guarantees and schema validation.

## 1. Service Guidelines

1. **Singleton or Stateless Classes / Modules**:
   - Provide concrete methods for every action.
   - Inject dependencies or reference the global `apiService` rather than instantiating ad-hoc HTTP clients.
2. **Logging via `logger`**:
   - Every service operation should log meaningful lifecycle events (e.g. `logger.info('AuthService', 'Login initiated', { email })`).
   - Never log sensitive fields (passwords, auth tokens, credit cards).
3. **Error Handling & User Feedback**:
   - Surface predictable error models (`ApiError`).
   - Use `toast.error(message)` or allow `ApiService` interceptors to display user-visible alerts automatically.
   - Re-throw formatted errors when callers need to manage local state (e.g., stopping a button loading spinner).

## 2. Type Safety Standards

1. **Strict Zero-`any` Policy**:
   - Never use `any` in service methods, return types, or component props.
   - Use `unknown` with type narrowing, generics `<T>`, or discriminated unions.
2. **Schema Validation with Zod**:
   - Use Zod schemas for all form schemas and API payload validations where unpredictable data can arrive.
   - Derive TypeScript types using `z.infer<typeof Schema>`.
3. **Location of Types**:
   - Feature-specific types belong in `feature/<name>/types/`.
   - App-wide domain models, shared API contracts, or global config types belong in `types/`.
