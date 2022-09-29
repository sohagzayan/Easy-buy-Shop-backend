const mongoose = require("mongoose");
var moment = require("moment");
const purchaseSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  Number: {
    type: String,
  },
  price: {
    type: String,
  },
  totalPrice: {
    type: Number,
  },
  productId: {
    type: mongoose.Types.ObjectId,
  },
  orderAmount: {
    type: String,
  },

  payed: {
    type: String,
    enum: ["complete", "incomplete"],
    default: "incomplete",
  },
  transactionId: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "complete"],
    default: "pending",
  },
  date: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
});

module.exports = mongoose.model("Purchase", purchaseSchema);
