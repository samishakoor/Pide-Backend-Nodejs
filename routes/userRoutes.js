const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const authenticateToken = require("./../middlewares/authenticateToken");

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
