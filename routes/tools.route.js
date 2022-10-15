const express = require("express");
const router = express.Router();
const toolsController = require("../controllers/toolsControllers");
const authToke = require("../middlWare/authToken");
router.route("/toolsSuggetion").get(toolsController.getProductSuggested);
router.route("/getToolswithOutAuth").get(toolsController.getToolsWithoutAuth);
router.route("/get_all_tools").post(toolsController.getAllTools);
router
  .route("/get_Current_user_product")
  .get(authToke, toolsController.getCurrentUserProduct);
router.route("/tools_count").get(toolsController.getAllToolsAmount);
router.route("/:id").get(toolsController.getSingleProducts);
router.route("/").post(authToke, toolsController.AddTools);
router.route("/:id").put(toolsController.updateProducts);
router.route("/:id").delete(toolsController.deleteSingleProducts);

module.exports = router;
