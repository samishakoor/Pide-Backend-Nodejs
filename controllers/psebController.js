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
  const user = req.user;
  const psebDocuments = await Pseb.findById(user._id);
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
  const user = req.user;
  const { documents } = req.body;

  const docs = await Pseb.create({
    ...documents,
    userId: user._id,
  });

  if (!docs) {
    return next(new AppError("Unable to create Pseb documents.", 404));
  }

  res.status(201).json({
    status: "success",
  });
});
