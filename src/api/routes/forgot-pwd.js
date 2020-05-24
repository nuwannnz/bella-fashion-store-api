const { Router } = require("express");
const forgotPwdController = require("../controllers/forgot-pwd.controller");

const route = Router();

module.exports = (app) => {
  app.use("/forgot-pwd", route);

  route.post("/step-1", forgotPwdController.checkEmailStep);
  route.post("/step-2", forgotPwdController.checkCodeStep);
  route.post("/step-3", forgotPwdController.updateCustomerForgotPassword);
};
