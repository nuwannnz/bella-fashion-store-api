const mongoose = require("mongoose");

const Products = new mongoose.Schema(
  {
    product_image:{
      type:String
      
    },
    product_name: {
      type: String,
      required: true,
    },

    product_size_qty: [{
      size: {
        type:String,
        required: true
      }, 
       qty: {
        type: String
        
      }
    }],
    
    product_brand: {
      type: String,
      required: true,
    },
    product_category: {
      type: String,
      required: true,
    },
    product_sub_category: {
      type: String,
      required: true,
    },
    product_price: {
      type: String,
      required: true,
    },
    product_discount: {
        type: String,
        required: true,
    },
    product_colors: {
        type: String,
        required: true,
    },
    product_tags: {
        type: String,
        required: true,
    },
    product_description: {
        type: String,
        required: true,
    },
    product_added_date: {
      type: Date,
      required: true
    },
    product_updated_date: {
      type: Date,
      
    }
},{
  collection: 'product'
});
 


module.exports = mongoose.model("Products", Products);
