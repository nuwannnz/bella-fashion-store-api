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

  // role routes
  route.post("/role", verifyJWTToken, staffController.addRole);
  route.get("/role", verifyJWTToken, staffController.getAllRoles);
  route.put("/role/:id", verifyJWTToken, staffController.updateRole);
  route.delete("/role/:id", verifyJWTToken, staffController.deleteRole);

  // // auth reqired routes
  route.get("/", verifyJWTToken, staffController.getAllUsers);
  route.get("/:id", verifyJWTToken, staffController.getUser);
  route.post("/", verifyJWTToken, staffController.addUser);
  route.put("/:id", verifyJWTToken, staffController.updateUser);
  route.patch("/pwd", verifyJWTToken, staffController.updateTemporaryPassword);
  route.delete("/:id", verifyJWTToken, staffController.deleteUser);
};
