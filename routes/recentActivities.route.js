const router = require('express').Router();
const uploader = require('../middleware/uploader');
const recentActivitiesController = require('../controller/recentActivities.controller');
const verifyToken = require('../middleware/verifyToken');
const auth = require('../middleware/auth');

router.post(
  '/create',
  verifyToken,
  auth('admin'),
  uploader.single('image'),
  recentActivitiesController.createRecentActivity
);

router.get('/get', recentActivitiesController.getRecentActivity);

module.exports = router;
