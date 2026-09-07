---
name: record-task-context
description: "작업을 이어가거나 나중에 참고할 수 있도록 repository에 간결한 task context를 기록한다. 남은 화면 context가 약 40%에 가까워질 때, compaction이나 새 chat handoff 전, 중요 task를 마쳤을 때 사용한다."
---

# Record Task Context

chat history에 의존하지 않고 지속해야 할 지식을 repository에 남긴다.

## Record

`docs/exec-plans/active/<branch-slug>.md`를 만들거나 갱신하되 다음 내용만 기록한다.

- status: `active` 또는 `completed`
- goal과 acceptance criteria
- branch와 worktree 경로
- 완료한 작업과 관련 파일
- decision과 이유
- 실행한 검증과 결과
- 남은 작업, risk, follow-up

대화 전문이나 diff만 봐도 알 수 있는 사실은 복사하지 않는다. 여러 task에서 지속할 decision은 관련 product, design, architecture, Next.js, SEO, workflow 문서에 반영한다.

## Continue in a New Chat

화면에 보이는 남은 context가 약 40%가 되면 추가 작업 전에 기록을 저장하고 사용자에게 다음 재개 prompt를 제공한다.

```text
AGENTS.md와 docs/exec-plans/active/<branch-slug>.md를 읽고 기록된 worktree에서 task를 계속해줘.
```

현재 Codex hook은 남은 context 비율을 제공하지 않는다. 자동 fork가 실행됐다고 말하지 않는다. handoff를 준비한 뒤 사용자에게 CLI에서 `/fork`를 실행하거나 다른 terminal에서 `codex fork --last`를 실행하고 재개 prompt를 붙여 넣도록 안내한다.

## Complete

기록 status를 `completed`로 바꾸고 지속할 decision과 유용한 follow-up만 남긴다. 파일을 `docs/exec-plans/completed/`로 옮겨 task와 함께 commit한다. 상세 이력은 commit과 pull request를 기준으로 삼는다.
