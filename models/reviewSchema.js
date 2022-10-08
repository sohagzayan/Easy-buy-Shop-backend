const mongoose = require("mongoose");
var moment = require("moment");

const reviewSchema = mongoose.Schema({
  title: {
    type: String,
  },
  rating: {
    type: Number,
  },
  productId: {
    type: mongoose.Types.ObjectId,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
});

module.exports = mongoose.model("Review", reviewSchema);
