# Brand and UI

## 브랜드 방향

- 핵심 콘셉트는 **Black & White**다.
- 배경, 텍스트, 아이콘은 검정과 흰색을 중심으로 사용하고 회색은 정보 위계와
  상태 구분을 위한 보조색으로만 사용한다.
- 별도 요청 없이 장식용 컬러 포인트, 화려한 gradient, 과도한 animation을
  추가하지 않는다.
- 차분하고 성숙한 분위기, 편안하게 머무는 공간, 일상의 routine을 강조한다.
- 메뉴와 공간 사진을 중심에 두고 불필요한 장식을 피한다.

## SEED Design System

- UI는 `@seed-design/react`, `@seed-design/css`, `@seed-design/icon`을 우선
  사용한다.
- `@seed-design/react`에 있는 component와 같은 역할의 local component나
  다른 UI library를 추가하지 않는다.
- 설치나 version update 전에는 공식 최신 version과 변경 사항을 확인하고
  lockfile을 함께 갱신한다.
- 색상은 SEED semantic token을 흑백 palette에 맞춰 적용한다. spacing,
  typography, radius는 브랜드와 충돌하지 않으면 token을 우선한다.
- `vanilla-extract`는 page layout과 SEED로 충족할 수 없는 custom style에만
  사용한다. SEED의 접근성 동작과 focus 처리를 제거하지 않는다.

## 반응형과 접근성

- 모바일과 desktop에서 자연스럽게 동작하도록 확인한다.
- 의미 있는 HTML, keyboard 조작, 보이는 focus, 대체 텍스트를 제공한다.
- focus, 오류, 비활성 상태는 색상뿐 아니라 형태, text, 명도 차이로 구분한다.
