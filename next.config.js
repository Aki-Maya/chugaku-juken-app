/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  env: {
    GOOGLE_SHEETS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY,
    GOOGLE_SHEETS_ID: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID,
  },
}

module.exports = nextConfig
