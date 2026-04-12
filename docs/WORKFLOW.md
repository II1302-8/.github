# Project Workflow

## Version Control

- **Branching model**: Branch-based development off `main`.
- **Branch naming**: `<type>/<issue-number>-short-description`, where type matches the following commit types (`feature/`, `fix/`, `docs/`, `chore/`, `refactor/`).
- **Merge strategy**: Squash merges only. The PR title becomes the squash commit message on `main`, so it **must** follow the Conventional Commits format (enforced by CI). Individual commits on the branch don't need to.
- **Pull requests**: Every PR requires **at least one approval** before merging to `main`. No direct pushes to `main`. The PR author is responsible for merging after approval.
- **PR scope**: Keep PRs small and focused on a single concern.
- **Draft PRs**: Open a draft PR when work is in progress and you want early feedback or visibility. Draft PRs signal that the code is not ready for formal review. Convert to "Ready for review" when the checklist in the PR template is complete.
- **Ready PRs**: Only mark a PR as ready for review when it is complete, tests pass, and the PR title follows Conventional Commits. This is what triggers the formal review process and the 24-hour response expectation.

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

### C (IoT firmware)

- **Naming**: `snake_case` for functions and variables, `UPPER_SNAKE_CASE` for constants and macros
- **Braces**: Opening brace on the same line as the statement
- **Indentation**: 4 spaces
- **Headers**: Use include guards (`#ifndef HEADER_NAME_H` / `#define` / `#endif`)
- **Formatter**: `clang-format`

### Python (backend)

- **Naming**: `snake_case` for functions and variables, `PascalCase` for classes, `UPPER_SNAKE_CASE` for constants
- **Indentation**: 4 spaces
- **Line length**: 88 characters
- **Formatter/Linter**: [Ruff](https://docs.astral.sh/ruff/)

### TypeScript / React (frontend)

- **Naming**: `camelCase` for variables and functions, `PascalCase` for components/types, `UPPER_SNAKE_CASE` for constants
- **Indentation**: 2 spaces
- **Semicolons**: Use them
- **Quotes**: Double quotes
- **Formatter/Linter**: [Biome](https://biomejs.dev/)

### General

- Run the formatter before committing. Pre-commit hooks are set up to run Ruff (backend) and Biome (frontend) automatically.
- Don't mix style changes with functional changes in the same PR.

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

- **PR title validation**: All PRs are checked against the Conventional Commits format using `amannn/action-semantic-pull-request`. Allowed types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.

## Definition of Done

A task is considered done when **all** of the following are met:

- Code compiles/builds without errors or warnings
- Code follows the project's style guide and has been formatted
- All existing tests pass
- New functionality includes appropriate tests
- PR has been reviewed and approved by at least one team member
- PR is squash-merged into `main` with a Conventional Commits title
- Corresponding GitHub Issue is closed and moved to `Done` on the project board
