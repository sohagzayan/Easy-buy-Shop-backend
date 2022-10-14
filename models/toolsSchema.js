const mongoose = require("mongoose");

const toolsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [65, "Your Title is so long!"],
  },
  details: {
    type: String,
    required: true,
    minLength: [
      100,
      "Your Product Details is Very Small please minimum add 30 characters",
    ],
    maxLength: [
      400,
      "Your Product Details is Very Long please maximum add 400 characters",
    ],
  },
  price: {
    type: Number,
    max: [
      10000,
      "You Can't sell 10000 over price product. You need Pro account!",
    ],
    default: 0,
    required: true,
  },
  InStock: {
    type: Number,
    min: [1, "Stock Product minimum 1 needed"],
    max: [200, "You Can't sell 50 over product. You need Pro account!"],
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
    default: "others",
  },
  Brand: {
    type: String,
    default: "others",
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
  view: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
toolsSchema.index({ name: "text" });
module.exports = mongoose.model("Tools", toolsSchema);
