const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.route("/").post(reviewController.postReview);
router.route("/").get(reviewController.getReview);

module.exports = router;
