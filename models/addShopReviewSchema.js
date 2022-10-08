const mongoose = require("mongoose");

const AddShopReviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    minLength: [25, `Your message so small  please add min 25 letter`],
    maxLength: [100, "Your message so large! you can add maximum 100 letter"],
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("ShopReview", AddShopReviewSchema);
