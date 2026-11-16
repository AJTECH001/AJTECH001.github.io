import type { NextConfig } from "next";

// Static export for GitHub Pages. There is no server, so redirects for retired
// URLs are written as static pages by scripts/write-redirects.mjs after build.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
