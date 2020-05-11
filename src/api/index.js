const { Router } = require("express");
const { logger } = require("../util");

const commonMiddleware = require("./middleware/common");
const errorHandlingMiddleware = require("./middleware/errorHanlders");
const user = require("./routes/user");
const staffMember = require("./routes/staff-member");
const product = require("./routes/product");
const brand = require("./routes/brand");
/** @description Register commonly used middleware
 * @param {Express.Application} app The radius of the circle.
 * @return {void}
 */
const registerCommonMiddleware = (app) => {
  commonMiddleware(app);
};

const registerErrorHandlingMiddleware = (app) => {
  errorHandlingMiddleware(app);
};

exports.registerMiddleware = registerCommonMiddleware;
exports.registerErrorHandlers = registerErrorHandlingMiddleware;

exports.routes = () => {
  logger.info("registering routes");
  const router = Router();

  // apply routes
  user(router);
  staffMember(router);
  product(router);
  brand(router);

  return router;
};
