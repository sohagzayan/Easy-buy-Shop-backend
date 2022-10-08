const express = require("express");
const router = express.Router();
const signinController = require("../controllers/userController");
const authToken = require("../middlWare/authToken");
router.route("/follow_user").get(authToken, signinController.followUser);
router
  .route("/follow_user_remove")
  .get(authToken, signinController.followUserRemove);
router
  .route("/reset_password")
  .post(authToken, signinController.chnagePassword);
router.route("/").get(signinController.getAllUser);
router.route("/:id").get(signinController.getSingleUser);
router.route("/currentuser/:id").get(signinController.currentUser);
router.route("/:id").delete(signinController.deleteUser);
router.route("/:id").put(signinController.userUpdate);

module.exports = router;
