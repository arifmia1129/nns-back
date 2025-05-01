const DonorPartner = require('../models/DonorPartner');

exports.addDonorPartnerService = async (donorPartnerInfo) => {
  await DonorPartner.create(donorPartnerInfo);
};

exports.getDonorPartnerService = async () => {
  return await DonorPartner.find();
};
