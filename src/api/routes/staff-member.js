const { Router } = require("express");
const staffController = require("../controllers/staff.controller");
const { verifyJWTToken } = require("../middleware/auth");

// init express router
const route = Router();

module.exports = (app) => {
  app.use("/staff", route);

  // register all routes

  // non-auth routes
  route.post("/login", staffController.login);
  // route.post("/admin/signup", staffController.signupAdmin);

  // // auth reqired routes
  // route.post("/", verifyJWTToken, staffController.addUser);
  // route.get("/info", verifyJWTToken, staffController.getInfo);
  // route.put("/pwd", verifyJWTToken, staffController.updatePassword);
};
