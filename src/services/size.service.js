const Sizes = require("../models/size.model");

const addSize = async (sizeDto) => {
    const newBrand = new Sizes();
    newBrand.name = sizeDto.name;
    newBrand.description = sizeDto.description;
    newBrand.addedDate = new Date();
  
    const addedRecord = await newBrand.save();

    console.log(addedRecord)
  
    if (!addedRecord) {
      return { succeded: false, addedEntry: null };
    }
  
    return { succeded: true, addedEntry: addedRecord};
  };

  const getSizes = async () => {
    const Size = await Sizes.find()
    
    if(!Size) {
      return null
    } 

    return Size;
  }

  const deleteSizeById = async (_id) => {
    const Size = await Sizes.findOne({_id});
    
  
    if (!Size) {
      return null;
    }

  

    await Size.remove();
    return true;
  }

  module.exports = {
    addSize,
    getSizes,
    deleteSizeById
  };
