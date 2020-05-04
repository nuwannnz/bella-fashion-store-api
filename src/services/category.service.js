const Category = require('../models/category.model');


const getCategory= async () => {
  const category = await Category;
  return category;
}


const createCategory = async (name) => {
    const newCategory = new Category(name);
    await newCategory.save();
    return newCategory;
}

const createSubCategory = async (cname,sbname) => {
  const category = await Category.findOne({ name: cname });
  category.subcategory.push({id:Date.now(), name:sbname});
  await category.save();
  return category;
  
  }

const updateCategory = async (id, newCategoryName) => {
    const category = await Category.findOne({ _id: id });
  
    if (!category) {
      return false;
    }
  
    category.name = newCategoryName;
  
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
  