const jwt = require("jsonwebtoken");
module.exports = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
    if (err) {
      return "token expired";
    }
    return res;
  });
};
