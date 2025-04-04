module.exports = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.notion.so"
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://www.notion.so'
          }
        ]
      }
    ]
  }
}