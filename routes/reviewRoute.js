const express = require("express");
const reviewRoute = express.Router();
const { postReview, getReview } = require("../controllers/reviewController");
const authToken = require("../middlWare/authToken");

reviewRoute.post("/", authToken, postReview);
reviewRoute.get("/", authToken, getReview);

module.exports = reviewRoute;
