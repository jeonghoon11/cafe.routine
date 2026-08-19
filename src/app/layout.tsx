import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@seed-design/css/base.css';
import '@seed-design/css/recipes/action-button.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'ROUTINE',
  description: '서울 성북구 카페 루틴의 공식 홈페이지입니다.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" data-seed data-seed-color-mode="light-only">
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body>{children}</body>
    </html>
  );
}
