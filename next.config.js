// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.chec.io',
        port: '',
        pathname: '/merchants/**',
      },
    ],
  },
}