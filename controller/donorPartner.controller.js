const {
  addDonorPartnerService,
  getDonorPartnerService,
} = require('../services/donorPartner.service');

exports.addDonorPartner = async (req, res, next) => {
  try {
    const donorPartnerInfo = req.body;

    donorPartnerInfo.imageUrl = req.file.destination + req.file.filename;

    await addDonorPartnerService(req.body);

    res.status(201).json({
      success: true,
      message: 'Successfully added donor/partner',
    });
  } catch (error) {
    next(error);
  }
};

exports.getDonorPartner = async (req, res, next) => {
  try {
    const donorPartner = await getDonorPartnerService();

    if (!donorPartner.length) {
      const error = new Error("Couldn't get donor/partner");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Successfully get donor/partner',
      donorPartner,
    });
  } catch (error) {
    next(error);
  }
};
