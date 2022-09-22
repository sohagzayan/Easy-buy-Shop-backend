const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseControllers");

router.route("/").post(purchaseController.addPurchase);
router.route("/").get(purchaseController.getAllPurchase);
router.route("/:id").get(purchaseController.getSingleParson);
router.route("/:id").delete(purchaseController.deletePursesProduct);

module.exports = router;
