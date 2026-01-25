import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.entresaisons.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

