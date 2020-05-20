const { Router } = require("express");
const categoriesController = require("../controllers/category.controller");
const { verifyJWTToken } = require("../middleware/auth");


const route = Router();

module.exports = (app) => {
  app.use("/category", route);

  // register all routes

  // admin categories
  route.post('/', categoriesController.newCategory);

  route.get('/',categoriesController.getCategory);

  route.put('/',categoriesController.updateCategory);
  route.delete('/:id',categoriesController.deleteCategory);
  route.delete('/:catId/:subCatId',categoriesController.deleteCategory);


  route.post('/subcategory',categoriesController.newSubCategory);

  route.put('/subcategory', categoriesController.updateSubCategory);


  

};