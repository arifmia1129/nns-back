const jwt = require('jsonwebtoken');

exports.generateToken = (userInfo) => {
  const payload = {
    mobile: userInfo.mobile,
    role: userInfo.role,
  };

  return (token = jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: '1d',
  }));
};
