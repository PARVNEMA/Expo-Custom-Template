# Services and Types

## Scope

Applies to data access, business rules, mapping, mutations, hooks that coordinate data, and TypeScript contracts.

## Services

- Services own network calls, storage access, response mapping, and feature business rules.
- Name service functions after the capability: `getProfile`, `updateProfile`, `signIn`; avoid vague names such as `handleData`.
- Services do not render UI or navigate. They return typed data or typed errors.
- Convert external or untrusted data at the service boundary so UI receives predictable app-owned models.
- Keep endpoint payload mapping close to its owning service.
- Keep a service feature-local unless it is genuinely used across features.

## Types

- Keep feature-only types in `feature/<name>/types/`; use root `types/` only for cross-feature contracts.
- Separate API payloads from UI/domain models when their shape or semantics differ, such as `UpdateProfileRequest` and `Profile`.
- Never use `any`. Narrow `unknown` with explicit validation or type guards at boundaries.
- Do not use `as SomeType` solely to suppress a compiler error; model the data correctly.

## Component boundary

- Components may use a feature hook or receive data/actions by props.
- Components must not duplicate API mapping or business rules from a service.
- Model loading, empty, error, and success states explicitly at screen/container level.
