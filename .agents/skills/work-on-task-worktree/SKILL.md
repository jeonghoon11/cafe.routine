---
name: work-on-task-worktree
description: "Prepare an isolated task branch and git worktree from the current top-level pull-request branch, then merge verified task commits back into that branch. Use whenever Codex starts a file-changing task after the user has created or selected a feature, fix, refactor, docs, or chore branch."
---

# Work on Task Worktree

Keep the top-level pull-request branch as the visible integration point. Perform one coherent task in one dedicated worktree.

## Workflow

1. Inspect `git branch --show-current`, `git status --short`, and `git worktree list`.
2. If already in a task worktree that matches the request, continue there. Do not create a nested worktree.
3. Require a clean top-level branch other than `main` or `develop`. Treat it as the pull-request branch and remember its name.
4. Choose a short lowercase English kebab-case task branch with `feat/`, `fix/`, `refactor/`, `docs/`, or `chore/`.
5. Create a sibling worktree with `git worktree add -b <task-branch> <path> <pull-request-branch>` and run all edits, checks, and commits there.
6. Commit verified changes with Korean Conventional Commit titles through `commit-task-changes`.
7. When the task is complete, confirm both checkouts are clean and run `git merge --ff-only <task-branch>` from the pull-request branch checkout.
8. If fast-forward merge is impossible, stop and report the divergence instead of rebasing or creating a merge commit automatically.
9. Report the worktree path, task branch, commit, and resulting pull-request branch head.

Do not remove the worktree, delete a branch, push, open a pull request, or merge the pull-request branch into `develop` unless the user explicitly requests that action.
