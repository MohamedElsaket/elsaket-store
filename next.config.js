/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://elsaket.great-site.net/backend/endpoints/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
