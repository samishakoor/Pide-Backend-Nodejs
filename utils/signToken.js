const jwt = require("jsonwebtoken");
exports.signToken = (tokenEntity) => {
  return jwt.sign(tokenEntity, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signTokenForPasswordReset = (tokenEntity) => {
  return jwt.sign(tokenEntity, process.env.JWT_SECRET, {
    expiresIn: process.env.PASSWORD_RESET_JWT_EXPIRES_IN,
  });
};
