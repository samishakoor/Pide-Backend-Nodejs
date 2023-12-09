const express = require("express");
const authenticateUser = require("./../middlewares/userAuth");
const psebController = require("./../controllers/psebController");
const psebDocsUpload = require("./../middlewares/psebDocsUpload");
const router = express.Router();

router
  .route("/")
  .get(psebController.getAllPsebDocuments)
  .post(authenticateUser, psebDocsUpload, psebController.createPsebDocuments);

router.route("/docs").get(authenticateUser, psebController.getPsebDocuments);

module.exports = router;
