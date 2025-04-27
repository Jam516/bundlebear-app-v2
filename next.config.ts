import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/erc4337-overview/all',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
