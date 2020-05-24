const cartService = require("../../services/cart.service");

const { HTTP403Error } = require("../../util/httpErrors");

const getCart = async (req, res, next) => {
  try {
    const customerInfo = req.decoded;
    const cart = await cartService.getCartByCustomerId(customerInfo.id);

    return res.json(cart);
  } catch (error) {
    next(error);
  }
};

const addProductToCart = async (req, res, next) => {
  const { product_id, size, qty } = req.body;
  try {
    if (!product_id || !size || !qty) {
      throw new HTTP403Error("Missing information");
    }

    const customerInfo = req.decoded;

    const result = await cartService.addProductToCart({
      customerId: customerInfo.id,
      product_id,
      size,
      qty,
    });

    if (result.succeded) {
      return res.json(result);
    } else {

      return res.status(403).json(result);
    }
  } catch (error) {
    next(error);
  }
};

const updateProductInCart = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const removeProductFromCart = async (req, res, next) => {
  const { size } = req.body;
  const productId = req.params.id;

  try {
    if (!productId || !size) {
      throw new HTTP403Error("Missing information");
    }

    const customerInfo = req.decoded;

    const result = await cartService.removeProductFromCart(
      customerInfo.id,
      productId,
      size
    );

    if (result) {
      return res.json({ succeded: true });
    } else {
      return res.json({ succeded: false });
    }
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const customerInfo = req.decoded;
    const result = await cartService.removeAllProductsFromCard(customerInfo.id);

    return res.json({ success: result });
  } catch (error) {
    next(error);
  }
};

const checkoutCart = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addProductToCart,
  updateProductInCart,
  removeProductFromCart,
  clearCart,
  checkoutCart,
};
