/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export → generates /out for Hostinger (or any static host).
  output: 'export',
  // /destinations/manali/ → /destinations/manali/index.html (works on Apache without rewrites)
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

module.exports = nextConfig;
