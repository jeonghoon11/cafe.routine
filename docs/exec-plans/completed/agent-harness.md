# Completed: Agent Harness

- status: `completed`
- pull-request branch: `feat/agent-harness-setup`
- task branch: `chore/update-branch-workflow`
- worktree: `/Users/jangjeonghoon/git/cafe.routine-branch-workflow`

## Goal

`main`과 `develop`을 깨끗하게 유지하고, 변경 작업을 worktree로 격리하며,
`AGENTS.md`를 간결한 문서 지도로 만들고, chat 사이에 task context를 보존한다.

## Completed

- 제품, 디자인, SEO, workflow, architecture, Next.js 지침을 분리했다.
- worktree와 task-context skill을 추가했다.
- base branch commit을 거부하도록 commit skill을 수정했다.
- `main`과 `develop`에서 `git commit`을 차단하는 Codex `PreToolUse` hook을
  추가했다.
- `develop`에서 영어 이름의 pull-request branch를 만드는 skill을 추가했다.
- task worktree가 pull-request branch에서 분기하고 검증된 commit을 다시
  fast-forward하도록 변경했다.

## Decisions

- `AGENTS.md`에는 프로젝트 고유의 100줄 제한을 적용한다. OpenAI 공식 문서는
  100줄 규칙이 아니라 기본 32 KiB 크기 제한을 명시한다.
- 오래 유지할 지식은 주제별 문서에 기록하고, task context는 작업 재개 상태와
  유용한 후속 작업에만 사용한다.
- 현재 Codex hook은 남은 context 비율을 감지하거나 새 chat을 열 수 없으므로,
  화면 context가 약 40% 남았을 때 명시적인 handoff prompt를 사용한다.
- branch 이름은 영어 소문자 kebab-case, Conventional Commit 요약은 한국어를
  사용한다.

## Verification

- `git diff --check`
- `AGENTS.md` 줄 수: 45
- Skill frontmatter와 hook JSON parsing에 성공했다.
- Hook 자체 검사를 통과했고 `develop`의 모의 commit을 차단했다.

## Follow-up

- 이 branch를 사용한 뒤 `/hooks`에서 repository hook을 검토하고 신뢰한다.
- 사용자 지시가 있을 때만 push하고 pull request를 생성한다.
- 사용자가 명시적으로 지시할 때만 pull-request branch를 `develop`에 merge한다.
