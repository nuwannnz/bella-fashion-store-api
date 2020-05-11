const brandService = require("../../services/brand.service");
const { HTTP403Error, HTTP401Error } = require("../../util/httpErrors");

const addBrands = async (req, res, next) => {
    console.log(req.body);
      const { brand_name} = req.body;
  
       
    
      try {
        if (!brand_name) {
          // missing fields
          throw new HTTP403Error("Details are required");
        }
      
        const result = await brandService.addBrand({brand_name});
        if (result.success) {
          res.json({ success: true });
        } else {
          res.json({ success: false });
        }
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

      const deleteBrand = async (req, res, next) => {

        try {
          const brandInfo = req.params.id
      
          const brand = await brandService.deleteBrandById(brandInfo);
      
          if (!brand) {
            throw new HTTP401Error("Unauthorized");
          }
      
          res.json(brand);
        } catch (error) {
          next(error)
        }
      }
    
      module.exports = {
        addBrands,
        getAllBrands,
        deleteBrand
      };
    