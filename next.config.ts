import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Applique les headers à toutes les routes
        headers: [
          {key: "Cache-Control", value: "public, max-age=31536000, immutable"}, // Cache longue durée pour les assets
          {key: "X-Content-Type-Options", value: "nosniff"}, // Sécurité contre le MIME sniffing
          {key: "X-Frame-Options", value: "DENY"}, // Empêche le clickjacking
          {key: "X-XSS-Protection", value: "1; mode=block"}, // Protection contre les attaques XSS
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pyxwemjnkxpxcfpyilsq.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;