const { Router } = require("express");
const customerController = require("../controllers/customer.controller");
const { verifyJWTToken } = require("../middleware/auth");

// init express router
const route = Router();

module.exports = app => {
  app.use("/customer", route);

  // register all routes
  route.post("/login", customerController.login);
  route.post("/signup", customerController.signUpCustomer);
  route.get("/", verifyJWTToken, customerController.getCustomer);
};