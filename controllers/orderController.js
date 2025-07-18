const { Order } = require("../models/order");

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy tất cả đơn hàng
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("account")
      .populate("orderItems.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy đơn hàng theo ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("account")
      .populate("orderItems.product");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật trạng thái thanh toán
exports.updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.isPaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật trạng thái giao hàng
exports.updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.status = "Delivered";
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa đơn hàng
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy đơn hàng của user hiện tại
exports.getOrdersByCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    console.log("Current userId for orders:", userId);
    const orders = await Order.find({ account: userId }).populate(
      "orderItems.product"
    );
    console.log("Orders found for user:", orders.length);
    res.json(orders);
  } catch (error) {
    console.error("Error in getOrdersByCurrentUser:", error);
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật trạng thái đơn hàng (admin chỉnh sửa bất kỳ trạng thái)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (status) order.status = status;
    // Nếu có các trường khác muốn chỉnh sửa, có thể thêm vào đây
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
