const brandService = require("../../services/brand.service");
const { HTTP403Error, HTTP401Error } = require("../../util/httpErrors");

const addBrands = async (req, res, next) => {
    console.log(req.body);
      const { name} = req.body;
  
       
    
      try {
        if (!name) {
          // missing fields
          throw new HTTP403Error("Details are required");
        }
      
        const result = await brandService.addBrand({name});
       
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

      const clearBrands = async (req, res, next) => {

        try {
      
          const brand = await brandService.clearBrands();
      
          if (!brand) {
            throw new HTTP401Error("Unauthorized");
          }
      
          res.json({succeded: true});
        } catch (error) {
          next(error)
        }
      }
    
      module.exports = {
        addBrands,
        getAllBrands,
        clearBrands
      };
    