const {
  addHeaderBannerService,
  getHeaderBannerService,
} = require("../services/headerBanner.service");

exports.addHeaderBanner = async (req, res, next) => {
  try {
    const bannerDeatails = req.body;

    bannerDeatails.imageUrl = req.file.destination + req.file.filename;

    await addHeaderBannerService(bannerDeatails);

    res.status(201).json({
      success: true,
      message: "Successfully added Header Banner details",
    });
  } catch (error) {
    next(error);
  }
};

exports.getHeaderBanner = async (req, res, next) => {
  try {
    const HeaderBanner = await getHeaderBannerService();

    if (!HeaderBanner.length) {
      const error = new Error("Couldn't get Header Banner details");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Successfully get Header Banner details",
      data: HeaderBanner,
    });
  } catch (error) {
    next(error);
  }
};
