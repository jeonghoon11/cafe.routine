# 관리자 아이디 로그인

- status: completed
- goal: 관리자 로그인에서 아이디를 받고 기존 Supabase Auth와 권한 검사를
  유지한다.
- parent branch: `feat/admin-menu-management`
- login task branch: `feat/admin-username-login`
- login worktree: `/private/tmp/cafe-routine-admin-username`

## 결정과 결과

- `ADMIN_LOGIN_ACCOUNTS` 서버 환경 변수로 여러 아이디를 기존 Auth 이메일에
  연결한다. 비밀번호는 Auth에서 검증하고 관리자 권한은 기존 검사를 유지한다.
- 아이디는 최대 64자, 대소문자 구분, 앞뒤 공백 제거로 처리한다. 알 수 없는
  아이디는 이메일 로그인으로 fallback하지 않는다. 환경 설정 오류는 거부한다.
- 실제 계정 정보나 비밀번호는 커밋하지 않는다. 운영 계정의 존재와 실제
  사용할 아이디는 미확인이므로 운영자가 서버 환경 설정을 완료해야 한다.

## 검증

- TypeScript: 설치된 root 패키지 경로를 지정한 임시 tsconfig로 task source
  전체 검사 통과. ESLint: 같은 root 설정으로 변경 source 검사 통과.
- 로컬 mock Supabase·Playwright E2E: 아이디 로그인 성공/실패, 비관리자
  거부와 session 회수, 새로고침 session 유지, 로그아웃 뒤 접근 차단,
  잘못된 매핑 JSON 거부, 390px UI 확인 통과.
- HTML과 browser JavaScript에 계정 매핑 미노출, clean browser에서 hydration
  오류 없음 확인. 실제 JWT·RLS·운영 데이터의 검증 결과로 해석하지 않는다.
- 테스트 스크립트와 자료: `/private/tmp/cafe-routine-admin-username-e2e.js`,
  `/private/tmp/cafe-routine-admin-username-e2e-artifacts`.

## 후속 사항

- 실제 관리자 아이디·Auth 이메일을 `ADMIN_LOGIN_ACCOUNTS`에 설정하고 서버를
  재시작한다. [로그인 회의록](../../meetings/admin-username-login.md)을 참고한다.
