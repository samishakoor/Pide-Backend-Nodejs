const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const auth = require("../utils/verifyToken");

module.exports = catchAsync(async (req, res, next) => {
  let token;
  if (req.params.token) {
    token = req.params.token;
  }

  if (!token) {
    return next(new AppError("Token Not Found", 401));
  }

  const tok = auth.verifyTokenForPasswordReset(token);
  if (tok == "expired") {
    res.render("tokenExpired");
  }

  const rootUser = await User.findById({ _id: tok.id });
  if (!rootUser) {
    return next(new AppError("User Not Found", 404));
  }

  req.user = rootUser;
  next();
});
