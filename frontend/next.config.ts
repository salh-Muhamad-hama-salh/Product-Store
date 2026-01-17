import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ✅ allow ALL HTTPS image domains
      },
      {
        protocol: "http",
        hostname: "**", // ✅ allow ALL HTTP image domains
      },
    ],
  },
};

export default nextConfig;
