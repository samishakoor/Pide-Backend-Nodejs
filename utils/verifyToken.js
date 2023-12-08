const jwt = require("jsonwebtoken");
module.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
    if (err) {
      return "expired";
    }
    return res;
  });
};

module.verifyTokenForPasswordReset = (token) => {
  return jwt.verify(
    token,
    process.env.PASSWORD_RESET_JWT_EXPIRES_IN,
    (err, res) => {
      if (err) {
        return "expired";
      }
      return res;
    }
  );
};
