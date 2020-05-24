const  categoryService = require("../../services/category.service");
const { HTTP403Error } = require("../../util/httpErrors");


const getCategory= async (req, res, next ) => {

    try {

      const categories = await categoryService.getCategory();
      console.log(categories);

      //const menCat = categories.find(category => category.name === 'men');
      //const subCat = menCat.subcategory.find(sub => sub._id === "5ebba6d20a128f03e886d371");


      // cat.subcategory = cat.subcategory.filter(subCat => subCat._id !== 2)
      /*
        [

          {
            name:"category 1 name",
            subCategory:[
              { id: 1, name: "subcategoty "},
              { id: 2, name: "subcategoty "},
            ]
          },
          {
            name:"category 2 name",
            subCategory:[
              { id: 1, name: "subcategoty "},
              { id: 1, name: "subcategoty "},
            ]
          }
        ]
      */
      // const result = {
      //   category: {
      //     name: categories.name,
      //     subcategory: [{
      //       id: subcategory.id,
      //       name: subcategory.name
      //     }]

      //   }
      // };
  
      return res.json(categories);
    } catch (error) {
      next(error)
    }
  }

  const newCategory = async (req, res, next) => {
    const {  categoryName } = req.body;
  
    try {
      if (categoryName === null ) {
        // invalid role object
        throw new HTTP403Error('Missing or invalid fields in categories');
      }
  
      const category =  await categoryService.createCategory(categoryName);
      return res.json(category);
    } catch (error) {
      next(error);
    }
  }

  const newSubCategory = async (req, res, next) => {
    const { category,subcategory } = req.body;
  
    try {
      if (subcategory === null ) {
        // invalid role object 
        throw new HTTP403Error('Missing or invalid fields in subcategories');
      }
  
      const updatedCategory = await categoryService.createSubCategory(category,subcategory);
      return res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }

  const updateCategory = async (req, res, next) => {
    const { categoryId,updatedCategoryName } = req.body;
  
    try {
  
      if (updatedCategoryName == null) {
        throw new HTTP403Error('Please add a name for new Category');
      }
  
      const result = await categoryService.updateCategory(categoryId,updatedCategoryName);
  
      if (result) {
        return res.json(result)
      } else {
        res.json({
          success: false
        })
      }
  
    } catch (error) {
      next(error);
    }
  }

  const updateSubCategory = async (req, res, next) => {
    const { id,sbid, newSubcategoryName } = req.body;
  
    try {
  
      if (newSubcategoryName == null) {
        throw new HTTP403Error('Please add a name for new Sub-Category');
      }
  
      const result = await categoryService.updateSubCategory(id, sbid, newSubcategoryName);
  
      if (result) {
        return res.json(result)
      } else {
        res.json({
          success: false
        })
      }
  
    } catch (error) {
      next(error);
    }
  }

  const deleteCategory =  async(req, res, next) => {
    const id = req.params.id;
    try{
      if (id == null) {
        throw new HTTP403Error('Something Wrong with category ID');
      }
      const result = await categoryService.deleteCategory(id);
  
      if (result) {
        return res.json({
          success: true
        })
      } else {
        res.json({
          success: false
        })
      }
  
    } catch (error) {
      next(error);
    }
  }

  const deleteSubCategory =  async(req, res, next) => {
    const id = req.params.catId;
    const sbid = req.params.subCatId;
    try{
      if (sbid == null) {
        throw new HTTP403Error('Something Wrong with Sub-category ID');
      }
      const result = await categoryService.deleteSubCategory(id,sbid);
  
      if (result) {
        return res.json({
          success: true
        })
      } else {
        res.json({
          success: false
        })
      }
  
    } catch (error) {
      next(error);
    }
  }
  
  
  module.exports = {
    getCategory,
    newCategory,
    newSubCategory,
    updateCategory,
    updateSubCategory,
    deleteCategory,
    deleteSubCategory

  };
  