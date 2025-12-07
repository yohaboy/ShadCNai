/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  outputFileTracingIncludes: {
    '/*': ['../lib/generated/prisma/**/*'],
    '/api/**': ['../lib/generated/prisma/**/*'],
  },
}

export default nextConfig
