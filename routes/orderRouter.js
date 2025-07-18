const express = require("express");
const orderRouter = express.Router();
// Sửa lại tên file controller cho đúng với tên file thực tế
const orderController = require("../controllers/orderController");
const { verifyToken, verifyTokenAndAdmin } = require("../middleware/auth");

// Route cho user lấy đơn hàng của chính mình (phải đặt trước /:id)
orderRouter.get("/my", verifyToken, orderController.getOrdersByCurrentUser);

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


// Route cho admin xem tất cả đơn hàng của mọi user
orderRouter.get(
  "/admin/all",
  verifyTokenAndAdmin,
  orderController.getAllOrders
);

// Route cho admin chỉnh sửa trạng thái đơn hàng
orderRouter.put(
  "/admin/:id/status",
  verifyTokenAndAdmin,
  orderController.updateOrderStatus
);

module.exports = orderRouter;
