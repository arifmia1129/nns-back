const {
  createMeritoriousStudentService,
  getMeritoriousStudentService,
  getMeritoriousStudentByIdService,
  updateMeritoriousStudentByIdService,
} = require("../services/meritoriousStudent.service");
const sendSms = require("../utils/sendSms");

exports.createMeritoriousStudent = async (req, res, next) => {
  try {
    const result = await createMeritoriousStudentService(req.body);

    if (result) {
      sendSms(
        result?.mobile,
        `Dear, ${result.name} We have received your information for meritoriouse student reception. You will be notified if selected for this reception. Application Id: ${result.id}. pbtsbd.org`
      );
    }

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "আবেদন সফলভাবে গৃহীত হয়েছে",
      data: result,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.getMeritoriousStudent = async (req, res, next) => {
  try {
    const result = await getMeritoriousStudentService();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Successfully retrieved meritorious student",
      data: result,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.getMeritoriousStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getMeritoriousStudentByIdService(id);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Successfully retrieved meritorious student",
      data: result,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.updateMeritoriousStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateMeritoriousStudentByIdService(id, req.body);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "শিক্ষার্থীর তথ্য সফলভাবে আপডেট হয়েছে",
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
