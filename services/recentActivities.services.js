const RecentActivities = require('../models/RecentActivities');

exports.createRecentActivity = async (activity) => {
  await RecentActivities.create(activity);
};

exports.getRecentActivityService = async () => {
  return await RecentActivities.find();
};
