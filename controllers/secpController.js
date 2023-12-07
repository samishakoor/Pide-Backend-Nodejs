const Secp = require("./../models/secpModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllSecpDocuments = catchAsync(async (res) => {
  const allSecpDocuments = await Secp.find();

  res.status(200).json({
    status: "success",
    results: allSecpDocuments.length,
    data: {
      allSecpDocuments,
    },
  });
});

exports.getSecpDocuments = catchAsync(async (req, res, next) => {
  const user = req.user;
  const secpDocuments = await Secp.findById(user._id);
  if (!secpDocuments) {
    return next(new AppError("No Secp Documents found.", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      secpDocuments,
    },
  });
});

exports.createSecpDocuments = catchAsync(async (req, res) => {
  const user = req.user;
  const { documents } = req.body;

  const docs = await Secp.create({
    ...documents,
    userId: user._id,
  });

  if (!docs) {
    return next(new AppError("Unable to create Secp documents.", 404));
  }

  res.status(201).json({
    status: "success",
  });
});
