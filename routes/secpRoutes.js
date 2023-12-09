const express = require("express");
const secpController = require("./../controllers/secpController");
const authenticateUser = require("./../middlewares/userAuth");
const secpDocsUpload = require("./../middlewares/secpDocsUpload");
const router = express.Router();

router
  .route("/")
  .get(secpController.getAllSecpDocuments)
  .post(authenticateUser, secpDocsUpload, secpController.createSecpDocuments);

router.route("/docs").get(authenticateUser, secpController.getSecpDocuments);

module.exports = router;
