/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    USER_ID: process.env.USER_ID,
    STORE_ID: process.env.STORE_ID,
  },
};

module.exports = nextConfig;
