# 관리자 최종 E2E

- status: completed
- 날짜: 2026-10-13
- goal: 서버 mock DB를 사용한 관리자 최종 브라우저 E2E 및 반응형 검증
- integration branch: `feat/admin-menu-management`
- task branch: `chore/admin-final-e2e`
- worktree: `/private/tmp/cafe-routine-admin-final-e2e`
- 검증 구현 기준: `916abfa`

## 환경과 범위

Node HTTP 서버의 메모리 DB가 Supabase Auth/REST/RPC/Storage 응답을 제공한다. Next.js는 `http://127.0.0.1:54328`을 사용하고 `localhost:3108`에서 실행했다. 서버는 loopback에만 바인딩한다. 테스트 계정과 메뉴는 합성 데이터다. 운영 Supabase URL/key는 실행 환경에서 mock 값으로 대체했으며 운영 메뉴나 파일은 변경하지 않았다.

이 mock은 실제 PostgreSQL이 아니며 JWT 서명, RLS 정책, SQL 잠금·트랜잭션, 실제 Auth refresh와 Storage 서비스의 정확성을 검증하지 않는다. 애플리케이션의 브라우저→Server Action→서버 응답→화면 반영과 실패 처리를 검증한다.

## 실행 결과

| 검증 | 통과 |
| --- | ---: |
| 메뉴·이미지·공개 상태·순서 저장/실패/충돌 | 25 |
| 마우스·키보드·터치와 잘못된 이미지 거부 | 7 |
| 드래그 추종·주변 행 모션·취소·reduced-motion | 14 |
| 아이디 로그인·비관리자·오류·세션 유지 | 15 |
| 화면 폭별 로그인/목록/추가/수정 폼 | 26 |
| 메뉴 수정·삭제·복구·카테고리 이동·로그아웃 | 10 |
| 순서 미저장 상태에서 링크/로그아웃 취소 및 로그아웃 승인(CLI) | 3 |
| 합계 | 100 |

자동 스크립트의 assert 97개와 CLI에서 모달·URL·draft를 확인한 3개다. 독립 테스트 spec 100개 또는 실제 DB 검증 100개를 뜻하지 않는다. 삭제·복구·카테고리 이동의 마지막 배치는 mock이 SQL 동작을 흉내 낸 결과다.

- Playwright CLI / Chromium 실브라우저에서 실행했다.
- 폭 `320, 360, 390, 768, 1280, 1440`px, 로그인·목록·추가·수정 페이지에서 가로 넘침과 조작 요소 잘림이 없었다.
- 390px에서 CDP touch event로 정렬을 확인했다. 실물 스마트폰 테스트는 아니다.
- 390px·1440px 로그인/목록/추가/수정 8개 및 390px 순서 편집 1개 스크린샷을 직접 확인했다.
- 이미지 선택·재선택·교체·제거, 공개 이미지 실제 decode, 업로드 실패 입력 유지, DB 저장 실패 시 새 파일·메타 정리, 기존 공유 이미지 보존을 확인했다.
- 순서 draft는 저장 전 DB에 반영되지 않으며 취소·실패·동시 변경·재시도·새로고침을 확인했다.
- hydration mismatch와 pageerror는 테스트 범위에서 발견되지 않았다.
- 개발 서버의 `/favicon.ico` 404는 별도 발견이다. 해당 asset 수정은 이번 범위에 포함하지 않았다.

## 검증 명령

- `pnpm typecheck`: 통과
- `pnpm lint --ignore-pattern 'output/**' --ignore-pattern '.playwright-cli/**'`: 통과. 생성된 검증 스크립트·로그는 제품 lint 대상에서 제외했다.
- mock 환경의 `pnpm build`: 통과(11개 정적 페이지 생성). 디스크 부족으로 webpack 캐시 저장에 `ENOSPC` 경고가 있었지만 빌드는 exit 0으로 완료했다.
- `git diff --check`: 통과.

## 로컬 재실행 자료

작업트리 `output/playwright/`에 mock-server.mjs, launch.mjs, E2E 스크립트, 실행 결과와 PNG를 보존했다. 이 생성 자료는 Git commit에 포함하지 않으며 저장소를 새로 clone하면 생기지 않는다. 소스 변경 없이 테스트했고 새 의존성을 설치하지 않았다.

```sh
cd /private/tmp/cafe-routine-admin-final-e2e
node output/playwright/mock-server.mjs
# 별도 터미널
node output/playwright/launch.mjs
playwright-cli -s=final-root open http://localhost:3108/admin/login
# run-code에 각 *.js 파일의 전체 async(page) 함수를 전달한다.
```

스크립트는 공유 mock DB를 사용하므로 media→extra 순으로 실행하고 motion 전에 `/test/reset`을 POST한다. auth는 새 브라우저 세션에서 실행한다. 테스트 입력 파일은 `/private/tmp/menu-fixture.png`, `menu-invalid.svg`, `menu-oversize.png`, `menu-corrupt.png`에 있다. mock은 프로세스 재시작 또는 reset으로 초기화된다. launch.mjs는 보존된 작업트리의 Next binary와 의존성 경로를 사용한다.

## 결정과 한계

- 기능을 막는 결함은 발견되지 않아 제품 소스 수정 없이 검증 기록만 추가한다.
- FE·PD 코드 검토와 PM 수용 기준을 반영했다. 에이전트 사용량 제한으로 개별 브라우저 검토와 BE 검토는 중단됐으며 최종 브라우저 검토는 Codex가 담당했다.
- 운영 PostgreSQL/RLS/Storage 쓰기, 실물 모바일, WebKit/Safari, 공식 사이트 배포는 미실행이다.
- 기존 정렬 이탈 보호는 링크·로그아웃·beforeunload에 적용한다. 같은 문서 내 브라우저 뒤로가기와 메뉴 입력 폼의 미저장 이탈은 보호 범위에 포함되지 않는다.
