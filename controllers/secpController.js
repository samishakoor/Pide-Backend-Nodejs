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
  console.log(req.params);
  const secpDocuments = await Secp.findById(req.params.id);
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
  console.log(req.body);
  const newSecpDocuments = await Secp.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      secpDocuments: newSecpDocuments,
    },
  });
});
