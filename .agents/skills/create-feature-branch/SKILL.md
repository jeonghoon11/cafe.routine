---
name: create-feature-branch
description: "로컬 `develop`에서 `feat/agent-harness-setup`처럼 영어 Conventional Commit 형식의 상위 pull-request branch를 만든다. 사용자가 기능, 수정, 리팩터링, 문서, 유지보수 작업을 시작해 task worktree를 만들기 전에 사용한다."
---

# Create Feature Branch

검증된 task commit을 모아 나중에 `develop` 대상으로 하나의 pull request를 올릴 상위 branch를 만든다.

## Workflow

1. `git branch --show-current`, `git status --short`, `git worktree list`를 확인한다.
2. 로컬 `develop` checkout이 깨끗한지 확인한다. 허가 없이 fetch나 pull하지 않는다.
3. 주된 목적에 따라 `feat/`, `fix/`, `refactor/`, `docs/`, `chore/` 중 하나를 고른다.
4. 요약은 영어 소문자 kebab-case로 작성한다. branch 이름에는 `feat: summary` 같은 commit 형식을 쓸 수 없으므로 `feat/english-summary`를 사용한다.
5. `git switch -c <type>/<english-summary> develop`으로 branch를 만든다.
6. 생성한 branch를 보고하고 pull-request 통합 branch로 유지한다. 파일 변경과 commit은 이 branch에서 분기한 task worktree에서 수행한다.

`main`, `develop`, 상위 pull-request branch에 직접 commit하지 않는다. 사용자 지시 없이 push, pull request 생성, `develop` merge를 하지 않는다.
