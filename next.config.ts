import type { NextConfig } from "next";

process.env.NEXT_CPU_NUM = process.env.NEXT_CPU_NUM || "1";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    cpus: 1,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  webpack: (config) => {
    config.parallelism = 1;
    return config;
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
