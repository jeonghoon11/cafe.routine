# Visit Contact 레이아웃 검수 회의

## 주제

Visit 페이지의 기존 정보 구조를 유지하면서 Contact의 세로 흐름, 긴 Instagram 카피와 반응형 overflow를 최소 변경으로 수정하고 검수

## 참여 직군

FE, PD, PM

## 결정 사항과 근거

- 최종 결과는 **PASS**로 결정합니다.
- Contact의 문제는 전체 레이아웃 비율보다 grid item의 min-content 제약과 링크 형제 요소의 배치에서 발생했으므로 해당 원인만 수정했습니다.
- 기존 `7fr 5fr` 비율, `10vw` gap과 `799/800px` breakpoint는 지정 viewport 실측을 통과해 유지합니다.
- Intro, Reveal DOM과 지도 영역은 현재 문제 해결에 필요하지 않아 변경하지 않습니다.
- PD의 최초 `inline-flex` 우려는 부모 detail이 column flex이므로 각 링크가 별도 flex item 행으로 배치되는 실제 렌더링과 일치하지 않았습니다. 재검토에서 독립 행과 같은 왼쪽 축이 확인되어 승인했습니다.

## 실제 변경

- Details track을 `minmax(0, 7fr) minmax(0, 5fr)`, 모바일을 `minmax(0, 1fr)`로 바꿔 grid item이 viewport 안에서 축소되게 했습니다.
- detail을 column flex와 `align-items: flex-start`로 구성해 `전화번호 → 전화하기 → Instagram`을 명시적인 세로 흐름으로 배치했습니다.
- Instagram 링크에 `max-width: 100%`, `flex-wrap`, `overflow-wrap`을 적용했습니다.
- 카피를 `Instagram에서 ROUTINE 소식 보기 ↗`로 변경하고 전체 문구를 단일 wrapper에 묶어 공백을 보존했습니다.
- 장식 화살표는 스크린 리더가 중복해 읽지 않도록 `aria-hidden`으로 처리했습니다.

## 담당자별 검수 결과

- FE: 지정 viewport에서 가로 overflow, 행 분리, 왼쪽 축과 hit area를 확인했고 typecheck와 lint를 통과해 승인했습니다.
- PD: 모바일·데스크톱 캡처에서 세로 흐름, `36px` 간격, 카피, 콘텐츠 너비 밑줄과 브랜드 위계를 재검토해 승인했습니다.
- PM: 구현이 합의한 Contact 범위에 한정되고 기존 정보 구조와 주요 방문 동선을 바꾸지 않았음을 확인해 승인했습니다.

## 완료 기준 및 검증 결과

- `320`, `390`, `799`, `800`, `1280`, `1440`, `1920px`에서 horizontal overflow `0`을 확인했습니다.
- 모든 검증 너비에서 전화와 Instagram은 별도 행이며 같은 왼쪽 축에 배치됐습니다.
- 전화 링크의 hit area는 `62px` 이상, Instagram은 `44px`로 최소 `44px` 기준을 충족했습니다.
- 모바일·데스크톱에서 `36px` 간격, 전체 카피, 링크 콘텐츠 너비 밑줄과 기존 시각 위계를 확인했습니다.
- programmatic focus에서 `solid 2px` focus 표시를 확인했습니다.
- `pnpm start -p 4313` production 서버의 `/visit`에서 스크롤했을 때 `RevealOnView` 3개가 모두 `data-reveal="visible"`로 전환됐고 horizontal overflow `0`, console error와 warning `0`을 확인했습니다.
- reduced-motion emulation에서 `matchMedia`가 `true`이고 reveal의 pending/visible 상태와 무관하게 모두 `opacity: 1`, `transform: none`인 것을 확인했습니다.
- `pnpm typecheck`, `pnpm lint`, `pnpm build`, `git diff --check`를 통과했습니다.

## 제외 범위와 알려진 무관 이슈

- 지도, Details의 `7fr 5fr` 비율과 `10vw` gap, `799/800px` breakpoint, Intro와 Reveal DOM은 변경하지 않았습니다.
- Playwright dev 자동화 세션에서만 `RevealOnView`가 pending에 머물고 HMR WebSocket handshake 오류가 반복됐습니다. production 서버에서는 reveal 전환, overflow와 console 검증을 모두 통과해 이번 작업의 blocking 이슈로 보지 않습니다.
