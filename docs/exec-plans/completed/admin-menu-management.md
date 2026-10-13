# Task Context: 관리자 메뉴 관리

- status: `completed`
- goal: 운영자가 `/admin/menu`에서 메뉴를 추가·수정·soft-delete·복구하고, 로그인·세션·관리자 권한을 안전하게 유지합니다.
- acceptance: 기존 메뉴 공개 query와 RLS 경계를 유지하고, 입력·권한·DB 결과를 검증하며 공개 `/menu`를 mutation 뒤 갱신합니다. 운영 DB에는 접속하지 않고 로컬 mock E2E를 완료합니다.
- branches: parent `feat/admin-menu-management`; task `feat/implement-admin-menu`
- worktree: `/private/tmp/cafe-routine-admin-menu`

## 완료한 작업

- `/admin/login`, Auth cookie SSR, `/admin/*` Proxy token refresh, 관리자 layout 권한 확인, 메뉴 목록·추가·수정·삭제·복구를 구현했습니다.
- 로그인 계정은 사전 등록 계정만 허용합니다. layout과 각 메뉴 mutation은 `getClaims()`와 `is_admin()`을 확인하고 user session과 RLS를 사용합니다.
- 목록은 카테고리별 공개·판매·삭제 상태를 분리해 표시합니다. 폼은 이름, 설명, 가격, 순서, 카테고리와 상태를 관리하고 서버에서 값을 다시 검증합니다.
- PM·PD 결정과 로그인·데이터 경계 회의 결과는 [`admin-menu-product-design.md`](../../meetings/admin-menu-product-design.md), [`admin-menu-engineering.md`](../../meetings/admin-menu-engineering.md)에 기록했습니다.
- route structure와 인증·Supabase 운영 원칙은 [`architecture.md`](../../architecture.md), [`nextjs.md`](../../nextjs.md)에 반영했습니다.

## 결정과 이유

- 저장소 migration에 public menu filter, admin `is_admin()` policy, 전체 `(category_id, name)` unique index가 이미 있어 DB migration을 추가하지 않았습니다.
- 삭제는 `deleted_at` soft-delete로 유지하고 복구를 제공합니다. 영구 삭제, category CRUD, 이미지 업로드, 검색·일괄 편집은 후속 범위로 남겼습니다.
- 새 메뉴 기본값은 공개·판매 중입니다. 삭제된 동명 메뉴는 새로 만들기보다 복구하도록 안내합니다.

## 검증 결과

- 변경 route·Supabase 파일 ESLint 통과, TypeScript strict 검사 통과, Prettier 검사 통과, `git diff --check` 통과.
- 로컬 mock Auth·PostgREST로 production build 통과.
- Playwright E2E에서 비로그인 접근, 비관리자 거부, 관리자 새로고침 뒤 session 유지, 추가, 가격·품절 수정, 미확인 삭제 차단, soft-delete, 복구를 확인했습니다. 공개 `/menu`도 저장 상태와 일치했습니다.
- 390px mobile list와 form을 눈으로 확인했습니다.

## 남은 risk와 후속

- 로컬 mock은 실제 Supabase JWT 서명, 운영 RLS policy, DB constraint, Storage 동작을 검증하지 않습니다. 배포 전 운영 project의 migration/RLS 일치 여부와 최초 Auth 계정 및 `private.admin_users` 등록을 확인해야 합니다.
- 이미지를 수정·업로드하지 않습니다. 운영자가 이미지도 관리해야 한다면 별도 Storage 정책과 업로드 흐름을 설계해야 합니다.
