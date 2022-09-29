const express = require("express");
const router = express.Router();
const bookmarkController = require("../controllers/bookmarkRouteController.js");
const authToken = require("../middlWare/authToken.js");

router.route("/:id").post(authToken, bookmarkController.addBookmark);
router.route("/").get(authToken, bookmarkController.getBookmark);

module.exports = router;
