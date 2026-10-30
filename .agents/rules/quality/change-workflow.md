# Change Workflow and Verification

## Scope

Applies to all source, configuration, and documentation changes.

## During implementation

- Make the smallest change that meets the request.
- Follow the closest existing pattern unless it conflicts with an explicit rule.
- Do not mix refactors, formatting sweeps, dependency upgrades, or unrelated cleanup into a feature change.
- Add tests when the existing test setup covers the changed behavior; never claim a behavior was tested if no test was run.

## Before handoff

- Inspect changed files for unintended edits and secrets.
- Run the most relevant available `package.json` scripts, such as lint, type check, or targeted tests.
- If validation cannot run, report the exact command and blocker instead of implying success.
- Summarize changed behavior, files, verification, and deliberate scope exclusions.

## Git safety

- Never overwrite or discard unrelated existing work.
- Do not commit, push, amend, rebase, or reset unless explicitly requested.
- Do not modify generated folders, build output, lockfiles, or Expo configuration unless the requested work requires it.
