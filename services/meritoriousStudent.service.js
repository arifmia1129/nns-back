const MeritoriousStudent = require("../models/MeritoriousStudent");
const generateMeritoriousStudentId = require("../utils/generateMeritoriousStudentId");
const sendSms = require("../utils/sendSms");

exports.createMeritoriousStudentService = async (application) => {
  const id = await generateMeritoriousStudentId();
  application.id = id;
  const res = await MeritoriousStudent.create(application);
  return res;
};

exports.getMeritoriousStudentService = async () => {
  return await MeritoriousStudent.find();
};

exports.getMeritoriousStudentByIdService = async (id) => {
  return await MeritoriousStudent.findOne({ id });
};

exports.updateMeritoriousStudentByIdService = async (id, info) => {
  const res = await MeritoriousStudent.findOneAndUpdate({ id }, info, {
    runValidators: true,
  });

  if (res && info.status === "accepted") {
    sendSms(
      res?.mobile,
      `Dear, ${res.name} Congratulations! You have been selected for meritorious student reception. Application Id: ${res.id}. Details: pbtsbd.org`
    );
  }

  return res;
};
