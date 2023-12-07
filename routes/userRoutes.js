const express = require("express");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const verifyToken = require("./../utils/verifyToken");
const router = express.Router();

const authenticateToken = catchAsync(async (req, res, next) => {
  let token;
  if (req.params.token) {
    token = req.params.token;
  } else {
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }
  if (!token) {
    return next(new AppError("Token Not Found", 401));
  }
  const tok = verifyToken(token);
  if (tok == "expired token") {
    return next(new AppError("token expired", 401));
  }
  const rootUser = await User.findById({ _id: tok.id });
  if (!rootUser) {
    return next(new AppError("User Not Found", 404));
  }
  req.user = rootUser;
  next();
});

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);

router.get(
  "/resetPassword/:token",
  authenticateToken,
  authController.resetPasswordForm
);
router.post(
  "/resetPassword/:token",
  authenticateToken,
  authController.resetPassword
);

router.route("/").get(userController.getAllUsers);
router.route("/userData").get(authenticateToken, userController.getUser);
router.route("/updateUser").patch(authenticateToken, userController.updateUser);

module.exports = router;
