const mongoose = require("mongoose");
var moment = require("moment");

const reviewSchema = mongoose.Schema({
  rating: {
    type: Number,
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
