const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.get("/resetPassword/:id/:token", authController.resetPasswordForm);
router.post("/resetPassword/:id/:token", authController.resetPassword);
router.route("/").get(userController.getAllUsers);
router.route("/userData").post(userController.getUser);
router.route("/updateUser").patch(userController.updateUser);

module.exports = router;
