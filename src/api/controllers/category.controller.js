const  categoryService = require("../../services/category.service");
const { HTTP403Error } = require("../../util/httpErrors");


const getCategory= async (req, res, next) => {

    try {

      const categories = await categoryService.getCategory();
      
      const result = {
        category: {
          name: categories.name,
          subcategory: [{
            id: subcategory.id,
            name: subcategory.name
          }]

        }
      };
  
      return res.json(result);
    } catch (error) {
      next(error)
    }
  }

  const newCategory = async (req, res, next) => {
    const { category } = req.body;
  
    try {
      if (category === null ) {
        // invalid role object
        throw new HTTP403Error('Missing or invalid fields in categories');
      }
  
      await categoryService.createCategory(category);
      return res.json({ success: true });
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
  
      await categoryService.createSubCategory(category,subcategory);
      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  const updateCategory = async (req, res, next) => {
    const { id, newCategoryName } = req.body;
  
    try {
  
      if (newCategoryName == null) {
        throw new HTTP403Error('Please add a name for new Category');
      }
  
      const result = await staffService.updateCategory(id, newCategoryName);
  
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

  const updateSubCategory = async (req, res, next) => {
    const { id,sbid, newSubcategoryName } = req.body;
  
    try {
  
      if (newSubcategoryName == null) {
        throw new HTTP403Error('Please add a name for new Sub-Category');
      }
  
      const result = await staffService.updateCategory(id, sbid, newCategoryName);
  
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
    updateSubCategory

  };
  