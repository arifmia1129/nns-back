const router = require("express").Router();
const PicnicController = require("../controller/picnic.controller");
const auth = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");

router
  .route("/")
  .post(PicnicController.createPicnic)
  .get(verifyToken, auth("admin"), PicnicController.getPicnic);
router.get("/:id", PicnicController.getPicnicById);

router.patch("/:id", PicnicController.deletePicnicById);

module.exports = router;
