const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const signToken = require("./../utils/signToken");
const verifyToken = require("./../utils/verifyToken");
const bcrypt = require("bcryptjs");

var nodemailer = require("nodemailer");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return next(new AppError("User Already Exists.", 404));
  }
  await User.create({
    name,
    email,
    password: encryptedPassword,
  });

  res.status(200).json({
    status: "success",
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User Not Found", 404));
  }

  console.log(user);

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = signToken(user._id);

    if (res.status(201)) {
      res.status(200).json({
        status: "success",
        data: {
          token,
        },
      });
    } else {
      return next(new AppError("Error", 500));
    }
  }
  return next(new AppError("Invalid Password", 404));
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true,
  // });
  // if (!user) {
  //   return next(new AppError("No User Found", 404));
  // }
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     user,
  //   },
  // });
});

exports.resetPasswordForm = catchAsync(async (req, res, next) => {
  // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true,
  // });
  // if (!user) {
  //   return next(new AppError("No User Found", 404));
  // }
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     user,
  //   },
  // });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true,
  // });
  // if (!user) {
  //   return next(new AppError("No User Found", 404));
  // }
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     user,
  //   },
  // });
});
