import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/market-lead-engine',
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
