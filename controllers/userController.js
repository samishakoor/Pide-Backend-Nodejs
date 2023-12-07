const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new AppError("Users not found", 404));
  }
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const {user} = req.rootUser;
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const { user } = req.rootUser;
  const updatedUser = await User.findByIdAndUpdate(
    { _id: user._id },
    { name: name },
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
      updatedUser,
    },
  });
});
