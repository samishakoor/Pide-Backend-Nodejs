const express = require("express");
const secpController = require("./../controllers/secpController");
const authenticateToken = require("./../middlewares/authenticateToken");
const router = express.Router();

router
  .route("/")
  .get(secpController.getAllSecpDocuments)
  .post(authenticateToken, secpController.createSecpDocuments);

router
  .route("/userDocs")
  .get(authenticateToken, secpController.getSecpDocuments);

module.exports = router;
