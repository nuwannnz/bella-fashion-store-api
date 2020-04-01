const { Router } = require("express");
const commonMiddleware = require("./middleware/common");
const user = require("./routes/user");

/** @description Register commonly used middleware
 * @param {Express.Application} app The radius of the circle.
 * @return {void}
 */
const registerCommonMiddleware = app => {
  commonMiddleware(app);
};

exports.registerMiddleware = registerCommonMiddleware;

exports.routes = () => {
  const router = Router();

  // apply routes
  user(router);

  return router;
};
