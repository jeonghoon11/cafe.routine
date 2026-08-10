# SEO

SEO를 최우선 품질 기준으로 두고 크롤링, 인덱싱, 검색 결과 이해도, Core Web
Vitals 영향을 먼저 검토한다.

## 콘텐츠와 렌더링

- 검색 유입만 노린 keyword 반복, 숨은 text, 지역명별 유사 page,
  `meta keywords`를 만들지 않는다.
- 공개 콘텐츠와 Supabase 데이터는 Server Component로 초기 HTML에 포함한다.
- 문서 언어는 `<html lang="ko">`로 지정하고 의미 있는 HTML과 자연스러운
  heading 계층을 사용하며 대표 `h1`은 하나만 둔다.
- 공개 page 연결은 설명 가능한 `<a href>`로 제공하고 hash routing을 피한다.
- 삭제, 이동, 오류는 실제 `301`, `302`, `404`로 응답한다. PWA service
  worker가 존재하지 않는 URL을 `200`으로 바꾸지 않게 한다.

## Metadata와 URL

- Next.js Metadata API와 metadata file convention을 사용한다.
- page마다 고유한 `title`, description, absolute canonical을 제공한다.
- 대표 image가 있으면 내용과 일치하는 Open Graph metadata를 제공한다.
- internal link, canonical, sitemap에는 동일한 대표 URL만 사용한다.
- `robots.txt`는 렌더링 자산의 수집을 허용하고 sitemap absolute URL을
  알린다. sitemap에는 canonical URL만 넣고 실제 변경 때만 `lastmod`를
  갱신한다.

## 로컬 SEO와 구조화 데이터

- 매장명, 주소, 전화번호, 영업시간을 공식 자료, Google Business Profile,
  네이버 플레이스와 일치시킨다.
- JSON-LD는 schema.org `CafeOrCoffeeShop`을 우선하고 화면에 보이는 검증된
  값만 넣는다.
- 확인되지 않은 지역명, 좌표, 가격, 평점, 리뷰를 만들지 않는다.

## 이미지와 성능

- `next/image` 또는 `<picture>`에 문맥에 맞는 filename, alt, responsive
  size, width, height를 제공한다.
- runtime image optimization을 사용하지 않으므로 WebP 등 웹용 크기와
  format으로 먼저 내보낸다.
- LCP image는 lazy load하지 않고 화면 밖 image만 지연한다.
- 모바일과 desktop 실제 사용자 데이터의 75번째 백분위에서
  `LCP ≤ 2.5s`, `INP ≤ 200ms`, `CLS ≤ 0.1`을 목표로 한다.

## 검증과 배포

1. build 결과의 초기 HTML과 HTTP status를 확인한다.
2. metadata, canonical, robots, sitemap, JSON-LD를 검사한다.
3. 배포 후 Google Search Console과 네이버 서치어드바이저에서 소유권,
   sitemap, 색인 가능 여부를 확인한다.

구조화 데이터는 Google Rich Results Test와 Schema Markup Validator로
검사한다. Lighthouse와 PageSpeed Insights는 회귀 탐지에 사용하고 실제 사용자
데이터가 쌓이면 Search Console을 기준으로 판단한다. 순위를 보장하지 않는다.
