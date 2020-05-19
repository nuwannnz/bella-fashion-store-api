const Cart = require("../models/cart.model");
const productService = require("./product.service");

const getCartByCustomerId = async (customerId) => {
  const cart = await Cart.findOne({ customer: customerId }).populate("products.product");

  return cart;
};

const createCart = async (customerId) => {
  const cart = new Cart();
  cart.customer = customerId;
  await cart.save();
  return cart;
};

const addProductToCart = async (cartItemDto) => {
  // check if product exists
  const product = await productService.getProductsById(cartItemDto.product_id);

  if (!product) {
    return {
      succeded: false,
      msg: "Requested product is not available",
    };
  }
  // check if size is available
  const sizeQty = product.sizeQty.find(
    (sizeInfo) => sizeInfo.size === cartItemDto.size
  );

  if (!sizeQty) {
    return {
      succeded: false,
      msg: "Requested size is not available",
    };
  }

  // check if quantity is available
  if (parseInt(sizeQty.qty) < cartItemDto.qty) {
    // the requested quantity is not available
    return {
      succeded: false,
      msg: "Requested quantity is not available",
    };
  }

  let cartOfCustomer = await getCartByCustomerId(cartItemDto.customerId);

  if (cartOfCustomer === null) {
    // this customer doesn't have a cart yet
    // so create a one
    cartOfCustomer = await createCart(cartItemDto.customerId);
  }

  cartOfCustomer.products.push({
    product: product._id,
    size: cartItemDto.size,
    qty: cartItemDto.qty,
  });

  await cartOfCustomer.save();
  const updatedCartOfCustomer = await getCartByCustomerId(
    cartItemDto.customerId
  );

  return {
    succeded: true,
    addedEntry: updatedCartOfCustomer.products.pop(),
  };
};

const removeProductFromCart = async (customerId, productId, size) => {
  const customerCart = await getCartByCustomerId(customerId);

  customerCart.products = customerCart.products.filter(
    (p) => p.product._id !== productId && p.size !== size
  );

  await customerCart.save();

  return true;
};

module.exports = {
  getCartByCustomerId,
  createCart,
  addProductToCart,
  removeProductFromCart,
};
