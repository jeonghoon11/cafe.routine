---
name: work-on-task-worktree
description: "Prepare independent task branches and git worktrees from the current top-level pull-request branch so tasks can run in parallel, then merge each verified task back with a Korean merge commit. Use whenever Codex starts one or more file-changing tasks after the user has selected a pull-request branch."
---

# Work on Task Worktree

Keep the top-level pull-request branch as the visible integration point. Perform each coherent task in its own worktree; independent tasks may run in parallel.

## Workflow

1. Inspect `git branch --show-current`, `git status --short`, and `git worktree list`.
2. If already in a task worktree that matches the request, continue there. Do not create a nested worktree.
3. Require a clean top-level branch other than `main` or `develop`. Treat it as the pull-request branch and remember its name.
4. Choose a short lowercase English kebab-case task branch with `feat/`, `fix/`, `refactor/`, `docs/`, or `chore/`.
5. Create a sibling worktree with `git worktree add -b <task-branch> <path> <pull-request-branch>` and run all edits, checks, and commits there.
   Multiple task branches may start from the same pull-request branch commit. Do not make one task branch depend on another.
   If the pull-request checkout has an ignored `.env.local`, symlink it into the new worktree instead of copying secrets. Do not symlink `node_modules`; Next.js Turbopack rejects dependencies outside the worktree root. Ask before running `pnpm install --frozen-lockfile` in a new worktree.
6. Commit verified changes with Korean Conventional Commit titles through `commit-task-changes`.
7. When a task is complete, confirm its worktree and the pull-request checkout are clean. From the pull-request checkout, run `git merge --no-ff -m "<type>: <한글 작업 요약> 병합" <task-branch>`.
8. Merge completed task branches one at a time. A merge commit on the pull-request branch is the only exception to the direct-commit prohibition.
9. If a merge conflicts, stop and report the conflicting files and cause. Do not guess at a resolution or rebase the task automatically.
10. Report the worktree path, task branch, task commit, merge commit, and resulting pull-request branch head.

Do not remove the worktree, delete a branch, push, open a pull request, or merge the pull-request branch into `develop` unless the user explicitly requests that action.
