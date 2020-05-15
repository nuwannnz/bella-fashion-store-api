const { Router } = require("express");
const brandContorller = require("../controllers/brand.contoroller");
const { verifyJWTToken } = require("../middleware/auth");

// init express router
const route = Router();

module.exports = (app) => {
  //app.use("/staff", route);
   app.use("/brands", route);

  // register all routes

  // non-auth routes

  //route.post("/admin/products/add", productController.addProducts);
  route.post("/", brandContorller.addBrands);
  route.get("/", brandContorller.getAllBrands);
  

  // // auth reqired routes
  // route.post("/", verifyJWTToken, staffController.addUser);
  // route.get("/info", verifyJWTToken, staffController.getInfo);

  route.delete("/", brandContorller.clearBrands);

};