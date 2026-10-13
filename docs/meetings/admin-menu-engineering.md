# 관리자 메뉴 인증·데이터 구현 회의

## 주제

관리자 로그인, 권한 검사, 메뉴 CRUD 데이터 경계와 로컬 UI 흐름 검증

## 참여 직군

FE, BE, PM, PD

## 일자

2026-10-13

## 참고 레퍼런스

- [Supabase SSR client for Next.js](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs&queryGroups=framework), [Supabase Next.js tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs): cookie 기반 SSR과 `getClaims()` 인증 흐름을 참고합니다.
- [Next.js `proxy.ts`](https://nextjs.org/docs/app/api-reference/file-conventions/proxy), [Next.js `cookies()`](https://nextjs.org/docs/app/api-reference/functions/cookies): 요청별 token refresh와 비동기 cookie API 기준을 확인합니다.
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security), [`signInWithPassword`](https://supabase.com/docs/reference/javascript/auth-signinwithpassword): RLS 권한 경계와 이메일·비밀번호 로그인 API를 참고합니다.
- 저장소 기준: [Next.js App Router와 Supabase](../nextjs.md), [파일 배치와 관리자 메뉴 구조](../architecture.md), [초기 schema 및 RLS](../../supabase/migrations/20260809000000_initial_schema.sql), [메뉴 seed와 unique index](../../supabase/migrations/20260819000000_seed_menu_and_home_media.sql).

## 결정 사항과 근거

- `/admin/login`에서 이메일·비밀번호로 로그인합니다. 가입 화면은 두지 않고 사전 등록된 계정만 사용합니다. 운영자가 임의 가입해 관리자 권한을 얻는 경로를 만들지 않습니다.
- `@supabase/ssr` cookie client를 사용합니다. Proxy는 관리자 경로의 Auth token refresh만 담당하고, 관리자 권한 판단은 별도 서버 경계에서 수행합니다.
- 관리자 layout과 모든 메뉴 CRUD Server Action은 `getClaims()`로 서명된 token을 확인한 뒤 `rpc('is_admin')`으로 활성 관리자 여부를 확인합니다. 비관리자 및 검증 오류는 통과시키지 않습니다.
- 로그인 상태는 Supabase 사용자 session cookie로 유지하고, DB의 RLS를 최종 쓰기 권한 경계로 둡니다. 브라우저 코드와 서버 mutation에서 `service_role` key를 사용하지 않습니다.
- 메뉴 mutation Server Action은 `FormData`를 검증한 뒤 인증·관리자 권한을 확인하고 mutation합니다. 메뉴명, 카테고리 ID, 가격과 순서의 형식·범위를 앱에서 검증하고, 가격 0 이상·순서 0 이상 등 DB constraint도 유지합니다.
- mutation은 Supabase 오류뿐 아니라 결과 행도 확인합니다. 갱신·삭제·복구 대상이 없어 0행이 바뀐 경우 성공으로 안내하지 않습니다. 변경마다 `updated_at`을 action에서 직접 갱신합니다.
- mutation 성공 후 `/menu`와 `/admin/menu`를 revalidate해 방문자 공개 화면과 관리자 목록을 갱신합니다.
- 저장소 초기 migration의 공개 `menu_items` RLS policy는 `is_published AND deleted_at IS NULL` 행만 허용하고, 관리 쓰기는 `is_admin()`으로 제한합니다. 따라서 이번 작업에 새 RLS policy migration은 추가하지 않습니다. 운영 Supabase의 실제 policy 상태는 조회하지 않았으며, 이 결정은 저장소 migration에 근거합니다.
- 기존 전체 unique index `(category_id, name)`을 유지하고 새 partial index나 migration은 추가하지 않습니다. 삭제된 동명 항목이 있으면 새 행을 만들지 않고 그 항목을 복구합니다. 같은 카테고리에 동명의 활성 항목이 있으면 추가를 거절하고 사용자가 이름을 확인할 수 있는 오류를 표시합니다.
- 운영 환경은 사용하지 않습니다. 로컬 mock Auth·PostgREST·RPC와 Playwright UI E2E로 로그인 분기와 메뉴 관리 화면 흐름을 검증합니다. 이 검증은 실제 Supabase JWT 서명, RLS policy, DB constraint 실행을 증명하지 않습니다.

## 실행 결과

- **FE:** `/admin/login`과 cookie SSR, `/admin/*` token refresh, 권한 layout, 메뉴 조회·폼·상태 피드백을 구현했습니다. 모바일 390px 화면도 확인했습니다.
- **BE:** Server Action 입력 검증, claims·`is_admin` 검사, 오류·영향 행 확인, `updated_at`, `/menu`와 `/admin/menu` 재검증을 구현했습니다. DB migration은 추가하지 않았습니다.
- **PD:** 등록된 메뉴의 공개·판매·삭제 상태를 구분하고, soft-delete 확인과 복구를 포함한 데스크톱·모바일 흐름을 확인했습니다.
- **PM:** 공개 상태와 판매 상태를 분리하고, 신규 메뉴 기본값을 공개·판매 중으로 정했으며, 메뉴 CRUD의 완료 기준을 확인했습니다.

## 완료 기준

- 로그아웃 상태에서 `/admin/menu`에 접근하면 로그인으로 안내되고, 사전 등록된 활성 관리자만 관리 화면과 CRUD action을 통과합니다. 가입 경로는 없습니다.
- `/admin/*` 이동과 새로고침 뒤에도 유효한 cookie session이 유지됩니다. 비관리자, 비활성 관리자, claims/RPC 검증 실패는 관리 작업을 수행할 수 없습니다.
- layout과 각각의 CRUD Server Action이 모두 claims 및 `is_admin` 검사를 실행하며, 데이터베이스 mutation은 RLS와 user session을 사용합니다. `service_role` secret은 클라이언트로 전달되지 않습니다.
- 잘못된 `FormData`, 제약 위반, 중복 메뉴, DB 오류, 변경 행 없음이 성공으로 오인되지 않고 화면에 구분 가능한 오류를 표시합니다.
- 메뉴 추가·수정·삭제·복구 성공 뒤 `/menu`와 `/admin/menu`가 갱신됩니다. soft-delete 행은 공개 메뉴에서 숨겨지고 복구 시 기존 unique 제약을 지킵니다.
- 로컬 mock 기반 Playwright E2E에서 비로그인 진입, 관리자 로그인과 세션 유지, 비관리자 거부, 메뉴 추가·수정·상태 변경·삭제·복구를 확인합니다. 실제 JWT·RLS·운영 DB 검증은 별도 제한으로 보고합니다.

## 검증 기록

- `pnpm lint`와 같은 ESLint 설정으로 변경한 route·Supabase 파일을 검사했고, TypeScript 검사를 통과했습니다. worktree에는 의존성을 복사하거나 설치하지 않고 기존 checkout의 패키지를 사용했습니다.
- production build를 fake Supabase endpoint에 연결해 통과했습니다. `/admin/login`, `/admin/menu`, 신규·수정 화면이 동적 경로로 생성됐습니다.
- Playwright 브라우저에서 비로그인 redirect, 비관리자 거부, 관리자 새로고침 후 session 유지, 추가, 가격·품절 수정, 확인 없는 삭제 차단, soft-delete, 복구를 확인했습니다.
- 변경 뒤 공개 `/menu`에 항목, 가격과 품절 상태가 갱신되는지 확인했습니다. mock의 데이터와 사용 계정은 메모리에서만 유지했고 운영 환경을 호출하지 않았습니다.

## 미결 질문

- 배포 전 최초 활성 관리자 계정을 누가 생성하고 `private.admin_users`에 등록할지 운영 담당자를 확정해야 합니다.
- 이번 회의에서는 운영 Supabase의 실제 RLS policy를 조회하지 않았습니다. 배포 시점에 migration과 운영 policy가 일치하는지 누가 확인할지 정해야 합니다.
- 다른 기기에서 Supabase Auth session을 회수했을 때 즉시 반영해야 하는지 미정입니다. 즉시 반영이 요구되면 token claims 외에 `getUser()` 조회를 추가할지 별도 판단이 필요합니다.
- 사전 등록된 Auth 계정이지만 활성 관리자 목록에 없는 사용자의 로그인 후 UX(403 안내 또는 로그인 화면 복귀)를 확정해야 합니다.
- 로컬 mock E2E가 실제 Auth/RLS/DB 보안을 대체하지 않으므로, 운영 반영 전 실제 환경에서 최소한의 권한 검증을 누가 어떤 절차로 수행할지 정해야 합니다.

이 문서는 운영 계정 책임과 배포 전 검증 범위가 확정되면 같은 주제의 후속 회의에서 갱신합니다.
