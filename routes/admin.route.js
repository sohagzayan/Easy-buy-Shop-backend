const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.route("/:email").put(adminController.makeAdmin);
router.route("/:email").get(adminController.getAdmin);

module.exports = router;
