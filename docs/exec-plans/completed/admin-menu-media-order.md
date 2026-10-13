# 관리자 메뉴 이미지·상태·정렬

- status: completed
- 상위 branch: feat/admin-menu-management
- task branch: feat/admin-menu-media-order
- worktree: /private/tmp/cafe-routine-admin-menu-media-order

## 목표와 결정

- 메뉴마다 이미지 한 장을 목록에 표시하고 폼에서 선택·교체·제거. 저장 시 적용. 기존 공유 파일은 연결만 해제하고 보존. JPG/PNG/WebP 1MB 이하, magic 검증 및 브라우저 디코딩 치수 범위 검증.
- 판매 중(공개)/비공개 단일 상태, 기존 published AND available로 해석. 공개 쿼리/RLS 둘 다 AND.
- 카테고리별 순서 편집 모드, 포인터 드래그+위아래 버튼, 명시 순서 저장/취소. 비공개 포함/삭제 제외. 미저장 이탈 경고, 편집 중 메뉴 추가·수정·복구 차단.
- 원자 RPC reorder_menu_items(p_category_id,p_expected,p_ids), ID/order/updated_at 스냅샷으로 충돌 거부. 신규/카테고리 이동 맨 뒤, 일반수정 순서 보존.

## 담당과 진행

- PM/PD/FE/BE 검토 완료, FE 단일 제품 코드 및 SQL 구현 담당.
- PM은 docs/meetings/admin-menu-order-and-status.md와 admin-menu-images.md 분리 기록.
- root 가상 Supabase mock 및 E2E 준비. 운영 데이터 쓰기 테스트 금지.
- 로컬 기존 node_modules hardlink 사용, 의존성 설치/추가 없음. .env.local은 root ignored 파일 symlink, 검증 프로세스 env는 localhost mock으로 override.

## 완료와 운영 확인

- FE/BE 코드·SQL 검토 및 로컬 검증 완료.
- 사용자 승인 후 운영 migration 트랜잭션 성공. 읽기전용 카탈로그 결과: RPC등록 true, trigger_enabled true, 공개정책 `(is_published AND is_available AND deleted_at IS NULL)`, anon_execute false, authenticated_execute true.
- 운영 메뉴 상태·순서·이미지 자체는 변경하지 않음. 실제 Storage upload/RLS쓰기·동시transaction은 가상 검증과 코드 리뷰로만 확인.
- 같은 문서의 브라우저 Back은 native 취소 API가 없어 차단하지 않음. 저장·취소 후 이동 필요. 제거/교체된 공유 Storage파일 보존, 비공개도 기존 publicURL 직접접근가능.
- 상위 branch 통합 후 로컬 개발서버에서 사용 가능. push/PR/공식사이트 배포는 하지 않음.

## 검증 기록

- `pnpm typecheck`, `pnpm lint`, `pnpm build` 모두 통과. 빌드 공개 데이터도 localhost 가상 Supabase만 사용.
- 25개 기본 브라우저 검증: 상태 노출/숨김, 정렬 미저장/취소/실패/재시도/stale 거부, 신규이미지/같은파일재선택/실패입력유지/신규자산정리/목록·공개이미지decode/교체·제거/일반수정순서보존/390px/hydration.
- 7개 추가: 실제 마우스 1→3칸 drag, 키보드, SVG/초과용량/손상파일 거부, 390px폼, CDP 가상 touchStart/Move/End.
- 3개 이탈확인: 미저장 링크 취소, 로그아웃 취소의 세션·초안유지, 로그아웃 승인 후 로그인페이지 이동.
- 검증 발견수정: 행DOM이동에 의한 capture소실 → stable ul에 capture; form submit 이탈도 guard; 파일input reset/controlled필드 유지.
- artifacts: /private/tmp/cafe-routine-menu-media-{mock.mjs,launch.mjs,e2e.js,e2e-result.txt,extra-e2e.js,extra-e2e-result.txt}. 가상 계정/fixture는 운영데이터와 무관.
- 실제 PostgreSQL에는 migration 문법/등록 성공만 확인. 실제 운영 메뉴·Storage 쓰기와 경쟁transaction 테스트 안함.

- 이미지 기반 운영 설정도 읽기전용 확인: authenticated media_assets insert true, 관리자 Storage ALL policy 존재 true, 공개 site-assets bucket 존재 true. 실제 파일 업로드는 가상 환경에서만 검증.
