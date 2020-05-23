const mongoose = require("mongoose");

const Inquiry = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
);

module.export = mongoose.model("Inquiry", Inquiry);