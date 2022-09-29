const mongoose = require("mongoose");

const BookMarkSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  minimumOrder: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  coupon: {
    type: String,
    coupon: "everyone",
  },

  image: {
    type: String,
  },
  userId: {
    type: mongoose.Types.ObjectId,
  },
  productId: {
    type: mongoose.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bookmark", BookMarkSchema);
