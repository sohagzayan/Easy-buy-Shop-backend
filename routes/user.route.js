const express = require("express");
const router = express.Router();
const signinController = require("../controllers/userController");

router.route("/").get(signinController.getAllUser);
router.route("/:id").get(signinController.getSingleUser);
router.route("/currentuser/:id").get(signinController.currentUser);
router.route("/:id").delete(signinController.deleteUser);
router.route("/:id").put(signinController.userUpdate);

module.exports = router;
