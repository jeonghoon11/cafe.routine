# 관리자 메뉴 정렬 모션

- status: completed
- goal: 드래그 행이 포인터를 따라 이동하고 주변 행이 자연스럽게 자리를 비우는 모션.
- parent: feat/admin-menu-management
- task: feat/admin-menu-drag-motion
- worktree: /private/tmp/cafe-routine-admin-menu-drag-motion

## 결정과 구현

- 기존 Pointer Events와 stable ul capture 유지. 외부 의존성 추가 없음.
- 잡은 행을 translate3d로 포인터에 맞추고, 주변 행의 이전/현재 위치 차이를 Web Animations로 180ms ease-out 이동. 놓으면 새 위치로 정착.
- 이동 대상은 animation으로 변하는 화면 위치가 아닌 실제 layout slot의 중심을 기준으로 선택해 흔들림을 방지.
- pointercancel/lost capture 시 시작 순서 복구, transform 정리. 드래그 중 저장/취소/위아래 버튼 잠금.
- prefers-reduced-motion에서 위치 전환 애니메이션 생략. 포인터 직접 조작은 유지.
- 서버·DB·저장 계약 변경 없음.

## 검증

- pnpm typecheck, pnpm lint, git diff --check 통과.
- mock E2E 14개 통과: pointer 위치 일치, 잡은 행 스타일, 주변 행 keyframes, 여러 칸 이동, 드래그 중 저장 잠금, 놓은 후 transform 정리, 미저장 DB 보존, 취소 복원, pointercancel 복구, reduced-motion, 저장/새로고침, 390px 가상 touch, 가로 overflow, runtime 오류 없음.
- artifacts: /private/tmp/cafe-routine-menu-motion-{mock.mjs,launch.mjs,e2e.js,e2e-result.txt}. 검증은 localhost 가상 Supabase만 사용.
- 라우팅·설정 변경이 없어 전체 build는 재실행하지 않음. 실제 모바일 기기와 공식 사이트 배포는 확인하지 않음.
