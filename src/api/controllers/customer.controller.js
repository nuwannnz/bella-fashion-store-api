const customerService = require("../../services/customer.service");
const { HTTP403Error, HTTP401Error } = require("../../util/httpErrors");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const {email : emailUtil } = require("../../util");
const {logger} = require("../../util");

/**@description Login the customer
 *
 */
const login = async (req, res, next) => {
  logger.info("login controller");
  const { email, password } = req.body;

  try {
    if(!email || !password) {
      //missing fields
      throw new HTTP403Error("Email ans password are required.");
    }

    const loginResult = await customerService.login(email, password);

    if(loginResult.isAuth) {
      //get the customer
      const customer = await customerService.getCustomerByEmail(email);

      // create a token
      const payload = { email, id: customer._id };
      const token = jwt.sign(
        payload,
        config.jwt.secret,
        config.jwt.tokenOptions
      );

      const result = {
        isAuth: true,
        token,
        customer: {
          fName: customer.fName,
          lName: customer.lName,
          email: customer.email,
          isNew: customer.isNewCustomer
        } 
      };

      // send response
      res.status(200).json(result);
    } else {
      throw new HTTP401Error("Authentication error");
    }
  } catch(error) {
    next(error);
  }
};

const signUpCustomer = async (req, res, next) => {
  const { fName, lName, email, password } = req.body;

  try {
    if(!fName || !lName || !email || !password) {
      // Missing fields
      throw new HTTP403Error("First name, last name, email and password are required.");
    } 

    if(await customerService.emailExist(email)) {
      throw new HTTP403Error("Email already exist");
    }

    const result = await customerService.signUp({
      fName,
      lName,
      email,
      password
    });

    if(result.success) {
      // Send customer joining msg from email
      await emailUtil.sendCustomerJoiningMsg(
        email,
        fName
      );
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch(error) {
    next(error);
  }
};

const getCustomer = async (req, res, next) => {

  try {
    const customerInfo = req.decoded;

    const customer = await customerService.getCustomerByEmail(customerInfo.email);

    if(!customer) {
      throw new HTTP401Error("Unauthorized");
    }

    const result = {
      isAuth: true,
      customer: {
        fName: customer.fName,
        lname: customer.lName,
        email: customer.email,
        isNew: customer.isNewCustomer
      }
    };

    return res.json(result);
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login,
  signUpCustomer,
  getCustomer
};
