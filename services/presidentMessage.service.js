const PresidentMessage = require("../models/PresidentMessage");

exports.addPresidentMessageService = async (message) => {
  await PresidentMessage.create(message);
};

exports.getPresidentMessageService = async () => {
  return await PresidentMessage.find();
};
