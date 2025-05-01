const Member = require("../models/Member");
const User = require("../models/User");

exports.createMemberService = async (member) => {
  return await Member.create(member);
};

exports.getMemberSerivice = async () => {
  return await Member.find();
};

exports.deleteMemberByIdService = async (id) => {
  return await Member.findOneAndDelete({ _id: id });
};
