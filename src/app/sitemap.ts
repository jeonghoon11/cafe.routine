import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/shared/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/menu` },
    { url: `${SITE_URL}/visit` },
  ];
}
