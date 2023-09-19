/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_ACCESSTOKEN_PRIVATE_KEY: "accessTokenKhoitran",
    JWT_REFRESHTOKEN_PRIVATE_KEY: "refreshTokenKhoitran",
    SERVER_URL: "52.90.225.105:3200",
  },
};
module.exports = nextConfig;
