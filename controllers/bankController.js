const Bank = require("./../models/bankModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const verifyToken = require("./../utils/verifyToken");

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
  const { id } = req.tokenData;

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
  const { id } = req.tokenData;
  const { documents } = req.body;

  await Bank.create({
    ...documents,
    userId: id,
  });

  res.status(201).json({
    status: "success",
  });
});
