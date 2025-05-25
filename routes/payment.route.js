const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment.controller");
const verifyToken = require("../middleware/verifyToken");
const uploader = require("../middleware/uploader");
const auth = require("../middleware/auth");

// Member routes
router.post(
  "/submit",
  verifyToken,
  uploader.single("screenshot"),
  paymentController.submitPayment
);
router.get("/my-payments", verifyToken, paymentController.getMyPayments);
router.get("/summary", verifyToken, paymentController.getPaymentSummary);

// Admin routes
router.get("/", verifyToken, auth("admin"), paymentController.getPayments);
router.patch(
  "/status",
  verifyToken,
  auth("admin"),
  paymentController.updatePaymentStatus
);

module.exports = router;
