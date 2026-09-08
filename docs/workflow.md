# Repository Workflow

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
- 여러 task branch는 같은 상위 branch commit에서 각각 worktree를 만들어
  병렬로 진행할 수 있다. 각 task는 다른 task branch를 직접 참조하지 않는다.

## 변경과 검증

- minimal diff를 우선하고 드라이브바이 리팩터링이나 대규모 포맷팅을 하지
  않는다.
- 파일 이동, 이름 변경, 의존성 추가는 사용자에게 먼저 확인한다.
- 패키지 설치와 외부 네트워크 접근은 사용자에게 먼저 확인한다.
- 변경 영역 중심의 최소 검증을 먼저 실행한다. 기본 검증은 `pnpm typecheck`와
  `pnpm lint`이며, 라우팅·metadata·빌드 설정 변경은 `pnpm build`까지 실행한다.
- 실패는 숨기지 않고 핵심 로그와 재현 명령을 보고한다. 무관한 실패는 발견으로
  구분한다.

## Commit, PR, merge

- 검증을 통과한 변경만 `commit-task-changes` skill로 작업 branch에 commit한다.
- 작업이 완료되면 task branch를 최신 상위 branch에 rebase하고, 상위 branch
  checkout에서 `git merge --ff-only <task-branch>`로 하나씩 통합한다.
- 병렬 task 사이에 conflict가 발생하면 rebase를 중단하고 원상 복구한 뒤 충돌
  파일과 원인을 보고한다. 해결 방법을 자동으로 추측하지 않는다.
- 상위 branch를 push하거나 PR을 만들기 전에 사용자 지시를 확인한다.
- 상위 branch에서 `develop`으로 병합할 때는 squash merge를 사용한다.
- `develop`에서 `main`으로 병합할 때는 merge commit을 사용한다.
- 상위 branch를 `develop`에 merge하는 작업은 사용자가 명시적으로 지시한
  경우에만 수행한다.
- `develop`에서 `main`으로 병합하는 PR(release PR) 본문은 중복 상세 서술을 지양하고, 포함된 작업들을 PR 단위로 묶어 해당 PR 링크와 하위 커밋 번호(short hash) 및 작업 요약 목록으로 구조화하여 작성한다:
  ```markdown
  ## 📋 포함된 작업 (PR 단위)

  ### [#{pr-number} {pr-title}]({pr-url})
  - `{commit-hash}`: {작업 요약}
  - `{commit-hash}`: {작업 요약}
  ```

## Context 연속성

- 화면에서 남은 context가 약 40%에 도달하거나 새 chat으로 넘기기 전에는
  `record-task-context` skill로 `docs/exec-plans/active/<branch-slug>.md`를
  갱신한다.
- 현재 hooks는 남은 context 비율 감지와 새 chat 자동 생성을 지원하지 않는다.
  기록 경로와 재개 prompt를 제공하고 사용자가 새 chat을 열도록 안내한다.
- 작업 종료 시 durable decision은 관련 문서에 반영하고 task context를
  `docs/exec-plans/completed/`로 옮긴다. 상세 이력은 commit과 PR에 둔다.
