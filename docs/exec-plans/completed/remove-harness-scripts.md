# Remove Agent Harness Scripts

- status: `completed`
- pull-request branch: `feat/agent-harness-setup`
- task branch: `chore/remove-agent-harness-scripts`
- worktree: `/Users/jangjeonghoon/git/cafe.routine-remove-harness-scripts`

## Decision

Keep the repository workflow in `docs/` and `.agents/skills/` without custom
hook or harness-check scripts. Add mechanical enforcement only if the same
failure repeats and justifies maintaining it.

## Completed

- Removed the Python branch-protection hook and its Codex configuration.
- Removed the Python harness checker, package script, and CI step.
- Updated current harness and workflow documents to describe manual review.

## Verification

- `git diff --check`
- Parsed `package.json` with Node.js
- Confirmed `AGENTS.md` remains under 100 lines
- Confirmed current configuration and guidance contain no removed-script links

## Follow-up

Direct commits and documentation structure are no longer mechanically blocked
or checked; agents and reviewers must follow the repository documents and
skills.
