import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  transpilePackages: ["next-mdx-remote"],
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
