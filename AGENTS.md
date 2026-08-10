# Cafe Routine 에이전트 지도

이 파일은 저장소 지침의 목차다. 작업 시작 시
[`.agents/workflow.md`](.agents/workflow.md)를 항상 읽고, 작업 범위에 해당하는
문서와 skill만 추가로 읽는다.

## 문서 지도

- [`.agents/workflow.md`](.agents/workflow.md): worktree, 브랜치, 검증, 커밋,
  PR, merge 규칙. 모든 작업에 적용한다.
- [`.agents/product.md`](.agents/product.md): 매장 정보, 공식 URL, 원본 디자인
  자료. 콘텐츠나 자산을 다룰 때 읽는다.
- [`.agents/design.md`](.agents/design.md): Black & White 브랜드 방향, SEED,
  반응형 UI와 접근성. UI 작업 전에 읽는다.
- [`.agents/architecture.md`](.agents/architecture.md): 파일 배치, route group,
  공용화 기준. 구조를 변경하기 전에 읽고 변경 시 함께 갱신한다.
- [`.agents/nextjs.md`](.agents/nextjs.md): Next.js App Router, Supabase,
  data fetching, cache, metadata, PWA. 관련 동작 변경 시 함께 갱신한다.
- [`.agents/seo.md`](.agents/seo.md): SEO, 구조화 데이터, 로컬 SEO,
  Core Web Vitals 검증. 공개 페이지 작업 전에 읽는다.

## Skill 지도

- [`create-feature-branch`](.agents/skills/create-feature-branch/SKILL.md):
  `develop`에서 영어 이름의 PR 단위 상위 branch를 만든다.
- [`work-on-task-worktree`](.agents/skills/work-on-task-worktree/SKILL.md): 변경
  작업용 worktree와 branch를 준비하고 검증 후 상위 branch로 병합한다.
- [`commit-task-changes`](.agents/skills/commit-task-changes/SKILL.md): 검증이
  끝난 변경을 작업 단위별 Conventional Commit으로 커밋한다.
- [`record-task-context`](.agents/skills/record-task-context/SKILL.md): context가
  약 40% 남거나 handoff·작업 종료 시 `.agents/tasks/`에 상태를 기록한다.
- [`toss-frontend-fundamentals`](.agents/skills/toss-frontend-fundamentals/SKILL.md):
  프론트엔드 코드 작성, 리팩터링, 리뷰에 적용한다.

## Hook 지도

- [`.codex/hooks.json`](.codex/hooks.json): Codex가 `main` 또는 `develop`에서
  `git commit`을 실행하지 못하도록 차단한다. 변경 후 `/hooks`에서 다시
  검토하고 신뢰해야 한다.

## 공통 원칙

- 필요한 기능만 구현하고 minimal diff를 우선한다.
- 확인되지 않은 매장 정보, 메뉴, 가격, 좌표, 평점, 리뷰를 만들지 않는다.
- 지침이 바뀌면 원문 문서와 이 지도의 설명을 함께 갱신한다.
