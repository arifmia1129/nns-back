const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
const uploader = require("../middleware/uploader.js");
const auth = require("../middleware/auth.js");

router.get("/", userController.getUsers);

router.post("/signup", uploader.single("image"), userController.signup);

router.post("/login", userController.login);
router.post("/verify-nid", verifyToken, userController.verifyNid);

router.patch("/role", verifyToken, auth("admin"), userController.changeRole);
router.patch(
  "/status",
  verifyToken,
  auth("admin"),
  userController.changeStatus
);

router.get("/me", verifyToken, userController.getMe);

module.exports = router;
