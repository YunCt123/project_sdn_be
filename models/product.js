const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
    },
    brand: {
      type: String,
      required: true,
    },
    sizes:
      {
        type: String,
        enum: ['38', '39', '40', '41', '42', '43', '44'],
        required: true,
      },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
        type: String,
        required: true,
    },
    category: {
      type: String,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
     review: [{ type: Schema.Types.ObjectId, ref: "review", required: true}],
  },
  { timestamps: true }
);

const Product = mongoose.model('product', productSchema);
module.exports = Product;