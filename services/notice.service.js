const Notice = require("../models/Notice");

exports.createNoticeService = async (noticeData) => {
  try {
    const notice = await Notice.create(noticeData);
    return notice;
  } catch (error) {
    throw new Error(`Error creating notice: ${error.message}`);
  }
};

exports.getNoticesService = async () => {
  try {
    const notices = await Notice.find();
    return notices;
  } catch (error) {
    throw new Error(`Error fetching notices: ${error.message}`);
  }
};

exports.getNoticeByIdService = async (id) => {
  try {
    const notice = await Notice.findById(id);
    if (!notice) {
      throw new Error("Notice not found");
    }
    return notice;
  } catch (error) {
    throw new Error(`Error fetching notice by ID: ${error.message}`);
  }
};

exports.updateNoticeByIdService = async (id, updateData) => {
  try {
    const notice = await Notice.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!notice) {
      throw new Error("Notice not found");
    }
    return notice;
  } catch (error) {
    throw new Error(`Error updating notice: ${error.message}`);
  }
};

exports.deleteNoticeByIdService = async (id) => {
  try {
    const notice = await Notice.findByIdAndDelete(id);
    if (!notice) {
      throw new Error("Notice not found");
    }
    return notice;
  } catch (error) {
    throw new Error(`Error deleting notice: ${error.message}`);
  }
};
