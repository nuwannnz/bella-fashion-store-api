const Products = require("../models/product.model");
const bcrypt = require("bcrypt");

const addProduct = async (productDto) => {
    const newProduct = new Products();
    newProduct.name = productDto.name;
    newProduct.sizeQty = productDto.sizeQty;
    newProduct.brand = productDto.brand;

    newProduct.category = productDto.category;
    newProduct.subCategory = productDto.subCategory;
    newProduct.price = productDto.price;
    newProduct.discount = productDto.discount;
    newProduct.colors = productDto.colors;
    newProduct.tags = productDto.tags;
    newProduct.description = productDto.description;
    newProduct.addedDate = new Date();

  
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

    product.name = productDto.name;
    product.sizeQty = productDto.sizeQty;
    product.brand = productD.brand
    product.category = productDto.category;
    product.subCategory = productDto.subCategory;
    product.price = productDto.price;
    product.discount = productDto.discount;
    product.colors = productDto.colors;
    product.tags = productDto.tags;
    product.description = productDto.description;
    product.updatedDate = new Date();
  
  
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