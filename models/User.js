const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const moment = require('moment');

/**
 * name (required)
 * fatherName (required)
 * designation (required)
 * institute (required)
 * mobile (required)
 * email (required)
 * address (district, upazila, union) (required)
 * facebook (not required)
 * blood group (required)
 * isAgreeBloodDonation (required)
 * lastBloodDonateDate (not required)
 * nid/birth (required)
 * dob (required)
 * education qualification
 * */

const userScheme = new mongoose.Schema(
  {
    mobile: {
      type: String,
      trim: true,
      unique: [true, 'Mobile number must be unique'],
      required: [true, 'Mobile is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: 6,
    },
    institute: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password didn't match",
      },
    },
    role: {
      type: String,
      enum: {
        values: [
          'adviser',
          'principal-adviser',
          'blood-donor',
          'member',
          'talent-student',
          'university-student',
          'donor',
          'sponsor',
          'freelancer',
          'volunteer',
        ],
      },
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      minLength: [2, 'Name must be at least 3 characters'],
      maxLength: [100, 'Name is too large'],
    },
    email: {
      type: String,
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
    imageUrl: {
      type: String,
      required: true,
    },
    facebookUrl: String,
    bloodGroup: {
      type: String,
      lowercase: true,
      required: true,
      enum: ['a+', 'a-', 'b+', 'b-', 'ab+', 'ab-', 'o+', 'o-'],
    },
    isAgreeDonateBlood: {
      type: Boolean,
      required: true,
      enum: [true, false],
    },
    lastBloodDonation: {
      type: String,
      validate: {
        validator: function (value) {
          return moment(value, 'DD-MM-YYYY', true).isValid();
        },
        message: 'Invalid date format. Please use the DD-MM-YYYY format.',
      },
    },
    nid: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return moment(value, 'DD-MM-YYYY', true).isValid();
        },
        message: 'Invalid date format. Please use the DD-MM-YYYY format.',
      },
    },
    educationQualification: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: 'inactive',
      enum: ['active', 'inactive', 'blocked'],
    },
  },
  {
    timestamps: true,
  }
);

userScheme.pre('save', function (next) {
  const password = this.password;

  if (this.isModified('password') || this.isNew) {
    const hashedPassword = bcrypt.hashSync(password);

    this.password = hashedPassword;
    this.confirmPassword = undefined;
  } else {
    return next();
  }

  next();
});

userScheme.methods.comparePassword = function (pass, hash) {
  const isPasswordValid = bcrypt.compareSync(pass, hash);
  return isPasswordValid;
};

userScheme.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(32).toString('hex');
  this.confirmationToken = token;

  const date = new Date();
  date.setDate(date.getDate() + 1);

  this.confirmationTokenExpire = date;

  return token;
};

const User = mongoose.model('User', userScheme);

module.exports = User;
