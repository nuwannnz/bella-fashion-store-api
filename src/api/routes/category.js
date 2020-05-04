const { Router } = require("express");
const categoriesController = require("../controllers/category.controller");
const { verifyJWTToken } = require("../middleware/auth");


const route = Router();

module.exports = (app) => {
  app.use("/category", route);

  // register all routes

  // admin categories
  route.post("/category", verifyJWTToken, categoriesController.newCategory);
  route.get("/category",  categoriesController.getCategory);
  route.put("/category",verifyJWTToken, categoriesController.updateCategory);
  route.post("/category", verifyJWTToken, categoriesController.newSubCategory);
  route.put("/category", verifyJWTToken, categoriesController.updateSubCategory);

};