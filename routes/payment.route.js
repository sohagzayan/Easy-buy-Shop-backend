const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/purchaseControllers");

router.route("/").post(paymentController.paymentIntent);
router.route("/:id").put(paymentController.updatePayedInfo);

module.exports = router;
