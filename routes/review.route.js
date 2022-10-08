const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authToken = require("../middlWare/authToken");

router.route("/review_count").get(reviewController.getAllReviewCount);
router.route("/").post(authToken, reviewController.postReview);
router.route("/").get(authToken, reviewController.getReview);

module.exports = router;
