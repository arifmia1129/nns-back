const {
  createMemberService,
  getMemberSerivice,
  deleteMemberByIdService,
} = require("../services/member.service");
const {
  signupService,
  loggedInUserService,
  getUserByToken,
  getUsersService,
  changeUserRoleService,
  changeUserStatusService,
} = require("../services/user.services");
const sendSms = require("../utils/sendSms");
const { generateToken } = require("../utils/token");

exports.createMember = async (req, res, next) => {
  try {
    const memberInfo = req.body;

    memberInfo.imageUrl = req.file.destination + req.file.filename;
    const member = await createMemberService(memberInfo);
    sendSms(
      member?.mobile,
      `পূর্ব বড়ুয়া তরুণ সংঘ এ আপনাকে স্বাগতম। আপনার পদবী ${member?.organizationDesignation}। pbtsbd.org`
    );

    res.status(201).json({
      success: true,
      message: `${member.name} কে কার্যকরী সদস্য হিসাবে যুক্ত করা হয়েছে।`,
      data: member,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.getMember = async (req, res, next) => {
  try {
    const member = await getMemberSerivice();

    if (!member.length) {
      return res.status(400).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully get member",
      data: member,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.deleteMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteMemberByIdService(id);

    res.status(200).json({
      success: true,
      message: `${response?.name} কে কার্যকরী সদস্য পদ থেকে ডিলেট করা হয়েছে`,
      data: response,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
