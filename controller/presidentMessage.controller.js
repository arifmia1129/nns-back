const {
  getPresidentMessageService,
  addPresidentMessageService,
} = require("../services/presidentMessage.service");

exports.updatePresidentMessage = async (req, res, next) => {
  try {
    await addPresidentMessageService(req.body);

    res.status(201).json({
      success: true,
      message: "Successfully added message",
    });
  } catch (error) {
    next(error);
  }
};

exports.getPresidentMessage = async (req, res, next) => {
  try {
    const message = await getPresidentMessageService();

    res.status(201).json({
      success: true,
      message: "Successfully get message",
      presidentMessage: message,
    });
  } catch (error) {
    next(error);
  }
};
