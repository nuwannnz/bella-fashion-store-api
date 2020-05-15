const Brands = require("../models/brand.model");

const addBrand = async (brandDto) => {
    const newBrand = new Brands();
    newBrand.name = brandDto.name;
    newBrand.addedDate = new Date();

  
    const addedRecord = await newBrand.save();
  
    if (!addedRecord) {
      return { succeded: false, addedEntry: null };
    }
  
    return { succeded: true, addedEntry: addedRecord};
  };

  const getBrands = async () => {
    const brand = await Brands.find()
    
    if(!brand) {
      return null
    } 

    return brand;
  }

  const clearBrands = async () => {
    const brand = await Brands();
    
  
    if (!brand) {
      return null;
    }

  

    await brand.remove();
    return true;
  }

  module.exports = {
    addBrand,
    getBrands,
    clearBrands
  };
