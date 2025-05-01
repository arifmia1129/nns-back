const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) {
      const error = new Error('Login first to access this feature');
      error.statusCode = 401;
      throw error;
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_TOKEN
    );
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
