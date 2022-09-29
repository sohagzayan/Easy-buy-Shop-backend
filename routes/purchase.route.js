const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseControllers");
const authToken = require("../middlWare/authToken");

router.route("/").post(purchaseController.addPurchase);
router.route("/").get(authToken, purchaseController.getAllPurchase);
router.route("/:id").get(authToken, purchaseController.getSingleParson);
router.route("/:id").delete(purchaseController.deletePursesProduct);

module.exports = router;
