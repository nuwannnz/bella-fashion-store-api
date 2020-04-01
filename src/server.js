const app = require("./app");
const { PORT } = require("./config");
const { logger } = require("./util");

app.listen(PORT, err => {
  if (err) {
    logger.error(err);
    process.exit(1);
    return;
  }
  logger.info(`
        #############################################
            Bella API listening on port : ${PORT}
        #############################################
    `);
});
