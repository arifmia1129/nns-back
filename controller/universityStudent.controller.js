const {
  createUniversityStudentService,
  getUniversityStudentSerivice,
  deleteUniversityStudentByIdService,
} = require("../services/universityStudent.service");
const sendSms = require("../utils/sendSms");

exports.createUniversityStudent = async (req, res, next) => {
  try {
    const universityStudentInfo = req.body;

    universityStudentInfo.imageUrl = req.file.destination + req.file.filename;

    const universityStudent = await createUniversityStudentService(
      universityStudentInfo
    );
    res.status(201).json({
      success: true,
      message: `${universityStudent.name} কে পাবলিক বিশ্ববিদ্যালয়ের শিক্ষার্থী হিসাবে যুক্ত করা হয়েছে।`,
      data: universityStudent,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

exports.getUniversityStudent = async (req, res, next) => {
  try {
    const universityStudent = await getUniversityStudentSerivice();

    if (!universityStudent.length) {
      return res.status(400).json({
        success: false,
        message: "University Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully get University Student",
      data: universityStudent,
    });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.deleteUniversityStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteUniversityStudentByIdService(id);

    res.status(200).json({
      success: true,
      message: `${response?.name} কে পাবলিক বিশ্ববিদ্যালয়ের শিক্ষার্থী থেকে ডিলেট করা হয়েছে`,
      data: response,
    });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};
