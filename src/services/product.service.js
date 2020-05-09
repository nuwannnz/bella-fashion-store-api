const Products = require("../models/product.model");
const bcrypt = require("bcrypt");

const addProduct = async (productDto) => {
    const newProduct = new Products();
    newProduct.product_name = productDto.product_name;
    newProduct.product_size_qty = productDto.product_size_qty;
    newProduct.product_brand = productDto.product_brand;

    newProduct.product_category = productDto.product_category;
    newProduct.product_sub_category = productDto.product_sub_category;
    newProduct.product_price = productDto.product_price;
    newProduct.product_discount = productDto.product_discount;
    newProduct.product_colors = productDto.product_colors;
    newProduct.product_tags = productDto.product_tags;
    newProduct.product_description = productDto.product_description;
    newProduct.product_added_date = new Date();

  
    const addedRecord = await newProduct.save();
  
    if (addedRecord) {
      return { success: true };
    }
  
    return { success: false};
  };

  const getProducts = async () => {
    const product = await Products.find()
    
    if(!product) {
      return null
    } 

    return product;
  }

  const getProductsById = async (_id) => {
    const product = await Products.findOne({ _id });

    
  
    if (!product) {
      return null;
    }
  
    return product;
  }

  const updateProduct = async (productDto) => {
    const product = await Products.findOne({ _id: productDto._id });

    if (!product) {
      return false;
    }

    console.log(product._id);

    product.product_name = productDto.product_name;

    product.product_size_qty = productDto.product_size_qty;

    product.product_brand = productDto.product_brand;
    product.product_category = productDto.product_category;
    product.product_sub_category = productDto.product_sub_category;
    product.product_price = productDto.product_price;
    product.product_discount = productDto.product_discount;
    product.product_colors = productDto.product_colors;
    product.product_tags = productDto.product_tags;
    product.product_description = productDto.product_description;
    product.product_updated_date = new Date();
  
  
    await product.save();
  
    return true;
  
  }

  const deleteProductById = async (_id) => {
    const product = await Products.findOne({ _id });


    
  
    if (!product) {
      return null;
    }

    await product.remove();
    return true;
  }

  module.exports = {
    addProduct,
    getProducts,
    getProductsById,
    updateProduct,
    deleteProductById
  };