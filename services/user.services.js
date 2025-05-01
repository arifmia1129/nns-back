const User = require('../models/User');

exports.signupService = async (signupInfo) => {
  const user = await User.create(signupInfo);
  return user;
};

exports.loggedInUserService = async (mobile) => {
  return await User.findOne({ mobile });
};

exports.getUsersService = async (query) => {
  return await User.find(query, { password: 0 });
};

exports.changeUserRoleService = async ({ _id, role }) => {
  return await User.updateOne({ _id }, { role }, { runValidators: true });
};

exports.changeUserStatusService = async ({ _id, status }) => {
  return await User.updateOne({ _id }, { status }, { runValidators: true });
};

exports.getUserByToken = async (token) => {
  return await User.findOne({ confirmationToken: token });
};
