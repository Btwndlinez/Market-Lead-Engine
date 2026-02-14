import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/Market-Lead-Engine',
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
