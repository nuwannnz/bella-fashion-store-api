const mongoose = require("mongoose");

const Order = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Types.ObjectId,
            ref: "Customer",
            required: true,
        },
        addressId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        paymentMethod: {
            type: String,
            required: true
        },
        items: [
            {
                product: {
                    type: mongoose.Types.ObjectId,
                    ref: "Products",
                },
                size: String,
                qty: Number,
            },
        ],
        isCompleted: {
            type: Boolean,
            default: false
        },
        totalValue: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", Order);
