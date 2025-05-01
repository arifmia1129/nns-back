const { Schema, model } = require("mongoose");

const presidentMessageSchema = {
  message: {
    type: String,
    unique: true,
    required: true,
    maxlength: 500,
  },
};

const PresidentMessage = model("PresidentMessage", presidentMessageSchema);
module.exports = PresidentMessage;
