import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Exclude Amplify backend files from Next.js build
  eslint: {
    dirs: ['src'], // Only lint the src directory, not amplify/
  },
  // Exclude amplify directory from TypeScript compilation
  typescript: {
    ignoreBuildErrors: false, // Keep TypeScript checking enabled
  },
}

export default nextConfig