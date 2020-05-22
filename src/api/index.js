const { Router } = require("express");
const { logger } = require("../util");

const commonMiddleware = require("./middleware/common");
const errorHandlingMiddleware = require("./middleware/errorHanlders");
const customer = require("./routes/customer");
const staffMember = require("./routes/staff-member");
const category = require("./routes/category");

const cart = require("./routes/cart");
const product = require("./routes/product");
const brand = require("./routes/brand");
const order = require("./routes/order");

/** @description Register commonly used middleware
 * @param {Express.Application} app 
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
  customer(router);
  staffMember(router);
  category(router);
  cart(router);
  product(router);
  brand(router);
  order(router);

  return router;
};
