const { Schema, model } = require("mongoose");

const memberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  designation: {
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
  organizationDesignation: {
    type: String,
    required: true,
  },
});

const Member = model("Member", memberSchema);
module.exports = Member;
