const { Schema, model } = require("mongoose");
const moment = require("moment");

const scholarshipApplicationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    idStatus: {
      type: String,
      required: true,
      enum: ["birth", "nid"],
    },
    idNo: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return moment(value, "DD-MM-YYYY", true).isValid();
        },
        message: "Invalid date format. Please use the DD-MM-YYYY format.",
      },
    },
    division: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    upazila: {
      type: String,
      required: true,
      trim: true,
    },
    union: {
      type: String,
      required: true,
      trim: true,
    },
    village: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    bkashNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    maritalStatus: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    guardianIncome: {
      type: String,
      required: true,
    },
    guardianIncomeCertificate: {
      type: String,
      required: true,
    },
    guardianProfession: {
      type: String,
      required: true,
    },
    familyMember: {
      type: String,
      required: true,
    },
    instituteName: {
      type: String,
      required: true,
    },
    healthStatus: {
      type: String,
      required: true,
    },
    lastExam: {
      type: String,
      enum: ["ssc", "hsc"],
      required: true,
    },
    sscResult: {
      board: {
        type: String,
      },
      educationDivision: {
        type: String,
      },
      year: {
        type: String,
      },
      result: {
        type: String,
      },
      resultWithout4thSub: {
        type: String,
      },
      markSheetUrl: {
        type: String,
      },
    },
    hscResult: {
      board: {
        type: String,
      },
      educationDivision: {
        type: String,
      },
      year: {
        type: String,
      },
      result: {
        type: String,
      },
      resultWithout4thSub: {
        type: String,
      },
      markSheetUrl: {
        type: String,
      },
    },
    profileImageUrl: {
      type: String,
      required: true,
    },
    signatureImageUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const ScholarshipApplication = model(
  "ScholarshipApplication",
  scholarshipApplicationSchema
);

module.exports = ScholarshipApplication;
