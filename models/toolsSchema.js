const mongoose = require("mongoose");

const toolsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  price: {
    type: String,
  },
  quantity: {
    type: String,
  },
  minimumOrder: {
    type: String,
  },
  discount: {
    type: String,
    default: "0%",
  },
  coupon: {
    type: String,
    coupon: "everyone",
  },

  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tools", toolsSchema);
