const { HTTP403Error } = require('../../util/httpErrors')
const orderService = require('../../services/order.service')

const createOrder = async (req, res, next) => {
    const { orderDto } = req.body
    try {
        if (!orderDto.addressId || !orderDto.payment || !orderDto.payment.paymentType || !orderDto.itemList) {
            throw new HTTP403Error("Missing fields");
        }

        const customerInfo = req.decoded;

        const result = await orderService.createOrder({ ...orderDto, customer: customerInfo.id });


        res.json(result);



    } catch (error) {
        next(error)
    }
}

const getAllOrdersOfCustomer = async (req, res, next) => {
    try {

        const customerInfo = req.decoded;

        const result = await orderService.getOrdersOfCustomer(customerInfo.id);


        res.json(result);


    } catch (error) {
        next(error)
    }
}
const getAllOrders = async (req, res, next) => {
    try {
        // check permission

        const result = await orderService.getAllOrders();

        res.json(result);
    } catch{
        next(error)
    }
}

const updateOrderStatus = async (req, res, next) => {
    const orderId = req.params;
    const { orderStatus } = req.body;
    try {

        if (!orderId || !orderStatus) {
            throw new HTTP403Error('Missing fields')
        }

        // check permission

        const result = await orderService.updateOrderStatus(orderId, orderStatus);

        res.json(result);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    createOrder,
    getAllOrdersOfCustomer,
    getAllOrders,
    updateOrderStatus
}