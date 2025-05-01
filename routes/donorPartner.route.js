const router = require('express').Router();
const donorPartnerController = require('../controller/donorPartner.controller');
const auth = require('../middleware/auth');
const uploader = require('../middleware/uploader');
const verifyToken = require('../middleware/verifyToken');

router
  .route('/')
  .post(
    verifyToken,
    auth('admin'),
    uploader.single('image'),
    donorPartnerController.addDonorPartner
  )
  .get(donorPartnerController.getDonorPartner);

module.exports = router;
