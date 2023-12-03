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
  console.log(req.params);
  const fbrDocuments = await Fbr.findById(req.params.id);
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
  console.log(req.body);
  const newFbrDocuments = await Fbr.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      fbrDocuments: newFbrDocuments,
    },
  });
});
