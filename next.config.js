// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Credentials',
              value: 'true'
            },
            {
              key: 'Access-Control-Allow-Origin',
              value: process.env.NEXT_PUBLIC_URL || '*'
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET,DELETE,PATCH,POST,PUT'
            }
          ]
        }
      ]
    }
  }
  
  module.exports = nextConfig