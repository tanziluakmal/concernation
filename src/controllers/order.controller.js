const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body);
  res.status(httpStatus.CREATED).send(order);
});

const getOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['orderNumber', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.getOrders(filter, options);

  res.send(result);
});

const getOrderByBuyerId = catchAsync(async (req, res) => {
  const result = await orderService.getOrderByBuyerId(req.params.buyerId);

  res.send(result);
});

const getOrderById = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(order);
});

const updateOrderById = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(req.params.orderId, req.body);
  res.send(order);
});

module.exports = {
  createOrder,
  getOrders,
  getOrderByBuyerId,
  getOrderById,
  updateOrderById,
};
