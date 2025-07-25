import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isProd && {
    output: "standalone",
    assetPrefix: "/",
  }),
};

export default nextConfig;
