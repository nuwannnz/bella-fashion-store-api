const productService = require("../../services/product.service");
const { HTTP403Error, HTTP401Error } = require("../../util/httpErrors");

const addProducts = async (req, res, next) => {
  console.log(req.body);
    const {
        name,
        sizeQty,
        brand,
        category,
        subCategory,
        price,
        discount,
        colors,
        tags,
        description
     } = req.body;

     
  
    try {
      if (!name || !sizeQty || !brand || !category || !subCategory || !price || !discount || !colors || !tags || !description) {
        // missing fields
        throw new HTTP403Error("Details are required");
      }
      
      const result = await productService.addProduct({
        name,
        sizeQty,
        brand,
        category,
        subCategory,
        price,
        discount,
        colors,
        tags,
        description
      });
      if (result.success) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      next(error);
    }
  };

  const getAllProducts = async (req, res, next) => {

    try {
      const productInfo = req.decoded;
  
      const product = await productService.getProducts();
  
      if (!product) {
        throw new HTTP401Error("Unauthorized");
      }
  
      res.json(product);
    } catch (error) {
      next(error)
    }
  }

  const getProductsByID = async (req, res, next) => {

    try {
      const productInfo = req.params.id

 
  
      const product = await productService.getProductsById(productInfo);
  
      if (!product) {
        throw new HTTP401Error("Unauthorized");
      }
  
      res.json(product);
    } catch (error) {
      next(error)
    }
  }

  const updateProduct = async (req, res, next) => {
    const { 
      _id,
      name,
      sizeQty,
      brand,
      category,
      subCategory,
      price,
      discount,
      colors,
      tags,
      description } = req.body;

      console.log(   _id,
        name,
        sizeQty,
        brand,
        category,
        subCategory,
        price,
        discount,
        colors,
        tags,
        description)
  
    try {
  
      // get info added by the auth token
      const userInfo = req.decoded;

      
    if (!productService.getProductsById(_id)) {
      throw new HTTP403Error('product id is not valid');
    }

    if (!name || !sizeQty || !brand || !category || !subCategory || !price || !discount || !colors || !tags || !description) {
      // missing fields
      throw new HTTP403Error("Details are required");
    }
  
      const result = await productService.updateProduct({
        _id,
        name,
        sizeQty,
        brand,
        category,
        subCategory,
        price,
        discount,
        colors,
        tags,
        description
      });
  
      if (result) {
        res.json({
          success: true
        })
      } else {
  
        res.json({
          success: false
        })
      }
  
    } catch (error) {
      next(error);
    }
  }

  const deleteProduct = async (req, res, next) => {

    try {
      const productInfo = req.params.id
  
      const product = await productService.deleteProductById(productInfo);
  
      if (!product) {
        throw new HTTP401Error("Unauthorized");
      }
  
      res.json(product);
    } catch (error) {
      next(error)
    }
  }

  module.exports = {
    addProducts,
    getAllProducts,
    getProductsByID,
    updateProduct,
    deleteProduct
  };