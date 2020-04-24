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
  route.post("/admin/signup", staffController.signupAdmin);
  route.get("/admin/has", staffController.hasAdmin);

  // // auth reqired routes
  // route.post("/", verifyJWTToken, staffController.addUser);
  // route.get("/info", verifyJWTToken, staffController.getInfo);
  route.put("/pwd", verifyJWTToken, staffController.updateTemporaryPassword);
  route.get("/", verifyJWTToken, staffController.getUser);
};
