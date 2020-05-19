const appRoot = require("app-root-path");

module.exports = {
  database: {
    uri: process.env.DB_URI || "localhost",
    username: process.env.DB_USERNAME || "test",
    password: process.env.DB_PASSWORD || "test",
  },

  env: process.env.NODE_ENV || "development",

  logger: {
    errorFilePath: `${appRoot}/logs/error.log`,
    combinedFilePath: `${appRoot}/logs/combined.log`,
  },

  jwt: {
    secret: process.env.JWT_SECRET || "combellaapi",
    tokenOptions: {
      expiresIn: "1d",
      issuer: "bella-fashion-store",
    },
  },

  PORT: process.env.PORT || 5000,

  API_PREFIX: "/api/v1",

  SEND_GRID_KEY: process.env.SENDGRID_API_KEY,

  email: {
    mainAddr: "bella.fashions.api@gmail.com",
  },

  AWS: {
    ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    BUCKET_NAME: process.env.AWS_BELLA_IMAGE_BUCKET_NAME,
  },
};
