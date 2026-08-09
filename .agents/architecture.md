# Source Architecture

```text
src/
├── pages/
│   ├── home/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   ├── menu/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   └── utils/
│   └── visit/
│       ├── components/
│       ├── hooks/
│       └── utils/
├── shared/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── layout/
│   └── utils/
├── App.tsx
├── index.css
└── main.tsx
```

## Placement Rules

- 특정 페이지에서만 사용하는 코드는 `pages/{page}`에 둔다.
- 둘 이상의 페이지에서 사용하는 코드만 `shared`에 둔다.
- 메뉴 데이터는 `pages/menu/data`에서 관리한다.
- 페이지 전용 자산은 해당 페이지 가까이에 두고, 공용 자산만 `shared/assets`에 둔다.
- `App.tsx`는 라우팅, `main.tsx`는 전역 스타일과 Provider 구성을 담당한다.
- 새로운 최상위 폴더는 실제 사용처가 생겼을 때 추가한다.
