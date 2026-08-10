# Agent Harness

- status: `completed`
- branch: `chore/agent-harness`
- worktree: `/Users/jangjeonghoon/git/cafe.routine-agent-harness`

## Goal

Keep `main` and `develop` clean, isolate change tasks in worktrees, turn
`AGENTS.md` into a concise document map, and preserve task context across chats.

## Completed

- Split product, design, SEO, workflow, architecture, and Next.js guidance.
- Added worktree and task-context skills.
- Updated the commit skill to reject base-branch commits.
- Added a Codex `PreToolUse` hook that blocks `git commit` on `main` and
  `develop`.

## Decisions

- Adopt a project-specific 100-line limit for `AGENTS.md`; official OpenAI Docs
  specifies a 32 KiB default byte limit, not a 100-line rule.
- Record durable knowledge in topic documents and use task context only for
  continuation state and useful follow-ups.
- Use an explicit handoff prompt at about 40% visible context remaining because
  current Codex hooks cannot detect that percentage or open a new chat.

## Verification

- `git diff --check`
- `AGENTS.md` line count: 43
- Skill frontmatter and hook JSON parsed successfully.
- Hook self-test passed and denied a simulated commit from `develop`.

## Follow-up

- Review and trust the repository hook with `/hooks` after this branch is used.
- Push and open a pull request only after user instruction.
- Merge only after explicit user instruction.
