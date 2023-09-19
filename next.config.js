/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_ACCESSTOKEN_PRIVATE_KEY: "accessTokenKhoitran",
    JWT_REFRESHTOKEN_PRIVATE_KEY: "refreshTokenKhoitran",
    SERVER_URL: " 54.81.143.84:443",
  },
};
module.exports = nextConfig;
