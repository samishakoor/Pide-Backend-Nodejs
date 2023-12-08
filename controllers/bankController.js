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
  const bankDocuments = await Bank.findOne({ userId: user._id });

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
  const { director1, director2, director3 } = req.body;
  const bankDocuments = req.files;

  const uploadedDocs = await Bank.create({
    userId: user._id,
    cnicOfSignoratory: {
      fileName: bankDocuments.image1[0].filename,
      path: bankDocuments.image1[0].path,
    },
    proofOfNtn: {
      fileName: bankDocuments.image2[0].filename,
      path: bankDocuments.image2[0].path,
    },
    letterHead: {
      fileName: bankDocuments.image3[0].filename,
      path: bankDocuments.image3[0].path,
    },
    rubberStamp: {
      fileName: bankDocuments.image4[0].filename,
      path: bankDocuments.image4[0].path,
    },
    partnershipDeed: {
      fileName: bankDocuments.image5[0].filename,
      path: bankDocuments.image5[0].path,
    },

    certificateOfRegistration: {
      fileName: bankDocuments.image6[0].filename,
      path: bankDocuments.image6[0].path,
    },
    proofOfBusinessAddress: {
      fileName: bankDocuments.image7[0].filename,
      path: bankDocuments.image7[0].path,
    },
    affidavit: {
      fileName: bankDocuments.image8[0].filename,
      path: bankDocuments.image8[0].path,
    },
    memorandumOfArticles: {
      fileName: bankDocuments.image9[0].filename,
      path: bankDocuments.image9[0].path,
    },
    director1,
    director2,
    director3,
  });

  if (!uploadedDocs) {
    return next(new AppError("Unable to create bank documents.", 404));
  }

  res.status(201).json({
    status: "success",
  });
});
