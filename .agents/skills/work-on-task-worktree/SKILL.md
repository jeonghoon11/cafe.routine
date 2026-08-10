---
name: work-on-task-worktree
description: "현재 상위 pull-request branch에서 독립 task branch와 git worktree를 준비해 병렬로 작업하고, 검증된 task를 한국어 merge commit으로 상위 branch에 통합한다. 사용자가 pull-request branch를 선택한 뒤 Codex가 하나 이상의 파일 변경 작업을 시작할 때 사용한다."
---

# Work on Task Worktree

상위 pull-request branch를 눈에 보이는 통합 지점으로 유지한다. 각 작업 단위는 별도 worktree에서 수행하고, 독립 task는 병렬로 진행할 수 있다.

## Workflow

1. `git branch --show-current`, `git status --short`, `git worktree list`를 확인한다.
2. 요청과 일치하는 task worktree에 이미 있다면 그곳에서 계속한다. 중첩 worktree를 만들지 않는다.
3. `main`이나 `develop`이 아닌 깨끗한 상위 branch를 요구한다. 이를 pull-request branch로 취급하고 이름을 기억한다.
4. `feat/`, `fix/`, `refactor/`, `docs/`, `chore/` 중 하나와 짧은 영어 소문자 kebab-case 요약으로 task branch 이름을 정한다.
5. `git worktree add -b <task-branch> <path> <pull-request-branch>`로 형제 worktree를 만들고 모든 수정, 검증, commit을 그곳에서 수행한다.
   여러 task branch는 같은 pull-request branch commit에서 시작할 수 있다. task branch끼리 서로 의존하게 만들지 않는다.
   pull-request checkout에 ignore된 `.env.local`이 있으면 비밀 값을 복사하지 말고 새 worktree에 symlink한다. Next.js Turbopack은 worktree 밖 의존성을 거부하므로 `node_modules`는 symlink하지 않는다. 새 worktree에서 `pnpm install --frozen-lockfile`을 실행하기 전에 사용자에게 묻는다.
6. 검증된 변경을 `commit-task-changes`로 한국어 Conventional Commit 제목과 함께 commit한다.
7. task가 끝나면 task worktree와 pull-request checkout이 모두 깨끗한지 확인한다. pull-request checkout에서 `git merge --no-ff -m "<type>: <한글 작업 요약> 병합" <task-branch>`를 실행한다.
8. 완료된 task branch는 한 번에 하나씩 merge한다. pull-request branch의 merge commit만 직접 commit 금지의 예외로 둔다.
9. merge conflict가 발생하면 중단하고 충돌 파일과 원인을 보고한다. 해결 방법을 추측하거나 task를 자동 rebase하지 않는다.
10. worktree 경로, task branch, task commit, merge commit, 최종 pull-request branch HEAD를 보고한다.

사용자가 명시적으로 요청하지 않으면 worktree 제거, branch 삭제, push, pull request 생성, pull-request branch의 `develop` merge를 하지 않는다.
