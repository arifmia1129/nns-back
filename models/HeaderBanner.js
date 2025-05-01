const { Schema, model } = require("mongoose");

const headerBannerSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const HeaderBanner = model("HeaderBanner", headerBannerSchema);

module.exports = HeaderBanner;
