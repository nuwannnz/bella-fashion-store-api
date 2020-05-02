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
const login = (email, password) => {
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
    return result;
  } else {
    return result;
  }
};

const addCustomer = async (customerDto) => {
  const newCustomer = new Customer();
  newCustomer.email = customerDto.email;
  
}


const signUp = useDto => {};

module.exports = {
  login,
  signUp
};
