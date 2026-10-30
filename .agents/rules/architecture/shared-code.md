# Shared Code Promotion

## Scope

Applies when deciding whether code belongs in a feature or a root-level shared directory.

## Promotion rule

Keep code local on its first use. Promote it only when at least two real consumers require the same behavior and contract.

Before promoting, confirm:

1. Consumers need the same behavior, not merely a similar appearance.
2. The shared API can remain small and clear.
3. The module will not force feature-specific assumptions onto unrelated consumers.
4. The module has a clear owner and purpose after promotion.

## Shared locations

- `components/`: domain-neutral reusable UI.
- `services/`: cross-feature integrations, clients, or capabilities.
- `types/`: cross-feature models and contracts.
- `hooks/`: shared React behavior.
- `config/`: app-wide static configuration and constants.

## Rules

- Shared modules must not import from feature directories.
- Do not create universal components with feature flags for unrelated flows; split into composable primitives or keep them local.
- Preserve existing consumer behavior when changing a shared public API unless migration is in scope.
