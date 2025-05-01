const { Schema, model } = require("mongoose");

const picnicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  guardianName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  village: {
    type: String,
    required: true,
  },
  totalMember: {
    type: Number,
    required: true,
  },
  tShirtSize: {
    type: String,
    required: true,
    enum: {
      values: ["M", "L", "XL", "XXL"],
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  accountNo: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
});

const Picnic = model("Picnic", picnicSchema);

module.exports = Picnic;
