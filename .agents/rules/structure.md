# Project Structure Rules

## Scope

Applies when adding or moving application code.

## Rules

- Organize domain-specific code by feature under `feature/<feature-name>/`.
- Within a feature, keep UI in `components/`, business and data logic in `services/`, and TypeScript models/contracts in `types/`.
- Keep feature internals together; do not place feature-specific code in root-level shared directories.
- Use root-level `components/`, `services/`, and `types/` only for code genuinely shared by two or more features.
- Keep route files focused on navigation and screen composition. Move substantial feature logic into its feature directory.
- Use clear feature names and avoid catch-all folders such as `utils`, `common`, or `misc` unless their scope is explicit.
