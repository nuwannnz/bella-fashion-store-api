const { Router } = require("express");
const { logger } = require("../util");

const commonMiddleware = require("./middleware/common");
const errorHandlingMiddleware = require("./middleware/errorHanlders");
const customer = require("./routes/customer");
const staffMember = require("./routes/staff-member");

const cart = require("./routes/cart");
const product = require("./routes/product");
const brand = require("./routes/brand");
const category = require("./routes/category");
const size = require("./routes/size");
const order = require("./routes/order");
const review = require("./routes/product-review");

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
  size(router);
  order(router);
  review(router);


  return router;
};
