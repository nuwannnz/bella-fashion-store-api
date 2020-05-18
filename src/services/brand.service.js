const Brands = require("../models/brand.model");

const addBrand = async (brandDto) => {
    const newBrand = new Brands();
    newBrand.name = brandDto.name;
    newBrand.addedDate = new Date();

  
    const addedRecord = await newBrand.save();
  
    if (addedRecord) {
      return { success: true };
    }
  
    return { success: false};
  };

  const getBrands = async () => {
    const brand = await Brands.find()
    
    if(!brand) {
      return null
    } 

    return brand;
  }

  const deleteBrandById = async (_id) => {
    const brand = await Products.findOne({ _id });
  
    if (!brand) {
      return null;
    }

    await brand.remove();
    return true;
  }

  module.exports = {
    addBrand,
    getBrands,
    deleteBrandById
  };
