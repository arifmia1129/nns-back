const {
  createRecentActivity,
  getRecentActivityService,
} = require('../services/recentActivities.services');

exports.createRecentActivity = async (req, res, next) => {
  try {
    const activityInfo = req.body;

    activityInfo.imageUrl = req.file.destination + req.file.filename;

    await createRecentActivity(activityInfo);

    res.status(201).json({
      success: true,
      message: 'Successfully created activity',
    });
  } catch (error) {
    next(error);
  }
};

exports.getRecentActivity = async (req, res, next) => {
  try {
    const activities = await getRecentActivityService();

    if (!activities.length) {
      const error = new Error('Activities not found');
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Successfully get activities',
      data: {
        activities,
      },
    });
  } catch (error) {
    next(error);
  }
};
