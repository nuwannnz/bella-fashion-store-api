const Customer = require("../models/customer.model");
const roleService = require("./role.service");
const generatePassword = require("generate-password");
const { hashPassword } = require("../util");
const bcrypt = require("bcrypt");

/**@description Check whether the given email and password combination is
 * correct
 *
 * @param {string} email - Email of the customer
 * @param {string} password - Password of the customer
 * @returns {boolean} True if the credentials are correct and false otherwise
 */
const login = async (email, password) => {
  const result = {
    isAuth: false
  };
  const customer = await Customer.findOne({ email });
  if(!customer) {
    return result;
  }

  const passwordMatches = await bcrypt.compare(password, customer.password);

  if(passwordMatches) {
    result.isAuth = true;

    if(customer.isNewCustomer) {
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

  if(addedRecord) {
    return {
      success: true,
      password: pwd
    };
  }
  return {
    success: false, 
    password: pwd
  };
  
};

const emailExist = async (email) => {
  const customerCountWithEmail = await Customer.find({ email }).countDocuments();
  return customerCountWithEmail !== 0;
};

const updatePassword = async (id, newPassword) => {
  const customer = await Customer.findOne({ _id: id });

  if(!customer) {
    return false;
  }
  // Hash customer password

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  customer.password = hashedPassword;

  await customer.save();

  return true;
}

const getIsNewCustomer = async (id) => {
  const customer = await Customer.findOne({ _id: id });

  if(!customer) {
    return false;
  }
  return customer.isNewCustomer
}

const getCustomerByEmail = async (email) => {
  const customer = await Customer.findOne({ email });

  if(!customer) {
    return null;
  }
  return customer;
}


module.exports = {
  login,
  signUp,
  emailExist,
  updatePassword,
  getIsNewCustomer,
  getCustomerByEmail
};
