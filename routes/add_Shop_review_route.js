const express = require("express");
const router = express.Router();
const addShopReviewController = require("../controllers/addShopReviewController");
const authToken = require("../middlWare/authToken");
router.route("/:id").post(addShopReviewController.addShopReview);
router.route("/").get(addShopReviewController.getShopReview);
router
  .route("/:id")
  .delete(authToken, addShopReviewController.deleteShopReview);

module.exports = router;
