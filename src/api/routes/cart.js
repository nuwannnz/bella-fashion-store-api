const { Router } = require("express");
const cartController = require("../controllers/cart.controller");
const { verifyJWTToken } = require("../middleware/auth");

// init express router
const route = Router();

module.exports = (app) => {
  app.use("/carts", route);

  // checkout cart
  route.post("/checkout", verifyJWTToken, cartController.checkoutCart);

  // get cart of customer
  route.get("/", verifyJWTToken, cartController.getCart);

  // add product to cart
  route.post("/products", verifyJWTToken, cartController.addProductToCart);

  // update a prodcut of the cart
  route.patch(
    "/products/:id",
    verifyJWTToken,
    cartController.updateProductInCart
  );

  // remove all products from ths card
  route.delete("/products/", verifyJWTToken, cartController.clearCart);

  // remove a product from ths card
  route.delete(
    "/products/:id",
    verifyJWTToken,
    cartController.removeProductFromCart
  );
};
