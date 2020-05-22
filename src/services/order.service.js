const productService = require('../services/product.service');
const Order = require('../models/order.model')

const createOrder = async (orderDto) => {

    const result = {
        success: true,
        errorMessage: null,
        createdOrder: null
    }

    let totalValue = 0;

    // check product quantities
    for (const item of orderDto.itemList) {
        const product = await productService.getProductsById(item.product);
        if (!product) {
            result.success = false;
            result.errorMessage = "Product not found";
            return result;
        }

        const sizeQty = product.sizeQty.find(s => s.size === item.size);
        if (!sizeQty) {
            result.success = false;
            result.errorMessage = "Invalid size";
            return result;
        }

        if (sizeQty.qty < item.qty) {
            result.success = false;
            result.errorMessage = `Not enough stock for item ${product.name}`;
            return result;
        }

        // update product qty
        sizeQty.qty -= item.qty;

        product.sizeQty = product.sizeQty.map(s => s._id === sizeQty._id ? sizeQty : s);

        await product.save();

        totalValue += product.price * item.qty;
    }

    const newOrder = new Order();

    newOrder.customer = orderDto.customer;
    newOrder.paymentMethod = orderDto.payment.paymentType;
    newOrder.items = orderDto.itemList;
    newOrder.totalValue = totalValue;

    await newOrder.save();

    newOrder.populate('items.product');
    result.createdOrder = newOrder;
    return result;
}

const getOrdersOfCustomer = async (customerId) => {
    const orders = await Order.find({ customer: customerId }).populate('items.product');
    return orders;
}


module.exports = {
    createOrder,
    getOrdersOfCustomer
}