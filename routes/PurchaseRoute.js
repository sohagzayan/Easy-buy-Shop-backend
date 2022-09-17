const express = require("express");
const purchaseRoute = express.Router();
const {
  addPurchase,
  getAllPurchase,
  getSingleParson,
  paymentIntent,
  updatePayedInfo,
  deletePursesProduct,
} = require("../controllers/purchaseControllers");
const authToken = require("../middlWare/authToken");

purchaseRoute.post("/", addPurchase);
purchaseRoute.get("/", getAllPurchase);
purchaseRoute.get("/:id", getSingleParson);
purchaseRoute.post("/payment", paymentIntent);
purchaseRoute.put("/:id", updatePayedInfo);
purchaseRoute.delete("/:id", deletePursesProduct);

module.exports = purchaseRoute;
