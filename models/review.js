const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(

  {
    account: { type: mongoose.Schema.Types.ObjectId, ref: "account", required: true },
    name: String,
    rating: Number,
    comment: String,
  },
  { timestamps: true }
);

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;
