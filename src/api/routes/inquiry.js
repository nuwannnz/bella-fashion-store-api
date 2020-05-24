const { Router } = require("express");
const inquiryController = require("../controllers/inquiry.controller");
const { verifyJWTToken } = require("../middleware/auth");


const route = Router();

module.exports = app => {
    app.use("/inquiry", route);

    route.get("/", verifyJWTToken, inquiryController.getInquiry);
    route.post("/", inquiryController.addInquiry);
    route.post("/reply", verifyJWTToken, inquiryController.replyToInquiry);
}