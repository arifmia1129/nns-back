const router = require('express').Router();
const provideHelpController = require('../controller/provideHelp.controller');
const auth = require('../middleware/auth');
const uploader = require('../middleware/uploader');
const verifyToken = require('../middleware/verifyToken');

router
  .route('/')
  .post(
    verifyToken,
    auth('admin'),
    uploader.single('image'),
    provideHelpController.addHelp
  )
  .get(provideHelpController.getHelp);

module.exports = router;
