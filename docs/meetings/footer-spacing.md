# 공용 Footer 여백 회의

## 주제

공용 Footer의 강제 높이(`34svh`/`40svh`)로 인해 발생하는 과도한 빈 공간 문제를 해결하고, Home·Menu·Visit 전체 페이지에서 자연스럽게 어우러지는 콘텐츠 기반 높이와 여백을 확정

## 참여 직군

PD, FE, PM

## 결정 사항과 근거

- **강제 높이 제거**: 데스크톱 `minHeight: '34svh'`와 모바일 `minHeight: '40svh'`를 제거하고, Footer 높이를 콘텐츠와 패딩에 의해 결정되는 자연스러운 높이로 변경합니다. Visit 페이지의 정보 시트 압축 이후 두드러진 하단 여백 불균형을 해소합니다.
- **패딩 수치 확정**:
  - 데스크톱: `padding: '64px 4vw'`로 설정하여 뷰포트 높이(`8vh`)에 따른 가변적 왜곡을 없애고, 큰 워드마크 타이틀과 슬로건 사이에 안정적인 상하 여백을 제공합니다.
  - 모바일: `padding: '48px 20px'`로 설정하여 좁은 화면에서 과도한 수직 공간 낭비를 방지하고, 불필요해진 `justifyContent: 'flex-end'`를 제거합니다.
- **수정 범위 최소화**: 공용 Footer 마크업(`layout.tsx`)이나 다른 페이지를 건드리지 않고, `src/app/(site)/site-shell.css.ts` 단일 파일의 footer 스타일만 최소 수정합니다.

## 담당자별 후속 작업

- FE: `site-shell.css.ts`에서 footer의 `minHeight` 제거 및 확정 패딩 적용, `typecheck`, `lint`, `build` 검증 수행.
- PD: 데스크톱 및 모바일 뷰포트에서 Footer 워드마크·슬로건 정렬 및 각 페이지(Home, Menu, Visit) 하단 여백의 시각적 안정성 검수.
- PM: Home, Menu, Visit 전반의 접근성, 가로 스크롤(overflow 0) 및 브랜드 인지성 충족 여부 확인.

## 완료 기준

- 데스크톱과 모바일 모두에서 Footer의 불필요한 고정 높이(`34svh`, `40svh`)가 제거되고 콘텐츠 높이에 맞게 렌더링됩니다.
- 데스크톱 `64px 4vw`, 모바일 `48px 20px` 패딩이 정확히 적용됩니다.
- `320px`부터 `1920px`까지 전 뷰포트에서 horizontal overflow가 발생하지 않습니다.
- Home, Menu, Visit의 기존 콘텐츠 및 링크 상호작용에 부작용이 없습니다.
- `pnpm typecheck`, `pnpm lint`, `pnpm build`를 통과합니다.

## 미결 질문

- 없음.
