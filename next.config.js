/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
});

module.exports = nextConfig;
