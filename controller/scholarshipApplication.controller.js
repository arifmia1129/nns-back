const {
  createScholarshipApplicationService,
  getScholarshipApplicationService,
  getScholarshipApplicationByIdService,
  updateScholarshipApplicationByIdService,
} = require("../services/scholarshipApplication.service");
const sendSms = require("../utils/sendSms");

exports.createScholarshipApplication = async (req, res, next) => {
  try {
    const result = await createScholarshipApplicationService(req.body);

    if (result) {
      sendSms(
        result?.mobile,
        `Dear, ${result.name} We have received your education scholarship application. You will be notified if selected. Application Id: ${result.id}. pbtsbd.org`
      );
    }

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Successfully accepted a scholarship application",
      data: result,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.getScholarshipApplication = async (req, res, next) => {
  try {
    const result = await getScholarshipApplicationService();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Successfully retrieved scholarship application",
      data: result,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.getScholarshipApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getScholarshipApplicationByIdService(id);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Successfully retrieved scholarship application",
      data: result,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.updateScholarshipApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateScholarshipApplicationByIdService(id, req.body);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Successfully updated scholarship application",
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
