const router = require('express').Router();
const scholarshipApplicationController = require('../controller/scholarshipApplication.controller');
const auth = require('../middleware/auth');
const verifyToken = require('../middleware/verifyToken');

router
  .route('/')
  .post(scholarshipApplicationController.createScholarshipApplication)
  .get(
    verifyToken,
    auth('admin'),
    scholarshipApplicationController.getScholarshipApplication
  );
router.get(
  '/:id',
  scholarshipApplicationController.getScholarshipApplicationById
);

router.patch(
  '/:id',
  scholarshipApplicationController.updateScholarshipApplicationById
);

module.exports = router;
