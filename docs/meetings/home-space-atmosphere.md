# Home 공간 분위기 섹션 전환 회의

## 주제

Home Coffee 영역을 실제 공간 사진 중심의 Space 영역으로 전환

## 참여 직군

BE, FE, PD, PM

## 사용자 문제와 목표

- 메뉴 사진만으로는 방문 전에 매장 공간을 파악하기 어려우므로, 실제 공간 사진을 통해 방문 판단에 필요한 시각 정보를 제공합니다.
- 확인되지 않은 분위기, 인기, 좌석 편의성을 주장하지 않고 사진에서 확인 가능한 공간과 공식 방문 동선만 안내합니다.
- 공간 데이터가 불완전해도 Home 전체와 Hero의 이용을 방해하지 않아야 합니다.

## 결정 사항과 근거

- 기존 Home Coffee 영역을 `ROUTINE / 03 — SPACE`로 교체합니다. 실제 공간 사진을 연속해서 보여줘 메뉴 소개와 다른 방문 정보를 제공합니다.
- 제목은 `Inside ROUTINE.`으로, 본문은 `창가의 빛과 긴 테이블, 밤의 정원까지. 루틴의 공간을 둘러보세요.`로 사용합니다. 사진에서 확인 가능한 요소만 구체적으로 설명합니다.
- 사진은 `courtyard → long table → passage → cups → night garden → cup wall → table detail → full interior` 순서의 curated gallery로 배치합니다. 각 caption은 DB 순서의 사진과 1:1로 연결해 확인된 공간만 설명합니다.
- 검은 section 배경과 흰 타이포를 유지하고 사진은 full color로 표시합니다. 브랜드 대비를 유지하면서 실제 공간의 색과 빛을 보존합니다.
- heading이 사진에 가려지는 문제를 blocking으로 보고 sticky, `z-index`, `top`, `pointer-events`를 제거해 static flow로 표시합니다.
- 데스크톱은 `5fr 7fr` 비대칭 2열을 유지하고 두 번째, 네 번째, 여섯 번째 사진에 `10vh` offset을 둡니다. 여덟 번째 사진은 전체 행의 `72%` 너비로 서사를 마무리합니다.
- 모바일은 `64px` 간격의 1열로 전환하고 모든 사진 offset을 해제합니다. 좁은 화면에서 순서대로 읽고 가로 overflow가 생기지 않게 합니다.
- heading과 figure 8개는 기존 `RevealOnView`로 각각 한 번만 `opacity`와 `translateY(32px)` 전환을 실행합니다. `prefers-reduced-motion: reduce`에서는 즉시 표시합니다.
- 별도 CTA를 추가하지 않고 다음 Explore 영역의 `방문 정보 확인하기` 링크를 재사용합니다. 공간 확인 후 공식 주소와 방문 정보로 이어지는 기존 동선을 유지합니다.

## Supabase 데이터 계약

- `media_assets`에서 `usage=space`, `is_published=true`인 항목을 `sort_order` 기준으로 최대 8개 조회하고 public URL을 사용합니다.
- 기존 busy interior는 `is_published=false`로 전환하되 Storage 객체는 유지하고, 새 공간 사진 5장은 WebP로 추가했습니다.
- 공개 사진 8장의 `sort_order`는 courtyard `1`, long table `2`, passage `3`, cups `4`, night garden `5`, cup wall `6`, table detail `7`, full interior `8`로 확정했습니다.
- caption과 사진이 DB 순서로 1:1 연결된 curated gallery이므로 정확히 8장이 아니면 Space 영역만 숨깁니다. 잘못된 caption 연결을 막기 위해 부분 fallback은 사용하지 않습니다.
- Supabase query error는 숨기지 않고 throw합니다.
- 기존 Hero 조회는 1장 제한과 현재 error 처리를 유지해 Space 변경의 영향을 받지 않게 합니다.

## 역할별 작업

