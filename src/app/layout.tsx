import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { SITE_URL } from '@/shared/site';

import '@seed-design/css/base.css';
import '@seed-design/css/recipes/action-button.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'ROUTINE',
  description:
    '서울 성북구 성신여대입구역 인근 카페 루틴의 공식 홈페이지입니다. 메뉴, 영업시간과 방문 정보를 확인하세요.',
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: '카페 루틴',
    description:
      '서울 성북구 성신여대입구역 인근 카페 루틴의 공식 홈페이지입니다.',
    url: `${SITE_URL}/`,
    siteName: '카페 루틴',
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
