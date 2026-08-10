# Harness Audit

- status: `completed`
- pull-request branch: `feat/agent-harness-setup`
- task branch: `chore/audit-agent-harness`
- worktree: `/Users/jangjeonghoon/git/cafe.routine-harness-audit`

## Goal

Evaluate the repository harness against current OpenAI guidance and public
repository practice, then make the smallest changes that improve real behavior.

## Decisions

- Keep the small `.agents/` knowledge boundary instead of moving files only to
  imitate the larger OpenAI repository layout.
- Treat the parent-feature/task-worktree strategy as a project-specific,
  sequential workflow rather than an OpenAI default.
- Add mechanical checks before adding more prose or automation.
- Share ignored `.env.local` with a worktree when needed, but never symlink
  `node_modules`; Turbopack rejects dependencies outside the project root.

## Completed

- Added `pnpm check:harness` and the same CI gate for document links, the
  `AGENTS.md` size, skill metadata, hook JSON, and hook self-tests.
- Extended the hook to block commits from the primary checkout as well as
  `main` and `develop`, including `git -C` targets.
- Documented the sequential merge limitation and current context/app visibility
  limits.

## Verification

- `pnpm check:harness`
- `git diff --check`
- Hook payload checks: primary checkout denied, linked task worktree allowed,
  `git -C <primary> commit` denied
- `pnpm lint --max-warnings 0`, `pnpm typecheck`, and `pnpm build` passed against
  the unchanged application source in the dependency-ready primary checkout.

## Follow-up

- Trust the current project hook hash through `/hooks`.
- Install dependencies inside a task worktree with user approval before
  validating application changes there.
- Add worktree-specific dev server and browser checks when real user flows are
  implemented.
