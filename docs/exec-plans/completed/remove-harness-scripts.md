# Remove Agent Harness Scripts

- status: `completed`
- pull-request branch: `feat/agent-harness-setup`
- task branch: `chore/remove-agent-harness-scripts`
- worktree: `/Users/jangjeonghoon/git/cafe.routine-remove-harness-scripts`

## Decision

custom hook이나 harness 검사 script 없이 repository workflow를 `docs/`와
`.agents/skills/`에 유지한다. 같은 실패가 반복되어 유지 비용을 정당화할 때만
기계적 강제를 추가한다.

## Completed

- Python branch 보호 hook과 Codex 설정을 제거했다.
- Python harness 검사기, package script, CI step을 제거했다.
- 수동 검토 방식을 설명하도록 현재 harness와 workflow 문서를 수정했다.

## Verification

- `git diff --check`
- Node.js로 `package.json`을 parsing했다.
- `AGENTS.md`가 100줄 이하인지 확인했다.
- 현재 설정과 지침에 제거한 script link가 남지 않았는지 확인했다.

## Follow-up

직접 commit과 문서 구조는 더 이상 기계적으로 차단하거나 검사하지 않는다.
agent와 reviewer가 repository 문서와 skill을 따라야 한다.
