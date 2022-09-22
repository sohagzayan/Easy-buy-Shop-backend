const express = require("express");
const router = express.Router();
const loginController = require("../controllers/userController");

router.route("/").post(loginController.loginUser);

module.exports = router;
