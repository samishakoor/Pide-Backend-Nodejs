const express = require("express");
const secpController = require("./../controllers/secpController");
const authenticateUser = require("./../middlewares/userAuth");
const router = express.Router();

router
  .route("/")
  .get(secpController.getAllSecpDocuments)
  .post(authenticateUser, secpController.createSecpDocuments);

router
  .route("/userDocs")
  .get(authenticateUser, secpController.getSecpDocuments);

module.exports = router;
