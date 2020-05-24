const mongoose = require("mongoose");

const Inquiry = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        replied: {
            type: Boolean,
            default:false,
          },
    },
    
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Inquiry", Inquiry);