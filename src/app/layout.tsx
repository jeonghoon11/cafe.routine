import type { Metadata } from 'next';
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
    description:
      'Everyday 11:00 - 22:00\n오늘도 루틴에서\n편안한 시간 보내시길 바랍니다 ☕️',
    url: 'https://cafe-routine.co.kr',
    siteName: 'cafe.routine',
    locale: 'ko_KR',
    type: 'website',
  },
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
        <meta name="color-scheme" content="light" />
      </head>
      <body>{children}</body>
    </html>
  );
}
