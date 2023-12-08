const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const verifyToken = require("../utils/verifyToken");

module.exports = catchAsync(async (req, res, next) => {
  let token;

  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Token Not Found", 401));
  }

  const tok = verifyToken(token);
  if (tok == "expired token") {
    return next(new AppError("token expired", 401));
  }

  const rootUser = await User.findById({ _id: tok.id });
  if (!rootUser) {
    return next(new AppError("User Not Found", 404));
  }

  req.user = rootUser;

  next();
});
