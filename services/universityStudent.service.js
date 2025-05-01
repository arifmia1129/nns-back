const UniversityStudent = require("../models/UniversityStudent");

exports.createUniversityStudentService = async (universityStudent) => {
  return await UniversityStudent.create(universityStudent);
};

exports.getUniversityStudentSerivice = async () => {
  return await UniversityStudent.find();
};

exports.deleteUniversityStudentByIdService = async (id) => {
  return await UniversityStudent.findOneAndDelete({ _id: id });
};
