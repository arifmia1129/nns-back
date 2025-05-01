const auth = require('../middleware/auth');
const verifyToken = require('../middleware/verifyToken');
const adviserMessageController = require('../controller/adviserMessage.controller');

const router = require('express').Router();

router.post(
  '/',
  verifyToken,
  auth('admin'),
  adviserMessageController.updateAdviserMessage
);

router.get('/', adviserMessageController.getAdviserMessage);

module.exports = router;
