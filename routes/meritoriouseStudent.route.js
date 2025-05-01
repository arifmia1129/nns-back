const router = require("express").Router();
const meritoriouseStudentController = require("../controller/meritoriouseStudent.controller");
const auth = require("../middleware/auth");
const verifyToken = require("../middleware/verifyToken");

router
  .route("/")
  .post(meritoriouseStudentController.createMeritoriousStudent)
  .get(
    verifyToken,
    auth("admin"),
    meritoriouseStudentController.getMeritoriousStudent
  );
router.get("/:id", meritoriouseStudentController.getMeritoriousStudentById);

router.patch(
  "/:id",
  meritoriouseStudentController.updateMeritoriousStudentById
);

const meritoriousStudentRouter = router;

module.exports = meritoriousStudentRouter;
