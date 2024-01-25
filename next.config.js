/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'th.bing.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
