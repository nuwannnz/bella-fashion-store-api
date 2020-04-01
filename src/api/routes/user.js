const { Router } = require("express");
const userController = require("../controllers/user.controller");
const route = Router();

module.exports = app => {
  app.use("/user", route);

  // register all routes
  route.get("/", userController.login);
  route.post("/signup", userController.signUp);
};
