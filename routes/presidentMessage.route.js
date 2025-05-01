const auth = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");
const presidentMessageController = require("../controller/presidentMessage.controller");

const router = require("express").Router();

router.post(
  "/",
  verifyToken,
  auth("admin"),
  presidentMessageController.updatePresidentMessage
);

router.get("/", presidentMessageController.getPresidentMessage);

module.exports = router;
