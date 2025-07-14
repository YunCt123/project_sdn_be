const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
});

const orderSchema = new Schema(
  {
    account: { type: mongoose.Schema.Types.ObjectId, ref: "account", required: true },
    orderItems: [orderItemSchema],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentMethod: String,
    itemsPrice: Number,
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
const OderItem = mongoose.model("orderItem", orderItemSchema);
module.exports = {
  Order,
  OderItem,
};

