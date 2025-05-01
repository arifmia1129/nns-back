const express = require("express");
const router = express.Router();
const bloodDonorController = require("../controller/bloodDonor.controller");
const verifyToken = require("../middleware/verifyToken");
const uploader = require("../middleware/uploader");
const auth = require("../middleware/auth");

router.get("/", bloodDonorController.getBloodDonors);

router.post(
  "/create",
  uploader.single("profileImage"),
  bloodDonorController.createBloodDonor
);

router.get("/:id", bloodDonorController.getBloodDonorById);

router.put(
  "/:id",
  verifyToken,
  auth("admin"),
  bloodDonorController.updateBloodDonorById
);

router.delete(
  "/:id",
  verifyToken,
  auth("admin"),
  bloodDonorController.deleteBloodDonorById
);

module.exports = router;
