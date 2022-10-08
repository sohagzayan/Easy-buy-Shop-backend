const mongoose = require("mongoose");

const AddToCardSchema = mongoose.Schema({
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
  subTotal: {
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
  users: {
    type: mongoose.Types.ObjectId,
  },
  productId: {
    type: mongoose.Types.ObjectId,
  },
});

module.exports = mongoose.model("AddToCard", AddToCardSchema);
