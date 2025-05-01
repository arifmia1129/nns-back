const ProvideHelp = require('../models/ProvideHelp');

exports.addHelpService = async (help) => {
  await ProvideHelp.create(help);
};

exports.getHelpService = async () => {
  return await ProvideHelp.find();
};
