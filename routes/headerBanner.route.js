const router = require("express").Router();
const headerController = require("../controller/headerBanner.controller");
const auth = require("../middleware/auth");
const uploader = require("../middleware/uploader");
const verifyToken = require("../middleware/verifyToken");

router
  .route("/")
  .post(
    verifyToken,
    auth("admin"),
    uploader.single("image"),
    headerController.addHeaderBanner
  )
  .get(headerController.getHeaderBanner);

module.exports = router;
