import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Widths tuned to the layout's real breakpoints so Next emits no wasted variants.
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 160, 256, 384, 512],
  },
  poweredByHeader: false,
};

export default nextConfig;
