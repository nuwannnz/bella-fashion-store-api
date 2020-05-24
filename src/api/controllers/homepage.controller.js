const homepageSerivce = require('../../services/homepage.service')
const { uploadImageToAWS } = require('../../util/awsUploader');


const createBanner = async (req, res, next) => {
    const { link } = req.body;
    try {

        // extract image files
        const imageFiles = req.files;

        // upload images to AWS and retrive URLs

        const image = imageFiles[0];
        const imageUrl = await uploadImageToAWS(image);

        const result = await homepageSerivce.createBanner({ link, image: imageUrl })

        return res.json(result);
    } catch (error) {
        next(error);
    }
}

const createCategoryBanner = async (req, res, next) => {
    const { link, text } = req.body;
    try {

        // extract image files
        const imageFiles = req.files;

        // upload images to AWS and retrive URLs

        const image = imageFiles[0];
        const imageUrl = await uploadImageToAWS(image);

        const result = await homepageSerivce.createCategoryBanner({ link, image: imageUrl, text })

        return res.json(result);
    } catch (error) {
        next(error);
    }
}


const deleteCategoryBanner = async (req, res, next) => {
    const bannerId = req.params.bannerId;
    try {


        const result = await homepageSerivce.deleteCategoryBanner(bannerId);

        return res.json(result);
    } catch (error) {
        next(error);
    }
}

const deleteBanner = async (req, res, next) => {
    const bannerId = req.params.bannerId;
    try {


        const result = await homepageSerivce.deleteBanner(bannerId);

        return res.json(result);
    } catch (error) {
        next(error);
    }
}

const getAllBanners = async (req, res, next) => {

    try {


        const result = await homepageSerivce.getAllBanners();

        return res.json(result);
    } catch (error) {
        next(error);
    }
}

const getAllCategoryBanners = async (req, res, next) => {

    try {


        const result = await homepageSerivce.getAllCategoryBanners();

        return res.json(result);
    } catch (error) {
        next(error);
    }
}



module.exports = {
    createBanner,
    createCategoryBanner,
    deleteBanner,
    deleteCategoryBanner,
    getAllBanners,
    getAllCategoryBanners
}