- BE
  - busy interior를 비공개로 전환하고 새 공간 사진 5장을 WebP로 업로드했습니다.
  - 공개 사진 8장의 `sort_order`와 조회 결과를 검증했습니다.
- FE
  - Coffee 영역과 관련 조회를 제거하고 Space 조회와 조건부 section을 구현했습니다.
  - 합의한 데스크톱·모바일 레이아웃, 원본 비율, caption과 one-shot reveal을 적용했습니다.
  - 이미지 alt, width, height, lazy loading과 async decoding을 유지하고 Hero 회귀 여부를 검증했습니다.
- PD
  - 사진 순서, 원본 비율, full color와 검은 section의 대비 기준을 검수했습니다.
  - static heading, 비대칭 offset, closing image와 모바일 1열 구현을 최종 승인했으며 blocking 수정은 없습니다.
  - 밝은 courtyard·long table에서 어두운 passage·details와 night를 지나 사람이 있는 interior로 이어지는 흐름과 여덟 번째 closing 구성을 승인했습니다.
- PM
  - 카피와 caption이 실제 사진에서 확인 가능한 내용만 전달하는지 검토했습니다.
  - Space 다음 Explore의 방문 정보 링크와 공식 주소 동선이 유지되는지 확인했습니다.

## 완료 기준

- Home Coffee 영역이 제거되고 `ROUTINE / 03 — SPACE`, 제목, 본문과 공간 사진 8장이 합의한 순서로 표시됩니다.
- 여덟 사진은 올바른 public URL에서 로딩되고 의미 있는 alt, width, height, lazy loading과 async decoding을 제공합니다.
- 사진은 데스크톱과 모바일에서 원본 비율과 full color를 유지하며 가로 overflow가 없습니다.
- heading은 이미지와 겹치지 않는 static flow로 표시됩니다.
- 데스크톱 `800px` 이상은 `5fr 7fr` 2열, 두 번째·네 번째·여섯 번째 `10vh` offset과 여덟 번째 full-row `72%` closing을 적용합니다.
- 모바일 `390px`, `768px`은 `64px` 간격의 1열과 offset `0`으로 표시됩니다.
- heading과 figure 8개는 한 번만 reveal되고, reduced-motion에서는 전환 없이 즉시 표시됩니다.
- `usage=space` 이미지가 정확히 8장이 아니면 Space만 숨겨지고, query error는 전달됩니다.
- Hero 영상과 다음 Explore의 `방문 정보 확인하기` 동선이 유지됩니다.

## 구현·검증 결과

- `typecheck`, `lint`, diff check를 통과했습니다.
- 데스크톱에서 공간 사진 8장이 courtyard, long table, passage, cups, night garden, cup wall, table detail, full interior 순서로 로딩됐고 natural dimensions가 정상임을 확인했습니다.
- heading은 static이며 사진과 겹치지 않았고, 데스크톱 `5fr 7fr` 2열과 합의한 offset·closing layout에서 가로 overflow는 `0`이었습니다.
- 모바일 `390px`에서 1열, 모든 사진 offset `0`, 가로 overflow `0`을 확인했습니다.
- reveal 9개는 스크롤 후 모두 visible을 유지해 one-shot으로 동작했습니다.
- reduced-motion에서 `opacity: 1`, `transform: none`, `transition-duration: 0s`를 확인했습니다.
- Home에서 기존 Coffee 문구가 더 이상 표시되지 않았습니다.
- 다음 Explore의 Visit href가 유지됐고 브라우저 console error는 `0`이었습니다.

## 제외한 기능

- carousel과 drag
- parallax와 scroll lock
- 비인터랙티브 이미지 hover 효과
- 공간의 인기, 좌석 편의나 체류 경험처럼 사진과 공식 정보로 확인할 수 없는 주장
- 별도 CTA와 추천, 리뷰 등 근거 데이터나 운영 정책이 없는 기능

구현과 브라우저 검증, PD 최종 승인을 완료했으며 blocking 수정은 없습니다.
