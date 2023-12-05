const jwt = require("jsonwebtoken");
module.exports = (token,secret) => {
  return jwt.verify(token, secret, (err, res) => {
    if (err) {
      return "token expired";
    }
    return res;
  });
};
