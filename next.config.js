/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname:
          'cloudinary://275495128522211:0NEpXhYMxSxRSenVVVFchFlFnVw@dmntpv6mf/**',
      },
    ],
  },
};

export default nextConfig;
