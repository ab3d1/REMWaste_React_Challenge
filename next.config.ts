import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['app.wewantwaste.co.uk'],
  },
  // Additional TypeScript-specific configuration can go here
  typescript: {
    // Enable TypeScript checking during build
    ignoreBuildErrors: false,
    // Optional: Specify tsconfig path if not in root
    // tsconfigPath: './tsconfig.json'
  },
}

export default nextConfig