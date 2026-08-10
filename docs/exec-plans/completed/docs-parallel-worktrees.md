# Docs and Parallel Worktrees

- status: `completed`
- pull-request branch: `feat/agent-harness-setup`
- task branch: `chore/move-docs-parallel-worktrees`
- worktree: `/Users/jangjeonghoon/git/cafe.routine-docs-parallel`

## Goal

repository 지식과 task 기록을 `.agents/`에서 `docs/`로 옮기되, 자동 발견이
필요한 skill은 `.agents/skills/`에 유지한다. 형제 task worktree는 병렬로
실행하고 하나의 pull-request branch에 병합할 수 있게 한다.

## Completed

- repository 지식과 task 기록을 `docs/`로 옮기고, `.agents/`에는 자동 발견이
  필요한 skill만 남겼다.
- 독립된 형제 task worktree를 병렬로 실행하고 merge commit으로 하나씩 병합할
  수 있도록 worktree skill과 workflow를 수정했다.
- 새 경로에 맞게 harness 검사와 package script를 수정했다.

## Verification

- `pnpm check:harness`
- `git diff --check`
- 임시 repository에서 두 형제 task branch를 `--no-ff`로 병합하는 simulation
