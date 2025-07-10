const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(

  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    name: String,
    rating: Number,
    comment: String,
  },
  { timestamps: true }
);

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;
