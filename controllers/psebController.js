const Pseb = require("./../models/psebModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllPsebDocuments = catchAsync(async (res) => {
  const allPsebDocuments = await Pseb.find();

  res.status(200).json({
    status: "success",
    results: allPsebDocuments.length,
    data: {
      allPsebDocuments,
    },
  });
});


exports.getPsebDocuments = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const psebDocuments = await Pseb.findById(req.params.id);
  if (!psebDocuments) {
    return next(new AppError("No Pseb Documents found.", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      psebDocuments,
    },
  });
});

exports.createPsebDocuments = catchAsync(async (req, res) => {
  console.log(req.body);
  const newPsebDocuments = await Pseb.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      psebDocuments: newPsebDocuments,
    },
  });
});
