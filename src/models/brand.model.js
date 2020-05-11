const mongoose = require("mongoose");

const Brands = new mongoose.Schema(
  {
    brand_name: {
      type:String,
      required: true
    },
    
    brand_added_date: {
      type: Date,
      required: true
    },
},{
  collection: 'brand'
});
 


module.exports = mongoose.model("Brands", Brands);
