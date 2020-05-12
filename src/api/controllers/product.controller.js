const productService = require("../../services/product.service");
const { HTTP403Error, HTTP401Error } = require("../../util/httpErrors");

const addProducts = async (req, res, next) => {
  console.log(req.body);
    const {
        product_name,
        product_size_qty,
        product_brand,
        product_category,
        product_sub_category,
        product_price,
        product_discount,
        product_colors,
        product_tags,
        product_description
     } = req.body;

     
  
    try {
      if (!product_name || !product_size_qty || !product_brand || !product_category || !product_sub_category || !product_price || !product_discount || !product_colors || !product_tags || !product_description) {
        // missing fields
        throw new HTTP403Error("Details are required");
      }
      let size = [
        {
          name: 'S',
          qty:12
        },
        {
          name: 'M',
          qty:12
        }
      ]
      const result = await productService.addProduct({
        product_name,
        product_size_qty,
        product_brand,
        product_category,
        product_sub_category,
        product_price,
        product_discount,
        product_colors,
        product_tags,
        product_description
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
      product_name,
      product_size_qty,
      product_brand,
      product_category,
      product_sub_category,
      product_price,
      product_discount,
      product_colors,
      product_tags,
      product_description } = req.body;

      console.log(   _id,
        product_name,
        product_size_qty,
        product_brand,
        product_category,
        product_sub_category,
        product_price,
        product_discount,
        product_colors,
        product_tags,
        product_description)
  
    try {
  
      // get info added by the auth token
      const userInfo = req.decoded;

      
    if (!productService.getProductsById(_id)) {
      throw new HTTP403Error('product id is not valid');
    }

    if (!product_name || !product_size_qty || !product_brand || !product_category || !product_sub_category || !product_price || !product_discount || !product_colors || !product_tags || !product_description) {
      // missing fields
      throw new HTTP403Error("Details are required");
    }
  
      const result = await productService.updateProduct({
        _id,
        product_name,
        product_size_qty,
        product_brand,
        product_category,
        product_sub_category,
        product_price,
        product_discount,
        product_colors,
        product_tags,
        product_description
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