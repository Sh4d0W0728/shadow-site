import type { NextConfig } from "next";

const isPagesBuild = process.env.GITHUB_PAGES === "true";
// "/<repo>" for project pages, "" for a <user>.github.io repository.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "0.0.0.0"],
  // Partial prerendering cannot be combined with static export.
  cacheComponents: !isPagesBuild,
  partialPrefetching: !isPagesBuild,
  ...(isPagesBuild && {
    output: "export",
    basePath,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
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
