const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const authenticateUser = require("./../middlewares/userAuth");
const resetPasswordAuth = require("./../middlewares/resetPasswordAuth");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);

router.get(
  "/resetPassword/:token",
  resetPasswordAuth,
  authController.resetPasswordForm
);
router.post(
  "/resetPassword/:token",
  resetPasswordAuth,
  authController.resetPassword
);

router.route("/").get(userController.getAllUsers);
router.route("/userData").get(authenticateUser, userController.getUser);
router.route("/updateUser").patch(authenticateUser, userController.updateUser);

module.exports = router;
