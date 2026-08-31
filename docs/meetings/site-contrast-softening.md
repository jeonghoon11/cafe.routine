# 전체 사이트 대비 완화 회의

## 목적

순수한 검정·흰색 대비를 완화하되 Cafe Routine의 Black & White 방향, 정보 위계와 핵심 CTA 인지성을 유지합니다.

## 참여 직군

FE, PD, PM

## 합의한 팔레트

- Ink: `#101112`
- Paper: `#F4F4F1`
- primary, secondary, tertiary 텍스트와 divider는 각 배경에서 기존 위계와 접근 가능한 대비를 유지하도록 적용합니다.

## 페이지별 적용

- Home: dark·light section을 Ink와 Paper로 교체하고 기존 Hero와 핵심 링크 위계를 유지했습니다. 공간 사진은 full color를 유지했습니다.
- Menu: Paper 배경에서 카테고리, 메뉴명, 설명, 가격, 품절과 fallback의 정보 위계를 유지했습니다.
- Visit: Ink intro, Paper Address primary, Ink Hours/Contact의 section 전환과 지도→전화→Instagram CTA 우선순위를 유지했습니다.
- Shell: header·footer·skip link의 배경과 텍스트를 새 팔레트에 맞추되 navigation과 focus-visible을 유지했습니다.

## 하지 않은 것

- gradient 추가
- 색 전환 애니메이션 추가
- 사진 filter 적용
- 레이아웃 변경

## 검증

- `typecheck`, `lint`, diff check 통과
- `1440px`, `390px`에서 가로 overflow `0`
- keyboard focus-visible과 핵심 링크·CTA 순서 유지
- PD 최종 검수 `PASS`

## 알려진 무관 이슈

- 기존 `favicon.ico` 404가 있으며 이번 팔레트 변경과 무관합니다.
