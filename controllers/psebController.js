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
  const psebDocuments = await Pseb.findOne({ userId: user._id });
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
  const psebDocuments = req.files;

  const uploadedDocs = await Pseb.create({
    userId: user._id,
    cnicOfDirector: {
      fileName: psebDocuments.image1[0].filename,
      path: psebDocuments.image1[0].path,
    },
    copyOfMou: {
      fileName: psebDocuments.image2[0].filename,
      path: psebDocuments.image2[0].path,
    },
    incorporationCertificate: {
      fileName: psebDocuments.image3[0].filename,
      path: psebDocuments.image3[0].path,
    },
    partnershipDeed: {
      fileName: psebDocuments.image4[0].filename,
      path: psebDocuments.image4[0].path,
    },

    firmRegistrationCertificate: {
      fileName: psebDocuments.image5[0].filename,
      path: psebDocuments.image5[0].path,
    },
    feeChallan: {
      fileName: psebDocuments.image6[0].filename,
      path: psebDocuments.image6[0].path,
    },
    businessBankStatement: {
      fileName: psebDocuments.image7[0].filename,
      path: psebDocuments.image7[0].path,
    },
  });

  if (!uploadedDocs) {
    return next(new AppError("Unable to create Pseb documents.", 404));
  }

  res.status(201).json({
    status: "success",
  });
});
