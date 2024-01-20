/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ZEGO_APP_ID: 891436823,
    NEXT_PUBLIC_ZEGO_SERVER_ID: "1dfd641de17ad9cd56abc88a6492ebf7"
  },
  images: {
    domains: ["localhost"],
  }
};

module.exports = nextConfig;
