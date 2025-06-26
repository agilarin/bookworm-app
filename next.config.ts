import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.litres.ru",
        port: "",
        pathname: "/pub/c/**",
        search: "",
      },
    ],
  },
};
// https://cdn.litres.ru/pub/c/cover_415/69576184.webp
export default nextConfig;
