const PrincipalAdviserMessage = require('../models/PrincipalAdviserMessage');

exports.addAdviserMessageService = async (message) => {
  await PrincipalAdviserMessage.create(message);
};

exports.getAdviserMessageService = async () => {
  return await PrincipalAdviserMessage.find();
};
