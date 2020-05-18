const mongoose = require("mongoose");

const Products = new mongoose.Schema(
  {
    image:{
      type:String
      
    },
    name: {
      type: String,
      required: true,
    },

    sizeQty: [{
      size: {
        type:String,
        required: true
      }, 
       qty: {
        type: String
        
      }
    }],
    
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    colors: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    addedDate: {
      type: Date,
      required: true
    },
    updatedDate: {
      type: Date,
      
    }
},{
  collection: 'product'
});
 


module.exports = mongoose.model("Products", Products);
