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
const inquiry = require("./routes/inquiry");
const review = require("./routes/product-review");

const forgotPwd = require("./routes/forgot-pwd");
const homepage = require("./routes/homepage");



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
  inquiry(router);
  review(router);

  forgotPwd(router);
  homepage(router);

  homepage(router);



  return router;
};
