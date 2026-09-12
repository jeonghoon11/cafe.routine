# 홈 상단 이동 버튼

- status: `completed`
- goal: 긴 홈에서 Hero 이후 상단으로 쉽게 복귀할 수 있게 합니다.
- acceptance criteria: Home 전용, Hero 이탈 후 노출, 키보드·focus·모션 축소·safe area 지원, 모바일·데스크톱 콘텐츠 비가림
- pull-request branch: `feat/home-scroll-to-top`
- task branch/worktree: `feat/implement-home-scroll-to-top`, `/private/tmp/cafe-routine-home-scroll-to-top`
- completed: SEED `ContextualFloatingButton`의 `layer`, `iconOnly` 조합으로 구현하고 PD·FE·PM 교차검증을 완료했습니다.
- decision: 상단 이동은 주요 CTA가 아닌 조건부 보조 탐색이므로 brand FAB나 커스텀 UI 대신 중립적인 SEED 컴포넌트를 재사용합니다.
- verification: `pnpm typecheck`, `pnpm lint`, diff 검사 통과. Playwright로 320px·390px·1440px, 마우스·키보드, focus 이관, reduced-motion, Menu·Visit 미노출을 확인했습니다. 위치 변경 후 390px·1440px에서 화면 오른쪽·아래 20px 간격을 실측했습니다.
- follow-up: 없음. 브라우저의 기존 `/favicon.ico` 404는 이번 범위 밖입니다.
