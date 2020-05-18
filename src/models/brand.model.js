const mongoose = require("mongoose");

const Brands = new mongoose.Schema(
  {
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
