const mongoose = require("mongoose");

const Cart = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    expired: {
      type: Boolean,
      required: true,
      default: false,
    },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Products",
        },
        size: String,
        qty: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", Cart);
