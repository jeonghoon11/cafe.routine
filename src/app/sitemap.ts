import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://cafe-routine.co.kr/' },
    { url: 'https://cafe-routine.co.kr/menu' },
    { url: 'https://cafe-routine.co.kr/visit' },
  ];
}
