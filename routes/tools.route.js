const express = require("express");
const router = express.Router();
const toolsController = require("../controllers/toolsControllers");
const authToke = require("../middlWare/authToken");
router.route("/").get(authToke, toolsController.getAllTools);
router.route("/:id").get(toolsController.getSingleProducts);
router.route("/").post(authToke, toolsController.AddTools);
router.route("/:id").delete(toolsController.deleteSingleProducts);

module.exports = router;