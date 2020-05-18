const brandService = require("../../services/brand.service");
const { HTTP403Error, HTTP401Error } = require("../../util/httpErrors");
const roleService = require("../../services/role.service");
const staffService = require("../../services/staff.service");
const {uploadImageToAWS} = require('../../util/awsUploader');

const addBrands = async (req, res, next) => {
    console.log(req.body);
      const {name} = req.body;
  
       console.log(name)
    
      try {
        if (!name) {
          // missing fields
          throw new HTTP403Error("Details are required");
        }

        const userInfo = req.decoded;

          // extract image files
        const imageFiles = req.files;
        const imageUrls = [];

        console.log(imageFiles)

        for (let i = 0; i < imageFiles.length; i++) {
          const image = imageFiles[i];
          const imageUrl = await uploadImageToAWS(image);
      
          imageUrls.push(imageUrl);
        }

        console.log(imageUrls)
      
        const result = await brandService.addBrand({name, imageUrls});

        console.log(result)
       
        return res.json(result);
      } catch (error) {
        next(error);
      }
    };

    const getAllBrands = async (req, res, next) => {

        try {
          const brandInfo = req.decoded;
      
          const brand = await brandService.getBrands();
      
          if (!brand) {
            throw new HTTP401Error("Unauthorized");
          }
      
          res.json(brand);
        } catch (error) {
          next(error)
        }
      }

      const deleteBrands = async (req, res, next) => {

        try {

          const brandInfo = req.params.id
          console.log(brandInfo)
          userInfo = req.decoded

          
      // if (
      //   !(await roleService.hasPermission(
      //     await staffService.getRoleOfStaffMember(userInfo.id),
      //     roleService.Permissions.product,
      //     roleService.PermissionModes.write
      //   ))){
      //     throw new HTTP401Error("Unauthorized");
      //   }

          const brand = await brandService.deletebrandById(brandInfo);
      console.log(brand)
          if (!brand) {
            throw new HTTP401Error("Unauthorized");
          }
      
          if (brand) {
            return res.json({ success: true });
          } else {
            return res.json({ success: false });
          }
        } catch (error) {
          next(error)
        }
      }
    
      module.exports = {
        addBrands,
        getAllBrands,
        deleteBrands
      };
    