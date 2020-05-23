const mongoose = require("mongoose");

const ProductReview = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Types.ObjectId,
            ref: "Customer",
            required: true,
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Products",
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String
        },
        upVotes: {
            type: Number,
            default: 0
        },
        downVotes: {
            type: Number,
            default: 0
        },
        images: [String]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("ProductReview", ProductReview);
