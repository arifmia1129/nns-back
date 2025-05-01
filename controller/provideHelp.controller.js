const {
  addHelpService,
  getHelpService,
} = require('../services/provideHelp.service');

exports.addHelp = async (req, res, next) => {
  try {
    const helpDetails = req.body;

    helpDetails.imageUrl = req.file.destination + req.file.filename;

    await addHelpService(helpDetails);

    res.status(201).json({
      success: true,
      message: 'Successfully added help details',
    });
  } catch (error) {
    next(error);
  }
};

exports.getHelp = async (req, res, next) => {
  try {
    const help = await getHelpService();

    if (!help.length) {
      const error = new Error("Couldn't get help details");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Successfully get help details',
      help,
    });
  } catch (error) {
    next(error);
  }
};
