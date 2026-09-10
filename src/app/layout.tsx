import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@seed-design/css/base.css';
import '@seed-design/css/recipes/action-button.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cafe-routine.co.kr'),
  title: 'ROUTINE',
  description:
    '서울 성북구 성신여대입구역 인근 카페 루틴의 공식 홈페이지입니다. 메뉴, 영업시간과 방문 정보를 확인하세요.',
  alternates: {
    canonical: 'https://cafe-routine.co.kr/',
  },
  openGraph: {
    title: '카페 루틴',
    description:
      '서울 성북구 성신여대입구역 인근 카페 루틴의 공식 홈페이지입니다.',
    url: 'https://cafe-routine.co.kr/',
    siteName: '카페 루틴',
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
