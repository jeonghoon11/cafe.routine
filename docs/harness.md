# Agent Harness Guide

## 목표

- 저장소 안의 버전 관리되는 문서를 지식 원본으로 사용한다.
- `AGENTS.md`는 전체 규칙을 복제하지 않고 필요한 문서와 skill로 안내한다.
- 반복되는 절차는 skill로 표현한다.
- 실패가 반복되면 prompt를 더 길게 쓰기 전에 빠진 문서, 도구, 검증을 보완한다.

## 구조

- `AGENTS.md`: 100줄 이하의 시작 지도
- `docs/*.md`: 제품, 설계, 아키텍처, 프레임워크, workflow 지식 원본
- `docs/exec-plans/active|completed/`: 작업 재개 정보와 완료 기록
- `.agents/skills/`: 필요할 때만 불러오는 반복 작업 절차

프로젝트 지식은 사람이 함께 읽고 검토할 수 있도록 `docs/`를 원본으로 사용한다.
`.agents/`에는 Codex가 자동 발견해야 하는 repository skill만 둔다.

## 운영 원칙

- `AGENTS.md`는 문서 지도로만 유지하고 100줄을 넘기지 않는다.
- 문서나 skill을 변경할 때 local link와 frontmatter를 함께 검토한다.
- 브랜치와 worktree 규칙은 `docs/workflow.md`와 repository skill을 따른다.
- 같은 실패가 반복될 때만 hook이나 CI 검사를 추가한다.

## 알려진 한계

- Codex runtime이 남은 context 비율을 제공하지 않으므로 40% 기준 자동 fork는
  불가능하다.
- 병렬 task는 독립적으로 진행되지만 상위 branch 병합은 한 번에 하나씩 수행한다.
  같은 파일을 수정한 task끼리는 conflict가 발생할 수 있다.
- 새 worktree의 의존성은 별도 설치가 필요하다. Turbopack이 저장소 밖
  `node_modules` symlink를 거부하므로 패키지 설치 승인을 받은 뒤 준비한다.
- 앱 UI, 로그, trace의 agent 가시성은 아직 없다. 실제 사용자 흐름이 생기면
  worktree별 dev server와 browser 검증부터 추가한다.
