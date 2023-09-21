/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_ACCESSTOKEN_PRIVATE_KEY: "accessTokenKhoitran",
    JWT_REFRESHTOKEN_PRIVATE_KEY: "refreshTokenKhoitran",
    SERVER_URL: "http://localhost:80",
  },
};
module.exports = nextConfig;
