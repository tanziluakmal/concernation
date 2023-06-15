const express = require('express');
const auth = require('../../middlewares/auth');
const { orderController } = require('../../controllers');

const router = express.Router();

router.route('/').post(orderController.createOrder).get(auth('manageOrders'), orderController.getOrders);

router
  .route('/:orderId')
  .get(auth('manageOrders'), orderController.getOrderById)
  .patch(auth('manageOrders'), orderController.updateOrderById);

router.route('/getByBuyerId/:buyerId').get(auth('manageOrders'), orderController.getOrderByBuyerId);

module.exports = router;
