const { Router } = require("express");
const orderController = require("../controllers/order.controller");
const { verifyJWTToken } = require("../middleware/auth");

// init express router
const route = Router();

module.exports = (app) => {
    app.use("/orders", route);

    // checkout cart
    route.post("/", verifyJWTToken, orderController.createOrder);

    // get all orders
    route.get("/", verifyJWTToken, orderController.getAllOrders);


    // update order status
    route.patch("/:orderId", verifyJWTToken, orderController.updateOrderStatus);

    // delete order 
    route.delete("/:orderId", verifyJWTToken, orderController.deleteOrder);



};
