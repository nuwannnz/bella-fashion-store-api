const { Router } = require("express");
const sizeContorller = require("../controllers/size.controller");
const { verifyJWTToken } = require("../middleware/auth");
const { multipleImageUpload } = require("../middleware/fileUploads");

// init express router
const route = Router();

module.exports = (app) => {
  //app.use("/staff", route);
   app.use("/sizes", route);

  // register all routes

  // non-auth routes

  //route.post("/admin/products/add", productController.addProducts);
  route.post("/",verifyJWTToken, sizeContorller.addSizes);
  route.get("/", sizeContorller.getAllSizes);
  

  // // auth reqired routes
  // route.post("/", verifyJWTToken, staffController.addUser);
  // route.get("/info", verifyJWTToken, staffController.getInfo);

  route.delete("/:id", verifyJWTToken ,sizeContorller.deleteSizes);

};