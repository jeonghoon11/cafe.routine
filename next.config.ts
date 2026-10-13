import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'auto' },
});

const nextConfig: NextConfig = {
  agentRules: false,
  experimental: { serverActions: { bodySizeLimit: '2mb' } },
  images: {
    unoptimized: true,
  },
};

export default withVanillaExtract(nextConfig);
