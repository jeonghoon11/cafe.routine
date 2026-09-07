# 메뉴 동적 리듬과 홈 Coffee 이미지 교체 회의

## 주제

메뉴 페이지의 탐색 리듬 개선과 홈 Coffee 영역의 실제 메뉴 이미지 연결

## 참여 직군

FE, PD, PM

## 사용자 문제와 목표

- 데스크톱 메뉴 목록의 왼쪽 여백이 넓지만 탐색에 필요한 정보를 제공하지 않아 화면 밀도가 낮게 느껴집니다.
- 모든 카드에 개별 효과를 추가하면 메뉴 비교가 느려질 수 있으므로, 카테고리 전환만 인지할 수 있는 절제된 움직임이 필요합니다.
- 홈 Coffee 이미지는 실제 제공 메뉴와 연결되어야 하며 Storage 경로 변경에도 깨지지 않아야 합니다.

## 결정 사항과 근거

- 데스크톱 카테고리는 왼쪽에 `top: 164px` sticky rail을 두고 index, 카테고리 제목, `N ITEMS`를 표시합니다. 여백을 장식으로 채우지 않고 현재 메뉴 묶음의 위치와 규모를 알려주는 정보 영역으로 사용합니다.
- 모바일에서는 왼쪽 rail의 sticky를 해제합니다. 좁은 화면에서 고정 정보가 메뉴 콘텐츠를 가리지 않게 합니다.
- 기존 2열 카드 구조를 유지하고 데스크톱의 짝수 카드는 `56px` 아래로 배치합니다. 정보 순서와 비교 가능성을 유지하면서 정적인 격자에 시각적 리듬을 더합니다. 모바일 offset은 `0`으로 복원합니다.
- 기존 `RevealOnView`를 재사용해 카테고리 단위로 한 번만 `opacity`와 `translateY(32px)` 전환을 실행합니다. 전환 시간은 `900ms`와 합의된 easing을 사용하며, 카드마다 observer를 만들지 않습니다.
- `prefers-reduced-motion: reduce`에서는 전환 없이 즉시 표시합니다. 모션 선호 설정과 메뉴 정보 접근성을 우선합니다.
- Home Coffee는 메뉴 이름이나 Storage object path가 아니라 메뉴 item ID로 `ROUTINE COFFEE`, `PISTACHIO LATTE`, `CAFE LATTE`의 `media_assets` FK를 조회해 3장을 표시합니다. DB의 기존 관계를 단일 데이터 계약으로 사용하고 이미지 경로와 usage 조건을 중복 관리하지 않습니다.

## 역할별 후속 작업

- FE
  - 데스크톱 sticky rail, 짝수 카드 offset과 모바일 해제를 구현했습니다.
  - 기존 `RevealOnView`로 카테고리 단위 one-shot reveal과 reduced-motion 즉시 표시를 구현했습니다.
  - Home Coffee 조회를 메뉴 item ID와 `media_assets` FK 기반으로 변경하고 세 메뉴의 표시 순서를 유지했습니다.
- PD
  - 데스크톱 rail의 위계, 짝수 카드 offset과 카테고리 전환 리듬을 검수했습니다.
  - 모바일에서 rail과 offset이 콘텐츠 가독성을 해치지 않고 reduced-motion에서 정보가 누락되지 않는지 확인했습니다.
- PM
  - 왼쪽 rail이 카테고리 위치와 메뉴 수를 실제로 전달하고 장식성 문구를 추가하지 않았는지 확인했습니다.
  - Home Coffee의 세 메뉴와 현재 이미지 연결 상태를 확인했습니다.

## 완료 기준

- 데스크톱에서 각 카테고리 rail이 `top: 164px`에 고정되고 index, 제목과 실제 메뉴 수를 표시합니다.
- 모바일에서는 rail이 고정되지 않고 카드 offset이 `0`입니다.
- 데스크톱은 2열을 유지하며 짝수 카드에만 `56px` offset이 적용되고 가로 overflow가 없습니다.
- 각 카테고리는 최초 진입 시 한 번만 `opacity`와 `translateY(32px)` 전환으로 나타나며, 다시 스크롤해도 반복되지 않습니다.
- reduced-motion에서는 카테고리가 전환 없이 즉시 표시되고 메뉴 탐색과 키보드 접근이 유지됩니다.
- 홈 Coffee 영역은 `ROUTINE COFFEE`, `PISTACHIO LATTE`, `CAFE LATTE`의 FK로 연결된 이미지 3장을 순서대로 표시합니다.
- Storage object path를 직접 작성하거나 별도 usage 조건을 복제하지 않습니다.
- 이미지 관계가 없으면 기존 Home fallback 동작이 유지되고, 조회 오류는 숨기지 않고 전달합니다.

## 구현·검증 결과

- 데스크톱에서 rail이 카테고리 경계 안에서 `top: 164px` sticky로 동작하고 index, 제목, `N ITEMS`를 표시했습니다.
- 데스크톱 짝수 카드에 `56px` offset이 적용됐습니다.
- 모바일 `390px`, `768px`에서 rail은 static, 카드 offset은 `0`, 가로 overflow는 `0`이었습니다.
- `799px`과 `800px`에서 모바일·데스크톱 breakpoint 전환을 확인했습니다.
- 카테고리 one-shot reveal은 최초 등장 후 다시 스크롤해도 visible 상태를 유지했습니다.
- reduced-motion에서 `opacity: 1`, `transform: none`, `transition-duration: 0s`를 확인했습니다.
- 키보드 탐색과 category hash 이동이 유지됐습니다.
- Home Coffee의 `ROUTINE COFFEE`, `PISTACHIO LATTE`, `CAFE LATTE` FK 이미지 3장이 올바른 public path에서 로딩됐습니다.
- Home Coffee 이미지는 데스크톱 `3:4`, 모바일 `4:5`, `object-fit: cover`로 표시됐고 가로 overflow는 `0`이었습니다.
- 관계 이미지가 누락되면 기존 Home 이미지 3장을 fallback으로 사용하며, Supabase query error는 숨기지 않고 throw합니다.

## 제외한 기능

- 카드별 observer와 개별 reveal
- hover 애니메이션 추가
- active category scrollspy와 진행률 표시
- 추천, 인기순, 리뷰 등 근거 데이터와 운영 정책이 없는 기능

구현과 브라우저 검증을 완료했으며, 운영 데이터 계약이나 디자인 기준이 변경될 때 이 문서를 갱신합니다.
