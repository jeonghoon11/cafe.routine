# Completed: Harness Audit

- status: `completed`
- pull-request branch: `feat/agent-harness-setup`
- task branch: `chore/audit-agent-harness`
- worktree: `/Users/jangjeonghoon/git/cafe.routine-harness-audit`

## Goal

현재 OpenAI 지침과 공개 repository 사례를 기준으로 repository harness를
평가하고, 실제 동작을 개선하는 최소 변경을 적용한다.

## Decisions

- 더 큰 OpenAI repository 구조를 모방하려고 파일을 옮기지 않고 작은
  `.agents/` 지식 경계를 유지한다.
- 상위 feature와 task worktree 전략은 OpenAI 기본값이 아니라 프로젝트 고유의
  순차 workflow로 취급한다.
- 설명이나 자동화를 더 추가하기 전에 기계적 검사를 추가한다.
- 필요하면 ignore된 `.env.local`을 worktree와 공유하되 `node_modules`는
  symlink하지 않는다. Turbopack은 프로젝트 root 밖 의존성을 거부한다.

## Completed

- 문서 link, `AGENTS.md` 크기, skill metadata, hook JSON, hook 자체 검사를 위한
  `pnpm check:harness`와 동일한 CI gate를 추가했다.
- `git -C` target을 포함해 `main`, `develop`, 기본 checkout의 commit을
  차단하도록 hook을 확장했다.
- 순차 merge 제한과 현재 context 및 앱 가시성 한계를 문서화했다.

## Verification

- `pnpm check:harness`
- `git diff --check`
- Hook payload 검사: 기본 checkout 차단, 연결된 task worktree 허용,
  `git -C <primary> commit` 차단
- 의존성이 준비된 기본 checkout에서 변경되지 않은 앱 source를 대상으로
  `pnpm lint --max-warnings 0`, `pnpm typecheck`, `pnpm build`를 통과했다.

## Follow-up

- `/hooks`에서 현재 project hook hash를 신뢰한다.
- task worktree에서 앱 변경을 검증하기 전에 사용자 승인을 받고 의존성을
  설치한다.
- 실제 사용자 flow가 구현되면 worktree별 dev server와 browser 검사를
  추가한다.

이후 진행한 docs-and-parallel-worktrees task가 여기에 기록된 `.agents/` 문서
경계와 순차 fast-forward workflow를 대체했다.
