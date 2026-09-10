import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import '@seed-design/css/base.css';
import '@seed-design/css/recipes/action-button.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cafe-routine.co.kr'),
  title: 'ROUTINE',
  description: '서울 성북구 카페 루틴의 공식 홈페이지입니다.',
  openGraph: {
    title: 'cafe.routine',
    description: '오늘도 루틴에서 편안한 시간 보내시길 바랍니다 ☕️',
    url: 'https://cafe-routine.co.kr',
    siteName: 'cafe.routine',
    locale: 'ko_KR',
    type: 'website',
  },
  icons: {
    apple: '/icons/icon-192.png',
  },
};

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F4F4F1',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="ko"
      data-seed
      data-seed-color-mode="light-only"
      data-scroll-behavior="smooth"
    >
      <head>
        <script src="/register-service-worker.js" defer />
      </head>
      <body>{children}</body>
    </html>
  );
}
