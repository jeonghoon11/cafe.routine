# Next.js App Router

최종 확인일: 2026-08-11

대상 버전: Next.js 16.3.0, React 19.2

이 문서는 Cafe Routine의 Next.js App Router와 Supabase 사용 기준을
정의한다. 버전 업그레이드로 동작이 바뀌면 공식 문서를 다시
확인하고 이 문서를 함께 갱신한다.

## 프로젝트 기본 선택

- App Router만 사용하고 Pages Router를 함께 두지 않는다.
- 페이지와 layout은 기본값인 Server Component로 유지한다.
- 매장 정보, 메뉴, 가격, 이미지 메타데이터는 Supabase를 단일
  데이터 원본으로 사용한다.
- 공개 페이지는 Server Component가 Supabase를 읽어 본문과 SEO 정보를
  초기 HTML에 포함한다.
- 현재는 콘텐츠 변경을 즉시 반영하기 위해 request-time rendering을
  기본으로 한다. cache는 지연 시간이나 호출량 문제가 확인되면
  갱신 정책과 무효화 방법을 함께 정의하고 도입한다.
- `output: 'export'`는 사용하지 않는다. Supabase 변경을 재빌드 없이
  반영할 수 있는 Next.js server 배포를 기준으로 한다.
- Next.js 이미지 런타임 변환은 `images.unoptimized: true`로 끈다.
- PWA 구현 시 web app manifest, service worker, 설치 가능 여부와 존재하지
  않는 URL의 HTTP status 보존을 함께 확인한다.

## Server Component와 Client Component

Server Component를 기본으로 사용한다.

- Supabase 조회, SEO 본문, metadata, JSON-LD는 서버에 둔다.
- `useState`, `useEffect`, event handler, browser API가 필요한 가장 작은
  컴포넌트에만 `'use client'`를 선언한다.
- Server Component에서 읽은 데이터는 직렬화 가능한 props로 Client
  Component에 전달한다.
- 페이지 전체를 하나의 `page.client.tsx`로 넘기지 않는다. 페이지
  전체가 하나의 상호작용 단위일 때만 예외로 한다.
- Provider는 root layout에 먼저 넣지 않고 실제 소비 범위를 감싸는
  가장 깊은 layout이나 Client Component에 둔다.

## React Effect

- `useEffect`를 작성하기 전에 외부 시스템과의 동기화인지 확인한다.
  렌더링 중 계산할 수 있는 파생 값과 사용자 이벤트 처리는 effect로
  옮기지 않는다.
- 필요한 effect는 목적이 드러나는 named function expression으로 작성한다.

```tsx
useEffect(function synchronizeDocumentTitle() {
  document.title = title;
}, [title]);
```

- `onMount`, `runEffect`처럼 실행 시점을 나타내기보다
  `connectToWebSocket`, `applyUserTheme`처럼 동기화 목적을 표현한다.
- 명확한 이름을 붙이기 어렵거나 이름에 `And`가 필요하면 책임이 섞였거나
  effect가 불필요한지 검토한다.
- cleanup이 복잡할 때만 cleanup 함수에도 목적을 나타내는 이름을 붙인다.
- 재사용되지 않는 단순 effect를 이름만 붙이려고 custom hook으로 추출하지
  않는다.

