import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '카페 루틴 ROUTINE',
    short_name: 'ROUTINE',
    description: '서울 성북구 카페 루틴의 공식 홈페이지입니다.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#F4F4F1',
    theme_color: '#F4F4F1',
    lang: 'ko-KR',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
