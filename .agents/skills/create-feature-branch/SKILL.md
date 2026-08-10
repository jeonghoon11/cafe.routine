---
name: create-feature-branch
description: "Create the top-level pull-request branch from local `develop` with an English Conventional Commit-style branch name such as `feat/agent-harness-setup`. Use when the user asks to start a feature, fix, refactor, documentation, or maintenance branch before task worktrees are created."
---

# Create Feature Branch

Create the single branch that collects verified task commits and later opens one pull request to `develop`.

## Workflow

1. Inspect `git branch --show-current`, `git status --short`, and `git worktree list`.
2. Require a clean local `develop` checkout. Do not fetch or pull without permission.
3. Choose `feat/`, `fix/`, `refactor/`, `docs/`, or `chore/` by the primary purpose.
4. Write the summary in lowercase English kebab-case. Git branch names cannot use the commit form `feat: summary`; use `feat/english-summary`.
5. Create the branch with `git switch -c <type>/<english-summary> develop`.
6. Report the branch and keep it as the pull-request integration branch. Perform file changes and commits in task worktrees based on this branch.

Do not commit directly on `main`, `develop`, or this pull-request branch. Do not push, open a pull request, or merge into `develop` without user instruction.
