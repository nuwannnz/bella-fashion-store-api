const { Router } = require("express");
const customerController = require("../controllers/customer.controller");
const orderController = require("../controllers/order.controller");
const { verifyJWTToken } = require("../middleware/auth");

// init express router
const route = Router();

module.exports = app => {
  app.use("/customer", route);

  // register all routes
  route.post("/login", customerController.login);
  route.post("/signup", customerController.signUpCustomer);
  route.get("/", verifyJWTToken, customerController.getCustomer);
  route.patch("/", verifyJWTToken, customerController.updateCustomerInfo);
  route.patch("/pwd", verifyJWTToken, customerController.updateCustomerPassword);

  route.post("/address", verifyJWTToken, customerController.addCustomerAddress);
  route.delete("/address/:id", verifyJWTToken, customerController.deleteAddress);
  route.put("/address/:id", verifyJWTToken, customerController.updateAddress);

  route.get("/orders", verifyJWTToken, orderController.getAllOrdersOfCustomer);
  route.get("/inquiry", );
  route.post("/inquiry", );

};
