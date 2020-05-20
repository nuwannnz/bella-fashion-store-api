const sizeService = require("../../services/size.service");
const { HTTP403Error, HTTP401Error } = require("../../util/httpErrors");
const roleService = require("../../services/role.service");
const staffService = require("../../services/staff.service");

const addSizes = async (req, res, next) => {
    console.log(req.body);
      const {name, description} = req.body;
  
    console.log(name, description)
    
      try {
        if (!name || !description) {
          // missing fields
          throw new HTTP403Error("Details are required");
        }

        const userInfo = req.decoded;

      
        const result = await sizeService.addSize({name, description});
       
        return res.json(result);
      } catch (error) {
        next(error);
      }
    };

    const getAllSizes = async (req, res, next) => {

        try {
          const sizeInfo = req.decoded;
      
          const Size = await sizeService.getSizes();
      
          if (!Size) {
            throw new HTTP401Error("Unauthorized");
          }
      
          res.json(Size);
        } catch (error) {
          next(error)
        }
      }

      const deleteSizes = async (req, res, next) => {

        try {

          const sizeInfo = req.params.id
          console.log(sizeInfo)
          userInfo = req.decoded

          
      // if (
      //   !(await roleService.hasPermission(
      //     await staffService.getRoleOfStaffMember(userInfo.id),
      //     roleService.Permissions.product,
      //     roleService.PermissionModes.write
      //   ))){
      //     throw new HTTP401Error("Unauthorized");
      //   }

          const Size = await sizeService.deleteSizeById(sizeInfo);
          if (!Size) {
            throw new HTTP401Error("Unauthorized");
          }
      
          if (Size) {
            return res.json({ success: true });
          } else {
            return res.json({ success: false });
          }
        } catch (error) {
          next(error)
        }
      }
    
      module.exports = {
        addSizes,
        getAllSizes,
        deleteSizes
      };
    