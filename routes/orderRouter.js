const express = require('express');
const oderRouter = express.Router();
const orderController = require('../controllers/oderController');

// Order routes
oderRouter.post('/orders', orderController.createOrder);
oderRouter.get('/orders', orderController.getAllOrders);
oderRouter.get('/orders/:id', orderController.getOrderById);
oderRouter.put('/orders/:id/pay', orderController.updateOrderToPaid);
oderRouter.put('/orders/:id/deliver', orderController.updateOrderToDelivered);
oderRouter.delete('/orders/:id', orderController.deleteOrder);

// Order item routes
oderRouter.post('/orders/:orderId/items', orderController.addOrderItem);
oderRouter.put('/orders/:orderId/items/:itemId', orderController.updateOrderItem);
oderRouter.delete('/orders/:orderId/items/:itemId', orderController.deleteOrderItem);

module.exports = oderRouter;
