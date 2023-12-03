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
  console.log(req.params);
  const bankDocuments = await Bank.findById(req.params.id);
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
  console.log(req.body);
  const newBankDocuments = await Bank.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      bankDocuments: newBankDocuments,
    },
  });
});
