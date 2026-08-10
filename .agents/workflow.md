# Development Workflow

## 작업 시작

- 파일을 변경하기 전에 현재 branch와 worktree를 확인한다.
- `main`과 `develop`은 통합 전용 branch다. 두 branch에서 파일을 변경하거나
  commit하지 않는다.
- 먼저 `develop`에서 PR 단위의 상위 branch를 만든다. 이 branch가 검증된
  작업 commit을 모으고 `develop`을 대상으로 하나의 PR을 올리는 기준이다.
- 실제 변경은 상위 branch에서 작업 단위별 branch와 git worktree를 만든 뒤
  그 worktree에서 수행한다. 상위 branch에는 직접 commit하지 않는다.
- 모든 branch는 목적에 맞게 `feat/`, `fix/`, `refactor/`, `docs/`, `chore/` 중
  하나와 소문자 영어 kebab-case 요약을 사용한다. 예: `feat/menu-page`.
- commit은 `<type>: <한글 요약>` 형식을 사용한다. 예: `feat: 메뉴 페이지 추가`.
- 이미 올바른 작업 branch의 worktree에 있다면 새 worktree를 중첩 생성하지
  않는다.
- 상위 branch 아래 task worktree는 순차 실행을 기본으로 한다. 같은 상위
  branch에서 병렬 task가 필요하면 `--ff-only` 병합이 보장되지 않으므로 각
  task를 별도 PR branch로 분리한다.

## 변경과 검증

- minimal diff를 우선하고 드라이브바이 리팩터링이나 대규모 포맷팅을 하지
  않는다.
- 파일 이동, 이름 변경, 의존성 추가는 사용자에게 먼저 확인한다.
- 패키지 설치와 외부 네트워크 접근은 사용자에게 먼저 확인한다.
- 변경 영역 중심의 최소 검증을 먼저 실행한다. 기본 검증은 `pnpm typecheck`와
  `pnpm lint`이며, 라우팅·metadata·빌드 설정 변경은 `pnpm build`까지 실행한다.
- `AGENTS.md`, `.agents/`, `.codex/` 변경은 `pnpm check:harness`를 실행한다.
- 실패는 숨기지 않고 핵심 로그와 재현 명령을 보고한다. 무관한 실패는 발견으로
  구분한다.

## Commit, PR, merge

- 검증을 통과한 변경만 `commit-task-changes` skill로 작업 branch에 commit한다.
- 작업이 완료되면 상위 branch checkout에서 작업 branch를 `--ff-only`로
  병합한다. fast-forward가 불가능하면 자동 rebase나 merge commit을 만들지
  않고 중단해 상태를 보고한다.
- 상위 branch를 push하거나 PR을 만들기 전에 사용자 지시를 확인한다.
- 상위 branch에서 `develop`으로 병합할 때는 squash merge를 사용한다.
- `develop`에서 `main`으로 병합할 때는 merge commit을 사용한다.
- 상위 branch를 `develop`에 merge하는 작업은 사용자가 명시적으로 지시한
  경우에만 수행한다.

## Context 연속성

- 화면에서 남은 context가 약 40%에 도달하거나 새 chat으로 넘기기 전에는
  `record-task-context` skill로 `.agents/tasks/<branch-slug>.md`를 갱신한다.
- 현재 hooks는 남은 context 비율 감지와 새 chat 자동 생성을 지원하지 않는다.
  기록 경로와 재개 prompt를 제공하고 사용자가 새 chat을 열도록 안내한다.
- 작업 종료 시 durable decision은 관련 문서에 반영하고 task context를
  `completed`로 갱신한다. 상세 이력은 commit과 PR에 둔다.
