const productService = require('../services/product.service');
const Order = require('../models/order.model')

const createOrder = async (orderDto) => {

    const result = {
        success: true,
        errorMessage: null,
        createdOrder: null
    }

    let newOrder = new Order();

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

        newOrder.items.push({ ...item, product: product._id })
    }


    newOrder.customer = orderDto.customer;
    newOrder.paymentMethod = orderDto.payment.paymentType;
    newOrder.totalValue = totalValue;
    newOrder.addressId = orderDto.addressId;

    await newOrder.save();

    const createdOrder = await Order.findOne({ _id: newOrder._id }).populate('items.product');
    result.createdOrder = createdOrder;
    return result;
}

const getOrdersOfCustomer = async (customerId) => {
    const orders = await Order.find({ customer: customerId }).populate('items.product');
    return orders;
}

const getAllOrders = async () => {
    const orders = await Order.find().populate('items.product').populate('customer');
    return orders;
}

const updateOrderStatus = async (orderId, status) => {
    const order = await Order.findOne({ _id: orderId });
    order.isCompleted = status;

    await order.save();

    return order;
}

module.exports = {
    createOrder,
    getOrdersOfCustomer,
    getAllOrders,
    updateOrderStatus
}