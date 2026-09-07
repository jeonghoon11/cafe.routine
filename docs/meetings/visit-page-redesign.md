# Visit 페이지 재설계 회의

## 주제

방문 전 핵심 정보와 행동 순서가 분명한 Visit 페이지로 재구성

## 참여 직군

FE, PD, PM

## 사용자 문제

- 기존 Address, Hours, Contact의 균등 3열은 방문 결정 정보의 우선순위를 구분하지 못합니다.
- 주소와 지도 행동의 시각적 연결이 약해 다음 행동을 바로 찾기 어렵습니다.
- 모바일에서 같은 Hours가 요일별로 반복되어 전화와 Instagram이 아래로 밀립니다.
- 전화번호에 행동명이 없어 전화 링크임을 즉시 알기 어렵습니다.

## 결정 사항과 근거

- 검정 intro 다음에 흰색 Address primary 영역, 검정 Hours/Contact 영역을 배치합니다. 위치 확인을 첫 행동으로 강조하고 보조 정보를 단계적으로 제공합니다.
- 정보와 행동 순서는 `주소 → 영업시간 → 지도 → 전화 → Instagram`으로 정합니다.
- intro는 경험을 약속하는 감성 문구 대신 위치와 영업시간 확인을 안내하는 사실형 문구로 구성합니다.
- 네이버 지도 링크는 primary CTA, 전화는 행동명이 있는 secondary CTA, Instagram은 tertiary link로 표시합니다.
- DB의 7일 영업시간 label이 모두 같을 때만 `매일`로 축약합니다. 하나라도 다르면 요일별 `dl`로 표시해 예외 정보를 숨기지 않습니다.
- 요일과 시간 표기는 `Intl`의 `ko-KR`, `Asia/Seoul`을 사용해 사용자 환경에 따른 표기 차이를 막습니다.
- Address, Hours, Contact의 세 영역은 각각 `RevealOnView`로 한 번만 나타나며, reduced-motion에서는 즉시 표시합니다.

## 역할별 작업

- FE
  - 합의한 색상 전환, 정보 구조와 반응형 1열·2열 레이아웃을 구현했습니다.
  - 영업시간 축약 조건과 요일별 `dl`, CTA 순서와 one-shot reveal을 구현했습니다.
  - 링크 hit area, focus-visible, reduced-motion과 breakpoint를 검증했습니다.
- PD
  - Address primary와 Hours/Contact의 시각 위계, 흑백 section 전환과 모바일 정보 흐름을 검수했습니다.
  - 최종 승인했으며 blocking 수정은 없습니다.
- PM
  - 주소, 영업시간과 연락 행동이 공식 데이터만 사용하고 합의한 순서로 제공되는지 확인했습니다.
  - 미확인 위치·이동·실시간 정보와 과장된 카피가 포함되지 않았는지 검토했습니다.

## 완료 기준

- 주소, 영업시간, 지도, 전화, Instagram이 합의한 정보·행동 순서와 시각 위계로 표시됩니다.
- 7일 영업시간 label이 같을 때만 `매일`로 축약되고, 다르면 요일별 `dl`이 표시됩니다.
- 날짜·시간은 `ko-KR`, `Asia/Seoul` 기준으로 표시됩니다.
- 지도, 전화와 Instagram 링크가 keyboard와 pointer로 동작하고 명확한 행동명과 focus-visible을 제공합니다.
- Address, Hours, Contact는 각각 한 번만 reveal되고 reduced-motion에서는 즉시 표시됩니다.
- 데스크톱과 모바일에서 정보 누락, 텍스트 잘림과 가로 overflow가 없습니다.

## 구현·검증 결과

- `typecheck`, `lint`, diff check를 통과했고 Visit route가 HTTP 200으로 응답했습니다.
- `1440px`, `390px`에서 가로 overflow는 `0`이었습니다.
- `768px`은 1열, `800px`은 2열 레이아웃으로 전환됐습니다.
- 링크 순서는 네이버 지도, `tel:`, Instagram이었고 hit area 높이는 각각 `52px`, `44px`, `44px`였습니다.
- keyboard focus에서 실제 site shell의 `2px` outline과 `5px` offset이 명확하게 표시됐습니다.
- Address, Hours, Contact reveal 3개는 one-shot으로 visible 상태를 유지했고 reduced-motion에서는 즉시 표시됐습니다.
- 브라우저 console error는 `0`이었습니다.

## 제외한 기능

- map embed와 미확인 좌표
- 실시간 영업 상태
- 주차와 대중교통 안내
- 주소 복사 기능
- 영업시간 accordion
- parallax
- 새 dependency

구현과 검증, PD 최종 승인을 완료했으며 blocking 수정은 없습니다.
