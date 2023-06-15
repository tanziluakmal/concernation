const httpStatus = require('http-status');
const { Order, Event, User } = require('../models');
const ApiError = require('../utils/ApiError');

const createOrder = async (order) => {
  try {
    // check if user is exist
    const user = await User.findById(order.buyerId);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    // check if event exists
    const event = await Event.findById(order.eventId);

    if (!event) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
    }

    // check if event is not deleted
    if (event.isDeleted) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Event is deleted');
    }

    // check the stock event is higher than the order quantity
    if (event.stock < order.quantity) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Event stock is not enough');
    }

    // validate total price is correct
    if (order.totalPrice !== event.price * order.quantity) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Total price is not correct');
    }

    // generate order number
    const orderNumber = Math.random().toString(36).substr(2, 9);

    return Promise.resolve(await Order.create({ ...order, orderNumber, status: 'pending' }));
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getOrders = async (filter, option) => {
  try {
    const orders = await Order.paginate(filter, option);

    const promiseOrders = orders.results.map(async (order) => {
      // get event detail
      const event = await Event.findById(order.eventId);

      // get user detail
      const user = await User.findById(order.buyerId);

      return { ...order, event, user };
    });

    const result = await Promise.all(promiseOrders);

    return Promise.resolve(result);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getOrderByBuyerId = async (buyerId) => {
  try {
    const orders = await Order.find({ buyerId });

    const promiseOrders = orders.map(async (order) => {
      // get event detail
      const event = await Event.findById(order.eventId);

      // get user detail
      const user = await User.findById(order.buyerId);

      return { ...order, event, user };
    });

    const result = await Promise.all(promiseOrders);

    return Promise.resolve(result);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getOrderById = async (id) => {
  const order = await Order.findById(id);

  // get event detail
  const event = await Event.findById(order.eventId);

  // get user detail
  const user = await User.findById(order.buyerId);

  return Promise.resolve({ ...order, event, user });
};

const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

module.exports = {
  createOrder,
  getOrders,
  getOrderByBuyerId,
  getOrderById,
  updateOrderById,
};
