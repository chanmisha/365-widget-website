import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve AASA file with correct Content-Type for Apple Universal Links
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [
          { key: "Content-Type", value: "application/json" },
        ],
      },
    ];
  },
};

export default nextConfig;
