import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  allowedDevOrigins: [
    'threefold-expand-unclasp.ngrok-free.app',
    'threefold-expand-unclasp.ngrok-free.dev',
    '*.ngrok-free.app',
    '*.ngrok-free.dev',
  ],
};

export default nextConfig;
