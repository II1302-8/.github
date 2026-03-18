# Project Workflow

## Version Control

- **Branching model**: Branch-based development off `main`.
- **Branch naming**: `feature/<issue-number>-short-description` or `fix/<issue-number>-short-description`.
- **Merge strategy**: Rebase merges only.
- **Pull requests**: Every PR requires **at least one approval** before merging to `main`. No direct pushes to `main`.

## Commit Messages

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(optional scope): short description

optional body
```

Common types:

| Type       | Use for                                                 |
| ---------- | ------------------------------------------------------- |
| `feat`     | New feature                                             |
| `fix`      | Bug fix                                                 |
| `docs`     | Documentation only                                      |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test`     | Adding or updating tests                                |
| `chore`    | Build config, dependencies, CI, etc.                    |

Examples:

- `feat(auth): add login endpoint`
- `fix(#42): handle null response from API`
- `docs: update setup instructions in README`

## Code Style

> **TBD** — Finalize once the tech stack is decided. Preliminary conventions below.

### C

- **Naming**: `snake_case` for functions and variables, `UPPER_SNAKE_CASE` for constants and macros
- **Braces**: Opening brace on the same line as the statement
- **Indentation**: 4 spaces
- **Headers**: Use include guards (`#ifndef HEADER_NAME_H` / `#define` / `#endif`)
- **Formatter**: `clang-format`

### JavaScript

- **Naming**: `camelCase` for variables and functions, `PascalCase` for components/classes, `UPPER_SNAKE_CASE` for constants
- **Indentation**: 2 spaces
- **Semicolons**: Use them
- **Formatter/Linter**: Prettier + ESLint

### General

- Run the formatter before committing. Ideally set up a pre-commit hook or editor integration so it happens automatically.
- Don't mix style changes with functional changes in the same commit.

## Code Review

- Respond to review requests **within 24 hours**.
- If you can't review in time, let the team know in Discord so someone else can pick it up.

## Issue Tracking & Planning

- **GitHub Issues** for all tasks, bugs, and feature requests.
- **GitHub Projects (Kanban board)** to track progress. Columns: `To Do`, `In Progress`, `In Review`, `Done`.
- Link PRs to their corresponding issue (`Closes #<issue-number>`).

## Communication (Discord)

- Use **Discord threads** for topic-specific discussions (e.g., per issue, per PR, per decision).
- Meeting notes, decisions, and other documentation should be posted in a dedicated channel and pinned or organized so they are easy to find.
- Avoid long discussions in general channels, start a thread instead.

## Documentation & Reports

- All official reports and submissions are written in **LaTeX via Overleaf**.
- Share the Overleaf project link in a pinned Discord message.

## CI — GitHub Actions

> **TBD**

## Meeting Cadence

> **TBD**

## Definition of Done

> **TBD**

## Conflict Resolution

> **TBD**
