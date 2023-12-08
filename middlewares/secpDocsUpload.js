const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const multer = require("multer");
const multerConfig = require("../utils/multerConfig");

const upload = multerConfig("../images/secp").array("images", 2);

module.exports = catchAsync(async (req, res, next) => {
  upload(req, res, function(error) {
    if (error instanceof multer.MulterError) {
      return next(
        new AppError("A multer error occurred while uploading photos", 500)
      );
    } else if (error) {
      return next(
        new AppError("An unknown error occurred while uploading photos", 500)
      );
    }
    next();
  });
});
