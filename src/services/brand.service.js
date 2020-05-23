const Brands = require("../models/brand.model");

const addBrand = async (brandDto) => {
    const newBrand = new Brands();
    newBrand.name = brandDto.name;
    newBrand.images = brandDto.imageUrls;
    newBrand.addedDate = new Date();

    console.log(newBrand.images)
  
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

  const deletebrandById = async (_id) => {
    const brand = await Brands.findOne({_id});
    
  
    if (!brand) {
      return null;
    }

  

    await brand.remove();
    return true;
  }

  module.exports = {
    addBrand,
    getBrands,
    deletebrandById
  };
