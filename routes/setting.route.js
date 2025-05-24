const express = require("express");
const router = express.Router();
const settingController = require("../controller/setting.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
const auth = require("../middleware/auth.js");

// Get all settings
router.get("/", settingController.getSettings);

// Get single setting by ID
router.get("/:id", settingController.getSettingById);

// Get setting by module name
router.get("/module/:module", settingController.getSettingByModule);

// Create new setting
router.post(
  "/create",
  verifyToken,
  auth("admin"),
  settingController.createSetting
);

// Update setting
router.put("/:id", verifyToken, auth("admin"), settingController.updateSetting);

// Delete setting
router.delete(
  "/:id",
  verifyToken,
  auth("admin"),
  settingController.deleteSetting
);

module.exports = router;
