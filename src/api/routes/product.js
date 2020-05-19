const { Router } = require("express");
const productController = require("../controllers/product.controller");
const { verifyJWTToken } = require("../middleware/auth");
const { multipleImageUpload } = require("../middleware/fileUploads");

// init express router
const route = Router();

module.exports = (app) => {
  //app.use("/staff", route);
  app.use("/products", route);

  // register all routes

  // non-auth routes

  //route.post("/admin/products/add", productController.addProducts);
  route.post("/", multipleImageUpload, productController.addProducts);
  route.get("/", productController.getAllProducts);

  route.get("/:id", productController.getProductsByID);

  // // auth reqired routes
  // route.post("/", verifyJWTToken, staffController.addUser);
  // route.get("/info", verifyJWTToken, staffController.getInfo);
  route.put("/", productController.updateProduct);
  route.delete("/:id", productController.deleteProduct);




};