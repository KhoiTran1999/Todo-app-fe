exports.env = {
  JWT_ACCESSTOKEN_PRIVATE_KEY:
    process.env.JWT_ACCESSTOKEN_PRIVATE_KEY || "accessTokenKhoitran",
  JWT_REFRESHTOKEN_PRIVATE_KEY:
    process.env.JWT_REFRESHTOKEN_PRIVATE_KEY || "refreshTokenKhoitran",
  SERVER_URL: process.env.SERVER_URL || "http://localhost:3200",
};
