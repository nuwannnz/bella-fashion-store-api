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
    isNewCustomer: Boolean,
    lastLogin: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Customer", Customer);
