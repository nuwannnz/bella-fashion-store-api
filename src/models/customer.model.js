const mongoose = require("mongoose");

const Customer = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true
    },
    lName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    addresses: [{
      fName: {
        type: String,
        required: true
      },
      lName: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      street: {
        type: String,
        required: true
      },
      town: {
        type: String,
        required: true
      },
      zip: {
        type: String,
        required: true
      }
    }],
      wishList: [{
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Products"
        }
      }],
    isNewCustomer: {
      type: Boolean,
      default: true
    },
    lastLogin: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Customer", Customer);
