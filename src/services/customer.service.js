const Customer = require("../models/customer.model");
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
    isAuth: false,
    isNew: false
  };
  const customer = await Customer.findOne({ email });
  if(!customer) {
    return result;
  }

  const passwordMatches = await bcrypt.compare(password, customer.password);

  if(passwordMatches) {
    result.isAuth = true;
    result.isNew = customer.isNewCustomer;
    return result;
  } else {
    return result;
  }
};

const signUp = useDto => {};

module.exports = {
  login,
  signUp
};
