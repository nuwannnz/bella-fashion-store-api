const { HTTP403Error, HTTP401Error } = require("../../util/httpErrors");
const customerService = require("../../services/customer.service");
const { logger, emailUtil } = require("../../util");

const checkEmailStep = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      throw new HTTP403Error("Missing email");
    }
    const customer = await customerService.getCustomerByEmail(email);

    if (!customer) {
      throw new HTTP403Error("Customer not found");
    }

    const passcode = await customerService.generateForgotPassword(customer._id);

    await emailUtil.sendPasswordResetCode(
      customer.email,
      customer.fName,
      passcode
    );

    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const checkCodeStep = async (req, res, next) => {
  const { email, code } = req.body;

  try {
    if (!email || !code) {
      throw new HTTP403Error("Missing fields");
    }
    const customer = await customerService.getCustomerByEmail(email);

    if (!customer) {
      throw new HTTP403Error("Customer not found");
    }

    const result = await customerService.checkCode(customer._id, code);

    if (result) {
      return res.json();
    } else {
      throw new HTTP401Error("Not authorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkEmailStep,
  checkCodeStep,
};
