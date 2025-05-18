const { Schema, model } = require("mongoose");

const presidentMessageSchema = {
  message: {
    type: String,
    unique: true,
    required: true,
  },
};

const PresidentMessage = model("PresidentMessage", presidentMessageSchema);
module.exports = PresidentMessage;
