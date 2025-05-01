const {
  getAdviserMessageService,
  addAdviserMessageService,
} = require('../services/adviserMessage.service');

exports.updateAdviserMessage = async (req, res, next) => {
  try {
    await addAdviserMessageService(req.body);

    res.status(201).json({
      success: true,
      message: 'Successfully added message',
    });
  } catch (error) {
    next(error);
  }
};

exports.getAdviserMessage = async (req, res, next) => {
  try {
    const message = await getAdviserMessageService();

    res.status(201).json({
      success: true,
      message: 'Successfully get message',
      adviserMessage: message,
    });
  } catch (error) {
    next(error);
  }
};
