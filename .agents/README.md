# Agent Configuration

This directory contains durable, project-local instructions for coding agents.

`AGENTS.md` is the mandatory entry point. It defines global constraints and which rule files to read. The `rules/` tree is organized by concern:

```text
rules/
  architecture/   Feature ownership, services, types, shared-code promotion
  ui/             NativeWind, component design, accessibility
  quality/        Change workflow and verification
```

## Writing rules

- Keep one subject per file.
- State scope before rules.
- Write observable requirements, not vague preferences.
- Update this index and `AGENTS.md` for new rule categories.
- Never put secrets, environment values, personal data, or generated output here.
