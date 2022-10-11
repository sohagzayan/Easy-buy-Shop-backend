const mongoose = require("mongoose");

const AddShopReviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  heading: {
    type: String,
    required: true,
    maxLength: [26, "You Can add Title Only 26 character"],
  },
  message: {
    type: String,
    required: true,
    minLength: [25, `Your message so small  please add min 25 letter`],
    maxLength: [100, "Your message so large! you can add maximum 100 letter"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("ShopReview", AddShopReviewSchema);
