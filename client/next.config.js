/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: 'http://3.91.185.146:4000/api/:path*',
        },
      ],
    }
  },
}

module.exports = nextConfig;
