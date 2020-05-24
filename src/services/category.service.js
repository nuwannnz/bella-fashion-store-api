const Category = require('../models/category.model');
const mongoose = require("mongoose");



const getCategory= async () => {
  const category = await Category.find();
  return category;
}


const createCategory = async (name) => {
    // const newCategory = new Category.findOne({name: name});
    const newCategory = new Category();
    newCategory.name = name;
    await newCategory.save();
    return newCategory;
}

const createSubCategory = async (cname,sbname) => {
  const category = await Category.findOne({ name: cname });
  category.subcategory.push({name:sbname});
  await category.save();
  return category;
  
  }

const updateCategory = async (categoryId,updatedCategoryName) => {
    const category = await Category.findOne({ _id: categoryId });
  
    if (!categoryId) {
      return false;
    }
  
    category.name = updatedCategoryName;
  
    await category.save();
  
    return category;
  
  }

  const updateSubCategory = async (id,sbid, newSubcategoryName) => {
    const category = await Category.findOne({ _id: id });

    if (!category) {
      return false;
    }
  
   category.subcategory = category.subcategory.map(sc=>{
     if(sc.id == sbid){
       sc.name = newSubcategoryName;
     }
     return sc;
   })
    
    await category.save();
    return category;
  }

  const deleteCategory = async(id) => {
    // const category = await Category.findOne({ _id: id });

    // if (!category) {
    //   return false;
    // }
    //category = category.filter(categories => categories._id !== id);
   // cat.subcategory = cat.subcategory.filter(subCat => subCat._id !== 2)
   
    // await category.save();
    const result =  await Category.deleteOne({_id:id});
    return result.deletedCount === 1;
  }

  const deleteSubCategory = async(id,sbid) => {
    const category = await Category.findOne({ _id: id });
    sbid = mongoose.Types.ObjectId(sbid)
    const subCat = category.subcategory.find(sub => sub._id.equals(sbid));

    if (!subCat) {
      return false;
    }
    
    category.subcategory = category.subcategory.filter(sCat => !sCat._id.equals(sbid));
   // cat.subcategory = cat.subcategory.filter(subCat => subCat._id !== 2)
   
    await category.save();
    return category.subcategory;
  }
  
  
  module.exports = {
    getCategory,
    createCategory,
    createSubCategory,
    updateCategory,
    updateSubCategory,
    deleteCategory,
    deleteSubCategory
}
