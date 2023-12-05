const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const verifyToken = require("./../utils/verifyToken");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  console.log("all");
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  const tokenStatus = verifyToken(token);
  if (tokenStatus == "expired token") {
    return next(new AppError("token expired", 404));
  }
  const user = await User.findById({ _id: tokenStatus.id });
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id, name, password } = req.body;

  console.log(id);
  console.log(req.body);

  const user = await User.findByIdAndUpdate(
    { _id: id },
    { name: name, password: password },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) {
    return next(new AppError("No User Found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
