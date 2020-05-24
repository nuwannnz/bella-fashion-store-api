const Homepage = require('../models/hompage.model')
const mongoose = require('mongoose');

const createHomePage = async () => {
    const homepage = new Homepage();
    await homepage.save();
}

const createBanner = async (bannerDto) => {
    const homepage = (await Homepage.find())[0];

    homepage.banners.push(bannerDto);

    await homepage.save();

    return homepage.banners.pop();
}

const createCategoryBanner = async (bannerDto) => {
    const homepage = (await Homepage.find())[0];
    homepage.categoryBanners.push(bannerDto);
    await homepage.save();
    return homepage.categoryBanners.pop();
}

const deleteBanner = async (bannerId) => {
    const homepage = (await Homepage.find())[0];

    bannerId = mongoose.Types.ObjectId(bannerId);
    homepage.banners = homepage.banners.filter(b => !b._id.equals(bannerId));

    await homepage.save();
    return true;
}

const deleteCategoryBanner = async (bannerId) => {
    const homepage = (await Homepage.find())[0];
    bannerId = mongoose.Types.ObjectId(bannerId);
    homepage.categoryBanners = homepage.categoryBanners.filter(b => !b._id.equals(bannerId));

    await homepage.save();
    return true;
}

const getAllBanners = async () => {
    const homepage = (await Homepage.find())[0];

    return homepage.banners;
}
const getAllCategoryBanners = async () => {
    const homepage = (await Homepage.find())[0];

    return homepage.categoryBanners;
}

module.exports = {
    createBanner,
    createHomePage,
    createCategoryBanner,
    deleteBanner,
    deleteCategoryBanner,
    getAllBanners,
    getAllCategoryBanners
}