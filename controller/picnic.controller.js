const {
  createPicnicService,
  getPicnicSerivice,
  getPicnicByIdSerivice,
  deletePicnicByIdService,
} = require("../services/picnic.service");
const sendSms = require("../utils/sendSms");

exports.createPicnic = async (req, res, next) => {
  try {
    const result = await createPicnicService(req.body);

    if (result) {
      sendSms(
        result?.mobile,
        `Dear ${result?.name}, Thanks for your registration for our picnic. Your total member is ${result?.totalMember}. pbtsbd.org`
      );
    }

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Successfully accepted a picnic",
      data: result,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.getPicnic = async (req, res, next) => {
  try {
    const result = await getPicnicSerivice();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Successfully retrieved picnic",
      data: result,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.getPicnicById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getPicnicByIdSerivice(id);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Successfully retrieved picnic",
      data: result,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.deletePicnicById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deletePicnicByIdService(id, req.body);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Successfully deleted picnic",
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
