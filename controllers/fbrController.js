const Fbr = require("./../models/fbrModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllFbrDocuments = catchAsync(async (res) => {
  const allFbrDocuments = await Fbr.find();
  res.status(200).json({
    status: "success",
    results: allFbrDocuments.length,
    data: {
      allFbrDocuments,
    },
  });
});

exports.getFbrDocuments = catchAsync(async (req, res, next) => {
  const user = req.user;
  const fbrDocuments = await Fbr.findOne({ userId: user._id });
  if (!fbrDocuments) {
    return next(new AppError("No Fbr Documents found.", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      fbrDocuments,
    },
  });
});

exports.createFbrDocuments = catchAsync(async (req, res) => {
  const user = req.user;
  const documents = req.body;

  const docs = await Fbr.create({
    ...documents,
    userId: user._id,
  });

  if (!docs) {
    return next(new AppError("Unable to create Fbr documents.", 404));
  }

  res.status(201).json({
    status: "success",
  });
});
