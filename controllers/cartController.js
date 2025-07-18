
const { CartItem } = require("../models/order");

// Lấy tất cả cart item của user
exports.getCart = async (req, res) => {
  try {
    const cart = await CartItem.find({ account: req.user.id }).populate("product");
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Thêm sản phẩm vào cart
exports.addToCart = async (req, res) => {
  try {
    const { product, price, qty, size } = req.body;
    let item = await CartItem.findOne({ account: req.user.id, product, size });
    if (item) {
      item.qty += qty;
      await item.save();
      return res.json(item);
    }
    item = new CartItem({ account: req.user.id, product, price, qty, size });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Sửa số lượng/sp trong cart
exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;
    const item = await CartItem.findOneAndUpdate(
      { _id: id, account: req.user.id },
      { qty },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa sản phẩm khỏi cart
exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    await CartItem.deleteOne({ _id: id, account: req.user.id });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

