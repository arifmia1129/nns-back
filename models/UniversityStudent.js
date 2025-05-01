const { Schema, model } = require("mongoose");

const universityStudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  facebookUrl: {
    type: String,
  },
  whatsappUrl: {
    type: String,
  },
});

const UniversityStudent = model("UniversityStudent", universityStudentSchema);
module.exports = UniversityStudent;
