const mongoose = require("mongoose");
const { database } = require("../config");
const { logger } = require("../util");

module.exports = () => {
  mongoose
    .connect(database.uri, {
      auth: {
        user: database.username,
        password: database.password
      },
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      logger.info("Database connected");
    })
    .catch(err => {
      logger.error(err);
      process.exit(1);
    });
};
