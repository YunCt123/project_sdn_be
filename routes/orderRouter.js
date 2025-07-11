const express = require("express");
const oderRouter = express.Router();
const orderController = require("../controllers/oderController");
const { verifyToken } = require("../middleware/auth");

// Order routes - All protected with authentication
oderRouter.post("/orders", verifyToken, orderController.createOrder);
oderRouter.get("/orders", verifyToken, orderController.getAllOrders);
oderRouter.get("/orders/:id", verifyToken, orderController.getOrderById);
oderRouter.put(
  "/orders/:id/pay",
  verifyToken,
  orderController.updateOrderToPaid
);
oderRouter.put(
  "/orders/:id/deliver",
  verifyToken,
  orderController.updateOrderToDelivered
);
oderRouter.delete("/orders/:id", verifyToken, orderController.deleteOrder);

// Order item routes - All protected with authentication
oderRouter.post(
  "/orders/:orderId/items",
  verifyToken,
  orderController.addOrderItem
);
oderRouter.put(
  "/orders/:orderId/items/:itemId",
  verifyToken,
  orderController.updateOrderItem
);
oderRouter.delete(
  "/orders/:orderId/items/:itemId",
  verifyToken,
  orderController.deleteOrderItem
);

module.exports = oderRouter;
