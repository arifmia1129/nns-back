const ScholarshipApplication = require("../models/ScholarshipApplication");
const generateScholarshipApplicationId = require("../utils/generateScholarshipApplicationId");
const sendSms = require("../utils/sendSms");

exports.createScholarshipApplicationService = async (application) => {
  const id = await generateScholarshipApplicationId();
  application.id = id;
  const res = await ScholarshipApplication.create(application);
  return res;
};

exports.getScholarshipApplicationService = async () => {
  return await ScholarshipApplication.find();
};

exports.getScholarshipApplicationByIdService = async (id) => {
  return await ScholarshipApplication.findOne({ id });
};

exports.updateScholarshipApplicationByIdService = async (id, info) => {
  const res = await ScholarshipApplication.findOneAndUpdate({ id }, info, {
    runValidators: true,
  });

  if (res && info.status === "accepted") {
    sendSms(
      res?.mobile,
      `Dear, ${res.name} Congratulations! You have been selected for an education scholarship. Application Id: ${res.id}. Check Result: pbtsbd.org/scholarship-result`
    );
  }

  return res;
};
