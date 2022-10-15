const express = require("express");
const router = express.Router();
const addToCardContainer = require("../controllers/addToCardController");
const authToken = require("../middlWare/authToken.js");

router.route("/:id").post(authToken, addToCardContainer.addToCard);
router.route("/:id").get(addToCardContainer.getCardProducts);
router.route("/:id").put(authToken, addToCardContainer.updateAddToCardProduct);
router.route("/:id").delete(authToken, addToCardContainer.deleteFormCard);
// router.route("/").get(bookmarkController.getBookmark);

module.exports = router;
