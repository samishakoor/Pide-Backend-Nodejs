const jwt = require("jsonwebtoken");
module.exports = (tokenEntity) => {
  return jwt.sign(tokenEntity, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
