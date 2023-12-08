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
  const secpDocuments = await Secp.findOne({ userId: user._id });
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
  const {
    officeAddress,
    telephoneNumber,
    director1,
    director2,
    director3,
  } = req.body;
  const secpDocuments = req.files;

  const uploadedDocs = await Secp.create({
    userId: user._id,
    cnic: {
      fileName: secpDocuments.image1[0].filename,
      path: secpDocuments.image1[0].path,
    },
    memorandum: {
      fileName: secpDocuments.image2[0].filename,
      path: secpDocuments.image2[0].path,
    },
    complianceForm: {
      fileName: secpDocuments.image3[0].filename,
      path: secpDocuments.image3[0].path,
    },
    feeChallan: {
      fileName: secpDocuments.image4[0].filename,
      path: secpDocuments.image4[0].path,
    },
    officeAddress,
    telephoneNumber,
    director1,
    director2,
    director3,
  });

  if (!uploadedDocs) {
    return next(new AppError("Unable to create Secp documents.", 404));
  }

  res.status(201).json({
    status: "success",
  });
});
