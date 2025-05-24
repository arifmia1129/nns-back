const Setting = require("../models/Setting");

exports.createSettingService = async (settingData) => {
  return await Setting.create(settingData);
};

exports.getSettingsService = async () => {
  return await Setting.find().populate("created_by", "name email");
};

exports.getSettingByIdService = async (id) => {
  return await Setting.findById(id).populate("created_by", "name email");
};

exports.getSettingByModuleService = async (module) => {
  return await Setting.findOne({ module }).populate("created_by", "name email");
};

exports.updateSettingService = async (id, updateData) => {
  return await Setting.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).populate("created_by", "name email");
};

exports.deleteSettingService = async (id) => {
  return await Setting.findByIdAndDelete(id);
};
