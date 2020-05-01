const mongoose = require("mongoose");

const Role = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  permissions: {
    user: {
      read: Boolean,
      write: Boolean
    },
    category: {
      read: Boolean,
      write: Boolean
    },
    product: {
      read: Boolean,
      write: Boolean
    },
    order: {
      read: Boolean,
      write: Boolean,
    },
    customer: {
      read: Boolean,
      write: Boolean,
    },
    inquiry: {
      read: Boolean,
      write: Boolean,
    },
    sales: {
      read: Boolean,
      write: Boolean,
    }
  }
});

exports.permissionModel = {
  user: {
    read: false,
    write: false
  },
  category: {
    read: false,
    write: false
  },
  product: {
    read: false,
    write: false
  },
  order: {
    read: false,
    write: false,
  },
  customer: {
    read: false,
    write: false,
  },
  inquiry: {
    read: false,
    write: false,
  },
  sales: {
    read: false,
    write: false,
  }
}


module.exports = mongoose.model("Role", Role);
