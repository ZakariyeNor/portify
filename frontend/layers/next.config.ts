import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Cloudinary production images
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dcxbs1lon/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
