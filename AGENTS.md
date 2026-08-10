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

## SEED Design System

- UI 구현에는 당근의 오픈소스 디자인 시스템인 SEED의 `@seed-design/*` 패키지를 사용한다.
  - `@seed-design/react`: React 컴포넌트
  - `@seed-design/css`: 디자인 토큰과 스타일
  - `@seed-design/icon`: 아이콘
- `@seed-design/react`에 있는 컴포넌트를 먼저 재사용하고 같은 역할의 로컬 컴포넌트나 다른 UI 라이브러리를 추가하지 않는다.
- SEED의 공식 설치 및 사용법을 따르고, 설치하거나 올릴 때는 실제 최신 버전과 변경 사항을 확인한 뒤 잠금 파일을 함께 갱신한다.
- 색상은 SEED의 시맨틱 토큰을 루틴의 흑백 팔레트에 맞게 적용하고, spacing, typography, radius처럼 브랜드와 충돌하지 않는 토큰은 임의 값보다 우선 사용한다.
- `vanilla-extract`는 페이지 레이아웃과 SEED로 충족할 수 없는 커스텀 스타일에만 사용하며, SEED 컴포넌트의 접근성 동작과 포커스 처리를 제거하지 않는다.

## 기술 스택과 앱 형태

- `Next.js` App Router, `React`, `TypeScript`를 사용한다. Pages Router는
  함께 사용하지 않는다.
- `page.tsx`와 `layout.tsx`는 Server Component를 기본으로 유지하고,
  상호작용·React Hook·browser API가 필요한 최소 범위에만 `'use client'`를
  적용한다.
- 매장 정보, 메뉴, 가격, 이미지 메타데이터는 Supabase를 단일
  데이터 원본으로 사용하고 Server Component에서 읽어 초기 HTML에
  포함한다. `@tanstack/react-query`는 refetch, polling, optimistic update 등
  브라우저 서버 상태가 실제로 생겼을 때만 사용한다.
- 스타일은 `vanilla-extract`의 `@vanilla-extract/css`를 사용한다.
- 모든 화면은 모바일과 데스크톱에서 자연스럽게 동작하는 반응형 UI로 구현한다.
- PWA를 지원하며, 구현 시 웹 앱 매니페스트, 서비스 워커, 설치 가능 여부를 함께 확인한다.
- 세부 App Router 사용 기준은 `.agents/nextjs.md`를 따른다.

## Supabase

- 공개 페이지는 Supabase Postgres의 공개 가능한 행만 publishable key로
  읽고, 모든 `public` schema table에 RLS를 적용한다.
- `service_role` key는 브라우저 번들과 `NEXT_PUBLIC_*` 환경 변수에
  절대 넣지 않는다.
- 메뉴 가격은 KRW 원 단위 정수로 저장하고 음수를 허용하지
  않는다. 화면에서만 locale에 맞게 포맷한다.
- 이미지 파일은 Supabase Storage의 공개 `site-assets` bucket에
  저장하고, object path, 대체 텍스트, width, height, 노출 상태는
  Postgres에서 관리한다. public URL 전체를 DB에 저장하지 않는다.
- 공개 읽기 이외의 upload, update, delete는 Supabase Auth와 RLS에서
  허가된 관리자만 수행한다. 관리 화면이 배포되기 전까지는
  Supabase Dashboard를 사용한다.
- 관리자 메뉴 화면은 `/admin/menu`에 두고 메뉴 추가·수정·삭제를
  제공한다. 삭제는 기본적으로 `deleted_at`을 설정하는 soft delete로
  구현한다.
- schema, RLS policy, Storage policy는 `supabase/migrations`에서 이력으로
  관리하고 Dashboard에서만 변경한 상태를 남기지 않는다.

## SEO 원칙

- SEO를 이 프로젝트의 최우선 품질 기준으로 둔다. UI나 기능을 결정할 때 검색엔진의 크롤링·인덱싱 가능성, 검색 결과의 이해도, Core Web Vitals에 미치는 영향을 먼저 검토한다.
- 검색 유입만 노린 키워드 반복, 숨은 텍스트, 지역명별 유사 페이지, `meta keywords`는 만들지 않는다. 방문자가 매장을 이해하고 방문을 결정하는 데 실제로 필요한 공식 정보와 고유한 콘텐츠를 우선한다.
- 검색 노출 대상 페이지는 Supabase에서 읽은 매장명, 주소,
  영업시간, 메뉴와 SEO 메타데이터를 JavaScript 실행 전 초기 HTML
  응답에 포함한다. 공개 콘텐츠는 Server Component에서 렌더링하고,
  cache를 도입할 때는 콘텐츠 갱신 시점과 무효화 방법을 함께
  정의한다.
- 메타데이터는 Next.js Metadata API의 정적 `metadata`, 동적
  `generateMetadata`, metadata file convention을 사용한다. 클라이언트에서
  `<head>`만 바꾸는 라이브러리를 초기 HTML 생성의 대안으로 보지 않는다.
