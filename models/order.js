const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: "account", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  size: { type: String, required: true }
});

const orderSchema = new Schema(
  {
    account: { type: mongoose.Schema.Types.ObjectId, ref: "account", required: true },
    orderItems: [orderItemSchema],
    shippingAddress: {
      address: String,
    },
    paymentMethod: String,
    shippingPrice: Number,
    totalPrice: Number,
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);
const OrderItem = mongoose.model("orderItem", orderItemSchema);
module.exports = {
  Order,
  OrderItem,
};

