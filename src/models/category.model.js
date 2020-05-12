const mongoose = require("mongoose");

const category = new mongoose.Schema(
  {
  name: {
    type: String,
    required: true,
    unique: true
  },
  subcategory: [{
    id: {
      type:Number,
      required: true,
      unique: true
    },
    sbname: {
      type: String,
      required: true,
      unique: true
    }
  }]
});


module.exports = mongoose.model("category", category);
