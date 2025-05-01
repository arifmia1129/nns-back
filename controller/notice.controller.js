const {
  createNoticeService,
  getNoticesService,
  getNoticeByIdService,
  updateNoticeByIdService,
  deleteNoticeByIdService,
} = require("../services/notice.service");
const uploader = require("../middleware/uploader");

exports.createNotice = async (req, res, next) => {
  try {
    const files = req.files;
    const attachments = files?.map((file) => ({
      url: `${req.protocol}://${req.get("host")}/${file.path}`,
      type: file.mimetype.includes("pdf") ? "pdf" : "image",
    }));

    const noticeData = {
      ...req.body,
      attachments,
    };

    const result = await createNoticeService(noticeData);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: "Notice successfully created",
      data: result,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.getNotices = async (req, res, next) => {
  try {
    const result = await getNoticesService();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Successfully retrieved notices",
      data: result,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.getNoticeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getNoticeByIdService(id);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Successfully retrieved notice",
      data: result,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.updateNoticeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateNoticeByIdService(id, req.body);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Notice successfully updated",
      data: result,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.deleteNoticeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteNoticeByIdService(id);

    res.status(204).send();
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
