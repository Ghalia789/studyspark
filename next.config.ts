import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  // Produce a standalone build suitable for Docker/containers
  output: 'standalone',
};

export default nextConfig;
