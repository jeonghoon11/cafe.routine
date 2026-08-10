---
name: record-task-context
description: "Record concise repository-backed task context for continuation or future work. Use when the visible context remaining approaches 40%, before compaction or handoff to a new chat, and when a non-trivial task finishes."
---

# Record Task Context

Keep durable knowledge in the repository instead of relying on chat history.

## Record

Create or update `docs/exec-plans/active/<branch-slug>.md` with only:

- status: `active` or `completed`
- goal and acceptance criteria
- branch and worktree path
- completed work and relevant files
- decisions and their reasons
- checks run and results
- remaining work, risks, or follow-ups

Do not copy the transcript or facts already obvious from the diff. Update the relevant product, design, architecture, Next.js, SEO, or workflow document when a decision is durable across tasks.

## Continue in a New Chat

When visible context remaining reaches about 40%, save the record before doing more work and give the user this continuation prompt:

```text
Read AGENTS.md and docs/exec-plans/active/<branch-slug>.md, then continue the task in the recorded worktree.
```

Current Codex hooks do not expose a remaining-context percentage. Do not claim an automatic fork occurred; prepare the handoff, then ask the user to run `/fork` in the CLI or `codex fork --last` from another terminal and paste the continuation prompt.

## Complete

Set the record status to `completed`, keep only durable decisions and useful follow-ups, move it to `docs/exec-plans/completed/`, and commit it with the task. Treat commits and the pull request as the detailed historical record.