참고: [Name Your Effects](https://neciudan.dev/name-your-effects),
[Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects),
[You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

## 페이지와 layout

- root `layout.tsx`는 `<html lang="ko">`, 전역 metadata, 전역 CSS를
  담당한다.
- header와 footer가 모든 공개 페이지에서 같으면 root layout에 둔다.
- 일부 URL만 다른 chrome을 쓸 때 `(site)`, `(admin)` 같은 route group과
  nested layout을 검토한다.
- 내부 탐색은 `next/link`의 `Link`를 사용한다. 외부 URL, `tel:`,
  `mailto:`는 일반 `<a>`를 사용한다.
- Next.js 16의 `params`와 `searchParams`는 Promise로 다룬다.

## 절대 import 경로

`tsconfig.json`의 `@/*` alias는 `src/*`를 가리킨다.

```tsx
import { getMenu } from '@/app/menu/_data/get-menu';
import { createSupabaseServerClient } from '@/shared/supabase/server';
```

- 라우트 내의 가까운 파일은 상대 경로를 허용한다.
- 상위 폴더를 여러 번 올라가는 import나 다른 라우트·`shared`를
  참조할 때는 `@/`를 사용한다.
- alias를 폴더별로 여러 개 만들지 않는다. `@/*` 하나면 충분하다.

## Supabase client

- 필수 환경 변수는 `NEXT_PUBLIC_SUPABASE_URL`\,
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`다.
- 공개 읽기는 publishable key와 RLS를 사용한다. publishable key는
  브라우저에 노출될 수 있으므로 RLS 없이 보안 경계로 사용하지
  않는다.
- `service_role` key는 RLS를 우회하므로 브라우저 코드와
  `NEXT_PUBLIC_*`에 절대 넣지 않는다.
- 공개 페이지 조회는 `src/shared/supabase/server.ts`의 server client를
  사용한다.
- browser client는 realtime, Auth, client mutation 사용처가 생겼을 때만
  추가한다.
- 관리자 페이지는 `@supabase/ssr`의 server/browser client와 Next.js
  Proxy로 Auth cookie를 유지한다.
- Proxy는 token refresh만 담당한다. `/admin` layout은 `getClaims()`로
  서명된 Auth token을 검증하고 관리자 권한을 추가로 확인한다.

## 데이터 소유권과 query

- 라우트 전용 query는 `app/{route}/_data`에 둔다.
- 여러 라우트가 같은 query 규칙을 공유할 때만 `shared`로 옮긴다.
- query는 필요한 column만 선택하고 공개 상태를 filter한다.
- Supabase의 `{ data, error }`를 확인하고 error를 빈 배열로 숨기지 않는다.
- 순서가 의미 있는 메뉴와 이미지는 DB의 `sort_order`로 정렬한다.
- metadata와 페이지가 같은 행을 중복 조회할 때만 React `cache`로 해당
  request 내 중복을 제거한다.

## Supabase schema

초기 schema는 다음 책임을 기준으로 나눈다. 실제 column과 constraint는
`supabase/migrations`의 SQL을 정답으로 한다.

### `store_profile`

- 매장명, 브랜드 문구, 주소, 전화번호, Instagram, 네이버 플레이스
- 홈과 구조화 데이터가 같은 행을 원본으로 사용한다.

### `business_hours`

- 요일, 오픈 시간, 마감 시간, 휴무 여부, 임시 안내
- 화면 표시와 `openingHoursSpecification`을 같은 행에서 생성한다.

### `menu_categories`

- 카테고리명, `sort_order`, `is_published`

### `menu_items`

- category ID, 메뉴명, 설명, `price_krw`, media ID, `sort_order`
- `is_available`로 일시 품절, `is_published`로 공개 여부,
  `deleted_at`으로 soft delete를 따로 관리한다.
- `price_krw`는 KRW 원 단위 정수이며 `0 이상` constraint를 둔다.
- 가격 미정, 시가 메뉴가 실제로 필요하면 nullable 가격과 별도 표시
  규칙을 명시적으로 추가한다.

### `media_assets`

- Storage object path, 대체 텍스트, width, height, 용도, `sort_order`,
  `is_published`
- Supabase project URL이나 bucket이 바뀌어도 DB 수정을 최소화하도록
  public URL 전체를 저장하지 않고 object path만 저장한다.

### `private.admin_users`

- Supabase Auth `user_id`와 관리자 활성 상태를 관리한다.
- Data API에 노출되지 않는 `private` schema에 둔다.
- RLS와 관리자 layout에서 사용할 `public.is_admin()` security
  definer 함수는 현재 Auth user가 활성 관리자인지만 반환한다.
- 최초 관리자는 Supabase Dashboard에서 Auth user를 만든 뒤
  `private.admin_users`에 등록한다. 일반 회원 가입으로 관리자가 될 수
  없다.

## 메뉴·가격 관리

1. 원본 Illustrator에서 메뉴명과 가격을 확인한다.
2. 관리 화면 배포 전에는 Supabase Dashboard, 배포 후에는
   `/admin/menu`에서 `menu_categories`, `menu_items`를 수정한다.
3. 새 schema나 constraint가 필요하면 Dashboard에서만 변경하지 말고
   migration SQL을 추가한다.
4. Server Component query, 화면, metadata, JSON-LD가 같은 published 행을
   사용하는지 확인한다.
5. 배포 후 화면과 구조화 데이터의 가격이 일치하는지 확인한다.

원본 `.ai` 파일은 Supabase에 업로드하지 않고 기존 공식 원본 경로에
보존한다.

## 이미지 관리

- 웹에서 쓸 파일만 원본에서 WebP로 내보내 Supabase Storage의
  공개 `site-assets` bucket에 업로드한다.
- 폴더는 `store`, `menu`, `space`처럼 콘텐츠 용도로 나눈다.
- 교체 시 같은 경로를 덮어쓰지 않고 새 경로를 사용한다. CDN의 이전
  파일 cache가 남는 문제를 피할 수 있다.
- `media_assets`에 object path와 대체 텍스트, width, height를 함께
  저장한다. DB에 이미지 binary를 저장하지 않는다.
- `site-assets`는 공개 버킷으로 읽기만 공개하고 upload, update,
  delete는 RLS policy로 관리자에게만 허용한다.
- Next.js와 Supabase의 유료 이미지 변환은 사용하지 않고, 필요한
  반응형 크기를 업로드 전에 만든다.
- Supabase Storage 이미지는 `<picture>`와 `<img src>` fallback으로
  노출한다. LCP 이미지는 lazy loading하지 않는다.

## 관리자 메뉴 페이지

- URL은 `/admin/menu`를 사용하고 search engine 색인을 금지한다.
- `/admin/login`은 인증 전 route group, `/admin/*` 관리 화면은 권한
  검사 layout에 둔다.
- 메뉴 목록은 Server Component가 비공개·품절·삭제 상태를 포함해
  읽는다.
- 메뉴 추가, 수정, 삭제는 라우트 가까이의 `actions.ts` Server
  Action으로 구현한다.
- 모든 Server Action은 `FormData` 입력 검증 → Auth 검증 → 관리자
  권한 검증 → Supabase mutation → 결과 처리 순서를 지킨다.
- UI에서 삭제를 누르면 확인 절차 후 `deleted_at`을 설정한다.
  공개 query는 `deleted_at is null`인 행만 읽는다.
- 복구는 `deleted_at` 초기화로 처리한다. Storage 파일과 DB 행의 영구
  삭제는 참조 확인이 가능한 별도 관리 동작으로 둔다.
- mutation 후 `revalidatePath('/menu')`와 `revalidatePath('/admin/menu')`로
  공개·관리 화면을 갱신한다.
- 이미지 업로드 UI는 파일 형식·크기를 검증하고, Storage 업로드가
  성공한 뒤에만 `media_assets`와 `menu_items` 참조를 저장한다.

## RLS와 권한

- exposed `public` schema의 모든 table에 RLS를 켠다.
- `anon`에는 `is_published = true and deleted_at is null`인 행의 SELECT만
  허용한다.
- `anon`에 INSERT, UPDATE, DELETE policy를 만들지 않는다.
- Storage public bucket이어도 upload·delete policy는 별도로 제한한다.
- `authenticated`의 쓰기는 `public.is_admin()`이 true인 사용자에게만
  허용한다.
- 페이지 layout의 권한 검사는 UX 경계이고 RLS가 최종 보안 경계다.

## React Query

React Query는 다음과 같은 브라우저 서버 상태가 생겼을 때만 사용한다.

- 사용자 행동 뒤 refetch가 필요한 데이터
- polling 또는 optimistic update가 필요한 화면
- 클라이언트에서 이어지는 mutation 상태

공개 메뉴와 매장 정보는 Server Component가 Supabase에서 읽으며
React Query를 거치지 않는다. 도입 시 `QueryClientProvider`는 필요한
하위 layout에 둔다.

## metadata와 SEO

- 고정 템플릿은 `export const metadata`, Supabase 행에 의존하는 값은
  `generateMetadata`를 사용한다. 두 API는 Server Component에서만
  export한다.
- root layout에 `metadataBase`와 title template을 두되, 운영 도메인이
  확정되기 전에는 임의 URL을 만들지 않는다.
- 각 공개 페이지는 고유 title, description, canonical을 가진다.
- icon, Open Graph 이미지, `robots.ts`, `sitemap.ts`는 App Router
  metadata file convention을 사용한다.
- 존재하지 않거나 비공개인 Supabase 행은 `notFound()`로 종료한다.
  `/404`로 redirect하지 않는다.
- 화면과 JSON-LD는 같은 Supabase query 결과를 사용한다.

## loading, error, 404

- `loading.tsx`는 실제로 streaming할 비동기 구간과 의미 있는 skeleton이
  있을 때만 만든다.
- 작은 비동기 영역은 해당 컴포넌트를 `Suspense`로 감싼다.
- `error.tsx`는 Client Component이며 재시도하거나 빠져나갈 수 있는 복구
  UI를 제공한다.
- 누락·비공개 데이터는 `notFound()`, Supabase 장애는 throw하여
  `error.tsx`로 보낸다. 두 상태를 같은 빈 화면으로 처리하지 않는다.

## Route Handler와 Server Action

- Supabase webhook, 브라우저가 호출해야 하는 서버 전용 endpoint가 있을
  때만 `route.ts`를 만든다.
- Server Component가 Supabase를 읽기 위해 같은 앱의 Route Handler를 다시
  호출하지 않는다.
- Server Action은 실제 form mutation이 생겼을 때만 사용하고 입력 검증,
  Auth, RLS, 오류 처리를 모두 확인한다.
- 관리자 화면이 배포되기 전까지만 Supabase Dashboard를 사용한다.

## PWA와 404

- 서비스 워커는 실제 존재하는 정적 자산만 precache한다.
- navigation 실패를 무조건 `/`로 바꾸지 않는다.
- 존재하지 않는 URL은 실제 404 상태를 유지해 soft 404를 막는다.

## 검증

변경 영역에 맞춰 아래 명령을 실행한다.

```sh
pnpm lint
pnpm typecheck
pnpm build
```

Supabase·SEO·라우팅 변경은 추가로 확인한다.

1. 공개 조회에 publishable key와 RLS만 사용했는지 확인한다.
2. 비공개 행이 `anon` query에 노출되지 않는지 확인한다.
3. 생성 HTML에 `lang="ko"`, Supabase 본문, metadata가 포함되는지
   확인한다.
4. 운영 환경에서 canonical URL과 301/302/404 상태를 확인한다.
5. `robots.txt`, sitemap, JSON-LD를 각각 공식 validator로 검사한다.

## 참고 사례

### Vercel Commerce

- 조사 커밋: [`3761e52`](https://github.com/vercel/commerce/tree/3761e52e60df9c6a316e067dbfd7032e494d3634)
- 채택: page와 layout을 Server Component로 유지하고 상호작용 컴포넌트만
  client로 격리하는 방식, 동적 route의 `generateMetadata`와 `notFound()`,
  `robots.ts`와 `sitemap.ts` metadata convention.
- 미채택: Shopify adapter, cart context, Server Action, 동적 cache invalidation.
  루틴에 해당 기능이 생기기 전에는 필요 없다.

## 공식 문서

- [Next.js project structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Fetching data](https://nextjs.org/docs/app/getting-started/fetching-data)
- [Metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Image component](https://nextjs.org/docs/app/api-reference/components/image)
- [Next.js updating data](https://nextjs.org/docs/app/getting-started/updating-data)
- [Supabase SSR client](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs&queryGroups=framework)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase Storage buckets](https://supabase.com/docs/guides/storage/buckets/fundamentals)
- [Supabase Storage access control](https://supabase.com/docs/guides/storage/security/access-control)
- [Serving Storage assets](https://supabase.com/docs/guides/storage/serving/downloads)
