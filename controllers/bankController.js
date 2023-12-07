const Bank = require("./../models/bankModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllBankDocuments = catchAsync(async (res) => {
  const allBankDocuments = await Bank.find();
  res.status(200).json({
    status: "success",
    results: allBankDocuments.length,
    data: {
      allBankDocuments,
    },
  });
});

exports.getBankDocuments = catchAsync(async (req, res, next) => {
  const user = req.user;
  const bankDocuments = await Bank.findById(user._id);
  if (!bankDocuments) {
    return next(new AppError("No Bank Documents found.", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      bankDocuments,
    },
  });
});

exports.createBankDocuments = catchAsync(async (req, res) => {
  const user = req.user;
  const { documents } = req.body;

  const docs=await Bank.create({
    ...documents,
    userId: user._id,
  });

  if (!docs) {
    return next(new AppError("Unable to create bank documents.", 404));
  }

  res.status(201).json({
    status: "success",
  });
});
