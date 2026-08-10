---
name: work-on-task-worktree
description: "Prepare and use an isolated git worktree and task branch before modifying this repository. Use whenever Codex starts a file-changing task from `main` or `develop`, or when the user asks to separate work by worktree or task branch."
---

# Work on Task Worktree

Keep `main` and `develop` as clean integration branches. Perform one coherent task in one dedicated worktree.

## Workflow

1. Inspect `git branch --show-current`, `git status --short`, and `git worktree list`.
2. If already in a worktree on a task branch that matches the request, continue there. Do not create a nested worktree.
3. If `main` or `develop` has local changes, do not move or copy them automatically. Ask the user how to handle them.
4. Choose a short branch name with `feat/`, `fix/`, `refactor/`, `docs/`, or `chore/` according to the task.
5. Base new work on local `develop`. Fetch or pull only after the user permits network access.
6. Create a sibling worktree with `git worktree add -b <branch> <path> develop` and run all edits, checks, and commits from that path.
7. Report the worktree path and branch.

Do not merge, remove the worktree, delete the branch, push, or open a pull request unless the user explicitly requests that action.
