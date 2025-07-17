const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/oderController");
const { verifyToken, verifyTokenAndAdmin } = require("../middleware/auth");

// Order routes - All protected with authentication
orderRouter.post("/", verifyToken, orderController.createOrder);
orderRouter.get("/", verifyToken, orderController.getAllOrders);
orderRouter.get("/:id", verifyToken, orderController.getOrderById);
orderRouter.put("/:id/pay", verifyToken, orderController.updateOrderToPaid);
orderRouter.put(
  "/:id/deliver",
  verifyToken,
  orderController.updateOrderToDelivered
);
orderRouter.delete("/:id", verifyToken, orderController.deleteOrder);

// Order item routes - All protected with authentication
orderRouter.post("/:orderId/items", verifyToken, orderController.addOrderItem);
orderRouter.put(
  "/:orderId/items/:itemId",
  verifyToken,
  orderController.updateOrderItem
);
orderRouter.delete(
  "/:orderId/items/:itemId",
  verifyToken,
  orderController.deleteOrderItem
);

// Route cho admin xem tất cả đơn hàng của mọi user
orderRouter.get(
  "/admin/all",
  verifyTokenAndAdmin,
  orderController.getAllOrders
);

module.exports = orderRouter;
