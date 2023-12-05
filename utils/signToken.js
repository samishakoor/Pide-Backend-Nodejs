const jwt = require("jsonwebtoken");
module.exports = (tokenEntity, secretKey) => {
  return jwt.sign(tokenEntity, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
