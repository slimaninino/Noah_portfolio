import type { NextConfig } from "next";

// This project deploys to two targets from one codebase:
//
//  - GitHub Pages: needs a fully static export (no server), so `next build`
//    is run with BUILD_TARGET=github-pages, which enables `output: "export"`.
//  - Vercel (or any Node host): build normally with plain `next build`. Vercel
//    auto-detects Next.js and gets full server features for free — real
//    on-demand image optimization instead of the unoptimized fallback GitHub
//    Pages requires, and the option to add server features (routes, actions)
//    later without touching this file again.
const isGithubPagesBuild = process.env.BUILD_TARGET === "github-pages";

const nextConfig: NextConfig = {
  ...(isGithubPagesBuild && {
    output: "export",
    trailingSlash: true,
  }),
  images: {
    unoptimized: isGithubPagesBuild,
  },
};

export default nextConfig;
