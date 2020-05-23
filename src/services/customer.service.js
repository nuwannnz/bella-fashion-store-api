const Customer = require("../models/customer.model");
const { hashPassword } = require("../util");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const productService = require("./product.service");

/**@description Check whether the given email and password combination is
 * correct
 *
 * @param {string} email - Email of the customer
 * @param {string} password - Password of the customer
 * @returns {boolean} True if the credentials are correct and false otherwise
 */
const login = async (email, password) => {
  const result = {
    isAuth: false,
  };
  const customer = await Customer.findOne({ email });
  if (!customer) {
    return result;
  }

  const passwordMatches = await bcrypt.compare(password, customer.password);

  if (passwordMatches) {
    result.isAuth = true;

    if (customer.isNewCustomer) {
      customer.isNewCustomer = false;
      await customer.save();
    }

    return result;
  } else {
    return result;
  }
};

const signUp = async (customerDto) => {
  const newCustomer = new Customer();
  newCustomer.fName = customerDto.fName;
  newCustomer.lName = customerDto.lName;
  newCustomer.email = customerDto.email;

  // Hash the customer password
  const pwd = customerDto.password;
  const hashedPassword = await hashPassword(pwd);
  newCustomer.password = hashedPassword;

  const addedRecord = await newCustomer.save();

  if (addedRecord) {
    return {
      success: true,
      password: pwd,
    };
  }
  return {
    success: false,
    password: pwd,
  };
};

const emailExist = async (email) => {
  const customerCountWithEmail = await Customer.find({
    email,
  }).countDocuments();
  return customerCountWithEmail !== 0;
};

const updatePassword = async (id, newPassword) => {
  const customer = await Customer.findOne({ _id: id });

  if (!customer) {
    return false;
  }
  // Hash customer password

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  customer.password = hashedPassword;

  await customer.save();

  return true;
};

const getIsNewCustomer = async (id) => {
  const customer = await Customer.findOne({ _id: id });

  if (!customer) {
    return false;
  }
  return customer.isNewCustomer;
};

const getCustomerByEmail = async (email) => {
  const customer = await Customer.findOne({ email }).populate(
    "wishList.product"
  );

  if (!customer) {
    return null;
  }
  return customer;
};

const getCustomerById = async (id) => {
  const customer = await Customer.findOne({ _id: id }).populate(
    "wishList.product"
  );

  if (!customer) {
    return null;
  }
  return customer;
};

const addCustomerAddress = async (customerId, addressDto) => {
  const customer = await Customer.findOne({ _id: customerId });

  const newAddress = {
    fName: addressDto.fName,
    lName: addressDto.lName,
    phone: addressDto.phone,
    country: addressDto.country,
    street: addressDto.street,
    town: addressDto.town,
    zip: addressDto.zip,
  };

  customer.addresses.push(newAddress);

  await customer.save();

  return customer;
};

const deleteCustomerAddress = async (customerId, addredssId) => {
  const customer = await Customer.findOne({ _id: customerId });
  addredssId = mongoose.Types.ObjectId(addredssId);
  customer.addresses = customer.addresses.filter((addr) => {
    if (addr._id.equals(addredssId)) {
      return false;
    } else {
      return true;
    }
  });

  await customer.save();

  return true;
};

const updateCustomerAddress = async (
  customerId,
  addressId,
  customerAddressDto
) => {
  const customer = await getCustomerById(customerId);
  addressId = mongoose.Types.ObjectId(addressId);

  const addressToUpdate = await customer.addresses.find((addr) =>
    addr._id.equals(addressId)
  );

  addressToUpdate.fName = customerAddressDto.fName;
  addressToUpdate.lName = customerAddressDto.lName;
  addressToUpdate.phone = customerAddressDto.phone;
  addressToUpdate.country = customerAddressDto.country;
  addressToUpdate.street = customerAddressDto.street;
  addressToUpdate.town = customerAddressDto.town;
  addressToUpdate.zip = customerAddressDto.zip;

  customer.addresses = customer.addresses.map((addr) => {
    if (addr._id.equals(addressId)) {
      return addressToUpdate;
    }
    return addr;
  });

  await customer.save();

  return addressToUpdate;
};

const updateCustomerInfo = async (id, newCustomerInfo) => {
  console.log("Hi I'm API service");
  console.log(id);
  console.log(newCustomerInfo);

  const customer = await Customer.findOne({ _id: id });
  console.log(customer);

  if (!customer) {
    return false;
  }

  customer.fName = newCustomerInfo.fName;
  customer.lName = newCustomerInfo.lName;
  customer.email = newCustomerInfo.email;

  console.log("hi I'm api service");
  console.log(customer);

  await customer.save();

  return true;
};

const updateCustomerPassword = async (id, currentPwd, newPwd) => {
  const customer = await getCustomerById(id);
  console.log("Hi, I'm API service");
  console.log(currentPwd);
  console.log(newPwd);

  const passwordMatches = await bcrypt.compare(currentPwd, customer.password);

  if (!passwordMatches) {
    return false;
  }

  // hash passsword
  const hashedPassword = await bcrypt.hash(newPwd, 10);

  customer.password = hashedPassword;

  await customer.save();

  return true;
};

const addProductToWishlist = async (wishlistItemDto) => {
  const product = await productService.getProductsById(
    wishlistItemDto.product_id
  );

  if (!product) {
    return {
      success: false,
      msg: "Requested product is not available",
    };
  }

  let wishlistOfCustomer = await getCustomerById(wishlistItemDto.customerId);
  wishlistOfCustomer.wishList.push({
    product: product._id,
  });

  await wishlistOfCustomer.save();
  const updatedWishlistOfCustomer = await getCustomerById(
    wishlistItemDto.customerId
  );
  // updatedWishlistOfCustomer.populate('wishlist.product')

  return {
    success: true,
    addedEntry: updatedWishlistOfCustomer.wishList.pop(),
  };
};

const removeProductFromWishlist = async (customerId, productId) => {
  const customerWishlist = await getCustomerById(customerId);

  customerWishlist.wishList = customerWishlist.wishList.filter((p) => {
    p.product._id !== productId;
  });

  await customerWishlist.save();

  return true;
};

const removeAllProductsFromWishlist = async (customerId) => {
  const customerWishlist = await getCustomerById(customerId);

  customerWishlist.products = [];

  await customerWishlist.save();
  return true;
};

module.exports = {
  login,
  signUp,
  emailExist,
  updatePassword,
  getIsNewCustomer,
  getCustomerByEmail,
  addCustomerAddress,
  deleteCustomerAddress,
  getCustomerById,
  updateCustomerAddress,
  updateCustomerInfo,
  updateCustomerPassword,
  removeProductFromWishlist,
  addProductToWishlist,
  removeAllProductsFromWishlist,
};
