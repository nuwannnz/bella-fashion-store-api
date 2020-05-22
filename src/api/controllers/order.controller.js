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

const getAllOrders = async (req, res, next) => {
    try {

        const customerInfo = req.decoded;

        const result = await orderService.getOrdersOfCustomer(customerInfo.id);


        res.json(result);


    } catch (error) {
        next(error)
    }
}


module.exports = {
    createOrder,
    getAllOrders
}