const User = require("./../models/userModel");
const Salt = require("./../models/saltModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const auth = require("./../utils/signToken");
const sendEmail = require("./../utils/sendMail");
const genSalt = require("./../utils/generateSalt");
const bcrypt = require("bcryptjs");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return next(new AppError("User Already Exists.", 404));
  }

  const salt = await genSalt();
  const encryptedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: encryptedPassword,
  });

  if (!user) {
    return next(new AppError("Unable to create User", 500));
  }

  const generatedSalt = await Salt.create({
    userId: user._id,
    salt: salt,
  });

  if (!generatedSalt) {
    return next(new AppError("Unable to store salt", 500));
  }

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

  const salt = await Salt.findOne({ userId: user._id });

  if (!salt) {
    return next(new AppError("Unable to find salt", 404));
  }

  const enteredEncryptedPassword = await bcrypt.hash(password, salt.salt);

  const storedEncryptedPassword = user.password;
  if (enteredEncryptedPassword !== storedEncryptedPassword) {
    return next(new AppError("Invalid Password", 401));
  }

  const token = auth.signToken({ id: user._id });
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
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const oldUser = await User.findOne({ email });
  if (!oldUser) {
    return next(new AppError("User Not Exists.", 404));
  }

  const token = auth.signTokenForPasswordReset({ id: oldUser._id });
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
  const oldUser = req.user;
  res.render("resetPassword", { email: oldUser.email, status: false });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const oldUser = req.user;
  const { password } = req.body;

  const salt = await genSalt();
  const encryptedPassword = await bcrypt.hash(password, salt);
  const updatedUser = await User.findByIdAndUpdate(
    {
      _id: oldUser._id,
    },
    {
      password: encryptedPassword,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser) {
    return next(new AppError("Unable to update password", 500));
  }

  const generatedSalt = await Salt.findOneAndUpdate(
    {
      userId: updatedUser._id,
    },
    {
      salt: salt,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!generatedSalt) {
    return next(new AppError("Unable to store salt", 500));
  }

  res.render("resetPassword", { email: oldUser.email, status: true });
});
