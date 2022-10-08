const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseControllers");
const authToken = require("../middlWare/authToken");

router
  .route("/alredy_purchase")
  .get(authToken, purchaseController.alredyBuyProduct);
router.route("/").post(authToken, purchaseController.addPurchase);
router
  .route("/my_product_order")
  .get(authToken, purchaseController.getAllPurchaseMyProduct);
router.route("/").get(authToken, purchaseController.getAllPurchase);
router.route("/:id").get(authToken, purchaseController.getSingleParson);
router.route("/:id").put(purchaseController.UpdatePurchaseInfo);
router.route("/:id").delete(purchaseController.deletePursesProduct);

module.exports = router;
