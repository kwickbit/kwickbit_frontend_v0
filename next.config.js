/* eslint-disable @typescript-eslint/explicit-function-return-type */
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/transactions",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
