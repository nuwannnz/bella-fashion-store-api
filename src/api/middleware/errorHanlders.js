const ErrorHandler = require("../../util/errorHandlers");
const { logger } = require("../../util");

const logErrors = (err, req, res, next) => {
  logger.error(err);
  next(err);
};

const handleClientErrors = (err, req, res, next) => {
  ErrorHandler.clientError(err, res, next);
};

const handleServerErrors = (err, req, res, next) => {
  ErrorHandler.serverError(err, res, next);
};

module.exports = (app) => {
  app.use(logErrors);
  app.use(handleClientErrors);
  app.use(handleServerErrors);
};
