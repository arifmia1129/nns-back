const { Schema, model } = require('mongoose');

const principalAdviserMessageSchema = {
  message: {
    type: String,
    unique: true,
    required: true,
    maxlength: 500,
  },
};

const PrincipalAdviserMessage = model(
  'PrincipalAdviserMessage',
  principalAdviserMessageSchema
);
module.exports = PrincipalAdviserMessage;
