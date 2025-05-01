const HeaderBanner = require("../models/HeaderBanner");

exports.addHeaderBannerService = async (help) => {
  await HeaderBanner.create(help);
};

exports.getHeaderBannerService = async () => {
  return await HeaderBanner.find();
};