- 페이지마다 내용을 정확히 설명하는 고유한 `title`, `meta description`, 절대 URL canonical을 제공한다. 대표 이미지가 있는 페이지는 내용과 일치하는 `og:title`, `og:description`, `og:image`도 제공하되 검색엔진이 이를 그대로 노출한다고 가정하지 않는다.
- 공개 URL은 사람이 이해할 수 있는 안정적인 경로를 사용한다. 내부 링크, canonical, sitemap에는 동일한 대표 URL만 사용하고 hash routing은 피한다. 삭제·이동·오류는 JavaScript가 아닌 실제 `301`/`302`/`404` HTTP 상태 코드로 응답하고, 정적 호스팅의 SPA fallback이나 PWA 서비스 워커가 존재하지 않는 URL을 `200`으로 바꾸지 않게 해 soft 404와 중복 색인을 막는다.
- `robots.txt`는 공개 페이지와 렌더링에 필요한 CSS, JavaScript, 이미지 수집을 허용하고 sitemap의 절대 URL을 알린다. sitemap에는 색인할 canonical URL만 넣고, 실제 콘텐츠가 변경된 경우에만 정확한 `lastmod`를 갱신한다.
- 문서 언어는 `<html lang="ko">`로 명시하고 의미 있는 HTML 요소와 자연스러운 제목 계층을 사용하며 페이지의 대표 `h1`은 하나로 유지한다. 탐색 링크는 설명 가능한 문구가 있는 `<a href>`로 제공하고, 버튼 클릭이나 JavaScript 이벤트만으로 공개 페이지를 연결하지 않는다.
- 로컬 SEO를 위해 화면에 보이는 매장명, 주소, 전화번호, 영업시간을 공식 자료, Google Business Profile, 네이버 플레이스에서 일관되게 유지한다. 정보 변경 시 홈페이지와 외부 매장 프로필을 함께 갱신하고, 확인되지 않은 지역명·좌표·가격·평점·리뷰는 만들지 않는다.
- 구조화 데이터는 JSON-LD와 schema.org의 `CafeOrCoffeeShop`을 우선 사용한다. `name`, `address`, `telephone`, `url`, `openingHoursSpecification`, `image`, 메뉴 URL 등 검증된 값만 넣고 화면에 보이는 정보와 일치시키며, Google Rich Results Test와 Schema Markup Validator로 검사한다.
- 메뉴와 공간 사진은 `next/image`나 `<picture>`로 제공하고 문맥에
  맞는 파일명과 대체 텍스트, 반응형 크기, `width`/`height`를 지정한다.
  런타임 이미지 최적화를 꺼두었으므로 원본을 WebP 등 웹용 형식과 크기로
  먼저 내보낸다. 첫 화면의 LCP 이미지는 lazy loading하지 않고,
  화면 밖 이미지만 지연 로딩한다.
- Core Web Vitals는 모바일과 데스크톱 각각 실제 사용자 데이터의 75번째 백분위에서 `LCP ≤ 2.5s`, `INP ≤ 200ms`, `CLS ≤ 0.1`을 목표로 한다. 배포 전후에는 Lighthouse/PageSpeed Insights로 회귀를 찾고, 충분한 실제 사용자 데이터가 쌓인 뒤에는 Search Console 보고서를 기준으로 판단한다.
- 배포 시 Google Search Console과 네이버 서치어드바이저에서 사이트 소유권, sitemap, 대표 URL의 색인 가능 여부를 확인한다. 배포 후에는 색인 오류, 구조화 데이터 오류, Core Web Vitals, 검색어·노출·클릭 변화를 주기적으로 확인하고 근거 없이 순위를 보장하거나 일회성 점수만 최적화하지 않는다.
- SEO 관련 변경은 최소 3단계로 검증한다. 먼저 빌드 결과의 초기 HTML과 HTTP 상태 코드를 확인하고, 다음으로 메타데이터·canonical·robots·sitemap·구조화 데이터를 검사하며, 마지막으로 배포 URL을 Search Console과 네이버 서치어드바이저에서 확인한다.

## 구현 원칙

- 폴더 배치나 공용화 여부를 판단할 때 `.agents/architecture.md`를 먼저 확인하고, 구조가 바뀌면 문서를 함께 갱신한다.
- Next.js 렌더링, data fetching, cache, metadata, 라우팅 방식을 바꾸면
  `.agents/nextjs.md`를 함께 갱신한다.
- 필요한 기능만 구현하고 최소 변경을 우선한다.
- 프론트엔드 코드 작성·리팩터링·리뷰에는 `toss-frontend-fundamentals` skill을 적용하되, 수치 기준과 예시는 휴리스틱으로 취급하고 새 의존성이나 추상화를 자동으로 추가하지 않는다.
- 의미 있는 HTML, 키보드 조작, 보이는 포커스, 대체 텍스트 등 기본 접근성을 지킨다.
- 모바일과 데스크톱에서 확인하되, 별도 근거 없이 기능·페이지·관리자 시스템을 추가하지 않는다.
- 브랜드 정보와 콘텐츠는 공식 Instagram, 네이버 플레이스, 제공된 원본 자료를 우선한다.

## Git 브랜치 및 머지 전략

- feature를 포함한 작업 브랜치에서 `develop`으로 병합할 때는 squash merge를 사용한다.
- `develop`에서 `main`으로 병합할 때는 merge commit을 사용한다.
