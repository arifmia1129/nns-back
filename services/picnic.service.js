const Picnic = require("../models/Picnic");

exports.createPicnicService = async (picnicInfo) => {
  return await Picnic.create(picnicInfo);
};

exports.getPicnicSerivice = async () => {
  return await Picnic.find();
};
exports.getPicnicByIdSerivice = async (id) => {
  return await Picnic.findeById(id);
};

exports.deletePicnicByIdService = async (id) => {
  return await Picnic.findOneAndDelete({ _id: id });
};
