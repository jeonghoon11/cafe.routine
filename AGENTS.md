# Cafe Routine 프로젝트 지침

## 프로젝트 맥락

- 이 저장소는 서울 성북구의 카페 **루틴(ROUTINE)** 공식 홈페이지를 만든다.
- 매장 주소는 `서울시 성북구 보문로34가길 6`, 안내 전화는 `02-6489-4589`다.
- 현재 확인된 영업시간은 매일 `11:00–22:00`이다.
- 공식 Instagram은 `https://www.instagram.com/cafe.routine/`이다.
- 네이버 플레이스는 `https://m.place.naver.com/restaurant/1023734971/home?entry=pll`이다.
- 브랜드 문구는 `Invite Us to Your ROUTINE`이다.
- 영업시간, 메뉴, 가격처럼 바뀔 수 있는 정보는 배포 전에 공식 자료나 매장 확인을 거친다. 확인되지 않은 정보는 만들지 않는다.

## 브랜드와 화면 방향

- 핵심 콘셉트는 **Black & White**다.
- UI의 배경, 텍스트, 아이콘은 검정과 흰색을 중심으로 만들고 회색은 정보 위계와 상태 구분을 위한 보조색으로만 사용한다.
- 별도 요청 없이 장식용 컬러 포인트를 추가하지 않는다.
- 분위기는 차분하고 성숙하며, 손님이 편안하게 머무는 공간과 일상의 루틴을 강조한다.
- 메뉴와 공간 사진이 중심이 되도록 하고 불필요한 장식, 과도한 애니메이션, 화려한 그라디언트는 피한다.
- 접근성을 해치면서까지 흑백을 강제하지 않는다. 포커스, 오류, 비활성 상태는 색상 외에도 형태·텍스트·명도 차이로 구분한다.

## 공식 원본 자료

다음 Adobe Illustrator 파일을 루틴의 공식 디자인 원본으로 취급한다.

- `/Users/jangjeonghoon/Downloads/routine_logo.ai`
- `/Users/jangjeonghoon/Downloads/ROUTINE LOGO.ai`
- `/Users/jangjeonghoon/Downloads/Preview루틴외부용-가격_new_260522.ai`
- `/Users/jangjeonghoon/Downloads/260724 루틴_메뉴.ai`

- 원본 `.ai` 파일은 직접 수정하거나 덮어쓰지 않는다.
- 웹에서 필요한 자산만 저장소 안으로 내보낸다. 로고는 가능하면 SVG, 사진은 WebP를 우선한다.
- 로고, 메뉴명, 가격은 원본 자료를 먼저 확인하고 임의로 재구성하지 않는다.

## Makers Design System 2.0

- UI 구현에는 npm에 공개된 Makers Design System 2.0의 `@sopt-mds/*` 패키지를 사용한다.
  - `@sopt-mds/ui`
  - `@sopt-mds/design-tokens`
  - `@sopt-mds/icons`
- 기존 세대인 `@sopt-makers/*` 패키지는 새 코드에 사용하지 않는다.
- `@sopt-mds/ui`에 있는 컴포넌트를 먼저 재사용하고 같은 역할의 로컬 컴포넌트나 다른 UI 라이브러리를 추가하지 않는다.
- 패키지는 React 및 React DOM 18 이상을 요구한다.
- 전역 스타일 진입점에서 디자인 시스템 CSS를 로컬 전역 CSS보다 먼저 한 번만 불러온다.

```ts
import '@sopt-mds/ui/index.css';
import './globals.css';
```

- 컴포넌트는 패키지 루트에서 가져온다.

```ts
import { ActionButton, Dialog, TextField } from '@sopt-mds/ui';
import { spacing, typography } from '@sopt-mds/design-tokens';
```

- `@sopt-mds/ui`의 기본 브랜드 토큰은 주황색이므로 그대로 사용하지 않는다. 디자인 시스템 CSS 다음에 로컬 CSS를 불러오고 필요한 `--color-*-brand-*` CSS 변수를 흑백 팔레트로 재정의한다.
- spacing, typography, radius처럼 브랜드와 충돌하지 않는 토큰은 임의 값보다 우선 사용한다.
- 디자인 시스템 컴포넌트의 접근성 동작과 포커스 처리를 제거하지 않는다.
- 확인 기준일인 2026-08-08의 npm 최신 버전은 `@sopt-mds/ui@1.10.0`, `@sopt-mds/design-tokens@1.0.7`, `@sopt-mds/icons@0.2.0`이다. 설치하거나 올릴 때는 실제 최신 버전과 변경 사항을 다시 확인하고 잠금 파일을 함께 갱신한다.

## 기술 스택과 앱 형태

- `React`와 `TypeScript`를 사용한다.
- 서버 상태와 비동기 요청은 `@tanstack/react-query`로 관리한다.
- 스타일은 `vanilla-extract`의 `@vanilla-extract/css`를 사용한다.
- 모든 화면은 모바일과 데스크톱에서 자연스럽게 동작하는 반응형 UI로 구현한다.
- PWA를 지원하며, 구현 시 웹 앱 매니페스트, 서비스 워커, 설치 가능 여부를 함께 확인한다.

## 구현 원칙

- 필요한 기능만 구현하고 최소 변경을 우선한다.
- 프론트엔드 코드 작성·리팩터링·리뷰에는 `toss-frontend-fundamentals` skill을 적용하되, 수치 기준과 예시는 휴리스틱으로 취급하고 새 의존성이나 추상화를 자동으로 추가하지 않는다.
- 의미 있는 HTML, 키보드 조작, 보이는 포커스, 대체 텍스트 등 기본 접근성을 지킨다.
- 모바일과 데스크톱에서 확인하되, 별도 근거 없이 기능·페이지·관리자 시스템을 추가하지 않는다.
- 브랜드 정보와 콘텐츠는 공식 Instagram, 네이버 플레이스, 제공된 원본 자료를 우선한다.
