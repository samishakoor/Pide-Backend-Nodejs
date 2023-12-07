const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const signToken = require("./../utils/signToken");
const sendEmail = require("./../utils/sendMail");

const bcrypt = require("bcryptjs");

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
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    const token = signToken({ id: user._id });
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
  const { email } = req.body;

  const oldUser = await User.findOne({ email });
  if (!oldUser) {
    return next(new AppError("User Not Exists.", 404));
  }

  const token = signToken({id: oldUser._id });
  const link = `http://127.0.0.1:3000/api/v1/users/resetPassword/${token}`;

  const emailSent = await sendEmail(link, oldUser.email);
  if (emailSent) {
    res.status(200).json({
      status: "success",
    });
  } else {
    return next(new AppError("Failed to Send Email", 500));
  }
});

exports.resetPasswordForm = catchAsync(async (req, res, next) => {
  const {oldUser} = req.rootUser;
  if (!oldUser) {
    return next(new AppError("User Not Exists!", 404));
  }
  res.render("index", { email: oldUser.email, status: false });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const {oldUser} = req.rootUser;
  if (!oldUser) {
    return next(new AppError("User Not Exists!", 404));
  }
  const { password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  await User.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      password: encryptedPassword,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.render("index", { email:oldUser.email, status: true });
});
