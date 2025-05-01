const express = require("express");
const router = express.Router();
const memberController = require("../controller/member.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
const uploader = require("../middleware/uploader.js");
const auth = require("../middleware/auth.js");

router.get("/", memberController.getMember);

router.post(
  "/create",
  verifyToken,
  auth("admin"),
  uploader.single("image"),
  memberController.createMember
);

router.delete(
  "/:id",
  verifyToken,
  auth("admin"),
  memberController.deleteMember
);

module.exports = router;
