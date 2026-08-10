# Docs and Parallel Worktrees

- status: `completed`
- pull-request branch: `feat/agent-harness-setup`
- task branch: `chore/move-docs-parallel-worktrees`
- worktree: `/Users/jangjeonghoon/git/cafe.routine-docs-parallel`

## Goal

Move repository knowledge and task records from `.agents/` to `docs/` while
keeping discoverable skills in `.agents/skills/`, and allow sibling task
worktrees to run in parallel before merging into one pull-request branch.

## Completed

- Moved repository knowledge and task records to `docs/` and kept only
  discoverable skills under `.agents/`.
- Updated the worktree skill and workflow so independent sibling task worktrees
  can run in parallel and merge serially with merge commits.
- Updated harness checks and package scripts for the new paths.

## Verification

- `pnpm check:harness`
- `git diff --check`
- Temporary-repository simulation of two sibling task branches merged with
  `--no-ff`
