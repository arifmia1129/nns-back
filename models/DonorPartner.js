const { Schema, model } = require('mongoose');

const donorPartnerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  facebookUrl: {
    type: String,
  },
  webUrl: {
    type: String,
  },
  emailUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const DonorPartner = model('DonorPartner', donorPartnerSchema);

module.exports = DonorPartner;
