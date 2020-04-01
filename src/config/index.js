const appRoot = require("app-root-path");

module.exports = {
  database: {
    uri:
      process.env.DB_URI ||
      "mongodb://<dbuser>:<dbpassword>@ds115353.mlab.com:15353/bella-fashion-store",
    username: process.env.DB_USERNAME || "bella",
    password: process.env.DB_PASSWORD || "bella@1234"
  },

  env: process.env.NODE_ENV || "development",

  logger: {
    errorFilePath: `${appRoot}/logs/error.log`,
    combinedFilePath: `${appRoot}/logs/combined.log`
  },

  jwt: {
    secret: process.env.JWT_SEC || "combellaapi"
  },

  PORT: process.env.PORT || 5000,
  API_PREFIX: "/api/v1"
};
