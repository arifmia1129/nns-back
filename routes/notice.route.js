const express = require("express");
const noticeController = require("../controller/notice.controller");
const uploader = require("../middleware/uploader"); // File upload middleware
const auth = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Create a new notice with multiple file uploads
router.post(
  "/",
  verifyToken,
  auth("admin"),
  uploader.array("attachments", 10), // Allow up to 10 files
  noticeController.createNotice
);

// Get all notices
router.get("/", noticeController.getNotices);

// Get notice by ID
router.get("/:id", noticeController.getNoticeById);

// Update notice by ID
router.put(
  "/:id",
  verifyToken,
  auth("admin"),
  uploader.array("attachments", 10), // Allow up to 10 files
  noticeController.updateNoticeById
);

// Delete notice by ID
router.delete(
  "/:id",
  verifyToken,
  auth("admin"),
  noticeController.deleteNoticeById
);

module.exports = router;
