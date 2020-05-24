const Inquiry = require("../models/inquiry.model");

const getInquiryById = async (inquiryId) => {
    const inquiry = await Inquiry.findOne({ _id:inquiryId });
    return inquiry;
} 

const getAllInquries = async () => {
    const inquiries = await Inquiry.find();
    return inquiries;
}

const addInquiry = async (inquiryDto) => {
    const inquiry = new Inquiry();

       inquiry.name = inquiryDto.name;
       inquiry.email = inquiryDto.email;
       inquiry.phone = inquiryDto.phone;
       inquiry.subject = inquiryDto.subject;
       inquiry.description = inquiryDto.description;

    await inquiry.save();

    return inquiry;
}

const markAsReplied = async (inquiryId) => {
    const inquiry = await Inquiry.findOne({ _id:inquiryId });
    inquiry.replied = true;
    
    await inquiry.save();
}



module.exports = {
    getInquiryById,
    getAllInquries,
    addInquiry,
    markAsReplied

};