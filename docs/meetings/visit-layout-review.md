# Visit 정보 레이아웃 회의

## 주제

방문 과업에 필요한 주소, 영업시간과 연락처를 더 빨리 확인할 수 있도록 Visit 페이지의 정보 구조와 시각적 위계를 정리

## 참여 직군

PD, FE, PM

## 결정 사항과 근거

- 최종 범위는 `src/app/(site)/visit/page.tsx`와 `page.css.ts` 두 파일로 제한합니다. 현재 문제는 Visit 내부의 section 구조와 간격이므로 데이터 조회나 공용 컴포넌트를 바꿀 필요가 없습니다.
- Home의 `SPACE / 08 INTERIOR` 사진은 Visit으로 옮기지 않습니다. 사진은 주소·영업시간·연락 행동을 돕지 않고, 인물과 혼잡도가 정보보다 먼저 보여 방문 안내를 장식 콘텐츠로 밀어낼 수 있습니다.
- 페이지는 **compact dark intro 다음 하나의 Paper information sheet**로 구성합니다. 검정과 흰색의 브랜드 대비는 유지하면서 분리된 큰 밴드 때문에 정보가 멀어지는 문제를 줄입니다.
- desktop information sheet는 상단 Address 2열, 하단 Hours/Contact `1fr 1fr`로 구성합니다. mobile은 `Address → Hours → Contact` 순서의 1열입니다.
- intro는 desktop에서 약 `44–48svh` 범위를 기준으로 압축하고 mobile은 콘텐츠 높이와 padding으로 구성합니다. 첫 화면의 브랜드 인지는 유지하되 방문 정보 진입을 늦추는 빈 공간은 줄입니다.
- 기존 정보 순서, `h1`/`h2`, `address`, `dl`, 전화와 Instagram의 세로 흐름, 최소 `44px` hit area, `focus-visible`, reduced-motion 동작을 유지합니다.
- 카피는 확인된 사실만 전달하도록 다음과 같이 확정합니다.
  - eyebrow: `ROUTINE / VISIT`
  - `h1`: `Visit.`
  - intro: `루틴의 위치와 영업시간을 확인하세요.`
  - Address: `01 — ADDRESS`, `Find ROUTINE.`
  - Hours: `02 — HOURS`, `Hours.`
  - Contact: `03 — CONTACT`, `Contact.`
  - 위치 CTA: `네이버에서 ROUTINE 보기 ↗`
  - 전화 CTA: `전화하기 ↗`
  - Instagram CTA: `Instagram에서 ROUTINE 소식 보기 ↗`
- 현재 위치 링크는 확인된 네이버 플레이스 `/home`으로 연결되므로 `네이버 지도에서 위치 확인하기`보다 `네이버에서 ROUTINE 보기`가 실제 목적지와 일치합니다. 길찾기 또는 리뷰 직접 URL이 확인되기 전에는 해당 행동을 카피에 약속하지 않습니다.
- Address, Hours와 Contact는 기존 Supabase 조회 결과를 그대로 사용합니다. 미확인 영업 정보, 교통, 주차, 좌표 또는 실시간 상태를 추가하지 않습니다.

## 담당자별 검수 결과

- FE
  - Visit의 기존 세 section을 하나의 Paper information sheet 안에 배치하고 desktop 2단 구조와 mobile 1열 순서를 구현했습니다.
  - 기존 데이터 조회, 영업시간 축약과 `RevealOnView` 동작을 보존하고 Home과 `getSpaceMedia`를 변경하지 않았습니다.
  - typecheck, lint, build와 반응형·접근성 검증을 통과했습니다.
- PD
  - production `1440px`, `390px` 캡처에서 compact intro, Paper sheet, 정보 밀도와 CTA 위계를 최종 승인했으며 blocking 이슈가 없습니다.
- PM
  - 합의한 정보 구조와 카피, 제외 범위가 구현에 반영되고 방문 정보보다 장식 요소가 우선하지 않음을 확인했습니다.

## 완료 기준

- dark intro 다음 Address, Hours와 Contact가 하나의 연속된 Paper information sheet에 표시됩니다.
- desktop은 Address 상단 2열과 Hours/Contact 하단 `1fr 1fr`, mobile은 `Address → Hours → Contact` 1열 순서로 표시됩니다.
- intro는 desktop 약 `44–48svh` 범위로 압축되고 mobile에서 불필요한 고정 높이 없이 information sheet로 자연스럽게 이어집니다.
- `320`, `390`, `799`, `800`, `1280`, `1440`, `1920px`에서 텍스트 잘림, 요소 겹침과 가로 overflow가 없습니다.
- 200% 확대에서도 정보 순서와 CTA를 읽고 사용할 수 있습니다.
- 네이버, 전화와 Instagram 링크의 문구와 실제 목적지가 일치하고 최소 `44px` hit area와 명확한 `focus-visible`을 제공합니다.
- heading 계층, `address`와 영업시간 `dl` 의미 구조, keyboard 사용성과 reduced-motion이 유지됩니다.
- 실제 Supabase 데이터로 주소, 균일·요일별 영업시간, 전화, Instagram의 표시를 확인합니다.
- `pnpm typecheck`, `pnpm lint`, `pnpm build`, `git diff --check`를 통과하고 production 화면에서 console warning과 error가 없습니다.
- Home 사진, Home 데이터 요청 수와 `getSpaceMedia` 동작에 변경이 없습니다.

### 최종 검증 결과

- UI 구현은 commit `76b2e14`로 task/PR branch에 통합됐습니다.
- `pnpm typecheck`, `pnpm lint`, `pnpm build`, `git diff --check`를 통과했습니다.
- Playwright `320`, `799`, `800`, `1280`, `1920px`에서 horizontal overflow `0`이며 모든 Reveal이 visible 상태로 전환됐습니다.
- CTA hit area는 네이버 `52px`, 전화 `63px` 이상, Instagram `44px`로 기준을 충족했습니다.
- reduced-motion `390px`에서 세 Reveal 모두 `opacity: 1`, `transform: none`을 확인했습니다.
- production console warning과 error는 `0`이며 Home과 `getSpaceMedia` 변경은 없습니다.
- PD production 캡처 `1440px`, `390px` 검수를 최종 통과했고 blocking 이슈가 없습니다.

## 미결 질문

- 없음.
