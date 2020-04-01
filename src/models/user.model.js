const mongoose = require("mongoose");

const User = new mongoose.Schema(
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
      unique: true
    },
    password: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", User);
