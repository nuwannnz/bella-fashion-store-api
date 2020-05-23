const mongoose = require("mongoose");
const Inquiry = require("../models/inquiry.model");

const getAllInquries = async () => {
    const inquiries = await Inquiry.find().populate("customer");
    return inquiries;
}

module.exports = {
    getAllInquries

};