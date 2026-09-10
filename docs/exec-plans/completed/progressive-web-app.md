# Progressive Web App

- status: `completed`
- goal: Cafe Routine을 설치 가능한 PWA로 제공한다.
- acceptance criteria: manifest와 192/512px 아이콘이 제공되고, 서비스
  워커가 정적 자산만 precache하며, 존재하지 않는 URL은 404를
  유지한다.
- pull-request branch: `feat/progressive-web-app`
- task branch: `feat/add-pwa-foundation`
- worktree: `/private/tmp/cafe-routine-pwa`
- completed: `src/app/manifest.ts`, `src/app/layout.tsx`, `public/icons/`,
  `public/register-service-worker.js`, `public/sw.js`
- decision: 새 의존성 없이 Next.js metadata route와 브라우저 기본
  Service Worker API만 사용한다. page navigation을 cache하지 않아
  서버의 404 상태를 보존한다.
- verification: `pnpm lint`, `pnpm typecheck`, `pnpm build` 통과. production
  server에서 manifest, 아이콘, 서비스 워커는 200, 임의 URL은 404로
  확인했다.
- follow-up: 배포 후 실제 Android/iOS device에서 설치 UI와 standalone
  실행을 확인한다.
