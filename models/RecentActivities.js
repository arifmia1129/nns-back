const { Schema, model } = require('mongoose');

const recentActivitiesSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 100,
  },
  longDescription: {
    type: String,
    required: true,
  },
});

const RecentActivities = model('RecentActivities', recentActivitiesSchema);

module.exports = RecentActivities;
