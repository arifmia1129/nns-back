const { Schema, model } = require("mongoose");

const settingSchema = new Schema({
  module: {
    type: String,
    required: true,
    unique: true,
  },
  setting_fields: {
    type: Schema.Types.Mixed,
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Update the updated_at field before saving
settingSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Setting = model("Setting", settingSchema);
module.exports = Setting;
