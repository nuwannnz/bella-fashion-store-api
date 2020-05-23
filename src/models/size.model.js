const mongoose = require("mongoose");

const Sizes = new mongoose.Schema(
  {

    name: {
      type:String,
      required: true
    },

    description : {
        type:String,
        required: true
    },
    addedDate: {
      type: Date,
      required: true
    },
},{
  collection: 'Size'
});
 


module.exports = mongoose.model("Sizes", Sizes);
