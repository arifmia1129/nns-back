const { Schema, model } = require('mongoose');

const provideHelpSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  helpDetails: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const ProvideHelp = model('ProvideHelp', provideHelpSchema);

module.exports = ProvideHelp;
