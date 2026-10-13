# 관리자 아이디 로그인 후속 회의

## 일자와 범위

2026-10-13. 관리자 로그인 입력을 이메일에서 아이디로 변경하는 구현을
검토했습니다. 구현 담당은 기존 인증과 관리자 권한에 아이디 입력을 연결합니다.

## 확인한 제약

[Supabase 비밀번호 인증 공식 문서](https://supabase.com/docs/guides/auth/passwords)의
`signInWithPassword()`는 이메일 또는 전화번호를 받습니다. 기존 Auth 계정과
관리자 권한은 `private.admin_users`에서 관리하고, 저장소에 실제 관리자
계정이나 비밀번호는 등록되어 있지 않습니다.

## 결정

- 로그인 화면은 아이디와 비밀번호를 받습니다. 아이디는 최대 64자이고
  대소문자를 구분하며 앞뒤 공백을 제거합니다. 비밀번호는 그대로 전달합니다.
- 서버 전용 `ADMIN_LOGIN_ACCOUNTS` 환경 변수에 아이디와 기존 Auth 이메일을
  연결한 JSON object를 설정합니다. 여러 아이디를 등록할 수 있습니다.
  Supabase Auth의 비밀번호 검증과 session cookie를 사용합니다.
- 서버 환경 설정에는 비밀번호를 저장하지 않습니다. 매핑은 로그인 화면과
  브라우저 번들로 전달하지 않습니다. Supabase가 발급하는 Auth session의
  기존 정보 구조는 유지합니다.
- 등록되지 않은 아이디와 잘못된 비밀번호는 같은 오류로 안내합니다.
  Object prototype의 상속 속성을 계정으로 취급하지 않습니다.
- 매핑이 누락되거나 JSON 형식이 잘못되면 로그인을 허용하지 않습니다.
  설정된 아이디도 `getClaims()`와 `is_admin()` 검사를 통과해야 합니다.
- DB migration이나 서비스 권한 키는 필요하지 않습니다. 최초 Auth 사용자와
  `private.admin_users` 등록은 기존 운영 절차를 사용합니다.

## 운영 설정

[.env.example](../../.env.example)의 `ADMIN_LOGIN_ACCOUNTS`를 로컬 및 배포 서버의
환경 변수에 설정하고 서버를 다시 시작해야 합니다. 실제 사용할 아이디와
연결할 Auth 계정은 운영자가 정합니다. 예시는 다음과 같으며 실제 계정이 아닙니다.

```dotenv
ADMIN_LOGIN_ACCOUNTS='{"manager":"existing-account@example.com"}'
```

비밀번호는 연결된 기존 Auth 계정의 비밀번호입니다. 아이디 매핑만 설정해도
관리자 권한이 생기는 것은 아니며 `private.admin_users`에서 활성 상태여야 합니다.

## 검증

로컬 fake Auth·PostgREST·RPC와 확장 프로그램 없는 Playwright 브라우저에서
로그인 및 세션 흐름을 확인합니다. 운영 Supabase는 호출하지 않습니다.

- 아이디 text 입력, `autocomplete="username"`, 로그인 HTML과 클라이언트
  JavaScript에 이메일 매핑이 포함되지 않는 것을 확인했습니다.
- 비로그인 관리자 경로 접근, 미등록 아이디, 이메일 직접 입력,
  `toString`·`__proto__` 상속 속성, 대소문자가 다른 아이디를 거부했습니다.
- 잘못된 비밀번호는 같은 일반 오류로 안내했고, 매핑된 비관리자 계정은
  권한 검사를 통과하지 못해 session이 회수됐습니다.
- 앞뒤 공백이 있는 올바른 아이디로 로그인하고, 관리자 메뉴 화면 새로고침
  후에도 session이 유지됐습니다. 로그아웃 후 직접 관리자 경로에 접근하면
  로그인으로 이동했습니다.
- 잘못된 JSON 환경 설정에서 인증을 허용하지 않고 `unavailable`로
  안내했습니다. 390px 화면에서 수평 overflow가 없었습니다.
- 확장 없는 브라우저의 로그인 및 관리자 화면에서 hydration 오류가
  없었습니다. favicon 404는 이번 변경과 무관한 발견으로 남깁니다.
- 기존 checkout의 설치된 패키지와 같은 ESLint 설정으로 변경 파일의 lint를
  통과했습니다. 임시 tsconfig로 worktree 전체 source의 TypeScript 검사도
  통과했습니다. 의존성을 추가하거나 설치하지 않았습니다.

이 결과는 실제 Supabase JWT 서명, RLS, 운영 계정의 존재나 설정을 검증하지
않습니다. 실제 아이디와 Auth 이메일 매핑은 운영 환경에 별도로 설정해야 합니다.
