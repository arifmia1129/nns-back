module.exports = (...role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!role.includes(userRole)) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: 'You are not valid user for access this feature',
      });
    }
    next();
  };
};
