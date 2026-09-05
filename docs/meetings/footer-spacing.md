# 공용 Footer 여백 회의

## 주제

공용 Footer의 강제 높이(`34svh`/`40svh`)로 인해 발생하는 과도한 빈 공간 문제를 해결하고, Home·Menu·Visit 전체 페이지에서 자연스럽게 어우러지는 콘텐츠 기반 높이와 여백을 확정

## 참여 직군

PD, FE, PM

## 결정 사항과 근거

- **강제 높이 제거**: 데스크톱 `minHeight: '34svh'`와 모바일 `minHeight: '40svh'`를 제거하고, Footer 높이를 콘텐츠와 패딩에 의해 결정되는 자연스러운 높이로 변경합니다. Visit 페이지의 정보 시트 압축 이후 두드러진 하단 여백 불균형을 해소합니다.
- **패딩 수치 확정**:
  - 데스크톱: `padding: '64px 4vw'`로 설정하여 뷰포트 높이(`8vh`)에 따른 가변적 왜곡을 없애고, 큰 워드마크 타이틀과 슬로건 사이에 안정적인 상하 여백을 제공합니다.
  - 모바일: `padding: '48px 20px'`로 설정하여 좁은 화면에서 과도한 수직 공간 낭비를 방지하고, 불필요해진 `justifyContent: 'flex-end'`를 제거합니다.
- **수정 범위 최소화**: 공용 Footer 마크업(`layout.tsx`)이나 다른 페이지를 건드리지 않고, `src/app/(site)/site-shell.css.ts` 단일 파일의 footer 스타일만 최소 수정합니다.

## 담당자별 후속 작업

- FE: `site-shell.css.ts`에서 footer의 `minHeight` 제거 및 확정 패딩 적용, `typecheck`, `lint`, `build` 검증 수행.
- PD: 데스크톱 및 모바일 뷰포트에서 Footer 워드마크·슬로건 정렬 및 각 페이지(Home, Menu, Visit) 하단 여백의 시각적 안정성 검수.
- PM: Home, Menu, Visit 전반의 접근성, 가로 스크롤(overflow 0) 및 브랜드 인지성 충족 여부 확인.

## 완료 기준

- 데스크톱과 모바일 모두에서 Footer의 불필요한 고정 높이(`34svh`, `40svh`)가 제거되고 콘텐츠 높이에 맞게 렌더링됩니다.
- 데스크톱 `64px 4vw`, 모바일 `48px 20px` 패딩이 정확히 적용됩니다.
- `320px`부터 `1920px`까지 전 뷰포트에서 horizontal overflow가 발생하지 않습니다.
- Home, Menu, Visit의 기존 콘텐츠 및 링크 상호작용에 부작용이 없습니다.
- `pnpm typecheck`, `pnpm lint`, `pnpm build`를 통과합니다.

## 재검토 승인 상태와 검증 근거

- **승인**: FE와 PD 재검토에서 Footer 변경 범위의 신규 코드·반응형·접근성·브랜드 회귀가 발견되지 않아 기존 결정과 완료 기준을 충족한 것으로 승인합니다.
- FE: Home `320/800/1920px`, Menu·Visit `320px`, Visit `799/800px`에서 horizontal overflow `0`과 패딩·breakpoint 적용을 확인했고, `pnpm typecheck`, `pnpm lint`, `pnpm build`를 통과했습니다.
- PD: Home·Menu·Visit을 Chromium `320/375/799/800/1440/1920px`에서 검수해 신규 overflow, 잘림, 충돌, 브랜드·접근성 회귀가 없음을 확인했습니다.

## 확대 대응 수정 승인

- **승인**: 320px + 텍스트 200% 확대 시 Header/Footer 워드마크 잘림 문제를 CSS 보정으로 해결했습니다.
- FE: Header에 359px 이하 `flexWrap: 'wrap'`, wordmark에 `flexShrink: 0`, Footer에 359px 이하 `paddingInline: 8` 적용.
- PD: 로고 식별성 유지, 터치 타겟 44px 보장, breakpoint 수치 합리성, wrap 시 시각적 위계 모두 적합 판정.
- 검증: `pnpm typecheck`, `pnpm lint`, `pnpm build` 통과.

## 권장 개선 사항 (후속 검토용)

- Header wrap 시 `paddingBlock: 8~10px` 추가로 상하 호흡 개선.
- Footer `paddingInline`을 12~16px로 조정해 Header·본문과 좌측 기준선 통일.
- `'screen and (max-width: 359px)'`를 `mobile`처럼 상수화.

## 남은 리스크

- 실제 Supabase의 더 긴 slogan 데이터와 Safari/iOS 폰트 렌더링은 이번 재검토에서 확인하지 않았습니다.

## 미결 질문

- 이번 Footer 변경 범위 내 미결 질문은 없습니다.
