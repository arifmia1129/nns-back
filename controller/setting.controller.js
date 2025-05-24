const {
  createSettingService,
  getSettingsService,
  getSettingByIdService,
  getSettingByModuleService,
  updateSettingService,
  deleteSettingService,
} = require("../services/setting.service");

exports.createSetting = async (req, res, next) => {
  try {
    const settingData = req.body;
    settingData.created_by = req.user._id;

    const setting = await createSettingService(settingData);

    res.status(201).json({
      success: true,
      message: "Setting created successfully",
      data: setting,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.getSettings = async (req, res, next) => {
  try {
    const settings = await getSettingsService();

    res.status(200).json({
      success: true,
      message: "Settings retrieved successfully",
      data: settings,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.getSettingById = async (req, res, next) => {
  try {
    const setting = await getSettingByIdService(req.params.id);

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "Setting not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Setting retrieved successfully",
      data: setting,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.getSettingByModule = async (req, res, next) => {
  try {
    const setting = await getSettingByModuleService(req.params.module);

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "Setting not found for this module",
      });
    }

    res.status(200).json({
      success: true,
      message: "Setting retrieved successfully",
      data: setting,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.updateSetting = async (req, res, next) => {
  try {
    const updatedSetting = await updateSettingService(req.params.id, req.body);

    if (!updatedSetting) {
      return res.status(404).json({
        success: false,
        message: "Setting not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Setting updated successfully",
      data: updatedSetting,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.deleteSetting = async (req, res, next) => {
  try {
    const deletedSetting = await deleteSettingService(req.params.id);

    if (!deletedSetting) {
      return res.status(404).json({
        success: false,
        message: "Setting not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Setting deleted successfully",
      data: deletedSetting,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
