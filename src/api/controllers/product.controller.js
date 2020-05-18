const productService = require("../../services/product.service");
const { HTTP403Error, HTTP401Error } = require("../../util/httpErrors");
const roleService = require("../../services/role.service");
const staffService = require("../../services/staff.service");
const {uploadImageToAWS} = require('../../util/awsUploader');



const addProducts = async (req, res, next) => {
  console.log(req.body);
    const {
        name,
        sizeQty,
        brand,
        category,
        subCategory,
        price,
        discount,
        colors,
        tags,
        description
     } = req.body;

     
  
    try {
      if (!name || !sizeQty || !brand || !category || !subCategory || !price || !discount || !colors || !tags || !description) {
        // missing fields
        throw new HTTP403Error("Details are required");
      }
      
      const userInfo = req.decoded;

      if (
        !(await roleService.hasPermission(
          await staffService.getRoleOfStaffMember(userInfo.id),
          roleService.Permissions.product,
          roleService.PermissionModes.write
        ))){
          throw new HTTP401Error("Unauthorized");
        }

        
  // extract image files
  const imageFiles = req.files;
  const imageUrls = [];

  // upload images to AWS and retrive URLs
  for (let i = 0; i < imageFiles.length; i++) {
    const image = imageFiles[i];
    const imageUrl = await uploadImageToAWS(image);

    imageUrls.push(imageUrl);
  }

      const result = await productService.addProduct({
        name,
        sizeQty: JSON.parse(sizeQty),
        brand,
        category,
        subCategory,
        price,
        discount,
        colors,
        tags,
        description,
        imageUrls
      });
      
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };

  const getAllProducts = async (req, res, next) => {

    try {
      const productInfo = req.decoded;
  
      const product = await productService.getProducts();
  
      if (!product) {
        throw new HTTP401Error("Unauthorized");
      }
  
      res.json(product);
    } catch (error) {
      next(error)
    }
  }

const updateProduct = async (req, res, next) => {
  const {
    _id,
    name,
    sizeQty,
    brand,
    category,
    subCategory,
    price,
    discount,
    colors,
    tags,
    description } = req.body;

  console.log(_id,
    name,
    sizeQty,
    brand,
    category,
    subCategory,
    price,
    discount,
    colors,
    tags,
    description)

  try {

    // get info added by the auth token
    const userInfo = req.decoded;


    if (!productService.getProductsById(_id)) {
      throw new HTTP403Error('product id is not valid');
    }

    if (!name || !sizeQty || !brand || !category || !subCategory || !price || !discount || !colors || !tags || !description) {
      // missing fields
      throw new HTTP403Error("Details are required");
    }


      if (
        !(await roleService.hasPermission(
          await staffService.getRoleOfStaffMember(userInfo.id),
          roleService.Permissions.product,
          roleService.PermissionModes.write
        ))){
          throw new HTTP401Error("Unauthorized");
        }
  
      const result = await productService.updateProduct({
        _id,
        name,
        sizeQty,
        brand,
        category,
        subCategory,
        price,
        discount,
        colors,
        tags,
        description
      });


      console.log(result)
      console.log(result)
  
      return res.json(result)
  
    } catch (error) {
      next(error);
    }

}

  const deleteProduct = async (req, res, next) => {

    try {
      const productInfo = req.params.id

      const userInfo = req.decoded;

      if (
        !(await roleService.hasPermission(
          await staffService.getRoleOfStaffMember(userInfo.id),
          roleService.Permissions.product,
          roleService.PermissionModes.write
        ))){
          throw new HTTP401Error("Unauthorized");
        }
  
      const product = await productService.deleteProductById(productInfo);
      
      console.log(product)
      if (!product) {
        throw new HTTP401Error("Unauthorized");
      }
      
      if (product) {
        return res.json({ success: true });
      } else {
        return res.json({ success: false });
      }
    } catch (error) {
      next(error)
    }

  
}

  module.exports = {
    addProducts,
    getAllProducts,
    updateProduct,
    deleteProduct
  }
