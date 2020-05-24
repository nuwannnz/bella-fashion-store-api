const customerService = require("../../services/customer.service");
const { HTTP403Error, HTTP401Error } = require("../../util/httpErrors");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { emailUtil } = require("../../util");
const { logger } = require("../../util");
const bcrypt = require("bcrypt");

/**@description Login the customer
 *
 */
const login = async (req, res, next) => {
  logger.info("login controller");
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      //missing fields
      throw new HTTP403Error("Email ans password are required.");
    }

    const loginResult = await customerService.login(email, password);

    if (loginResult.isAuth) {
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
          isNew: customer.isNewCustomer,
          addresses: customer.addresses,
          wishlist: customer.wishList,
        },
      };

      // send response
      res.status(200).json(result);
    } else {
      throw new HTTP401Error("Authentication error");
    }
  } catch (error) {
    next(error);
  }
};

const signUpCustomer = async (req, res, next) => {
  const { fName, lName, email, password } = req.body;

  try {
    if (!fName || !lName || !email || !password) {
      // Missing fields
      throw new HTTP403Error(
        "First name, last name, email and password are required."
      );
    }

    if (await customerService.emailExist(email)) {
      throw new HTTP403Error("Email already exist");
    }

    const result = await customerService.signUp({
      fName,
      lName,
      email,
      password,
    });

    if (result.success) {
      // Send customer joining msg from email
      await emailUtil.sendCustomerJoiningMsg(email, fName);
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    next(error);
  }
};

const getCustomer = async (req, res, next) => {
  try {
    const customerInfo = req.decoded;

    const customer = await customerService.getCustomerByEmail(
      customerInfo.email
    );

    if (!customer) {
      throw new HTTP401Error("Unauthorized");
    }

    const result = {
      isAuth: true,
      customer: {
        fName: customer.fName,
        lName: customer.lName,
        email: customer.email,
        isNew: customer.isNewCustomer,
        addresses: customer.addresses,
        wishlist: customer.wishList,
      },
    };

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const addCustomerAddress = async (req, res, next) => {
  const { addressDto } = req.body;
  try {
    if (
      !addressDto.fName ||
      !addressDto.lName ||
      !addressDto.phone ||
      !addressDto.country ||
      !addressDto.street ||
      !addressDto.town ||
      !addressDto.zip
    ) {
      throw new HTTP403Error("Missing fields");
    }

    const customerInfo = req.decoded;

    const updatedCustomer = await customerService.addCustomerAddress(
      customerInfo.id,
      addressDto
    );

    return res.json(updatedCustomer.addresses.pop());
  } catch (error) {
    next(error);
  }
};

const deleteAddress = async (req, res, next) => {
  const id = req.params.id;

  try {
    const customerInfo = req.decoded;

    //  {
    //    throw new HTTP401Error("Not address delete");
    //  }

    if (!id) {
      throw new HTTP403Error("Missing user id in the URL");
    }

    const result = await customerService.deleteCustomerAddress(
      customerInfo.id,
      id
    );
    if (result) {
      return res.json({ deleted: true });
    }
    return res.json({ deleted: false });
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  const id = req.params.id;
  const { addressDto } = req.body;

  try {
    if (
      !addressDto.fName ||
      !addressDto.lName ||
      !addressDto.phone ||
      !addressDto.country ||
      !addressDto.street ||
      !addressDto.town ||
      !addressDto.zip
    ) {
      throw new HTTP403Error("Missing fields");
    }

    const customerInfo = req.decoded;

    const result = await customerService.updateCustomerAddress(
      customerInfo.id,
      id,
      addressDto
    );

    if (result) {
      return res.json(result);
    }
    return res.json(null);
  } catch (error) {
    next(error);
  }
};

const updateCustomerInfo = async (req, res, next) => {
  const { customerInfoToUpdate } = req.body;

  console.log("Hi I'm controller");
  console.log(customerInfoToUpdate);

  try {
    if (
      !customerInfoToUpdate.fName ||
      !customerInfoToUpdate.lName ||
      !customerInfoToUpdate.email
    ) {
      throw new HTTP403Error("Missing fields");
    }

    const customerInfo = req.decoded;

    const result = await customerService.updateCustomerInfo(
      customerInfo.id,
      customerInfoToUpdate
    );

    if (result) {
      return res.json(customerInfoToUpdate);
    }
    return res.json(null);
  } catch (error) {
    next(error);
  }
};

const updateCustomerPassword = async (req, res, next) => {
  const { currentPwd, newPwd } = req.body;

  try {
    // get info added by the customer token
    const customerInfo = req.decoded;

    const result = await customerService.updateCustomerPassword(
      customerInfo.id,
      currentPwd,
      newPwd
    );

    if (result) {
      return res.json({ success: true });
    } else {
      throw new HTTP403Error("Password is not match current password.");
    }
  } catch (error) {
    next(error);
  }
};

// const getWishlist = async (req, res, next) => {
//   try {
//     const customerInfo = req.decoded;
//     const wishlist = await customerService.getCustomerById(customerInfo.id);

//     return res.json(wishlist);
//   } catch (error) {
//     next(error);
//   }
// };

// const addProductToWishlist = async (req, res, next) => {
//   const { product_id } = req.body;

//   try {
//     if (!product_id) {
//       throw new HTTP403Error("Missing information");
//     }

//     const customerInfo = req.decoded;

//     const result = await customerService.addProductToWishlist({
//       customerId: customerInfo.id,
//       product_id,
//     });

//     return res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// const removeProductFromWishlist = async (req, res, next) => {
//   const productId = req.params.id;

//   try {
//     if (!productId) {
//       throw new HTTP403Error("Missing information");
//     }

//     const customerInfo = req.decoded;

//     const result = await customerService.removeProductFromWishlist(
//       customerInfo.id,
//       productId
//     );

//     if (result) {
//       return res.json({ success: true });
//     } else {
//       return res.json({ success: false });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// const clearWishlist = async (req, res, next) => {
//   try {
//     const customerInfo = req.decoded;
//     const result = await customerService.removeProductFromWishlist(
//       customerInfo.id
//     );

//     return res.json({ success: result });
//   } catch (error) {
//     next(error);
//   }
// };

const getWishlist = async (req, res, next) => {
  try {
    const customerInfo = req.decoded;
    const wishlist = await customerService.getCustomerById(customerInfo.id);

    return res.json(wishlist);
  } catch (error) {
    next(error);
  }
};

const addProductToWishlist = async (req, res, next) => {
  const { product_id } = req.body;

  try {
    if (!product_id) {
      throw new HTTP403Error("Missing information");
    }

    const customerInfo = req.decoded;

    const result = await customerService.addProductToWishlist({
      customerId: customerInfo.id,
      product_id,
    });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const removeProductFromWishlist = async (req, res, next) => {
  const productId = req.params.id;

  try {
    if (!productId) {
      throw new HTTP403Error("Missing information");
    }

    const customerInfo = req.decoded;

    const result = await customerService.removeProductFromWishlist(
      customerInfo.id,
      productId
    );

    if (result) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  } catch (error) {
    next(error);
  }
};

const clearWishlist = async (req, res, next) => {
  try {
    const customerInfo = req.decoded;
    const result = await customerService.removeProductFromWishlist(
      customerInfo.id
    );

    return res.json({ success: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  signUpCustomer,
  getCustomer,
  addCustomerAddress,
  deleteAddress,
  updateAddress,
  updateCustomerInfo,
  updateCustomerPassword,
  getWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
  clearWishlist,
};
