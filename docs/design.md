# Brand and UI Guide

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
- 일반 UI의 색상·타이포그래피·간격·radius는
  `@seed-design/css/vars`의 공개 semantic token을 우선한다. 내부 package
  경로나 component 전용 vars를 직접 import하지 않는다.
- Cafe Routine의 Paper·Ink·Dark와 보조 색상은 SEED 기본 palette를
  덮어쓰지 않고 `(site)/theme.css.ts`의 `routineVars.color`로 관리한다.
  이 값은 매장 브랜드 표면에만 사용하고 SEED component의 상태·대비
  조합은 유지한다.
- 본문·라벨·버튼의 표준 크기와 두께는 `vars.$fontSize`,
  `vars.$fontWeight`, `vars.$lineHeight`를 사용한다. SEED 스케일을 넘는
  반응형 display title과 타이트한 line-height는 브랜드 typography로
  가까운 page style에 둔다.
- `vanilla-extract`는 page layout과 SEED로 충족할 수 없는 custom style에만
  사용한다. SEED의 접근성 동작과 focus 처리를 제거하지 않는다.

## 반응형과 접근성

- 모바일과 desktop에서 자연스럽게 동작하도록 확인한다.
- 의미 있는 HTML, keyboard 조작, 보이는 focus, 대체 텍스트를 제공한다.
- focus, 오류, 비활성 상태는 색상뿐 아니라 형태, text, 명도 차이로 구분한다.
