const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
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

  const { id } = req.tokenData;
  const user = await User.findById({ _id: id });
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.tokenData;
  const user = await User.findByIdAndUpdate(
    { _id: id },
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
      user,
    },
  });
});
