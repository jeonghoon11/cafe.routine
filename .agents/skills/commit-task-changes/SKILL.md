---
name: commit-task-changes
description: "완료된 repository 변경을 검토하고 `feat: ...` 같은 한국어 Conventional Commit 제목으로 응집된 작업 단위별 commit을 만든다. Codex가 파일 수정을 끝냈거나 사용자가 commit 생성, 분리, 작업 단위 정리를 요청할 때 사용한다."
---

# Commit Task Changes

완료한 task에서 만든 변경만 commit하고 관련 없는 사용자 변경은 보존한다.

## Workflow

1. `git status --short`를 실행하고 관련 diff를 확인한다.
2. 현재 branch가 `main`, `develop`, 상위 pull-request branch라면 중단한다. 구현 commit은 전용 task worktree에서만 만들고 통합 merge commit은 `work-on-task-worktree`에서 만든다.
3. task가 완료되고 필요한 검증을 통과했는지 확인한다. 실패한 검증을 숨기기 위해 commit하지 않는다.
4. 변경 이유가 서로 독립적일 때만 commit을 나눈다. 구현, test, 직접 관련된 문서는 함께 둔다.
5. `git add -- <paths>`로 명시적인 경로만 stage한다. 관련 없는 변경이 있을 때 `git add .`이나 `git add -A`를 사용하지 않는다.
6. commit 전에 `git diff --cached --stat`과 `git diff --cached`를 검토한다.
7. 각 단위를 `<type>: <한글 요약>` 형식으로 commit한다. branch 이름은 영어, commit 요약은 한국어로 유지한다.
8. `git status --short`를 실행하고 commit hash, 제목, 검증 결과, 의도적으로 commit하지 않은 파일을 보고한다.

## Commit Types

- `feat`: 사용자에게 보이는 기능 추가
- `fix`: 버그 수정
- `refactor`: 동작을 바꾸지 않는 구조 개선
- `docs`: 문서만 변경
- `test`: 테스트만 변경
- `chore`: 유지보수와 저장소 설정
- `build`: 빌드 시스템이나 의존성 변경
- `ci`: CI 변경
- `perf`: 성능 개선
- `style`: 동작과 무관한 서식 변경

변경의 주된 이유를 나타내는 type을 사용한다. 제목은 간결하게 쓰고 마침표를 붙이지 않는다. 명확성이 실제로 좋아질 때만 scope를 추가한다.

## Safety

- 사용자가 명시적으로 요청하지 않으면 amend, rebase, reset, force-push하지 않는다.
- 비밀 값, `.env*`, 생성된 인증 정보, 관련 없는 사용자 작업을 포함하지 않는다.
- 빈 commit을 만들지 않는다.
- task 변경을 기존 수정과 안전하게 분리할 수 없으면 중단하고 포함할 파일이나 hunk를 사용자에게 묻는다.
