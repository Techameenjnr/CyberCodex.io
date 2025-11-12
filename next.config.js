/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei'],
  },
  // Allow dev server access from local network (mobile testing, etc.)
  allowedDevOrigins: [
    'http://192.168.0.12:3000',
    'http://192.168.0.12',
  ],
};

module.exports = nextConfig;
