const { Router } = require("express");
const homepageController = require("../controllers/homepage.controller");
const { verifyJWTToken } = require("../middleware/auth");
const { multipleImageUpload } = require("../middleware/fileUploads");


// init express router
const route = Router();

module.exports = app => {
    app.use("/homepage", route);

    // register all routes
    route.post("/banners", verifyJWTToken, multipleImageUpload, homepageController.createBanner);
    route.post("/category-banners", verifyJWTToken, multipleImageUpload, homepageController.createCategoryBanner);

    route.get("/banners", homepageController.getAllBanners);
    route.get("/category-banners", homepageController.getAllCategoryBanners);

    route.delete("/banners/:bannerId", verifyJWTToken, homepageController.deleteBanner);
    route.delete("/category-banners/:bannerId", verifyJWTToken, homepageController.deleteCategoryBanner);


};
