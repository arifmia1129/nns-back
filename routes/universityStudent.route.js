const express = require("express");
const router = express.Router();
const universityStudent = require("../controller/universityStudent.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
const uploader = require("../middleware/uploader.js");
const auth = require("../middleware/auth.js");

router.get("/", universityStudent.getUniversityStudent);

router.post(
  "/create",
  verifyToken,
  auth("admin"),
  uploader.single("image"),
  universityStudent.createUniversityStudent
);

router.delete(
  "/:id",
  verifyToken,
  auth("admin"),
  universityStudent.deleteUniversityStudent
);

module.exports = router;
