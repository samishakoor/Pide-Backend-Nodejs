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
  const { documents, token } = req.body;

  const tokenStatus = verifyToken(token);
  if (tokenStatus == "expired token") {
    return next(new AppError("token expired", 404));
  }

  Bank.create({
    ...documents,
    userId: tokenStatus.id,
  });

  res.status(201).json({
    status: "success",
  });
});
