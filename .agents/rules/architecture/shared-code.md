# Shared Code & Promotion Rules

To keep the template modular and avoid monolithic pollution, code starts local and is only promoted when necessary.

## 1. The Rule of Two

Code begins its life inside a specific feature (`feature/<feature-name>/`).
Code is **only** promoted to shared directories (`components/`, `services/`, `types/`, `hooks/`) when:
1. Two or more distinct features genuinely require the identical functionality.
2. The logic or component is truly domain-agnostic (e.g., standard button, date picker, API client, auth token storage).

## 2. Shared Code Placement

| Category | Destination | Criteria |
|---|---|---|
| Reusable Primitives | `components/ui/` | Primitive design elements: Button, Input, Modal, Card, Text, Spinner |
| Form Controls | `components/forms/` | React Hook Form controlled wrappers: ControlledInput, ControlledSelect |
| Cross-Cutting Logic | `services/` | Logger, Toast, HTTP Client, Biometrics, SecureStorage |
| Global Types | `types/` | API responses, User session models, Navigation param lists |
| Shared Custom Hooks | `hooks/` | Reusable hooks without domain coupling (e.g., `useDebounce`, `useKeyboard`) |

## 3. Preservation & Clean Exports

- Never leave dead or duplicate components in features after promoting them to shared.
- Avoid circular imports by ensuring shared components never import from `feature/` modules.
