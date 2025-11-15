/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "http://elsaket-store.atwebpages.com/backend/endpoints/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
