# Architecture

이 문서는 Cafe Routine의 파일 배치 기준을 정의한다. Next.js·Supabase
동작 방식은 [nextjs.md](./nextjs.md)를 따른다.

## 현재 구조

```text
src/
└── app/
    ├── globals.css
    ├── layout.tsx
    └── (site)/
        ├── _data/get-site-data.ts
        ├── layout.tsx
        ├── site-shell.css.ts
        ├── hero-actions.tsx
        ├── page.css.ts
        ├── page.tsx
        ├── menu/
        │   ├── _data/get-menu.ts
        │   ├── page.css.ts
        │   └── page.tsx
        └── visit/
            ├── page.css.ts
            └── page.tsx
```

폴더는 사용처가 생길 때 만든다. 빈 `components`, `hooks`, `utils` 폴더를
미리 만들지 않는다.

## 확장 예시

공개 페이지와 관리자 메뉴 관리가 구현되면 다음 형태로 확장한다.
아래 트리는 배치 기준이며 파일을 미리 생성하라는 뜻은 아니다.

```text
src/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── (site)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── menu/
│   │   │   ├── page.tsx
│   │   │   ├── _components/
│   │   │   └── _data/
│   │   └── visit/
│   │       └── page.tsx
│   ├── (auth)/
│   │   └── admin/login/page.tsx
│   └── (admin)/
│       └── admin/
│           ├── layout.tsx
│           └── menu/
│               ├── page.tsx
│               ├── actions.ts
│               ├── _components/
│               └── _data/
├── shared/
│   ├── lib/
│   ├── supabase/
│   │   ├── browser.ts
│   │   ├── database.types.ts
│   │   ├── proxy.ts
│   │   └── server.ts
│   └── ui/
└── proxy.ts

supabase/
└── migrations/
```

## 배치 규칙

### `src/app`: URL과 렌더링 경계

- 공개 URL은 `app/{route}/page.tsx`로 만든다.
- `page.tsx`와 `layout.tsx`는 라우팅, 권한, 데이터 조합에 집중한다.
- 특정 라우트에서만 쓰는 component, query, type은 해당 라우트
  가까이에 둔다.
- 보조 파일 하나 때문에 폴더를 만들지 않는다. 같은 책임의 파일이
  늘어 탐색이 어려울 때만 `_components`, `_data`를 만든다.
- `loading.tsx`, `error.tsx`, `not-found.tsx`는 실제 대기, 복구 가능한 오류,
  404 상태가 생긴 라우트에만 추가한다.
- `route.ts`는 외부에서 호출할 HTTP endpoint가 실제로 필요할 때만
  만든다. Server Component가 직접 읽을 수 있는 데이터를 내부 API로
  우회하지 않는다.

### route group

- `(site)`는 공개 header·footer layout을 공유한다.
- `(auth)`는 관리자 로그인처럼 인증 전에도 접근해야 하는 페이지를
  담당한다.
- `(admin)`은 인증과 관리자 권한을 검사하는 `/admin/*` layout을
  공유한다.
- route group 이름은 URL에 포함되지 않는다.
- `@slot`, `(.)route`는 URL 기반 modal과 같은 명확한 요구가 생기기 전에는
  사용하지 않는다.

### `src/shared`: 실제 공용 코드

- 둘 이상의 라우트가 같은 책임의 코드를 함께 수정해야 할 때만
  이동한다.
- 공용 UI는 `shared/ui`, 순수 함수는 `shared/lib`, Supabase client와
  생성된 DB type은 `shared/supabase`에 둔다.
- Supabase query는 사용하는 라우트의 `_data`에 둔다. 둘 이상의
  라우트가 같은 query를 함께 바꿔야 할 때만 `shared`로 옮긴다.
- 서로 다른 맥락의 코드가 우연히 비슷하다는 이유로 공용화하지
  않는다.

## 관리자 메뉴 관리

- `/admin/menu` 페이지는 Server Component에서 전체 메뉴를 조회한다.
- 추가·수정·삭제는 같은 라우트의 `actions.ts` Server Action으로
  처리한다.
- `actions.ts`는 입력 검증, Supabase Auth, 관리자 권한, DB 오류,
  변경 후 화면 refresh를 하나의 흐름에서 보여준다.
- 삭제 버튼은 기본적으로 `deleted_at`을 설정하는 soft delete를
  수행한다. 영구 삭제는 복구 기간과 이미지 참조 정책이 정해진 뒤
  별도로 추가한다.
- 이미지 업로드가 포함된 form만 Client Component로 분리하고,
  나머지는 `<form action={serverAction}>`을 우선한다.

## Supabase 배치 규칙

- `shared/supabase/server.ts`는 Server Component, Server Action, Route
  Handler용 client를 생성한다.
- `shared/supabase/browser.ts`는 관리자 Auth, Storage upload 등 browser
  사용처에서만 import한다.
- `shared/supabase/proxy.ts`와 root `proxy.ts`는 Auth token refresh만
  담당한다. 관리자 인가는 `/admin` layout과 RLS에서 다시 확인한다.
- Supabase CLI로 생성한 type은 `database.types.ts`에 두고 임의로
  편집하지 않는다.
- table, index, constraint, RLS, Storage policy 변경은
  `supabase/migrations` SQL로 리뷰한다.

## 파일과 import 규칙

- Next.js 특수 파일명은 프레임워크 규칙(`page.tsx`, `layout.tsx`)을 따른다.
- 일반 파일은 `kebab-case.ts(x)`, React component export는 `PascalCase`를
  사용한다.
- 프로젝트 내부 절대 import는 `@/* → src/*` alias를 사용한다.
- 같은 라우트의 가까운 파일은 상대 경로를 허용한다.
- barrel file은 import 경로를 실제로 단순화할 때만 추가한다.

## 변경 판단 순서

1. 한 라우트에서만 쓰이면 그 라우트에 둔다.
2. 두 번째 사용처가 생겨도 변경 이유가 다르면 중복을 허용한다.
3. 같은 비즈니스 규칙을 함께 수정해야 할 때 `shared`로 이동한다.
4. 새로운 최상위 폴더나 route group이 필요하면 이 문서를 함께
   갱신한다.
