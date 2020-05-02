const customerService = require("../../services/customer.service");
const { logger } = require("../../util");
const { HTTP403Error, HTTP401Error } = require("../../util/httpErrors");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { logger } = require("../../util");

/**@description Login the customer
 *
 */
const login = (req, res, next) => {
  logger.info("login controller");
  const { email, password } = req.body;

  try {
    if(!email || !password) {
      //missing fields
      throw new HTTP403Error("Email ans password are required.");
    }

    const loginResult = await customerService.login(email, password);

    if(loginResult.isAuth) {
      // create a token
      const payload = { user: email };
      const token = jwt.sign(
        payload,
        config.jwt.secret,
        config.jwt.tokenOptions
      );

      const result = {
        token,
        isNew: result.isNew
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

const signUp = (req, res, next) => {};

module.exports = {
  login,
  signUp,
};
