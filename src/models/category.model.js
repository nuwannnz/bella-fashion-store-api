const mongoose = require("mongoose");

const category = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true
  },
  subcategory: [{
    id: {
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
