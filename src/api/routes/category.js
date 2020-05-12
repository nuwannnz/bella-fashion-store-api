const { Router } = require("express");
const categoriesController = require("../controllers/category.controller");
const { verifyJWTToken } = require("../middleware/auth");


const route = Router();

module.exports = (app) => {
  app.use("/category", route);

  // register all routes

  // admin categories
  app.post('/', function(req, res){
    categoriesController.newCategory()
  });

  app.get('/', function(req, res){
    categoriesController.getCategory()
  });

  app.put('/', function(req, res){
    categoriesController.updateCategory()
  });

  app.post('/subcategory', function(req, res){
    categoriesController.newSubCategory()
  });


  app.put('/subcategory', function(req, res){
    res.categoriesController.updateSubCategory()
  });


  

};