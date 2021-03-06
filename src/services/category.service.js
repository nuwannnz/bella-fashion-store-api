const Category = require('../models/category.model');


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
  
    return true;
  
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
    return true;
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
    const subCat = category.subcategory.find(sub => sub._id === sbid);

    if (!subCat) {
      return false;
    }
    category.subCat = category.subCat.filter(subCat => subCat._id !== sbid);
   // cat.subcategory = cat.subcategory.filter(subCat => subCat._id !== 2)
   
    await category.save();
    return true;
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
