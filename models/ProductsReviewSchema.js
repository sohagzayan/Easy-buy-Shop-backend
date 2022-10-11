const mongoose = require("mongoose");

const ProductsReviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
    maxLength: [23, "You Can add Title Only 23 character"],
  },
  rating: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});
