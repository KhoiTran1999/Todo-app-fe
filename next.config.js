/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_ACCESSTOKEN_PRIVATE_KEY: "accessTokenKhoitran",
    JWT_REFRESHTOKEN_PRIVATE_KEY: "refreshTokenKhoitran",
    SERVER_URL: " 3.88.30.158:443",
  },
};
module.exports = nextConfig;
