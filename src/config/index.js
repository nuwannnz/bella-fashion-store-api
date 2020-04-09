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
    secret: process.env.JWT_SEC || "combellaapi",
  },

  PORT: process.env.PORT || 5000,
  API_PREFIX: "/api/v1",
};
