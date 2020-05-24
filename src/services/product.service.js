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
  newProduct.images = productDto.imageUrls


  const addedRecord = await newProduct.save();

  if (addedRecord) {
    return { success: true, addedEntry: addedRecord };
  }

  return { success: false, addedEntry: null };
};

const getProducts = async () => {
  const product = await Products.find()

  if (!product) {
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
  product.sizeQty = JSON.parse(productDto.sizeQty);
  product.brand = productDto.brand
  product.category = productDto.category;
  product.subCategory = productDto.subCategory;
  product.price = productDto.price;
  product.discount = productDto.discount;
  product.colors = productDto.colors;
  product.tags = productDto.tags;
  product.description = productDto.description;

  if(productDto.imageUrls.length > 0){
    product.images = productDto.imageUrls

  }
  product.updatedDate = new Date();


  await product.save();

  if (!product) {
    return null;
  }

  return product;

}

const deleteProductById = async (_id) => {

  const product = await Products.findOne({ _id });

  if (!product) {
    return false;
  }

  await product.remove();
  return true;
}

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProductById,
  getProductsById
}
