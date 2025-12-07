/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    outputFileTracingIncludes: {
      '/*': ['./lib/generated/prisma/**/*'],
      '/api/**': ['./lib/generated/prisma/**/*'],
    },
  },
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
