const mongoose = require("mongoose");

const Brands = new mongoose.Schema(
  {
    images: [String],
    name: {
      type:String,
      required: true
    },
    
    addedDate: {
      type: Date,
      required: true
    },
},{
  collection: 'brand'
});
 


module.exports = mongoose.model("Brands", Brands);
