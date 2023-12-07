const jwt = require("jsonwebtoken");
module.exports = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
    if (err) {
      return "expired token";
    }
    return res;
  });
};
