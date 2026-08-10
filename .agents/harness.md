# Agent Harness

## 목표

- 저장소 안의 버전 관리되는 문서를 지식 원본으로 사용한다.
- `AGENTS.md`는 전체 규칙을 복제하지 않고 필요한 문서와 skill로 안내한다.
- 반복되는 절차는 skill, 반드시 막아야 하는 단순 조건은 hook과 CI로 표현한다.
- 실패가 반복되면 prompt를 더 길게 쓰기 전에 빠진 문서, 도구, 검증을 보완한다.

## 구조

- `AGENTS.md`: 100줄 이하의 시작 지도
- `.agents/*.md`: 제품, 설계, 아키텍처, 프레임워크, workflow 지식 원본
- `.agents/skills/`: 필요할 때만 불러오는 반복 작업 절차
- `.agents/tasks/`: 진행 중인 작업의 재개 정보와 완료 후 남길 후속 항목
- `.codex/`: Codex runtime hook과 결정적 guardrail

OpenAI 사례의 `docs/` 이름을 그대로 복제하지 않는다. 현재 저장소에서는
에이전트 운영 문서가 적고 사용자가 `.agents/` 경계를 선호하므로 이 구조가 더
짧다. 문서가 늘어 탐색이나 소유권이 불명확해지면 `docs/`의 주제별 index와
active/completed execution plan 구조로 옮긴다.

## 기계적 검증

`pnpm check:harness`는 다음 불변 조건을 검사한다.

- `AGENTS.md`가 100줄 이하이고 `.agents/` 지식 문서의 local link가 존재한다.
- 각 skill의 폴더명과 frontmatter `name`이 일치하고 `description`이 있다.
- `.codex/hooks.json`이 유효한 JSON이고 branch 보호 hook 자체 검사가 통과한다.

CI에서도 같은 명령을 실행한다. 문서의 내용이 코드와 일치하는지까지 자동으로
증명하지는 못하므로, 동작이나 구조를 바꾸는 작업은 관련 문서를 함께 검토한다.

## 알려진 한계

- project hook은 사용자가 `/hooks`에서 현재 hash를 신뢰해야 실행된다.
- 남은 context 비율을 hook이 제공하지 않으므로 40% 기준 자동 fork는 불가능하다.
- 상위 PR branch 아래 task branch를 `--ff-only`로 모으는 방식은 순차 작업용이다.
  같은 상위 branch에서 여러 task를 병렬로 진행하면 두 번째 병합이 갈라질 수 있다.
- 새 worktree의 의존성은 별도 설치가 필요하다. Turbopack이 저장소 밖
  `node_modules` symlink를 거부하므로 패키지 설치 승인을 받은 뒤 준비한다.
- 앱 UI, 로그, trace의 agent 가시성은 아직 없다. 실제 사용자 흐름이 생기면
  worktree별 dev server와 browser 검증부터 추가한다.
