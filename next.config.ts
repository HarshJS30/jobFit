import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Prevent ESLint errors from blocking production builds
  },
};

export default nextConfig;
