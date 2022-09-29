const mongoose = require("mongoose");

const toolsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  InStock: {
    type: Number,
    default: 0,
    required: true,
  },
  availability: {
    type: String,
    enum: ["in-stock", "out-of-stock"],
    default: "in-stock",
  },
  Warranty: {
    type: String,
    default: "no",
  },
  like: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    default: "products",
  },
  Brand: {
    type: String,
    default: "walton",
  },

  discount: {
    type: Number,
    default: 0,
  },
  coupon: {
    type: String,
    default: "everyone",
  },
  image: {
    type: String,
    required: true,
  },
  users: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tools", toolsSchema);
