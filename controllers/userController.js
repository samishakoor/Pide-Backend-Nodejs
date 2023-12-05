const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const verifyToken = require("./../utils/verifyToken");
const AppError = require("./../utils/appError");

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
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return next(new AppError("'Authorization header is missing'", 401));
  }

  const token = authorizationHeader.split(" ")[1];
  const secret=process.env.JWT_SECRET;
  const tokenStatus = verifyToken(token,secret);
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
  
  const {name} = req.body;
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return next(new AppError("'Authorization header is missing'", 401));
  }
  const token = authorizationHeader.split(" ")[1];
  const secret=process.env.JWT_SECRET;
  const tokenStatus = verifyToken(token,secret);
  
  if (tokenStatus == "expired token") {
    return next(new AppError("token expired", 404));
  }

  const user = await User.findByIdAndUpdate(
    { _id: tokenStatus.id },
    { name: name},
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
